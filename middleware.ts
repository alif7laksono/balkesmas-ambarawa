import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  // ambil token session NextAuth
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // path yang dilindungi
  const protectedPaths = ["/admin/*", "/api/*"];
  const isProtected = protectedPaths.some((path) =>
    req.nextUrl.pathname.startsWith(path)
  );

  if (isProtected && !token) {
    // simpan URL tujuan biar bisa redirect balik setelah login
    const callbackUrl = req.nextUrl.pathname + req.nextUrl.search;

    return NextResponse.redirect(
      new URL(
        `/admin/login?callbackUrl=${encodeURIComponent(callbackUrl)}`,
        req.url
      )
    );
  }

  return NextResponse.next();
}

// hanya jalan untuk /admin/*
export const config = {
  matcher: ["/admin/:path*"],
};
