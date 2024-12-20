'use client';

import MainLayout from '@/components/layout/MainLayout';
import { Suspense } from 'react';
import LoadingScreen from '@/components/common/LoadingScreen';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactElement;
}) {
  return (
    <MainLayout>
      <Suspense fallback={<LoadingScreen />}>
        {children}
      </Suspense>
    </MainLayout>
  );
} 