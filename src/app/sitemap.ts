import { MetadataRoute } from 'next';
import { SEO_KEYWORDS } from '../lib/seo-keywords';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://abam.kr';

  // ── 핵심 페이지 (우선순위 최상) ──
  const basePages = [
    { url: baseUrl,                         lastModified: new Date(), changeFrequency: 'daily'   as const, priority: 1.0 },
    { url: `${baseUrl}/jobs`,               lastModified: new Date(), changeFrequency: 'daily'   as const, priority: 0.95 },
    { url: `${baseUrl}/community`,          lastModified: new Date(), changeFrequency: 'daily'   as const, priority: 0.85 },
    { url: `${baseUrl}/diary`,              lastModified: new Date(), changeFrequency: 'weekly'  as const, priority: 0.75 },
    { url: `${baseUrl}/register`,           lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7  },
    { url: `${baseUrl}/login`,              lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.6  },
    { url: `${baseUrl}/employer/ad/manage`, lastModified: new Date(), changeFrequency: 'weekly'  as const, priority: 0.65 },
    { url: `${baseUrl}/partnership`,        lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.6  },
    { url: `${baseUrl}/support`,            lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.5  },
  ];

  // ── SEO 키워드 랜딩 페이지 (500+ 개) ──
  const seoPages = SEO_KEYWORDS.map((keyword) => ({
    url: `${baseUrl}/seo/${encodeURIComponent(keyword.replace(/\s+/g, '-'))}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.8,
  }));

  return [...basePages, ...seoPages];
}
