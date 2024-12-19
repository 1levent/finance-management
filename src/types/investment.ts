export type ProductType = 'stock' | 'fund' | 'bond' | 'other';
export type InvestmentType = 'fixed_deposit' | 'stock' | 'fund' | 'bond';
export type InvestmentStatus = 'active' | 'completed' | 'cancelled';
export type RiskLevel = 'low' | 'medium' | 'high';

export interface IInvestment {
  id: string;
  name: string;
  type: InvestmentType;
  amount: number;
  rate: number;
  startDate: string;
  endDate?: string;
  status: InvestmentStatus;
  expectedReturn: number;
  actualReturn: number;
  risk: RiskLevel;
  currency: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

// 产品相关接口
export interface IProduct {
  id: string;
  type: ProductType;
  code?: string;
  name: string;
  status: 'holding' | 'watching';
  remarks?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IStockProduct extends IProduct {
  type: 'stock';
  market: 'SH' | 'SZ' | 'HK' | 'US';
  holdingAmount: number;
  costPrice: number;
  currentPrice: number;
}

export interface IFundProduct extends IProduct {
  type: 'fund';
  fundType: 'stock' | 'bond' | 'hybrid' | 'money' | 'other';
  holdingAmount: number;
  costNav: number;
  currentNav: number;
  purchaseFee?: number;
  redemptionFee?: number;
}

export interface IBondProduct extends IProduct {
  type: 'bond';
  bondType: 'treasury' | 'corporate' | 'convertible' | 'repo' | 'other';
  parValue: number;
  couponRate: number;
  maturityDate: string;
  holdingAmount: number;
  costPrice: number;
  currentPrice: number;
}

export interface IOtherProduct extends IProduct {
  type: 'other';
  investType: 'deposit' | 'insurance' | 'other';
  amount: number;
  startDate: string;
  endDate?: string;
  expectedReturn: number;
  actualReturn?: number;
}

export type Product = IStockProduct | IFundProduct | IBondProduct | IOtherProduct; 

export interface ITrade {
  id: string;
  date: string;
  type: 'buy' | 'sell';
  productId: string;
  productName: string;
  productType: 'stock' | 'fund' | 'bond' | 'other';
  amount: number;
  price: number;
  fee: number;
  total: number;
  remarks?: string;
}

export interface IDividend {
  id: string;
  date: string;
  productId: string;
  productName: string;
  productType: 'stock' | 'fund' | 'bond';
  dividendType: 'cash' | 'stock' | 'rights';
  amount: number;
  price?: number;
  shares?: number;
  tax?: number;
  remarks?: string;
} 