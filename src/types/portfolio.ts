export type AssetType = 'stock' | 'fund' | 'bond' | 'deposit' | 'other';
export type AssetStatus = 'active' | 'closed';

export interface IAsset {
  id: string;
  name: string;
  type: AssetType;
  amount: number;
  cost: number;
  currentValue: number;
  profit: number;
  profitRate: number;
  status: AssetStatus;
  updateTime: string;
}

export interface IAssetDistribution {
  type: AssetType;
  amount: number;
  percentage: number;
}

export interface IPortfolioStats {
  totalAssets: number;
  totalProfit: number;
  profitRate: number;
  riskScore: number;
  assetDistribution: IAssetDistribution[];
} 