import { getAuthStatus } from "@/lib/utils/auth/get-auth-status";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const ROUTES = Object.freeze({
  HOME: "/",
  LOGIN: "/login",
  POSTS: "/posts",
});

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const redirectTo = (url: string) => {
    return NextResponse.redirect(new URL(url, request.url));
  };

  const { isAuthenticated } = getAuthStatus(request);

  if (pathname === ROUTES.HOME) {
    return redirectTo(isAuthenticated ? ROUTES.POSTS : ROUTES.LOGIN);
  }

  if (isAuthenticated && pathname === ROUTES.LOGIN) {
    return redirectTo(ROUTES.POSTS);
  }

  if (!isAuthenticated && pathname.startsWith(ROUTES.POSTS)) {
    return redirectTo(ROUTES.LOGIN);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/posts/:path*"],
};
