'use client';

import { Row, Col, Card, Table } from 'antd';
import { Pie, Line } from '@ant-design/plots';
import type { ColumnsType } from 'antd/es/table';

interface IHolding {
  id: string;
  name: string;
  code: string;
  type: string;
  amount: number;
  cost: number;
  value: number;
  profit: number;
  profitRate: number;
}

// 模拟数据
const mockData = {
  allocation: [
    { type: '股票', value: 500000 },
    { type: '基金', value: 300000 },
    { type: '债券', value: 150000 },
    { type: '其他', value: 50000 },
  ],
  trend: Array.from({ length: 30 }, (_, i) => ({
    date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    value: 950000 + Math.random() * 100000,
  })),
  holdings: [
    {
      id: '1',
      name: '浦发银行',
      code: '600000',
      type: '股票',
      amount: 10000,
      cost: 100000,
      value: 110000,
      profit: 10000,
      profitRate: 0.1,
    },
    // ... 可以添加更多持仓数据
  ],
};

export default function PortfolioOverview() {
  const columns: ColumnsType<IHolding> = [
    {
      title: '代码',
      dataIndex: 'code',
      width: 100,
    },
    {
      title: '名称',
      dataIndex: 'name',
      width: 150,
    },
    {
      title: '类型',
      dataIndex: 'type',
      width: 100,
    },
    {
      title: '持仓数量',
      dataIndex: 'amount',
      width: 120,
      align: 'right',
    },
    {
      title: '成本',
      dataIndex: 'cost',
      width: 120,
      align: 'right',
      render: (value: number) => value.toFixed(2),
    },
    {
      title: '市值',
      dataIndex: 'value',
      width: 120,
      align: 'right',
      render: (value: number) => value.toFixed(2),
    },
    {
      title: '盈亏',
      dataIndex: 'profit',
      width: 120,
      align: 'right',
      render: (value: number) => ({
        children: value.toFixed(2),
        props: {
          style: {
            color: value >= 0 ? '#3f8600' : '#cf1322',
          },
        },
      }),
    },
    {
      title: '收益率',
      dataIndex: 'profitRate',
      width: 100,
      align: 'right',
      render: (value: number) => ({
        children: `${(value * 100).toFixed(2)}%`,
        props: {
          style: {
            color: value >= 0 ? '#3f8600' : '#cf1322',
          },
        },
      }),
    },
  ];

  return (
    <div className="space-y-4">
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Card title="资产配置" size="small" className="h-[300px]">
            <Pie
              data={mockData.allocation}
              angleField="value"
              colorField="type"
              radius={0.6}
              label={{
                type: 'outer',
                content: '{name} {percentage}',
              }}
              interactions={[
                {
                  type: 'element-active',
                },
              ]}
              height={240}
            />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="净值走势" size="small" className="h-[300px]">
            <Line
              data={mockData.trend}
              xField="date"
              yField="value"
              smooth
              point={{
                size: 2,
                shape: 'circle',
              }}
              height={240}
            />
          </Card>
        </Col>
      </Row>

      <Card title="持仓明细" size="small" bodyStyle={{ padding: '12px' }}>
        <Table
          columns={columns}
          dataSource={mockData.holdings}
          rowKey="id"
          scroll={{ x: 'max-content' }}
          pagination={false}
          size="small"
        />
      </Card>
    </div>
  );
} 