import { NextResponse, type NextRequest } from "next/server";

const DEFAULT_ADMIN_HOST = "admin.localhost";
const DEFAULT_PUBLIC_HOST = "localhost";
const DEFAULT_ADMIN_URL = "http://admin.localhost:3000";
const DEFAULT_SITE_URL = "http://localhost:3000";

function readEnv(name: string, fallback: string) {
  const value = process.env[name]?.trim();

  return value ? value.replace(/\/+$/, "") : fallback;
}

const adminHost = readEnv("ADMIN_HOST", DEFAULT_ADMIN_HOST).toLowerCase();
const publicHost = readEnv("PUBLIC_HOST", DEFAULT_PUBLIC_HOST).toLowerCase();
const adminUrl = readEnv("ADMIN_URL", DEFAULT_ADMIN_URL);
const siteUrl = readEnv("SITE_URL", DEFAULT_SITE_URL);

function getHostname(request: NextRequest) {
  const forwardedHost = request.headers.get("x-forwarded-host");
  const host =
    forwardedHost?.split(",")[0]?.trim() ??
    request.headers.get("host") ??
    request.nextUrl.hostname;

  return host.replace(/:\d+$/, "").toLowerCase();
}

function isAdminPath(pathname: string) {
  return pathname === "/admin" || pathname.startsWith("/admin/");
}

export function proxy(request: NextRequest) {
  const hostname = getHostname(request);
  const { pathname, search } = request.nextUrl;

  if (hostname === `www.${publicHost}`) {
    const destination = new URL(`${pathname}${search}`, siteUrl);
    const headers = new Headers(request.headers);
    headers.set("x-bakul-redirect-to", destination.toString());

    return NextResponse.rewrite(
      new URL("/api/internal/redirect", request.url),
      { request: { headers } },
    );
  }

  if (hostname === adminHost) {
    if (pathname === "/") {
      return NextResponse.redirect(new URL("/admin", adminUrl), 307);
    }

    if (isAdminPath(pathname)) {
      return NextResponse.next();
    }

    return NextResponse.redirect(new URL("/admin", adminUrl), 307);
  }

  if (isAdminPath(pathname)) {
    return NextResponse.redirect(new URL(`${pathname}${search}`, adminUrl), 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
