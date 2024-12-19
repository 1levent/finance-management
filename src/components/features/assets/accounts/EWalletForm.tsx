'use client';

import { Form, Input, Select, Button, Space, InputNumber, Row, Col } from 'antd';
import type { IEWallet } from '@/types/assets';

interface IEWalletFormProps {
  initialValues?: Partial<IEWallet>;
  onSubmit: (values: IEWallet) => void;
  onCancel: () => void;
}

const walletTypes = [
  { label: '支付宝', value: 'alipay' },
  { label: '微信支付', value: 'wechat' },
  { label: '其他', value: 'other' },
];

const statusOptions = [
  { label: '正常', value: 'active' },
  { label: '停用', value: 'inactive' },
];

export default function EWalletForm({ initialValues, onSubmit, onCancel }: IEWalletFormProps) {
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
        name="name"
        label="钱包名称"
        rules={[{ required: true, message: '请输入钱包名称' }]}
      >
        <Input placeholder="请输入钱包名称" />
      </Form.Item>

      <Form.Item
        name="type"
        label="钱包类型"
        rules={[{ required: true, message: '请选择钱包类型' }]}
      >
        <Select options={walletTypes} placeholder="请选择钱包类型" />
      </Form.Item>

      <Form.Item
        name="accountId"
        label="账号"
        rules={[{ required: true, message: '请输入账号' }]}
      >
        <Input placeholder="请输入账号(手机号/邮箱)" />
      </Form.Item>

      <Form.Item
        name="balance"
        label="余额"
        rules={[
          { required: true, message: '请输入余额' },
          { type: 'number', min: 0, message: '余额不能为负数' },
        ]}
      >
        <InputNumber
          className="w-full"
          prefix="¥"
          placeholder="请输入余额"
          step={100}
        />
      </Form.Item>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="dailyLimit"
            label="日限额"
            rules={[
              { required: true, message: '请输入日限额' },
              { type: 'number', min: 0, message: '限额不能为负数' },
            ]}
          >
            <InputNumber
              className="w-full"
              prefix="¥"
              placeholder="请输入日限额"
              step={1000}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="monthlyLimit"
            label="月限额"
            rules={[
              { required: true, message: '请输入月限额' },
              { type: 'number', min: 0, message: '限额不能为负数' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('dailyLimit') * 31 >= value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('月限额不能小于日限额×31'));
                },
              }),
            ]}
          >
            <InputNumber
              className="w-full"
              prefix="¥"
              placeholder="请输入月限额"
              step={5000}
            />
          </Form.Item>
        </Col>
      </Row>

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