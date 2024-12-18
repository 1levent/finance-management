export const siteConfig = {
  name: '财务管理系统',
  description: '个人财务管理系统',
  logo: {
    text: 'FM',
    colors: {
      primary: '#1677ff',
      gradient: {
        from: '#3b82f6',
        to: '#2563eb',
      },
    },
  },
  auth: {
    storageKey: 'auth-storage',
    tokenKey: 'token',
  },
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api',
    timeout: 10000,
  },
  menu: {
    defaultOpenKeys: ['dashboard'],
    defaultSelectedKeys: ['dashboard'],
  },
  theme: {
    colorPrimary: '#1677ff',
    borderRadius: 6,
  },
};

export type SiteConfig = typeof siteConfig; 