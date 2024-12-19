'use client';

import { useState } from 'react';
import { Card, Row, Col, Button, Table, Tag, Space, Modal, App } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import BankAccountForm from '@/components/features/assets/accounts/BankAccountForm';
import type { IBankAccount } from '@/types/assets';
import AccountOverview from '@/components/features/assets/accounts/AccountOverview';

const mockData: IBankAccount[] = [
  {
    id: '1',
    bankName: '工商银行',
    accountType: 'savings',
    accountNumber: '6222********1234',
    balance: 50000,
    status: 'active',
    lastTransaction: '2024-03-15',
  },
  {
    id: '2',
    bankName: '建设银行',
    accountType: 'checking',
    accountNumber: '6227********5678',
    balance: 30000,
    status: 'active',
    lastTransaction: '2024-03-14',
  },
];

const accountTypeLabels = {
  savings: { text: '储蓄账户', color: 'blue' },
  checking: { text: '活期账户', color: 'green' },
  deposit: { text: '定期账户', color: 'orange' },
};

const statusLabels = {
  active: { text: '正常', color: 'success' },
  inactive: { text: '冻结', color: 'error' },
};

export default function BankAccountPage() {
  const { message, modal } = App.useApp();
  const [selectedAccount, setSelectedAccount] = useState<IBankAccount | null>(null);
  const [detailVisible, setDetailVisible] = useState(false);

  const columns: ColumnsType<IBankAccount> = [
    {
      title: '开户行',
      dataIndex: 'bankName',
      key: 'bankName',
    },
    {
      title: '账户类型',
      dataIndex: 'accountType',
      key: 'accountType',
      render: (type: keyof typeof accountTypeLabels) => (
        <Tag color={accountTypeLabels[type].color}>
          {accountTypeLabels[type].text}
        </Tag>
      ),
    },
    {
      title: '账号',
      dataIndex: 'accountNumber',
      key: 'accountNumber',
    },
    {
      title: '余额',
      dataIndex: 'balance',
      key: 'balance',
      align: 'right',
      render: (value: number) => `¥${value.toLocaleString()}`,
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
      title: '最后交易',
      dataIndex: 'lastTransaction',
      key: 'lastTransaction',
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
              setSelectedAccount(record);
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

  const handleDelete = (account: IBankAccount) => {
    modal.confirm({
      title: '确认删除',
      content: `确定要删除${account.bankName}的账户吗？`,
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
            totalAccounts={3}
            totalAssets={80000}
            activeAccounts={2}
          />
        </Col>

        <Col span={24}>
          <Card
            size="small"
            title="银行账户"
            extra={
              <Button
                type="primary"
                size="small"
                icon={<PlusOutlined />}
                onClick={() => {
                  setSelectedAccount(null);
                  setDetailVisible(true);
                }}
              >
                添加账户
              </Button>
            }
          >
            <Table<IBankAccount>
              columns={columns}
              dataSource={mockData}
              size="small"
              pagination={false}
              rowKey="id"
            />
          </Card>
        </Col>
      </Row>

      {/* 账户详情/编辑弹窗 */}
      <Modal
        title={selectedAccount ? '编辑账户' : '添加账户'}
        open={detailVisible}
        onCancel={() => setDetailVisible(false)}
        footer={null}
      >
        <BankAccountForm
          initialValues={selectedAccount || undefined}
          onSubmit={(values) => {
            message.success(`${selectedAccount ? '编辑' : '添加'}成功`);
            setDetailVisible(false);
          }}
          onCancel={() => setDetailVisible(false)}
        />
      </Modal>
    </div>
  );
} 