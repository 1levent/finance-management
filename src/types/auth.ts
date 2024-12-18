export interface IUser {
  id: string;
  email: string;
  username: string;
}

export interface IAuthState {
  user: IUser | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

export interface ILoginParams {
  email: string;
  password: string;
}

export interface IAuthResponse {
  user: IUser;
  token: string;
  timestamp: string;
}

export interface IRegisterParams {
  username: string;
  email: string;
  password: string;
} 