import { MetadataRoute } from 'next';
import { INDEXABLE_KEYWORDS } from '../lib/seo-keywords';
import { GUIDES } from '../lib/guides';

const BASE_URL = 'https://abam.kr';

// 콘텐츠 최신 배포 갱신일 (구글봇 크롤러 재수집 유도)
const LAST_MODIFIED = new Date();

// 존재하는 핵심 페이지만 포함 (404 URL 금지)
const CORE_PAGES: MetadataRoute.Sitemap = [
  { url: BASE_URL,                              lastModified: LAST_MODIFIED, changeFrequency: 'always',  priority: 1.0 },
  { url: `${BASE_URL}/keywords`,                lastModified: LAST_MODIFIED, changeFrequency: 'daily',   priority: 0.95 },
  { url: `${BASE_URL}/regions/seoul`,           lastModified: LAST_MODIFIED, changeFrequency: 'daily',   priority: 0.95 },
  { url: `${BASE_URL}/regions/gyeonggi-south`,  lastModified: LAST_MODIFIED, changeFrequency: 'daily',   priority: 0.95 },
  { url: `${BASE_URL}/regions/gyeonggi-north`,  lastModified: LAST_MODIFIED, changeFrequency: 'daily',   priority: 0.95 },
  { url: `${BASE_URL}/regions/incheon-bucheon`, lastModified: LAST_MODIFIED, changeFrequency: 'daily',   priority: 0.95 },
  { url: `${BASE_URL}/guide`,                   lastModified: LAST_MODIFIED, changeFrequency: 'daily',   priority: 0.85 },
  { url: `${BASE_URL}/support`,                 lastModified: LAST_MODIFIED, changeFrequency: 'monthly', priority: 0.4 },
  { url: `${BASE_URL}/terms`,                   lastModified: LAST_MODIFIED, changeFrequency: 'monthly', priority: 0.2 },
  { url: `${BASE_URL}/privacy`,                 lastModified: LAST_MODIFIED, changeFrequency: 'monthly', priority: 0.2 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  // 색인 대상(대표 키워드 + 서울 25개 구 + 주요 타사 비교 키워드) 포함
  const seoPages: MetadataRoute.Sitemap = INDEXABLE_KEYWORDS.map((k) => {
    const isTopPriority = k === '출장마사지' || k === '출장안마' || k === '서울출장마사지' || k === '서울출장안마' || k === '경기출장마사지' || k === '아밤출장마사지';
    return {
      url: `${BASE_URL}/seo/${encodeURIComponent(k.replace(/\s+/g, '-'))}`,
      lastModified: LAST_MODIFIED,
      changeFrequency: 'daily',
      priority: isTopPriority ? 1.0 : (k.endsWith('출장마사지') && k.length <= 8 ? 0.9 : 0.8),
    };
  });

  const guidePages: MetadataRoute.Sitemap = GUIDES.map((g) => ({
    url: `${BASE_URL}/guide/${g.slug}`,
    lastModified: new Date(g.published),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...CORE_PAGES, ...seoPages, ...guidePages];
}
