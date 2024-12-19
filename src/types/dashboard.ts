export interface IOverviewData {
  totalAssets: number;
  totalIncome: number;
  totalExpense: number;
  monthlyBudget: number;
  budgetUsage: number;
}

export interface ITrendData {
  date: string;
  income: number;
  expense: number;
}

export interface IAssetData {
  type: string;
  value: number;
  percent: number;
}

export type TransactionType = 'income' | 'expense';

export interface ITransactionItem {
  id: string;
  type: TransactionType;
  amount: number;
  category: string;
  description: string;
  date: string;
} 