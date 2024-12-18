import { api } from '@/services/api-client';
import type { ILoginParams, IAuthResponse } from '@/types/auth';

// 使用固定的时间戳
const MOCK_TIMESTAMP = '2024-03-14T00:00:00.000Z';

// 模拟管理员用户
const MOCK_ADMIN = {
  user: {
    id: '1',
    username: 'admin',
    email: 'admin@example.com',
    role: 'admin' as const,
    avatar: '',
    createdAt: MOCK_TIMESTAMP,
    updatedAt: MOCK_TIMESTAMP,
  },
  token: 'mock-admin-token',
};

export const authService = {
  login: async (params: ILoginParams): Promise<IAuthResponse> => {
    // 模拟登录验证
    if (params.email === 'admin@example.com' && params.password === 'admin123') {
      return Promise.resolve(MOCK_ADMIN);
    }
    return Promise.reject(new Error('邮箱或密码错误'));
  },

  logout: async (): Promise<void> => {
    // 模拟登出
    return Promise.resolve();
  },

  getCurrentUser: async (): Promise<IAuthResponse> => {
    // 模拟获取当前用户
    if (typeof window === 'undefined') {
      return Promise.reject(new Error('服务端不支持此操作'));
    }

    const token = localStorage.getItem('auth-storage')
      ? JSON.parse(localStorage.getItem('auth-storage')!).state.token
      : null;

    if (token === MOCK_ADMIN.token) {
      return Promise.resolve(MOCK_ADMIN);
    }
    return Promise.reject(new Error('未登录或登录已过期'));
  },
}; 