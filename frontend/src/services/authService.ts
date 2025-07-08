import api from './api';
import type { LoginCredentials, LoginResponse, User } from '../types/auth';

export const authService = {
  // 로그인
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    try {
      const response = await api.post<LoginResponse>('/auth/login', credentials);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || '로그인에 실패했습니다.');
    }
  },

  // 로그아웃
  async logout(): Promise<void> {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.error('로그아웃 에러:', error);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  },

  // 현재 사용자 정보 가져오기
  async getCurrentUser(): Promise<User> {
    try {
      const response = await api.get<User>('/auth/me');
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || '사용자 정보를 가져오는데 실패했습니다.');
    }
  },

  // 토큰 검증
  async validateToken(): Promise<boolean> {
    try {
      await api.get('/auth/validate');
      return true;
    } catch (error) {
      return false;
    }
  },

  // 로컬 스토리지에서 토큰 가져오기
  getToken(): string | null {
    return localStorage.getItem('token');
  },

  // 로컬 스토리지에서 사용자 정보 가져오기
  getUser(): User | null {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  // 토큰과 사용자 정보 저장
  setAuthData(token: string, user: User): void {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  },

  // 인증 데이터 제거
  clearAuthData(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
}; 