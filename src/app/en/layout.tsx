import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Seoul Outcall Massage & Hotel In-Room VIP Spa | English 24/7 Concierge (Abam)',
  description:
    'Premium English-friendly hotel in-room outcall massage across all 25 Seoul districts. 30-minute arrival, 100% pay-on-arrival (Cash or Card). No advance deposit. Instant booking via WhatsApp (+82 10-6607-2239).',
  keywords: [
    'Seoul outcall massage',
    'Seoul hotel massage',
    'Seoul in-room massage',
    'Gangnam hotel outcall spa',
    'Myeongdong hotel massage',
    'Itaewon massage English',
    'Hongdae hotel massage',
    'Seoul 5 star hotel massage',
    'English speaking massage Seoul',
    'Seoul 24 hour massage',
    'Seoul VIP sensory massage'
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
    title: 'Seoul Outcall Massage & Hotel In-Room VIP Spa (Abam)',
    description:
      'Seoul All 25 Districts Hotel In-Room Massage. 30-min arrival, 100% pay on arrival (Visa/Master/Amex/Cash). English concierge via WhatsApp (+82 10-6607-2239).',
    url: 'https://abam.kr/en',
    siteName: 'Abam Thai Homecare Seoul',
    images: [{ url: 'https://abam.kr/images/hero_sensual_goddess.jpg', width: 730, height: 620, alt: 'Seoul VIP Hotel Massage' }],
  },
};

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
