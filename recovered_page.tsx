'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const KAKAO_URL = 'https://open.kakao.com/o/placeholder';
const PHONE_TEL = 'tel:010-0000-0000';
const PHONE_NUM = '010-0000-0000';

type CourseItem = {
  id: string;
  name: string;
  tag: string;
  badge: string;
  isVip?: boolean;
  img: string;
  subtitle: string;
  description: string;
  features: string[];
  recommend: string;
  prices: { time: string; price: string; isBest?: boolean }[];
};

const COURSES: CourseItem[] = [
  {
    id: 'thai',
    name: '타이 정통 테라피',
    tag: '왓포 왕실 정통 건식 수기',
    badge: '정통 왓포 수기',
    img: '/images/thai.jpg',
    subtitle: '전신 스트레칭 & 경혈 지압 딥티슈 케어',
    description: '오일을 사용하지 않고 편안한 순면 관리복을 착용한 상태에서 진행되는 왓포 정통 건식 수기 관리입니다. 체계적인 경혈 지압과 전신 관절 스트레칭을 통해 굳어있는 골반, 척추, 어깨 승모근의 깊은 피로를 시원하게 이완합니다.',
    features: ['오일 미사용 (순면 관리복)', '경혈 지압 & 딥티슈 압', '골반 및 척추 관절 교정 스트레칭'],
    recommend: '장시간 좌식 근무나 운전으로 온몸이 뻐근하신 분, 깊고 강한 압의 개운함을 원하시는 분',
    prices: [
      { time: '60분', price: '70,000원' },
      { time: '90분', price: '90,000원', isBest: true },
      { time: '120분', price: '110,000원' },
    ],
  },
  {
    id: 'aroma',
    name: '아로마 릴렉싱 테라피',
    tag: '천연 에센셜 오일 림프 케어',
    badge: '100% 천연 에센셜',
    img: '/images/sensual_care.jpg',
    subtitle: '최고급 식물성 오일 전신 림프 순환 케어',
    description: '피부 자극이 없는 최고급 식물성 천연 에센셜 오일을 도포하여 부드럽고 섬세한 감성 수기 테크닉으로 전신 림프절을 자극하고 축적된 젖산과 근막 긴장을 부드럽게 녹여내는 감성 릴렉싱 테라피입니다.',
    features: ['100% 천연 식물성 에센셜 오일', '전신 림프 순환 & 부종 배출', '심신 안정 및 깊은 숙면 유도'],
    recommend: '만성 스트레스로 불면증이 있으신 분, 전신 보습과 부드러운 림프 순환 힐링을 원하시는 분',
    prices: [
      { time: '60분', price: '80,000원' },
      { time: '90분', price: '110,000원', isBest: true },
      { time: '120분', price: '140,000원' },
    ],
  },
  {
    id: 'vip',
    name: '힐링 VIP 시그니처 테라피',
    tag: '👑 시그니처 1위 · 압도적 재이용률',
    badge: '아밤 대표 복합 코스',
    isVip: true,
    img: '/images/sensual_back.jpg',
    subtitle: '왓포 건식(40분) + 천연 아로마(50분) 올인원 코스',
    description: '정통 건식 수기 지압으로 전신의 큰 근육을 먼저 깊숙이 이완한 뒤, 프리미엄 천연 에센셜 오일로 림프와 미세 근막을 정밀하게 케어하는 아밤의 최고급 대표 복합 프로그램입니다. 개운함과 감미로운 힐링을 동시에 누리는 최고 만족도 코스입니다.',
    features: ['건식 수기 40분 + 천연 오일 50분', '큰 근육 이완 후 미세 림프 집중 케어', '고객 만족도 및 재이용률 1위'],
    recommend: '강한 지압의 개운함과 부드러운 오일 힐링의 장점만을 한 코스로 완벽히 경험하고 싶으신 분',
    prices: [
      { time: '60분', price: '100,000원' },
      { time: '90분', price: '140,000원', isBest: true },
      { time: '120분', price: '180,000원' },
    ],
  },
];

const COMPARISON_ROWS = [
  { category: '가격대', thai: '7~11만원', aroma: '8~14만원', vip: '10~18만원' },
  { category: '관리 기법', thai: '왓포 건식 수기 지압 & 전신 스트레칭', aroma: '천연 오일 림프 순환 케어', vip: '건식 지압(40분) + 천연 오일(50분)' },
  { category: '압의 강도', thai: '시원하고 깊은 압', aroma: '부드럽고 릴렉싱한 압', vip: '시원한 지압 + 섬세한 림프 압' },
  { category: '오일 사용', thai: '오일 미사용 (순면 관리복)', aroma: '천연 식물성 오일 도포', vip: '건식 후 천연 오일 집중 도포' },
  { category: '주요 효과', thai: '관절 이완, 근육통 완화', aroma: '림프 순환, 피부 보습, 숙면 유도', vip: '전신 피로 회복 + 심신 힐링' },
];

const SEO_REGIONS = [
  {
    name: '서울 강남권',
    keywords: [
      { label: '강남 출장 홈케어', slug: '강남출장홈케어' },
      { label: '역삼 마사지', slug: '역삼출장마사지' },
      { label: '논현 마사지', slug: '논현출장마사지' },
      { label: '청담 홈케어', slug: '청담출장홈케어' },
      { label: '선릉 출장케어', slug: '선릉출장마사지' },
      { label: '서초 출장홈케어', slug: '서초출장홈케어' },
      { label: '반포 마사지', slug: '반포출장마사지' },
      { label: '송파 홈케어', slug: '송파출장홈케어' },
      { label: '잠실 출장마사지', slug: '잠실출장마사지' },
    ],
  },
  {
    name: '서울 강북·서부권',
    keywords: [
      { label: '마포 출장홈케어', slug: '마포출장홈케어' },
      { label: '홍대 마사지', slug: '홍대출장마사지' },
      { label: '합정 홈케어', slug: '합정출장홈케어' },
      { label: '용산 출장마사지', slug: '용산출장마사지' },
      { label: '한남 홈케어', slug: '한남출장홈케어' },
      { label: '여의도 출장홈케어', slug: '여의도출장홈케어' },
      { label: '영등포 마사지', slug: '영등포출장마사지' },
      { label: '성수 홈케어', slug: '성수출장홈케어' },
    ],
  },
  {
    name: '경기 남부권',
    keywords: [
      { label: '분당 출장홈케어', slug: '분당출장홈케어' },
      { label: '판교 홈케어', slug: '판교출장홈케어' },
      { label: '수원 출장마사지', slug: '수원출장홈케어' },
      { label: '광교 홈케어', slug: '광교출장홈케어' },
      { label: '용인 수지 마사지', slug: '수지출장마사지' },
      { label: '동탄 출장홈케어', slug: '동탄출장홈케어' },
      { label: '안양 평촌 마사지', slug: '평촌출장마사지' },
      { label: '부천 출장홈케어', slug: '부천출장홈케어' },
    ],
  },
  {
    name: '경기 북부·인천권',
    keywords: [
      { label: '일산 출장홈케어', slug: '일산출장홈케어' },
      { label: '고양 마사지', slug: '고양출장마사지' },
      { label: '김포 출장마사지', slug: '김포출장마사지' },
      { label: '하남 미사 홈케어', slug: '하남출장홈케어' },
      { label: '남양주 마사지', slug: '남양주출장마사지' },
      { label: '인천 송도 홈케어', slug: '송도출장홈케어' },
      { label: '부평 출장마사지', slug: '부평출장홈케어' },
      { label: '청라 홈케어', slug: '청라출장홈케어' },
    ],
  },
];

export default function HomePage() {
  const [selectedCourse, setSelectedCourse] = useState('all');
  const [pulse, setPulse] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => setPulse(p => !p), 1200);
    return () => clearInterval(interval);
  }, []);

  const visibleCourses = selectedCourse === 'all' ? COURSES : COURSES.filter(c => c.id === selectedCourse);

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', color: '#1c1917', fontFamily: '-apple-system, BlinkMacSystemFont, "Pretendard Variable", Pretendard, "Apple SD Gothic Neo", sans-serif' }}>

      {/* ── 최상단 프리미엄 안내 띠 ── */}
      <div style={{ background: 'linear-gradient(90deg, #926b38 0%, #b48a4e 50%, #926b38 100%)', color: '#ffffff', padding: '7px 20px', textAlign: 'center', fontSize: '12px', fontWeight: 700, letterSpacing: '-0.2px' }}>
        ✨ 수도권 전지역 30분 도착 · 선입금 X · 100% 대면결제 · 왓포 정통 테라피스트 상시 대기
      </div>

      {/* ── 상단 네비게이션 헤더 (순서 통일: 카카오 문의 ➔ 전화예약) ── */}
      <header style={{ position: 'sticky', top: 0, zIndex: 50, backgroundColor: 'rgba(255,255,255,0.98)', backdropFilter: 'blur(12px)', borderBottom: '1px solid #ede7df', boxShadow: '0 2px 12px rgba(44,39,32,0.04)' }}>
        <div style={{ maxWidth: '1060px', margin: '0 auto', padding: '12px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '38px', height: '38px', borderRadius: '8px', background: 'linear-gradient(135deg, #f5ebd9 0%, #ebd4b2 100%)', border: '1px solid #d4b896', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', boxShadow: '0 2px 6px rgba(180,140,75,0.15)' }}>
              💆
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '19px', fontWeight: 900, color: '#1c1917', letterSpacing: '-0.5px' }}>아밤 타이 홈케어</span>
                <span style={{ fontSize: '10.5px', fontWeight: 800, color: '#855f2a', backgroundColor: '#fcf8f2', border: '1px solid #ebdcc8', padding: '2px 7px', borderRadius: '4px' }}>
                  수도권 1위
                </span>
              </div>
              <span style={{ display: 'block', fontSize: '10.5px', color: '#8c827a', fontWeight: 600, letterSpacing: '0.3px', marginTop: '1px' }}>
                ABAM THAI HOMECARE · 아름다운 밤
              </span>
            </div>
          </div>
          {/* 일관된 순서: 카카오 문의 (좌) ➔ 전화예약 (우) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <a href={KAKAO_URL} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '13px', fontWeight: 800, color: '#181600', backgroundColor: '#FEE500', padding: '8px 14px', borderRadius: '6px', textDecoration: 'none', boxShadow: '0 2px 8px rgba(254,229,0,0.35)' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 3C7.03 3 3 6.36 3 10.5c0 2.63 1.58 4.96 4 6.37L6 20l3.5-2.1c.8.17 1.63.26 2.5.26 4.97 0 9-3.36 9-7.5S16.97 3 12 3z" fill="#181600"/></svg>
              카카오 문의
            </a>
            <a href={PHONE_TEL} style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '13px', fontWeight: 700, color: '#ffffff', padding: '8px 14px', borderRadius: '6px', textDecoration: 'none', backgroundColor: '#1e3a8a', boxShadow: '0 2px 8px rgba(30,58,138,0.22)' }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" fill="#ffffff"/></svg>
              전화예약
            </a>
          </div>
        </div>
      </header>

      {/* ── 화려한 럭셔리 스파 히어로 (매혹적인 비주얼 갤러리 쇼케이스) ── */}
      <section style={{ background: 'linear-gradient(180deg, #fdfbf7 0%, #f7f3ec 50%, #ffffff 100%)', borderBottom: '1px solid #ede7df', padding: '48px 20px 44px', position: 'relative', overflow: 'hidden' }}>
        
        {/* 우아한 은은한 원형 장식 */}
        <div style={{ position: 'absolute', top: '-120px', right: '-120px', width: '420px', height: '420px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(220,188,140,0.18) 0%, rgba(255,255,255,0) 70%)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: '1060px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '36px', alignItems: 'center' }}>
          
          {/* 좌측: 유화된 헤드라인 & 신뢰 포인트 & CTA 버튼 */}
          <div>
            {/* 실시간 펄스 뱃지 */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#ffffff', border: '1px solid #dfd7cc', padding: '6px 14px', borderRadius: '20px', marginBottom: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#16a34a', display: 'inline-block', boxShadow: pulse ? '0 0 0 4px rgba(22,163,74,0.22)' : '0 0 0 0px rgba(22,163,74,0)', transition: 'box-shadow 0.6s ease' }} />
              <span style={{ fontSize: '12px', fontWeight: 800, color: '#57534e', letterSpacing: '-0.2px' }}>지금 실시간 예약 접수 중 · 24시간 연중무휴 상시 배차</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13.5px', fontWeight: 800, color: '#926b38', letterSpacing: '0.4px', marginBottom: '8px' }}>
              <span>⚜️</span>
              <span>A-BAM · 지친 하루 끝, 가장 아늑하고 아름다운 밤</span>
            </div>

            {/* 유화된 헤드라인 (선입금 X · 100% 대면결제) */}
            <h1 style={{ fontSize: '32px', fontWeight: 900, lineHeight: 1.3, letterSpacing: '-1px', margin: '0 0 14px', color: '#1c1917' }}>
              선입금 X · <span style={{ color: '#926b38', borderBottom: '2px solid #d4b896', paddingBottom: '2px' }}>100% 대면결제</span><br />
              아밤 타이 홈케어
            </h1>

            <p style={{ fontSize: '14.5px', color: '#57534e', lineHeight: 1.65, margin: '0 0 26px', wordBreak: 'keep-all' }}>
              도메인 <strong>abam.kr</strong>(아름다운 밤)의 약속처럼, 고객님의 편안한 독립 공간(자택·호텔·오피스텔)으로 찾아갑니다. 왓포 왕실 정통 건식 수기부터 천연 아로마까지 엄선된 20대 전문 테라피스트가 <strong>30분 내외</strong> 즉시 방문합니다.
            </p>

            {/* 일관된 순서: 카카오톡 실시간 예약 (좌) ➔ 전화예약 (우) */}
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '28px' }}>
              <a href={KAKAO_URL} target="_blank" rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#FEE500', color: '#181600', fontWeight: 900, fontSize: '15px', padding: '13px 24px', borderRadius: '8px', textDecoration: 'none', boxShadow: '0 4px 14px rgba(254,229,0,0.38)' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 3C7.03 3 3 6.36 3 10.5c0 2.63 1.58 4.96 4 6.37L6 20l3.5-2.1c.8.17 1.63.26 2.5.26 4.97 0 9-3.36 9-7.5S16.97 3 12 3z" fill="#181600"/></svg>
                카카오톡 실시간 예약
              </a>
              <a href={PHONE_TEL}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#1e3a8a', color: '#ffffff', fontWeight: 800, fontSize: '15px', padding: '13px 24px', borderRadius: '8px', textDecoration: 'none', boxShadow: '0 4px 14px rgba(30,58,138,0.25)' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" fill="#ffffff"/></svg>
                {PHONE_NUM} 전화예약
              </a>
            </div>

            {/* 핵심 수치 3종 카드 (유화된 문구: 선입금 X · 예약금 0원) */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
              {[
                { num: '30분', label: '수도권 평균 도착', sub: '서울·경기·인천' },
                { num: '선입금 X', label: '예약금 0원', sub: '도착 후 안심 결제' },
                { num: '100%', label: '현장 대면결제', sub: '직접 확인 후 정산' },
              ].map((item, i) => (
                <div key={i} style={{ backgroundColor: '#ffffff', border: '1px solid #ebdcc8', borderRadius: '10px', padding: '12px 10px', textAlign: 'center', boxShadow: '0 2px 8px rgba(180,140,75,0.06)' }}>
                  <div style={{ fontSize: '20px', fontWeight: 900, color: '#926b38', letterSpacing: '-0.5px' }}>{item.num}</div>
                  <div style={{ fontSize: '12px', color: '#1c1917', fontWeight: 800, marginTop: '2px' }}>{item.label}</div>
                  <div style={{ fontSize: '10.5px', color: '#8c827a', marginTop: '1px' }}>{item.sub}</div>
                </div>
              ))}
            </div>
          </div>

          {/* 우측: 매혹적인 듀얼 비주얼 쇼케이스 (매혹적인 뒷태 & 매력적인 립/페이스) */}
          <div style={{ position: 'relative' }}>
            {/* 메인 비주얼: 매혹적인 실크 백 & 숄더 테라피 */}
            <div style={{ position: 'relative', width: '100%', height: '340px', borderRadius: '16px', overflow: 'hidden', border: '2px solid #d4b896', boxShadow: '0 12px 36px rgba(180,140,75,0.18)' }}>
              <Image src="/images/sensual_back.jpg" alt="아밤 타이 홈케어 매혹적인 감성 테라피" fill style={{ objectFit: 'cover' }} priority />
              
              {/* 상단 오버레이 뱃지 */}
              <div style={{ position: 'absolute', top: '14px', left: '14px', background: 'rgba(255,255,255,0.96)', backdropFilter: 'blur(8px)', border: '1px solid #d4b896', padding: '5px 11px', borderRadius: '6px', fontSize: '11px', fontWeight: 800, color: '#855f2a', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                👑 왓포 왕실 정통 수기 &amp; 감성 케어
              </div>

              {/* 하단 글래스모피즘 정보 바 */}
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '14px 16px', background: 'linear-gradient(to top, rgba(28,25,23,0.92) 0%, rgba(28,25,23,0.7) 60%, transparent 100%)', color: '#ffffff' }}>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#f3d9aa', marginBottom: '2px' }}>
                  LUXURY PRIVATE SPA &amp; SENSORY THERAPY
                </div>
                <div style={{ fontSize: '16px', fontWeight: 900, letterSpacing: '-0.3px', margin: '0 0 4px' }}>
                  지친 일상을 녹이는 가장 매혹적인 휴식
                </div>
                <div style={{ display: 'flex', gap: '8px', fontSize: '10.5px', color: '#e7e5e4' }}>
                  <span>✓ 1회용 소독 린넨</span>
                  <span>✓ 최고급 천연 오일</span>
                  <span>✓ 엄선된 20대 전문 테라피스트</span>
                </div>
              </div>
            </div>

            {/* 보조 플로팅 카드: 감미로운 입술 & 릴렉싱 클로즈업 */}
            <div style={{ position: 'absolute', bottom: '-24px', right: '-12px', width: '145px', height: '145px', borderRadius: '14px', overflow: 'hidden', border: '3px solid #ffffff', boxShadow: '0 8px 24px rgba(0,0,0,0.18)' }}>
              <Image src="/images/sensual_lips.jpg" alt="편안한 힐링 테라피 릴렉싱" fill style={{ objectFit: 'cover' }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '4px', background: 'rgba(28,25,23,0.85)', textAlign: 'center', fontSize: '9.5px', color: '#f5ebd9', fontWeight: 800 }}>
                감각적인 힐링
              </div>
            </div>

            {/* 플로팅 인증 뱃지 */}
            <div style={{ position: 'absolute', top: '-10px', right: '-10px', background: 'linear-gradient(135deg, #b48a4e 0%, #926b38 100%)', color: '#ffffff', padding: '7px 13px', borderRadius: '12px', fontSize: '11.5px', fontWeight: 900, boxShadow: '0 4px 12px rgba(146,107,56,0.35)', border: '1.5px solid #ffffff' }}>
              ★ 100% 대면결제
            </div>
          </div>
        </div>
      </section>

      {/* ── 마사지 감각을 자극하는 3대 비주얼 갤러리 배너 ── */}
      <section style={{ backgroundColor: '#faf7f2', borderBottom: '1px solid #ede7df', padding: '24px 20px' }}>
        <div style={{ maxWidth: '1060px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
          {[
            { img: '/images/hero.jpg', title: '왓포 정통 딥티슈 스트레칭', sub: '뭉친 승모근·허리 관절 집중 이완' },
            { img: '/images/sensual_care.jpg', title: '최고급 천연 아로마 림프 케어', sub: '부드러운 오일로 림프 순환 & 부종 배출' },
            { img: '/images/sensual_lips.jpg', title: '온전한 휴식과 감성 힐링', sub: '내 공간에서 누리는 깊은 이완과 숙면' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', backgroundColor: '#ffffff', border: '1px solid #ebdcc8', borderRadius: '10px', padding: '10px 12px', boxShadow: '0 2px 6px rgba(180,140,75,0.05)' }}>
              <div style={{ position: 'relative', width: '56px', height: '56px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0, border: '1px solid #ede7df' }}>
                <Image src={item.img} alt={item.title} fill style={{ objectFit: 'cover' }} />
              </div>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 800, color: '#1c1917' }}>{item.title}</div>
                <div style={{ fontSize: '11.5px', color: '#78716c', marginTop: '2px' }}>{item.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 4대 시그니처 힐링 포인트 (유화된 문구 적용) ── */}
      <section style={{ backgroundColor: '#ffffff', padding: '40px 20px', borderBottom: '1px solid #ede7df' }}>
        <div style={{ maxWidth: '1060px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <span style={{ fontSize: '11.5px', fontWeight: 800, color: '#926b38', letterSpacing: '1px', textTransform: 'uppercase' }}>SIGNATURE WELLNESS</span>
            <h2 style={{ fontSize: '22px', fontWeight: 900, color: '#1c1917', margin: '4px 0 6px', letterSpacing: '-0.5px' }}>
              아밤 타이 홈케어만의 차별화된 4대 테라피
            </h2>
            <p style={{ fontSize: '13.5px', color: '#78716c', margin: 0 }}>단순 마사지가 아닌, 전문 교육을 수료한 테라피스트의 정밀 수기 힐링을 선사합니다.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
            {[
              {
                icon: '🧘',
                title: '왓포 정통 딥티슈 지압',
                desc: '태국 정통 왓포 방식으로 승모근, 척추기립근, 굳은 골반 관절을 정교한 체중 지압과 스트레칭으로 깊게 이완합니다.',
                tag: '만성 근육통 완화',
              },
              {
                icon: '🌿',
                title: '유기농 천연 에센셜 오일',
                desc: '피부 자극이 없는 100% 식물성 천연 오일로 전신 림프절을 자극하여 부종을 배출하고 혈액순환을 촉진합니다.',
                tag: '림프 순환 & 디톡스',
              },
              {
                icon: '🚪',
                title: '편안한 프라이빗 방문',
                desc: '이동 시간 없이 고객님의 자택, 호텔 객실, 오피스텔 등 가장 편안한 독립 공간에서 타인의 시선 없이 케어받습니다.',
                tag: '1:1 방문 맞춤 케어',
              },
              {
                icon: '🛡️',
                title: '선입금 X · 100% 대면결제',
                desc: '예약금 없이 관리사가 도착한 것을 직접 확인하신 후 결제하시는 가장 투명하고 편안한 거래 방식만을 고수합니다.',
                tag: '100% 대면결제 원칙',
              },
            ].map((card, i) => (
              <div key={i} style={{ backgroundColor: '#fdfbf9', border: '1px solid #ebdcc8', borderRadius: '12px', padding: '22px 18px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 2px 8px rgba(180,140,75,0.04)' }}>
                <div>
                  <div style={{ fontSize: '28px', marginBottom: '10px' }}>{card.icon}</div>
                  <div style={{ fontSize: '11px', fontWeight: 800, color: '#926b38', backgroundColor: '#fcf8f2', border: '1px solid #ebdcc8', padding: '3px 8px', borderRadius: '4px', display: 'inline-block', marginBottom: '8px' }}>
                    {card.tag}
                  </div>
                  <h3 style={{ fontSize: '16px', fontWeight: 900, color: '#1c1917', margin: '0 0 8px', letterSpacing: '-0.3px' }}>{card.title}</h3>
                  <p style={{ fontSize: '13px', color: '#57534e', lineHeight: 1.6, margin: 0 }}>{card.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 본문 코스 안내 ── */}
      <main style={{ maxWidth: '1060px', margin: '0 auto', padding: '44px 20px 100px' }}>

        {/* 코스 안내 섹션 */}
        <section style={{ marginBottom: '52px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
            <div>
              <span style={{ fontSize: '11.5px', fontWeight: 800, color: '#926b38', letterSpacing: '1px' }}>PROGRAM &amp; PRICE</span>
              <h2 style={{ fontSize: '24px', fontWeight: 900, color: '#1c1917', margin: '2px 0 0', letterSpacing: '-0.6px' }}>정찰제 코스 프로그램</h2>
              <p style={{ fontSize: '13px', color: '#78716c', margin: '4px 0 0' }}>VAT 포함 · 추가 출장비 없음 · 가격 흥정 없는 투명한 정찰제</p>
            </div>
          </div>

          {/* 탭 버튼 */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
            {[{ id: 'all', label: '전체 코스' }, { id: 'thai', label: '타이 건식' }, { id: 'aroma', label: '아로마 오일' }, { id: 'vip', label: '👑 힐링 VIP (시그니처)' }].map(tab => (
              <button key={tab.id} onClick={() => setSelectedCourse(tab.id)} style={{ padding: '9px 20px', borderRadius: '6px', fontSize: '13.5px', fontWeight: selectedCourse === tab.id ? 800 : 600, cursor: 'pointer', border: selectedCourse === tab.id ? '1.5px solid #926b38' : '1px solid #ede7df', backgroundColor: selectedCourse === tab.id ? '#926b38' : '#ffffff', color: selectedCourse === tab.id ? '#ffffff' : '#57534e', transition: 'all 0.15s', boxShadow: selectedCourse === tab.id ? '0 2px 8px rgba(146,107,56,0.2)' : 'none' }}>
                {tab.label}
              </button>
            ))}
          </div>

          {/* 코스 카드 리스트 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '26px' }}>
            {visibleCourses.map(c => (
              <div key={c.id} style={{ backgroundColor: '#ffffff', border: c.isVip ? '2px solid #b48a4e' : '1px solid #ebdcc8', borderRadius: '14px', overflow: 'hidden', boxShadow: c.isVip ? '0 8px 30px rgba(180,140,75,0.14)' : '0 3px 12px rgba(0,0,0,0.03)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', position: 'relative' }}>
                
                {/* 좌측: 실사 감성 테라피 이미지 */}
                <div style={{ position: 'relative', minHeight: '260px', backgroundColor: '#f8f6f2' }}>
                  <Image src={c.img} alt={c.name} fill style={{ objectFit: 'cover' }} priority={c.id === 'thai'} />
                  
                  {/* 상단 태그 */}
                  <div style={{ position: 'absolute', top: '12px', left: '12px', backgroundColor: c.isVip ? '#926b38' : '#292524', color: '#ffffff', fontSize: '11px', fontWeight: 800, padding: '4px 10px', borderRadius: '4px', letterSpacing: '-0.2px', boxShadow: '0 2px 6px rgba(0,0,0,0.25)' }}>
                    {c.tag}
                  </div>

                  {/* 하단 특징 배너 */}
                  <div style={{ position: 'absolute', bottom: '12px', left: '12px', right: '12px', background: 'rgba(255,255,255,0.94)', backdropFilter: 'blur(6px)', padding: '8px 12px', borderRadius: '6px', fontSize: '11px', fontWeight: 700, color: '#1c1917', border: '1px solid #ebdcc8' }}>
                    {c.badge}
                  </div>
                </div>

                {/* 우측: 프로그램 상세 정보 & 가격 & 퀵 버튼 */}
                <div style={{ padding: '24px 26px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <h3 style={{ fontSize: '20px', fontWeight: 900, color: '#1c1917', margin: 0, letterSpacing: '-0.4px' }}>{c.name}</h3>
                      {c.isVip && (
                        <span style={{ fontSize: '11px', fontWeight: 800, color: '#926b38', backgroundColor: '#fcf8f2', border: '1px solid #d4b896', padding: '3px 8px', borderRadius: '12px' }}>
                          인기 1위
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: '#926b38', marginBottom: '12px' }}>{c.subtitle}</div>
                    <p style={{ fontSize: '13.5px', color: '#57534e', lineHeight: 1.6, margin: '0 0 14px' }}>{c.description}</p>
                    
                    {/* 핵심 특징 칩 */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
                      {c.features.map((feat, fi) => (
                        <span key={fi} style={{ fontSize: '11.5px', color: '#78552b', backgroundColor: '#faf6f0', border: '1px solid #ede1d1', padding: '3px 8px', borderRadius: '4px', fontWeight: 600 }}>
                          ✓ {feat}
                        </span>
                      ))}
                    </div>

                    <div style={{ backgroundColor: '#faf7f2', border: '1px solid #ede8e0', borderRadius: '6px', padding: '9px 12px', fontSize: '12px', color: '#44403c', marginBottom: '18px' }}>
                      <strong style={{ color: '#1c1917' }}>권장 대상:</strong> {c.recommend}
                    </div>
                  </div>

                  {/* 가격표 3종 */}
                  <div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginBottom: '14px' }}>
                      {c.prices.map((p, idx) => (
                        <div key={idx} style={{ backgroundColor: p.isBest ? '#fdf9f4' : '#faf7f2', border: p.isBest ? '1.5px solid #d4b896' : '1px solid #ebe5dc', borderRadius: '8px', padding: '10px 6px', textAlign: 'center' }}>
                          <div style={{ fontSize: '11px', color: '#78716c', fontWeight: 600 }}>{p.time}</div>
                          <div style={{ fontSize: '15.5px', color: p.isBest ? '#926b38' : '#1c1917', fontWeight: 900, marginTop: '2px' }}>{p.price}</div>
                          {p.isBest && <div style={{ fontSize: '10px', color: '#926b38', fontWeight: 800, marginTop: '2px' }}>추천</div>}
                        </div>
                      ))}
                    </div>

                    {/* 카드 내 퀵 버튼 (일관된 순서: 카카오 ➔ 전화) */}
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <a href={KAKAO_URL} target="_blank" rel="noopener noreferrer" style={{ flex: 1.2, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', backgroundColor: '#FEE500', color: '#181600', fontWeight: 800, fontSize: '13px', padding: '10px 0', borderRadius: '6px', textDecoration: 'none', boxShadow: '0 2px 6px rgba(254,229,0,0.3)' }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 3C7.03 3 3 6.36 3 10.5c0 2.63 1.58 4.96 4 6.37L6 20l3.5-2.1c.8.17 1.63.26 2.5.26 4.97 0 9-3.36 9-7.5S16.97 3 12 3z" fill="#181600"/></svg>
                        카카오톡 예약
                      </a>
                      <a href={PHONE_TEL} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px', backgroundColor: '#1e3a8a', color: '#ffffff', fontWeight: 700, fontSize: '13px', padding: '10px 0', borderRadius: '6px', textDecoration: 'none', boxShadow: '0 2px 6px rgba(30,58,138,0.2)' }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" fill="#ffffff"/></svg>
                        전화예약
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 3대 코스 특성 비교표 */}
        <section style={{ backgroundColor: '#ffffff', border: '1px solid #ebdcc8', borderRadius: '12px', padding: '28px 22px', marginBottom: '52px', boxShadow: '0 2px 8px rgba(180,140,75,0.04)' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 900, color: '#1c1917', margin: '0 0 6px', textAlign: 'center', letterSpacing: '-0.3px' }}>3대 코스 특성 비교</h2>
          <p style={{ fontSize: '13px', color: '#78716c', margin: '0 0 20px', textAlign: 'center' }}>고객님의 컨디션과 선호에 맞는 최적의 코스를 확인하세요.</p>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left', minWidth: '580px' }}>
              <thead>
                <tr style={{ backgroundColor: '#faf7f2', borderBottom: '1.5px solid #ebdcc8' }}>
                  <th style={{ padding: '12px 14px', color: '#78716c', fontWeight: 700, width: '16%' }}>구분</th>
                  <th style={{ padding: '12px 14px', color: '#1c1917', fontWeight: 800, width: '28%' }}>타이 정통 테라피</th>
                  <th style={{ padding: '12px 14px', color: '#1c1917', fontWeight: 800, width: '28%' }}>아로마 릴렉싱 테라피</th>
                  <th style={{ padding: '12px 14px', color: '#926b38', fontWeight: 900, width: '28%', backgroundColor: '#fcf8f2' }}>👑 힐링 VIP (시그니처)</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_ROWS.map((row, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid #f3efe8', backgroundColor: idx % 2 === 0 ? '#ffffff' : '#fdfcfb' }}>
                    <td style={{ padding: '11px 14px', fontWeight: 700, color: '#78716c' }}>{row.category}</td>
                    <td style={{ padding: '11px 14px', color: '#44403c' }}>{row.thai}</td>
                    <td style={{ padding: '11px 14px', color: '#44403c' }}>{row.aroma}</td>
                    <td style={{ padding: '11px 14px', color: '#926b38', fontWeight: 800, backgroundColor: '#fcf8f2' }}>{row.vip}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 3단계 간편 이용 프로세스 (유화된 문구) */}
        <section style={{ backgroundColor: '#fdfbf9', border: '1px solid #ebdcc8', borderRadius: '12px', padding: '32px 24px', marginBottom: '52px' }}>
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <span style={{ fontSize: '11.5px', fontWeight: 800, color: '#926b38', letterSpacing: '1px' }}>EASY 3 STEPS</span>
            <h2 style={{ fontSize: '20px', fontWeight: 900, color: '#1c1917', margin: '4px 0 4px', letterSpacing: '-0.4px' }}>간편 이용 프로세스</h2>
            <p style={{ fontSize: '13px', color: '#78716c', margin: 0 }}>복잡한 가입 절차 없이, 30초 만에 예약하고 30분 내 편안하게 케어받으세요.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
            {[
              {
                step: 'STEP 01',
                title: '실시간 예약 접수',
                desc: '카카오톡 또는 전화로 원하시는 코스와 방문 장소(자택·호텔·오피스텔)를 말씀해 주세요.',
                highlight: '30초 간편 접수',
              },
              {
                step: 'STEP 02',
                title: '전문 테라피스트 30분 도착',
                desc: '가장 가까운 권역의 20대 전문 테라피스트가 소독 용품을 지참하여 평균 30분 이내 방문합니다.',
                highlight: '수도권 상시 배차',
              },
              {
                step: 'STEP 03',
                title: '대면 확인 후 결제 & 1:1 케어',
                desc: '관리사가 도착한 것을 직접 확인하신 후 안전하게 결제하시고 프라이빗 테라피를 누리세요.',
                highlight: '선입금 X · 100% 대면결제',
              },
            ].map((s, i) => (
              <div key={i} style={{ backgroundColor: '#ffffff', border: '1px solid #ede7df', borderRadius: '10px', padding: '20px', textAlign: 'center', boxShadow: '0 2px 6px rgba(0,0,0,0.02)' }}>
                <div style={{ fontSize: '12px', fontWeight: 900, color: '#926b38', letterSpacing: '0.5px', marginBottom: '6px' }}>{s.step}</div>
                <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#1c1917', margin: '0 0 6px' }}>{s.title}</h3>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#855f2a', backgroundColor: '#fcf8f2', border: '1px solid #ebdcc8', padding: '2px 8px', borderRadius: '4px', display: 'inline-block', marginBottom: '10px' }}>
                  {s.highlight}
                </div>
                <p style={{ fontSize: '12.5px', color: '#57534e', lineHeight: 1.55, margin: 0 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 중간 럭셔리 샴페인 골드 CTA 배너 (일관된 순서: 카카오 ➔ 전화) */}
        <section style={{ background: 'linear-gradient(135deg, #fdfbf7 0%, #f6ede0 50%, #fcf7ed 100%)', border: '1.5px solid #d4b896', borderRadius: '16px', padding: '38px 28px', marginBottom: '52px', textAlign: 'center', boxShadow: '0 6px 20px rgba(180,140,75,0.1)' }}>
          <div style={{ fontSize: '13px', fontWeight: 800, color: '#926b38', marginBottom: '6px', letterSpacing: '0.4px' }}>
            ⚜️ 오늘 하루의 피로를 완전히 비워내는 아름다운 밤
          </div>
          <h3 style={{ fontSize: '23px', fontWeight: 900, color: '#1c1917', margin: '0 0 10px', letterSpacing: '-0.5px' }}>
            선입금 X — 지금 예약하면 30분 내외 방문
          </h3>
          <p style={{ fontSize: '14px', color: '#57534e', margin: '0 auto 22px', maxWidth: '580px' }}>
            새벽·심야 시간대에도 24시간 언제든 문의 가능합니다. 검증된 전문 테라피스트가 고객님의 힐링을 책임집니다.
          </p>
          {/* 일관된 순서: 카카오톡 실시간 예약 (좌) ➔ 전화상담 (우) */}
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href={KAKAO_URL} target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#FEE500', color: '#181600', fontWeight: 900, fontSize: '15px', padding: '13px 26px', borderRadius: '8px', textDecoration: 'none', boxShadow: '0 4px 14px rgba(254,229,0,0.35)' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 3C7.03 3 3 6.36 3 10.5c0 2.63 1.58 4.96 4 6.37L6 20l3.5-2.1c.8.17 1.63.26 2.5.26 4.97 0 9-3.36 9-7.5S16.97 3 12 3z" fill="#181600"/></svg>
              카카오톡 실시간 예약
            </a>
            <a href={PHONE_TEL}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#1e3a8a', color: '#ffffff', fontWeight: 800, fontSize: '15px', padding: '13px 26px', borderRadius: '8px', textDecoration: 'none', boxShadow: '0 4px 14px rgba(30,58,138,0.22)' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" fill="#ffffff"/></svg>
              {PHONE_NUM} 전화상담
            </a>
          </div>
        </section>

        {/* SEO 지역 디렉토리 */}
        <section style={{ backgroundColor: '#ffffff', border: '1px solid #ebdcc8', borderRadius: '12px', padding: '28px 22px', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
          <h2 style={{ fontSize: '15px', fontWeight: 800, color: '#1c1917', margin: '0 0 6px' }}>수도권 출장 홈케어 지역 안내</h2>
          <p style={{ fontSize: '12.5px', color: '#78716c', margin: '0 0 18px' }}>왓포 출장 홈케어 · 강남 출장 홈케어 · 서울·경기 전지역 즉시 배차</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {SEO_REGIONS.map((reg, idx) => (
              <div key={idx} style={{ fontSize: '12.5px', lineHeight: 1.7 }}>
                <span style={{ fontWeight: 800, color: '#926b38', marginRight: '8px' }}>{reg.name}:</span>
                {reg.keywords.map((k, ki) => (
                  <React.Fragment key={ki}>
                    <Link href={`/seo/${encodeURIComponent(k.slug)}`} style={{ color: '#57534e', textDecoration: 'none' }}>{k.label}</Link>
                    {ki < reg.keywords.length - 1 && <span style={{ color: '#d6cec2', margin: '0 5px' }}>·</span>}
                  </React.Fragment>
                ))}
              </div>
            ))}
          </div>
          <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid #f3efe8', fontSize: '11.5px', color: '#8c827a' }}>
            ※ 아밤 타이 홈케어는 건전하고 투명한 프라이빗 힐링 테라피 문화만을 고수하며, 불법·퇴폐적 요구는 일체 받지 않습니다.
          </div>
        </section>
      </main>

      {/* ── 하단 고정 예약 바 (일관된 순서: 카카오톡 실시간 예약 ➔ 전화상담) ── */}
      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(255,255,255,0.98)', backdropFilter: 'blur(10px)', borderTop: '1px solid #ede7df', padding: '10px 20px', display: 'flex', gap: '10px', zIndex: 50, boxShadow: '0 -4px 16px rgba(0,0,0,0.06)' }}>
        <div style={{ maxWidth: '1060px', width: '100%', margin: '0 auto', display: 'flex', gap: '10px' }}>
          {/* 일관된 순서 1: 카카오톡 실시간 예약 */}
          <a href={KAKAO_URL} target="_blank" rel="noopener noreferrer" style={{ flex: 1.3, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', backgroundColor: '#FEE500', color: '#181600', fontWeight: 900, fontSize: '14.5px', padding: '13px 0', borderRadius: '8px', textDecoration: 'none', boxShadow: '0 2px 8px rgba(254,229,0,0.32)' }}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none"><path d="M12 3C7.03 3 3 6.36 3 10.5c0 2.63 1.58 4.96 4 6.37L6 20l3.5-2.1c.8.17 1.63.26 2.5.26 4.97 0 9-3.36 9-7.5S16.97 3 12 3z" fill="#181600"/></svg>
            카카오톡 실시간 예약
          </a>
          {/* 일관된 순서 2: 전화상담 */}
          <a href={PHONE_TEL} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', backgroundColor: '#1e3a8a', color: '#ffffff', fontWeight: 800, fontSize: '14.5px', padding: '13px 0', borderRadius: '8px', textDecoration: 'none', boxShadow: '0 2px 8px rgba(30,58,138,0.22)' }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" fill="#ffffff"/></svg>
            전화상담
          </a>
        </div>
      </div>
    </div>
  );
}
