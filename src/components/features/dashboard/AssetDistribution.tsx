'use client';

import { Card } from 'antd';
import { Pie } from '@ant-design/charts';
import type { IAssetDistribution } from '@/types/dashboard';

interface IAssetDistributionProps {
  data: IAssetDistribution[];
}

export default function AssetDistribution({ data }: IAssetDistributionProps) {
  const config = {
    data,
    angleField: 'value',
    colorField: 'name',
    radius: 0.8,
    label: {
      type: 'outer',
      content: '{name} {percentage}',
    },
    interactions: [{ type: 'element-active' }],
  };

  return (
    <Card title="资产分布">
      <Pie {...config} />
    </Card>
  );
} 