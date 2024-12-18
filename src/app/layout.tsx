import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import AntdProvider from '@/components/providers/AntdProvider';
import RouteGuard from '@/components/auth/RouteGuard';
import { siteConfig } from '@/config/site';
import './globals.css';

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
      <body className={inter.className} suppressHydrationWarning>
        <AntdProvider>
          <RouteGuard>{children}</RouteGuard>
        </AntdProvider>
      </body>
    </html>
  );
} 