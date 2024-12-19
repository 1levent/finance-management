'use client';

import { Form, Input, Select, Button, Space } from 'antd';
import type { IBankAccount } from '@/types/assets';

interface IBankAccountFormProps {
  initialValues?: Partial<IBankAccount>;
  onSubmit: (values: IBankAccount) => void;
  onCancel: () => void;
}

const bankList = [
  { label: '工商银行', value: '工商银行' },
  { label: '建设银行', value: '建设银行' },
  { label: '农业银行', value: '农业银行' },
  { label: '中国银行', value: '中国银行' },
  { label: '交通银行', value: '交通银行' },
];

const accountTypes = [
  { label: '储蓄账户', value: 'savings' },
  { label: '活期账户', value: 'checking' },
  { label: '定期账户', value: 'deposit' },
];

const statusOptions = [
  { label: '正常', value: 'active' },
  { label: '冻结', value: 'inactive' },
];

export default function BankAccountForm({ initialValues, onSubmit, onCancel }: IBankAccountFormProps) {
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      onSubmit(values);
    } catch (error) {
      console.error('表单验证失败:', error);
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={initialValues}
      onFinish={handleSubmit}
    >
      <Form.Item
        name="bankName"
        label="开户行"
        rules={[{ required: true, message: '请选择开户行' }]}
      >
        <Select options={bankList} placeholder="请选择开户行" />
      </Form.Item>

      <Form.Item
        name="accountType"
        label="账户类型"
        rules={[{ required: true, message: '请选择账户类型' }]}
      >
        <Select options={accountTypes} placeholder="请选择账户类型" />
      </Form.Item>

      <Form.Item
        name="accountNumber"
        label="账号"
        rules={[
          { required: true, message: '请输入账号' },
          { pattern: /^\d{16,19}$/, message: '请输入16-19位数字的账号' },
        ]}
      >
        <Input placeholder="请输入账号" maxLength={19} />
      </Form.Item>

      <Form.Item
        name="balance"
        label="余额"
        rules={[
          { required: true, message: '请输入余额' },
          { type: 'number', min: 0, message: '余额不能为负数' },
        ]}
      >
        <Input
          type="number"
          prefix="¥"
          placeholder="请输入余额"
          step={0.01}
        />
      </Form.Item>

      <Form.Item
        name="status"
        label="状态"
        rules={[{ required: true, message: '请选择状态' }]}
      >
        <Select options={statusOptions} placeholder="请选择状态" />
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