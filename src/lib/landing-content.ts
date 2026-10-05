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

const INFO_ICONS = ['🕕', '📅', '🏠', '🛡️'];

/* ───────────── 한국어 ───────────── */
export const KO: LandingContent = {
  lang: 'ko',
  htmlLang: 'ko',
  brandTag: '아름다운 밤, 당신을 위한 특별한 시간',
  topBar: { pre: '서울 전역 · 자택 · 호텔 · ', strong: '예약은 18:00부터 (영업 19:00 ~ 05:00)' },
  navLabels: { info: '🕕 예약 안내', courses: '🍃 코스 소개', price: '💳 COURSE & PRICE', faq: '❓ 자주묻는 질문' },
  hero: {
    badge: 'PRIVATE HOME CARE SERVICE',
    tagline: '아름다운 밤, 당신을 위한 특별한 시간',
    bannerTitle: ['프라이빗', '방문 홈케어'],
    bannerSub: ['서울 전역', '자택', '호텔'],
  },
  info: [
    { icon: INFO_ICONS[0], title: '예약은 18:00부터', sub: '(영업 19:00 ~ 05:00)' },
    { icon: INFO_ICONS[1], title: '1시간 전 예약 시', sub: '더욱 편안하게 이용 가능합니다.' },
    { icon: INFO_ICONS[2], title: '원하는 공간에서', sub: '(자택 · 호텔 등)' },
    { icon: INFO_ICONS[3], title: '프라이빗한', sub: '1:1 케어' },
  ],
  courseSection: { label: 'COURSE', title: '타이 · 아로마 · 스페셜' },
  courses: [
    { no: 1, name: '타이', subtitle: '전통 건식 지압 · 시원한 압', desc: '왓포 전통 방식의 건식 지압으로 뭉친 근육을 시원하게 풀어주고 스트레칭으로 몸의 균형을 잡아줍니다.', img: IMG.thai, icon: '🍃', tint: TINT.thai, prices: PRICES.thai },
    { no: 2, name: '아로마', subtitle: '천연 아로마 오일 · 부드러운 케어', desc: '천연 식물성 아로마 오일을 사용하여 부드럽게 전신을 케어하고 림프 순환과 깊은 휴식을 돕습니다.', img: IMG.aroma, icon: '🌸', tint: TINT.aroma, prices: PRICES.aroma },
    { no: 3, name: '스페셜', subtitle: '타이 + 아로마 복합 케어', desc: '타이의 시원한 지압과 아로마의 부드러운 오일 관리를 동시에 받을 수 있는 프리미엄 코스입니다.', img: IMG.special, icon: '🍃🌸', tint: TINT.special, prices: PRICES.special },
  ],
  priceSection: { title: 'COURSE & PRICE', head: '코스', durations: ['60분', '90분', '120분'] },
  therapistSection: { label: "TODAY'S THERAPISTS", title: '오늘 밤 대표 테라피스트', note: '서울 권역별 전문 테라피스트 상시 대기 중', kakaoBtn: '카톡지명', callBtn: '전화지명' },
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
    { author: '김*호 님', area: '강남구 호텔', course: '스페셜 90분', text: '호텔 객실에서 편안하게 받았습니다. 타이의 시원한 지압과 아로마 오일 케어를 한 번에 받을 수 있어서 출장 피로가 말끔히 풀렸습니다.' },
    { author: '박*훈 님', area: '마포구 자택', course: '아로마 90분', text: '집에서 프라이빗하게 1:1로 케어받으니 훨씬 편했습니다. 천연 오일의 은은한 향과 부드러운 손길 덕분에 깊은 휴식을 취했습니다.' },
    { author: '조*현 님', area: '용산구 자택', course: '타이 60분', text: '뭉친 근육을 시원하게 풀어주고 마무리 스트레칭까지 해주셔서 몸의 균형이 잡히는 느낌이었습니다.' },
    { author: '이*준 님', area: '서초구 오피스텔', course: '타이 90분', text: '야근 마치고 늦은 밤에 예약했는데 1시간 만에 바로 와주셨어요. 어깨랑 승모근 뭉친 데를 짚어주시는데 압이 딱 좋아서 피로가 싹 풀렸습니다.' },
    { author: '최*우 님', area: '송파구 호텔', course: '스페셜 120분', text: '잠실 출장 중에 이용했습니다. 매니저님이 정말 친절하시고 타이 지압과 아로마 오일 조합이 환상적이네요. 2시간 동안 온전히 힐링했습니다.' },
    { author: '정*진 님', area: '영등포구 자택', course: '아로마 60분', text: '퇴근 후 집에서 편하게 쉬면서 관리받으니 샵에 갈 필요가 전혀 없네요. 아로마 향도 고급스럽고 온몸의 긴장이 사르르 풀렸습니다.' },
    { author: '한*원 님', area: '여의도 호텔', course: '타이 90분', text: '비즈니스 미팅 끝나고 묵는 호텔에서 프라이빗하게 받으니 너무 만족스럽습니다. 필요한 관리 매트와 용품을 전부 구비해 오셔서 아주 편안했습니다.' },
    { author: '윤*민 님', area: '성동구 자택', course: '스페셜 90분', text: '성수동 자택으로 불렀는데 약속 시간에 딱 맞춰 오셨어요. 허리 쪽 뻐근했던 게 지압과 오일 케어로 말끔히 풀려서 오랜만에 꿀잠 잤습니다.' },
    { author: '강*석 님', area: '종로구 호텔', course: '아로마 120분', text: '호텔에서 조용히 혼자 릴랙스하기에 최고였습니다. 테라피스트분 매너도 단정하시고 위생도 철저해서 안심하고 받았습니다.' },
    { author: '오*택 님', area: '강서구 자택', course: '타이 60분', text: '마곡 자택인데 늦은 시간에도 빠른 배정 감사했습니다. 손끝 야무진 압이 정말 수준급이어서 다음엔 90분 코스로 길게 이용하려 합니다.' },
    { author: '임*규 님', area: '광진구 호텔', course: '스페셜 90분', text: '건대 호캉스 중에 카톡으로 간편하게 예약했어요. 1:1로 뭉친 부위를 집중 케어해 주셔서 묵은 피로가 완전히 사라졌습니다. 추천합니다.' },
  ],
  faqSection: { label: 'FAQ', title: '자주 묻는 질문', sub: '궁금하신 점을 빠르게 확인하세요.' },
  faqs: [
    {
      q: '서울 어디든 방문 가능한가요?',
      a: '네, 서울 전역 어디든 고객님이 원하시는 프라이빗한 공간으로 방문해 드립니다.\n\n• 방문 가능 장소:\n  - 자택 (아파트 · 오피스텔 · 빌라 · 단독주택 등)\n  - 숙박시설 (서울 전역 호텔 · 모텔 · 비즈니스 레지던스)\n\n• 1:1 방문 전담 케어로 조용하고 편안하게 이용하실 수 있습니다.',
    },
    {
      q: '예약과 영업 시간은 어떻게 되나요?',
      a: '• 사전 예약 접수: 18:00부터 가능\n• 현장 영업 시간: 19:00 ~ 익일 05:00 (연중무휴)\n\n※ 원활한 매니저 배정과 빠른 방문을 위해 이용 1시간 전 사전 예약을 권장해 드립니다.',
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
      a: '네, 고객님께서 머무시는 프라이빗한 공간 어디서든 이용 가능합니다.\n\n• 주거 공간: 아파트, 오피스텔, 빌라, 단독주택 등 자택\n• 숙박 시설: 서울 시내 모든 호텔, 모텔, 레지던스\n\n• 전담 테라피스트가 필요한 모든 관리용품 및 위생 소모품을 구비하여 방문하므로 별도의 준비 없이 편안하게 받으시면 됩니다.',
    },
  ],
  contact: { phone: '010-6607-2239', tel: 'tel:010-6607-2239', tagline: '지금, 당신의 편안한 휴식을 위해', site: 'abam.kr' },
  about: {
    title: 'Abam.kr 프라이빗 1:1 방문 홈케어 이용 안내',
    p1: 'Abam.kr(아름다운 밤)은 서울 전역의 자택·호텔 등 원하시는 공간에서 받는 프라이빗 1:1 방문 홈케어입니다. 예약은 18:00부터 가능하며 영업 시간은 19:00부터 05:00까지입니다. 1시간 전에 예약해 주시면 더욱 편안하게 이용하실 수 있습니다.',
    p2: '타이(60분 80,000원~), 아로마(60분 90,000원~), 스페셜(60분 100,000원~) 3가지 코스를 60·90·120분 중에서 선택할 수 있습니다.',
  },
  footer: {
    title: '서울 전역 프라이빗 1:1 방문 홈케어',
    sub: '강남, 서초, 송파, 마포, 용산, 여의도, 성수, 영등포 등 서울 전역 자택 · 호텔 방문',
    line: 'Abam.kr · 아름다운 밤, 당신을 위한 특별한 시간 · PRIVATE HOME CARE SERVICE · 예약 18:00부터 (영업 19:00 ~ 05:00) · 고객센터 010-6607-2239',
  },
  cta: { primary: 'kakao', kakao: '카카오톡 1:1 상담', whatsapp: 'WhatsApp', call: '', callBar: '전화예약' },
  modal: { title: '카카오톡 1:1 예약 상담', body: '친구 추가 후 희망 코스와 방문 장소를 말씀해 주세요.', idLabel: '카카오톡 공식 ID', copy: 'ID 복사', open: '카카오톡 열기', close: '닫기', copied: `카톡 ID [${KAKAO_ID}] 복사 완료` },
  globalLine: 'English · 日本語 · 中文 · WhatsApp',
};

/* ───────────── English ───────────── */
export const EN: LandingContent = {
  lang: 'en',
  htmlLang: 'en',
  brandTag: 'A beautiful night, a special time just for you',
  topBar: { pre: 'All of Seoul · Home · Hotel · ', strong: 'Booking from 18:00 (Open 19:00 ~ 05:00)' },
  navLabels: { info: '🕕 Booking Info', courses: '🍃 Courses', price: '💳 COURSE & PRICE', faq: '❓ FAQ' },
  hero: {
    badge: 'PRIVATE HOME CARE SERVICE',
    tagline: 'A beautiful night, a special time just for you',
    bannerTitle: ['Private', 'Home Visit Care'],
    bannerSub: ['All of Seoul', 'Home', 'Hotel'],
  },
  info: [
    { icon: INFO_ICONS[0], title: 'Booking from 18:00', sub: '(Open 19:00 ~ 05:00)' },
    { icon: INFO_ICONS[1], title: 'Book 1 hour ahead', sub: 'for an even more comfortable experience.' },
    { icon: INFO_ICONS[2], title: 'Anywhere you like', sub: '(Home · Hotel, etc.)' },
    { icon: INFO_ICONS[3], title: 'Private', sub: '1:1 Care' },
  ],
  courseSection: { label: 'COURSE', title: 'Thai · Aroma · Special' },
  courses: [
    { no: 1, name: 'Thai', subtitle: 'Traditional dry acupressure · Refreshing pressure', desc: 'Traditional Wat Pho-style dry acupressure releases tight muscles, and stretching restores your body’s balance.', img: IMG.thai, icon: '🍃', tint: TINT.thai, prices: PRICES.thai },
    { no: 2, name: 'Aroma', subtitle: 'Natural aroma oil · Gentle care', desc: 'Using natural plant-based aroma oils, we gently care for your whole body and support lymphatic circulation and deep rest.', img: IMG.aroma, icon: '🌸', tint: TINT.aroma, prices: PRICES.aroma },
    { no: 3, name: 'Special', subtitle: 'Thai + Aroma combination care', desc: 'A premium course that combines the refreshing acupressure of Thai and the gentle oil treatment of Aroma at the same time.', img: IMG.special, icon: '🍃🌸', tint: TINT.special, prices: PRICES.special },
  ],
  priceSection: { title: 'COURSE & PRICE', head: 'Course', durations: ['60 min', '90 min', '120 min'] },
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
      q: 'What are the booking and opening hours?',
      a: '• Booking Open: From 18:00\n• Service Hours: 19:00 ~ 05:00 next morning (Open 365 days)\n\n※ We recommend booking 1 hour ahead for optimal schedule coordination and prompt arrival.',
    },
    {
      q: 'What courses do you offer?',
      a: 'We offer 3 tailored premium courses (60 / 90 / 120 minutes):\n\n• Thai Care (Dry Acupressure)\n  - Traditional Wat Pho dry acupressure to release muscle knots and restore balance\n\n• Aroma Care (Natural Essential Oil)\n  - Gentle plant-based oil care promoting lymphatic circulation and deep recovery\n\n• Special Care (Thai + Aroma Combined)\n  - Our signature course blending refreshing acupressure and soothing oil therapy',
    },
    {
      q: 'How much is each course?',
      a: 'Transparent flat-rate pricing across all courses:\n\n• Thai Care (Dry)\n  -  60 min :  ₩80,000\n  -  90 min : ₩100,000\n  - 120 min : ₩120,000\n\n• Aroma Care (Oil)\n  -  60 min :  ₩90,000\n  -  90 min : ₩110,000\n  - 120 min : ₩140,000\n\n• Special Care (Thai + Aroma)\n  -  60 min : ₩100,000\n  -  90 min : ₩120,000\n  - 120 min : ₩160,000',
    },
    {
      q: 'Can I use it at both home and hotel?',
      a: 'Yes, anywhere you can comfortably rest.\n\n• Residential: Apartments, private houses, studio lofts\n• Hospitality: All hotels, boutique hotels, and business residences\n\n• Your therapist brings all necessary massage mats and hygienic supplies for a hassle-free experience.',
    },
  ],
  contact: { phone: '010-6607-2239', tel: 'tel:+82-10-6607-2239', tagline: 'Right now, for your comfortable rest', site: 'abam.kr' },
  about: {
    title: 'About Abam.kr Private 1:1 Home Visit Care',
    p1: 'Abam.kr (A Beautiful Night) is a private 1:1 home visit care service delivered to the space of your choice across Seoul, such as your home or hotel. Booking is available from 18:00 and we are open from 19:00 to 05:00. Booking 1 hour ahead lets you enjoy an even more comfortable experience.',
    p2: 'Choose from 3 courses — Thai (from ₩80,000 / 60 min), Aroma (from ₩90,000 / 60 min) and Special (from ₩100,000 / 60 min) — in 60, 90 or 120 minutes.',
  },
  footer: {
    title: 'Private 1:1 Home Visit Care across Seoul',
    sub: 'Gangnam, Seocho, Songpa, Mapo, Yongsan, Yeouido, Seongsu, Yeongdeungpo and all of Seoul — home & hotel visits',
    line: 'Abam.kr · A beautiful night, a special time just for you · PRIVATE HOME CARE SERVICE · Booking from 18:00 (Open 19:00 ~ 05:00) · Contact 010-6607-2239',
  },
  cta: { primary: 'whatsapp', kakao: 'KakaoTalk', whatsapp: 'WhatsApp Booking', call: '', callBar: 'Call' },
  modal: { title: '', body: '', idLabel: '', copy: '', open: '', close: '', copied: '' },
  globalLine: '한국어 · 日本語 · 中文 · WhatsApp',
};

/* ───────────── 日本語 ───────────── */
export const JP: LandingContent = {
  lang: 'jp',
  htmlLang: 'ja',
  brandTag: '美しい夜、あなたのための特別な時間',
  topBar: { pre: 'ソウル全域 · ご自宅 · ホテル · ', strong: 'ご予約は18:00から (営業 19:00 ~ 05:00)' },
  navLabels: { info: '🕕 ご予約案内', courses: '🍃 コース紹介', price: '💳 COURSE & PRICE', faq: '❓ よくある質問' },
  hero: {
    badge: 'PRIVATE HOME CARE SERVICE',
    tagline: '美しい夜、あなたのための特別な時間',
    bannerTitle: ['プライベート', '訪問ホームケア'],
    bannerSub: ['ソウル全域', 'ご自宅', 'ホテル'],
  },
  info: [
    { icon: INFO_ICONS[0], title: 'ご予約は18:00から', sub: '(営業 19:00 ~ 05:00)' },
    { icon: INFO_ICONS[1], title: '1時間前のご予約で', sub: 'より快適にご利用いただけます。' },
    { icon: INFO_ICONS[2], title: 'ご希望の空間で', sub: '(ご自宅 · ホテルなど)' },
    { icon: INFO_ICONS[3], title: 'プライベートな', sub: '1:1ケア' },
  ],
  courseSection: { label: 'COURSE', title: 'タイ · アロマ · スペシャル' },
  courses: [
    { no: 1, name: 'タイ', subtitle: '伝統的な乾式指圧 · 爽快な圧', desc: 'ワットポー伝統式の乾式指圧で凝り固まった筋肉をすっきりほぐし、ストレッチで体のバランスを整えます。', img: IMG.thai, icon: '🍃', tint: TINT.thai, prices: PRICES.thai },
    { no: 2, name: 'アロマ', subtitle: '天然アロマオイル · やさしいケア', desc: '天然植物性アロマオイルを使用して全身をやさしくケアし、リンパの流れと深いリラックスをサポートします。', img: IMG.aroma, icon: '🌸', tint: TINT.aroma, prices: PRICES.aroma },
    { no: 3, name: 'スペシャル', subtitle: 'タイ + アロマ 複合ケア', desc: 'タイの爽快な指圧とアロマのやさしいオイルトリートメントを同時に受けられるプレミアムコースです。', img: IMG.special, icon: '🍃🌸', tint: TINT.special, prices: PRICES.special },
  ],
  priceSection: { title: 'COURSE & PRICE', head: 'コース', durations: ['60分', '90分', '120分'] },
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
      q: 'ご予約と営業時間を教えてください。',
      a: '• ご予約受付: 18:00から受付可能\n• 営業稼働時間: 19:00 ~ 翌朝05:00 (年中無休)\n\n※ スムーズなセラピスト手配と迅速な到着のため、1時間前のご予約をおすすめしております。',
    },
    {
      q: 'どんなコースがありますか？',
      a: 'お客様のお好みに合わせた3つのプレミアムコースをご用意しております (60分 / 90分 / 120分):\n\n• タイケア (乾式指圧)\n  - ワットポー伝統の手技指圧で凝り固まった筋肉と疲労を心地よく解消\n\n• アロマケア (天然オイル)\n  - 天然植物性オイルで全身をやさしく包み、リンパ循環と深い休息を促進\n\n• スペシャルケア (タイ + アロマ複合)\n  - 爽快な指圧とやさしいオイルケアを一度に堪能できる当店一番人気コース',
    },
    {
      q: 'コース別の料金を教えてください。',
      a: '全コース明朗会計の定額料金制です。\n\n• タイコース (乾式指圧)\n  -  60分 :  80,000ウォン\n  -  90分 : 100,000ウォン\n  - 120分 : 120,000ウォン\n\n• アロマコース (天然オイル)\n  -  60分 :  90,000ウォン\n  -  90分 : 110,000ウォン\n  - 120分 : 140,000ウォン\n\n• スペシャルコース (タイ + アロマ)\n  -  60分 : 100,000ウォン\n  -  90分 : 120,000ウォン\n  - 120分 : 160,000ウォン',
    },
    {
      q: 'ご自宅とホテルのどちらも利用できますか？',
      a: 'はい、お客様がリラックスしてお過ごしいただける空間であればどこでもご利用可能です。\n\n• 居住空間: 自宅マンション、オフィステル、住宅など\n• 宿泊施設: ソウル市内の全ホテル、ビジネスホテル、レジデンス\n\n• セラピストが必要なマットや衛生用品をすべて持参してお伺いしますので、準備不要でそのままお受けいただけます。',
    },
  ],
  contact: { phone: '010-6607-2239', tel: 'tel:+82-10-6607-2239', tagline: '今、あなたの心地よい休息のために', site: 'abam.kr' },
  about: {
    title: 'Abam.kr プライベート1:1訪問ホームケアのご案内',
    p1: 'Abam.kr(美しい夜)は、ソウル全域のご自宅・ホテルなどご希望の空間で受けられるプライベート1:1訪問ホームケアです。ご予約は18:00から可能で、営業時間は19:00から05:00までです。1時間前にご予約いただくと、より快適にご利用いただけます。',
    p2: 'タイ(60分 80,000ウォン〜)、アロマ(60分 90,000ウォン〜)、スペシャル(60分 100,000ウォン〜)の3コースを、60・90・120分からお選びいただけます。',
  },
  footer: {
    title: 'ソウル全域 プライベート1:1訪問ホームケア',
    sub: '江南、瑞草、松坡、麻浦、龍山、汝矣島、聖水、永登浦などソウル全域のご自宅・ホテルへ訪問',
    line: 'Abam.kr · 美しい夜、あなたのための特別な時間 · PRIVATE HOME CARE SERVICE · ご予約18:00から (営業 19:00 ~ 05:00) · お問い合わせ 010-6607-2239',
  },
  cta: { primary: 'whatsapp', kakao: 'KakaoTalk', whatsapp: 'WhatsAppで予約', call: '', callBar: '電話' },
  modal: { title: '', body: '', idLabel: '', copy: '', open: '', close: '', copied: '' },
  globalLine: '한국어 · English · 中文 · WhatsApp',
};

/* ───────────── 中文 ───────────── */
export const CN: LandingContent = {
  lang: 'cn',
  htmlLang: 'zh-CN',
  brandTag: '美丽的夜晚，专属于您的特别时光',
  topBar: { pre: '首尔全境 · 住宅 · 酒店 · ', strong: '预约从18:00开始 (营业 19:00 ~ 05:00)' },
  navLabels: { info: '🕕 预约须知', courses: '🍃 课程介绍', price: '💳 COURSE & PRICE', faq: '❓ 常见问题' },
  hero: {
    badge: 'PRIVATE HOME CARE SERVICE',
    tagline: '美丽的夜晚，专属于您的特别时光',
    bannerTitle: ['私密', '上门居家护理'],
    bannerSub: ['首尔全境', '住宅', '酒店'],
  },
  info: [
    { icon: INFO_ICONS[0], title: '预约从18:00开始', sub: '(营业 19:00 ~ 05:00)' },
    { icon: INFO_ICONS[1], title: '提前1小时预约', sub: '可享受更加舒适的体验。' },
    { icon: INFO_ICONS[2], title: '在您想要的空间', sub: '(住宅 · 酒店等)' },
    { icon: INFO_ICONS[3], title: '私密的', sub: '1:1护理' },
  ],
  courseSection: { label: 'COURSE', title: '泰式 · 芳香 · 特别' },
  courses: [
    { no: 1, name: '泰式', subtitle: '传统干式指压 · 清爽力度', desc: '以卧佛寺传统方式进行干式指压，舒缓僵硬的肌肉，并通过拉伸调整身体的平衡。', img: IMG.thai, icon: '🍃', tint: TINT.thai, prices: PRICES.thai },
    { no: 2, name: '芳香', subtitle: '天然芳香精油 · 温柔护理', desc: '使用天然植物性芳香精油温柔护理全身，帮助淋巴循环并获得深度放松。', img: IMG.aroma, icon: '🌸', tint: TINT.aroma, prices: PRICES.aroma },
    { no: 3, name: '特别', subtitle: '泰式 + 芳香 复合护理', desc: '可同时享受泰式清爽指压与芳香温柔精油护理的高级课程。', img: IMG.special, icon: '🍃🌸', tint: TINT.special, prices: PRICES.special },
  ],
  priceSection: { title: 'COURSE & PRICE', head: '课程', durations: ['60分钟', '90分钟', '120分钟'] },
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
      q: '预约和营业时间是怎样的？',
      a: '• 预约受理: 18:00开始接受预约\n• 营业时间: 19:00 ~ 次日05:00 (全年无休)\n\n※ 为确保顺利安排专属理疗师并准时抵达，建议提前1小时预约。',
    },
    {
      q: '有哪些课程？',
      a: '根据您的身体状态精心定制3种高级课程 (可选 60分钟 / 90分钟 / 120分钟):\n\n• 泰式护理 (干式指压)\n  - 传承卧佛寺正统手法，舒缓深层肌肉酸痛与疲劳\n\n• 芳香护理 (天然精油)\n  - 采用天然植物精油温柔包裹全身，促进淋巴排毒与深度放松\n\n• 特别护理 (泰式 + 芳香复合)\n  - 兼具泰式清爽透彻的指压与芳香精油舒缓的招牌人气课程',
    },
    {
      q: '各课程的价格是多少？',
      a: '全课程明码标价，透明公开:\n\n• 泰式课程 (干式指压)\n  -  60分钟 :  80,000韩元\n  -  90分钟 : 100,000韩元\n  - 120分钟 : 120,000韩元\n\n• 芳香课程 (天然精油)\n  -  60分钟 :  90,000韩元\n  -  90分钟 : 110,000韩元\n  - 120分钟 : 140,000韩元\n\n• 特别课程 (泰式 + 芳香)\n  -  60分钟 : 100,000韩元\n  -  90分钟 : 120,000韩元\n  - 120分钟 : 160,000韩元',
    },
    {
      q: '住宅和酒店都可以使用吗？',
      a: '可以，只要是能让您安心放松的私密空间均可使用。\n\n• 住宅空间: 私人住宅、公寓、单身公寓等\n• 酒店设施: 首尔市内各大酒店、商务酒店、服务式公寓\n\n• 理疗师会携带所需的专用垫褥及卫生耗材上门，无需您做额外准备。',
    },
  ],
  contact: { phone: '010-6607-2239', tel: 'tel:+82-10-6607-2239', tagline: '现在，为您舒适的休息', site: 'abam.kr' },
  about: {
    title: 'Abam.kr 私密1:1上门居家护理说明',
    p1: 'Abam.kr(美丽的夜晚)是前往首尔全境住宅、酒店等您指定空间的私密1:1上门居家护理服务。预约从18:00开始，营业时间为19:00至05:00。提前1小时预约可享受更加舒适的体验。',
    p2: '泰式(60分钟 80,000韩元起)、芳香(60分钟 90,000韩元起)、特别(60分钟 100,000韩元起)三种课程，可选择60、90、120分钟。',
  },
  footer: {
    title: '首尔全境 私密1:1上门居家护理',
    sub: '江南、瑞草、松坡、麻浦、龙山、汝矣岛、圣水、永登浦等首尔全境住宅 · 酒店上门',
    line: 'Abam.kr · 美丽的夜晚，专属于您的特别时光 · PRIVATE HOME CARE SERVICE · 预约18:00开始 (营业 19:00 ~ 05:00) · 客服 010-6607-2239',
  },
  cta: { primary: 'whatsapp', kakao: 'KakaoTalk', whatsapp: 'WhatsApp 预约', call: '', callBar: '电话' },
  modal: { title: '', body: '', idLabel: '', copy: '', open: '', close: '', copied: '' },
  globalLine: '한국어 · English · 日本語 · WhatsApp',
};
