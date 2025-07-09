import React from 'react';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  Dashboard,
  ShoppingCart,
  People,
  Inventory,
  LocalShipping,
  ShoppingBasket,
  Settings,
  Logout,
  Menu
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const drawerWidth = 220;
const collapsedWidth = 64;

const menuItems = [
  {
    text: 'Analytics',
    icon: <Dashboard />,
    path: '/dashboard',
    color: '#2563eb'
  },
  {
    text: 'Products',
    icon: <Inventory />,
    path: '/products',
    color: '#dc2626'
  },
  {
    text: 'Order',
    icon: <ShoppingCart />,
    path: '/orders',
    color: '#059669'
  },
  {
    text: 'Calendar',
    icon: <LocalShipping />,
    path: '/calendar',
    color: '#ea580c'
  },
  {
    text: 'Tasks',
    icon: <People />,
    path: '/tasks',
    color: '#7c3aed'
  },
  {
    text: 'Chats',
    icon: <ShoppingBasket />,
    path: '/chats',
    color: '#2563eb'
  },
  {
    text: '설정',
    icon: <Settings />,
    path: '/settings',
    color: '#6b7280'
  }
];

const Sidebar = ({ user, collapsed, setCollapsed }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div
      className={`h-screen bg-white border-r border-gray-200 flex flex-col z-30 transition-all duration-200`}
      style={{ width: collapsed ? collapsedWidth : drawerWidth, minWidth: collapsed ? collapsedWidth : drawerWidth }}
    >
      {/* 상단: 토글버튼만 */}
      <div className={`flex items-center justify-start py-4 px-2 transition-all duration-200`} style={{ minHeight: 72 }}>
        <IconButton onClick={() => setCollapsed(!collapsed)} size="small" style={{ marginLeft: 10 }}>
          <Menu />
        </IconButton>
      </div>
      {/* 상단 배너(헤더) 아래 라인과 맞추는 구분선 */}
      <div className="border-b border-gray-100 w-full" />
      {/* 메뉴 */}
      <nav className={`flex-1 py-4 ${collapsed ? 'px-0' : 'px-2'}`}>
        <List>
          {menuItems.map((item) => (
            <Tooltip key={item.text} title={collapsed ? item.text : ''} placement="right">
              <ListItem disablePadding className="mb-1">
                <ListItemButton
                  onClick={() => handleNavigation(item.path)}
                  className={`rounded-lg flex items-center ${collapsed ? 'justify-center px-0 py-2' : 'px-4 py-2 gap-3'} ${location.pathname === item.path ? 'bg-gray-100 text-primary-600 font-semibold' : 'text-gray-700 hover:bg-gray-50'}`}
                  sx={{ minHeight: 44 }}
                >
                  <ListItemIcon sx={{ color: location.pathname === item.path ? '#2563eb' : '#bdbdbd', minWidth: 0, justifyContent: 'center' }}>{item.icon}</ListItemIcon>
                  {!collapsed && <ListItemText primary={item.text} primaryTypographyProps={{ fontSize: '1rem', fontWeight: location.pathname === item.path ? 600 : 400 }} />}
                </ListItemButton>
              </ListItem>
            </Tooltip>
          ))}
        </List>
      </nav>
      {/* 로그아웃 */}
      <div className={`border-t border-gray-100 p-2 ${collapsed ? 'flex justify-center' : ''}`}>
        <Tooltip title={collapsed ? '로그아웃' : ''} placement="right">
          <button onClick={handleLogout} className={`flex items-center gap-2 text-gray-400 hover:text-red-500 text-sm font-medium py-2 px-3 rounded-lg transition-colors ${collapsed ? 'justify-center w-10 h-10 p-0' : 'w-full'}`}>
            <Logout fontSize="small" />
            {!collapsed && '로그아웃'}
          </button>
        </Tooltip>
      </div>
    </div>
  );
};

export default Sidebar; 