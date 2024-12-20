'use client';

import { useState } from 'react';
import { Card, Form, InputNumber, Select, Button, Row, Col, Table, Space } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface ILoanCalculation {
  period: number;
  payment: number;
  principal: number;
  interest: number;
  remainingPrincipal: number;
}

interface ICalculatorForm {
  amount: number;
  rate: number;
  term: number;
  method: 'equal-principal' | 'equal-payment';
}

export default function CalculatorPage() {
  const [calculations, setCalculations] = useState<ILoanCalculation[]>([]);
  const [summary, setSummary] = useState<{
    totalPayment: number;
    totalInterest: number;
    monthlyPayment: number;
  } | null>(null);

  const [form] = Form.useForm();

  // 等额本息计算
  const calculateEqualPayment = (amount: number, rate: number, term: number) => {
    const monthlyRate = rate / 12;
    const monthlyPayment = amount * monthlyRate * Math.pow(1 + monthlyRate, term) 
                          / (Math.pow(1 + monthlyRate, term) - 1);
    
    let remainingPrincipal = amount;
    const results: ILoanCalculation[] = [];

    for (let i = 1; i <= term; i++) {
      const interest = remainingPrincipal * monthlyRate;
      const principal = monthlyPayment - interest;
      remainingPrincipal -= principal;

      results.push({
        period: i,
        payment: monthlyPayment,
        principal: principal,
        interest: interest,
        remainingPrincipal: Math.max(0, remainingPrincipal),
      });
    }

    const totalPayment = monthlyPayment * term;
    const totalInterest = totalPayment - amount;

    setSummary({
      totalPayment,
      totalInterest,
      monthlyPayment,
    });

    return results;
  };

  // 等额本金计算
  const calculateEqualPrincipal = (amount: number, rate: number, term: number) => {
    const monthlyRate = rate / 12;
    const monthlyPrincipal = amount / term;
    let remainingPrincipal = amount;
    const results: ILoanCalculation[] = [];
    let totalPayment = 0;

    for (let i = 1; i <= term; i++) {
      const interest = remainingPrincipal * monthlyRate;
      const payment = monthlyPrincipal + interest;
      remainingPrincipal -= monthlyPrincipal;

      totalPayment += payment;

      results.push({
        period: i,
        payment: payment,
        principal: monthlyPrincipal,
        interest: interest,
        remainingPrincipal: Math.max(0, remainingPrincipal),
      });
    }

    const totalInterest = totalPayment - amount;

    setSummary({
      totalPayment,
      totalInterest,
      monthlyPayment: results[0].payment,
    });

    return results;
  };

  const handleCalculate = (values: ICalculatorForm) => {
    const { amount, rate, term, method } = values;
    const annualRate = rate / 100;

    const results = method === 'equal-payment'
      ? calculateEqualPayment(amount, annualRate, term)
      : calculateEqualPrincipal(amount, annualRate, term);

    setCalculations(results);
  };

  const columns: ColumnsType<ILoanCalculation> = [
    {
      title: '期数',
      dataIndex: 'period',
      key: 'period',
      width: 80,
      align: 'center',
    },
    {
      title: '还款金额',
      dataIndex: 'payment',
      key: 'payment',
      width: 120,
      align: 'right',
      render: (val: number) => `¥${val.toFixed(2)}`,
    },
    {
      title: '本金',
      dataIndex: 'principal',
      key: 'principal',
      width: 120,
      align: 'right',
      render: (val: number) => `¥${val.toFixed(2)}`,
    },
    {
      title: '利息',
      dataIndex: 'interest',
      key: 'interest',
      width: 120,
      align: 'right',
      render: (val: number) => `¥${val.toFixed(2)}`,
    },
    {
      title: '剩余本金',
      dataIndex: 'remainingPrincipal',
      key: 'remainingPrincipal',
      width: 120,
      align: 'right',
      render: (val: number) => `¥${val.toFixed(2)}`,
    },
  ];

  return (
    <div className="p-4 space-y-4">
      <Card title="贷款计算器">
        <Form
          form={form}
          layout="vertical"
          onFinish={handleCalculate}
          initialValues={{
            method: 'equal-payment',
          }}
        >
          <Row gutter={16}>
            <Col span={6}>
              <Form.Item
                name="amount"
                label="贷款金额"
                rules={[
                  { required: true, message: '请输入贷款金额' },
                  { type: 'number', min: 0, message: '金额不能为负数' },
                ]}
              >
                <InputNumber
                  className="w-full"
                  prefix="¥"
                  placeholder="请输入贷款金额"
                  step={10000}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                name="rate"
                label="年利率"
                rules={[
                  { required: true, message: '请输入年利率' },
                  { type: 'number', min: 0, max: 100, message: '请输入0-100之间的利率' },
                ]}
              >
                <InputNumber
                  className="w-full"
                  min={0}
                  max={100}
                  precision={2}
                  step={0.01}
                  formatter={(value) => `${value}%`}
                  parser={(value) => value?.replace('%', '') as any}
                  placeholder="请输入年利率"
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                name="term"
                label="贷款期限(月)"
                rules={[
                  { required: true, message: '请输入贷款期限' },
                  { type: 'number', min: 1, message: '期限必须大于0' },
                ]}
              >
                <InputNumber
                  className="w-full"
                  placeholder="请输入贷款期限"
                  step={12}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                name="method"
                label="还款方式"
                rules={[{ required: true, message: '请选择还款方式' }]}
              >
                <Select
                  options={[
                    { label: '等额本息', value: 'equal-payment' },
                    { label: '等额本金', value: 'equal-principal' },
                  ]}
                />
              </Form.Item>
            </Col>
          </Row>
          <div className="flex justify-center">
            <Button type="primary" htmlType="submit">
              计算
            </Button>
          </div>
        </Form>
      </Card>

      {summary && (
        <Card size="small" className="bg-gray-50">
          <Row gutter={16} className="text-center">
            <Col span={8}>
              <div className="text-gray-500">总还款金额</div>
              <div className="text-lg font-medium text-blue-500">
                ¥{summary.totalPayment.toFixed(2)}
              </div>
            </Col>
            <Col span={8}>
              <div className="text-gray-500">总利息</div>
              <div className="text-lg font-medium text-orange-500">
                ¥{summary.totalInterest.toFixed(2)}
              </div>
            </Col>
            <Col span={8}>
              <div className="text-gray-500">首月还款</div>
              <div className="text-lg font-medium text-green-500">
                ¥{summary.monthlyPayment.toFixed(2)}
              </div>
            </Col>
          </Row>
        </Card>
      )}

      {calculations.length > 0 && (
        <Card title="还款计划">
          <Table
            columns={columns}
            dataSource={calculations}
            size="small"
            scroll={{ y: 400 }}
            pagination={false}
            rowKey="period"
          />
        </Card>
      )}
    </div>
  );
} 