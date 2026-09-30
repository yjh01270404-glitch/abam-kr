import { NextResponse } from 'next/server';
import { SEOUL_SEO } from '../../lib/seo-keywords';

const BASE_URL = 'https://abam.kr';

export async function GET() {
  const now = new Date().toISOString();
  const urls = SEOUL_SEO.map((kw) => {
    const slug = encodeURIComponent(kw.replace(/\s+/g, '-'));
    return `  <url>
    <loc>${BASE_URL}/seo/${slug}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.92</priority>
  </url>`;
  }).join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}
