import { create } from 'zustand';
import type { ITransaction, ICategory, IRecurringTransaction } from '@/types/transaction';

interface ITransactionState {
  // 交易记录
  transactions: ITransaction[];
  loading: boolean;
  error: string | null;
  setTransactions: (transactions: ITransaction[]) => void;
  addTransaction: (transaction: ITransaction) => void;
  updateTransaction: (id: string, transaction: Partial<ITransaction>) => void;
  deleteTransaction: (id: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;

  // 分类管理
  categories: ICategory[];
  categoriesLoading: boolean;
  categoriesError: string | null;
  setCategories: (categories: ICategory[]) => void;
  addCategory: (category: ICategory) => void;
  updateCategory: (id: string, category: Partial<ICategory>) => void;
  deleteCategory: (id: string) => void;
  setCategoriesLoading: (loading: boolean) => void;
  setCategoriesError: (error: string | null) => void;

  // 定期交易
  recurringTransactions: IRecurringTransaction[];
  recurringLoading: boolean;
  recurringError: string | null;
  setRecurringTransactions: (transactions: IRecurringTransaction[]) => void;
  addRecurringTransaction: (transaction: IRecurringTransaction) => void;
  updateRecurringTransaction: (id: string, transaction: Partial<IRecurringTransaction>) => void;
  deleteRecurringTransaction: (id: string) => void;
  setRecurringLoading: (loading: boolean) => void;
  setRecurringError: (error: string | null) => void;
}

export const useTransactionStore = create<ITransactionState>((set) => ({
  // 交易记录状态和方法
  transactions: [],
  loading: false,
  error: null,
  setTransactions: (transactions) => set({ transactions }),
  addTransaction: (transaction) => 
    set((state) => ({ transactions: [...state.transactions, transaction] })),
  updateTransaction: (id, transaction) =>
    set((state) => ({
      transactions: state.transactions.map((t) =>
        t.id === id ? { ...t, ...transaction } : t
      ),
    })),
  deleteTransaction: (id) =>
    set((state) => ({
      transactions: state.transactions.filter((t) => t.id !== id),
    })),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),

  // 分类管理状态和方法
  categories: [],
  categoriesLoading: false,
  categoriesError: null,
  setCategories: (categories) => set({ categories }),
  addCategory: (category) =>
    set((state) => ({ categories: [...state.categories, category] })),
  updateCategory: (id, category) =>
    set((state) => ({
      categories: state.categories.map((c) =>
        c.id === id ? { ...c, ...category } : c
      ),
    })),
  deleteCategory: (id) =>
    set((state) => ({
      categories: state.categories.filter((c) => c.id !== id),
    })),
  setCategoriesLoading: (loading) => set({ categoriesLoading: loading }),
  setCategoriesError: (error) => set({ categoriesError: error }),

  // 定期交易状态和方法
  recurringTransactions: [],
  recurringLoading: false,
  recurringError: null,
  setRecurringTransactions: (transactions) => set({ recurringTransactions: transactions }),
  addRecurringTransaction: (transaction) =>
    set((state) => ({
      recurringTransactions: [...state.recurringTransactions, transaction],
    })),
  updateRecurringTransaction: (id, transaction) =>
    set((state) => ({
      recurringTransactions: state.recurringTransactions.map((t) =>
        t.id === id ? { ...t, ...transaction } : t
      ),
    })),
  deleteRecurringTransaction: (id) =>
    set((state) => ({
      recurringTransactions: state.recurringTransactions.filter((t) => t.id !== id),
    })),
  setRecurringLoading: (loading) => set({ recurringLoading: loading }),
  setRecurringError: (error) => set({ recurringError: error }),
})); 