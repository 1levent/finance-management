'use client';

import { Line } from '@ant-design/plots';
import { Radio, Space, Select } from 'antd';
import { useState } from 'react';

interface ITrendData {
  date: string;
  value: number;
  type: string;
}

// 模拟数据
const mockData: ITrendData[] = [
  { date: '2024-03-20 09:30', value: 3050.25, type: '上证指数' },
  { date: '2024-03-20 10:00', value: 3045.68, type: '上证指数' },
  { date: '2024-03-20 10:30', value: 3042.35, type: '上证指数' },
  { date: '2024-03-20 11:00', value: 3038.45, type: '上证指数' },
  { date: '2024-03-20 09:30', value: 9900.56, type: '深证成指' },
  { date: '2024-03-20 10:00', value: 9885.23, type: '深证成指' },
  { date: '2024-03-20 10:30', value: 9870.45, type: '深证成指' },
  { date: '2024-03-20 11:00', value: 9856.23, type: '深证成指' },
];

const indexOptions = [
  { label: '上证指数', value: '000001.SH' },
  { label: '深证成指', value: '399001.SZ' },
  { label: '创业板指', value: '399006.SZ' },
  { label: '科创50', value: '000688.SH' },
];

export default function MarketTrends() {
  const [period, setPeriod] = useState<'day' | 'week' | 'month'>('day');
  const [selectedIndices, setSelectedIndices] = useState<string[]>(['000001.SH', '399001.SZ']);

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
    xAxis: {
      type: 'time',
      tickCount: 8,
    },
    yAxis: {
      label: {
        formatter: (v: string) => Number(v).toFixed(2),
      },
    },
    legend: {
      position: 'top',
    },
    tooltip: {
      showMarkers: true,
      formatter: (datum: ITrendData) => {
        return {
          name: datum.type,
          value: datum.value.toFixed(2),
        };
      },
    },
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-base font-medium">市场趋势</h3>
        <Space>
          <Select
            mode="multiple"
            style={{ width: 300 }}
            placeholder="选择指数"
            value={selectedIndices}
            onChange={setSelectedIndices}
            options={indexOptions}
            maxTagCount="responsive"
          />
          <Radio.Group value={period} onChange={(e) => setPeriod(e.target.value)}>
            <Radio.Button value="day">日内</Radio.Button>
            <Radio.Button value="week">周线</Radio.Button>
            <Radio.Button value="month">月线</Radio.Button>
          </Radio.Group>
        </Space>
      </div>
      <div style={{ height: 350 }}>
        <Line {...config} />
      </div>
    </div>
  );
} 