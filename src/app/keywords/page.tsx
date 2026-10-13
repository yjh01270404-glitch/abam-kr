import { Metadata } from 'next';
import Link from 'next/link';
import { SERVED_KEYWORDS } from '../../lib/seo-keywords';
import AbamBrandLogo from '../../components/AbamBrandLogo';
import AbamBottomBookingBar from '../../components/AbamBottomBookingBar';

export const metadata: Metadata = {
  title: '서울·경기 지역별 프라이빗 1:1 방문 홈케어 안내 | Abam.kr',
  description: '서울 25개 구 및 경기(수원·분당·판교·일산·부천·평택·동탄 등) 전역 지역별 안내. 자택·호텔 1:1 방문 맞춤 케어, 100% 현장 후불제. 타이·아로마·스페셜 코스.',
  keywords: '서울출장안마,서울출장마사지,서울출장홈타이,강남출장안마,강남출장마사지,강남출장홈타이,호텔출장안마,출장서비스,방문마사지,홈타이,Abam.kr',
  alternates: { canonical: 'https://abam.kr/keywords' },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1 } },
  openGraph: {
    title: '서울·경기 지역별 프라이빗 1:1 방문 홈케어 안내 | Abam.kr',
    description: '서울·경기 전역 · 자택 · 호텔 1:1 방문 맞춤 케어. 100% 후불제.',
    url: 'https://abam.kr/keywords',
    siteName: 'Abam.kr',
    locale: 'ko_KR',
  },
};

const SITE_URL = 'https://abam.kr';
const SMS_HREF = 'sms:01066072239';
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
            <AbamBrandLogo size="compact" />
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
          <div className="abam-copperplate-en" style={{ fontSize: '18px', color: '#d97706', letterSpacing: '0.06em', marginBottom: '4px', lineHeight: 1.2 }}>
            Regional Directory · Beautiful Night
          </div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 800, color: '#b45309', backgroundColor: '#fef3c7', padding: '4px 12px', borderRadius: '20px', marginBottom: '12px' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#16a34a' }} />
            서울·경기 전역 · 18시 접수 19시 순차출발 · 100% 현장후불제
          </div>

          <h1 style={{ fontSize: '22px', fontWeight: 900, margin: '0 0 8px 0', lineHeight: 1.35, color: '#0f172a' }}>
            서울·경기 지역별 프라이빗 1:1 방문 홈케어 안내
          </h1>

          <p style={{ fontSize: '13.5px', lineHeight: 1.7, color: '#475569', margin: 0, wordBreak: 'keep-all' }}>
            원하시는 지역을 선택하시면 해당 지역의 주요 역·생활권 정보와 코스 요금표, 이용 절차를 확인하실 수 있습니다. Abam.kr(<span className="abam-script-font" style={{ fontSize: '17px', color: '#d97706', fontStyle: 'italic' }}>아름다운 밤</span>)은 서울 25개 구 및 경기 전역 자택·호텔로 신속하게 방문하는 프라이빗 1:1 홈케어입니다.
          </p>
        </section>

        {/* 수도권 주요 권역 바로가기 */}
        <section style={{ padding: '16px 0', borderBottom: '2px solid #e2e8f0' }}>
          <div style={{ fontSize: '14.5px', fontWeight: 800, color: '#0f172a', marginBottom: '10px' }}>
            📍 수도권 주요 권역별 안내 (1:1 방문 맞춤 케어)
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <Link
              href="/regions/seoul"
              style={{
                textDecoration: 'none',
                background: '#0f172a',
                color: '#ffffff',
                padding: '14px 12px',
                borderRadius: '10px',
                border: '1px solid #1e293b',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
              }}
            >
              <strong style={{ fontSize: '15px', color: '#ffffff' }}>서울 25개 자치구</strong>
              <span style={{ fontSize: '12px', color: '#94a3b8' }}>강남·서초·송파·마포·영등포·용산</span>
            </Link>

            <Link
              href="/regions/gyeonggi-south"
              style={{
                textDecoration: 'none',
                background: '#0f172a',
                color: '#ffffff',
                padding: '14px 12px',
                borderRadius: '10px',
                border: '1px solid #1e293b',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
              }}
            >
              <strong style={{ fontSize: '15px', color: '#ffffff' }}>경기 남부 지역</strong>
              <span style={{ fontSize: '12px', color: '#94a3b8' }}>수원·분당·판교·동탄·평택·용인</span>
            </Link>

            <Link
              href="/regions/gyeonggi-north"
              style={{
                textDecoration: 'none',
                background: '#0f172a',
                color: '#ffffff',
                padding: '14px 12px',
                borderRadius: '10px',
                border: '1px solid #1e293b',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
              }}
            >
              <strong style={{ fontSize: '15px', color: '#ffffff' }}>경기 북부 지역</strong>
              <span style={{ fontSize: '12px', color: '#94a3b8' }}>일산·고양·파주·의정부·남양주</span>
            </Link>

            <Link
              href="/regions/incheon-bucheon"
              style={{
                textDecoration: 'none',
                background: '#0f172a',
                color: '#ffffff',
                padding: '14px 12px',
                borderRadius: '10px',
                border: '1px solid #1e293b',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
              }}
            >
              <strong style={{ fontSize: '15px', color: '#ffffff' }}>인천·부천 권역</strong>
              <span style={{ fontSize: '12px', color: '#94a3b8' }}>부평·송도·청라·구월·부천 전역</span>
            </Link>
          </div>
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
          <div>대표 상담 전화: {PHONE_NUM} · 예약 18:00부터 · 출발 19:00부터 · 마지막 예약 05:00 마감</div>
          <div>코스: 타이 · 아로마 · 스페셜 (60분 / 90분 / 120분)</div>
          <div style={{ marginTop: '6px' }}>
            © ABAM. All rights reserved.
          </div>
        </footer>

      </main>

      {/* 3. 실시간 하단 고정 전화/문자 예약 바 */}
      <AbamBottomBookingBar smsMessage="[아밤 전체지역 문의] 코스 및 예약 문의드립니다." />

    </div>
  );
}
