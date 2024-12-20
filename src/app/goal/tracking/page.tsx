'use client';

import { useState } from 'react';
import { Card, Row, Col, Progress, Tag, Space, DatePicker, Select, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { IGoalProgress } from '@/types/goal';
import { Line } from '@ant-design/plots';
import dayjs from 'dayjs';

// 模拟数据
const mockProgress: IGoalProgress = {
  goalId: '1',
  progress: 60,
  remainingDays: 180,
  expectedAmount: 300000,
  deviation: -20000,
  status: 'in_progress',
  recentTransactions: [
    { date: '2024-03-01', amount: 5000, type: 'deposit' },
    { date: '2024-03-15', amount: -1000, type: 'withdraw' },
    { date: '2024-03-28', amount: 3000, type: 'deposit' },
  ],
};

// 模拟趋势数据
const mockTrendData = [
  { date: '2024-01', target: 100000, actual: 80000 },
  { date: '2024-02', target: 200000, actual: 170000 },
  { date: '2024-03', target: 300000, actual: 280000 },
];

// 模拟目标数据
const mockGoals = [
  { label: '买房首付', value: '1' },
  { label: '还清信用卡', value: '2' },
  { label: '购买新车', value: '3' },
];

export default function GoalTrackingPage() {
  const [currentGoal, setCurrentGoal] = useState('1');

  // 趋势图配置
  const trendConfig = {
    data: mockTrendData.map(item => [
      { date: item.date, type: '目标', value: item.target },
      { date: item.date, type: '实际', value: item.actual },
    ]).flat(),
    xField: 'date',
    yField: 'value',
    seriesField: 'type',
    smooth: true,
    legend: {
      position: 'top',
    },
    yAxis: {
      label: {
        formatter: (v: string) => `¥${Number(v).toLocaleString()}`,
      },
    },
    tooltip: {
      formatter: (datum: any) => ({
        name: datum.type,
        value: `¥${datum.value.toLocaleString()}`,
      }),
    },
  };

  const columns: ColumnsType<typeof mockProgress.recentTransactions[0]> = [
    {
      title: '日期',
      dataIndex: 'date',
      key: 'date',
      width: 120,
      render: (date: string) => dayjs(date).format('YYYY-MM-DD'),
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      width: 100,
      render: (type: 'deposit' | 'withdraw') => (
        <Tag color={type === 'deposit' ? 'success' : 'error'}>
          {type === 'deposit' ? '存入' : '支出'}
        </Tag>
      ),
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
  ];

  return (
    <div className="p-4 space-y-4">
      <Card size="small">
        <Select
          className="w-64"
          value={currentGoal}
          onChange={setCurrentGoal}
          options={mockGoals}
          placeholder="请选择目标"
        />
      </Card>

      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card size="small">
            <Row gutter={16}>
              <Col span={8}>
                <div className="text-gray-500 mb-2">目标进度</div>
                <Progress
                  percent={mockProgress.progress}
                  status={mockProgress.deviation < 0 ? 'exception' : 'success'}
                />
              </Col>
              <Col span={8}>
                <div className="text-gray-500 mb-2">剩余天数</div>
                <div className="text-2xl font-medium">
                  {mockProgress.remainingDays}天
                </div>
              </Col>
              <Col span={8}>
                <div className="text-gray-500 mb-2">进度偏差</div>
                <div className={`text-2xl font-medium ${mockProgress.deviation >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {mockProgress.deviation >= 0 ? '+' : ''}
                  ¥{mockProgress.deviation.toLocaleString()}
                </div>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col span={16}>
          <Card title="目标进度趋势" size="small">
            <div style={{ height: 300 }}>
              <Line {...trendConfig} />
            </div>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="最近变动" size="small">
            <Table<typeof mockProgress.recentTransactions[0]>
              columns={columns}
              dataSource={mockProgress.recentTransactions.map(item => ({
                ...item,
                key: `${item.date}_${item.amount}`,
              }))}
              size="small"
              pagination={false}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
} 