'use client';

import { Form, Input, InputNumber, Select, DatePicker } from 'antd';
import type { FormInstance } from 'antd/es/form';
import type { IBondProduct } from '@/types/investment';
import dayjs from 'dayjs';

interface IBondFormProps {
  form: FormInstance;
  record?: IBondProduct;
}

const bondTypeOptions = [
  { label: '国债', value: 'treasury' },
  { label: '企业债', value: 'corporate' },
  { label: '可转债', value: 'convertible' },
  { label: '回购', value: 'repo' },
  { label: '其他', value: 'other' },
];

export default function BondForm({ form, record }: IBondFormProps) {
  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{
        type: 'bond',
        status: 'holding',
        ...record,
        maturityDate: record?.maturityDate ? dayjs(record.maturityDate) : undefined,
      }}
    >
      <Form.Item
        name="code"
        label="债券代码"
        rules={[{ required: true, message: '请输入债券代码' }]}
      >
        <Input placeholder="请输入债券代码" />
      </Form.Item>

      <Form.Item
        name="name"
        label="债券名称"
        rules={[{ required: true, message: '请输入债券名称' }]}
      >
        <Input placeholder="请输入债券名称" />
      </Form.Item>

      <Form.Item
        name="bondType"
        label="债券类型"
        rules={[{ required: true, message: '请选择债券类型' }]}
      >
        <Select options={bondTypeOptions} placeholder="请选择债券类型" />
      </Form.Item>

      <Form.Item
        name="parValue"
        label="面值"
        rules={[{ required: true, message: '请输入面值' }]}
      >
        <InputNumber
          style={{ width: '100%' }}
          min={0}
          precision={2}
          placeholder="请输入面值"
        />
      </Form.Item>

      <Form.Item
        name="couponRate"
        label="票面利率"
        rules={[{ required: true, message: '请输入票面利率' }]}
      >
        <InputNumber
          style={{ width: '100%' }}
          min={0}
          max={1}
          precision={4}
          placeholder="请输入票面利率"
        />
      </Form.Item>

      <Form.Item
        name="maturityDate"
        label="到期日"
        rules={[{ required: true, message: '请选择到期日' }]}
      >
        <DatePicker 
          style={{ width: '100%' }} 
          placeholder="请选择到期日"
        />
      </Form.Item>

      <Form.Item
        name="holdingAmount"
        label="持有数量"
        rules={[{ required: true, message: '请输入持有数量' }]}
      >
        <InputNumber
          style={{ width: '100%' }}
          min={0}
          precision={0}
          placeholder="请输入持有数量"
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
          precision={4}
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
          precision={4}
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