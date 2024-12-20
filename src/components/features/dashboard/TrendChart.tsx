'use client';

import { Card } from 'antd';
import { Line } from '@antv/g2plot';
import { useEffect, useRef } from 'react';

interface ITrendData {
  month: string;
  type: string;
  value: number;
}

export default function TrendChart() {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<Line | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const data = [
      { month: '2024-01', type: '收入', value: 5000 },
      { month: '2024-01', type: '支出', value: 4000 },
      { month: '2024-02', type: '收入', value: 6000 },
      { month: '2024-02', type: '支出', value: 4500 },
      { month: '2024-03', type: '收入', value: 5500 },
      { month: '2024-03', type: '支出', value: 5000 },
    ];

    chartRef.current = new Line(containerRef.current, {
      data,
      xField: 'month',
      yField: 'value',
      seriesField: 'type',
      smooth: true,
      animation: {
        appear: {
          animation: 'wave-in',
          duration: 1000,
        },
      },
      color: ['#1677ff', '#ff4d4f'],
      yAxis: {
        label: {
          formatter: (v: string) => `¥${Number(v).toLocaleString()}`,
        },
      },
      tooltip: {
        shared: true,
        showMarkers: true,
      },
      legend: {
        position: 'top',
      },
    });

    chartRef.current.render();

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  return (
    <Card title="收支趋势" size="small">
      <div ref={containerRef} style={{ height: 300 }} />
    </Card>
  );
} 