import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

/**
 * 6시간마다 자동 실행되는 검색엔진 색인 핑 (Vercel Cron → 서버에서 실행되므로 PC가 꺼져 있어도 동작)
 *  1) IndexNow  → 네이버 · Bing · Yandex
 *  2) Google Indexing API (서비스 계정, 일 200건 쿼터)
 * 인증: Vercel Cron이 보내는 `Authorization: Bearer ${CRON_SECRET}` 헤더.
 */
export const dynamic = 'force-dynamic';
export const maxDuration = 60;

const SITE_URL = 'https://abam.kr';
const INDEXNOW_KEY = 'abam1234567890abcdefabcdefabcdef';

const CORE_PATHS = [
  '',
  '/en',
  '/jp',
  '/cn',
  '/keywords',
  '/guide',
  '/guide/outcall-massage-scam-prevention-comparison',
  '/guide/chuljang-massage-price',
  '/guide/how-to-book-outcall-massage',
  '/guide/late-night-massage',
];

const HUBS = [
  '출장마사지', '출장안마', '출장마사지1위', '출장안마1위', '출장홈타이', '방문마사지', '20대출장마사지', '호텔출장마사지',
  '후불제출장마사지', '선입금없는출장안마', '대면결제출장마사지',
  '서울출장마사지', '경기출장마사지', '평택출장마사지',
  '강남출장마사지', '강남출장안마', '역삼출장마사지', '서초출장마사지', '송파출장마사지', '잠실출장마사지', '마포출장마사지', '영등포출장마사지', '여의도출장마사지', '용산출장마사지', '종로출장마사지', '성수출장마사지',
  '수원출장마사지', '분당출장마사지', '판교출장마사지', '일산출장마사지', '부천출장마사지', '안양출장마사지', '김포출장마사지', '동탄출장마사지', '화성출장마사지', '하남출장마사지', '광명출장마사지', '남양주출장마사지', '구리출장마사지', '파주출장마사지', '시흥출장마사지', '안산출장마사지', '의정부출장마사지',
];

function targetUrls(): string[] {
  return Array.from(
    new Set([...CORE_PATHS.map((p) => SITE_URL + p), ...HUBS.map((k) => `${SITE_URL}/seo/${encodeURIComponent(k)}`)]),
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
    scope: 'https://www.googleapis.com/auth/indexing',
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

  // 1) IndexNow
  try {
    const r = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({ host: new URL(SITE_URL).host, key: INDEXNOW_KEY, keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`, urlList: urls }),
    });
    result.indexNow = r.status;
  } catch (e) {
    result.indexNow = 'error: ' + (e as Error).message;
  }

  // 2) Google Indexing API (쿼터 도달 시 즉시 중단)
  try {
    const token = await googleToken();
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
