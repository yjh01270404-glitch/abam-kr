/* ─────────────────────────────────────────────
   Abam.kr 다국어 랜딩 콘텐츠 (KR / EN / JP / CN)
   모든 문구는 'Abam.kr 프라이빗 홈케어' 전단 이미지 기준입니다.
───────────────────────────────────────────── */

export type Lang = 'ko' | 'en' | 'jp' | 'cn';

export interface LandingContent {
  lang: Lang;
  htmlLang: string;
  brandTag: string;
  topBar: { pre: string; strong: string };
  navLabels: { info: string; courses: string; price: string; faq: string };
  hero: { badge: string; tagline: string; bannerTitle: [string, string]; bannerSub: string[] };
  info: { icon: string; title: string; sub: string }[];
  courseSection: { label: string; title: string };
  courses: {
    no: number; name: string; subtitle: string; desc: string;
    img: string; icon: string; tint: string; prices: string[];
  }[];
  priceSection: { title: string; head: string; durations: string[] };
  priceNotice?: {
    tag: string;
    title: string;
    desc: string;
    reasons: { icon: string; title: string; desc: string }[];
  };
  therapistSection: { label: string; title: string; note: string; kakaoBtn: string; callBtn: string };
  therapists: { name: string; age: string; spec: string; badge: string; specialty: string; desc: string; available: boolean; img: string }[];
  reviewSection: { label: string; title: string };
  reviews: { author: string; area: string; course: string; text: string }[];
  faqSection: { label: string; title: string; sub: string };
  faqs: { q: string; a: string }[];
  contact: { phone: string; tel: string; tagline: string; site: string };
  about: { title: string; p1: string; p2: string };
  footer: { title: string; sub: string; line: string };
  cta: { primary: 'kakao' | 'whatsapp'; kakao: string; whatsapp: string; call: string; callBar: string };
  modal: { title: string; body: string; idLabel: string; copy: string; open: string; close: string; copied: string };
  globalLine: string;
}

const KAKAO_ID = 'Abam1004';

const T_IMG = ['/images/crop_body_minseo.jpg', '/images/crop_body_chaewon.jpg', '/images/crop_body_yerin.jpg'];
export { KAKAO_ID };

const IMG = {
  thai: '/images/thai.jpg',
  aroma: '/images/aroma.jpg',
  special: '/images/flower_spa.jpg',
};

const TINT = {
  thai: 'rgba(224, 176, 74, 0.14)',
  aroma: 'rgba(167, 139, 250, 0.16)',
  special: 'rgba(251, 191, 114, 0.16)',
};

const PRICES = {
  thai: ['80,000원', '100,000원', '120,000원'],
  aroma: ['90,000원', '110,000원', '140,000원'],
  special: ['100,000원', '120,000원', '160,000원'],
};

/* 외국인 전용 요금표 (한국인 기본 요금에서 전 코스 +50,000원 정률 적용) */
const PRICES_GLOBAL = {
  thai: ['₩130,000', '₩150,000', '₩170,000'],
  aroma: ['₩140,000', '₩160,000', '₩190,000'],
  special: ['₩150,000', '₩170,000', '₩210,000'],
};

const PRICES_JP = {
  thai: ['130,000ウォン', '150,000ウォン', '170,000ウォン'],
  aroma: ['140,000ウォン', '160,000ウォン', '190,000ウォン'],
  special: ['150,000ウォン', '170,000ウォン', '210,000ウォン'],
};

const PRICES_CN = {
  thai: ['130,000韩元', '150,000韩元', '170,000韩元'],
  aroma: ['140,000韩元', '160,000韩元', '190,000韩元'],
  special: ['150,000韩元', '170,000韩元', '210,000韩元'],
};

const INFO_ICONS = ['🕕', '📅', '🏠', '🛡️'];

/* ───────────── 한국어 ───────────── */
export const KO: LandingContent = {
  lang: 'ko',
  htmlLang: 'ko',
  brandTag: '20대 전문 힐러 · 서울·경기 100% 현장 대면결제 프라이빗 홈케어',
  topBar: { pre: '서울·경기 전역 호텔 · 자택 100% 현장후불제 · ', strong: '20대 전문 힐러 (예약 18:00~ / 출발 19:00~ / 마지막 예약 05:00)' },
  navLabels: { info: '🕕 예약 안내', courses: '🍃 코스 소개', price: '💳 COURSE & PRICE', faq: '❓ 자주묻는 질문' },
  hero: {
    badge: '20대 전문 힐러 · 서울·경기 100% 현장 대면결제',
    tagline: '20대 전문 관리사 1:1 방문 케어 · 18시 접수 19시 순차출발 · 1시간 전 예약 권장',
    bannerTitle: ['20대 ACE 총출동', '프라이빗 홈케어'],
    bannerSub: ['서울·경기 전역', '1시간전 예약권장', '100% 현장 대면결제'],
  },
  info: [
    { icon: INFO_ICONS[0], title: '예약 접수 18:00부터', sub: '(매니저 출발 19:00부터 · 마지막 예약 05:00)' },
    { icon: INFO_ICONS[1], title: '1시간 전 예약 추천', sub: '원하는 시간에 가장 수월하게 이용' },
    { icon: INFO_ICONS[2], title: '원하는 프라이빗 공간', sub: '(자택 · 아파트 · 호텔 등)' },
    { icon: INFO_ICONS[3], title: '선입금 없는 안심', sub: '100% 현장 대면결제' },
  ],
  courseSection: { label: 'COURSE', title: '타이 · 아로마 · 스페셜' },
  courses: [
    { no: 1, name: '타이', subtitle: '전통 건식 지압 · 시원한 압', desc: '왓포 전통 방식의 건식 지압으로 뭉친 근육을 시원하게 풀어주고 스트레칭으로 몸의 균형을 잡아줍니다.', img: IMG.thai, icon: '🍃', tint: TINT.thai, prices: PRICES.thai },
    { no: 2, name: '아로마', subtitle: '천연 아로마 오일 · 부드러운 케어', desc: '천연 식물성 아로마 오일을 사용하여 부드럽게 전신을 케어하고 림프 순환과 깊은 휴식을 돕습니다.', img: IMG.aroma, icon: '🌸', tint: TINT.aroma, prices: PRICES.aroma },
    { no: 3, name: '스페셜', subtitle: '타이 + 아로마 복합 케어', desc: '타이의 시원한 지압과 아로마의 부드러운 오일 관리를 동시에 받을 수 있는 프리미엄 코스입니다.', img: IMG.special, icon: '🍃🌸', tint: TINT.special, prices: PRICES.special },
  ],
  priceSection: { title: 'COURSE & PRICE', head: '코스', durations: ['60분', '90분', '120분'] },
  therapistSection: { label: "20대 ACE LINEUP", title: '오늘 밤 20대 ACE 총출동 라인업', note: '20대 전문 관리사 1:1 프라이빗 케어 · 실시간 도로 교통/배차 기준 순차 이동', kakaoBtn: '문자지명', callBtn: '전화지명' },
  therapists: [
    { name: '가빈', age: '24세', spec: '168cm · 슬렌더 롱다리 모델핏', badge: '장신 에이스', specialty: '타이 + 아로마 복합 케어', desc: '시원하게 뻗은 모델 비율과 깊이감 있는 압으로 피로를 완벽 해소.', available: true, img: '/images/t_gabin.jpg' },
    { name: '송이', age: '25세', spec: '167cm · 세련된 각선미 골반라인', badge: '지명 TOP', specialty: '정통 왓포 건식 지압 + 림프 케어', desc: '세련된 분위기와 섬세한 손길, 군더더기 없는 케어로 높은 만족도.', available: true, img: '/images/t_songi.jpg' },
    { name: '지나', age: '23세', spec: '169cm · 우아한 슬림핏 롱바디', badge: '비율 1위', specialty: '스페셜 복합 힐링 케어', desc: '우아한 터치와 깃털처럼 가벼우면서도 정확한 혈자리 지압.', available: true, img: '/images/t_jina.jpg' },
    { name: '보름', age: '22세', spec: '160cm · 러블리 아담 베이글', badge: '인기 급상승', specialty: '천연 아로마 오일 케어', desc: '밝고 상냥한 미소와 온몸을 녹이는 따뜻하고 조심스러운 터치.', available: true, img: '/images/t_boreum.jpg' },
    { name: '수은', age: '23세', spec: '161cm · 아담하고 슬림한 실루엣', badge: '힐링 지명', specialty: '부드러운 감성 아로마', desc: '뭉친 승모근과 허리를 집중적으로 풀어주는 맞춤형 힐러.', available: true, img: '/images/t_sueun.jpg' },
    { name: '수지', age: '22세', spec: '159cm · 귀여운 요정핏 청순 글래머', badge: '재예약 1위', specialty: '타이 + 아로마 믹스 케어', desc: '작은 체구에서 나오는 야무진 압과 사랑스러운 교감 케어.', available: true, img: '/images/t_suji.jpg' },
    { name: '애니', age: '24세', spec: '162cm · 아담 탄탄 슬림핏', badge: '에이스 힐러', specialty: '정통 건식 수기 지압', desc: '전문적인 지압 스킬과 부드러운 오일 테크닉을 고루 갖춘 실력파.', available: true, img: '/images/t_annie.jpg' },
    { name: '예린', age: '22세', spec: '162cm · 아담하고 여리여리한 선', badge: '에이스 힐러', specialty: '부드러운 아로마 케어', desc: '따뜻하고 조심스러운 손길로 일상의 긴장을 사르르 녹여주는 힐러.', available: true, img: '/images/t_yerin.jpg' },
    { name: '지유', age: '23세', spec: '160cm · 아담하고 감미로운 체형', badge: '지명 추천', specialty: '전신 릴랙싱 림프 케어', desc: '지친 심신을 부드럽게 감싸안는 극상의 휴식을 선사하는 테라피스트.', available: true, img: '/images/t_jiyu.jpg' },
    { name: '해인', age: '24세', spec: '161cm · 단아한 아담 슬렌더', badge: '단골 최다', specialty: '타이 스트레칭 + 아로마', desc: '단아한 매력과 빈틈없는 손길로 깊은 숙면과 안정을 유도.', available: true, img: '/images/t_haein.jpg' },
  ],
  reviewSection: { label: 'REVIEWS', title: '고객 후기' },
  reviews: [
    { author: '김*호 님', area: '강남구 역삼 호텔', course: '스페셜 90분', text: '호텔 객실에서 편안하게 받았습니다. 타이의 시원한 지압과 아로마 오일 케어를 한 번에 받을 수 있어서 출장 피로가 말끔히 풀렸습니다.' },
    { author: '박*훈 님', area: '수원 팔달 인계동 호텔', course: '아로마 90분', text: '수원 인계동 출장 중인데 30분 만에 도착해 주셨네요. 집이나 호텔에서 프라이빗하게 1:1로 케어받으니 아주 만족스럽습니다.' },
    { author: '조*현 님', area: '용산구 한남 자택', course: '타이 60분', text: '뭉친 근육을 시원하게 풀어주고 마무리 스트레칭까지 해주셔서 몸의 균형이 잡히는 느낌이었습니다.' },
    { author: '이*준 님', area: '성남 분당구 판교 오피스텔', course: '타이 90분', text: '판교 IT 야근 마치고 늦은 밤에 예약했는데 바로 와주셨어요. 어깨랑 승모근 뭉친 데를 짚어주시는데 압이 딱 좋아서 피로가 싹 풀렸습니다.' },
    { author: '최*우 님', area: '안양 동안구 평촌 호텔', course: '스페셜 120분', text: '평촌 출장 중에 이용했습니다. 매니저님이 정말 친절하시고 타이 지압과 아로마 오일 조합이 환상적이네요. 2시간 동안 온전히 힐링했습니다.' },
    { author: '정*진 님', area: '고양 일산동구 자택', course: '아로마 60분', text: '퇴근 후 일산 집에서 편하게 쉬면서 관리받으니 샵에 갈 필요가 전혀 없네요. 아로마 향도 고급스럽고 온몸의 긴장이 사르르 풀렸습니다.' },
    { author: '한*원 님', area: '여의도 비즈니스 호텔', course: '타이 90분', text: '비즈니스 미팅 끝나고 묵는 호텔에서 프라이빗하게 받으니 너무 만족스럽습니다. 필요한 관리 매트와 용품을 전부 구비해 오셔서 아주 편안했습니다.' },
    { author: '윤*민 님', area: '부천 원미구 중동 호텔', course: '스페셜 90분', text: '부천 중동 호텔로 불렀는데 약속 시간에 딱 맞춰 오셨어요. 허리 쪽 뻐근했던 게 지압과 오일 케어로 말끔히 풀려서 오랜만에 꿀잠 잤습니다.' },
    { author: '강*석 님', area: '종로구 광화문 호텔', course: '아로마 120분', text: '호텔에서 조용히 혼자 릴랙스하기에 최고였습니다. 테라피스트분 매너도 단정하시고 위생도 철저해서 안심하고 받았습니다.' },
    { author: '오*택 님', area: '화성 동탄신도시 자택', course: '타이 60분', text: '동탄 자택인데 늦은 시간에도 빠른 배정 감사했습니다. 손끝 야무진 압이 정말 수준급이어서 다음엔 90분 코스로 길게 이용하려 합니다.' },
    { author: '임*규 님', area: '광진구 건대 호텔', course: '스페셜 90분', text: '건대 호캉스 중에 문자로 간편하게 예약했어요. 1:1로 뭉친 부위를 집중 케어해 주셔서 묵은 피로가 완전히 사라졌습니다. 추천합니다.' },
  ],
  faqSection: { label: 'FAQ', title: '자주 묻는 질문', sub: '궁금하신 점을 빠르게 확인하세요.' },
  faqs: [
    {
      q: '서울 및 경기도 지역도 방문 가능한가요?',
      a: '네, 서울 전역(25개 자치구)뿐만 아니라 경기도 핵심 거점 어디든 원하시는 프라이빗한 공간으로 신속하게 방문해 드립니다.\n\n• 방문 가능 지역:\n  - 서울: 강남, 서초, 송파, 마포, 용산, 영등포 등 서울 25개 자치구 전역\n  - 경기: 수원, 성남(분당·판교), 고양(일산), 부천, 안양, 평택, 화성(동탄), 김포, 파주, 광명, 하남 등 경기 주요 도심권\n\n• 방문 가능 장소:\n  - 자택 (아파트 · 오피스텔 · 빌라 · 단독주택 등)\n  - 숙박시설 (서울·경기 전역 호텔 · 모텔 · 비즈니스 레지던스)\n\n• 1:1 방문 전담 케어로 조용하고 편안하게 이용하실 수 있습니다.',
    },
    {
      q: '예약 시간과 출발 시간은 어떻게 되나요?',
      a: '• 예약 접수: 18:00부터\n• 매니저 출발: 19:00부터\n• 마지막 예약 마감: 새벽 05:00\n\n※ 예약은 18:00부터 받지만, 매니저 출발은 19:00부터입니다.\n※ 원활한 매니저 배정과 빠른 방문을 위해 이용 1시간 전 예약을 권장해 드립니다.\n※ 05:00에 예약이 마감되며, 당일 18:00부터 다시 접수합니다.',
    },
    {
      q: '어떤 코스가 있나요?',
      a: '고객님의 컨디션에 맞춘 3가지 프리미엄 코스가 준비되어 있습니다.\n\n• 타이 케어 (건식 지압)\n  - 왓포 전통 방식의 건식 수기 지압으로 뭉친 근육과 피로를 시원하게 이완\n\n• 아로마 케어 (천연 오일)\n  - 천연 식물성 오일로 전신을 부드럽게 감싸 림프 순환과 깊은 휴식 유도\n\n• 스페셜 케어 (타이 + 아로마)\n  - 타이의 시원한 지압과 아로마의 부드러움을 동시에 누리는 대표 인기 코스\n\n(모든 코스는 60분 · 90분 · 120분 중 선택 가능합니다.)',
    },
    {
      q: '코스별 요금이 어떻게 되나요?',
      a: '전 코스 정찰제 요금으로 투명하게 운영됩니다.\n\n• 타이 코스 (건식)\n  -  60분 :  80,000원\n  -  90분 : 100,000원\n  - 120분 : 120,000원\n\n• 아로마 코스 (천연오일)\n  -  60분 :  90,000원\n  -  90분 : 110,000원\n  - 120분 : 140,000원\n\n• 스페셜 코스 (타이 + 아로마)\n  -  60분 : 100,000원\n  -  90분 : 120,000원\n  - 120분 : 160,000원',
    },
    {
      q: '자택과 호텔 모두 이용할 수 있나요?',
      a: '네, 고객님께서 머무시는 프라이빗한 공간 어디서든 이용 가능합니다.\n\n• 주거 공간: 아파트, 오피스텔, 빌라, 단독주택 등 자택\n• 숙박 시설: 서울·경기 전역 모든 호텔, 모텔, 비즈니스 레지던스\n\n• 전담 테라피스트가 필요한 모든 관리용품 및 위생 소모품을 구비하여 차량으로 방문하므로 별도의 준비 없이 편안하게 받으시면 됩니다.',
    },
    {
      q: '주차장·1층 공동현관 비밀번호, 호텔 이용은 어떻게 하나요?',
      a: '매니저가 차량으로 이동하기 때문에, 아래 내용을 예약 시 미리 알려주시면 가장 빠르고 정확하게 방문할 수 있습니다.\n\n1. 주차장\n  - 건물에 주차장이 있다면 예약 시 미리 알려주세요. 도착하면 매니저가 전화드립니다.\n\n2. 1층 공동현관\n  - 공동현관 비밀번호는 예약 시 미리 알려주세요.\n  - 비밀번호를 알려주기 어려우시면, 호출(세대 호출벨) 버튼을 눌러 열어주실 수 있다고 미리 말씀해 주세요. 도착 후 매니저가 전화드린 뒤 호출 버튼을 누릅니다.\n  - 비밀번호도, 호출 버튼도 어려운 경우에는 예약 시 먼저 상담해 주세요.\n\n3. 호텔·모텔\n  - 예약 시 호텔(모텔) 이름을 알려주세요. 도착 전 매니저가 미리 연락드립니다.\n  - 1층 로비에서 매니저를 만나 대면결제(현금·계좌이체·카드)를 하신 뒤, 매니저가 객실까지 픽업·동행합니다.',
    },
    {
      q: '결제는 언제, 어떻게 하나요?',
      a: '어떠한 선입금도 받지 않으며, 100% 현장 대면결제입니다.\n\n• 자택: 매니저가 도착해 대면한 후 결제\n• 호텔·모텔: 1층 로비에서 매니저를 만나 대면결제 후 객실로 이동\n• 결제 수단: 현금 · 계좌이체 · 카드',
    },
    {
      q: '전화 통화가 부담스러운데 문자로도 예약이 가능한가요?',
      a: '네, 100% 가능합니다!\n\n전화 통화 없이도 예약 접수 시간(18:00 ~ 익일 05:00) 안에 일반 문자메시지(010-6607-2239)로 코스, 시간, 방문 주소(호텔은 호텔명)를 보내주시면 예약 접수 및 도착 안내를 도와드립니다.\n\n※ 주차장·공동현관 비밀번호(또는 호출버튼 가능 여부)를 함께 남겨주시면 더욱 빠릅니다.',
    },
  ],
  contact: { phone: '010-6607-2239', tel: 'tel:010-6607-2239', tagline: '지금, 당신의 편안한 휴식을 위해', site: 'abam.kr' },
  about: {
    title: '출장마사지 · 출장안마 1위 [20대 ACE 총출동] Abam.kr 이용 안내',
    p1: 'Abam.kr(아밤)은 실력과 매너를 갖춘 20대 전문 관리사 라인업의 출장마사지 & 출장안마 전문 플랫폼입니다. 사전 예약금이나 선입금을 일절 요구하지 않는 100% 현장 대면결제 안심 원칙으로 운영되며, 서울 25개 구 전역 및 경기(수원·분당·판교·일산·부천·안양·평택·동탄 등) 고객님의 프라이빗 공간(자택·호텔)으로 실시간 도로 교통 상황과 배차 동선에 맞춰 정성스럽게 방문 관리해 드립니다.',
    p2: '정통 건식 지압의 타이 코스(80,000원~), 부드러운 림프 순환 천연 아로마 코스(90,000원~), 복합 힐링 스페셜 코스(100,000원~)까지 투명한 정찰제로 서울·경기 전역 어디든 최상의 힐링을 선사합니다.',
  },
  footer: {
    title: '서울·경기 출장마사지 · 출장안마 [20대 ACE 총출동] · 아밤(Abam.kr)',
    sub: '20대 전문 관리사 1:1 방문 케어 · 18시 접수 · 19시 순차 출발 · 100% 현장후불제',
    line: 'Abam.kr · 아름다운 밤, 20대 ACE 총출동 · 서울·경기 전역 100% 현장 대면결제 · 예약 18:00부터 · 출발 19:00부터 · 마지막 예약 05:00 마감 · 고객센터 010-6607-2239',
  },
  cta: { primary: 'call', kakao: '', whatsapp: 'WhatsApp', call: '', callBar: '전화예약' },
  modal: { title: '문자 간편 예약 양식', body: '문자로 편하게 남겨주시면 바로 안내해 드립니다.', idLabel: '', copy: '복사', open: '문자 예약하기', close: '닫기', copied: '복사 완료' },
  globalLine: 'English · 日本語 · 中文 · WhatsApp',
};

/* ───────────── English ───────────── */
export const EN: LandingContent = {
  lang: 'en',
  htmlLang: 'en',
  brandTag: 'A beautiful night, a special time just for you',
  topBar: { pre: 'Seoul & Gyeonggi Area · ', strong: 'Booking from 18:00 · Departures from 19:00 · Last booking 05:00' },
  navLabels: { info: '🕕 Booking Info', courses: '🍃 Courses', price: '💳 COURSE & PRICE', faq: '❓ FAQ' },
  hero: {
    badge: 'PRIVATE HOME CARE SERVICE',
    tagline: '20s Ace Therapists · Seoul & Metropolitan Rapid Visit',
    bannerTitle: ['Private', 'Home Visit Care'],
    bannerSub: ['Seoul & Gyeonggi', 'Home', 'Hotel'],
  },
  info: [
    { icon: INFO_ICONS[0], title: 'Booking from 18:00', sub: '(Departures from 19:00 · last booking 05:00)' },
    { icon: INFO_ICONS[1], title: 'Book 1 hour ahead', sub: 'for an even more comfortable experience.' },
    { icon: INFO_ICONS[2], title: 'Anywhere you like', sub: '(Home · Hotel, etc.)' },
    { icon: INFO_ICONS[3], title: 'Private', sub: '1:1 Care' },
  ],
  courseSection: { label: 'COURSE', title: 'Thai · Aroma · Special' },
  courses: [
    { no: 1, name: 'Thai', subtitle: 'Traditional dry acupressure · Refreshing pressure', desc: 'Traditional Wat Pho-style dry acupressure releases tight muscles, and stretching restores your body’s balance.', img: IMG.thai, icon: '🍃', tint: TINT.thai, prices: PRICES_GLOBAL.thai },
    { no: 2, name: 'Aroma', subtitle: 'Natural aroma oil · Gentle care', desc: 'Using natural plant-based aroma oils, we gently care for your whole body and support lymphatic circulation and deep rest.', img: IMG.aroma, icon: '🌸', tint: TINT.aroma, prices: PRICES_GLOBAL.aroma },
    { no: 3, name: 'Special', subtitle: 'Thai + Aroma combination care', desc: 'A premium course that combines the refreshing acupressure of Thai and the gentle oil treatment of Aroma at the same time.', img: IMG.special, icon: '🍃🌸', tint: TINT.special, prices: PRICES_GLOBAL.special },
  ],
  priceSection: { title: 'COURSE & PRICE', head: 'Course', durations: ['60 min', '90 min', '120 min'] },
  priceNotice: {
    tag: 'VIP HOSPITALITY & PRICING POLICY',
    title: 'Why International Guest VIP Rates Apply',
    desc: 'Our international guest pricing is an all-inclusive VIP rate specifically structured to guarantee seamless luxury, complete safety, and barrier-free communication for overseas visitors in Seoul.',
    reasons: [
      {
        icon: '🌐',
        title: 'Dedicated Multilingual Concierge',
        desc: 'Real-time English booking coordination, hotel lobby meet-up and room escort, and dedicated support via WhatsApp with zero language barrier.',
      },
      {
        icon: '👑',
        title: 'Priority Top-Tier Ace Therapists',
        desc: 'Exclusive priority assignment of our highest-rated 20s Korean therapists with verified technique, refined hospitality etiquette, and foreign guest experience.',
      },
      {
        icon: '🚕',
        title: 'All-Inclusive Hotel Dispatch & Rapid Transit',
        desc: 'Covers private rapid transit across all 25 districts of Seoul directly to your hotel suite with zero hidden late-night or distance delivery fees.',
      },
      {
        icon: '🛡️',
        title: '100% Pay-on-Arrival Scam Protection & Sealed Amenities',
        desc: 'Strict zero-advance-deposit policy to protect international travelers against online scams; pay directly upon therapist arrival. Includes sealed single-use hygienic sheets and premium imported natural oils.',
      },
    ],
  },
  therapistSection: { label: "TODAY'S THERAPISTS", title: 'Featured Therapists Tonight', note: 'Professional therapists on standby across Seoul', kakaoBtn: 'WhatsApp', callBtn: 'Call' },
  therapists: [
    { name: 'Gabin', age: '24 yrs', spec: '168cm · Slender tall model proportions', badge: 'Tall Ace', specialty: 'Thai + Aroma combination care', desc: 'Stunning tall model proportions with deep, revitalizing acupressure to dissolve all fatigue.', available: true, img: '/images/t_gabin.jpg' },
    { name: 'Songi', age: '25 yrs', spec: '167cm · Chic legs & elegant waistline', badge: 'Top Requested', specialty: 'Wat Pho dry acupressure + Lymph care', desc: 'Chic atmosphere with sophisticated strokes. Flawless care with high customer satisfaction.', available: true, img: '/images/t_songi.jpg' },
    { name: 'Jina', age: '23 yrs', spec: '169cm · Elegant slim long body', badge: 'Best Proportions', specialty: 'Special restorative healing care', desc: 'Graceful touch and feather-light yet accurate acupressure targeting key points.', available: true, img: '/images/t_jina.jpg' },
    { name: 'Boreum', age: '22 yrs', spec: '160cm · Lovely petite hourglass', badge: 'Trending', specialty: 'Natural aroma oil therapy', desc: 'Bright, cheerful smile with warm, soothing touch that melts your tension away.', available: true, img: '/images/t_boreum.jpg' },
    { name: 'Sueun', age: '23 yrs', spec: '161cm · Petite & slim silhouette', badge: 'Healing Pick', specialty: 'Gentle emotional aroma therapy', desc: 'Customized healing focused on relieving tension in trapezius and lower back.', available: true, img: '/images/t_sueun.jpg' },
    { name: 'Suji', age: '22 yrs', spec: '159cm · Cute petite fairy proportions', badge: '#1 Rebooking', specialty: 'Thai + Aroma blend care', desc: 'Exceptional pressure technique and affectionate communication in a petite frame.', available: true, img: '/images/t_suji.jpg' },
    { name: 'Annie', age: '24 yrs', spec: '162cm · Petite toned & slender', badge: 'Ace Healer', specialty: 'Authentic dry acupressure', desc: 'Expert acupressure skills harmonized with gentle, fluid oil techniques.', available: true, img: '/images/t_annie.jpg' },
    { name: 'Yerin', age: '22 yrs', spec: '162cm · Petite & delicate lines', badge: 'Ace Healer', specialty: 'Soothing aroma treatment', desc: 'Warm and gentle strokes that dissolve everyday stiffness and stress completely.', available: true, img: '/images/t_yerin.jpg' },
    { name: 'Jiyu', age: '23 yrs', spec: '160cm · Petite captivating body', badge: 'Recommended', specialty: 'Full body relaxing lymph care', desc: 'Provides ultimate rest and tranquility, enveloping fatigued body and mind gently.', available: true, img: '/images/t_jiyu.jpg' },
    { name: 'Haein', age: '24 yrs', spec: '161cm · Graceful petite slender', badge: 'Most Regulars', specialty: 'Thai stretch + Aroma care', desc: 'Graceful charm and meticulous touch that induce deep sleep and total calm.', available: true, img: '/images/t_haein.jpg' },
  ],
  reviewSection: { label: 'REVIEWS', title: 'Guest Reviews' },
  reviews: [
    { author: 'David M.', area: 'Gangnam Hotel', course: 'Special 90 min', text: 'Enjoyed it in my hotel room. Getting Thai acupressure and aroma oil care in one session melted away my business-trip fatigue.' },
    { author: 'Alex K.', area: 'Mapo Residence', course: 'Aroma 90 min', text: 'A private 1:1 session at home was so comfortable. The gentle scent of natural oil and soft touch gave me deep rest.' },
    { author: 'Chris B.', area: 'Yongsan Residence', course: 'Thai 60 min', text: 'It released my tight muscles, and the finishing stretches made my body feel balanced.' },
    { author: 'Jason L.', area: 'Seocho Studio', course: 'Thai 90 min', text: 'Booked late at night after overtime work and the therapist arrived promptly within an hour. The pressure on my shoulders and trapezius was spot on.' },
    { author: 'Michael R.', area: 'Songpa Hotel', course: 'Special 120 min', text: 'Used the service during my business trip to Jamsil. The blend of deep Thai acupressure and soothing aroma oils was absolute perfection.' },
    { author: 'Daniel S.', area: 'Yeongdeungpo Home', course: 'Aroma 60 min', text: 'Receiving premium care at home after work beats going to a spa. The natural aroma scents and gentle strokes completely dissolved my daily fatigue.' },
    { author: 'Thomas W.', area: 'Yeouido Hotel', course: 'Thai 90 min', text: 'Private 1:1 care in my Yeouido hotel room after meetings was incredible. The therapist brought clean mats and supplies so I didn’t have to prepare anything.' },
    { author: 'Eric P.', area: 'Seongsu Residence', course: 'Special 90 min', text: 'Arrived right on time at my Seongsu home. My stiff lower back felt completely relieved after the combo care, giving me the best night’s sleep.' },
    { author: 'James H.', area: 'Jongno Hotel', course: 'Aroma 120 min', text: 'Impeccable etiquette and thorough hygiene. The 120-minute aroma course provided total tranquility and deep bodily recovery.' },
    { author: 'Kevin C.', area: 'Gangseo Home', course: 'Thai 60 min', text: 'Quick coordination late at night in Magok. The therapist possessed master-level pressure technique. Will definitely book the 90-minute course next time.' },
    { author: 'Brian Y.', area: 'Gwangjin Hotel', course: 'Special 90 min', text: 'Effortless WhatsApp booking during a staycation. Highly attentive 1:1 custom care that dissolved all stress. Highly recommended!' },
  ],
  faqSection: { label: 'FAQ', title: 'Frequently Asked Questions', sub: 'Find quick answers to common questions.' },
  faqs: [
    {
      q: 'Do you visit anywhere in Seoul?',
      a: 'Yes, we visit any private space you prefer throughout all districts of Seoul.\n\n• Available Locations:\n  - Residences (apartments, studios, villas)\n  - Accommodations (all hotels, motels, serviced residences in Seoul)\n\n• Dedicated 1:1 visit care delivered in complete privacy and comfort.',
    },
    {
      q: 'What are the booking and departure hours?',
      a: '• Booking accepted: from 18:00\n• Manager departures: from 19:00\n• Last booking deadline: 05:00 (early morning)\n\n※ Bookings open at 18:00, but managers depart from 19:00.\n※ We recommend booking 1 hour ahead for smooth scheduling and prompt arrival.',
    },
    {
      q: 'How do parking, the building entrance and hotels work?',
      a: 'Please tell us the following when you book.\n\n1. Parking\n  - If your building has parking, let us know in advance. Your manager will call you on arrival.\n\n2. 1st-floor common entrance\n  - Please give us the entrance password in advance.\n  - If you cannot share it, please tell us in advance that you can open the door via the call / intercom button. Your manager will phone you on arrival and press the button.\n  - If neither is possible, please contact us first when booking.\n\n3. Hotels / motels\n  - Tell us the hotel name when booking. Your manager will contact you before arriving.\n  - Meet the manager in the 1st-floor lobby and pay face to face (cash, bank transfer or card). The manager then picks you up and escorts you to your room.\n\n• No deposit is ever required. 100% pay on the spot, in person.',
    },
    {
      q: 'What courses do you offer?',
      a: 'We offer 3 tailored premium courses (60 / 90 / 120 minutes):\n\n• Thai Care (Dry Acupressure)\n  - Traditional Wat Pho dry acupressure to release muscle knots and restore balance\n\n• Aroma Care (Natural Essential Oil)\n  - Gentle plant-based oil care promoting lymphatic circulation and deep recovery\n\n• Special Care (Thai + Aroma Combined)\n  - Our signature course blending refreshing acupressure and soothing oil therapy',
    },
    {
      q: 'How much is each course?',
      a: 'Transparent flat-rate pricing across all courses:\n\n• Thai Care (Dry)\n  -  60 min : ₩130,000\n  -  90 min : ₩150,000\n  - 120 min : ₩170,000\n\n• Aroma Care (Oil)\n  -  60 min : ₩140,000\n  -  90 min : ₩160,000\n  - 120 min : ₩190,000\n\n• Special Care (Thai + Aroma)\n  -  60 min : ₩150,000\n  -  90 min : ₩170,000\n  - 120 min : ₩210,000\n\n※ Foreign guest pricing includes dedicated multilingual concierge support, priority dispatch of top-tier therapists, hotel rapid transit, and 100% pay-on-arrival scam protection.',
    },
    {
      q: 'Can I use it at both home and hotel?',
      a: 'Yes, anywhere you can comfortably rest.\n\n• Residential: Apartments, private houses, studio lofts\n• Hospitality: All hotels, boutique hotels, and business residences\n\n• Your therapist brings all necessary massage mats and hygienic supplies for a hassle-free experience.',
    },
  ],
  contact: { phone: '010-6607-2239', tel: 'tel:+82-10-6607-2239', tagline: 'Right now, for your comfortable rest', site: 'abam.kr' },
  about: {
    title: 'About Abam.kr Private 1:1 Home Visit Care',
    p1: 'Abam.kr (A Beautiful Night) is a private 1:1 home visit care service delivered to the space of your choice across Seoul, such as your home or hotel. Booking is available from 18:00, managers depart from 19:00, and the last booking deadline is 05:00. Booking 1 hour ahead lets you enjoy an even more comfortable experience.',
    p2: 'Choose from 3 VIP courses — Thai (from ₩130,000 / 60 min), Aroma (from ₩140,000 / 60 min) and Special (from ₩150,000 / 60 min) — in 60, 90 or 120 minutes.',
  },
  footer: {
    title: 'Private 1:1 Home Visit Care across Seoul & Gyeonggi',
    sub: 'Seoul 25 districts, Suwon, Bundang, Pangyo, Ilsan, Bucheon & all key hubs — home & hotel visits',
    line: 'Abam.kr · A beautiful night, a special time just for you · PRIVATE HOME CARE SERVICE · Booking from 18:00 · Departures from 19:00 · Last booking 05:00 · Contact 010-6607-2239',
  },
  cta: { primary: 'whatsapp', kakao: 'KakaoTalk', whatsapp: 'WhatsApp Booking', call: '', callBar: 'Call' },
  modal: { title: '', body: '', idLabel: '', copy: '', open: '', close: '', copied: '' },
  globalLine: 'English · 日本語 · 中文 · WhatsApp Concierge',
};

/* ───────────── 日本語 ───────────── */
export const JP: LandingContent = {
  lang: 'jp',
  htmlLang: 'ja',
  brandTag: '美しい夜、あなたのための特別な時間',
  topBar: { pre: 'ソウル・京畿全域 · ご自宅 · ホテル · ', strong: 'ご予約は18:00から · 出発19:00から · 最終受付05:00' },
  navLabels: { info: '🕕 ご予約案内', courses: '🍃 コース紹介', price: '💳 COURSE & PRICE', faq: '❓ よくある質問' },
  hero: {
    badge: 'PRIVATE HOME CARE SERVICE',
    tagline: '美しい夜、あなたのための特別な時間',
    bannerTitle: ['プライベート', '訪問ホームケア'],
    bannerSub: ['ソウル・京畿', 'ご自宅', 'ホテル'],
  },
  info: [
    { icon: INFO_ICONS[0], title: 'ご予約は18:00から', sub: '(出発は19:00から · 最終受付05:00)' },
    { icon: INFO_ICONS[1], title: '1時間前のご予約で', sub: 'より快適にご利用いただけます。' },
    { icon: INFO_ICONS[2], title: 'ご希望の空間で', sub: '(ご自宅 · ホテルなど)' },
    { icon: INFO_ICONS[3], title: 'プライベートな', sub: '1:1ケア' },
  ],
  courseSection: { label: 'COURSE', title: 'タイ · アロマ · スペシャル' },
  courses: [
    { no: 1, name: 'タイ', subtitle: '伝統的な乾式指圧 · 爽快な圧', desc: 'ワットポー伝統式の乾式指圧で凝り固まった筋肉をすっきりほぐし、ストレッチで体のバランスを整えます。', img: IMG.thai, icon: '🍃', tint: TINT.thai, prices: PRICES_JP.thai },
    { no: 2, name: 'アロマ', subtitle: '天然アロマオイル · やさしいケア', desc: '天然植物性アロマオイルを使用して全身をやさしくケアし、リンパの流れと深いリラックスをサポートします。', img: IMG.aroma, icon: '🌸', tint: TINT.aroma, prices: PRICES_JP.aroma },
    { no: 3, name: 'スペシャル', subtitle: 'タイ + アロマ 複合ケア', desc: 'タイの爽快な指圧とアロマのやさしいオイルトリートメントを同時に受けられるプレミアムコースです。', img: IMG.special, icon: '🍃🌸', tint: TINT.special, prices: PRICES_JP.special },
  ],
  priceSection: { title: 'COURSE & PRICE', head: 'コース', durations: ['60分', '90分', '120分'] },
  priceNotice: {
    tag: 'VIP HOSPITALITY & PRICING POLICY',
    title: '外国人・ホテルVIP特別料金についてのご案内',
    desc: '外国人観光客・出張者の皆様へ、言葉の不安やトラブルのない最高峰の癒しをお届けするため、出張諸費用・専任通訳サポートを全て含んだVIP定額料金制を採用しております。',
    reasons: [
      {
        icon: '🌐',
        title: '専任日本語コンシェルジュ・LINE/WhatsApp対応',
        desc: 'リアルタイムでの日本語予約受付、ホテル入室やフロント対応の完全サポートを行い、言語の壁を感じさせません。',
      },
      {
        icon: '👑',
        title: '特選20代エースセラピストの最優先手配',
        desc: '外国人のお客様対応に精通し、高い接客マナーと確かな技術を誇る当店最高ランクのセラピストを優先配属いたします。',
      },
      {
        icon: '🚕',
        title: 'ソウル全域ホテル出張交通費・深夜諸費用一式込み',
        desc: 'ソウル全域（江南・明洞・東大門・汝矣島等）のホテル・レジデンスへの迅速な移動交通費が全て含まれており、追加請求は一切ございません。',
      },
      {
        icon: '🛡️',
        title: '100% 完全現地後払い保証＆個別滅菌衛生アメニティ',
        desc: '観光客を狙った前受金詐欺を徹底排除。セラピスト到着後の完全後払い決済です。使い捨て衛生シーツと高級天然アロマオイルを完備してお伺いします。',
      },
    ],
  },
  therapistSection: { label: "TODAY'S THERAPISTS", title: '今夜の代表セラピスト', note: 'ソウル各エリアに専門セラピストが待機中', kakaoBtn: 'WhatsApp', callBtn: '電話指名' },
  therapists: [
    { name: 'ガビン', age: '24歳', spec: '168cm · スレンダー美脚モデル体型', badge: '長身エース', specialty: 'タイ + アロマ 複合ケア', desc: 'すらりと伸びた長身モデル体型と深みのある的確な圧で、疲労を芯から解消。', available: true, img: '/images/t_gabin.jpg' },
    { name: 'ソンイ', age: '25歳', spec: '167cm · 洗練された美脚ライン', badge: '指名TOP', specialty: '正統派ワットポー指圧 + リンパケア', desc: '洗練された雰囲気と繊細な指使い、無駄のない極上ケアで高リピート率。', available: true, img: '/images/t_songi.jpg' },
    { name: 'ジナ', age: '23歳', spec: '169cm · 優雅なスリムロングボディ', badge: 'スタイルNo.1', specialty: 'スペシャル複合ヒーリングケア', desc: '優美なタッチと的確なツボ指圧で、緊張をやさしくほどく実力派。', available: true, img: '/images/t_jina.jpg' },
    { name: 'ボルム', age: '22歳', spec: '160cm · 愛らしい小柄ベーグル', badge: '人気急上昇', specialty: '天然アロマオイルケア', desc: '明るく上品な笑顔と、全身の緊張を心地よく解きほぐす温かい手のひら。', available: true, img: '/images/t_boreum.jpg' },
    { name: 'スウン', age: '23歳', spec: '161cm · 小柄でスリムなシルエット', badge: '癒やし指名', specialty: '心地よい感性アロマ', desc: '凝り固まった肩や腰を重点的にほぐす、オーダーメイドのヒーリング。', available: true, img: '/images/t_sueun.jpg' },
    { name: 'スジ', age: '22歳', spec: '159cm · 小柄で可憐な妖精スタイル', badge: '再予約No.1', specialty: 'タイ + アロマ ミックスケア', desc: '小柄ながらもしっかりとした圧と、心安らぐ寄り添いケア。', available: true, img: '/images/t_suji.jpg' },
    { name: 'アニー', age: '24歳', spec: '162cm · 小柄引き締まりスリムフィット', badge: 'エースヒーラー', specialty: '本格乾式手技指圧', desc: '熟練の指圧スキルとなめらかなオイル手技を兼ね備えた実力派セラピスト。', available: true, img: '/images/t_annie.jpg' },
    { name: 'イェリン', age: '22歳', spec: '162cm · 華奢でやわらかな曲線', badge: 'エースヒーラー', specialty: 'やさしいアロマケア', desc: '温かく丁寧な手技で、日頃のストレスやこわばりをすーっと溶かす癒やし手。', available: true, img: '/images/t_yerin.jpg' },
    { name: 'ジユ', age: '23歳', spec: '160cm · 小柄で魅力的なスタイル', badge: '指名推薦', specialty: '全身リラクシングリンパケア', desc: '疲れ切った心と体を優しく包み込み、極上の安らぎをお届けします。', available: true, img: '/images/t_jiyu.jpg' },
    { name: 'ヘイン', age: '24歳', spec: '161cm · 端麗な小柄スレンダー', badge: '常連最多', specialty: 'タイストレッチ + アロマ', desc: '端麗な魅力と丁寧なトリートメントで、心地よい眠りと深い休息へ導きます。', available: true, img: '/images/t_haein.jpg' },
  ],
  reviewSection: { label: 'REVIEWS', title: 'お客様の声' },
  reviews: [
    { author: 'T.S 様', area: '江南区 ホテル', course: 'スペシャル 90分', text: 'ホテルの客室でゆったり受けられました。タイの爽快な指圧とアロマオイルケアを一度に受けられ、出張の疲れがすっきり取れました。' },
    { author: 'K.M 様', area: '麻浦区 ご自宅', course: 'アロマ 90分', text: '自宅でプライベートに1:1ケアを受けられてとても楽でした。天然オイルのほのかな香りとやさしい手技で深くリラックスできました。' },
    { author: 'H.Y 様', area: '龍山区 ご自宅', course: 'タイ 60分', text: '凝り固まった筋肉をすっきりほぐしていただき、最後のストレッチで体のバランスが整う感覚でした。' },
    { author: 'J.I 様', area: '瑞草区 レジデンス', course: 'タイ 90分', text: '残業後の深夜に予約しましたが迅速に来ていただけました。肩や首回りの凝りを的確に捉えた心地よい圧で、疲労が吹き飛びました。' },
    { author: 'Y.C 様', area: '松坡区 ホテル', course: 'スペシャル 120分', text: '蚕室出張中に利用しました。セラピストさんがとても親切で、タイ指圧とアロマオイルの組み合わせが最高でした。贅沢な2時間を過ごせました。' },
    { author: 'S.J 様', area: '永登浦区 ご自宅', course: 'アロマ 60分', text: '仕事帰りに自宅で気兼ねなくケアを受けられるので、サロンに行く必要がなくなりました。オイルの香りも上質で心身ともに癒やされました。' },
    { author: 'K.H 様', area: '汝矣島 ホテル', course: 'タイ 90分', text: '出張先のホテルで受けましたが、清潔なマットや備品をすべて持参していただけて安心でした。丁寧で心のこもった施術に大満足です。' },
    { author: 'M.Y 様', area: '聖水洞 ご自宅', course: 'スペシャル 90分', text: '時間通りに来ていただき、重かった腰回りが指圧とオイルで軽くなりました。久しぶりに熟睡できました。リピート決定です。' },
    { author: 'S.K 様', area: '鐘路区 ホテル', course: 'アロマ 120分', text: 'ホテルで静かに休息を取りたい時に最適です。マナーも衛生面も徹底されており、非常にリラックスできました。' },
    { author: 'T.O 様', area: '江西区 ご自宅', course: 'タイ 60分', text: '麻谷の自宅まで夜遅くにもかかわらず快く対応してくれました。ツボを的確に捉えた熟練の技に感動しました。次回は90分にします。' },
    { author: 'R.I 様', area: '広津区 ホテル', course: 'スペシャル 90分', text: 'ホカンス中にスマホから簡単に予約できました。1:1で希望部位を重点的にケアしてくださり、疲れが綺麗にリセットされました。' },
  ],
  faqSection: { label: 'FAQ', title: 'よくある質問', sub: 'ご不明な点をすぐに確認できます。' },
  faqs: [
    {
      q: 'ソウルのどこでも訪問できますか？',
      a: 'はい、ソウル全域のお客様がご希望されるプライベート空間へ迅速にお伺いします。\n\n• ご訪問可能エリア・場所:\n  - ご自宅 (マンション · アパート · 一戸建てなど)\n  - ご宿泊施設 (ソウル市内の全ホテル · レジデンス)\n\n• 専任セラピストによる1:1訪問ケアで、安心・快適にご利用いただけます。',
    },
    {
      q: 'ご予約時間と出発時間を教えてください。',
      a: '• ご予約受付: 18:00から\n• マネージャー出発: 19:00から\n• 最終予約受付: 翌朝05:00まで\n\n※ ご予約は18:00から承りますが、マネージャーの出発は19:00からです。\n※ スムーズな手配と迅速な到着のため、1時間前のご予約をおすすめしております。',
    },
    {
      q: '駐車場・1階エントランス・ホテルの利用方法は？',
      a: 'ご予約時に以下を事前にお知らせください。\n\n1. 駐車場\n  - 建物に駐車場がある場合は事前にお知らせください。到着後、マネージャーがお電話いたします。\n\n2. 1階共用エントランス\n  - 暗証番号を事前にお知らせください。\n  - 番号をお伝えしにくい場合は、呼び出しボタン（インターホン）で開錠できることを事前にお伝えください。到着後、マネージャーがお電話のうえボタンを押します。\n  - どちらも難しい場合は、ご予約時に先にご相談ください。\n\n3. ホテル・モーテル\n  - ご予約時にホテル名をお知らせください。到着前にマネージャーがご連絡します。\n  - 1階ロビーでマネージャーと合流し、対面でお支払い(現金・振込・カード)。その後マネージャーがお部屋までご案内します。\n\n• 事前のお振込・予約金は一切不要。100%現場での対面お支払いです。',
    },
    {
      q: 'どんなコースがありますか？',
      a: 'お客様のお好みに合わせた3つのプレミアムコースをご用意しております (60分 / 90分 / 120分):\n\n• タイケア (乾式指圧)\n  - ワットポー伝統の手技指圧で凝り固まった筋肉と疲労を心地よく解消\n\n• アロマケア (天然オイル)\n  - 天然植物性オイルで全身をやさしく包み、リンパ循環と深い休息を促進\n\n• スペシャルケア (タイ + アロマ複合)\n  - 爽快な指圧とやさしいオイルケアを一度に堪能できる当店一番人気コース',
    },
    {
      q: 'コース別の料金を教えてください。',
      a: '全コース明朗会計の定額料金制です。\n\n• タイコース (乾式指圧)\n  -  60分 : 130,000ウォン\n  -  90分 : 150,000ウォン\n  - 120分 : 170,000ウォン\n\n• アロマコース (天然オイル)\n  -  60分 : 140,000ウォン\n  -  90分 : 160,000ウォン\n  - 120分 : 190,000ウォン\n\n• スペシャルコース (タイ + アロマ)\n  -  60分 : 150,000ウォン\n  -  90分 : 170,000ウォン\n  - 120分 : 210,000ウォン\n\n※ 外国人・ホテル特別料金には、専任日本語対応、特選エース優先配属、ソウル全域ホテル出張交通費、100%完全後払い保証が全て含まれております。',
    },
    {
      q: 'ご自宅とホテルのどちらも利用できますか？',
      a: 'はい、お客様がリラックスしてお過ごしいただける空間であればどこでもご利用可能です。\n\n• 居住空間: 自宅マンション、オフィステル、住宅など\n• 宿泊施設: ソウル市内の全ホテル、ビジネスホテル、レジデンス\n\n• セラピストが必要なマットや衛生用品をすべて持参してお伺いしますので、準備不要でそのままお受けいただけます。',
    },
  ],
  contact: { phone: '010-6607-2239', tel: 'tel:+82-10-6607-2239', tagline: '今、あなたの心地よい休息のために', site: 'abam.kr' },
  about: {
    title: 'Abam.kr プライベート1:1訪問ホームケアのご案内',
    p1: 'Abam.kr(美しい夜)は、ソウル全域のご自宅・ホテルなどご希望の空間で受けられるプライベート1:1訪問ホームケアです。ご予約は18:00から、マネージャーの出発は19:00から、最終予約受付は05:00までです。1時間前にご予約いただくと、より快適にご利用いただけます。',
    p2: 'タイ(60分 130,000ウォン〜)、アロマ(60分 140,000ウォン〜)、スペシャル(60分 150,000ウォン〜)の3コースを、60・90・120分からお選びいただけます。',
  },
  footer: {
    title: 'ソウル・京畿全域 プライベート1:1訪問ホームケア',
    sub: 'ソウル25区、水原、盆唐、板橋、一山、富川などソウル・京畿全域のご自宅・ホテルへ迅速訪問',
    line: 'Abam.kr · 美しい夜、あなたのための特別な時間 · PRIVATE HOME CARE SERVICE · ご予約18:00から · 出発19:00から · 最終受付05:00 · お問い合わせ 010-6607-2239',
  },
  cta: { primary: 'whatsapp', kakao: 'KakaoTalk', whatsapp: 'WhatsAppで予約', call: '', callBar: '電話' },
  modal: { title: '', body: '', idLabel: '', copy: '', open: '', close: '', copied: '' },
  globalLine: 'English · 日本語 · 中文 · WhatsApp Concierge',
};

/* ───────────── 中文 ───────────── */
export const CN: LandingContent = {
  lang: 'cn',
  htmlLang: 'zh-CN',
  brandTag: '美丽的夜晚，专属于您的特别时光',
  topBar: { pre: '首尔 · 京畿全境 · 住宅 · 酒店 · ', strong: '预约从18:00开始 · 19:00起出发 · 最晚预约05:00截止' },
  navLabels: { info: '🕕 预约须知', courses: '🍃 课程介绍', price: '💳 COURSE & PRICE', faq: '❓ 常见问题' },
  hero: {
    badge: 'PRIVATE HOME CARE SERVICE',
    tagline: '美丽的夜晚，专属于您的特别时光',
    bannerTitle: ['私密', '上门居家护理'],
    bannerSub: ['首尔 · 京畿', '住宅', '酒店'],
  },
  info: [
    { icon: INFO_ICONS[0], title: '预约从18:00开始', sub: '(19:00起出发 · 最晚预约05:00)' },
    { icon: INFO_ICONS[1], title: '提前1小时预约', sub: '可享受更加舒适的体验。' },
    { icon: INFO_ICONS[2], title: '在您想要的空间', sub: '(住宅 · 酒店等)' },
    { icon: INFO_ICONS[3], title: '私密的', sub: '1:1护理' },
  ],
  courseSection: { label: 'COURSE', title: '泰式 · 芳香 · 特别' },
  courses: [
    { no: 1, name: '泰式', subtitle: '传统干式指压 · 清爽力度', desc: '以卧佛寺传统方式进行干式指压，舒缓僵硬的肌肉，并通过拉伸调整身体的平衡。', img: IMG.thai, icon: '🍃', tint: TINT.thai, prices: PRICES_CN.thai },
    { no: 2, name: '芳香', subtitle: '天然芳香精油 · 温柔护理', desc: '使用天然植物性芳香精油温柔护理全身，帮助淋巴循环并获得深度放松。', img: IMG.aroma, icon: '🌸', tint: TINT.aroma, prices: PRICES_CN.aroma },
    { no: 3, name: '特别', subtitle: '泰式 + 芳香 复合护理', desc: '可同时享受泰式清爽指压与芳香温柔精油护理的高级课程。', img: IMG.special, icon: '🍃🌸', tint: TINT.special, prices: PRICES_CN.special },
  ],
  priceSection: { title: 'COURSE & PRICE', head: '课程', durations: ['60分钟', '90分钟', '120分钟'] },
  priceNotice: {
    tag: 'VIP HOSPITALITY & PRICING POLICY',
    title: '关于国际宾客 VIP 专属定价说明',
    desc: '为确保海外游客及商务出差人士在首尔享有零语言障碍、绝对安全及高标准的奢华体验，本服务采取全包式国际VIP统一定价。',
    reasons: [
      {
        icon: '🌐',
        title: '专属中文/微信实时客服无缝对接',
        desc: '提供全中文一对一预约协助、酒店客房指引与沟通协调，全程无语言阻碍。',
      },
      {
        icon: '👑',
        title: '特选20代顶级王牌理疗师优先派单',
        desc: '优先派遣通过涉外高端礼仪培训、手法精湛且深获好评的资深王牌理疗师。',
      },
      {
        icon: '🚕',
        title: '首尔全境酒店专车快速上门交通费全包',
        desc: '包含前往江南、明洞、汝矣岛等首尔各大酒店、商务公寓的专车交通调度费，明码实价无任何隐形附加费。',
      },
      {
        icon: '🛡️',
        title: '100% 见面现场后付款 & 独立密封卫生耗材',
        desc: '坚决杜绝定金诈骗，理疗师到店当面结算；配备独立包装一次性卫生床单、纯天然植物精油及齐全专业护理备品。',
      },
    ],
  },
  therapistSection: { label: "TODAY'S THERAPISTS", title: '今夜代表理疗师', note: '首尔各区域专业理疗师随时待命', kakaoBtn: 'WhatsApp', callBtn: '电话指名' },
  therapists: [
    { name: '佳彬', age: '24岁', spec: '168cm · 纤细长腿模特身材', badge: '高挑王牌', specialty: '泰式 + 芳香 复合护理', desc: '修长高挑的黄金比例，以深透沉稳的力度彻底扫除全身疲劳。', available: true, img: '/images/t_gabin.jpg' },
    { name: '松伊', age: '25岁', spec: '167cm · 干练美腿与曼妙线条', badge: '指名TOP', specialty: '正统卧佛寺干式指压 + 淋巴护理', desc: '干练优雅的气场与细腻到位的指法，干净利落的护理带来极高满意度。', available: true, img: '/images/t_songi.jpg' },
    { name: '智娜', age: '23岁', spec: '169cm · 优雅修长比例', badge: '比例第一', specialty: '特别复合疗愈护理', desc: '触感优雅温润，指压精准有力，让紧绷的神经彻底放松。', available: true, img: '/images/t_jina.jpg' },
    { name: '宝凛', age: '22岁', spec: '160cm · 娇小可爱甜美比例', badge: '人气飙升', specialty: '天然芳香精油护理', desc: '亲切甜美的微笑与融化身心的温暖触感，带来舒适安心感。', available: true, img: '/images/t_boreum.jpg' },
    { name: '秀恩', age: '23岁', spec: '161cm · 娇小纤秀身形', badge: '疗愈首选', specialty: '温润感性芳香', desc: '针对僵硬的肩颈与腰部进行集中疏通的定制级理疗师。', available: true, img: '/images/t_sueun.jpg' },
    { name: '秀智', age: '22岁', spec: '159cm · 娇小精灵身材清纯迷人', badge: '复订第一', specialty: '泰式 + 芳香 混合护理', desc: '娇小身形中蕴含娴熟扎实的力道，搭配细致贴心的舒缓护理。', available: true, img: '/images/t_suji.jpg' },
    { name: '安妮', age: '24岁', spec: '162cm · 娇小匀称纤美', badge: '王牌理疗师', specialty: '正统干式手法指压', desc: '兼具专业指压技法与柔滑精油手法的实力派理疗师。', available: true, img: '/images/t_annie.jpg' },
    { name: '艺琳', age: '22岁', spec: '162cm · 娇小柔美线条', badge: '王牌理疗师', specialty: '温柔芳香护理', desc: '温热细致的指尖抚触，悄然融化日常生活中的疲惫与紧绷。', available: true, img: '/images/t_yerin.jpg' },
    { name: '知柔', age: '23岁', spec: '160cm · 娇小迷人体态', badge: '重点推荐', specialty: '全身舒缓淋巴护理', desc: '温柔抚平疲惫身心，奉上令人沉醉的极上静谧享受。', available: true, img: '/images/t_jiyu.jpg' },
    { name: '海仁', age: '24岁', spec: '161cm · 端庄娇小苗条', badge: '老客最多', specialty: '泰式拉伸 + 芳香护理', desc: '优雅从容的魅力与一丝不苟的手法，引导您进入深度放松与甜美睡眠。', available: true, img: '/images/t_haein.jpg' },
  ],
  reviewSection: { label: 'REVIEWS', title: '顾客评价' },
  reviews: [
    { author: '王先生', area: '江南区 酒店', course: '特别 90分钟', text: '在酒店客房里舒适地享受。一次就能体验泰式清爽指压和芳香精油护理，出差的疲劳一扫而空。' },
    { author: '李女士', area: '麻浦区 住宅', course: '芳香 90分钟', text: '在家里私密地接受1:1护理，感觉轻松多了。天然精油的淡淡香气和温柔手法让我得到了深度放松。' },
    { author: '张先生', area: '龙山区 住宅', course: '泰式 60分钟', text: '僵硬的肌肉被舒缓开来，最后的拉伸让身体有了平衡的感觉。' },
    { author: '李先生', area: '瑞草区 公寓', course: '泰式 90分钟', text: '加班后深夜预约，1小时内就准时到达了。精准疏通肩颈僵硬酸痛，力度刚刚好，疲劳瞬间消散。' },
    { author: '崔先生', area: '松坡区 酒店', course: '特别 120分钟', text: '在蚕室出差入住酒店期间体验。理疗师温柔礼貌，泰式指压与精油香氛完美结合，2小时深度疗愈。' },
    { author: '郑女士', area: '永登浦区 住宅', course: '芳香 60分钟', text: '下班后在家里就能享受专业护理，完全不用再跑实体店。精油香气高级，全身紧绷感悄然融化。' },
    { author: '韩先生', area: '汝矣岛 酒店', course: '泰式 90分钟', text: '商务会议后在酒店客房享受私密护理，理疗师携带齐全整洁的用品，手法细腻到位，体验绝佳。' },
    { author: '尹先生', area: '圣水洞 住宅', course: '特别 90分钟', text: '预约到圣水洞家中，按时抵达。原本酸沉的腰部通过指压与精油双重护理彻底放松，当晚睡得特别踏实。' },
    { author: '姜先生', area: '钟路区 酒店', course: '芳香 120分钟', text: '在酒店想安静放松的首选。理疗师端庄得体，卫生防护一丝不苟，享受了无微不至的舒缓时光。' },
    { author: '吴先生', area: '江西区 住宅', course: '泰式 60分钟', text: '麻谷家中深夜预约也能迅速安排，手法精准深透，实力过硬。下次准备直接预约90分钟课程。' },
    { author: '林先生', area: '广津区 酒店', course: '特别 90分钟', text: '度假期间微信/WhatsApp轻松预约。1:1量身定制疏通酸痛部位，疲劳一扫而空，强烈推荐！' },
  ],
  faqSection: { label: 'FAQ', title: '常见问题', sub: '快速了解您关心的问题。' },
  faqs: [
    {
      q: '首尔任何地方都可以上门吗？',
      a: '可以，我们可前往首尔全境您指定的任何私密空间。\n\n• 可上门场所:\n  - 住宅空间 (公寓 · 单身公寓 · 别墅 · 住宅等)\n  - 住宿设施 (首尔市内所有酒店 · 商务酒店 · 酒店式公寓)\n\n• 专享1:1上门私密居家护理，安心尽享静谧时光。',
    },
    {
      q: '预约时间和出发时间是怎样的？',
      a: '• 预约受理: 18:00开始\n• 经理出发: 19:00开始\n• 最晚预约截止: 次日凌晨05:00\n\n※ 18:00起接受预约，但经理19:00起才出发。\n※ 为确保顺利安排并准时抵达，建议提前1小时预约。',
    },
    {
      q: '停车场、一楼公共大门和酒店要如何配合？',
      a: '预约时请提前告知以下信息。\n\n1. 停车场\n  - 如大楼有停车场，请提前告知。到达后经理会致电联系您。\n\n2. 一楼公共大门\n  - 请提前告知大门密码。\n  - 如不方便告知密码，请提前说明您可通过呼叫(门铃)按钮开门。到达后经理会先致电，再按下呼叫按钮。\n  - 如两者都不方便，请在预约时先与我们沟通。\n\n3. 酒店 / 汽车旅馆\n  - 预约时请告知酒店名称，经理到达前会提前联系您。\n  - 在一楼大堂与经理会合并当面付款(现金、转账或刷卡)，随后经理会接您并陪同前往客房。\n\n• 不收取任何定金，100%现场当面付款。',
    },
    {
      q: '有哪些课程？',
      a: '根据您的身体状态精心定制3种高级课程 (可选 60分钟 / 90分钟 / 120分钟):\n\n• 泰式护理 (干式指压)\n  - 传承卧佛寺正统手法，舒缓深层肌肉酸痛与疲劳\n\n• 芳香护理 (天然精油)\n  - 采用天然植物精油温柔包裹全身，促进淋巴排毒与深度放松\n\n• 特别护理 (泰式 + 芳香复合)\n  - 兼具泰式清爽透彻的指压与芳香精油舒缓的招牌人气课程',
    },
    {
      q: '各课程的价格是多少？',
      a: '全课程明码标价，透明公开:\n\n• 泰式课程 (干式指压)\n  -  60分钟 : 130,000韩元\n  -  90分钟 : 150,000韩元\n  - 120分钟 : 170,000韩元\n\n• 芳香课程 (天然精油)\n  -  60分钟 : 140,000韩元\n  -  90分钟 : 160,000韩元\n  - 120分钟 : 190,000韩元\n\n• 特别课程 (泰式 + 芳香)\n  -  60分钟 : 150,000韩元\n  -  90分钟 : 170,000韩元\n  - 120分钟 : 210,000韩元\n\n※ 国际宾客专属价格已全包中文专职客服、顶级王牌优先派遣、首尔酒店快速上门交通费及100%现场后付保障。',
    },
    {
      q: '住宅和酒店都可以使用吗？',
      a: '可以，只要是能让您安心放松的私密空间均可使用。\n\n• 住宅空间: 私人住宅、公寓、单身公寓等\n• 酒店设施: 首尔市内各大酒店、商务酒店、服务式公寓\n\n• 理疗师会携带所需的专用垫褥及卫生耗材上门，无需您做额外准备。',
    },
  ],
  contact: { phone: '010-6607-2239', tel: 'tel:+82-10-6607-2239', tagline: '现在，为您舒适的休息', site: 'abam.kr' },
  about: {
    title: 'Abam.kr 私密1:1上门居家护理说明',
    p1: 'Abam.kr(美丽的夜晚)是前往首尔全境住宅、酒店等您指定空间的私密1:1上门居家护理服务。预约从18:00开始，经理19:00起出发，最晚预约截止时间为05:00。提前1小时预约可享受更加舒适的体验。',
    p2: '泰式(60分钟 130,000韩元起)、芳香(60分钟 140,000韩元起)、特别(60分钟 150,000韩元起)三种课程，可选择60、90、120分钟。',
  },
  footer: {
    title: '首尔 · 京畿全境 私密1:1上门居家护理',
    sub: '首尔25区、水原、盆唐、板桥、一山、富川等首尔·京畿全境住宅 · 酒店上门',
    line: 'Abam.kr · 美丽的夜晚，专属于您的特别时光 · PRIVATE HOME CARE SERVICE · 预约18:00开始 · 19:00起出发 · 最晚预约05:00 · 客服 010-6607-2239',
  },
  cta: { primary: 'whatsapp', kakao: 'KakaoTalk', whatsapp: 'WhatsApp 预约', call: '', callBar: '电话' },
  modal: { title: '', body: '', idLabel: '', copy: '', open: '', close: '', copied: '' },
  globalLine: 'English · 日本語 · 中文 · WhatsApp Concierge',
};
