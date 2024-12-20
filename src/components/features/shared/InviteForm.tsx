'use client';

import { Form, Input, Select, Button, Space, Row, Col, DatePicker } from 'antd';
import type { ISharedInvite } from '@/types/shared';
import dayjs from 'dayjs';

interface IInviteFormProps {
  onSubmit: (values: ISharedInvite) => void;
  onCancel: () => void;
}

const roleOptions = [
  { label: '管理员', value: 'admin' },
  { label: '成员', value: 'member' },
  { label: '观察者', value: 'viewer' },
];

export default function InviteForm({ 
  onSubmit, 
  onCancel 
}: IInviteFormProps) {
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      // 添加默认值
      const formattedValues = {
        ...values,
        id: `invite_${Date.now()}`,
        inviterId: 'user1',  // 当前用户ID
        inviterName: '当前用户',  // 当前用户名
        status: 'pending',
        createdAt: new Date().toISOString(),
        expiredAt: values.expiredAt.format('YYYY-MM-DD'),
      };
      onSubmit(formattedValues as ISharedInvite);
    } catch (error) {
      console.error('表单验证失败:', error);
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{
        role: 'member',
        expiredAt: dayjs().add(7, 'day'),  // 默认7天后过期
      }}
      onFinish={handleSubmit}
    >
      <Row gutter={16}>
        <Col span={16}>
          <Form.Item
            name="email"
            label="邮箱"
            rules={[
              { required: true, message: '请输入邮箱' },
              { type: 'email', message: '请输入有效的邮箱地址' },
            ]}
          >
            <Input placeholder="请输入邮箱" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name="role"
            label="角色"
            rules={[{ required: true, message: '请选择角色' }]}
          >
            <Select options={roleOptions} placeholder="请选择角色" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="expiredAt"
            label="过期时间"
            rules={[{ required: true, message: '请选择过期时间' }]}
          >
            <DatePicker
              className="w-full"
              disabledDate={(current) => {
                return current && current < dayjs().endOf('day');
              }}
            />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        name="message"
        label="邀请消息"
      >
        <Input.TextArea
          rows={3}
          placeholder="请输入邀请消息（可选）"
          maxLength={200}
          showCount
        />
      </Form.Item>

      <Form.Item className="mb-0">
        <Space className="w-full justify-end">
          <Button onClick={onCancel}>取消</Button>
          <Button type="primary" htmlType="submit">
            发送邀请
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
} 