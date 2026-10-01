import { Metadata } from 'next';
import Link from 'next/link';
import { SEOUL_SEO, GYEONGGI_SEO, INCHEON_SEO, COURSE_SEO, SITUATION_SEO } from '../../lib/seo-keywords';

export const metadata: Metadata = {
  title: '수도권 출장 홈타이·테라피 지역별 안내 | 아밤 공식 포털',
  description: '서울·경기·인천 399개동 출장 홈케어 테라피 지역별 안내. 선입금 0원, 관리사 도착 후 100% 현장 대면결제. 타이·아로마·힐링 VIP 정찰제.',
  keywords: '출장홈케어,홈타이,방문마사지,선입금없는출장,현장대면결제,서울출장마사지,경기출장홈타이,인천출장안마',
  alternates: { canonical: 'https://abam.kr/keywords' },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1 } },
  openGraph: {
    title: '수도권 출장 홈타이·테라피 지역별 안내 | 아밤 공식 포털',
    description: '서울·경기·인천 출장 홈케어. 선입금 0원 100% 현장 대면결제.',
    url: 'https://abam.kr/keywords',
    siteName: '아밤 공식 포털',
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
  { label: '경기 분당·판교·성남', keys: ['분당','판교','성남','정자','서현','야탑','모란'] },
  { label: '경기 수원·용인·화성·동탄', keys: ['수원','광교','영통','용인','수지','기흥','동탄','화성'] },
  { label: '경기 일산·고양·부천·안양', keys: ['일산','고양','화정','부천','중동','안양','평촌','범계'] },
  { label: '경기 하남·구리·남양주·파주·김포', keys: ['하남','미사','구리','남양주','다산','별내','파주','운정','김포'] },
  { label: '경기 평택·오산·의정부·군포·안산', keys: ['평택','송탄','오산','의정부','군포','산본','안산','고잔','시흥'] },
  { label: '인천 전지역 (송도·청라·부평)', keys: ['인천','송도','청라','부평','계양','연수','구월'] },
  { label: '코스별 전문 서비스', keys: ['힐링','VIP','아로마','타이','천연오일','건식','지압','림프','스트레칭'] },
  { label: '이용 환경 및 상황별', keys: ['호텔','모텔','오피스텔','원룸','자택','선입금없는','대면결제','24시','심야','야간'] },
];

export default function KeywordsPage() {
  const ALL_POOL = [...SEOUL_SEO, ...GYEONGGI_SEO, ...INCHEON_SEO, ...COURSE_SEO, ...SITUATION_SEO];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${SITE_URL}/keywords#cp`,
    name: '수도권 출장 홈타이·테라피 지역별 안내 아밤',
    url: `${SITE_URL}/keywords`,
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: '아밤 홈', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: '서비스 지역', item: `${SITE_URL}/keywords` },
      ],
    },
  };

  return (
    <div style={{ minHeight: '100vh', background: '#ffffff', color: '#0f172a', fontFamily: '-apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo", "Malgun Gothic", "Pretendard", sans-serif', WebkitFontSmoothing: 'antialiased' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      
      {/* 1. 상단 클린 헤더 */}
      <header style={{ background: 'rgba(255, 255, 255, 0.98)', backdropFilter: 'blur(12px)', borderBottom: '1px solid #e2e8f0', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: '640px', margin: '0 auto', padding: '12px 18px 10px' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '17px', fontWeight: 900, color: '#0f172a', letterSpacing: '-0.3px' }}>아름다운 밤</span>
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#b45309', backgroundColor: '#fef3c7', padding: '2px 6px', borderRadius: '4px' }}>Abam</span>
            </Link>
            <Link href="/" style={{ fontSize: '12px', color: '#0f172a', fontWeight: 800, textDecoration: 'none', padding: '4px 10px', borderRadius: '6px', backgroundColor: '#f1f5f9' }}>
              메인홈
            </Link>
          </div>

          {/* 브레드크럼 */}
          <nav aria-label="breadcrumb">
            <ol style={{ display: 'flex', gap: '6px', listStyle: 'none', margin: 0, padding: 0, fontSize: '11.5px', color: '#64748b' }}>
              <li><Link href="/" style={{ color: '#64748b', textDecoration: 'none' }}>홈</Link></li>
              <li>›</li>
              <li style={{ color: '#0f172a', fontWeight: 800 }}>서비스 지역 디렉터리</li>
            </ol>
          </nav>
        </div>
      </header>

      {/* 2. 메인 컨테이너 */}
      <main style={{ maxWidth: '640px', margin: '0 auto', background: '#ffffff', padding: '0 18px 120px' }}>
        
        {/* 상단 개요 */}
        <section style={{ padding: '20px 0', borderBottom: '1px solid #f1f5f9' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 800, color: '#b45309', backgroundColor: '#fef3c7', padding: '4px 12px', borderRadius: '20px', marginBottom: '12px' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#16a34a' }} />
            서울 전역 20~30분 신속 방문 · 선입금 0원 100% 현장 대면결제
          </div>

          <h1 style={{ fontSize: '22px', fontWeight: 900, margin: '0 0 8px 0', lineHeight: 1.35, color: '#0f172a' }}>
            수도권 출장 홈타이·테라피 지역별 안내
          </h1>

          <p style={{ fontSize: '13px', lineHeight: 1.6, color: '#475569', margin: 0, wordBreak: 'keep-all' }}>
            원하시는 지역을 선택하시면 해당 지역의 상세 정찰 가격표 및 24시간 실시간 배차 도착 시간을 확인하실 수 있습니다.
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
          <div><strong>아름다운 밤 타이 홈케어 (Abam)</strong> · 수도권 전역 24시간 1:1 방문 홈케어</div>
          <div>대표 상담 전화: {PHONE_NUM} · 연중무휴 상시 운영</div>
          <div>결제 정책: 선입금 0원 · 관리사 방문 후 100% 현장 대면결제 준수</div>
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
