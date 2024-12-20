'use client';

import { Card, Row, Col, Statistic } from 'antd';
import { PayCircleOutlined, DollarOutlined, PercentageOutlined } from '@ant-design/icons';

interface IRepaymentStatsProps {
  totalPayment: number;
  principal: number;
  interest: number;
  nextPaymentDate: string;
}

export default function RepaymentStats({
  totalPayment,
  principal,
  interest,
  nextPaymentDate,
}: IRepaymentStatsProps) {
  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={8}>
        <Card size="small" className="hover:shadow-md transition-shadow">
          <Statistic 
            title={
              <div className="flex items-center gap-2 text-gray-600">
                <PayCircleOutlined />
                <span>本月应还</span>
              </div>
            }
            value={totalPayment}
            precision={2}
            prefix="¥"
            valueStyle={{ color: '#1677ff' }}
          />
          <div className="text-xs text-gray-500 mt-2">
            下次还款日: {nextPaymentDate}
          </div>
        </Card>
      </Col>
      <Col xs={24} sm={8}>
        <Card size="small" className="hover:shadow-md transition-shadow">
          <Statistic
            title={
              <div className="flex items-center gap-2 text-gray-600">
                <DollarOutlined />
                <span>本金</span>
              </div>
            }
            value={principal}
            precision={2}
            prefix="¥"
            valueStyle={{ color: '#52c41a' }}
          />
          <div className="text-xs text-gray-500 mt-2">
            占比: {((principal / totalPayment) * 100).toFixed(1)}%
          </div>
        </Card>
      </Col>
      <Col xs={24} sm={8}>
        <Card size="small" className="hover:shadow-md transition-shadow">
          <Statistic
            title={
              <div className="flex items-center gap-2 text-gray-600">
                <PercentageOutlined />
                <span>利息</span>
              </div>
            }
            value={interest}
            precision={2}
            prefix="¥"
            valueStyle={{ color: '#faad14' }}
          />
          <div className="text-xs text-gray-500 mt-2">
            占比: {((interest / totalPayment) * 100).toFixed(1)}%
          </div>
        </Card>
      </Col>
    </Row>
  );
} 