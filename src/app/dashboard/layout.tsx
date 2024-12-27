'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth';
import MainLayout from '@/components/layout/MainLayout';
import { Suspense } from 'react';
import LoadingScreen from '@/components/common/LoadingScreen';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { token } = useAuthStore();

  useEffect(() => {
    if (!token) {
      router.replace('/login');
    }
  }, [token, router]);

  if (!token) return null;

  return (
    <MainLayout>
      <Suspense fallback={<LoadingScreen />}>
        {children}
      </Suspense>
    </MainLayout>
  );
} 