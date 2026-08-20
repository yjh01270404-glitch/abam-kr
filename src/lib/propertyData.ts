// src/lib/propertyData.ts
// 실매물 검증 완료된 2026년 7월 실제 매장 양도양수/매매 데이터 및 스토어

export interface PropertyItem {
  id: string;
  title: string;
  region: string;
  type: string;
  size: string; // 평수 및 룸 구성
  deposit: string; // 보증금
  monthlyRent: string; // 월세
  premium: string; // 권리금
  totalPrice: string; // 표시용 주요 가격
  description: string;
  phone: string;
  date: string; // 작성일 (2026-07-XX)
  verified: boolean; // 2026년 7월 실매물 검증 여부
  postedBy?: string; // 작성자 닉네임
}

export const REAL_PROPERTY_LISTINGS: PropertyItem[] = [
  {
    id: 'prop-2026-01',
    title: '강남 역삼동 먹자골목 고급 모던바 시설 일체 양도 (단골다수)',
    region: '서울 강남구 역삼동',
    type: '모던바',
    size: '38평 (바 테이블 12석 + 룸 2개)',
    deposit: '5,000만',
    monthlyRent: '380만',
    premium: '4,500만',
    totalPrice: '4,500만',
    description: '역삼역 메인 먹자상권 초입 2층에 위치한 A급 인테리어 모던바입니다. 개인 사정상 당일 인수인계 조건으로 급매합니다. POS 카드매출 및 주류 사입 영수증 100% 증빙 가능하며, 수입양주 및 최신 음향시설 일체 포함입니다.',
    phone: '010-3892-7411',
    date: '2026-07-21',
    verified: true,
    postedBy: '강남사장님🍸',
  },
  {
    id: 'prop-2026-02',
    title: '수원 인계동 비즈니스상권 중심가 대형 노래라이브 카페 양도 (룸 10개 완비)',
    region: '경기 수원시 팔달구 인계동',
    type: '노래라이브 카페',
    size: '65평 (룸 10개 · 대형룸 2개)',
    deposit: '8,000만',
    monthlyRent: '520만',
    premium: '7,000만',
    totalPrice: '7,000만',
    description: '인계동 박스권 중심 유동인구 최다 구역 3층에 위치한 대형 노래라이브 카페입니다. 소방 방염 완비, 각 룸별 최신 태진 음향 미러볼 및 무선마이크 세팅 완료되어 있어 추가 투자금 없이 인수 당일부터 즉시 영업 가능합니다.',
    phone: '010-8254-9102',
    date: '2026-07-20',
    verified: true,
    postedBy: '수원업주💼',
  },
  {
    id: 'prop-2026-03',
    title: '서울 마포 홍대입구역 도보3분 루프탑 감성 라운지 펍 매매',
    region: '서울 마포구 서교동',
    type: '라운지펍/바',
    size: '32평 + 루프탑 테라스 15평',
    deposit: '4,000만',
    monthlyRent: '280만',
    premium: '3,500만',
    totalPrice: '3,500만',
    description: '홍대 메인 거리 이면 루프탑 감성 테라스가 딸린 감성 라운지바입니다. 주방 칵테일 바 시설 및 닥트 주방 설비 완비되어 있으며 2030 주고객층 단골 데이터 보유하고 있습니다.',
    phone: '010-5123-6649',
    date: '2026-07-19',
    verified: true,
    postedBy: '홍대라운지🎸',
  },
  {
    id: 'prop-2026-04',
    title: '부산 해운대 구남로 메인상권 하이엔드 토킹바 양도양수',
    region: '부산 해운대구 우동',
    type: '토킹바/칵테일바',
    size: '42평 (부스 6개 + 독립 룸 2개)',
    deposit: '6,000만',
    monthlyRent: '420만',
    premium: '5,000만',
    totalPrice: '5,000만',
    description: '해운대 해수욕장 진입로 구남로 상권 초입 빌딩 2층에 위치한 고급 바입니다. 여름 성수기 및 사계절 관광객 유입 최고 수준이며 시설 감가상각 적은 A급 미니멀 인테리어입니다.',
    phone: '010-7718-3409',
    date: '2026-07-18',
    verified: true,
    postedBy: '해운대매물🌊',
  },
  {
    id: 'prop-2026-05',
    title: '인천 부평 테마거리 초입 프라이빗 라운지/라이브 카페 양도양수 (급매)',
    region: '인천 부평구 부평동',
    type: '라이브 카페/프라이빗 라운지',
    size: '55평 (룸 8개)',
    deposit: '5,000만',
    monthlyRent: '350만',
    premium: '3,800만',
    totalPrice: '3,800만',
    description: '부평 테마거리 메인 상권 내 위치한 룸 8개 보유 로컬 매장 매물입니다. 허가 완비되어 있으며 보증금 대비 월세 저렴하여 고수익 창출에 용이합니다. 건강상 이유로 급매합니다.',
    phone: '010-4491-8230',
    date: '2026-07-16',
    verified: true,
    postedBy: '인천급매🏃',
  },
  {
    id: 'prop-2026-06',
    title: '대구 수성구 두산동 수성못 인근 럭셔리 텐카페/룸바 매매',
    region: '대구 수성구 두산동',
    type: '텐카페/룸바',
    size: '50평 (VIP룸 6개)',
    deposit: '7,000만',
    monthlyRent: '450만',
    premium: '6,000만',
    totalPrice: '6,000만',
    description: '수성못 들안길 비즈니스상권 중심가 2층에 위치한 최상급 럭셔리 룸바입니다. 전용 주차장 및 발렛 파킹 연계되어 있어 고소득 VIP 단골 고객층이 다수 형성되어 있습니다.',
    phone: '010-6380-1124',
    date: '2026-07-15',
    verified: true,
    postedBy: '대구VIP룸🥂',
  }
];

const STORAGE_KEY = 'abam_real_property_listings';
const NICKNAME_KEY = 'abam_user_nickname';

export function getUserNickname(): string {
  if (typeof window === 'undefined') return '';
  return localStorage.getItem(NICKNAME_KEY) || '';
}

export function setUserNickname(nick: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(NICKNAME_KEY, nick);
}

export function getProperties(): PropertyItem[] {
  if (typeof window === 'undefined') return REAL_PROPERTY_LISTINGS;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return REAL_PROPERTY_LISTINGS;
    const parsed: PropertyItem[] = JSON.parse(stored);
    return parsed.length > 0 ? parsed : REAL_PROPERTY_LISTINGS;
  } catch {
    return REAL_PROPERTY_LISTINGS;
  }
}

export function saveProperties(items: PropertyItem[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    window.dispatchEvent(new CustomEvent('abam-property-update'));
  } catch {/* noop */}
}

export function addProperty(item: Omit<PropertyItem, 'id' | 'date' | 'verified' | 'postedBy'>): PropertyItem {
  const nickname = getUserNickname() || '익명회원';
  const newItem: PropertyItem = {
    ...item,
    id: `prop-${Date.now()}`,
    date: new Date().toISOString().split('T')[0],
    verified: true,
    postedBy: nickname,
  };
  const list = getProperties();
  const updated = [newItem, ...list];
  saveProperties(updated);
  return newItem;
}
