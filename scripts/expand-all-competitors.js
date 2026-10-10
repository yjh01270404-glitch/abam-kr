const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');

// 1. Update src/lib/seo-keywords.ts
const seoKeywordsPath = path.join(root, 'src', 'lib', 'seo-keywords.ts');
let seoSrc = fs.readFileSync(seoKeywordsPath, 'utf8').replace(/\r\n/g, '\n');

// Define COMPETITOR_SEO right before SEO_KEYWORDS
const compMarker = '// 왓포 & 강남 출장 홈케어 전용 핵심 키워드군';
const compIdx = seoSrc.indexOf(compMarker);

if (compIdx === -1) {
  throw new Error('compMarker not found in seo-keywords.ts');
}

const competitorBlock = `// 국내 주요 출장마사지·출장안마 대표 브랜드 및 플랫폼 비교 검색어
export const COMPETITOR_SEO = [
  // 1. 대표 브랜드 비교군
  '도도출장마사지', '도도출장안마', '도도홈타이',
  '스피드출장마사지', '스피드출장안마', '스피드홈타이',
  '나비출장마사지', '나비출장안마', '나비홈타이',
  '황제출장마사지', '황제출장안마', '황제홈타이',
  '에이스출장마사지', '에이스출장안마', '에이스홈타이',
  '원출장마사지', '원출장안마', '원홈타이',
  '로얄출장마사지', '로얄출장안마', '로얄홈타이',
  '스타출장마사지', '스타출장안마', '스타홈타이',
  '퀸출장마사지', '퀸출장안마', '퀸홈타이',
  '엔젤출장마사지', '엔젤출장안마',
  '달콤출장마사지', '달콤출장안마',
  '시크릿출장마사지', '시크릿출장안마',
  '미라클출장마사지', '미라클출장안마',
  '애플출장마사지', '애플출장안마',
  '골드출장마사지', '골드출장안마',
  // 2. 비교·순위·업체 탐색 검색어
  '출장마사지비교', '출장안마비교', '출장홈타이비교',
  '출장마사지순위', '출장안마순위', '출장홈타이순위',
  '출장마사지업체', '출장안마업체', '출장마사지업체비교', '출장안마업체비교',
  '출장마사지업체순위', '출장안마업체순위', '출장마사지추천업체', '출장안마추천업체',
  // 3. 주요 마사지 중개 플랫폼 연계 키워드
  '마통출장마사지', '마사지몬출장마사지', '하이타이출장마사지', '다누워출장마사지', '마캉스출장마사지',
];

`;

if (!seoSrc.includes('COMPETITOR_SEO = [')) {
  seoSrc = seoSrc.slice(0, compIdx) + competitorBlock + seoSrc.slice(compIdx);
}

// Ensure COMPETITOR_SEO is included in SEO_KEYWORDS
if (!seoSrc.includes('...COMPETITOR_SEO,')) {
  seoSrc = seoSrc.replace(
    'export const SEO_KEYWORDS = [\n',
    'export const SEO_KEYWORDS = [\n  ...COMPETITOR_SEO,\n'
  );
}

// Ensure COMPETITOR_SEO is included in CANDIDATE_POOL
if (!seoSrc.includes('...COMPETITOR_SEO,')) {
  seoSrc = seoSrc.replace(
    'const CANDIDATE_POOL: string[] = Array.from(\n  new Set([\n',
    'const CANDIDATE_POOL: string[] = Array.from(\n  new Set([\n    ...COMPETITOR_SEO,\n'
  );
} else {
  // Replace CANDIDATE_POOL line if it wasn't added there
  seoSrc = seoSrc.replace(
    'const CANDIDATE_POOL: string[] = Array.from(\n  new Set([\n',
    'const CANDIDATE_POOL: string[] = Array.from(\n  new Set([\n    ...COMPETITOR_SEO,\n'
  );
}

// Expand isCompetitor regex in generateSeoPageData
seoSrc = seoSrc.replace(
  'const isCompetitor = /도도|스피드|비교/.test(kw);',
  'const isCompetitor = /도도|스피드|나비|황제|에이스|원출장|원홈타이|로얄|스타|퀸|엔젤|달콤|시크릿|미라클|애플|골드|마통|마사지몬|하이타이|다누워|마캉스|비교|순위|업체/.test(kw);'
);

fs.writeFileSync(seoKeywordsPath, seoSrc.replace(/\n/g, '\r\n'), 'utf8');
console.log('✓ seo-keywords.ts updated with comprehensive competitor conquest keywords');

// 2. Add competitor platform ranking comparison guide to src/lib/guides.ts
const guidesPath = path.join(root, 'src', 'lib', 'guides.ts');
let guidesSrc = fs.readFileSync(guidesPath, 'utf8').replace(/\r\n/g, '\n');

const newGuideObj = `    {
    slug: 'outcall-massage-platform-ranking-comparison',
    title: '출장마사지 플랫폼 및 주요 업체 비교 분석 — 도도·스피드·나비·황제 등 특징과 100% 현장 후불제 기준',
    h1: '국내 출장마사지·출장안마 대표 플랫폼 비교 총정리 — 서비스 특징과 이용 가이드',
    description: '도도, 스피드, 나비, 황제, 에이스 등 국내 주요 출장마사지·출장안마 플랫폼들의 서비스 특징과 이용 방식을 객관적으로 비교 분석합니다. 100% 현장 대면 결제 정찰제와 신속 방문 원칙을 고수하는 아밤(Abam.kr) 안내.',
    keywords: [
      '출장마사지비교', '출장안마비교', '출장마사지순위', '출장안마순위', '출장마사지업체', '출장안마업체',
      '도도출장안마', '스피드출장안마', '나비출장안마', '황제출장안마', '에이스출장안마', '원출장안마',
      '선입금없는출장안마', '후불제출장마사지'
    ],
    published: '2026-10-10',
    sections: [
      {
        heading: '출장마사지 플랫폼 선택 시 핵심 확인 기준',
        paragraphs: [
          '온라인상에서 출장마사지 및 출장안마 플랫폼을 검색할 때 이용자가 가장 먼저 확인해야 할 핵심 기준은 세 가지입니다. 1) 사전 결제 요구 없이 관리사 대면 후 결제하는 현장 후불제 여부, 2) 정규 수기 교육을 이수한 20대 전문 테라피스트 배치 여부, 3) 요청 장소까지의 신속하고 정확한 배차 시스템입니다.'
        ],
        bullets: [
          '결제 투명성: 도착 전 예약금이나 보증금 없는 100% 현장 결제 확인',
          '관리사 전문성: 타이 건식 지압, 천연 아로마, VIP 복합 힐링 수기 실력',
          '신속한 출장 시간: 주요 권역별 대기조 운영을 통한 20~30분 내외 도착'
        ]
      },
      {
        heading: '국내 주요 출장안마 플랫폼별 운영 형태 및 특징',
        paragraphs: [
          '온라인상에서 대중적으로 검색되는 도도출장마사지, 스피드출장마사지, 나비출장안마, 황제출장마사지, 에이스출장안마 등은 각기 다른 배차 네트워크와 관리사 라인업을 통해 방문 케어 서비스를 제공하고 있습니다.',
          '각 플랫폼마다 집중하는 서비스 권역과 코스 구성이 상이하므로, 고객의 현재 위치(자택, 호텔, 오피스텔 등)와 희망하는 관리 코스(타이 릴렉싱, 아로마 림프 케어, 스페셜 수기)에 맞춰 적합한 업체를 선택하는 것이 권장됩니다.'
        ]
      },
      {
        heading: '아밤(Abam.kr)의 차별화된 3대 운영 원칙',
        paragraphs: [
          '아밤은 서울 및 수도권 핵심 거점을 중심으로 투명하고 신뢰할 수 있는 1:1 프라이빗 홈케어 문화를 만들어가고 있습니다.'
        ],
        bullets: [
          '0원 예약금 원칙: 관리사가 고객 문 앞에 도착하여 대면하기 전까지 일절 사전 결제를 요구하지 않습니다.',
          '전원 20대 에이스 라인업: 체계적인 서비스 교육을 수료한 한국인 전문 테라피스트가 직접 방문합니다.',
          '수도권 30분 총알 배차: 서울 25개 구 및 수도권 주요 거점에 분산 배치된 차량 대기조를 가동합니다.'
        ]
      },
      {
        heading: '비즈니스 호텔 및 자택 이용 시 권장 사항',
        paragraphs: [
          '호텔이나 모텔 등 숙박 시설을 이용하시는 경우 도착 전 기사가 사전 연락을 드려 1층 로비 미팅 후 결제를 진행하므로 객실 노출 없이 편안하게 이용하실 수 있습니다. 자택이나 오피스텔은 공동현관 안내를 미리 전달해 주시면 더욱 신속한 방문이 가능합니다.'
        ]
      }
    ]
  },
`;

if (!guidesSrc.includes('outcall-massage-platform-ranking-comparison')) {
  guidesSrc = guidesSrc.replace(
    'export const GUIDES: Guide[] = [\n',
    'export const GUIDES: Guide[] = [\n' + newGuideObj
  );
  fs.writeFileSync(guidesPath, guidesSrc.replace(/\n/g, '\r\n'), 'utf8');
  console.log('✓ guides.ts: Added comprehensive competitor platform ranking comparison guide');
}
