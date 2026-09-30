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
    '마사지', '출장마사지', '홈타이', '출장안마', '홈케어', '방문마사지', '출장스파', '출장테라피',
    '아름다운밤', '아름다운밤타이홈케어', '아밤', '아밤타이홈케어', '아밤홈케어', '아밤마사지', 'Abam',
    '서울출장마사지', '서울홈타이', '서울출장안마', '서울방문마사지', '서울야간출장', '서울호텔마사지', '서울24시마사지',
    '강남출장마사지', '강남홈타이', '강남출장안마', '강남역출장마사지', '역삼출장마사지', '논현출장마사지', '청담출장마사지', '압구정출장마사지', '선릉출장마사지',
    '서초출장마사지', '서초홈타이', '반포출장마사지', '방배출장마사지', '교대출장마사지', '양재출장마사지',
    '송파출장마사지', '잠실출장마사지', '잠실홈타이', '문정출장마사지', '가락출장마사지', '강동출장마사지', '천호출장마사지',
    '마포출장마사지', '마포홈타이', '홍대출장마사지', '합정출장마사지', '공덕출장마사지', '상암출장마사지', '신촌출장마사지',
    '용산출장마사지', '용산홈타이', '한남출장마사지', '이태원출장마사지', '용산역출장마사지', '삼각지출장마사지',
    '영등포출장마사지', '여의도출장마사지', '여의도홈타이', '신도림출장마사지', '당산출장마사지', '문래출장마사지',
    '성수출장마사지', '성동출장마사지', '왕십리출장마사지', '광진출장마사지', '건대출장마사지', '구의출장마사지',
    '종로출장마사지', '중구출장마사지', '명동출장마사지', '을지로출장마사지', '광화문출장마사지', '동대문출장마사지',
    '동작출장마사지', '사당출장마사지', '이수출장마사지', '관악출장마사지', '신림출장마사지', '봉천출장마사지', '낙성대출장마사지',
    '강서출장마사지', '마곡출장마사지', '발산출장마사지', '화곡출장마사지', '양천출장마사지', '목동출장마사지', '구로출장마사지', '금천출장마사지',
    '노원출장마사지', '강북출장마사지', '수유출장마사지', '미아출장마사지', '도봉출장마사지', '창동출장마사지', '성북출장마사지', '중랑출장마사지',
    '은평출장마사지', '연신내출장마사지', '서대문출장마사지',
    '호텔출장마사지', '모텔출장마사지', '오피스텔출장마사지', '자택출장홈케어', '레지던스출장마사지',
    '왓포출장홈케어', '왓포홈케어', '왓포출장마사지', '왓포정통건식', '왓포마사지', '왓포테라피',
    '아로마테라피', '아로마출장마사지', '스웨디시마사지', '스웨디시출장', '감성힐링테라피', '림프순환마사지', '딥티슈마사지',
    '선입금없는출장마사지', '선입금없는홈케어', '대면결제출장마사지', '대면결제홈케어', '현장결제출장마사지', '100%후불마사지', '후불출장마사지',
    '24시간출장마사지', '24시출장홈케어', '새벽출장마사지', '야간출장마사지', '심야출장마사지', '20대출장마사지', '30분도착출장마사지',
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
      '@type': ['HealthAndBeautyBusiness', 'LocalBusiness'],
      '@id': 'https://abam.kr/#business',
      name: '아름다운 밤 타이 홈케어 (Abam)',
      alternateName: ['아밤', '아밤타이홈케어', 'Abam In-Room Spa', '서울출장마사지 아밤'],
      url: 'https://abam.kr',
      telephone: '010-6607-2239',
      image: 'https://abam.kr/images/hero_sensual_goddess.jpg',
      priceRange: '80,000원 - 200,000원',
      paymentAccepted: 'Credit Card, Cash, Bank Transfer (100% 현장 대면결제)',
      currenciesAccepted: 'KRW, USD',
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
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '5.0',
        bestRating: '5',
        worstRating: '1',
        ratingCount: '168',
        reviewCount: '168',
      },
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
        name: '아름다운 밤 프리미엄 홈케어 정찰제 코스',
        itemListElement: [
          {
            '@type': 'Offer',
            name: '타이 정통 코스 (60분/90분/120분)',
            price: '80000',
            priceCurrency: 'KRW',
            description: '왓포 왕실 정통 건식 수기 지압 및 전신 스트레칭',
          },
          {
            '@type': 'Offer',
            name: '아로마 힐링 코스 (60분/90분/120분)',
            price: '90000',
            priceCurrency: 'KRW',
            description: '100% 천연 식물성 에센셜 오일 전신 림프 순환 케어',
          },
          {
            '@type': 'Offer',
            name: '감성힐링 테라피 (60분/90분/120분)',
            price: '90000',
            priceCurrency: 'KRW',
            description: '섬세하고 감미로운 미세 근막 이완 및 릴렉싱',
          },
          {
            '@type': 'Offer',
            name: '스페셜 듀얼 코스 (60분/90분/120분)',
            price: '100000',
            priceCurrency: 'KRW',
            description: '정통 건식 지압 + 아로마 림프 믹스 올인원 케어',
          },
          {
            '@type': 'Offer',
            name: '프리미엄 VIP 시그니처 (60분/90분/120분)',
            price: '120000',
            priceCurrency: 'KRW',
            description: '전신 수기 + 최고급 천연 오일 + 림프 풀코스 집중 케어',
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
            text: '네, 서울특별시 25개 자치구 전지역에 20~30분 내외로 방문합니다. 최상의 관리 품질을 위해 서울 외 지역은 이동이 불가하며, 매일 저녁 7시부터 새벽 5시까지 운영합니다.',
          },
        },
        {
          '@type': 'Question',
          name: '예약금이나 선입금이 필요한가요?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: '아닙니다. 아름다운 밤은 사전 예약금, 보증금 등을 단 1원도 요구하지 않습니다. 전문 테라피스트가 고객님 계신 곳에 도착한 후 직접 뵙고 결제하는 100% 현장 대면결제만을 원칙으로 합니다.',
          },
        },
        {
          '@type': 'Question',
          name: '도착까지 시간은 얼마나 걸리나요?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: '서울 전역 주요 거점에 상시 대기 중으로, 예약 확정 후 평균 20~30분 내외로 신속하게 방문합니다. 출발 시 예상 도착 시간을 미리 친절히 안내해 드립니다.',
          },
        },
        {
          '@type': 'Question',
          name: '결제는 어떤 수단으로 가능한가요? (카드/현금)',
          acceptedAnswer: {
            '@type': 'Answer',
            text: '국내외 모든 신용카드 및 체크카드(Visa, Master, Amex, JCB), 현금(원화·달러), 계좌이체 모두 가능하며, 현장에서 영수증 증빙도 즉시 발급됩니다.',
          },
        },
        {
          '@type': 'Question',
          name: '호텔·오피스텔·자택 모두 방문이 가능한가요?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: '네, 고객님만의 독립된 공간이라면 모두 방문 가능합니다. 일반 자택(아파트, 빌라, 원룸)은 물론 서울 전역 호텔, 레지던스, 오피스텔 모두 가능하며, 호텔의 경우 객실 호수만 알려주시면 조용히 찾아갑니다.',
          },
        },
        {
          '@type': 'Question',
          name: '프로필 속 관리사가 실제로 직접 오시나요?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: '네, 실물 프로필 100% 일치를 철저한 원칙으로 운영합니다. 서울 전역 권역별 거점에 상시 대기 중인 30여 명의 엄선된 20대 전문 테라피스트(민서, 채원, 예린 등 대표 에이스를 비롯하여 다양한 스타일의 전문 힐러진)를 보유하고 있으며, 원하시는 테라피스트를 지정하시면 반드시 해당 관리사가 직접 방문합니다.',
          },
        },
      ],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://abam.kr/#website',
      url: 'https://abam.kr',
      name: '아름다운 밤 타이 홈케어',
      description: '서울 전지역 20~30분 신속 방문, 100% 현장 대면결제 프라이빗 홈케어',
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
      <body>{children}</body>
    </html>
  );
}
