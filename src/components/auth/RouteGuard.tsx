'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/auth';
import { Spin } from 'antd';

interface IRouteGuardProps {
  children: React.ReactNode;
}

const publicPaths = ['/login', '/register', '/forgot-password'];

const RouteGuard: React.FC<IRouteGuardProps> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isLoading } = useAuthStore();

  useEffect(() => {
    if (!isLoading && !user && !publicPaths.includes(pathname)) {
      router.replace('/login');
      return;
    }

    if (!isLoading && user && publicPaths.includes(pathname)) {
      router.replace('/dashboard');
      return;
    }
  }, [user, isLoading, pathname, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spin size="large" tip="加载中..." />
      </div>
    );
  }

  if (publicPaths.includes(pathname) || user) {
    return <>{children}</>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Spin size="large" tip="加载中..." />
    </div>
  );
};

export default RouteGuard; 