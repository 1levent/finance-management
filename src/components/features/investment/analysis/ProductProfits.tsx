'use client';

import { Table, Tag, Space, Select, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

interface IProductProfit {
  id: string;
  name: string;
  type: 'stock' | 'fund' | 'bond' | 'other';
  cost: number;
  market: number;
  profit: number;
  profitRate: number;
  dayProfit: number;
  dayProfitRate: number;
}

// 模拟数据
const mockData: IProductProfit[] = [
  {
    id: '1',
    name: '浦发银行',
    type: 'stock',
    cost: 100000,
    market: 110000,
    profit: 10000,
    profitRate: 0.1,
    dayProfit: 1000,
    dayProfitRate: 0.01,
  },
  {
    id: '2',
    name: '易方达蓝筹',
    type: 'fund',
    cost: 50000,
    market: 48000,
    profit: -2000,
    profitRate: -0.04,
    dayProfit: -500,
    dayProfitRate: -0.01,
  },
];

export default function ProductProfits() {
  const typeMap: Record<IProductProfit['type'], { text: string; color: string }> = {
    stock: { text: '股票', color: 'blue' },
    fund: { text: '基金', color: 'green' },
    bond: { text: '债券', color: 'orange' },
    other: { text: '其他', color: 'default' },
  };

  const columns: ColumnsType<IProductProfit> = [
    {
      title: '产品名称',
      dataIndex: 'name',
      key: 'name',
      width: 150,
      fixed: 'left',
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      width: 100,
      render: (type: IProductProfit['type']) => (
        <Tag color={typeMap[type].color}>{typeMap[type].text}</Tag>
      ),
    },
    {
      title: '成本',
      dataIndex: 'cost',
      key: 'cost',
      width: 120,
      align: 'right',
      render: (val) => `¥${val.toLocaleString()}`,
    },
    {
      title: '市值',
      dataIndex: 'market',
      key: 'market',
      width: 120,
      align: 'right',
      render: (val) => `¥${val.toLocaleString()}`,
    },
    {
      title: '总收益',
      children: [
        {
          title: '金额',
          dataIndex: 'profit',
          key: 'profit',
          width: 120,
          align: 'right',
          render: (val) => (
            <span style={{ color: val >= 0 ? '#3f8600' : '#cf1322' }}>
              ¥{val.toLocaleString()}
            </span>
          ),
        },
        {
          title: '收益率',
          dataIndex: 'profitRate',
          key: 'profitRate',
          width: 100,
          align: 'right',
          render: (val) => (
            <span style={{ color: val >= 0 ? '#3f8600' : '#cf1322' }}>
              {(val * 100).toFixed(2)}%
            </span>
          ),
        },
      ],
    },
    {
      title: '日收益',
      children: [
        {
          title: '金额',
          dataIndex: 'dayProfit',
          key: 'dayProfit',
          width: 120,
          align: 'right',
          render: (val) => (
            <span style={{ color: val >= 0 ? '#3f8600' : '#cf1322' }}>
              ¥{val.toLocaleString()}
            </span>
          ),
        },
        {
          title: '收益率',
          dataIndex: 'dayProfitRate',
          key: 'dayProfitRate',
          width: 100,
          align: 'right',
          render: (val) => (
            <span style={{ color: val >= 0 ? '#3f8600' : '#cf1322' }}>
              {(val * 100).toFixed(2)}%
            </span>
          ),
        },
      ],
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-base font-medium">产品收益</h3>
        <Space>
          <Input
            placeholder="搜索产品名称"
            prefix={<SearchOutlined />}
            style={{ width: 200 }}
          />
          <Select
            placeholder="产品类型"
            style={{ width: 120 }}
            options={[
              { label: '全部', value: 'all' },
              { label: '股票', value: 'stock' },
              { label: '基金', value: 'fund' },
              { label: '债券', value: 'bond' },
              { label: '其他', value: 'other' },
            ]}
          />
        </Space>
      </div>

      <Table
        columns={columns}
        dataSource={mockData}
        rowKey="id"
        size="small"
        scroll={{ x: 'max-content' }}
        pagination={{
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total) => `共 ${total} 条`,
        }}
      />
    </div>
  );
} 