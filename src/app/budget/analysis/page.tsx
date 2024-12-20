'use client';

import { useState } from 'react';
import { Card, Row, Col, DatePicker, Select, Statistic } from 'antd';
import { Line, Pie } from '@ant-design/plots';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

// 模拟数据
const mockTrendData = [
  { date: '2024-01', budget: 10000, actual: 8500 },
  { date: '2024-02', budget: 10000, actual: 9200 },
  { date: '2024-03', budget: 10000, actual: 11500 },
];

const mockCategoryData = [
  { category: '餐饮', budget: 3000, actual: 3500, variance: -500 },
  { category: '交通', budget: 1000, actual: 900, variance: 100 },
  { category: '购物', budget: 2000, actual: 2200, variance: -200 },
  { category: '娱乐', budget: 1000, actual: 800, variance: 200 },
];

const mockDistributionData = mockCategoryData.map(item => ({
  type: item.category,
  value: item.actual,
}));

export default function BudgetAnalysisPage() {
  const [period, setPeriod] = useState('monthly');
  const [currentDate, setCurrentDate] = useState(dayjs());

  // 趋势图配置
  const trendConfig = {
    data: mockTrendData.map(item => [
      { date: item.date, type: '预算', value: item.budget },
      { date: item.date, type: '实际', value: item.actual },
    ]).flat(),
    xField: 'date',
    yField: 'value',
    seriesField: 'type',
    smooth: true,
    legend: {
      position: 'top',
    },
    yAxis: {
      label: {
        formatter: (v: string) => `¥${Number(v).toLocaleString()}`,
      },
    },
    tooltip: {
      formatter: (datum: any) => {
        return {
          name: datum.type,
          value: `¥${datum.value.toLocaleString()}`,
        };
      },
    },
  };

  // 修改饼图配置
  const distributionConfig = {
    data: mockDistributionData,
    angleField: 'value',
    colorField: 'type',
    radius: 0.8,
    label: {
      autoRotate: false,
      formatter: (data: any) => {
        if (!data || typeof data !== 'object') return '';
        const total = mockDistributionData.reduce((acc, cur) => acc + cur.value, 0);
        const percent = ((data.value / total) * 100).toFixed(1);
        return `${data.type}\n${percent}%`;
      },
    },
    legend: {
      position: 'bottom',
      flipPage: false,
    },
    tooltip: {
      formatter: (data: any) => {
        if (!data || typeof data !== 'object') return {};
        return {
          name: data.type,
          value: `¥${data.value.toLocaleString()}`,
        };
      },
    },
    interactions: [
      {
        type: 'element-active',
      },
    ],
    animation: false, // 禁用动画以提高性能
  };

  return (
    <div className="p-4 space-y-4">
      <Row gutter={[16, 16]} className="mb-4">
        <Col span={12}>
          <DatePicker.MonthPicker
            value={currentDate}
            onChange={(date) => date && setCurrentDate(date)}
            allowClear={false}
          />
        </Col>
        <Col span={12}>
          <Select
            className="w-full"
            value={period}
            onChange={setPeriod}
            options={[
              { label: '月度分析', value: 'monthly' },
              { label: '季度分析', value: 'quarterly' },
              { label: '年度分析', value: 'yearly' },
            ]}
          />
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Card size="small">
            <Statistic
              title="总预算"
              value={10000}
              precision={2}
              prefix="¥"
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card size="small">
            <Statistic
              title="实际支出"
              value={11500}
              precision={2}
              prefix="¥"
              valueStyle={{ color: '#cf1322' }}
              suffix={<ArrowUpOutlined />}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card size="small">
            <Statistic
              title="预算差异"
              value={-1500}
              precision={2}
              prefix="¥"
              valueStyle={{ color: '#cf1322' }}
              suffix={<ArrowDownOutlined />}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col span={16}>
          <Card title="预算执行趋势" size="small">
            <div style={{ height: 300 }}>
              <Line {...trendConfig} />
            </div>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="支出分布" size="small">
            <div style={{ height: 300 }}>
              <Pie {...distributionConfig} />
            </div>
          </Card>
        </Col>
      </Row>

      <Card title="分类预算分析" size="small">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="p-2 text-left">分类</th>
              <th className="p-2 text-right">预算金额</th>
              <th className="p-2 text-right">实际金额</th>
              <th className="p-2 text-right">差异</th>
              <th className="p-2 text-right">执行率</th>
            </tr>
          </thead>
          <tbody>
            {mockCategoryData.map((item, index) => (
              <tr key={index} className="border-t">
                <td className="p-2">{item.category}</td>
                <td className="p-2 text-right">¥{item.budget.toLocaleString()}</td>
                <td className="p-2 text-right">¥{item.actual.toLocaleString()}</td>
                <td className={`p-2 text-right ${item.variance >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {item.variance >= 0 ? '+' : ''}{item.variance.toLocaleString()}
                </td>
                <td className="p-2 text-right">
                  {((item.actual / item.budget) * 100).toFixed(1)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
} 