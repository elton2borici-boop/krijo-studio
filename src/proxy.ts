import { NextRequest, NextResponse } from "next/server";

// Basic Auth gate for /admin and /api/contacts (GET listing).
// Set ADMIN_USER and ADMIN_PASSWORD in .env.local. Defaults are for local dev only.
const ADMIN_USER = process.env.ADMIN_USER || "admin";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "krijo-dev";

function unauthorized() {
  return new NextResponse("Authentication required.", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="krijo-admin", charset="UTF-8"' },
  });
}

export function proxy(req: NextRequest) {
  // Local dev: no password prompt on your own machine.
  if (process.env.NODE_ENV !== "production") return NextResponse.next();

  const auth = req.headers.get("authorization");
  if (!auth?.startsWith("Basic ")) return unauthorized();

  let decoded: string;
  try {
    decoded = atob(auth.slice(6));
  } catch {
    return unauthorized();
  }
  const idx = decoded.indexOf(":");
  if (idx < 0) return unauthorized();
  const user = decoded.slice(0, idx);
  const pass = decoded.slice(idx + 1);

  if (user !== ADMIN_USER || pass !== ADMIN_PASSWORD) return unauthorized();
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/contacts/:path*"],
};
