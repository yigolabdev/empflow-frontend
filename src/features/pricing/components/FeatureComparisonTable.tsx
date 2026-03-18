import React, { useMemo } from 'react';
import { Table, Tag, Tooltip } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { PricingTier, FeatureItem } from '@/features/pricing/data/pricingData';
import styles from '@/features/pricing/styles/FeatureComparisonTable.module.css';

interface FeatureComparisonTableProps {
  tiers: PricingTier[];
  features: FeatureItem[];
  showAllFeatures?: boolean;
}

const FeatureComparisonTable: React.FC<FeatureComparisonTableProps> = ({
  tiers,
  features,
  showAllFeatures = false,
}) => {
  const displayedFeatures = useMemo(() => {
    if (showAllFeatures) return features;
    return features.filter((f) => f.category === '필수');
  }, [features, showAllFeatures]);

  const columns = [
    {
      title: '기능',
      dataIndex: 'name',
      key: 'name',
      width: 250,
      fixed: 'left' as const,
      render: (text: string, record: FeatureItem) => (
        <div className={styles.featureName}>
          <span>{text}</span>
          {record.tooltip && (
            <Tooltip title={record.tooltip}>
              <InfoCircleOutlined
                style={{
                  marginLeft: 8,
                  color: '#0EA5E9',
                  cursor: 'pointer',
                }}
              />
            </Tooltip>
          )}
        </div>
      ),
    },
    ...tiers.map((tier) => ({
      title: tier.name,
      dataIndex: tier.id,
      key: tier.id,
      width: 150,
      align: 'center' as const,
      render: (value: boolean | string | null) => {
        if (value === true) {
          return (
            <CheckCircleOutlined
              style={{
                color: '#10B981',
                fontSize: 20,
              }}
            />
          );
        }
        if (value === false) {
          return (
            <CloseCircleOutlined
              style={{
                color: '#CBD5E1',
                fontSize: 20,
              }}
            />
          );
        }
        if (typeof value === 'string') {
          return (
            <Tag
              color={value.includes('무제한') ? '#10B981' : '#0EA5E9'}
              style={{
                color: 'white',
              }}
            >
              {value}
            </Tag>
          );
        }
        return <span>-</span>;
      },
    })),
  ];

  const tableData = displayedFeatures.map((feature) => ({
    key: feature.id,
    name: feature.name,
    tooltip: feature.tooltip,
    ...tiers.reduce((acc, tier) => {
      acc[tier.id] = feature.support[tier.id] ?? false;
      return acc;
    }, {} as Record<string, boolean | string>),
  }));

  return (
    <div className={styles.tableContainer}>
      <Table
        columns={columns}
        dataSource={tableData}
        pagination={false}
        scroll={{ x: 1200 }}
        className={styles.comparisonTable}
        size="middle"
      />
    </div>
  );
};

export default FeatureComparisonTable;