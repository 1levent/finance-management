export type TransactionType = 'income' | 'expense';
export type TransactionStatus = 'completed' | 'pending' | 'cancelled';
export type RecurringPeriod = 'daily' | 'weekly' | 'monthly' | 'yearly';

export interface ICategory {
  id: string;
  name: string;
  type: TransactionType;
  icon?: string;
  parentId?: string;
  order?: number;
}

export interface ITransaction {
  id: string;
  type: TransactionType;
  amount: number;
  categoryId: string;
  date: string;
  description?: string;
  status: TransactionStatus;
  tags?: string[];
  attachments?: {
    uid: string;
    name: string;
    url: string;
    type: string;
    size: number;
  }[];
  currency: string;
  exchangeRate?: number;
  location?: string;
  createdAt: string;
  updatedAt: string;
}

export interface IRecurringTransaction {
  id: string;
  type: TransactionType;
  amount: number;
  categoryId: string;
  description?: string;
  period: RecurringPeriod;
  startDate: string;
  endDate?: string;
  lastExecuted?: string;
  nextExecution?: string;
  status: 'active' | 'paused' | 'completed';
}

export interface IFilterValues {
  keyword?: string;
  dateRange?: [string, string];
  type?: 'all' | 'income' | 'expense';
  status?: 'all' | 'completed' | 'pending' | 'cancelled';
  categoryIds?: string[];
  minAmount?: number;
  maxAmount?: number;
} 