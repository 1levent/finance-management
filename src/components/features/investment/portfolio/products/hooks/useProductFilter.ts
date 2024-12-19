'use client';

import { useState, useMemo } from 'react';
import type { Product } from '@/types/investment';

interface IFilterParams {
  keyword?: string;
  type?: string;
  status?: string;
}

export function useProductFilter(products: Product[]) {
  const [filters, setFilters] = useState<IFilterParams>({});

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // 关键词搜索
      if (filters.keyword) {
        const keyword = filters.keyword.toLowerCase();
        const matchName = product.name.toLowerCase().includes(keyword);
        const matchCode = product.code?.toLowerCase().includes(keyword);
        if (!matchName && !matchCode) return false;
      }

      // 类型筛选
      if (filters.type && product.type !== filters.type) {
        return false;
      }

      // 状态筛选
      if (filters.status && product.status !== filters.status) {
        return false;
      }

      return true;
    });
  }, [products, filters]);

  return {
    filters,
    setFilters,
    filteredProducts,
  };
} 