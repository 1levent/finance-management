'use client';

import { useState } from 'react';
import { Card, Row, Col, Progress, Alert, Statistic, DatePicker } from 'antd';
import { Pie } from '@ant-design/plots';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import type { IBudgetSummary, IBudgetAlert } from '@/types/budget';
import dayjs from 'dayjs';

// 模拟数据
const mockSummary: IBudgetSummary = {
  totalBudget: 10000,
  totalUsed: 6500,
  totalRemaining: 3500,
  progress: 65,
  status: 'warning',
  categoryStats: [
    {
      categoryId: '1',
      categoryName: '餐饮',
      budget: 3000,
      used: 2200,
      remaining: 800,
      progress: 73.33,
      status: 'warning',
    },
    {
      categoryId: '2',
      categoryName: '交通',
      budget: 1000,
      used: 900,
      remaining: 100,
      progress: 90,
      status: 'exceeded',
    },
    {
      categoryId: '3',
      categoryName: '购物',
      budget: 2000,
      used: 1200,
      remaining: 800,
      progress: 60,
      status: 'normal',
    },
  ],
};

const mockAlerts: IBudgetAlert[] = [
  {
    id: '1',
    categoryId: '1',
    categoryName: '餐饮',
    type: 'warning',
    threshold: 70,
    currentUsage: 73.33,
    createdAt: '2024-03-28',
    read: false,
  },
  {
    id: '2',
    categoryId: '2',
    categoryName: '交通',
    type: 'exceeded',
    threshold: 100,
    currentUsage: 110,
    createdAt: '2024-03-29',
    read: false,
  },
];

export default function BudgetOverviewPage() {
  const [currentPeriod, setCurrentPeriod] = useState(new Date());

  const renderAlerts = () => {
    if (mockAlerts.length === 0) return null;

    return (
      <div className="space-y-2">
        {mockAlerts.map(alert => (
          <Alert
            key={alert.id}
            type={alert.type === 'warning' ? 'warning' : 'error'}
            message={
              <span>
                {alert.categoryName}预算
                {alert.type === 'warning' ? '即将超支' : '已超支'}
                （当前使用率: {alert.currentUsage.toFixed(1)}%）
              </span>
            }
            showIcon
          />
        ))}
      </div>
    );
  };

  const renderCategoryStats = () => {
    const data = mockSummary.categoryStats.map(stat => ({
      type: stat.categoryName,
      value: stat.used,
    }));

    const config = {
      data,
      angleField: 'value',
      colorField: 'type',
      radius: 0.8,
      label: {
        autoRotate: false,
        formatter: (data: any) => {
          if (!data || typeof data !== 'object') return '';
          const total = data.reduce((acc: number, cur: any) => acc + cur.value, 0);
          const percent = ((data.value / total) * 100).toFixed(1);
          return `${data.type}\n${percent}%`;
        },
      },
      legend: {
        position: 'bottom',
        flipPage: false,
      },
      tooltip: {
        formatter: (data: any) => {
          if (!data || typeof data !== 'object') return {};
          return {
            name: data.type,
            value: `¥${data.value.toLocaleString()}`,
          };
        },
      },
      interactions: [
        {
          type: 'element-active',
        },
      ],
      animation: false,
    };

    return <Pie {...config} />;
  };

  return (
    <div className="p-4 space-y-4">
      <Row gutter={[16, 16]} className="mb-4">
        <Col span={24}>
          <DatePicker.MonthPicker
            value={dayjs(currentPeriod)}
            onChange={(date) => date && setCurrentPeriod(date.toDate())}
            allowClear={false}
          />
        </Col>
      </Row>

      {renderAlerts()}

      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Card size="small">
            <Statistic
              title="总预算"
              value={mockSummary.totalBudget}
              precision={2}
              prefix="¥"
            />
            <Progress
              percent={mockSummary.progress}
              status={
                mockSummary.status === 'exceeded'
                  ? 'exception'
                  : mockSummary.status === 'warning'
                  ? 'active'
                  : 'success'
              }
              strokeColor={
                mockSummary.status === 'exceeded'
                  ? '#ff4d4f'
                  : mockSummary.status === 'warning'
                  ? '#faad14'
                  : '#52c41a'
              }
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card size="small">
            <Statistic
              title="已使用"
              value={mockSummary.totalUsed}
              precision={2}
              prefix="¥"
              valueStyle={{ color: '#cf1322' }}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card size="small">
            <Statistic
              title="剩余预算"
              value={mockSummary.totalRemaining}
              precision={2}
              prefix="¥"
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Card title="分类预算使用情况" size="small">
            <div style={{ height: 300 }}>
              {renderCategoryStats()}
            </div>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="预算执行明细" size="small">
            {mockSummary.categoryStats.map(stat => (
              <div key={stat.categoryId} className="mb-4">
                <div className="flex justify-between mb-1">
                  <span>{stat.categoryName}</span>
                  <span>
                    ¥{stat.used.toLocaleString()} / ¥{stat.budget.toLocaleString()}
                  </span>
                </div>
                <Progress
                  percent={stat.progress}
                  size="small"
                  status={
                    stat.status === 'exceeded'
                      ? 'exception'
                      : stat.status === 'warning'
                      ? 'active'
                      : 'success'
                  }
                  strokeColor={
                    stat.status === 'exceeded'
                      ? '#ff4d4f'
                      : stat.status === 'warning'
                      ? '#faad14'
                      : '#52c41a'
                  }
                />
              </div>
            ))}
          </Card>
        </Col>
      </Row>
    </div>
  );
} 