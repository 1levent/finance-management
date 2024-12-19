'use client';

import { Form, Input, InputNumber, Select } from 'antd';
import type { FormInstance } from 'antd/es/form';
import type { IFundProduct } from '@/types/investment';

interface IFundFormProps {
  form: FormInstance;
  record?: IFundProduct;
}

const fundTypeOptions = [
  { label: '股票型', value: 'stock' },
  { label: '债券型', value: 'bond' },
  { label: '混合型', value: 'hybrid' },
  { label: '货币型', value: 'money' },
  { label: '其他', value: 'other' },
];

export default function FundForm({ form, record }: IFundFormProps) {
  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{
        type: 'fund',
        status: 'holding',
        ...record,
      }}
    >
      <Form.Item
        name="code"
        label="基金代码"
        rules={[{ required: true, message: '请输入基金代码' }]}
      >
        <Input placeholder="请输入基金代码" />
      </Form.Item>

      <Form.Item
        name="name"
        label="基金名称"
        rules={[{ required: true, message: '请输入基金名称' }]}
      >
        <Input placeholder="请输入基金名称" />
      </Form.Item>

      <Form.Item
        name="fundType"
        label="基金类型"
        rules={[{ required: true, message: '请选择基金类型' }]}
      >
        <Select options={fundTypeOptions} placeholder="请选择基金类型" />
      </Form.Item>

      <Form.Item
        name="holdingAmount"
        label="持有份额"
        rules={[{ required: true, message: '请输入持有份额' }]}
      >
        <InputNumber
          style={{ width: '100%' }}
          min={0}
          precision={2}
          placeholder="请输入持有份额"
        />
      </Form.Item>

      <Form.Item
        name="costNav"
        label="成本净值"
        rules={[{ required: true, message: '请输入成本净值' }]}
      >
        <InputNumber
          style={{ width: '100%' }}
          min={0}
          precision={4}
          placeholder="请输入成本净值"
        />
      </Form.Item>

      <Form.Item
        name="currentNav"
        label="当前净值"
        rules={[{ required: true, message: '请输入当前净值' }]}
      >
        <InputNumber
          style={{ width: '100%' }}
          min={0}
          precision={4}
          placeholder="请输入当前净值"
        />
      </Form.Item>

      <Form.Item
        name="purchaseFee"
        label="申购费率"
      >
        <InputNumber
          style={{ width: '100%' }}
          min={0}
          max={1}
          precision={4}
          placeholder="请输入申购费率"
        />
      </Form.Item>

      <Form.Item
        name="redemptionFee"
        label="赎回费率"
      >
        <InputNumber
          style={{ width: '100%' }}
          min={0}
          max={1}
          precision={4}
          placeholder="请输入赎回费率"
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