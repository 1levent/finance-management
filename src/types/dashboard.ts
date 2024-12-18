export interface IOverviewData {
  totalAssets: number;
  totalIncome: number;
  totalExpense: number;
  monthlyBudget: number;
  budgetUsage: number;
}

export interface ITransactionItem {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  category: string;
  description: string;
  date: string;
}

export interface IAssetDistribution {
  name: string;
  value: number;
  percent: number;
}

export interface ITrendData {
  date: string;
  income: number;
  expense: number;
} 