'use client';

import { Form, Input, Select, DatePicker, InputNumber, Button, Space, Modal } from 'antd';
import type { ITransaction, TransactionType, TransactionStatus } from '@/types/transaction';
import type { ReactNode } from 'react';

interface TransactionFormProps {
  record?: ITransaction | null;
  visible: boolean;
  onCancel: () => void;
  onSuccess: (values: any) => void;
}

export default function TransactionForm({
  record,
  visible,
  onCancel,
  onSuccess,
}: TransactionFormProps): ReactNode {
  const [form] = Form.useForm();

  const handleFinish = (values: any) => {
    // TODO: 后续实现保存功能
    onSuccess(values);
  };

  return (
    <Modal
      title={record ? '编辑记录' : '新增记录'}
      open={visible}
      onCancel={onCancel}
      footer={null}
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        initialValues={record || {
          type: 'expense',
          status: 'pending',
          currency: 'CNY',
        }}
      >
        <Form.Item
          name="type"
          label="类型"
          rules={[{ required: true, message: '请选择类型' }]}
        >
          <Select>
            <Select.Option value="income">收入</Select.Option>
            <Select.Option value="expense">支出</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="amount"
          label="金额"
          rules={[{ required: true, message: '请输入金额' }]}
        >
          <InputNumber
            style={{ width: '100%' }}
            precision={2}
            min={0}
            placeholder="请输入金额"
          />
        </Form.Item>

        <Form.Item
          name="date"
          label="日期"
          rules={[{ required: true, message: '请选择日期' }]}
        >
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          name="categoryId"
          label="分类"
          rules={[{ required: true, message: '请选择分类' }]}
        >
          <Select placeholder="请选择分类">
            <Select.Option value="1">工资</Select.Option>
            <Select.Option value="2">购物</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="description"
          label="描述"
          rules={[{ required: true, message: '请输入描述' }]}
        >
          <Input.TextArea rows={4} placeholder="请输入描述" />
        </Form.Item>

        <Form.Item
          name="status"
          label="状态"
          rules={[{ required: true, message: '请选择状态' }]}
        >
          <Select>
            <Select.Option value="completed">已完成</Select.Option>
            <Select.Option value="pending">待处理</Select.Option>
            <Select.Option value="cancelled">已取消</Select.Option>
          </Select>
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
    </Modal>
  );
} 