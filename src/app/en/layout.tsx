import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Abam.kr | Seoul Outcall Massage · Hotel & Home 1:1 Private Care',
  description:
    'Premium Seoul outcall massage & in-room hotel service. Top 20s ACE therapists on standby across all of Seoul. 20-30 min fast arrival, 100% pay-on-arrival (no advance deposit). Booking from 18:00 (open 19:00~05:00).',
  keywords: [
    'Seoul outcall massage',
    'Seoul hotel massage',
    'Seoul in-room massage',
    'Gangnam hotel massage',
    'Seoul private home care',
    'Thai massage Seoul',
    'Aroma massage Seoul',
    'Abam.kr',
  ].join(', '),
  alternates: {
    canonical: 'https://abam.kr/en',
    languages: {
      'ko-KR': 'https://abam.kr',
      'en-US': 'https://abam.kr/en',
      'ja-JP': 'https://abam.kr/jp',
      'zh-CN': 'https://abam.kr/cn',
    },
  },
  openGraph: {
    title: 'Abam.kr | A beautiful night, a special time just for you',
    description:
      'Private 1:1 home visit care. All of Seoul · Home · Hotel. Booking from 18:00 (open 19:00 ~ 05:00).',
    url: 'https://abam.kr/en',
    siteName: 'Abam.kr',
    images: [{ url: 'https://abam.kr/og-image.png', width: 1200, height: 630, alt: 'Abam.kr Private 1:1 Home Visit Care' }],
  },
};

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
