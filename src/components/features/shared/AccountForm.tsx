'use client';

import { Form, Input, InputNumber, Select, Button, Space, Row, Col } from 'antd';
import type { ISharedAccount } from '@/types/shared';

interface IAccountFormProps {
  initialValues?: Partial<ISharedAccount>;
  onSubmit: (values: ISharedAccount) => void;
  onCancel: () => void;
}

const currencyOptions = [
  { label: '人民币 (CNY)', value: 'CNY' },
  { label: '美元 (USD)', value: 'USD' },
  { label: '欧元 (EUR)', value: 'EUR' },
  { label: '日元 (JPY)', value: 'JPY' },
  { label: '港币 (HKD)', value: 'HKD' },
];

export default function AccountForm({ 
  initialValues, 
  onSubmit, 
  onCancel 
}: IAccountFormProps) {
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      // 添加默认值
      const formattedValues = {
        ...values,
        createdBy: 'user1',  // 当前用户ID
        createdAt: new Date().toISOString(),
        members: [
          { userId: 'user1', username: '当前用户', role: 'owner' },
        ],
      };
      onSubmit(formattedValues as ISharedAccount);
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
        currency: initialValues?.currency || 'CNY',
      }}
      onFinish={handleSubmit}
    >
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="name"
            label="账户名称"
            rules={[{ required: true, message: '请输入账户名称' }]}
          >
            <Input placeholder="请输入账户名称" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="currency"
            label="币种"
            rules={[{ required: true, message: '请选择币种' }]}
          >
            <Select options={currencyOptions} placeholder="请选择币种" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="balance"
            label="初始余额"
            rules={[
              { required: true, message: '请输入初始余额' },
              { type: 'number', min: 0, message: '金额不能为负数' },
            ]}
          >
            <InputNumber
              className="w-full"
              prefix="¥"
              placeholder="请输入初始余额"
              step={100}
            />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        name="description"
        label="账户描述"
      >
        <Input.TextArea rows={4} placeholder="请输入账户描述" />
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