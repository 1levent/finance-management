'use client';

import { useState } from 'react';
import { Card, Row, Col, Button, Table, Tag, Space, Modal, App, Progress } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import type { IDebt } from '@/types/debt';
import DebtForm from '@/components/features/assets/debt/DebtForm';
import DebtOverview from '@/components/features/assets/debt/DebtOverview';

const mockData: IDebt[] = [
  {
    id: '1',
    name: '房贷',
    type: 'mortgage',
    amount: 1000000,
    remainingAmount: 800000,
    interestRate: 0.0465,
    startDate: '2023-01-01',
    endDate: '2053-01-01',
    status: 'active',
    lender: '建设银行',
    repaymentFrequency: 'monthly',
    nextPaymentDate: '2024-04-01',
    nextPaymentAmount: 4800,
  },
  {
    id: '2',
    name: '消费贷',
    type: 'loan',
    amount: 50000,
    remainingAmount: 30000,
    interestRate: 0.0585,
    startDate: '2023-06-01',
    endDate: '2024-06-01',
    status: 'active',
    lender: '招商银行',
    repaymentFrequency: 'monthly',
    nextPaymentDate: '2024-04-01',
    nextPaymentAmount: 4500,
  },
];

const typeLabels = {
  loan: { text: '消费贷', color: 'blue' },
  mortgage: { text: '房贷', color: 'green' },
  credit: { text: '信用贷', color: 'orange' },
  other: { text: '其他', color: 'default' },
};

const statusLabels = {
  active: { text: '进行中', color: 'processing' },
  paid: { text: '已结清', color: 'success' },
  overdue: { text: '逾期', color: 'error' },
};

export default function LoansPage() {
  const { message, modal } = App.useApp();
  const [selectedDebt, setSelectedDebt] = useState<IDebt | null>(null);
  const [detailVisible, setDetailVisible] = useState(false);

  const columns: ColumnsType<IDebt> = [
    {
      title: '借贷名称',
      dataIndex: 'name',
      key: 'name',
      width: 150,
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      width: 100,
      render: (type: keyof typeof typeLabels) => (
        <Tag color={typeLabels[type].color}>
          {typeLabels[type].text}
        </Tag>
      ),
    },
    {
      title: '借贷金额',
      dataIndex: 'amount',
      key: 'amount',
      width: 120,
      align: 'right',
      render: (val: number) => `¥${val.toLocaleString()}`,
    },
    {
      title: '还款进度',
      key: 'progress',
      width: 200,
      render: (_, record) => {
        const progress = Math.round(((record.amount - record.remainingAmount) / record.amount) * 100);
        return (
          <Space direction="vertical" size="small" style={{ width: '100%' }}>
            <Progress percent={progress} size="small" />
            <div className="text-xs text-gray-500">
              剩余: ¥{record.remainingAmount.toLocaleString()}
            </div>
          </Space>
        );
      },
    },
    {
      title: '年利率',
      dataIndex: 'interestRate',
      key: 'interestRate',
      width: 100,
      align: 'right',
      render: (val: number) => `${(val * 100).toFixed(2)}%`,
    },
    {
      title: '下次还款',
      key: 'nextPayment',
      width: 200,
      render: (_, record) => (
        <div className="text-xs">
          <div>日期: {record.nextPaymentDate}</div>
          <div>金额: ¥{record.nextPaymentAmount.toLocaleString()}</div>
        </div>
      ),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status: keyof typeof statusLabels) => (
        <Tag color={statusLabels[status].color}>
          {statusLabels[status].text}
        </Tag>
      ),
    },
    {
      title: '操作',
      key: 'action',
      width: 150,
      render: (_, record) => (
        <Space size="small">
          <Button
            type="text"
            size="small"
            icon={<EditOutlined />}
            onClick={() => {
              setSelectedDebt(record);
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

  const handleDelete = (debt: IDebt) => {
    modal.confirm({
      title: '确认删除',
      content: `确定要删除${debt.name}吗？`,
      onOk() {
        message.success('删除成功');
      },
    });
  };

  return (
    <div className="p-4">
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <DebtOverview
            totalDebts={2}
            totalAmount={1050000}
            remainingAmount={830000}
            monthlyPayment={9300}
          />
        </Col>

        <Col span={24}>
          <Card
            size="small"
            title="借贷记录"
            extra={
              <Button
                type="primary"
                size="small"
                icon={<PlusOutlined />}
                onClick={() => {
                  setSelectedDebt(null);
                  setDetailVisible(true);
                }}
              >
                新增借贷
              </Button>
            }
          >
            <Table<IDebt>
              columns={columns}
              dataSource={mockData}
              size="small"
              pagination={false}
              rowKey="id"
            />
          </Card>
        </Col>
      </Row>

      <Modal
        title={selectedDebt ? '编辑借贷' : '新增借贷'}
        open={detailVisible}
        onCancel={() => setDetailVisible(false)}
        footer={null}
        width={700}
      >
        <DebtForm
          initialValues={selectedDebt || undefined}
          onSubmit={(values) => {
            message.success(`${selectedDebt ? '编辑' : '新增'}成功`);
            setDetailVisible(false);
          }}
          onCancel={() => setDetailVisible(false)}
        />
      </Modal>
    </div>
  );
} 