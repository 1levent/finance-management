'use client';

import { Card, Row, Col, Statistic } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';

interface IOverviewData {
  totalAssets: number;
  totalProfit: number;
  totalProfitRate: number;
  yearProfit: number;
  yearProfitRate: number;
  monthProfit: number;
  monthProfitRate: number;
  dayProfit: number;
  dayProfitRate: number;
}

// 模拟数据
const mockData: IOverviewData = {
  totalAssets: 1000000,
  totalProfit: 50000,
  totalProfitRate: 0.05,
  yearProfit: 30000,
  yearProfitRate: 0.03,
  monthProfit: 5000,
  monthProfitRate: 0.005,
  dayProfit: 1000,
  dayProfitRate: 0.001,
};

export default function ProfitOverview() {
  return (
    <Row gutter={[16, 16]}>
      <Col xs={12} sm={12} md={6}>
        <Card size="small" className="h-24">
          <div className="flex flex-col justify-between h-full">
            <div className="text-sm text-gray-500">总资产</div>
            <div>
              <div className="text-xl font-medium">
                ¥{mockData.totalAssets.toLocaleString()}
              </div>
              <div className={`text-sm ${mockData.totalProfit >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {mockData.totalProfit >= 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                ¥{Math.abs(mockData.totalProfit).toLocaleString()}
                ({(mockData.totalProfitRate * 100).toFixed(2)}%)
              </div>
            </div>
          </div>
        </Card>
      </Col>
      <Col xs={12} sm={12} md={6}>
        <Card size="small" className="h-24">
          <div className="flex flex-col justify-between h-full">
            <div className="text-sm text-gray-500">年度收益</div>
            <div>
              <div className={`text-xl font-medium ${mockData.yearProfit >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {mockData.yearProfit >= 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                ¥{Math.abs(mockData.yearProfit).toLocaleString()}
              </div>
              <div className="text-sm text-gray-500">
                {(mockData.yearProfitRate * 100).toFixed(2)}%
              </div>
            </div>
          </div>
        </Card>
      </Col>
      <Col xs={12} sm={12} md={6}>
        <Card size="small" className="h-24">
          <div className="flex flex-col justify-between h-full">
            <div className="text-sm text-gray-500">月度收益</div>
            <div>
              <div className={`text-xl font-medium ${mockData.monthProfit >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {mockData.monthProfit >= 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                ¥{Math.abs(mockData.monthProfit).toLocaleString()}
              </div>
              <div className="text-sm text-gray-500">
                {(mockData.monthProfitRate * 100).toFixed(2)}%
              </div>
            </div>
          </div>
        </Card>
      </Col>
      <Col xs={12} sm={12} md={6}>
        <Card size="small" className="h-24">
          <div className="flex flex-col justify-between h-full">
            <div className="text-sm text-gray-500">日度收益</div>
            <div>
              <div className={`text-xl font-medium ${mockData.dayProfit >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {mockData.dayProfit >= 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                ¥{Math.abs(mockData.dayProfit).toLocaleString()}
              </div>
              <div className="text-sm text-gray-500">
                {(mockData.dayProfitRate * 100).toFixed(2)}%
              </div>
            </div>
          </div>
        </Card>
      </Col>
    </Row>
  );
} 