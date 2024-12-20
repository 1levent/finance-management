'use client';

import MainLayout from '@/components/layout/MainLayout';
import { Breadcrumb } from 'antd';
import { Suspense } from 'react';
import LoadingScreen from '@/components/common/LoadingScreen';

export default function BudgetLayout({
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
            { title: '预算管理' },
          ]} />
          {children}
        </div>
      </Suspense>
    </MainLayout>
  );
} 