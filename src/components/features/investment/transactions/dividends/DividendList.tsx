'use client';

import { useState } from 'react';
import { Table, Button, Space, Tag, DatePicker, Select, Input, App } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import DividendForm from './DividendForm';

const { RangePicker } = DatePicker;

interface IDividend {
  id: string;
  date: string;
  productId: string;
  productName: string;
  productType: 'stock' | 'fund' | 'bond';
  dividendType: 'cash' | 'stock' | 'rights';
  amount: number;
  price?: number;
  shares?: number;
  tax?: number;
  remarks?: string;
}

// 模拟数据
const mockDividends: IDividend[] = [
  {
    id: '1',
    date: '2024-03-20',
    productId: '1',
    productName: '浦发银行',
    productType: 'stock',
    dividendType: 'cash',
    amount: 1000,
    tax: 100,
    remarks: '年度分红',
  },
];

export default function DividendList() {
  const { message } = App.useApp();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<IDividend | null>(null);

  const productTypeMap: Record<IDividend['productType'], { text: string; color: string }> = {
    stock: { text: '股票', color: 'blue' },
    fund: { text: '基金', color: 'green' },
    bond: { text: '债券', color: 'orange' },
  };

  const dividendTypeMap: Record<IDividend['dividendType'], { text: string; color: string }> = {
    cash: { text: '现金', color: 'green' },
    stock: { text: '送股', color: 'blue' },
    rights: { text: '配股', color: 'orange' },
  };

  const columns: ColumnsType<IDividend> = [
    {
      title: '日期',
      dataIndex: 'date',
      key: 'date',
      width: 100,
      sorter: (a, b) => dayjs(a.date).unix() - dayjs(b.date).unix(),
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
      render: (type: IDividend['productType']) => (
        <Tag color={productTypeMap[type].color}>{productTypeMap[type].text}</Tag>
      ),
    },
    {
      title: '分红类型',
      dataIndex: 'dividendType',
      key: 'dividendType',
      width: 100,
      render: (type: IDividend['dividendType']) => (
        <Tag color={dividendTypeMap[type].color}>{dividendTypeMap[type].text}</Tag>
      ),
    },
    {
      title: '分红金额',
      dataIndex: 'amount',
      key: 'amount',
      width: 120,
      align: 'right',
      render: (amount) => `¥${amount.toFixed(2)}`,
    },
    {
      title: '税费',
      dataIndex: 'tax',
      key: 'tax',
      width: 100,
      align: 'right',
      render: (tax) => (tax ? `¥${tax.toFixed(2)}` : '-'),
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
            placeholder="分红类型"
            style={{ width: 120 }}
            options={[
              { label: '全部', value: 'all' },
              { label: '现金', value: 'cash' },
              { label: '送股', value: 'stock' },
              { label: '配股', value: 'rights' },
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
          新增分红
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={mockDividends}
        rowKey="id"
        size="small"
        scroll={{ x: 'max-content' }}
        pagination={{
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total) => `共 ${total} 条`,
        }}
      />

      <DividendForm
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