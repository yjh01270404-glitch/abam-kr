import { MetadataRoute } from 'next';
import { INDEXABLE_KEYWORDS } from '../lib/seo-keywords';
import { GUIDES } from '../lib/guides';

const BASE_URL = 'https://abam.kr';

const LAST_MODIFIED = new Date('2026-10-30T00:00:00Z');

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
  const seoPages: MetadataRoute.Sitemap = INDEXABLE_KEYWORDS.map((k) => {
    const isTopPriority = k === '출장마사지' || k === '출장안마' || k === '출장홈타이' || k === '서울출장마사지' || k === '서울출장안마' || k === '경기출장마사지' || k === '아밤출장마사지';
    return {
      url: `${BASE_URL}/seo/${encodeURIComponent(k.replace(/\s+/g, '-'))}`,
      lastModified: LAST_MODIFIED,
      changeFrequency: 'daily',
      priority: isTopPriority ? 1.0 : (k.endsWith('출장마사지') && k.length <= 8 ? 0.9 : 0.85),
    };
  });

  const guidePages: MetadataRoute.Sitemap = GUIDES.map((g) => ({
    url: `${BASE_URL}/guide/${g.slug}`,
    lastModified: LAST_MODIFIED,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [...CORE_PAGES, ...seoPages, ...guidePages];
}
