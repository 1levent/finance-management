'use client';

import { Form, Input, InputNumber, Select, DatePicker } from 'antd';
import type { FormInstance } from 'antd/es/form';
import type { IOtherProduct } from '@/types/investment';
import dayjs from 'dayjs';

interface IOtherFormProps {
  form: FormInstance;
  record?: IOtherProduct;
}

const typeOptions = [
  { label: '存款', value: 'deposit' },
  { label: '保险', value: 'insurance' },
  { label: '其他', value: 'other' },
];

export default function OtherForm({ form, record }: IOtherFormProps) {
  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{
        type: 'other',
        status: 'holding',
        ...record,
        startDate: record?.startDate ? dayjs(record.startDate) : undefined,
        endDate: record?.endDate ? dayjs(record.endDate) : undefined,
      }}
    >
      <Form.Item
        name="name"
        label="投资名称"
        rules={[{ required: true, message: '请输入投资名称' }]}
      >
        <Input placeholder="请输入投资名称" />
      </Form.Item>

      <Form.Item
        name="investType"
        label="投资类型"
        rules={[{ required: true, message: '请选择投资类型' }]}
      >
        <Select options={typeOptions} placeholder="请选择投资类型" />
      </Form.Item>

      <Form.Item
        name="amount"
        label="投资金额"
        rules={[{ required: true, message: '请输入投资金额' }]}
      >
        <InputNumber
          style={{ width: '100%' }}
          min={0}
          precision={2}
          placeholder="请输入投资金额"
        />
      </Form.Item>

      <Form.Item
        name="startDate"
        label="起始日期"
        rules={[{ required: true, message: '请选择起始日期' }]}
      >
        <DatePicker 
          style={{ width: '100%' }} 
          placeholder="请选择起始日期"
        />
      </Form.Item>

      <Form.Item
        name="endDate"
        label="到期日期"
      >
        <DatePicker 
          style={{ width: '100%' }} 
          placeholder="请选择到期日期"
        />
      </Form.Item>

      <Form.Item
        name="expectedReturn"
        label="预期收益"
        rules={[{ required: true, message: '请输入预期收益' }]}
      >
        <InputNumber
          style={{ width: '100%' }}
          min={0}
          precision={2}
          placeholder="请输入预期收益"
        />
      </Form.Item>

      <Form.Item
        name="actualReturn"
        label="实际收益"
      >
        <InputNumber
          style={{ width: '100%' }}
          precision={2}
          placeholder="请输入实际收益"
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