'use client';

import { Card } from 'antd';
import TradeList from '@/components/features/investment/transactions/trades/TradeList';

export default function TradesPage() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium">买卖记录</h2>
      
      <Card>
        <TradeList />
      </Card>
    </div>
  );
} 