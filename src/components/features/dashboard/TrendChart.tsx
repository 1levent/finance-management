'use client';

import { Card } from 'antd';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { ITrendData } from '@/types/dashboard';

interface ITrendChartProps {
  data: ITrendData[];
}

export default function TrendChart({ data }: ITrendChartProps) {
  const formattedData = data.map(item => ({
    date: item.date,
    收入: item.income,
    支出: item.expense,
  }));

  return (
    <Card 
      title="收支趋势" 
      className="h-full"
      styles={{ body: { padding: '12px' } }}
    >
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <LineChart data={formattedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="收入" 
              stroke="#1677ff" 
              strokeWidth={2}
              dot={{ fill: '#fff', stroke: '#1677ff', strokeWidth: 2 }}
            />
            <Line 
              type="monotone" 
              dataKey="支出" 
              stroke="#ff4d4f" 
              strokeWidth={2}
              dot={{ fill: '#fff', stroke: '#ff4d4f', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
} 