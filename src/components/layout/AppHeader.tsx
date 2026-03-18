import React from 'react';
import { Layout, Button, Space, Dropdown, Avatar } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined, LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';

interface AppHeaderProps {
  collapsed: boolean;
  onToggleSider: () => void;
  isMobile: boolean;
}

const AppHeader: React.FC<AppHeaderProps> = ({ collapsed, onToggleSider, isMobile }) => {
  const userMenuItems: MenuProps['items'] = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: '프로필',
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: '설정',
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '로그아웃',
      danger: true,
    },
  ];

  const handleUserMenuClick: MenuProps['onClick'] = (e) => {
    if (e.key === 'logout') {
      // 로그아웃 로직
      console.log('로그아웃');
    }
  };

  return (
    <Layout.Header
      style={{
        background: '#1E3A8A',
        padding: '0 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 2px 8px rgba(30, 58, 138, 0.15)',
        position: 'sticky',
        top: 0,
        zIndex: 999,
      }}
    >
      <Space size="large" style={{ display: 'flex', alignItems: 'center' }}>
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={onToggleSider}
          style={{
            fontSize: '18px',
            color: '#FFFFFF',
            height: '32px',
            width: '32px',
          }}
        />
        <div
          style={{
            fontSize: '20px',
            fontWeight: 'bold',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <div
            style={{
              width: '32px',
              height: '32px',
              background: '#0EA5E9',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '18px',
              fontWeight: 'bold',
              color: '#FFFFFF',
            }}
          >
            E
          </div>
          <span>EmpFlow</span>
        </div>
      </Space>

      <Space size="middle">
        <Dropdown menu={{ items: userMenuItems, onClick: handleUserMenuClick }}>
          <Avatar
            size="large"
            icon={<UserOutlined />}
            style={{
              backgroundColor: '#0EA5E9',
              cursor: 'pointer',
            }}
          />
        </Dropdown>
      </Space>
    </Layout.Header>
  );
};

export default AppHeader;