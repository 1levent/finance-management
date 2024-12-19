'use client';

import { Suspense } from 'react';
import RecurringList from '@/components/features/income-expense/recurring/RecurringList';
import LoadingScreen from '@/components/common/LoadingScreen';

export default function RecurringPage() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <RecurringList />
    </Suspense>
  );
} 