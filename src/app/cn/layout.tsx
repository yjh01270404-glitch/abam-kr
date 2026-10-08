import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Abam.kr | 首尔上门按摩 · 酒店・住宅 1:1 私密高端护理',
  description:
    '首尔高端上门按摩与酒店客房1:1私密护理。全员20代王牌技师团队，首尔全境20~30分钟内极速抵达。无定金100%现场后付款，安全放心。预约从18:00开始（营业 19:00~05:00）。',
  keywords: [
    '首尔上门按摩',
    '首尔酒店上门按摩',
    '江南上门按摩',
    '首尔出差按摩',
    '首尔泰式精油',
    '首尔出差SPA',
    'Abam.kr',
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
