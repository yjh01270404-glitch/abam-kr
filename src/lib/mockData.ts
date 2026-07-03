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
  requirements: string;
  workHours: string;
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

// 1. VIP/Premium (Top) Banners - Luxury card view (16 entries)
export const topBanners: JobAd[] = Array.from({ length: 16 }).map((_, i) => {
  const titles = [
    `[청담] 하이엔드 위스키 펍 메인 바텐더 & 소믈리에`,
    `[논현] 회원제 럭셔리 라운지 에이스 스태프 급구`,
    `[역삼] 프라이빗 모던 클래식바 매니저 모집`,
    `[신사] 가로수길 핫플 라운지 펍 의전/의상 모델`,
    `[해운대] 오션뷰 스카이라운지 칵테일바 스태프`,
    `[수성] 최고급 멤버십 와인바 전담 바텐더`,
    `[분당] 정자동 정통 클래식바 바텐더 신입/경력`,
    `[마포] 홍대 이색 테마 라운지 펍 여성 바텐더`
  ];
  const locations = ['서울 강남구 청담동', '서울 강남구 논현동', '서울 강남구 역삼동', '서울 강남구 신사동', '부산 해운대구 우동', '대구 수성구 범어동', '경기 성남시 분당구', '서울 마포구 서교동'];
  const pays = ['일급 500,000원 + @', '주급 3,000,000원', '월급 8,000,000원 + 인센', '시급 80,000원', '일급 450,000원', '주급 2,500,000원', '시급 70,000원', '일급 400,000원'];
  const companies = ['청담 시그널', '논현 클라우드', '역삼 디 아틀리에', '신사 밸벳', '해운대 오션스타', '수성 라벨르', '분당 가이아', '마포 언더그라운드'];
  
  const index = i % titles.length;
  return {
    id: `top-${i}`,
    type: 'top',
    title: `${titles[index]} (${i + 1}호점)`,
    companyName: companies[index],
    location: locations[index],
    pay: pays[index],
    image: `https://images.unsplash.com/photo-1574096079513-d8259312b785?q=80&w=400&auto=format&fit=crop&sig=${i}`,
    viewCount: 1200 + i * 45,
    description: '최고의 시설과 우아한 근무 환경을 보장합니다. 철저한 회원제로 운영되며, 초보자분들도 당일 적응하실 수 있도록 교육 지원해 드립니다.',
    requirements: '20세 이상 성인, 밝고 성실하신 분, 대학생/휴학생 환영',
    workHours: '오후 7시 ~ 오전 2시 (출퇴근 유동적 조율 가능)'
  };
});

// 2. Priority Jobs (우대채용정보) - Colorful border grid (24 entries)
export const priorityJobs: JobAd[] = Array.from({ length: 24 }).map((_, i) => {
  const titles = [
    `★초보/대학생 환영★ 깔끔하고 매너 좋은 칵테일바`,
    `[당일지급] 서면 서부 모던라운지 바텐더 & 홀서빙`,
    `[꿀알바] 영등포 타임스퀘어 인근 모던 펍 단기 스태프`,
    `[최고대우] 수완지구 분위기 좋은 바 릴랙스`,
    `[복장자유] 동성로 세련된 와인바 파트타이머`,
    `[당일정산] 상남동 중심가 라운지 바 스태프 구인`
  ];
  const locations = ['서울 마포구', '부산 부산진구', '서울 영등포구', '광주 광산구', '대구 중구', '경남 창원시 성산구'];
  const pays = ['시급 55,000원', '일급 350,000원', '시급 50,000원', '주급 2,000,000원', '시급 48,000원', '일급 300,000원'];
  const tags = ['당일지급', '초보환영', '복장자유', '숙식지원', '투잡가능', '단기알바'];
  const companies = ['레몬 드롭', '서면 퍼플', '골드 펍', '수완 릴랙스', '클라렛 와인바', '상남 더블랙'];
  
  const index = i % titles.length;
  return {
    id: `pri-${i}`,
    type: 'priority',
    title: titles[index],
    companyName: companies[index],
    location: locations[index],
    pay: pays[index],
    tag: tags[i % tags.length],
    viewCount: 650 + i * 20,
    description: '초보자도 30분 만에 바로 적응할 수 있는 간단하고 쾌적한 테이블 정리 및 음료 제조 업무입니다. 친구분들과 동반 지원도 적극 환영합니다.',
    requirements: '20세 이상 35세 이하 여성 스태프 구인',
    workHours: '오후 8시 ~ 오전 3시 (요일 선택제 근무 가능)'
  };
});

// 3. Recommended Jobs (추천채용정보) - Clean layout cards (32 entries)
export const recommendedJobs: JobAd[] = Array.from({ length: 32 }).map((_, i) => {
  const titles = [
    `[꿀바] 신촌 인근 감성바 스태프 구합니다 (당일지급)`,
    `[주말알바] 여의도 와인 라운지 금/토/일 파트타이머`,
    `인천 송도 최고시설 라운지바 소믈리에 & 바텐더 구함`,
    `[초보자도 환영] 울산 삼산동 깔끔한 맥주 펍`,
    `[급구] 대전 둔산동 분위기 최고 모던바 매니저`,
    `천안 두정동 뮤직바 여성 스태프 구인 (#꿀알바)`
  ];
  const locations = ['서울 서대문구', '서울 영등포구', '인천 연수구', '울산 남구', '대전 서구', '충남 천안시'];
  const pays = ['시급 45,000원', '일급 280,000원', '월급 6,000,000원', '시급 40,000원', '일급 300,000원', '시급 45,000원'];
  const companies = ['체리 팝', '여의도 와인하우스', '송도 베이', '삼산 비어', '둔산 아지트', '두정 비트'];
  
  const index = i % titles.length;
  return {
    id: `rec-${i}`,
    type: 'special',
    title: titles[index],
    companyName: companies[index],
    location: locations[index],
    pay: pays[index],
    viewCount: 420 + i * 15,
    description: '매너 좋은 직장인 손님 위주로 예약 운영되는 조용하고 클래식한 위스키/칵테일 매장입니다. 강요나 텃세 전혀 없는 편안한 매장입니다.',
    requirements: '초보 무관, 경력 우대, 정기/단기 알바 조율',
    workHours: '오후 8시 ~ 오전 2시'
  };
});

// 4. All/General Jobs (일반/모든 채용정보) - Tabular data (100 entries)
export const generalJobs: JobAd[] = Array.from({ length: 100 }).map((_, i) => {
  const titles = [
    `강남역 텐프로/쩜오 메인 매니저 구인합니다 (주 5일)`,
    `천안 두정동 모던 토킹바 스태프 구함 (#주말가능)`,
    `신촌 캐주얼 와인바 바텐더 & 홀매니저 구인`,
    `부천 중동 라운지바 테이블 스태프 긴급 구인`,
    `수원 인계동 위스키바 바텐더 모집 (초보환영)`,
    `부산 해운대 호텔 스카이라운지 바텐더 신입 모집`
  ];
  const locations = ['서울 강남구', '충남 천안시', '서울 서대문구', '경기 부천시', '경기 수원시', '부산 해운대구'];
  const pays = ['월급 10,000,000원', '급여협의', '시급 45,000원', '일급 300,000원', '시급 50,000원', '월급 6,500,000원'];
  const companies = ['테헤란 에이스', '두정 로얄', '신촌 소믈리에', '부천 벨벳', '인계 클래식', '해운대 엘시티'];
  
  const index = i % titles.length;
  return {
    id: `gen-${i}`,
    type: 'general',
    title: `${titles[index]} [${i + 1}차 모집]`,
    companyName: companies[index],
    location: locations[index],
    pay: pays[index],
    viewCount: 150 + i * 8,
    description: '성실하고 깔끔하게 매장을 함께 관리해 주실 가족 같은 직원을 모집합니다. 초보분들도 쉽게 배우실 수 있으며 당일 수당 지급합니다.',
    requirements: '20세 이상 성인 누구나 지원 가능',
    workHours: '오후 7시 ~ 오전 3시 (근무 요일/시간 협의)'
  };
});

// 5. Forum Posts (커뮤니티/수다방) - (4 categories)
export const forumPosts: ForumPost[] = [
  // 베스트글
  { id: 'post-1', category: 'best', title: '강남 바텐더 알바 3개월 하고 쓰는 솔직한 후기', writer: '체리체리', date: '07-03', views: 3200 },
  { id: 'post-2', category: 'best', title: '초보자 면접 볼 때 복장 꿀팁 정리해줌', writer: '초보에이스', date: '07-03', views: 2800 },
  { id: 'post-3', category: 'best', title: '여기 사이트 광고 진짜 많네요ㅋㅋ 정보 공유해요', writer: '블랙잭', date: '07-02', views: 2400 },
  // 밤문화이야기
  { id: 'post-4', category: 'night', title: '가로수길 라운지바 손님들 매너는 어떤가요?', writer: '인스타감성', date: '07-03', views: 890 },
  { id: 'post-5', category: 'night', title: '오늘 면접 두 군데 다녀왔는데 분위기 비교해봄', writer: '면접요정', date: '07-03', views: 1200 },
  { id: 'post-6', category: 'night', title: '첫 출근 때 꼭 챙겨야 할 필수 아이템 추천', writer: '고인물언니', date: '07-02', views: 1500 },
  // 같이일할 단짝찾기
  { id: 'post-7', category: 'friend', title: '강남 논현동 같이 바텐더 면접 보러 가실 분 구해요', writer: '동반지원', date: '07-03', views: 420 },
  { id: 'post-8', category: 'friend', title: '홍대 펍 주말 단기 알바 친구랑 같이 할 사람!', writer: '홍대요정', date: '07-03', views: 310 },
  { id: 'post-9', category: 'friend', title: '부산 서면 모던바 같이 투잡 뛸 동생 찾아요', writer: '서면언니', date: '07-02', views: 560 },
  // 무료법률자문
  { id: 'post-10', category: 'legal', title: '근로계약서 미작성 시 임금 체불 문제 해결하는 법', writer: '변호사사무소', date: '07-03', views: 980 },
  { id: 'post-11', category: 'legal', title: '당일 수당 정산 및 퇴직금 관련 법률 지식 정리', writer: '지킴이', date: '07-03', views: 1100 },
  { id: 'post-12', category: 'legal', title: '프리랜서 3.3% 원천징수 세금 환급 안내', writer: '세무법인', date: '07-02', views: 1350 }
];

// 6. Talent Profiles (최신인재정보)
export const talentListings: TalentProfile[] = Array.from({ length: 30 }).map((_, i) => {
  const names = ['김O희', '이O아', '박O은', '최O경', '정O윤', '한O솔', '강O나', '조O서'];
  const ages = ['21세', '23세', '25세', '27세', '24세', '22세', '26세', '28세'];
  const titles = [
    '초보 바텐더 열심히 배우며 오래 일할 곳 구해요!',
    '강남권 라운지바 경력 1년, 성실함 보장합니다.',
    '홍대/신촌 주말 단기 알바 선호합니다 (#복장자유)',
    '칵테일 제조 및 주조 기능사 보유, 위스키바 희망',
    '밝고 친화력 좋은 성격, 성실한 출근 보장해요.',
    '투잡 희망 직장인, 야간 파트타임 구합니다.'
  ];
  const jobTypes = ['칵테일바', '모던바', '라운지펍', '와인바', '웨이트리스', '단기 파트타임'];
  const pays = ['시급 50,000원', '급여협의', '일급 300,000원', '월급 6,000,000원', '시급 45,000원', '일급 250,000원'];
  const dates = ['2026-07-03', '2026-07-03', '2026-07-02', '2026-07-02', '2026-07-01', '2026-07-01'];
  
  return {
    id: `tal-${i}`,
    name: names[i % names.length],
    age: ages[i % ages.length],
    gender: '여',
    title: titles[i % titles.length],
    jobType: jobTypes[i % jobTypes.length],
    pay: pays[i % pays.length],
    date: dates[i % dates.length]
  };
});

// Helper functions to prevent breaking other files
export const getAllJobs = () => [
  ...topBanners,
  ...priorityJobs,
  ...recommendedJobs,
  ...generalJobs
];

export const getJobById = (id: string) => {
  return getAllJobs().find(job => job.id === id);
};
