'use client';

import { useState } from 'react';
import { Card, Table, Button, Tag, Space, Modal, App } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import type { IGoal } from '@/types/goal';
import GoalForm from '@/components/features/goal/GoalForm';
import dayjs from 'dayjs';

// 使用之前定义的模拟数据
const mockGoals: IGoal[] = [
  // ... 从 overview/page.tsx 复制模拟数据
];

const statusLabels = {
  pending: { text: '未开始', color: 'default' },
  in_progress: { text: '进行中', color: 'processing' },
  completed: { text: '已完成', color: 'success' },
  overdue: { text: '已逾期', color: 'error' },
};

const priorityLabels = {
  high: { text: '高', color: 'red' },
  medium: { text: '中', color: 'orange' },
  low: { text: '低', color: 'blue' },
};

const typeLabels = {
  savings: { text: '存款', color: 'blue' },
  investment: { text: '投资', color: 'green' },
  debt: { text: '债务', color: 'red' },
  purchase: { text: '购物', color: 'purple' },
  other: { text: '其他', color: 'default' },
};

export default function GoalSettingsPage() {
  const { message, modal } = App.useApp();
  const [selectedGoal, setSelectedGoal] = useState<IGoal | null>(null);
  const [formVisible, setFormVisible] = useState(false);

  const handleDelete = (record: IGoal) => {
    modal.confirm({
      title: '确认删除',
      content: `确定要删除目标"${record.name}"吗？`,
      onOk() {
        message.success('删除成功');
      },
    });
  };

  const handleEdit = (record: IGoal) => {
    setSelectedGoal(record);
    setFormVisible(true);
  };

  const handleFormSubmit = (values: IGoal) => {
    if (selectedGoal) {
      message.success('编辑成功');
    } else {
      message.success('新增成功');
    }
    setFormVisible(false);
    setSelectedGoal(null);
  };

  const columns: ColumnsType<IGoal> = [
    {
      title: '目标名称',
      dataIndex: 'name',
      key: 'name',
      width: 200,
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      width: 100,
      render: (type: keyof typeof typeLabels) => (
        <Tag color={typeLabels[type].color}>
          {typeLabels[type].text}
        </Tag>
      ),
    },
    {
      title: '目标金额',
      dataIndex: 'targetAmount',
      key: 'targetAmount',
      width: 120,
      align: 'right',
      render: (val: number) => `¥${val.toLocaleString()}`,
    },
    {
      title: '当前金额',
      dataIndex: 'currentAmount',
      key: 'currentAmount',
      width: 120,
      align: 'right',
      render: (val: number) => `¥${val.toLocaleString()}`,
    },
    {
      title: '开始日期',
      dataIndex: 'startDate',
      key: 'startDate',
      width: 120,
      render: (date: string) => dayjs(date).format('YYYY-MM-DD'),
    },
    {
      title: '结束日期',
      dataIndex: 'endDate',
      key: 'endDate',
      width: 120,
      render: (date: string) => dayjs(date).format('YYYY-MM-DD'),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status: keyof typeof statusLabels) => (
        <Tag color={statusLabels[status].color}>
          {statusLabels[status].text}
        </Tag>
      ),
    },
    {
      title: '优先级',
      dataIndex: 'priority',
      key: 'priority',
      width: 100,
      render: (priority: keyof typeof priorityLabels) => (
        <Tag color={priorityLabels[priority].color}>
          {priorityLabels[priority].text}
        </Tag>
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

  return (
    <div className="p-4 space-y-4">
      <Card
        title="目标设定"
        extra={
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              setSelectedGoal(null);
              setFormVisible(true);
            }}
          >
            新增目标
          </Button>
        }
      >
        <Table<IGoal>
          columns={columns}
          dataSource={mockGoals}
          rowKey="id"
          pagination={false}
        />
      </Card>

      <Modal
        title={selectedGoal ? '编辑目标' : '新增目标'}
        open={formVisible}
        onCancel={() => {
          setFormVisible(false);
          setSelectedGoal(null);
        }}
        footer={null}
        width={700}
      >
        <GoalForm
          initialValues={selectedGoal || undefined}
          onSubmit={handleFormSubmit}
          onCancel={() => {
            setFormVisible(false);
            setSelectedGoal(null);
          }}
        />
      </Modal>
    </div>
  );
} 