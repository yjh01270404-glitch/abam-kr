import { MetadataRoute } from 'next';
import { INDEXABLE_KEYWORDS } from '../lib/seo-keywords';
import { GUIDES } from '../lib/guides';

const BASE_URL = 'https://abam.kr';

// 콘텐츠 실제 수정일(배포 시 갱신). 요청마다 new Date()를 쓰면 구글이 lastmod 신뢰도를 낮춥니다.
const LAST_MODIFIED = new Date('2026-10-03T00:00:00+09:00');

// 존재하는 핵심 페이지만 포함 (404 URL 금지)
const CORE_PAGES: MetadataRoute.Sitemap = [
  { url: BASE_URL,                lastModified: LAST_MODIFIED, changeFrequency: 'daily',   priority: 1.0 },
  { url: `${BASE_URL}/keywords`,  lastModified: LAST_MODIFIED, changeFrequency: 'weekly',  priority: 0.9 },
  { url: `${BASE_URL}/guide`,     lastModified: LAST_MODIFIED, changeFrequency: 'weekly',  priority: 0.8 },
  { url: `${BASE_URL}/en`,        lastModified: LAST_MODIFIED, changeFrequency: 'weekly',  priority: 0.7 },
  { url: `${BASE_URL}/jp`,        lastModified: LAST_MODIFIED, changeFrequency: 'weekly',  priority: 0.7 },
  { url: `${BASE_URL}/cn`,        lastModified: LAST_MODIFIED, changeFrequency: 'weekly',  priority: 0.7 },
  { url: `${BASE_URL}/support`,   lastModified: LAST_MODIFIED, changeFrequency: 'monthly', priority: 0.4 },
  { url: `${BASE_URL}/terms`,     lastModified: LAST_MODIFIED, changeFrequency: 'monthly', priority: 0.2 },
  { url: `${BASE_URL}/privacy`,   lastModified: LAST_MODIFIED, changeFrequency: 'monthly', priority: 0.2 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  // 색인 대상(대표 키워드 + 서울 25개 구)만 포함. 세부 동·역 단위 페이지는 noindex이므로 제외.
  const seoPages: MetadataRoute.Sitemap = INDEXABLE_KEYWORDS.map((k) => ({
    url: `${BASE_URL}/seo/${encodeURIComponent(k.replace(/\s+/g, '-'))}`,
    lastModified: LAST_MODIFIED,
    changeFrequency: 'weekly',
    priority: k.endsWith('출장마사지') && k.length <= 8 ? 0.9 : 0.8,
  }));

  const guidePages: MetadataRoute.Sitemap = GUIDES.map((g) => ({
    url: `${BASE_URL}/guide/${g.slug}`,
    lastModified: new Date(g.published),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...CORE_PAGES, ...seoPages, ...guidePages];
}
