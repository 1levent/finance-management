'use client';

import { useState } from 'react';
import { Form, Input, Button, Checkbox, Space, Divider, message, Row, Col, App } from 'antd';
import { UserOutlined, LockOutlined, MobileOutlined, WechatOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth';
import { authService } from '@/services/auth';
import { QRCodeCanvas } from 'qrcode.react';
import Logo from '@/components/common/Logo';

type LoginType = 'account' | 'mobile' | 'wechat';

interface ILoginForm {
  account?: string;
  password?: string;
  mobile?: string;
  verifyCode?: string;
  remember?: boolean;
}

export default function LoginForm() {
  const { message } = App.useApp();
  const [form] = Form.useForm();
  const router = useRouter();
  const { login } = useAuthStore();
  const [loginType, setLoginType] = useState<LoginType>('account');
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [qrCodeStatus, setQRCodeStatus] = useState<'ready' | 'scanning' | 'confirmed' | 'expired'>('ready');
  const [showQRCode, setShowQRCode] = useState(false);
  const [showMobileLogin, setShowMobileLogin] = useState(false);

  // 处理登录提交
  const handleSubmit = async (values: ILoginForm) => {
    try {
      setLoading(true);
      console.log('开始登录流程...', values);

      const response = await authService.login({
        account: values.account!,
        password: values.password!,
      });
      
      console.log('登录API响应:', response);
      
      login(response);
      console.log('Zustand store更新完成, token:', response.token);
      
      // 设置cookie
      document.cookie = `token=${response.token}; path=/`;
      console.log('Token已保存到cookie');
      
      message.success('登录成功');
      console.log('准备跳转到 dashboard...');
      
      // 使用 replace 而不是 push
      router.replace('/dashboard');
      console.log('路由replace执行完成');
      
      // 强制刷新路由
      router.refresh();
      console.log('路由refresh执行完成');
      
    } catch (error: any) {
      console.error('登录失败:', error);
      message.error(error.message || '登录失败');
    } finally {
      setLoading(false);
      console.log('登录流程结束');
    }
  };

  // 发送验证码
  const handleSendCode = async () => {
    try {
      const mobile = form.getFieldValue('mobile');
      if (!mobile) {
        message.error('请输入手机号');
        return;
      }
      
      await authService.sendVerifyCode(mobile);
      message.success('验证码已发送');
      
      // 开始倒计时
      setCountdown(60);
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (error: any) {
      message.error(error.message || '发送验证码失败');
    }
  };

  // 处理微信扫码状态变化
  const handleQRCodeStatusChange = (status: typeof qrCodeStatus) => {
    setQRCodeStatus(status);
    if (status === 'confirmed') {
      // TODO: 处理微信登录成功
      message.success('微信登录成功');
      router.push('/dashboard');
    }
  };

  const renderAccountLogin = () => (
    <Form form={form} onFinish={handleSubmit} className="w-80">
      <div className="text-center mb-8">
        <Logo size="large" className="justify-center mb-6" />
        <h2 className="text-lg font-medium text-gray-600">欢迎登录</h2>
      </div>

      <Form.Item
        name="account"
        rules={[{ required: true, message: '请输入账号' }]}
      >
        <Input 
          prefix={<UserOutlined className="text-gray-400" />}
          placeholder="邮箱/手机号" 
          size="large"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: '请输入密码' }]}
      >
        <Input.Password 
          prefix={<LockOutlined className="text-gray-400" />}
          placeholder="密码" 
          size="large"
        />
      </Form.Item>
      <Form.Item>
        <div className="flex justify-between items-center">
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>记住我</Checkbox>
          </Form.Item>
          <Link href="/forgot-password" className="text-primary hover:text-primary/80 text-sm">
            忘记密码？
          </Link>
        </div>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading} block size="large">
          登录
        </Button>
      </Form.Item>

      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-100"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 text-gray-400 bg-white text-xs">快捷登录</span>
          </div>
        </div>
        <div className="mt-4 flex justify-center space-x-8">
          <Button 
            type="text" 
            className="flex items-center !p-0 !h-auto"
            onClick={() => setShowMobileLogin(true)}
            style={{ boxShadow: 'none' }}
          >
            <MobileOutlined className="text-xl text-gray-600" />
          </Button>
          <Button 
            type="text" 
            className="flex items-center !p-0 !h-auto"
            onClick={() => setShowQRCode(true)}
            style={{ boxShadow: 'none' }}
          >
            <WechatOutlined className="text-xl text-[#07C160]" />
          </Button>
        </div>
      </div>

      <div className="mt-6 text-center text-sm">
        <span className="text-gray-500">还没有账号？</span>
        <Link href="/register" className="text-primary hover:text-primary/80 ml-1">
          立即注册
        </Link>
      </div>
    </Form>
  );

  const renderMobileLogin = () => (
    <div className="w-80">
      <div className="text-center mb-8">
        <Logo size="large" className="justify-center mb-6" />
        <div className="flex items-center justify-between">
          <Button 
            type="text"
            icon={<ArrowLeftOutlined />} 
            onClick={() => setShowMobileLogin(false)}
            className="text-gray-600 hover:text-primary"
          />
          <h3 className="text-lg font-medium m-0 flex-1">手机验证码登录</h3>
          <div className="w-8" /> {/* 用于平衡布局 */}
        </div>
      </div>

      <Form form={form} onFinish={handleSubmit}>
        <Form.Item
          name="mobile"
          rules={[
            { required: true, message: '请输入手机号' },
            { pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确' }
          ]}
        >
          <Input 
            prefix={<MobileOutlined className="text-gray-400" />}
            placeholder="请输入手机号" 
            size="large"
          />
        </Form.Item>
        
        <Form.Item>
          <div className="flex gap-3 w-full">
            <Form.Item
              name="verifyCode"
              noStyle
              rules={[{ required: true, message: '请输入验证码' }]}
            >
              <Input 
                placeholder="验证码" 
                size="large"
                className="flex-1"
              />
            </Form.Item>
            <Button
              size="large"
              disabled={countdown > 0}
              onClick={handleSendCode}
              style={{ width: '120px', flex: 'none' }}
            >
              {countdown > 0 ? `${countdown}s` : '获取验证码'}
            </Button>
          </div>
        </Form.Item>

        <Form.Item className="mb-4">
          <Button type="primary" htmlType="submit" loading={loading} block size="large">
            登录
          </Button>
        </Form.Item>

        <div className="text-center text-gray-500 text-sm">
          未注册的手机号验证后将自动创建账号
        </div>
      </Form>
    </div>
  );

  const renderWechatLogin = () => (
    <div className="w-80">
      <div className="text-center mb-8">
        <Logo size="large" className="justify-center mb-6" />
        <div className="flex items-center justify-between">
          <Button 
            type="text"
            icon={<ArrowLeftOutlined />} 
            onClick={() => setShowQRCode(false)}
            className="text-gray-600 hover:text-primary"
          />
          <h3 className="text-lg font-medium m-0 flex-1">微信扫码登录</h3>
          <div className="w-8" /> {/* 用于平衡布局 */}
        </div>
      </div>

      <div className="flex flex-col items-center">
        <div className="relative p-6 bg-[#f8f8f8] rounded-lg mb-6 inline-block">
          <QRCodeCanvas
            value="https://your-wechat-qr-code-url"
            size={180}
            level="H"
            includeMargin
          />
          {qrCodeStatus === 'expired' && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center rounded-lg">
              <div className="text-center">
                <div className="text-white mb-2">二维码已过期</div>
                <Button 
                  type="primary" 
                  ghost 
                  onClick={() => setQRCodeStatus('ready')}
                  className="border-white text-white hover:text-white"
                >
                  点击刷新
                </Button>
              </div>
            </div>
          )}
        </div>

        <div className="text-center space-y-3">
          <div className="flex items-center justify-center text-gray-600">
            <WechatOutlined className="text-[#07C160] mr-2 text-xl" />
            {qrCodeStatus === 'ready' && '请使用微信扫码登录'}
            {qrCodeStatus === 'scanning' && (
              <span className="text-blue-500">扫描成功，请在微信中确认</span>
            )}
            {qrCodeStatus === 'confirmed' && (
              <span className="text-green-500">登录成功，正在跳转...</span>
            )}
          </div>
          <div className="text-gray-400 text-sm">
            推荐使用微信扫码登录，更快更安全
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col items-center">
      {!showQRCode && !showMobileLogin && renderAccountLogin()}
      {showMobileLogin && renderMobileLogin()}
      {showQRCode && renderWechatLogin()}
    </div>
  );
} 