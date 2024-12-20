'use client';

import { Card, Form, Select, Switch, Radio, ColorPicker, Space, Button, message } from 'antd';
import type { Color } from 'antd/es/color-picker';

export default function PreferencePage() {
  const handleSubmit = (values: any) => {
    try {
      // TODO: 调用 API 保存偏好设置
      message.success('偏好设置保存成功');
    } catch (error) {
      message.error('保存失败，请重试');
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Form
        layout="vertical"
        initialValues={{
          language: 'zh_CN',
          theme: 'light',
          currency: 'CNY',
          notification: true,
          primaryColor: '#1677ff',
        }}
        onFinish={handleSubmit}
      >
        <Form.Item name="language" label="语言">
          <Select>
            <Select.Option value="zh_CN">简体中文</Select.Option>
            <Select.Option value="en_US">English</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item name="theme" label="主题">
          <Radio.Group>
            <Radio value="light">浅色</Radio>
            <Radio value="dark">深色</Radio>
            <Radio value="system">跟随系统</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item name="currency" label="默认货币">
          <Select>
            <Select.Option value="CNY">人民币 (¥)</Select.Option>
            <Select.Option value="USD">美元 ($)</Select.Option>
            <Select.Option value="EUR">欧元 (€)</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item name="notification" label="消息通知" valuePropName="checked">
          <Switch />
        </Form.Item>

        <Form.Item name="primaryColor" label="主题色">
          <ColorPicker />
        </Form.Item>

        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit">
              保存设置
            </Button>
            <Button onClick={() => window.location.reload()}>
              恢复默认
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
} 