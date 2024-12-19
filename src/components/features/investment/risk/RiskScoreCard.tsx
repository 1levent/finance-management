'use client';

import { Card, Row, Col, Progress } from 'antd';
import { WarningOutlined, ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';

interface IRiskScore {
  score: number;
  level: 'low' | 'medium' | 'high';
  change: number;
  factors: {
    name: string;
    score: number;
    weight: number;
  }[];
}

// 模拟数据
const mockData: IRiskScore = {
  score: 75,
  level: 'medium',
  change: 5,
  factors: [
    { name: '持仓集中度', score: 80, weight: 0.3 },
    { name: '市场波动', score: 70, weight: 0.3 },
    { name: '流动性', score: 85, weight: 0.2 },
    { name: '杠杆水平', score: 60, weight: 0.2 },
  ],
};

const levelConfig = {
  low: { color: '#52c41a', text: '低风险' },
  medium: { color: '#faad14', text: '中等风险' },
  high: { color: '#f5222d', text: '高风险' },
};

export default function RiskScoreCard() {
  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} md={8}>
        <Card size="small" className="h-48">
          <div className="flex flex-col items-center justify-center h-full">
            <div className="text-base text-gray-500 mb-4">综合风险评分</div>
            <Progress
              type="circle"
              percent={mockData.score}
              strokeColor={levelConfig[mockData.level].color}
              format={(percent) => (
                <div className="text-center">
                  <div className="text-2xl font-medium">{percent}</div>
                  <div className="text-sm text-gray-500">{levelConfig[mockData.level].text}</div>
                </div>
              )}
            />
            <div className="mt-4 flex items-center text-sm">
              <span className={mockData.change >= 0 ? 'text-green-500' : 'text-red-500'}>
                {mockData.change >= 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                {Math.abs(mockData.change)}分
              </span>
              <span className="text-gray-500 ml-2">较上周</span>
            </div>
          </div>
        </Card>
      </Col>
      <Col xs={24} md={16}>
        <Card size="small" className="h-48">
          <div className="h-full flex flex-col">
            <div className="text-base mb-4 flex items-center">
              <WarningOutlined className="mr-2 text-yellow-500" />
              风险因子评分
            </div>
            <div className="flex-1 grid grid-cols-2 gap-4">
              {mockData.factors.map((factor) => (
                <div key={factor.name} className="flex flex-col">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-500">{factor.name}</span>
                    <span className="text-gray-900">{factor.score}分</span>
                  </div>
                  <Progress
                    percent={factor.score}
                    strokeColor={factor.score >= 80 ? '#f5222d' : factor.score >= 60 ? '#faad14' : '#52c41a'}
                    showInfo={false}
                    size="small"
                  />
                  <div className="text-xs text-gray-400 mt-1">
                    权重 {(factor.weight * 100).toFixed(0)}%
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </Col>
    </Row>
  );
} 