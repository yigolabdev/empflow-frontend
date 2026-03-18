import React, { useMemo } from 'react';
import { Layout, Menu, Empty } from 'antd';
import {
  DashboardOutlined,
  TeamOutlined,
  UserOutlined,
  CalendarOutlined,
  FileTextOutlined,
  DollarOutlined,
  BarChartOutlined,
  LockOutlined,
  HomeOutlined,
  TagsOutlined,
  LoginOutlined,
} from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import type { MenuProps } from 'antd';

interface AppSiderProps {
  collapsed: boolean;
}

const AppSider: React.FC<AppSiderProps> = ({ collapsed }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems: MenuProps['items'] = useMemo(
    () => [
      {
        key: '/',
        icon: <HomeOutlined />,
        label: '랜딩 페이지',
        onClick: () => navigate('/'),
      },
      {
        key: '/pricing',
        icon: <TagsOutlined />,
        label: '가격 책정',
        onClick: () => navigate('/pricing'),
      },
      {
        type: 'divider',
      },
      {
        key: '/signup',
        icon: <UserOutlined />,
        label: '회원가입',
        onClick: () => navigate('/signup'),
      },
      {
        key: '/login',
        icon: <LoginOutlined />,
        label: '로그인',
        onClick: () => navigate('/login'),
      },
      {
        type: 'divider',
      },
      {
        key: 'admin',
        label: '관리 시스템',
        icon: <LockOutlined />,
        children: [
          {
            key: '/admin/dashboard',
            icon: <DashboardOutlined />,
            label: '대시보드',
            onClick: () => navigate('/admin/dashboard'),
          },
          {
            key: '/admin/employees',
            icon: <TeamOutlined />,
            label: '직원 관리',
            onClick: () => navigate('/admin/employees'),
          },
          {
            key: '/admin/attendance',
            icon: <CalendarOutlined />,
            label: '근태 관리',
            onClick: () => navigate('/admin/attendance'),
          },
          {
            key: '/admin/leave-management',
            icon: <FileTextOutlined />,
            label: '휴가 관리',
            onClick: () => navigate('/admin/leave-management'),
          },
          {
            key: '/admin/payroll',
            icon: <DollarOutlined />,
            label: '급여 관리',
            onClick: () => navigate('/admin/payroll'),
          },
          {
            key: '/admin/analytics',
            icon: <BarChartOutlined />,
            label: '분석 대시보드',
            onClick: () => navigate('/admin/analytics'),
          },
          {
            key: '/admin/roles-permissions',
            icon: <LockOutlined />,
            label: '역할 및 권한',
            onClick: () => navigate('/admin/roles-permissions'),
          },
        ],
      },
    ],
    [navigate]
  );

  return (
    <Layout.Sider
      collapsed={collapsed}
      width={256}
      style={{
        background: '#FFFFFF',
        borderRight: '1px solid #E2E8F0',
        overflowY: 'auto',
      }}
      collapsedWidth={80}
    >
      <Menu
        mode="inline"
        items={menuItems}
        selectedKeys={[location.pathname]}
        style={{
          border: 'none',
          background: '#FFFFFF',
          paddingTop: '16px',
        }}
        theme="light"
      />
    </Layout.Sider>
  );
};

export default AppSider;