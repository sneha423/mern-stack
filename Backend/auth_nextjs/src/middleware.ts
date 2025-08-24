import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function will check if the user is authenticated based on the JWT token in cookies
export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublicPath = path === "/login" || path === "/signup";
  const token = request.cookies.get("token")?.value || "";
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
}
export const config = {
  matcher: ["/", "/profile", "/login", "/signup"],
};
