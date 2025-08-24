import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Define protected routes
const protectedRoutes = ['/dashboard']
const authRoutes = ['/login']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Get token from cookies or headers
  const cookieToken = request.cookies.get('auth-token')?.value
  const headerToken = request.headers.get('authorization')?.replace('Bearer ', '')
  const token = cookieToken || headerToken

  // Debug logging
  console.log(`[MIDDLEWARE] Path: ${pathname}`)
  console.log(`[MIDDLEWARE] Cookie token exists: ${!!cookieToken}`)

  // Check if route is protected
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname.startsWith(route)
  )
  
  // Check if route is auth-only (login page)
  const isAuthRoute = authRoutes.some(route => 
    pathname.startsWith(route)
  )

  console.log(`[MIDDLEWARE] Is protected route: ${isProtectedRoute}`)
  console.log(`[MIDDLEWARE] Is auth route: ${isAuthRoute}`)

  // Simple token check - just check if token exists and has proper format
  // Real verification will be done in API routes
  let isAuthenticated = false
  if (token) {
    // Basic JWT format check: header.payload.signature
    const parts = token.split('.')
    if (parts.length === 3) {
      isAuthenticated = true
      console.log(`[MIDDLEWARE] Token format valid`)
    } else {
      console.log(`[MIDDLEWARE] Token format invalid`)
      // Clear invalid token from cookie
      const response = NextResponse.next()
      response.cookies.delete('auth-token')
      isAuthenticated = false
    }
  }

  console.log(`[MIDDLEWARE] Is authenticated: ${isAuthenticated}`)

  // Redirect logic - TEMPORARILY DISABLED for debugging
  // TODO: Re-enable once cookie authentication is fixed
  if (isProtectedRoute && !isAuthenticated) {
    console.log(`[MIDDLEWARE] Protected route without auth - ALLOWING for debugging`)
    // const loginUrl = new URL('/login', request.url)
    // loginUrl.searchParams.set('redirect', pathname)
    // return NextResponse.redirect(loginUrl)
  }

  if (isAuthRoute && isAuthenticated) {
    console.log(`[MIDDLEWARE] Redirecting to dashboard - already authenticated`)
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  console.log(`[MIDDLEWARE] Allowing request to proceed`)
  return NextResponse.next()
}

// Configure which routes to run middleware on
export const config = {
  matcher: [
    // Run on all routes except static files and api routes
    '/((?!_next/static|_next/image|favicon.ico|.*\\..*|api).*)',
  ],
}
