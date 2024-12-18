'use client';

import { Layout, Button, Avatar, Dropdown } from 'antd';
import type { MenuProps } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined } from '@ant-design/icons';
import { IHeaderProps } from '@/types/layout';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth';

const { Header: AntHeader } = Layout;

const Header: React.FC<IHeaderProps> = ({ collapsed, onToggle }) => {
  const router = useRouter();
  const { logout } = useAuthStore();

  const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
    switch (key) {
      case 'profile':
        router.push('/setting/profile');
        break;
      case 'settings':
        router.push('/setting');
        break;
      case 'logout':
        logout();
        router.replace('/login');
        break;
    }
  };

  const userMenuItems: MenuProps['items'] = [
    {
      key: 'profile',
      label: '个人信息',
    },
    {
      key: 'settings',
      label: '系统设置',
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      label: '退出登录',
      danger: true,
    },
  ];

  return (
    <AntHeader className="bg-white px-4 flex items-center justify-between">
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={onToggle}
        className="w-16 h-16"
      />
      <div className="flex items-center gap-4">
        <Dropdown menu={{ items: userMenuItems, onClick: handleMenuClick }} placement="bottomRight">
          <Avatar 
            icon={<UserOutlined />} 
            className="cursor-pointer"
            aria-label="用户菜单"
          />
        </Dropdown>
      </div>
    </AntHeader>
  );
};

export default Header; 