import MainLayout from '@/components/layout/MainLayout';
import { Suspense } from 'react';
import LoadingScreen from '@/components/common/LoadingScreen';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <MainLayout>{children}</MainLayout>
    </Suspense>
  );
} 