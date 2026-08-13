/*

Utilizando o Middleware, para garantir que o usuario esta logado antes de conseguir acessar as paginas

*/

import { NextRequest, NextResponse} from "next/server"

export async function middleware(request: NextRequest) {
  
  const sessionCookie = request.cookies.get("better-auth.session_token")

  if (!sessionCookie && request.nextUrl.pathname.startsWith("/")) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!login|cadastro|api|_next/static|_next/image|favicon.ico).*)',
    ]
}
