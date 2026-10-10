const crypto = require('crypto');
const fs = require('fs');
const https = require('https');
const path = require('path');

// 1. Google OAuth2 Token Generation
async function getAccessToken() {
  const keyPath = path.join(__dirname, 'tieng-link-uploader-db0fd90bb08a.json');
  const key = JSON.parse(fs.readFileSync(keyPath, 'utf8'));
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: 'RS256', typ: 'JWT' };
  const claim = {
    iss: key.client_email,
    scope: 'https://www.googleapis.com/auth/indexing',
    aud: 'https://oauth2.googleapis.com/token',
    exp: now + 3600,
    iat: now
  };
  
  const b64Header = Buffer.from(JSON.stringify(header)).toString('base64url');
  const b64Claim = Buffer.from(JSON.stringify(claim)).toString('base64url');
  const signatureInput = `${b64Header}.${b64Claim}`;
  
  const signer = crypto.createSign('RSA-SHA256');
  signer.update(signatureInput);
  const signature = signer.sign(key.private_key, 'base64url');
  const jwt = `${signatureInput}.${signature}`;
  
  return new Promise((resolve, reject) => {
    const postData = `grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=${jwt}`;
    const req = https.request('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData)
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (json.access_token) resolve(json.access_token);
          else reject(new Error(JSON.stringify(json)));
        } catch(e) { reject(e); }
      });
    });
    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

function publishUrl(token, url) {
  return new Promise((resolve) => {
    const body = JSON.stringify({
      url: url,
      type: 'URL_UPDATED'
    });
    
    const req = https.request('https://indexing.googleapis.com/v3/urlNotifications:publish', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body)
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({ statusCode: res.statusCode, body: data });
      });
    });
    req.on('error', (err) => {
      resolve({ statusCode: 500, error: err.message });
    });
    req.write(body);
    req.end();
  });
}

// 2. High Priority Target URLs
const BASE = 'https://abam.kr';

const CORE_URLS = [
  BASE,
  `${BASE}/keywords`,
  `${BASE}/guide`,
  `${BASE}/guide/outcall-massage-scam-prevention-comparison`,
  `${BASE}/guide/chuljang-massage-price`,
  `${BASE}/guide/how-to-book-outcall-massage`,
];

const COMPETITOR_URLS = [
  `${BASE}/seo/%EB%8F%84%EB%8F%84%EC%B6%9C%EC%9E%A5%EB%A7%88%EC%82%AC%EC%A7%80`, // 도도출장마사지
  `${BASE}/seo/%EB%8F%84%EB%8F%84%EC%B6%9C%EC%9E%A5%EC%95%88%EB%A7%88`,       // 도도출장안마
  `${BASE}/seo/%EC%8A%A4%ED%94%BC%EB%93%9C%EC%B6%9C%EC%9E%A5%EB%A7%88%EC%82%AC%EC%A7%80`, // 스피드출장마사지
  `${BASE}/seo/%EC%8A%A4%ED%94%BC%EB%93%9C%EC%B6%9C%EC%9E%A5%EC%95%88%EB%A7%88`,       // 스피드출장안마
  `${BASE}/seo/%EC%B6%9C%EC%9E%A5%EB%A7%88%EC%82%AC%EC%A7%80%EB%B9%84%EA%B5%90`,       // 출장마사지비교
  `${BASE}/seo/%EC%84%A0%EC%9E%85%EA%B8%88%EC%97%86%EB%8A%94%EC%B6%9C%EC%9E%A5%EB%A7%88%EC%82%AC%EC%A7%80`, // 선입금없는출장마사지
  `${BASE}/seo/%ED%9B%84%EB%B6%88%EC%A0%9C%EC%B6%9C%EC%9E%A5%EB%A7%88%EC%82%AC%EC%A7%80`, // 후불제출장마사지
  `${BASE}/seo/%ED%9B%84%EB%B6%88%EC%A0%9C%EC%B6%9C%EC%9E%A5%EC%95%88%EB%A7%88`,       // 후불제출장안마
];

const HEAD_TERMS = [
  '출장마사지', '출장안마', '출장마사지1위', '출장안마1위', '출장홈타이', '방문마사지', '방문안마',
  '20대출장마사지', '20대출장안마', '호텔출장마사지', '호텔출장안마', '24시간출장마사지', '심야출장마사지',
  '서울출장마사지', '서울출장안마', '경기출장마사지', '경기출장안마', '인천출장마사지', '인천출장안마',
  '강남출장마사지', '강남출장안마', '강남역출장마사지', '역삼출장마사지', '역삼동출장마사지', '선릉출장마사지',
  '서초출장마사지', '서초출장안마', '잠실출장마사지', '잠실출장안마', '송파출장마사지', '송파출장안마',
  '마포출장마사지', '마포출장안마', '홍대출장마사지', '홍대출장안마', '용산출장마사지', '용산출장안마',
  '영등포출장마사지', '영등포출장안마', '여의도출장마사지', '성수출장마사지', '종로출장마사지', '신림출장마사지',
  // 경기 주요 거점
  '수원출장마사지', '수원출장안마', '인계동출장마사지', '영통출장마사지', '광교출장마사지',
  '분당출장마사지', '분당출장안마', '판교출장마사지', '판교출장안마', '정자출장마사지', '서현출장마사지',
  '일산출장마사지', '일산출장안마', '고양출장마사지', '화정출장마사지',
  '부천출장마사지', '부천출장안마', '중동출장마사지', '상동출장마사지',
  '안양출장마사지', '안양출장안마', '평촌출장마사지', '범계출장마사지',
  '동탄출장마사지', '동탄출장안마', '화성출장마사지', '병점출장마사지',
  '평택출장마사지', '평택출장안마', '송탄출장마사지', '고덕출장마사지',
  '김포출장마사지', '파주출장마사지', '하남출장마사지', '미사출장마사지', '남양주출장마사지', '구리출장마사지',
  '용인출장마사지', '수지출장마사지', '기흥출장마사지', '안산출장마사지', '시흥출장마사지', '군포출장마사지',
  // 인천 주요 거점
  '인천출장마사지', '인천출장안마', '송도출장마사지', '송도출장안마', '청라출장마사지', '청라출장안마',
  '부평출장마사지', '부평출장안마', '구월동출장마사지', '주안출장마사지', '연수출장마사지', '계양출장마사지',
  // 코스 및 가격
  '타이출장마사지', '아로마출장마사지', '스웨디시출장', '힐링VIP출장마사지',
  '출장마사지가격표', '출장마사지가격', '출장안마가격', '출장마사지추천', '출장마사지후기', '출장마사지예약',
];

const TARGET_PAGES = Array.from(
  new Set([
    ...CORE_URLS,
    ...COMPETITOR_URLS,
    ...HEAD_TERMS.map(k => `${BASE}/seo/${encodeURIComponent(k)}`)
  ])
);

(async () => {
  try {
    console.log('Google OAuth2 액세스 토큰 요청 중...');
    const token = await getAccessToken();
    console.log('Google OAuth2 토큰 발급 완료.');

    const limit = Math.min(TARGET_PAGES.length, 190);
    console.log(`\n총 ${limit}개 핵심 전략 URL을 Google Indexing API로 즉시 크롤링 요청(URL_UPDATED)합니다...\n`);

    let success = 0;
    let failed = 0;

    for (let i = 0; i < limit; i++) {
      const url = TARGET_PAGES[i];
      const res = await publishUrl(token, url);
      if (res.statusCode === 200) {
        success++;
        console.log(`[${i + 1}/${limit}] [200 OK] 크롤링 푸시: ${decodeURIComponent(url)}`);
      } else {
        failed++;
        console.warn(`[${i + 1}/${limit}] [${res.statusCode}] 실패: ${decodeURIComponent(url)} - ${res.body || res.error}`);
        if (res.body && res.body.includes('Quota exceeded')) {
          console.warn('Google Indexing API 1일 한도 도달.');
          break;
        }
      }
      await new Promise(r => setTimeout(r, 120));
    }

    console.log(`\n========================================`);
    console.log(`Google Indexing API 전송 결과:`);
    console.log(`- 성공 (구글봇 강제 크롤링 디스패치): ${success}건`);
    console.log(`- 실패: ${failed}건`);
    console.log(`========================================\n`);
  } catch (err) {
    console.error('오류 발생:', err);
  }
})();
