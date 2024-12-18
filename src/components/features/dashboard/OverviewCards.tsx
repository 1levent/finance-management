'use client';

import { Card, Row, Col, Statistic } from 'antd';
import {
  WalletOutlined,
  RiseOutlined,
  FallOutlined,
  PieChartOutlined,
} from '@ant-design/icons';
import type { IOverviewData } from '@/types/dashboard';

interface IOverviewCardsProps {
  data: IOverviewData;
}

export default function OverviewCards({ data }: IOverviewCardsProps) {
  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={12} lg={6}>
        <Card>
          <Statistic
            title="总资产"
            value={data.totalAssets}
            prefix={<WalletOutlined />}
            precision={2}
          />
        </Card>
      </Col>
      <Col xs={24} sm={12} lg={6}>
        <Card>
          <Statistic
            title="本月收入"
            value={data.totalIncome}
            prefix={<RiseOutlined />}
            valueStyle={{ color: '#3f8600' }}
            precision={2}
          />
        </Card>
      </Col>
      <Col xs={24} sm={12} lg={6}>
        <Card>
          <Statistic
            title="本月支出"
            value={data.totalExpense}
            prefix={<FallOutlined />}
            valueStyle={{ color: '#cf1322' }}
            precision={2}
          />
        </Card>
      </Col>
      <Col xs={24} sm={12} lg={6}>
        <Card>
          <Statistic
            title="预算使用"
            value={data.budgetUsage}
            prefix={<PieChartOutlined />}
            suffix="%"
            precision={1}
          />
        </Card>
      </Col>
    </Row>
  );
} 