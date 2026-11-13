import { Metadata } from 'next';
import Link from 'next/link';
import { INDEXABLE_KEYWORDS } from '../../lib/seo-keywords';
import AbamBrandLogo from '../../components/AbamBrandLogo';
import AbamBottomBookingBar from '../../components/AbamBottomBookingBar';

export const metadata: Metadata = {
  title: '서울·경기·인천 수도권 전 지역 500여 거점 출장마사지 · 출장홈타이 안내 | Abam.kr',
  description: '서울 25개 자치구, 경기 남부·북부 28개 시·군, 인천·부천 전역 1:1 방문 맞춤 케어. 자택·오피스텔·호텔 20~30분 내 신속 방문. 선입금 0원 100% 현장 대면결제.',
  keywords: '출장마사지,서울출장마사지,경기출장마사지,인천출장마사지,강남출장마사지,수원출장마사지,분당출장마사지,일산출장마사지,부천출장마사지,호텔출장마사지,출장홈타이,선입금없는출장마사지,24시출장마사지,Abam.kr',
  alternates: { canonical: 'https://abam.kr/keywords' },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
  openGraph: {
    title: '서울·경기·인천 수도권 전 지역 500여 거점 출장마사지 · 출장홈타이 안내 | Abam.kr',
    description: '서울·경기·인천 전역 자택·호텔 1:1 방문 맞춤 케어. 100% 현장 후불제.',
    url: 'https://abam.kr/keywords',
    siteName: 'Abam.kr',
    locale: 'ko_KR',
  },
};

const SITE_URL = 'https://abam.kr';
const PHONE_NUM = '010-6607-2239';

type Group = { label: string; keys: string[] };
const GROUPS: Group[] = [
  {
    label: '서울 강남·서초·송파·강동권',
    keys: ['강남', '서초', '송파', '잠실', '반포', '역삼', '논현', '청담', '압구정', '선릉', '방배', '교대', '문정', '가락', '위례', '강동', '천호', '암사', '명일'],
  },
  {
    label: '서울 마포·용산·영등포·여의도권',
    keys: ['마포', '홍대', '합정', '상암', '망원', '연남', '공덕', '용산', '이태원', '한남', '삼각지', '영등포', '여의도', '당산', '신도림'],
  },
  {
    label: '서울 성동·광진·동작·관악·강서·구로권',
    keys: ['성동', '성수', '왕십리', '뚝섬', '광진', '건대', '자양', '구의', '동작', '사당', '이수', '관악', '신림', '봉천', '낙성대', '강서', '화곡', '마곡', '발산', '양천', '목동', '신정', '구로', '금천', '가산'],
  },
  {
    label: '서울 종로·중구·서대문·은평·노원·강북권',
    keys: ['종로', '광화문', '인사동', '중구', '을지로', '충무로', '명동', '남대문', '동대문', '서대문', '신촌', '은평', '연신내', '응암', '녹번', '노원', '상계', '강북', '미아', '수유', '도봉', '쌍문', '창동', '성북', '길음', '종암', '중랑', '면목', '망우'],
  },
  {
    label: '경기 성남·분당·판교·하남·광주',
    keys: ['분당', '판교', '정자', '서현', '이매', '야탑', '성남', '모란', '하남', '미사', '구리', '교문', '남양주', '다산', '별내'],
  },
  {
    label: '경기 수원·화성·동탄·평택·오산',
    keys: ['수원', '인계동', '광교', '영통', '권선', '팔달', '장안', '화성', '동탄', '병점', '오산', '평택', '송탄', '고덕'],
  },
  {
    label: '경기 용인·안양·군포·의왕·안산·시흥·광명',
    keys: ['용인', '수지', '기흥', '죽전', '동백', '처인', '안양', '평촌', '범계', '석수', '광명', '시흥', '정왕', '군포', '산본', '의왕', '안산', '고잔', '상록'],
  },
  {
    label: '경기 고양·일산·파주·김포·의정부',
    keys: ['일산', '고양', '화정', '식사', '마두', '주엽', '파주', '운정', '금촌', '김포', '한강신도시', '장기', '의정부'],
  },
  {
    label: '인천광역시 및 부천시 전역',
    keys: ['인천', '부평', '송도', '청라', '구월동', '주안', '부천', '중동', '상동', '소사'],
  },
  {
    label: '코스 및 테마별 방문 홈케어',
    keys: ['스페셜', '아로마', '타이', '오일', '감성', 'VIP', '천연', '정통', '전신', '딥티슈', '커플', '남성', '1인샵', '림프', '경락', '지압', '스트레칭', '홈케어', '홈타이'],
  },
  {
    label: '방문 장소 및 시간대별 특화',
    keys: ['호텔', '자택', '원룸', '오피스텔', '심야', '야간', '24시', '후불', '선입금', '새벽'],
  },
];

export default function KeywordsPage() {
  const ALL_POOL = INDEXABLE_KEYWORDS;

  // Track all categorized keys to collect any leftover uncategorized keywords
  const allGroupKeys = new Set<string>();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${SITE_URL}/keywords#cp`,
    name: '서울·경기·인천 지역별 출장마사지 · 출장홈타이 안내 Abam.kr',
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
    <div style={{ minHeight: '100vh', background: '#0a0e1a', color: '#f8fafc', fontFamily: '-apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo", "Malgun Gothic", "Pretendard", sans-serif', WebkitFontSmoothing: 'antialiased' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* 1. 상단 클린 헤더 */}
      <header style={{ background: '#0f172a', borderBottom: '1px solid #1e293b', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: '720px', margin: '0 auto', padding: '11px 16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
            <AbamBrandLogo size="compact" />
            <Link href="/" style={{ fontSize: '12px', color: '#0a0e17', fontWeight: 800, textDecoration: 'none', padding: '5px 12px', borderRadius: '6px', backgroundColor: '#c59b27' }}>
              메인홈 바로가기
            </Link>
          </div>

          <nav aria-label="breadcrumb">
            <ol style={{ display: 'flex', gap: '6px', listStyle: 'none', margin: 0, padding: 0, fontSize: '11.5px', color: '#94a3b8' }}>
              <li><Link href="/" style={{ color: '#94a3b8', textDecoration: 'none' }}>홈</Link></li>
              <li>›</li>
              <li style={{ color: '#c59b27', fontWeight: 800 }}>전체 서비스 지역 디렉토리</li>
            </ol>
          </nav>
        </div>
      </header>

      {/* 2. 메인 컨테이너 */}
      <main style={{ maxWidth: '720px', margin: '14px auto', background: '#0d1322', borderRadius: '12px', border: '1px solid #1e293b', padding: '18px 16px 110px' }}>
        <section style={{ padding: '8px 0 16px', borderBottom: '1px solid #1e293b' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 800, color: '#c59b27', backgroundColor: 'rgba(197, 155, 39, 0.12)', border: '1px solid rgba(197, 155, 39, 0.3)', padding: '4px 10px', borderRadius: '6px', marginBottom: '10px' }}>
            ★ 서울·경기·인천 320개 전 지역 · 30~40분 내 신속 방문 · 100% 현장 대면결제
          </div>

          <h1 style={{ fontSize: '21px', fontWeight: 900, margin: '0 0 8px 0', lineHeight: 1.35, color: '#ffffff' }}>
            수도권 전체 출장마사지 · 출장홈타이 서비스 지역
          </h1>

          <p style={{ fontSize: '13.5px', lineHeight: 1.65, color: '#94a3b8', margin: 0, wordBreak: 'keep-all' }}>
            계신 지역을 선택하시면 주요 권역 배차 안내와 정찰제 코스 요금표(타이 60분 8만 원~, 아로마 60분 9만 원~, 스페셜 60분 10만 원~)를 확인하실 수 있습니다. 선입금 및 예약금이 전혀 없는 100% 현장 후불제 시스템으로 안전하게 이용하세요.
          </p>
        </section>

        {/* 수도권 4대 핵심 권역 바로가기 */}
        <section style={{ padding: '16px 0', borderBottom: '1px solid #1e293b' }}>
          <div style={{ fontSize: '14px', fontWeight: 800, color: '#c59b27', marginBottom: '10px' }}>
            권역별 가이드
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
            <Link
              href="/regions/seoul"
              style={{
                textDecoration: 'none',
                background: '#161f33',
                border: '1px solid #1e293b',
                color: '#ffffff',
                padding: '12px',
                borderRadius: '8px',
                display: 'flex',
                flexDirection: 'column',
                gap: '3px',
              }}
            >
              <strong style={{ fontSize: '14px', color: '#c59b27' }}>서울 25개 자치구 →</strong>
              <span style={{ fontSize: '11.5px', color: '#94a3b8' }}>강남·서초·송파·마포·영등포·용산 전역</span>
            </Link>

            <Link
              href="/regions/gyeonggi-south"
              style={{
                textDecoration: 'none',
                background: '#161f33',
                border: '1px solid #1e293b',
                color: '#ffffff',
                padding: '12px',
                borderRadius: '8px',
                display: 'flex',
                flexDirection: 'column',
                gap: '3px',
              }}
            >
              <strong style={{ fontSize: '14px', color: '#c59b27' }}>경기 남부 권역 →</strong>
              <span style={{ fontSize: '11.5px', color: '#94a3b8' }}>수원·분당·판교·동탄·평택·용인·안양</span>
            </Link>

            <Link
              href="/regions/gyeonggi-north"
              style={{
                textDecoration: 'none',
                background: '#161f33',
                border: '1px solid #1e293b',
                color: '#ffffff',
                padding: '12px',
                borderRadius: '8px',
                display: 'flex',
                flexDirection: 'column',
                gap: '3px',
              }}
            >
              <strong style={{ fontSize: '14px', color: '#c59b27' }}>경기 북부 권역 →</strong>
              <span style={{ fontSize: '11.5px', color: '#94a3b8' }}>일산·고양·파주·의정부·남양주·구리</span>
            </Link>

            <Link
              href="/regions/incheon-bucheon"
              style={{
                textDecoration: 'none',
                background: '#161f33',
                border: '1px solid #1e293b',
                color: '#ffffff',
                padding: '12px',
                borderRadius: '8px',
                display: 'flex',
                flexDirection: 'column',
                gap: '3px',
              }}
            >
              <strong style={{ fontSize: '14px', color: '#c59b27' }}>인천·부천 권역 →</strong>
              <span style={{ fontSize: '11.5px', color: '#94a3b8' }}>부평·송도·청라·구월·부천 중동·상동</span>
            </Link>
          </div>
        </section>

        {/* 320개 전체 지역 및 키워드 링크 리스트 */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {GROUPS.map((g, idx) => {
            const matched = ALL_POOL.filter(kw => g.keys.some(k => kw.includes(k)));
            const unique = Array.from(new Set(matched));
            unique.forEach(k => allGroupKeys.add(k));

            if (unique.length === 0) return null;

            return (
              <section key={idx} style={{ padding: '16px 0', borderBottom: '1px solid #1e293b' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <h2 style={{ fontSize: '15px', fontWeight: 800, color: '#ffffff', margin: 0 }}>
                    {g.label}
                  </h2>
                  <span style={{ fontSize: '11.5px', color: '#c59b27', fontWeight: 700, backgroundColor: 'rgba(197, 155, 39, 0.1)', padding: '2px 8px', borderRadius: '4px' }}>
                    {unique.length}개 세부 안내
                  </span>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 8px' }}>
                  {unique.map((kw, kIdx) => {
                    const slug = encodeURIComponent(kw.replace(/\s+/g, '-'));
                    return (
                      <Link
                        key={kIdx}
                        href={`/seo/${slug}`}
                        style={{
                          fontSize: '12.5px',
                          color: '#e2e8f0',
                          textDecoration: 'none',
                          padding: '5px 9px',
                          backgroundColor: '#161f33',
                          border: '1px solid #1e293b',
                          borderRadius: '6px',
                          transition: 'background-color 0.15s ease',
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

          {/* Any remaining keywords in pool not matched above */}
          {(() => {
            const leftovers = ALL_POOL.filter(k => !allGroupKeys.has(k));
            if (leftovers.length === 0) return null;
            return (
              <section style={{ padding: '16px 0', borderBottom: '1px solid #1e293b' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <h2 style={{ fontSize: '15px', fontWeight: 800, color: '#ffffff', margin: 0 }}>
                    추가 추천 지역 및 테마
                  </h2>
                  <span style={{ fontSize: '11.5px', color: '#c59b27', fontWeight: 700 }}>
                    {leftovers.length}개 세부 안내
                  </span>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 8px' }}>
                  {leftovers.map((kw, kIdx) => {
                    const slug = encodeURIComponent(kw.replace(/\s+/g, '-'));
                    return (
                      <Link
                        key={kIdx}
                        href={`/seo/${slug}`}
                        style={{
                          fontSize: '12.5px',
                          color: '#e2e8f0',
                          textDecoration: 'none',
                          padding: '5px 9px',
                          backgroundColor: '#161f33',
                          border: '1px solid #1e293b',
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
          })()}
        </div>

        {/* 푸터 */}
        <footer style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid #1e293b', fontSize: '11.5px', color: '#94a3b8', lineHeight: 1.65 }}>
          <div><strong style={{ color: '#ffffff' }}>아밤 (Abam.kr)</strong> · 서울·경기·인천 1:1 방문 홈케어 공식 포털</div>
          <div>예약 및 상담 직통: {PHONE_NUM} · 18:00 예약 접수 · 19:00 출발 · 05:00 마감</div>
          <div>투명 정찰 요금제: A코스(로얄 타이) · B코스(힐링 아로마) · C코스(로얄 VIP) (60분 / 90분 / 120분) · 100% 현장 대면결제</div>
        </footer>
      </main>

      <AbamBottomBookingBar phone={PHONE_NUM} />
    </div>
  );
}
