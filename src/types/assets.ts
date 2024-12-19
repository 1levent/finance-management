export type AccountType = 'savings' | 'checking' | 'deposit';
export type AccountStatus = 'active' | 'inactive';
export type CreditCardStatus = 'normal' | 'overdue' | 'frozen';
export type CreditCardType = 'visa' | 'mastercard' | 'unionpay';
export type WalletType = 'alipay' | 'wechat' | 'other';
export type WalletStatus = 'active' | 'inactive';

export interface IBankAccount {
  id: string;
  bankName: string;
  accountType: AccountType;
  accountNumber: string;
  balance: number;
  status: AccountStatus;
  lastTransaction: string;
}

export interface ICreditCard {
  id: string;
  bankName: string;
  cardType: CreditCardType;
  cardNumber: string;
  cardHolder: string;
  creditLimit: number;
  availableCredit: number;
  billDate: number;
  dueDate: number;
  status: CreditCardStatus;
  currentBill: number;
}

export interface IEWallet {
  id: string;
  name: string;
  type: WalletType;
  accountId: string;
  balance: number;
  status: WalletStatus;
  lastTransaction: string;
  dailyLimit: number;
  monthlyLimit: number;
} 