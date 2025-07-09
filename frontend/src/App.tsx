import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import LoginPage from './components/LoginPage';
import DashboardPage from './components/dashboard/DashboardPage';
import './index.css';

// React Query 클라이언트 생성
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// Material-UI 테마 생성
const theme = createTheme({
  palette: {
    primary: {
      main: '#2563eb', // primary-600
      light: '#60a5fa', // primary-400
      dark: '#1d4ed8', // primary-700
    },
    secondary: {
      main: '#64748b', // secondary-500
      light: '#94a3b8', // secondary-400
      dark: '#475569', // secondary-600
    },
  },
  typography: {
    fontFamily: 'Inter, system-ui, sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '8px',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
        },
      },
    },
  },
});

// 인증 상태 확인 함수
const isAuthenticated = (): boolean => {
  const token = localStorage.getItem('token');
  return !!token;
};

// 보호된 라우트 컴포넌트
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <div className="App">
            <Routes>
              {/* 로그인 페이지 */}
              <Route 
                path="/login" 
                element={
                  isAuthenticated() ? (
                    <Navigate to="/dashboard" replace />
                  ) : (
                    <LoginPage />
                  )
                } 
              />
              
              {/* 대시보드 페이지 (보호됨) */}
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                } 
              />
              
              {/* 기본 리다이렉트 */}
              <Route 
                path="/" 
                element={<Navigate to="/dashboard" replace />} 
              />
              
              {/* 404 페이지 */}
              <Route 
                path="*" 
                element={<Navigate to="/dashboard" replace />} 
              />
            </Routes>
          </div>
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
