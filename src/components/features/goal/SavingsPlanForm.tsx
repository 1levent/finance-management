'use client';

import { Form, Select, Button, Space, InputNumber, Switch, Row, Col } from 'antd';
import type { ISavingsPlan } from '@/types/goal';

interface ISavingsPlanFormProps {
  initialValues?: Partial<ISavingsPlan>;
  onSubmit: (values: ISavingsPlan) => void;
  onCancel: () => void;
}

// 模拟目标数据
const mockGoals = [
  { label: '买房首付', value: '1' },
  { label: '还清信用卡', value: '2' },
  { label: '购买新车', value: '3' },
];

// 模拟账户数据
const mockAccounts = [
  { label: '工商银行储蓄卡', value: 'bank_1' },
  { label: '建设银行储蓄卡', value: 'bank_2' },
  { label: '支付宝', value: 'alipay_1' },
];

const frequencyOptions = [
  { label: '每月', value: 'monthly' },
  { label: '每周', value: 'weekly' },
  { label: '每日', value: 'daily' },
];

export default function SavingsPlanForm({ 
  initialValues, 
  onSubmit, 
  onCancel 
}: ISavingsPlanFormProps) {
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      // 获取账户名称
      if (values.sourceAccountId) {
        const account = mockAccounts.find(a => a.value === values.sourceAccountId);
        if (account) {
          values.sourceAccountName = account.label;
        }
      }
      onSubmit(values as ISavingsPlan);
    } catch (error) {
      console.error('表单验证失败:', error);
    }
  };

  // 处理自动扣款切换
  const handleAutoDeductChange = (checked: boolean) => {
    if (!checked) {
      form.setFieldsValue({ sourceAccountId: undefined });
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{
        ...initialValues,
        enabled: initialValues?.enabled ?? true,
        autoDeduct: initialValues?.autoDeduct ?? false,
      }}
      onFinish={handleSubmit}
    >
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="goalId"
            label="关联目标"
            rules={[{ required: true, message: '请选择关联目标' }]}
          >
            <Select options={mockGoals} placeholder="请选择关联目标" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="frequency"
            label="存款频率"
            rules={[{ required: true, message: '请选择存款频率' }]}
          >
            <Select options={frequencyOptions} placeholder="请选择存款频率" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="monthlyAmount"
            label="存款金额"
            rules={[
              { required: true, message: '请输入存款金额' },
              { type: 'number', min: 0, message: '金额不能为负数' },
            ]}
          >
            <InputNumber
              className="w-full"
              prefix="¥"
              placeholder="请输入存款金额"
              step={100}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="autoDeduct"
            label="自动扣款"
            valuePropName="checked"
          >
            <Switch
              checkedChildren="开启"
              unCheckedChildren="关闭"
              onChange={handleAutoDeductChange}
            />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        noStyle
        shouldUpdate={(prev, curr) => prev.autoDeduct !== curr.autoDeduct}
      >
        {({ getFieldValue }) => 
          getFieldValue('autoDeduct') && (
            <Form.Item
              name="sourceAccountId"
              label="扣款账户"
              rules={[{ required: true, message: '请选择扣款账户' }]}
            >
              <Select options={mockAccounts} placeholder="请选择扣款账户" />
            </Form.Item>
          )
        }
      </Form.Item>

      <Form.Item
        name="enabled"
        label="启用状态"
        valuePropName="checked"
      >
        <Switch checkedChildren="启用" unCheckedChildren="禁用" />
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