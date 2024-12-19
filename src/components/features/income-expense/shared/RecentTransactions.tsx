'use client';

import { Table, Tag, Space } from 'antd';
import { useTransactionStore } from '@/store/transaction';
import dayjs from 'dayjs';

export default function RecentTransactions() {
  const { transactions } = useTransactionStore();

  const columns = [
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      width: 80,
      render: (type: string) => (
        <Tag color={type === 'income' ? 'success' : 'error'}>
          {type === 'income' ? '收入' : '支出'}
        </Tag>
      ),
    },
    {
      title: '金额',
      dataIndex: 'amount',
      key: 'amount',
      width: 120,
      align: 'right' as const,
      render: (amount: number, record: any) => (
        <span style={{ color: record.type === 'income' ? '#52c41a' : '#f5222d' }}>
          {record.type === 'income' ? '+' : '-'} ¥{amount.toFixed(2)}
        </span>
      ),
    },
    {
      title: '日期',
      dataIndex: 'date',
      key: 'date',
      width: 120,
      render: (date: string) => dayjs(date).format('YYYY-MM-DD'),
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={transactions.slice(0, 5)}  // 只显示最近5条
      rowKey="id"
      pagination={false}
      size="small"
    />
  );
} 