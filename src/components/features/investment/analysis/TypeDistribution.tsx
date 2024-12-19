'use client';

import { Pie } from '@ant-design/plots';
import { Radio } from 'antd';
import { useState } from 'react';

interface IDistributionData {
  type: string;
  value: number;
}

// 模拟数据
const mockData: IDistributionData[] = [
  { type: '股票', value: 500000 },
  { type: '基金', value: 300000 },
  { type: '债券', value: 150000 },
  { type: '其他', value: 50000 },
];

export default function TypeDistribution() {
  const [metric, setMetric] = useState<'assets' | 'profit'>('assets');

  const config = {
    data: mockData,
    angleField: 'value',
    colorField: 'type',
    radius: 0.8,
    label: {
      type: 'outer',
      formatter: (datum: IDistributionData) => {
        const percent = datum.value / mockData.reduce((acc, cur) => acc + cur.value, 0) * 100;
        return `${datum.type}\n${percent.toFixed(1)}%`;
      },
    },
    tooltip: {
      formatter: (datum: IDistributionData) => {
        return {
          name: datum.type,
          value: `¥${datum.value.toLocaleString()}`,
        };
      },
    },
    legend: {
      position: 'bottom',
    },
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-base font-medium">类型分布</h3>
        <Radio.Group value={metric} onChange={(e) => setMetric(e.target.value)}>
          <Radio.Button value="assets">资产</Radio.Button>
          <Radio.Button value="profit">收益</Radio.Button>
        </Radio.Group>
      </div>
      <div style={{ height: 350 }}>
        <Pie {...config} />
      </div>
    </div>
  );
} 