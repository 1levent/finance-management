import { api } from '@/services/api-client';
import type { ITransaction, ICategory, IRecurringTransaction } from '@/types/transaction';

// 模拟延迟
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// 模拟数据
const mockCategories: ICategory[] = [
  { id: '1', name: '工资', type: 'income', order: 1 },
  { id: '2', name: '奖金', type: 'income', order: 2 },
  { id: '3', name: '餐饮', type: 'expense', order: 1 },
  { id: '4', name: '交通', type: 'expense', order: 2 },
  { id: '5', name: '购物', type: 'expense', order: 3 },
  { id: '6', name: '娱乐', type: 'expense', order: 4 },
];

const mockTransactions: ITransaction[] = [
  {
    id: '1',
    type: 'income',
    amount: 10000,
    categoryId: '1',
    date: '2024-03-15',
    description: '3月工资',
    status: 'completed',
    currency: 'CNY',
    createdAt: '2024-03-15T08:00:00Z',
    updatedAt: '2024-03-15T08:00:00Z',
  },
  {
    id: '2',
    type: 'expense',
    amount: 100,
    categoryId: '3',
    date: '2024-03-14',
    description: '午餐',
    status: 'completed',
    currency: 'CNY',
    createdAt: '2024-03-14T12:00:00Z',
    updatedAt: '2024-03-14T12:00:00Z',
  },
];

const mockRecurringTransactions: IRecurringTransaction[] = [
  {
    id: '1',
    type: 'expense',
    amount: 2000,
    categoryId: '3',
    description: '房租',
    period: 'monthly',
    startDate: '2024-01-01',
    status: 'active',
    nextExecution: '2024-04-01',
  },
];

export const transactionService = {
  // 分类管理
  getCategories: async () => {
    await delay(500);
    return mockCategories;
  },

  createCategory: async (category: Omit<ICategory, 'id'>) => {
    await delay(500);
    const newCategory = {
      ...category,
      id: Math.random().toString(36).substr(2, 9),
    };
    mockCategories.push(newCategory);
    return newCategory;
  },

  updateCategory: async (id: string, category: Partial<ICategory>) => {
    await delay(500);
    const index = mockCategories.findIndex(c => c.id === id);
    if (index === -1) throw new Error('分类不存在');
    mockCategories[index] = { ...mockCategories[index], ...category };
    return mockCategories[index];
  },

  deleteCategory: async (id: string) => {
    await delay(500);
    const index = mockCategories.findIndex(c => c.id === id);
    if (index === -1) throw new Error('分类不存在');
    mockCategories.splice(index, 1);
  },

  // 交易记录
  getTransactions: async () => {
    await delay(500);
    return mockTransactions;
  },

  createTransaction: async (transaction: Omit<ITransaction, 'id' | 'createdAt' | 'updatedAt'>) => {
    await delay(500);
    const newTransaction = {
      ...transaction,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    mockTransactions.push(newTransaction);
    return newTransaction;
  },

  updateTransaction: async (id: string, transaction: Partial<ITransaction>) => {
    await delay(500);
    const index = mockTransactions.findIndex(t => t.id === id);
    if (index === -1) throw new Error('交易记录不存在');
    mockTransactions[index] = {
      ...mockTransactions[index],
      ...transaction,
      updatedAt: new Date().toISOString(),
    };
    return mockTransactions[index];
  },

  deleteTransaction: async (id: string) => {
    await delay(500);
    const index = mockTransactions.findIndex(t => t.id === id);
    if (index === -1) throw new Error('交易记录不存在');
    mockTransactions.splice(index, 1);
  },

  // 定期交易
  getRecurringTransactions: async () => {
    await delay(500);
    return mockRecurringTransactions;
  },

  createRecurringTransaction: async (transaction: Omit<IRecurringTransaction, 'id'>) => {
    await delay(500);
    const newTransaction = {
      ...transaction,
      id: Math.random().toString(36).substr(2, 9),
    };
    mockRecurringTransactions.push(newTransaction);
    return newTransaction;
  },

  updateRecurringTransaction: async (id: string, transaction: Partial<IRecurringTransaction>) => {
    await delay(500);
    const index = mockRecurringTransactions.findIndex(t => t.id === id);
    if (index === -1) throw new Error('定期交易不存在');
    mockRecurringTransactions[index] = { ...mockRecurringTransactions[index], ...transaction };
    return mockRecurringTransactions[index];
  },

  deleteRecurringTransaction: async (id: string) => {
    await delay(500);
    const index = mockRecurringTransactions.findIndex(t => t.id === id);
    if (index === -1) throw new Error('定期交易不存在');
    mockRecurringTransactions.splice(index, 1);
  },
}; 