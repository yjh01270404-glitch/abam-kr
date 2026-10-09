const crypto = require('crypto');
const fs = require('fs');
const https = require('https');
const path = require('path');

// 1. Fetch URLs directly from live production sitemap.xml
function fetchSitemapUrls() {
  return new Promise((resolve, reject) => {
    https.get('https://abam.kr/sitemap.xml', (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const matches = [...data.matchAll(/<loc>(.*?)<\/loc>/g)];
        const urls = matches.map(m => m[1]);
        resolve(urls);
      });
    }).on('error', reject);
  });
}

// 2. Google OAuth2 Token Generation
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

(async () => {
  try {
    console.log('Fetching live sitemap from https://abam.kr/sitemap.xml...');
    const urls = await fetchSitemapUrls();
    console.log(`Found ${urls.length} live URLs in sitemap.`);
    
    const token = await getAccessToken();
    console.log('Obtained Google OAuth2 Access Token.');
    
    let successCount = 0;
    let failCount = 0;
    const limit = Math.min(urls.length, 195); // Stay safely within 200/day quota
    
    console.log(`\n========================================`);
    console.log(`Sending instant crawl pings for top ${limit} URLs...`);
    console.log(`========================================\n`);
    
    for (let i = 0; i < limit; i++) {
      const url = urls[i];
      const res = await publishUrl(token, url);
      if (res.statusCode === 200) {
        successCount++;
        console.log(`[${i + 1}/${limit}] [200 OK] Crawl dispatched: ${url}`);
      } else {
        failCount++;
        console.warn(`[${i + 1}/${limit}] [${res.statusCode}] Failed: ${url} - ${res.body || res.error}`);
        if (res.body && res.body.includes('Quota exceeded')) {
          console.warn('Google Indexing API daily quota reached. Stopping.');
          break;
        }
      }
      // 120ms rate limit
      await new Promise(r => setTimeout(r, 120));
    }
    
    console.log(`\n========================================`);
    console.log(`Google Indexing API Results:`);
    console.log(`- Successfully dispatched to Googlebot: ${successCount}`);
    console.log(`- Failed: ${failCount}`);
    console.log(`========================================\n`);
  } catch (err) {
    console.error('Fatal Error:', err);
  }
})();
