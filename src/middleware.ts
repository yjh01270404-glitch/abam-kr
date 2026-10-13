import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 빈 /seo/ 요청인 경우 아밤 공식 페이지로 이동
  if (pathname === '/seo' || pathname === '/seo/') {
    return NextResponse.redirect(new URL('/seo/아밤출장마사지', request.url), 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/seo/:path*'],
};
