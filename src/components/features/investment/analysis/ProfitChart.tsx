'use client';

import { Card } from 'antd';
import { Line } from '@ant-design/plots';

interface IProfitChartProps {
  data: number[];
  dates: string[];
}

export default function ProfitChart({ data, dates }: IProfitChartProps) {
  const chartData = dates.map((date, index) => ({
    date,
    value: data[index],
    type: '收益'
  }));

  const config = {
    data: chartData,
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
  };

  return (
    <div style={{ height: 400 }}>
      <Line {...config} />
    </div>
  );
} 