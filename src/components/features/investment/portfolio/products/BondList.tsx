'use client';

import { Table, Button, Space, Tag, Input, Select, App } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

interface IBond {
  id: string;
  code: string;
  name: string;
  type: 'treasury' | 'corporate' | 'convertible' | 'repo' | 'other';
  parValue: number; // 面值
  couponRate: number; // 票面利率
  maturityDate: string; // 到期日
  holdingAmount: number;
  costPrice: number;
  currentPrice: number;
  profit: number;
  profitRate: number;
  status: 'holding' | 'watching';
}

// 模拟数据
const mockBonds: IBond[] = [
  {
    id: '1',
    code: '019666',
    name: '22国债66',
    type: 'treasury',
    parValue: 100,
    couponRate: 0.0232,
    maturityDate: '2025-12-31',
    holdingAmount: 100000,
    costPrice: 99.5,
    currentPrice: 100.2,
    profit: 700,
    profitRate: 0.007,
    status: 'holding',
  },
  // ... 更多债券数据
];

const bondTypeMap = {
  treasury: { text: '国债', color: 'blue' },
  corporate: { text: '企业债', color: 'orange' },
  convertible: { text: '可转债', color: 'purple' },
  repo: { text: '回购', color: 'cyan' },
  other: { text: '其他', color: 'default' },
};

export default function BondList() {
  const { message } = App.useApp();

  const columns: ColumnsType<IBond> = [
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
      render: (type: keyof typeof bondTypeMap) => (
        <Tag color={bondTypeMap[type].color}>
          {bondTypeMap[type].text}
        </Tag>
      ),
    },
    {
      title: '票面利率',
      dataIndex: 'couponRate',
      key: 'couponRate',
      width: 100,
      align: 'right',
      render: (rate: number) => `${(rate * 100).toFixed(2)}%`,
    },
    {
      title: '到期日',
      dataIndex: 'maturityDate',
      key: 'maturityDate',
      width: 120,
    },
    {
      title: '持有面值',
      dataIndex: 'holdingAmount',
      key: 'holdingAmount',
      width: 120,
      align: 'right',
      render: (amount: number) => amount.toFixed(2),
    },
    {
      title: '成本价',
      dataIndex: 'costPrice',
      key: 'costPrice',
      width: 100,
      align: 'right',
      render: (price: number) => price.toFixed(4),
    },
    {
      title: '现价',
      dataIndex: 'currentPrice',
      key: 'currentPrice',
      width: 100,
      align: 'right',
      render: (price: number) => price.toFixed(4),
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
            placeholder="债券类型"
            style={{ width: 120 }}
            options={Object.entries(bondTypeMap).map(([key, value]) => ({
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
          新增债券
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={mockBonds}
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