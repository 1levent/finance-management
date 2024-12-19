'use client';

import { Line } from '@ant-design/plots';
import { Radio, Space } from 'antd';
import { useState } from 'react';

interface ITrendData {
  date: string;
  value: number;
  type: string;
}

// 模拟数据
const mockData: ITrendData[] = [
  { date: '2024-01', value: 10000, type: '总收益' },
  { date: '2024-02', value: 15000, type: '总收益' },
  { date: '2024-03', value: 12000, type: '总收益' },
  { date: '2024-01', value: 5000, type: '当期收益' },
  { date: '2024-02', value: 8000, type: '当期收益' },
  { date: '2024-03', value: -3000, type: '当期收益' },
];

export default function ProfitTrend() {
  const [period, setPeriod] = useState<'day' | 'month' | 'year'>('month');

  const config = {
    data: mockData,
    xField: 'date',
    yField: 'value',
    seriesField: 'type',
    smooth: true,
    animation: {
      appear: {
        animation: 'path-in',
        duration: 1000,
      },
    },
    yAxis: {
      label: {
        formatter: (v: string) => `¥${Number(v).toLocaleString()}`,
      },
    },
    legend: {
      position: 'top',
    },
    tooltip: {
      formatter: (datum: ITrendData) => {
        return {
          name: datum.type,
          value: `¥${datum.value.toLocaleString()}`,
        };
      },
    },
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-base font-medium">收益趋势</h3>
        <Radio.Group value={period} onChange={(e) => setPeriod(e.target.value)}>
          <Radio.Button value="day">日</Radio.Button>
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