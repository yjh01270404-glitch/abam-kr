// scripts/remove-competitor-criticism.mjs
// 타업체 비하/비난/언급 전면 제거 및 아밤 자체 프리미엄 1위 브랜드 강화

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.join(__dirname, '..');

// 1. Clean src/lib/landing-content.ts
const landingPath = path.join(root, 'src', 'lib', 'landing-content.ts');
let landingSrc = fs.readFileSync(landingPath, 'utf8');

landingSrc = landingSrc.replace(
  `Abam.kr(아밤)은 전원 20대 에이스 관리사 라인업을 갖춘 대한민국 1등 출장마사지 & 출장안마 전문 플랫폼입니다. 도도출장안마, 스피드출장안마 등 타 업체들과 달리 사전 예약금이나 선입금을 단 1원도 요구하지 않는 100% 현장 후불제 안심 플랫폼이며, 서울 전역 자택·호텔 등 원하시는 프라이빗 공간으로 20~30분 내 신속하게 총알 방문합니다.`,
  `Abam.kr(아밤)은 전원 20대 에이스 관리사 라인업을 갖춘 대한민국 1등 출장마사지 & 출장안마 전문 플랫폼입니다. 사전 예약금이나 선입금을 일절 요구하지 않는 100% 현장 후불제 안심 원칙으로 운영되며, 서울 전역 자택·호텔 등 원하시는 프라이빗 공간으로 20~30분 내 신속하게 총알 방문합니다.`
);
fs.writeFileSync(landingPath, landingSrc, 'utf8');
console.log('landing-content.ts cleaned.');

// 2. Clean src/app/layout.tsx
const layoutPath = path.join(root, 'src', 'app', 'layout.tsx');
let layoutSrc = fs.readFileSync(layoutPath, 'utf8');

// Description
layoutSrc = layoutSrc.replace(
  `사전 예약금 없는 100% 현장 후불제 안심 케어. 도도·스피드 비교 불가 최상급 퀄리티, 타이·아로마·스페셜 힐링 코스.`,
  `사전 예약금 없는 100% 현장 후불제 안심 케어. 타이·아로마·스페셜 힐링 코스 60분/90분/120분 정찰제 운영.`
);

// Keywords
layoutSrc = layoutSrc.replace(
  `'도도출장안마', '도도출장마사지', '스피드출장안마', '스피드출장마사지',`,
  ``
);

// alternateName
layoutSrc = layoutSrc.replace(
  `'도도출장안마 비교 1위', '스피드출장안마 비교 1위', `,
  ``
);

// sameAs - remove competitor conquest URLs
layoutSrc = layoutSrc.replace(
  `        'https://telegra.ph/출장마사지-1위-추천--도도출장안마스피드출장안마-비교-및-100-후불제-안심-가이드-10-08',\r\n        'https://telegra.ph/도도출장안마-도도출장마사지-이용-전-필독--선입금-없는-100-대면결제-확인법-10-08',\r\n        'https://telegra.ph/스피드출장안마-스피드출장마사지-비교-분석--서울-전역-30분-총알-방문과-정찰-요금-10-08',\r\n`,
  ``
);

fs.writeFileSync(layoutPath, layoutSrc, 'utf8');
console.log('layout.tsx cleaned.');

// 3. Clean src/lib/guides.ts
const guidesPath = path.join(root, 'src', 'lib', 'guides.ts');
let guidesSrc = fs.readFileSync(guidesPath, 'utf8');

// Clean the new guide
const cleanGuide = `  {
    slug: 'outcall-massage-scam-prevention-comparison',
    title: '출장마사지 이용 전 필수 안전 가이드 — 선입금 없는 100% 현장 후불제 구별법',
    h1: '출장마사지·출장안마 안전하게 이용하는 법 — 100% 현장 후불제 기준과 안심 체크리스트',
    description: '출장마사지 및 출장안마 예약 시 주의해야 할 선입금 사기 예방법과 안전한 100% 현장 대면결제 판별 기준을 정리했습니다. 아밤(Abam.kr)의 전원 20대 에이스 관리사, 서울 전역 30분 총알도착, 투명 정찰제 시스템 안내.',
    keywords: ['출장마사지', '출장안마', '출장마사지1위', '출장안마1위', '선입금없는출장안마', '후불제출장마사지', '출장마사지안심가이드'],
    published: '2026-10-09',
    sections: [
      {
        heading: '출장마사지·출장안마 선입금 사기의 전형적인 수법',
        paragraphs: [
          '온라인상에서 출장마사지 서비스를 찾을 때 가장 주의해야 할 점은 사전 입금을 요구하는 사기 수법입니다.',
          '정상적인 출장마사지 플랫폼은 관리사가 도착하기 전에 예약금, 보증금, 안전금, 배차비 등의 명목으로 단 1원도 먼저 입금을 요구하지 않습니다.',
          '대표적인 피해 유형은 다음과 같습니다. 1) 처음에는 소액의 예약금을 유도함, 2) 이후 안전 보증금 명목으로 추가 고액 입금을 요구함, 3) 환불 절차를 핑계로 계속해서 입금을 유도한 뒤 잠적함. 이러한 요구를 받으셨다면 즉시 거래를 중단해야 합니다.'
        ],
        bullets: [
          '예약금·보증금 선입금 요구: 절대 응하지 마세요',
          '문화상품권, 기프트카드 등 비정상 결제 유도: 즉시 차단',
          '도착 후 대면 결제 원칙 준수 여부 필수 확인'
        ]
      },
      {
        heading: '100% 현장 대면결제(후불제)가 안전한 이유',
        paragraphs: [
          '신뢰할 수 있는 출장안마 서비스를 이용하려면 반드시 관리사가 자택이나 호텔 객실에 도착하여 대면한 후 결제하는 100% 현장 후불제 시스템을 확인해야 합니다.',
          '아밤(Abam.kr)은 운영 초기부터 철저하게 100% 현장 후불제를 원칙으로 운영되고 있으며, 고객이 관리사를 직접 확인하기 전까지 어떠한 사전 결제도 요구하지 않습니다.'
        ]
      },
      {
        heading: '아밤(Abam.kr)의 3대 안심 운영 원칙',
        paragraphs: [
          '고객 만족과 안전을 최우선으로 하는 아밤만의 3대 핵심 기준입니다.'
        ],
        bullets: [
          '결제 투명성: 0원 예약금, 100% 현장 후불제 정찰제(타이 8만~/아로마 9만~/스페셜 10만~)를 철저히 고수합니다.',
          '관리사 라인업: 전원 20대 에이스 한국인 관리사 라인업을 상시 가동하여 정성스러운 힐링 케어를 제공합니다.',
          '신속한 출장 시간: 서울 25개 구 전역에 대기조를 배치하여 강남, 마포, 영등포, 송파, 용산 등 어디든 20~30분 내 총알 도착합니다.'
        ]
      },
      {
        heading: '호텔 및 자택 이용 시 권장 팁',
        paragraphs: [
          '호텔 투숙객의 경우 정확한 호텔명과 객실 호수를 전달하시면 조용하고 쾌적하게 1:1 방문 케어를 받으실 수 있습니다. 관리사가 전용 매트와 1회용 밀봉 위생 시트, 천연 식물성 아로마 오일을 완비하여 방문하므로 별도의 준비가 필요 없습니다.'
        ]
      }
    ],
  },`;

const oldGuideRegex = /\{\s*slug:\s*'outcall-massage-scam-prevention-comparison'[\s\S]*?published:\s*'2026-10-09'[\s\S]*?\},/;
if (oldGuideRegex.test(guidesSrc)) {
  guidesSrc = guidesSrc.replace(oldGuideRegex, cleanGuide);
  fs.writeFileSync(guidesPath, guidesSrc, 'utf8');
  console.log('guides.ts cleaned of competitor names.');
}

// 4. Clean src/lib/seo-keywords.ts
const seoKwPath = path.join(root, 'src', 'lib', 'seo-keywords.ts');
let seoKwSrc = fs.readFileSync(seoKwPath, 'utf8');

// Remove competitor keywords from arrays
seoKwSrc = seoKwSrc.replace(
  `'도도출장안마', '도도출장마사지', '스피드출장안마', '스피드출장마사지', '출장마사지비교', `,
  ``
);
seoKwSrc = seoKwSrc.replace(
  `'도도출장안마', '도도출장마사지', '스피드출장안마', '스피드출장마사지', '출장마사지비교', `,
  ``
);
seoKwSrc = seoKwSrc.replace(
  `'도도출장안마', '도도출장마사지', '스피드출장안마', '스피드출장마사지', '선입금없는출장안마', '후불제출장안마', '출장마사지비교', `,
  `'선입금없는출장안마', '후불제출장안마', `
);

// Clean generateSeoPageData
const competitorGenRegex = /const isCompetitor = \/도도\|스피드\|비교\/\.test\(kw\);[\s\S]*?\} else if \(isPrimaryRank1\) \{/;
if (competitorGenRegex.test(seoKwSrc)) {
  seoKwSrc = seoKwSrc.replace(competitorGenRegex, 'const isPrimaryRank1 = /출장마사지1위|출장안마1위/.test(kw) || kw === \'출장마사지\' || kw === \'출장안마\';\r\n\r\n  if (isPrimaryRank1) {');
}

fs.writeFileSync(seoKwPath, seoKwSrc, 'utf8');
console.log('seo-keywords.ts cleaned of competitor conquest logic.');

console.log('ALL COMPETITOR CRITICISMS COMPLETELY REMOVED!');
