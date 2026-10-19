import type { Metadata, Viewport } from 'next';
import { Noto_Sans_KR } from 'next/font/google';
import './globals.css';

const notoSansKr = Noto_Sans_KR({
  weight: ['400', '500', '700', '900'],
  display: 'swap',
  variable: '--font-noto-kr',
  preload: false,
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
  themeColor: '#0c0d11',
};

// 검색엔진 소유확인 토큰은 환경변수로 주입합니다. (Search Console / 네이버 서치어드바이저에서 발급)
// 값이 없을 때 가짜 토큰이 출력되지 않도록, 설정된 경우에만 메타 태그를 출력합니다.
const GOOGLE_VERIFICATION = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
const NAVER_VERIFICATION = process.env.NEXT_PUBLIC_NAVER_SITE_VERIFICATION;
const BING_VERIFICATION = process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL('https://abam.kr'),
  title: {
    default: '출장마사지 · 출장 홈타이 1위 (서울·경기 24시 방문) | 아밤 [100% 현장 대면결제]',
    template: '%s | 출장마사지 · 출장홈타이 1위 아밤 [Abam.kr]',
  },
  description:
    '출장마사지 · 출장 홈타이 1위 아밤(Abam.kr). 서울 25개 구 및 경기 전역(수원·성남·분당·판교·일산·부천·용인·평택·동탄·안양·김포) 자택·호텔 1:1 방문 맞춤 케어! 선입금·예약금 없는 100% 현장 대면결제 안심 후불제. 타이·아로마·스페셜 정찰제. 24시간 실시간 예약 신속 방문.',
  keywords: [
    '출장마사지',
    '출장홈타이',
    '서울출장마사지',
    '경기출장마사지',
    '서울출장홈타이',
    '경기출장홈타이',
    '호텔출장마사지',
    '출장안마',
    '서울출장안마',
    '경기출장안마',
    '수원출장마사지',
    '분당출장마사지',
    '판교출장마사지',
    '일산출장마사지',
    '부천출장마사지',
    '평택출장마사지',
    '동탄출장마사지',
    '용인출장마사지',
    '안양출장마사지',
    '김포출장마사지',
    '파주출장마사지',
    '하남출장마사지',
    '강남출장마사지',
    '서초출장마사지',
    '송파출장마사지',
    '마포출장마사지',
    '영등포출장마사지',
    '용산출장마사지',
    '후불제출장마사지',
    '24시출장마사지',
    '홈타이',
    '아밤출장마사지',
    '아밤홈타이',
    '아밤',
    'Abam.kr',
  ].join(', '),
  applicationName: 'Abam.kr',
  authors: [{ name: 'Abam.kr', url: 'https://abam.kr' }],
  creator: 'Abam.kr',
  publisher: 'Abam.kr',
  category: '뷰티 & 웰니스',
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: './',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.png', type: 'image/png', sizes: '192x192' },
    ],
    shortcut: '/favicon.png',
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  openGraph: {
    title: '출장마사지 · 출장 홈타이 1위 아밤 — 서울·경기 100% 현장후불제',
    description:
      '출장마사지 · 출장 홈타이 1위 아밤(Abam.kr). 서울 25개 구 및 경기 전역 자택·호텔 1:1 방문 맞춤 케어! 선입금 없는 100% 현장 대면결제 후불제 출장마사지 & 출장홈타이.',
    type: 'website',
    locale: 'ko_KR',
    url: 'https://abam.kr',
    siteName: 'Abam.kr',
    images: [
      {
        url: 'https://abam.kr/og-image.png',
        width: 1200,
        height: 630,
        alt: '출장마사지 · 출장 홈타이 1위 아밤 [Abam.kr] 서울·경기 100% 후불제',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '출장마사지 · 출장 홈타이 1위 아밤 [Abam] | 100% 현장후불제',
    description: '서울·경기 전역 자택·호텔 1:1 방문 맞춤 케어! 100% 현장 대면결제 후불제. 타이·아로마·스페셜 정찰제.',
    images: ['https://abam.kr/og-image.png'],
  },
  verification: {
    ...(GOOGLE_VERIFICATION ? { google: GOOGLE_VERIFICATION } : {}),
    other: {
      ...(NAVER_VERIFICATION ? { 'naver-site-verification': NAVER_VERIFICATION } : {}),
      ...(BING_VERIFICATION ? { 'msvalidate.01': BING_VERIFICATION } : {}),
    },
  },
  other: {
    'format-detection': 'telephone=yes',
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'geo.region': 'KR-11;KR-41',
    'geo.placename': '서울특별시·경기도',
    'geo.position': '37.5665;126.9780',
    'ICBM': '37.5665, 126.9780',
  },
};

const jsonLdData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['HealthAndBeautyBusiness', 'LocalBusiness'],
      '@id': 'https://abam.kr/#business',
      name: '출장마사지 · 출장 홈타이 1위 아밤 [Abam.kr]',
      alternateName: ['서울출장마사지', '경기출장마사지', '출장마사지', '출장홈타이', '호텔출장마사지', '24시출장마사지', '아밤', 'Abam.kr'],
      serviceType: ['출장마사지', '출장홈타이', '서울출장마사지', '경기출장마사지', '호텔출장마사지', '홈타이', '출장안마'],
      description: '대한민국 서울·경기 출장마사지 · 출장 홈타이 1위 아밤(Abam.kr). 서울 25개 구 및 경기 전역(수원·성남·분당·판교·일산·부천·용인·평택·동탄·안양 등) 자택·호텔로 찾아가는 100% 현장후불제 1:1 프라이빗 힐링 케어.',
      url: 'https://abam.kr',
      telephone: '010-6607-2239',
      image: 'https://abam.kr/images/thai.jpg',
      logo: 'https://abam.kr/icon.png',
      priceRange: '80,000원 - 160,000원',
      currenciesAccepted: 'KRW',
      address: {
        '@type': 'PostalAddress',
        addressLocality: '서울특별시·경기도',
        addressRegion: '수도권',
        addressCountry: 'KR',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 37.4979,
        longitude: 127.0276,
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          opens: '19:00',
          closes: '05:00',
        },
      ],
      areaServed: [
        { '@type': 'AdministrativeArea', name: '서울특별시 25개 구 전지역' },
        { '@type': 'City', name: '경기도 수원시' },
        { '@type': 'City', name: '경기도 성남시 (분당구·판교)' },
        { '@type': 'City', name: '경기도 고양시 (일산)' },
        { '@type': 'City', name: '경기도 부천시' },
        { '@type': 'City', name: '경기도 용인시' },
        { '@type': 'City', name: '경기도 화성시 (동탄)' },
        { '@type': 'City', name: '경기도 평택시' },
        { '@type': 'City', name: '경기도 안양시' },
        { '@type': 'City', name: '경기도 김포시' },
        { '@type': 'City', name: '경기도 파주시' },
        { '@type': 'City', name: '경기도 하남시' },
        { '@type': 'City', name: '경기도 남양주시' },
        { '@type': 'City', name: '경기도 시흥시' },
        { '@type': 'City', name: '경기도 안산시' },
        { '@type': 'AdministrativeArea', name: '경기도 전지역' },
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Abam.kr COURSE & PRICE',
        itemListElement: [
          {
            '@type': 'Offer',
            name: '타이 (60분 80,000원 / 90분 100,000원 / 120분 120,000원)',
            price: '80000',
            priceCurrency: 'KRW',
            description: '전통 건식 지압 · 시원한 압. 왓포 전통 방식의 건식 지압으로 뭉친 근육을 시원하게 풀어주고 스트레칭으로 몸의 균형을 잡아줍니다.',
          },
          {
            '@type': 'Offer',
            name: '아로마 (60분 90,000원 / 90분 110,000원 / 120분 140,000원)',
            price: '90000',
            priceCurrency: 'KRW',
            description: '천연 아로마 오일 · 부드러운 케어. 천연 식물성 아로마 오일을 사용하여 부드럽게 전신을 케어하고 림프 순환과 깊은 휴식을 돕습니다.',
          },
          {
            '@type': 'Offer',
            name: '스페셜 (60분 100,000원 / 90분 120,000원 / 120분 160,000원)',
            price: '100000',
            priceCurrency: 'KRW',
            description: '타이 + 아로마 복합 케어. 타이의 시원한 지압과 아로마의 부드러운 오일 관리를 동시에 받을 수 있는 프리미엄 코스입니다.',
          },
        ],
      },
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://abam.kr/#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: '서울 및 경기도 지역도 방문 가능한가요?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: '네, 서울 25개 구 전역 및 경기(수원·분당·판교·일산·부천·평택·동탄 등) 주요 거점 자택·호텔 등 원하시는 공간으로 신속하게 방문합니다.',
          },
        },
        {
          '@type': 'Question',
          name: '예약 시간과 출발 시간은 어떻게 되나요?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: '예약 접수는 18:00부터, 매니저 출발은 19:00부터, 마지막 예약 마감은 새벽 05:00입니다. 1시간 전에 예약해 주시면 더욱 편안하게 이용하실 수 있습니다.',
          },
        },
        {
          '@type': 'Question',
          name: '어떤 코스가 있나요?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: '전통 건식 지압의 타이, 천연 아로마 오일 케어의 아로마, 타이와 아로마를 함께 받는 스페셜까지 3가지 코스가 있으며 60분·90분·120분 중에서 선택하실 수 있습니다.',
          },
        },
        {
          '@type': 'Question',
          name: '코스별 요금이 어떻게 되나요?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: '타이 80,000원 / 100,000원 / 120,000원, 아로마 90,000원 / 110,000원 / 140,000원, 스페셜 100,000원 / 120,000원 / 160,000원 입니다. (60분 / 90분 / 120분 순)',
          },
        },
        {
          '@type': 'Question',
          name: '자택과 호텔 모두 이용할 수 있나요?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: '네, 서울·경기 전역 자택·호텔 등 원하시는 공간에서 프라이빗한 1:1 케어를 받으실 수 있습니다.',
          },
        },
      ],
    },
    {
      '@type': 'Service',
      '@id': 'https://abam.kr/#service',
      serviceType: '프라이빗 1:1 방문 홈케어',
      name: '프라이빗 1:1 방문 홈케어',
      provider: { '@id': 'https://abam.kr/#business' },
      areaServed: { '@type': 'AdministrativeArea', name: '서울·경기 전역' },
      termsOfService: 'https://abam.kr/terms',
    },
    {
      '@type': 'WebSite',
      '@id': 'https://abam.kr/#website',
      url: 'https://abam.kr',
      name: '아밤 Abam.kr - 서울·경기 1위 출장마사지 · 출장안마',
      alternateName: ['아밤', 'Abam', '아름다운밤', '서울출장마사지', '경기출장마사지', '출장홈타이'],
      description: '서울 25개 구 및 경기 전역 자택·호텔 1:1 방문 맞춤 케어! 100% 현장후불제 출장마사지·출장안마·출장홈타이 1위 아밤(Abam.kr).',
      inLanguage: 'ko-KR',
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: 'https://abam.kr/seo/{search_term_string}',
        },
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://abam.kr/#breadcrumb',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: '홈',
          item: 'https://abam.kr',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: '서울 25개구 출장마사지',
          item: 'https://abam.kr/keywords',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: '20대 ACE 총출동 이용 가이드',
          item: 'https://abam.kr/guide',
        },
      ],
    },
  ],
};

// 폰이 "데스크톱 사이트" 모드(약 980px 레이아웃)로 그려도 일반 모바일과 동일하게 보이도록 보정
const FORCE_MOBILE_SCRIPT = `(function(){try{var d=document.documentElement;function a(){var sw=Math.min(screen.width,screen.height);var iw=window.innerWidth;if(navigator.maxTouchPoints>0&&sw>0&&sw<=600&&iw>sw*1.35){d.classList.add('abam-m');d.style.zoom=(iw/sw).toFixed(4);}else{d.classList.remove('abam-m');d.style.zoom='';}}a();window.addEventListener('resize',a);window.addEventListener('orientationchange',a);}catch(e){}})();`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Pinyon+Script&family=Great+Vibes&family=Monsieur+La+Doulaise&family=Alex+Brush&family=Nanum+Pen+Script&display=swap"
          rel="stylesheet"
        />
        <script dangerouslySetInnerHTML={{ __html: FORCE_MOBILE_SCRIPT }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
        />
      </head>
      <body className={notoSansKr.variable}>{children}</body>
    </html>
  );
}
