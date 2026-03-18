import React from 'react';
import { Card, Button, List, Badge, Space, Tooltip } from 'antd';
import { CheckCircleOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { PricingTier } from '@/features/pricing/data/pricingData';
import styles from '@/features/pricing/styles/PricingTierCard.module.css';

interface PricingTierCardProps {
  tier: PricingTier & {
    displayPrice: number;
    savingsText: string;
  };
  billingPeriod: 'monthly' | 'annual';
  isHighlighted?: boolean;
}

const PricingTierCard: React.FC<PricingTierCardProps> = ({
  tier,
  billingPeriod,
  isHighlighted = false,
}) => {
  const formattedPrice = new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: 'KRW',
    minimumFractionDigits: 0,
  }).format(tier.displayPrice);

  return (
    <Card
      className={`${styles.tierCard} ${isHighlighted ? styles.highlighted : ''}`}
      style={{
        borderColor: isHighlighted ? '#0EA5E9' : '#E2E8F0',
        borderWidth: isHighlighted ? 2 : 1,
        boxShadow: isHighlighted ? '0 8px 16px rgba(14, 165, 233, 0.15)' : 'none',
      }}
      bordered
    >
      {isHighlighted && (
        <Badge
          count="인기"
          style={{
            backgroundColor: '#10B981',
            position: 'absolute',
            top: -10,
            right: 20,
          }}
        />
      )}

      {/* 티어 이름 및 설명 */}
      <div className={styles.tierHeader}>
        <h3 className={styles.tierName}>{tier.name}</h3>
        <p className={styles.tierDescription}>{tier.description}</p>
      </div>

      {/* 가격 정보 */}
      <div className={styles.priceSection}>
        <div className={styles.price}>
          <span className={styles.amount}>{formattedPrice}</span>
          <span className={styles.period}>
            {billingPeriod === 'monthly' ? '/월' : '/년'}
          </span>
        </div>
        {tier.savingsText && (
          <p className={styles.savingsText}>{tier.savingsText}</p>
        )}
        <p className={styles.priceDetail}>
          사용자당 {billingPeriod === 'monthly' ? tier.priceMonthly.toLocaleString('ko-KR') : Math.round(tier.priceMonthly * 12 * 0.9).toLocaleString('ko-KR')} 원
        </p>
      </div>

      {/* CTA 버튼 */}
      <Button
        type={isHighlighted ? 'primary' ? 'default'}
        size="large"
        block
        className={styles.ctaButton}
        style={{
          backgroundColor: isHighlighted ? '#1E3A8A' : 'transparent',
          color: isHighlighted ? 'white' : '#1E3A8A',
          borderColor: '#1E3A8A',
        }}
      >
        시작하기
      </Button>

      {/* 기능 목록 */}
      <div className={styles.featuresSection}>
        <p className={styles.featuresTitle}>포함 기능</p>
        <List
          dataSource={tier.features}
          renderItem={(feature) => (
            <List.Item key={feature} className={styles.featureItem}>
              <CheckCircleOutlined
                style={{ color: '#10B981', marginRight: 8, fontSize: 16 }}
              />
              <span>{feature}</span>
            </List.Item>
          )}
        />
      </div>

      {/* 추가 옵션 */}
      {tier.addons && tier.addons.length > 0 && (
        <div className={styles.addonsSection}>
          <p className={styles.addonsTitle}>
            추가 옵션
            <Tooltip title="필요에 따라 추가할 수 있습니다.">
              <InfoCircleOutlined style={{ marginLeft: 4, color: '#0EA5E9' }} />
            </Tooltip>
          </p>
          <Space direction="vertical" style={{ width: '100%' }}>
            {tier.addons.map((addon) => (
              <div key={addon.name} className={styles.addonItem}>
                <span>{addon.name}</span>
                <span className={styles.addonPrice}>
                  +{new Intl.NumberFormat('ko-KR').format(addon.price)}원
                </span>
              </div>
            ))}
          </Space>
        </div>
      )}
    </Card>
  );
};

export default PricingTierCard;