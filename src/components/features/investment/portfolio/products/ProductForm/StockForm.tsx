'use client';

import { Form, Input, InputNumber, Select } from 'antd';
import type { FormInstance } from 'antd/es/form';
import type { IStockProduct } from '@/types/investment';

interface IStockFormProps {
  form: FormInstance;
  record?: IStockProduct;
}

const marketOptions = [
  { label: '上海', value: 'SH' },
  { label: '深圳', value: 'SZ' },
  { label: '港股', value: 'HK' },
  { label: '美股', value: 'US' },
];

export default function StockForm({ form, record }: IStockFormProps) {
  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{
        type: 'stock',
        status: 'holding',
        ...record,
      }}
    >
      <Form.Item
        name="code"
        label="股票代码"
        rules={[{ required: true, message: '请输入股票代码' }]}
      >
        <Input placeholder="请输入股票代码" />
      </Form.Item>

      <Form.Item
        name="name"
        label="股票名称"
        rules={[{ required: true, message: '请输入股票名称' }]}
      >
        <Input placeholder="请输入股票名称" />
      </Form.Item>

      <Form.Item
        name="market"
        label="交易市场"
        rules={[{ required: true, message: '请选择交易市场' }]}
      >
        <Select options={marketOptions} placeholder="请选择交易市场" />
      </Form.Item>

      <Form.Item
        name="holdingAmount"
        label="持仓数量"
        rules={[{ required: true, message: '请输入持仓数量' }]}
      >
        <InputNumber
          style={{ width: '100%' }}
          min={0}
          precision={0}
          placeholder="请输入持仓数量"
        />
      </Form.Item>

      <Form.Item
        name="costPrice"
        label="成本价"
        rules={[{ required: true, message: '请输入成本价' }]}
      >
        <InputNumber
          style={{ width: '100%' }}
          min={0}
          precision={3}
          placeholder="请输入成本价"
        />
      </Form.Item>

      <Form.Item
        name="currentPrice"
        label="当前价"
        rules={[{ required: true, message: '请输入当前价' }]}
      >
        <InputNumber
          style={{ width: '100%' }}
          min={0}
          precision={3}
          placeholder="请输入当前价"
        />
      </Form.Item>

      <Form.Item
        name="status"
        label="状态"
        rules={[{ required: true, message: '请选择状态' }]}
      >
        <Select
          options={[
            { label: '持仓', value: 'holding' },
            { label: '关注', value: 'watching' },
          ]}
          placeholder="请选择状态"
        />
      </Form.Item>

      <Form.Item
        name="remarks"
        label="备注"
      >
        <Input.TextArea rows={4} placeholder="请输入备注" />
      </Form.Item>
    </Form>
  );
} 