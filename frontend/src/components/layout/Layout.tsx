import React, { useState } from 'react';
import { Box } from '@mui/material';
import Sidebar from './Sidebar';
import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
  user: {
    name: string;
    role: string;
    email: string;
  } | null;
}

const drawerWidth = 220;
const collapsedWidth = 64;

const Layout: React.FC<LayoutProps> = ({ children, user }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box className="flex h-screen bg-gray-50">
      {/* 사이드바 */}
      <Sidebar user={user} collapsed={collapsed} setCollapsed={setCollapsed} />
      {/* 메인 콘텐츠 영역 */}
      <Box className="flex-1 flex flex-col" style={{ marginLeft: 0 }}>
        {/* 헤더 */}
        <Header user={user} collapsed={collapsed} setCollapsed={setCollapsed} />
        {/* 메인 콘텐츠 */}
        <Box
          component="main"
          className="flex-1 overflow-auto"
          sx={{
            marginTop: '64px',
            marginLeft: 0,
            padding: 0,
            minWidth: 0
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default Layout; 