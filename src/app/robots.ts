import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // 구글봇 — 전체 허용, 최우선 크롤링
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/abam-nightman-2026', '/api/'],
      },
      {
        // 네이버봇 — 전체 허용
        userAgent: 'Yeti',
        allow: '/',
        disallow: ['/abam-nightman-2026', '/api/'],
      },
      {
        // 빙봇
        userAgent: 'Bingbot',
        allow: '/',
        disallow: ['/abam-nightman-2026', '/api/'],
      },
      {
        // 나머지 크롤러 — 전체 허용
        userAgent: '*',
        allow: '/',
        disallow: ['/abam-nightman-2026', '/api/'],
      },
    ],
    sitemap: 'https://abam.kr/sitemap.xml',
    host: 'https://abam.kr',
  };
}
