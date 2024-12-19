'use client';

import { Card, Table, Tag, Button, Space, App } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import type { IAsset } from '@/types/portfolio';
import { useState } from 'react';
import AssetDetail from './AssetDetail';

interface AssetListProps {
  assets: IAsset[];
}

export default function AssetList({ assets }: AssetListProps) {
  const { message } = App.useApp();
  const [selectedAsset, setSelectedAsset] = useState<IAsset | null>(null);
  const [detailVisible, setDetailVisible] = useState(false);

  const columns = [
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => {
        const typeMap = {
          stock: { text: '股票', color: 'blue' },
          fund: { text: '基金', color: 'green' },
          bond: { text: '债券', color: 'orange' },
          deposit: { text: '存款', color: 'purple' },
          other: { text: '其他', color: 'default' },
        };
        const item = typeMap[type as keyof typeof typeMap];
        return <Tag color={item.color}>{item.text}</Tag>;
      },
    },
    {
      title: '持仓成本',
      dataIndex: 'cost',
      key: 'cost',
      align: 'right' as const,
      render: (value: number) => `¥${value.toFixed(2)}`,
    },
    {
      title: '当前市值',
      dataIndex: 'currentValue',
      key: 'currentValue',
      align: 'right' as const,
      render: (value: number) => `¥${value.toFixed(2)}`,
    },
    {
      title: '收益金额',
      dataIndex: 'profit',
      key: 'profit',
      align: 'right' as const,
      render: (value: number) => (
        <span style={{ color: value >= 0 ? '#3f8600' : '#cf1322' }}>
          {value >= 0 ? '+' : ''}{value.toFixed(2)}
        </span>
      ),
    },
    {
      title: '收益率',
      dataIndex: 'profitRate',
      key: 'profitRate',
      align: 'right' as const,
      render: (value: number) => (
        <span style={{ color: value >= 0 ? '#3f8600' : '#cf1322' }}>
          {(value * 100).toFixed(2)}%
        </span>
      ),
    },
    {
      title: '操作',
      key: 'action',
      width: 120,
      render: (_, record: IAsset) => (
        <Space size="small">
          <Button 
            type="link" 
            size="small" 
            icon={<EditOutlined />}
            onClick={(e) => {
              e.stopPropagation();
              message.success('编辑功能待实现');
            }}
          >
            编辑
          </Button>
          <Button 
            type="link" 
            size="small" 
            danger 
            icon={<DeleteOutlined />}
            onClick={(e) => {
              e.stopPropagation();
              message.success('删除功能待实现');
            }}
          >
            删除
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Card 
        title="资产列表" 
        size="small"
        extra={
          <Button type="primary" size="small" onClick={() => message.success('新增功能待实现')}>
            新增资产
          </Button>
        }
      >
        <Table
          columns={columns}
          dataSource={assets}
          rowKey="id"
          size="small"
          pagination={false}
          scroll={{ y: 240 }}
          onRow={(record) => ({
            onClick: () => {
              setSelectedAsset(record);
              setDetailVisible(true);
            },
            style: { cursor: 'pointer' },
          })}
        />
      </Card>

      <AssetDetail
        asset={selectedAsset}
        visible={detailVisible}
        onClose={() => setDetailVisible(false)}
      />
    </>
  );
} 