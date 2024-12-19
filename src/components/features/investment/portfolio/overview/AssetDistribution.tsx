'use client';

import { Card } from 'antd';
import { Pie } from '@ant-design/plots';
import type { IAssetDistribution } from '@/types/portfolio';

interface AssetDistributionProps {
  distribution: IAssetDistribution[];
}

export default function AssetDistribution({ distribution }: AssetDistributionProps) {
  const config = {
    data: distribution.map(item => ({
      type: item.type === 'stock' ? '股票' :
            item.type === 'fund' ? '基金' :
            item.type === 'bond' ? '债券' :
            item.type === 'deposit' ? '存款' : '其他',
      value: item.amount,
    })),
    angleField: 'value',
    colorField: 'type',
    radius: 0.8,
    label: {
      type: 'outer',
      content: '{name} {percentage}',
    },
    interactions: [{ type: 'element-active' }],
  };

  return (
    <Card title="资产分布" size="small">
      <div style={{ height: 300 }}>
        <Pie {...config} />
      </div>
    </Card>
  );
} 