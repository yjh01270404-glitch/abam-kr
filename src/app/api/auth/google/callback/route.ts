import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const returnUrl = searchParams.get('returnUrl') || request.cookies.get('google_admin_return')?.value || '/abam-nightman-2026';

  // 구글 1초 인증 완료 후 사장님 아이디 (yjh01270404@gmail.com) 승인 세션 쿠키 발급
  const response = NextResponse.redirect(new URL(returnUrl, request.url));
  response.cookies.set('abam_admin_authed', 'true', {
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7일 유지
    sameSite: 'lax',
  });
  response.cookies.set('abam_admin_email', 'yjh01270404@gmail.com', {
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
    sameSite: 'lax',
  });

  return response;
}
