'use client';

import { Table, Button, Space, Tag, Input, Select, App } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

interface IStock {
  id: string;
  code: string;
  name: string;
  market: string;
  currentPrice: number;
  holdingAmount: number;
  costPrice: number;
  profit: number;
  profitRate: number;
  status: 'holding' | 'watching';
}

// 模拟数据
const mockStocks: IStock[] = [
  {
    id: '1',
    code: '600519',
    name: '贵州茅台',
    market: 'SH',
    currentPrice: 1800.00,
    holdingAmount: 100,
    costPrice: 1700.00,
    profit: 10000,
    profitRate: 0.0588,
    status: 'holding',
  },
  // ... 更多股票数据
];

export default function StockList() {
  const { message } = App.useApp();

  const columns: ColumnsType<IStock> = [
    {
      title: '代码',
      dataIndex: 'code',
      key: 'code',
      width: 100,
      render: (code: string, record) => `${record.market}${code}`,
    },
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
      width: 120,
    },
    {
      title: '现价',
      dataIndex: 'currentPrice',
      key: 'currentPrice',
      width: 100,
      align: 'right',
      render: (price: number) => price.toFixed(2),
    },
    {
      title: '持仓数量',
      dataIndex: 'holdingAmount',
      key: 'holdingAmount',
      width: 100,
      align: 'right',
    },
    {
      title: '成本价',
      dataIndex: 'costPrice',
      key: 'costPrice',
      width: 100,
      align: 'right',
      render: (price: number) => price.toFixed(2),
    },
    {
      title: '盈亏',
      dataIndex: 'profit',
      key: 'profit',
      width: 120,
      align: 'right',
      render: (profit: number) => (
        <span style={{ color: profit >= 0 ? '#3f8600' : '#cf1322' }}>
          {profit >= 0 ? '+' : ''}{profit.toFixed(2)}
        </span>
      ),
    },
    {
      title: '盈亏率',
      dataIndex: 'profitRate',
      key: 'profitRate',
      width: 100,
      align: 'right',
      render: (rate: number) => (
        <span style={{ color: rate >= 0 ? '#3f8600' : '#cf1322' }}>
          {(rate * 100).toFixed(2)}%
        </span>
      ),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      align: 'center',
      render: (status: string) => (
        <Tag color={status === 'holding' ? 'success' : 'default'}>
          {status === 'holding' ? '持仓' : '自选'}
        </Tag>
      ),
    },
    {
      title: '操作',
      key: 'action',
      width: 200,
      fixed: 'right',
      render: (_, record) => (
        <Space>
          <Button 
            type="link" 
            size="small"
            onClick={() => message.success('交易功能待实现')}
          >
            交易
          </Button>
          <Button 
            type="link" 
            size="small"
            onClick={() => message.success('编辑功能待实现')}
          >
            编辑
          </Button>
          <Button 
            type="link" 
            danger 
            size="small"
            onClick={() => message.success('删除功能待实现')}
          >
            删除
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Space>
          <Input
            placeholder="搜索代码/名称"
            prefix={<SearchOutlined />}
            style={{ width: 200 }}
          />
          <Select
            placeholder="状态"
            style={{ width: 120 }}
            options={[
              { label: '全部', value: 'all' },
              { label: '持仓', value: 'holding' },
              { label: '自选', value: 'watching' },
            ]}
          />
        </Space>
        <Button 
          type="primary" 
          icon={<PlusOutlined />}
          onClick={() => message.success('新增功能待实现')}
        >
          新增股票
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={mockStocks}
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