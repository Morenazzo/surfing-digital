import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Si hay un parámetro redirect, redirigir a esa URL
  const searchParams = request.nextUrl.searchParams
  const redirectUrl = searchParams.get('redirect')
  
  if (redirectUrl) {
    try {
      const url = new URL(redirectUrl)
      return NextResponse.redirect(url)
    } catch (e) {
      console.error('Invalid redirect URL:', e)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
}