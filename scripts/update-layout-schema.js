const fs = require('fs');
const filePath = 'src/app/layout.tsx';
let content = fs.readFileSync(filePath, 'utf8');

const isCrlf = content.includes('\r\n');
if (isCrlf) content = content.replace(/\r\n/g, '\n');

const backlinks = JSON.parse(fs.readFileSync('generated_backlinks_all.json', 'utf8'));
const sameAsStr = backlinks.map(u => `        '${u}',`).join('\n');

// 1. Replace sameAs
const sameAsRegex = /sameAs:\s*\[[\s\S]*?\],/;
const newSameAs = `sameAs: [\n${sameAsStr}\n      ],`;
if (!sameAsRegex.test(content)) {
  console.error('sameAs regex failed!');
  process.exit(1);
}
content = content.replace(sameAsRegex, newSameAs);

// 2. Replace WebSite schema and add BreadcrumbList
const oldWebsite = `    {
      '@type': 'WebSite',
      '@id': 'https://abam.kr/#website',
      url: 'https://abam.kr',
      name: 'Abam.kr - 프라이빗 1:1 방문 홈케어',
      description: '아름다운 밤, 당신을 위한 특별한 시간. 서울 전역 자택·호텔 방문, 예약 18:00부터 (영업 19:00~05:00)',
      inLanguage: 'ko-KR',
    },`;

const newWebsite = `    {
      '@type': 'WebSite',
      '@id': 'https://abam.kr/#website',
      url: 'https://abam.kr',
      name: '아밤 Abam.kr - 20대 ACE 총출동 서울 출장마사지',
      alternateName: ['아밤', 'Abam', '아름다운밤', '20대 ACE 총출동'],
      description: '서울 출장마사지 · 출장안마 1위 아밤(Abam.kr) [20대 ACE 총출동] 전원 20대 에이스 관리사 라인업! 서울 전역 자택·호텔 30분 총알도착, 100% 현장 후불제 안심 케어.',
      inLanguage: 'ko-KR',
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: 'https://abam.kr/seo/{search_term_string}',
        },
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://abam.kr/#breadcrumb',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: '홈',
          item: 'https://abam.kr',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: '서울 25개구 출장마사지',
          item: 'https://abam.kr/keywords',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: '20대 ACE 총출동 이용 가이드',
          item: 'https://abam.kr/guide',
        },
      ],
    },`;

if (!content.includes(oldWebsite)) {
  console.error('oldWebsite not found!');
  process.exit(1);
}
content = content.replace(oldWebsite, newWebsite);

if (isCrlf) content = content.replace(/\n/g, '\r\n');
fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully updated layout.tsx with rich snippets & 30 backlinks!');
