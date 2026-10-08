import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Abam.kr | ソウル 出張マッサージ · ホテル・自宅 1:1 プライベートケア',
  description:
    'ソウル出張マッサージ・ホテル客室への1:1プライベート訪問ケア。20代エースセラピスト常時待機、ソウル全域30分以内に迅速到着。安心の完全後払い制（事前振込・予約金ゼロ）。ご予約は18:00から（営業 19:00〜05:00）。',
  keywords: [
    'ソウル 出張マッサージ',
    'ソウル ホテル マッサージ',
    'カンナム 出張マッサージ',
    'ソウル エステ 出張',
    'ソウル アロマ マッサージ',
    'ソウル タイ式 マッサージ',
    'Abam.kr',
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
