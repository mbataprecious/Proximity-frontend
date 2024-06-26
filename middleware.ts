import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const res = NextResponse.next();
  if (request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/login", request.url))
  }
  return res;
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/"],
};