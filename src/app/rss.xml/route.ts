import { INDEXABLE_KEYWORDS } from '../../lib/seo-keywords';

export const dynamic = 'force-static';
export const revalidate = 86400;

export async function GET() {
  const baseUrl = 'https://abam.kr';
  const nowUtc = new Date().toUTCString();

  const items = INDEXABLE_KEYWORDS.slice(0, 80).map((kw) => {
    const url = `${baseUrl}/seo/${encodeURIComponent(kw.replace(/\s+/g, '-'))}`;
    return `
    <item>
      <title><![CDATA[${kw} - 서울·경기 100% 현장후불제 프라이빗 방문 홈케어 | 아름다운밤 [아밤.Abam.kr]]]></title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description><![CDATA[${kw} - 전원 20대 전문 에이스 관리사 라인업! 서울 25개 구 및 경기 전역 자택·호텔 1:1 방문 맞춤 케어, 사전 예약금 없는 100% 현장후불제 안심 케어. 타이·아로마·스페셜 코스.]]></description>
      <pubDate>${nowUtc}</pubDate>
    </item>`;
  }).join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Abam.kr | 서울·경기 출장마사지 · 출장안마 1위 아름다운밤 [아밤.Abam.kr]</title>
    <link>${baseUrl}</link>
    <description>서울·경기 전역 자택·호텔로 방문하는 100% 현장후불제 프라이빗 출장마사지 &amp; 출장안마 공식 RSS 피드</description>
    <language>ko</language>
    <lastBuildDate>${nowUtc}</lastBuildDate>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    ${items}
  </channel>
</rss>`;

  return new Response(xml.trim(), {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=600',
    },
  });
}
