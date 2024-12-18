'use client';

import { Form, Input, Button, App, Checkbox } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth';
import { authService } from '@/services/auth';

interface IRegisterForm {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreement: boolean;
}

export default function RegisterForm() {
  const router = useRouter();
  const { message } = App.useApp();
  const { setUser, setToken, setLoading, setError } = useAuthStore();
  const [form] = Form.useForm();

  const handleRegister = async (values: IRegisterForm) => {
    try {
      setLoading(true);
      setError(null);

      const { agreement, confirmPassword, ...registerParams } = values;
      const response = await authService.register(registerParams);

      setToken(response.token);
      setUser(response.user);

      message.success('注册成功');
      router.replace('/dashboard');
    } catch (err) {
      const error = err as Error;
      setError(error.message);
      message.error(error.message || '注册失败');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      form={form}
      name="register"
      onFinish={handleRegister}
      autoComplete="off"
      layout="vertical"
      className="w-full"
      initialValues={{ agreement: false }}
    >
      <Form.Item
        name="username"
        rules={[
          { required: true, message: '请输入用户名' },
          { min: 3, message: '用户名至少3个字符' },
        ]}
      >
        <Input
          prefix={<UserOutlined />}
          placeholder="用户名"
          size="large"
        />
      </Form.Item>

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
          prefix={<LockOutlined />}
          placeholder="确认密码"
          size="large"
        />
      </Form.Item>

      <Form.Item
        name="agreement"
        valuePropName="checked"
        rules={[
          {
            validator: (_, value) =>
              value
                ? Promise.resolve()
                : Promise.reject(new Error('请阅读并同意用户协议')),
          },
        ]}
      >
        <Checkbox>
          我已阅读并同意
          <Link href="/terms" className="text-primary hover:text-blue-600 transition-colors">
            用户协议
          </Link>
        </Checkbox>
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          block
          size="large"
        >
          注册
        </Button>
      </Form.Item>

      <div className="text-center">
        已有账号？{' '}
        <Link href="/login" className="text-primary hover:text-blue-600 transition-colors">
          立即登录
        </Link>
      </div>
    </Form>
  );
} 