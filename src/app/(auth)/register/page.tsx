'use client';

import RegisterForm from '@/components/features/auth/RegisterForm';
import AuthLayout from '@/components/layout/AuthLayout';

export default function RegisterPage() {
  return (
    <AuthLayout title="注册账号">
      <RegisterForm />
    </AuthLayout>
  );
} 