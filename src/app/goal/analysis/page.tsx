'use client';

import { useState } from 'react';
import { Card, Row, Col, Select, Statistic, Table, Tag } from 'antd';
import { Line, Column } from '@ant-design/plots';
import type { ColumnsType } from 'antd/es/table';
import type { IGoalAnalysis } from '@/types/goal';
import dayjs from 'dayjs';

// 模拟目标数据
const mockGoals = [
  { label: '买房首付', value: '1' },
  { label: '还清信用卡', value: '2' },
  { label: '购买新车', value: '3' },
];

// 模拟分析数据
const mockAnalysis: IGoalAnalysis = {
  goalId: '1',
  completionRate: 60,
  avgMonthlyAmount: 5000,
  bestMonth: {
    date: '2024-02',
    amount: 8000,
  },
  worstMonth: {
    date: '2024-01',
    amount: 3000,
  },
  monthlyTrend: [
    { date: '2024-01', amount: 3000 },
    { date: '2024-02', amount: 8000 },
    { date: '2024-03', amount: 5000 },
  ],
  suggestions: [
    '建议增加每月存款金额以达成目标',
    '可以考虑开启自动存款功能',
    '合理控制日常支出',
  ],
};

export default function GoalAnalysisPage() {
  const [currentGoal, setCurrentGoal] = useState('1');

  // 趋势图配置
  const trendConfig = {
    data: mockAnalysis.monthlyTrend,
    xField: 'date',
    yField: 'amount',
    meta: {
      amount: {
        alias: '存款金额',
      },
    },
    yAxis: {
      label: {
        formatter: (v: string) => `¥${Number(v).toLocaleString()}`,
      },
    },
    tooltip: {
      formatter: (datum: any) => ({
        name: '存款金额',
        value: `¥${datum.amount.toLocaleString()}`,
      }),
    },
  };

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
        <Col span={6}>
          <Card size="small" className="hover:shadow-md transition-shadow">
            <Statistic
              title={<div className="text-gray-500">完成率</div>}
              value={mockAnalysis.completionRate}
              suffix="%"
              precision={1}
              valueStyle={{ 
                color: mockAnalysis.completionRate >= 80 ? '#52c41a' : 
                       mockAnalysis.completionRate >= 60 ? '#faad14' : '#ff4d4f' 
              }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card size="small" className="hover:shadow-md transition-shadow">
            <Statistic
              title={<div className="text-gray-500">月均存款</div>}
              value={mockAnalysis.avgMonthlyAmount}
              prefix="¥"
              precision={2}
              valueStyle={{ color: '#1677ff' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card size="small" className="hover:shadow-md transition-shadow">
            <Statistic
              title={<div className="text-gray-500">最佳月份</div>}
              value={mockAnalysis.bestMonth.amount}
              prefix="¥"
              suffix={
                <span className="text-sm text-gray-400 ml-2">
                  {dayjs(mockAnalysis.bestMonth.date).format('YYYY-MM')}
                </span>
              }
              precision={2}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card size="small" className="hover:shadow-md transition-shadow">
            <Statistic
              title={<div className="text-gray-500">最差月份</div>}
              value={mockAnalysis.worstMonth.amount}
              prefix="¥"
              suffix={
                <span className="text-sm text-gray-400 ml-2">
                  {dayjs(mockAnalysis.worstMonth.date).format('YYYY-MM')}
                </span>
              }
              precision={2}
              valueStyle={{ color: '#ff4d4f' }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col span={16}>
          <Card title="月度存款趋势" size="small">
            <div style={{ height: 300 }}>
              <Column {...trendConfig} />
            </div>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="改进建议" size="small">
            <ul className="list-disc list-inside space-y-2">
              {mockAnalysis.suggestions.map((suggestion, index) => (
                <li key={index} className="text-gray-600">
                  {suggestion}
                </li>
              ))}
            </ul>
          </Card>
        </Col>
      </Row>
    </div>
  );
} 