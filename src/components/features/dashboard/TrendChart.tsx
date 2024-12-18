'use client';

import { Card } from 'antd';
import { Line } from '@ant-design/charts';
import type { ITrendData } from '@/types/dashboard';

interface ITrendChartProps {
  data: ITrendData[];
}

export default function TrendChart({ data }: ITrendChartProps) {
  const config = {
    data,
    xField: 'date',
    yField: ['income', 'expense'],
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
    <Card title="收支趋势">
      <Line {...config} />
    </Card>
  );
} 