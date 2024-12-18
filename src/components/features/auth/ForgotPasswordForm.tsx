'use client';

import { Form, Input, Button, App } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import Link from 'next/link';

interface IForgotPasswordForm {
  email: string;
}

export default function ForgotPasswordForm() {
  const { message } = App.useApp();
  const [form] = Form.useForm();

  const handleSubmit = async (values: IForgotPasswordForm) => {
    try {
      // TODO: 实现忘记密码逻辑
      message.success('重置密码链接已发送到您的邮箱');
    } catch (error) {
      message.error('发送重置密码链接失败');
    }
  };

  return (
    <Form
      form={form}
      name="forgot-password"
      onFinish={handleSubmit}
      layout="vertical"
      className="w-full"
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
        <Button
          type="primary"
          htmlType="submit"
          block
          size="large"
        >
          发送重置链接
        </Button>
      </Form.Item>

      <div className="text-center">
        <Link href="/login" className="text-primary hover:text-blue-600 transition-colors">
          返回登录
        </Link>
      </div>
    </Form>
  );
} 