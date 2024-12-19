'use client';

import { Card, Row, Col, Statistic } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';

interface IPortfolioStats {
  totalValue: number;
  totalCost: number;
  totalProfit: number;
  profitRate: number;
  todayProfit: number;
  todayProfitRate: number;
}

interface PortfolioStatsProps {
  stats: IPortfolioStats;
}

export default function PortfolioStats({ stats }: PortfolioStatsProps) {
  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={12} lg={6}>
        <Card size="small" bodyStyle={{ padding: '12px' }}>
          <Statistic
            title={<div className="text-sm">总市值</div>}
            value={stats.totalValue}
            precision={2}
            prefix="¥"
            valueStyle={{ fontSize: '18px' }}
          />
        </Card>
      </Col>
      <Col xs={24} sm={12} lg={6}>
        <Card size="small" bodyStyle={{ padding: '12px' }}>
          <Statistic
            title={<div className="text-sm">总成本</div>}
            value={stats.totalCost}
            precision={2}
            prefix="¥"
            valueStyle={{ fontSize: '18px' }}
          />
        </Card>
      </Col>
      <Col xs={24} sm={12} lg={6}>
        <Card size="small" bodyStyle={{ padding: '12px' }}>
          <Statistic
            title={<div className="text-sm">总收益</div>}
            value={stats.totalProfit}
            precision={2}
            valueStyle={{ 
              fontSize: '18px',
              color: stats.totalProfit >= 0 ? '#3f8600' : '#cf1322' 
            }}
            prefix={stats.totalProfit >= 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
            suffix={<span className="text-sm">{`(${(stats.profitRate * 100).toFixed(2)}%)`}</span>}
          />
        </Card>
      </Col>
      <Col xs={24} sm={12} lg={6}>
        <Card size="small" bodyStyle={{ padding: '12px' }}>
          <Statistic
            title={<div className="text-sm">今日收益</div>}
            value={stats.todayProfit}
            precision={2}
            valueStyle={{ 
              fontSize: '18px',
              color: stats.todayProfit >= 0 ? '#3f8600' : '#cf1322' 
            }}
            prefix={stats.todayProfit >= 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
            suffix={<span className="text-sm">{`(${(stats.todayProfitRate * 100).toFixed(2)}%)`}</span>}
          />
        </Card>
      </Col>
    </Row>
  );
} 