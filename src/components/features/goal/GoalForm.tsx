'use client';

import { Form, Input, Select, Button, Space, InputNumber, DatePicker, Row, Col } from 'antd';
import type { IGoal } from '@/types/goal';
import dayjs from 'dayjs';

interface IGoalFormProps {
  initialValues?: Partial<IGoal>;
  onSubmit: (values: IGoal) => void;
  onCancel: () => void;
}

const typeOptions = [
  { label: '存款', value: 'savings' },
  { label: '投资', value: 'investment' },
  { label: '债务', value: 'debt' },
  { label: '购物', value: 'purchase' },
  { label: '其他', value: 'other' },
];

const priorityOptions = [
  { label: '高', value: 'high' },
  { label: '中', value: 'medium' },
  { label: '低', value: 'low' },
];

const statusOptions = [
  { label: '未开始', value: 'pending' },
  { label: '进行中', value: 'in_progress' },
  { label: '已完成', value: 'completed' },
  { label: '已逾期', value: 'overdue' },
];

export default function GoalForm({ 
  initialValues, 
  onSubmit, 
  onCancel 
}: IGoalFormProps) {
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      // 转换日期格式
      const formattedValues = {
        ...values,
        startDate: values.startDate.format('YYYY-MM-DD'),
        endDate: values.endDate.format('YYYY-MM-DD'),
      };
      onSubmit(formattedValues as IGoal);
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
        status: initialValues?.status || 'pending',
        priority: initialValues?.priority || 'medium',
      }}
      onFinish={handleSubmit}
    >
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="name"
            label="目标名称"
            rules={[{ required: true, message: '请输入目标名称' }]}
          >
            <Input placeholder="请输入目标名称" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="type"
            label="目标类型"
            rules={[{ required: true, message: '请选择目标类型' }]}
          >
            <Select options={typeOptions} placeholder="请选择目标类型" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="targetAmount"
            label="目标金额"
            rules={[
              { required: true, message: '请输入目标金额' },
              { type: 'number', min: 0, message: '金额不能为负数' },
            ]}
          >
            <InputNumber
              className="w-full"
              prefix="¥"
              placeholder="请输入目标金额"
              step={1000}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="currentAmount"
            label="当前金额"
            rules={[
              { required: true, message: '请输入当前金额' },
              { type: 'number', min: 0, message: '金额不能为负数' },
            ]}
          >
            <InputNumber
              className="w-full"
              prefix="¥"
              placeholder="请输入当前金额"
              step={1000}
            />
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
            name="priority"
            label="优先级"
            rules={[{ required: true, message: '请选择优先级' }]}
          >
            <Select options={priorityOptions} placeholder="请选择优先级" />
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

      <Form.Item
        name="description"
        label="目标描述"
      >
        <Input.TextArea rows={4} placeholder="请输入目标描述" />
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