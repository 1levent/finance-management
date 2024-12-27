'use client';

import MainLayout from '@/components/layout/MainLayout';
import { Breadcrumb } from 'antd';
import { Suspense } from 'react';
import LoadingScreen from '@/components/common/LoadingScreen';
import { usePathname, useRouter } from 'next/navigation';

export default function InvestmentLayout({
  children,
}: {
  children: React.ReactElement;
}) {
  const pathname = usePathname();
  const router = useRouter();

  // 获取面包屑配置
  const getBreadcrumbItems = () => {
    const items = [
      { title: '首页', onClick: () => router.push('/') },
      { title: '理财管理', onClick: () => router.push('/investment') }
    ];

    // 根据路径添加对应的面包屑
    if (pathname.includes('/investment/portfolio')) {
      items.push({ 
        title: '投资组合',
        onClick: () => router.push('/investment/portfolio')
      });
      
      if (pathname.includes('/overview')) {
        items.push({ 
          title: '资产配置',
          onClick: () => router.push('/investment/portfolio/overview')
        });
      } else if (pathname.includes('/products')) {
        items.push({ 
          title: '产品管理',
          onClick: () => router.push('/investment/portfolio/products')
        });
      }
    } 
    else if (pathname.includes('/investment/transactions')) {
      items.push({ 
        title: '交易记录',
        onClick: () => router.push('/investment/transactions')
      });
      
      if (pathname.includes('/trades')) {
        items.push({ 
          title: '买卖记录',
          onClick: () => router.push('/investment/transactions/trades')
        });
      } else if (pathname.includes('/dividends')) {
        items.push({ 
          title: '分红记录',
          onClick: () => router.push('/investment/transactions/dividends')
        });
      }
    }
    else if (pathname.includes('/investment/analysis')) {
      items.push({ 
        title: '收益分析',
        onClick: () => router.push('/investment/analysis')
      });
    }
    else if (pathname.includes('/investment/risk')) {
      items.push({ 
        title: '风险监控',
        onClick: () => router.push('/investment/risk')
      });
      
      if (pathname.includes('/assessment')) {
        items.push({ 
          title: '风险评估',
          onClick: () => router.push('/investment/risk/assessment')
        });
      } else if (pathname.includes('/alerts')) {
        items.push({ 
          title: '止损预警',
          onClick: () => router.push('/investment/risk/alerts')
        });
      } else if (pathname.includes('/market')) {
        items.push({ 
          title: '市场监控',
          onClick: () => router.push('/investment/risk/market')
        });
      }
    }
    else if (pathname.includes('/investment/goals')) {
      items.push({ 
        title: '投资目标',
        onClick: () => router.push('/investment/goals')
      });
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