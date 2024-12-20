'use client';

import { Card, Form, Input, Button, List, Switch, message } from 'antd';
import { LockOutlined, SafetyCertificateOutlined } from '@ant-design/icons';

export default function SecurityPage() {
  const [form] = Form.useForm();

  const handlePasswordChange = async (values: any) => {
    try {
      // TODO: 调用 API 修改密码
      message.success('密码修改成功');
      form.resetFields();
    } catch (error) {
      message.error('修改失败，请重试');
    }
  };

  const securityItems = [
    {
      title: '双因素认证',
      description: '开启后，登录时需要输入手机验证码',
      action: <Switch />,
    },
    {
      title: '登录通知',
      description: '开启后，异地登录时将发送通知',
      action: <Switch defaultChecked />,
    },
    {
      title: '异常登录保护',
      description: '开启后，检测到异常登录行为时将阻止登录',
      action: <Switch defaultChecked />,
    },
  ];

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div>
        <h3 className="text-lg font-medium mb-4">修改密码</h3>
        <Form
          form={form}
          layout="vertical"
          onFinish={handlePasswordChange}
        >
          <Form.Item
            name="oldPassword"
            label="当前密码"
            rules={[{ required: true, message: '请输入当前密码' }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="请输入当前密码" />
          </Form.Item>

          <Form.Item
            name="newPassword"
            label="新密码"
            rules={[
              { required: true, message: '请输入新密码' },
              { min: 8, message: '密码长度不能小于8位' },
            ]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="请输入新密码" />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label="确认新密码"
            dependencies={['newPassword']}
            rules={[
              { required: true, message: '请确认新密码' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('两次输入的密码不一致'));
                },
              }),
            ]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="请确认新密码" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              修改密码
            </Button>
          </Form.Item>
        </Form>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">安全设置</h3>
        <List
          itemLayout="horizontal"
          dataSource={securityItems}
          renderItem={item => (
            <List.Item
              actions={[item.action]}
            >
              <List.Item.Meta
                avatar={<SafetyCertificateOutlined className="text-xl text-blue-500" />}
                title={item.title}
                description={item.description}
              />
            </List.Item>
          )}
        />
      </div>
    </div>
  );
} 