'use client';

import { Form, Input, Select, Button, Space, InputNumber, DatePicker, Row, Col } from 'antd';
import type { IDebt } from '@/types/debt';
import dayjs from 'dayjs';

interface IDebtFormProps {
  initialValues?: Partial<IDebt>;
  onSubmit: (values: IDebt) => void;
  onCancel: () => void;
}

const debtTypes = [
  { label: '消费贷', value: 'loan' },
  { label: '房贷', value: 'mortgage' },
  { label: '信用贷', value: 'credit' },
  { label: '其他', value: 'other' },
];

const frequencyOptions = [
  { label: '每月', value: 'monthly' },
  { label: '每季', value: 'quarterly' },
  { label: '每年', value: 'yearly' },
  { label: '一次性', value: 'once' },
];

const statusOptions = [
  { label: '进行中', value: 'active' },
  { label: '已结清', value: 'paid' },
  { label: '逾期', value: 'overdue' },
];

export default function DebtForm({ initialValues, onSubmit, onCancel }: IDebtFormProps) {
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      // 转换日期格式
      const formattedValues = {
        ...values,
        startDate: values.startDate.format('YYYY-MM-DD'),
        endDate: values.endDate.format('YYYY-MM-DD'),
        nextPaymentDate: values.nextPaymentDate.format('YYYY-MM-DD'),
      };
      onSubmit(formattedValues as IDebt);
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
        startDate: initialValues?.startDate ? dayjs(initialValues.startDate) : undefined,
        endDate: initialValues?.endDate ? dayjs(initialValues.endDate) : undefined,
        nextPaymentDate: initialValues?.nextPaymentDate ? dayjs(initialValues.nextPaymentDate) : undefined,
      }}
      onFinish={handleSubmit}
    >
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="name"
            label="借贷名称"
            rules={[{ required: true, message: '请输入借贷名称' }]}
          >
            <Input placeholder="请输入借贷名称" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="type"
            label="借贷类型"
            rules={[{ required: true, message: '请选择借贷类型' }]}
          >
            <Select options={debtTypes} placeholder="请选择借贷类型" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="amount"
            label="借贷金额"
            rules={[
              { required: true, message: '请输入借贷金额' },
              { type: 'number', min: 0, message: '金额不能为负数' },
            ]}
          >
            <InputNumber
              className="w-full"
              prefix="¥"
              placeholder="请输入借贷金额"
              step={1000}
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
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('amount') >= value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('剩余本金不能大于借贷金额'));
                },
              }),
            ]}
          >
            <InputNumber
              className="w-full"
              prefix="¥"
              placeholder="请输入剩余本金"
              step={1000}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="interestRate"
            label="年利率"
            rules={[
              { required: true, message: '请输入年利率' },
              { type: 'number', min: 0, max: 1, message: '请输入0-100%之间的利率' },
            ]}
          >
            <InputNumber<number>
              className="w-full"
              min={0}
              max={1}
              precision={4}
              step={0.0001}
              formatter={(value) => value ? `${(Number(value) * 100).toFixed(2)}%` : ''}
              parser={(value) => {
                const parsed = value ? Number(value.replace('%', '')) / 100 : 0;
                return parsed > 1 ? 1 : parsed < 0 ? 0 : parsed;
              }}
              placeholder="请输入年利率"
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="lender"
            label="借出方"
            rules={[{ required: true, message: '请输入借出方' }]}
          >
            <Input placeholder="请输入借出方" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="startDate"
            label="开始日期"
            rules={[{ required: true, message: '请选择开始日期' }]}
          >
            <DatePicker className="w-full" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="endDate"
            label="结束日期"
            rules={[{ required: true, message: '请选择结束日期' }]}
          >
            <DatePicker className="w-full" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="repaymentFrequency"
            label="还款频率"
            rules={[{ required: true, message: '请选择还款频率' }]}
          >
            <Select options={frequencyOptions} placeholder="请选择还款频率" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="status"
            label="状态"
            rules={[{ required: true, message: '请选择状态' }]}
          >
            <Select options={statusOptions} placeholder="请选择状态" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="nextPaymentDate"
            label="下次还款日期"
            rules={[{ required: true, message: '请选择下次还款日期' }]}
          >
            <DatePicker className="w-full" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="nextPaymentAmount"
            label="下次还款金额"
            rules={[
              { required: true, message: '请输入下次还款金额' },
              { type: 'number', min: 0, message: '金额不能为负数' },
            ]}
          >
            <InputNumber
              className="w-full"
              prefix="¥"
              placeholder="请输入下次还款金额"
              step={100}
            />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        name="description"
        label="备注"
      >
        <Input.TextArea rows={4} placeholder="请输入备注信息" />
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