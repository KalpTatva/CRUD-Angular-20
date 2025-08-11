export interface AuthResult {
  subscribe(arg0: (res: any) => void): void;
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface LoginRequest {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface RefreshRequest {
  accessToken: string;
  refreshToken: string;
}