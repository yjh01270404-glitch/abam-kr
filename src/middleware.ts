import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// 타사 명칭 패턴 (도도, 스피드 등 구 경쟁사 키워드 접속 시 아밤 공식 페이지로 301 즉시 리다이렉트)
const COMPETITOR_PATTERN = /도도|스피드|나비|황제|에이스|원출장|원홈타이|로얄|스타|퀸|엔젤|달콤|시크릿|미라클|애플|골드|마통|마사지몬|하이타이|다누워|마캉스/;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // /seo/ 하위 경로 검사
  if (pathname.startsWith('/seo/')) {
    const rawKeyword = pathname.replace('/seo/', '');
    if (!rawKeyword) {
      return NextResponse.redirect(new URL('/seo/아밤출장마사지', request.url), 301);
    }

    let decoded = '';
    try {
      decoded = decodeURIComponent(rawKeyword).replace(/-/g, ' ');
    } catch {
      return NextResponse.redirect(new URL('/seo/아밤출장마사지', request.url), 301);
    }

    // 타사 키워드로 들어온 경우 100% 아밤 공식 대표 페이지로 301 영구 이동
    if (COMPETITOR_PATTERN.test(decoded)) {
      return NextResponse.redirect(new URL('/seo/아밤출장마사지', request.url), 301);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/seo/:path*'],
};
