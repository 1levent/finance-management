import { ReactElement } from 'react';

export interface IMainLayoutProps {
  children: ReactElement;
}

export interface IHeaderProps {
  collapsed: boolean;
  onToggle: () => void;
}

export interface ISidebarProps {
  collapsed: boolean;
} 