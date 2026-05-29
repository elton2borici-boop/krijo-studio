import { NextResponse } from "next/server";
import { listContacts } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const limit = Math.min(
    Math.max(Number(url.searchParams.get("limit") || 200), 1),
    1000
  );
  const rows = listContacts(limit);
  return NextResponse.json({ ok: true, count: rows.length, contacts: rows });
}
