'use client';

import { Form, Input, Select, DatePicker, InputNumber, Space, Modal } from 'antd';
import { useState } from 'react';
import type { IDividend } from '@/types/investment';
import dayjs from 'dayjs';

interface IDividendFormProps {
  visible: boolean;
  record?: IDividend | null;
  onCancel: () => void;
  onSuccess: () => void;
}

export default function DividendForm({ visible, record, onCancel, onSuccess }: IDividendFormProps) {
  const [form] = Form.useForm();
  const [dividendType, setDividendType] = useState(record?.dividendType || 'cash');

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      console.log('表单数据:', values);
      onSuccess();
    } catch (error) {
      console.error('表单验证失败:', error);
    }
  };

  return (
    <Modal
      title={record ? '编辑分红' : '新增分红'}
      open={visible}
      onCancel={onCancel}
      onOk={handleSubmit}
      width={600}
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          dividendType: 'cash',
          productType: 'stock',
          ...record,
          date: record?.date ? dayjs(record.date) : undefined,
        }}
        onValuesChange={(changedValues) => {
          if (changedValues.dividendType) {
            setDividendType(changedValues.dividendType);
          }
        }}
      >
        <Form.Item
          name="date"
          label="分红日期"
          rules={[{ required: true, message: '请选择分红日期' }]}
        >
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          name="productType"
          label="产品类型"
          rules={[{ required: true, message: '请选择产品类型' }]}
        >
          <Select
            options={[
              { label: '股票', value: 'stock' },
              { label: '基金', value: 'fund' },
              { label: '债券', value: 'bond' },
            ]}
          />
        </Form.Item>

        <Form.Item
          name="productName"
          label="产品名称"
          rules={[{ required: true, message: '请输入产品名称' }]}
        >
          <Input placeholder="请输入产品名称" />
        </Form.Item>

        <Form.Item
          name="dividendType"
          label="分红类型"
          rules={[{ required: true, message: '请选择分红类型' }]}
        >
          <Select
            options={[
              { label: '现金分红', value: 'cash' },
              { label: '送股', value: 'stock' },
              { label: '配股', value: 'rights' },
            ]}
          />
        </Form.Item>

        {dividendType === 'cash' && (
          <Space style={{ width: '100%' }} size="middle">
            <Form.Item
              name="amount"
              label="分红金额"
              rules={[{ required: true, message: '请输入分红金额' }]}
              style={{ width: '100%' }}
            >
              <InputNumber
                style={{ width: '100%' }}
                min={0}
                precision={2}
                placeholder="请输入分红金额"
              />
            </Form.Item>

            <Form.Item
              name="tax"
              label="税费"
              style={{ width: '100%' }}
            >
              <InputNumber
                style={{ width: '100%' }}
                min={0}
                precision={2}
                placeholder="请输入税费"
              />
            </Form.Item>
          </Space>
        )}

        {(dividendType === 'stock' || dividendType === 'rights') && (
          <Space style={{ width: '100%' }} size="middle">
            <Form.Item
              name="shares"
              label="股数"
              rules={[{ required: true, message: '请输入股数' }]}
              style={{ width: '100%' }}
            >
              <InputNumber
                style={{ width: '100%' }}
                min={0}
                precision={0}
                placeholder="请输入股数"
              />
            </Form.Item>

            <Form.Item
              name="price"
              label="价格"
              rules={[{ required: true, message: '请输入价格' }]}
              style={{ width: '100%' }}
            >
              <InputNumber
                style={{ width: '100%' }}
                min={0}
                precision={3}
                placeholder="请输入价格"
              />
            </Form.Item>
          </Space>
        )}

        <Form.Item
          name="remarks"
          label="备注"
        >
          <Input.TextArea rows={4} placeholder="请输入备注" />
        </Form.Item>
      </Form>
    </Modal>
  );
} 