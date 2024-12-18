'use client';

import { Card } from 'antd';
import Logo from '@/components/common/Logo';

interface IAuthLayoutProps {
  children: React.ReactNode;
  title: string;
}

export default function AuthLayout({ children, title }: IAuthLayoutProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <div className="flex flex-col items-center">
          <Logo className="mb-8" />
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {title}
          </h2>
          {children}
        </div>
      </Card>
    </div>
  );
} 