'use client';

import { Table, Tag, Space, Progress } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface IAsset {
  key: string;
  name: string;
  type: string;
  amount: number;
  profit: number;
  profitPercent: number;
  risk: 'high' | 'medium' | 'low';
}

const mockData: IAsset[] = [
  {
    key: '1',
    name: '蚂蚁理财',
    type: '货币基金',
    amount: 50000,
    profit: 1200,
    profitPercent: 2.4,
    risk: 'low',
  },
  // ... 其他数据
];

const riskColors = {
  high: '#ff4d4f',
  medium: '#faad14',
  low: '#52c41a',
};

const riskLabels = {
  high: '高',
  medium: '中',
  low: '低',
};

const columns: ColumnsType<IAsset> = [
  {
    title: '资产名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '类型',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: '金额',
    dataIndex: 'amount',
    key: 'amount',
    render: (value: number) => `¥${value.toLocaleString()}`,
  },
  {
    title: '收益',
    key: 'profit',
    render: (_: unknown, record: IAsset) => (
      <Space direction="vertical" size="small">
        <span className={record.profit >= 0 ? 'text-green-500' : 'text-red-500'}>
          ¥{record.profit.toLocaleString()}
        </span>
        <Progress
          percent={record.profitPercent}
          size="small"
          status={record.profit >= 0 ? 'success' : 'exception'}
          format={(percent) => `${percent}%`}
        />
      </Space>
    ),
  },
  {
    title: '风险等级',
    key: 'risk',
    dataIndex: 'risk',
    render: (risk: IAsset['risk']) => (
      <Tag color={riskColors[risk]}>{riskLabels[risk]}</Tag>
    ),
  },
];

export default function AssetList() {
  return (
    <Table<IAsset>
      columns={columns}
      dataSource={mockData}
      size="small"
      pagination={false}
    />
  );
} 