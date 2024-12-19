'use client';

import { Card, Row, Col, Progress, Button, List, Tag, Space } from 'antd';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

type Priority = 'high' | 'medium' | 'low';

interface IGoal {
  id: number;
  name: string;
  target: number;
  current: number;
  deadline: string;
  priority: Priority;
}

interface IProgressData {
  month: string;
  amount: number;
}

interface IGoalsData {
  overview: {
    totalTarget: number;
    currentAmount: number;
    monthlyInvestment: number;
    timeRemaining: number;
  };
  goals: IGoal[];
  progress: IProgressData[];
}

const goalsData: IGoalsData = {
  overview: {
    totalTarget: 1000000,
    currentAmount: 650000,
    monthlyInvestment: 8000,
    timeRemaining: 24, // 月数
  },
  goals: [
    {
      id: 1,
      name: '购房首付',
      target: 500000,
      current: 400000,
      deadline: '2024-12',
      priority: 'high',
    },
    {
      id: 2,
      name: '子女教育',
      target: 300000,
      current: 150000,
      deadline: '2025-06',
      priority: 'medium',
    },
    {
      id: 3,
      name: '退休储备',
      target: 200000,
      current: 100000,
      deadline: '2025-12',
      priority: 'low',
    },
  ],
  progress: Array.from({ length: 6 }, (_, i) => ({
    month: `2024-${String(i + 1).padStart(2, '0')}`,
    amount: 550000 + i * 20000 + Math.random() * 10000,
  })),
};

const priorityColors: Record<Priority, string> = {
  high: '#ff4d4f',
  medium: '#faad14',
  low: '#52c41a',
};

const priorityLabels: Record<Priority, string> = {
  high: '高',
  medium: '中',
  low: '低',
};

export default function GoalsPage() {
  return (
    <div className="p-4">
      <Row gutter={[16, 16]}>
        {/* 总体进度 */}
        <Col xs={24} sm={12} lg={6}>
          <Card title="总体进度" size="small">
            <div className="text-center">
              <Progress
                type="dashboard"
                size={120}
                percent={Math.round((goalsData.overview.currentAmount / goalsData.overview.totalTarget) * 100)}
                format={percent => (
                  <div className="space-y-1">
                    <div className="text-xl font-bold">{percent}%</div>
                    <div className="text-xs text-gray-500">目标完成度</div>
                  </div>
                )}
              />
            </div>
          </Card>
        </Col>

        {/* 每月投资 */}
        <Col xs={24} sm={12} lg={6}>
          <Card title="每月投资" size="small">
            <div className="text-center space-y-2">
              <div className="text-2xl font-bold text-blue-500">
                ¥{goalsData.overview.monthlyInvestment.toLocaleString()}
              </div>
              <div className="text-xs text-gray-500">
                剩余{goalsData.overview.timeRemaining}个月
              </div>
              <Button type="primary" size="small">调整计划</Button>
            </div>
          </Card>
        </Col>

        {/* 目标列表 */}
        <Col xs={24} lg={12}>
          <Card title="投资目标" size="small" extra={<Button type="link" size="small">添加目标</Button>}>
            <List
              size="small"
              dataSource={goalsData.goals}
              renderItem={item => (
                <List.Item>
                  <div className="w-full">
                    <Space className="w-full justify-between text-xs">
                      <span className="font-medium">{item.name}</span>
                      <Tag color={priorityColors[item.priority]}>
                        {priorityLabels[item.priority]}优先级
                      </Tag>
                    </Space>
                    <Progress
                      percent={Math.round((item.current / item.target) * 100)}
                      size="small"
                      format={percent => (
                        <span className="text-xs">
                          {item.current.toLocaleString()}/{item.target.toLocaleString()}
                        </span>
                      )}
                    />
                    <div className="text-xs text-gray-400">
                      目标完成时间: {item.deadline}
                    </div>
                  </div>
                </List.Item>
              )}
            />
          </Card>
        </Col>

        {/* 进度趋势 */}
        <Col span={24}>
          <Card title="目标进度趋势" size="small">
            <div style={{ height: 240 }}>
              <ResponsiveContainer>
                <LineChart data={goalsData.progress}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value: number) => [`¥${value.toLocaleString()}`, '累计金额']}
                  />
                  <Line
                    type="monotone"
                    dataKey="amount"
                    stroke="#1677ff"
                    strokeWidth={2}
                    dot={{ fill: '#fff', stroke: '#1677ff', strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
} 