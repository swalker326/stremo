import { type NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  if (!process.env.VERCEL_ENV) {
    return NextResponse.next();
  }
  const path = req.nextUrl.pathname;

  // if path is /explore or /challenge/* and redirect to /waitlist
  if (path === "/explore" || path.startsWith("/challenge/")) {
    return NextResponse.redirect(new URL("/waitlist", req.url));
  }

  return NextResponse.next();
}
