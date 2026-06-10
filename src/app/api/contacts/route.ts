import { NextResponse } from "next/server";
import { listContacts } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const DEFAULT_LIMIT = 200;
const MAX_LIMIT = 500;

/**
 * Lists contact submissions, newest first. Protected by Basic Auth in
 * production via src/proxy.ts (open in development, like /admin).
 */
export async function GET(req: Request) {
  const url = new URL(req.url);
  const raw = url.searchParams.get("limit");
  const parsed = raw ? Number.parseInt(raw, 10) : DEFAULT_LIMIT;
  const limit = Number.isNaN(parsed)
    ? DEFAULT_LIMIT
    : Math.min(Math.max(parsed, 1), MAX_LIMIT);

  const rows = listContacts(limit);
  return NextResponse.json({ ok: true, count: rows.length, contacts: rows });
}
