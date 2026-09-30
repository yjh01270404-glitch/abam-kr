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
    <div style={{ minHeight: '100vh', background: '#ffffff', color: '#202124', fontFamily: '-apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo", "Malgun Gothic", "Pretendard", sans-serif', WebkitFontSmoothing: 'antialiased' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      
      {/* 1. 포털 검색 헤더 */}
      <header style={{ background: '#ffffff', borderBottom: '1px solid #ebebeb', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: '640px', margin: '0 auto', padding: '12px 16px 8px' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', background: '#ffffff', border: '1px solid #dfe1e5', borderRadius: '24px', padding: '8px 14px', gap: '10px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
            <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
              <span style={{ fontSize: '16px', fontWeight: 800, color: '#03c75a', letterSpacing: '-0.02em' }}>N</span>
            </Link>
            <div style={{ flex: 1, fontSize: '14px', fontWeight: 600, color: '#202124', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              서울·경기·인천 서비스 지역 색인
            </div>
            <Link href="/" style={{ fontSize: '13px', color: '#1a73e8', fontWeight: 600, textDecoration: 'none' }}>
              메인홈
            </Link>
          </div>

          {/* 브레드크럼 */}
          <nav aria-label="breadcrumb" style={{ padding: '8px 2px 2px' }}>
            <ol style={{ display: 'flex', gap: '6px', listStyle: 'none', margin: 0, padding: 0, fontSize: '11px', color: '#70757a' }}>
              <li><Link href="/" style={{ color: '#70757a', textDecoration: 'none' }}>홈</Link></li>
              <li>›</li>
              <li style={{ color: '#202124', fontWeight: 600 }}>서비스 지역 디렉터리</li>
            </ol>
          </nav>
        </div>
      </header>

      {/* 2. 메인 컨테이너 (순백색 + 여백) */}
      <main style={{ maxWidth: '640px', margin: '0 auto', background: '#ffffff', padding: '0 16px 120px' }}>
        
        {/* 상단 개요 */}
        <section style={{ padding: '18px 0 20px', borderBottom: '1px solid #f1f3f4' }}>
          <div style={{ fontSize: '12px', color: '#4d5156', marginBottom: '4px' }}>
            https://abam.kr › 서비스 지역 색인 디렉터리
          </div>

          <h1 style={{ fontSize: '20px', fontWeight: 700, margin: '0 0 10px 0', lineHeight: 1.35, color: '#1a0dab' }}>
            수도권 출장 홈타이·테라피 지역별 안내
          </h1>

          <div style={{ fontSize: '13px', color: '#008744', fontWeight: 600, marginBottom: '8px' }}>
            ● 서울·경기·인천 전 지역 30분 내외 방문 · 선입금 0원 100% 현장 대면결제
          </div>

          <p style={{ fontSize: '14px', lineHeight: 1.6, color: '#3c4043', margin: 0, wordBreak: 'keep-all' }}>
            원하시는 지역을 선택하시면 해당 지역의 상세 정찰 가격표 및 24시간 실시간 배차 도착 시간을 확인하실 수 있습니다.
          </p>
        </section>

        {/* 지역별 텍스트 링크 리스트 (박스 없는 클린 리스트) */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {GROUPS.map((g, idx) => {
            const matched = ALL_POOL.filter(kw => g.keys.some(k => kw.includes(k)));
            const unique = Array.from(new Set(matched));
            return (
              <section key={idx} style={{ padding: '18px 0', borderBottom: '1px solid #f1f3f4' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <h2 style={{ fontSize: '15px', fontWeight: 700, color: '#202124', margin: 0 }}>
                    {g.label}
                  </h2>
                  <span style={{ fontSize: '12px', color: '#5f6368' }}>
                    {unique.length}개 키워드
                  </span>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 14px' }}>
                  {unique.slice(0, 30).map((kw, kIdx) => {
                    const slug = encodeURIComponent(kw.replace(/\s+/g, '-'));
                    return (
                      <Link
                        key={kIdx}
                        href={`/seo/${slug}`}
                        style={{
                          fontSize: '13px',
                          color: '#1a0dab',
                          textDecoration: 'none',
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
        <footer style={{ padding: '24px 0', fontSize: '11px', color: '#70757a', lineHeight: 1.7 }}>
          <div style={{ fontWeight: 700, color: '#202124', fontSize: '12px', marginBottom: '4px' }}>
            아밤 (ABAM) 홈타이·테라피 공식 온라인 센터
          </div>
          <div>대표 상담 전화: {PHONE_NUM} · 24시간 연중무휴 상시 운영</div>
          <div>결제 정책: 선입금 0원 · 관리사 방문 후 100% 현장 대면결제 준수</div>
          <div style={{ marginTop: '8px' }}>
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
        background: '#ffffff',
        borderTop: '1px solid #dadce0',
        padding: '10px 16px calc(10px + env(safe-area-inset-bottom, 0px))',
        zIndex: 100,
        boxShadow: '0 -2px 6px rgba(0,0,0,0.04)',
      }}>
        <div style={{ maxWidth: '640px', margin: '0 auto', display: 'flex', gap: '10px' }}>
          
          <a
            href={KAKAO_LINK}
            style={{
              flex: 1.2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#FEE500',
              border: '1px solid #FEE500',
              color: '#181600',
              padding: '12px 0',
              borderRadius: '6px',
              fontWeight: 800,
              fontSize: '14px',
              textDecoration: 'none',
              cursor: 'pointer',
            }}
          >
            <span>카톡 바로연결 (ID: {KAKAO_ID})</span>
          </a>

          <a
            href={PHONE_TEL}
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#090d16',
              border: '1px solid #d4af37',
              color: '#ffffff',
              padding: '12px 0',
              borderRadius: '6px',
              fontWeight: 700,
              fontSize: '14px',
              textDecoration: 'none',
              cursor: 'pointer',
            }}
          >
            <span>즉시 전화연결</span>
          </a>

        </div>
      </aside>

    </div>
  );
}
