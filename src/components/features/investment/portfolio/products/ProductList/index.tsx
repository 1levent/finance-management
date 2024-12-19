'use client';

import { Table, Button, Space, Dropdown, Menu, message, Tag } from 'antd';
import { DownloadOutlined, UploadOutlined, MoreOutlined } from '@ant-design/icons';
import { useProductFilter } from '../hooks/useProductFilter';
import FilterForm from './FilterForm';
import type { Product, ProductType } from '@/types/investment';
import type { ColumnsType } from 'antd/es/table';

interface IProductListProps {
  products: Product[];
  onEdit: (record: Product) => void;
  onDelete: (record: Product) => void;
}

const typeMap: Record<ProductType, { text: string; color: string }> = {
  stock: { text: '股票', color: 'blue' },
  fund: { text: '基金', color: 'green' },
  bond: { text: '债券', color: 'orange' },
  other: { text: '其他', color: 'default' },
};

const statusMap: Record<'holding' | 'watching', { text: string; color: string }> = {
  holding: { text: '持仓', color: 'success' },
  watching: { text: '关注', color: 'warning' },
};

export default function ProductList({ products, onEdit, onDelete }: IProductListProps) {
  const { filters, setFilters, filteredProducts } = useProductFilter(products);

  const columns: ColumnsType<Product> = [
    {
      title: '代码',
      dataIndex: 'code',
      key: 'code',
      width: 120,
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
      render: (type: ProductType) => (
        <Tag color={typeMap[type].color}>
          {typeMap[type].text}
        </Tag>
      ),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status: 'holding' | 'watching') => (
        <Tag color={statusMap[status].color}>
          {statusMap[status].text}
        </Tag>
      ),
    },
    {
      title: '操作',
      key: 'action',
      width: 150,
      fixed: 'right',
      render: (_, record) => (
        <Space>
          <Button type="link" size="small" onClick={() => onEdit(record)}>
            编辑
          </Button>
          <Button type="link" danger size="small" onClick={() => onDelete(record)}>
            删除
          </Button>
        </Space>
      ),
    },
  ];

  const handleExport = () => {
    message.success('导出功能开发中');
  };

  const handleImport = () => {
    message.success('导入功能开发中');
  };

  const handleBatchDelete = () => {
    message.success('批量删除功能开发中');
  };

  const batchActions = (
    <Menu
      items={[
        {
          key: 'delete',
          label: '批量删除',
          onClick: handleBatchDelete,
        },
        {
          key: 'export',
          label: '导出数据',
          onClick: handleExport,
        },
        {
          key: 'import',
          label: '导入数据',
          onClick: handleImport,
        },
      ]}
    />
  );

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <FilterForm filters={filters} onChange={setFilters} />
        <Space>
          <Button icon={<DownloadOutlined />} onClick={handleExport}>
            导出
          </Button>
          <Button icon={<UploadOutlined />} onClick={handleImport}>
            导入
          </Button>
          <Dropdown overlay={batchActions}>
            <Button icon={<MoreOutlined />}>批量操作</Button>
          </Dropdown>
        </Space>
      </div>

      <Table
        rowSelection={{
          type: 'checkbox',
        }}
        columns={columns}
        dataSource={filteredProducts}
        rowKey="id"
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