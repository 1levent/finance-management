'use client';

import { useState } from 'react';
import { Layout } from 'antd';
import type { ReactElement } from 'react';
import Header from '../Header';
import Sidebar from '../Sidebar';

const { Content, Sider } = Layout;

interface IMainLayoutProps {
  children: ReactElement & {
    title?: string;
  };
}

const MainLayout: React.FC<IMainLayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  const handleToggle = () => {
    setCollapsed(prev => !prev);
  };

  const getPageTitle = () => {
    return (children as any)?.title || '';
  };

  return (
    <Layout className="min-h-screen">
      <Sider 
        trigger={null} 
        collapsible 
        collapsed={collapsed}
        className="fixed left-0 top-0 bottom-0 bg-white shadow-sm z-10"
        width={256}
      >
        <Sidebar collapsed={collapsed} />
      </Sider>
      <Layout style={{ marginLeft: collapsed ? 80 : 256, transition: 'all 0.2s' }}>
        <Header 
          collapsed={collapsed} 
          onToggle={handleToggle} 
        />
        <Content 
          className="p-6 bg-gray-50"
          style={{ 
            minHeight: 'calc(100vh - 64px)',
            marginTop: 64,
          }}
        >
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {getPageTitle() && (
              <div className="px-6 py-4 border-b bg-gray-50">
                <h1 className="text-xl font-medium text-center text-gray-800">
                  {getPageTitle()}
                </h1>
              </div>
            )}
            <div className="p-6">
              {children}
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout; 