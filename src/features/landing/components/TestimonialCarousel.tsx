import React, { useState } from 'react';
import { Card, Row, Col, Typography, Space, Avatar, Button } from 'antd';
import { LeftOutlined, RightOutlined, StarFilled } from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;

const testimonials = [
  {
    name: '이영준',
    position: 'HR 담당자',
    company: '(주)테크스타트업',
    avatar: '👨‍💼',
    content: '수작업으로 관리하던 급여, 휴가, 근태를 자동화하니 월 40시간이 절감되었습니다. EmpFlow는 정말 게임 체인저입니다.',
    rating: 5,
  },
  {
    name: '박지은',
    position: 'CFO',
    company: '(주)제조업체',
    avatar: '👩‍💼',
    content: '실시간 급여 계산과 분석 대시보드로 예산 편성이 훨씬 정확해졌습니다. 데이터 기반 의사결정이 가능해진 것이 가장 큰 성과입니다.',
    rating: 5,
  },
  {
    name: '김준호',
    position: 'CTO',
    company: '(주)서비스업',
    avatar: '👨‍💻',
    content: 'API 마켓플레이스 덕분에 우리 기존 시스템과 쉽게 연동할 수 있었습니다. 마이크로서비스 아키텍처도 인상적입니다.',
    rating: 5,
  },
  {
    name: '최민경',
    position: 'CEO',
    company: '(주)중견기업',
    avatar: '👩‍🔬',
    content: '3개월 만에 ROI를 회수했고, 보안 감사 추적 기능으로 컴플라이언스 리스크도 0으로 만들었습니다.',
    rating: 5,
  },
];

const TestimonialCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const visibleTestimonials = [
    testimonials[currentIndex],
    testimonials[(currentIndex + 1) % testimonials.length],
    testimonials[(currentIndex + 2) % testimonials.length],
  ];

  return (
    <div style={{ padding: '80px 40px', backgroundColor: '#F8FAFC' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <Title level={2} style={{ fontSize: '36px', fontWeight: 700, color: '#1E293B', margin: '0 0 16px 0' }}>
            고객 사례 및 평가
          </Title>
          <Paragraph style={{ fontSize: '16px', color: '#64748B', maxWidth: '600px', margin: '0 auto' }}>
            EmpFlow를 도입한 기업들이 느낀 실제 변화와 만족도
          </Paragraph>
        </div>

        <Row gutter={[24, 24]} align="stretch">
          {visibleTestimonials.map((testimonial, index) => (
            <Col key={index} xs={24} md={8}>
              <Card
                style={{
                  height: '100%',
                  border: '1px solid #E2E8F0',
                  borderRadius: '12px',
                  backgroundColor: '#FFFFFF',
                  boxShadow: index === 0 ? '0 8px 16px rgba(0, 0, 0, 0.1)' : '0 1px 3px rgba(0, 0, 0, 0.05)',
                  transition: 'all 0.3s ease',
                }}
                bodyStyle={{ padding: '32px 24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
              >
                <Space direction="vertical" size="large" style={{ width: '100%' }}>
                  <div>
                    <Space>
                      {Array(testimonial.rating)
                        .fill(0)
                        .map((_, i) => (
                          <StarFilled key={i} style={{ color: '#F59E0B', fontSize: '16px' }} />
                        ))}
                    </Space>
                  </div>

                  <Paragraph
                    style={{
                      fontSize: '14px',
                      color: '#64748B',
                      margin: '0',
                      lineHeight: '1.6',
                      fontStyle: 'italic',
                    }}
                  >
                    "{testimonial.content}"
                  </Paragraph>
                </Space>

                <div style={{ marginTop: '24px', paddingTop: '24px', borderTop: '1px solid #E2E8F0' }}>
                  <Space>
                    <Avatar style={{ backgroundColor: '#0EA5E9', fontSize: '20px' }}>{testimonial.avatar}</Avatar>
                    <div>
                      <Paragraph style={{ fontSize: '14px', fontWeight: 600, color: '#1E293B', margin: '0' }}>
                        {testimonial.name}
                      </Paragraph>
                      <Text style={{ fontSize: '12px', color: '#64748B' }}>
                        {testimonial.position} · {testimonial.company}
                      </Text>
                    </div>
                  </Space>
                </div>
              </Card>
            </Col>
          ))}
        </Row>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginTop: '40px' }}>
          <Button
            size="large"
            shape="circle"
            icon={<LeftOutlined />}
            onClick={handlePrevious}
            style={{
              borderColor: '#0EA5E9',
              color: '#0EA5E9',
              backgroundColor: '#F8FAFC',
            }}
          />
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {testimonials.map((_, index) => (
              <div
                key={index}
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor:
                    index === currentIndex
                      ? '#0EA5E9'
                      : index === (currentIndex + 1) % testimonials.length || index === (currentIndex + 2) % testimonials.length
                      ? '#CBD5E1'
                      : '#E2E8F0',
                  transition: 'all 0.3s ease',
                }}
              />
            ))}
          </div>
          <Button
            size="large"
            shape="circle"
            icon={<RightOutlined />}
            onClick={handleNext}
            style={{
              borderColor: '#0EA5E9',
              color: '#0EA5E9',
              backgroundColor: '#F8FAFC',
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default TestimonialCarousel;