'use client';

import { Dropdown, Avatar } from 'antd';
import type { MenuProps } from 'antd';
import { UserOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth';

export default function UserDropdown() {
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

  const items: MenuProps['items'] = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: '个人信息',
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: '系统设置',
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
      danger: true,
    },
  ];

  return (
    <Dropdown menu={{ items, onClick: handleMenuClick }} placement="bottomRight" arrow>
      <Avatar 
        style={{ 
          backgroundColor: '#1677ff',
          cursor: 'pointer',
        }}
      >
        用
      </Avatar>
    </Dropdown>
  );
} 