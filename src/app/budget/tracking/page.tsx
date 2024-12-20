'use client';

import { useState } from 'react';
import { Card, Table, Tag, Space, DatePicker, Select, Row, Col } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { IBudgetItem } from '@/types/budget';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;

// 模拟数据
const mockData: IBudgetItem[] = [
  {
    id: '1',
    categoryId: '1',
    categoryName: '餐饮',
    type: 'expense',
    amount: 3000,
    used: 2200,
    remaining: 800,
    status: 'warning',
    period: 'monthly',
    startDate: '2024-03-01',
    endDate: '2024-03-31',
  },
  {
    id: '2',
    categoryId: '2',
    categoryName: '交通',
    type: 'expense',
    amount: 1000,
    used: 900,
    remaining: 100,
    status: 'exceeded',
    period: 'monthly',
    startDate: '2024-03-01',
    endDate: '2024-03-31',
  },
  {
    id: '3',
    categoryId: '3',
    categoryName: '工资',
    type: 'income',
    amount: 10000,
    used: 10000,
    remaining: 0,
    status: 'normal',
    period: 'monthly',
    startDate: '2024-03-01',
    endDate: '2024-03-31',
  },
];

const statusLabels = {
  normal: { text: '正常', color: 'success' },
  warning: { text: '预警', color: 'warning' },
  exceeded: { text: '超支', color: 'error' },
};

export default function BudgetTrackingPage() {
  const [dateRange, setDateRange] = useState<[dayjs.Dayjs, dayjs.Dayjs]>([
    dayjs().startOf('month'),
    dayjs().endOf('month'),
  ]);
  const [type, setType] = useState<'all' | 'income' | 'expense'>('all');
  const [status, setStatus] = useState<'all' | 'normal' | 'warning' | 'exceeded'>('all');

  const columns: ColumnsType<IBudgetItem> = [
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
      title: '已使用',
      dataIndex: 'used',
      key: 'used',
      width: 120,
      align: 'right',
      render: (val: number) => `¥${val.toLocaleString()}`,
    },
    {
      title: '剩余',
      dataIndex: 'remaining',
      key: 'remaining',
      width: 120,
      align: 'right',
      render: (val: number) => `¥${val.toLocaleString()}`,
    },
    {
      title: '使用率',
      key: 'usage',
      width: 120,
      align: 'right',
      render: (_, record) => `${((record.used / record.amount) * 100).toFixed(1)}%`,
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
      title: '周期',
      key: 'period',
      width: 200,
      render: (_, record) => (
        <span>
          {dayjs(record.startDate).format('YYYY-MM-DD')} 至{' '}
          {dayjs(record.endDate).format('YYYY-MM-DD')}
        </span>
      ),
    },
  ];

  const filteredData = mockData.filter(item => {
    if (type !== 'all' && item.type !== type) return false;
    if (status !== 'all' && item.status !== status) return false;
    return true;
  });

  return (
    <div className="p-4 space-y-4">
      <Card>
        <Row gutter={[16, 16]} className="mb-4">
          <Col span={8}>
            <RangePicker
              value={dateRange}
              onChange={(dates) => dates && setDateRange(dates as [dayjs.Dayjs, dayjs.Dayjs])}
              allowClear={false}
            />
          </Col>
          <Col span={8}>
            <Select
              className="w-full"
              value={type}
              onChange={setType}
              options={[
                { label: '全部类型', value: 'all' },
                { label: '收入', value: 'income' },
                { label: '支出', value: 'expense' },
              ]}
            />
          </Col>
          <Col span={8}>
            <Select
              className="w-full"
              value={status}
              onChange={setStatus}
              options={[
                { label: '全部状态', value: 'all' },
                { label: '正常', value: 'normal' },
                { label: '预警', value: 'warning' },
                { label: '超支', value: 'exceeded' },
              ]}
            />
          </Col>
        </Row>

        <Table<IBudgetItem>
          columns={columns}
          dataSource={filteredData}
          rowKey="id"
          pagination={false}
        />
      </Card>
    </div>
  );
} 