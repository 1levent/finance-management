'use client';

import { Card, Row, Col, Statistic } from 'antd';
import { BankOutlined, UserOutlined, CheckCircleOutlined } from '@ant-design/icons';

interface IAccountOverview {
  totalAccounts: number;
  totalAssets: number;
  activeAccounts: number;
}

export default function AccountOverview({ totalAccounts, totalAssets, activeAccounts }: IAccountOverview) {
  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={8}>
        <Card size="small" className="hover:shadow-md transition-shadow">
          <Statistic 
            title={
              <div className="flex items-center gap-2 text-gray-600">
                <BankOutlined />
                <span>总账户数</span>
              </div>
            }
            value={totalAccounts}
            suffix="个"
            valueStyle={{ color: '#1677ff' }}
          />
        </Card>
      </Col>
      <Col xs={24} sm={8}>
        <Card size="small" className="hover:shadow-md transition-shadow">
          <Statistic
            title={
              <div className="flex items-center gap-2 text-gray-600">
                <UserOutlined />
                <span>总资产</span>
              </div>
            }
            value={totalAssets}
            precision={2}
            prefix="¥"
            valueStyle={{ color: '#52c41a' }}
          />
        </Card>
      </Col>
      <Col xs={24} sm={8}>
        <Card size="small" className="hover:shadow-md transition-shadow">
          <Statistic
            title={
              <div className="flex items-center gap-2 text-gray-600">
                <CheckCircleOutlined />
                <span>活跃账户</span>
              </div>
            }
            value={activeAccounts}
            suffix="个"
            valueStyle={{ color: '#faad14' }}
          />
        </Card>
      </Col>
    </Row>
  );
} 