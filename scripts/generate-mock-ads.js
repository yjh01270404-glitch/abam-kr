/**
 * mockAds.ts 재생성 스크립트
 * - VVIP: 50+ 항목
 * - GRAND VIP: 100+ 항목
 * - PREMIUM: 200+ 항목
 * - LINE ADS: 100개 (좌50 + 우50)
 */

const fs = require('fs');
const path = require('path');

// 업소 이름 풀
const VVIP_SHOPS = [
  '강남 에이스', '청담 플래티넘', '압구정 로열', '도곡 골드', '서초 다이아몬드',
  '역삼 임페리얼', '삼성 크라운', '대치 럭스', '잠실 프리미어', '송파 엘리트',
  '마포 시그니처', '홍대 럭셔리', '신촌 탑클래스', '종로 에이원', '중구 블루다이아',
  '강서 글로리', '영등포 스카이', '구로 에메랄드', '양천 사파이어', '동작 퍼스트',
  '성동 아이돌', '광진 비비드', '강북 스타', '도봉 퀸', '노원 프린세스',
  '수원 레전드', '성남 에이스', '용인 로열', '안양 크라운', '부천 골드',
  '인천 플래티넘', '부평 임페리얼', '연수 다이아', '남동 럭스', '계양 시그니처',
  '대구 에이스', '수성 크라운', '달서 골드', '중구 플래티넘', '북구 로열',
  '부산 에이원', '해운대 블루', '사하 스타', '동래 퀸', '남구 프리미어',
  '광주 에이스', '서구 크라운', '남구 럭스', '북구 골드', '광산 플래티넘',
  '울산 에이스', '남구 로열', '중구 다이아', '동구 임페리얼'
];

const GRAND_SHOPS = [
  '로즈 모던바', '세인트 클럽', '스타 클럽', '오션 쩜오', '엔젤 셔츠룸',
  '로즈 하이퍼블릭', '인스타 엔터테인먼트', '세인트 엔터테인먼트', '벨벳 하이퍼블릭', '체리 룸클럽',
  '베리굿 텐카페', '에밀리 레깅스룸', '에이스 아로마테라피', '로즈 아로마테라피', '체리 클럽',
  '세인트 룸클럽', '블루 아로마테라피', '퍼스트 가라오케', '베리굿 아로마테라피', '레드 가라오케',
  '에밀리 하이퍼블릭', '레드 스웨디시', '엔젤 텐카페', '체리 라운지바', '퍼펙트 엔터테인먼트',
  '앱플 룸클럽', '스카이 토킹바', '야쿠라 엔터테인먼트', '골드 레깅스룸', '에이스 텐카페',
  '다이아몬드 클럽', '에이스 하이퍼블릭', '베리굿 클럽', '벨벳 텐카페', '베리굿 룸클럽',
  '미르 엔터테인먼트', '수호 클럽', '오로라 모던바', '블루문 셔츠룸', '퀸 라운지',
  '제이 하이퍼블릭', '수리 아로마', '빅뱅 가라오케', '힐링 셔츠룸', '클로버 쩜오',
  '화이트 라운지', '블랙 클럽', '핑크 카페', '그린 룸', '오렌지 바',
  '나이트 퀸', '문 클럽', '스타더스트', '갤럭시 바', '밀키웨이',
  '크리스탈 룸', '네온 클럽', '프리즘 바', '미라지 라운지', '오아시스 클럽',
  '코랄 셔츠룸', '민트 카페', '라벤더 룸', '피치 바', '티파니 클럽',
  '에메랄드 라운지', '사파이어 바', '아쿠아 룸', '터키블루 클럽', '코발트 라운지',
  '챔피언 클럽', '빅토리 바', '트로피 룸', '메달 라운지', '쉐이크 클럽',
  '판타지 바', '드림 룸', '위시 라운지', '매직 클럽', '유니콘 바',
  '천사 클럽', '여신 룸', '나비 라운지', '꽃 클럽', '달 바',
  '하늘 룸', '바람 라운지', '구름 클럽', '별빛 바', '노을 룸',
  '해 라운지', '달빛 클럽', '봄 바', '여름 룸', '가을 라운지',
  '겨울 클럽', '눈꽃 바', '벚꽃 룸', '단풍 라운지', '신록 클럽',
  '와인 바', '위스키 룸', '보드카 라운지', '진 클럽', '럼 바'
];

const PREMIUM_SHOPS_BASE = [
  '강남 클래식', '역삼 텐프로', '서초 에이스', '삼성 프리미어', '청담 로열',
  '압구정 크라운', '대치 골든', '잠실 다이아', '송파 럭셔리', '마포 임페리얼',
  '홍대 시그니처', '신촌 블루', '종로 엘리트', '중구 퍼스트', '강서 탑',
  '영등포 글로리', '구로 스카이', '양천 에메랄드', '동작 사파이어', '성동 퍼플',
  '광진 오로라', '강북 달빛', '도봉 별빛', '노원 꽃달', '수원 에이스',
  '성남 크라운', '용인 골든', '안양 로열', '부천 다이아', '인천 플래티넘',
  '부평 임페리얼', '연수 시그니처', '남동 블루', '계양 엘리트', '대구 퍼스트',
  '수성 글로리', '달서 스카이', '중구 에메랄드', '북구 사파이어', '부산 퍼플',
  '해운대 오로라', '사하 달빛', '동래 별빛', '남구 꽃달', '광주 에이스',
  '서구 크라운', '남구 골든', '북구 로열', '광산 다이아', '울산 플래티넘',
  '강릉 에이스', '춘천 로열', '원주 크라운', '청주 골든', '대전 다이아',
  '천안 플래티넘', '아산 임페리얼', '전주 시그니처', '광주송정 블루', '여수 엘리트',
  '포항 퍼스트', '경주 글로리', '구미 스카이', '안동 에메랄드', '창원 사파이어',
  '마산 퍼플', '진주 오로라', '통영 달빛', '거제 별빛', '제주 꽃달',
  '서귀포 에이스', '제주시 로열', '이천 크라운', '평택 골든', '오산 다이아',
  '군포 플래티넘', '의왕 임페리얼', '과천 시그니처', '광명 블루', '시흥 엘리트',
  '안산 퍼스트', '화성 글로리', '수원 스카이', '파주 에메랄드', '고양 사파이어',
  '일산 퍼플', '덕양 오로라', '양주 달빛', '포천 별빛', '동두천 꽃달',
  '구리 에이스', '남양주 로열', '하남 크라운', '성남 판교 골든', '의정부 다이아',
  '노원 플래티넘', '강북 임페리얼', '도봉 시그니처', '중랑 블루', '동대문 엘리트',
  '성북 퍼스트', '종로 글로리', '용산 스카이', '서대문 에메랄드', '마포 사파이어'
];

const LOCATIONS = [
  '서울 강남구', '서울 서초구', '서울 송파구', '서울 마포구', '서울 영등포구',
  '서울 강서구', '서울 구로구', '서울 관악구', '서울 동작구', '서울 성동구',
  '서울 광진구', '서울 강북구', '서울 도봉구', '서울 노원구', '서울 중구',
  '경기 수원시', '경기 성남시', '경기 용인시', '경기 안양시', '경기 부천시',
  '경기 화성시', '경기 평택시', '경기 고양시', '경기 의정부시', '경기 남양주시',
  '인천 부평구', '인천 남동구', '인천 연수구', '인천 계양구', '인천 서구',
  '부산 해운대구', '부산 사하구', '부산 동래구', '부산 남구', '부산 부산진구',
  '대구 수성구', '대구 달서구', '대구 중구', '대구 북구', '대구 동구',
  '대전 서구', '대전 유성구', '대전 중구', '대전 동구', '대전 대덕구',
  '광주 서구', '광주 남구', '광주 북구', '광주 광산구', '광주 동구',
  '울산 남구', '울산 중구', '울산 동구', '울산 북구', '제주 제주시'
];

const VVIP_PAYS = [
  '월 3000만+ 보장', '월 2500만+ 보장', '일급 150만+ 보장', '일급 120만+ 보장',
  '시급 20만+', '시급 18만+', '월 2000만+ 보장', '협의 최대우대'
];

const GRAND_PAYS = [
  '시급 15만+ (당일지급)', '일급 80만+ 보장', '일급 70만+ 보장', 
  '일급 60만+ 보장', 'TC 11만+', 'TC 13만+@', '협의 (당일정산)',
  '월 1847만+', '일급 58만+', '일급 59만+'
];

const PREMIUM_PAYS = [
  '시급 10만+', '시급 8만+', '일급 50만+', '일급 45만+',
  '일급 40만+', '시급 7만+', '협의', '일급 35만+',
  '시급 6만+', '일급 55만+'
];

const VVIP_TITLES = [
  '[VVIP 단독] 업계 1위 최고대우',
  '[단독/신규] 최상위 텐프로 에이스',
  'VIP 전담 최고시설 최고페이',
  '[독점] 강남권 넘버원 업소',
  '업계 레전드급 최고 대우 보장',
  '초고수익 보장 VVIP 전용',
  '[단독] 압구정 최상급 텐프로',
  '업계 1% VVIP 스페셜 모집',
];

const GRAND_TITLES = [
  '출퇴근차량지원 숙식가능 고급오피스텔',
  '초보환영 페이협의 무조건 맞춰드림',
  '일급 200만 보장 텃세절대없음',
  '[신규오픈] 텐프로 에이스 대모집',
  '당일지급 확실 초보언니 대환영',
  '주말알바 단기 대환영',
  '투잡가능 자유출퇴근 고페이',
  '갯수보장 안전한 업소',
  '실수령 1등 초고페이',
  '숙식제공 교통비지원 고급업소',
];

const PREMIUM_TITLES = [
  '투잡가능 자유로운 출퇴근',
  '[급구] 당일지급 초보가능',
  '초보환영 친절히 알려드려요',
  '분위기 좋은 업소 언니 구해요',
  '[신규] 편한 분위기 가족같은 곳',
  '갯수보장 안전업소 구인',
  '실수령 최고 고페이업소',
  '주말알바 단기가능 환영',
  '자유출퇴근 숙식가능',
  '따뜻한 분위기 함께할 언니',
];

const LINE_TITLES = [
  '[단독/신규] 솔직한 광고글 입니다 - 믿고오세요',
  '[단독/신규] 서울 전지역가능 오늘바로시작',
  '[단독/신규] 텐카페더... 협의 최고',
  '[단독/신규] 분당NO.1 TC13차비지원',
  '[단독/신규] 매일5만지급 초보가능',
  '[단독/신규] 구디 셔츠룸 레이스 실수령1위',
  '[단독/신규] 1시간10만원돌벌수있어요',
  '[단독/신규] ★ 고페이 플레이★ 지금바로',
  '[단독/신규] 갯수보장 안전한 업소',
  '[단독/신규] ★☆강남1등업소 [최고대우]',
  '[단독/신규] 부천 실수령 1등!!! 누구나',
  '[급구] 가족같은 분위기 편한가게',
  '[급구] 투잡가능 자유출퇴근',
  '[급구] 초보환영 당일지급 보장',
  '[급구] 당일알바 즉시시작 가능',
  '[단독] 텐프로 에이스 긴급모집',
  '초보언니 당일지급 즉시출근',
  '숙식제공 교통비지원 안전업소',
  '오늘부터 바로 일할 수 있어요',
  '갯수보장 실수령 최고 업소',
  '[신규오픈] 편한분위기 고페이',
  '2030 환영 초보가능 고페이',
  '단기알바 주말가능 당일지급',
  '모텔지원 교통비지급 안전',
  '자유출퇴근 투잡환영 고수익',
  '[급구] 밤알바 주간알바 모두가능',
  '실수령 보장 투명한 업소',
  '인근 픽업가능 출퇴근지원',
  '전직무관 나이무관 환영',
  '매일정산 당일지급 확실',
  '[단독/신규] 강남 에이스 구인',
  '[단독/신규] 수원 1등 업소',
  '[단독/신규] 성남 분당 고페이',
  '[단독/신규] 인천 부평 당일지급',
  '[단독/신규] 부산 해운대 최고대우',
  '[급구] 대구 수성구 즉시출근',
  '대전 유성 안전업소 구인',
  '광주 서구 당일지급 가능',
  '울산 남구 초보환영 고페이',
  '제주 에이스 특별모집',
];

function makeEntry(id, companyName, location, pay, title, tag, viewCount) {
  return `  {
    "id": "${id}",
    "type": "top",
    "title": "${title}",
    "companyName": "${companyName}",
    "location": "${location}",
    "pay": "${pay}",
    "tag": "${tag}",
    "viewCount": ${viewCount},
    "image": "",
    "description": "상세설명",
    "requirements": "20세이상",
    "workHours": "협의"
  }`;
}

function makeLineEntry(id, companyName, location, pay, title, viewCount) {
  return `  {
    "id": "${id}",
    "type": "general",
    "title": "${title}",
    "companyName": "${companyName}",
    "location": "${location}",
    "pay": "${pay}",
    "tag": "",
    "viewCount": ${viewCount},
    "description": "상세설명",
    "requirements": "20세이상",
    "workHours": "협의"
  }`;
}

// Generate VVIP entries (existing 1 kept, generate 50 more as array)
let vvipEntries = [];
for (let i = 0; i < 52; i++) {
  const shop = VVIP_SHOPS[i % VVIP_SHOPS.length];
  const loc = LOCATIONS[i % LOCATIONS.length];
  const pay = VVIP_PAYS[i % VVIP_PAYS.length];
  const title = VVIP_TITLES[i % VVIP_TITLES.length];
  const views = Math.floor(Math.random() * 9000) + 500;
  vvipEntries.push(makeEntry(`vvip-banner-${i}`, shop, loc, pay, title, '#VVIP #최고수익 #텐프로', views));
}

// Generate GRAND VIP entries (100+)
let grandEntries = [];
for (let i = 0; i < 105; i++) {
  const shop = GRAND_SHOPS[i % GRAND_SHOPS.length];
  const loc = LOCATIONS[(i * 3 + 1) % LOCATIONS.length];
  const pay = GRAND_PAYS[i % GRAND_PAYS.length];
  const title = GRAND_TITLES[i % GRAND_TITLES.length];
  const views = Math.floor(Math.random() * 2000) + 100;
  grandEntries.push(makeEntry(`grand-new-${i}`, shop, loc, pay, title, '#하이퍼블릭 #고수익', views));
}

// Generate PREMIUM entries (200+)
let premiumEntries = [];
for (let i = 0; i < 205; i++) {
  const shop = PREMIUM_SHOPS_BASE[i % PREMIUM_SHOPS_BASE.length];
  const loc = LOCATIONS[(i * 7 + 2) % LOCATIONS.length];
  const pay = PREMIUM_PAYS[i % PREMIUM_PAYS.length];
  const title = PREMIUM_TITLES[i % PREMIUM_TITLES.length];
  const views = Math.floor(Math.random() * 1000) + 50;
  premiumEntries.push(makeEntry(`premium-new-${i}`, shop, loc, pay, title, '#단기 #초보가능', views));
}

// Generate LINE ADS (100 total: left 50 + right 50, stored as flat 100)
let lineEntries = [];
for (let i = 0; i < 100; i++) {
  const shop = GRAND_SHOPS[(i * 2) % GRAND_SHOPS.length];
  const loc = LOCATIONS[(i * 5) % LOCATIONS.length];
  const pay = PREMIUM_PAYS[i % PREMIUM_PAYS.length];
  const title = LINE_TITLES[i % LINE_TITLES.length] + (i > 39 ? ' ' + shop : '');
  const views = Math.floor(Math.random() * 800) + 10;
  lineEntries.push(makeLineEntry(`line-new-${i}`, shop, loc, pay, title, views));
}

const output = `// Automatically generated realistic mock data
import { JobAd } from './mockData';

export const vvipBanner: JobAd = {
  "id": "vvip-1",
  "type": "top",
  "title": "[VVIP 단독] 업계 1위 텐프로 최고대우 모십니다",
  "companyName": "강남 에이스 텐프로",
  "location": "서울 강남구",
  "pay": "월 3000만+ 보장",
  "tag": "#VVIP #최고수익 #텐프로",
  "viewCount": 9999,
  "image": "",
  "description": "상세설명",
  "requirements": "20세이상",
  "workHours": "협의"
};

export const vvipBanners: JobAd[] = [
${vvipEntries.join(',\n')}
];

export const grandVipBanners: JobAd[] = [
${grandEntries.join(',\n')}
];

export const premiumBanners: JobAd[] = [
${premiumEntries.join(',\n')}
];

export const lineAdsData: JobAd[] = [
${lineEntries.join(',\n')}
];
`;

const outPath = path.join(__dirname, '../src/lib/mockAds.ts');
fs.writeFileSync(outPath, output, 'utf8');
console.log('Done!');
console.log('VVIP:', vvipEntries.length);
console.log('GRAND:', grandEntries.length);
console.log('PREMIUM:', premiumEntries.length);
console.log('LINE ADS:', lineEntries.length);
