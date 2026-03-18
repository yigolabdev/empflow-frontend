import React from 'react';
import { Button, Row, Col, Typography, Space } from 'antd';
import { ArrowRightOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title, Paragraph } = Typography;

const CTABanner: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        background: 'linear-gradient(135deg, #1E3A8A 0%, #0EA5E9 100%)',
        padding: '80px 40px',
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
          width: '300px',
          height: '300px',
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '50%',
        }}
      />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '1200px', margin: '0 auto' }}>
        <Row gutter={[40, 40]} align="middle" justify="center">
          <Col xs={24} sm={24} md={16} lg={16}>
            <Space direction="vertical" size="large" style={{ width: '100%', textAlign: 'center' }}>
              <Title
                level={2}
                style={{
                  fontSize: '40px',
                  fontWeight: 700,
                  margin: '0',
                  color: '#FFFFFF',
                  lineHeight: '1.2',
                }}
              >
                이제 EmpFlow와 함께
                <br />
                HR 디지털 전환을 시작하세요
              </Title>

              <Paragraph
                style={{
                  fontSize: '16px',
                  color: 'rgba(255, 255, 255, 0.9)',
                  margin: '0',
                  maxWidth: '600px',
                  lineHeight: '1.6',
                }}
              >
                3개월 내 ROI 회수와 70% 행정 업무 감소를 경험하세요. 14일 무료 체험으로 시작합니다.
              </Paragraph>

              <Space size="large" style={{ marginTop: '24px', justifyContent: 'center', width: '100%' }}>
                <Space>
                  <CheckCircleOutlined style={{ fontSize: '16px', color: '#10B981' }} />
                  <span style={{ color: 'rgba(255, 255, 255, 0.9)' }}>신용카드 불필요</span>
                </Space>
                <Space>
                  <CheckCircleOutlined style={{ fontSize: '16px', color: '#10B981' }} />
                  <span style={{ color: 'rgba(255, 255, 255, 0.9)' }}>14일 무료 체험</span>
                </Space>
                <Space>
                  <CheckCircleOutlined style={{ fontSize: '16px', color: '#10B981' }} />
                  <span style={{ color: 'rgba(255, 255, 255, 0.9)' }}>즉시 개시</span>
                </Space>
              </Space>

              <Space size="large" style={{ marginTop: '32px', justifyContent: 'center', width: '100%' }}>
                <Button
                  type="primary"
                  size="large"
                  style={{
                    backgroundColor: '#10B981',
                    borderColor: '#10B981',
                    fontSize: '16px',
                    fontWeight: 600,
                    padding: '24px 40px',
                    height: 'auto',
                  }}
                  onClick={() => navigate('/signup')}
                  icon={<ArrowRightOutlined />}
                  iconPosition="end"
                >
                  지금 시작하기
                </Button>
                <Button
                  size="large"
                  style={{
                    backgroundColor: 'transparent',
                    color: '#FFFFFF',
                    borderColor: '#FFFFFF',
                    fontSize: '16px',
                    fontWeight: 600,
                    padding: '24px 40px',
                    height: 'auto',
                  }}
                  onClick={() => navigate('/pricing')}
                >
                  가격 보기
                </Button>
              </Space>
            </Space>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default CTABanner;