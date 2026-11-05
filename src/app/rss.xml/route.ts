import { INDEXABLE_KEYWORDS, generateSeoPageData } from '../../lib/seo-keywords';
import { GUIDES } from '../../lib/guides';

export const dynamic = 'force-static';
export const revalidate = 86400;

function escapeXml(str: string) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET() {
  const baseUrl = 'https://abam.kr';
  const baseTime = new Date('2026-10-30T00:00:00Z').getTime();

  const coreItems = [
    {
      title: '아밤 (Abam.kr) — 서울·경기 1위 출장마사지 · 출장홈타이 100% 현장후불제',
      url: `${baseUrl}/`,
      desc: '서울 25개 자치구 및 경기·인천 전 지역 자택·아파트·호텔로 30~40분 내 방문하는 1:1 프라이빗 출장마사지 & 출장홈타이. 선입금 0원, 100% 현장 대면결제.',
    },
    {
      title: '서울·경기·인천 출장마사지 전체 서비스 지역 안내 | 아밤 (Abam.kr)',
      url: `${baseUrl}/keywords`,
      desc: '강남, 서초, 송파, 마포, 용산, 영등포, 수원, 분당, 일산, 인천 등 수도권 전 지역 1:1 방문 홈케어 배차 거점 및 코스 안내.',
    },
    {
      title: '서울 25개 구 출장마사지 · 호텔 출장홈타이 배차 가이드 | 아밤',
      url: `${baseUrl}/regions/seoul`,
      desc: '서울 전 지역 자택 및 호텔 30분 내 신속 방문. 타이 60분 8만 원, 아로마 60분 9만 원, 스페셜 60분 10만 원 투명 정찰제.',
    },
    {
      title: '경기 남부 (수원·성남·분당·용인·안양·평택) 출장마사지 가이드 | 아밤',
      url: `${baseUrl}/regions/gyeonggi-south`,
      desc: '경기 남부권 전역 30~40분 방문 홈케어. 예약금 없는 100% 후불제 시스템.',
    },
    {
      title: '경기 북부 (고양·일산·의정부·파주·남양주) 출장마사지 가이드 | 아밤',
      url: `${baseUrl}/regions/gyeonggi-north`,
      desc: '경기 북부권 전역 자택·오피스텔·호텔 1:1 방문 타이 및 아로마 테라피.',
    },
    {
      title: '인천·부천·김포 출장마사지 · 출장홈타이 배차 안내 | 아밤',
      url: `${baseUrl}/regions/incheon-bucheon`,
      desc: '송도, 청라, 부평, 구월동, 부천 중동·상동, 김포 전 지역 100% 현장 대면결제 방문 마사지.',
    },
  ];

  const guideItems = GUIDES.map((g) => ({
    title: `${g.title} | 아밤 공식 가이드`,
    url: `${baseUrl}/guide/${g.slug}`,
    desc: g.description,
  }));

  const seoItems = INDEXABLE_KEYWORDS.slice(0, 34).map((kw) => {
    const data = generateSeoPageData(kw);
    const url = `${baseUrl}/seo/${encodeURIComponent(kw.replace(/\s+/g, '-'))}`;
    return {
      title: data.title,
      url,
      desc: data.description,
    };
  });

  const allEntries = [...coreItems, ...guideItems, ...seoItems];
  const lastBuildDate = new Date(baseTime).toUTCString();

  const itemsXml = allEntries
    .map((entry, idx) => {
      const pubDate = new Date(baseTime - idx * 600000).toUTCString();
      return `
    <item>
      <title>${escapeXml(entry.title)}</title>
      <link>${entry.url}</link>
      <guid isPermaLink="true">${entry.url}</guid>
      <description>${escapeXml(entry.desc)}</description>
      <pubDate>${pubDate}</pubDate>
    </item>`;
    })
    .join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>아밤 (Abam.kr) | 서울·경기 1위 출장마사지 · 출장홈타이 100% 현장후불제</title>
    <link>${baseUrl}/</link>
    <description>서울 25개 구 및 경기 전역 자택·호텔로 방문하는 100% 현장 대면결제 프라이빗 출장마사지 &amp; 출장홈타이 공식 RSS 피드</description>
    <language>ko</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml" />${itemsXml}
  </channel>
</rss>`;

  return new Response(xml.trim(), {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=600',
    },
  });
}
