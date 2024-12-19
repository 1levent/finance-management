'use client';

import { Table, Tag, Space, Button, Tooltip, Badge } from 'antd';
import { WarningOutlined, BellOutlined, BellFilled } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

interface IStopLossAlert {
  id: string;
  productName: string;
  productType: 'stock' | 'fund' | 'bond' | 'other';
  cost: number;
  current: number;
  profitRate: number;
  stopLossPrice: number;
  stopProfitPrice: number;
  status: 'normal' | 'warning' | 'danger';
  notified: boolean;
  updateTime: string;
}

// 模拟数据
const mockData: IStopLossAlert[] = [
  {
    id: '1',
    productName: '浦发银行',
    productType: 'stock',
    cost: 10.5,
    current: 9.2,
    profitRate: -12.38,
    stopLossPrice: 9.45,
    stopProfitPrice: 11.55,
    status: 'danger',
    notified: true,
    updateTime: '2024-03-20 14:30:00',
  },
  {
    id: '2',
    productName: '易方达蓝筹',
    productType: 'fund',
    cost: 1.85,
    current: 1.75,
    profitRate: -5.41,
    stopLossPrice: 1.67,
    stopProfitPrice: 2.04,
    status: 'warning',
    notified: false,
    updateTime: '2024-03-20 14:30:00',
  },
];

const statusConfig: Record<IStopLossAlert['status'], { color: string; text: string }> = {
  normal: { color: '#52c41a', text: '正常' },
  warning: { color: '#faad14', text: '接近止损' },
  danger: { color: '#f5222d', text: '已触发' },
};

const typeConfig: Record<IStopLossAlert['productType'], { color: string; text: string }> = {
  stock: { color: 'blue', text: '股票' },
  fund: { color: 'green', text: '基金' },
  bond: { color: 'orange', text: '债券' },
  other: { color: 'default', text: '其他' },
};

export default function StopLossList() {
  const columns: ColumnsType<IStopLossAlert> = [
    {
      title: '产品名称',
      dataIndex: 'productName',
      key: 'productName',
      width: 150,
      fixed: 'left',
      render: (text, record) => (
        <Space>
          <span>{text}</span>
          {record.notified && (
            <Tooltip title="已发送预警通知">
              <BellFilled className="text-yellow-500" />
            </Tooltip>
          )}
        </Space>
      ),
    },
    {
      title: '类型',
      dataIndex: 'productType',
      key: 'productType',
      width: 100,
      render: (type: IStopLossAlert['productType']) => (
        <Tag color={typeConfig[type].color}>{typeConfig[type].text}</Tag>
      ),
    },
    {
      title: '成本价',
      dataIndex: 'cost',
      key: 'cost',
      width: 100,
      align: 'right',
      render: (val) => `¥${val.toFixed(3)}`,
    },
    {
      title: '当前价',
      dataIndex: 'current',
      key: 'current',
      width: 100,
      align: 'right',
      render: (val) => `¥${val.toFixed(3)}`,
    },
    {
      title: '盈亏比例',
      dataIndex: 'profitRate',
      key: 'profitRate',
      width: 120,
      align: 'right',
      render: (val) => (
        <span style={{ color: val >= 0 ? '#3f8600' : '#cf1322' }}>
          {val >= 0 ? '+' : ''}{val.toFixed(2)}%
        </span>
      ),
    },
    {
      title: '止损价',
      dataIndex: 'stopLossPrice',
      key: 'stopLossPrice',
      width: 100,
      align: 'right',
      render: (val) => `¥${val.toFixed(3)}`,
    },
    {
      title: '止盈价',
      dataIndex: 'stopProfitPrice',
      key: 'stopProfitPrice',
      width: 100,
      align: 'right',
      render: (val) => `¥${val.toFixed(3)}`,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      render: (status: IStopLossAlert['status']) => (
        <Badge
          color={statusConfig[status].color}
          text={statusConfig[status].text}
        />
      ),
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
      width: 150,
    },
    {
      title: '操作',
      key: 'action',
      width: 100,
      fixed: 'right',
      render: (_, record) => (
        <Space>
          <Button
            type="text"
            size="small"
            icon={<BellOutlined />}
            disabled={record.notified}
          >
            通知
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <h3 className="text-base font-medium">预警列表</h3>
          <Badge count={2} className="ml-2" />
        </div>
        <Space>
          <Button type="primary" danger icon={<WarningOutlined />}>
            全部通知
          </Button>
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