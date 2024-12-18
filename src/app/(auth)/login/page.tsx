'use client';

import Logo from '@/components/common/Logo';
import LoginForm from '@/components/features/auth/LoginForm';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="text-center mb-8">
            <div className="flex justify-center">
              <Logo />
            </div>
            <h2 className="mt-4 text-2xl font-bold text-gray-900">
              登录到系统
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              欢迎回来，请输入您的账号密码
            </p>
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  );
} 