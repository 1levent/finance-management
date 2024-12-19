'use client';

import { useEffect, useState } from 'react';
import { Table, Card, Button, Input, DatePicker, Select, Tag, Space, Modal, Upload, Dropdown, Form, App } from 'antd';
import { SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined, UploadOutlined, DownloadOutlined } from '@ant-design/icons';
import type { ITransaction, TransactionType, TransactionStatus } from '@/types/transaction';
import type { MenuProps } from 'antd';
import type { ReactNode } from 'react';
import type { RcFile } from 'antd/es/upload';
import dayjs from 'dayjs';
import TransactionStats from '../shared/TransactionStats';
import TransactionForm from './TransactionForm';

const { RangePicker } = DatePicker;

// 模拟数据
const mockTransactions: ITransaction[] = [
  {
    id: '1',
    type: 'income' as TransactionType,
    amount: 5000,
    categoryId: '1',
    date: '2024-03-20',
    description: '工资',
    status: 'completed' as TransactionStatus,
    currency: 'CNY',
    createdAt: '2024-03-20T10:00:00Z',
    updatedAt: '2024-03-20T10:00:00Z',
  },
  {
    id: '2',
    type: 'expense' as TransactionType,
    amount: 1000,
    categoryId: '2',
    date: '2024-03-19',
    description: '购物',
    status: 'completed' as TransactionStatus,
    currency: 'CNY',
    createdAt: '2024-03-19T15:00:00Z',
    updatedAt: '2024-03-19T15:00:00Z',
  },
];

const mockCategories = [
  { id: '1', name: '工资' },
  { id: '2', name: '购物' },
];

// SearchForm 组件
function SearchForm({
  onSearch = () => {},
  onReset = () => {},
  onImport,
  onExport,
  onAdd,
  batchActionItems,
  selectedCount = 0,
}: {
  onSearch?: (values: any) => void;
  onReset?: () => void;
  onImport: (file: RcFile) => boolean;
  onExport: () => void;
  onAdd: () => void;
  batchActionItems?: MenuProps['items'];
  selectedCount?: number;
}) {
  const [form] = Form.useForm();

  const handleReset = () => {
    form.resetFields();
    onReset();
  };

  return (
    <Form 
      form={form}
      onFinish={onSearch}
      layout="horizontal"
      preserve={false}
      initialValues={{
        type: undefined,
        keyword: undefined,
        dateRange: undefined,
        status: undefined,
      }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Form.Item name="type" label="类型">
          <Select
            placeholder="选择类型"
            allowClear
            options={[
              { label: '收入', value: 'income' },
              { label: '支出', value: 'expense' },
            ]}
          />
        </Form.Item>
        <Form.Item name="keyword" label="描述">
          <Input
            placeholder="搜索描述"
            allowClear
          />
        </Form.Item>
        <Form.Item name="dateRange" label="日期">
          <RangePicker
            style={{ width: '100%' }}
          />
        </Form.Item>
        <Form.Item name="status" label="状态">
          <Select
            placeholder="状态"
            allowClear
            options={[
              { label: '全部', value: 'all' },
              { label: '已完成', value: 'completed' },
              { label: '待处理', value: 'pending' },
              { label: '已取消', value: 'cancelled' },
            ]}
          />
        </Form.Item>
      </div>
      <div className="flex justify-between mt-4">
        <Space>
          <Upload
            beforeUpload={onImport}
            showUploadList={false}
            accept=".xlsx,.xls"
          >
            <Button type="default" icon={<UploadOutlined />}>导入</Button>
          </Upload>
          <Button type="default" icon={<DownloadOutlined />} onClick={onExport}>
            导出
          </Button>
          {selectedCount > 0 && batchActionItems && (
            <Dropdown menu={{ items: batchActionItems }}>
              <Button type="default">
                批量操作 ({selectedCount})
              </Button>
            </Dropdown>
          )}
        </Space>
        <Space>
          <Button onClick={handleReset}>重置</Button>
          <Button type="primary" htmlType="submit">搜索</Button>
          <Button type="primary" icon={<PlusOutlined />} onClick={onAdd}>
            新增记录
          </Button>
        </Space>
      </div>
    </Form>
  );
}

export default function TransactionList(): ReactNode {
  const { message } = App.useApp();
  const [transactions, setTransactions] = useState(mockTransactions);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<ITransaction | null>(null);

  const columns = [
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      width: 50,
      align: 'center' as const,
      render: (type: string) => (
        <Tag color={type === 'income' ? 'success' : 'error'}>
          {type === 'income' ? '收入' : '支出'}
        </Tag>
      ),
    },
    {
      title: '金额',
      dataIndex: 'amount',
      key: 'amount',
      width: 120,
      align: 'center' as const,
      render: (amount: number, record: any) => (
        <span style={{ color: record.type === 'income' ? '#52c41a' : '#f5222d' }}>
          {record.type === 'income' ? '+' : '-'} ¥{amount.toFixed(2)}
        </span>
      ),
    },
    {
      title: '分类',
      dataIndex: 'categoryId',
      key: 'categoryId',
      width: 50,
      align: 'center' as const,
      render: (categoryId: string) => {
        const category = mockCategories.find(c => c.id === categoryId);
        return category?.name || '-';
      },
    },
    {
      title: '日期',
      dataIndex: 'date',
      key: 'date',
      align: 'center' as const,
      width: 100,
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
      align: 'center' as const,
      ellipsis: true,
      width: 150,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      align: 'center' as const,
      render: (status: string) => (
        <Tag color={
          status === 'completed' ? 'success' :
          status === 'pending' ? 'processing' :
          'error'
        }>
          {status === 'completed' ? '已完成' :
           status === 'pending' ? '待处理' :
           '已取消'}
        </Tag>
      ),
    },
    {
      title: '操作',
      key: 'action',
      width: 130,
      align: 'center' as const,
      fixed: 'right' as const,
      render: (_: any, record: any) => (
        <Space size={4}>
          <Button type="link" size="small" icon={<EditOutlined />} onClick={() => handleEdit(record)}>
            编辑
          </Button>
          <Button type="link" size="small" danger icon={<DeleteOutlined />} onClick={() => handleDelete(record)}>
            删除
          </Button>
        </Space>
      ),
    },
  ];

  // 基本操作函数
  const handleAdd = () => {
    setSelectedRecord(null);
    setIsModalVisible(true);
  };

  const handleEdit = (record: ITransaction) => {
    setSelectedRecord(record);
    setIsModalVisible(true);
  };

  const handleDelete = (record: any) => {
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除这条记录吗？',
      onOk: () => message.success('点击了确认删除'),
    });
  };

  const handleExport = () => {
    message.success('点击了导出按钮');
  };

  const handleImport = (file: RcFile) => {
    message.success('点击了导入按钮');
    return false;
  };

  const handleSearch = (values: any) => {
    console.log('搜索条件:', values);
    message.success('点击了搜索按钮');
  };

  // 批量操作菜单
  const batchActionItems: MenuProps['items'] = [
    {
      key: 'delete',
      label: '批量删除',
      danger: true,
      onClick: () => message.success('点击了批量删除'),
    },
    {
      key: 'status',
      label: '批量修改状态',
      children: [
        {
          key: 'completed',
          label: '已完成',
          onClick: () => message.success('点击了批量修改状态:已完成'),
        },
        {
          key: 'pending',
          label: '待处理',
          onClick: () => message.success('点击了批量修改状态:待处理'),
        },
        {
          key: 'cancelled',
          label: '已取消',
          onClick: () => message.success('点击了批量修改状态:已取消'),
        },
      ],
    },
    {
      key: 'category',
      label: '批量修改分类',
      children: mockCategories.map(c => ({
        key: c.id,
        label: c.name,
        onClick: () => message.success(`点击了批量修改分类:${c.name}`),
      })),
    },
  ];

  // 表格选择配置
  const rowSelection = {
    selectedRowKeys,
    onChange: (keys: React.Key[], rows: any[]) => {
      setSelectedRowKeys(keys);
      setSelectedRows(rows);
    },
  };

  const handleSuccess = (values: any) => {
    message.success('操作成功');
    setIsModalVisible(false);
  };

  return (
    <div className="space-y-4">
      <TransactionStats transactions={transactions} />

      <Card size="small">
        <SearchForm
          onSearch={handleSearch}
          onReset={() => message.success('点击了重置按钮')}
          onImport={handleImport}
          onExport={handleExport}
          onAdd={handleAdd}
          batchActionItems={batchActionItems}
          selectedCount={selectedRowKeys.length}
        />
      </Card>

      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={transactions}
        rowKey="id"
        pagination={{
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total) => `共 ${total} 条`,
          defaultPageSize: 10,
          pageSizeOptions: ['10', '20', '50', '100'],
        }}
        size="small"
        className="border border-gray-200 rounded"
        scroll={{ x: 'max-content' }}
      />

      <TransactionForm
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        record={selectedRecord}
        onSuccess={handleSuccess}
      />
    </div>
  );
} 