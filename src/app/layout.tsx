import type { Metadata, Viewport } from 'next';
import './globals.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
  themeColor: '#080c16',
};

const GOOGLE_VERIFICATION = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
const NAVER_VERIFICATION = process.env.NEXT_PUBLIC_NAVER_SITE_VERIFICATION;
const BING_VERIFICATION = process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL('https://abam.kr'),
  title: {
    default: '⚡[선입금0원·30분도착] 서울·경기 출장마사지 홈타이 아밤 | 100% 현장후불제',
    template: '%s | 아밤 (Abam.kr)',
  },
  description:
    '⭐평점 4.9 (리뷰 376개) | ☎ 010-6607-2239 서울 25개구·경기 전지역 30분 도착! 예약금·선입금 일절 없는 100% 안심 현장후불제. 타이 8만·아로마 9만 정찰제. 지금 바로 실시간 배차 문의.',
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
    title: '⚡[선입금0원·30분도착] 서울·경기 출장마사지 홈타이 아밤 | 100% 현장후불제',
    description:
      '⭐평점 4.9 (리뷰 376개) | ☎ 010-6607-2239 서울 25개구·경기 전지역 30분 도착 보장. 예약금 없는 100% 현장결제 안심 케어.',
    type: 'website',
    locale: 'ko_KR',
    url: 'https://abam.kr',
    siteName: 'Abam.kr',
    images: [
      {
        url: 'https://abam.kr/og-image.png',
        width: 1200,
        height: 630,
        alt: '출장마사지 · 출장 홈타이 아밤 Abam.kr',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '⚡[선입금0원·30분도착] 서울·경기 출장마사지 홈타이 아밤 | 100% 현장후불제',
    description: '⭐평점 4.9 (리뷰 376개) | 서울·경기 전 지역 30분 도착. 선입금 없는 100% 현장 결제. 타이 8만~/아로마 9만~ 정찰제.',
    images: ['https://abam.kr/og-image.png'],
  },
  verification: {
    google: GOOGLE_VERIFICATION || 'ZSsZ3IOFH6m1M9j4rDusM0JtIUEthMBc7cGvIvawXhk',
    other: {
      ...(NAVER_VERIFICATION ? { 'naver-site-verification': NAVER_VERIFICATION } : { 'naver-site-verification': '1053bf5d552dd5d9f8c3688de5d9d694654271ca' }),
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
      name: '아밤 (Abam.kr) — 출장마사지 · 출장홈타이 1위',
      alternateName: ['서울출장마사지', '경기출장마사지', '출장마사지', '출장홈타이', '호텔출장마사지', '아밤', 'Abam.kr', '출장안마'],
      serviceType: ['출장마사지', '출장홈타이', '서울출장마사지', '경기출장마사지', '호텔출장마사지', '홈타이', '출장안마'],
      description: '서울 25개 구 및 경기 전 지역 자택·오피스텔·호텔 30분 내 방문 100% 현장결제 홈케어. 타이 8만원~, 아로마 9만원~, 스페셜 10만원~ 정찰제.',
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
          opens: '18:00',
          closes: '05:00',
        },
      ],
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        bestRating: '5',
        worstRating: '1',
        ratingCount: '482',
        reviewCount: '376',
      },
      review: [
        {
          '@type': 'Review',
          author: { '@type': 'Person', name: '김*현 (서울 강남구)' },
          datePublished: '2026-10-25',
          reviewBody: '선입금이나 예약금 일체 요구 없이 기사님 대면 후 결제라 정말 안심했습니다. 서울 강남 30분 도착 빠르고 관리사님 실력도 최고였습니다.',
          reviewRating: { '@type': 'Rating', ratingValue: '5' },
        },
        {
          '@type': 'Review',
          author: { '@type': 'Person', name: '이*진 (경기 분당)' },
          datePublished: '2026-11-01',
          reviewBody: '경기 분당 자택에서 홈타이 90분 이용했습니다. 뭉친 어깨 다 풀렸네요. 무조건 단골 예약입니다.',
          reviewRating: { '@type': 'Rating', ratingValue: '5' },
        },
        {
          '@type': 'Review',
          author: { '@type': 'Person', name: '박*수 (서울 마포구)' },
          datePublished: '2026-11-05',
          reviewBody: '스페셜 120분 코스 추천합니다. 타이 건식으로 뭉친 근육 풀고 아로마로 림프 순환까지 완벽합니다.',
          reviewRating: { '@type': 'Rating', ratingValue: '5' },
        },
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: '아밤 출장마사지 정찰제 가격표',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: '정통 타이 힐링 케어 60분',
              description: '전신 스트레칭 및 뭉친 혈자리 딥 티슈 지압',
            },
            price: '80000',
            priceCurrency: 'KRW',
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: '정통 타이 힐링 케어 90분 (인기)',
              description: '머리부터 발끝까지 릴렉싱 지압 집중 케어',
            },
            price: '100000',
            priceCurrency: 'KRW',
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: '정통 타이 힐링 케어 120분',
              description: '만성 피로 완벽 해소 2시간 풀코스 전신 테라피',
            },
            price: '120000',
            priceCurrency: 'KRW',
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: '프리미엄 천연 아로마 테라피 60분',
              description: '최고급 천연 오일 전신 부드러운 림프 케어',
            },
            price: '90000',
            priceCurrency: 'KRW',
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: '프리미엄 천연 아로마 테라피 90분 (인기)',
              description: '피부 보습 및 숙면 유도 집중 힐링 아로마',
            },
            price: '110000',
            priceCurrency: 'KRW',
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: '프리미엄 천연 아로마 테라피 120분',
              description: '전신 림프 순환 및 심신 안정 최고급 코스',
            },
            price: '140000',
            priceCurrency: 'KRW',
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'VIP 로얄 시그니처 콤비네이션 60분',
              description: '타이 지압 + 천연 아로마 콤보 힐링 코스',
            },
            price: '100000',
            priceCurrency: 'KRW',
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'VIP 로얄 시그니처 콤비네이션 90분 (베스트셀러)',
              description: '지압 45분 + 아로마 45분 균형 잡힌 황금 밸런스',
            },
            price: '120000',
            priceCurrency: 'KRW',
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'VIP 로얄 시그니처 콤비네이션 120분 (VIP 명품)',
              description: '지압 60분 + 아로마 60분 최고급 힐링 2시간',
            },
            price: '160000',
            priceCurrency: 'KRW',
          },
        ],
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: '출장마사지 예약 시 선입금이나 예약금이 발생하나요?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: '아밤(Abam.kr)은 어떠한 경우에도 선입금, 예약금, 보증금을 절대 요구하지 않습니다. 전문 기사님 및 관리사님이 고객님의 자택 또는 호텔에 도착한 후 대면하여 100% 현장에서 결제(현금, 계좌이체)하는 안전 후불제입니다.',
          },
        },
        {
          '@type': 'Question',
          name: '서울 및 경기 지역 예약 시 방문까지 얼마나 걸리나요?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: '서울 전 지역(강남, 마포, 영등포, 송파, 종로 등) 및 경기 주요 신도시(분당, 판교, 일산, 수원, 부천 등) 기준 접수 즉시 배차되어 평균 30분~40분 내에 신속히 방문 드립니다.',
          },
        },
        {
          '@type': 'Question',
          name: '이용 가능한 영업 시간은 어떻게 되나요?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: '매일 저녁 18:00부터 사전 예약 접수를 시작하며, 매일 밤 19:00부터 익일 새벽 05:00까지 365일 연중무휴로 야간 집중 출장 배차 서비스를 운영합니다.',
          },
        },
        {
          '@type': 'Question',
          name: '자택이나 호텔 이용 시 준비해야 할 물품이 있나요?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: '고객님께서 따로 준비하실 것은 전혀 없습니다. 관리사님이 최고급 천연 아로마 오일, 1회용 위생 시트, 타월, 매트리스 커버 등 힐링에 필요한 모든 소모품을 직접 지참하여 방문합니다.',
          },
        },
      ],
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: '홈', item: 'https://abam.kr/' },
        { '@type': 'ListItem', position: 2, name: '코스 및 가격안내', item: 'https://abam.kr/#courses' },
        { '@type': 'ListItem', position: 3, name: '서비스 지역', item: 'https://abam.kr/#regions' },
        { '@type': 'ListItem', position: 4, name: '고객 이용후기', item: 'https://abam.kr/#reviews' },
        { '@type': 'ListItem', position: 5, name: '자주 묻는 질문', item: 'https://abam.kr/#faq' },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        <link rel="stylesheet" as="style" crossOrigin="anonymous" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;600;700;800;900&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
