import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // 구글봇 — SEO 페이지 최우선, 관리자 차단
        userAgent: 'Googlebot',
        allow: ['/', '/seo/', '/keywords', '/keywords/', '/sitemap.xml'],
        disallow: [
          '/abam-nightman-2026',
          '/api/',
          '/admin',
          '/admin/',
          '/mgnt-vault',
          '/mgnt-vault/',
          '/login',
          '/messages',
          '/alerts',
          '/diary',
        ],
      },
      {
        // 구글 이미지 봇 — 전체 허용 (이미지 검색 노출)
        userAgent: 'Googlebot-Image',
        allow: '/',
        disallow: ['/abam-nightman-2026', '/api/'],
      },
      {
        // 네이버 SEO봇 (Yeti)
        userAgent: 'Yeti',
        allow: ['/', '/seo/', '/keywords'],
        disallow: ['/abam-nightman-2026', '/api/', '/admin', '/mgnt-vault'],
      },
      {
        // 빙봇
        userAgent: 'Bingbot',
        allow: ['/', '/seo/', '/keywords'],
        disallow: ['/abam-nightman-2026', '/api/', '/admin', '/mgnt-vault'],
      },
      {
        // 다음 카카오봇
        userAgent: 'DaumWebDocumentBot',
        allow: '/',
        disallow: ['/abam-nightman-2026', '/api/', '/admin'],
      },
      {
        // 나머지 모든 크롤러
        userAgent: '*',
        allow: '/',
        disallow: ['/abam-nightman-2026', '/api/', '/admin', '/mgnt-vault'],
      },
    ],
    // 복수 사이트맵 — 구글 크롤 버짓 분산 최적화
    sitemap: [
      'https://abam.kr/sitemap.xml',
      'https://abam.kr/sitemap-seoul.xml',
      'https://abam.kr/sitemap-gyeonggi.xml',
    ],
    host: 'https://abam.kr',
  };
}
