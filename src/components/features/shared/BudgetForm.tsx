'use client';

import { Form, Input, InputNumber, Select, Button, Space, Row, Col, DatePicker, Table } from 'antd';
import type { IBudget } from '@/types/shared';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';

interface IBudgetFormProps {
  initialValues?: Partial<IBudget>;
  onSubmit: (values: IBudget) => void;
  onCancel: () => void;
}

// 模拟分类数据
const categoryOptions = [
  { label: '餐饮', value: '餐饮' },
  { label: '交通', value: '交通' },
  { label: '购物', value: '购物' },
  { label: '娱乐', value: '娱乐' },
  { label: '其他', value: '其他' },
];

// 模拟成员数据
const mockMembers = [
  { label: '张三', value: '1' },
  { label: '李四', value: '2' },
  { label: '王五', value: '3' },
  { label: '赵六', value: '4' },
];

interface IMemberBudget {
  userId: string;
  username: string;
  amount: number;
}

export default function BudgetForm({ 
  initialValues, 
  onSubmit, 
  onCancel 
}: IBudgetFormProps) {
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      // 添加默认值
      const formattedValues = {
        ...values,
        id: initialValues?.id || `budget_${Date.now()}`,
        status: 'normal',
        spent: initialValues?.spent || 0,
        startDate: values.period[0].format('YYYY-MM-DD'),
        endDate: values.period[1].format('YYYY-MM-DD'),
      };
      onSubmit(formattedValues as IBudget);
    } catch (error) {
      console.error('表单验证失败:', error);
    }
  };

  // 成员预算表格列配置
  const columns: ColumnsType<IMemberBudget> = [
    {
      title: '成员',
      dataIndex: 'username',
      key: 'username',
      width: 120,
    },
    {
      title: '预算金额',
      dataIndex: 'amount',
      key: 'amount',
      width: 150,
      render: (amount: number) => `¥${amount.toLocaleString()}`,
    },
  ];

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{
        ...initialValues,
        period: initialValues ? [
          dayjs(initialValues.startDate),
          dayjs(initialValues.endDate),
        ] : [dayjs().startOf('month'), dayjs().endOf('month')],
        members: initialValues?.members || [],
      }}
      onFinish={handleSubmit}
    >
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="category"
            label="预算分类"
            rules={[{ required: true, message: '请选择预算分类' }]}
          >
            <Select
              options={categoryOptions}
              placeholder="请选择预算分类"
            />
          </Form.Item>
        </Col>
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
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="period"
            label="预算周期"
            rules={[{ required: true, message: '请选择预算周期' }]}
          >
            <DatePicker.RangePicker
              className="w-full"
              format="YYYY-MM-DD"
            />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        name="members"
        label="成员预算"
        rules={[{ required: true, message: '请至少添加一个成员预算' }]}
      >
        <Table<IMemberBudget>
          columns={columns}
          dataSource={form.getFieldValue('members')?.map((item: IMemberBudget) => ({
            ...item,
            key: item.userId,
          }))}
          size="small"
          pagination={false}
          footer={() => (
            <Button
              type="dashed"
              block
              onClick={() => {
                const members = form.getFieldValue('members') || [];
                const amount = form.getFieldValue('amount') || 0;
                const remainingMembers = mockMembers.filter(
                  m => !members.some((member: IMemberBudget) => member.userId === m.value)
                );
                if (remainingMembers.length === 0) {
                  return;
                }
                const newMember = remainingMembers[0];
                form.setFieldsValue({
                  members: [
                    ...members,
                    {
                      userId: newMember.value,
                      username: newMember.label,
                      amount: amount / (members.length + 1),
                    },
                  ],
                });
              }}
            >
              添加成员
            </Button>
          )}
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