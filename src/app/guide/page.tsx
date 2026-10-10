import type { Metadata } from 'next';
import Link from 'next/link';
import { GUIDES } from '../../lib/guides';

export const metadata: Metadata = {
  title: { absolute: '출장마사지 이용 가이드 — 가격·예약·호텔 총정리 | Abam.kr' },
  description: '출장마사지 가격, 이용 방법, 호텔 이용 팁, 코스 선택까지. Abam.kr 프라이빗 1:1 방문 홈케어(서울·경기·인천 수도권 전역 자택·호텔)의 이용 가이드 모음.',
  alternates: { canonical: 'https://abam.kr/guide' },
};

const PHONE_TEL = 'tel:010-6607-2239';

export default function GuideIndexPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: '출장마사지 이용 가이드',
    url: 'https://abam.kr/guide',
    hasPart: GUIDES.map((g) => ({ '@type': 'Article', headline: g.title, url: `https://abam.kr/guide/${g.slug}` })),
  };
  return (
    <div style={{ minHeight: '100vh', color: '#0f172a', fontFamily: 'inherit' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <header style={{ background: 'rgba(10,15,29,0.85)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(255,255,255,0.12)', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: 640, margin: '0 auto', padding: '12px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link href="/" style={{ color: '#fff', fontWeight: 900, fontSize: 17 }}>🌙 Abam<span style={{ fontSize: 13, color: '#e0b04a' }}>.kr</span></Link>
          <Link href="/keywords" style={{ color: '#cbd5e1', fontSize: 12 }}>전체지역</Link>
        </div>
      </header>
      <main style={{ maxWidth: 640, margin: '16px auto', background: 'rgba(255,255,255,0.95)', borderRadius: 16, padding: '22px 18px 120px' }}>
        <h1 style={{ fontSize: 22, fontWeight: 900, margin: '0 0 8px', lineHeight: 1.35 }}>출장마사지 이용 가이드</h1>
        <p style={{ fontSize: 13, lineHeight: 1.7, color: '#475569', margin: '0 0 18px' }}>
          서울·경기·인천 수도권 전역 자택·호텔 프라이빗 1:1 방문 홈케어를 처음 이용하는 분들이 자주 궁금해하는 가격, 예약 방법, 호텔 이용, 코스 선택을 정리했습니다.
        </p>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
          {GUIDES.map((g) => (
            <li key={g.slug} style={{ border: '1px solid #e2e8f0', borderRadius: 12, padding: '14px 16px' }}>
              <Link href={`/guide/${g.slug}`} style={{ fontSize: 15, fontWeight: 800, color: '#1a0dab' }}>{g.title}</Link>
              <p style={{ fontSize: 12.5, color: '#5f6368', lineHeight: 1.6, margin: '6px 0 0' }}>{g.description}</p>
            </li>
          ))}
        </ul>
        <p style={{ marginTop: 22, fontSize: 13 }}>
          예약·문의: <a href={PHONE_TEL} style={{ fontWeight: 800 }}>010-6607-2239</a> · 예약은 18:00부터 (영업 19:00 ~ 05:00) · 서울·경기·인천 수도권 전역 자택·호텔 방문
        </p>
      </main>
    </div>
  );
}
