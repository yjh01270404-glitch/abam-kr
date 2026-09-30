import type { Metadata, Viewport } from 'next';
import './globals.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#ffffff',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://abam.kr'),
  title: {
    default: '아름다운 밤 타이 홈케어 (Abam) | 왓포 정통 수기 & 아로마 · 서울 전지역 20~30분 도착 100% 대면결제',
    template: '%s | 아름다운 밤 타이 홈케어 (Abam)',
  },
  description:
    '아름다운 밤을 선물하는 프리미엄 방문 힐링, 아름다운 밤 타이 홈케어(Abam). 오직 서울특별시 25개 구 전지역 20~30분 내외 총알 방문! 선입금 0원, 관리사 도착 후 100% 현장 대면결제. 타이·아로마·힐링 VIP 정찰제 홈케어. 24시간 연중무휴 상시 운영.',
  keywords: [
    '아름다운밤', '아름다운밤타이홈케어', '아밤', '아밤타이홈케어', '아밤홈케어', '아밤마사지', 'Abam',
    '왓포출장홈케어', '왓포홈케어', '왓포출장마사지', '왓포마사지', '왓포테라피',
    '강남출장홈케어', '강남홈케어', '강남출장마사지', '강남출장안마', '강남홈타이', '강남마사지',
    '서초출장홈케어', '송파출장홈케어', '잠실출장홈케어', '역삼출장홈케어', '선릉출장홈케어', '논현출장홈케어', '청담출장홈케어',
    '마포출장홈케어', '홍대출장홈케어', '용산출장홈케어', '여의도출장홈케어', '성수출장홈케어',
    '종로출장홈케어', '중구출장홈케어', '동작출장홈케어', '관악출장홈케어', '강서출장홈케어', '양천출장홈케어', '구로출장홈케어', '광진출장홈케어',
    '출장홈케어', '프리미엄홈케어', '방문홈케어', '출장안마', '출장마사지', '홈타이', '방문마사지', '홈케어마사지', '방문안마', '출장테라피',
    '선입금없는출장마사지', '선입금없는홈케어', '대면결제출장마사지', '대면결제홈케어', '현장결제출장마사지', '100%후불마사지',
    '24시간출장마사지', '24시출장홈케어', '새벽출장마사지', '야간출장마사지',
    '서울출장마사지', '서울출장홈케어', '서울25개구홈타이', '서울호텔마사지', '서울방문마사지', '서울야간출장마사지',
    '호텔출장마사지', '모텔출장마사지', '오피스텔출장마사지', '자택출장홈케어',
    '타이테라피', '아로마테라피', '힐링VIP테라피', '정통타이출장마사지', '여성관리사출장마사지', '30분도착출장마사지',
    'Seoul outcall massage', 'Seoul hotel massage', 'Gangnam hotel massage', 'Seoul English massage', 'Seoul in room massage',
    'ソウル 出張マッサージ', 'ソウル ホテル マッサージ', 'カンナム 出張アロマ',
    '首尔 上门按摩', '首尔 酒店上门SPA', '首尔 24小时上门按摩'
  ].join(', '),
  authors: [{ name: '아름다운 밤 타이 홈케어 (Abam)', url: 'https://abam.kr' }],
  creator: '아름다운 밤 타이 홈케어 (Abam)',
  publisher: '아름다운 밤 타이 홈케어 (Abam)',
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
    },
  },
  openGraph: {
    title: '아름다운 밤 타이 홈케어 (Abam) · 왓포 정통 테라피 · 100% 현장 대면결제',
    description:
      '선입금 0원! 관리사 도착 후 직접 확인하고 결제하는 가장 안전한 홈케어. 오직 서울 전지역 25개 구 20~30분 내 방문. 타이·아로마·힐링 VIP 24시간 운영.',
    type: 'website',
    locale: 'ko_KR',
    url: 'https://abam.kr',
    siteName: '아름다운 밤 타이 홈케어 (Abam)',
    images: [
      {
        url: 'https://abam.kr/og-image.png',
        width: 1200,
        height: 630,
        alt: '아름다운 밤 타이 홈케어 (Abam) — 왓포 정통 테라피',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '아름다운 밤 타이 홈케어 (Abam) · 100% 대면결제',
    description: '선입금 없는 안전한 서울 전지역 24시 출장 홈케어. 100% 현장 대면결제. 20~30분 도착.',
    images: ['https://abam.kr/og-image.png'],
  },
  verification: {
    google: 'abam-google-verification',
    other: {
      'naver-site-verification': 'abam-naver-verification',
    },
  },
  other: {
    'format-detection': 'telephone=yes',
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
  },
};

const jsonLdData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'HealthAndBeautyBusiness',
      '@id': 'https://abam.kr/#business',
      name: '아밤 타이 홈케어 (ABAM) | 아름다운 밤 · 왓포 정통 테라피',
      url: 'https://abam.kr',
      telephone: '010-6607-2239',
      priceRange: '70,000원 - 180,000원',
      paymentAccepted: 'Cash, Credit Card, Bank Transfer (현장 대면결제 100%)',
      currenciesAccepted: 'KRW',
      address: {
        '@type': 'PostalAddress',
        addressLocality: '서울시 강남구 및 수도권 전지역',
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
          opens: '00:00',
          closes: '23:59',
        },
      ],
      areaServed: [
        { '@type': 'City', name: '서울특별시 (강남, 서초, 송파, 마포, 용산, 영등포 등 전지역)' },
        { '@type': 'AdministrativeArea', name: '경기도 (분당, 판교, 수원, 일산, 부천, 용인, 화성 등)' },
        
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: '아밤 타이 홈케어 정찰제 코스',
        itemListElement: [
          {
            '@type': 'Offer',
            name: '타이 테라피 (왓포 정통 건식 수기)',
            price: '70000',
            priceCurrency: 'KRW',
            description: '정통 건식 수기 지압 및 전신 스트레칭',
          },
          {
            '@type': 'Offer',
            name: '아로마 테라피 (천연 에센셜 오일)',
            price: '80000',
            priceCurrency: 'KRW',
            description: '천연 식물성 에센셜 오일 림프 순환 케어',
          },
          {
            '@type': 'Offer',
            name: '힐링 VIP 테라피 (건식+오일 시그니처 1위)',
            price: '100000',
            priceCurrency: 'KRW',
            description: '타이 건식 40분 + 천연 아로마 50분 결합 코스',
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
          name: '아밤 타이 홈케어 예약 시 선입금이 있나요?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: '아밤 타이 홈케어는 선입금 사기를 원천 차단하기 위해 100% 현장 대면결제 원칙을 고수합니다. 관리사가 직접 고객님 계신 곳에 도착한 후 결제하시면 되며, 예약금이나 선입금을 일체 요구하지 않습니다.',
          },
        },
        {
          '@type': 'Question',
          name: '서울 및 경기 지역 방문 소요시간은 얼마나 걸리나요?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: '서울 전지역(강남, 서초, 송파, 마포, 용산 등)과 경기 주요 도시(분당, 판교, 수원, 일산 등) 거점별로 전문 테라피스트가 상시 대기하고 있어 예약 확정 후 평균 30분 내외로 신속하게 방문합니다.',
          },
        },
        {
          '@type': 'Question',
          name: '자택 외에 호텔이나 오피스텔에서도 이용이 가능한가요?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: '네, 일반 자택(아파트, 빌라, 원룸)은 물론 서울·경기권 비즈니스 호텔, 모텔, 레지던스, 오피스텔 등 고객님이 편안하게 휴식을 취하실 수 있는 독립된 공간이라면 24시간 언제든 방문 케어가 가능합니다.',
          },
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
      <body>{children}</body>
    </html>
  );
}
