import React, { useState } from 'react';
import { Card, Row, Col, Typography, Slider, Space, Statistic, Divider } from 'antd';
import { ArrowUpOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const ROICalculator: React.FC = () => {
  const [employeeCount, setEmployeeCount] = useState<number>(100);
  const [monthlyHRHours, setMonthlyHRHours] = useState<number>(200);

  const hourlyRate = 50000; // KRW
  const currentAnnualCost = (monthlyHRHours * 12 * hourlyRate) / 1000000; // Million KRW
  const estimatedSavings = (currentAnnualCost * 0.7) / 1000000; // 70% reduction in millions
  const empflowAnnualCost = employeeCount <= 50 ? 3 : employeeCount <= 200 ? 8 : employeeCount <= 1000 ? 20 : 50; // Million KRW
  const netAnnualBenefit = estimatedSavings - empflowAnnualCost;
  const roi = empflowAnnualCost > 0 ? ((netAnnualBenefit / empflowAnnualCost) * 100).toFixed(0) : 0;
  const paybackMonths = empflowAnnualCost > 0 ? ((empflowAnnualCost / (netAnnualBenefit / 12)) * 1).toFixed(1) : '0';

  return (
    <div style={{ padding: '80px 40px', backgroundColor: '#FFFFFF' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <Title level={2} style={{ fontSize: '36px', fontWeight: 700, color: '#1E293B', margin: '0 0 16px 0' }}>
            ROI 계산기
          </Title>
          <Paragraph style={{ fontSize: '16px', color: '#64748B', maxWidth: '600px', margin: '0 auto' }}>
            귀사 규모에 맞춰 EmpFlow의 경제적 효과를 확인해보세요
          </Paragraph>
        </div>

        <Row gutter={[40, 40]} align="middle">
          <Col xs={24} md={12}>
            <Card
              style={{
                border: '1px solid #E2E8F0',
                borderRadius: '12px',
                backgroundColor: '#F8FAFC',
                padding: '32px',
              }}
            >
              <Space direction="vertical" size="large" style={{ width: '100%' }}>
                <div>
                  <Paragraph style={{ fontSize: '14px', fontWeight: 600, color: '#1E293B', margin: '0 0 8px 0' }}>
                    직원 수: {employeeCount}명
                  </Paragraph>
                  <Slider
                    min={10}
                    max={2000}
                    step={10}
                    value={employeeCount}
                    onChange={setEmployeeCount}
                    marks={{
                      10: '10',
                      500: '500',
                      1000: '1000',
                      2000: '2000',
                    }}
                    style={{ marginTop: '8px' }}
                  />
                </div>

                <Divider style={{ margin: '16px 0' }} />

                <div>
                  <Paragraph style={{ fontSize: '14px', fontWeight: 600, color: '#1E293B', margin: '0 0 8px 0' }}>
                    월 HR 운영 시간: {monthlyHRHours}시간
                  </Paragraph>
                  <Slider
                    min={20}
                    max={1000}
                    step={10}
                    value={monthlyHRHours}
                    onChange={setMonthlyHRHours}
                    marks={{
                      20: '20h',
                      500: '500h',
                      1000: '1000h',
                    }}
                    style={{ marginTop: '8px' }}
                  />
                </div>
              </Space>
            </Card>
          </Col>

          <Col xs={24} md={12}>
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
              <Card
                style={{
                  border: '2px solid #10B981',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(16, 185, 129, 0.05)',
                  padding: '24px',
                }}
              >
                <Row gutter={[16, 16]}>
                  <Col xs={12}>
                    <div>
                      <Paragraph style={{ fontSize: '12px', color: '#64748B', margin: '0 0 8px 0' }}>
                        현재 연간 HR 비용
                      </Paragraph>
                      <Statistic
                        value={currentAnnualCost}
                        suffix="백만원"
                        valueStyle={{ color: '#F59E0B', fontSize: '20px' }}
                      />
                    </div>
                  </Col>
                  <Col xs={12}>
                    <div>
                      <Paragraph style={{ fontSize: '12px', color: '#64748B', margin: '0 0 8px 0' }}>
                        예상 절감액
                      </Paragraph>
                      <Statistic
                        value={estimatedSavings}
                        suffix="백만원"
                        valueStyle={{ color: '#10B981', fontSize: '20px' }}
                      />
                    </div>
                  </Col>
                </Row>
              </Card>

              <Card
                style={{
                  border: '1px solid #E2E8F0',
                  borderRadius: '12px',
                  backgroundColor: '#FFFFFF',
                  padding: '24px',
                }}
              >
                <Row gutter={[16, 16]}>
                  <Col xs={24}>
                    <Paragraph style={{ fontSize: '12px', color: '#64748B', margin: '0 0 8px 0' }}>
                      EmpFlow 연간 비용
                    </Paragraph>
                    <Statistic
                      value={empflowAnnualCost}
                      suffix="백만원"
                      valueStyle={{ color: '#1E293B', fontSize: '20px' }}
                    />
                  </Col>
                </Row>
              </Card>

              <Card
                style={{
                  border: '2px solid #0EA5E9',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(14, 165, 233, 0.05)',
                  padding: '24px',
                }}
              >
                <Row gutter={[24, 24]}>
                  <Col xs={12}>
                    <div>
                      <Paragraph style={{ fontSize: '12px', color: '#64748B', margin: '0 0 8px 0' }}>
                        예상 ROI
                      </Paragraph>
                      <Space>
                        <Statistic
                          value={roi}
                          suffix="%"
                          valueStyle={{ color: '#0EA5E9', fontSize: '24px', fontWeight: 700 }}
                        />
                        <ArrowUpOutlined style={{ fontSize: '16px', color: '#10B981' }} />
                      </Space>
                    </div>
                  </Col>
                  <Col xs={12}>
                    <div>
                      <Paragraph style={{ fontSize: '12px', color: '#64748B', margin: '0 0 8px 0' }}>
                        손익분기점
                      </Paragraph>
                      <Statistic
                        value={paybackMonths}
                        suffix="개월"
                        valueStyle={{ color: '#1E293B', fontSize: '20px' }}
                      />
                    </div>
                  </Col>
                </Row>
              </Card>

              <Card
                style={{
                  border: '1px solid #E2E8F0',
                  borderRadius: '12px',
                  backgroundColor: '#F8FAFC',
                  padding: '24px',
                }}
              >
                <Paragraph style={{ fontSize: '14px', color: '#1E293B', fontWeight: 600, margin: '0 0 8px 0' }}>
                  연간 순편익
                </Paragraph>
                <Statistic
                  value={netAnnualBenefit}
                  suffix="백만원"
                  valueStyle={{ color: '#10B981', fontSize: '28px', fontWeight: 700 }}
                />
              </Card>
            </Space>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ROICalculator;