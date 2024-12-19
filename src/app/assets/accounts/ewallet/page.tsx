'use client';

import { useState } from 'react';
import { Card, Row, Col, Button, Table, Tag, Space, Modal, App, Progress } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, WalletOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import type { IEWallet } from '@/types/assets';
import EWalletForm from '@/components/features/assets/accounts/EWalletForm';
import AccountOverview from '@/components/features/assets/accounts/AccountOverview';

const mockData: IEWallet[] = [
  {
    id: '1',
    name: '支付宝',
    type: 'alipay',
    accountId: 'example@email.com',
    balance: 3000,
    status: 'active',
    lastTransaction: '2024-03-15',
    dailyLimit: 5000,
    monthlyLimit: 50000,
  },
  {
    id: '2',
    name: '微信支付',
    type: 'wechat',
    accountId: '138****8888',
    balance: 2000,
    status: 'active',
    lastTransaction: '2024-03-14',
    dailyLimit: 3000,
    monthlyLimit: 30000,
  },
];

const walletTypeLabels = {
  alipay: { text: '支付宝', color: 'blue' },
  wechat: { text: '微信支付', color: 'green' },
  other: { text: '其他', color: 'default' },
};

const statusLabels = {
  active: { text: '正常', color: 'success' },
  inactive: { text: '停用', color: 'default' },
};

export default function EWalletPage() {
  const { message, modal } = App.useApp();
  const [selectedWallet, setSelectedWallet] = useState<IEWallet | null>(null);
  const [detailVisible, setDetailVisible] = useState(false);

  const columns: ColumnsType<IEWallet> = [
    {
      title: '钱包名称',
      dataIndex: 'name',
      key: 'name',
      render: (text) => (
        <Space>
          <WalletOutlined />
          <span>{text}</span>
        </Space>
      ),
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      render: (type: keyof typeof walletTypeLabels) => (
        <Tag color={walletTypeLabels[type].color}>
          {walletTypeLabels[type].text}
        </Tag>
      ),
    },
    {
      title: '账号',
      dataIndex: 'accountId',
      key: 'accountId',
    },
    {
      title: '余额',
      dataIndex: 'balance',
      key: 'balance',
      align: 'right',
      render: (value: number) => (
        <span className="text-blue-500">
          ¥{value.toLocaleString()}
        </span>
      ),
    },
    {
      title: '使用限额',
      key: 'limits',
      render: (_, record) => (
        <div className="text-xs">
          <div>日限额: ¥{record.dailyLimit.toLocaleString()}</div>
          <div>月限额: ¥{record.monthlyLimit.toLocaleString()}</div>
        </div>
      ),
    },
    {
      title: '最后交易',
      dataIndex: 'lastTransaction',
      key: 'lastTransaction',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: keyof typeof statusLabels) => (
        <Tag color={statusLabels[status].color}>
          {statusLabels[status].text}
        </Tag>
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="small">
          <Button
            type="text"
            size="small"
            icon={<EditOutlined />}
            onClick={() => {
              setSelectedWallet(record);
              setDetailVisible(true);
            }}
          >
            编辑
          </Button>
          <Button
            type="text"
            size="small"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record)}
          >
            删除
          </Button>
        </Space>
      ),
    },
  ];

  const handleDelete = (wallet: IEWallet) => {
    modal.confirm({
      title: '确认删除',
      content: `确定要删除${wallet.name}吗？`,
      onOk() {
        message.success('删除成功');
      },
    });
  };

  return (
    <div className="p-4">
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <AccountOverview
            totalAccounts={2}
            totalAssets={5000}
            activeAccounts={2}
          />
        </Col>

        <Col span={24}>
          <Card
            size="small"
            title="电子钱包"
            extra={
              <Button
                type="primary"
                size="small"
                icon={<PlusOutlined />}
                onClick={() => {
                  setSelectedWallet(null);
                  setDetailVisible(true);
                }}
              >
                添加钱包
              </Button>
            }
          >
            <Table<IEWallet>
              columns={columns}
              dataSource={mockData}
              size="small"
              pagination={false}
              rowKey="id"
            />
          </Card>
        </Col>
      </Row>

      {/* 电子钱包详情/编辑弹窗 */}
      <Modal
        title={selectedWallet ? '编辑钱包' : '添加钱包'}
        open={detailVisible}
        onCancel={() => setDetailVisible(false)}
        footer={null}
      >
        <EWalletForm
          initialValues={selectedWallet || undefined}
          onSubmit={(values) => {
            message.success(`${selectedWallet ? '编辑' : '添加'}成功`);
            setDetailVisible(false);
          }}
          onCancel={() => setDetailVisible(false)}
        />
      </Modal>
    </div>
  );
} 