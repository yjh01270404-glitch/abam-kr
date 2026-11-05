import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

/**
 * 6시간마다 자동 실행되는 통합 검색엔진 색인 핑 (Vercel Cron)
 *  1) IndexNow → 네이버 · Bing · Yandex (abam.kr + seoulroyalspa.com + auraseoulmassage.com)
 *  2) Google Search Console Sitemap & RSS 자동 재제출 (3개 도메인 전체)
 *  3) Google Indexing API (서비스 계정, 일 200건 쿼터)
 */
export const dynamic = 'force-dynamic';
export const maxDuration = 60;

const SITE_URL = 'https://abam.kr';
const INDEXNOW_KEY = 'abam1234567890abcdefabcdefabcdef';

const CORE_PATHS = [
  '',
  '/keywords',
  '/regions/seoul',
  '/regions/gyeonggi-south',
  '/regions/gyeonggi-north',
  '/regions/incheon-bucheon',
  '/guide',
  '/guide/outcall-massage-platform-ranking-comparison',
  '/guide/outcall-massage-scam-prevention-comparison',
  '/guide/chuljang-massage-price',
  '/guide/how-to-book-outcall-massage',
  '/guide/hotel-outcall-massage-guide',
  '/guide/late-night-massage',
];

const HUBS = [
  '출장마사지', '출장안마', '출장마사지1위', '출장안마1위', '출장홈타이', '방문마사지', '20대출장마사지', '호텔출장마사지',
  '후불제출장마사지', '선입금없는출장마사지', '대면결제출장마사지',
  '서울출장마사지', '경기출장마사지', '평택출장마사지',
  '강남출장마사지', '강남출장안마', '역삼출장마사지', '서초출장마사지', '송파출장마사지', '잠실출장마사지', '마포출장마사지', '영등포출장마사지', '여의도출장마사지', '용산출장마사지', '종로출장마사지', '성수출장마사지',
  '수원출장마사지', '분당출장마사지', '판교출장마사지', '일산출장마사지', '부천출장마사지', '안양출장마사지', '김포출장마사지', '동탄출장마사지', '화성출장마사지', '하남출장마사지', '광명출장마사지', '남양주출장마사지', '구리출장마사지', '파주출장마사지', '시흥출장마사지', '안산출장마사지', '의정부출장마사지',
];

const FOREIGN_URLS = [
  'https://seoulroyalspa.com/',
  'https://seoulroyalspa.com/jp',
  'https://seoulroyalspa.com/cn',
  'https://seoulroyalspa.com/id',
  'https://seoulroyalspa.com/gangnam',
  'https://seoulroyalspa.com/myeongdong',
  'https://seoulroyalspa.com/yeouido',
  'https://seoulroyalspa.com/yongsan',
  'https://seoulroyalspa.com/jamsil',
  'https://seoulroyalspa.com/hotels',
  'https://seoulroyalspa.com/hotels/lotte-hotel',
  'https://seoulroyalspa.com/hotels/josun-palace',
  'https://seoulroyalspa.com/hotels/grand-hyatt',
  'https://seoulroyalspa.com/hotels/intercontinental-parnas',
  'https://seoulroyalspa.com/hotels/conrad-seoul',
  'https://seoulroyalspa.com/hotels/signiel-seoul',
  'https://auraseoulmassage.com/',
  'https://auraseoulmassage.com/jp',
  'https://auraseoulmassage.com/cn',
  'https://auraseoulmassage.com/id',
];

function targetUrls(): string[] {
  return Array.from(
    new Set([
      ...CORE_PATHS.map((p) => SITE_URL + p),
      ...HUBS.map((k) => `${SITE_URL}/seo/${encodeURIComponent(k)}`),
      ...FOREIGN_URLS,
    ]),
  );
}

async function googleToken(): Promise<string> {
  const raw = process.env.GOOGLE_SA_KEY;
  if (!raw) throw new Error('GOOGLE_SA_KEY env not set');
  const key = JSON.parse(raw);
  const now = Math.floor(Date.now() / 1000);
  const b64 = (o: object) => Buffer.from(JSON.stringify(o)).toString('base64url');
  const input = `${b64({ alg: 'RS256', typ: 'JWT' })}.${b64({
    iss: key.client_email,
    scope: 'https://www.googleapis.com/auth/indexing https://www.googleapis.com/auth/webmasters',
    aud: 'https://oauth2.googleapis.com/token',
    exp: now + 3600,
    iat: now,
  })}`;
  const sig = crypto.createSign('RSA-SHA256').update(input).sign(key.private_key, 'base64url');
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=${input}.${sig}`,
  });
  const json = await res.json();
  if (!json.access_token) throw new Error('token: ' + JSON.stringify(json));
  return json.access_token;
}

export async function GET(req: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret || req.headers.get('authorization') !== `Bearer ${secret}`) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  const urls = targetUrls();
  const result: Record<string, unknown> = { total: urls.length, at: new Date().toISOString() };

  // 1) IndexNow for abam.kr
  try {
    const abamOnly = urls.filter((u) => u.startsWith('https://abam.kr'));
    const r = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({ host: 'abam.kr', key: INDEXNOW_KEY, keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`, urlList: abamOnly }),
    });
    result.indexNow = r.status;
  } catch (e) {
    result.indexNow = 'error: ' + (e as Error).message;
  }

  // 2) Google Sitemap Resubmit (All 3 Verified Domains) + Indexing API
  try {
    const token = await googleToken();
    const sitemapsToSubmit = [
      ['sc-domain:abam.kr', 'https://abam.kr/sitemap.xml'],
      ['sc-domain:abam.kr', 'https://abam.kr/rss.xml'],
      ['https://abam.kr/', 'https://abam.kr/sitemap.xml'],
      ['https://abam.kr/', 'https://abam.kr/rss.xml'],
      ['https://seoulroyalspa.com/', 'https://seoulroyalspa.com/sitemap.xml'],
      ['https://seoulroyalspa.com/', 'https://seoulroyalspa.com/rss.xml'],
      ['https://auraseoulmassage.com/', 'https://auraseoulmassage.com/sitemap.xml'],
    ];
    for (const [site, sm] of sitemapsToSubmit) {
      await fetch(
        `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(site)}/sitemaps/${encodeURIComponent(sm)}`,
        { method: 'PUT', headers: { Authorization: `Bearer ${token}` } },
      );
    }
    result.gscSitemaps = 'submitted_all_3_domains';

    let ok = 0;
    let quota = false;
    let other = 0;
    for (let i = 0; i < urls.length && !quota; i += 8) {
      const batch = urls.slice(i, i + 8);
      const rs = await Promise.all(
        batch.map(async (url) => {
          const r = await fetch('https://indexing.googleapis.com/v3/urlNotifications:publish', {
            method: 'POST',
            headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({ url, type: 'URL_UPDATED' }),
          });
          return { status: r.status, body: r.status === 200 ? '' : await r.text() };
        }),
      );
      for (const x of rs) {
        if (x.status === 200) ok++;
        else if (x.status === 429 || x.body.includes('Quota exceeded')) quota = true;
        else other++;
      }
    }
    result.google = { ok, other, quotaReached: quota };
  } catch (e) {
    result.google = 'error: ' + (e as Error).message;
  }

  return NextResponse.json(result);
}
