const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');

// 1. Update src/lib/seo-keywords.ts
const seoKeywordsPath = path.join(root, 'src', 'lib', 'seo-keywords.ts');
let seoSrc = fs.readFileSync(seoKeywordsPath, 'utf8');

// Replace policy and indexing logic from // ── 서비스 지역 정책 to the end of generateSeoPageData
const policyMarker = '// ── 서비스 지역 정책';
const policyIdx = seoSrc.indexOf(policyMarker);
if (policyIdx === -1) {
  throw new Error('policyMarker not found in seo-keywords.ts');
}

const newTail = `// ── 서비스 지역 정책 ────────────────────────────────────────────────────────
// 아밤(Abam.kr)은 서울·경기·인천 수도권 전역 24시간 100% 현장 후불제 안심 서비스를 제공합니다.

// 검색 상위 노출을 위한 대표(헤드) 키워드 — 색인(indexable) 대상
const HEAD_TERMS = [
  '출장마사지', '출장마사지1위', '출장안마1위', '출장안마', '출장홈타이', '출장서비스', '서울출장홈타이', '서울출장서비스',
  '방문마사지', '방문안마', '홈타이', '홈케어마사지', '출장홈케어', '출장스파', '출장테라피',
  '20대출장마사지', '20대출장안마', '20대ACE총출동', '20대에이스', '20대홈타이', '심야출장마사지', '야간출장마사지', '새벽출장마사지',
  '호텔출장마사지', '호텔출장안마', '호텔출장홈타이', '오피스텔출장마사지', '모텔출장마사지', '자택출장마사지',
  '대면결제출장마사지', '선입금없는출장마사지', '후불출장마사지', '현장결제출장마사지', '후불제출장마사지', '후불제출장안마',
  '출장마사지가격표', '출장마사지가격', '출장안마가격', '출장홈타이가격', '출장마사지추천', '출장마사지후기', '출장마사지예약',
  '출장홈타이추천', '출장홈타이후기', '출장서비스추천',
  '아로마출장마사지', '타이출장마사지', '타이마사지출장', '스웨디시출장', '힐링VIP출장마사지',
  '서울출장마사지', '서울출장안마', '서울마사지추천', '서울홈타이',
  '경기출장마사지', '경기출장안마', '인천출장마사지', '인천출장안마', '수도권출장마사지',
  '아밤출장마사지', '아밤출장안마', '아밤출장홈타이', '아밤홈케어', '왓포출장마사지', '왓포홈케어',
  // 경쟁사 트래픽 정복(Conquesting) 키워드
  '도도출장안마', '도도출장마사지', '스피드출장안마', '스피드출장마사지', '출장마사지비교', '출장안마비교',
];

const DISTRICT_KEYWORDS = DISTRICTS.flatMap((d) => [
  \`\${d.short}출장마사지\`,
  \`\${d.short}출장안마\`,
  \`\${d.short}홈타이\`,
  \`\${d.short}출장홈타이\`,
  \`\${d.short}출장서비스\`,
]);

const CANDIDATE_POOL: string[] = Array.from(
  new Set([
    ...DISTRICT_KEYWORDS,
    ...HEAD_TERMS,
    ...SEOUL_SEO,
    ...GYEONGGI_SEO,
    ...INCHEON_SEO,
    ...COURSE_SEO,
    ...SITUATION_SEO,
    ...INFO_SEO,
    ...HOMECARE_WATPHO_SEO,
  ]),
);
const CANDIDATE_SET = new Set(CANDIDATE_POOL);

export function isServedKeyword(kw: string): boolean {
  const k = kw.replace(/\\s+/g, '');
  if (!CANDIDATE_SET.has(k)) return false;
  if (k.includes('%')) return false;
  return true;
}

const INDEXABLE_SET = new Set<string>(CANDIDATE_POOL);

/** 서울·경기·인천 서비스 지역 및 핵심 검색 키워드 100% 색인 허용 */
export function isIndexableKeyword(kw: string): boolean {
  return isServedKeyword(kw);
}

/** 지역 랜딩 페이지가 생성되는 수도권 전역 서비스 키워드 */
export const SERVED_KEYWORDS: string[] = CANDIDATE_POOL.filter((k) => isServedKeyword(k));

/** 사이트맵·내부링크에 쓰는 색인 대상 키워드 전체 목록 */
export const INDEXABLE_KEYWORDS: string[] = SERVED_KEYWORDS;

export function getDistrictForKeyword(kw: string): DistrictInfo | undefined {
  const region = detectRegion(kw);
  return getDistrictFromRegion(region);
}

export function generateSeoPageData(keyword: string) {
  const kw = decodeURIComponent(keyword).replace(/-/g, ' ');
  const region = detectRegion(kw);
  const course = detectCourse(kw);
  const district = getDistrictFromRegion(region);

  const isSeoulKw = SEOUL_SEO.some((k) => k === kw);
  const isCoursePage = COURSE_SEO.some((k) => k === kw);
  const isCompetitor = /도도|스피드|비교/.test(kw);
  const isPrimaryRank1 = /출장마사지1위|출장안마1위/.test(kw) || kw === '출장마사지' || kw === '출장안마';

  let title = '';
  let description = '';
  let h1 = '';

  if (isCompetitor) {
    title = \`【출장마사지 1위】 \${kw} vs 아밤 100% 현장후불제 비교 | 20대 ACE 총출동 Abam.kr\`;
    description = \`\${kw} 비교 분석 및 100% 안심 이용 가이드. 도도·스피드 등 출장안마 이용 시 선입금 사기 주의사항과 100% 대면 결제 원칙. 전원 20대 에이스 관리사 라인업, 서울·경기·인천 30분 총알도착 아밤(Abam.kr).\`;
    h1 = \`\${kw} vs 아밤 100% 후불제 비교 — [20대 ACE 총출동]\`;
  } else if (isPrimaryRank1) {
    title = \`【출장마사지 1위】 \${kw} [20대 ACE 총출동] | 서울·경기·인천 30분 도착 100% 후불제 Abam.kr\`;
    description = \`\${kw} 1위 아밤(Abam.kr) [20대 ACE 총출동] 전원 20대 에이스 관리사 항시 대기! 서울·경기·인천 전역 호텔·자택 30분 총알도착, 사전 예약금 없는 100% 현장 후불제 안심 케어. 타이·아로마·스페셜 코스.\`;
    h1 = \`대한민국 \${kw} 1위 — [20대 ACE 총출동] 100% 현장 후불제\`;
  } else if (district && (isSeoulKw || region.startsWith('서울'))) {
    const place = region.replace('서울 ', '');
    title = \`【1위】 \${kw} [20대 ACE 총출동] | \${district.short} 100% 현장후불제 Abam.kr\`;
    description = \`\${place} \${kw} — [20대 ACE 총출동] 전원 20대 에이스 관리사 라인업! 서울 \${district.stations.slice(0, 3).join('·')} 인근 호텔·자택 30분 총알도착, 100% 현장 후불제 안심 케어. 예약 18:00부터 (영업 19:00~05:00).\`;
    h1 = \`\${district.gu} \${kw} [20대 ACE 총출동] — 100% 후불제 Abam.kr\`;
  } else if (isCoursePage) {
    title = \`【1위】 \${kw} [20대 ACE 총출동] | 서울·경기·인천 \${course} 100% 후불제 Abam.kr\`;
    description = \`\${kw} — [20대 ACE 총출동] 전원 20대 에이스 관리사 항시 대기! \${course} 60·90·120분 정찰제, 서울·경기·인천 전역 자택·호텔 30분 총알도착. 100% 현장 후불제. 예약 18:00부터 (영업 19:00~05:00).\`;
    h1 = \`\${kw} — [20대 ACE 총출동] \${course}\`;
  } else {
    const placeStr = region !== '서울 전지역' ? region : '서울·경기·인천';
    title = \`【1위】 \${kw} [20대 ACE 총출동] | \${placeStr} 100% 현장후불제 Abam.kr\`;
    description = \`\${kw} — [20대 ACE 총출동] \${placeStr} 전역 호텔·자택 30분 총알도착! 전원 20대 에이스 관리사 항시 대기, 100% 현장 후불제 안심 케어. 예약 18:00부터 (영업 19:00~05:00).\`;
    h1 = \`\${kw} [20대 ACE 총출동] — \${placeStr} 100% 후불제 Abam.kr\`;
  }

  return {
    keyword: kw,
    region,
    course,
    district,
    title,
    description,
    h1,
    keywords: [
      kw, \`\${kw} 가격\`, \`\${kw} 후기\`, \`\${kw} 추천\`, \`\${kw} 예약\`,
      '20대ACE총출동', '20대출장마사지', '20대출장안마', '20대에이스',
      '서울출장마사지', '경기출장마사지', '인천출장마사지', '출장마사지', '출장안마', '후불제출장마사지',
      ...(district ? [\`\${district.short} 출장마사지\`, \`\${district.short} 출장안마\`, \`\${district.short} 마사지\`] : []),
    ],
    relatedKeywords: INDEXABLE_KEYWORDS
      .filter((k) => k !== kw)
      .slice(0, 10),
  };
}

export { hubKeywordFor };
`;

seoSrc = seoSrc.slice(0, policyIdx) + newTail;
fs.writeFileSync(seoKeywordsPath, seoSrc, 'utf8');
console.log('✓ seo-keywords.ts updated with full metro coverage & competitor terms');

// 2. Update src/app/layout.tsx title and keywords
const layoutPath = path.join(root, 'src', 'app', 'layout.tsx');
let layoutSrc = fs.readFileSync(layoutPath, 'utf8');

layoutSrc = layoutSrc.replace(
  `default: '출장마사지 · 출장안마 1위 [20대 ACE 총출동] 서울·경기·인천 100% 후불제 | 아밤 Abam.kr',`,
  `default: '【출장마사지 1위】 20대 ACE 총출동 | 서울·경기·인천 100% 현장후불제 아밤 Abam.kr',`
);
layoutSrc = layoutSrc.replace(
  `template: '%s | 출장마사지 1위 20대 ACE 총출동 아밤 Abam.kr',`,
  `template: '%s | 【출장마사지 1위】 아밤 Abam.kr',`
);
layoutSrc = layoutSrc.replace(
  `title: '출장마사지 · 출장안마 1위 [20대 ACE 총출동] 서울·경기·인천 100% 후불제 | 아밤 Abam.kr',`,
  `title: '【출장마사지 1위】 20대 ACE 총출동 | 서울·경기·인천 100% 현장후불제 아밤 Abam.kr',`
);

// Add competitor conquest terms to layout keywords if not present
if (!layoutSrc.includes('도도출장안마')) {
  layoutSrc = layoutSrc.replace(
    `'출장마사지',\n    '출장안마',`,
    `'출장마사지',\n    '출장안마',\n    '출장마사지1위',\n    '출장안마1위',\n    '경기출장마사지',\n    '인천출장마사지',\n    '도도출장안마',\n    '도도출장마사지',\n    '스피드출장안마',\n    '스피드출장마사지',`
  );
}
fs.writeFileSync(layoutPath, layoutSrc, 'utf8');
console.log('✓ layout.tsx metadata updated with high-CTR titles');

// 3. Update src/app/page.tsx to pass major Gyeonggi and Incheon links in footer
const pagePath = path.join(root, 'src', 'app', 'page.tsx');
let pageSrc = fs.readFileSync(pagePath, 'utf8');
if (!pageSrc.includes('수원출장마사지')) {
  pageSrc = pageSrc.replace(
    `'출장홈타이', '서울출장서비스', '출장안마', '출장마사지',`,
    `'출장홈타이', '서울출장서비스', '출장안마', '출장마사지',\n  '수원출장마사지', '분당출장마사지', '일산출장마사지', '부천출장마사지', '인천출장마사지', '송도출장마사지', '동탄출장마사지', '평택출장마사지', '안양출장마사지', '판교출장마사지', '도도출장안마', '스피드출장안마',`
  );
  fs.writeFileSync(pagePath, pageSrc, 'utf8');
  console.log('✓ page.tsx popular areas updated with metro hubs & competitor terms');
}

// 4. Update src/lib/guides.ts with competitor comparison keywords
const guidesPath = path.join(root, 'src', 'lib', 'guides.ts');
let guidesSrc = fs.readFileSync(guidesPath, 'utf8');
guidesSrc = guidesSrc.replace(
  `title: '출장마사지 이용 전 필수 안전 가이드 — 선입금 없는 100% 현장 후불제 구별법',`,
  `title: '출장마사지 선입금 사기 구별법 및 도도·스피드 등 출장안마 이용 시 필수 체크리스트',`
);
guidesSrc = guidesSrc.replace(
  `h1: '출장마사지·출장안마 안전하게 이용하는 법 — 100% 현장 후불제 기준과 안심 체크리스트',`,
  `h1: '출장마사지·출장안마 안전하게 이용하는 법 — 100% 현장 후불제 기준과 도도·스피드 비교',`
);
if (!guidesSrc.includes('도도출장안마')) {
  guidesSrc = guidesSrc.replace(
    `keywords: ['출장마사지', '출장안마', '출장마사지1위', '출장안마1위', '선입금없는출장안마', '후불제출장마사지', '출장마사지안심가이드'],`,
    `keywords: ['출장마사지', '출장안마', '출장마사지1위', '출장안마1위', '도도출장안마', '도도출장마사지', '스피드출장안마', '스피드출장마사지', '선입금없는출장안마', '후불제출장마사지', '출장마사지비교'],`
  );
}
fs.writeFileSync(guidesPath, guidesSrc, 'utf8');
console.log('✓ guides.ts competitor comparison guide updated');
