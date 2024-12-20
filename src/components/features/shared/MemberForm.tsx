'use client';

import { Form, Input, Select, Button, Space, Row, Col } from 'antd';
import type { ISharedMember } from '@/types/shared';

interface IMemberFormProps {
  initialValues?: Partial<ISharedMember>;
  onSubmit: (values: ISharedMember) => void;
  onCancel: () => void;
}

const roleOptions = [
  { label: '所有者', value: 'owner' },
  { label: '管理员', value: 'admin' },
  { label: '成员', value: 'member' },
  { label: '观察者', value: 'viewer' },
];

const statusOptions = [
  { label: '活跃', value: 'active' },
  { label: '未活跃', value: 'inactive' },
  { label: '待确认', value: 'pending' },
];

export default function MemberForm({ 
  initialValues, 
  onSubmit, 
  onCancel 
}: IMemberFormProps) {
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      // 添加默认值
      const formattedValues = {
        ...values,
        id: initialValues?.id || `member_${Date.now()}`,
        userId: values.userId || `user_${Date.now()}`,
        joinDate: initialValues?.joinDate || new Date().toISOString(),
        lastActiveDate: new Date().toISOString(),
        contribution: initialValues?.contribution || 0,
      };
      onSubmit(formattedValues as ISharedMember);
    } catch (error) {
      console.error('表单验证失败:', error);
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{
        ...initialValues,
        status: initialValues?.status || 'active',
        role: initialValues?.role || 'member',
      }}
      onFinish={handleSubmit}
    >
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="username"
            label="用户名"
            rules={[{ required: true, message: '请输入用户名' }]}
          >
            <Input placeholder="请输入用户名" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="role"
            label="角色"
            rules={[{ required: true, message: '请选择角色' }]}
          >
            <Select
              options={roleOptions}
              placeholder="请选择角色"
              disabled={initialValues?.role === 'owner'}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="status"
            label="状态"
            rules={[{ required: true, message: '请选择状态' }]}
          >
            <Select
              options={statusOptions}
              placeholder="请选择状态"
              disabled={initialValues?.role === 'owner'}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="email"
            label="邮箱"
            rules={[
              { type: 'email', message: '请输入有效的邮箱地址' },
              { required: true, message: '请输入邮箱' },
            ]}
          >
            <Input placeholder="请输入邮箱" />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        name="remark"
        label="备注"
      >
        <Input.TextArea rows={3} placeholder="请输入备注" />
      </Form.Item>

      <Form.Item className="mb-0">
        <Space className="w-full justify-end">
          <Button onClick={onCancel}>取消</Button>
          <Button type="primary" htmlType="submit">
            确定
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
} 