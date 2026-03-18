import React from 'react';
import { Button, Space } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import styles from '@/features/pricing/styles/ComparisonToggle.module.css';

interface ComparisonToggleProps {
  showAll: boolean;
  onChange: (showAll: boolean) => void;
}

const ComparisonToggle: React.FC<ComparisonToggleProps> = ({ showAll, onChange }) => {
  return (
    <div className={styles.toggleContainer}>
      <Button
        type="text"
        onClick={() => onChange(!showAll)}
        icon={showAll ? <UpOutlined /> : <DownOutlined />}
        className={styles.toggleButton}
        style={{
          color: '#0EA5E9',
        }}
      >
        {showAll ? '필수 기능만 보기' : '모든 기능 보기'}
      </Button>
    </div>
  );
};

export default ComparisonToggle;