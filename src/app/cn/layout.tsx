import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Abam.kr | 私密1:1上门居家护理・首尔全境 住宅・酒店',
  description:
    '美丽的夜晚，专属于您的特别时光。Abam.kr 私密1:1上门居家护理。首尔全境住宅、酒店上门。预约从18:00开始（营业 19:00~05:00）。泰式、芳香、特别三种课程，60分钟/90分钟/120分钟。',
  keywords: [
    'Abam.kr',
    '首尔上门居家护理',
    '首尔酒店上门按摩',
    '首尔泰式按摩',
    '首尔芳香精油按摩',
  ].join(', '),
  alternates: {
    canonical: 'https://abam.kr/cn',
    languages: {
      'ko-KR': 'https://abam.kr',
      'en-US': 'https://abam.kr/en',
      'ja-JP': 'https://abam.kr/jp',
      'zh-CN': 'https://abam.kr/cn',
    },
  },
  openGraph: {
    title: 'Abam.kr | 美丽的夜晚，专属于您的特别时光',
    description:
      '私密1:1上门居家护理。首尔全境 · 住宅 · 酒店。预约从18:00开始 (营业 19:00 ~ 05:00)。',
    url: 'https://abam.kr/cn',
    siteName: 'Abam.kr',
    images: [{ url: 'https://abam.kr/og-image.png', width: 1200, height: 630, alt: 'Abam.kr 私密1:1上门居家护理' }],
  },
};

export default function CnLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
