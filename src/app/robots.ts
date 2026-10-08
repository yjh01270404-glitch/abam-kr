import { MetadataRoute } from 'next';

const PRIVATE_PATHS = [
  '/abam-nightman-2026',
  '/api/',
  '/admin',
  '/mgnt-vault',
  '/login',
  '/messages',
  '/alerts',
  '/diary',
  '/employer/',
  '/job/',
  '/jobs',
  '/talent',
  '/test-banners',
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // 모든 주요 크롤러 동일 정책: 공개 페이지 전체 허용, 관리·내부 경로만 차단
      { userAgent: '*', allow: '/', disallow: PRIVATE_PATHS },
      // 구글 이미지 검색 노출 허용
      { userAgent: 'Googlebot-Image', allow: '/', disallow: ['/abam-nightman-2026', '/api/'] },
    ],
    sitemap: ['https://abam.kr/sitemap.xml', 'https://abam.kr/rss.xml'],
    host: 'https://abam.kr',
  };
}
