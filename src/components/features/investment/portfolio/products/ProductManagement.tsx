'use client';

import { useState } from 'react';
import { Button, App } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import ProductList from './ProductList';
import ProductForm from './ProductForm';
import type { Product } from '@/types/investment';

// 模拟数据
const mockProducts: Product[] = [
  {
    id: '1',
    type: 'stock',
    code: '600000',
    name: '浦发银行',
    status: 'holding',
    market: 'SH',
    holdingAmount: 1000,
    costPrice: 10.5,
    currentPrice: 11.2,
    remarks: '银行股',
  },
  {
    id: '2',
    type: 'fund',
    code: '000001',
    name: '华夏成长',
    status: 'watching',
    fundType: 'stock',
    holdingAmount: 10000,
    costNav: 1.5,
    currentNav: 1.6,
    purchaseFee: 0.015,
    redemptionFee: 0.005,
    remarks: '股票型基金',
  },
  {
    id: '3',
    type: 'bond',
    code: '019666',
    name: '22国债66',
    status: 'holding',
    bondType: 'treasury',
    parValue: 100,
    couponRate: 0.0285,
    maturityDate: '2025-12-31',
    holdingAmount: 100,
    costPrice: 99.5,
    currentPrice: 100.2,
    remarks: '国债',
  },
];

export default function ProductManagement() {
  const { message, modal } = App.useApp();
  const [formVisible, setFormVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<Product | undefined>();
  const [products] = useState<Product[]>(mockProducts);

  const handleAdd = () => {
    setSelectedRecord(undefined);
    setFormVisible(true);
  };

  const handleEdit = (record: Product) => {
    setSelectedRecord(record);
    setFormVisible(true);
  };

  const handleDelete = (record: Product) => {
    modal.confirm({
      title: '确认删除',
      content: `确定要删除 ${record.name} 吗？`,
      onOk: () => {
        message.success('删除成功');
      },
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium">产品管理</h2>
        <Button 
          type="primary" 
          icon={<PlusOutlined />}
          onClick={handleAdd}
        >
          新增产品
        </Button>
      </div>

      <ProductList
        products={products}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <ProductForm
        type={selectedRecord?.type || 'stock'}
        visible={formVisible}
        record={selectedRecord}
        onCancel={() => setFormVisible(false)}
        onSuccess={() => {
          setFormVisible(false);
          message.success('保存成功');
        }}
      />
    </div>
  );
} 