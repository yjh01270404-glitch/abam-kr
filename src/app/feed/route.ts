import { NextResponse } from 'next/server';
import { topBanners, priorityJobs, recommendedJobs, generalJobs } from '../../lib/mockData';

export async function GET() {
  // 최신 구인 광고 30개를 RSS 아이템화
  const allJobs = [
    ...topBanners,
    ...priorityJobs,
    ...recommendedJobs,
    ...generalJobs
  ].slice(0, 30);

  const rssItems = allJobs.map(job => `
    <item>
      <title><![CDATA[${job.companyName} - ${job.title}]]></title>
      <link>https://abam.kr/jobs</link>
      <guid isPermaLink="true">https://abam.kr/job/${job.id}</guid>
      <description><![CDATA[급여: ${job.pay} | 지역: ${job.location} | 근무 조건: ${job.tag || '고수익 알바'}]]></description>
      <pubDate>${new Date(job.createdAt || Date.now()).toU일급String()}</pubDate>
    </item>
  `).join('');

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>아름다운밤(아밤) - 실시간 여성 고수익 일자리 정보</title>
    <link>https://abam.kr</link>
    <description>매장 채용, 로컬 채용, 카페 스태프, 바알바, 비즈니스 채용 전문 구인구직 플랫폼 아밤</description>
    <language>ko</language>
    <lastBuildDate>${new Date().toU일급String()}</lastBuildDate>
    ${rssItems}
  </channel>
</rss>`;

  return new NextResponse(rss, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}
