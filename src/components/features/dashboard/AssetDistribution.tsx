'use client';

import { Card } from 'antd';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import type { IAssetData } from '@/types/dashboard';

interface IAssetDistributionProps {
  data: IAssetData[];
}

const COLORS = ['#1677ff', '#52c41a', '#faad14', '#13c2c2'];

export default function AssetDistribution({ data }: IAssetDistributionProps) {
  const formattedData = data.map(item => ({
    name: item.type,
    value: item.value,
  }));

  return (
    <Card 
      title="资产分布" 
      className="h-full"
      styles={{ body: { padding: '12px' } }}
    >
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={formattedData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {formattedData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
} 