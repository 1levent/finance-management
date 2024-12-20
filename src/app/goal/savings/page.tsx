'use client';

import { useState } from 'react';
import { Card, Table, Button, Tag, Space, Modal, App, Switch } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import type { ISavingsPlan } from '@/types/goal';
import SavingsPlanForm from '@/components/features/goal/SavingsPlanForm';

// 模拟数据
const mockSavingsPlans: ISavingsPlan[] = [
  {
    id: '1',
    goalId: '1',
    monthlyAmount: 5000,
    frequency: 'monthly',
    autoDeduct: true,
    sourceAccountId: 'bank_1',
    sourceAccountName: '工商银行储蓄卡',
    enabled: true,
  },
  {
    id: '2',
    goalId: '2',
    monthlyAmount: 2000,
    frequency: 'weekly',
    autoDeduct: false,
    enabled: true,
  },
];

const frequencyLabels = {
  monthly: { text: '每月', color: 'blue' },
  weekly: { text: '每周', color: 'green' },
  daily: { text: '每日', color: 'orange' },
};

export default function SavingsPage() {
  const { message, modal } = App.useApp();
  const [selectedPlan, setSelectedPlan] = useState<ISavingsPlan | null>(null);
  const [formVisible, setFormVisible] = useState(false);

  const handleDelete = (record: ISavingsPlan) => {
    modal.confirm({
      title: '确认删除',
      content: '确定要删除这个存款计划吗？',
      onOk() {
        message.success('删除成功');
      },
    });
  };

  const handleToggleEnabled = (record: ISavingsPlan, checked: boolean) => {
    message.success(`${checked ? '启用' : '禁用'}成功`);
  };

  const handleEdit = (record: ISavingsPlan) => {
    setSelectedPlan(record);
    setFormVisible(true);
  };

  const handleFormSubmit = (values: ISavingsPlan) => {
    if (selectedPlan) {
      message.success('编辑成功');
    } else {
      message.success('新增成功');
    }
    setFormVisible(false);
    setSelectedPlan(null);
  };

  const columns: ColumnsType<ISavingsPlan> = [
    {
      title: '目标',
      dataIndex: 'goalId',
      key: 'goalId',
      width: 150,
      render: (_, record) => record.sourceAccountName || '-',
    },
    {
      title: '存款金额',
      dataIndex: 'monthlyAmount',
      key: 'monthlyAmount',
      width: 120,
      align: 'right',
      render: (val: number) => `¥${val.toLocaleString()}`,
    },
    {
      title: '存款频率',
      dataIndex: 'frequency',
      key: 'frequency',
      width: 100,
      render: (frequency: keyof typeof frequencyLabels) => (
        <Tag color={frequencyLabels[frequency].color}>
          {frequencyLabels[frequency].text}
        </Tag>
      ),
    },
    {
      title: '自动扣款',
      dataIndex: 'autoDeduct',
      key: 'autoDeduct',
      width: 100,
      render: (val: boolean) => (
        <Tag color={val ? 'success' : 'default'}>
          {val ? '是' : '否'}
        </Tag>
      ),
    },
    {
      title: '来源账户',
      dataIndex: 'sourceAccountName',
      key: 'sourceAccountName',
      width: 200,
      render: (val: string) => val || '-',
    },
    {
      title: '状态',
      dataIndex: 'enabled',
      key: 'enabled',
      width: 100,
      render: (enabled: boolean, record) => (
        <Switch
          checked={enabled}
          onChange={(checked) => handleToggleEnabled(record, checked)}
        />
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
        title="存款计划"
        extra={
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              setSelectedPlan(null);
              setFormVisible(true);
            }}
          >
            新增计划
          </Button>
        }
      >
        <Table<ISavingsPlan>
          columns={columns}
          dataSource={mockSavingsPlans}
          rowKey="id"
          pagination={false}
        />
      </Card>

      <Modal
        title={selectedPlan ? '编辑存款计划' : '新增存款计划'}
        open={formVisible}
        onCancel={() => {
          setFormVisible(false);
          setSelectedPlan(null);
        }}
        footer={null}
        width={600}
      >
        <SavingsPlanForm
          initialValues={selectedPlan || undefined}
          onSubmit={handleFormSubmit}
          onCancel={() => {
            setFormVisible(false);
            setSelectedPlan(null);
          }}
        />
      </Modal>
    </div>
  );
} 