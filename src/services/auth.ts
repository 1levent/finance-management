import { api } from '@/services/api-client';
import type { ILoginParams, IAuthResponse, IRegisterParams } from '@/types/auth';

// 使用固定的时间戳
const MOCK_TIMESTAMP = '2024-03-14T00:00:00.000Z';

// 模拟管理员用户
const MOCK_ADMIN: IAuthResponse = {
  user: {
    id: '1',
    email: 'admin@example.com',
    username: 'Admin',
  },
  token: 'mock-jwt-token',
  timestamp: MOCK_TIMESTAMP,
};

export const authService = {
  login: async (params: ILoginParams): Promise<IAuthResponse> => {
    // 模拟登录延迟
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // 模拟登录验证
    if (params.email === 'admin@example.com' && params.password === 'admin123') {
      return Promise.resolve(MOCK_ADMIN);
    }
    return Promise.reject(new Error('邮箱或密码错误'));
  },

  getCurrentUser: async (): Promise<IAuthResponse> => {
    const token = localStorage.getItem('auth-storage')
      ? JSON.parse(localStorage.getItem('auth-storage')!).state.token
      : null;

    if (token === MOCK_ADMIN.token) {
      return Promise.resolve(MOCK_ADMIN);
    }
    return Promise.reject(new Error('未登录或登录已过期'));
  },

  register: async (params: IRegisterParams): Promise<IAuthResponse> => {
    // 模拟注册延迟
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // 模拟注册成功
    const mockResponse: IAuthResponse = {
      user: {
        id: '2', // 新用户 ID
        email: params.email,
        username: params.username,
      },
      token: 'mock-jwt-token-new-user',
      timestamp: MOCK_TIMESTAMP,
    };

    return Promise.resolve(mockResponse);
  },
}; 