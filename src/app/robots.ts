import { MetadataRoute } from 'next';

const BASE_URL = 'https://abam.kr';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/api/admin', '/mgnt-vault'],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
