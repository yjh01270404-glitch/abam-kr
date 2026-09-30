import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ソウル出張マッサージ・ホテル客室VIPアロマSPA | 日本語対応・30分到着・完全現地払い (Abam)',
  description:
    'ソウル全域（25区100%対応）のホテル客室へ30分でお伺いする高級出張マッサージ。先払い・前受金一切なし（完全現地払い・各種クレジットカード＆日本円/ウォン対応）。WhatsAppで簡単日本語予約可能。20代厳選セラピスト在籍。',
  keywords: [
    'ソウル 出張マッサージ',
    'ソウル ホテル マッサージ',
    'カンナム 出張アロマ',
    '明洞 ホテル マッサージ',
    '弘大 出張マッサージ',
    '東大門 ホテル マッサージ',
    '韓国 出張マッサージ 日本語',
    'ソウル 客室 マッサージ',
    'ソウル 高級 出張エステ'
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
    title: 'ソウル出張マッサージ・ホテル客室VIPアロマSPA (Abam)',
    description:
      'ソウル全域・首都圏のホテル客室へ30分到着。先払いゼロ・完全現地対面決済。WhatsApp日本語予約対応。',
    url: 'https://abam.kr/jp',
    siteName: 'Abam Thai Homecare Seoul',
    images: [{ url: 'https://abam.kr/images/hero_sensual_goddess.jpg', width: 730, height: 620, alt: 'ソウル ホテル 出張マッサージ' }],
  },
};

export default function JpLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
