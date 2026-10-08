import { INDEXABLE_KEYWORDS } from '../../lib/seo-keywords';

export const dynamic = 'force-static';
export const revalidate = 86400;

export async function GET() {
  const baseUrl = 'https://abam.kr';
  const pubDate = new Date('2026-10-08T18:00:00+09:00').toUTCString();

  const items = INDEXABLE_KEYWORDS.slice(0, 50).map((kw) => {
    const url = `${baseUrl}/seo/${encodeURIComponent(kw.replace(/\s+/g, '-'))}`;
    return `
    <item>
      <title><![CDATA[${kw} - 서울 프라이빗 1:1 방문 홈케어 | Abam.kr]]></title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description><![CDATA[서울 전역 자택·호텔 1:1 방문 홈케어 ${kw}. 100% 현장 대면결제, 예약은 18:00부터 (영업 19:00~05:00). 타이·아로마·스페셜 코스.]]></description>
      <pubDate>${pubDate}</pubDate>
    </item>`;
  }).join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Abam.kr | 서울 출장마사지 · 출장안마 프라이빗 1:1 방문 홈케어</title>
    <link>${baseUrl}</link>
    <description>서울 전역 자택·호텔로 방문하는 1:1 프라이빗 출장마사지 &amp; 출장안마 공식 피드</description>
    <language>ko</language>
    <lastBuildDate>${pubDate}</lastBuildDate>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    ${items}
  </channel>
</rss>`;

  return new Response(xml.trim(), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate=3600',
    },
  });
}
