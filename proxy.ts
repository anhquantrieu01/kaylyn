import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyAccessToken } from "@/lib/jwt";

export function proxy(req: NextRequest) {
  const token = req.cookies.get("accessToken")?.value;
  const pathname = req.nextUrl.pathname;

  if (!token) {
    return NextResponse.next();
  }

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const decoded: any = verifyAccessToken(token);
    const role = decoded.role?.toUpperCase();

    // Route admin
    if (pathname.startsWith("/admin") && role !== "ADMIN") {
      return NextResponse.redirect(new URL("/forbidden", req.url));
    }

    // Route staff
    if (pathname.startsWith("/staff") && role !== "STAFF" && role !== "ADMIN") {
      return NextResponse.redirect(new URL("/forbidden", req.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.log("JWT error:", error);
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/admin/:path*", "/staff/:path*"],
};
