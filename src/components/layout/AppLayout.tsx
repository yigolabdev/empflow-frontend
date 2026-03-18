import React, { useState } from 'react';
import { Layout, Button, Drawer } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import AppHeader from './AppHeader';
import AppSider from './AppSider';
import '@/styles/layout.css';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 768);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSider = () => {
    if (isMobile) {
      setMobileDrawerOpen(!mobileDrawerOpen);
    } else {
      setCollapsed(!collapsed);
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <AppHeader 
        collapsed={collapsed} 
        onToggleSider={toggleSider}
        isMobile={isMobile}
      />
      <Layout style={{ flex: 1 }}>
        {!isMobile ? (
          <AppSider collapsed={collapsed} />
        ) : (
          <Drawer
            title="메뉴"
            placement="left"
            onClose={() => setMobileDrawerOpen(false)}
            open={mobileDrawerOpen}
            bodyStyle={{ padding: 0 }}
          >
            <AppSider collapsed={false} />
          </Drawer>
        )}
        <Layout.Content
          style={{
            padding: isMobile ? '16px' : '24px',
            background: '#F8FAFC',
            overflowY: 'auto',
          }}
        >
          {children}
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;