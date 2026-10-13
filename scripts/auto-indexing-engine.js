/**
 * scripts/auto-indexing-engine.js
 * 아밤(Abam.kr) 실시간 고속 검색엔진 색인 엔진 (v3 고도화 버전)
 * 
 * 1. IndexNow API (네이버 서치어드바이저 / Bing / Yandex)
 *    - sitemap.xml 전체 URL (575+개) 일괄 즉시 디스패치
 * 2. Google Indexing API (Service Account OAuth2 JWT)
 *    - 대형 핵심 키워드(서울출장마사지, 경기출장마사지, 강남출장마사지 등) 및 
 *      핵심 거점/경쟁사 공략 URL을 우선순위 큐(Priority Queue) 기반으로 1일 쿼터(200건) 최대 푸시
 * 3. 주기적 자동 실행 (--daemon) 지원: 백그라운드 상주 모드로 6시간 주기 자동 갱신
 */

const crypto = require('crypto');
const fs = require('fs');
const https = require('https');
const path = require('path');

const SITE_URL = 'https://abam.kr';
const INDEXNOW_KEY = 'abam1234567890abcdefabcdefabcdef';
const SITEMAP_URL = `${SITE_URL}/sitemap.xml`;

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

// 3. 사이트맵 동적 추출
async function fetchSitemapUrls() {
  try {
    const res = await fetch(SITEMAP_URL);
    if (!res.ok) throw new Error(`사이트맵 응답 실패: ${res.status}`);
    const xml = await res.text();
    const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1].trim());
    return urls;
  } catch (err) {
    console.warn(`[주의] 라이브 사이트맵 로드 실패 (${err.message}). 기본 목록으로 대체합니다.`);
    return [];
  }
}

// 4. 최우선 구글 색인 대상 (SEO 우선순위 큐)
const HIGH_PRIORITY_KEYWORDS = [
  // 1티어: 대형 메가 키워드
  '출장마사지', '출장안마', '출장마사지1위', '출장안마1위',
  '서울출장마사지', '경기출장마사지', '수도권출장마사지',
  '강남출장마사지', '강남출장안마', '역삼출장마사지', '선릉출장마사지', '서초출장마사지', '송파출장마사지', '잠실출장마사지',
  '마포출장마사지', '홍대출장마사지', '영등포출장마사지', '여의도출장마사지', '용산출장마사지', '한남출장마사지',
  '수원출장마사지', '분당출장마사지', '판교출장마사지', '일산출장마사지', '부천출장마사지', '인천출장마사지',
  '평택출장마사지', '동탄출장마사지', '안양출장마사지', '김포출장마사지', '하남출장마사지', '광명출장마사지',
  // 2티어: 경쟁사 정복 키워드
  '도도출장마사지', '도도출장안마', '스피드출장마사지', '스피드출장안마',
  '나비출장마사지', '황제출장마사지', '에이스출장마사지', '원출장마사지',
  '출장마사지비교', '선입금없는출장마사지', '후불제출장마사지', '후불제출장안마', '20대출장마사지', '호텔출장마사지',
];

const CORE_STATIC_URLS = [
  SITE_URL,
  `${SITE_URL}/keywords`,
  `${SITE_URL}/guide`,
  `${SITE_URL}/guide/outcall-massage-scam-prevention-comparison`,
  `${SITE_URL}/guide/chuljang-massage-price`,
  `${SITE_URL}/guide/outcall-massage-platform-ranking-comparison`,
  `${SITE_URL}/guide/late-night-massage`,
  `${SITE_URL}/guide/how-to-book-outcall-massage`,
  `${SITE_URL}/en`,
  `${SITE_URL}/jp`,
  `${SITE_URL}/cn`,
];

async function main() {
  console.log('================================================================');
  console.log('  아밤(Abam.kr) 실시간 고속 색인 트리거 가동 (Google & IndexNow)');
  console.log('================================================================');

  // 사이트맵에서 실시간 URL 수집
  const sitemapUrls = await fetchSitemapUrls();
  console.log(`- 사이트맵 실시간 감지: ${sitemapUrls.length}개 URL 확인`);

  const priorityUrls = HIGH_PRIORITY_KEYWORDS.map(k => `${SITE_URL}/seo/${encodeURIComponent(k)}`);
  
  // 전체 색인 대상 URL (중복 제거)
  const allTargetUrls = Array.from(new Set([
    ...CORE_STATIC_URLS,
    ...priorityUrls,
    ...sitemapUrls
  ]));

  console.log(`- 최종 색인 대상 풀: 총 ${allTargetUrls.length}개 URL`);

  // [1단계] IndexNow 대량 전송 (네이버 서치어드바이저 / Bing / Yandex)
  console.log('\n[1단계] IndexNow 대량 전송 (네이버·Bing·Yandex)...');
  const indexNowResult = await submitIndexNow(allTargetUrls);
  console.log(`- IndexNow 전송 결과: HTTP ${indexNowResult.status} (${indexNowResult.count}개 URL 일괄 접수 완료)`);

  // [2단계] Google Indexing API 우선순위 큐 실시간 푸시
  console.log('\n[2단계] Google Indexing API 실시간 구글봇 호출 (우선순위 큐)...');
  try {
    const token = await getGoogleAccessToken();
    console.log('- Google OAuth2 서비스 계정 인증 성공');
    let success = 0;
    let failed = 0;
    let quotaExceeded = false;

    // Google API 1일 최대 쿼터 200건 타깃팅
    const googleTargets = allTargetUrls.slice(0, 150);

    for (let i = 0; i < googleTargets.length; i++) {
      const url = googleTargets[i];
      const res = await publishGoogleUrl(token, url);
      if (res.statusCode === 200) {
        success++;
        console.log(`  [200 OK] 크롤링 디스패치 (${i + 1}/${googleTargets.length}): ${decodeURIComponent(url)}`);
      } else {
        failed++;
        if (res.body && res.body.includes('Quota exceeded')) {
          console.log(`\n  [안내] 금일 Google Indexing API 1일 쿼터 도달. (성공: ${success}건)`);
          quotaExceeded = true;
          break;
        } else {
          console.log(`  [${res.statusCode}] 대기/오류: ${decodeURIComponent(url)}`);
        }
      }
      // API Rate Limit 준수 (120ms 대기)
      await new Promise(r => setTimeout(r, 120));
    }

    console.log(`\n- 구글봇 실시간 전송 완료: 성공 ${success}건 / 잔여 쿼터 대기 ${failed}건`);
  } catch (err) {
    console.error('- Google Indexing API 오류:', err.message);
  }

  console.log('\n================================================================');
  console.log('  고속 색인 트리거 작업 완료');
  console.log('================================================================');
}

const isDaemon = process.argv.includes('--daemon');
const INTERVAL_MS = 6 * 60 * 60 * 1000; // 6시간 주기 자동 갱신

async function runLoop() {
  await main();
  if (isDaemon) {
    console.log(`\n[데몬 모드] 백그라운드 상주 중... 다음 검색엔진 핑 전송은 6시간 후 실행됩니다.`);
    setTimeout(runLoop, INTERVAL_MS);
  }
}

runLoop().catch(console.error);
