import type { Metadata } from 'next';
import './globals.css';
import Footer from '../components/Footer';
import AgeGateway from '../components/AgeGateway';

export const metadata: Metadata = {
  title: '아름다운밤 | 여성 고수익 일자리 정보 플랫폼 - 밤알바 유흥알바 퀸알바 여우알바 노래방알바 바알바 술집알바',
  description: '안녕하세요, 아름다운밤입니다. 여성 전문 구인구직 플랫폼으로, 유흥·룸·밤알바 등 고수익 여성 일자리 정보를 제공합니다.',
  keywords: [
    '아름다운밤',
    '밤알바',
    '유흥알바',
    '퀸알바',
    '여우알바',
    '악녀알바',
    '노래방알바',
    '바알바',
    '술집알바',
    '고소득알바',
    '여성알바',
    '룸알바',
    '텐프로알바',
    'abam'
  ],
  openGraph: {
    title: '아름다운밤 | 여성 고수익 일자리 정보 플랫폼',
    description: '안녕하세요, 아름다운밤입니다. 여성 전문 구인구직 플랫폼으로, 유흥·룸·밤알바 등 고수익 여성 일자리 정보를 제공합니다.',
    url: 'https://abam.kr',
    siteName: '아름다운밤',
    locale: 'ko_KR',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <AgeGateway>
          <div className="container">
            {children}
            <Footer />
          </div>
        </AgeGateway>
      </body>
    </html>
  );
}
