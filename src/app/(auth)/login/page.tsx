'use client';

import LoginForm from '@/components/features/auth/LoginForm';
import AuthLayout from '@/components/layout/auth-layout';

export default function LoginPage() {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
} 