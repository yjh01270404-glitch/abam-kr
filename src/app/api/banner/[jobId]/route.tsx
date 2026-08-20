import Image from 'next/image';
import { ImageResponse } from 'next/og';
import { topBanners, priorityJobs, recommendedJobs, generalJobs } from '../../../../lib/mockData';
import { vvipBanner, grandVipBanners, premiumBanners, lineAdsData } from '../../../../lib/mockAds';
import scrapedJobs from '../../../../lib/scraped_jobs.json';
import fs from 'fs';
import path from 'path';

const allJobsRaw = [
  ...topBanners,
  ...priorityJobs,
  ...recommendedJobs,
  ...generalJobs,
  vvipBanner,
  ...grandVipBanners,
  ...premiumBanners,
  ...lineAdsData,
  ...scrapedJobs
];

const FRUIT_BG_IDS = [
  'photo-1560806887-1e4cd0b6cbd6', // 사과 (Apple)
  'photo-1619546813926-a78fa6372cd2', // 아오리사과 (Green Apple)
  'photo-1570913149827-d2ac84ab3f9a', // 홍옥사과 (Red Apple Crisp)
  'photo-1567306226416-28f0efdc88ce', // 부사사과 (Fuji Apple)
  'photo-1514756331096-242fdeb70d4a', // 배 (Pear)
  'photo-1615485290382-441e4d0167d4', // 서양배 (Green Pear)
  'photo-1547514701-42782101795e', // 오렌지 (Orange)
  'photo-1557800636-894a64c1696f', // 자몽 (Grapefruit)
  'photo-1590502593747-42a996133562', // 레몬 (Lemon)
  'photo-1591244275490-e2b260907f9c', // 라임 (Lime)
  'photo-1552089123-2d26226fc2b7', // 귤 (Mandarin)
  'photo-1611080626919-7cf5a9dbab5b', // 한라봉 (Clementine)
  'photo-1598965675045-45c5e72c7d05', // 천혜향 (Tangerine)
  'photo-1621263764928-df1444c5e859', // 유자 (Yuzu)
  'photo-1595124253363-c596596e6240', // 복숭아 (Peach)
  'photo-1603052875302-d376b7c0638a', // 자두 (Plum)
  'photo-1568254183919-78a4f43a2877', // 살구 (Apricot)
  'photo-1527661591475-527312dd65f5', // 체리 (Cherry)
  'photo-1628155930542-3c7a64e2c833', // 매실 (Green Plum)
  'photo-1609142642135-e6a256a5c1bc', // 대추 (Jujube)
  'photo-1537640538966-79f369143f8f', // 포도 (Grape)
  'photo-1601275868399-45bec4f2cd9e', // 청포도 (Green Grape)
  'photo-1498557850523-fd3d118b962e', // 블루베리 (Blueberry)
  'photo-1601342642135-e6a256a5c1bc', // 블랙베리 (Blackberry)
  'photo-1577069861033-55d04cec4ef5', // 라즈베리 (Raspberry)
  'photo-1631557211146-fe4fb7e0347a', // 크랜베리 (Cranberry)
  'photo-1518635017498-87f514b751ba', // 산딸기 (Wild Strawberry)
  'photo-1571771894821-ce9b6c11b08e', // 바나나 (Banana)
  'photo-1550258987-190a2d41a8ba', // 파인애플 (Pineapple)
  'photo-1553279768-865429fa0078', // 망고 (Mango)
  'photo-1526318896980-cf78c088247c', // 파파야 (Papaya)
  'photo-1582979512210-99b6a53386f9', // 용과 (Dragon Fruit)
  'photo-1523049673857-eb18f1d7b578', // 아보카도 (Avocado)
  'photo-1587049352846-4a222e784d38', // 수박 (Watermelon)
  'photo-1595855759920-86582396756a', // 참외 (Yellow Melon)
  'photo-1618231267439-d59ea8c8dbab', // 멜론 (Cantaloupe)
  'photo-1464965911861-746a04b4bca6', // 딸기 (Strawberry)
  'photo-1585829365295-ab7cd400c167', // 키위 (Kiwi)
  'photo-1601379327928-2f85a101632c', // 감 (Persimmon)
  'photo-1553813730-a9e3cf4998be', // 무화과 (Fig)
  'photo-1601004890684-d8cbf643f5f2', // 석류 (Pomegranate)
  'photo-1560155016-bd4c79a3e04a', // 코코넛 (Coconut)
  'photo-1474979266404-7eaacbcd87c5', // 올리브 (Olive)
  'photo-1502741126161-b848b1e606f1', // 체리 2 (Cherries Red)
  'photo-1629115916386-7e44f517843f', // 리치 (Lychee)
  'photo-1596701062351-8c2c14d1fcd1', // 망고스틴 (Mangosteen)
  'photo-1519751138087-5bf79df62d5b', // 금가루 과일 (Glitter Fruit)
  'photo-1490750967868-88df5691cc56', // 꽃과 과일 (Flower Fruit)
  'photo-1552693672-02f5caeedeb2', // 열대과일 숲 (Jungle Fruit)
  'photo-1589182373726-e4f658ab50f0', // 대추야자 (Date Palm Fruit)
  'photo-1441974231531-c6227db76b6e', // 숲 테마 (Forest BG)
  'photo-1507525428034-b723cf961d3e', // 해변 테마 (Beach BG)
  'photo-1477959858617-67f85cf4f1df', // 도시 테마 (City BG)
  'photo-1502082553048-f009c37129b9', // 나무 테마 (Trees BG)
  'photo-1500674425229-f692875b0ab9', // 보케 테마 (Bokeh BG)
  'photo-1519501025264-65ba15a82390', // 야경 테마 (Night BG)
  'photo-1514362545857-3bc16c4c7d1b', // 칵테일 테마 (Cocktail BG)
  'photo-1574096079513-d8259312b7a3', // 파티 테마 (Party BG)
  'photo-1516450360452-9312f5e86fc7', // 클럽 테마 (Club BG)
  'photo-1544816155-12df9643f363', // 샴페인 테마 (Champagne BG)
  'photo-1618005182384-a83a8bd57fbe', // 대리석 테마 (Marble BG)
  'photo-1503899036084-c55cdd92da26'  // 도쿄 테마 (Tokyo BG)
];

const COMPANY_GRADIENTS = [
  'linear-gradient(90deg, #78350f, #d97706, #fbbf24, #fffdeb, #d97706, #78350f)', // Gold/Amber
  'linear-gradient(90deg, #9d174d, #ec4899, #fbcfe8, #ec4899, #9d174d)', // Pink/Rose
  'linear-gradient(90deg, #0f172a, #0284c7, #38bdf8, #0284c7, #0f172a)', // Ocean Blue
  'linear-gradient(90deg, #3b0764, #a855f7, #f3e8ff, #a855f7, #3b0764)', // Cosmic Purple
  'linear-gradient(90deg, #022c22, #0d9488, #2dd4bf, #0d9488, #022c22)', // Emerald Teal
  'linear-gradient(90deg, #7c2d12, #ea580c, #ffedd5, #ea580c, #7c2d12)', // Flame Orange
  'linear-gradient(90deg, #4c0519, #db2777, #fbcfe8, #db2777, #4c0519)', // Vivid Ruby
  'linear-gradient(90deg, #111827, #6b7280, #f3f4f6, #6b7280, #111827)', // Platinum Silver
  'linear-gradient(90deg, #1e3a8a, #3b82f6, #93c5fd, #3b82f6, #1e3a8a)', // Royal Blue
  'linear-gradient(90deg, #4a044e, #d946ef, #fdf4ff, #d946ef, #4a044e)', // Neon Orchid
  'linear-gradient(90deg, #0f172a, #10b981, #a7f3d0, #10b981, #0f172a)', // Mint Turquoise
  'linear-gradient(90deg, #311042, #7c3aed, #c084fc, #7c3aed, #311042)'  // Amethyst Violet
];

// 세로 배너 전용 그라디언트 배경 (외부 URL 없이 즉시 렌더링)
const VERTICAL_BG_GRADIENTS = [
  'linear-gradient(160deg, #0d0221 0%, #4a0080 45%, #d97706 100%)',
  'linear-gradient(160deg, #10002b 0%, #6a0dad 45%, #e85d04 100%)',
  'linear-gradient(160deg, #03045e 0%, #0077b6 50%, #fca311 100%)',
  'linear-gradient(160deg, #2d0046 0%, #880b8b 50%, #f72585 100%)',
  'linear-gradient(160deg, #14213d 0%, #006494 50%, #ffd60a 100%)',
  'linear-gradient(160deg, #1b0000 0%, #800000 50%, #d97706 100%)',
  'linear-gradient(160deg, #0a0a0a 0%, #5a189a 50%, #c77dff 100%)',
  'linear-gradient(160deg, #1e1b4b 0%, #4338ca 50%, #818cf8 100%)',
  'linear-gradient(160deg, #450a0a 0%, #991b1b 50%, #fca5a5 100%)',
  'linear-gradient(160deg, #0f172a 0%, #0284c7 50%, #38bdf8 100%)',
];

// In-memory cache to prevent redundant font downloads in serverless warm starts
let cachedFontData: ArrayBuffer | null = null;

// Helper to render high-contrast vector motif shapes inside SVG
function renderBannerVector(type: string, size: number, color: string) {
  switch (type) {
    case 'ribbon':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={{ display: 'flex' }}>
          <path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2zm0 15l-5-2.18L7 18V5h10v13z" />
        </svg>
      );
    case 'maple':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={{ display: 'flex' }}>
          <path d="M12 2s-1 3-3 4c-2 1-5-1-6 1s3 3 2 5c-1 2-4 1-3 3s4 0 5 2c1 2-2 3-1 5s3-2 5-1c2 1 1 4 3 4s1-3 3-4c2-1 4 3 5 1s-2-3-1-5c1-2 4 0 5-2s-2-1-3-3c-1-2 3-4 2-5s-4 0-6-1c-2-1-3-4-3-4z" />
        </svg>
      );
    case 'heart':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={{ display: 'flex' }}>
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      );
    case 'star':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={{ display: 'flex' }}>
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      );
    case 'clover':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={{ display: 'flex' }}>
          <path d="M12 2c-1.1 0-2 .9-2 2 .5 1.5 1.5 2 2 2.5.5-.5 1.5-1 2-2.5 0-1.1-.9-2-2-2zm-6 8c-1.1 0-2 .9-2 2 .5 1.5 1.5 2 2 2.5.5-.5 1.5-1 2-2.5 0-1.1-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2 .5 1.5 1.5 2 2 2.5.5-.5 1.5-1 2-2.5 0-1.1-.9-2-2-2zm-6 6c-1.1 0-2 .9-2 2 .5 1.5 1.5 2 2 2.5.5-.5 1.5-1 2-2.5 0-1.1-.9-2-2-2zm0-7c.5 0 1 .5 1 1s-.5 1-1 1-1-.5-1-1 .5-1 1-1z" />
        </svg>
      );
    case 'candy':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={{ display: 'flex' }}>
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.12 0 2.05-.74 2.37-1.75C17.72 6.9 20 10.18 20 14c0 1.28-.27 2.48-.73 3.59-.1-.13-.23-.25-.37-.36z" />
        </svg>
      );
    case 'fruit':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={{ display: 'flex' }}>
          <path d="M12 2c-1.1 0-2 .9-2 2v2.09C6.42 6.64 4 9.53 4 13c0 4.41 3.59 8 8 8s8-3.59 8-8c0-3.47-2.42-6.36-6-6.91V4c0-1.1-.9-2-2-2zm3.5 11c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm-7 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm3.5 4c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
        </svg>
      );
    case 'sakura':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={{ display: 'flex' }}>
          <path d="M12 21.5c-4.5-3.5-7.5-7.5-7.5-11.5s3.5-6.5 7.5-6.5 7.5 2.5 7.5 6.5-3 8-7.5 11.5z" />
        </svg>
      );
    default:
      return null;
  }
}

// Helper to render high-contrast stroked outline text in Satori (emulates -webkit-text-stroke)
function renderStrokeText(text: string, fontSize: string, fillCode: string, strokeCode: string, strokeWidth = 2.5) {
  const offsets = [
    { x: -strokeWidth, y: -strokeWidth },
    { x: strokeWidth, y: -strokeWidth },
    { x: -strokeWidth, y: strokeWidth },
    { x: strokeWidth, y: strokeWidth },
    { x: 0, y: -strokeWidth },
    { x: 0, y: strokeWidth },
    { x: -strokeWidth, y: 0 },
    { x: strokeWidth, y: 0 },
  ];
  return (
    <div style={{ display: 'flex', position: 'relative', justifyContent: 'center', alignItems: 'center' }}>
      {offsets.map((off, idx) => (
        <span
          key={idx}
          style={{
            position: 'absolute',
            fontSize,
            fontWeight: 900,
            color: strokeCode,
            transform: `translate(${off.x}px, ${off.y}px)`,
            display: 'flex',
          }}
        >
          {text}
        </span>
      ))}
      <span
        style={{
          fontSize,
          fontWeight: 900,
          color: fillCode,
          position: 'relative',
          display: 'flex',
        }}
      >
        {text}
      </span>
    </div>
  );
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ jobId: string }> }
) {
  const { jobId } = await params;
  const { searchParams } = new URL(request.url);

  // 1. Find job details (Server Side)
  const job = allJobsRaw.find((j) => String(j.id) === jobId) as any;

  // 2. Read query params if not found in static list (for dynamic localStorage jobs)
  const companyName = searchParams.get('companyName') || job?.companyName || '아름다운밤';
  const pay = searchParams.get('pay') || job?.pay || '시급 협의';
  const location = searchParams.get('location') || job?.location || '서울 강남구';

  // Format short location
  const shortLocation = location.split(' ').slice(0, 2).join(' ') || '서울 강남';
  const getMinimalGoalText = (t: string) => {
    if (!t) return '';
    let clean = t.replace(/[★☆●■◆▲▼▼☎✔🌸🌸❤️💖💡👉😊✅⭐✨[\]()]/g, '').trim();
    if (clean.length > 15) {
      const words = clean.split(/\s+/);
      let short = '';
      for (const w of words) {
        if ((short + ' ' + w).trim().length <= 15) {
          short = (short + ' ' + w).trim();
        } else {
          break;
        }
      }
      if (!short) short = clean.slice(0, 14);
      return short;
    }
    return clean;
  };
  const cleanTitle = getMinimalGoalText(job?.title || searchParams.get('title') || '실시간 최우수 구인 정보');

  // Determine size
  const isVvip = topBanners.some(j => String(j.id) === jobId) || String(vvipBanner.id) === jobId;
  const isGrandVip = recommendedJobs.some(j => String(j.id) === jobId) || grandVipBanners.some(j => String(j.id) === jobId);
  const size = searchParams.get('size') || (isVvip ? 'vvip' : isGrandVip ? 'grandvip' : 'vvip');

  // Determine layout: horizontal or vertical
  const layout = searchParams.get('layout') || 'horizontal';
  const isVertical = layout === 'vertical';
  const width = isVertical ? 300 : 480;
  const height = isVertical ? 440 : 234;

  // Dynamic Font Scaling for massive impact inside Satori
  let companyNameFontSize = isVertical
    ? (companyName.length > 9 ? '36px' : companyName.length > 7 ? '42px' : '48px')
    : (companyName.length > 9 ? '34px' : companyName.length > 7 ? '40px' : '46px');

  if (size === 'grandvip') {
    companyNameFontSize = (parseFloat(companyNameFontSize) * 0.95).toFixed(1) + 'px';
  }

  // Deterministic selection of unique background image based on job ID using DJB2 hash
  let bgHash = 5381;
  const cleanId = String(jobId);
  for (let i = 0; i < cleanId.length; i++) {
    bgHash = ((bgHash << 5) + bgHash) + cleanId.charCodeAt(i);
  }
  bgHash = Math.abs(bgHash);

  const bgList = FRUIT_BG_IDS;
  const bgPhotoId = bgList[bgHash % bgList.length];
  // 세로 배너: 외부 fetch 없이 그라디언트 사용 (빠르고 항상 성공)
  const verticalBgGradient = VERTICAL_BG_GRADIENTS[bgHash % VERTICAL_BG_GRADIENTS.length];
  const bgImageUrl = `https://images.unsplash.com/${bgPhotoId}?auto=format&fit=crop&w=480&h=234&q=80`;

  const hasVvipStyle = size === 'vvip';

  // Colors & Textures
  const cardFrameColor = hasVvipStyle ? '#d97706' : '#db2777'; // Gold vs Pink
  const accentColor = hasVvipStyle ? '#b45309' : '#db2777';
  const badgeText = hasVvipStyle ? '👑 VVIP SPECIAL' : '💎 GRAND VIP';
  const badgeBg = hasVvipStyle ? 'rgba(217, 119, 6, 0.08)' : 'rgba(219, 39, 119, 0.08)';
  const badgeBorder = hasVvipStyle ? 'rgba(217, 119, 6, 0.35)' : 'rgba(219, 39, 119, 0.35)';

  const companyGradient = COMPANY_GRADIENTS[bgHash % COMPANY_GRADIENTS.length];

  // Overlay gradient colors for Satori
  const overlayGrad = hasVvipStyle
    ? 'linear-gradient(135deg, rgba(254, 243, 199, 0.35) 0%, rgba(253, 230, 138, 0.35) 50%, rgba(245, 158, 11, 0.35) 100%)'
    : 'linear-gradient(135deg, rgba(253, 242, 248, 0.22) 0%, rgba(252, 231, 243, 0.22) 50%, rgba(251, 207, 232, 0.22) 100%)';

  // 3. Load Jua font (Cache-first, Local FS -> CDN Fallback)
  if (!cachedFontData) {
    try {
      const fontPath = path.join(process.cwd(), 'src/assets/Jua-Regular.ttf');
      if (fs.existsSync(fontPath)) {
        const buffer = fs.readFileSync(fontPath);
        cachedFontData = buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);
      }
    } catch (localError) {
      console.warn('API Banner: Failed to load local font file.', localError);
    }
  }

  if (!cachedFontData) {
    try {
      const res = await fetch('https://fonts.gstatic.com/s/jua/v18/F2uL0DzzjHG-B647.ttf', {
        headers: { 'Accept-Encoding': 'identity' }
      });
      if (res.ok) {
        cachedFontData = await res.arrayBuffer();
      }
    } catch (cdnError) {
      console.error('API Banner: Failed to fetch font from Google CDN', cdnError);
    }
  }

  const fontData = cachedFontData;
  const fontOptions = fontData
    ? [
        {
          name: 'Jua',
          data: fontData,
          style: 'normal' as const,
        },
      ]
    : [];

  return new ImageResponse(
    (
      <div
        style={{
          width: `${width}px`,
          height: `${height}px`,
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          fontFamily: fontData ? 'Jua' : 'sans-serif',
          boxSizing: 'border-box',
          overflow: 'hidden',
          border: `5px solid ${cardFrameColor}`,
          borderRadius: '12px',
        }}
      >
        {/* Background: 세로=그라디언트(즉시), 가로=Unsplash */}
        {isVertical ? (
          <div 
            style={{ 
              position: 'absolute', 
              top: 0, left: 0, 
              width: '300px', height: '440px', 
              background: verticalBgGradient,
              display: 'flex'
            }} 
          />
        ) : (
          <Image 
            src={bgImageUrl} 
            width={width}
            height={height}
            style={{ 
              position: 'absolute', 
              top: 0, left: 0, 
              width: `${width}px`, height: `${height}px`, 
              objectFit: 'cover', display: 'flex'
            }} 
          />
        )}

        {/* Overlay */}
        <div 
          style={{ 
            position: 'absolute', 
            top: 0, left: 0, right: 0, bottom: 0, 
            background: isVertical
              ? 'rgba(0,0,0,0.18)'
              : overlayGrad,
            display: 'flex'
          }} 
        />

        {/* Glossy sweep (가로 배너만) */}
        {!isVertical && (
          <div 
            style={{ 
              position: 'absolute', 
              top: 0, left: '25%', 
              width: '60px', height: `${height}px`, 
              background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.4), transparent)',
              transform: 'skewX(-25deg)',
              display: 'flex'
            }} 
          />
        )}

        {/* Content Container */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: isVertical ? '12px 10px' : '20px 24px',
            boxSizing: 'border-box'
          }}
        >
          {isVertical ? (() => {
            // 상호명 단어 분리 (더/클래스/클럽 → 각 줄)
            const companyWords = companyName.trim().split(/\s+/);
            const numWords = companyWords.length;
            const maxWordLen = Math.max(...companyWords.map((w: string) => w.length));
            const wordFontSize =
              maxWordLen <= 1 ? '150px'
              : maxWordLen <= 2 ? (numWords <= 1 ? '130px' : numWords <= 2 ? '110px' : '90px')
              : maxWordLen <= 3 ? (numWords <= 1 ? '120px' : numWords <= 2 ? '95px' : '80px')
              : maxWordLen <= 4 ? (numWords <= 1 ? '90px' : numWords <= 2 ? '72px' : '60px')
              : maxWordLen <= 5 ? (numWords <= 1 ? '72px' : numWords <= 2 ? '58px' : '50px')
              : maxWordLen <= 6 ? '44px' : '36px';

            return (
            // ─── 세로 배너: 상호명 단어별 한 줄씩, 최대 부각 ───
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}>

              {/* ① 배지 */}
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingBottom: '6px' }}>
                <div style={{
                  background: 'linear-gradient(135deg, #78350f, #d97706, #fbbf24)',
                  color: '#ffffff',
                  fontSize: '26px',
                  fontWeight: '900',
                  padding: '6px 20px',
                  borderRadius: '18px',
                  letterSpacing: '0.05em',
                  boxShadow: '0 2px 10px rgba(217,119,6,0.7)',
                  display: 'flex',
                  lineHeight: 1,
                }}>
                  👑 VVIP
                </div>
              </div>

              {/* ② 지역 */}
              <div style={{
                display: 'flex', justifyContent: 'center', alignItems: 'center',
                background: 'rgba(0,0,0,0.72)',
                borderRadius: '8px',
                padding: '10px 12px',
                marginBottom: '6px',
              }}>
                <div style={{
                  fontSize: shortLocation.length <= 5 ? '30px' : shortLocation.length <= 8 ? '26px' : '22px',
                  fontWeight: '900',
                  color: '#ffffff',
                  textAlign: 'center',
                  width: '100%',
                  lineHeight: 1.1,
                  textShadow: '0 1px 4px rgba(0,0,0,0.9)',
                }}>
                  📍 {shortLocation}
                </div>
              </div>

              {/* ③ 상호명 — 단어별 한 줄씩, 최대 크기로 부각 */}
              <div style={{
                display: 'flex',
                flex: 1,
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#ffffff',
                borderRadius: '12px',
                padding: '8px 6px',
                marginBottom: '6px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
              }}>
                {companyWords.map((word: string, i: number) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                    <div style={{
                      fontSize: wordFontSize,
                      fontWeight: '900',
                      backgroundImage: companyGradient,
                      backgroundClip: 'text',
                      color: 'transparent',
                      lineHeight: '1.15',
                      display: 'flex',
                    }}>
                      {word}
                    </div>
                  </div>
                ))}
              </div>

              {/* ④ 금액 */}
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{
                  background: 'linear-gradient(135deg, #78350f, #b45309)',
                  color: '#ffffff',
                  fontSize: pay.length <= 5 ? '28px' : pay.length <= 8 ? '26px' : pay.length <= 12 ? '22px' : '18px',
                  fontWeight: '900',
                  padding: '8px 20px',
                  borderRadius: '26px',
                  boxShadow: '0 3px 12px rgba(0,0,0,0.45)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  lineHeight: 1,
                  maxWidth: '90%',
                  textAlign: 'center',
                }}>
                  💰 {pay}
                </div>
              </div>
            </div>
            );
          })() : (
            // Horizontal Layout for Grid (Legacy design)
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between', width: '100%' }}>
              {/* Top Row: Grade Badge + Location */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                <span style={{
                  background: badgeBg,
                  color: accentColor,
                  border: `1.5px solid ${badgeBorder}`,
                  fontSize: '17px',
                  fontWeight: '900',
                  padding: '3px 10px',
                  borderRadius: '6px',
                  display: 'flex',
                  lineHeight: 1
                }}>
                  {badgeText}
                </span>
                <span style={{
                  fontSize: '20px',
                  fontWeight: '800',
                  color: '#334155',
                  display: 'flex'
                }}>
                  {shortLocation}
                </span>
              </div>

              {/* Center: Massive Typography Company Name & Description (Frosted Glass Wrapper) */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                alignItems: 'center',
                textAlign: 'center',
                margin: '8px 0',
                background: 'rgba(255, 255, 255, 0.88)',
                border: '1.5px solid rgba(255, 255, 255, 0.5)',
                borderRadius: '8px',
                padding: '8px 12px',
                boxSizing: 'border-box'
              }}>
                <span style={{
                  fontSize: companyNameFontSize,
                  fontWeight: '950',
                  backgroundImage: companyGradient,
                  backgroundClip: 'text',
                  color: 'transparent',
                  lineHeight: '1.2',
                  display: 'flex',
                  textAlign: 'center',
                  flexWrap: 'wrap',
                  justifyContent: 'center'
                }}>
                  {companyName}
                </span>
                <span style={{
                  fontSize: '20px',
                  fontWeight: '700',
                  color: '#1e293b',
                  marginTop: '4px',
                  display: 'flex',
                  textAlign: 'center',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                  lineHeight: '1.3'
                }}>
                  {cleanTitle}
                </span>
              </div>

              {/* Bottom Row: Refined Pay Capsule */}
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                <span style={{
                  background: accentColor,
                  color: '#ffffff',
                  fontSize: '18px',
                  fontWeight: '900',
                  padding: '4px 14px',
                  borderRadius: '6px',
                  display: 'flex',
                  lineHeight: 1
                }}>
                  {pay}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    ),
    {
      width,
      height,
      fonts: fontOptions,
      headers: {
        'Cache-Control': 'public, max-age=31536000, immutable',
      }
    }
  );
}
