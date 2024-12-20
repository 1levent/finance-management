'use client';

import { useState } from 'react';
import { Card, Table, Button, Tag, Space, Modal, App, Progress, Row, Col, Statistic } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, AlertOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import BudgetForm from '@/components/features/shared/BudgetForm';
import dayjs from 'dayjs';

interface IBudget {
  id: string;
  category: string;
  amount: number;
  spent: number;
  startDate: string;
  endDate: string;
  status: 'normal' | 'warning' | 'danger';
  members: {
    userId: string;
    username: string;
    amount: number;
  }[];
}

// 模拟数据
const mockBudgets: IBudget[] = [
  {
    id: '1',
    category: '餐饮',
    amount: 5000,
    spent: 3000,
    startDate: '2024-03-01',
    endDate: '2024-03-31',
    status: 'normal',
    members: [
      { userId: '1', username: '张三', amount: 2000 },
      { userId: '2', username: '李四', amount: 1000 },
    ],
  },
  {
    id: '2',
    category: '交通',
    amount: 2000,
    spent: 1800,
    startDate: '2024-03-01',
    endDate: '2024-03-31',
    status: 'warning',
    members: [
      { userId: '1', username: '张三', amount: 1000 },
      { userId: '2', username: '李四', amount: 800 },
    ],
  },
  {
    id: '3',
    category: '购物',
    amount: 3000,
    spent: 3200,
    startDate: '2024-03-01',
    endDate: '2024-03-31',
    status: 'danger',
    members: [
      { userId: '1', username: '张三', amount: 1500 },
      { userId: '2', username: '李四', amount: 1700 },
    ],
  },
];

const statusColors = {
  normal: '#52c41a',
  warning: '#faad14',
  danger: '#ff4d4f',
};

export default function BudgetPage() {
  const { message, modal } = App.useApp();
  const [selectedBudget, setSelectedBudget] = useState<IBudget | null>(null);
  const [formVisible, setFormVisible] = useState(false);

  const handleDelete = (record: IBudget) => {
    modal.confirm({
      title: '确认删除',
      content: `确定要删除"${record.category}"的预算吗？`,
      onOk() {
        message.success('删除成功');
      },
    });
  };

  const handleEdit = (record: IBudget) => {
    setSelectedBudget(record);
    setFormVisible(true);
  };

  const handleFormSubmit = (values: IBudget) => {
    if (selectedBudget) {
      message.success('编辑成功');
    } else {
      message.success('新增成功');
    }
    setFormVisible(false);
    setSelectedBudget(null);
  };

  const columns: ColumnsType<IBudget> = [
    {
      title: '分类',
      dataIndex: 'category',
      key: 'category',
      width: 120,
    },
    {
      title: '预算金额',
      dataIndex: 'amount',
      key: 'amount',
      width: 120,
      align: 'right',
      render: (amount: number) => `¥${amount.toLocaleString()}`,
    },
    {
      title: '已使用',
      dataIndex: 'spent',
      key: 'spent',
      width: 120,
      align: 'right',
      render: (spent: number) => `¥${spent.toLocaleString()}`,
    },
    {
      title: '使用进度',
      key: 'progress',
      width: 200,
      render: (_, record) => {
        const percent = Math.round((record.spent / record.amount) * 100);
        return (
          <Progress
            percent={percent}
            strokeColor={statusColors[record.status]}
            status={record.status === 'danger' ? 'exception' : 'normal'}
          />
        );
      },
    },
    {
      title: '有效期',
      key: 'period',
      width: 200,
      render: (_, record) => (
        `${dayjs(record.startDate).format('YYYY-MM-DD')} ~ ${dayjs(record.endDate).format('YYYY-MM-DD')}`
      ),
    },
    {
      title: '操作',
      key: 'action',
      width: 150,
      render: (_, record) => (
        <Space size="small">
          <Button
            type="link"
            size="small"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            编辑
          </Button>
          <Button
            type="link"
            size="small"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record)}
          >
            删除
          </Button>
        </Space>
      ),
    },
  ];

  // 计算总体预算情况
  const totalBudget = mockBudgets.reduce((sum, item) => sum + item.amount, 0);
  const totalSpent = mockBudgets.reduce((sum, item) => sum + item.spent, 0);
  const totalPercent = Math.round((totalSpent / totalBudget) * 100);

  return (
    <div className="p-4 space-y-4">
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Card size="small">
            <Statistic
              title="总预算"
              value={totalBudget}
              precision={2}
              prefix="¥"
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card size="small">
            <Statistic
              title="已使用"
              value={totalSpent}
              precision={2}
              prefix="¥"
              valueStyle={{ color: totalSpent > totalBudget ? '#ff4d4f' : '#3f8600' }}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card size="small">
            <Statistic
              title="使用进度"
              value={totalPercent}
              suffix="%"
              valueStyle={{ color: totalPercent > 100 ? '#ff4d4f' : '#3f8600' }}
            />
          </Card>
        </Col>
      </Row>

      <Card
        title="预算管理"
        extra={
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              setSelectedBudget(null);
              setFormVisible(true);
            }}
          >
            新增预算
          </Button>
        }
      >
        <Table<IBudget>
          columns={columns}
          dataSource={mockBudgets.map(item => ({
            ...item,
            key: item.id,
          }))}
          pagination={false}
        />
      </Card>

      <Modal
        title={selectedBudget ? '编辑预算' : '新增预算'}
        open={formVisible}
        onCancel={() => {
          setFormVisible(false);
          setSelectedBudget(null);
        }}
        footer={null}
        width={800}
      >
        <BudgetForm
          initialValues={selectedBudget || undefined}
          onSubmit={handleFormSubmit}
          onCancel={() => {
            setFormVisible(false);
            setSelectedBudget(null);
          }}
        />
      </Modal>
    </div>
  );
} 