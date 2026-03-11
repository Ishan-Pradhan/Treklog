import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Define routes that need protection
  const protectedRoutes = ["/add-new-trek"];

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isProtected) {
    const accessToken = request.cookies.get(
      "sb-reipuddmfisftxswvkcz-auth-token"
    )?.value;

    if (!accessToken) {
      const url = request.nextUrl.clone();
      url.pathname = "/auth/login";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/list-treks/:path*", "/add-new-trek/:path*"],
};
