'use client';

import { Form, Input, Select, DatePicker, InputNumber, Space, Modal } from 'antd';
import { useState, useEffect } from 'react';
import type { ITrade } from '@/types/investment';
import dayjs from 'dayjs';

interface ITradeFormProps {
  visible: boolean;
  record?: ITrade | null;
  onCancel: () => void;
  onSuccess: () => void;
}

export default function TradeForm({ visible, record, onCancel, onSuccess }: ITradeFormProps) {
  const [form] = Form.useForm();
  const [calculating, setCalculating] = useState(false);

  // 计算总金额
  const calculateTotal = () => {
    const amount = form.getFieldValue('amount') || 0;
    const price = form.getFieldValue('price') || 0;
    const fee = form.getFieldValue('fee') || 0;
    const type = form.getFieldValue('type');
    
    const total = type === 'buy' 
      ? amount * price + fee 
      : amount * price - fee;
    
    form.setFieldValue('total', total);
  };

  // 监听数量、价格、手续费的变化
  useEffect(() => {
    if (!calculating) {
      calculateTotal();
    }
  }, [form.getFieldValue('amount'), form.getFieldValue('price'), form.getFieldValue('fee')]);

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
      title={record ? '编辑交易' : '新增交易'}
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
          type: 'buy',
          productType: 'stock',
          ...record,
          date: record?.date ? dayjs(record.date) : undefined,
        }}
        onValuesChange={(changedValues) => {
          if (changedValues.type) {
            calculateTotal();
          }
        }}
      >
        <Form.Item
          name="date"
          label="交易日期"
          rules={[{ required: true, message: '请选择交易日期' }]}
        >
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          name="type"
          label="交易类型"
          rules={[{ required: true, message: '请选择交易类型' }]}
        >
          <Select
            options={[
              { label: '买入', value: 'buy' },
              { label: '卖出', value: 'sell' },
            ]}
          />
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
              { label: '其他', value: 'other' },
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

        <Space style={{ width: '100%' }} size="middle">
          <Form.Item
            name="amount"
            label="数量"
            rules={[{ required: true, message: '请输入数量' }]}
            style={{ width: '100%' }}
          >
            <InputNumber
              style={{ width: '100%' }}
              min={0}
              precision={0}
              placeholder="请输入数量"
              onChange={() => {
                setCalculating(true);
                calculateTotal();
                setCalculating(false);
              }}
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
              onChange={() => {
                setCalculating(true);
                calculateTotal();
                setCalculating(false);
              }}
            />
          </Form.Item>
        </Space>

        <Space style={{ width: '100%' }} size="middle">
          <Form.Item
            name="fee"
            label="手续费"
            rules={[{ required: true, message: '请输入手续费' }]}
            style={{ width: '100%' }}
          >
            <InputNumber
              style={{ width: '100%' }}
              min={0}
              precision={2}
              placeholder="请输入手续费"
              onChange={() => {
                setCalculating(true);
                calculateTotal();
                setCalculating(false);
              }}
            />
          </Form.Item>

          <Form.Item
            name="total"
            label="总金额"
            style={{ width: '100%' }}
          >
            <InputNumber
              style={{ width: '100%' }}
              precision={2}
              disabled
              placeholder="自动计算"
            />
          </Form.Item>
        </Space>

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