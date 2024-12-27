import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
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
      login: (response) => set({ 
        user: response.user,
        token: response.token,
        loading: false,
        error: null
      }),
      logout: () => set({ 
        user: null, 
        token: null,
        loading: false,
        error: null
      }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        token: state.token,
      }),
    }
  )
); 