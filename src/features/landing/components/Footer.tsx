import React from 'react';
import { Row, Col, Typography, Space, Divider, Button } from 'antd';
import { LinkedinOutlined, TwitterOutlined, GithubOutlined, MailOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title, Paragraph, Text } = Typography;

const Footer: React.FC = () => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: '제품',
      links: [
        { label: '기능', href: '#features' },
        { label: '가격', href: '/pricing' },
        { label: 'ROI 계산기', href: '#roi' },
        { label: 'API 마켓플레이스', href: '#api' },
      ],
    },
    {
      title: '회사',
      links: [
        { label: '블로그', href: '#blog' },
        { label: '커리어', href: '#careers' },
        { label: '뉴스', href: '#news' },
        { label: '문의', href: '#contact' },
      ],
    },
    {
      title: '리소스',
      links: [
        { label: '문서', href: '#docs' },
        { label: '튜토리얼', href: '#tutorials' },
        { label: '커뮤니티', href: '#community' },
        { label: '지원', href: '#support' },
      ],
    },
    {
      title: '법률',
      links: [
        { label: '개인정보 보호정책', href: '#privacy' },
        { label: '이용약관', href: '#terms' },
        { label: '보안 정책', href: '#security' },
        { label: '쿠키 정책', href: '#cookies' },
      ],
    },
  ];

  return (
    <footer style={{ backgroundColor: '#1E3A8A', color: '#FFFFFF', padding: '60px 40px 20px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <Row gutter={[40, 60]}>
          {/* Brand Section */}
          <Col xs={24} sm={12} md={6}>
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
              <div>
                <Title level={4} style={{ color: '#FFFFFF', margin: '0', fontSize: '20px', fontWeight: 700 }}>
                  EmpFlow
                </Title>
                <Text style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '12px' }}>
                  엔터프라이즈 직원 관리 플랫폼
                </Text>
              </div>
              <Paragraph style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '13px', margin: '0', lineHeight: '1.6' }}>
                복잡한 인사 관리의 모든 것을 명확하고 안전하게 통합합니다.
              </Paragraph>
              <Space size="large">
                <Button
                  type="text"
                  icon={<LinkedinOutlined style={{ fontSize: '18px' }} />}
                  style={{ color: '#FFFFFF' }}
                />
                <Button
                  type="text"
                  icon={<TwitterOutlined style={{ fontSize: '18px' }} />}
                  style={{ color: '#FFFFFF' }}
                />
                <Button
                  type="text"
                  icon={<GithubOutlined style={{ fontSize: '18px' }} />}
                  style={{ color: '#FFFFFF' }}
                />
                <Button
                  type="text"
                  icon={<MailOutlined style={{ fontSize: '18px' }} />}
                  style={{ color: '#FFFFFF' }}
                />
              </Space>
            </Space>
          </Col>

          {/* Links Sections */}
          {footerLinks.map((section, index) => (
            <Col key={index} xs={24} sm={12} md={4.5}>
              <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                <Title level={5} style={{ color: '#FFFFFF', margin: '0', fontSize: '14px', fontWeight: 600 }}>
                  {section.title}
                </Title>
                <Space direction="vertical" size={8} style={{ width: '100%' }}>
                  {section.links.map((link, linkIndex) => (
                    <a
                      key={linkIndex}
                      href={link.href}
                      style={{
                        color: 'rgba(255, 255, 255, 0.7)',
                        fontSize: '13px',
                        textDecoration: 'none',
                        transition: 'all 0.3s ease',
                        display: 'block',
                      }}
                      onMouseEnter={(e) => {
                        (e.target as HTMLAnchorElement).style.color = '#FFFFFF';
                      }}
                      onMouseLeave={(e) => {
                        (e.target as HTMLAnchorElement).style.color = 'rgba(255, 255, 255, 0.7)';
                      }}
                    >
                      {link.label}
                    </a>
                  ))}
                </Space>
              </Space>
            </Col>
          ))}
        </Row>

        <Divider style={{ borderColor: 'rgba(255, 255, 255, 0.1)', margin: '40px 0' }} />

        {/* Bottom Section */}
        <Row gutter={[20, 20]} justify="space-between" align="middle">
          <Col xs={24} sm={12}>
            <Text style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '12px' }}>
              © {currentYear} EmpFlow, Inc. 모든 권리 보유됩니다.
            </Text>
          </Col>
          <Col xs={24} sm={12}>
            <div style={{ textAlign: 'right' }}>
              <Space>
                <Text style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '12px' }}>
                  Made with ❤️ for HR professionals
                </Text>
              </Space>
            </div>
          </Col>
        </Row>
      </div>
    </footer>
  );
};

export default Footer;