export type DebtType = 'loan' | 'mortgage' | 'credit' | 'other';
export type DebtStatus = 'active' | 'paid' | 'overdue';
export type RepaymentFrequency = 'monthly' | 'quarterly' | 'yearly' | 'once';

export interface IDebt {
  id: string;
  name: string;
  type: DebtType;
  amount: number;
  remainingAmount: number;
  interestRate: number;
  startDate: string;
  endDate: string;
  status: DebtStatus;
  lender: string;
  description?: string;
  repaymentFrequency: RepaymentFrequency;
  nextPaymentDate: string;
  nextPaymentAmount: number;
}

export interface IRepaymentPlan {
  id: string;
  debtId: string;
  debtName: string;
  paymentDate: string;
  paymentAmount: number;
  principal: number;
  interest: number;
  remainingAmount: number;
  status: 'pending' | 'paid' | 'overdue';
} 