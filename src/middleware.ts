import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  if (!request.cookies.has("resourceId")) {
    const resourceId = crypto.randomUUID();

    response.cookies.set("resourceId", resourceId, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });
  }

  return response;
}
