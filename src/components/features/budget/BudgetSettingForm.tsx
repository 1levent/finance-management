'use client';

import { Form, Input, Select, Button, Space, InputNumber, Switch, Row, Col } from 'antd';
import type { IBudgetSetting } from '@/types/budget';

interface IBudgetSettingFormProps {
  initialValues?: Partial<IBudgetSetting>;
  onSubmit: (values: IBudgetSetting) => void;
  onCancel: () => void;
}

// 模拟分类数据
const mockCategories = [
  { label: '餐饮', value: '1', type: 'expense' },
  { label: '交通', value: '2', type: 'expense' },
  { label: '购物', value: '3', type: 'expense' },
  { label: '工资', value: '4', type: 'income' },
  { label: '奖金', value: '5', type: 'income' },
];

const periodOptions = [
  { label: '每月', value: 'monthly' },
  { label: '每季', value: 'quarterly' },
  { label: '每年', value: 'yearly' },
];

export default function BudgetSettingForm({ 
  initialValues, 
  onSubmit, 
  onCancel 
}: IBudgetSettingFormProps) {
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      // 获取分类名称
      const category = mockCategories.find(c => c.value === values.categoryId);
      if (category) {
        values.categoryName = category.label;
        values.type = category.type as 'income' | 'expense';
      }
      onSubmit(values as IBudgetSetting);
    } catch (error) {
      console.error('表单验证失败:', error);
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{
        ...initialValues,
        enabled: initialValues?.enabled ?? true,
        rollover: initialValues?.rollover ?? false,
      }}
      onFinish={handleSubmit}
    >
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="categoryId"
            label="预算分类"
            rules={[{ required: true, message: '请选择预算分类' }]}
          >
            <Select
              options={mockCategories}
              placeholder="请选择预算分类"
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="period"
            label="预算周期"
            rules={[{ required: true, message: '请选择预算周期' }]}
          >
            <Select
              options={periodOptions}
              placeholder="请选择预算周期"
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="amount"
            label="预算金额"
            rules={[
              { required: true, message: '请输入预算金额' },
              { type: 'number', min: 0, message: '金额不能为负数' },
            ]}
          >
            <InputNumber
              className="w-full"
              prefix="¥"
              placeholder="请输入预算金额"
              step={100}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="warningThreshold"
            label="预警阈值(%)"
            rules={[
              { required: true, message: '请输入预警阈值' },
              { type: 'number', min: 0, max: 100, message: '请输入0-100之间的数值' },
            ]}
          >
            <InputNumber
              className="w-full"
              min={0}
              max={100}
              placeholder="请输入预警阈值"
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="rollover"
            label="结转设置"
            valuePropName="checked"
          >
            <Switch checkedChildren="开启" unCheckedChildren="关闭" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="enabled"
            label="启用状态"
            valuePropName="checked"
          >
            <Switch checkedChildren="启用" unCheckedChildren="禁用" />
          </Form.Item>
        </Col>
      </Row>

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