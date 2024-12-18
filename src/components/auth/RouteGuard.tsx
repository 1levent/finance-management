'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/auth';

interface RouteGuardProps {
  children: React.ReactNode;
}

export default function RouteGuard({ children }: RouteGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { token } = useAuthStore();
  
  // 定义公开路由和认证路由
  const publicRoutes = ['/', '/login', '/register', '/forgot-password'];
  const authRoutes = ['/dashboard'];

  useEffect(() => {
    // 调试信息
    console.log('RouteGuard:', {
      pathname,
      token,
      isPublicRoute: publicRoutes.includes(pathname),
      isAuthRoute: authRoutes.includes(pathname)
    });

    const handleRouting = async () => {
      try {
        // 如果是认证路由且未登录，重定向到登录页
        if (authRoutes.includes(pathname) && !token) {
          router.replace('/login');
          return;
        }

        // 如果已登录且在登录页，重定向到仪表盘
        if (token && pathname === '/login') {
          router.replace('/dashboard');
          return;
        }
      } catch (error) {
        console.error('RouteGuard error:', error);
      }
    };

    handleRouting();
  }, [pathname, token, router]);

  return <>{children}</>;
} 