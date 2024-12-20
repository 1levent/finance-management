'use client';

import { Form, Input, Select, Button, Space, InputNumber, DatePicker, Row, Col } from 'antd';
import type { IRepaymentPlan } from '@/types/debt';
import dayjs from 'dayjs';

interface IRepaymentFormProps {
  initialValues?: Partial<IRepaymentPlan>;
  onSubmit: (values: IRepaymentPlan) => void;
  onCancel: () => void;
}

const statusOptions = [
  { label: '待还款', value: 'pending' },
  { label: '已还款', value: 'paid' },
  { label: '已逾期', value: 'overdue' },
];

export default function RepaymentForm({ initialValues, onSubmit, onCancel }: IRepaymentFormProps) {
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      // 转换日期格式
      const formattedValues = {
        ...values,
        paymentDate: values.paymentDate.format('YYYY-MM-DD'),
      };
      onSubmit(formattedValues as IRepaymentPlan);
    } catch (error) {
      console.error('表单验证失败:', error);
    }
  };

  // 自动计算总金额
  const calculateTotal = () => {
    const principal = form.getFieldValue('principal') || 0;
    const interest = form.getFieldValue('interest') || 0;
    form.setFieldValue('paymentAmount', principal + interest);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{
        ...initialValues,
        paymentDate: initialValues?.paymentDate ? dayjs(initialValues.paymentDate) : undefined,
      }}
      onFinish={handleSubmit}
    >
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="debtName"
            label="借贷名称"
            rules={[{ required: true, message: '请输入借贷名称' }]}
          >
            <Input placeholder="请输入借贷名称" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="paymentDate"
            label="还款日期"
            rules={[{ required: true, message: '请选择还款日期' }]}
          >
            <DatePicker className="w-full" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="principal"
            label="本金"
            rules={[
              { required: true, message: '请输入本金' },
              { type: 'number', min: 0, message: '金额不能为负数' },
            ]}
          >
            <InputNumber
              className="w-full"
              prefix="¥"
              placeholder="请输入本金"
              onChange={calculateTotal}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="interest"
            label="利息"
            rules={[
              { required: true, message: '请输入利息' },
              { type: 'number', min: 0, message: '金额不能为负数' },
            ]}
          >
            <InputNumber
              className="w-full"
              prefix="¥"
              placeholder="请输入利息"
              onChange={calculateTotal}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="paymentAmount"
            label="还款总额"
            rules={[{ required: true, message: '请输入还款总额' }]}
          >
            <InputNumber
              className="w-full"
              prefix="¥"
              disabled
              placeholder="自动计算"
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="remainingAmount"
            label="剩余本金"
            rules={[
              { required: true, message: '请输入剩余本金' },
              { type: 'number', min: 0, message: '金额不能为负数' },
            ]}
          >
            <InputNumber
              className="w-full"
              prefix="¥"
              placeholder="请输入剩余本金"
            />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        name="status"
        label="状态"
        rules={[{ required: true, message: '请选择状态' }]}
      >
        <Select options={statusOptions} placeholder="请选择状态" />
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