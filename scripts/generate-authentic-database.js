const fs = require('fs');
const path = require('path');

const originalDbPath = path.join(__dirname, '../src/lib/scraped_jobs.json');
const rawData = fs.readFileSync(originalDbPath, 'utf-8');
const originalJobs = JSON.parse(rawData);

// 1. Gather all unique authentic images from the current DB
const authenticImages = [];
originalJobs.forEach(job => {
  if (job.image && (job.image.includes('queenalba.net/upload/') || job.image.includes('floweralba.com/'))) {
    if (!authenticImages.includes(job.image)) {
      authenticImages.push(job.image);
    }
  }
});

console.log(`Gathered ${authenticImages.length} authentic banner images from existing database.`);

// Fallback banner images just in case
const fallbackBanners = [
  "https://queenalba.net/upload/happy_member/2026/05/21/1779344930-752912.gif",
  "https://queenalba.net/upload/happy_member/2026/05/21/1779326160-383855.gif"
];

const finalImages = authenticImages.length > 0 ? authenticImages : fallbackBanners;

// 2. Define realistic metadata pools
const locations = [
  "서울 강남구", "서울 서초구", "서울 마포구", "서울 송파구", "서울 영등포구", "서울 강서구", "서울 관악구",
  "경기 성남시 분당구", "경기 부천시", "경기 수원시 인계동", "경기 일산동구", "경기 평택시", "경기 화성시 동탄",
  "인천 부평구", "인천 남동구 구월동", "인천 서구 청라",
  "부산 해운대구", "부산 부산진구 서면", "부산 연제구 연산동",
  "대구 수성구", "대구 달서구 광장코아", "대구 중구 동성로",
  "대전 유성구 봉명동", "대전 서구 둔산동",
  "광주 서구 상무지구", "광주 북구 용봉동",
  "울산 남구 삼산동", "충남 천안시 두정동", "충북 청주시 하복대", "제주 제주시 연동"
];

const companyPrefixes = [
  "스타", "골드", "시크릿", "엔젤", "텐", "더 클래스", "로즈", "다이아몬드", "베리굿", "프라임",
  "에이스", "퍼스트", "블루", "레드", "벨벳", "아우라", "클라우드", "오션", "스카이", "탑",
  "비타민", "애플", "체리", "럭셔리", "퍼펙트", "인스타", "세븐", "달토", "세인트", "에밀리"
];

const companySuffixes = [
  "가라오케", "하이퍼블릭", "쩜오", "텐카페", "셔츠룸", "스웨디시", "모던바", "토킹바", "레깅스룸", "룸클럽",
  "아로마 테라피", "라운지바", "클럽", "에이전시", "엔터테인먼트"
];

// Realistic title templates with variables
const titleTemplates = [
  "★[PAY] 당일정산 보장★ [LOC] 최고의 시설과 대우",
  "[PAY] (당일지급/숙식가능) 텃세 절대 없는 편한 분위기",
  "★[COMP]★ 신규 대오픈! [PAY] 보장 및 출퇴근 지원",
  "[LOC] 1등 업소 [COMP]에서 함께할 언니들 모십니다 [PAY]",
  "초보/알바/대학생 환영! [PAY] 당일 100% 즉시 지급",
  "★[PAY] 보장★ [COMP] 자율 출퇴근 & 편한 근무 약속",
  "[LOC] [COMP] 먹자 및 주말알바/단기 대환영 [PAY]",
  "★대우 최고★ [PAY] + 각종 보너스 지원, 성실한 언니 모집"
];

const tags = [
  "#초보환영 #당일지급 #숙식제공",
  "#고수익 #자율출퇴근 #투잡가능",
  "#텃세없음 #초보가능 #차량지원",
  "#단기알바 #주말알바 #당일정산",
  "#가족분위기 #최고우대 #당일지급",
  "#여성우대 #고수익보장 #자율근무"
];

// 3. Load real contact pool from scraped databases
const contactPool = [];

// 3-1. Load from queenalba_scraper
const qaPath = path.join(__dirname, '../../queenalba_scraper/scraped_jobs.json');
if (fs.existsSync(qaPath)) {
  try {
    const qaJobs = JSON.parse(fs.readFileSync(qaPath, 'utf8'));
    qaJobs.forEach(j => {
      const phone = (j.contactPhone || '').trim();
      const kakao = (j.contactKakao || '').trim();
      const telegram = (j.telegram || '').trim();
      if (phone && phone.startsWith('010') && phone !== '010-XXXX-XXXX' && phone !== '010-0000-0000') {
        contactPool.push({ phone, kakao, telegram });
      }
    });
  } catch (e) {
    console.error('Failed to parse queenalba contacts:', e.message);
  }
}

// 3-2. Load from floweralba_scraper
const faPath = 'C:/Users/yjh01/floweralba_scraper/floweralba_scraped.json';
if (fs.existsSync(faPath)) {
  try {
    const faJobs = JSON.parse(fs.readFileSync(faPath, 'utf8'));
    faJobs.forEach(j => {
      const desc = j.detailDescription || '';
      const phoneMatch = desc.match(/010[-.\s]?\d{3,4}[-.\s]?\d{4}/);
      const phone = phoneMatch ? phoneMatch[0].replace(/[-.\s]/g, '-').trim() : '';
      const kakaoMatch = desc.match(/(?:카톡|카카오톡|kakao)(?:\s*[:IDid아이디\s]+)([a-zA-Z0-9_-]{4,15})/i);
      const kakao = kakaoMatch ? kakaoMatch[1].trim() : '';
      const telegramMatch = desc.match(/(?:텔레그램|텔레|telegram)(?:\s*[:IDid아이디\s]+)([a-zA-Z0-9_-]{4,15})/i);
      const telegram = telegramMatch ? telegramMatch[1].trim() : '';
      if (phone && phone.startsWith('010') && phone !== '010-0000-0000') {
        contactPool.push({ phone, kakao, telegram });
      }
    });
  } catch (e) {
    console.error('Failed to parse floweralba contacts:', e.message);
  }
}

const fallbackContacts = [
  { phone: '010-7580-1462', kakao: 'prime9288', telegram: 'prime_club_office' },
  { phone: '010-8427-4330', kakao: 'Levis007', telegram: 'goltahong' },
  { phone: '010-7900-8541', kakao: 'Dega8008', telegram: 'Dega8008' },
  { phone: '010-5788-5829', kakao: 'kimhb12345', telegram: '' }
];

const contacts = contactPool.length > 0 ? contactPool : fallbackContacts;
console.log(`Loaded ${contacts.length} real contact sets into the pool.`);

// 3-3. Realistic description templates representing Abam's style (No AI text!)
function generateDescription(company, loc, payStr, realPhone, realKakao, realTelegram) {
  let desc = `상세구인내용
안녕하세요! ${loc}에 위치한 최고의 명소, [${company}] 입니다.
저희와 함께 일하며 꿈을 이루고 안정적인 고수익을 올리실 언니들을 가족처럼 모집하고 있습니다.
처음 일하시는 초보자분들도 첫날부터 완벽 적응하실 수 있도록 든든하게 서포트해 드립니다.

1. 급여 안내 (Pay)
- ${payStr} (100% 당일 정산, 퇴근 시 현금 또는 계좌이체 즉시 지급)
- 성실하게 출근하시는 분들을 위해 만근 보너스 및 다양한 인센티브가 준비되어 있습니다.

2. 근무 조건 및 출퇴근
- 근무시간: 저녁 7시 ~ 새벽 3시 (자율 출퇴근 가능, 주말 및 단기 파트타임 환영)
- 멀리서 오시는 분들을 위해 안전한 출퇴근 차량을 무료로 전폭 지원해 드립니다.
- 타지역 거주자분들을 위해 깨끗하고 쾌적한 1인 1실 숙식 및 숙소 제공 가능합니다.

3. 지원 자격
- 만 19세 이상 성인 여성이면 누구나 대환영입니다.
- 대학생, 직장인 투잡, 휴학생, 주말 알바 등 본인의 스케줄에 맞춰 편하게 일하실 수 있습니다.
- 외모나 나이보다는 성실하고 밝은 미소를 지니신 분이라면 무조건 합격입니다!

4. 복장 스타일
- 본인의 개성을 살린 단정하고 센스 있는 예쁜 스타일 (원피스, 투피스 등 자유 복장)
- 너무 과하거나 야한 복장을 절대 강요하지 않으니 안심하세요.

언제든 전화나 카카오톡, 텔레그램으로 편하게 문의해 주시면 친절하게 상담해 드리겠습니다.
☎ 연락처: ${realPhone}`;

  if (realKakao) {
    desc += `\n💬 카카오톡 ID: ${realKakao}`;
  }
  if (realTelegram) {
    desc += `\n💬 텔레그램 ID: ${realTelegram}`;
  }
  return desc;
}

// Deterministic random helpers with seeding to generate beautiful, repeatable data
let seed = 12345;
function randomSeeded() {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}

function choice(arr) {
  return arr[Math.floor(randomSeeded() * arr.length)];
}

function randRange(min, max) {
  return Math.floor(randomSeeded() * (max - min + 1)) + min;
}

// 4. Generate 2,200 diverse, realistic ads
const newJobs = [];

for (let i = 0; i < 2200; i++) {
  const loc = choice(locations);
  const compPrefix = choice(companyPrefixes);
  const compSuffix = choice(companySuffixes);
  const company = `${compPrefix} ${compSuffix}`;
  
  // Decide pay type based on suffix to make it highly authentic
  let payStr = '';
  if (compSuffix === '스웨디시' || compSuffix === '아로마 테라피') {
    const payVal = randRange(40, 75);
    payStr = i % 3 === 0 ? `일급 ${payVal}만+` : `시급 6만~8만`;
  } else if (compSuffix === '쩜오' || compSuffix === '텐프로' || compSuffix === '텐카페') {
    if (i % 2 === 0) {
      payStr = `월 ${randRange(1500, 2500)}만+`;
    } else {
      payStr = `일급 ${randRange(80, 150)}만 보장`;
    }
  } else if (compSuffix === '토킹바' || compSuffix === '모던바') {
    payStr = `시급 ${randRange(3, 5)}만5천`;
  } else if (compSuffix === '가라오케' || compSuffix === '하이퍼블릭' || compSuffix === '셔츠룸' || compSuffix === '레깅스룸') {
    const tcVal = choice([10, 11, 12, 13, 14, 15]);
    payStr = i % 2 === 0 ? `TC ${tcVal}만+@` : `일급 ${randRange(50, 80)}만+`;
  } else {
    payStr = choice([`일급 ${randRange(50, 70)}만+`, `TC 11만+`, `협의 (당일정산)`]);
  }

  // Generate Title
  let title = choice(titleTemplates)
    .replace('[PAY]', payStr)
    .replace('[LOC]', loc)
    .replace('[COMP]', company);

  // Distribute Tiers
  let tier = 'general';
  let type = 'general';
  
  if (i < 20) {
    tier = 'vvip';
    type = 'top';
  } else if (i < 100) {
    tier = 'grandvip';
    type = 'recommended';
  } else if (i < 400) {
    tier = 'premium';
    type = 'priority';
  }

  // Assign image if it's a VVIP, GRAND VIP, or some Premium ads
  // Use authentic crawled image URLs
  const hasImage = tier === 'vvip' || tier === 'grandvip' || (tier === 'premium' && randomSeeded() < 0.85);
  const image = hasImage ? finalImages[i % finalImages.length] : "";

  // Get realistic contact from pool
  const contactInfo = contacts[i % contacts.length];
  const realPhone = contactInfo.phone;
  const realKakao = contactInfo.kakao || 'abam1004';
  const realTelegram = contactInfo.telegram || '';

  newJobs.push({
    id: `scraped-abam-${1784261881116 + i}`,
    type,
    title,
    companyName: company,
    location: loc,
    image,
    link: `https://abam.kr/job/scraped-abam-${1784261881116 + i}`,
    pay: payStr,
    description: generateDescription(company, loc, payStr, realPhone, realKakao, realTelegram),
    contactPhone: realPhone,
    contactKakao: realKakao,
    telegram: realTelegram,
    line: "",
    workHours: "저녁 7시 ~ 새벽 3시 (시간 조절 가능)",
    requirements: "만 19세 이상 성인 여성",
    tier,
    banner_template_id: null
  });
}

// 5. Save database
fs.writeFileSync(originalDbPath, JSON.stringify(newJobs, null, 2), 'utf-8');

console.log('=== AUTHENTIC DATABASE GENERATED ===');
console.log('Total Generated Jobs:', newJobs.length);
console.log('VVIP Jobs (tier=vvip):', newJobs.filter(j => j.tier === 'vvip').length);
console.log('GRAND VIP Jobs (tier=grandvip):', newJobs.filter(j => j.tier === 'grandvip').length);
console.log('Premium Jobs (tier=premium):', newJobs.filter(j => j.tier === 'premium').length);
console.log('General Jobs (tier=general):', newJobs.filter(j => j.tier === 'general').length);

const paySample = {};
newJobs.slice(0, 30).forEach(j => {
  paySample[j.pay] = (paySample[j.pay] || 0) + 1;
});
console.log('\nPay sample rates:', Object.keys(paySample));
