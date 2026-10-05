import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Abam.kr | Private 1:1 Home Visit Care · Seoul Home & Hotel',
  description:
    'A beautiful night, a special time just for you. Abam.kr private 1:1 home visit care across Seoul — home and hotel. Booking from 18:00 (open 19:00~05:00). Thai, Aroma and Special courses in 60/90/120 minutes.',
  keywords: [
    'Abam.kr',
    'Seoul home visit care',
    'Seoul private home care',
    'Seoul hotel massage',
    'Thai massage Seoul',
    'Aroma massage Seoul',
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
