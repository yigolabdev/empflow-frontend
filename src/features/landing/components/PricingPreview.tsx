import React from 'react';
import { Card, Row, Col, Typography, Space, Button, Tag, List } from 'antd';
import { CheckOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title, Paragraph, Text } = Typography;

const pricingPlans = [
  {
    name: 'Starter',
    price: '월 3백만원',
    employeeRange: '~50명',
    description: '스타트업과 소규모 팀을 위한 기본 기능',
    features: [
      '기본 직원 관리',
      '실시간 근태 관리',
      '간단한 휴가 관리',
      '기본 급여 계산',
      'API 5개까지 연동',
      '이메일 지원',
    ],
    highlighted: false,
  },
  {
    name: 'Professional',
    price: '월 8백만원',
    employeeRange: '51-200명',
    description: '중소기업을 위한 완전한 기능',
    features: [
      'Starter의 모든 기능',
      'AI 급여 예측',
      '통합 휴가 워크플로우',
      '분석 대시보드',
      'API 무제한 연동',
      '우선 이메일/전화 지원',
      '월 1회 전략 컨설팅',
    ],
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: '월 20백만원부터',
    employeeRange: '201-1000명',
    description: '중견기업을 위한 엔터프라이즈 솔루션',
    features: [
      'Professional의 모든 기능',
      'SSO 및 고급 보안',
      '커스텀 보고서',
      '전용 계정 담당자',
      '24/7 전화 지원',
      '월 4회 컨설팅',
      '우선 기능 개발 반영',
    ],
    highlighted: false,
  },
];

const PricingPreview: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '80px 40px', backgroundColor: '#FFFFFF' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <Title level={2} style={{ fontSize: '36px', fontWeight: 700, color: '#1E293B', margin: '0 0 16px 0' }}>
            가격 책정
          </Title>
          <Paragraph style={{ fontSize: '16px', color: '#64748B', maxWidth: '600px', margin: '0 auto' }}>
            귀사 규모에 맞춘 다양한 요금제를 제공합니다. 항상 공정하고 투명한 가격입니다.
          </Paragraph>
        </div>

        <Row gutter={[24, 24]} justify="center">
          {pricingPlans.map((plan, index) => (
            <Col key={index} xs={24} sm={24} md={8}>
              <Card
                style={{
                  height: '100%',
                  border: plan.highlighted ? '2px solid #0EA5E9' : '1px solid #E2E8F0',
                  borderRadius: '12px',
                  backgroundColor: plan.highlighted ? '#F0F9FF' : '#FFFFFF',
                  boxShadow: plan.highlighted ? '0 8px 16px rgba(14, 165, 233, 0.15)' : '0 1px 3px rgba(0, 0, 0, 0.05)',
                  position: 'relative',
                  transform: plan.highlighted ? 'translateY(-8px)' : 'none',
                  transition: 'all 0.3s ease',
                }}
                bodyStyle={{ padding: '32px 24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
              >
                {plan.highlighted && (
                  <Tag
                    color="#0EA5E9"
                    style={{
                      position: 'absolute',
                      top: '-12px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      fontSize: '12px',
                      fontWeight: 600,
                      padding: '4px 12px',
                    }}
                  >
                    가장 인기있는 요금제
                  </Tag>
                )}

                <Space direction="vertical" size="large" style={{ width: '100%', marginTop: plan.highlighted ? '16px' : '0' }}>
                  <div>
                    <Title level={4} style={{ color: '#1E293B', margin: '0 0 8px 0', fontSize: '20px' }}>
                      {plan.name}
                    </Title>
                    <Text style={{ fontSize: '12px', color: '#64748B' }}>{plan.employeeRange}</Text>
                  </div>

                  <div>
                    <Paragraph style={{ fontSize: '28px', fontWeight: 700, color: '#1E293B', margin: '0' }}>
                      {plan.price}
                    </Paragraph>
                    <Text style={{ fontSize: '12px', color: '#64748B' }}>{plan.description}</Text>
                  </div>

                  <List
                    size="small"
                    dataSource={plan.features}
                    renderItem={(feature) => (
                      <List.Item
                        style={{ padding: '8px 0', borderBottom: 'none' }}
                        key={feature}
                      >
                        <Space size="small">
                          <CheckOutlined style={{ color: '#10B981', fontSize: '14px', fontWeight: 700 }} />
                          <Text style={{ fontSize: '13px', color: '#64748B' }}>{feature}</Text>
                        </Space>
                      </List.Item>
                    )}
                  />
                </Space>

                <Button
                  type={plan.highlighted ? 'primary' : 'default'}
                  size="large"
                  block
                  style={{
                    marginTop: '24px',
                    backgroundColor: plan.highlighted ? '#0EA5E9' : 'transparent',
                    borderColor: plan.highlighted ? '#0EA5E9' : '#1E3A8A',
                    color: plan.highlighted ? '#FFFFFF' : '#1E3A8A',
                    fontWeight: 600,
                    height: '44px',
                  }}
                  onClick={() => navigate('/pricing')}
                  icon={<ArrowRightOutlined />}
                  iconPosition="end"
                >
                  자세히 보기
                </Button>
              </Card>
            </Col>
          ))}
        </Row>

        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <Paragraph style={{ fontSize: '14px', color: '#64748B', margin: '0' }}>
            모든 요금제는 14일 무료 체험으로 시작할 수 있습니다. 신용카드 등록 불필요합니다.
          </Paragraph>
        </div>
      </div>
    </div>
  );
};

export default PricingPreview;