'use client';

import { Form, Input, Select, Button, Space, InputNumber, TimePicker, Row, Col } from 'antd';
import type { IReminderSetting } from '@/types/reminder';
import dayjs from 'dayjs';

interface IReminderSettingFormProps {
  initialValues?: Partial<IReminderSetting>;
  onSubmit: (values: IReminderSetting) => void;
  onCancel: () => void;
}

// 模拟债务数据
const mockDebts = [
  { label: '房贷', value: '1' },
  { label: '消费贷', value: '2' },
  { label: '车贷', value: '3' },
];

const notifyMethodOptions = [
  { label: '邮件通知', value: 'email' },
  { label: '短信通知', value: 'sms' },
  { label: '站内通知', value: 'push' },
];

export default function ReminderSettingForm({ 
  initialValues, 
  onSubmit, 
  onCancel 
}: IReminderSettingFormProps) {
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      // 转换时间格式
      const formattedValues = {
        ...values,
        notifyTime: values.notifyTime.format('HH:mm'),
      };
      onSubmit(formattedValues as IReminderSetting);
    } catch (error) {
      console.error('表单验证失败:', error);
    }
  };

  // 处理债务选择
  const handleDebtChange = (debtId: string) => {
    const debt = mockDebts.find(d => d.value === debtId);
    if (debt) {
      form.setFieldValue('debtName', debt.label);
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{
        ...initialValues,
        notifyTime: initialValues?.notifyTime ? dayjs(initialValues.notifyTime, 'HH:mm') : undefined,
        enabled: initialValues?.enabled ?? true,
      }}
      onFinish={handleSubmit}
    >
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="debtId"
            label="借贷名称"
            rules={[{ required: true, message: '请选择借贷' }]}
          >
            <Select
              options={mockDebts}
              placeholder="请选择借贷"
              onChange={handleDebtChange}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="debtName"
            label="借贷显示名称"
            rules={[{ required: true, message: '请输入借贷显示名称' }]}
          >
            <Input placeholder="请输入借贷显示名称" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="advanceDays"
            label="提前提醒天数"
            rules={[
              { required: true, message: '请输入提前提醒天数' },
              { type: 'number', min: 1, max: 30, message: '请输入1-30之间的天数' },
            ]}
          >
            <InputNumber
              className="w-full"
              min={1}
              max={30}
              placeholder="请输入提前提醒天数"
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="notifyTime"
            label="提醒时间"
            rules={[{ required: true, message: '请选择提醒时间' }]}
          >
            <TimePicker
              className="w-full"
              format="HH:mm"
              minuteStep={30}
              placeholder="请选择提醒时间"
            />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        name="notifyMethods"
        label="通知方式"
        rules={[{ required: true, message: '请选择至少一种通知方式' }]}
      >
        <Select
          mode="multiple"
          options={notifyMethodOptions}
          placeholder="请选择通知方式"
        />
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