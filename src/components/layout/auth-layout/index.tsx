'use client';

import Logo from '@/components/common/Logo';
import { Card } from 'antd';
import { motion } from 'framer-motion';

interface IAuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: IAuthLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-xl border-0">
          <div className="text-center mb-8">
            <div className="flex justify-center">
              <Logo size="large" />
            </div>
            <h2 className="mt-6 text-2xl font-bold text-gray-900">
              登录到系统
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              欢迎回来，请输入您的账号密码
            </p>
          </div>
          {children}
        </Card>
      </motion.div>
    </div>
  );
} 