'use client';

import { useState } from 'react';
import { Card, Row, Col, Select, DatePicker, Space } from 'antd';
import { Line, Column, Pie } from '@ant-design/plots';
import dayjs from 'dayjs';

// 模拟数据
const mockData = {
  monthlyTrend: [
    { month: '2024-01', income: 5000, expense: 4000 },
    { month: '2024-02', income: 6000, expense: 4500 },
    { month: '2024-03', income: 5500, expense: 5000 },
  ],
  categoryDistribution: [
    { category: '餐饮', amount: 2000, percentage: 40 },
    { category: '交通', amount: 1500, percentage: 30 },
    { category: '购物', amount: 1000, percentage: 20 },
    { category: '娱乐', amount: 500, percentage: 10 },
  ],
  memberContribution: [
    { member: '张三', amount: 2000, percentage: 40 },
    { member: '李四', amount: 1500, percentage: 30 },
    { member: '王五', amount: 1000, percentage: 20 },
    { member: '赵六', amount: 500, percentage: 10 },
  ],
  budgetExecution: [
    { category: '餐饮', budget: 5000, actual: 4000 },
    { category: '交通', budget: 2000, actual: 1800 },
    { category: '购物', budget: 3000, actual: 3200 },
    { category: '娱乐', budget: 1000, actual: 800 },
  ],
};

export default function StatisticsPage() {
  // 趋势图配置
  const trendConfig = {
    data: mockData.monthlyTrend.map(item => [
      { month: item.month, type: '收入', value: item.income },
      { month: item.month, type: '支出', value: item.expense },
    ]).flat(),
    xField: 'month',
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
      formatter: (datum: any) => ({
        name: datum.type,
        value: `¥${datum.value.toLocaleString()}`,
      }),
    },
  };

  // 分布图配置
  const distributionConfig = {
    data: mockData.categoryDistribution,
    angleField: 'amount',
    colorField: 'category',
    radius: 0.8,
    label: {
      type: 'outer',
      content: '{name}\n{percentage}%',
    },
    legend: {
      position: 'bottom',
      flipPage: false,
    },
    tooltip: {
      formatter: (data: any) => ({
        name: data.category,
        value: `¥${data.amount.toLocaleString()}`,
      }),
    },
  };

  // 预算执行图配置
  const budgetConfig = {
    data: mockData.budgetExecution,
    isGroup: true,
    xField: 'category',
    yField: 'value',
    seriesField: 'type',
    groupField: 'type',
    columnStyle: {
      radius: [4, 4, 0, 0],
    },
    legend: {
      position: 'top',
    },
    yAxis: {
      label: {
        formatter: (v: string) => `¥${Number(v).toLocaleString()}`,
      },
    },
    tooltip: {
      formatter: (datum: any) => ({
        name: datum.type,
        value: `¥${datum.value.toLocaleString()}`,
      }),
    },
  };

  // 成员贡献图配置
  const contributionConfig = {
    data: mockData.memberContribution,
    angleField: 'amount',
    colorField: 'member',
    radius: 0.8,
    label: {
      type: 'outer',
      content: '{name}\n{percentage}%',
    },
    legend: {
      position: 'bottom',
      flipPage: false,
    },
    tooltip: {
      formatter: (data: any) => ({
        name: data.member,
        value: `¥${data.amount.toLocaleString()}`,
      }),
    },
  };

  return (
    <div className="p-4 space-y-4">
      <Card size="small">
        <Space>
          <DatePicker.RangePicker
            defaultValue={[dayjs().subtract(2, 'month'), dayjs()]}
          />
        </Space>
      </Card>

      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card title="收支趋势" size="small">
            <div style={{ height: 300 }}>
              <Line {...trendConfig} />
            </div>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Card title="支出分布" size="small">
            <div style={{ height: 300 }}>
              <Pie {...distributionConfig} />
            </div>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="成员贡献" size="small">
            <div style={{ height: 300 }}>
              <Pie {...contributionConfig} />
            </div>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card title="预算执行" size="small">
            <div style={{ height: 300 }}>
              <Column {...budgetConfig} />
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
} 