'use client';

import { Card, Row, Col } from 'antd';
import MarketIndicators from '@/components/features/investment/risk/MarketIndicators';
import MarketTrends from '@/components/features/investment/risk/MarketTrends';
import NewsAlerts from '@/components/features/investment/risk/NewsAlerts';

export default function MarketMonitorPage() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium">市场监控</h2>
      
      <MarketIndicators />
      
      <Row gutter={[16, 16]}>
        <Col span={16}>
          <Card>
            <MarketTrends />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <NewsAlerts />
          </Card>
        </Col>
      </Row>
    </div>
  );
} 