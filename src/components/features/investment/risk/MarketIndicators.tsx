'use client';

import { Card, Row, Col, Statistic } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';

interface IMarketIndicator {
  name: string;
  code: string;
  current: number;
  change: number;
  changeRate: number;
  turnover: number;
  updateTime: string;
}

// 模拟数据
const mockData: IMarketIndicator[] = [
  {
    name: '上证指数',
    code: '000001.SH',
    current: 3038.45,
    change: -32.56,
    changeRate: -1.06,
    turnover: 4235.68,
    updateTime: '2024-03-20 15:00:00',
  },
  {
    name: '深证成指',
    code: '399001.SZ',
    current: 9856.23,
    change: -125.89,
    changeRate: -1.26,
    turnover: 5623.45,
    updateTime: '2024-03-20 15:00:00',
  },
  {
    name: '创业板指',
    code: '399006.SZ',
    current: 1985.67,
    change: -28.45,
    changeRate: -1.41,
    turnover: 1256.78,
    updateTime: '2024-03-20 15:00:00',
  },
  {
    name: '科创50',
    code: '000688.SH',
    current: 985.45,
    change: -15.67,
    changeRate: -1.57,
    turnover: 856.34,
    updateTime: '2024-03-20 15:00:00',
  },
];

export default function MarketIndicators() {
  return (
    <Row gutter={[16, 16]}>
      {mockData.map((indicator) => (
        <Col key={indicator.code} xs={12} sm={12} md={6}>
          <Card size="small" className="h-24">
            <div className="flex flex-col justify-between h-full">
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>{indicator.name}</span>
                <span>{indicator.code}</span>
              </div>
              <div>
                <div className="text-xl font-medium">
                  {indicator.current.toFixed(2)}
                </div>
                <div className={`text-sm flex items-center ${indicator.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {indicator.change >= 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                  <span className="ml-1">
                    {Math.abs(indicator.change).toFixed(2)} ({Math.abs(indicator.changeRate).toFixed(2)}%)
                  </span>
                  <span className="ml-2 text-gray-400">
                    成交{(indicator.turnover / 100).toFixed(2)}亿
                  </span>
                </div>
              </div>
            </div>
          </Card>
        </Col>
      ))}
    </Row>
  );
} 