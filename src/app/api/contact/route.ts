import { NextResponse } from "next/server";
import { z } from "zod";
import { insertContact, countContactsSince } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

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
    .email("Email-i nuk është i vlefshëm."),
  phone: z.string().trim().max(40).optional().nullable(),
  business: z.string().trim().max(120).optional().nullable(),
  package: z
    .enum([
      "vetem-faqja",
      "faqja-plus-domain",
      "mirembajtje",
      "premium",
      "tjeter",
    ])
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

  // Honeypot: bot fills this field, real users won't.
  if (data.website && data.website.length > 0) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  const ip = clientIp(req);

  // Naive rate limit: max 5 submissions per IP in 10 minutes.
  if (ip) {
    const recent = countContactsSince(600, ip);
    if (recent >= 5) {
      return NextResponse.json(
        {
          error:
            "Ke dërguar shumë mesazhe. Provo përsëri pas disa minutash.",
        },
        { status: 429 }
      );
    }
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
    });

    return NextResponse.json(
      { ok: true, id: row.id },
      { status: 201 }
    );
  } catch (err) {
    console.error("[contact] insert failed:", err);
    return NextResponse.json(
      { error: "Diçka shkoi keq në server. Provo përsëri." },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { ok: true, hint: "POST {name, email, message, ...} në këtë endpoint." },
    { status: 200 }
  );
}
