import { ReactNode } from 'react';

export interface ILayoutProps {
  children: ReactNode;
}

export interface IHeaderProps {
  collapsed: boolean;
  onToggle: () => void;
}

export interface ISidebarProps {
  collapsed: boolean;
} 