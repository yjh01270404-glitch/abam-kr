import type { Metadata, Viewport } from 'next';
import './globals.css';
import './abam-font.css';
import Footer from '../components/Footer';

import AgeGateway from '../components/AgeGateway';
import LegalWarning from '../components/LegalWarning';
import AdminGate from '../components/AdminGate';
import { AppProvider } from '../context/AppContext';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#c2185b',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://abam.kr'),
  title: '아름다운밤 | 여성 고수익 일자리 정보 플랫폼',
  description: '여성 고수익 일자리 정보 플랫폼 - 밤알바 유흥알바 퀸알바 여우알바 노래방알바 바알바 술집알바',
  openGraph: {
    title: '아름다운밤',
    description: '여성 고수익 일자리 정보를 제공하는 플랫폼',
    images: [{ url: '/images/og-image.png', width: 1200, height: 630 }]
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: '아름다운밤',
    url: 'https://abam.kr',
    description: '여성 전문 구인구직 플랫폼으로, 유흥·룸·밤알바 등 고수익 여성 일자리 정보를 제공합니다.',
    publisher: {
      '@type': 'Organization',
      name: '아름다운밤',
      url: 'https://abam.kr',
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://abam.kr/jobs?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <html lang="ko">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <AppProvider>
          <AdminGate>
            {children}
          </AdminGate>
        </AppProvider>
      </body>
    </html>
  );
}
