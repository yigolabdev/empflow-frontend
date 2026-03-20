import type { ThemeConfig } from 'antd';

export const themeConfig: ThemeConfig = {
  token: {
    colorPrimary: '#0EA5E9',
    colorSuccess: '#10B981',
    colorWarning: '#F59E0B',
    colorError: '#EF4444',
    colorInfo: '#0EA5E9',
    colorTextBase: '#1E293B',
    colorBgBase: '#FFFFFF',
    borderRadius: 6,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
  },
  components: {
    Button: {
      colorPrimary: '#1E3A8A',
      algorithm: true,
    },
    Card: {
      boxShadowSecondary: '0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02)',
    },
    Layout: {
      colorBgHeader: '#1E3A8A',
      colorBgBody: '#F8FAFC',
    },
  },
};

export default themeConfig;