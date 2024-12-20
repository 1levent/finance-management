'use client';

import { Layout, Button, Avatar, Dropdown, Badge, Popover, List } from 'antd';
import type { MenuProps } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined, BellOutlined, SettingOutlined, LogoutOutlined, SafetyCertificateOutlined, CloudSyncOutlined } from '@ant-design/icons';
import { IHeaderProps } from '@/types/layout';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth';
import { useState } from 'react';

const { Header: AntHeader } = Layout;

interface INotification {
  id: string;
  title: string;
  description: string;
  time: string;
  read: boolean;
  type: 'system' | 'share' | 'budget' | 'transaction';
}

const mockNotifications: INotification[] = [
  {
    id: '1',
    title: '共享账本邀请',
    description: '张三邀请你加入"家庭账本"',
    time: '10分钟前',
    read: false,
    type: 'share'
  },
  {
    id: '2',
    title: '预算提醒',
    description: '本月餐饮预算已使用80%',
    time: '1小时前',
    read: false,
    type: 'budget'
  },
  {
    id: '3',
    title: '系统通知',
    description: '系统将于今晚22:00进行维护',
    time: '2小时前',
    read: true,
    type: 'system'
  }
];

const Header: React.FC<IHeaderProps> = ({ collapsed, onToggle }) => {
  const router = useRouter();
  const { logout } = useAuthStore();
  const [notifications, setNotifications] = useState<INotification[]>(mockNotifications);
  const unreadCount = notifications.filter(n => !n.read).length;

  const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
    switch (key) {
      case '/setting/profile':
        router.push('/setting/profile');
        break;
      case '/setting/security':
        router.push('/setting/security');
        break;
      case '/setting/preference':
        router.push('/setting/preference');
        break;
      case '/setting/backup':
        router.push('/setting/backup');
        break;
      case 'logout':
        logout();
        router.replace('/login');
        break;
    }
  };

  const handleReadAll = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const userMenuItems: MenuProps['items'] = [
    {
      key: '/setting/profile',
      icon: <UserOutlined />,
      label: '个人信息',
    },
    {
      key: '/setting/security',
      icon: <SafetyCertificateOutlined />,
      label: '安全设置',
    },
    {
      key: '/setting/preference',
      icon: <SettingOutlined />,
      label: '偏好设置',
    },
    {
      key: '/setting/backup',
      icon: <CloudSyncOutlined />,
      label: '数据备份',
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

  const notificationContent = (
    <div className="w-80">
      <div className="flex justify-between items-center mb-2 px-4 pt-2">
        <span className="font-medium">消息通知</span>
        <Button type="link" size="small" onClick={handleReadAll}>
          全部已读
        </Button>
      </div>
      <List
        itemLayout="horizontal"
        dataSource={notifications}
        renderItem={item => (
          <List.Item className={!item.read ? 'bg-blue-50' : ''}>
            <List.Item.Meta
              avatar={
                <Avatar 
                  style={{ 
                    backgroundColor: 
                      item.type === 'system' ? '#1677ff' :
                      item.type === 'share' ? '#52c41a' :
                      item.type === 'budget' ? '#faad14' : '#ff4d4f'
                  }}
                >
                  {item.type === 'system' ? '系' :
                   item.type === 'share' ? '共' :
                   item.type === 'budget' ? '预' : '账'}
                </Avatar>
              }
              title={item.title}
              description={
                <div className="flex flex-col">
                  <span>{item.description}</span>
                  <span className="text-xs text-gray-400">{item.time}</span>
                </div>
              }
            />
          </List.Item>
        )}
      />
    </div>
  );

  return (
    <AntHeader className="bg-white px-6 flex items-center justify-between fixed top-0 right-0 left-0 z-10 shadow-sm" style={{ 
      marginLeft: collapsed ? 80 : 256,
      transition: 'all 0.2s',
      width: 'auto' 
    }}>
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={onToggle}
        className="text-lg"
      />
      <div className="flex items-center gap-4">
        <Popover 
          content={notificationContent}
          trigger="click"
          placement="bottomRight"
          arrow={{ pointAtCenter: true }}
        >
          <Badge count={unreadCount} size="small">
            <Button type="text" icon={<BellOutlined />} />
          </Badge>
        </Popover>
        <Dropdown menu={{ items: userMenuItems, onClick: handleMenuClick }} placement="bottomRight">
          <Avatar 
            icon={<UserOutlined />} 
            className="cursor-pointer bg-primary"
            aria-label="用户菜单"
          />
        </Dropdown>
      </div>
    </AntHeader>
  );
};

export default Header; 