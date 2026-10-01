import { MetadataRoute } from 'next';
import {
  SEOUL_SEO,
  COURSE_SEO, SITUATION_SEO, INFO_SEO,
} from '../lib/seo-keywords';

const BASE_URL = 'https://abam.kr';

// 핵심 페이지 (최우선 크롤링)
const CORE_PAGES: MetadataRoute.Sitemap = [
  { url: BASE_URL,                         lastModified: new Date(), changeFrequency: 'daily',   priority: 1.0 },
  { url: `${BASE_URL}/en`,                 lastModified: new Date(), changeFrequency: 'daily',   priority: 0.95 },
  { url: `${BASE_URL}/jp`,                 lastModified: new Date(), changeFrequency: 'daily',   priority: 0.95 },
  { url: `${BASE_URL}/cn`,                 lastModified: new Date(), changeFrequency: 'daily',   priority: 0.95 },
  { url: `${BASE_URL}/keywords`,           lastModified: new Date(), changeFrequency: 'daily',   priority: 0.9 },
  { url: `${BASE_URL}/job`,                lastModified: new Date(), changeFrequency: 'daily',   priority: 0.9 },
  { url: `${BASE_URL}/community`,          lastModified: new Date(), changeFrequency: 'hourly',  priority: 0.85 },
  { url: `${BASE_URL}/register`,           lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.8 },
  { url: `${BASE_URL}/talent`,             lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.75 },
  { url: `${BASE_URL}/map`,                lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.7 },
  { url: `${BASE_URL}/business`,           lastModified: new Date(), changeFrequency: 'monthly', priority: 0.65 },
  { url: `${BASE_URL}/support`,            lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
  { url: `${BASE_URL}/terms`,              lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
  { url: `${BASE_URL}/privacy`,            lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
];

// SEO 키워드 페이지 우선순위 분류 헬퍼
function toSeoPage(
  keyword: string,
  priority: number,
  freq: 'daily' | 'weekly' = 'daily',
): MetadataRoute.Sitemap[0] {
  return {
    url: `${BASE_URL}/seo/${encodeURIComponent(keyword.replace(/\s+/g, '-'))}`,
    lastModified: new Date(),
    changeFrequency: freq,
    priority,
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  // 서울 지역 (0.9 — 최고 검색량)
  const seoulPages   = SEOUL_SEO.map(k => toSeoPage(k, 0.9));
  // 코스별 (0.85)
  const coursePages  = COURSE_SEO.map(k => toSeoPage(k, 0.85));
  // 상황별 (0.82)
  const situationPages = SITUATION_SEO.map(k => toSeoPage(k, 0.82));
  // 정보성 (0.78)
  const infoPages    = INFO_SEO.map(k => toSeoPage(k, 0.78, 'weekly'));

  return [
    ...CORE_PAGES,
    ...seoulPages,
    ...coursePages,
    ...situationPages,
    ...infoPages,
  ];
}

