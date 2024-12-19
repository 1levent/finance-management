'use client';

import { Card, Row, Col, Progress, Alert, Space } from 'antd';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';

// 模拟数据
const riskData = {
  score: 75,
  level: '中等风险',
  suggestion: '您的投资组合风险适中，建议适当分散投资，保持均衡配置。',
  trends: Array.from({ length: 12 }, (_, i) => ({
    month: `2023-${String(i + 1).padStart(2, '0')}`,
    value: 65 + Math.random() * 20,
  })),
  distribution: [
    { name: '高风险', value: 30 },
    { name: '中风险', value: 45 },
    { name: '低风险', value: 25 },
  ],
};

const riskLevelColors = {
  high: '#ff4d4f',
  medium: '#faad14',
  low: '#52c41a',
};

export default function RiskAssessmentPage() {
  return (
    <div className="p-4">
      <Row gutter={[16, 16]}>
        {/* 风险评分 */}
        <Col xs={24} sm={12} lg={6}>
          <Card title="风险评分" size="small">
            <div className="text-center">
              <Progress
                type="dashboard"
                size={120}
                percent={riskData.score}
                strokeColor={riskLevelColors.medium}
                format={(percent) => (
                  <div className="space-y-1">
                    <div className="text-xl font-bold">{percent}</div>
                    <div className="text-xs text-gray-500">{riskData.level}</div>
                  </div>
                )}
              />
            </div>
          </Card>
        </Col>

        {/* 建议配置 */}
        <Col xs={24} sm={12} lg={6}>
          <Card title="建议配置" size="small">
            <Space direction="vertical" size="small" className="w-full">
              <div className="text-xs">
                <span className="inline-block w-20">高风险资产:</span>
                <span className="text-red-500">20-30%</span>
              </div>
              <div className="text-xs">
                <span className="inline-block w-20">中风险资产:</span>
                <span className="text-orange-500">40-50%</span>
              </div>
              <div className="text-xs">
                <span className="inline-block w-20">低风险资产:</span>
                <span className="text-green-500">20-30%</span>
              </div>
            </Space>
          </Card>
        </Col>

        {/* 投资建议 */}
        <Col xs={24} lg={12}>
          <Card title="投资建议" size="small">
            <Alert
              message={riskData.suggestion}
              type="info"
              showIcon
              className="text-xs"
            />
          </Card>
        </Col>

        {/* 风险趋势 */}
        <Col xs={24} lg={14}>
          <Card title="风险趋势" size="small">
            <div style={{ height: 240 }}>
              <ResponsiveContainer>
                <AreaChart data={riskData.trends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#1677ff"
                    fill="#1677ff20"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Col>

        {/* 风险分布 */}
        <Col xs={24} lg={10}>
          <Card title="风险分布" size="small">
            <div style={{ height: 240 }}>
              <ResponsiveContainer>
                <LineChart data={riskData.distribution}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#1677ff"
                    strokeWidth={2}
                    dot={{ fill: '#fff', stroke: '#1677ff', strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
} 