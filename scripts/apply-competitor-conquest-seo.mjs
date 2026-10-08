// scripts/apply-competitor-conquest-seo.mjs
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.join(__dirname, '..');

// 1. Update src/lib/guides.ts
const guidesPath = path.join(root, 'src', 'lib', 'guides.ts');
let guidesSrc = fs.readFileSync(guidesPath, 'utf8');

const newGuide = `  {
    slug: 'outcall-massage-scam-prevention-comparison',
    title: '출장마사지 선입금 사기 구별법 및 도도·스피드 등 출장안마 이용 시 필수 체크리스트',
    h1: '출장마사지·출장안마 안전하게 이용하는 법 — 100% 현장 후불제 기준과 업체 비교',
    description: '도도출장안마, 스피드출장안마 등 출장마사지 예약 시 주의해야 할 선입금 사기 수법과 안전한 100% 현장 대면결제 판별 기준을 정리했습니다. 아밤(Abam.kr)의 전원 20대 에이스 관리사, 서울 전역 30분 총알도착, 투명 정찰제 비교.',
    keywords: ['출장마사지', '출장안마', '도도출장안마', '도도출장마사지', '스피드출장안마', '스피드출장마사지', '선입금없는출장안마', '후불제출장마사지', '출장마사지비교'],
    published: '2026-10-09',
    sections: [
      {
        heading: '출장마사지·출장안마 선입금 사기의 전형적인 수법',
        paragraphs: [
          '최근 온라인상에서 도도출장안마, 스피드출장안마 등 유명 상호를 사칭하거나 모방하여 선입금을 가로채는 신종 피싱 사기가 기승을 부리고 있습니다.',
          '정상적인 출장마사지 업체는 관리사가 도착하기 전에 예약금, 보증금, 안전금, 배차비 등의 명목으로 단 1원도 먼저 입금을 요구하지 않습니다.',
          '사기 조직의 대표적인 수법은 다음과 같습니다. 1) 처음에는 1~2만 원의 소액 예약금을 요구함, 2) 입금 후 안전 보증금 명목으로 30~50만 원 추가 요구함, 3) 환불을 핑계로 계속해서 고액 입금을 유도한 뒤 연락 두절됨. 이러한 요구를 받으셨다면 즉시 입금을 중단해야 합니다.'
        ],
        bullets: [
          '예약금·보증금 선입금 요구: 100% 사기 의심 대상',
          '문화상품권, 기프트카드, 가상화폐 결제 유도: 즉시 차단 필요',
          '도착 후 대면 결제 거부 업체: 정상 서비스 불가'
        ]
      },
      {
        heading: '100% 현장 대면결제(후불제)가 안전한 이유',
        paragraphs: [
          '진짜 신뢰할 수 있는 출장안마 서비스를 이용하려면 반드시 관리사가 자택이나 호텔 객실 문 앞에 도착하여 대면한 후 결제하는 100% 현장 후불제 시스템을 확인해야 합니다.',
          '아밤(Abam.kr)은 운영 초기부터 철저하게 100% 현장 후불제를 원칙으로 운영되고 있으며, 고객이 관리사를 직접 확인하기 전까지 어떠한 금전 거래도 발생하지 않습니다.'
        ]
      },
      {
        heading: '아밤(Abam.kr) vs 일반 출장안마(도도·스피드 등) 3대 핵심 비교',
        paragraphs: [
          '업체 선택 시 고려해야 할 3대 핵심 요소는 결제 안전성, 관리사 연령 및 퀄리티, 도착 소요 시간입니다.'
        ],
        bullets: [
          '결제 투명성: 아밤은 0원 예약금, 100% 현장 후불제 정찰제(타이 8만~/아로마 9만~/스페셜 10만~)를 철저히 고수합니다.',
          '관리사 라인업: 전원 20대 에이스 한국인 관리사 라인업을 상시 가동하여 차별화된 친절과 수기 힐링을 선사합니다.',
          '신속한 출장 시간: 서울 25개 구 전역에 상시 대기조를 배치하여 강남, 마포, 영등포, 송파, 용산 등 어디든 20~30분 내 총알 도착합니다.'
        ]
      },
      {
        heading: '호텔 및 자택 이용 시 권장 팁',
        paragraphs: [
          '호텔 투숙객의 경우 정확한 호텔명과 객실 호수를 전달하시면 외부 노출 없이 조용하게 프라이빗 케어를 받으실 수 있습니다. 관리사가 전용 매트와 1회용 밀봉 위생 시트, 천연 식물성 아로마 오일을 완비하여 방문하므로 별도의 준비가 필요 없습니다.'
        ]
      }
    ],
  },
`;

if (!guidesSrc.includes('outcall-massage-scam-prevention-comparison')) {
  guidesSrc = guidesSrc.replace(
    'export const GUIDES: Guide[] = [',
    `export const GUIDES: Guide[] = [\r\n${newGuide}`
  );
  fs.writeFileSync(guidesPath, guidesSrc, 'utf8');
  console.log('guides.ts updated with comparison guide.');
}

// 2. Update src/lib/seo-keywords.ts
const seoKwPath = path.join(root, 'src', 'lib', 'seo-keywords.ts');
let seoKwSrc = fs.readFileSync(seoKwPath, 'utf8');

const competitorKws = [
  '출장마사지1위', '출장안마1위',
  '도도출장안마', '도도출장마사지',
  '스피드출장안마', '스피드출장마사지',
  '선입금없는출장안마', '후불제출장안마',
  '출장마사지비교'
];

// Add competitor keywords to SITUATION_SEO
if (!seoKwSrc.includes('도도출장안마')) {
  seoKwSrc = seoKwSrc.replace(
    `  // 서비스 유형 기본\r\n  '출장마사지',`,
    `  // 서비스 유형 기본\r\n  '출장마사지', '출장마사지1위', '출장안마1위', '도도출장안마', '도도출장마사지', '스피드출장안마', '스피드출장마사지', '선입금없는출장안마', '후불제출장안마', '출장마사지비교',`
  );
}

// Add to HEAD_TERMS
if (!seoKwSrc.includes(`'도도출장안마', '스피드출장안마'`)) {
  seoKwSrc = seoKwSrc.replace(
    `const HEAD_TERMS = [\r\n  '출장마사지',`,
    `const HEAD_TERMS = [\r\n  '출장마사지', '출장마사지1위', '출장안마1위', '도도출장안마', '도도출장마사지', '스피드출장안마', '스피드출장마사지', '출장마사지비교',`
  );
}

// Add to HIGH_INTENT_SEO_TERMS
if (!seoKwSrc.includes(`'출장마사지1위', '도도출장안마'`)) {
  seoKwSrc = seoKwSrc.replace(
    `const HIGH_INTENT_SEO_TERMS = [\r\n  '출장마사지',`,
    `const HIGH_INTENT_SEO_TERMS = [\r\n  '출장마사지', '출장마사지1위', '출장안마1위', '도도출장안마', '도도출장마사지', '스피드출장안마', '스피드출장마사지', '출장마사지비교',`
  );
}

// Custom page data generator for competitor & 1위 keywords
const targetGenCode = `  if (district && (isSeoulKw || region !== '서울 전지역')) {`;
const competitorGenCode = `  const isCompetitor = /도도|스피드|비교/.test(kw);
  const isPrimaryRank1 = /출장마사지1위|출장안마1위/.test(kw) || kw === '출장마사지' || kw === '출장안마';

  if (isCompetitor) {
    title = \`\${kw} 비교 1위 아밤(Abam.kr) | 선입금 없는 100% 현장 후불제 [20대 ACE 총출동]\`;
    description = \`\${kw} 비교 분석 및 100% 안심 이용 가이드. 도도·스피드 등 출장안마 이용 시 선입금 사기 주의사항과 100% 대면 결제 원칙. 전원 20대 에이스 관리사 라인업, 서울 전역 30분 총알도착 아밤(Abam.kr).\`;
    h1 = \`\${kw} vs 아밤 100% 후불제 비교 — [20대 ACE 총출동]\`;
  } else if (isPrimaryRank1) {
    title = \`\${kw} [20대 ACE 총출동] | 대한민국 1위 서울 전역 30분 도착 100% 후불제 Abam.kr\`;
    description = \`\${kw} 1위 아밤(Abam.kr) [20대 ACE 총출동] 전원 20대 에이스 관리사 항시 대기! 서울 전역 호텔·자택 30분 총알도착, 사전 예약금 없는 100% 현장 후불제 안심 케어. 타이·아로마·스페셜 코스.\`;
    h1 = \`대한민국 \${kw} 1위 — [20대 ACE 총출동] 100% 현장 후불제\`;
  } else if (district && (isSeoulKw || region !== '서울 전지역')) {`;

if (!seoKwSrc.includes('const isCompetitor =')) {
  seoKwSrc = seoKwSrc.replace(targetGenCode, competitorGenCode);
  fs.writeFileSync(seoKwPath, seoKwSrc, 'utf8');
  console.log('seo-keywords.ts updated with competitor conquest logic.');
}

// 3. Update src/app/layout.tsx
const layoutPath = path.join(root, 'src', 'app', 'layout.tsx');
let layoutSrc = fs.readFileSync(layoutPath, 'utf8');

// Title
layoutSrc = layoutSrc.replace(
  `    default: '서울 출장마사지 · 출장안마 [20대 ACE 총출동] | 아밤 Abam.kr',`,
  `    default: '출장마사지 · 출장안마 1위 [20대 ACE 총출동] 서울·경기·인천 100% 후불제 | 아밤 Abam.kr',`
);
layoutSrc = layoutSrc.replace(
  `    template: '%s | 20대 ACE 총출동 서울 출장마사지 아밤 Abam.kr',`,
  `    template: '%s | 출장마사지 1위 20대 ACE 총출동 아밤 Abam.kr',`
);

// Description
layoutSrc = layoutSrc.replace(
  `  description:\r\n    '서울 출장마사지 · 출장안마 1위 아밤(Abam.kr) [20대 ACE 총출동] 전원 20대 에이스 관리사 라인업! 서울 전역 자택·호텔 30분 총알도착, 사전 예약금 없는 100% 현장 후불제 안심 케어. 타이·아로마·스페셜 코스 60분/90분/120분.',`,
  `  description:\r\n    '출장마사지 · 출장안마 1위 아밤(Abam.kr) [20대 ACE 총출동] 전원 20대 에이스 관리사 라인업! 서울 전역 자택·호텔 30분 총알도착, 사전 예약금 없는 100% 현장 후불제 안심 케어. 도도·스피드 비교 불가 최상급 퀄리티, 타이·아로마·스페셜 힐링 코스.',`
);

// Keywords in layout
layoutSrc = layoutSrc.replace(
  `    '20대ACE총출동', '20대출장마사지', '20대출장안마', '20대에이스', '20대홈타이',`,
  `    '출장마사지', '출장안마', '출장마사지1위', '출장안마1위', '20대ACE총출동', '20대출장마사지', '20대출장안마', '20대에이스', '20대홈타이', '도도출장안마', '도도출장마사지', '스피드출장안마', '스피드출장마사지',`
);

// OpenGraph & Twitter
layoutSrc = layoutSrc.replace(
  `    title: '서울 출장마사지 · 출장안마 [20대 ACE 총출동] | 아밤 Abam.kr',`,
  `    title: '출장마사지 · 출장안마 1위 [20대 ACE 총출동] 서울·경기·인천 100% 후불제 | 아밤 Abam.kr',`
);
layoutSrc = layoutSrc.replace(
  `    title: '서울 출장마사지 · 출장안마 [20대 ACE 총출동] | 아밤 Abam.kr',`,
  `    title: '출장마사지 · 출장안마 1위 [20대 ACE 총출동] 서울·경기·인천 100% 후불제 | 아밤 Abam.kr',`
);

// Add competitor Telegraph URLs to sameAs
const newBacklinks = `        'https://telegra.ph/출장마사지-1위-추천--도도출장안마스피드출장안마-비교-및-100-후불제-안심-가이드-10-08',
        'https://telegra.ph/도도출장안마-도도출장마사지-이용-전-필독--선입금-없는-100-대면결제-확인법-10-08',
        'https://telegra.ph/스피드출장안마-스피드출장마사지-비교-분석--서울-전역-30분-총알-방문과-정찰-요금-10-08',
        'https://telegra.ph/출장마사지-순위-1등-기준--후기-많은-곳보다-100-현장-후불제-선택해야-하는-이유-10-08',
        'https://telegra.ph/서울-출장안마-추천--20대-ACE-총출동-30분-총알도착과-호텔-객실-11-케어-10-08',`;

if (!layoutSrc.includes('도도출장안마-도도출장마사지')) {
  layoutSrc = layoutSrc.replace(
    `      sameAs: [\r\n`,
    `      sameAs: [\r\n${newBacklinks}\r\n`
  );
}

// AlternateName in LocalBusiness
layoutSrc = layoutSrc.replace(
  `alternateName: ['아밤', '아름다운 밤', '20대 ACE 총출동', '서울출장마사지', '서울출장안마', '아밤출장마사지'],`,
  `alternateName: ['출장마사지', '출장안마', '출장마사지1위', '출장안마1위', '아밤', '아름다운 밤', '20대 ACE 총출동', '서울출장마사지', '서울출장안마', '도도출장안마 비교 1위', '스피드출장안마 비교 1위', '아밤출장마사지'],`
);

fs.writeFileSync(layoutPath, layoutSrc, 'utf8');
console.log('layout.tsx updated with primary keywords and competitor backlinks.');

// 4. Update src/lib/landing-content.ts
const landingPath = path.join(root, 'src', 'lib', 'landing-content.ts');
let landingSrc = fs.readFileSync(landingPath, 'utf8');

landingSrc = landingSrc.replace(
  `    title: '서울 출장마사지 · 출장안마 [20대 ACE 총출동] Abam.kr 이용 안내',`,
  `    title: '출장마사지 · 출장안마 1위 [20대 ACE 총출동] Abam.kr 이용 안내',`
);
landingSrc = landingSrc.replace(
  `    p1: 'Abam.kr(아밤)은 전원 20대 에이스 관리사 라인업을 갖춘 서울 출장마사지 & 출장안마 전문 플랫폼입니다. 서울 전역 자택·호텔 등 원하시는 프라이빗 공간으로 20~30분 내 신속하게 총알 방문하며, 사전 예약금 없는 100% 현장 후불제로 안심하고 이용하실 수 있습니다.',`,
  `    p1: 'Abam.kr(아밤)은 전원 20대 에이스 관리사 라인업을 갖춘 대한민국 1등 출장마사지 & 출장안마 전문 플랫폼입니다. 도도출장안마, 스피드출장안마 등 타 업체들과 달리 사전 예약금이나 선입금을 단 1원도 요구하지 않는 100% 현장 후불제 안심 플랫폼이며, 서울 전역 자택·호텔 등 원하시는 프라이빗 공간으로 20~30분 내 신속하게 총알 방문합니다.',`
);

fs.writeFileSync(landingPath, landingSrc, 'utf8');
console.log('landing-content.ts updated with competitor comparison about text.');

// 5. Update src/components/AbamLanding.tsx
const compPath = path.join(root, 'src', 'components', 'AbamLanding.tsx');
let compSrc = fs.readFileSync(compPath, 'utf8');

compSrc = compSrc.replace(
  `  ko: {\r\n    h1a: '오늘 밤, 편안한 휴식이', h1b: '당신의 문 앞으로 찾아갑니다',`,
  `  ko: {\r\n    h1a: '대한민국 1위 출장마사지', h1b: '20대 ACE가 문 앞으로 찾아갑니다',`
);

fs.writeFileSync(compPath, compSrc, 'utf8');
console.log('AbamLanding.tsx updated with keyword-loaded H1.');

console.log('ALL COMPETITOR CONQUEST SEO ENHANCEMENTS APPLIED SUCCESSFULLY!');
