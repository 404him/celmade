import React from 'react';
import { AppBar, Toolbar, IconButton, Box, Avatar, Badge } from '@mui/material';
import { Search, Notifications, DarkMode, LightMode } from '@mui/icons-material';

const SIDEBAR_WIDTH = 220;
const COLLAPSED_WIDTH = 64;

const Header = ({ user, collapsed }) => {
  const [darkMode, setDarkMode] = React.useState(false);
  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        background: '#fff',
        color: '#222',
        borderBottom: '1px solid #eee',
        boxShadow: 'none',
        zIndex: 100,
        left: collapsed ? `${COLLAPSED_WIDTH}px` : `${SIDEBAR_WIDTH}px`,
        width: collapsed ? `calc(100% - ${COLLAPSED_WIDTH}px)` : `calc(100% - ${SIDEBAR_WIDTH}px)`
      }}
    >
      <Toolbar className="px-8 min-h-[64px] flex justify-between">
        {/* 좌측: 로고/네비 */}
        <div className="flex items-center gap-4">
          <span className="text-xl font-bold tracking-tight text-gray-900">Dashboard</span>
          <span className="text-gray-300">/</span>
          <span className="text-gray-400">Overview</span>
        </div>
        {/* 우측: 아이콘/프로필 */}
        <Box className="flex items-center gap-3">
          <IconButton color="inherit" size="large">
            <Search />
          </IconButton>
          <IconButton color="inherit" size="large" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? <LightMode /> : <DarkMode />}
          </IconButton>
          <IconButton color="inherit" size="large">
            <Badge badgeContent={3} color="error">
              <Notifications />
            </Badge>
          </IconButton>
          <Avatar sx={{ width: 36, height: 36, bgcolor: '#f3f4f6', color: '#222', fontWeight: 700, fontSize: 18 }}>
            {user?.name?.charAt(0) || 'A'}
          </Avatar>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header; 