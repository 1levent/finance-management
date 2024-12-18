'use client';

import { Row, Col } from 'antd';
import OverviewCards from '@/components/features/dashboard/OverviewCards';
import TrendChart from '@/components/features/dashboard/TrendChart';
import AssetDistribution from '@/components/features/dashboard/AssetDistribution';
import RecentTransactions from '@/components/features/dashboard/RecentTransactions';
import type { ITransactionItem } from '@/types/dashboard';

// 模拟数据
const mockData = {
  overview: {
    totalAssets: 100000,
    totalIncome: 15000,
    totalExpense: 8000,
    monthlyBudget: 10000,
    budgetUsage: 80,
  },
  trend: Array.from({ length: 7 }, (_, i) => ({
    date: `2024-03-${String(i + 1).padStart(2, '0')}`,
    income: Math.random() * 1000,
    expense: Math.random() * 800,
  })),
  assets: [
    { name: '现金', value: 30000, percent: 30 },
    { name: '基金', value: 40000, percent: 40 },
    { name: '股票', value: 20000, percent: 20 },
    { name: '其他', value: 10000, percent: 10 },
  ],
  transactions: [
    {
      id: '1',
      type: 'income' as const,
      amount: 5000,
      category: '工资',
      description: '3月工资',
      date: '2024-03-10',
    },
    {
      id: '2',
      type: 'expense' as const,
      amount: 1000,
      category: '餐饮',
      description: '超市购物',
      date: '2024-03-09',
    },
  ] as ITransactionItem[],
};

export default function DashboardPage() {
  return (
    <div className="p-6">
      <OverviewCards data={mockData.overview} />
      <Row gutter={[16, 16]} className="mt-6">
        <Col span={16}>
          <TrendChart data={mockData.trend} />
        </Col>
        <Col span={8}>
          <AssetDistribution data={mockData.assets} />
        </Col>
      </Row>
      <RecentTransactions data={mockData.transactions} />
    </div>
  );
} 