'use client';

import { Card } from 'antd';
import BaseChart from '@/components/common/charts/BaseChart';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';

// 错误回退组件
const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  return (
    <div className="text-center p-4">
      <h3 className="text-red-500">图表加载失败</h3>
      <p className="text-gray-500">{error.message}</p>
      <button
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={resetErrorBoundary}
      >
        重试
      </button>
    </div>
  );
};

export default function TrendChart() {
  const data = [
    { month: '2024-01', type: '收入', value: 5000 },
    { month: '2024-01', type: '支出', value: 4000 },
    { month: '2024-02', type: '收入', value: 6000 },
    { month: '2024-02', type: '支出', value: 4500 },
    { month: '2024-03', type: '收入', value: 5500 },
    { month: '2024-03', type: '支出', value: 5000 },
  ];

  const options = {
    data,
    xField: 'month',
    yField: 'value',
    seriesField: 'type',
    smooth: true,
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
  };

  return (
    <Card title="收支趋势" size="small">
      <ErrorBoundary 
        FallbackComponent={ErrorFallback}
        onReset={() => {
          console.log('Resetting chart error state');
        }}
      >
        <BaseChart 
          type="Line"
          options={options}
          style={{ height: 300 }} 
        />
      </ErrorBoundary>
    </Card>
  );
} 