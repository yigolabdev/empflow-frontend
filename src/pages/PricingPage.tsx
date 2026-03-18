import React, { useState } from 'react';
import { Row, Col, Switch, Space, Tabs } from 'antd';
import PricingTierCard from '@/features/pricing/components/PricingTierCard';
import FeatureComparisonTable from '@/features/pricing/components/FeatureComparisonTable';
import DynamicCalculator from '@/features/pricing/components/DynamicCalculator';
import FAQAccordion from '@/features/pricing/components/FAQAccordion';
import ComparisonToggle from '@/features/pricing/components/ComparisonToggle';
import { pricingTiers, featuresList, faqItems } from '@/features/pricing/data/pricingData';
import styles from '@/features/pricing/styles/PricingPage.module.css';

type BillingPeriod = 'monthly' | 'annual';

const PricingPage: React.FC = () => {
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>('monthly');
  const [showComparison, setShowComparison] = useState(false);

  const handleBillingToggle = (checked: boolean) => {
    setBillingPeriod(checked ? 'annual' : 'monthly');
  };

  const tiersWithPricing = pricingTiers.map((tier) => ({
    ...tier,
    displayPrice: billingPeriod === 'annual' ? tier.priceMonthly * 12 * 0.9 : tier.priceMonthly,
    savingsText: billingPeriod === 'annual' ? '10% 절감' : '',
  }));

  return (
    <div className={styles.pricingPage}>
      {/* 헤더 섹션 */}
      <section className={styles.headerSection}>
        <h1 className={styles.title}>명확한 가격, 숨겨진 비용 없음</h1>
        <p className={styles.subtitle}>
          귀사 규모에 맞는 완벽한 플랜을 선택하세요. 언제든지 업그레이드하거나 다운그레이드할 수 있습니다.
        </p>

        {/* 청구 주기 토글 */}
        <div className={styles.billingToggle}>
          <span className={billingPeriod === 'monthly' ? styles.active : ''}>월간 청구</span>
          <Switch
            checked={billingPeriod === 'annual'}
            onChange={handleBillingToggle}
            size="large"
            style={{
              backgroundColor: billingPeriod === 'annual' ? '#0EA5E9' : '#cbd5e1',
            }}
          />
          <span className={billingPeriod === 'annual' ? styles.active : ''}>
            연간 청구
            <span className={styles.savingsBadge}>10% 절감</span>
          </span>
        </div>
      </section>

      {/* 가격 책정 티어 카드 */}
      <section className={styles.tierCardsSection}>
        <Row gutter={[24, 24]} justify="center">
          {tiersWithPricing.map((tier) => (
            <Col key={tier.id} xs={24} sm={24} md={12} lg={6} xl={6}>
              <PricingTierCard
                tier={tier}
                billingPeriod={billingPeriod}
                isHighlighted={tier.id === 'premium'}
              />
            </Col>
          ))}
        </Row>
      </section>

      {/* 동적 가격 계산기 */}
      <section className={styles.calculatorSection}>
        <div className={styles.calculatorContainer}>
          <h2>맞춤형 가격 계산</h2>
          <p>직원 규모와 필요한 API 호출 수를 입력하여 정확한 비용을 확인하세요.</p>
          <DynamicCalculator billingPeriod={billingPeriod} />
        </div>
      </section>

      {/* 비교 토글 및 테이블 */}
      <section className={styles.comparisonSection}>
        <div className={styles.comparisonHeader}>
          <h2>기능 비교</h2>
          <ComparisonToggle showAll={showComparison} onChange={setShowComparison} />
        </div>
        <FeatureComparisonTable
          tiers={pricingTiers}
          features={featuresList}
          showAllFeatures={showComparison}
        />
      </section>

      {/* 자주 묻는 질문 */}
      <section className={styles.faqSection}>
        <h2>자주 묻는 질문</h2>
        <FAQAccordion items={faqItems} />
      </section>

      {/* CTA 섹션 */}
      <section className={styles.ctaSection}>
        <h2>지금 시작하세요</h2>
        <p>14일 무료 체험, 신용카드 불필요</p>
        <Space size="large">
          <button className={`${styles.ctaButton} ${styles.primary}`}>
            무료 체험 시작
          </button>
          <button className={`${styles.ctaButton} ${styles.secondary}`}>
            영업팀에 문의
          </button>
        </Space>
      </section>
    </div>
  );
};

export default PricingPage;