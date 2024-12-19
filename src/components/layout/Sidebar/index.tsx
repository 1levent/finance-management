'use client';

import { Layout, Menu } from 'antd';
import { usePathname, useRouter } from 'next/navigation';
import { useMemo } from 'react';
import { menuItems } from '@/config/menu';
import type { MenuProps } from 'antd';

const { Sider } = Layout;

interface ISidebarProps {
  collapsed: boolean;
}

type MenuItem = NonNullable<Required<MenuProps>['items'][number]>;

export default function Sidebar({ collapsed }: ISidebarProps) {
  const router = useRouter();
  const pathname = usePathname();

  const selectedKeys = useMemo(() => {
    return [pathname];
  }, [pathname]);

  const defaultOpenKeys = useMemo(() => {
    const isSubMenu = (item: MenuItem | null): item is MenuItem & { children: MenuItem[] } => {
      return item !== null && typeof item === 'object' && 'children' in item;
    };

    return menuItems
      .filter(isSubMenu)
      .filter(item => {
        const children = Array.isArray(item.children) ? item.children : [];
        return children.some((child: MenuItem) => 
          child && 
          typeof child === 'object' && 
          'key' in child && 
          typeof child.key === 'string' && 
          pathname.startsWith(child.key)
        );
      })
      .map(item => item.key?.toString() || '');
  }, [pathname]);

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      className="fixed left-0 top-0 bottom-0 h-screen bg-white"
      theme="light"
      width={250}
    >
      <style jsx global>{`
        .ant-menu-root {
          height: calc(100vh - 4rem) !important;
          overflow-y: auto !important;
          overflow-x: hidden !important;
          width: calc(100% + 6px) !important;
          padding-right: 6px !important;
          margin-right: -6px !important;
        }
        .ant-menu {
          border-inline-end: none !important;
        }
        .ant-menu-root::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        .ant-menu-root::-webkit-scrollbar-thumb {
          background: #d9d9d9;
          border-radius: 3px;
        }
        .ant-menu-root::-webkit-scrollbar-track {
          background: transparent;
        }
      `}</style>
      <div className="flex flex-col h-full">
        <div className="h-16 flex items-center justify-center border-b border-gray-100">
          <span className="text-lg font-medium">
            {collapsed ? 'FM' : 'Finance Management'}
          </span>
        </div>
        <Menu
          mode="inline"
          selectedKeys={selectedKeys}
          defaultOpenKeys={defaultOpenKeys}
          items={menuItems}
          onClick={({ key }) => router.push(key)}
        />
      </div>
    </Sider>
  );
} 