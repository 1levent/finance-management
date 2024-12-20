'use client';

import { useState } from 'react';
import { Card, Table, Button, Tag, Space, Switch, Modal, App, Tabs } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import type { IBudgetSetting } from '@/types/budget';
import BudgetSettingForm from '@/components/features/budget/BudgetSettingForm';

// 模拟数据
const mockSettings: IBudgetSetting[] = [
  {
    id: '1',
    categoryId: '1',
    categoryName: '餐饮',
    type: 'expense',
    amount: 3000,
    period: 'monthly',
    warningThreshold: 70,
    rollover: false,
    enabled: true,
  },
  {
    id: '2',
    categoryId: '2',
    categoryName: '交通',
    type: 'expense',
    amount: 1000,
    period: 'monthly',
    warningThreshold: 80,
    rollover: false,
    enabled: true,
  },
  {
    id: '3',
    categoryId: '3',
    categoryName: '工资',
    type: 'income',
    amount: 10000,
    period: 'monthly',
    warningThreshold: 0,
    rollover: false,
    enabled: true,
  },
];

export default function BudgetSettingsPage() {
  const { message, modal } = App.useApp();
  const [selectedSetting, setSelectedSetting] = useState<IBudgetSetting | null>(null);
  const [formVisible, setFormVisible] = useState(false);

  const handleDelete = (record: IBudgetSetting) => {
    modal.confirm({
      title: '确认删除',
      content: `确定要删除 ${record.categoryName} 的预算设置吗？`,
      onOk() {
        message.success('删除成功');
      },
    });
  };

  const handleToggleEnabled = (record: IBudgetSetting, checked: boolean) => {
    message.success(`${checked ? '启用' : '禁用'}成功`);
  };

  const handleEdit = (record: IBudgetSetting) => {
    setSelectedSetting(record);
    setFormVisible(true);
  };

  const handleFormSubmit = (values: IBudgetSetting) => {
    if (selectedSetting) {
      message.success('编辑成功');
    } else {
      message.success('新增成功');
    }
    setFormVisible(false);
    setSelectedSetting(null);
  };

  const columns: ColumnsType<IBudgetSetting> = [
    {
      title: '分类名称',
      dataIndex: 'categoryName',
      key: 'categoryName',
      width: 150,
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      width: 100,
      render: (type: 'income' | 'expense') => (
        <Tag color={type === 'income' ? 'success' : 'error'}>
          {type === 'income' ? '收入' : '支出'}
        </Tag>
      ),
    },
    {
      title: '预算金额',
      dataIndex: 'amount',
      key: 'amount',
      width: 120,
      align: 'right',
      render: (val: number) => `¥${val.toLocaleString()}`,
    },
    {
      title: '预算周期',
      dataIndex: 'period',
      key: 'period',
      width: 100,
      render: (period: string) => ({
        monthly: '每月',
        quarterly: '每季',
        yearly: '每年',
      }[period]),
    },
    {
      title: '预警阈值',
      dataIndex: 'warningThreshold',
      key: 'warningThreshold',
      width: 100,
      render: (val: number) => `${val}%`,
    },
    {
      title: '结转',
      dataIndex: 'rollover',
      key: 'rollover',
      width: 80,
      render: (val: boolean) => (
        <Tag color={val ? 'processing' : 'default'}>
          {val ? '是' : '否'}
        </Tag>
      ),
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
        title="预算设置"
        extra={
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              setSelectedSetting(null);
              setFormVisible(true);
            }}
          >
            新增预算
          </Button>
        }
      >
        <Table<IBudgetSetting>
          columns={columns}
          dataSource={mockSettings}
          rowKey="id"
          pagination={false}
        />
      </Card>

      <Modal
        title={selectedSetting ? '编辑预算' : '新增预算'}
        open={formVisible}
        onCancel={() => {
          setFormVisible(false);
          setSelectedSetting(null);
        }}
        footer={null}
        width={600}
      >
        <BudgetSettingForm
          initialValues={selectedSetting || undefined}
          onSubmit={handleFormSubmit}
          onCancel={() => {
            setFormVisible(false);
            setSelectedSetting(null);
          }}
        />
      </Modal>
    </div>
  );
} 