import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Abam.kr | プライベート1:1訪問ホームケア・ソウル全域 ご自宅・ホテル',
  description:
    '美しい夜、あなたのための特別な時間。Abam.kr プライベート1:1訪問ホームケア。ソウル全域のご自宅・ホテルへ訪問。ご予約は18:00から（営業 19:00~05:00）。タイ・アロマ・スペシャルの3コース、60分/90分/120分。',
  keywords: [
    'Abam.kr',
    'ソウル 訪問ホームケア',
    'ソウル ホテル マッサージ',
    'ソウル タイ式 マッサージ',
    'ソウル アロマ マッサージ',
  ].join(', '),
  alternates: {
    canonical: 'https://abam.kr/jp',
    languages: {
      'ko-KR': 'https://abam.kr',
      'en-US': 'https://abam.kr/en',
      'ja-JP': 'https://abam.kr/jp',
      'zh-CN': 'https://abam.kr/cn',
    },
  },
  openGraph: {
    title: 'Abam.kr | 美しい夜、あなたのための特別な時間',
    description:
      'プライベート1:1訪問ホームケア。ソウル全域・ご自宅・ホテル。ご予約は18:00から (営業 19:00 ~ 05:00)。',
    url: 'https://abam.kr/jp',
    siteName: 'Abam.kr',
    images: [{ url: 'https://abam.kr/og-image.png', width: 1200, height: 630, alt: 'Abam.kr プライベート1:1訪問ホームケア' }],
  },
};

export default function JpLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
