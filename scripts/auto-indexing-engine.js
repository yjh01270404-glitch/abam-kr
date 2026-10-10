/**
 * scripts/auto-indexing-engine.js
 * 아밤(Abam.kr) 실시간 고속 검색엔진 색인 엔진
 * 1. Google Indexing API (Service Account OAuth2) -> 구글봇 실시간 크롤링 강제 디스패치
 * 2. IndexNow API -> 네이버 서치어드바이저 / Bing / Yandex 실시간 전송
 */

const crypto = require('crypto');
const fs = require('fs');
const https = require('https');
const path = require('path');

const SITE_URL = 'https://abam.kr';
const INDEXNOW_KEY = 'abam1234567890abcdefabcdefabcdef';

// 1. Google Service Account Token Generation
async function getGoogleAccessToken() {
  const keyPath = path.join(__dirname, 'tieng-link-uploader-db0fd90bb08a.json');
  if (!fs.existsSync(keyPath)) {
    throw new Error('Service account key file not found: ' + keyPath);
  }
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
        'Content-Length': Buffer.byteLength(postData),
      },
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (json.access_token) resolve(json.access_token);
          else reject(new Error(JSON.stringify(json)));
        } catch (e) { reject(e); }
      });
    });
    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

function publishGoogleUrl(token, url) {
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
      res.on('end', () => resolve({ statusCode: res.statusCode, body: data }));
    });
    req.on('error', (err) => resolve({ statusCode: 500, error: err.message }));
    req.write(body);
    req.end();
  });
}

// 2. IndexNow Bulk Dispatch
async function submitIndexNow(urlList) {
  const host = new URL(SITE_URL).host;
  const chunk = urlList.slice(0, 10000);
  try {
    const res = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        host,
        key: INDEXNOW_KEY,
        keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
        urlList: chunk,
      }),
    });
    return { status: res.status, ok: res.ok || res.status === 202, count: chunk.length };
  } catch (err) {
    return { status: 500, error: err.message };
  }
}

// 3. Priority URL Target List
const CORE_URLS = [
  SITE_URL,
  `${SITE_URL}/keywords`,
  `${SITE_URL}/guide`,
  `${SITE_URL}/guide/outcall-massage-scam-prevention-comparison`,
  `${SITE_URL}/guide/chuljang-massage-price`,
  `${SITE_URL}/guide/how-to-book-outcall-massage`,
];

const COMPETITOR_URLS = [
  `${SITE_URL}/seo/%EB%8F%84%EB%8F%84%EC%B6%9C%EC%9E%A5%EB%A7%88%EC%82%AC%EC%A7%80`,
  `${SITE_URL}/seo/%EB%8F%84%EB%8F%84%EC%B6%9C%EC%9E%A5%EC%95%88%EB%A7%88`,
  `${SITE_URL}/seo/%EC%8A%A4%ED%94%BC%EB%93%9C%EC%B6%9C%EC%9E%A5%EB%A7%88%EC%82%AC%EC%A7%80`,
  `${SITE_URL}/seo/%EC%8A%A4%ED%94%BC%EB%93%9C%EC%B6%9C%EC%9E%A5%EC%95%88%EB%A7%88`,
  `${SITE_URL}/seo/%EC%B6%9C%EC%9E%A5%EB%A7%88%EC%82%AC%EC%A7%80%EB%B9%84%EA%B5%90`,
  `${SITE_URL}/seo/%EC%84%A0%EC%9E%85%EA%B8%88%EC%97%86%EB%8A%94%EC%B6%9C%EC%9E%A5%EB%A7%88%EC%82%AC%EC%A7%80`,
  `${SITE_URL}/seo/%ED%9B%84%EB%B6%88%EC%A0%9C%EC%B6%9C%EC%9E%A5%EB%A7%88%EC%82%AC%EC%A7%80`,
  `${SITE_URL}/seo/%ED%9B%84%EB%B6%88%EC%A0%9C%EC%B6%9C%EC%9E%A5%EC%95%88%EB%A7%88`,
];

const METRO_HUBS = [
  '출장마사지', '출장안마', '출장마사지1위', '출장안마1위', '출장홈타이', '방문마사지', '20대출장마사지', '호텔출장마사지',
  '서울출장마사지', '경기출장마사지', '인천출장마사지',
  '강남출장마사지', '강남출장안마', '역삼출장마사지', '서초출장마사지', '송파출장마사지', '잠실출장마사지', '마포출장마사지', '영등포출장마사지', '여의도출장마사지', '용산출장마사지',
  '수원출장마사지', '분당출장마사지', '판교출장마사지', '일산출장마사지', '부천출장마사지', '안양출장마사지', '송도출장마사지', '동탄출장마사지', '하남출장마사지', '광명출장마사지',
];

const TARGET_URLS = Array.from(
  new Set([
    ...CORE_URLS,
    ...COMPETITOR_URLS,
    ...METRO_HUBS.map(k => `${SITE_URL}/seo/${encodeURIComponent(k)}`)
  ])
);

async function main() {
  console.log('=====================================================');
  console.log('  아밤(Abam.kr) 실시간 고속 색인 트리거 가동');
  console.log('=====================================================');

  // 1. IndexNow bulk push
  console.log('\n[1단계] IndexNow (네이버·Bing·Yandex) 대량 전송 중...');
  const indexNowResult = await submitIndexNow(TARGET_URLS);
  console.log(`- 결과: HTTP ${indexNowResult.status} (${indexNowResult.count}개 URL 전송 완료)`);

  // 2. Google Indexing API push
  console.log('\n[2단계] Google Indexing API 실시간 구글봇 호출...');
  try {
    const token = await getGoogleAccessToken();
    console.log('- Google OAuth2 인증 성공');
    let success = 0;
    let failed = 0;
    let quotaHit = false;

    for (let i = 0; i < TARGET_URLS.length; i++) {
      const url = TARGET_URLS[i];
      const res = await publishGoogleUrl(token, url);
      if (res.statusCode === 200) {
        success++;
        console.log(`  [200 OK] 크롤링 디스패치: ${decodeURIComponent(url)}`);
      } else {
        failed++;
        if (res.body && res.body.includes('Quota exceeded')) {
          console.log(`  [안내] 금일 Google Indexing API 1일 쿼터(200회) 도달. (내일 00시 자동 리셋)`);
          quotaHit = true;
          break;
        } else {
          console.log(`  [${res.statusCode}] 대기: ${decodeURIComponent(url)}`);
        }
      }
      await new Promise(r => setTimeout(r, 120));
    }
    console.log(`- 구글봇 실시간 전송: 성공 ${success}건 / 잔여 쿼터 대기 ${failed}건`);
  } catch (err) {
    console.error('- Google Indexing API 오류:', err.message);
  }

  console.log('\n=====================================================');
  console.log('  고속 색인 트리거 작업 완료');
  console.log('=====================================================');
}

const isDaemon = process.argv.includes('--daemon');
const INTERVAL_MS = 6 * 60 * 60 * 1000; // 6시간 주기 자동 핑

async function runLoop() {
  await main();
  if (isDaemon) {
    console.log(`\n[데몬 모드] 백그라운드 상주 중... 다음 검색엔진 핑 전송은 6시간 후 실행됩니다.`);
    setTimeout(runLoop, INTERVAL_MS);
  }
}

runLoop().catch(console.error);
