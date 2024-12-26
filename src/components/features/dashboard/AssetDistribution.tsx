'use client';

import { Card } from 'antd';
import dynamic from 'next/dynamic';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';

// 动态导入图表组件
const DynamicBaseChart = dynamic(
  () => import('@/components/common/charts/BaseChart').then(mod => ({
    default: mod.default,
    CHART_TYPES: mod.CHART_TYPES,
  })),
  {
    ssr: false,
    loading: () => <div style={{ height: 300 }} />,
  }
);

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

interface IAssetData {
  type: string;
  value: number;
}

export default function AssetDistribution() {
  const data: IAssetData[] = [
    { type: '活期存款', value: 50000 },
    { type: '定期存款', value: 100000 },
    { type: '基金投资', value: 80000 },
    { type: '股票投资', value: 70000 },
    { type: '其他资产', value: 30000 },
  ];

  const options = {
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 0.8,
    label: {
      type: 'outer',
      formatter: (text: string, item: any) => {
        return `${text}: ${((item.percent || 0) * 100).toFixed(0)}%`;
      },
    },
    tooltip: {
      formatter: (datum: IAssetData) => {
        return {
          name: datum.type,
          value: `¥${datum.value.toLocaleString()}`,
        };
      },
    },
    interactions: [{ type: 'element-active' }],
  };

  return (
    <Card title="资产分布" size="small">
      <ErrorBoundary 
        FallbackComponent={ErrorFallback}
        onReset={() => {
          console.log('Resetting chart error state');
        }}
      >
        <DynamicBaseChart 
          type="Pie"
          options={options}
          style={{ height: 300 }} 
        />
      </ErrorBoundary>
    </Card>
  );
} 