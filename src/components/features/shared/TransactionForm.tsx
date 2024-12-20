'use client';

import { useState } from 'react';
import { Form, Input, InputNumber, Select, Button, Space, Row, Col, DatePicker, Table, Tag } from 'antd';
import type { ISharedTransaction } from '@/types/shared';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';

interface ITransactionFormProps {
  initialValues?: Partial<ISharedTransaction>;
  onSubmit: (values: ISharedTransaction) => void;
  onCancel: () => void;
}

// 模拟账户数据
const mockAccounts = [
  { label: '团队经费', value: '1' },
  { label: '项目资金', value: '2' },
];

// 模拟分类数据
const mockCategories = [
  { label: '餐饮', value: '1' },
  { label: '交通', value: '2' },
  { label: '购物', value: '3' },
  { label: '报销', value: '4' },
];

// 模拟成员数据
const mockMembers = [
  { label: '张三', value: '1' },
  { label: '李四', value: '2' },
  { label: '王五', value: '3' },
  { label: '赵六', value: '4' },
];

interface IParticipant {
  userId: string;
  username: string;
  share: number;
  paid: boolean;
}

export default function TransactionForm({ 
  initialValues, 
  onSubmit, 
  onCancel 
}: ITransactionFormProps) {
  const [form] = Form.useForm();
  const [participants, setParticipants] = useState<IParticipant[]>(
    initialValues?.participants || []
  );

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      // 添加默认值和参与者信息
      const formattedValues = {
        ...values,
        date: values.date.format('YYYY-MM-DD'),
        createdBy: 'user1',  // 当前用户ID
        createdAt: new Date().toISOString(),
        participants,
      };
      onSubmit(formattedValues as ISharedTransaction);
    } catch (error) {
      console.error('表单验证失败:', error);
    }
  };

  // 参与者表格列配置
  const participantColumns: ColumnsType<IParticipant> = [
    {
      title: '成员',
      dataIndex: 'username',
      key: 'username',
      width: 120,
    },
    {
      title: '分摊金额',
      dataIndex: 'share',
      key: 'share',
      width: 120,
      render: (share: number) => `¥${share.toLocaleString()}`,
    },
    {
      title: '状态',
      dataIndex: 'paid',
      key: 'paid',
      width: 100,
      render: (paid: boolean) => (
        <Tag color={paid ? 'success' : 'warning'}>
          {paid ? '已付款' : '待付款'}
        </Tag>
      ),
    },
  ];

  // 监听金额变化，自动计算平均分摊
  const handleAmountChange = (value: number | null) => {
    if (!value || participants.length === 0) return;
    const share = value / participants.length;
    setParticipants(prev => 
      prev.map(p => ({
        ...p,
        share,
      }))
    );
  };

  // 添加参与者
  const handleAddParticipant = (userId: string) => {
    const member = mockMembers.find(m => m.value === userId);
    if (!member) return;

    const newParticipant: IParticipant = {
      userId,
      username: member.label,
      share: 0,
      paid: false,
    };

    setParticipants(prev => [...prev, newParticipant]);

    // 重新计算分摊金额
    const amount = form.getFieldValue('amount');
    if (amount) {
      handleAmountChange(amount);
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{
        ...initialValues,
        date: initialValues?.date ? dayjs(initialValues.date) : dayjs(),
        type: initialValues?.type || 'expense',
      }}
      onFinish={handleSubmit}
    >
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="accountId"
            label="账户"
            rules={[{ required: true, message: '请选择账户' }]}
          >
            <Select options={mockAccounts} placeholder="请选择账户" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="date"
            label="日期"
            rules={[{ required: true, message: '请选择日期' }]}
          >
            <DatePicker className="w-full" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={8}>
          <Form.Item
            name="type"
            label="类型"
            rules={[{ required: true, message: '请选择类型' }]}
          >
            <Select
              options={[
                { label: '支出', value: 'expense' },
                { label: '收入', value: 'income' },
                { label: '转账', value: 'transfer' },
              ]}
              placeholder="请选择类型"
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name="category"
            label="分类"
            rules={[{ required: true, message: '请选择分类' }]}
          >
            <Select options={mockCategories} placeholder="请选择分类" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name="amount"
            label="金额"
            rules={[
              { required: true, message: '请输入金额' },
              { type: 'number', message: '请输入有效金额' },
            ]}
          >
            <InputNumber
              className="w-full"
              prefix="¥"
              placeholder="请输入金额"
              onChange={handleAmountChange}
            />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        name="description"
        label="描述"
      >
        <Input.TextArea rows={2} placeholder="请输入描述" />
      </Form.Item>

      <Form.Item label="参与者">
        <Space direction="vertical" className="w-full">
          <Select
            className="w-full"
            placeholder="添加参与者"
            options={mockMembers.filter(m => !participants.some(p => p.userId === m.value))}
            onChange={handleAddParticipant}
            value={undefined}
          />
          <Table
            columns={participantColumns}
            dataSource={participants.map(item => ({
              ...item,
              key: item.userId,
            }))}
            size="small"
            pagination={false}
          />
        </Space>
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