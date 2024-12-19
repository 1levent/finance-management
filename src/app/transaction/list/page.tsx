'use client';

import { Suspense, lazy } from 'react';
import LoadingScreen from '@/components/common/LoadingScreen';

const TransactionList = lazy(() => import('@/components/features/income-expense/list/TransactionList'));

export default function TransactionListPage() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <TransactionList />
    </Suspense>
  );
} 