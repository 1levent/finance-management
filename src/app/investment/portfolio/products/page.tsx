'use client';

import { Card } from 'antd';
import ProductManagement from '@/components/features/investment/portfolio/products/ProductManagement';

export default function ProductsPage() {
  return (
    <div className="space-y-4">
      <Card>
        <ProductManagement />
      </Card>
    </div>
  );
} 