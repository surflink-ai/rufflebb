import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Get the pathname from the request
  const path = req.nextUrl.pathname

  // Paths that require authentication
  const authRequiredPaths = ['/dashboard', '/admin']
  const isAuthRequired = authRequiredPaths.some(authPath => path.startsWith(authPath))

  // Admin-only paths
  const adminOnlyPaths = ['/admin']
  const isAdminPath = adminOnlyPaths.some(adminPath => path.startsWith(adminPath))

  // If the user is not signed in and the path requires authentication
  if (!session && isAuthRequired) {
    const redirectUrl = new URL('/login', req.url)
    redirectUrl.searchParams.set('redirectTo', path)
    return NextResponse.redirect(redirectUrl)
  }

  // If the user is signed in but trying to access admin paths without admin role
  if (session && isAdminPath) {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    
    const isAdmin = user?.user_metadata?.role === 'admin'
    
    if (!isAdmin) {
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }
  }

  // If the user is signed in and trying to access auth pages (login/register)
  if (session && (path === '/login' || path === '/register')) {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  return res
}

// Specify which routes this middleware should run for
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
}
