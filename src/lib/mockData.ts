export interface PremiumOptions {
  topFixed: boolean;
  urgentBadge: boolean;
  motionBanner: boolean;
  colorBorder: string | null;
  vipBadge: boolean;
  featuredSection: boolean;
  premiumCard: boolean;
  stickyAd: boolean;
}

/** 결제 이력 단건 */
export interface PaymentRecord {
  /** 고유 결제 ID */
  id: string;
  /** 결제 일시 (ISO 8601) */
  date: string;
  /** 결제한 개월 수 */
  months: number;
  /** 결제 금액 (원) */
  amount: number;
  /** 플랜명 (예: 'tier_premium') */
  plan: string;
  /** 이 결제로 연장된 시작일 */
  periodFrom: string;
  /** 이 결제로 연장된 종료일 */
  periodTo: string;
}

/** 환불 정책 — 이용 비율에 따른 공정위 기준 */
export type RefundStatus = 'pending' | 'approved' | 'rejected';

export interface RefundRequest {
  status: RefundStatus;
  /** 환불 신청일 (ISO 8601) */
  requestedAt: string;
  /** 신청 사유 */
  reason: string;
  /** 환불 예상금액 (원, 공정위 기준 계산) */
  refundAmount: number;
  /** 환불 비율 설명 */
  refundRatioLabel: string;
  /** 처리 일시 */
  processedAt?: string;
  /** 거부 사유 (관리자 입력) */
  rejectedReason?: string;
}

export interface JobAd {
  id: string;
  type: 'top' | 'priority' | 'special' | 'general';
  title: string;
  companyName: string;
  location: string;
  pay: string;
  image?: string;
  tag?: string;
  viewCount: number;
  description: string;
  addons?: {
    textHighlight?: boolean;
    borderGlow?: boolean;
    decorations?: boolean;
    containerMotion?: boolean;
  };
  requirements: string;
  workHours: string;
  contactPhone?: string;
  contactKakao?: string;
  createdAt?: string;
  expiresAt?: string;
  premium?: PremiumOptions;
  /** 결제 이력 (구독 연장 포함 누적) */
  paymentHistory?: PaymentRecord[];
  /** 환불 요청 정보 */
  refundRequest?: RefundRequest | null;
  /** 자동으로 생성된 화려한 배너 커스텀 스타일 */
  customStyle?: any;
  /** 자동 예약 점프 시간대 (예: [20, 21, 22]) */
  autoJumpHours?: number[];
}

export interface ForumPost {
  id: string;
  category: 'best' | 'night' | 'friend' | 'legal';
  title: string;
  writer: string;
  date: string;
  views: number;
}

export interface TalentProfile {
  id: string;
  name: string;
  age: string;
  gender: string;
  title: string;
  jobType: string;
  pay: string;
  date: string;
}

// 날짜 헬퍼
const makeCreatedAt = (daysAgo: number) => new Date(Date.now() - daysAgo * 86400000).toISOString();
const makeExpiresAt = (daysFromNow: number = 90) => new Date(Date.now() + daysFromNow * 86400000).toISOString();

/** 초기 결제 이력 생성 헬퍼 (mock 데이터용) */
function makeInitialPayment(amount: number, plan: string, createdAt: string, expiresAt: string): PaymentRecord[] {
  return [{
    id: `pay_init_${Math.random().toString(36).slice(2, 8)}`,
    date: createdAt,
    months: 1,
    amount,
    plan,
    periodFrom: createdAt,
    periodTo: expiresAt,
  }];
}

// ────────────────────────────────────────────────────────────────
// 1. TOP BANNERS — VIP 프리미엄 (일급 50만~100만, 청담·강남·해운대)
// ────────────────────────────────────────────────────────────────
export const topBanners: JobAd[] = [
  {
    id: 'top-001', type: 'top',
    title: '👑 [청담] 하이엔드 멤버십 클럽 ★ 일급 80만 + 인센 ★ VIP 전담 호스티스',
    companyName: '청담 시그니처 클럽',
    location: '서울 강남구 청담동',
    pay: '일급 800,000원 + 인센티브',
    image: 'https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?w=600&auto=format',
    tag: '#VIP전용 #고급클럽 #당일정산',
    viewCount: 3842, createdAt: makeCreatedAt(5), expiresAt: makeExpiresAt(85),
    contactPhone: '010-2847-3951', contactKakao: 'cdclub_vip',
    description: '서울 청담동 최상급 멤버십 클럽입니다.\n회원제로 운영되어 최고급 고객만 방문하는 프리미엄 업소입니다.\n\n▶ 업소 특징\n- 국내 top 10 클럽 선정 (2025년)\n- 전담 실장 1:1 케어 시스템\n- 안전하고 깨끗한 근무 환경\n- 청결 철저 관리, CCTV 완비\n\n▶ 급여 시스템\n- 기본 일급 80만원 보장\n- 실적 인센티브 별도 지급\n- 당일 현금 정산 (100% 보장)\n- 주급/월급 선택 가능',
    requirements: '만 19세 이상 여성, 외모 무관, 초보/경력 모두 환영',
    workHours: '오후 9시 ~ 새벽 4시 (조절 가능)',
    premium: { topFixed: true, urgentBadge: true, motionBanner: true, colorBorder: 'gold', vipBadge: true, featuredSection: true, premiumCard: true, stickyAd: true },
    paymentHistory: makeInitialPayment(300000, 'tier_premium', makeCreatedAt(5), makeExpiresAt(85)),
  },
  {
    id: 'top-002', type: 'top',
    title: '💎 [강남 역삼] 5성급 호텔 바 ★ 월 1,000만 이상 ★ 전문 소믈리에 바텐더',
    companyName: '역삼 로얄 라운지',
    location: '서울 강남구 역삼동',
    pay: '월 10,000,000원 이상',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&auto=format',
    tag: '#호텔바 #소믈리에 #고급라운지',
    viewCount: 2951, createdAt: makeCreatedAt(3), expiresAt: makeExpiresAt(87),
    contactPhone: '010-3849-2741', contactKakao: 'royallounge_vip',
    description: '강남 역삼동 5성급 호텔 내 프리미엄 라운지입니다.\n\n▶ 업소 특징\n- 5성급 호텔 제휴 고급 라운지\n- 외국인 VIP 고객 다수\n- 안전하고 쾌적한 근무 환경\n\n▶ 급여\n- 월 평균 1,000만원 이상\n- 실적 인센티브 별도',
    requirements: '만 19세 이상 여성, 영어 가능자 우대',
    workHours: '오후 7시 ~ 새벽 2시',
    premium: { topFixed: true, urgentBadge: false, motionBanner: true, colorBorder: 'gold', vipBadge: true, featuredSection: true, premiumCard: true, stickyAd: false },
    paymentHistory: makeInitialPayment(300000, 'tier_premium', makeCreatedAt(3), makeExpiresAt(87)),
  },
  {
    id: 'top-003', type: 'top',
    title: '🌊 [해운대] 오션뷰 루프탑 바 ★ 일급 50만 보장 ★ 숙소 제공',
    companyName: '해운대 오션 클럽',
    location: '부산 해운대구 우동',
    pay: '일급 500,000원 + 숙소',
    image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=600&auto=format',
    tag: '#해운대 #루프탑바 #숙소제공',
    viewCount: 1823, createdAt: makeCreatedAt(10), expiresAt: makeExpiresAt(80),
    contactPhone: '010-5523-8841', contactKakao: 'haeundae_ocean',
    description: '해운대 오션뷰 최고 루프탑 바입니다.\n\n▶ 업소 특징\n- 해운대 오션뷰 최고 전망\n- 숙소 제공 (원룸 수준)\n- 안전 최우선 업소\n\n▶ 급여\n- 일급 50만원 보장\n- 카드 인센티브 별도',
    requirements: '만 19세 이상 여성, 외지 지원 환영',
    workHours: '오후 8시 ~ 새벽 3시',
    premium: { topFixed: false, urgentBadge: true, motionBanner: false, colorBorder: 'pink', vipBadge: false, featuredSection: true, premiumCard: true, stickyAd: false },
    paymentHistory: makeInitialPayment(300000, 'tier_premium', makeCreatedAt(10), makeExpiresAt(80)),
  },
];

// ────────────────────────────────────────────────────────────────
// 2. PRIORITY JOBS — 우대채용 (일급 30만~45만)
// ────────────────────────────────────────────────────────────────
export const priorityJobs: JobAd[] = [
  {
    id: 'priority-001', type: 'priority',
    title: '★ [강남 1등] 텐프로 에이스 ★ 시급 15~25+@만 ★ 하루 100~150만 보장',
    companyName: '강남 에이스 클럽',
    location: '서울 강남구 논현동',
    pay: '시급 150,000원~250,000원',
    tag: '#유흥의 황가 #당일 지급 100% #초보자 전담 안심케어',
    viewCount: 2103, createdAt: makeCreatedAt(7), expiresAt: makeExpiresAt(83),
    contactPhone: '010-3321-5588',
    description: '강남 1등 텐프로 클럽입니다.',
    requirements: '만 19세 이상 여성',
    workHours: '오후 9시 ~ 새벽 4시',
    paymentHistory: makeInitialPayment(130000, 'tier_priority', makeCreatedAt(7), makeExpiresAt(83)),
  },
  {
    id: 'priority-002', type: 'priority',
    title: '💙 [분당] 하이퍼블릭 글렘 ★ 일급 17만 / 차량지원',
    companyName: '분당 글렘',
    location: '경기도 성남시 분당구',
    pay: '일급 170,000원',
    tag: '#분당 최강 #바다뷰 VIP룸',
    viewCount: 987, createdAt: makeCreatedAt(15), expiresAt: makeExpiresAt(75),
    contactPhone: '010-4455-7788',
    description: '분당 최고급 하이퍼블릭 클럽입니다.',
    requirements: '만 19세 이상 여성, 차량 소지자 우대',
    workHours: '오후 9시 ~ 새벽 4시',
    paymentHistory: makeInitialPayment(130000, 'tier_priority', makeCreatedAt(15), makeExpiresAt(75)),
  },
  {
    id: 'priority-003', type: 'priority',
    title: '🔥 [홍대/마포] 인기 룸살롱 ★ 일급 40만+ ★ 당일 현금 100%',
    companyName: '홍대 프리미엄 클럽',
    location: '서울 마포구 서교동',
    pay: '일급 400,000원~',
    tag: '#홍대 #당일정산 #초보환영',
    viewCount: 1542, createdAt: makeCreatedAt(3), expiresAt: makeExpiresAt(87),
    contactPhone: '010-7722-3344',
    description: '홍대 인기 프리미엄 클럽입니다.',
    requirements: '만 19세 이상 여성, 초보 환영',
    workHours: '오후 8시 ~ 새벽 3시',
    paymentHistory: makeInitialPayment(130000, 'tier_priority', makeCreatedAt(3), makeExpiresAt(87)),
  },
  {
    id: 'priority-004', type: 'priority',
    title: '✨ [수원/경기] 수원 1등 텐프로 ★ 일급 45만 보장 ★ 교통비 지원',
    companyName: '수원 로얄 클럽',
    location: '경기도 수원시 팔달구',
    pay: '일급 450,000원~',
    tag: '#수원 #교통비지원 #안심케어',
    viewCount: 876, createdAt: makeCreatedAt(5), expiresAt: makeExpiresAt(85),
    contactPhone: '010-5566-7788',
    description: '경기 수원 최고 인기 클럽입니다.',
    requirements: '만 19세 이상 여성',
    workHours: '오후 9시 ~ 새벽 4시',
    paymentHistory: makeInitialPayment(130000, 'tier_priority', makeCreatedAt(5), makeExpiresAt(85)),
  },
  {
    id: 'priority-005', type: 'priority',
    title: '💎 [인천] 송도 프리미어 클럽 ★ 일급 38만 ★ 숙소 제공 가능',
    companyName: '송도 프리미어',
    location: '인천 연수구 송도동',
    pay: '일급 380,000원',
    tag: '#인천 #숙소제공 #VIP케어',
    viewCount: 654, createdAt: makeCreatedAt(8), expiresAt: makeExpiresAt(82),
    contactPhone: '010-3311-4422',
    description: '인천 송도 최고급 클럽입니다.',
    requirements: '만 19세 이상 여성, 외지 지원 환영',
    workHours: '오후 9시 ~ 새벽 3시',
    paymentHistory: makeInitialPayment(130000, 'tier_priority', makeCreatedAt(8), makeExpiresAt(82)),
  },
  {
    id: 'priority-006', type: 'priority',
    title: '🌙 [강동/천호] 하루 200만 가능 ★ 독보적인 클수 보장 ★ 인계 클래식',
    companyName: '인계 클래식',
    location: '서울 강동구 천호동',
    pay: '일급 350,000원~',
    tag: '#강동 #클수보장 #즉시입금',
    viewCount: 1203, createdAt: makeCreatedAt(2), expiresAt: makeExpiresAt(88),
    contactPhone: '010-9988-7766',
    description: '강동구 인계 클래식입니다.',
    requirements: '만 19세 이상 여성',
    workHours: '오후 9시 ~ 새벽 4시',
    paymentHistory: makeInitialPayment(130000, 'tier_priority', makeCreatedAt(2), makeExpiresAt(88)),
  },
];

// ────────────────────────────────────────────────────────────────
// 3. RECOMMENDED JOBS — 스페셜 (일급 25만~35만)
// ────────────────────────────────────────────────────────────────
export const recommendedJobs: JobAd[] = [
  {
    id: 'recommended-001', type: 'special',
    title: '👑 [논현] 논현 클라우드 ★ 천송이실장 케어 ★ 마이킹 선지원 가능',
    companyName: '논현 클라우드',
    location: '서울 강남구 논현동',
    pay: '시급 100,000원~200,000원',
    tag: '#갯수 보장 #VIP 매칭',
    viewCount: 742, createdAt: makeCreatedAt(2), expiresAt: makeExpiresAt(88),
    contactPhone: '010-7788-9900',
    description: '논현 최고급 클럽 논현 클라우드입니다.',
    requirements: '만 19세 이상 여성',
    workHours: '오후 9시 ~ 새벽 4시',
    paymentHistory: makeInitialPayment(200000, 'tier_special', makeCreatedAt(2), makeExpiresAt(88)),
  },
  {
    id: 'recommended-002', type: 'special',
    title: '🎵 [강남/신사] 노래방 바 알바 ★ 시급 3.5만 ★ 가족같은 분위기',
    companyName: '신사 노래바',
    location: '서울 강남구 신사동',
    pay: '시급 35,000원',
    tag: '#노래방 #시급제 #안전업소',
    viewCount: 523, createdAt: makeCreatedAt(6), expiresAt: makeExpiresAt(84),
    contactPhone: '010-1122-3344',
    description: '강남 신사동 깔끔한 노래바입니다.',
    requirements: '만 19세 이상 여성, 초보 환영',
    workHours: '오후 6시 ~ 새벽 1시',
    paymentHistory: makeInitialPayment(200000, 'tier_special', makeCreatedAt(6), makeExpiresAt(84)),
  },
  {
    id: 'recommended-003', type: 'special',
    title: '⭐ [대전] 대전 1등 룸살롱 ★ 일급 35만+ ★ 출근 자유',
    companyName: '대전 센트럴 클럽',
    location: '대전 서구 둔산동',
    pay: '일급 350,000원~',
    tag: '#대전 #출근자유 #초보환영',
    viewCount: 438, createdAt: makeCreatedAt(10), expiresAt: makeExpiresAt(80),
    contactPhone: '010-5544-3322',
    description: '대전 지역 최고 인기 클럽입니다.',
    requirements: '만 19세 이상 여성',
    workHours: '오후 9시 ~ 새벽 3시',
    paymentHistory: makeInitialPayment(200000, 'tier_special', makeCreatedAt(10), makeExpiresAt(80)),
  },
];


// ────────────────────────────────────────────────────────────────
// 4. GENERAL JOBS — 일반 채용
// ────────────────────────────────────────────────────────────────
export const generalJobs: JobAd[] = [
  {
    id: 'general-001', type: 'general',
    title: '★ [이태원/한남] 외국인 VIP 클럽 ★ 일급 40만+인센 ★ 영어 우대',
    companyName: '이태원 인터내셔널',
    location: '서울 용산구 이태원동',
    pay: '일급 400,000원 + 인센티브',
    tag: '#이태원',
    viewCount: 312, createdAt: makeCreatedAt(20), expiresAt: makeExpiresAt(70),
    contactPhone: '010-9911-2233',
    description: '이태원 외국인 VIP 클럽입니다.',
    requirements: '만 19세 이상 여성, 영어 가능자 우대',
    workHours: '오후 9시 ~ 새벽 3시',
    paymentHistory: makeInitialPayment(80000, 'tier_general', makeCreatedAt(20), makeExpiresAt(70)),
  },
  {
    id: 'general-002', type: 'general',
    title: '★ [종로/광화문] 도심 하이퍼블릭 ★ 일급 38만 ★ 깔끔한 환경',
    companyName: '광화문 시티 클럽',
    location: '서울 종로구 광화문',
    pay: '일급 380,000원',
    tag: '#광화문',
    viewCount: 201, createdAt: makeCreatedAt(8), expiresAt: makeExpiresAt(82),
    contactPhone: '010-2244-6688',
    description: '광화문 도심 하이퍼블릭 클럽입니다.',
    requirements: '만 19세 이상 여성',
    workHours: '오후 8시 ~ 새벽 2시',
    paymentHistory: makeInitialPayment(80000, 'tier_general', makeCreatedAt(8), makeExpiresAt(82)),
  },
];

// ────────────────────────────────────────────────────────────────
// 5. TALENT PROFILES — 인재 프로필
// ────────────────────────────────────────────────────────────────
export const talentProfiles: TalentProfile[] = [
  { id: 'talent-001', name: '이**', age: '26세', gender: '여성', title: '부산 거주, 경력 2년, 룸/하이퍼 경험 있어요', jobType: '룸살롱/하이퍼블릭', pay: '일급 35만원 이상', date: '2026-07-03' },
  { id: 'talent-002', name: '박**', age: '22세', gender: '여성', title: '대학생 주말 알바 찾아요, 강남/홍대 선호', jobType: '노래방/바', pay: '시급 4만원 이상', date: '2026-07-04' },
  { id: 'talent-003', name: '김**', age: '24세', gender: '여성', title: '경력 3년, 텐프로 근무 가능, 당일 정산 필수', jobType: '텐프로/룸살롱', pay: '일급 50만원 이상', date: '2026-07-02' },
];

export const forumPosts: ForumPost[] = [
  { id: 'f-001', category: 'best', title: '강남 에이스에서 처음 일해봤는데 진짜 좋아요', writer: '익명', date: '07-04', views: 342 },
  { id: 'f-002', category: 'night', title: '분당 글렘 솔직 후기 (feat. 실장님 친절)', writer: '알바녀', date: '07-03', views: 218 },
  { id: 'f-003', category: 'friend', title: '같이 일할 친구 구해요 (강남권)', writer: '하이하이', date: '07-04', views: 156 },
  { id: 'f-004', category: 'legal', title: '미지급 급여 받는 방법 공유합니다', writer: '법률팀', date: '07-02', views: 891 },
];
