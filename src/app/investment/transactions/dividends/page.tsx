'use client';

import { Card } from 'antd';
import DividendList from '@/components/features/investment/transactions/dividends/DividendList';

export default function DividendsPage() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium">分红记录</h2>
      
      <Card>
        <DividendList />
      </Card>
    </div>
  );
} 