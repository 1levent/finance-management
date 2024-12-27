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

// 模拟注册响应
const mockRegisterResponse = (data: { username: string; email: string; password: string }): Promise<IAuthResponse> => {
  // 模拟注册延迟
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        user: {
          id: Math.random().toString(36).substr(2, 9), // 生成随机ID
          email: data.email,
          username: data.username,
        },
        token: `mock-jwt-token-${Date.now()}`, // 生成唯一token
        timestamp: new Date().toISOString(),
      });
    }, 800); // 模拟网络延迟
  });
};

export const authService = {
  // 账号密码登录
  login: async (params: { account: string; password: string }): Promise<IAuthResponse> => {
    // TODO: 实际API调用
    return Promise.resolve({
      user: {
        id: '1',
        email: params.account,
        username: 'Admin',
      },
      token: 'mock-jwt-token',
      timestamp: '2024-03-14T00:00:00.000Z',
    });
  },

  // 手机验证码登录
  mobileLogin: async (params: { mobile: string; verifyCode: string }): Promise<IAuthResponse> => {
    // TODO: 实际API调用
    return Promise.resolve({
      user: {
        id: '1',
        email: '',
        username: 'User',
      },
      token: 'mock-jwt-token',
      timestamp: '2024-03-14T00:00:00.000Z',
    });
  },

  // 发送验证码
  sendVerifyCode: async (mobile: string): Promise<void> => {
    // TODO: 实际API调用
    return Promise.resolve();
  },

  // 微信扫码登录状态查询
  checkWechatLoginStatus: async (ticket: string): Promise<{
    status: 'waiting' | 'scanning' | 'confirmed' | 'expired';
    token?: string;
  }> => {
    // TODO: 实际API调用
    return Promise.resolve({
      status: 'waiting',
    });
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

  register: async (data: { username: string; email: string; password: string }) => {
    // 这里替换为实际的 API 调用
    return mockRegisterResponse(data);
  },
}; 