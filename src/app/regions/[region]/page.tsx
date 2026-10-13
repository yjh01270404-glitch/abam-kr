import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import AbamBrandLogo from '../../../components/AbamBrandLogo';
import AbamBottomBookingBar from '../../../components/AbamBottomBookingBar';

export const dynamic = 'force-static';
export const revalidate = 86400;

type RegionSlug = 'seoul' | 'gyeonggi-south' | 'gyeonggi-north' | 'incheon-bucheon';

interface HubConfig {
  slug: RegionSlug;
  name: string;
  badge: string;
  h1: string;
  title: string;
  description: string;
  keywords: string[];
  coverageSummary: string;
  operationHours: string;
  reservationTip: string;
  districts: { name: string; keyword: string; tag: string }[];
  faqs: { q: string; a: string }[];
  sisterHubs: { slug: RegionSlug; name: string }[];
}

const REGION_HUBS: Record<RegionSlug, HubConfig> = {
  'seoul': {
    slug: 'seoul',
    name: '서울 25개 자치구 전지역',
    badge: '100% 현장후불제 안심 케어',
    h1: '서울출장마사지 · 서울출장안마 25개 자치구 전역 1:1 방문 케어',
    title: '【서울출장마사지 1위】 서울 25개구 전역 [20대 ACE 총출동] | 100% 현장후불제 아름다운밤 [아밤.Abam.kr]',
    description: '서울출장마사지·서울출장안마 1위 아밤(Abam.kr)! 강남·서초·송파·마포·영등포·용산 등 서울 25개 자치구 전역 20대 전문 관리사가 고객님의 자택·호텔로 실시간 도로 교통 및 배차 일정에 맞춰 방문하는 100% 현장후불제 프리미엄 1:1 테라피 케어.',
    keywords: ['서울출장마사지', '서울출장안마', '서울출장홈타이', '강남출장마사지', '서초출장마사지', '송파출장마사지', '마포출장마사지', '영등포출장마사지', '용산출장마사지', '출장마사지 1위'],
    coverageSummary: '강남·서초·송파·용산·마포·영등포 등 서울특별시 25개 자치구 전역 1:1 방문 지원',
    operationHours: '18:00 접수 · 19:00 순차출발',
    reservationTip: '희망 시간 1시간 전 예약 권장',
    districts: [
      { name: '강남구', keyword: '강남출장마사지', tag: '테헤란로·역삼·삼성동' },
      { name: '서초구', keyword: '서초출장마사지', tag: '반포·교대·고속터미널' },
      { name: '송파구', keyword: '송파출장마사지', tag: '잠실·문정법조·가락' },
      { name: '마포구', keyword: '마포출장마사지', tag: '홍대·합정·상암DMC' },
      { name: '영등포구', keyword: '영등포출장마사지', tag: '여의도 금융가·당산' },
      { name: '용산구', keyword: '용산출장마사지', tag: '한남동·이태원·용산역' },
      { name: '성동구', keyword: '성수출장마사지', tag: '성수동 카페거리·왕십리' },
      { name: '광진구', keyword: '건대출장마사지', tag: '건대입구·구의·강변' },
      { name: '종로구', keyword: '종로출장마사지', tag: '광화문·인사동 호텔' },
      { name: '중구', keyword: '명동출장마사지', tag: '명동·을지로·시청' },
      { name: '강서구', keyword: '마곡출장마사지', tag: '마곡R&D·김포공항' },
      { name: '구로구', keyword: '구디출장마사지', tag: '구로디지털·신도림' },
    ],
    faqs: [
      { q: '서울 전지역 어디든 방문 관리가 가능한가요?', a: '네, 아밤은 서울 25개 자치구 전역 고객님의 자택, 아파트, 오피스텔, 호텔로 방문 관리를 제공합니다. 실시간 도로 교통 상황과 배차 일정에 따라 유동적이므로, 희망 시간 1시간 전 예약해 주시면 가장 수월합니다.' },
      { q: '서울 시내 호텔이나 모텔 투숙 중에도 이용할 수 있나요?', a: '물론입니다. 서울 전역 비즈니스호텔 및 부티크 호텔에서 편리하게 이용하실 수 있습니다. 호텔 보안 및 고객 안심을 위해 1층 로비에서 관리사를 대면하여 결제 후 객실로 함께 이동합니다.' },
      { q: '선입금이나 예약금을 요구하지 않나요?', a: '아밤은 100% 현장 대면후불제 원칙을 철저히 준수합니다. 관리사가 고객님 문 앞에 도착하여 대면하기 전까지 예약금, 출발비 등을 절대 요구하지 않습니다.' },
      { q: '서울 심야 시간대에도 예약이 가능한가요?', a: '예약 접수는 매일 저녁 18:00부터 가능하며, 매니저 출발은 19:00부터 익일 새벽 05:00 마감까지 연중무휴로 운영됩니다.' },
    ],
    sisterHubs: [
      { slug: 'gyeonggi-south', name: '경기 남부 (수원·분당·평택)' },
      { slug: 'gyeonggi-north', name: '경기 북부 (일산·파주·남양주)' },
      { slug: 'incheon-bucheon', name: '인천·부천 권역' },
    ],
  },
  'gyeonggi-south': {
    slug: 'gyeonggi-south',
    name: '경기 남부 지역 (수원·분당·평택)',
    badge: '100% 현장후불제 안심 케어',
    h1: '경기남부 출장마사지 (수원·분당·성남·화성·동탄·평택·용인)',
    title: '【경기남부 출장마사지 1위】 수원·성남·분당·화성·동탄·평택 [20대 ACE] | 아름다운밤 [아밤.Abam.kr]',
    description: '경기남부 출장마사지·출장안마 1위 아밤(Abam.kr)! 수원, 분당, 판교, 화성 동탄, 평택, 용인, 안양 전역 20대 전문 관리사가 자택 및 호텔로 실시간 교통과 배차 동선에 맞춰 방문하는 100% 현장후불제 안심 테라피.',
    keywords: ['경기출장마사지', '수원출장마사지', '분당출장마사지', '판교출장마사지', '동탄출장마사지', '화성출장마사지', '평택출장마사지', '용인출장마사지', '안양출장마사지'],
    coverageSummary: '수원·분당·판교·성남·동탄·화성·평택·용인·안양·안산·시흥 전역 커버',
    operationHours: '18:00 접수 · 19:00 순차출발',
    reservationTip: '희망 시간 1시간 전 예약 권장',
    districts: [
      { name: '수원시', keyword: '수원출장마사지', tag: '인계동·영통·광교신도시' },
      { name: '성남/분당', keyword: '분당출장마사지', tag: '판교테크노·정자·서현' },
      { name: '화성/동탄', keyword: '동탄출장마사지', tag: '동탄 1·2신도시·반월' },
      { name: '평택시', keyword: '평택출장마사지', tag: '고덕국제화·송탄·평택역' },
      { name: '용인시', keyword: '용인출장마사지', tag: '수지구·기흥구·동백' },
      { name: '안양시', keyword: '안양출장마사지', tag: '평촌스마트스퀘어·범계' },
      { name: '안산시', keyword: '안산출장마사지', tag: '중앙동·고잔신도시·선부' },
      { name: '시흥시', keyword: '시흥출장마사지', tag: '배곧신도시·정왕·은계' },
      { name: '광명시', keyword: '광명출장마사지', tag: '철산·KTX광명역·일직' },
    ],
    faqs: [
      { q: '판교 테크노밸리나 광교 신도시 오피스텔도 방문 가능한가요?', a: '네, 판교, 분당 정자, 광교, 동탄 신도시 등 경기 남부 주요 거점 어디든 방문 관리가 가능합니다. 실시간 고속화도로 교통량에 따라 소요 시간이 달라지므로 1시간 전 사전 예약을 권장해 드립니다.' },
      { q: '평택 고덕 신도시 및 평택역 인근 방문이 가능한가요?', a: '네, 평택 고덕 삼성전자 캠퍼스 및 송탄, 평택역 일대 자택과 호텔로 방문 관리를 진행해 드립니다.' },
    ],
    sisterHubs: [
      { slug: 'seoul', name: '서울 25개 자치구 전지역' },
      { slug: 'gyeonggi-north', name: '경기 북부 (일산·파주·남양주)' },
      { slug: 'incheon-bucheon', name: '인천·부천 권역' },
    ],
  },
  'gyeonggi-north': {
    slug: 'gyeonggi-north',
    name: '경기 북부 지역 (일산·파주·남양주)',
    badge: '100% 현장후불제 안심 케어',
    h1: '경기북부 출장마사지 (고양·일산·파주·의정부·남양주·구리)',
    title: '【경기북부 출장마사지 1위】 고양·일산·파주·의정부·남양주 [20대 ACE] | 아름다운밤 [아밤.Abam.kr]',
    description: '경기북부 출장마사지·출장안마 1위 아밤(Abam.kr)! 고양, 일산 킨텍스, 파주 운정, 의정부, 남양주 다산, 구리 전역 20대 전문 관리사의 1:1 방문 홈케어. 100% 현장후불제.',
    keywords: ['경기북부출장마사지', '일산출장마사지', '고양출장마사지', '파주출장마사지', '의정부출장마사지', '남양주출장마사지', '구리출장마사지'],
    coverageSummary: '고양·일산·파주·의정부·남양주·구리·양주 전역 커버',
    operationHours: '18:00 접수 · 19:00 순차출발',
    reservationTip: '희망 시간 1시간 전 예약 권장',
    districts: [
      { name: '고양/일산', keyword: '일산출장마사지', tag: '킨텍스·정발산·백석·주엽' },
      { name: '파주시', keyword: '파주출장마사지', tag: '운정신도시·금촌·문산' },
      { name: '의정부시', keyword: '의정부출장마사지', tag: '의정부역·민락2지구·금오' },
      { name: '남양주시', keyword: '남양주출장마사지', tag: '다산신도시·별내·호평' },
      { name: '구리시', keyword: '구리출장마사지', tag: '구리역·수택동·갈매' },
    ],
    faqs: [
      { q: '일산 킨텍스 행사 출장객 호텔 방문이 가능한가요?', a: '네, 킨텍스 주변 호텔 및 레지던스에서 피로를 풀고자 하시는 출장객분들의 이용률이 높습니다. 100% 현장 대면후불제로 안심 예약하실 수 있습니다.' },
      { q: '파주 운정 및 남양주 다산 신도시도 방문되나요?', a: '네, 신도시 아파트 단지 및 오피스텔 어디든 자택 방문이 원활하게 지원됩니다.' },
    ],
    sisterHubs: [
      { slug: 'seoul', name: '서울 25개 자치구 전지역' },
      { slug: 'gyeonggi-south', name: '경기 남부 (수원·분당·평택)' },
      { slug: 'incheon-bucheon', name: '인천·부천 권역' },
    ],
  },
  'incheon-bucheon': {
    slug: 'incheon-bucheon',
    name: '인천·부천 권역 안내',
    badge: '100% 현장후불제 안심 케어',
    h1: '인천·부천 출장마사지 (부평·송도·청라·구월·부천 전역)',
    title: '【인천·부천 출장마사지 1위】 부평·송도·청라·부천 전역 [20대 ACE] | 아름다운밤 [아밤.Abam.kr]',
    description: '인천·부천 출장마사지·출장안마 1위 아밤(Abam.kr)! 부평, 송도국제도시, 청라, 남동구 구월동, 부천 신중동 전역 20대 전문 관리사가 자택 및 호텔로 실시간 배차 일정에 맞춰 방문하는 100% 현장후불제 프리미엄 테라피.',
    keywords: ['인천출장마사지', '부천출장마사지', '부평출장마사지', '송도출장마사지', '청라출장마사지', '구월동출장마사지'],
    coverageSummary: '부평·송도·청라·구월·연수·계양 및 부천 중동·상동 전역 커버',
    operationHours: '18:00 접수 · 19:00 순차출발',
    reservationTip: '희망 시간 1시간 전 예약 권장',
    districts: [
      { name: '인천 부평구', keyword: '부평출장마사지', tag: '부평역·테마거리·갈산' },
      { name: '송도국제도시', keyword: '송도출장마사지', tag: '센트럴파크·컨벤시아 호텔' },
      { name: '청라국제도시', keyword: '청라출장마사지', tag: '커낼웨이·호수공원 오피스텔' },
      { name: '인천 남동구', keyword: '구월동출장마사지', tag: '구월동 로데오·논현' },
      { name: '부천시', keyword: '부천출장마사지', tag: '신중동역·상동역·부천역' },
    ],
    faqs: [
      { q: '송도 특급호텔 및 오피스텔 투숙객도 예약 가능한가요?', a: '네, 송도 센트럴파크 일대 호텔 및 랜드마크시티 오피스텔 모두 방문 접수가 가능합니다.' },
      { q: '부천 전역 대면결제 방식으로 진행되나요?', a: '네, 신중동, 상동, 역곡 등 부천 전역 관리사가 문 앞에 도착하여 대면 후 결제하는 100% 안심 시스템입니다.' },
    ],
    sisterHubs: [
      { slug: 'seoul', name: '서울 25개 자치구 전지역' },
      { slug: 'gyeonggi-south', name: '경기 남부 (수원·분당·평택)' },
      { slug: 'gyeonggi-north', name: '경기 북부 (일산·파주·남양주)' },
    ],
  },
};

export function generateStaticParams() {
  return [
    { region: 'seoul' },
    { region: 'gyeonggi-south' },
    { region: 'gyeonggi-north' },
    { region: 'incheon-bucheon' },
  ];
}

export async function generateMetadata({ params }: { params: Promise<{ region: string }> }): Promise<Metadata> {
  const { region } = await params;
  const hub = REGION_HUBS[region as RegionSlug];
  if (!hub) return { title: '지역 허브 | 아밤' };

  return {
    title: hub.title,
    description: hub.description,
    keywords: hub.keywords,
    alternates: {
      canonical: `https://abam.kr/regions/${hub.slug}`,
    },
    openGraph: {
      title: hub.title,
      description: hub.description,
      url: `https://abam.kr/regions/${hub.slug}`,
      siteName: '아름다운밤 [아밤.Abam.kr]',
      locale: 'ko_KR',
      type: 'website',
    },
  };
}

export default async function RegionHubPage({ params }: { params: Promise<{ region: string }> }) {
  const { region } = await params;
  const hub = REGION_HUBS[region as RegionSlug];
  if (!hub) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: '홈', item: 'https://abam.kr' },
          { '@type': 'ListItem', position: 2, name: '서비스 권역 허브', item: 'https://abam.kr/keywords' },
          { '@type': 'ListItem', position: 3, name: hub.name, item: `https://abam.kr/regions/${hub.slug}` },
        ],
      },
      {
        '@type': ['HealthAndBeautyBusiness', 'LocalBusiness'],
        '@id': `https://abam.kr/regions/${hub.slug}#business`,
        name: `${hub.name} - 아름다운밤 [아밤.Abam.kr]`,
        description: hub.description,
        url: `https://abam.kr/regions/${hub.slug}`,
        telephone: '010-6607-2239',
        priceRange: '80,000원 - 160,000원',
        areaServed: hub.districts.map((d) => ({ '@type': 'Place', name: d.name })),
      },
      {
        '@type': 'FAQPage',
        mainEntity: hub.faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
    ],
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0c0d11', color: '#ffffff', fontFamily: '-apple-system, BlinkMacSystemFont, "Pretendard", sans-serif', paddingBottom: '120px' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* 헤더 */}
      <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(12,13,17,0.96)', borderBottom: '1px solid #282b36', padding: '12px 16px' }}>
        <div style={{ maxWidth: '860px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <AbamBrandLogo size="header" />
          <div style={{ display: 'flex', gap: '8px' }}>
            <Link href="/keywords" style={{ fontSize: '13px', color: '#cbd5e1', textDecoration: 'none', padding: '5px 10px', background: '#1c1f28', borderRadius: '6px', border: '1px solid #3a3f50' }}>전체 지역</Link>
            <Link href="/" style={{ fontSize: '13px', color: '#1a1204', fontWeight: 800, textDecoration: 'none', padding: '5px 10px', background: '#f59e0b', borderRadius: '6px' }}>메인홈</Link>
          </div>
        </div>
      </header>

      {/* 브레드크럼 */}
      <div style={{ maxWidth: '860px', margin: '14px auto 0', padding: '0 16px', fontSize: '12px', color: '#94a3b8' }}>
        <Link href="/" style={{ color: '#94a3b8', textDecoration: 'none' }}>홈</Link> ›{' '}
        <Link href="/keywords" style={{ color: '#94a3b8', textDecoration: 'none' }}>지역 디렉터리</Link> ›{' '}
        <span style={{ color: '#fef08a', fontWeight: 700 }}>{hub.name}</span>
      </div>

      {/* 메인 히어로 컨테이너 */}
      <main style={{ maxWidth: '860px', margin: '20px auto 0', padding: '0 16px 100px' }}>
        <div style={{ background: '#15171e', border: '1px solid #282b36', borderRadius: '14px', padding: '28px 22px', textAlign: 'center', marginBottom: '24px' }}>
          <div style={{ display: 'inline-block', background: 'rgba(245, 158, 11, 0.15)', border: '1px solid rgba(245, 158, 11, 0.35)', color: '#fef08a', fontSize: '13px', fontWeight: 800, padding: '4px 12px', borderRadius: '999px', marginBottom: '14px' }}>
            {hub.badge}
          </div>
          <h1 style={{ fontSize: '26px', fontWeight: 900, lineHeight: 1.35, color: '#ffffff', margin: '0 0 14px' }}>
            {hub.h1}
          </h1>
          <p style={{ fontSize: '15px', color: '#cbd5e1', lineHeight: 1.7, margin: '0 auto 20px', maxWidth: '680px', wordBreak: 'keep-all' }}>
            {hub.description}
          </p>

          {/* 핵심 지표 3박스 */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px', marginTop: '18px' }}>
            <div style={{ background: '#1c1f28', padding: '12px 14px', borderRadius: '8px', border: '1px solid #3a3f50' }}>
              <div style={{ fontSize: '12px', color: '#94a3b8' }}>운영 및 출발 시간</div>
              <div style={{ fontSize: '16px', fontWeight: 900, color: '#f59e0b', marginTop: '2px' }}>{hub.operationHours}</div>
            </div>
            <div style={{ background: '#1c1f28', padding: '12px 14px', borderRadius: '8px', border: '1px solid #3a3f50' }}>
              <div style={{ fontSize: '12px', color: '#94a3b8' }}>예약 타이밍 팁</div>
              <div style={{ fontSize: '16px', fontWeight: 900, color: '#fef08a', marginTop: '2px' }}>{hub.reservationTip}</div>
            </div>
            <div style={{ background: '#1c1f28', padding: '12px 14px', borderRadius: '8px', border: '1px solid #3a3f50' }}>
              <div style={{ fontSize: '12px', color: '#94a3b8' }}>안심 결제 원칙</div>
              <div style={{ fontSize: '16px', fontWeight: 900, color: '#10b981', marginTop: '2px' }}>100% 현장후불제</div>
            </div>
          </div>
        </div>

        {/* 세부 자치구/지역별 안내 */}
        <section style={{ margin: '36px 0' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 900, color: '#ffffff', marginBottom: '14px', borderLeft: '4px solid #e11d48', paddingLeft: '10px' }}>
            {hub.name} 세부 지역 안내 (1:1 방문 맞춤 케어)
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '12px' }}>
            {hub.districts.map((d) => (
              <Link
                key={d.name}
                href={`/seo/${encodeURIComponent(d.keyword)}`}
                style={{
                  textDecoration: 'none',
                  background: '#15171e',
                  border: '1px solid #282b36',
                  borderRadius: '10px',
                  padding: '14px 16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                  transition: 'border-color 0.15s',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '16px', fontWeight: 800, color: '#fef08a' }}>{d.name}</span>
                  <span style={{ fontSize: '11.5px', color: '#10b981', fontWeight: 700 }}>1:1 방문 맞춤</span>
                </div>
                <div style={{ fontSize: '12.5px', color: '#94a3b8' }}>{d.tag}</div>
                <div style={{ fontSize: '12px', color: '#f59e0b', marginTop: '4px', fontWeight: 700 }}>
                  {d.keyword} 상세 보기 →
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* FAQ 영역 */}
        <section style={{ margin: '36px 0', background: '#15171e', border: '1px solid #282b36', borderRadius: '12px', padding: '22px 20px' }}>
          <h2 style={{ fontSize: '19px', fontWeight: 900, color: '#ffffff', marginBottom: '16px', borderLeft: '4px solid #f59e0b', paddingLeft: '10px' }}>
            {hub.name} 자주 묻는 질문 (FAQ)
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {hub.faqs.map((f, i) => (
              <div key={i} style={{ borderBottom: i < hub.faqs.length - 1 ? '1px solid #282b36' : 'none', paddingBottom: '12px' }}>
                <div style={{ fontSize: '15.5px', fontWeight: 800, color: '#fef08a', marginBottom: '6px' }}>Q. {f.q}</div>
                <div style={{ fontSize: '14px', color: '#cbd5e1', lineHeight: 1.65 }}>A. {f.a}</div>
              </div>
            ))}
          </div>
        </section>

        {/* 다른 지역 안내 바로가기 */}
        <section style={{ margin: '36px 0', padding: '20px 18px', background: '#12141c', border: '1px solid #282b36', borderRadius: '12px' }}>
          <div style={{ fontSize: '14px', fontWeight: 800, color: '#ffffff', marginBottom: '10px' }}>서울·경기 다른 지역 안내 바로가기</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {hub.sisterHubs.map((s) => (
              <Link
                key={s.slug}
                href={`/regions/${s.slug}`}
                style={{
                  fontSize: '13px',
                  color: '#cbd5e1',
                  textDecoration: 'none',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  background: '#1c1f28',
                  border: '1px solid #3a3f50',
                }}
              >
                {s.name} →
              </Link>
            ))}
          </div>
        </section>
      </main>

      {/* 실시간 하단 고정 전화/문자 예약 바 */}
      <AbamBottomBookingBar smsMessage={`[아밤 ${hub.name} 예약문의] 코스 및 예약 문의드립니다.`} />
    </div>
  );
}
