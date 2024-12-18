'use client';

import React, { useEffect, useState } from 'react';
import { Form, Input, Checkbox, App } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth';
import { authService } from '@/services/auth';
import type { ILoginParams } from '@/types/auth';
import { Button } from '@/components/common/Button';

export default function LoginForm() {
  const router = useRouter();
  const { message } = App.useApp();
  const { user, token, setUser, setToken, setLoading, setError } = useAuthStore();
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (token && user) {
      router.replace('/dashboard');
    }
  }, [token, user, router]);

  const handleLogin = async (values: ILoginParams & { remember: boolean }) => {
    try {
      setIsLoading(true);
      setLoading(true);
      setError(null);
      
      const { remember, ...loginParams } = values;
      const response = await authService.login(loginParams);
      
      setToken(response.token);
      setUser(response.user);

      if (remember) {
        localStorage.setItem('remember-credentials', JSON.stringify({
          email: values.email,
        }));
      } else {
        localStorage.removeItem('remember-credentials');
      }

      message.success('登录成功');
      
      setTimeout(() => {
        console.log('Redirecting to dashboard...');
        console.log('Current token:', response.token);
        console.log('Current user:', response.user);
        router.replace('/dashboard');
      }, 100);
    } catch (err) {
      const error = err as Error;
      setError(error.message);
      message.error(error.message || '登录失败');
    } finally {
      setIsLoading(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    try {
      const remembered = localStorage.getItem('remember-credentials');
      if (remembered) {
        const { email } = JSON.parse(remembered);
        form.setFieldsValue({ email, remember: true });
      }
    } catch (error) {
      console.error('Failed to load remembered credentials:', error);
    }
  }, [form]);

  return (
    <Form
      form={form}
      name="login"
      onFinish={handleLogin}
      autoComplete="off"
      layout="vertical"
      className="w-full"
      initialValues={{ remember: false }}
    >
      <Form.Item
        name="email"
        rules={[
          { required: true, message: '请输入邮箱' },
          { type: 'email', message: '请输入有效的邮箱地址' },
        ]}
      >
        <Input
          prefix={<UserOutlined />}
          placeholder="邮箱"
          size="large"
        />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[
          { required: true, message: '请输入密码' },
          { min: 6, message: '密码至少6个字符' },
        ]}
      >
        <Input.Password
          prefix={<LockOutlined />}
          placeholder="密码"
          size="large"
        />
      </Form.Item>

      <Form.Item>
        <div className="flex justify-between items-center">
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>记住我</Checkbox>
          </Form.Item>
          <Link href="/forgot-password" className="text-primary hover:text-blue-600 transition-colors">
            忘记密码？
          </Link>
        </div>
      </Form.Item>

      <Form.Item>
        <Button 
          type="primary" 
          htmlType="submit" 
          block 
          size="large"
          loading={isLoading}
        >
          登录
        </Button>
      </Form.Item>

      <div className="text-center">
        还没有账号？{' '}
        <Link href="/register" className="text-primary hover:text-blue-600 transition-colors">
          立即注册
        </Link>
      </div>
    </Form>
  );
} 