'use client';

import { Table, Button, Space, Tag, Input, Select, App } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

interface IOtherInvestment {
  id: string;
  name: string;
  type: 'deposit' | 'insurance' | 'other';
  amount: number;
  startDate: string;
  endDate?: string;
  expectedReturn: number;
  actualReturn: number;
  status: 'active' | 'expired' | 'watching';
}

// 模拟数据
const mockInvestments: IOtherInvestment[] = [
  {
    id: '1',
    name: '定期存款',
    type: 'deposit',
    amount: 100000,
    startDate: '2024-01-01',
    endDate: '2025-01-01',
    expectedReturn: 2000,
    actualReturn: 0,
    status: 'active',
  },
  // ... 更多数据
];

const typeMap = {
  deposit: { text: '存款', color: 'blue' },
  insurance: { text: '保险', color: 'green' },
  other: { text: '其他', color: 'default' },
};

const statusMap = {
  active: { text: '进行中', color: 'success' },
  expired: { text: '已到期', color: 'default' },
  watching: { text: '关注中', color: 'warning' },
};

export default function OtherList() {
  const { message } = App.useApp();

  const columns: ColumnsType<IOtherInvestment> = [
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
      render: (type: keyof typeof typeMap) => (
        <Tag color={typeMap[type].color}>
          {typeMap[type].text}
        </Tag>
      ),
    },
    {
      title: '投资金额',
      dataIndex: 'amount',
      key: 'amount',
      width: 120,
      align: 'right',
      render: (amount: number) => `¥${amount.toFixed(2)}`,
    },
    {
      title: '起始日期',
      dataIndex: 'startDate',
      key: 'startDate',
      width: 120,
    },
    {
      title: '到期日期',
      dataIndex: 'endDate',
      key: 'endDate',
      width: 120,
    },
    {
      title: '预期收益',
      dataIndex: 'expectedReturn',
      key: 'expectedReturn',
      width: 120,
      align: 'right',
      render: (value: number) => `¥${value.toFixed(2)}`,
    },
    {
      title: '实际收益',
      dataIndex: 'actualReturn',
      key: 'actualReturn',
      width: 120,
      align: 'right',
      render: (value: number) => (
        <span style={{ color: value >= 0 ? '#3f8600' : '#cf1322' }}>
          {value >= 0 ? '+' : ''}¥{value.toFixed(2)}
        </span>
      ),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      align: 'center',
      render: (status: keyof typeof statusMap) => (
        <Tag color={statusMap[status].color}>
          {statusMap[status].text}
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
            placeholder="搜索名称"
            prefix={<SearchOutlined />}
            style={{ width: 200 }}
          />
          <Select
            placeholder="投资类型"
            style={{ width: 120 }}
            options={Object.entries(typeMap).map(([key, value]) => ({
              label: value.text,
              value: key,
            }))}
          />
          <Select
            placeholder="状态"
            style={{ width: 120 }}
            options={Object.entries(statusMap).map(([key, value]) => ({
              label: value.text,
              value: key,
            }))}
          />
        </Space>
        <Button 
          type="primary" 
          icon={<PlusOutlined />}
          onClick={() => message.success('新增功能待实现')}
        >
          新增投资
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={mockInvestments}
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