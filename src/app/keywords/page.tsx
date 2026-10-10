import { Metadata } from 'next';
import Link from 'next/link';
import { SERVED_KEYWORDS } from '../../lib/seo-keywords';

export const metadata: Metadata = {
  title: '서울·경기 지역별 프라이빗 1:1 방문 홈케어 안내 | Abam.kr',
  description: '서울 25개 구 및 경기(수원·분당·판교·일산·부천·평택·동탄 등) 전역 지역별 안내. 자택·호텔 30분 도착, 100% 현장 후불제. 타이·아로마·스페셜 코스.',
  keywords: '서울출장안마,서울출장마사지,서울출장홈타이,강남출장안마,강남출장마사지,강남출장홈타이,호텔출장안마,출장서비스,방문마사지,홈타이,Abam.kr',
  alternates: { canonical: 'https://abam.kr/keywords' },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1 } },
  openGraph: {
    title: '서울·경기 지역별 프라이빗 1:1 방문 홈케어 안내 | Abam.kr',
    description: '서울·경기 전역 · 자택 · 호텔 30분 도착. 100% 후불제.',
    url: 'https://abam.kr/keywords',
    siteName: 'Abam.kr',
    locale: 'ko_KR',
  },
};

const SITE_URL = 'https://abam.kr';
const KAKAO_ID = 'Abam1004';
const KAKAO_LINK = 'kakaotalk://';
const PHONE_TEL = 'tel:010-6607-2239';
const PHONE_NUM = '010-6607-2239';

type Group = { label: string; keys: string[] };
const GROUPS: Group[] = [
  { label: '서울 강남·서초·송파·강동', keys: ['강남','서초','송파','잠실','반포','역삼','강동','천호'] },
  { label: '서울 마포·용산·영등포', keys: ['마포','홍대','합정','상암','망원','용산','이태원','한남'] },
  { label: '서울 성동·광진·동작·관악', keys: ['성동','성수','왕십리','광진','건대','동작','사당','관악','신림'] },
  { label: '서울 노원·도봉·강북·강서', keys: ['노원','상계','도봉','강북','미아','강서','마곡','화곡','목동'] },
  { label: '서울 종로·중구·서대문·은평·성북·중랑·양천·구로·금천', keys: ['종로','광화문','명동','을지로','동대문','서대문','신촌','은평','연신내','성북','중랑','양천','구로','금천','가산'] },
  { label: '코스별 전문 서비스', keys: ['스페셜','아로마','타이','천연오일','건식','지압','림프','스트레칭'] },
  { label: '이용 환경 및 상황별', keys: ['호텔','자택','심야','야간'] },
];

export default function KeywordsPage() {
  const ALL_POOL = SERVED_KEYWORDS;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${SITE_URL}/keywords#cp`,
    name: '서울·경기 지역별 프라이빗 1:1 방문 홈케어 안내 Abam.kr',
    url: `${SITE_URL}/keywords`,
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Abam.kr 홈', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: '서비스 지역', item: `${SITE_URL}/keywords` },
      ],
    },
  };

  return (
    <div style={{ minHeight: '100vh', background: 'transparent', color: '#0f172a', fontFamily: '-apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo", "Malgun Gothic", "Pretendard", sans-serif', WebkitFontSmoothing: 'antialiased' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      
      {/* 1. 상단 클린 헤더 */}
      <header style={{ background: 'rgba(10, 15, 29, 0.85)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(255, 255, 255, 0.12)', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: '640px', margin: '0 auto', padding: '12px 18px 10px' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '17px', fontWeight: 900, color: '#ffffff', letterSpacing: '-0.3px' }}>🌙 Abam<span style={{ color: '#e0b04a' }}>.kr</span></span>
            </Link>
            <Link href="/" style={{ fontSize: '12px', color: '#0f172a', fontWeight: 800, textDecoration: 'none', padding: '4px 10px', borderRadius: '6px', backgroundColor: '#ffffff' }}>
              메인홈
            </Link>
          </div>

          {/* 브레드크럼 */}
          <nav aria-label="breadcrumb">
            <ol style={{ display: 'flex', gap: '6px', listStyle: 'none', margin: 0, padding: 0, fontSize: '11.5px', color: '#94a3b8' }}>
              <li><Link href="/" style={{ color: '#94a3b8', textDecoration: 'none' }}>홈</Link></li>
              <li>›</li>
              <li style={{ color: '#ffffff', fontWeight: 800 }}>서비스 지역 디렉터리</li>
            </ol>
          </nav>
        </div>
      </header>

      {/* 2. 메인 컨테이너 */}
      <main style={{ maxWidth: '640px', margin: '16px auto', background: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(20px)', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.3)', padding: '18px 18px 120px', boxShadow: '0 8px 32px rgba(0,0,0,0.3)' }}>
        
        {/* 상단 개요 */}
        <section style={{ padding: '20px 0', borderBottom: '1px solid #f1f5f9' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 800, color: '#b45309', backgroundColor: '#fef3c7', padding: '4px 12px', borderRadius: '20px', marginBottom: '12px' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#16a34a' }} />
            서울·경기 전역 · 자택 · 호텔 30분 도착 · 100% 현장후불제
          </div>

          <h1 style={{ fontSize: '22px', fontWeight: 900, margin: '0 0 8px 0', lineHeight: 1.35, color: '#0f172a' }}>
            서울·경기 지역별 프라이빗 1:1 방문 홈케어 안내
          </h1>

          <p style={{ fontSize: '13px', lineHeight: 1.6, color: '#475569', margin: 0, wordBreak: 'keep-all' }}>
            원하시는 지역을 선택하시면 해당 지역의 주요 역·생활권 정보와 코스 요금표, 이용 절차를 확인하실 수 있습니다. Abam.kr(아름다운 밤)은 서울 25개 구 및 경기 전역 자택·호텔로 신속하게 방문하는 프라이빗 1:1 홈케어입니다.
          </p>
        </section>

        {/* 지역별 텍스트 링크 리스트 */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {GROUPS.map((g, idx) => {
            const matched = ALL_POOL.filter(kw => g.keys.some(k => kw.includes(k)));
            const unique = Array.from(new Set(matched));
            return (
              <section key={idx} style={{ padding: '18px 0', borderBottom: '1px solid #f1f5f9' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <h2 style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                    {g.label}
                  </h2>
                  <span style={{ fontSize: '11.5px', color: '#94a3b8', fontWeight: 600 }}>
                    {unique.length}개 키워드
                  </span>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 10px' }}>
                  {unique.slice(0, 30).map((kw, kIdx) => {
                    const slug = encodeURIComponent(kw.replace(/\s+/g, '-'));
                    return (
                      <Link
                        key={kIdx}
                        href={`/seo/${slug}`}
                        style={{
                          fontSize: '12.5px',
                          color: '#334155',
                          textDecoration: 'none',
                          padding: '4px 8px',
                          backgroundColor: '#f8fafc',
                          border: '1px solid #e2e8f0',
                          borderRadius: '6px',
                        }}
                      >
                        {kw}
                      </Link>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>

        {/* 푸터 */}
        <footer style={{ marginTop: '30px', paddingTop: '20px', borderTop: '1px solid #e2e8f0', fontSize: '11px', color: '#64748b', lineHeight: 1.7 }}>
          <div><strong>Abam.kr</strong> · 아름다운 밤, 당신을 위한 특별한 시간 · 서울·경기 전역 프라이빗 1:1 방문 홈케어</div>
          <div>대표 상담 전화: {PHONE_NUM} · 예약은 18:00부터 (영업 19:00 ~ 05:00)</div>
          <div>코스: 타이 · 아로마 · 스페셜 (60분 / 90분 / 120분)</div>
          <div style={{ marginTop: '6px' }}>
            © ABAM. All rights reserved.
          </div>
        </footer>

      </main>

      {/* 3. 모바일 하단 플로팅 예약 바 */}
      <aside aria-label="상담 예약" style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        background: 'rgba(255, 255, 255, 0.98)',
        backdropFilter: 'blur(12px)',
        borderTop: '1px solid #e2e8f0',
        padding: '8px 16px calc(8px + env(safe-area-inset-bottom, 0px))',
        zIndex: 100,
        boxShadow: '0 -4px 16px rgba(0,0,0,0.06)',
      }}>
        <div style={{ maxWidth: '640px', margin: '0 auto', display: 'flex', gap: '8px', alignItems: 'center' }}>
          
          <a
            href={KAKAO_LINK}
            style={{
              flex: 1.3,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              background: '#FEE500',
              color: '#181600',
              padding: '12px 0',
              borderRadius: '10px',
              fontWeight: 900,
              fontSize: '14px',
              textDecoration: 'none',
              boxShadow: '0 2px 8px rgba(254,229,0,0.25)',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 3C7.03 3 3 6.36 3 10.5c0 2.63 1.58 4.96 4 6.37L6 20l3.5-2.1c.8.17 1.63.26 2.5.26 4.97 0 9-3.36 9-7.5S16.97 3 12 3z" fill="#181600"/></svg>
            <span>카톡: {KAKAO_ID}</span>
          </a>

          <a
            href={PHONE_TEL}
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '5px',
              background: '#0f172a',
              color: '#ffffff',
              padding: '12px 0',
              borderRadius: '10px',
              fontWeight: 800,
              fontSize: '13.5px',
              textDecoration: 'none',
              boxShadow: '0 2px 8px rgba(15,23,42,0.15)',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" fill="#ffffff"/></svg>
            <span>전화예약</span>
          </a>

          <a
            href="https://wa.me/821066072239?text=Hello%20Abam%20Spa"
            target="_blank"
            rel="noreferrer"
            title="WhatsApp"
            style={{
              width: '42px',
              height: '42px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#25D366',
              color: '#ffffff',
              borderRadius: '10px',
              flexShrink: 0,
              textDecoration: 'none',
              boxShadow: '0 2px 8px rgba(37,211,102,0.3)',
            }}
          >
            <span style={{ fontSize: '18px' }}>💬</span>
          </a>

        </div>
      </aside>

    </div>
  );
}
