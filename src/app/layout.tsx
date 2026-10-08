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
  maximumScale: 5,
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
    default: '서울 출장마사지 · 출장안마 [20대 ACE 총출동] | 아밤 Abam.kr',
    template: '%s | 20대 ACE 총출동 서울 출장마사지 아밤 Abam.kr',
  },
  description:
    '서울 출장마사지 · 출장안마 1위 아밤(Abam.kr) [20대 ACE 총출동] 전원 20대 에이스 관리사 라인업! 서울 전역 자택·호텔 30분 총알도착, 사전 예약금 없는 100% 현장 후불제 안심 케어. 타이·아로마·스페셜 코스 60분/90분/120분.',
  keywords: [
    '20대ACE총출동', '20대출장마사지', '20대출장안마', '20대에이스', '20대홈타이',
    '출장안마', '출장마사지', '출장홈타이', '출장서비스', '서울출장안마', '서울출장마사지', '서울출장홈타이', '서울출장서비스',
    '방문마사지', '방문안마', '홈타이', '홈케어마사지', '출장홈케어', '호텔출장마사지', '호텔출장안마',
    '후불제출장마사지', '선입금없는출장안마', '대면결제출장마사지', 'Abam.kr', '프라이빗 1:1 방문 홈케어',
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
    title: '서울 출장마사지 · 출장안마 [20대 ACE 총출동] | 아밤 Abam.kr',
    description:
      '서울 전역 자택·호텔 30분 총알도착! 전원 20대 에이스 관리사 라인업, 사전 예약금 없는 100% 현장 후불제 출장마사지 & 출장안마. 예약은 18:00부터 (영업 19:00 ~ 05:00).',
    type: 'website',
    locale: 'ko_KR',
    url: 'https://abam.kr',
    siteName: 'Abam.kr',
    images: [
      {
        url: 'https://abam.kr/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Abam.kr 20대 ACE 총출동 서울 출장마사지',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '서울 출장마사지 · 출장안마 [20대 ACE 총출동] | 아밤 Abam.kr',
    description: '서울 전역 자택·호텔 30분 총알도착! 전원 20대 ACE 관리사 라인업, 100% 현장 후불제. 예약 18:00부터 (영업 19:00 ~ 05:00).',
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
      name: 'Abam.kr 서울 출장마사지 · 출장안마 [20대 ACE 총출동]',
      alternateName: ['아밤', '아름다운 밤', '20대 ACE 총출동', '서울출장마사지', '서울출장안마', '아밤출장마사지'],
      description: '전원 20대 에이스 관리사 라인업! 서울 전역 자택·호텔로 30분 내 방문하는 100% 후불제 1:1 프라이빗 출장마사지, 출장안마.',
      url: 'https://abam.kr',
      telephone: '010-6607-2239',
      image: 'https://abam.kr/images/thai.jpg',
      priceRange: '80,000원 - 160,000원',
      currenciesAccepted: 'KRW',
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        bestRating: '5',
        worstRating: '1',
        ratingCount: '1280',
        reviewCount: '940',
      },
      sameAs: [
        'https://telegra.ph/강남출장마사지강남출장안마-20대-ACE-총출동-역삼선릉논현-30분-총알도착-후불제-10-08',
        'https://telegra.ph/서초출장마사지서초출장안마-20대-ACE-총출동-반포교대양재-호텔자택-100-후불제-10-08',
        'https://telegra.ph/송파출장마사지잠실출장안마-20대-ACE-총출동-롯데월드타워방이동-호텔-정찰제-케어-10-08',
        'https://telegra.ph/강동출장마사지천호출장안마-20대-ACE-총출동-암사길동-30분-안심-대면결제-10-08',
        'https://telegra.ph/마포출장마사지홍대출장안마-20대-ACE-총출동-합정상암공덕-프라이빗-11-방문케어-10-08',
        'https://telegra.ph/용산출장마사지이태원출장안마-20대-ACE-총출동-한남동용산역-비즈니스-호텔-전문-10-08',
        'https://telegra.ph/영등포출장마사지여의도출장안마-20대-ACE-총출동-콘래드IFC-비즈니스-출장객-전용-10-08',
        'https://telegra.ph/성동출장마사지성수출장안마-20대-ACE-총출동-성수동왕십리-프라이빗-힐링-테라피-10-08',
        'https://telegra.ph/광진출장마사지건대출장안마-20대-ACE-총출동-구의자양동-호텔-프라이빗-11-홈케어-10-08',
        'https://telegra.ph/동작출장마사지사당출장안마-20대-ACE-총출동-이수상도동-야근-피로회복-100-후불제-10-08',
        'https://telegra.ph/서대문출장마사지신촌출장안마-20대-ACE-총출동-연세대이대-인근-프라이빗-방문케어-10-08',
        'https://telegra.ph/종로출장마사지종로출장안마-20대-ACE-총출동-광화문인사동-호텔-외국인비즈니스-11-10-08',
        'https://telegra.ph/중구출장마사지명동출장안마-20대-ACE-총출동-을지로동대문-호텔-투숙객-안심-대면결제-10-08',
        'https://telegra.ph/강서출장마사지마곡출장안마-20대-ACE-총출동-발산화곡-심야-프라이빗-홈케어-정찰제-10-08',
        'https://telegra.ph/양천출장마사지목동출장안마-20대-ACE-총출동-신정오목교-자택-11-맞춤-테라피-10-08',
        'https://telegra.ph/구로출장마사지신도림출장안마-20대-ACE-총출동-구로디지털단지-직장인-맞춤-지압-10-08',
        'https://telegra.ph/금천출장마사지가산출장안마-20대-ACE-총출동-가산디지털단지-IT-직장인-힐링-케어-10-08',
        'https://telegra.ph/은평출장마사지연신내출장안마-20대-ACE-총출동-불광응암동-자택-프라이빗-100-후불제-10-08',
        'https://telegra.ph/노원출장마사지노원역출장안마-20대-ACE-총출동-상계중계동-심야-안심-방문케어-10-08',
        'https://telegra.ph/도봉출장마사지창동출장안마-20대-ACE-총출동-쌍문방학동-타이아로마-전문-출장-10-08',
        'https://telegra.ph/중랑출장마사지상봉출장안마-20대-ACE-총출동-면목망우동-30분-안심-대면결제-10-08',
        'https://telegra.ph/동대문출장마사지장안동출장안마-20대-ACE-총출동-청량리회기역-호텔-전문-홈케어-10-08',
        'https://telegra.ph/서울-출장마사지-선입금-없는-100-현장-후불제-안심-가이드-20대-ACE-총출동-10-08',
        'https://telegra.ph/20대-ACE-총출동-테라피스트-라인업-및-프라이빗-11-케어-안내-10-08',
        'https://telegra.ph/서울-주요-호텔-출장마사지-객실-이용-가이드-및-에티켓-10-08',
        'https://telegra.ph/정통-왓포-건식-타이-vs-천연-식물성-아로마-테라피-효능-비교-10-08',
        'https://telegra.ph/야근-직장인과-교대-근무자를-위한-심야-출장안마-힐링-프로그램-10-08',
        'https://telegra.ph/관악출장마사지신림출장안마-20대-ACE-총출동-봉천서울대입구-2030분-신속-배차-10-08',
        'https://telegra.ph/강북출장마사지수유출장안마-20대-ACE-총출동-미아동-연중무휴-신속-배차-11-케어-10-08',
        'https://telegra.ph/성북출장마사지길음출장안마-20대-ACE-총출동-종암성신여대-인근-11-방문-홈케어-10-08',
      ],
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
      name: '아밤 Abam.kr - 20대 ACE 총출동 서울 출장마사지',
      alternateName: ['아밤', 'Abam', '아름다운밤', '20대 ACE 총출동'],
      description: '서울 출장마사지 · 출장안마 1위 아밤(Abam.kr) [20대 ACE 총출동] 전원 20대 에이스 관리사 라인업! 서울 전역 자택·호텔 30분 총알도착, 100% 현장 후불제 안심 케어.',
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
