import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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

export const useAuthStore = create<IAuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      loading: false,
      error: null,
      setUser: (user) => {
        console.log('Setting user:', user);
        set({ user });
      },
      setToken: (token) => {
        console.log('Setting token:', token);
        set({ token });
      },
      setLoading: (loading) => set({ loading }),
      setError: (error) => set({ error }),
      logout: () => {
        console.log('Logging out');
        set({ user: null, token: null, error: null });
        localStorage.removeItem('remember-credentials');
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
      }),
      storage: {
        getItem: (name) => {
          const str = localStorage.getItem(name);
          console.log('Getting from storage:', name, str);
          return str ? JSON.parse(str) : null;
        },
        setItem: (name, value) => {
          console.log('Setting to storage:', name, value);
          localStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: (name) => {
          console.log('Removing from storage:', name);
          localStorage.removeItem(name);
        },
      },
    }
  )
); 