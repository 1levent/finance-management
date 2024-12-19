'use client';

import { Form, Input, Select, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

interface IFilterFormProps {
  filters: {
    keyword?: string;
    type?: string;
    status?: string;
  };
  onChange: (values: any) => void;
}

export default function FilterForm({ filters, onChange }: IFilterFormProps) {
  const handleValuesChange = (changedValues: any, allValues: any) => {
    onChange(allValues);
  };

  return (
    <Form 
      layout="inline" 
      initialValues={filters}
      onValuesChange={handleValuesChange}
    >
      <Form.Item name="keyword">
        <Input
          placeholder="搜索代码/名称"
          prefix={<SearchOutlined />}
          style={{ width: 200 }}
          allowClear
        />
      </Form.Item>

      <Form.Item name="type">
        <Select
          placeholder="产品类型"
          style={{ width: 120 }}
          allowClear
          options={[
            { label: '股票', value: 'stock' },
            { label: '基金', value: 'fund' },
            { label: '债券', value: 'bond' },
            { label: '其他', value: 'other' },
          ]}
        />
      </Form.Item>

      <Form.Item name="status">
        <Select
          placeholder="状态"
          style={{ width: 120 }}
          allowClear
          options={[
            { label: '持仓', value: 'holding' },
            { label: '关注', value: 'watching' },
          ]}
        />
      </Form.Item>
    </Form>
  );
} 