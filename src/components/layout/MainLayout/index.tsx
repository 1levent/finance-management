'use client';

import { useState } from 'react';
import { Layout } from 'antd';
import { ILayoutProps } from '@/types/layout';
import Header from '../Header';
import Sidebar from '../Sidebar';

const { Content, Sider } = Layout;

const MainLayout: React.FC<ILayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  const handleToggle = () => {
    setCollapsed(prev => !prev);
  };

  return (
    <Layout className="min-h-screen">
      <Sider 
        trigger={null} 
        collapsible 
        collapsed={collapsed}
        className="bg-white"
        width={256}
      >
        <Sidebar collapsed={collapsed} />
      </Sider>
      <Layout>
        <Header 
          collapsed={collapsed} 
          onToggle={handleToggle} 
        />
        <Content className="m-6 p-6 bg-white rounded-lg">
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout; 