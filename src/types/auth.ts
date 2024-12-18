export interface IUser {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'user';
  createdAt: string;
  updatedAt: string;
}

export interface IAuthState {
  user: IUser | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
}

export interface ILoginParams {
  email: string;
  password: string;
  remember?: boolean;
}

export interface IAuthResponse {
  user: IUser;
  token: string;
} 