export type GoalStatus = 'pending' | 'in_progress' | 'completed' | 'overdue';
export type GoalPriority = 'high' | 'medium' | 'low';
export type GoalType = 'savings' | 'investment' | 'debt' | 'purchase' | 'other';

export interface IGoal {
  id: string;
  name: string;
  type: GoalType;
  targetAmount: number;
  currentAmount: number;
  startDate: string;
  endDate: string;
  status: GoalStatus;
  priority: GoalPriority;
  description?: string;
  milestones?: IMilestone[];
}

export interface IMilestone {
  id: string;
  goalId: string;
  name: string;
  targetAmount: number;
  targetDate: string;
  completed: boolean;
  completedDate?: string;
}

export interface ISavingsPlan {
  id: string;
  goalId: string;
  monthlyAmount: number;
  frequency: 'monthly' | 'weekly' | 'daily';
  autoDeduct: boolean;
  sourceAccountId?: string;
  sourceAccountName?: string;
  enabled: boolean;
}

export interface IGoalProgress {
  goalId: string;
  progress: number;
  remainingDays: number;
  expectedAmount: number;
  deviation: number;
  status: GoalStatus;
  recentTransactions: {
    date: string;
    amount: number;
    type: 'deposit' | 'withdraw';
  }[];
}

export interface IGoalAnalysis {
  goalId: string;
  completionRate: number;
  avgMonthlyAmount: number;
  bestMonth: {
    date: string;
    amount: number;
  };
  worstMonth: {
    date: string;
    amount: number;
  };
  monthlyTrend: {
    date: string;
    amount: number;
  }[];
  suggestions: string[];
} 