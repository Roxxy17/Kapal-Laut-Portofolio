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

  // Check if route is protected
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname.startsWith(route)
  )
  
  // Check if route is auth-only (login page)
  const isAuthRoute = authRoutes.some(route => 
    pathname.startsWith(route)
  )

  // Simple token check - just check if token exists and has proper format
  // Real verification will be done in API routes
  let isAuthenticated = false
  if (token) {
    // Basic JWT format check: header.payload.signature
    const parts = token.split('.')
    if (parts.length === 3) {
      isAuthenticated = true
    } else {
      // Clear invalid token from cookie
      const response = NextResponse.next()
      response.cookies.delete('auth-token')
      isAuthenticated = false
    }
  }

  // Redirect logic for production
  if (isProtectedRoute && !isAuthenticated) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(loginUrl)
  }

  if (isAuthRoute && isAuthenticated) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

// Configure which routes to run middleware on
export const config = {
  matcher: [
    // Run on all routes except static files and api routes
    '/((?!_next/static|_next/image|favicon.ico|.*\\..*|api).*)',
  ],
}
