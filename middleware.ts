import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSession, isValidSession } from "./utils/authsession";
import { userTypeToPathMap } from "./utils/helpers";

// This function can be marked `async` if using `await` inside
export function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const session: IAuthData = getSession({ res, req }) || {};

  if (req.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  // //check for session validation
  // if (!isValidSession(session)) {
  //   const redirect_url = `/login?redirect_url=${req?.nextUrl?.pathname}`;
  //   return NextResponse.redirect(new URL(redirect_url, req.url).toString());
  // }
  // const userPath =
  //   userTypeToPathMap?.[session?.user?.role as keyof typeof userTypeToPathMap];

  // if (!req.nextUrl.pathname.includes(userPath?.path)) {
  //   const proposed_url = userPath?.name ? `${userPath.path}` : "/login";
  //   return NextResponse.redirect(new URL(proposed_url, req.url).toString());
  // }

  return res;
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/admin/:path*", "/student/:path*"],
};
