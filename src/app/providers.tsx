'use client';

import { ConfigProvider, App as AntdApp } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import { StoreProvider } from '@/store';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ConfigProvider
      locale={zhCN}
      wave={{ disabled: true }}
      theme={{
        token: {
          // 这里可以添加其他主题配置
        }
      }}
    >
      <AntdApp>
        <StoreProvider>
          {children}
        </StoreProvider>
      </AntdApp>
    </ConfigProvider>
  );
} 