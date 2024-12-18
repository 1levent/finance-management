'use client';

import ForgotPasswordForm from '@/components/features/auth/ForgotPasswordForm';
import AuthLayout from '@/components/layout/AuthLayout';

export default function ForgotPasswordPage() {
  return (
    <AuthLayout title="忘记密码">
      <ForgotPasswordForm />
    </AuthLayout>
  );
} 