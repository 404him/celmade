import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  Typography, 
  TextField, 
  Button, 
  Alert,
  Box,
  CircularProgress,
  InputAdornment,
  IconButton
} from '@mui/material';
import { 
  Visibility, 
  VisibilityOff, 
  LockOutlined,
  PersonOutline 
} from '@mui/icons-material';
import { authService } from '../services/authService';
import type { LoginCredentials } from '../types/auth';

// 유효성 검사 스키마
const loginSchema = yup.object({
  username: yup
    .string()
    .required('사용자명을 입력해주세요')
    .min(3, '사용자명은 최소 3자 이상이어야 합니다'),
  password: yup
    .string()
    .required('비밀번호를 입력해주세요')
    .min(6, '비밀번호는 최소 6자 이상이어야 합니다'),
}).required();

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginCredentials>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data: LoginCredentials) => {
    setIsLoading(true);
    setError(null);

    try {
      await authService.login(data);
      
      // 로그인 성공 시 대시보드로 이동
      navigate('/dashboard');
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : '로그인에 실패했습니다.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* 로고 및 제목 */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-600 rounded-full mb-4">
            <LockOutlined className="text-white text-2xl" />
          </div>
          <Typography variant="h4" component="h1" className="text-gray-900 font-bold mb-2">
            Celmade Dashboard
          </Typography>
          <Typography variant="body1" className="text-gray-600">
            관리자 로그인
          </Typography>
        </div> 

        {/* 로그인 카드 */}
        <Card className="shadow-xl border-0">
          <CardContent className="p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* 에러 메시지 */}
              {error && (
                <Alert severity="error" className="mb-4">
                  {error}
                </Alert>
              )}

              {/* 사용자명 입력 */}
              <TextField
                {...register('username')}
                label="사용자명"
                variant="outlined"
                fullWidth
                error={!!errors.username}
                helperText={errors.username?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonOutline className="text-gray-400" />
                    </InputAdornment>
                  ),
                }}
                className="animate-fade-in"
              />

              {/* 비밀번호 입력 */}
              <TextField
                {...register('password')}
                label="비밀번호"
                type={showPassword ? 'text' : 'password'}
                variant="outlined"
                fullWidth
                error={!!errors.password}
                helperText={errors.password?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlined className="text-gray-400" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleTogglePasswordVisibility}
                        edge="end"
                        className="text-gray-400"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                className="animate-fade-in"
              />

              {/* 로그인 버튼 */}
              <Button
                type="submit"
                variant="contained"
                fullWidth
                size="large"
                disabled={isLoading}
                className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 text-base"
                startIcon={
                  isLoading ? (
                    <CircularProgress size={20} color="inherit" />
                  ) : (
                    <LockOutlined />
                  )
                }
              >
                {isLoading ? '로그인 중...' : '로그인'}
              </Button>
            </form>

            {/* 추가 정보 */}
            <Box className="mt-6 text-center">
              <Typography variant="body2" className="text-gray-500 mb-2">
                쇼피파이 & 워드프레스 통합 관리 시스템
              </Typography>
              <Typography variant="caption" className="text-gray-400">
                테스트 계정: admin / admin123
              </Typography>
            </Box>
          </CardContent>
        </Card>

        {/* 푸터 */}
        <div className="text-center mt-8">
          <Typography variant="body2" className="text-gray-500">
            © 2024 Celmade. All rights reserved.
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default LoginPage; 