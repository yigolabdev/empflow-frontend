import React from 'react';
import { Card, Row, Col, Typography, Space, Statistic } from 'antd';
import {
  TeamOutlined,
  FieldTimeOutlined,
  CreditCardOutlined,
  BarChartOutlined,
  LockOutlined,
  ApiOutlined,
} from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;

const features = [
  {
    icon: <TeamOutlined style={{ fontSize: '40px', color: '#0EA5E9' }} />,
    title: '역할 기반 접근제어 (RBAC)',
    description: '직원, 팀, 부서별로 세분화된 권한 관리로 데이터 보안과 투명성 확보',
  },
  {
    icon: <FieldTimeOutlined style={{ fontSize: '40px', color: '#0EA5E9' }} />,
    title: '실시간 근태 관리',
    description: '출퇴근, 휴가, 야근을 실시간으로 추적하고 자동 통계 생성',
  },
  {
    icon: <CreditCardOutlined style={{ fontSize: '40px', color: '#0EA5E9' }} />,
    title: 'AI 기반 급여 계산',
    description: '세금, 보험료, 상여금 등을 자동 계산하고 예측 급여 제공',
  },
  {
    icon: <BarChartOutlined style={{ fontSize: '40px', color: '#0EA5E9' }} />,
    title: '고급 분석 대시보드',
    description: '조직 성과, 이직률, 급여 추이 등을 시각적으로 분석',
  },
  {
    icon: <LockOutlined style={{ fontSize: '40px', color: '#0EA5E9' }} />,
    title: 'AES-256 암호화 & 감사 추적',
    description: '블록체인 기반 감사 로그로 모든 데이터 변경 사항 추적 및 컴플라이언스 보장',
  },
  {
    icon: <ApiOutlined style={{ fontSize: '40px', color: '#0EA5E9' }} />,
    title: 'API 마켓플레이스',
    description: '외부 시스템과의 연동으로 기업 운영 프로세스 통합',
  },
];

const FeatureHighlights: React.FC = () => {
  return (
    <div style={{ padding: '80px 40px', backgroundColor: '#F8FAFC' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <Title level={2} style={{ fontSize: '36px', fontWeight: 700, color: '#1E293B', margin: '0 0 16px 0' }}>
            핵심 기능
          </Title>
          <Paragraph style={{ fontSize: '16px', color: '#64748B', maxWidth: '600px', margin: '0 auto' }}>
            EmpFlow는 HR 담당자와 경영진을 위한 완전한 직원 관리 솔루션입니다
          </Paragraph>
        </div>

        <Row gutter={[24, 24]}>
          {features.map((feature, index) => (
            <Col key={index} xs={24} sm={12} md={8}>
              <Card
                style={{
                  height: '100%',
                  border: '1px solid #E2E8F0',
                  borderRadius: '12px',
                  backgroundColor: '#FFFFFF',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                }}
                hoverable
                bodyStyle={{ padding: '32px 24px' }}
              >
                <Space direction="vertical" size="large" style={{ width: '100%' }}>
                  <div>{feature.icon}</div>
                  <Title level={4} style={{ color: '#1E293B', margin: '0', fontSize: '18px', fontWeight: 600 }}>
                    {feature.title}
                  </Title>
                  <Paragraph style={{ color: '#64748B', margin: '0', fontSize: '14px', lineHeight: '1.6' }}>
                    {feature.description}
                  </Paragraph>
                </Space>
              </Card>
            </Col>
          ))}
        </Row>

        <Row gutter={[32, 32]} style={{ marginTop: '60px' }}>
          <Col xs={24} sm={8} md={8}>
            <Card
              style={{
                border: '1px solid #E2E8F0',
                borderRadius: '12px',
                backgroundColor: '#FFFFFF',
              }}
              bodyStyle={{ textAlign: 'center', padding: '24px' }}
            >
              <Statistic
                title="행정 업무 감소"
                value={70}
                suffix="%"
                valueStyle={{ color: '#10B981', fontSize: '32px', fontWeight: 700 }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={8} md={8}>
            <Card
              style={{
                border: '1px solid #E2E8F0',
                borderRadius: '12px',
                backgroundColor: '#FFFFFF',
              }}
              bodyStyle={{ textAlign: 'center', padding: '24px' }}
            >
              <Statistic
                title="HR 생산성 향상"
                value={3}
                suffix="배"
                valueStyle={{ color: '#10B981', fontSize: '32px', fontWeight: 700 }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={8} md={8}>
            <Card
              style={{
                border: '1px solid #E2E8F0',
                borderRadius: '12px',
                backgroundColor: '#FFFFFF',
              }}
              bodyStyle={{ textAlign: 'center', padding: '24px' }}
            >
              <Statistic
                title="3개월 내 ROI 체감"
                value="100%">
                valueStyle={{ color: '#10B981', fontSize: '32px', fontWeight: 700 }}
              </Statistic>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default FeatureHighlights;