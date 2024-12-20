'use client';

import { useState } from 'react';
import { Card, Table, Button, Tag, Space, Modal, App, DatePicker, Select, Avatar } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, FileTextOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import type { ISharedTransaction } from '@/types/shared';
import TransactionForm from '@/components/features/shared/TransactionForm';
import dayjs from 'dayjs';

// 模拟数据
const mockTransactions: ISharedTransaction[] = [
  {
    id: '1',
    accountId: '1',
    amount: -200,
    type: 'expense',
    category: '餐饮',
    description: '团队聚餐',
    date: '2024-03-28',
    createdBy: 'user1',
    createdAt: '2024-03-28',
    participants: [
      { userId: '1', username: '张三', share: 50, paid: true },
      { userId: '2', username: '李四', share: 50, paid: false },
      { userId: '3', username: '王五', share: 50, paid: true },
      { userId: '4', username: '赵六', share: 50, paid: false },
    ],
  },
  {
    id: '2',
    accountId: '1',
    amount: 1000,
    type: 'income',
    category: '报销',
    description: '项目经费',
    date: '2024-03-27',
    createdBy: 'user2',
    createdAt: '2024-03-27',
    participants: [
      { userId: '1', username: '张三', share: 500, paid: true },
      { userId: '2', username: '李四', share: 500, paid: true },
    ],
  },
];

// 模拟账户数据
const mockAccounts = [
  { label: '团队经费', value: '1' },
  { label: '项目资金', value: '2' },
];

export default function TransactionListPage() {
  const { message, modal } = App.useApp();
  const [selectedTransaction, setSelectedTransaction] = useState<ISharedTransaction | null>(null);
  const [formVisible, setFormVisible] = useState(false);
  const [currentAccount, setCurrentAccount] = useState<string>('1');

  const handleDelete = (record: ISharedTransaction) => {
    modal.confirm({
      title: '确认删除',
      content: '确定要删除这条记录吗？',
      onOk() {
        message.success('删除成功');
      },
    });
  };

  const handleEdit = (record: ISharedTransaction) => {
    setSelectedTransaction(record);
    setFormVisible(true);
  };

  const handleFormSubmit = (values: ISharedTransaction) => {
    if (selectedTransaction) {
      message.success('编辑成功');
    } else {
      message.success('新增成功');
    }
    setFormVisible(false);
    setSelectedTransaction(null);
  };

  const columns: ColumnsType<ISharedTransaction> = [
    {
      title: '日期',
      dataIndex: 'date',
      key: 'date',
      width: 100,
      render: (date: string) => dayjs(date).format('MM-DD'),
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      width: 100,
      render: (type: 'expense' | 'income' | 'transfer') => (
        <Tag color={type === 'income' ? 'success' : type === 'expense' ? 'error' : 'processing'}>
          {type === 'income' ? '收入' : type === 'expense' ? '支出' : '转账'}
        </Tag>
      ),
    },
    {
      title: '分类',
      dataIndex: 'category',
      key: 'category',
      width: 100,
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
      width: 200,
    },
    {
      title: '金额',
      dataIndex: 'amount',
      key: 'amount',
      width: 120,
      align: 'right',
      render: (amount: number) => (
        <span className={amount >= 0 ? 'text-green-500' : 'text-red-500'}>
          {amount >= 0 ? '+' : ''}{amount.toLocaleString()}
        </span>
      ),
    },
    {
      title: '参与者',
      key: 'participants',
      width: 250,
      render: (_, record) => (
        <Space>
          <Avatar.Group maxCount={3} maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>
            {record.participants.map(p => (
              <Avatar key={p.userId}>{p.username[0]}</Avatar>
            ))}
          </Avatar.Group>
          <span className="text-gray-500">
            ({record.participants.length}人)
          </span>
        </Space>
      ),
    },
    {
      title: '状态',
      key: 'status',
      width: 120,
      render: (_, record) => {
        const unpaidCount = record.participants.filter(p => !p.paid).length;
        return (
          <Tag color={unpaidCount === 0 ? 'success' : 'warning'}>
            {unpaidCount === 0 ? '已结清' : `待付款(${unpaidCount})`}
          </Tag>
        );
      },
    },
    {
      title: '操作',
      key: 'action',
      width: 180,
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
            icon={<FileTextOutlined />}
            onClick={() => message.info('查看详情')}
          >
            详情
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
      <Card>
        <Space className="w-full justify-between">
          <Space>
            <Select
              value={currentAccount}
              onChange={setCurrentAccount}
              options={mockAccounts}
              style={{ width: 200 }}
            />
            <DatePicker.RangePicker />
          </Space>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              setSelectedTransaction(null);
              setFormVisible(true);
            }}
          >
            新增记录
          </Button>
        </Space>
      </Card>

      <Card>
        <Table<ISharedTransaction>
          columns={columns}
          dataSource={mockTransactions.map(item => ({
            ...item,
            key: item.id,
          }))}
          pagination={{
            total: mockTransactions.length,
            pageSize: 10,
            showTotal: (total) => `共 ${total} 条记录`,
          }}
        />
      </Card>

      <Modal
        title={selectedTransaction ? '编辑记录' : '新增记录'}
        open={formVisible}
        onCancel={() => {
          setFormVisible(false);
          setSelectedTransaction(null);
        }}
        footer={null}
        width={800}
      >
        <TransactionForm
          initialValues={selectedTransaction || undefined}
          onSubmit={handleFormSubmit}
          onCancel={() => {
            setFormVisible(false);
            setSelectedTransaction(null);
          }}
        />
      </Modal>
    </div>
  );
} 