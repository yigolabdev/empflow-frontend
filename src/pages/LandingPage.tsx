import React from 'react';
import { Button, Row, Col, Space } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import HeroSection from '@/features/landing/components/HeroSection';
import FeatureHighlights from '@/features/landing/components/FeatureHighlights';
import ROICalculator from '@/features/landing/components/ROICalculator';
import TestimonialCarousel from '@/features/landing/components/TestimonialCarousel';
import PricingPreview from '@/features/landing/components/PricingPreview';
import CTABanner from '@/features/landing/components/CTABanner';
import Footer from '@/features/landing/components/Footer';

const LandingPage: React.FC = () => {
  return (
    <div style={{ width: '100%', overflow: 'hidden' }}>
      <HeroSection />
      <FeatureHighlights />
      <ROICalculator />
      <TestimonialCarousel />
      <PricingPreview />
      <CTABanner />
      <Footer />
    </div>
  );
};

export default LandingPage;