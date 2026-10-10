const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');

// 1. Update src/lib/seo-keywords.ts
const seoKeywordsPath = path.join(root, 'src', 'lib', 'seo-keywords.ts');
let seoSrc = fs.readFileSync(seoKeywordsPath, 'utf8').replace(/\r\n/g, '\n');

const gyeonggiStart = seoSrc.indexOf('// 경기 지역별 (확장)');
const incheonStart = seoSrc.indexOf('// 인천 지역별 (강화 — 신도시 + 역세권)');
const courseStart = seoSrc.indexOf('// 코스별 (확장)');

if (gyeonggiStart === -1 || incheonStart === -1 || courseStart === -1) {
  throw new Error(`Markers not found: gyeonggiStart=${gyeonggiStart}, incheonStart=${incheonStart}, courseStart=${courseStart}`);
}

const newGyeonggiAndIncheon = `// 경기 지역별 (서울 20~30분 이동 가능한 직결 핵심 생활권 — 원거리 오지 배제)
export const GYEONGGI_SEO = [
  // 성남·분당·판교·위례 (강남·송파 직결)
  '분당출장마사지', '분당출장안마', '판교출장마사지', '판교출장안마',
  '정자출장마사지', '서현출장마사지', '이매출장마사지', '야탑출장마사지',
  '성남출장마사지', '성남출장안마', '위례출장마사지', '모란출장마사지',
  // 수원·광교 (경부라인 핵심)
  '수원출장마사지', '수원출장안마', '인계동출장마사지', '광교출장마사지',
  '영통출장마사지', '권선출장마사지', '팔달출장마사지', '장안출장마사지',
  // 용인 수지·죽전·기흥 (분당 인접권)
  '용인출장마사지', '용인출장안마', '수지출장마사지', '기흥출장마사지', '죽전출장마사지',
  // 고양·일산·화정 (마포·은평 직결)
  '일산출장마사지', '일산출장안마', '고양출장마사지', '고양출장안마',
  '화정출장마사지', '마두출장마사지', '주엽출장마사지',
  // 부천·안양·광명·과천 (구로·금천·양천·서초 직결)
  '부천출장마사지', '부천출장안마', '중동출장마사지', '상동출장마사지',
  '안양출장마사지', '안양출장안마', '평촌출장마사지', '범계출장마사지', '인덕원출장마사지',
  '광명출장마사지', '광명출장안마', '철산출장마사지', '과천출장마사지',
  // 하남·구리·남양주 다산 (강동·중랑·광진 직결)
  '하남출장마사지', '하남출장안마', '미사출장마사지',
  '구리출장마사지', '구리출장안마', '교문출장마사지',
  '남양주출장마사지', '다산출장마사지', '별내출장마사지',
  // 화성 동탄 (수원·용인 인접)
  '동탄출장마사지', '동탄출장안마', '동탄1출장마사지', '동탄2출장마사지',
  // 군포 산본·의왕 (안양 인접)
  '군포출장마사지', '산본출장마사지', '의왕출장마사지',
];

// 인천 지역별 (경인선·고속도로 직결 핵심 생활권 — 도서·외곽 강화/영종 배제)
export const INCHEON_SEO = [
  '인천출장마사지', '인천출장안마', '인천시출장마사지',
  '부평출장마사지', '부평출장안마', '부평역출장마사지', '부개출장마사지',
  '남동출장마사지', '남동구출장마사지', '구월출장마사지', '구월동출장마사지',
  '연수출장마사지', '연수출장안마', '연수구출장마사지',
  '송도출장마사지', '송도출장안마', '송도국제도시출장마사지', '송도신도시출장마사지',
  '서구출장마사지', '청라출장마사지', '청라출장안마', '청라국제도시출장마사지',
  '계양출장마사지', '작전출장마사지', '주안출장마사지',
];

`;

seoSrc = seoSrc.slice(0, gyeonggiStart) + newGyeonggiAndIncheon + seoSrc.slice(courseStart);

// In generateSeoPageData: Ensure NO disparaging/defamatory language about competitors
const oldComp = `  if (isCompetitor) {
    title = \`【출장마사지 1위】 \${kw} vs 아밤 100% 현장후불제 비교 | 20대 ACE 총출동 Abam.kr\`;
    description = \`\${kw} 비교 분석 및 100% 안심 이용 가이드. 도도·스피드 등 출장안마 이용 시 선입금 사기 주의사항과 100% 대면 결제 원칙. 전원 20대 에이스 관리사 라인업, 서울·경기·인천 30분 총알도착 아밤(Abam.kr).\`;
    h1 = \`\${kw} vs 아밤 100% 후불제 비교 — [20대 ACE 총출동]\`;
  }`;

const newComp = `  if (isCompetitor) {
    title = \`【출장마사지 1위】 \${kw} vs 아밤 서비스 비교 | 20대 ACE 총출동 100% 현장후불제 Abam.kr\`;
    description = \`\${kw} 및 주요 출장안마 서비스 비교 안내. 사전 예약금 없는 100% 현장 대면 결제 원칙과 투명 정찰제, 전원 20대 에이스 관리사 라인업, 서울·수도권 30분 총알도착 아밤(Abam.kr) 이용 안내.\`;
    h1 = \`\${kw} vs 아밤 서비스 비교 — [20대 ACE 총출동 100% 후불제]\`;
  }`;

seoSrc = seoSrc.replace(oldComp, newComp);
fs.writeFileSync(seoKeywordsPath, seoSrc.replace(/\n/g, '\r\n'), 'utf8');
console.log('✓ seo-keywords.ts: Outlying regions removed, competitor text cleared of derogatory remarks');

// 2. Update src/lib/guides.ts: Remove derogatory/scam association with competitor names
const guidesPath = path.join(root, 'src', 'lib', 'guides.ts');
let guidesSrc = fs.readFileSync(guidesPath, 'utf8').replace(/\r\n/g, '\n');

guidesSrc = guidesSrc.replace(
  `title: '출장마사지 선입금 사기 구별법 및 도도·스피드 등 출장안마 이용 시 필수 체크리스트',`,
  `title: '출장마사지 이용 전 체크리스트 — 도도·스피드·아밤 서비스 특징 및 100% 현장 후불제 안내',`
);
guidesSrc = guidesSrc.replace(
  `h1: '출장마사지·출장안마 안전하게 이용하는 법 — 100% 현장 후불제 기준과 도도·스피드 비교',`,
  `h1: '출장마사지·출장안마 서비스 비교 안내 — 100% 현장 후불제 기준과 도도·스피드 특징',`
);
guidesSrc = guidesSrc.replace(
  `description: '출장마사지 및 출장안마 예약 시 주의해야 할 선입금 사기 예방법과 안전한 100% 현장 대면결제 판별 기준을 정리했습니다. 아밤(Abam.kr)의 전원 20대 에이스 관리사, 서울 전역 30분 총알도착, 투명 정찰제 시스템 안내.',`,
  `description: '도도출장마사지, 스피드출장마사지 등 주요 출장안마 플랫폼의 특성과 아밤(Abam.kr)의 100% 현장 대면결제 시스템을 객관적으로 비교 안내합니다. 20대 전문 관리사 라인업, 정찰제 요금 및 예약 방법 안내.',`
);

// In guide body: replace section 3 heading and content to be strictly respectful and objective
guidesSrc = guidesSrc.replace(
  `      {
        heading: '아밤(Abam.kr)의 3대 안심 운영 원칙',
        paragraphs: [
          '고객 만족과 안전을 최우선으로 하는 아밤만의 3대 핵심 기준입니다.'
        ],`,
  `      {
        heading: '주요 출장안마 플랫폼 비교 및 아밤(Abam.kr)의 운영 원칙',
        paragraphs: [
          '도도출장안마, 스피드출장안마 등 국내 대표 플랫폼들과 마찬가지로 아밤 역시 고객 편의를 최우선으로 운영되며, 100% 현장 대면결제 정찰제를 철저히 준수합니다.'
        ],`
);

fs.writeFileSync(guidesPath, guidesSrc.replace(/\n/g, '\r\n'), 'utf8');
console.log('✓ guides.ts: Competitor disparagement completely removed');

// 3. Update src/app/page.tsx: Popular metro areas cleaned (remove Pyeongtaek, etc.)
const pagePath = path.join(root, 'src', 'app', 'page.tsx');
let pageSrc = fs.readFileSync(pagePath, 'utf8').replace(/\r\n/g, '\n');

pageSrc = pageSrc.replace(
  `'수원출장마사지', '분당출장마사지', '일산출장마사지', '부천출장마사지', '인천출장마사지', '송도출장마사지', '동탄출장마사지', '평택출장마사지', '안양출장마사지', '판교출장마사지', '도도출장안마', '스피드출장안마',`,
  `'수원출장마사지', '분당출장마사지', '일산출장마사지', '부천출장마사지', '인천출장마사지', '송도출장마사지', '동탄출장마사지', '안양출장마사지', '판교출장마사지', '하남출장마사지', '광명출장마사지', '도도출장안마', '스피드출장안마',`
);
fs.writeFileSync(pagePath, pageSrc.replace(/\n/g, '\r\n'), 'utf8');
console.log('✓ page.tsx: Outlying areas removed from footer');
