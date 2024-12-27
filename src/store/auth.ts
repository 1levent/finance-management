import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { IAuthResponse, IAuthState } from '@/types/auth';

interface IAuthStore extends IAuthState {
  setUser: (user: IAuthState['user']) => void;
  setToken: (token: string | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  login: (response: IAuthResponse) => void;
  logout: () => void;
}

export const useAuthStore = create<IAuthStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      loading: false,
      error: null,
      setUser: (user) => set({ user }),
      setToken: (token) => set({ token }),
      setLoading: (loading) => set({ loading }),
      setError: (error) => set({ error }),
      login: (response) => {
        console.log('Auth Store: 开始更新状态...');
        set({
          user: response.user,
          token: response.token,
          loading: false,
          error: null,
        });
        console.log('Auth Store: 状态更新完成');
        
        // 在本地存储中也保存 token
        localStorage.setItem('token', response.token);
        console.log('Auth Store: Token已保存到localStorage');
      },
      logout: () => {
        set({
          user: null,
          token: null,
          loading: false,
          error: null,
        });
        localStorage.removeItem('token');
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
      }),
    }
  )
); 