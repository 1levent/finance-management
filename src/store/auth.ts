import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface IUser {
  id: string;
  email: string;
  username: string;
}

interface IAuthState {
  user: IUser | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  setUser: (user: IUser | null) => void;
  setToken: (token: string | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  logout: () => void;
}

// 创建混合存储
const hybridStorage = {
  getItem: (name: string) => {
    const value = localStorage.getItem(name);
    return value;
  },
  setItem: (name: string, value: string) => {
    localStorage.setItem(name, value);
    document.cookie = `${name}=${value};path=/;max-age=${7 * 24 * 60 * 60}`;
  },
  removeItem: (name: string) => {
    localStorage.removeItem(name);
    document.cookie = `${name}=;path=/;expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  },
};

export const useAuthStore = create<IAuthState>()(
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
      logout: () => {
        set({ user: null, token: null, error: null });
        localStorage.removeItem('remember-credentials');
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => hybridStorage),
      partialize: (state) => ({
        user: state.user,
        token: state.token,
      }),
    }
  )
); 