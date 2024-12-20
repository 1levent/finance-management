'use client';

import MainLayout from '@/components/layout/MainLayout';
import { Breadcrumb } from 'antd';
import { Suspense } from 'react';
import LoadingScreen from '@/components/common/LoadingScreen';

export default function GoalLayout({
  children,
}: {
  children: React.ReactElement;
}) {
  return (
    <MainLayout>
      <Suspense fallback={<LoadingScreen />}>
        <div className="space-y-4">
          <Breadcrumb items={[
            { title: '首页' },
            { title: '目标规划' },
          ]} />
          {children}
        </div>
      </Suspense>
    </MainLayout>
  );
} 