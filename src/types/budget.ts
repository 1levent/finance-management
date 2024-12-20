export type BudgetPeriod = 'monthly' | 'quarterly' | 'yearly';
export type BudgetStatus = 'normal' | 'warning' | 'exceeded';
export type BudgetCategory = 'income' | 'expense';

export interface IBudgetItem {
  id: string;
  categoryId: string;
  categoryName: string;
  type: BudgetCategory;
  amount: number;
  used: number;
  remaining: number;
  status: BudgetStatus;
  period: BudgetPeriod;
  startDate: string;
  endDate: string;
}

export interface IBudgetSetting {
  id: string;
  categoryId: string;
  categoryName: string;
  type: BudgetCategory;
  amount: number;
  period: BudgetPeriod;
  warningThreshold: number; // 预警阈值(百分比)
  rollover: boolean; // 是否结转
  enabled: boolean;
}

export interface IBudgetSummary {
  totalBudget: number;
  totalUsed: number;
  totalRemaining: number;
  progress: number;
  status: BudgetStatus;
  categoryStats: {
    categoryId: string;
    categoryName: string;
    budget: number;
    used: number;
    remaining: number;
    progress: number;
    status: BudgetStatus;
  }[];
}

export interface IBudgetAlert {
  id: string;
  categoryId: string;
  categoryName: string;
  type: 'warning' | 'exceeded';
  threshold: number;
  currentUsage: number;
  createdAt: string;
  read: boolean;
} 