'use client';

import React from 'react';
import type { MenuProps } from 'antd';
import * as Icons from '@ant-design/icons';

type TMenuItem = Required<MenuProps>['items'][number];

interface IMenuItem {
  key: string;
  icon?: React.ComponentType;
  label: string;
  path?: string;
  children?: IMenuItem[];
}

const convertToAntdMenuItem = (items: IMenuItem[]): TMenuItem[] => {
  return items.map(item => ({
    key: item.key,
    icon: item.icon && React.createElement(item.icon),
    label: item.label,
    children: item.children ? convertToAntdMenuItem(item.children) : undefined,
  }));
};

export const menuConfig: IMenuItem[] = [
  {
    key: '/dashboard',
    icon: Icons.DashboardOutlined,
    label: '仪表盘',
    path: '/dashboard',
  },
  {
    key: '/transaction',
    icon: Icons.TransactionOutlined,
    label: '收支管理',
    children: [
      {
        key: '/transaction/list',
        label: '收支记录',
        path: '/transaction/list',
      },
      {
        key: '/transaction/category',
        label: '分类管理',
        path: '/transaction/category',
      },
      {
        key: '/transaction/recurring',
        label: '定期收支',
        path: '/transaction/recurring',
      },
    ],
  },
  {
    key: '/investment',
    icon: Icons.StockOutlined,
    label: '理财管理',
    children: [
      {
        key: '/investment/portfolio',
        label: '投资组合',
        children: [
          {
            key: '/investment/portfolio/overview',
            label: '资产配置',
            path: '/investment/portfolio/overview',
          },
          {
            key: '/investment/portfolio/products',
            label: '产品管理',
            path: '/investment/portfolio/products',
          },
        ],
      },
      {
        key: '/investment/transactions',
        label: '交易记录',
        children: [
          {
            key: '/investment/transactions/trades',
            label: '买卖记录',
            path: '/investment/transactions/trades',
          },
          {
            key: '/investment/transactions/dividends',
            label: '分红记录',
            path: '/investment/transactions/dividends',
          },
        ],
      },
      {
        key: '/investment/analysis',
        label: '收益分析',
        path: '/investment/analysis',
      },
      {
        key: '/investment/risk',
        label: '风险监控',
        children: [
          {
            key: '/investment/risk/assessment',
            label: '风险评估',
            path: '/investment/risk/assessment',
          },
          {
            key: '/investment/risk/alerts',
            label: '止损预警',
            path: '/investment/risk/alerts',
          },
          {
            key: '/investment/risk/market',
            label: '市场监控',
            path: '/investment/risk/market',
          },
        ],
      },
      {
        key: '/investment/goals',
        label: '投资目标',
        path: '/investment/goals',
      },
    ],
  },
  {
    key: 'assets',
    icon: Icons.WalletOutlined,
    label: '资产管理',
    children: [
      {
        key: '/assets/accounts',
        label: '账户管理',
        children: [
          {
            key: '/assets/accounts/bank',
            label: '银行账户',
            path: '/assets/accounts/bank',
          },
          {
            key: '/assets/accounts/credit',
            label: '信用卡',
            path: '/assets/accounts/credit',
          },
          {
            key: '/assets/accounts/ewallet',
            label: '电子钱包',
            path: '/assets/accounts/ewallet',
          },
        ],
      },
      {
        key: '/assets/debt',
        label: '债务管理',
        children: [
          {
            key: '/assets/debt/loans',
            label: '借贷记录',
            path: '/assets/debt/loans',
          },
          {
            key: '/assets/debt/repayment',
            label: '还款计划',
            path: '/assets/debt/repayment',
          },
        ],
      },
      {
        key: '/assets/tools',
        label: '工具',
        children: [
          {
            key: '/assets/tools/calculator',
            label: '利息计算器',
            path: '/assets/tools/calculator',
          },
          {
            key: '/assets/tools/reminder',
            label: '债务提醒',
            path: '/assets/tools/reminder',
          },
        ],
      },
    ],
  },
  {
    key: '/budget',
    label: '预算管理',
    icon: Icons.AccountBookOutlined,
    children: [
      {
        key: '/budget/overview',
        label: '预算概览',
        path: '/budget/overview',
      },
      {
        key: '/budget/settings',
        label: '预算设置',
        path: '/budget/settings',
      },
      {
        key: '/budget/tracking',
        label: '预算跟踪',
        path: '/budget/tracking',
      },
      {
        key: '/budget/analysis',
        label: '预算分析',
        path: '/budget/analysis',
      },
    ],
  },
  {
    key: '/report',
    icon: Icons.BarChartOutlined,
    label: '统计报表',
    children: [
      {
        key: '/report/transaction',
        label: '收支报表',
        path: '/report/transaction',
      },
      {
        key: '/report/asset',
        label: '资产报表',
        path: '/report/asset',
      },
      {
        key: '/report/investment',
        label: '投资报表',
        path: '/report/investment',
      },
    ],
  },
  {
    key: '/goal',
    icon: Icons.AimOutlined,
    label: '目标规划',
    path: '/goal',
  },
  {
    key: '/family',
    icon: Icons.TeamOutlined,
    label: '家庭账本',
    path: '/family',
  },
  {
    key: '/notification',
    icon: Icons.BellOutlined,
    label: '消息通知',
    path: '/notification',
  },
  {
    key: '/setting',
    icon: Icons.SettingOutlined,
    label: '系统设置',
    children: [
      {
        key: '/setting/profile',
        label: '个人信息',
        path: '/setting/profile',
      },
      {
        key: '/setting/security',
        label: '安全设置',
        path: '/setting/security',
      },
      {
        key: '/setting/preference',
        label: '偏好设置',
        path: '/setting/preference',
      },
    ],
  },
];

export const menuItems = convertToAntdMenuItem(menuConfig); 