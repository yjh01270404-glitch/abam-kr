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
  themeColor: '#0a0f1d',
};

// 검색엔진 소유확인 토큰은 환경변수로 주입합니다. (Search Console / 네이버 서치어드바이저에서 발급)
// 값이 없을 때 가짜 토큰이 출력되지 않도록, 설정된 경우에만 메타 태그를 출력합니다.
const GOOGLE_VERIFICATION = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
const NAVER_VERIFICATION = process.env.NEXT_PUBLIC_NAVER_SITE_VERIFICATION;
const BING_VERIFICATION = process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL('https://abam.kr'),
  title: {
    default: 'Abam.kr | 프라이빗 1:1 방문 홈케어 · 서울 전역 자택·호텔',
    template: '%s | Abam.kr 프라이빗 1:1 방문 홈케어',
  },
  description:
    '아름다운 밤, 당신을 위한 특별한 시간. Abam.kr 프라이빗 1:1 방문 홈케어. 서울 전역 자택·호텔 방문, 예약은 18:00부터(영업 19:00~05:00). 타이·아로마·스페셜 코스 60분/90분/120분.',
  keywords: [
    '출장안마', '출장마사지', '출장홈타이', '출장서비스', '서울출장안마', '서울출장마사지', '서울출장홈타이', '서울출장서비스',
    '방문마사지', '방문안마', '홈타이', '홈케어마사지', '출장홈케어', '호텔출장마사지', '호텔출장안마',
    '24시간출장마사지', '24시출장안마', '24시출장홈타이', 'Abam.kr', '프라이빗 1:1 방문 홈케어',
    '아름다운밤', '아밤', '아밤출장안마', '아밤출장마사지', '강남출장안마', '강남출장마사지', '강남출장홈타이', '송파출장마사지', '마포출장마사지',
    'Seoul outcall massage', 'Seoul hotel massage',
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
    canonical: 'https://abam.kr',
    languages: {
      'ko-KR': 'https://abam.kr',
      'en-US': 'https://abam.kr/en',
      'ja-JP': 'https://abam.kr/jp',
      'zh-CN': 'https://abam.kr/cn',
      'x-default': 'https://abam.kr',
    },
  },
  openGraph: {
    title: 'Abam.kr | 아름다운 밤, 당신을 위한 특별한 시간',
    description:
      '프라이빗 1:1 방문 홈케어. 서울 전역 · 자택 · 호텔. 예약은 18:00부터 (영업 19:00 ~ 05:00).',
    type: 'website',
    locale: 'ko_KR',
    url: 'https://abam.kr',
    siteName: 'Abam.kr',
    images: [
      {
        url: 'https://abam.kr/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Abam.kr 프라이빗 1:1 방문 홈케어',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Abam.kr | 프라이빗 1:1 방문 홈케어',
    description: '서울 전역 · 자택 · 호텔. 예약은 18:00부터 (영업 19:00 ~ 05:00).',
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
    'geo.region': 'KR-11',
    'geo.placename': '서울특별시',
  },
};

const jsonLdData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['HealthAndBeautyBusiness', 'LocalBusiness'],
      '@id': 'https://abam.kr/#business',
      name: 'Abam.kr',
      alternateName: ['아밤', '아름다운 밤', 'Abam Private Home Care'],
      description: '아름다운 밤, 당신을 위한 특별한 시간. 서울 전역 자택·호텔로 방문하는 프라이빗 1:1 방문 홈케어.',
      url: 'https://abam.kr',
      telephone: '010-6607-2239',
      image: 'https://abam.kr/images/thai.jpg',
      priceRange: '80,000원 - 160,000원',
      currenciesAccepted: 'KRW',
      address: {
        '@type': 'PostalAddress',
        addressLocality: '서울특별시',
        addressRegion: '서울특별시',
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
        { '@type': 'City', name: '서울특별시 강남구' },
        { '@type': 'City', name: '서울특별시 서초구' },
        { '@type': 'City', name: '서울특별시 송파구' },
        { '@type': 'City', name: '서울특별시 마포구' },
        { '@type': 'City', name: '서울특별시 용산구' },
        { '@type': 'City', name: '서울특별시 영등포구' },
        { '@type': 'City', name: '서울특별시 성동구' },
        { '@type': 'City', name: '서울특별시 광진구' },
        { '@type': 'City', name: '서울특별시 중구' },
        { '@type': 'City', name: '서울특별시 종로구' },
        { '@type': 'AdministrativeArea', name: '서울특별시 25개 자치구 전지역' },
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
          name: '서울 어디든 방문 가능한가요?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: '네, 서울 전역 자택·호텔 등 원하시는 공간으로 방문하는 프라이빗 1:1 방문 홈케어입니다.',
          },
        },
        {
          '@type': 'Question',
          name: '예약과 영업 시간은 어떻게 되나요?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: '예약은 18:00부터 가능하며, 영업 시간은 19:00부터 05:00까지입니다. 1시간 전에 예약해 주시면 더욱 편안하게 이용하실 수 있습니다.',
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
            text: '네, 자택·호텔 등 원하시는 공간에서 프라이빗한 1:1 케어를 받으실 수 있습니다.',
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
      areaServed: { '@type': 'AdministrativeArea', name: '서울 전역' },
      termsOfService: 'https://abam.kr/terms',
    },
    {
      '@type': 'WebSite',
      '@id': 'https://abam.kr/#website',
      url: 'https://abam.kr',
      name: 'Abam.kr - 프라이빗 1:1 방문 홈케어',
      description: '아름다운 밤, 당신을 위한 특별한 시간. 서울 전역 자택·호텔 방문, 예약 18:00부터 (영업 19:00~05:00)',
      inLanguage: 'ko-KR',
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
        />
      </head>
      <body className={notoSansKr.variable}>{children}</body>
    </html>
  );
}
