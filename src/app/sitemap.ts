import { MetadataRoute } from 'next';

const BASE_URL = 'https://abam.kr';

export default function sitemap(): MetadataRoute.Sitemap {
  // 아름다운밤 핵심 페이지 목록
  const routes = [
    '',
    '/jobs',
    '/register',
    '/login',
  ].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  return [...routes];
}
