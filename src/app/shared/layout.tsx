'use client';

import MainLayout from '@/components/layout/MainLayout';
import { Breadcrumb } from 'antd';
import { Suspense } from 'react';
import LoadingScreen from '@/components/common/LoadingScreen';
import { usePathname } from 'next/navigation';

export default function SharedLayout({
  children,
}: {
  children: React.ReactElement;
}) {
  const pathname = usePathname();

  // 根据路径生成面包屑
  const getBreadcrumbItems = () => {
    const items = [
      { title: '首页' },
      { title: '共享账本' },
    ];

    const pathSegments = pathname.split('/').filter(Boolean);
    if (pathSegments.length > 1) {
      const lastSegment = pathSegments[pathSegments.length - 1];
      switch (lastSegment) {
        case 'overview':
          items.push({ title: '账本概览' });
          break;
        case 'list':
          items.push({ title: '账户列表' });
          break;
        case 'transactions':
          items.push({ title: '共享账单' });
          break;
        case 'roles':
          items.push({ title: '角色权限' });
          break;
        case 'invites':
          items.push({ title: '邀请管理' });
          break;
        case 'budget':
          items.push({ title: '共享预算' });
          break;
        case 'statistics':
          items.push({ title: '统计分析' });
          break;
        default:
          if (pathSegments[pathSegments.length - 2] === 'members') {
            items.push({ title: '成员管理' });
            switch (lastSegment) {
              case 'list':
                items.push({ title: '成员列表' });
                break;
              case 'invites':
                items.push({ title: '邀请管理' });
                break;
              case 'roles':
                items.push({ title: '角色权限' });
                break;
            }
          }
      }
    }

    return items;
  };

  return (
    <MainLayout>
      <Suspense fallback={<LoadingScreen />}>
        <div className="space-y-4">
          <Breadcrumb items={getBreadcrumbItems()} />
          {children}
        </div>
      </Suspense>
    </MainLayout>
  );
} 