export type MemberRole = 'owner' | 'admin' | 'member' | 'viewer';
export type MemberStatus = 'active' | 'inactive' | 'pending';
export type InviteStatus = 'pending' | 'accepted' | 'rejected' | 'expired';

export interface ISharedMember {
  id: string;
  userId: string;
  username: string;
  avatar?: string;
  role: MemberRole;
  status: MemberStatus;
  joinDate: string;
  lastActiveDate: string;
  contribution: number;  // 贡献金额
}

export interface ISharedInvite {
  id: string;
  inviterId: string;
  inviterName: string;
  email: string;
  role: MemberRole;
  status: InviteStatus;
  createdAt: string;
  expiredAt: string;
  acceptedAt?: string;
}

export interface ISharedAccount {
  id: string;
  name: string;
  balance: number;
  currency: string;
  description?: string;
  createdBy: string;
  createdAt: string;
  members: {
    userId: string;
    username: string;
    role: MemberRole;
  }[];
}

export interface ISharedTransaction {
  id: string;
  accountId: string;
  amount: number;
  type: 'expense' | 'income' | 'transfer';
  category: string;
  description: string;
  date: string;
  createdBy: string;
  createdAt: string;
  participants: {
    userId: string;
    username: string;
    share: number;  // 分摊金额
    paid: boolean;  // 是否已支付
  }[];
  attachments?: {
    id: string;
    name: string;
    url: string;
  }[];
}

export interface ISharedOverview {
  totalBalance: number;
  memberCount: number;
  accountCount: number;
  recentTransactions: ISharedTransaction[];
  memberContributions: {
    userId: string;
    username: string;
    amount: number;
    percentage: number;
  }[];
  categoryDistribution: {
    category: string;
    amount: number;
    percentage: number;
  }[];
  monthlyTrend: {
    month: string;
    income: number;
    expense: number;
  }[];
}

export interface ISharedPermission {
  id: string;
  name: string;
  description: string;
  actions: string[];  // 如：['read', 'write', 'delete']
}

export interface ISharedRole {
  id: string;
  name: string;
  description: string;
  permissions: string[];  // permission ids
  isSystem: boolean;  // 是否系统预设角色
  createdAt: string;
  updatedBy?: string;
  updatedAt?: string;
}

export interface IBudget {
  id: string;
  category: string;
  amount: number;
  spent: number;
  startDate: string;
  endDate: string;
  status: 'normal' | 'warning' | 'danger';
  members: {
    userId: string;
    username: string;
    amount: number;
  }[];
} 