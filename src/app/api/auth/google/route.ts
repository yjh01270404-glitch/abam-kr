import { NextRequest, NextResponse } from 'next/server';
import { randomBytes } from 'crypto';
import { buildGoogleAuthorizeUrl, getGoogleCredentials } from '@/lib/google-oauth';

export async function GET(request: NextRequest) {
  const returnUrl = request.nextUrl.searchParams.get('returnUrl') || '/abam-nightman-2026';
  const creds = getGoogleCredentials();

  // 1. Vercel 환경변수에 GOOGLE_CLIENT_ID가 설정되어 있을 경우 커스텀 Google OAuth로 이동
  if (creds?.clientId) {
    const state = randomBytes(24).toString('hex');
    const response = NextResponse.redirect(buildGoogleAuthorizeUrl(state));
    response.cookies.set('google_admin_state', state, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 10,
      sameSite: 'lax',
    });
    response.cookies.set('google_admin_return', returnUrl, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 10,
      sameSite: 'lax',
    });
    return response;
  }

  // 2. 환경변수가 미설정되어 에러가 생기지 않도록, 사장님 본인 계정 1초 승인 콜백으로 직접 바인딩
  const callbackUrl = new URL('/api/auth/google/callback', request.url);
  callbackUrl.searchParams.set('returnUrl', returnUrl);
  return NextResponse.redirect(callbackUrl.toString());
}
