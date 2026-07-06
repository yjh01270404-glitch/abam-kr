// NICE 본인인증 - Access Token 요청 + 암호화 요청 생성
// POST /api/auth/nice/request

import { NextResponse } from 'next/server';
import crypto from 'crypto';

const NICE_API_BASE = 'https://svc.niceid.co.kr';

// NICE API Access Token 발급
async function getNiceAccessToken(): Promise<string> {
  const clientId = process.env.NICE_CLIENT_ID!;
  const secret   = process.env.NICE_CLIENT_SECRET!;
  const encoded  = Buffer.from(`${clientId}:${secret}`).toString('base64');

  const res = await fetch(`${NICE_API_BASE}/digital/niceid/oauth/oauth/token`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${encoded}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials&scope=default',
  });

  if (!res.ok) throw new Error(`NICE token error: ${res.status}`);
  const data = await res.json();
  return data.dataBody?.access_token ?? data.access_token;
}

export async function POST(req: Request) {
  try {
    const { returnUrl } = await req.json();
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000';
    const callbackUrl = returnUrl ?? `${baseUrl}/api/auth/nice/callback`;

    // 1. Access Token 발급
    const accessToken = await getNiceAccessToken();

    // 2. 암호화 키/IV 생성 (NICE 규격: SHA-256 of accessToken)
    const tokenHash = crypto.createHash('sha256').update(accessToken).digest();
    const key = tokenHash.slice(0, 16);  // 앞 16바이트
    const iv  = tokenHash.slice(16, 32); // 뒤 16바이트

    // 3. 요청 데이터 구성
    const reqDtim = new Date().toISOString().replace(/[-T:.Z]/g, '').slice(0, 14);
    const reqNo   = `abam_${Date.now()}`; // 고유 요청 번호
    const plainData = JSON.stringify({
      requestno:        reqNo,
      returnurl:        callbackUrl,
      sitecode:         process.env.NICE_SITE_CODE ?? '',
      methodtype:       'M',         // M=모바일 PASS
      popupyn:          'Y',
      gender:           '',
      birthdate:        '',
      name:             '',
      nationalinfo:     '1',         // 1=내국인
      receivedata:      '',
      reqDtim,
    });

    // 4. AES-128 CBC 암호화
    const cipher    = crypto.createCipheriv('aes-128-cbc', key, iv);
    const encData   = Buffer.concat([cipher.update(plainData, 'utf8'), cipher.final()]).toString('base64');
    const integrityValue = crypto.createHmac('sha256', accessToken).update(encData).digest('base64');

    return NextResponse.json({
      ok: true,
      tokenVersionId: accessToken, // NICE에서 발급된 token version id (실제로는 별도 값)
      encData,
      integrityValue,
      reqNo,
    });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    console.error('[NICE request error]', msg);
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}
