'use client';

import MainLayout from '@/components/layout/MainLayout';
import { Breadcrumb, Card } from 'antd';
import { Suspense } from 'react';
import LoadingScreen from '@/components/common/LoadingScreen';
import { usePathname } from 'next/navigation';

export default function SettingLayout({
  children,
}: {
  children: React.ReactElement;
}) {
  const pathname = usePathname();

  const getBreadcrumbTitle = () => {
    switch (pathname) {
      case '/setting/profile':
        return '个人信息';
      case '/setting/security':
        return '安全设置';
      case '/setting/preference':
        return '偏好设置';
      case '/setting/backup':
        return '数据备份';
      default:
        return '系统设置';
    }
  };

  return (
    <MainLayout>
      <Suspense fallback={<LoadingScreen />}>
        <div className="space-y-4">
          <Breadcrumb items={[
            { title: '首页' },
            { title: '系统设置' },
            { title: getBreadcrumbTitle() },
          ]} />
          <Card bordered={false} className="shadow-sm">
            {children}
          </Card>
        </div>
      </Suspense>
    </MainLayout>
  );
} 