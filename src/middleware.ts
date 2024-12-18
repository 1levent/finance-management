import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAuthPage = ['/login', '/register', '/forgot-password'].includes(pathname);
  
  try {
    const authStorage = request.cookies.get('auth-storage')?.value;
    const parsedStorage = authStorage ? JSON.parse(authStorage) : null;
    const hasToken = parsedStorage?.state?.token;

    // 调试信息
    console.log('Current path:', pathname);
    console.log('Auth storage:', parsedStorage);
    console.log('Has token:', hasToken);

    // 如果是认证页面且已登录，重定向到仪表盘
    if (isAuthPage && hasToken) {
      console.log('Redirecting to dashboard from auth page');
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    // 如果不是认证页面且未登录，重定向到登录页
    if (!isAuthPage && !hasToken && pathname !== '/') {
      console.log('Redirecting to login from protected page');
      return NextResponse.redirect(new URL('/login', request.url));
    }
  } catch (error) {
    console.error('Middleware error:', error);
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}; 