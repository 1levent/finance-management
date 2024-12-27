'use client';

import { useState } from 'react';
import { Form, Input, Button, App } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth';
import { authService } from '@/services/auth';
import Logo from '@/components/common/Logo';

interface IRegisterForm {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function RegisterForm() {
  const { message } = App.useApp();
  const [form] = Form.useForm();
  const router = useRouter();
  const { login } = useAuthStore();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: IRegisterForm) => {
    try {
      setLoading(true);
      const response = await authService.register({
        username: values.username,
        email: values.email,
        password: values.password,
      });
      
      login(response);
      document.cookie = `token=${response.token}; path=/`;
      message.success('注册成功');
      router.replace('/dashboard');
      
    } catch (error: any) {
      message.error(error.message || '注册失败');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <Form 
        form={form} 
        onFinish={handleSubmit} 
        className="w-80"
      >
        <div className="text-center mb-8">
          <Logo size="large" className="justify-center mb-6" />
          <h2 className="text-lg font-medium text-gray-600">创建新账号</h2>
        </div>

        <Form.Item
          name="username"
          rules={[
            { required: true, message: '请输入用户名' },
            { min: 3, message: '用户名至少3个字符' }
          ]}
        >
          <Input 
            prefix={<UserOutlined className="text-gray-400" />}
            placeholder="用户名" 
            size="large"
          />
        </Form.Item>

        <Form.Item
          name="email"
          rules={[
            { required: true, message: '请输入邮箱' },
            { type: 'email', message: '请输入有效的邮箱地址' }
          ]}
        >
          <Input 
            prefix={<MailOutlined className="text-gray-400" />}
            placeholder="邮箱" 
            size="large"
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            { required: true, message: '请输入密码' },
            { min: 6, message: '密码长度不能小于6位' }
          ]}
        >
          <Input.Password 
            prefix={<LockOutlined className="text-gray-400" />}
            placeholder="密码" 
            size="large"
          />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          dependencies={['password']}
          rules={[
            { required: true, message: '请确认密码' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('两次输入的密码不一致'));
              },
            }),
          ]}
        >
          <Input.Password 
            prefix={<LockOutlined className="text-gray-400" />}
            placeholder="确认密码" 
            size="large"
          />
        </Form.Item>

        <Form.Item className="mb-4">
          <Button 
            type="primary" 
            htmlType="submit" 
            loading={loading} 
            block 
            size="large"
          >
            注册
          </Button>
        </Form.Item>

        <div className="text-center text-sm">
          <span className="text-gray-500">已有账号？</span>
          <Link href="/login" className="text-primary hover:text-primary/80 ml-1">
            立即登录
          </Link>
        </div>
      </Form>
    </div>
  );
} 