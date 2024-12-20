'use client';

import { Card, Form, Input, Button, Upload, Avatar, message } from 'antd';
import { UserOutlined, MailOutlined, PhoneOutlined, UploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import type { RcFile } from 'antd/es/upload/interface';
import React from 'react';

const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('只能上传 JPG/PNG 格式的图片!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('图片大小不能超过 2MB!');
  }
  return isJpgOrPng && isLt2M;
};

const ProfilePage: React.FC = () => {
  const [form] = Form.useForm();

  const handleSubmit = async (values: any) => {
    try {
      // TODO: 调用 API 更新个人信息
      message.success('个人信息更新成功');
    } catch (error) {
      message.error('更新失败，请重试');
    }
  };

  const uploadProps: UploadProps = {
    name: 'avatar',
    showUploadList: false,
    beforeUpload,
    onChange(info) {
      if (info.file.status === 'done') {
        message.success('头像上传成功');
      } else if (info.file.status === 'error') {
        message.error('头像上传失败');
      }
    },
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex justify-center mb-8">
        <Upload {...uploadProps}>
          <div className="text-center">
            <Avatar size={100} icon={<UserOutlined />} className="mb-2" />
            <div>
              <Button icon={<UploadOutlined />}>更换头像</Button>
            </div>
          </div>
        </Upload>
      </div>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          nickname: '张三',
          email: 'zhangsan@example.com',
          phone: '13800138000',
        }}
      >
        <Form.Item
          name="nickname"
          label="昵称"
          rules={[{ required: true, message: '请输入昵称' }]}
        >
          <Input prefix={<UserOutlined />} placeholder="请输入昵称" />
        </Form.Item>

        <Form.Item
          name="email"
          label="邮箱"
          rules={[
            { required: true, message: '请输入邮箱' },
            { type: 'email', message: '请输入有效的邮箱地址' },
          ]}
        >
          <Input prefix={<MailOutlined />} placeholder="请输入邮箱" />
        </Form.Item>

        <Form.Item
          name="phone"
          label="手机号"
          rules={[
            { required: true, message: '请输入手机号' },
            { pattern: /^1\d{10}$/, message: '请输入有效的手机号' },
          ]}
        >
          <Input prefix={<PhoneOutlined />} placeholder="请输入手机号" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            保存修改
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ProfilePage; 