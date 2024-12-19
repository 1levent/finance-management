'use client';

import { Card } from 'antd';
import StopLossList from '@/components/features/investment/risk/StopLossList';
import AlertSettings from '@/components/features/investment/risk/AlertSettings';

export default function RiskAlertsPage() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium">止损预警</h2>
      
      <Card>
        <AlertSettings />
      </Card>
      
      <Card>
        <StopLossList />
      </Card>
    </div>
  );
} 