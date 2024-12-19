'use client';

import { useState } from 'react';
import { Table, Button, Space, Tag, DatePicker, Select, Input, App } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import type { ITrade } from '@/types/investment';
import dayjs from 'dayjs';
import TradeForm from './TradeForm';

const { RangePicker } = DatePicker;

// 模拟数据
const mockTrades: ITrade[] = [
  {
    id: '1',
    date: '2024-03-20',
    type: 'buy',
    productId: '1',
    productName: '浦发银行',
    productType: 'stock',
    amount: 1000,
    price: 10.5,
    fee: 5,
    total: 10505,
    remarks: '建仓',
  },
];

export default function TradeList() {
  const { message } = App.useApp();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<ITrade | null>(null);

  const typeMap: Record<ITrade['productType'], { text: string; color: string }> = {
    stock: { text: '股票', color: 'blue' },
    fund: { text: '基金', color: 'green' },
    bond: { text: '债券', color: 'orange' },
    other: { text: '其他', color: 'default' },
  };

  const columns: ColumnsType<ITrade> = [
    {
      title: '日期',
      dataIndex: 'date',
      key: 'date',
      width: 100,
      sorter: (a, b) => dayjs(a.date).unix() - dayjs(b.date).unix(),
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      width: 80,
      render: (type) => (
        <Tag color={type === 'buy' ? 'blue' : 'green'}>
          {type === 'buy' ? '买入' : '卖出'}
        </Tag>
      ),
    },
    {
      title: '产品名称',
      dataIndex: 'productName',
      key: 'productName',
      width: 150,
    },
    {
      title: '产品类型',
      dataIndex: 'productType',
      key: 'productType',
      width: 100,
      render: (type: ITrade['productType']) => (
        <Tag color={typeMap[type].color}>{typeMap[type].text}</Tag>
      ),
    },
    {
      title: '数量',
      dataIndex: 'amount',
      key: 'amount',
      width: 100,
      align: 'right',
    },
    {
      title: '价格',
      dataIndex: 'price',
      key: 'price',
      width: 100,
      align: 'right',
      render: (price) => `¥${price.toFixed(3)}`,
    },
    {
      title: '手续费',
      dataIndex: 'fee',
      key: 'fee',
      width: 100,
      align: 'right',
      render: (fee) => `¥${fee.toFixed(2)}`,
    },
    {
      title: '总金额',
      dataIndex: 'total',
      key: 'total',
      width: 120,
      align: 'right',
      render: (total) => `¥${total.toFixed(2)}`,
    },
    {
      title: '备注',
      dataIndex: 'remarks',
      key: 'remarks',
      ellipsis: true,
    },
    {
      title: '操作',
      key: 'action',
      width: 120,
      fixed: 'right',
      render: (_, record) => (
        <Space>
          <Button 
            type="link" 
            size="small"
            onClick={() => {
              setSelectedRecord(record);
              setIsModalVisible(true);
            }}
          >
            编辑
          </Button>
          <Button 
            type="link" 
            size="small" 
            danger
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
            placeholder="搜索产品名称"
            prefix={<SearchOutlined />}
            style={{ width: 200 }}
          />
          <Select
            placeholder="交易类型"
            style={{ width: 120 }}
            options={[
              { label: '全部', value: 'all' },
              { label: '买入', value: 'buy' },
              { label: '卖出', value: 'sell' },
            ]}
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
          <RangePicker />
        </Space>
        <Button 
          type="primary" 
          icon={<PlusOutlined />}
          onClick={() => {
            setSelectedRecord(null);
            setIsModalVisible(true);
          }}
        >
          新增交易
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={mockTrades}
        rowKey="id"
        size="small"
        scroll={{ x: 'max-content' }}
        pagination={{
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total) => `共 ${total} 条`,
        }}
      />

      <TradeForm
        visible={isModalVisible}
        record={selectedRecord}
        onCancel={() => setIsModalVisible(false)}
        onSuccess={() => {
          setIsModalVisible(false);
          message.success('保存成功');
        }}
      />
    </div>
  );
} 