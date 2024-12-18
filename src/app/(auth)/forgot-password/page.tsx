'use client';

import { Form, Input, Button, message } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import Link from 'next/link';
import Logo from '@/components/common/Logo';

export default function ForgotPasswordPage() {
  const handleSubmit = async (values: { email: string }) => {
    try {
      // TODO: 实现发送重置密码邮件的功能
      message.success('重置密码链接已发送到您的邮箱');
    } catch (error) {
      message.error('发送重置密码邮件失败');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="text-center mb-8">
            <div className="flex justify-center">
              <Logo />
            </div>
            <h2 className="mt-4 text-2xl font-bold text-gray-900">
              重置密码
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              输入您的邮箱，我们将向您发送重置密码的链接
            </p>
          </div>

          <Form
            name="forgot-password"
            onFinish={handleSubmit}
            layout="vertical"
          >
            <Form.Item
              name="email"
              rules={[
                { required: true, message: '请输入邮箱' },
                { type: 'email', message: '请输入有效的邮箱地址' },
              ]}
            >
              <Input
                prefix={<MailOutlined />}
                placeholder="邮箱"
                size="large"
              />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block size="large">
                发送重置链接
              </Button>
            </Form.Item>

            <div className="text-center">
              <Link href="/login" className="text-primary hover:text-blue-600 transition-colors">
                返回登录
              </Link>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
} 