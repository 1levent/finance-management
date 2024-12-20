'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, Row, Col, Statistic, Table, Progress, Tag, Space, Avatar, Tooltip } from 'antd';
import { Line, Pie } from '@antv/g2plot';
import type { ColumnsType } from 'antd/es/table';
import type { ISharedOverview, ISharedTransaction } from '@/types/shared';
import { TeamOutlined, BankOutlined, TransactionOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

// 模拟数据
const mockOverview: ISharedOverview = {
  totalBalance: 50000,
  memberCount: 4,
  accountCount: 2,
  recentTransactions: [
    {
      id: '1',
      accountId: '1',
      amount: 200,
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
  ],
  memberContributions: [
    { userId: '1', username: '张三', amount: 2000, percentage: 40 },
    { userId: '2', username: '李四', amount: 1500, percentage: 30 },
    { userId: '3', username: '王五', amount: 1000, percentage: 20 },
    { userId: '4', username: '赵六', amount: 500, percentage: 10 },
  ],
  categoryDistribution: [
    { category: '餐饮', amount: 2000, percentage: 40 },
    { category: '交通', amount: 1500, percentage: 30 },
    { category: '购物', amount: 1000, percentage: 20 },
    { category: '娱乐', amount: 500, percentage: 10 },
  ],
  monthlyTrend: [
    { month: '2024-01', income: 5000, expense: 4000 },
    { month: '2024-02', income: 6000, expense: 4500 },
    { month: '2024-03', income: 5500, expense: 5000 },
  ],
};

export default function SharedOverviewPage() {
  const trendChartRef = useRef<HTMLDivElement>(null);
  const trendInstanceRef = useRef<Line | null>(null);
  const pieChartRef = useRef<HTMLDivElement>(null);
  const pieInstanceRef = useRef<Pie | null>(null);

  useEffect(() => {
    if (!trendChartRef.current || !pieChartRef.current) return;

    // 初始化趋势图
    const trendData = mockOverview.monthlyTrend.map(item => [
      { month: item.month, type: '收入', value: item.income },
      { month: item.month, type: '支出', value: item.expense },
    ]).flat();

    trendInstanceRef.current = new Line(trendChartRef.current, {
      data: trendData,
      xField: 'month',
      yField: 'value',
      seriesField: 'type',
      smooth: true,
      animation: {
        appear: {
          animation: 'wave-in',
          duration: 1000,
        },
      },
      color: ['#1677ff', '#ff4d4f'],
      yAxis: {
        label: {
          formatter: (v: string) => `¥${Number(v).toLocaleString()}`,
        },
      },
      tooltip: {
        shared: true,
        showMarkers: true,
      },
      legend: {
        position: 'top',
      },
    });

    // 初始化饼图
    pieInstanceRef.current = new Pie(pieChartRef.current, {
      data: mockOverview.categoryDistribution,
      angleField: 'amount',
      colorField: 'category',
      radius: 0.8,
      label: {
        type: 'inner',
        offset: '-30%',
        content: '{percentage}',
        style: {
          fill: '#fff',
          fontSize: 14,
          textAlign: 'center',
        },
      },
      legend: {
        position: 'bottom',
      },
      interactions: [
        { type: 'element-active' },
      ],
    });

    trendInstanceRef.current.render();
    pieInstanceRef.current.render();

    return () => {
      if (trendInstanceRef.current) {
        trendInstanceRef.current.destroy();
      }
      if (pieInstanceRef.current) {
        pieInstanceRef.current.destroy();
      }
    };
  }, []);

  // 交易记录表格列配置
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
      width: 200,
      render: (_, record) => (
        <Space>
          <Avatar.Group
            max={{ 
              count: 3,
              popover: { 
                placement: 'top',
                title: '所有参与者',
                trigger: 'click'
              }
            }}
            size="small"
          >
            {record.participants.map(p => (
              <Tooltip key={p.userId} title={p.username}>
                <Avatar style={{ backgroundColor: '#1677ff' }}>
                  {p.username[0]}
                </Avatar>
              </Tooltip>
            ))}
          </Avatar.Group>
          <span className="text-gray-500">
            ({record.participants.length}人)
          </span>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-4 space-y-4">
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Card size="small" className="hover:shadow-md transition-shadow">
            <Statistic
              title={<div className="text-gray-500">总余额</div>}
              value={mockOverview.totalBalance}
              prefix="¥"
              precision={2}
              valueStyle={{ color: '#1677ff' }}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card size="small" className="hover:shadow-md transition-shadow">
            <Statistic
              title={<div className="text-gray-500">成员数量</div>}
              value={mockOverview.memberCount}
              prefix={<TeamOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card size="small" className="hover:shadow-md transition-shadow">
            <Statistic
              title={<div className="text-gray-500">账户数量</div>}
              value={mockOverview.accountCount}
              prefix={<BankOutlined />}
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col span={16}>
          <Card title="收支趋势" size="small">
            <div ref={trendChartRef} style={{ height: 300 }} />
          </Card>
        </Col>
        <Col span={8}>
          <Card title="支出分布" size="small">
            <div ref={pieChartRef} style={{ height: 300 }} />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col span={16}>
          <Card title="最近交易" size="small">
            <Table<ISharedTransaction>
              columns={columns}
              dataSource={mockOverview.recentTransactions.map(item => ({
                ...item,
                key: item.id,
              }))}
              size="small"
              pagination={false}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card title="成员贡献" size="small">
            {mockOverview.memberContributions.map(member => (
              <div key={member.userId} className="mb-4">
                <div className="flex justify-between mb-1">
                  <span>{member.username}</span>
                  <span>¥{member.amount.toLocaleString()}</span>
                </div>
                <Progress
                  percent={member.percentage}
                  size="small"
                  status={member.percentage >= 80 ? 'success' : 'normal'}
                />
              </div>
            ))}
          </Card>
        </Col>
      </Row>
    </div>
  );
} 