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
  const { token, user } = useAuthStore();
  
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
    const handleRouting = () => {
      console.log('RouteGuard 详细检查:', {
        pathname,
        token,
        user,
        isAuthRoute: authRoutes.includes(pathname),
        localStorage: localStorage.getItem('auth-storage')
      });

      if (pathname === '/login' && token && user) {
        console.log('已登录状态访问登录页，执行重定向...');
        router.push('/dashboard');
        return;
      }

      if (authRoutes.includes(pathname) && (!token || !user)) {
        console.log('未登录状态访问受保护页面，执行重定向...');
        router.push('/login');
        return;
      }
    };

    handleRouting();
  }, [pathname, token, user, router]);

  console.log('RouteGuard 渲染:', { pathname, token, user });

  return <>{children}</>;
} 