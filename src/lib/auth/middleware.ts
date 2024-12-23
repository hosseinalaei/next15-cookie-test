import { NextRequest, NextResponse } from "next/server";
import { cookieName } from "./constant";

export function middleware(request: NextRequest) {
  const token = request.cookies.get(cookieName)?.value;

  if (token) {
    return NextResponse.next();
  }
  const url = new URL(request.url);
  url.pathname = "/auth";
  return NextResponse.redirect(url.toString());
}
