'use client';

import { useState } from 'react';
import { Card, Row, Col, Button, Table, Tag, Space, Modal, App, Progress } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, CreditCardOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import type { ICreditCard } from '@/types/assets';
import CreditCardForm from '@/components/features/assets/accounts/CreditCardForm';
import AccountOverview from '@/components/features/assets/accounts/AccountOverview';

const mockData: ICreditCard[] = [
  {
    id: '1',
    bankName: '招商银行',
    cardType: 'visa',
    cardNumber: '4000********1234',
    cardHolder: '张三',
    creditLimit: 50000,
    availableCredit: 30000,
    billDate: 5,
    dueDate: 25,
    status: 'normal',
    currentBill: 5000,
  },
  {
    id: '2',
    bankName: '中信银行',
    cardType: 'mastercard',
    cardNumber: '5200********5678',
    cardHolder: '张三',
    creditLimit: 80000,
    availableCredit: 65000,
    billDate: 10,
    dueDate: 28,
    status: 'normal',
    currentBill: 8000,
  },
];

const cardTypeLabels = {
  visa: { text: 'VISA', color: 'blue' },
  mastercard: { text: 'MasterCard', color: 'orange' },
  unionpay: { text: '银联', color: 'green' },
};

const statusLabels = {
  normal: { text: '正常', color: 'success' },
  overdue: { text: '逾期', color: 'error' },
  frozen: { text: '冻结', color: 'default' },
};

export default function CreditCardPage() {
  const { message, modal } = App.useApp();
  const [selectedCard, setSelectedCard] = useState<ICreditCard | null>(null);
  const [detailVisible, setDetailVisible] = useState(false);

  const columns: ColumnsType<ICreditCard> = [
    {
      title: '发卡行',
      dataIndex: 'bankName',
      key: 'bankName',
      render: (text) => (
        <Space>
          <CreditCardOutlined />
          <span>{text}</span>
        </Space>
      ),
    },
    {
      title: '卡片类型',
      dataIndex: 'cardType',
      key: 'cardType',
      render: (type: keyof typeof cardTypeLabels) => (
        <Tag color={cardTypeLabels[type].color}>
          {cardTypeLabels[type].text}
        </Tag>
      ),
    },
    {
      title: '卡号',
      dataIndex: 'cardNumber',
      key: 'cardNumber',
    },
    {
      title: '额度使用',
      key: 'creditUsage',
      render: (_, record) => {
        const usagePercent = Math.round(((record.creditLimit - record.availableCredit) / record.creditLimit) * 100);
        return (
          <Space direction="vertical" size="small" className="w-full">
            <Progress
              percent={usagePercent}
              size="small"
              status={usagePercent > 80 ? 'exception' : 'normal'}
            />
            <div className="text-xs">
              <span>可用额度: </span>
              <span className="font-medium">
                ¥{record.availableCredit.toLocaleString()}
              </span>
              <span className="mx-1">/</span>
              <span>总额度: </span>
              <span className="font-medium">
                ¥{record.creditLimit.toLocaleString()}
              </span>
            </div>
          </Space>
        );
      },
    },
    {
      title: '账单日/还款日',
      key: 'dates',
      render: (_, record) => (
        <div className="text-xs">
          <div>账单日: 每月{record.billDate}日</div>
          <div>还款日: 每月{record.dueDate}日</div>
        </div>
      ),
    },
    {
      title: '当期账单',
      dataIndex: 'currentBill',
      key: 'currentBill',
      render: (value: number) => (
        <span className="text-orange-500">
          ¥{value.toLocaleString()}
        </span>
      ),
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
              setSelectedCard(record);
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

  const handleDelete = (card: ICreditCard) => {
    modal.confirm({
      title: '确认删除',
      content: `确定要删除${card.bankName}的信用卡吗？`,
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
            totalAssets={130000}
            activeAccounts={2}
          />
        </Col>

        <Col span={24}>
          <Card
            size="small"
            title="信用卡管理"
            extra={
              <Button
                type="primary"
                size="small"
                icon={<PlusOutlined />}
                onClick={() => {
                  setSelectedCard(null);
                  setDetailVisible(true);
                }}
              >
                添加信用卡
              </Button>
            }
          >
            <Table<ICreditCard>
              columns={columns}
              dataSource={mockData}
              size="small"
              pagination={false}
              rowKey="id"
            />
          </Card>
        </Col>
      </Row>

      {/* 信用卡详情/编辑弹窗 */}
      <Modal
        title={selectedCard ? '编辑信用卡' : '添加信用卡'}
        open={detailVisible}
        onCancel={() => setDetailVisible(false)}
        footer={null}
      >
        <CreditCardForm
          initialValues={selectedCard || undefined}
          onSubmit={(values) => {
            message.success(`${selectedCard ? '编辑' : '添加'}成功`);
            setDetailVisible(false);
          }}
          onCancel={() => setDetailVisible(false)}
        />
      </Modal>
    </div>
  );
} 