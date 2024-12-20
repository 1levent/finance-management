export type ReminderType = 'payment' | 'overdue' | 'expiration';
export type ReminderStatus = 'pending' | 'sent' | 'read';
export type ReminderPriority = 'high' | 'medium' | 'low';

export interface IReminder {
  id: string;
  type: ReminderType;
  title: string;
  content: string;
  debtId?: string;
  debtName?: string;
  amount?: number;
  dueDate: string;
  priority: ReminderPriority;
  status: ReminderStatus;
  createdAt: string;
}

export interface IReminderSetting {
  id: string;
  debtId: string;
  debtName: string;
  enabled: boolean;
  advanceDays: number;
  notifyTime: string;
  notifyMethods: ('email' | 'sms' | 'push')[];
} 