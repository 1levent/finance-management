import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from './providers';
import { siteConfig } from '@/config/site';
import './globals.css';
import 'antd/dist/reset.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#1677ff" />
        <style>{`
          .ant-btn {
            transition: all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
          }
          .ant-btn:active {
            transform: scale(0.98);
          }
          .ant-wave {
            position: absolute;
            background: transparent;
            pointer-events: none;
            box-sizing: border-box;
            color: var(--ant-primary-color);
          }
        `}</style>
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
} 