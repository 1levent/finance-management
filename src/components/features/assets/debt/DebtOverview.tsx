'use client';

import { Card, Row, Col, Statistic } from 'antd';
import { MoneyCollectOutlined, AccountBookOutlined, PayCircleOutlined } from '@ant-design/icons';

interface IDebtOverviewProps {
  totalDebts: number;
  totalAmount: number;
  remainingAmount: number;
  monthlyPayment: number;
}

export default function DebtOverview({ 
  totalDebts,
  totalAmount,
  remainingAmount,
  monthlyPayment,
}: IDebtOverviewProps) {
  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={8}>
        <Card size="small" className="hover:shadow-md transition-shadow">
          <Statistic 
            title={
              <div className="flex items-center gap-2 text-gray-600">
                <AccountBookOutlined />
                <span>借贷总数</span>
              </div>
            }
            value={totalDebts}
            suffix="笔"
            valueStyle={{ color: '#1677ff' }}
          />
        </Card>
      </Col>
      <Col xs={24} sm={8}>
        <Card size="small" className="hover:shadow-md transition-shadow">
          <Statistic
            title={
              <div className="flex items-center gap-2 text-gray-600">
                <MoneyCollectOutlined />
                <span>剩余本金</span>
              </div>
            }
            value={remainingAmount}
            precision={2}
            prefix="¥"
            valueStyle={{ color: '#cf1322' }}
          />
          <div className="text-xs text-gray-500 mt-2">
            总借贷: ¥{totalAmount.toLocaleString()}
          </div>
        </Card>
      </Col>
      <Col xs={24} sm={8}>
        <Card size="small" className="hover:shadow-md transition-shadow">
          <Statistic
            title={
              <div className="flex items-center gap-2 text-gray-600">
                <PayCircleOutlined />
                <span>月供总额</span>
              </div>
            }
            value={monthlyPayment}
            precision={2}
            prefix="¥"
            valueStyle={{ color: '#faad14' }}
          />
        </Card>
      </Col>
    </Row>
  );
} 