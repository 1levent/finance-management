'use client';

import { Card, Row, Col, Statistic } from 'antd';
import { ArrowUpOutlined } from '@ant-design/icons';
import ProfitChart from '@/components/features/investment/analysis/ProfitChart';

export default function AnalysisPage() {
  const data = [3, 4, 3.5, 5, 4.9, 6];
  const dates = ['2023-01', '2023-02', '2023-03', '2023-04', '2023-05', '2023-06'];

  return (
    <div className="p-6 space-y-6">
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Card>
            <Statistic
              title="总收益率"
              value={11.28}
              precision={2}
              valueStyle={{ color: '#3f8600' }}
              prefix={<ArrowUpOutlined />}
              suffix="%"
            />
          </Card>
        </Col>
      </Row>
      
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card title="投资收益分析">
            <ProfitChart data={data} dates={dates} />
          </Card>
        </Col>
      </Row>
    </div>
  );
} 