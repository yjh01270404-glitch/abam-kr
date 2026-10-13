import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { GUIDES, getGuide } from '../../../lib/guides';
import { DISTRICTS, hubKeywordFor } from '../../../lib/region-data';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const g = getGuide(slug);
  if (!g) return {};
  const url = `https://abam.kr/guide/${g.slug}`;
  return {
    title: { absolute: `${g.title} | Abam.kr` },
    description: g.description,
    keywords: g.keywords.join(', '),
    alternates: { canonical: url },
    openGraph: { title: g.title, description: g.description, url, type: 'article', locale: 'ko_KR', siteName: 'Abam.kr', images: ['https://abam.kr/og-image.png'] },
  };
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const g = getGuide(slug);
  if (!g) notFound();
  const url = `https://abam.kr/guide/${g.slug}`;
  const others = GUIDES.filter((x) => x.slug !== g.slug).slice(0, 4);

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: g.title,
      description: g.description,
      datePublished: g.published,
      dateModified: g.published,
      inLanguage: 'ko-KR',
      mainEntityOfPage: url,
      author: { '@type': 'Organization', name: 'Abam.kr', url: 'https://abam.kr' },
      publisher: { '@type': 'Organization', name: 'Abam.kr', logo: { '@type': 'ImageObject', url: 'https://abam.kr/icon.png' } },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Abam.kr 홈', item: 'https://abam.kr' },
        { '@type': 'ListItem', position: 2, name: '이용 가이드', item: 'https://abam.kr/guide' },
        { '@type': 'ListItem', position: 3, name: g.title, item: url },
      ],
    },
  ];

  return (
    <div style={{ minHeight: '100vh', color: '#0f172a', fontFamily: 'inherit' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <header style={{ background: 'rgba(10,15,29,0.85)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(255,255,255,0.12)', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: 640, margin: '0 auto', padding: '12px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '20px' }}>🌙</span>
              <span className="abam-script-font" style={{
                fontSize: '26px',
                color: '#fef08a',
                fontStyle: 'italic',
                transform: 'rotate(-1deg) skewX(-6deg)',
                display: 'inline-block',
                lineHeight: 1,
              }}>아름다운 밤</span>
              <span style={{ fontSize: '16px', fontWeight: 900, color: '#e11d48', letterSpacing: '-0.3px' }}>[아밤 · Abam]</span>
            </span>
          </Link>
          <Link href="/guide" style={{ color: '#cbd5e1', fontSize: 12 }}>이용 가이드</Link>
        </div>
      </header>

      <main style={{ maxWidth: 640, margin: '16px auto', background: 'rgba(255,255,255,0.95)', borderRadius: 16, padding: '22px 18px 120px' }}>
        <article>
          <div className="abam-copperplate-en" style={{ fontSize: 17, color: '#d97706', letterSpacing: '0.06em', marginBottom: 4, lineHeight: 1.2 }}>
            Official Safety Guide · Beautiful Night
          </div>
          <h1 style={{ fontSize: 22, fontWeight: 900, margin: '0 0 8px', lineHeight: 1.35 }}>{g.h1}</h1>
          <p style={{ fontSize: 12.5, color: '#64748b', margin: '0 0 16px' }}>Abam.kr · <span className="abam-script-font" style={{ fontSize: 16, color: '#d97706', fontStyle: 'italic' }}>아름다운 밤</span>, 당신을 위한 특별한 시간 · 최종 업데이트 {g.published}</p>
          <p style={{ fontSize: 13.5, lineHeight: 1.75, color: '#334155', margin: '0 0 8px' }}>{g.description}</p>

          {g.sections.map((s) => (
            <section key={s.heading} style={{ marginTop: 22 }}>
              <h2 style={{ fontSize: 17, fontWeight: 800, margin: '0 0 8px' }}>{s.heading}</h2>
              {s.paragraphs.map((p, i) => (
                <p key={i} style={{ fontSize: 14, lineHeight: 1.8, color: '#334155', margin: '0 0 10px' }}>{p}</p>
              ))}
              {s.bullets && (
                <ul style={{ margin: '4px 0 0', paddingLeft: 20, fontSize: 14, lineHeight: 1.8, color: '#334155' }}>
                  {s.bullets.map((b) => <li key={b}>{b}</li>)}
                </ul>
              )}
            </section>
          ))}
        </article>

        <section style={{ marginTop: 28, padding: '16px', background: '#f8fafc', borderRadius: 12, border: '1px solid #e2e8f0' }}>
          <h2 style={{ fontSize: 15, fontWeight: 800, margin: '0 0 6px' }}>서울·경기 출장마사지·출장안마 예약</h2>
          <p style={{ fontSize: 13, lineHeight: 1.7, color: '#475569', margin: '0 0 10px' }}>
            서울·경기 전역 자택·호텔 방문 · 예약 18:00부터 · 출발 19:00부터 · 마지막 예약 05:00 마감 · 프라이빗 1:1 케어
          </p>
          <a href="tel:010-6607-2239" style={{ display: 'inline-block', background: '#0f172a', color: '#fff', padding: '10px 16px', borderRadius: 8, fontWeight: 800, fontSize: 13 }}>
            전화 예약 010-6607-2239
          </a>
        </section>

        <section style={{ marginTop: 24 }}>
          <h2 style={{ fontSize: 15, fontWeight: 800, margin: '0 0 8px' }}>함께 보면 좋은 가이드</h2>
          <ul style={{ margin: 0, paddingLeft: 20, fontSize: 14, lineHeight: 1.9 }}>
            {others.map((o) => (
              <li key={o.slug}><Link href={`/guide/${o.slug}`} style={{ color: '#1a0dab' }}>{o.title}</Link></li>
            ))}
          </ul>
        </section>

        <section style={{ marginTop: 22 }}>
          <h2 style={{ fontSize: 15, fontWeight: 800, margin: '0 0 8px' }}>서울 지역별 출장마사지</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 12px', fontSize: 13 }}>
            {DISTRICTS.map((d) => (
              <Link key={d.gu} href={`/seo/${encodeURIComponent(hubKeywordFor(d))}`} style={{ color: '#1a0dab' }}>
                {d.short}출장마사지
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
