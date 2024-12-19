'use client';

import { Card } from 'antd';
import PortfolioOverview from '@/components/features/investment/portfolio/overview/PortfolioOverview';
import PortfolioStats from '@/components/features/investment/portfolio/overview/PortfolioStats';

// 模拟数据
const mockStats = {
  totalValue: 1000000,
  totalCost: 950000,
  totalProfit: 50000,
  profitRate: 0.0526,
  todayProfit: 1500,
  todayProfitRate: 0.0015,
};

export default function PortfolioOverviewPage() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium">投资组合概览</h2>
      
      <PortfolioStats stats={mockStats} />
      
      <Card>
        <PortfolioOverview />
      </Card>
    </div>
  );
} 