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
  
  // 定义所有需要认证的路由
  const authRoutes = [
    '/dashboard',
    '/income-expense',
    '/investment',
    '/assets',
    '/reports',
    '/budget',
    '/goals',
    '/settings'
  ];

  useEffect(() => {
    // 调试信息
    console.log('RouteGuard:', {
      pathname,
      token,
      isAuthRoute: authRoutes.includes(pathname)
    });

    const handleRouting = () => {
      // 如果已登录且在登录页，重定向到仪表盘
      if (token && pathname === '/login') {
        console.log('已登录，重定向到仪表盘');
        router.push('/dashboard');
        return;
      }

      // 如果未登录且访问需要认证的页面，重定向到登录页
      if (!token && authRoutes.includes(pathname)) {
        console.log('未登录，重定向到登录页');
        router.push('/login');
        return;
      }
    };

    handleRouting();
  }, [pathname, token, router]);

  return <>{children}</>;
} 