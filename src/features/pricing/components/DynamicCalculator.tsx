import React, { useState, useMemo } from 'react';
import { Card, Slider, InputNumber, Row, Col, Statistic, Space, Radio, Button } from 'antd';
import { pricingTiers } from '@/features/pricing/data/pricingData';
import styles from '@/features/pricing/styles/DynamicCalculator.module.css';

interface DynamicCalculatorProps {
  billingPeriod: 'monthly' | 'annual';
}

interface PriceBreakdown {
  baseCost: number;
  apiCost: number;
  analyticsCost: number;
  totalCost: number;
  discountCost?: number;
}

const DynamicCalculator: React.FC<DynamicCalculatorProps> = ({ billingPeriod }) => {
  const [selectedTier, setSelectedTier] = useState<string>('standard');
  const [employeeCount, setEmployeeCount] = useState<number>(100);
  const [apiCalls, setApiCalls] = useState<number>(1000);
  const [includeAnalytics, setIncludeAnalytics] = useState<boolean>(false);

  const tier = pricingTiers.find((t) => t.id === selectedTier);

  const calculation = useMemo((): PriceBreakdown => {
    if (!tier) return { baseCost: 0, apiCost: 0, analyticsCost: 0, totalCost: 0 };

    const basePrice = tier.priceMonthly * employeeCount;
    const apiPrice =
      apiCalls > tier.apiCallsIncluded
        ? (apiCalls - tier.apiCallsIncluded) * 0.001
        : 0;
    const analyticsPrice = includeAnalytics ? 150000 : 0;

    let total = basePrice + apiPrice + analyticsPrice;

    let discount = 0;
    if (billingPeriod === 'annual') {
      total = total * 12 * 0.9;
      discount = total * 0.1;
    } else {
      total = total;
    }

    return {
      baseCost: basePrice,
      apiCost: apiPrice,
      analyticsCost: analyticsPrice,
      totalCost: billingPeriod === 'annual' ? total * 12 * 0.9 : total,
      discountCost: billingPeriod === 'annual' ? discount : undefined,
    };
  }, [tier, employeeCount, apiCalls, includeAnalytics, billingPeriod]);

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW',
      minimumFractionDigits: 0,
    }).format(price);

  return (
    <Card className={styles.calculatorCard}>
      <Row gutter={[32, 32]}>
        <Col xs={24} lg={12}>
          <div className={styles.inputsSection}>
            {/* 티어 선택 */}
            <div className={styles.inputGroup}>
              <label className={styles.label}>플랜 선택</label>
              <Radio.Group
                value={selectedTier}
                onChange={(e) => setSelectedTier(e.target.value)}
              >
                <Space direction="vertical" style={{ width: '100%' }}>
                  {pricingTiers.map((t) => (
                    <Radio key={t.id} value={t.id}>
                      <span className={styles.tierOption}>{t.name}</span>
                    </Radio>
                  ))}
                </Space>
              </Radio.Group>
            </div>

            {/* 직원 수 */}
            <div className={styles.inputGroup}>
              <div className={styles.labelWithValue}>
                <label className={styles.label}>직원 수</label>
                <span className={styles.value}>{employeeCount.toLocaleString('ko-KR')} 명</span>
              </div>
              <Slider
                min={1}
                max={2000}
                step={10}
                value={employeeCount}
                onChange={(value) => setEmployeeCount(value)}
                marks={{
                  1: '1',
                  500: '500',
                  1000: '1,000',
                  2000: '2,000',
                }}
              />
              <InputNumber
                min={1}
                max={2000}
                value={employeeCount}
                onChange={(value) => setEmployeeCount(value || 1)}
                className={styles.input}
                style={{ marginTop: 12 }}
              />
            </div>

            {/* API 호출 */}
            <div className={styles.inputGroup}>
              <div className={styles.labelWithValue}>
                <label className={styles.label}>월간 API 호출</label>
                <span className={styles.value}>
                  {(apiCalls / 1000).toFixed(1)}K
                </span>
              </div>
              <Slider
                min={0}
                max={100000}
                step={1000}
                value={apiCalls}
                onChange={(value) => setApiCalls(value)}
                marks={{
                  0: '0',
                  25000: '25K',
                  50000: '50K',
                  100000: '100K',
                }}
              />
              <InputNumber
                min={0}
                max={100000}
                value={apiCalls}
                onChange={(value) => setApiCalls(value || 0)}
                className={styles.input}
                style={{ marginTop: 12 }}
              />
              {tier && (
                <p className={styles.helperText}>
                  포함된 API: {tier.apiCallsIncluded.toLocaleString('ko-KR')} 호출/월
                </p>
              )}
            </div>

            {/* 프리미엄 분석 */}
            <div className={styles.inputGroup}>
              <Radio.Group
                value={includeAnalytics}
                onChange={(e) => setIncludeAnalytics(e.target.value)}
              >
                <Space direction="vertical" style={{ width: '100%' }}>
                  <Radio value={false}>표준 분석 (포함됨)</Radio>
                  <Radio value={true}>
                    프리미엄 분석 (+{formatPrice(150000)}/월)
                  </Radio>
                </Space>
              </Radio.Group>
            </div>
          </div>
        </Col>

        <Col xs={24} lg={12}>
          <div className={styles.summarySection}>
            <h4 className={styles.summaryTitle}>가격 상세 보기</h4>

            <div className={styles.breakdownItems}>
              <div className={styles.breakdownItem}>
                <span>기본 사용료</span>
                <span className={styles.price}>
                  {formatPrice(calculation.baseCost)}
                </span>
              </div>
              {calculation.apiCost > 0 && (
                <div className={styles.breakdownItem}>
                  <span>API 오버 호출 비용</span>
                  <span className={styles.price}>
                    {formatPrice(calculation.apiCost)}
                  </span>
                </div>
              )}
              {calculation.analyticsCost > 0 && (
                <div className={styles.breakdownItem}>
                  <span>프리미엄 분석</span>
                  <span className={styles.price}>
                    {formatPrice(calculation.analyticsCost)}
                  </span>
                </div>
              )}
              {billingPeriod === 'annual' && calculation.discountCost && (
                <div className={styles.breakdownItem}>
                  <span>연간 할인 (-10%)</span>
                  <span className={styles.price} style={{ color: '#10B981' }}>
                    -{formatPrice(calculation.discountCost)}
                  </span>
                </div>
              )}
            </div>

            <div className={styles.totalSection}>
              <Statistic
                title={billingPeriod === 'monthly' ? '월간 총 비용' : '연간 총 비용'}
                value={calculation.totalCost}
                prefix="₩"
                precision={0}
                valueStyle={{
                  color: '#1E3A8A',
                  fontSize: 32,
                  fontWeight: 'bold',
                }}
              />
            </div>

            <Button
              type="primary"
              size="large"
              block
              style={{
                backgroundColor: '#1E3A8A',
                marginTop: 20,
              }}
            >
              이 계획으로 시작하기
            </Button>
          </div>
        </Col>
      </Row>
    </Card>
  );
};

export default DynamicCalculator;