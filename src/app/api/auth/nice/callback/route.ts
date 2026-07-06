// NICE 본인인증 - 콜백 처리 (결과 복호화 및 나이 검증)
// POST /api/auth/nice/callback

import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const params = new URLSearchParams(body);

    const encData       = params.get('enc_data') ?? '';
    const tokenVersionId= params.get('token_version_id') ?? '';
    const integrityValue= params.get('integrity_value') ?? '';

    if (!encData || !tokenVersionId) {
      return NextResponse.redirect(new URL('/age-fail', req.url));
    }

    // 1. NICE에서 발급받은 access token을 DB/캐시에서 가져와야 하지만
    //    여기서는 tokenVersionId = accessToken 으로 가정 (실제는 별도 저장 필요)
    const accessToken = tokenVersionId;

    // 2. HMAC 무결성 검증
    const expected = crypto.createHmac('sha256', accessToken).update(encData).digest('base64');
    if (expected !== integrityValue) {
      console.error('[NICE callback] integrity check failed');
      return NextResponse.redirect(new URL('/age-fail', req.url));
    }

    // 3. 복호화
    const tokenHash = crypto.createHash('sha256').update(accessToken).digest();
    const key = tokenHash.slice(0, 16);
    const iv  = tokenHash.slice(16, 32);

    const decipher = crypto.createDecipheriv('aes-128-cbc', key, iv);
    const plain = Buffer.concat([
      decipher.update(Buffer.from(encData, 'base64')),
      decipher.final(),
    ]).toString('utf8');

    const result = JSON.parse(plain);

    // 4. 나이 검증 (만 19세 이상)
    const birthdate = result.birthdate ?? '';  // YYYYMMDD
    if (birthdate.length === 8) {
      const birth = new Date(
        parseInt(birthdate.slice(0, 4)),
        parseInt(birthdate.slice(4, 6)) - 1,
        parseInt(birthdate.slice(6, 8)),
      );
      const today = new Date();
      let age = today.getFullYear() - birth.getFullYear();
      if (
        today.getMonth() < birth.getMonth() ||
        (today.getMonth() === birth.getMonth() && today.getDate() < birth.getDate())
      ) age--;

      if (age < 19) {
        return NextResponse.redirect(new URL('/age-fail', req.url));
      }
    }

    // 5. 성공 — 팝업 닫기 HTML 반환
    const html = `<!DOCTYPE html>
<html><head><meta charset="utf-8"></head>
<body>
<script>
  // 부모 창에 인증 성공 메시지 전달
  if(window.opener) {
    window.opener.postMessage({ niceAuth: true, name: ${JSON.stringify(result.name ?? '')}, birthdate: ${JSON.stringify(birthdate)} }, '*');
    window.close();
  } else {
    window.location.href = '/';
  }
</script>
</body></html>`;

    return new Response(html, { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    console.error('[NICE callback error]', msg);
    return NextResponse.redirect(new URL('/age-fail', req.url));
  }
}

// GET 요청도 처리 (리다이렉트 방식)
export async function GET(req: Request) {
  return POST(req);
}
