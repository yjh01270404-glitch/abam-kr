/**
 * scripts/publish-authority-backlinks.js
 * 건강/웰니스/비즈니스여행/커뮤니티 안전 분야 고권위(DA 93) 사설 백링크 퍼블리싱 엔진
 * 
 * - 주요 공략 타깃: '서울출장마사지', '경기출장마사지', '강남출장마사지', '출장마사지 1위', '아밤(Abam.kr)'
 * - DA 93 고권위 도메인(Telegraph)에 풍부한 전문 콘텐츠와 함께 DoFollow 앵커 텍스트 배치
 * - 발행 후 Google Indexing API에 즉시 디스패치하여 구글봇 즉시 크롤링 유도
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const crypto = require('crypto');

const BASE_URL = 'https://abam.kr';

// 1. 건강/웰니스/여행/안전 전문 에디토리얼 백링크 아티클 컬렉션
const EDITORIAL_ARTICLES = [
  {
    category: '건강 & 웰니스 테라피 리포트',
    title: '현대인 만성 피로와 승모근 긴장 완화: 건식 타이 vs 천연 아로마 홈케어 가이드 [서울출장마사지 1위 아밤]',
    author: '한국 웰니스 힐링 리서치센터',
    content: [
      { tag: 'p', children: ['하루 8시간 이상 모니터 앞에 앉아 근무하는 직장인과 야근이 잦은 비즈니스 종사자들에게 거북목 증후군, 승모근 결림, 요추 긴장은 피할 수 없는 현대인의 고질병입니다. 적절한 이완 없이 피로가 누적되면 수면 장애와 만성 무기력증으로 이어질 수 있습니다.'] },
      { tag: 'h3', children: ['1. 건식 타이 테라피와 아로마 오일 케어의 생체 역학적 효능'] },
      { tag: 'p', children: ['정통 타이 수기 요법은 인체의 에너지 라인(Sen)을 따라 지압과 부드러운 스트레칭을 병행하여 굳어진 관절의 가동 범위를 넓혀줍니다. 반면 식물성 천연 에센셜 오일을 활용한 아로마 테라피는 림프 순환을 촉진하고 자율신경계를 안정시켜 깊은 숙면을 유도하는 탁월한 이점이 있습니다.'] },
      { tag: 'h3', children: ['2. 이동 없는 프라이빗 방문 홈케어의 치유 효과'] },
      { tag: 'p', children: ['퇴근 후 샵까지 직접 이동하는 번거로움 없이, 가장 익숙하고 편안한 자택이나 호텔 객실에서 관리를 받는 방문 홈케어는 이동 중 발생하는 2차 피로와 스트레스를 100% 차단합니다.'] },
      { tag: 'p', children: [
        '현재 국내에서 가장 신뢰받는 ',
        { tag: 'a', attrs: { href: `${BASE_URL}/seo/%EC%84%9C%EC%9A%B8%EC%B6%9C%EC%9E%A5%EB%A7%88%EC%82%AC%EC%A7%80` }, children: ['서울출장마사지 1위 아밤(Abam.kr)'] },
        '은 철저한 실력 검증을 마친 전원 20대 에이스 관리사가 고객의 자택과 호텔로 30분 내 직접 찾아가는 1:1 프리미엄 케어를 제공하고 있습니다.'
      ]},
      { tag: 'h3', children: ['3. 안전한 이용을 위한 체크포인트: 100% 현장 후불제'] },
      { tag: 'p', children: ['테라피 서비스를 예약할 때 가장 경계해야 할 것은 예약금이나 이동 보증금을 사전에 요구하는 사기 행위입니다. 정상적인 전문 플랫폼은 관리사가 문 앞에 도착하여 대면하기 전까지 일체의 금전을 요구하지 않습니다.'] },
      { tag: 'p', children: [
        '자세한 코스별 요금 및 실시간 배차는 ',
        { tag: 'a', attrs: { href: `${BASE_URL}/guide/chuljang-massage-price` }, children: ['출장마사지 정찰제 가격 가이드'] },
        ' 및 ',
        { tag: 'a', attrs: { href: BASE_URL }, children: ['아밤(Abam.kr) 공식 홈페이지'] },
        '에서 확인하실 수 있습니다.'
      ]}
    ]
  },
  {
    category: '비즈니스 & 호텔 투숙객 라이프스타일',
    title: '서울·수도권 비즈니스 출장객을 위한 호텔 룸 프라이빗 홈케어 에티켓 및 20대 전문 테라피 가이드',
    author: '수도권 비즈니스 트래블 저널',
    content: [
      { tag: 'p', children: ['강남, 여의도, 광화문, 판교 테크노밸리 등 서울 및 수도권 핵심 업무지구로 출장을 온 비즈니스맨들에게 호텔 객실에서의 프라이빗한 휴식은 다음 날 업무 생산성을 좌우하는 핵심 요소입니다.'] },
      { tag: 'h3', children: ['1. 비즈니스 호텔 객실 내 출장 홈케어 이용 수칙'] },
      { tag: 'p', children: ['호텔 투숙 시에는 외부 차량 주차 등록 및 로비 카드키 태그 등 보안 절차가 존재합니다. 아밤(Abam.kr)은 기사가 호텔 주차장에 도착하는 즉시 고객에게 유선으로 연락을 드려 1층 로비 또는 지정 장소에서 안전하게 대면 후 안내가 이루어지도록 체계적인 프로토콜을 운영합니다.'] },
      { tag: 'h3', children: ['2. 청결과 위생을 위한 전용 장비 완비'] },
      { tag: 'p', children: ['객실 침구류를 철저히 보호하기 위해 테라피스트가 1회용 방수 위생 시트와 무취 식물성 오일을 완비하여 방문하므로, 호텔 시설 손상 걱정 없이 안심하고 최상의 힐링을 누릴 수 있습니다.'] },
      { tag: 'p', children: [
        '특히 비즈니스 밀집 지역인 강남권역에서는 ',
        { tag: 'a', attrs: { href: `${BASE_URL}/seo/%EA%B0%95%EB%82%A8%EC%B6%9C%EC%9E%A5%EB%A7%88%EC%82%AC%EC%A7%80` }, children: ['강남출장마사지 1:1 방문케어'] },
        ' 시스템을 통해 테헤란로, 역삼, 삼성동 일대 호텔 어디든 30분 내 빠른 도착이 지원됩니다.'
      ]},
      { tag: 'h3', children: ['3. 투명한 정찰제와 0원 예약금'] },
      { tag: 'p', children: [
        '출장지에서의 불필요한 금전 시비를 차단하기 위해 아밤은 건식 타이 60분 8만 원, 아로마 60분 9만 원, 스페셜 60분 10만 원의 투명한 정찰 요금제를 운영하며 전액 현장 대면결제만을 진행합니다. 상세 정보는 ',
        { tag: 'a', attrs: { href: `${BASE_URL}/keywords` }, children: ['아밤 수도권 전역 지역별 예약 현황'] },
        '에서 열람 가능합니다.'
      ]}
    ]
  },
  {
    category: '소비자 안전 & 권익 보호 리포트',
    title: '출장마사지·출장안마 선입금 보증금 사기 수법과 완벽 예방법: 100% 현장 대면결제 판별 기준',
    author: '한국 온라인소비자안전협의회',
    content: [
      { tag: 'p', children: ['최근 온라인 포털과 SNS상에서 출장마사지, 출장안마를 사칭하여 "첫 이용 고객 안전 보증금", "기사 유류비 선입금", "전산 오류로 인한 재입금"을 유도한 뒤 잠적하는 금융 사기 피해가 지속적으로 발생하고 있습니다. 소비자의 각별한 주의가 요구됩니다.'] },
      { tag: 'h3', children: ['1. 대표적인 선입금 피싱 사기 패턴 3가지'] },
      { tag: 'p', children: ['① 첫 예약 보증금 요구: 첫 방문이라 신변 안전 보증금이 필요하다며 5만~10만원 송금 유도\n② 예약금 미입금 핑계: 입금자명이 틀렸다며 동일 금액 재송금 요구 후 잠적\n③ 도착 직전 추가 입금 요구: 기사가 도착했으니 잔금을 계좌로 넣어야 올라간다고 속임'] },
      { tag: 'h3', children: ['2. 사기를 100% 차단하는 유일한 원칙: 현장 대면 후 결제'] },
      { tag: 'p', children: ['합법적이고 정상적인 출장 방문 플랫폼은 관리사가 고객이 있는 방문 장소(자택 현관 또는 호텔 룸)에 도착하여 직접 대면하기 전까지 단 1원의 금전도 요구하지 않습니다.'] },
      { tag: 'p', children: [
        '소비자 피해를 사전에 방지하기 위해 발행된 ',
        { tag: 'a', attrs: { href: `${BASE_URL}/guide/outcall-massage-scam-prevention-comparison` }, children: ['출장마사지 선입금 사기 예방 공식 가이드'] },
        '에 따르면, 신뢰할 수 있는 공식 플랫폼인 ',
        { tag: 'a', attrs: { href: BASE_URL }, children: ['아밤(Abam.kr)'] },
        '은 100% 현장 후불제만을 채택하여 소비자의 금전적 리스크를 근본적으로 원천 차단하고 있습니다.'
      ]}
    ]
  },
  {
    category: '수도권 메가 리포트',
    title: '서울·경기 수도권 1:1 방문 홈케어 출장마사지 1위 종합 비교 및 20대 에이스 관리사 라인업 분석',
    author: '수도권 라이프케어 트렌드 리포트',
    content: [
      { tag: 'p', children: ['서울 25개 자치구와 수원, 성남 분당, 고양 일산, 부천, 평택 등 수도권 전역에서 퇴근 후 프라이빗한 1:1 수기 케어를 찾는 고객층이 가파르게 증가하고 있습니다. 샵 예약의 번거로움 대신 원하는 시간과 장소에서 맞춤형 힐링을 경험할 수 있기 때문입니다.'] },
      { tag: 'h3', children: ['1. 수도권 권역별 30분 신속 배차 시스템'] },
      { tag: 'p', children: ['수도권 전역을 아우르는 광역 네트워크를 통해 강남, 송파, 마포, 영등포 등 서울 도심은 물론 경기 남부(수원·동탄·평택)와 서북부(일산·김포·부천)까지 20~30분 이내에 신속하게 배차되는 상시 대기조 시스템이 가동되고 있습니다.'] },
      { tag: 'p', children: [
        '경기 권역 전역의 상세 안내는 ',
        { tag: 'a', attrs: { href: `${BASE_URL}/seo/%EA%B2%BD%EA%B8%B0%EC%B6%9C%EC%9E%A5%EB%A7%88%EC%82%AC%EC%A7%80` }, children: ['경기출장마사지 1위 아밤 공식 안내'] },
        '를 통해 각 시군구별 실시간 도착 소요 시간을 확인하실 수 있습니다.'
      ]},
      { tag: 'h3', children: ['2. 타 플랫폼 대비 아밤(Abam.kr)의 핵심 경쟁력'] },
      { tag: 'p', children: ['타 플랫폼들이 불명확한 관리사 프로필이나 추가 요금 유도로 신뢰를 잃는 반면, 아밤은 전원 20대 에이스 관리사만을 엄선하여 정찰제와 100% 현장 대면결제를 완벽하게 결합했습니다.'] },
      { tag: 'p', children: [
        '업체별 객관적 비교는 ',
        { tag: 'a', attrs: { href: `${BASE_URL}/guide/outcall-massage-platform-ranking-comparison` }, children: ['출장마사지 플랫폼 순위 및 서비스 비교'] },
        ' 및 ',
        { tag: 'a', attrs: { href: BASE_URL }, children: ['아밤(Abam.kr) 포털'] },
        '에서 누구나 투명하게 확인하실 수 있습니다.'
      ]}
    ]
  },
  {
    category: '직장인 힐링 & 심야 릴렉세이션',
    title: '야근 피로와 불면증 해소를 위한 심야 방문 케어 활용법 — 19시~05시 연중무휴 안심 케어',
    author: '야간 헬스케어 매거진',
    content: [
      { tag: 'p', children: ['새벽까지 이어지는 과도한 업무와 만성적인 수면 부족은 뇌 피로와 근막 통증을 유발합니다. 일반 마사지 샵이 문을 닫는 늦은 밤과 새벽 시간대, 자택에서 편안하게 받을 수 있는 심야 홈케어는 일상의 활력을 되찾는 가장 효과적인 솔루션입니다.'] },
      { tag: 'h3', children: ['1. 심야 예약 및 배차 운영 시간'] },
      { tag: 'p', children: ['아밤(Abam.kr)은 매일 저녁 18:00부터 사전 예약을 접수하며, 테라피스트 출동은 19:00부터 익일 새벽 05:00까지 연중무휴로 진행됩니다. 고객이 희망하는 시간 1시간 전 예약 시 가장 원활하게 배차가 이루어집니다.'] },
      { tag: 'h3', children: ['2. 야간 프라이빗 케어 추천 코스'] },
      { tag: 'p', children: ['심야 시간대에는 강한 압의 지압보다는 심신의 긴장을 부드럽게 이완시키는 천연 아로마 테라피 또는 타이와 아로마가 결합된 VIP 스페셜 90분·120분 코스가 가장 선호됩니다.'] },
      { tag: 'p', children: [
        '심야 시간대 안전 예약 및 요금 정보는 ',
        { tag: 'a', attrs: { href: `${BASE_URL}/guide/late-night-massage` }, children: ['심야 출장마사지 안심 이용 가이드'] },
        ' 및 ',
        { tag: 'a', attrs: { href: `${BASE_URL}/seo/%ED%9B%84%EB%B6%88%EC%A0%9C%EC%B6%9C%EC%9E%A5%EB%A7%88%EC%82%AC%EC%A7%80` }, children: ['100% 후불제출장마사지 아밤'] },
        '에서 실시간으로 확인하실 수 있습니다.'
      ]}
    ]
  }
];

// 2. Google Indexing API 전송 함수
async function getGoogleToken() {
  const keyPath = path.join(__dirname, 'tieng-link-uploader-db0fd90bb08a.json');
  if (!fs.existsSync(keyPath)) return null;
  const key = JSON.parse(fs.readFileSync(keyPath, 'utf8'));
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: 'RS256', typ: 'JWT' };
  const claim = {
    iss: key.client_email,
    scope: 'https://www.googleapis.com/auth/indexing',
    aud: 'https://oauth2.googleapis.com/token',
    exp: now + 3600,
    iat: now,
  };
  const b64Header = Buffer.from(JSON.stringify(header)).toString('base64url');
  const b64Claim = Buffer.from(JSON.stringify(claim)).toString('base64url');
  const signer = crypto.createSign('RSA-SHA256');
  signer.update(`${b64Header}.${b64Claim}`);
  const signature = signer.sign(key.private_key, 'base64url');
  const jwt = `${b64Header}.${b64Claim}.${signature}`;

  return new Promise((resolve) => {
    const postData = `grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=${jwt}`;
    const req = https.request('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData),
      },
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          resolve(json.access_token || null);
        } catch { resolve(null); }
      });
    });
    req.on('error', () => resolve(null));
    req.write(postData);
    req.end();
  });
}

function pushGoogleUrl(token, url) {
  return new Promise((resolve) => {
    const body = JSON.stringify({ url, type: 'URL_UPDATED' });
    const req = https.request('https://indexing.googleapis.com/v3/urlNotifications:publish', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body),
      },
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, body: data }));
    });
    req.on('error', (e) => resolve({ status: 500, error: e.message }));
    req.write(body);
    req.end();
  });
}

async function main() {
  console.log('================================================================');
  console.log('  신뢰 기반 고권위(DA 93) 건강·웰니스·여행 백링크 퍼블리싱 가동');
  console.log('================================================================');

  // Telegraph 계정 생성
  const accRes = await fetch('https://api.telegra.ph/createAccount?short_name=abam_wellness&author_name=한국웰니스리서치');
  const accData = await accRes.json();
  if (!accData.ok) {
    console.error('Telegraph 계정 생성 실패:', accData);
    return;
  }
  const token = accData.result.access_token;

  const publishedListPath = path.join(__dirname, 'published-backlinks.json');
  let publishedList = [];
  if (fs.existsSync(publishedListPath)) {
    try {
      publishedList = JSON.parse(fs.readFileSync(publishedListPath, 'utf8'));
    } catch {
      publishedList = [];
    }
  }

  const newBacklinkUrls = [];

  for (const article of EDITORIAL_ARTICLES) {
    console.log(`\n[발행 중] [${article.category}] ${article.title.slice(0, 32)}...`);
    const pageRes = await fetch('https://api.telegra.ph/createPage', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        access_token: token,
        title: article.title,
        author_name: article.author,
        author_url: BASE_URL,
        content: article.content,
        return_content: false,
      }),
    });

    const pageData = await pageRes.json();
    if (pageData.ok) {
      const pageUrl = `https://telegra.ph/${pageData.result.path}`;
      console.log(`  -> DA 93 백링크 생성 성공: ${pageUrl}`);
      newBacklinkUrls.push({
        title: article.title,
        category: article.category,
        url: pageUrl,
        publishedAt: new Date().toISOString(),
      });
      publishedList.unshift({
        title: article.title,
        url: pageUrl,
        category: article.category,
        date: new Date().toISOString(),
      });
    } else {
      console.error('  -> 발행 실패:', pageData);
    }
    await new Promise(r => setTimeout(r, 600));
  }

  // 백링크 기록 저장
  fs.writeFileSync(publishedListPath, JSON.stringify(publishedList, null, 2), 'utf8');
  console.log(`\n총 ${newBacklinkUrls.length}개의 고권위 백링크 아티클이 published-backlinks.json 에 영구 기록되었습니다.`);

  // Google Indexing API 즉시 크롤링 요청 (새로 생성된 백링크 페이지를 구글봇이 즉시 수집하도록 디스패치)
  console.log('\n[구글봇 디스패치] 생성된 백링크 페이지 Google Indexing API 실시간 호출 중...');
  try {
    const googleToken = await getGoogleToken();
    if (googleToken) {
      for (const item of newBacklinkUrls) {
        const res = await pushGoogleUrl(googleToken, item.url);
        console.log(`  [구글봇 수집 요청] ${item.title.slice(0, 20)}... -> 상태: ${res.status}`);
        await new Promise(r => setTimeout(r, 150));
      }
    } else {
      console.log('  Google Indexing 토큰을 획득할 수 없어 건너뜁니다.');
    }
  } catch (err) {
    console.error('  Google Indexing 호출 오류:', err.message);
  }

  console.log('\n================================================================');
  console.log('  신뢰 기반 고권위 백링크 지속 확대 작업 완료');
  console.log('================================================================');
}

main().catch(console.error);
