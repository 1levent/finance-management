'use client';

import { useState } from 'react';
import { Card, Row, Col, Button, Table, Tag, Space, Modal, App, DatePicker } from 'antd';
import { PlusOutlined, EditOutlined, CheckOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import type { IRepaymentPlan } from '@/types/debt';
import RepaymentStats from '@/components/features/assets/debt/RepaymentStats';
import RepaymentForm from '@/components/features/assets/debt/RepaymentForm';

const { RangePicker } = DatePicker;

// 模拟数据
const mockData: IRepaymentPlan[] = [
  {
    id: '1',
    debtId: '1',
    debtName: '房贷',
    paymentDate: '2024-04-01',
    paymentAmount: 4800,
    principal: 3500,
    interest: 1300,
    remainingAmount: 796500,
    status: 'pending',
  },
  {
    id: '2',
    debtId: '2',
    debtName: '消费贷',
    paymentDate: '2024-04-01',
    paymentAmount: 4500,
    principal: 4000,
    interest: 500,
    remainingAmount: 26000,
    status: 'pending',
  },
];

const statusLabels = {
  pending: { text: '待还款', color: 'warning' },
  paid: { text: '已还款', color: 'success' },
  overdue: { text: '已逾期', color: 'error' },
};

export default function RepaymentPage() {
  const { message, modal } = App.useApp();
  const [selectedPlan, setSelectedPlan] = useState<IRepaymentPlan | null>(null);
  const [formVisible, setFormVisible] = useState(false);

  const handleRepay = (record: IRepaymentPlan) => {
    modal.confirm({
      title: '确认还款',
      content: `确定要为${record.debtName}执行还款操作吗？`,
      onOk() {
        message.success('还款成功');
      },
    });
  };

  const handleEdit = (record: IRepaymentPlan) => {
    setSelectedPlan(record);
    setFormVisible(true);
  };

  const handleFormSubmit = (values: IRepaymentPlan) => {
    if (selectedPlan) {
      message.success('编辑成功');
    } else {
      message.success('新增成功');
    }
    setFormVisible(false);
    setSelectedPlan(null);
  };

  const columns: ColumnsType<IRepaymentPlan> = [
    {
      title: '借贷名称',
      dataIndex: 'debtName',
      key: 'debtName',
      width: 150,
    },
    {
      title: '还款日期',
      dataIndex: 'paymentDate',
      key: 'paymentDate',
      width: 120,
      sorter: (a, b) => a.paymentDate.localeCompare(b.paymentDate),
    },
    {
      title: '还款金额',
      dataIndex: 'paymentAmount',
      key: 'paymentAmount',
      width: 120,
      align: 'right',
      render: (val: number) => `¥${val.toLocaleString()}`,
    },
    {
      title: '本金',
      dataIndex: 'principal',
      key: 'principal',
      width: 120,
      align: 'right',
      render: (val: number) => `¥${val.toLocaleString()}`,
    },
    {
      title: '利息',
      dataIndex: 'interest',
      key: 'interest',
      width: 120,
      align: 'right',
      render: (val: number) => `¥${val.toLocaleString()}`,
    },
    {
      title: '剩余本金',
      dataIndex: 'remainingAmount',
      key: 'remainingAmount',
      width: 120,
      align: 'right',
      render: (val: number) => `¥${val.toLocaleString()}`,
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
          {record.status === 'pending' && (
            <Button
              type="link"
              size="small"
              icon={<CheckOutlined />}
              onClick={() => handleRepay(record)}
            >
              还款
            </Button>
          )}
          <Button
            type="link"
            size="small"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            编辑
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-4">
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <RepaymentStats
            totalPayment={9300}
            principal={7500}
            interest={1800}
            nextPaymentDate="2024-04-01"
          />
        </Col>

        <Col span={24}>
          <Card
            size="small"
            title="还款计划"
            extra={
              <Space>
                <RangePicker size="small" />
                <Button
                  type="primary"
                  size="small"
                  icon={<PlusOutlined />}
                  onClick={() => {
                    setSelectedPlan(null);
                    setFormVisible(true);
                  }}
                >
                  新增计划
                </Button>
              </Space>
            }
          >
            <Table<IRepaymentPlan>
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
        title={selectedPlan ? '编辑还款计划' : '新增还款计划'}
        open={formVisible}
        onCancel={() => {
          setFormVisible(false);
          setSelectedPlan(null);
        }}
        footer={null}
        width={700}
      >
        <RepaymentForm
          initialValues={selectedPlan || undefined}
          onSubmit={handleFormSubmit}
          onCancel={() => {
            setFormVisible(false);
            setSelectedPlan(null);
          }}
        />
      </Modal>
    </div>
  );
} 