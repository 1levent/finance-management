'use client';

import { Menu } from 'antd';
import { useRouter, usePathname } from 'next/navigation';
import { ISidebarProps } from '@/types/layout';
import { menuItems } from '@/config/menu';

const Sidebar: React.FC<ISidebarProps> = ({ collapsed }) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleMenuClick = ({ key }: { key: string }) => {
    router.push(key);
  };

  return (
    <div className="h-full bg-white">
      <div className="h-16 flex items-center justify-center">
        <h1 className={`text-xl font-bold transition-all duration-300 ${
          collapsed ? 'scale-0' : 'scale-100'
        }`}>
          财务管理系统
        </h1>
      </div>
      <Menu
        mode="inline"
        selectedKeys={[pathname]}
        items={menuItems}
        onClick={handleMenuClick}
        className="border-r-0"
      />
    </div>
  );
};

export default Sidebar; 