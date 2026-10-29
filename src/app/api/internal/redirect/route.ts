import { NextResponse, type NextRequest } from "next/server";

import { getSiteUrl } from "@/lib/site";

export function GET(request: NextRequest) {
  const target = request.headers.get("x-bakul-redirect-to");

  if (!target) {
    return new NextResponse(null, { status: 400 });
  }

  let destination: URL;

  try {
    destination = new URL(target);
  } catch {
    return new NextResponse(null, { status: 400 });
  }

  if (destination.origin !== new URL(getSiteUrl()).origin) {
    return new NextResponse(null, { status: 400 });
  }

  return NextResponse.redirect(destination, {
    status: 308,
    headers: { "cache-control": "no-store" },
  });
}
