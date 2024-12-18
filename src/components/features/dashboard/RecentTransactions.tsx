'use client';

import { Card, Table, Tag, Button, Tooltip } from 'antd';
import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import type { ITransactionItem } from '@/types/dashboard';

interface IRecentTransactionsProps {
  data: ITransactionItem[];
}

export default function RecentTransactions({ data }: IRecentTransactionsProps) {
  const columns: ColumnsType<ITransactionItem> = [
    {
      title: '日期',
      dataIndex: 'date',
      key: 'date',
      width: 100,
      sorter: (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      width: 80,
      filters: [
        { text: '收入', value: 'income' },
        { text: '支出', value: 'expense' },
      ],
      onFilter: (value, record) => record.type === value,
      render: (type: 'income' | 'expense') => (
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
      align: 'right',
      sorter: (a, b) => a.amount - b.amount,
      render: (amount: number, record: ITransactionItem) => (
        <span style={{ color: record.type === 'income' ? '#3f8600' : '#cf1322' }}>
          {record.type === 'income' ? '+' : '-'} ¥{amount.toFixed(2)}
        </span>
      ),
    },
    {
      title: '分类',
      dataIndex: 'category',
      key: 'category',
      width: 100,
      filters: [
        { text: '工资', value: '工资' },
        { text: '餐饮', value: '餐饮' },
        // 更多分类...
      ],
      onFilter: (value, record) => record.category === value,
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    },
    {
      title: '操作',
      key: 'action',
      width: 120,
      render: (_, record) => (
        <div className="space-x-2">
          <Tooltip title="查看详情">
            <Button type="text" size="small" icon={<EyeOutlined />} />
          </Tooltip>
          <Tooltip title="编辑">
            <Button type="text" size="small" icon={<EditOutlined />} />
          </Tooltip>
          <Tooltip title="删除">
            <Button type="text" size="small" danger icon={<DeleteOutlined />} />
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <Card 
      title="最近交易" 
      className="mt-4"
      extra={
        <Button type="link" size="small">
          查看全部
        </Button>
      }
    >
      <Table
        columns={columns}
        dataSource={data}
        rowKey="id"
        pagination={{ pageSize: 5 }}
        size="small"
      />
    </Card>
  );
} 