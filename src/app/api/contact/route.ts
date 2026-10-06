import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { z } from "zod";
import {
  insertContact,
  countContactsSince,
  countContactsSinceByToken,
} from "@/lib/db";
import { notifyNewLead } from "@/lib/notify";
import { INTEREST_IDS } from "@/content/packages";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const RATE_WINDOW_SECONDS = 600;

/**
 * Primary limit, per browser. Tight, because it tracks one actual person.
 */
const MAX_PER_TOKEN = 3;

/**
 * Backstop limit, per IP. Deliberately loose: Albanian mobile carriers put
 * large numbers of subscribers behind shared CGNAT gateways, so an IP here can
 * legitimately be hundreds of different people on the same cell tower. This
 * only exists to blunt a flood from a single source once the cookie is gone.
 */
const MAX_PER_IP = 30;

const TOKEN_COOKIE = "krijo_ct";

/**
 * Not signed, on purpose. The token exists to rate-limit an honest browser;
 * anyone willing to forge it can just as easily clear it, which the IP
 * backstop covers. Signing would imply a trust guarantee it cannot give.
 */
function readOrCreateToken(req: Request): { token: string; isNew: boolean } {
  const header = req.headers.get("cookie") || "";
  const match = header.match(
    new RegExp(`(?:^|;\\s*)${TOKEN_COOKIE}=([A-Za-z0-9-]{16,64})(?:;|$)`)
  );
  if (match) return { token: match[1], isNew: false };
  return { token: randomUUID(), isNew: true };
}

const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Emri duhet të ketë të paktën 2 karaktere.")
    .max(120),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .pipe(z.email("Email-i nuk është i vlefshëm.")),
  phone: z
    .string()
    .trim()
    .max(40)
    .optional()
    .nullable()
    .transform((v) => v || null),
  business: z
    .string()
    .trim()
    .max(120)
    .optional()
    .nullable()
    .transform((v) => v || null),
  package: z
    .enum(INTEREST_IDS)
    .optional()
    .nullable(),
  message: z
    .string()
    .trim()
    .min(10, "Mesazhi duhet të ketë të paktën 10 karaktere.")
    .max(4000),
  website: z.string().optional(), // honeypot
});

function clientIp(req: Request) {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("x-real-ip") || null;
}

export async function POST(req: Request) {
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Trupi i kërkesës nuk është JSON i vlefshëm." },
      { status: 400 }
    );
  }

  const parsed = contactSchema.safeParse(json);
  if (!parsed.success) {
    const first = parsed.error.issues[0];
    return NextResponse.json(
      { error: first?.message || "Të dhëna të pavlefshme." },
      { status: 422 }
    );
  }

  const data = parsed.data;
  const { token, isNew } = readOrCreateToken(req);

  /** Every response carries the token forward so the browser keeps its identity. */
  function withToken(res: NextResponse) {
    if (isNew) {
      res.cookies.set(TOKEN_COOKIE, token, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60 * 24 * 30,
      });
    }
    return res;
  }

  // Honeypot: bots fill this hidden field, real users won't. Respond exactly
  // like a successful submission so bots can't detect the trap.
  if (data.website && data.website.length > 0) {
    return withToken(NextResponse.json({ ok: true, id: 0 }, { status: 201 }));
  }

  const ip = clientIp(req);

  const tooManyForBrowser =
    countContactsSinceByToken(RATE_WINDOW_SECONDS, token) >= MAX_PER_TOKEN;
  const tooManyForIp =
    ip !== null && countContactsSince(RATE_WINDOW_SECONDS, ip) >= MAX_PER_IP;

  if (tooManyForBrowser || tooManyForIp) {
    return withToken(
      NextResponse.json(
        {
          error:
            "Ke dërguar shumë mesazhe. Provo përsëri pas disa minutash ose na shkruaj me email.",
        },
        { status: 429 }
      )
    );
  }

  try {
    const row = insertContact({
      name: data.name,
      email: data.email,
      phone: data.phone ?? null,
      business: data.business ?? null,
      package: data.package ?? null,
      message: data.message,
      ip,
      user_agent: req.headers.get("user-agent"),
      client_token: token,
    });

    // Best-effort: the lead is already stored, so a failed notification is
    // logged but never surfaced to the visitor as an error.
    await notifyNewLead(row);

    return withToken(NextResponse.json({ ok: true, id: row.id }, { status: 201 }));
  } catch (err) {
    console.error("[contact] insert failed:", err);
    return withToken(
      NextResponse.json(
        { error: "Diçka shkoi keq në server. Provo përsëri." },
        { status: 500 }
      )
    );
  }
}
