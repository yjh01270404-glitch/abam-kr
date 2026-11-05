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
    default: '아밤 (Abam.kr) — 서울·경기 출장마사지 · 홈타이 8만원~ 100% 현장결제',
    template: '%s | 아밤 (Abam.kr)',
  },
  description:
    '☎ 010-6607-2239 | 서울 25개 구·경기 전 지역 자택·오피스텔·호텔 30분 내 방문 출장마사지·홈타이 아밤(Abam.kr). 타이 8만원~ · 아로마 9만원~ · 스페셜 10만원~ 투명 정찰제, 예약금 없는 100% 현장 후불제(18:00~새벽 05:00).',
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
    title: '출장마사지 · 출장 홈타이 아밤 — 서울·경기 100% 현장결제',
    description:
      '서울 25개 구 및 경기 전 지역 자택·호텔 방문 홈케어. 선입금 없는 100% 현장 결제 출장마사지 & 출장홈타이.',
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
    title: '출장마사지 · 출장 홈타이 아밤 | 100% 현장결제',
    description: '서울·경기 전 지역 자택·호텔 방문 홈케어. 100% 현장 결제. 타이·아로마·스페셜 정찰제.',
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
      name: '아밤 (Abam.kr)',
      alternateName: ['서울출장마사지', '경기출장마사지', '출장마사지', '출장홈타이', '호텔출장마사지', '아밤', 'Abam.kr'],
      serviceType: ['출장마사지', '출장홈타이', '서울출장마사지', '경기출장마사지', '호텔출장마사지', '홈타이', '출장안마'],
      description: '서울 25개 구 및 경기 전 지역 자택·호텔 방문 100% 현장결제 홈케어.',
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
