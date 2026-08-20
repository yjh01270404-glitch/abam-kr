import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import './globals.css';
import './abam-font.css';
import Footer from '../components/Footer';
import SiteHeader from '../components/SiteHeader';
import { AppProvider } from '../context/AppContext';
import ChatWidget from '../components/ChatWidget';
import TrackingProvider from '../components/TrackingProvider';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0284c7',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://abam.kr'),
  title: {
    default: '아밤(ABAM) | 전국 로컬 매장 비즈니스 정보 & 디지털 배너 광고 플랫폼',
    template: '%s | 아밤(ABAM)',
  },
  description:
    '대한민국 1등 로컬 비즈니스 매장 정보 & 프리미엄 디지털 배너 광고 플랫폼 아밤(ABAM). 뷰티, 에스테틱, 카페, 다이닝, 헬스·피트니스 등 전국 검증 매장 정보를 실시간 제공합니다.',
  keywords: [
    '로컬 비즈니스', '매장 홍보', '배너 광고', '디지털 마케팅', '상가 정보',
    '뷰티 에스테틱', '프리미엄 다이닝', '카페 창업', '피트니스', '웰니스',
    '아밤', 'ABAM', '아밤사이트', '소상공인 마케팅', '비즈니스 디렉토리',
    '강남 매장 홍보', '홍대 카페 광고', '부산 상가 정보', '디지털 배너 광고'
  ].join(', '),
  authors: [{ name: '아밤(ABAM)', url: 'https://abam.kr' }],
  creator: '아밤(ABAM)',
  publisher: '아밤(ABAM)',
  category: '비즈니스 & 광고',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://abam.kr',
    languages: {
      'ko-KR': 'https://abam.kr',
    },
  },
  openGraph: {
    title: '아밤(ABAM) — 전국 로컬 비즈니스 & 디지털 배너 광고 플랫폼',
    description:
      '우리 매장을 가장 돋보이게 하는 프리미엄 디지털 마케팅. 전국 검증 로컬 매장 정보 및 실시간 광고 배너 서비스.',
    type: 'website',
    locale: 'ko_KR',
    url: 'https://abam.kr',
    siteName: '아밤(ABAM)',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: '아밤(ABAM) — 전국 로컬 비즈니스 & 디지털 배너 광고 플랫폼',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '아밤(ABAM) — 전국 로컬 비즈니스 & 디지털 배너 광고 플랫폼',
    description: '전국 검증 로컬 매장 정보 및 실시간 광고 배너 서비스.',
    images: ['/images/og-image.png'],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': 'https://abam.kr/#website',
      name: '아밤(ABAM)',
      alternateName: ['아밤', 'ABAM', '아밤 비즈니스'],
      url: 'https://abam.kr',
      description: '대한민국 1등 로컬 비즈니스 매장 정보 & 프리미엄 디지털 배너 광고 플랫폼',
      inLanguage: 'ko-KR',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      '@id': 'https://abam.kr/#organization',
      name: '아밤(ABAM)',
      url: 'https://abam.kr',
      logo: 'https://abam.kr/icon.png',
      description: '로컬 비즈니스 매장 정보 및 디지털 배너 광고 플랫폼',
      telephone: '070-8057-6615',
    },
  ];

  return (
    <html lang="ko">
      <head>
        <meta name="subject" content="전국 로컬 비즈니스 매장 정보 & 디지털 배너 광고 플랫폼" />
        <meta name="classification" content="비즈니스, 매장홍보, 배너광고, 마케팅" />
        <meta name="rating" content="general" />
        <meta name="language" content="Korean" />
        <meta name="geo.region" content="KR" />
        <meta name="geo.country" content="KR" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
        <link rel="manifest" href="/manifest.json" />

        {/* PortOne (아임포트) 정식 결제 SDK */}
        <Script src="https://cdn.iamport.kr/v1/iamport.js" strategy="lazyOnload" />
      </head>
      <body>
        <AppProvider>
          <TrackingProvider>
            <SiteHeader />
            <main style={{ minHeight: '80vh' }}>
              {children}
            </main>
            <Footer />
            <ChatWidget />
          </TrackingProvider>
        </AppProvider>
      </body>
    </html>
  );
}
