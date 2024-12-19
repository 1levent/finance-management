'use client';

import { Table, Button, Space, Tag, Input, Select, App } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

interface IFund {
  id: string;
  code: string;
  name: string;
  type: 'stock' | 'bond' | 'hybrid' | 'money' | 'other';
  currentNav: number;
  holdingAmount: number;
  costNav: number;
  profit: number;
  profitRate: number;
  status: 'holding' | 'watching';
}

// 模拟数据
const mockFunds: IFund[] = [
  {
    id: '1',
    code: '000001',
    name: '易方达蓝筹精选',
    type: 'stock',
    currentNav: 2.5,
    holdingAmount: 10000,
    costNav: 2.3,
    profit: 2000,
    profitRate: 0.0869,
    status: 'holding',
  },
  // ... 更多基金数据
];

const fundTypeMap = {
  stock: { text: '股票型', color: 'blue' },
  bond: { text: '债券型', color: 'orange' },
  hybrid: { text: '混合型', color: 'purple' },
  money: { text: '货币型', color: 'cyan' },
  other: { text: '其他', color: 'default' },
};

export default function FundList() {
  const { message } = App.useApp();

  const columns: ColumnsType<IFund> = [
    {
      title: '代码',
      dataIndex: 'code',
      key: 'code',
      width: 100,
    },
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
      width: 200,
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      width: 100,
      render: (type: keyof typeof fundTypeMap) => (
        <Tag color={fundTypeMap[type].color}>
          {fundTypeMap[type].text}
        </Tag>
      ),
    },
    {
      title: '最新净值',
      dataIndex: 'currentNav',
      key: 'currentNav',
      width: 100,
      align: 'right',
      render: (nav: number) => nav.toFixed(4),
    },
    {
      title: '持有份额',
      dataIndex: 'holdingAmount',
      key: 'holdingAmount',
      width: 120,
      align: 'right',
      render: (amount: number) => amount.toFixed(2),
    },
    {
      title: '成本净值',
      dataIndex: 'costNav',
      key: 'costNav',
      width: 100,
      align: 'right',
      render: (nav: number) => nav.toFixed(4),
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
            onClick={() => message.success('申赎功能待实现')}
          >
            申赎
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
            placeholder="基金类型"
            style={{ width: 120 }}
            options={Object.entries(fundTypeMap).map(([key, value]) => ({
              label: value.text,
              value: key,
            }))}
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
          新增基金
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={mockFunds}
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