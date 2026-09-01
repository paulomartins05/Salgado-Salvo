
import { NextRequest, NextResponse } from "next/server"

export async function middleware(request: NextRequest) {

  const sessionCookie = request.cookies.get("better-auth.session_token") || request.cookies.get("__Secure-better-auth.session_token")

  if (!sessionCookie) {
    return NextResponse.redirect(new URL("/login", request.url))
  }


  try {

    const response = await fetch(new URL("/api/auth/get-session", request.url), {
      headers: {
        cookie: request.headers.get("cookie") || "",
      },
    })

    if (!response.ok) {
      return NextResponse.redirect(new URL("/login", request.url))
    }

    const sessionData = await response.json()
    const user = sessionData?.user

    if (!user) {
      return NextResponse.redirect(new URL("/login", request.url))
    }

    const isParceiroRoute = request.nextUrl.pathname.startsWith("/parceiro")
    if (isParceiroRoute && user.role !== "PARCEIRO") {
      return NextResponse.redirect(new URL("/", request.url))
    }
    return NextResponse.next()



  } catch (error) {

    return NextResponse.redirect(new URL("/login", request.url))

  }
}


export const config = {
  matcher: [
    "/parceiro/:path*",
    "/perfil/:path*"
  ]
}