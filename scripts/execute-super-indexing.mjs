// scripts/execute-super-indexing.mjs
// 구글 인덱싱 API(Google Indexing API) + IndexNow + 글로벌 검색엔진 핑 일괄 전송 엔진

import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

const SITE_URL = 'https://abam.kr';
const GITHUB_PAGES_URL = 'https://yjh01270404-glitch.github.io/abam-kr';

// 1. Google OAuth2 Token
async function getGoogleAccessToken() {
  const keyPath = path.join(process.cwd(), 'scripts', 'tieng-link-uploader-db0fd90bb08a.json');
  if (!fs.existsSync(keyPath)) {
    throw new Error('Service account key not found: ' + keyPath);
  }
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

  const postData = `grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=${jwt}`;
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: postData
  });

  const json = await res.json();
  if (json.access_token) return json.access_token;
  throw new Error('Failed to get Google token: ' + JSON.stringify(json));
}

// 2. Publish to Google Indexing API
async function publishGoogleUrl(token, url) {
  try {
    const res = await fetch('https://indexing.googleapis.com/v3/urlNotifications:publish', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        url: url,
        type: 'URL_UPDATED'
      })
    });
    const data = await res.json();
    return { status: res.status, data };
  } catch (err) {
    return { status: 500, error: err.message };
  }
}

// 3. Ping IndexNow
async function pingIndexNow(host, urls) {
  try {
    const INDEXNOW_KEY = 'abam1234567890abcdefabcdefabcdef';
    const res = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        host,
        key: INDEXNOW_KEY,
        keyLocation: `https://${host}/${INDEXNOW_KEY}.txt`,
        urlList: urls
      })
    });
    return { status: res.status };
  } catch (err) {
    return { status: 500, error: err.message };
  }
}

// 4. Ping Sitemap to Google & Bing
async function pingSitemaps() {
  const sitemaps = [
    `${SITE_URL}/sitemap.xml`,
    `${GITHUB_PAGES_URL}/sitemap.xml`
  ];
  for (const sm of sitemaps) {
    try {
      await fetch(`https://www.google.com/ping?sitemap=${encodeURIComponent(sm)}`);
      console.log(`✔ Google Sitemap Ping: ${sm}`);
    } catch {}
    try {
      await fetch(`https://www.bing.com/ping?sitemap=${encodeURIComponent(sm)}`);
      console.log(`✔ Bing Sitemap Ping: ${sm}`);
    } catch {}
  }
}

async function main() {
  console.log('========================================================');
  console.log('  [슈퍼 인덱싱] Google Indexing API + 검색엔진 핑 시작');
  console.log('========================================================\n');

  // 1. Google OAuth2 Token 획득
  console.log('[1/4] Google OAuth2 Access Token 발급 요청 중...');
  let googleToken = null;
  try {
    googleToken = await getGoogleAccessToken();
    console.log('✔ Google OAuth2 인증 성공!');
  } catch (e) {
    console.error('✖ Google 인증 실패:', e.message);
  }

  // 2. 타깃 URL 선정
  const SEOUL_DISTRICTS = ['gangnam', 'seocho', 'songpa', 'mapo', 'yongsan', 'yeongdeungpo', 'seongdong', 'gwangjin', 'dongjak', 'gwanak', 'seodaemun', 'jongno', 'junggu', 'dongdaemun', 'seongbuk', 'gangbuk', 'dobong', 'nowon', 'jungnang', 'gangseo', 'yangcheon', 'guro', 'geumcheon', 'eunpyeong', 'gangdong'];
  const METRO_HUBS = ['suwon', 'incheon', 'bundang', 'ilsan', 'bucheon', 'anyang', 'pyeongtaek', 'dongtan', 'gimpo'];

  const abamUrls = [
    SITE_URL,
    `${SITE_URL}/keywords`,
    `${SITE_URL}/guide`,
    `${SITE_URL}/faq`,
    `${SITE_URL}/rates`,
    ...SEOUL_DISTRICTS.map(d => `${SITE_URL}/seo/${d}`),
    ...METRO_HUBS.map(m => `${SITE_URL}/seo/${m}`)
  ];

  const githubUrls = [
    GITHUB_PAGES_URL,
    ...SEOUL_DISTRICTS.map(d => `${GITHUB_PAGES_URL}/seoul/${d}.html`),
    ...METRO_HUBS.map(m => `${GITHUB_PAGES_URL}/metro/${m}.html`)
  ];

  console.log(`[2/4] 수집 대상: 아밤 공식 URL ${abamUrls.length}개 + GitHub Pages 고권위 URL ${githubUrls.length}개\n`);

  // 3. Google Indexing API 전송
  if (googleToken) {
    console.log('[3/4] Google Indexing API 전송 시작 (일일 쿼터 내 전송)...');
    let successCount = 0;
    // 아밤 도메인 URL 구글 인덱싱 전송
    for (let i = 0; i < Math.min(abamUrls.length, 50); i++) {
      const u = abamUrls[i];
      const res = await publishGoogleUrl(googleToken, u);
      if (res.status === 200) {
        successCount++;
        console.log(`[Google ${i + 1}] ✔ 인덱스 요청 성공: ${u}`);
      } else {
        console.log(`[Google ${i + 1}] ⚠ 응답 (${res.status}): ${u} - ${JSON.stringify(res.data || res.error)}`);
      }
      await new Promise(r => setTimeout(r, 150));
    }
    console.log(`✔ Google Indexing API 전송 완료: ${successCount}건 성공\n`);
  }

  // 4. IndexNow 전송
  console.log('[4/4] IndexNow 및 검색엔진 핑 전송...');
  const indexNowRes = await pingIndexNow('abam.kr', abamUrls.slice(0, 50));
  console.log(`✔ IndexNow (abam.kr) 응답 상태: HTTP ${indexNowRes.status}`);

  await pingSitemaps();

  console.log('\n========================================================');
  console.log('  [슈퍼 인덱싱 완료] 모든 검색엔진에 크롤링 요청 전송됨');
  console.log('========================================================');
}

main().catch(console.error);
