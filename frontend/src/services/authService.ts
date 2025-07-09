import axios from 'axios';
import type { LoginResponse } from '../types/auth';

const API_BASE_URL = 'http://localhost:8080/api';

// axios 인스턴스 생성
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터: 토큰 자동 첨부
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터: 401 에러 시 토큰 삭제
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export interface LoginRequest {
  username: string;
  password: string;
}

export const authService = {
  // 로그인
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await apiClient.post('/auth/login', credentials);
    const { token, username, role } = response.data;
    
    // 토큰을 localStorage에 저장
    localStorage.setItem('token', token);
    localStorage.setItem('username', username);
    localStorage.setItem('role', role);
    
    return response.data;
  },

  // 로그아웃
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
  },

  // 현재 토큰 가져오기
  getToken(): string | null {
    return localStorage.getItem('token');
  },

  // 현재 사용자 정보 가져오기
  getCurrentUser(): { username: string; role: string } | null {
    const username = localStorage.getItem('username');
    const role = localStorage.getItem('role');
    
    if (username && role) {
      return { username, role };
    }
    return null;
  },

  // 로그인 상태 확인
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  },

  // API 클라이언트 내보내기 (다른 서비스에서 사용)
  apiClient,
};

export default authService; 