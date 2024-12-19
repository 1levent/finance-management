import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAuthPage = ['/login', '/register', '/forgot-password'].includes(pathname);
  
  try {
    const authStorage = request.cookies.get('auth-storage')?.value;
    let token = null;

    if (authStorage) {
      try {
        const parsed = JSON.parse(authStorage);
        token = parsed?.state?.token;
      } catch (e) {
        return NextResponse.redirect(new URL('/login', request.url));
      }
    }

    if (isAuthPage && token) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    if (!isAuthPage && !token && pathname !== '/') {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    const response = NextResponse.next();

    if (token && authStorage) {
      response.cookies.set('auth-storage', authStorage, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60
      });
    }

    return response;
  } catch (error) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}; 