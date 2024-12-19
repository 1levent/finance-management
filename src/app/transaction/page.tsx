'use client';

import { Card, Row, Col } from 'antd';
import TransactionStats from '@/components/features/income-expense/shared/TransactionStats';
import RecentTransactions from '@/components/features/income-expense/shared/RecentTransactions';
import { useTransactionStore } from '@/store/transaction';

export default function TransactionPage() {
  const { transactions } = useTransactionStore();
  return (
    <div className="space-y-6">
      <Card>
        <TransactionStats transactions={transactions}/>
      </Card>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card 
            title="最近交易" 
            extra={<a href="/income-expense">查看全部</a>}
          >
            <RecentTransactions />
          </Card>
        </Col>
      </Row>
    </div>
  );
} 