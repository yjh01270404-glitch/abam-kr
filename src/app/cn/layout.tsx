import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '首尔酒店上门按摩・首尔上门精油SPA | 中文WhatsApp咨询・30分钟到达・100%见面付款 (Abam)',
  description:
    '首尔江南、明洞、东大门、弘大及京畿道全境酒店客房上门按摩服务。无任何预付款定金（100%到达后当面现金/银联信用卡结账）。WhatsApp快速预约，严选20代年轻专业技师30分钟内急速到达。',
  keywords: [
    '首尔上门按摩',
    '首尔酒店上门SPA',
    '江南酒店按摩',
    '明洞酒店上门按摩',
    '首尔精油上门按摩',
    '京畿道机场酒店按摩',
    '首尔出差按摩 中文',
    '韩国酒店客房SPA'
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
    title: '首尔酒店上门按摩・首尔上门SPA (Abam)',
    description:
      '首尔全境酒店30分钟到达。先付款0元・完全到达后当面付款（现金/银联信用卡均可）。WhatsApp支持。',
    url: 'https://abam.kr/cn',
    siteName: 'Abam Thai Homecare Seoul',
    images: [{ url: 'https://abam.kr/images/hero_sensual_goddess.jpg', width: 730, height: 620, alt: '首尔酒店上门按摩' }],
  },
};

export default function CnLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
