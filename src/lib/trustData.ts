/**
 * 아밤 신뢰도 시스템 (Trust Score System)
 * 
 * 2단계 설계:
 * - 신뢰 레벨이 검색 노출 순위에 영향
 * - 업소가 좋은 리뷰를 받으면 자동으로 레벨 상승
 * - 선순환 구조: 신뢰↑ → 노출↑ → 지원자↑ → 매출↑
 */

export type TrustLevel = 1 | 2 | 3 | 4;

export interface BusinessTrust {
  /** 사업체 ID (JobAd.id와 매핑) */
  businessId: string;
  /** 업소명 */
  businessName: string;
  /** 신뢰 레벨 1-4 */
  level: TrustLevel;
  /** 종합 평점 (1.0~5.0) */
  avgRating: number;
  /** 총 리뷰 수 */
  reviewCount: number;
  /** 가입일 */
  joinedAt: string;
  /** 신원 인증 여부 */
  identityVerified: boolean;
  /** 계좌 인증 여부 */
  bankVerified: boolean;
  /** 사업자 등록 인증 여부 */
  bizVerified: boolean;
  /** 연락 응답률 (0~100%) */
  responseRate: number;
  /** 평균 응답 시간 (분) */
  avgResponseMin: number;
  /** 총 채용 성공 수 */
  hiredCount: number;
  /** 재취업 의향 비율 (리뷰어 중 재취업 의향 있는 비율) */
  returnRate: number;
}

export interface TrustBadgeConfig {
  level: TrustLevel;
  label: string;
  emoji: string;
  color: string;
  gradientFrom: string;
  gradientTo: string;
  glowColor: string;
  description: string;
  requirements: string[];
}

export const TRUST_BADGE_CONFIGS: Record<TrustLevel, TrustBadgeConfig> = {
  1: {
    level: 1,
    label: '등록 업소',
    emoji: '🔵',
    color: '#3b82f6',
    gradientFrom: '#3b82f6',
    gradientTo: '#1d4ed8',
    glowColor: 'rgba(59,130,246,0.4)',
    description: '아밤에 등록된 업소입니다.',
    requirements: ['기본 정보 등록'],
  },
  2: {
    level: 2,
    label: '검증 업소',
    emoji: '🥈',
    color: '#6b7280',
    gradientFrom: '#9ca3af',
    gradientTo: '#4b5563',
    glowColor: 'rgba(156,163,175,0.5)',
    description: '신원 인증을 완료한 신뢰 업소입니다.',
    requirements: ['신원 인증', '3개월 이상 활동', '리뷰 3개 이상'],
  },
  3: {
    level: 3,
    label: '우수 업소',
    emoji: '🥇',
    color: '#d97706',
    gradientFrom: '#fbbf24',
    gradientTo: '#d97706',
    glowColor: 'rgba(251,191,36,0.5)',
    description: '높은 평점의 검증된 우수 업소입니다.',
    requirements: ['사업자 등록 인증', '6개월 이상 활동', '평점 3.5이상', '응답률 80%이상'],
  },
  4: {
    level: 4,
    label: '최우수 업소',
    emoji: '💎',
    color: '#7c3aed',
    gradientFrom: '#a78bfa',
    gradientTo: '#7c3aed',
    glowColor: 'rgba(167,139,250,0.6)',
    description: '아밤이 인정한 최고 신뢰 업소입니다. 모든 인증 완료 + 최고 평점.',
    requirements: ['모든 인증 완료', '12개월 이상 활동', '평점 4.5이상', '응답률 90%이상', '재취업률 70%이상'],
  },
};

/** 신뢰 점수 계산 함수 */
export function calculateTrustLevel(trust: Partial<BusinessTrust>): TrustLevel {
  let score = 0;

  // 평점 (최대 100점)
  const rating = trust.avgRating ?? 0;
  const reviewCount = trust.reviewCount ?? 0;
  if (reviewCount >= 3) score += rating * 20;

  // 활동 기간 (최대 48점)
  const joinedAt = trust.joinedAt ?? new Date().toISOString();
  const months = (Date.now() - new Date(joinedAt).getTime()) / (30 * 86400000);
  score += Math.min(months, 24) * 2;

  // 인증 여부
  if (trust.identityVerified) score += 20;
  if (trust.bankVerified) score += 15;
  if (trust.bizVerified) score += 25;

  // 응답률 (최대 20점)
  score += ((trust.responseRate ?? 0) / 100) * 20;

  // 재취업률 (최대 20점)
  score += ((trust.returnRate ?? 0) / 100) * 20;

  if (score >= 160) return 4;
  if (score >= 100) return 3;
  if (score >= 45) return 2;
  return 1;
}

/** Mock 업소 신뢰 데이터 */
export const mockBusinessTrust: BusinessTrust[] = [
  {
    businessId: 'biz-001',
    businessName: '로즈 모던바',
    level: 4,
    avgRating: 4.7,
    reviewCount: 34,
    joinedAt: '2023-01-15T00:00:00Z',
    identityVerified: true,
    bankVerified: true,
    bizVerified: true,
    responseRate: 97,
    avgResponseMin: 8,
    hiredCount: 128,
    returnRate: 82,
  },
  {
    businessId: 'biz-002',
    businessName: '세인트 클럽',
    level: 4,
    avgRating: 4.5,
    reviewCount: 28,
    joinedAt: '2023-03-20T00:00:00Z',
    identityVerified: true,
    bankVerified: true,
    bizVerified: true,
    responseRate: 91,
    avgResponseMin: 12,
    hiredCount: 96,
    returnRate: 74,
  },
  {
    businessId: 'biz-003',
    businessName: '스타 클럽',
    level: 3,
    avgRating: 4.1,
    reviewCount: 17,
    joinedAt: '2023-08-10T00:00:00Z',
    identityVerified: true,
    bankVerified: true,
    bizVerified: false,
    responseRate: 84,
    avgResponseMin: 25,
    hiredCount: 52,
    returnRate: 61,
  },
  {
    businessId: 'biz-004',
    businessName: '오션 비즈니스',
    level: 3,
    avgRating: 3.9,
    reviewCount: 12,
    joinedAt: '2023-10-05T00:00:00Z',
    identityVerified: true,
    bankVerified: false,
    bizVerified: false,
    responseRate: 78,
    avgResponseMin: 35,
    hiredCount: 38,
    returnRate: 55,
  },
  {
    businessId: 'biz-005',
    businessName: '엔젤 서츠룸',
    level: 2,
    avgRating: 3.5,
    reviewCount: 7,
    joinedAt: '2024-02-18T00:00:00Z',
    identityVerified: true,
    bankVerified: false,
    bizVerified: false,
    responseRate: 65,
    avgResponseMin: 60,
    hiredCount: 22,
    returnRate: 40,
  },
  {
    businessId: 'biz-006',
    businessName: '체리 룸클럽',
    level: 2,
    avgRating: 3.3,
    reviewCount: 5,
    joinedAt: '2024-04-01T00:00:00Z',
    identityVerified: true,
    bankVerified: false,
    bizVerified: false,
    responseRate: 58,
    avgResponseMin: 90,
    hiredCount: 14,
    returnRate: 35,
  },
  {
    businessId: 'biz-007',
    businessName: '로즈 하이퍼블릭',
    level: 1,
    avgRating: 0,
    reviewCount: 0,
    joinedAt: '2024-11-15T00:00:00Z',
    identityVerified: false,
    bankVerified: false,
    bizVerified: false,
    responseRate: 30,
    avgResponseMin: 180,
    hiredCount: 3,
    returnRate: 0,
  },
];

/** 업소명으로 신뢰 데이터 검색 (부분 일치) */
export function getTrustByName(name: string): BusinessTrust | undefined {
  return mockBusinessTrust.find(b => name.includes(b.businessName) || b.businessName.includes(name));
}

/** businessId로 신뢰 레벨만 빠르게 조회 (기본 level 1) */
export function getTrustLevel(businessId: string): TrustLevel {
  return mockBusinessTrust.find(b => b.businessId === businessId)?.level ?? 1;
}
