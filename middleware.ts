import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { deleteSession, getSession, isValidSession } from "./utils/authsession";
import { userTypeToPathMap } from "./utils/helpers";

// This function can be marked `async` if using `await` inside
export function middleware(req: NextRequest) {
  // Store current request url in a custom header, which you can read later
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-url", req.url);
  const res = NextResponse.next({
    request: {
      // Apply new request headers
      headers: requestHeaders,
    },
  });
  const session: IAuthData = getSession({ res, req }) || {};
  console.log({ session });
  if (req.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // check for session validation
  if (!isValidSession(session) || Date.now() > session?.expires) {
    const redirect_url = `/login?redirect_url=${req?.nextUrl?.pathname}`;
    console.log(redirect_url);
    // check if session is expired
    const isExpired = Date.now() > session?.expires;
    if (isExpired) {
      deleteSession({ res, req });
    }
    if (req.nextUrl.pathname === "/login") {
      return res;
    }
    return NextResponse.redirect(new URL(redirect_url, req.url).toString());
  }

  // check for admin
  if (req.nextUrl.pathname === "/admin") {
    return NextResponse.redirect(new URL("/admin/module", req.url).toString());
  }
  //   check for user path
  const userPath =
    userTypeToPathMap?.[session?.user?.role as keyof typeof userTypeToPathMap];
  console.log({ userPath, pathname: req.nextUrl.pathname });

  if (req.nextUrl.pathname === "/login" && userPath) {
    return NextResponse.redirect(new URL(userPath.path, req.url).toString());
  }
  if (!req.nextUrl.pathname.includes(userPath?.path)) {
    const proposed_url = userPath?.name ? `${userPath.path}` : "/login";
    return NextResponse.redirect(new URL(proposed_url, req.url).toString());
  }

  return res;
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/login", "/admin/:path*", "/student/:path*"],
};
