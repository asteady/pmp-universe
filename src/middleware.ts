import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  // Check if we're using mock data (for demo purposes)
  const useMockData = process.env.USE_MOCK_DATA === 'true'
  
  // For demo purposes, always allow access if using mock data
  if (useMockData) {
    return NextResponse.next()
  }
  
  // Check if user is accessing dashboard routes
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    // In a real implementation, you would check for authentication here
    // For now, we'll simulate a basic auth check
    
    const authHeader = request.headers.get('authorization')
    const hasValidToken = authHeader && authHeader.startsWith('Bearer ')
    
    if (!hasValidToken) {
      // Redirect to login page or show unauthorized
      return NextResponse.redirect(new URL('/', request.url))
    }
    
    // You could also check user roles here
    // const userRole = getUserRole(authHeader)
    // if (userRole !== 'admin' && userRole !== 'viewer') {
    //   return NextResponse.redirect(new URL('/', request.url))
    // }
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
} 