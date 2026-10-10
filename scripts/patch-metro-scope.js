const fs = require('fs');
const path = require('path');

function replaceInFile(relPath, replacements) {
  const fullPath = path.join(__dirname, '..', relPath);
  if (!fs.existsSync(fullPath)) {
    console.error('File not found:', fullPath);
    return;
  }
  let content = fs.readFileSync(fullPath, 'utf8');
  let count = 0;
  for (const [from, to] of replacements) {
    if (typeof from === 'string') {
      if (content.includes(from)) {
        content = content.split(from).join(to);
        count++;
      }
    } else if (from instanceof RegExp) {
      if (from.test(content)) {
        content = content.replace(from, to);
        count++;
      }
    }
  }
  fs.writeFileSync(fullPath, content, 'utf8');
  console.log(`[OK] ${relPath} updated (${count} replacements)`);
}

// 1. layout.tsx
replaceInFile('src/app/layout.tsx', [
  [
    '출장마사지 · 출장안마 1위 아밤(Abam.kr) [20대 ACE 총출동] 전원 20대 에이스 관리사 라인업! 서울 전역 자택·호텔 30분 총알도착, 사전 예약금 없는 100% 현장 후불제 안심 케어. 타이·아로마·스페셜 힐링 코스 60분/90분/120분 정찰제 운영.',
    '출장마사지 · 출장안마 1위 아밤(Abam.kr) [20대 ACE 총출동] 전원 20대 에이스 관리사 라인업! 서울·경기·인천 수도권 전역 자택·호텔 30분 총알도착, 사전 예약금 없는 100% 현장 후불제 안심 케어. 타이·아로마·스페셜 힐링 코스 60분/90분/120분 정찰제 운영.'
  ],
  [
    '서울 전역 자택·호텔 30분 총알도착! 전원 20대 에이스 관리사 라인업, 사전 예약금 없는 100% 현장 후불제 출장마사지 & 출장안마. 예약은 18:00부터 (영업 19:00 ~ 05:00).',
    '서울·경기·인천 수도권 전역 자택·호텔 30분 총알도착! 전원 20대 에이스 관리사 라인업, 사전 예약금 없는 100% 현장 후불제 출장마사지 & 출장안마. 예약은 18:00부터 (영업 19:00 ~ 05:00).'
  ],
  [
    'Abam.kr 20대 ACE 총출동 서울 출장마사지',
    'Abam.kr 20대 ACE 총출동 서울·경기·인천 출장마사지'
  ],
  [
    "title: '출장마사지 · 출장안마 1위 [20대 ACE 총출동] 서울·경기·인천 100% 후불제 | 아밤 Abam.kr'",
    "title: '출장마사지 · 출장안마 1위 [20대 ACE 총출동] 서울·경기·인천 100% 후불제 | 아밤 Abam.kr'"
  ],
  [
    "description: '서울 전역 자택·호텔 30분 총알도착! 전원 20대 ACE 관리사 라인업, 100% 현장 후불제. 예약 18:00부터 (영업 19:00 ~ 05:00).'",
    "description: '서울·경기·인천 수도권 전역 자택·호텔 30분 총알도착! 전원 20대 ACE 관리사 라인업, 100% 현장 후불제. 예약 18:00부터 (영업 19:00 ~ 05:00).'"
  ],
  [
    "name: 'Abam.kr 서울 출장마사지 · 출장안마 [20대 ACE 총출동]'",
    "name: 'Abam.kr 서울·경기·인천 출장마사지 · 출장안마 [20대 ACE 총출동]'"
  ],
  [
    "description: '전원 20대 에이스 관리사 라인업! 서울 전역 자택·호텔로 30분 내 방문하는 100% 후불제 1:1 프라이빗 출장마사지, 출장안마.'",
    "description: '전원 20대 에이스 관리사 라인업! 서울 25개 구 및 경기·인천(수원·분당·판교·일산·부천·송도·평택 등) 수도권 전역 자택·호텔로 30분 내 방문하는 100% 후불제 1:1 프라이빗 출장마사지, 출장안마.'"
  ],
  [
    "name: '서울 어디든 방문 가능한가요?'",
    "name: '서울 및 경기·인천 수도권도 방문 가능한가요?'"
  ],
  [
    "text: '네, 서울 전역 자택·호텔 등 원하시는 공간으로 방문하는 프라이빗 1:1 방문 홈케어입니다.'",
    "text: '네, 서울 25개 구 전역 및 경기·인천(수원·분당·판교·일산·부천·송도 등) 수도권 핵심 거점 자택·호텔 등 원하시는 공간으로 신속하게 방문합니다.'"
  ],
  [
    "text: '네, 자택·호텔 등 원하시는 공간에서 프라이빗한 1:1 케어를 받으실 수 있습니다.'",
    "text: '네, 서울·경기·인천 수도권 전역 자택·호텔 등 원하시는 공간에서 프라이빗한 1:1 케어를 받으실 수 있습니다.'"
  ],
  [
    "areaServed: { '@type': 'AdministrativeArea', name: '서울 전역' }",
    "areaServed: { '@type': 'AdministrativeArea', name: '서울·경기·인천 수도권 전역' }"
  ],
  [
    "name: '아밤 Abam.kr - 20대 ACE 총출동 서울 출장마사지'",
    "name: '아밤 Abam.kr - 20대 ACE 총출동 서울·경기·인천 출장마사지'"
  ],
  [
    "description: '서울 출장마사지 · 출장안마 1위 아밤(Abam.kr) [20대 ACE 총출동] 전원 20대 에이스 관리사 라인업! 서울 전역 자택·호텔 30분 총알도착, 100% 현장 후불제 안심 케어.'",
    "description: '서울·경기·인천 출장마사지 · 출장안마 1위 아밤(Abam.kr) [20대 ACE 총출동] 전원 20대 에이스 관리사 라인업! 서울·경기·인천 수도권 전역 자택·호텔 30분 총알도착, 100% 현장 후불제 안심 케어.'"
  ]
]);

// 2. opengraph-image.tsx
replaceInFile('src/app/opengraph-image.tsx', [
  [
    "export const alt = 'Abam.kr 아름다운 밤 | 프라이빗 1:1 방문 홈케어 · 서울 전역';",
    "export const alt = 'Abam.kr 아름다운 밤 | 프라이빗 1:1 방문 홈케어 · 서울·경기·인천';"
  ],
  [
    "프라이빗 1:1 방문 홈케어 · 서울 전역",
    "프라이빗 1:1 방문 홈케어 · 서울·경기·인천"
  ]
]);

// 3. manifest.ts
replaceInFile('src/app/manifest.ts', [
  [
    "name: '아밤 - 20대 ACE 총출동 서울 출장마사지',",
    "name: '아밤 - 20대 ACE 총출동 서울·경기·인천 출장마사지',"
  ],
  [
    "description: '서울 전역 자택·호텔 30분 총알도착! 전원 20대 에이스 관리사 라인업, 사전 예약금 없는 100% 현장 후불제 안심 케어.',",
    "description: '서울·경기·인천 수도권 전역 자택·호텔 30분 총알도착! 전원 20대 에이스 관리사 라인업, 사전 예약금 없는 100% 현장 후불제 안심 케어.',"
  ],
  [
    "name: '서울 25개 자치구 지역별 안내',",
    "name: '수도권(서울·경기·인천) 지역별 안내',"
  ],
  [
    "description: '강남·서초·송파·마포·용산 등 서울 전역 30분 도착',",
    "description: '서울 25개 구 및 경기·인천(수원·분당·일산·부천·송도 등) 30분 도착',"
  ]
]);

// 4. rss.xml/route.ts
replaceInFile('src/app/rss.xml/route.ts', [
  [
    "- 서울 프라이빗 1:1 방문 홈케어 | Abam.kr",
    "- 서울·경기·인천 프라이빗 1:1 방문 홈케어 | Abam.kr"
  ],
  [
    "서울 전역 자택·호텔 1:1 방문 홈케어",
    "서울·경기·인천 수도권 전역 자택·호텔 1:1 방문 홈케어"
  ],
  [
    "<title>Abam.kr | 서울 출장마사지 · 출장안마 프라이빗 1:1 방문 홈케어</title>",
    "<title>Abam.kr | 서울·경기·인천 출장마사지 · 출장안마 프라이빗 1:1 방문 홈케어</title>"
  ],
  [
    "<description>서울 전역 자택·호텔로 방문하는 1:1 프라이빗 출장마사지 &amp; 출장안마 공식 피드</description>",
    "<description>서울·경기·인천 수도권 전역 자택·호텔로 방문하는 1:1 프라이빗 출장마사지 &amp; 출장안마 공식 피드</description>"
  ]
]);

// 5. guide/page.tsx
replaceInFile('src/app/guide/page.tsx', [
  [
    "Abam.kr 프라이빗 1:1 방문 홈케어(서울 전역 자택·호텔)의 이용 가이드 모음.",
    "Abam.kr 프라이빗 1:1 방문 홈케어(서울·경기·인천 수도권 전역 자택·호텔)의 이용 가이드 모음."
  ],
  [
    "서울 전역 자택·호텔 프라이빗 1:1 방문 홈케어를 처음 이용하는 분들이",
    "서울·경기·인천 수도권 전역 자택·호텔 프라이빗 1:1 방문 홈케어를 처음 이용하는 분들이"
  ],
  [
    "서울 전역 자택·호텔 방문",
    "서울·경기·인천 수도권 전역 자택·호텔 방문"
  ]
]);

// 6. guide/[slug]/page.tsx
replaceInFile('src/app/guide/[slug]/page.tsx', [
  [
    "<h2 style={{ fontSize: 15, fontWeight: 800, margin: '0 0 6px' }}>서울 출장마사지·출장안마 예약</h2>",
    "<h2 style={{ fontSize: 15, fontWeight: 800, margin: '0 0 6px' }}>서울·경기·인천 출장마사지·출장안마 예약</h2>"
  ],
  [
    "서울 전역 자택·호텔 방문 · 예약은 18:00부터",
    "서울·경기·인천 수도권 전역 자택·호텔 방문 · 예약은 18:00부터"
  ]
]);

// 7. guides.ts
replaceInFile('src/lib/guides.ts', [
  [
    "서울 전역 자택·호텔)와 동일하게 유지하세요.",
    "서울·경기·인천 수도권 전역 자택·호텔)와 동일하게 유지하세요."
  ],
  [
    "Abam.kr은 서울 전역 자택·호텔 등 원하시는 공간으로 방문하는",
    "Abam.kr은 서울·경기·인천 수도권 전역 자택·호텔 등 원하시는 공간으로 방문하는"
  ],
  [
    "Abam.kr(아름다운 밤)은 서울 전역 자택·호텔 등 원하시는 공간에서",
    "Abam.kr(아름다운 밤)은 서울·경기·인천 수도권 전역 자택·호텔 등 원하시는 공간에서"
  ]
]);

// 8. seo/[keyword]/page.tsx
replaceInFile('src/app/seo/[keyword]/page.tsx', [
  [
    ': "자택·호텔 등 원하시는 공간으로 서울 전역 방문합니다.",',
    ': "자택·호텔 등 원하시는 공간으로 서울·경기·인천 수도권 전역 방문합니다.",'
  ],
  [
    ': { "@type": "AdministrativeArea", name: "서울 전역" },',
    ': { "@type": "AdministrativeArea", name: "서울·경기·인천 수도권 전역" },'
  ],
  [
    'Abam.kr(아름다운 밤)은 서울 전역 자택·호텔로 방문하는',
    'Abam.kr(아름다운 밤)은 서울·경기·인천 수도권 전역 자택·호텔로 방문하는'
  ]
]);

// 9. seo-keywords.ts
replaceInFile('src/lib/seo-keywords.ts', [
  [
    "if (!core) return '서울 전지역';",
    "if (!core) return '서울·경기·인천 수도권 전지역';"
  ],
  [
    "return '서울 전지역';",
    "return '서울·경기·인천 수도권 전지역';"
  ]
]);

// 10. keywords/page.tsx
replaceInFile('src/app/keywords/page.tsx', [
  [
    "title: '서울 지역별 프라이빗 1:1 방문 홈케어 안내 | Abam.kr',",
    "title: '수도권(서울·경기·인천) 지역별 프라이빗 1:1 방문 홈케어 안내 | Abam.kr',"
  ],
  [
    "description: '강남·서초·송파·마포·용산·영등포 등 서울 전역 지역별 안내. 자택·호텔 방문, 예약은 18:00부터 (영업 19:00~05:00). 타이·아로마·스페셜 코스.',",
    "description: '서울 25개 구 및 경기·인천(수원·분당·판교·일산·부천·송도·평택 등) 수도권 전역 지역별 안내. 자택·호텔 30분 도착, 100% 현장 후불제. 타이·아로마·스페셜 코스.',"
  ],
  [
    "title: '서울 지역별 프라이빗 1:1 방문 홈케어 안내 | Abam.kr',",
    "title: '수도권(서울·경기·인천) 지역별 프라이빗 1:1 방문 홈케어 안내 | Abam.kr',"
  ],
  [
    "description: '서울 전역 · 자택 · 호텔. 예약은 18:00부터 (영업 19:00 ~ 05:00).',",
    "description: '서울·경기·인천 수도권 전역 · 자택 · 호텔 30분 도착. 100% 후불제.',"
  ],
  [
    "name: '서울 지역별 프라이빗 1:1 방문 홈케어 안내 Abam.kr',",
    "name: '수도권(서울·경기·인천) 지역별 프라이빗 1:1 방문 홈케어 안내 Abam.kr',"
  ],
  [
    "서울 전역 · 자택 · 호텔 · 예약은 18:00부터 (영업 19:00 ~ 05:00)",
    "서울·경기·인천 수도권 전역 · 자택 · 호텔 30분 도착 · 100% 현장후불제"
  ],
  [
    "서울 지역별 프라이빗 1:1 방문 홈케어 안내",
    "수도권(서울·경기·인천) 지역별 프라이빗 1:1 방문 홈케어 안내"
  ],
  [
    "Abam.kr(아름다운 밤)은 서울 전역 자택·호텔로 방문하는 프라이빗 1:1 홈케어입니다.",
    "Abam.kr(아름다운 밤)은 서울 25개 구 및 경기·인천 수도권 전역 자택·호텔로 신속하게 방문하는 프라이빗 1:1 홈케어입니다."
  ],
  [
    "<div><strong>Abam.kr</strong> · 아름다운 밤, 당신을 위한 특별한 시간 · 서울 전역 프라이빗 1:1 방문 홈케어</div>",
    "<div><strong>Abam.kr</strong> · 아름다운 밤, 당신을 위한 특별한 시간 · 서울·경기·인천 수도권 전역 프라이빗 1:1 방문 홈케어</div>"
  ]
]);

console.log('--- ALL FILES PATCHED TO EXPAND METROPOLITAN SCOPE ---');
