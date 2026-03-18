export interface Addon {
  name: string;
  price: number;
}

export interface PricingTier {
  id: string;
  name: string;
  description: string;
  priceMonthly: number;
  apiCallsIncluded: number;
  maxUsers: number | null;
  features: string[];
  addons?: Addon[];
}

export interface FeatureItem {
  id: string;
  name: string;
  category: '필수' | '고급' | '엔터프라이즈';
  tooltip?: string;
  support: {
    [key: string]: boolean | string;
  };
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
  details?: string[];
}

export const pricingTiers: PricingTier[] = [
  {
    id: 'starter',
    name: '스타터',
    description: '소규모 팀을 위한 기본 기능',
    priceMonthly: 49000,
    apiCallsIncluded: 10000,
    maxUsers: 50,
    features: [
      '최대 50명 직원 관리',
      '기본 근태 관리',
      '휴가 신청 및 승인',
      '기본 급여 계산',
      '5개 계정까지 사용자 추가',
      '이메일 지원',
      '월간 데이터 백업',
      'API 기본 액세스',
    ],
    addons: [
      { name: '추가 사용자 (1명당)', price: 5000 },
      { name: '프리미엄 지원', price: 100000 },
    ],
  },
  {
    id: 'standard',
    name: '스탠다드',
    description: '성장하는 기업을 위한 핵심 기능',
    priceMonthly: 99000,
    apiCallsIncluded: 50000,
    maxUsers: 250,
    features: [
      '최대 250명 직원 관리',
      '실시간 근태 추적',
      '고급 휴가 관리 워크플로우',
      'AI 기반 급여 계산',
      '무제한 사용자 추가',
      '우선 이메일 지원',
      '일일 자동 백업',
      '향상된 API 액세스',
      '기본 분석 대시보드',
      '역할 기반 접근제어 (RBAC)',
    ],
    addons: [
      { name: '프리미엄 분석', price: 150000 },
      { name: '고급 보안 기능', price: 200000 },
    ],
  },
  {
    id: 'premium',
    name: '프리미엄',
    description: '대규모 기업을 위한 종합 솔루션',
    priceMonthly: 199000,
    apiCallsIncluded: 200000,
    maxUsers: 1000,
    features: [
      '최대 1,000명 직원 관리',
      '완벽한 근태 관리 시스템',
      '고급 휴가 및 승인 워크플로우',
      'AI 기반 급여 예측 및 계산',
      '모든 고급 기능 포함',
      '24/7 전화 지원',
      '실시간 데이터 동기화',
      '무제한 API 액세스',
      '고급 분석 및 AI 인사이트',
      '통합 컴플라이언스 모니터링',
      'SSO 및 보안 기능',
      '데이터 거버넌스',
    ],
    addons: [
      { name: '맞춤형 통합', price: 500000 },
      { name: '전담 계정 관리자', price: 1000000 },
    ],
  },
  {
    id: 'enterprise',
    name: '엔터프라이즈',
    description: '매우 큰 조직을 위한 커스텀 솔루션',
    priceMonthly: 0,
    apiCallsIncluded: Infinity,
    maxUsers: null,
    features: [
      '무제한 직원 관리',
      '모든 기능 포함',
      '커스텀 개발 지원',
      '전담 지원 팀',
      '온프레미스 배포 옵션',
      'SLA 보장',
      '블록체인 기반 감사 로그',
      'AES-256 암호화',
      'PII 마스킹',
      'API 마켓플레이스 액세스',
      '무제한 통합',
      'HIPAA & GDPR 준수',
    ],
  },
];

export const featuresList: FeatureItem[] = [
  // 필수 기능
  {
    id: 'employee-mgmt',
    name: '직원 정보 관리',
    category: '필수',
    tooltip: '직원 기본 정보, 급여, 직급 등을 관리합니다.',
    support: {
      starter: '최대 50명',
      standard: '최대 250명',
      premium: '최대 1,000명',
      enterprise: '무제한',
    },
  },
  {
    id: 'attendance',
    name: '근태 관리',
    category: '필수',
    tooltip: '출퇴근 시간, 휴무, 결근 등을 기록합니다.',
    support: {
      starter: true,
      standard: true,
      premium: true,
      enterprise: true,
    },
  },
  {
    id: 'leave-mgmt',
    name: '휴가 관리',
    category: '필수',
    tooltip: '휴가 신청, 승인, 잔여 일수 관리 등을 처리합니다.',
    support: {
      starter: true,
      standard: true,
      premium: true,
      enterprise: true,
    },
  },
  {
    id: 'payroll',
    name: '급여 계산',
    category: '필수',
    tooltip: 'AI 기반 급여 자동 계산 및 지급 관리',
    support: {
      starter: '기본',
      standard: 'AI 기반',
      premium: 'AI 기반',
      enterprise: 'AI 기반',
    },
  },
  {
    id: 'dashboard',
    name: '대시보드',
    category: '필수',
    tooltip: '주요 메트릭과 통계를 시각화합니다.',
    support: {
      starter: '기본',
      standard: '기본',
      premium: '고급',
      enterprise: '고급',
    },
  },
  // 고급 기능
  {
    id: 'analytics',
    name: '고급 분석',
    category: '고급',
    tooltip: 'AI 기반 인사이트 및 예측 분석',
    support: {
      starter: false,
      standard: '기본',
      premium: true,
      enterprise: true,
    },
  },
  {
    id: 'api-access',
    name: 'API 액세스',
    category: '고급',
    tooltip: '외부 시스템 연동을 위한 REST API',
    support: {
      starter: '10K 호출/월',
      standard: '50K 호출/월',
      premium: '200K 호출/월',
      enterprise: '무제한',
    },
  },
  {
    id: 'rbac',
    name: '역할 기반 접근제어',
    category: '고급',
    tooltip: '사용자 역할별 권한 세분화',
    support: {
      starter: false,
      standard: true,
      premium: true,
      enterprise: true,
    },
  },
  {
    id: 'mobile-app',
    name: '모바일 앱',
    category: '고급',
    tooltip: 'iOS/Android 모바일 애플리케이션',
    support: {
      starter: true,
      standard: true,
      premium: true,
      enterprise: true,
    },
  },
  {
    id: 'integration',
    name: '타사 통합',
    category: '고급',
    tooltip: 'Slack, Google Workspace 등과의 통합',
    support: {
      starter: '기본 (5개)',
      standard: '무제한',
      premium: '무제한',
      enterprise: '무제한',
    },
  },
  // 엔터프라이즈 기능
  {
    id: 'sso',
    name: 'SSO & 2FA',
    category: '엔터프라이즈',
    tooltip: '싱글 사인온 및 2단계 인증',
    support: {
      starter: false,
      standard: false,
      premium: true,
      enterprise: true,
    },
  },
  {
    id: 'audit-log',
    name: '감사 로그',
    category: '엔터프라이즈',
    tooltip: '모든 작업의 상세 기록 및 추적',
    support: {
      starter: false,
      standard: false,
      premium: true,
      enterprise: true,
    },
  },
  {
    id: 'encryption',
    name: 'AES-256 암호화',
    category: '엔터프라이즈',
    tooltip: '데이터 전송 및 저장 시 최고 수준 암호화',
    support: {
      starter: false,
      standard: false,
      premium: true,
      enterprise: true,
    },
  },
  {
    id: 'compliance',
    name: '컴플라이언스 (GDPR, HIPAA)',
    category: '엔터프라이즈',
    tooltip: '국제 규제 준수',
    support: {
      starter: false,
      standard: false,
      premium: false,
      enterprise: true,
    },
  },
  {
    id: 'api-marketplace',
    name: 'API 마켓플레이스',
    category: '엔터프라이즈',
    tooltip: '확장 가능한 플러그인 및 앱',
    support: {
      starter: false,
      standard: false,
      premium: false,
      enterprise: true,
    },
  },
  {
    id: 'blockchain',
    name: '블록체인 감사 추적',
    category: '엔터프라이즈',
    tooltip: '변조 불가능한 감사 로그',
    support: {
      starter: false,
      standard: false,
      premium: false,
      enterprise: true,
    },
  },
  {
    id: 'support',
    name: '고객 지원',
    category: '필수',
    tooltip: '기술 지원 및 온보딩 서비스',
    support: {
      starter: '이메일',
      standard: '이메일 & 채팅',
      premium: '24/7 전화',
      enterprise: '전담팀',
    },
  },
  {
    id: 'backup',
    name: '데이터 백업',
    category: '필수',
    tooltip: '정기적인 자동 백업',
    support: {
      starter: '월간',
      standard: '일일',
      premium: '실시간',
      enterprise: '실시간',
    },
  },
  {
    id: 'sla',
    name: 'SLA 보장',
    category: '엔터프라이즈',
    tooltip: '서비스 수준 협약 (99.9% 가용성)',
    support: {
      starter: false,
      standard: false,
      premium: false,
      enterprise: true,
    },
  },
];

export const faqItems: FAQItem[] = [
  {
    id: 'faq-1',
    question: '무료 체험 기간이 있나요?',
    answer: '네, 모든 플랜에 대해 신용카드 없이 14일 무료 체험을 제공합니다. 체험 기간 종료 후 자동으로 청구되지 않으며, 언제든지 취소할 수 있습니다.',
    category: '일반',
  },
  {
    id: 'faq-2',
    question: '언제든지 플랜을 변경할 수 있나요?',
    answer: '네, 월간 청구를 받는 경우 언제든지 플랜을 업그레이드하거나 다운그레이드할 수 있습니다. 변경 사항은 즉시 적용됩니다.',
    category: '청구',
    details: [
      '업그레이드 시 차액에 대한 비례 배분 청구가 발생합니다.',
      '다운그레이드 시 환불이나 크레딧으로 처리됩니다.',
    ],
  },
  {
    id: 'faq-3',
    question: 'API 호출 한도를 초과하면 어떻게 되나요?',
    answer: 'API 호출을 초과할 경우, 초과분에 대해 호출당 1원이 청구됩니다. 예측 불가능한 비용을 피하기 위해 요금제 전환이나 API 호출 제한 설정을 권장합니다.',
    category: 'API',
  },
  {
    id: 'faq-4',
    question: 'EmpFlow에서 데이터 보안은 어떻게 보장되나요?',
    answer: 'EmpFlow는 업계 최고의 보안 기준을 준수합니다. 모든 민감한 데이터는 AES-256 암호화로 보호되며, PII(개인식별정보)는 마스킹 처리됩니다. 프리미엄 플랜 이상에서는 블록체인 기반의 감사 추적이 제공됩니다.',
    category: '보안',
    details: [
      'ISO 27001 인증',
      '정기적인 보안 감사',
      '자동 데이터 암호화',
    ],
  },
  {
    id: 'faq-5',
    question: '기존 HR 시스템에서 데이터를 마이그레이션할 수 있나요?',
    answer: '네, EmpFlow는 다양한 형식의 데이터 마이그레이션을 지원합니다. 스탠다드 플랜 이상에서는 전담 지원팀이 마이그레이션 프로세스를 지원합니다.',
    category: '통합',
  },
  {
    id: 'faq-6',
    question: '모바일 앱은 별도 비용이 드나요?',
    answer: '아니요, 모바일 앱은 모든 플랜에 포함되어 있습니다. iOS 및 Android 모두 무료로 이용할 수 있습니다.',
    category: '기능',
  },
  {
    id: 'faq-7',
    question: '엔터프라이즈 플랜의 가격은 어떻게 결정되나요?',
    answer: '엔터프라이즈 플랜의 가격은 귀사의 요구사항에 따라 맞춤식으로 책정됩니다. 직원 수, 필요한 API 호출, 원하는 통합 등을 고려하여 산정합니다. 영업팀에 문의하여 상세한 견적을 받으실 수 있습니다.',
    category: '가격',
  },
  {
    id: 'faq-8',
    question: 'ROI는 어느 정도 기대할 수 있나요?',
    answer: 'EmpFlow 사용자들은 평균적으로 행정 업무 70% 감소, HR 생산성 3배 향상을 경험합니다. 이는 초기 3개월 내에 체감할 수 있으며, 연간 약 300만원 이상의 비용 절감 효과가 있습니다.',
    category: '일반',
  },
  {
    id: 'faq-9',
    question: '연간 청구 시 할인이 얼마나 되나요?',
    answer: '연간 청구를 선택하면 월간 청구 가격 대비 10% 할인이 적용됩니다. 예를 들어, 월 99,000원인 스탠다드 플랜은 연 1,070,280원(월 89,190원 상당)이 됩니다.',
    category: '청구',
  },
  {
    id: 'faq-10',
    question: '계약을 언제든 취소할 수 있나요?',
    answer: '네, 언제든지 구독을 취소할 수 있습니다. 월간 청구 고객의 경우 언제든 취소 가능하며, 취소 후 남은 기간에 대한 환불을 받을 수 있습니다.',
    category: '청구',
  },
];