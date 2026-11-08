const crypto = require('crypto');
const fs = require('fs');
const https = require('https');
const path = require('path');

const KEY_PATH = path.resolve(__dirname, 'tieng-link-uploader-db0fd90bb08a.json');

const URLS = [
  'https://abam.kr/',
  'https://abam.kr/keywords',
  'https://abam.kr/regions/seoul',
  'https://abam.kr/regions/gyeonggi-south',
  'https://abam.kr/regions/gyeonggi-north',
  'https://abam.kr/regions/incheon-bucheon',
  'https://abam.kr/guide',
  'https://abam.kr/seo/%EC%B6%9C%EC%9E%A5%EB%A7%88%EC%82%AC%EC%A7%80', // 출장마사지
  'https://abam.kr/seo/%EC%B6%9C%EC%9E%A5%EC%95%88%EB%A7%88', // 출장안마
  'https://abam.kr/seo/%EC%B6%9C%EC%9E%A5%ED%99%88%ED%83%80%EC%9D%B4', // 출장홈타이
  'https://abam.kr/seo/%EC%84%9C%EC%9A%B8%EC%B6%9C%EC%9E%A5%EB%A7%88%EC%82%AC%EC%A7%80', // 서울출장마사지
  'https://abam.kr/seo/%EA%B2%BD%EA%B8%B0%EC%B6%9C%EC%9E%A5%EB%A7%88%EC%82%AC%EC%A7%80', // 경기출장마사지
  'https://abam.kr/seo/%EC%95%84%EB%B0%A4%EC%B6%9C%EC%9E%A5%EB%A7%88%EC%82%AC%EC%A7%80', // 아밤출장마사지
  'https://abam.kr/seo/%EC%95%84%EB%B0%A4%ED%99%88%ED%83%80%EC%9D%B4', // 아밤홈타이
  'https://abam.kr/seo/%EA%B0%95%EB%82%A8%EC%B6%9C%EC%9E%A5%EB%A7%88%EC%82%AC%EC%A7%80', // 강남출장마사지
  'https://abam.kr/seo/%EC%86%A1%ED%8C%8C%EC%B6%9C%EC%9E%A5%EB%A7%88%EC%82%AC%EC%A7%80', // 송파출장마사지
  'https://abam.kr/seo/%EB%A7%88%ED%8F%AC%EC%B6%9C%EC%9E%A5%EB%A7%88%EC%82%AC%EC%A7%80', // 마포출장마사지
  'https://abam.kr/seo/%EC%98%81%EB%93%B1%ED%8F%AC%EC%B6%9C%EC%9E%A5%EB%A7%88%EC%82%AC%EC%A7%80', // 영등포출장마사지
  'https://abam.kr/seo/%EB%B6%84%EB%8B%B9%EC%B6%9C%EC%9E%A5%EB%A7%88%EC%82%AC%EC%A7%80', // 분당출장마사지
  'https://abam.kr/seo/%EC%9D%BC%EC%82%B0%EC%B6%9C%EC%9E%A5%EB%A7%88%EC%82%AC%EC%A7%80'  // 일산출장마사지
];

async function getAccessToken(scope) {
  const key = JSON.parse(fs.readFileSync(KEY_PATH, 'utf8'));
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: 'RS256', typ: 'JWT' };
  const claim = {
    iss: key.client_email,
    scope,
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
        } catch (e) { reject(e); }
      });
    });
    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

function publishUrl(token, url) {
  return new Promise((resolve) => {
    const body = JSON.stringify({ url, type: 'URL_UPDATED' });
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
      res.on('end', () => resolve({ statusCode: res.statusCode, body: data }));
    });
    req.on('error', (err) => resolve({ statusCode: 500, error: err.message }));
    req.write(body);
    req.end();
  });
}

(async () => {
  try {
    const token = await getAccessToken('https://www.googleapis.com/auth/indexing');
    console.log('Successfully authenticated with Google Indexing API');
    for (let i = 0; i < URLS.length; i++) {
      const res = await publishUrl(token, URLS[i]);
      console.log(`[${i + 1}/${URLS.length}] [${res.statusCode}] ${URLS[i]}`);
    }
  } catch (err) {
    console.error('Error during indexing push:', err.message);
  }
})();

