'use client';

import { Form, Input, Select, Button, Space, InputNumber, Row, Col } from 'antd';
import type { ICreditCard } from '@/types/assets';

interface ICreditCardFormProps {
  initialValues?: Partial<ICreditCard>;
  onSubmit: (values: ICreditCard) => void;
  onCancel: () => void;
}

const bankList = [
  { label: '招商银行', value: '招商银行' },
  { label: '中信银行', value: '中信银行' },
  { label: '建设银行', value: '建设银行' },
  { label: '工商银行', value: '工商银行' },
  { label: '交通银行', value: '交通银行' },
];

const cardTypes = [
  { label: 'VISA', value: 'visa' },
  { label: 'MasterCard', value: 'mastercard' },
  { label: '银联', value: 'unionpay' },
];

const statusOptions = [
  { label: '正常', value: 'normal' },
  { label: '逾期', value: 'overdue' },
  { label: '冻结', value: 'frozen' },
];

export default function CreditCardForm({ initialValues, onSubmit, onCancel }: ICreditCardFormProps) {
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      onSubmit(values);
    } catch (error) {
      console.error('表单验证失败:', error);
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={initialValues}
      onFinish={handleSubmit}
    >
      <Form.Item
        name="bankName"
        label="发卡行"
        rules={[{ required: true, message: '请选择发卡行' }]}
      >
        <Select options={bankList} placeholder="请选择发卡行" />
      </Form.Item>

      <Form.Item
        name="cardType"
        label="卡片类型"
        rules={[{ required: true, message: '请选择卡片类型' }]}
      >
        <Select options={cardTypes} placeholder="请选择卡片类型" />
      </Form.Item>

      <Form.Item
        name="cardNumber"
        label="卡号"
        rules={[
          { required: true, message: '请输入卡号' },
          { pattern: /^\d{16}$/, message: '请输入16位数字的卡号' },
        ]}
      >
        <Input placeholder="请输入卡号" maxLength={16} />
      </Form.Item>

      <Form.Item
        name="cardHolder"
        label="持卡人"
        rules={[{ required: true, message: '请输入持卡人姓名' }]}
      >
        <Input placeholder="请输入持卡人姓名" />
      </Form.Item>

      <Form.Item
        name="creditLimit"
        label="信用额度"
        rules={[
          { required: true, message: '请输入信用额度' },
          { type: 'number', min: 0, message: '额度不能为负数' },
        ]}
      >
        <InputNumber
          className="w-full"
          prefix="¥"
          placeholder="请输入信用额度"
          step={1000}
        />
      </Form.Item>

      <Form.Item
        name="availableCredit"
        label="可用额度"
        rules={[
          { required: true, message: '请输入可用额度' },
          { type: 'number', min: 0, message: '额度不能为负数' },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('creditLimit') >= value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('可用额度不能大于信用额度'));
            },
          }),
        ]}
      >
        <InputNumber
          className="w-full"
          prefix="¥"
          placeholder="请输入可用额度"
          step={1000}
        />
      </Form.Item>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="billDate"
            label="账单日"
            rules={[
              { required: true, message: '请选择账单日' },
              { type: 'number', min: 1, max: 31, message: '请输入1-31之间的日期' },
            ]}
          >
            <InputNumber
              className="w-full"
              placeholder="请输入账单日"
              min={1}
              max={31}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="dueDate"
            label="还款日"
            rules={[
              { required: true, message: '请选择还款日' },
              { type: 'number', min: 1, max: 31, message: '请输入1-31之间的日期' },
            ]}
          >
            <InputNumber
              className="w-full"
              placeholder="请输入还款日"
              min={1}
              max={31}
            />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        name="currentBill"
        label="当期账单"
        rules={[
          { required: true, message: '请输入当期账单金额' },
          { type: 'number', min: 0, message: '金额不能为负数' },
        ]}
      >
        <InputNumber
          className="w-full"
          prefix="¥"
          placeholder="请输入当期账单金额"
          step={100}
        />
      </Form.Item>

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