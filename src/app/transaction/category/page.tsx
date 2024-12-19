'use client';

import { Suspense } from 'react';
import CategoryList from '@/components/features/income-expense/category/CategoryList';
import LoadingScreen from '@/components/common/LoadingScreen';

export default function CategoryPage() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <CategoryList />
    </Suspense>
  );
} 