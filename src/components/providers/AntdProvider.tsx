'use client';

import { App, ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import { siteConfig } from '@/config/site';

interface IAntdProviderProps {
  children: React.ReactNode;
}

export default function AntdProvider({ children }: IAntdProviderProps) {
  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
        token: {
          colorPrimary: siteConfig.theme.colorPrimary,
          borderRadius: siteConfig.theme.borderRadius,
        }
      }}
    >
      <App>{children}</App>
    </ConfigProvider>
  );
} 