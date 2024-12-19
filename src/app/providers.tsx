'use client';

import { ConfigProvider, App as AntdApp } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import { StoreProvider } from '@/store';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ConfigProvider locale={zhCN}>
      <AntdApp>
        <StoreProvider>
          {children}
        </StoreProvider>
      </AntdApp>
    </ConfigProvider>
  );
} 