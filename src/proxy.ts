import { NextRequest, NextResponse } from "next/server";
import { timingSafeEqual } from "node:crypto";

/**
 * Basic Auth gate for the admin area: the /admin dashboard and the
 * GET /api/contacts listing endpoint.
 *
 * - Production: ADMIN_USER and ADMIN_PASSWORD are required. If either is
 *   missing the admin area is disabled (503) rather than left open.
 * - Development: the gate is bypassed so the dashboard works on localhost.
 */

function unauthorized() {
  return new NextResponse("Authentication required.", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="krijo-admin", charset="UTF-8"' },
  });
}

/** Constant-time string comparison to avoid leaking credential length/prefix. */
function safeEqual(a: string, b: string) {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  return bufA.length === bufB.length && timingSafeEqual(bufA, bufB);
}

export function proxy(req: NextRequest) {
  if (process.env.NODE_ENV !== "production") return NextResponse.next();

  const adminUser = process.env.ADMIN_USER;
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminUser || !adminPassword) {
    return new NextResponse(
      "Admin area is not configured. Set ADMIN_USER and ADMIN_PASSWORD.",
      { status: 503 }
    );
  }

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

  if (!safeEqual(user, adminUser) || !safeEqual(pass, adminPassword)) {
    return unauthorized();
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/contacts/:path*"],
};
