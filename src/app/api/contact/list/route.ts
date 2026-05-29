import { NextResponse } from "next/server";
import { listContacts } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Simple bearer-token-protected admin endpoint to inspect submissions.
// Set ADMIN_TOKEN in your .env.local to enable.
export async function GET(req: Request) {
  const token = process.env.ADMIN_TOKEN;
  if (!token) {
    return NextResponse.json(
      { error: "Admin token nuk është konfiguruar." },
      { status: 503 }
    );
  }

  const auth = req.headers.get("authorization");
  if (auth !== `Bearer ${token}`) {
    return NextResponse.json(
      { error: "Nuk je i autorizuar." },
      { status: 401 }
    );
  }

  const url = new URL(req.url);
  const limit = Math.min(
    Math.max(parseInt(url.searchParams.get("limit") || "100", 10), 1),
    500
  );
  const rows = listContacts(limit);
  return NextResponse.json({ ok: true, count: rows.length, rows });
}
