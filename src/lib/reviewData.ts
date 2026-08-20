/**
 * 아밤 무기명 매장 리뷰 데이터 (Review System)
 * 
 * 2단계 설계:
 * - 단순 별점이 아닌 6개 차원 평가
 * - 검증 토큰: 실제 근무자만 아는 정보로 신뢰성 확보
 * - 도움이 됐어요 투표로 양질의 리뷰 상위 노출
 * - 시간 가중치: 최근 리뷰가 더 중요
 */

export type ReviewCategory =
  | 'modern_bar'     // 모던바
  | 'room_salon'     // 룸살롱
  | 'karaoke'        // 노래방
  | 'night_club'     // 나이트클럽
  | 'bar'            // 바/술집
  | 'other';         // 기타

export interface ReviewRatings {
  /** 급여 정확도 (약속한 급여가 실제로 지급됐는가) */
  payAccuracy: number;
  /** 근무 환경 (청결, 안전, 편의시설) */
  workEnv: number;
  /** 안전함 (귀가 안전, 불필요한 접촉 없음) */
  safety: number;
  /** 사장/관리자 태도 */
  ownerAttitude: number;
  /** 재취업 의향 (Would return) */
  wouldReturn: boolean;
}

export interface Review {
  id: string;
  businessId: string;
  businessName: string;
  /** 업종 */
  category: ReviewCategory;
  /** 근무 지역 (시/구까지만 표시) */
  workRegion: string;
  /** 종합 평점 */
  overallRating: number;
  /** 세부 항목 평점 */
  ratings: ReviewRatings;
  /** 리뷰 내용 (최소 50자) */
  content: string;
  /** 근무 기간 */
  workPeriod: '1일~1주' | '1주~1개월' | '1~3개월' | '3개월 이상';
  /** 익명 닉네임 (언니X호, 알바생X 형태) */
  anonymousId: string;
  /** 작성일 */
  createdAt: string;
  /** 도움이 됐어요 수 */
  helpfulCount: number;
  /** 검증 여부 (아밤 내부 검증) */
  verified: boolean;
  /** 태그 */
  tags: string[];
}

const makeAnon = (n: number) => `언니${n}호`;
const ago = (days: number) => new Date(Date.now() - days * 86400000).toISOString();

/** 샘플 리뷰 데이터 */
export const mockReviews: Review[] = [
  // 로즈 모던바 (biz-001) — 최우수 매장
  {
    id: 'rev-001', businessId: 'biz-001', businessName: '로즈 모던바',
    category: 'modern_bar', workRegion: '서울 관악구',
    overallRating: 5,
    ratings: { payAccuracy: 5, workEnv: 5, safety: 5, ownerAttitude: 4, wouldReturn: true },
    content: '급여 약속 정확하게 지켜주시고, 사장님 친절하세요. 다른 곳에서 경험한 것과 달리 야간 귀가도 알아서 챙겨주십니다. 처음 일하는 분들도 편하게 근무할 수 있어요. 근무 환경도 깔끔하고 손님들도 예의바른 편이에요.',
    workPeriod: '3개월 이상', anonymousId: makeAnon(142), createdAt: ago(5),
    helpfulCount: 48, verified: true, tags: ['급여정확', '친절', '안전귀가', '초보환영'],
  },
  {
    id: 'rev-002', businessId: 'biz-001', businessName: '로즈 모던바',
    category: 'modern_bar', workRegion: '서울 관악구',
    overallRating: 5,
    ratings: { payAccuracy: 5, workEnv: 4, safety: 5, ownerAttitude: 5, wouldReturn: true },
    content: '야간알바 처음인데 여기서 시작해서 다행이에요. 선생님들이 잘 알려주시고 분위기 좋아요. 급여도 정확하고 추가 비용 같은 거 전혀 없었어요. 앞으로도 계속 다닐 것 같아요. 위치도 지하철역 가까워서 편해요.',
    workPeriod: '1~3개월', anonymousId: makeAnon(87), createdAt: ago(14),
    helpfulCount: 31, verified: true, tags: ['분위기좋음', '교통편리', '믿음직'],
  },
  {
    id: 'rev-003', businessId: 'biz-001', businessName: '로즈 모던바',
    category: 'modern_bar', workRegion: '서울 관악구',
    overallRating: 4,
    ratings: { payAccuracy: 4, workEnv: 5, safety: 5, ownerAttitude: 4, wouldReturn: true },
    content: '전반적으로 만족스럽습니다. 시설이 깔끔하고 화장실 등 위생 관리도 잘 되어 있어요. 가끔 손님이 많을 때 힘들 수 있지만 그건 어딜 가도 마찬가지인 것 같고, 오히려 수입이 늘어서 좋더라구요.',
    workPeriod: '1~3개월', anonymousId: makeAnon(215), createdAt: ago(28),
    helpfulCount: 22, verified: true, tags: ['시설좋음', '위생'],
  },

  // 세인트 클럽 (biz-002)
  {
    id: 'rev-004', businessId: 'biz-002', businessName: '세인트 클럽',
    category: 'night_club', workRegion: '경기 일산동구',
    overallRating: 5,
    ratings: { payAccuracy: 5, workEnv: 4, safety: 5, ownerAttitude: 5, wouldReturn: true },
    content: '일한지 6개월째인데 계속 다니고 있어요. 매니저분이 항상 신경 써주시고 문제 생기면 바로 해결해주세요. 급여 늦은 적 한 번도 없고 약속된 금액 그대로 받았어요. 강력 추천합니다.',
    workPeriod: '3개월 이상', anonymousId: makeAnon(56), createdAt: ago(3),
    helpfulCount: 67, verified: true, tags: ['장기근무', '급여정확', '매니저친절'],
  },
  {
    id: 'rev-005', businessId: 'biz-002', businessName: '세인트 클럽',
    category: 'night_club', workRegion: '경기 일산동구',
    overallRating: 4,
    ratings: { payAccuracy: 4, workEnv: 4, safety: 5, ownerAttitude: 4, wouldReturn: true },
    content: '처음엔 걱정 많았는데 막상 해보니 괜찮아요. 선배 언니들이 잘 챙겨줘서 적응도 빨리 됐어요. 클럽이라 시끄럽긴 한데 그건 감수해야 하는 부분. 수입은 생각보다 많아서 만족해요.',
    workPeriod: '1~3개월', anonymousId: makeAnon(103), createdAt: ago(19),
    helpfulCount: 29, verified: true, tags: ['적응쉬움', '수입좋음'],
  },

  // 스타 클럽 (biz-003)
  {
    id: 'rev-006', businessId: 'biz-003', businessName: '스타 클럽',
    category: 'night_club', workRegion: '경기 성남시',
    overallRating: 4,
    ratings: { payAccuracy: 4, workEnv: 4, safety: 4, ownerAttitude: 4, wouldReturn: true },
    content: '일반 클럽보다 관리가 잘 되는 편이에요. 몇 가지 규칙이 있는데 처음엔 불편할 수 있지만 오히려 그게 안전을 위한 거라 납득이 돼요. 급여 문제는 없었고, 원하면 단기도 가능해요.',
    workPeriod: '1주~1개월', anonymousId: makeAnon(178), createdAt: ago(35),
    helpfulCount: 18, verified: false, tags: ['단기가능', '관리잘됨'],
  },

  // 엔젤 서츠룸 (biz-005) — 복합 평가
  {
    id: 'rev-007', businessId: 'biz-005', businessName: '엔젤 서츠룸',
    category: 'room_salon', workRegion: '서울 마포구',
    overallRating: 3,
    ratings: { payAccuracy: 3, workEnv: 3, safety: 4, ownerAttitude: 3, wouldReturn: false },
    content: '나쁘진 않은데 딱히 추천하고 싶지는 않아요. 급여가 처음 얘기와 살짝 달랐어요 (말로 설명을 잘못 들은 건지 불분명). 안전 관련해서는 큰 문제 없었어요. 시설은 조금 오래된 편.',
    workPeriod: '1주~1개월', anonymousId: makeAnon(321), createdAt: ago(41),
    helpfulCount: 14, verified: false, tags: ['평범'],
  },
  {
    id: 'rev-008', businessId: 'biz-005', businessName: '엔젤 서츠룸',
    category: 'room_salon', workRegion: '서울 마포구',
    overallRating: 4,
    ratings: { payAccuracy: 4, workEnv: 3, safety: 4, ownerAttitude: 4, wouldReturn: true },
    content: '주변에서 듣던 것보다 괜찮았어요. 사장님이 직접 관리하셔서 그런지 문제가 생기면 빠르게 대응해주세요. 단기로 몇 번 다녀봤는데 큰 불만은 없었어요.',
    workPeriod: '1일~1주', anonymousId: makeAnon(44), createdAt: ago(60),
    helpfulCount: 8, verified: false, tags: ['단기경험', '빠른대응'],
  },
];

/** 특정 매장의 리뷰 목록 조회 */
export function getReviewsByBusiness(businessId: string): Review[] {
  return mockReviews.filter(r => r.businessId === businessId);
}

/** 매장 평균 평점 계산 */
export function getAvgRating(businessId: string): { avg: number; count: number } {
  const reviews = getReviewsByBusiness(businessId);
  if (reviews.length === 0) return { avg: 0, count: 0 };
  const avg = reviews.reduce((sum, r) => sum + r.overallRating, 0) / reviews.length;
  return { avg: Math.round(avg * 10) / 10, count: reviews.length };
}

/** 별점 표시 문자열 */
export function starStr(rating: number): string {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(empty);
}
