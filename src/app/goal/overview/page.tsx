'use client';

import { useState } from 'react';
import { Card, Row, Col, Progress, Tag, Space, Button, Statistic } from 'antd';
import { PlusOutlined, ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import type { IGoal } from '@/types/goal';

// 模拟数据
const mockGoals: IGoal[] = [
  {
    id: '1',
    name: '买房首付',
    type: 'savings',
    targetAmount: 500000,
    currentAmount: 300000,
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    status: 'in_progress',
    priority: 'high',
    description: '攒够首付款',
  },
  {
    id: '2',
    name: '还清信用卡',
    type: 'debt',
    targetAmount: 50000,
    currentAmount: 20000,
    startDate: '2024-01-01',
    endDate: '2024-06-30',
    status: 'in_progress',
    priority: 'high',
    description: '清空信用卡债务',
  },
  {
    id: '3',
    name: '购买新车',
    type: 'purchase',
    targetAmount: 200000,
    currentAmount: 50000,
    startDate: '2024-01-01',
    endDate: '2025-12-31',
    status: 'in_progress',
    priority: 'medium',
    description: '购买一辆新车',
  },
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

export default function GoalOverviewPage() {
  return (
    <div className="p-4 space-y-4">
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Card size="small">
            <Statistic
              title="目标总额"
              value={750000}
              precision={2}
              prefix="¥"
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card size="small">
            <Statistic
              title="当前进度"
              value={370000}
              precision={2}
              prefix="¥"
              suffix={<Progress percent={49} size="small" className="ml-2 inline-block w-20" />}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card size="small">
            <Statistic
              title="本月存入"
              value={30000}
              precision={2}
              prefix="¥"
              valueStyle={{ color: '#3f8600' }}
              suffix={<ArrowUpOutlined />}
            />
          </Card>
        </Col>
      </Row>

      <Card
        title="目标列表"
        extra={
          <Button type="primary" icon={<PlusOutlined />}>
            新增目标
          </Button>
        }
      >
        <div className="space-y-4">
          {mockGoals.map(goal => (
            <Card key={goal.id} size="small" className="bg-gray-50">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-lg font-medium mb-2">{goal.name}</div>
                  <Space>
                    <Tag color={statusLabels[goal.status].color}>
                      {statusLabels[goal.status].text}
                    </Tag>
                    <Tag color={priorityLabels[goal.priority].color}>
                      {priorityLabels[goal.priority].text}优先级
                    </Tag>
                  </Space>
                </div>
                <div className="text-right">
                  <div className="mb-2">
                    <span className="text-2xl font-medium">
                      ¥{goal.currentAmount.toLocaleString()}
                    </span>
                    <span className="text-gray-500 ml-2">
                      / ¥{goal.targetAmount.toLocaleString()}
                    </span>
                  </div>
                  <Progress
                    percent={Math.round((goal.currentAmount / goal.targetAmount) * 100)}
                    size="small"
                    className="w-40"
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Card>
    </div>
  );
} 