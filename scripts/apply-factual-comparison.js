const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');

// 1. Update src/lib/guides.ts with 100% fact-based, non-derogatory, zero-false-claim comparison
const guidesPath = path.join(root, 'src', 'lib', 'guides.ts');
let guidesSrc = fs.readFileSync(guidesPath, 'utf8').replace(/\r\n/g, '\n');

const targetGuideStart = guidesSrc.indexOf("slug: 'outcall-massage-platform-ranking-comparison',");
const targetGuideEnd = guidesSrc.indexOf("slug: 'outcall-massage-scam-prevention-comparison',");

if (targetGuideStart === -1 || targetGuideEnd === -1) {
  throw new Error('Guide markers not found');
}

const cleanGuideContent = `slug: 'outcall-massage-platform-ranking-comparison',
    title: '출장마사지 순위의 사실과 플랫폼별 특징 총정리 — 도도·스피드·나비 등 서비스 가이드',
    h1: '국내 출장마사지·출장안마 서비스 비교 안내 — 순위의 실체와 100% 현장 후불제 기준',
    description: '출장마사지 업계의 공인 순위 존재 여부와 도도, 스피드, 나비 등 주요 플랫폼의 일반적 서비스 특징을 객관적으로 안내합니다. 100% 현장 대면결제 정찰제와 신속 배차 원칙을 지키는 아밤(Abam.kr) 이용 가이드.',
    keywords: [
      '출장마사지순위', '출장안마순위', '출장마사지비교', '출장안마비교', '출장마사지업체', '출장안마업체',
      '도도출장안마', '스피드출장안마', '나비출장안마', '황제출장안마', '에이스출장안마', '원출장안마',
      '선입금없는출장안마', '후불제출장마사지'
    ],
    published: '2026-10-10',
    sections: [
      {
        heading: '1. 출장마사지 순위에 대한 사실과 올바른 선택 기준',
        paragraphs: [
          '온라인상에서 출장마사지나 출장안마를 검색할 때 많은 분들이 순위나 랭킹을 찾으시지만, 국내에는 공인된 국가 기관이나 공식 협회에서 매긴 객관적 순위가 존재하지 않습니다.',
          '따라서 포털 사이트에 노출되는 자의적인 순위 광고에 의존하기보다는, 고객 스스로 다음의 3가지 안전 기준(사전 결제 없는 100% 현장 후불제, 투명한 정찰제 가격표, 정식 수기 교육을 거친 20대 전문 테라피스트)을 확인하는 것이 가장 신뢰할 수 있는 선택법입니다.'
        ],
        bullets: [
          '결제 투명성: 관리사 현장 대면 전 예약금이나 보증금을 요구하지 않는지 확인',
          '관리사 전문성: 타이 건식 지압, 천연 아로마, VIP 복합 수기 실력 검증',
          '신속한 출장 시간: 권역별 차량 대기조를 통한 20~30분 내외 도착 여부'
        ]
      },
      {
        heading: '2. 국내 주요 출장안마 플랫폼별 일반적 서비스 형태',
        paragraphs: [
          '도도출장마사지, 스피드출장마사지, 나비출장안마, 황제출장마사지, 에이스출장안마 등은 온라인상에서 널리 검색되는 대표적인 방문 홈케어 명칭들입니다.',
          '이들 플랫폼은 각자의 배차 네트워크를 기반으로 고객이 계신 자택이나 호텔로 관리사가 방문하는 1:1 케어 서비스를 안내하고 있습니다. 각 플랫폼마다 주력하는 서비스 지역과 세부 코스 구성에 차이가 있으므로, 본인이 위치한 지역과 희망하는 관리 프로그램에 맞춰 상세 안내를 확인하시는 것이 좋습니다.'
        ]
      },
      {
        heading: '3. 아밤(Abam.kr)의 객관적 3대 운영 원칙',
        paragraphs: [
          '아밤은 서울 25개 구 및 수도권 주요 거점을 중심으로 신뢰할 수 있는 1:1 방문 홈케어를 제공합니다.'
        ],
        bullets: [
          '0원 예약금 원칙: 관리사가 현장에 도착하여 대면하기 전까지 단 1원도 사전 결제를 요구하지 않는 100% 현장 후불제',
          '전원 20대 에이스 라인업: 친절하고 정성스러운 수기 힐링을 선사하는 20대 전문 관리사 상시 가동',
          '수도권 20~30분 신속 배차: 서울 및 수도권 핵심 거점에 분산 배치된 차량 대기조 운영'
        ]
      },
      {
        heading: '4. 비즈니스 호텔 및 자택 이용 시 권장 팁',
        paragraphs: [
          '호텔이나 모텔 등 숙박 시설을 이용하시는 경우, 도착 전 기사가 미리 전화를 드려 1층 로비 미팅 후 결제를 진행하므로 객실 노출 없이 편안하게 이용하실 수 있습니다. 자택이나 오피스텔은 공동현관 안내를 예약 시 전달해 주시면 더욱 신속한 방문이 가능합니다.'
        ]
      }
    ]
  },
  {
    `;

guidesSrc = guidesSrc.slice(0, targetGuideStart) + cleanGuideContent + guidesSrc.slice(targetGuideEnd);
fs.writeFileSync(guidesPath, guidesSrc.replace(/\n/g, '\r\n'), 'utf8');
console.log('✓ guides.ts updated with 100% factual, respectful ranking analysis');

// 2. Update src/lib/seo-keywords.ts to use respectful service guide titles
const seoPath = path.join(root, 'src', 'lib', 'seo-keywords.ts');
let seoSrc = fs.readFileSync(seoPath, 'utf8').replace(/\r\n/g, '\n');

seoSrc = seoSrc.replace(
  `  if (isCompetitor) {
    title = \`【출장마사지 1위】 \${kw} vs 아밤 서비스 비교 | 20대 ACE 총출동 100% 현장후불제 Abam.kr\`;
    description = \`\${kw} 및 주요 출장안마 서비스 비교 안내. 사전 예약금 없는 100% 현장 대면 결제 원칙과 투명 정찰제, 전원 20대 에이스 관리사 라인업, 서울·수도권 30분 총알도착 아밤(Abam.kr) 이용 안내.\`;
    h1 = \`\${kw} vs 아밤 서비스 비교 — [20대 ACE 총출동 100% 후불제]\`;
  }`,
  `  if (isCompetitor) {
    title = \`【서비스 안내】 \${kw} 및 출장안마 이용 가이드 | 아밤 Abam.kr 100% 현장후불제\`;
    description = \`\${kw} 및 주요 출장안마 서비스 이용 가이드. 사전 예약금 없는 100% 현장 대면결제 원칙과 투명 정찰제 요금표, 전원 20대 에이스 관리사 라인업, 서울·수도권 20~30분 신속 방문 아밤(Abam.kr) 안내.\`;
    h1 = \`\${kw} 및 주요 출장안마 서비스 이용 안내\`;
  }`
);

fs.writeFileSync(seoPath, seoSrc.replace(/\n/g, '\r\n'), 'utf8');
console.log('✓ seo-keywords.ts updated with respectful title format');
