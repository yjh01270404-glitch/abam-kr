const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');

// 1. Clean competitor text in src/lib/guides.ts
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

fs.writeFileSync(guidesPath, guidesSrc.replace(/\n/g, '\r\n'), 'utf8');
console.log('✓ guides.ts: Competitor disparagement cleaned');

// 2. Clean competitor description in src/lib/seo-keywords.ts
const seoPath = path.join(root, 'src', 'lib', 'seo-keywords.ts');
let seoSrc = fs.readFileSync(seoPath, 'utf8').replace(/\r\n/g, '\n');

seoSrc = seoSrc.replace(
  `  if (isCompetitor) {
    title = \`【출장마사지 1위】 \${kw} vs 아밤 100% 현장후불제 비교 | 20대 ACE 총출동 Abam.kr\`;
    description = \`\${kw} 비교 분석 및 100% 안심 이용 가이드. 도도·스피드 등 출장안마 이용 시 선입금 사기 주의사항과 100% 대면 결제 원칙. 전원 20대 에이스 관리사 라인업, 서울·경기·인천 30분 총알도착 아밤(Abam.kr).\`;
    h1 = \`\${kw} vs 아밤 100% 후불제 비교 — [20대 ACE 총출동]\`;
  }`,
  `  if (isCompetitor) {
    title = \`【출장마사지 1위】 \${kw} vs 아밤 서비스 비교 | 20대 ACE 총출동 100% 현장후불제 Abam.kr\`;
    description = \`\${kw} 및 주요 출장안마 서비스 비교 안내. 사전 예약금 없는 100% 현장 대면 결제 원칙과 투명 정찰제, 전원 20대 에이스 관리사 라인업, 서울·경기·인천 30분 총알도착 아밤(Abam.kr) 이용 안내.\`;
    h1 = \`\${kw} vs 아밤 서비스 비교 — [20대 ACE 총출동 100% 후불제]\`;
  }`
);

fs.writeFileSync(seoPath, seoSrc.replace(/\n/g, '\r\n'), 'utf8');
console.log('✓ seo-keywords.ts: Competitor disparagement cleaned');
