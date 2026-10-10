import { NextRequest, NextResponse } from 'next/server';
import scrapedJobs from '@/lib/scraped_jobs.json';
import { topBanners, priorityJobs, recommendedJobs, generalJobs } from '@/lib/mockData';
import { vvipBanners, grandVipBanners, premiumBanners, lineAdsData } from '@/lib/mockAds';
import { formatDetailHtml } from '@/lib/detailFormatter';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ jobId: string }> }
) {
  const { jobId } = await params;

  // 전체 공고 풀에서 해당 jobId 검색
  const allAds: any[] = [
    ...(Array.isArray(scrapedJobs) ? scrapedJobs : []),
    ...topBanners, ...priorityJobs, ...recommendedJobs, ...generalJobs,
    ...vvipBanners, ...grandVipBanners, ...premiumBanners, ...lineAdsData
  ];

  const targetAd = allAds.find(item => String(item.id) === String(jobId));

  const company = targetAd?.companyName || targetAd?.title || '에이스 텐카페';
  const pay = targetAd?.pay || '일급 50만원 이상';
  const loc = targetAd?.location || '서울 강남구';
  const rawDesc = targetAd?.description || '안녕하세요! 최고 우대 조건으로 언니들을 모시고 있습니다. 자유로운 출퇴근, 당일 100% 정산, 초보 우대!';
  const phone = targetAd?.contactPhone || '010-7925-8874';
  const kakao = targetAd?.contactKakao || 'SUPER8874';

  // 정밀 본문 포맷팅 (들여쓰기, 줄바꿈, 문단 정렬)
  const formattedHtml = formatDetailHtml(rawDesc);

  // 본문 높이 정밀 계산 (줄 수 및 문단 수 계산)
  const lineCount = Math.ceil(rawDesc.length / 26) + 4;
  const descContentHeight = Math.max(220, lineCount * 32);
  const descBoxHeight = descContentHeight + 80;
  const totalSvgHeight = 270 + descBoxHeight + 140;

  const svgDetailContent = `<svg xmlns="http://www.w3.org/2000/svg" width="700" height="${totalSvgHeight}" viewBox="0 0 700 ${totalSvgHeight}">
  <defs>
    <linearGradient id="bgGradi" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="100%" stop-color="#fdf2f8" />
    </linearGradient>

    <linearGradient id="headerGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#be185d" />
      <stop offset="50%" stop-color="#e11d48" />
      <stop offset="100%" stop-color="#9d174d" />
    </linearGradient>

    <linearGradient id="goldTxt" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#d97706" />
      <stop offset="100%" stop-color="#b45309" />
    </linearGradient>
  </defs>

  <!-- Outer Frame -->
  <rect width="700" height="${totalSvgHeight}" rx="20" fill="url(#bgGradi)" stroke="#f3e2eb" stroke-width="4" />
  
  <!-- 1. Header Bar (y: 20 ~ 90) -->
  <rect x="20" y="20" width="660" height="70" rx="16" fill="url(#headerGrad)" />
  <text x="350" y="62" font-family="'Noto Sans KR', sans-serif" font-weight="900" font-size="26" fill="#ffffff" text-anchor="middle">
    🌙 아름다운밤 [안심보증 1위 추천매장]
  </text>

  <!-- 2. Main Banner Box (y: 105 ~ 255) - Perfectly Positioned, NO OVERLAP -->
  <rect x="40" y="105" width="620" height="150" rx="16" fill="#ffffff" stroke="#fbbf24" stroke-width="3" />
  <text x="350" y="138" font-family="'Noto Sans KR', sans-serif" font-weight="900" font-size="15" fill="#be185d" text-anchor="middle">
    👑 BEST PREMIUM (📍 ${loc})
  </text>
  <text x="350" y="185" font-family="'Noto Sans KR', sans-serif" font-weight="900" font-size="30" fill="#be185d" text-anchor="middle">
    ${company}
  </text>
  <text x="350" y="228" font-family="'Noto Sans KR', sans-serif" font-weight="800" font-size="16" fill="#d97706" text-anchor="middle">
    💰 ${pay} (당일 100% 즉시정산)
  </text>

  <!-- 3. Description Section (y: 270 ~ 270 + descBoxHeight) -->
  <rect x="40" y="270" width="620" height="${descBoxHeight}" rx="16" fill="#ffffff" stroke="#e5e7eb" stroke-width="2" />
  <text x="70" y="310" font-family="'Noto Sans KR', sans-serif" font-weight="900" font-size="19" fill="#0d9488">
    │ [상세 구인소개 및 근무조건]
  </text>
  
  <foreignObject x="65" y="330" width="570" height="${descContentHeight}">
    <div xmlns="http://www.w3.org/1999/xhtml" style="font-family: 'Noto Sans KR', sans-serif; font-size: 15px; color: #374151; line-height: 1.7; font-weight: 500; word-break: keep-all;">
      ${formattedHtml}
      <div style="margin-top: 14px; background: #fdf2f8; padding: 10px 14px; border-radius: 8px; border: 1px solid #fbcfe8; color: #9d174d; font-weight: 800; font-size: 13.5px;">
        💡 100% 비밀보장! 당일 100% 현금/계좌 즉시 정산을 약속드립니다.
      </div>
    </div>
  </foreignObject>

  <!-- 4. Bottom Contact Bar (y: 270 + descBoxHeight + 20 ~ End) -->
  <rect x="40" y="${270 + descBoxHeight + 20}" width="620" height="100" rx="16" fill="url(#headerGrad)" />
  <text x="350" y="${270 + descBoxHeight + 63}" font-family="'Noto Sans KR', sans-serif" font-weight="900" font-size="25" fill="#ffffff" text-anchor="middle">
    📞 연락처: ${phone}
  </text>
  <text x="350" y="${270 + descBoxHeight + 93}" font-family="'Noto Sans KR', sans-serif" font-weight="800" font-size="17" fill="#fef08a" text-anchor="middle">
    ✉️ 문자 / 전화 24시간 친절 상담
  </text>
</svg>`;

  return new NextResponse(svgDetailContent, {
    status: 200,
    headers: {
      'Content-Type': 'image/svg+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
      'Access-Control-Allow-Origin': '*'
    }
  });
}
