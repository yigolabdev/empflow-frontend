import React from 'react';
import { Button, Row, Col, Space, Typography } from 'antd';
import { ArrowRightOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title, Paragraph, Text } = Typography;

const HeroSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        background: 'linear-gradient(135deg, #1E3A8A 0%, #0EA5E9 100%)',
        color: '#FFFFFF',
        padding: '80px 40px',
        minHeight: '600px',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background decorative elements */}
      <div
        style={{
          position: 'absolute',
          top: '-100px',
          right: '-100px',
          width: '400px',
          height: '400px',
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '50%',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-50px',
          left: '-50px',
          width: '300px',
          height: '300px',
          backgroundColor: 'rgba(255, 255, 255, 0.03)',
          borderRadius: '50%',
        }}
      />

      <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
        <Row gutter={[40, 40]} align="middle" justify="space-between">
          <Col xs={24} sm={24} md={14} lg={14}>
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
              <div>
                <Text style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.8)', fontWeight: 500, letterSpacing: '0.5px' }}>
                  ✨ EmpFlow - 엔터프라이즈 직원 관리 플랫폼
                </Text>
              </div>

              <Title
                level={1}
                style={{
                  fontSize: '48px',
                  fontWeight: 700,
                  margin: '0',
                  color: '#FFFFFF',
                  lineHeight: '1.2',
                }}
              >
                복잡한 인사 관리를
                <br />
                명확하고 안전하게 통합하세요
              </Title>

              <Paragraph
                style={{
                  fontSize: '18px',
                  color: 'rgba(255, 255, 255, 0.9)',
                  margin: '20px 0',
                  fontWeight: 400,
                  lineHeight: '1.6',
                }}
              >
                행정 업무 70% 감소, HR 생산성 3배 향상. 마이크로서비스 기술과 AES-256 암호화 기반의 안전한 직원 관리 시스템으로 중소·중견기업의 HR 디지털 전환을 주도하세요.
              </Paragraph>

              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginTop: '32px' }}>
                <Space>
                  <CheckCircleOutlined style={{ fontSize: '16px', color: '#10B981' }} />
                  <span style={{ color: 'rgba(255, 255, 255, 0.9)' }}>실시간 근태 관리</span>
                </Space>
                <Space>
                  <CheckCircleOutlined style={{ fontSize: '16px', color: '#10B981' }} />
                  <span style={{ color: 'rgba(255, 255, 255, 0.9)' }}>통합 휴가 워크플로우</span>
                </Space>
                <Space>
                  <CheckCircleOutlined style={{ fontSize: '16px', color: '#10B981' }} />
                  <span style={{ color: 'rgba(255, 255, 255, 0.9)' }}>AI 급여 계산</span>
                </Space>
              </div>

              <Space size="large" style={{ marginTop: '40px' }}>
                <Button
                  type="primary"
                  size="large"
                  style={{
                    backgroundColor: '#10B981',
                    borderColor: '#10B981',
                    fontSize: '16px',
                    fontWeight: 600,
                    padding: '24px 32px',
                    height: 'auto',
                  }}
                  onClick={() => navigate('/signup')}
                  icon={<ArrowRightOutlined />}
                  iconPosition="end"
                >
                  무료 체험 시작하기
                </Button>
                <Button
                  size="large"
                  style={{
                    backgroundColor: 'transparent',
                    color: '#FFFFFF',
                    borderColor: '#FFFFFF',
                    fontSize: '16px',
                    fontWeight: 600,
                    padding: '24px 32px',
                    height: 'auto',
                  }}
                  onClick={() => navigate('/pricing')}
                >
                  데모 예약하기
                </Button>
              </Space>
            </Space>
          </Col>

          <Col xs={24} sm={24} md={10} lg={10}>
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                borderRadius: '16px',
                padding: '40px 32px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                minHeight: '400px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '120px', marginBottom: '20px', opacity: 0.8 }}>📊</div>
              <Title level={3} style={{ color: '#FFFFFF', marginBottom: '16px' }}>
                실시간 데이터 대시보드
              </Title>
              <Paragraph style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '14px', margin: 0 }}>
                한눈에 파악하는 조직 인사이트
              </Paragraph>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default HeroSection;