import { NextRequest, NextResponse } from 'next/server';
import scrapedJobs from '@/lib/scraped_jobs.json';
import { topBanners, priorityJobs, recommendedJobs, generalJobs } from '@/lib/mockData';
import { vvipBanners, grandVipBanners, premiumBanners, lineAdsData } from '@/lib/mockAds';
import { generateAbamBannerSvg } from '@/lib/dynamicBannerComposer';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ jobId: string }> }
) {
  const { jobId } = await params;
  const url = new URL(req.url);
  const companyNameParam = url.searchParams.get('companyName');
  const payParam = url.searchParams.get('pay');
  const locationParam = url.searchParams.get('location');
  const tierParam = url.searchParams.get('tier') || url.searchParams.get('size') || 'vvip';

  // 전체 공고 풀에서 해당 jobId 검색
  const allAds: any[] = [
    ...(Array.isArray(scrapedJobs) ? scrapedJobs : []),
    ...topBanners, ...priorityJobs, ...recommendedJobs, ...generalJobs,
    ...vvipBanners, ...grandVipBanners, ...premiumBanners, ...lineAdsData
  ];

  const targetAd = allAds.find(item => String(item.id) === String(jobId));

  const companyName = companyNameParam || targetAd?.companyName || targetAd?.title || '아름다운밤 럭셔리 업소';
  const title = targetAd?.title || '당일100%정산 / 럭셔리 근무환경 / 초보환영';
  const pay = payParam || targetAd?.pay || '일급 50만원 이상';
  const location = locationParam || targetAd?.location || '서울 강남';
  const contactPhone = targetAd?.contactPhone || '010-8057-6615';
  const contactKakao = targetAd?.contactKakao || 'ABAM_NIGHT';

  const svgContent = generateAbamBannerSvg({
    id: jobId,
    tier: tierParam,
    companyName,
    title,
    pay,
    location,
    contactPhone,
    contactKakao
  });

  return new NextResponse(svgContent, {
    status: 200,
    headers: {
      'Content-Type': 'image/svg+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
      'Access-Control-Allow-Origin': '*'
    }
  });
}
