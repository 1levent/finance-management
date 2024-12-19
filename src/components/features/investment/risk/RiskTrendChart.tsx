'use client';

import { Line } from '@ant-design/plots';
import { Radio, Space } from 'antd';
import { useState } from 'react';

interface ITrendData {
  date: string;
  score: number;
  type: string;
}

// 模拟数据
const mockData: ITrendData[] = [
  { date: '2024-01-01', score: 65, type: '综合风险' },
  { date: '2024-01-08', score: 70, type: '综合风险' },
  { date: '2024-01-15', score: 75, type: '综合风险' },
  { date: '2024-01-01', score: 60, type: '持仓集中度' },
  { date: '2024-01-08', score: 75, type: '持仓集中度' },
  { date: '2024-01-15', score: 80, type: '持仓集中度' },
  { date: '2024-01-01', score: 70, type: '市场波动' },
  { date: '2024-01-08', score: 65, type: '市场波动' },
  { date: '2024-01-15', score: 70, type: '市场波动' },
];

export default function RiskTrendChart() {
  const [period, setPeriod] = useState<'week' | 'month' | 'year'>('month');

  const config = {
    data: mockData,
    xField: 'date',
    yField: 'score',
    seriesField: 'type',
    smooth: true,
    animation: {
      appear: {
        animation: 'path-in',
        duration: 1000,
      },
    },
    yAxis: {
      min: 0,
      max: 100,
      label: {
        formatter: (v: string) => `${v}分`,
      },
    },
    legend: {
      position: 'top',
    },
    annotations: [
      {
        type: 'regionFilter',
        start: ['min', 80],
        end: ['max', 100],
        color: 'rgba(255, 0, 0, 0.1)',
      },
      {
        type: 'line',
        start: ['min', 80],
        end: ['max', 80],
        style: {
          stroke: '#ff4d4f',
          lineDash: [4, 4],
        },
      },
      {
        type: 'text',
        position: ['min', 80],
        content: '高风险警戒线',
        offsetY: -5,
        style: {
          fill: '#ff4d4f',
          fontSize: 12,
        },
      },
    ],
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-base font-medium">风险趋势</h3>
        <Radio.Group value={period} onChange={(e) => setPeriod(e.target.value)}>
          <Radio.Button value="week">周</Radio.Button>
          <Radio.Button value="month">月</Radio.Button>
          <Radio.Button value="year">年</Radio.Button>
        </Radio.Group>
      </div>
      <div style={{ height: 350 }}>
        <Line {...config} />
      </div>
    </div>
  );
} 