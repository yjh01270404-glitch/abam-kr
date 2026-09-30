'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const KAKAO_ID = 'Abam1004';
const KAKAO_LINK = 'kakaotalk://';
const PHONE_TEL = 'tel:010-6607-2239';
const PHONE_NUM = '010-6607-2239';
const WHATSAPP_LINK = 'https://wa.me/821066072239?text=Hello%20Abam%20Spa,%20I%20am%20interested%20in%20booking%20a%20hotel%20massage%20in%20Seoul.';

function AbamMoonLogo({ size = 42 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" style={{ borderRadius: '10px', flexShrink: 0, boxShadow: '0 3px 12px rgba(11,17,32,0.28)', border: '1.5px solid #d9bba7' }}>
      <rect width="48" height="48" rx="10" fill="url(#abamNightBg)" />
      <defs>
        <linearGradient id="abamNightBg" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0b1120" />
          <stop offset="0.5" stopColor="#1e1b4b" />
          <stop offset="1" stopColor="#090d16" />
        </linearGradient>
        <linearGradient id="abamMoon" x1="14" y1="12" x2="34" y2="36" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fef08a" />
          <stop offset="0.6" stopColor="#f59e0b" />
          <stop offset="1" stopColor="#d97706" />
        </linearGradient>
        <filter id="abamGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      {/* Night Sky Stars */}
      <circle cx="36" cy="14" r="1.2" fill="#fef08a" opacity="0.9" />
      <path d="M36 10 L37 13 L40 14 L37 15 L36 18 L35 15 L32 14 L35 13 Z" fill="#fde047" opacity="0.85" />
      <path d="M14 14 L14.7 15.8 L16.5 16.5 L14.7 17.2 L14 19 L13.3 17.2 L11.5 16.5 L13.3 15.8 Z" fill="#fbcfe8" opacity="0.85" />
      <circle cx="15" cy="34" r="1" fill="#fef08a" opacity="0.75" />
      {/* Glowing Crescent Moon */}
      <path d="M 27 12 C 18 12 13 19 13 27 C 13 35 20 40 29 40 C 23.5 38 19.5 32 19.5 26 C 19.5 18 24.5 13.5 32 12.8 C 30.5 12.2 28.8 12 27 12 Z" fill="url(#abamMoon)" filter="url(#abamGlow)" />
    </svg>
  );
}

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
    badge: '정통 왓포 수기 지압',
    img: '/images/thai.jpg',
    subtitle: '전신 스트레칭 & 경혈 지압 딥티슈 케어',
    description: '오일을 사용하지 않고 편안한 순면 관리복을 착용한 상태에서 진행되는 왓포 정통 건식 수기 관리입니다. 체계적인 경혈 지압과 전신 관절 스트레칭을 통해 굳어있는 골반, 척추, 어깨 승모근의 깊은 피로를 시원하게 풀어드립니다.',
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
    badge: '100% 천연 에센셜 오일',
    img: '/images/sensual_touch.jpg',
    subtitle: '살결을 타고 흐르는 은은한 아로마와 감미로운 손길',
    description: '체온에 부드럽게 녹아드는 최고급 천연 식물성 에센셜 오일을 도포하여, 섬세하고 감미로운 수기 테크닉으로 전신 림프절을 부드럽게 자극합니다. 깊은 향기와 부드러운 온기가 지친 일상의 긴장을 황홀하게 녹여내는 매혹적인 릴렉싱 테라피입니다.',
    features: ['100% 천연 식물성 에센셜 오일', '전신 림프 순환 & 매끄러운 바디 케어', '심신을 감싸는 매혹적인 향기 힐링'],
    recommend: '만성 스트레스와 긴장으로 깊은 휴식이 필요하신 분, 은은한 향기와 부드러운 림프 순환 힐링을 원하시는 분',
    prices: [
      { time: '60분', price: '80,000원' },
      { time: '90분', price: '110,000원', isBest: true },
      { time: '120분', price: '140,000원' },
    ],
  },
  {
    id: 'vip',
    name: '힐링 VIP 시그니처 테라피',
    tag: '👑 시그니처 1위 · 아름다운 밤 최고의 올인원',
    badge: '아름다운 밤 대표 코스',
    isVip: true,
    img: '/images/sensual_back.jpg',
    subtitle: '왓포 건식(40분) + 천연 아로마(50분) 시크릿 코스',
    description: '정통 왓포 수기 지압으로 뭉친 대근육을 깊고 시원하게 풀어준 뒤, 프리미엄 천연 에센셜 오일로 림프와 미세 근막을 매혹적인 감각으로 어루만져 주는 아름다운 밤(Abam)의 최고급 대표 복합 프로그램입니다. 온몸을 감싸는 감미로운 전율과 깊은 안락함을 동시에 선사합니다.',
    features: ['건식 수기 40분 + 천연 아로마 50분', '시원한 대근육 이완 후 매혹적인 미세 림프 케어', '고객 만족도 및 재이용률 압도적 1위'],
    recommend: '시원한 지압의 개운함과 매혹적인 오일 힐링의 장점만을 한 코스로 완벽히 경험하고 싶으신 분',
    prices: [
      { time: '60분', price: '100,000원' },
      { time: '90분', price: '140,000원', isBest: true },
      { time: '120분', price: '180,000원' },
    ],
  },
];

const SENSORY_GALLERY = [
  {
    img: '/images/sensual_touch.jpg',
    tag: 'SENSUAL TOUCH',
    title: '매혹적인 아로마 림프 케어',
    desc: '살결을 타고 흐르는 은은한 온기와 섬세한 손길의 전신 이완',
  },
  {
    img: '/images/sensual_back.jpg',
    tag: 'DEEP RELAXATION',
    title: '매끄러운 바디 라인 테라피',
    desc: '경직된 척추와 승모근을 부드럽게 감싸는 감각적인 휴식',
  },
  {
    img: '/images/sensual_lips.jpg',
    tag: 'TRANQUIL HEALING',
    title: '오직 나만을 위한 은밀한 시간',
    desc: '숨소리까지 차분해지는 완벽한 독립 공간 속 프라이빗 스파',
  },
  {
    img: '/images/sensual_care.jpg',
    tag: 'PURE ESSENTIAL',
    title: '최고급 천연 오일 테크닉',
    desc: '100% 천연 식물성 에센셜로 피로를 향기롭게 녹여내는 힐링',
  },
];

const COMPARISON_ROWS = [
  { category: '가격대', thai: '7~11만원', aroma: '8~14만원', vip: '10~18만원' },
  { category: '관리 기법', thai: '왓포 건식 수기 지압 & 전신 스트레칭', aroma: '천연 아로마 전신 림프 순환 케어', vip: '건식 지압(40분) + 천연 아로마(50분)' },
  { category: '압의 강도', thai: '시원하고 깊은 압', aroma: '감미롭고 부드러운 압', vip: '시원한 지압 + 매혹적인 림프 압' },
  { category: '오일 사용', thai: '오일 미사용 (순면 관리복)', aroma: '천연 식물성 에센셜 오일 도포', vip: '건식 후 프리미엄 천연 오일 집중 도포' },
  { category: '주요 감각', thai: '관절 스트레칭, 깊은 개운함', aroma: '은은한 향기, 매끄러운 림프 순환', vip: '최상의 개운함 + 황홀한 심신 힐링' },
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
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', color: '#1c1412', fontFamily: '-apple-system, BlinkMacSystemFont, "Pretendard Variable", Pretendard, "Apple SD Gothic Neo", sans-serif' }}>

      {/* ── 최상단 매혹적인 샴페인 로즈골드 띠 (달빛 밤하늘 모티프) ── */}
      <div style={{ background: 'linear-gradient(90deg, #A0623A 0%, #C58A62 50%, #A0623A 100%)', color: '#ffffff', padding: '8px 20px', textAlign: 'center', fontSize: '12px', fontWeight: 800, letterSpacing: '0.2px', textShadow: '0 1px 2px rgba(0,0,0,0.15)' }}>
        🌙 아름다운 밤(Abam) · 지친 감각을 깨우는 가장 매혹적인 밤 · 선입금 X · 100% 대면결제 · 수도권 30분 도착
      </div>

      {/* ── 상단 네비게이션 헤더 (달빛 밤하늘 엠블럼 + 아름다운 밤 타이 홈케어 · Abam) ── */}
      <header style={{ position: 'sticky', top: 0, zIndex: 50, backgroundColor: 'rgba(255,255,255,0.98)', backdropFilter: 'blur(14px)', borderBottom: '1px solid #ebd8cd', boxShadow: '0 2px 14px rgba(184,123,82,0.06)' }}>
        <div style={{ maxWidth: '1080px', margin: '0 auto', padding: '12px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <AbamMoonLogo size={42} />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '18px', fontWeight: 900, color: '#1c1412', letterSpacing: '-0.5px' }}>
                  아름다운 밤 <span style={{ color: '#A0623A', fontSize: '16px', fontWeight: 800 }}>타이 홈케어</span>
                </span>
                <span style={{ fontSize: '10.5px', fontWeight: 800, color: '#9c542a', backgroundColor: '#fdf6f0', border: '1px solid #edd5c5', padding: '2px 7px', borderRadius: '4px' }}>
                  Abam
                </span>
              </div>
              <span style={{ display: 'block', fontSize: '10.5px', color: '#8c776e', fontWeight: 700, letterSpacing: '0.3px', marginTop: '1px' }}>
                ABAM THAI HOMECARE · 수도권 1위 힐링 스파
              </span>
            </div>
          </div>
          {/* 일관된 순서: 카카오 문의 (좌) ➔ 전화예약 (우) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <a href={KAKAO_URL} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '13px', fontWeight: 800, color: '#181600', backgroundColor: '#FEE500', padding: '9px 15px', borderRadius: '6px', textDecoration: 'none', boxShadow: '0 2px 10px rgba(254,229,0,0.38)' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 3C7.03 3 3 6.36 3 10.5c0 2.63 1.58 4.96 4 6.37L6 20l3.5-2.1c.8.17 1.63.26 2.5.26 4.97 0 9-3.36 9-7.5S16.97 3 12 3z" fill="#181600"/></svg>
              카카오 문의
            </a>
            <a href={PHONE_TEL} style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '13px', fontWeight: 700, color: '#ffffff', padding: '9px 15px', borderRadius: '6px', textDecoration: 'none', backgroundColor: '#1e3a8a', boxShadow: '0 2px 10px rgba(30,58,138,0.22)' }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" fill="#ffffff"/></svg>
              전화예약
            </a>
          </div>
        </div>
      </header>

      {/* ── 매혹적인 분위기의 럭셔리 스파 히어로 (달빛 서울 밤하늘 배경 & 풍부한 감성 갤러리) ── */}
      <section style={{ position: 'relative', overflow: 'hidden', borderBottom: '1px solid #ebd8cd', padding: '52px 20px 48px', backgroundColor: '#FCFAF8' }}>
        
        {/* 서울 밤하늘 배경 이미지 (100% 화이트/라이트 모드 준수용 감성 블렌딩) */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url(/images/seoul_night_sky.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center 35%',
          opacity: 0.16,
          filter: 'saturate(1.15)',
          pointerEvents: 'none',
        }} />
        
        {/* 우아한 샴페인/펄 화이트 라이트 그라디언트 베일 (가독성 100% 보장) */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(255,255,255,0.82) 0%, rgba(252,250,248,0.88) 55%, #FFFFFF 100%)',
          pointerEvents: 'none',
        }} />

        {/* 우아한 은은한 원형 샴페인 장식 */}
        <div style={{ position: 'absolute', top: '-140px', right: '-100px', width: '480px', height: '480px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(214,157,118,0.14) 0%, rgba(255,255,255,0) 70%)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: '1080px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '38px', alignItems: 'center', position: 'relative', zIndex: 1 }}>
          
          {/* 좌측: 매혹적인 헤드라인 & 시크릿 프라이빗 케어 & CTA 버튼 */}
          <div>
            {/* 실시간 펄스 뱃지 */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#ffffff', border: '1px solid #ebd8cd', padding: '6px 14px', borderRadius: '20px', marginBottom: '16px', boxShadow: '0 2px 8px rgba(184,123,82,0.06)' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#16a34a', display: 'inline-block', boxShadow: pulse ? '0 0 0 4px rgba(22,163,74,0.22)' : '0 0 0 0px rgba(22,163,74,0)', transition: 'box-shadow 0.6s ease' }} />
              <span style={{ fontSize: '12px', fontWeight: 800, color: '#6e5d57', letterSpacing: '-0.2px' }}>지금 실시간 예약 접수 중 · 24시간 연중무휴 상시 배차</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13.5px', fontWeight: 800, color: '#B87B52', letterSpacing: '0.5px', marginBottom: '8px' }}>
              <span>🌙</span>
              <span>ABAM · 달빛 아래 펼쳐지는 오직 당신만을 위한 아름다운 밤</span>
            </div>

            {/* 매혹적인 샵 이름 헤드라인 */}
            <h1 style={{ fontSize: '32px', fontWeight: 900, lineHeight: 1.34, letterSpacing: '-1px', margin: '0 0 16px', color: '#1c1412' }}>
              손끝이 닿는 순간 시작되는<br />
              <span style={{ color: '#B87B52', borderBottom: '2.5px solid #d9bba7', paddingBottom: '2px' }}>가장 매혹적인 밤</span><br />
              아름다운 밤 타이 홈케어 · Abam
            </h1>

            <p style={{ fontSize: '14.5px', color: '#5e4e48', lineHeight: 1.7, margin: '0 0 28px', wordBreak: 'keep-all' }}>
              도메인 <strong>abam.kr</strong>의 의미 그대로, 고객님께 가장 편안하고 감미로운 '아름다운 밤(Abam)'을 선물합니다. 은은한 천연 아로마 향과 부드러운 손길이 고객님의 편안한 독립 공간(자택·호텔·오피스텔)을 달빛 아래 프라이빗 럭셔리 스파로 바꿉니다. 엄선된 20대 전문 테라피스트가 <strong>30분 내외</strong> 즉시 찾아갑니다.
            </p>

            {/* 일관된 순서: 카카오톡 실시간 예약 (좌) ➔ 전화예약 (우) */}
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '30px' }}>
              <a href={KAKAO_URL} target="_blank" rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#FEE500', color: '#181600', fontWeight: 900, fontSize: '15px', padding: '14px 26px', borderRadius: '8px', textDecoration: 'none', boxShadow: '0 4px 16px rgba(254,229,0,0.4)' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 3C7.03 3 3 6.36 3 10.5c0 2.63 1.58 4.96 4 6.37L6 20l3.5-2.1c.8.17 1.63.26 2.5.26 4.97 0 9-3.36 9-7.5S16.97 3 12 3z" fill="#181600"/></svg>
                카카오톡 실시간 예약
              </a>
              <a href={PHONE_TEL}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#1e3a8a', color: '#ffffff', fontWeight: 800, fontSize: '15px', padding: '14px 26px', borderRadius: '8px', textDecoration: 'none', boxShadow: '0 4px 16px rgba(30,58,138,0.25)' }}>
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
                <div key={i} style={{ backgroundColor: '#ffffff', border: '1px solid #ecd7c8', borderRadius: '10px', padding: '12px 10px', textAlign: 'center', boxShadow: '0 2px 10px rgba(184,123,82,0.08)' }}>
                  <div style={{ fontSize: '20px', fontWeight: 900, color: '#B87B52', letterSpacing: '-0.5px' }}>{item.num}</div>
                  <div style={{ fontSize: '12px', color: '#1c1412', fontWeight: 800, marginTop: '2px' }}>{item.label}</div>
                  <div style={{ fontSize: '10.5px', color: '#8c776e', marginTop: '1px' }}>{item.sub}</div>
                </div>
              ))}
            </div>
          </div>

          {/* 우측: 매혹적인 3대 비주얼 쇼케이스 (이미지와 텍스트가 서로 가리지 않는 클린 럭셔리 레이아웃) */}
          <div>
            {/* 상단 뱃지 바 */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', background: '#fdf6f0', border: '1px solid #edd5c5', padding: '4px 10px', borderRadius: '6px', fontSize: '11.5px', fontWeight: 800, color: '#9c542a' }}>
                🌙 아름다운 밤 · 센슈얼 아로마 터치
              </span>
              <span style={{ background: 'linear-gradient(135deg, #C58A62 0%, #A0623A 100%)', color: '#ffffff', padding: '5px 12px', borderRadius: '6px', fontSize: '11px', fontWeight: 900, boxShadow: '0 2px 8px rgba(160,98,58,0.3)' }}>
                ★ 100% 대면결제
              </span>
            </div>

            {/* 메인 비주얼: 살결 위 은은한 아로마 오일 테라피 (텍스트로 가리지 않는 100% 클린 이미지) */}
            <div style={{ position: 'relative', width: '100%', height: '270px', borderRadius: '16px', overflow: 'hidden', border: '1.5px solid #d9bba7', boxShadow: '0 10px 30px rgba(184,123,82,0.16)' }}>
              <Image src="/images/sensual_touch.jpg" alt="아름다운 밤 타이 홈케어 매혹적인 아로마 림프 케어" fill style={{ objectFit: 'cover' }} priority />
            </div>

            {/* 메인 비주얼 하단 전용 안내 바 (이미지 위에 겹치지 않고 하단에 정갈하게 배치) */}
            <div style={{ backgroundColor: '#FAF6F2', border: '1px solid #ebd8cd', borderRadius: '10px', padding: '11px 14px', marginTop: '10px', boxShadow: '0 2px 6px rgba(184,123,82,0.05)' }}>
              <div style={{ fontSize: '14px', fontWeight: 900, color: '#1c1412', letterSpacing: '-0.3px' }}>
                지친 감각을 부드럽게 녹여내는 가장 매혹적인 밤
              </div>
              <div style={{ display: 'flex', gap: '10px', fontSize: '11px', color: '#7a6861', marginTop: '4px', flexWrap: 'wrap', fontWeight: 600 }}>
                <span>✓ 1회용 소독 린넨</span>
                <span>✓ 최고급 천연 에센셜 오일</span>
                <span>✓ 엄선된 20대 전문 테라피스트</span>
              </div>
            </div>

            {/* 보조 비주얼 2종 듀얼 갤러리 (겹침 없이 정갈하게 하단 2단 배치) */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '10px' }}>
              {/* 보조 카드 1: 실크 바디 케어 */}
              <div style={{ backgroundColor: '#ffffff', border: '1px solid #ecd7c8', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(184,123,82,0.06)' }}>
                <div style={{ position: 'relative', width: '100%', height: '110px' }}>
                  <Image src="/images/sensual_back.jpg" alt="매혹적인 실크 백 테라피" fill style={{ objectFit: 'cover' }} />
                </div>
                <div style={{ padding: '8px 10px', textAlign: 'center' }}>
                  <div style={{ fontSize: '12.5px', fontWeight: 800, color: '#1c1412' }}>실크 바디 케어</div>
                  <div style={{ fontSize: '11px', color: '#8c776e', marginTop: '1px' }}>매끄러운 릴렉싱 라인</div>
                </div>
              </div>

              {/* 보조 카드 2: 감미로운 힐링 */}
              <div style={{ backgroundColor: '#ffffff', border: '1px solid #ecd7c8', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(184,123,82,0.06)' }}>
                <div style={{ position: 'relative', width: '100%', height: '110px' }}>
                  <Image src="/images/sensual_lips.jpg" alt="감미로운 프라이빗 힐링" fill style={{ objectFit: 'cover' }} />
                </div>
                <div style={{ padding: '8px 10px', textAlign: 'center' }}>
                  <div style={{ fontSize: '12.5px', fontWeight: 800, color: '#1c1412' }}>감미로운 힐링</div>
                  <div style={{ fontSize: '11px', color: '#8c776e', marginTop: '1px' }}>달빛 아래 프라이빗 스파</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 🌍 외국인 전용 글로벌 호텔 인룸 VIP 컨시어지 카드 (ENGLISH · 日本語 · 中文) ── */}
      <section style={{ backgroundColor: '#ffffff', borderRadius: '20px', border: '1.5px solid rgba(212, 175, 55, 0.55)', boxShadow: '0 12px 35px rgba(212, 175, 55, 0.16), 0 16px 40px rgba(0, 0, 0, 0.28)', padding: '36px 28px', position: 'relative', overflow: 'hidden' }}>
        
        {/* 상단 타이틀 & 언어 선택 탭 */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '22px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 900, color: '#b38728', backgroundColor: '#faf6ee', border: '1px solid #d4af37', padding: '3px 10px', borderRadius: '4px', marginBottom: '6px' }}>
              <span>🌍 GLOBAL TRAVELER CONCIERGE</span>
              <span>·</span>
              <span>외국인 관광객 / 비즈니스 출장객 전용 VIP</span>
            </div>
            <h2 style={{ fontSize: '21px', fontWeight: 950, color: '#090d16', margin: 0, letterSpacing: '-0.5px' }}>
              Seoul Hotel In-Room Outcall VIP Massage · ソウル出張マッサージ · 首尔酒店上门SPA
            </h2>
            <p style={{ fontSize: '13px', color: '#64748b', margin: '4px 0 0' }}>
              한국 전화번호가 없어도 <strong>WhatsApp, LINE, WeChat</strong>으로 즉시 예약 가능합니다. (서울·인천 전 지역 30분 도착)
            </p>
          </div>

          {/* 언어 탭 선택 버튼 */}
          <div style={{ display: 'flex', gap: '6px', backgroundColor: '#f1f5f9', padding: '4px', borderRadius: '10px' }}>
            <button
              type="button"
              onClick={() => setGlobalLang('en')}
              style={{ padding: '6px 14px', borderRadius: '8px', fontSize: '12.5px', fontWeight: globalLang === 'en' ? 950 : 700, backgroundColor: globalLang === 'en' ? '#090d16' : 'transparent', color: globalLang === 'en' ? '#f3e5ab' : '#475569', border: 'none', cursor: 'pointer', transition: 'all 0.2s ease' }}
            >
              🇺🇸 English
            </button>
            <button
              type="button"
              onClick={() => setGlobalLang('jp')}
              style={{ padding: '6px 14px', borderRadius: '8px', fontSize: '12.5px', fontWeight: globalLang === 'jp' ? 950 : 700, backgroundColor: globalLang === 'jp' ? '#090d16' : 'transparent', color: globalLang === 'jp' ? '#f3e5ab' : '#475569', border: 'none', cursor: 'pointer', transition: 'all 0.2s ease' }}
            >
              🇯🇵 日本語
            </button>
            <button
              type="button"
              onClick={() => setGlobalLang('cn')}
              style={{ padding: '6px 14px', borderRadius: '8px', fontSize: '12.5px', fontWeight: globalLang === 'cn' ? 950 : 700, backgroundColor: globalLang === 'cn' ? '#090d16' : 'transparent', color: globalLang === 'cn' ? '#f3e5ab' : '#475569', border: 'none', cursor: 'pointer', transition: 'all 0.2s ease' }}
            >
              🇨🇳 中文
            </button>
          </div>
        </div>

        {/* 3개 언어별 안내 카드 */}
        <div style={{ backgroundColor: '#faf9f6', border: '1px solid #e8e0d0', borderRadius: '16px', padding: '22px 24px', marginBottom: '22px' }}>
          {globalLang === 'en' && (
            <div>
              <div style={{ fontSize: '16px', fontWeight: 950, color: '#090d16', marginBottom: '8px' }}>
                👑 5-Star Hotel & Residence In-Room Private Massage across Seoul & Incheon
              </div>
              <p style={{ fontSize: '13.5px', color: '#334155', lineHeight: 1.7, margin: '0 0 16px' }}>
                Visiting Seoul for vacation or business? Enjoy private, discrete luxury spa therapy delivered right to your hotel room (Four Seasons, Shilla, Grand Hyatt, Signiel, Marriott, etc.) within <strong>30 minutes</strong>. 
                <strong> 100% Pay On Arrival</strong> (Cash: KRW/USD or Any International Credit Card). <strong>Zero Advance Deposits Guaranteed!</strong>
              </p>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <Link href="/en" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', backgroundColor: '#090d16', color: '#f3e5ab', border: '1px solid #d4af37', padding: '9px 18px', borderRadius: '8px', fontSize: '12.5px', fontWeight: 900, textDecoration: 'none' }}>
                  View Full English Guide & Treatment Menu →
                </Link>
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', backgroundColor: '#25D366', color: '#ffffff', padding: '9px 18px', borderRadius: '8px', fontSize: '12.5px', fontWeight: 900, textDecoration: 'none' }}>
                  WhatsApp Chat (+82 10-6607-2239)
                </a>
              </div>
            </div>
          )}

          {globalLang === 'jp' && (
            <div>
              <div style={{ fontSize: '16px', fontWeight: 950, color: '#090d16', marginBottom: '8px' }}>
                👑 ソウル・仁川エリアのホテル客室へ30分でお伺いする高級出張マッサージ
              </div>
              <p style={{ fontSize: '13.5px', color: '#334155', lineHeight: 1.7, margin: '0 0 16px' }}>
                江南、明洞、東大門、弘大などソウル市内全域および仁川のホテル客室・レジデンスへ迅速に派遣いたします。
                安心の<strong>「完全現地払い（先払い・デポジット一切なし）」</strong>。日本円・韓国ウォン現金および各種クレジットカード（JCB/Visa/Master）ご利用可能です。LINEで簡単にご予約いただけます。
              </p>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <Link href="/jp" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', backgroundColor: '#090d16', color: '#f3e5ab', border: '1px solid #d4af37', padding: '9px 18px', borderRadius: '8px', fontSize: '12.5px', fontWeight: 900, textDecoration: 'none' }}>
                  日本語専用ページ・料金表を見る →
                </Link>
                <a href={LINE_LINK} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', backgroundColor: '#06C755', color: '#ffffff', padding: '9px 18px', borderRadius: '8px', fontSize: '12.5px', fontWeight: 900, textDecoration: 'none' }}>
                  LINEで簡単予約 (ID: abam1004)
                </a>
              </div>
            </div>
          )}

          {globalLang === 'cn' && (
            <div>
              <div style={{ fontSize: '16px', fontWeight: 950, color: '#090d16', marginBottom: '8px' }}>
                👑 首尔全境五星级酒店/公寓客房上门SPA服务 · 微信快速预约
              </div>
              <p style={{ fontSize: '13.5px', color: '#334155', lineHeight: 1.7, margin: '0 0 16px' }}>
                首尔江南、明洞、东大门、弘大及仁川全境酒店30分钟内急速到达。
                严选年轻20代高颜值专业技师，带齐高级芳香精油与专用床垫直达您的客房。
                <strong>100%到达当面付款，绝无任何提前转账风险！</strong> 支持韩币/人民币现金及银联/Visa信用卡刷卡。
              </p>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <Link href="/cn" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', backgroundColor: '#090d16', color: '#f3e5ab', border: '1px solid #d4af37', padding: '9px 18px', borderRadius: '8px', fontSize: '12.5px', fontWeight: 900, textDecoration: 'none' }}>
                  查看中文专页与项目价目表 →
                </Link>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', backgroundColor: '#07C160', color: '#ffffff', padding: '9px 18px', borderRadius: '8px', fontSize: '12.5px', fontWeight: 900 }}>
                  微信官方ID: {WECHAT_ID}
                </div>
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', backgroundColor: '#25D366', color: '#ffffff', padding: '9px 18px', borderRadius: '8px', fontSize: '12.5px', fontWeight: 900, textDecoration: 'none' }}>
                  WhatsApp预约
                </a>
              </div>
            </div>
          )}
        </div>

        {/* 4대 글로벌 메신저 원터치 연동 채널 그리드 */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: '10px' }}>
          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: '#ffffff', border: '1px solid #bbf7d0', padding: '12px 14px', borderRadius: '12px', textDecoration: 'none', boxShadow: '0 2px 8px rgba(37,211,102,0.15)' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#25D366', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '16px' }}>W</div>
            <div>
              <div style={{ fontSize: '12px', fontWeight: 950, color: '#090d16' }}>WhatsApp Chat</div>
              <div style={{ fontSize: '11px', color: '#16a34a' }}>+82 10-6607-2239</div>
            </div>
          </a>

          <a href={LINE_LINK} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: '#ffffff', border: '1px solid #bbf7d0', padding: '12px 14px', borderRadius: '12px', textDecoration: 'none', boxShadow: '0 2px 8px rgba(6,199,85,0.15)' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#06C755', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '15px' }}>L</div>
            <div>
              <div style={{ fontSize: '12px', fontWeight: 950, color: '#090d16' }}>LINE Official</div>
              <div style={{ fontSize: '11px', color: '#16a34a' }}>ID: abam1004</div>
            </div>
          </a>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: '#ffffff', border: '1px solid #dcfce7', padding: '12px 14px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(7,193,96,0.12)' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#07C160', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '15px' }}>微</div>
            <div>
              <div style={{ fontSize: '12px', fontWeight: 950, color: '#090d16' }}>WeChat Official</div>
              <div style={{ fontSize: '11px', color: '#15803d' }}>ID: {WECHAT_ID}</div>
            </div>
          </div>

          <a href={TELEGRAM_LINK} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: '#ffffff', border: '1px solid #bae6fd', padding: '12px 14px', borderRadius: '12px', textDecoration: 'none', boxShadow: '0 2px 8px rgba(34,158,217,0.15)' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#229ED9', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '15px' }}>T</div>
            <div>
              <div style={{ fontSize: '12px', fontWeight: 950, color: '#090d16' }}>Telegram Chat</div>
              <div style={{ fontSize: '11px', color: '#0284c7' }}>@abam1004</div>
            </div>
          </a>
        </div>
      </section>

      {/* ── 4대 매혹적인 센슈얼 갤러리 배너 (마사지 감각 극대화) ── */}
      <section style={{ backgroundColor: '#FAF6F2', borderBottom: '1px solid #ebd8cd', padding: '28px 20px' }}>
        <div style={{ maxWidth: '1080px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px' }}>
            {SENSORY_GALLERY.map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', backgroundColor: '#ffffff', border: '1px solid #ecd7c8', borderRadius: '12px', padding: '12px 14px', boxShadow: '0 2px 8px rgba(184,123,82,0.06)' }}>
                <div style={{ position: 'relative', width: '60px', height: '60px', borderRadius: '10px', overflow: 'hidden', flexShrink: 0, border: '1px solid #ebd8cd' }}>
                  <Image src={item.img} alt={item.title} fill style={{ objectFit: 'cover' }} />
                </div>
                <div>
                  <div style={{ fontSize: '10px', fontWeight: 800, color: '#B87B52', letterSpacing: '0.6px' }}>{item.tag}</div>
                  <div style={{ fontSize: '13.5px', fontWeight: 800, color: '#1c1412', marginTop: '1px' }}>{item.title}</div>
                  <div style={{ fontSize: '11.5px', color: '#6e5d57', marginTop: '2px', lineHeight: 1.35 }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4대 시그니처 힐링 포인트 (달빛 밤하늘 모티프 & 유화된 문구) ── */}
      <section style={{ backgroundColor: '#ffffff', padding: '44px 20px', borderBottom: '1px solid #ebd8cd' }}>
        <div style={{ maxWidth: '1080px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <span style={{ fontSize: '11.5px', fontWeight: 800, color: '#B87B52', letterSpacing: '1.2px', textTransform: 'uppercase' }}>SIGNATURE SENSORY WELLNESS</span>
            <h2 style={{ fontSize: '23px', fontWeight: 900, color: '#1c1412', margin: '4px 0 6px', letterSpacing: '-0.5px' }}>
              아름다운 밤 타이 홈케어 (Abam)만의 매혹적인 4대 테라피
            </h2>
            <p style={{ fontSize: '13.5px', color: '#6e5d57', margin: 0 }}>단순 마사지를 넘어, 온몸의 감각을 깨우는 전문 테라피스트의 정밀 수기 힐링을 선사합니다.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
            {[
              {
                icon: '🌸',
                title: '매혹적인 아로마 림프 케어',
                desc: '체온에 부드럽게 스며드는 최고급 식물성 오일로 전신 림프절을 자극하여 부종을 녹이고 피부 결을 매끄럽게 가꿔줍니다.',
                tag: '감미로운 림프 힐링',
              },
              {
                icon: '🧘',
                title: '왓포 정통 딥티슈 지압',
                desc: '태국 정통 왓포 방식으로 승모근, 척추기립근, 굳은 골반 관절을 정교한 체중 지압과 스트레칭으로 깊게 이완합니다.',
                tag: '만성 근육통 완화',
              },
              {
                icon: '🌙',
                title: '달빛 아래 프라이빗 시크릿 케어',
                desc: '이동 시간 없이 고객님의 자택, 호텔 객실, 오피스텔 등 가장 편안한 독립 공간에서 타인의 시선 없이 오롯이 누립니다.',
                tag: '1:1 방문 맞춤 스파',
              },
              {
                icon: '🛡️',
                title: '선입금 X · 100% 대면결제',
                desc: '예약금 없이 관리사가 도착한 것을 직접 확인하신 후 결제하시는 가장 투명하고 편안한 거래 방식만을 고수합니다.',
                tag: '100% 대면결제 원칙',
              },
            ].map((card, i) => (
              <div key={i} style={{ backgroundColor: '#FCFAF8', border: '1px solid #ebd8cd', borderRadius: '12px', padding: '22px 18px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 2px 10px rgba(184,123,82,0.06)' }}>
                <div>
                  <div style={{ fontSize: '28px', marginBottom: '10px' }}>{card.icon}</div>
                  <div style={{ fontSize: '11px', fontWeight: 800, color: '#9c542a', backgroundColor: '#fdf6f0', border: '1px solid #edd5c5', padding: '3px 8px', borderRadius: '4px', display: 'inline-block', marginBottom: '8px' }}>
                    {card.tag}
                  </div>
                  <h3 style={{ fontSize: '16px', fontWeight: 900, color: '#1c1412', margin: '0 0 8px', letterSpacing: '-0.3px' }}>{card.title}</h3>
                  <p style={{ fontSize: '13px', color: '#5e4e48', lineHeight: 1.6, margin: 0 }}>{card.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 본문 코스 안내 ── */}
      <main style={{ maxWidth: '1080px', margin: '0 auto', padding: '46px 20px 100px' }}>

        {/* 코스 안내 섹션 */}
        <section style={{ marginBottom: '54px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '22px', flexWrap: 'wrap', gap: '10px' }}>
            <div>
              <span style={{ fontSize: '11.5px', fontWeight: 800, color: '#B87B52', letterSpacing: '1px' }}>PROGRAM &amp; PRICE</span>
              <h2 style={{ fontSize: '24px', fontWeight: 900, color: '#1c1412', margin: '2px 0 0', letterSpacing: '-0.6px' }}>정찰제 코스 프로그램</h2>
              <p style={{ fontSize: '13px', color: '#6e5d57', margin: '4px 0 0' }}>VAT 포함 · 추가 출장비 없음 · 가격 흥정 없는 투명한 정찰제</p>
            </div>
          </div>

          {/* 탭 버튼 */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '26px' }}>
            {[{ id: 'all', label: '전체 코스' }, { id: 'thai', label: '타이 건식' }, { id: 'aroma', label: '아로마 오일' }, { id: 'vip', label: '👑 힐링 VIP (시그니처)' }].map(tab => (
              <button key={tab.id} onClick={() => setSelectedCourse(tab.id)} style={{ padding: '10px 22px', borderRadius: '6px', fontSize: '13.5px', fontWeight: selectedCourse === tab.id ? 800 : 600, cursor: 'pointer', border: selectedCourse === tab.id ? '1.5px solid #A0623A' : '1px solid #ebd8cd', backgroundColor: selectedCourse === tab.id ? '#A0623A' : '#ffffff', color: selectedCourse === tab.id ? '#ffffff' : '#5e4e48', transition: 'all 0.15s', boxShadow: selectedCourse === tab.id ? '0 2px 10px rgba(160,98,58,0.25)' : 'none' }}>
                {tab.label}
              </button>
            ))}
          </div>

          {/* 코스 카드 리스트 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            {visibleCourses.map(c => (
              <div key={c.id} style={{ backgroundColor: '#ffffff', border: c.isVip ? '2px solid #C58A62' : '1px solid #ebd8cd', borderRadius: '16px', overflow: 'hidden', boxShadow: c.isVip ? '0 10px 32px rgba(184,123,82,0.18)' : '0 4px 16px rgba(184,123,82,0.06)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', position: 'relative' }}>
                
                {/* 좌측: 실사 감성 테라피 이미지 */}
                <div style={{ position: 'relative', minHeight: '270px', backgroundColor: '#f8f4f0' }}>
                  <Image src={c.img} alt={c.name} fill style={{ objectFit: 'cover' }} priority={c.id === 'thai'} />
                  
                  {/* 상단 태그 */}
                  <div style={{ position: 'absolute', top: '12px', left: '12px', backgroundColor: c.isVip ? '#A0623A' : '#2d221e', color: '#ffffff', fontSize: '11px', fontWeight: 800, padding: '5px 11px', borderRadius: '4px', letterSpacing: '-0.2px', boxShadow: '0 2px 8px rgba(0,0,0,0.25)' }}>
                    {c.tag}
                  </div>

                  {/* 하단 특징 배너 */}
                  <div style={{ position: 'absolute', bottom: '12px', left: '12px', right: '12px', background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(6px)', padding: '9px 13px', borderRadius: '6px', fontSize: '11.5px', fontWeight: 800, color: '#1c1412', border: '1px solid #ebd8cd' }}>
                    {c.badge}
                  </div>
                </div>

                {/* 우측: 프로그램 상세 정보 & 가격 & 퀵 버튼 */}
                <div style={{ padding: '26px 28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <h3 style={{ fontSize: '20px', fontWeight: 900, color: '#1c1412', margin: 0, letterSpacing: '-0.4px' }}>{c.name}</h3>
                      {c.isVip && (
                        <span style={{ fontSize: '11px', fontWeight: 800, color: '#9c542a', backgroundColor: '#fdf6f0', border: '1px solid #d9bba7', padding: '3px 9px', borderRadius: '12px' }}>
                          인기 1위
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: '#B87B52', marginBottom: '12px' }}>{c.subtitle}</div>
                    <p style={{ fontSize: '13.5px', color: '#5e4e48', lineHeight: 1.65, margin: '0 0 16px' }}>{c.description}</p>
                    
                    {/* 핵심 특징 칩 */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '18px' }}>
                      {c.features.map((feat, fi) => (
                        <span key={fi} style={{ fontSize: '11.5px', color: '#804824', backgroundColor: '#fcf6f1', border: '1px solid #ecd8cb', padding: '3px 8px', borderRadius: '4px', fontWeight: 700 }}>
                          ✓ {feat}
                        </span>
                      ))}
                    </div>

                    <div style={{ backgroundColor: '#FAF6F2', border: '1px solid #ebd8cd', borderRadius: '8px', padding: '10px 14px', fontSize: '12px', color: '#4d3e38', marginBottom: '20px' }}>
                      <strong style={{ color: '#1c1412' }}>권장 대상:</strong> {c.recommend}
                    </div>
                  </div>

                  {/* 가격표 3종 */}
                  <div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginBottom: '16px' }}>
                      {c.prices.map((p, idx) => (
                        <div key={idx} style={{ backgroundColor: p.isBest ? '#FBF4EE' : '#FAF6F2', border: p.isBest ? '1.5px solid #d9bba7' : '1px solid #ebd8cd', borderRadius: '8px', padding: '10px 6px', textAlign: 'center' }}>
                          <div style={{ fontSize: '11px', color: '#7a6861', fontWeight: 600 }}>{p.time}</div>
                          <div style={{ fontSize: '16px', color: p.isBest ? '#A0623A' : '#1c1412', fontWeight: 900, marginTop: '2px' }}>{p.price}</div>
                          {p.isBest && <div style={{ fontSize: '10px', color: '#A0623A', fontWeight: 800, marginTop: '2px' }}>추천</div>}
                        </div>
                      ))}
                    </div>

                    {/* 카드 내 퀵 버튼 (일관된 순서: 카카오 ➔ 전화) */}
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <a href={KAKAO_URL} target="_blank" rel="noopener noreferrer" style={{ flex: 1.2, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', backgroundColor: '#FEE500', color: '#181600', fontWeight: 800, fontSize: '13px', padding: '11px 0', borderRadius: '6px', textDecoration: 'none', boxShadow: '0 2px 8px rgba(254,229,0,0.32)' }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 3C7.03 3 3 6.36 3 10.5c0 2.63 1.58 4.96 4 6.37L6 20l3.5-2.1c.8.17 1.63.26 2.5.26 4.97 0 9-3.36 9-7.5S16.97 3 12 3z" fill="#181600"/></svg>
                        카카오톡 예약
                      </a>
                      <a href={PHONE_TEL} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px', backgroundColor: '#1e3a8a', color: '#ffffff', fontWeight: 700, fontSize: '13px', padding: '11px 0', borderRadius: '6px', textDecoration: 'none', boxShadow: '0 2px 8px rgba(30,58,138,0.2)' }}>
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
        <section style={{ backgroundColor: '#ffffff', border: '1px solid #ebd8cd', borderRadius: '14px', padding: '30px 24px', marginBottom: '54px', boxShadow: '0 2px 10px rgba(184,123,82,0.06)' }}>
          <h2 style={{ fontSize: '19px', fontWeight: 900, color: '#1c1412', margin: '0 0 6px', textAlign: 'center', letterSpacing: '-0.3px' }}>3대 코스 특성 비교</h2>
          <p style={{ fontSize: '13px', color: '#6e5d57', margin: '0 0 22px', textAlign: 'center' }}>고객님의 컨디션과 선호에 맞는 최적의 코스를 확인하세요.</p>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left', minWidth: '580px' }}>
              <thead>
                <tr style={{ backgroundColor: '#FAF6F2', borderBottom: '1.5px solid #ebd8cd' }}>
                  <th style={{ padding: '12px 14px', color: '#6e5d57', fontWeight: 700, width: '16%' }}>구분</th>
                  <th style={{ padding: '12px 14px', color: '#1c1412', fontWeight: 800, width: '28%' }}>타이 정통 테라피</th>
                  <th style={{ padding: '12px 14px', color: '#1c1412', fontWeight: 800, width: '28%' }}>아로마 릴렉싱 테라피</th>
                  <th style={{ padding: '12px 14px', color: '#A0623A', fontWeight: 900, width: '28%', backgroundColor: '#FBF4EE' }}>👑 힐링 VIP (시그니처)</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_ROWS.map((row, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid #f2e7df', backgroundColor: idx % 2 === 0 ? '#ffffff' : '#FCFAF8' }}>
                    <td style={{ padding: '11px 14px', fontWeight: 700, color: '#6e5d57' }}>{row.category}</td>
                    <td style={{ padding: '11px 14px', color: '#443833' }}>{row.thai}</td>
                    <td style={{ padding: '11px 14px', color: '#443833' }}>{row.aroma}</td>
                    <td style={{ padding: '11px 14px', color: '#A0623A', fontWeight: 800, backgroundColor: '#FBF4EE' }}>{row.vip}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 3단계 간편 이용 프로세스 (유화된 문구) */}
        <section style={{ backgroundColor: '#FAF6F2', border: '1px solid #ebd8cd', borderRadius: '14px', padding: '34px 24px', marginBottom: '54px' }}>
          <div style={{ textAlign: 'center', marginBottom: '26px' }}>
            <span style={{ fontSize: '11.5px', fontWeight: 800, color: '#B87B52', letterSpacing: '1px' }}>EASY 3 STEPS</span>
            <h2 style={{ fontSize: '21px', fontWeight: 900, color: '#1c1412', margin: '4px 0 4px', letterSpacing: '-0.4px' }}>간편 이용 프로세스</h2>
            <p style={{ fontSize: '13px', color: '#6e5d57', margin: 0 }}>복잡한 가입 절차 없이, 30초 만에 예약하고 30분 내 편안하게 케어받으세요.</p>
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
                title: '대면 확인 후 결제 & 아름다운 밤 케어',
                desc: '관리사가 도착한 것을 직접 확인하신 후 안전하게 결제하시고 프라이빗 테라피를 누리세요.',
                highlight: '선입금 X · 100% 대면결제',
              },
            ].map((s, i) => (
              <div key={i} style={{ backgroundColor: '#ffffff', border: '1px solid #ecd7c8', borderRadius: '10px', padding: '20px', textAlign: 'center', boxShadow: '0 2px 8px rgba(184,123,82,0.04)' }}>
                <div style={{ fontSize: '12px', fontWeight: 900, color: '#B87B52', letterSpacing: '0.5px', marginBottom: '6px' }}>{s.step}</div>
                <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#1c1412', margin: '0 0 6px' }}>{s.title}</h3>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#9c542a', backgroundColor: '#fdf6f0', border: '1px solid #edd5c5', padding: '2px 8px', borderRadius: '4px', display: 'inline-block', marginBottom: '10px' }}>
                  {s.highlight}
                </div>
                <p style={{ fontSize: '12.5px', color: '#5e4e48', lineHeight: 1.55, margin: 0 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 중간 럭셔리 샴페인 로즈골드 CTA 배너 (달빛 서울 밤하늘 배경 모티프) */}
        <section style={{ position: 'relative', overflow: 'hidden', border: '1.5px solid #d9bba7', borderRadius: '18px', padding: '42px 28px', marginBottom: '54px', textAlign: 'center', boxShadow: '0 8px 24px rgba(184,123,82,0.14)' }}>
          {/* 서울 밤하늘 배경 은은한 오버레이 */}
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'url(/images/seoul_night_sky.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center 40%',
            opacity: 0.13,
            pointerEvents: 'none',
          }} />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, rgba(252,250,248,0.91) 0%, rgba(245,234,225,0.92) 50%, rgba(252,250,248,0.91) 100%)',
            pointerEvents: 'none',
          }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ fontSize: '13px', fontWeight: 800, color: '#B87B52', marginBottom: '6px', letterSpacing: '0.5px' }}>
              🌙 오늘 밤, 달빛 아래 오직 당신만을 위한 매혹적인 휴식이 시작됩니다
            </div>
            <h3 style={{ fontSize: '24px', fontWeight: 900, color: '#1c1412', margin: '0 0 10px', letterSpacing: '-0.5px' }}>
              선입금 X — 아름다운 밤 타이 홈케어 (Abam)
            </h3>
            <p style={{ fontSize: '14px', color: '#5e4e48', margin: '0 auto 24px', maxWidth: '580px' }}>
              새벽·심야 시간대에도 24시간 언제든 문의 가능합니다. 검증된 전문 테라피스트가 고객님의 힐링을 책임집니다.
            </p>
            {/* 일관된 순서: 카카오톡 실시간 예약 (좌) ➔ 전화상담 (우) */}
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href={KAKAO_URL} target="_blank" rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#FEE500', color: '#181600', fontWeight: 900, fontSize: '15px', padding: '14px 28px', borderRadius: '8px', textDecoration: 'none', boxShadow: '0 4px 16px rgba(254,229,0,0.4)' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 3C7.03 3 3 6.36 3 10.5c0 2.63 1.58 4.96 4 6.37L6 20l3.5-2.1c.8.17 1.63.26 2.5.26 4.97 0 9-3.36 9-7.5S16.97 3 12 3z" fill="#181600"/></svg>
                카카오톡 실시간 예약
              </a>
              <a href={PHONE_TEL}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#1e3a8a', color: '#ffffff', fontWeight: 800, fontSize: '15px', padding: '14px 28px', borderRadius: '8px', textDecoration: 'none', boxShadow: '0 4px 16px rgba(30,58,138,0.24)' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" fill="#ffffff"/></svg>
                {PHONE_NUM} 전화상담
              </a>
            </div>
          </div>
        </section>

        {/* SEO 지역 디렉토리 */}
        <section style={{ backgroundColor: '#ffffff', border: '1px solid #ebd8cd', borderRadius: '14px', padding: '28px 24px', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
          <h2 style={{ fontSize: '15px', fontWeight: 800, color: '#1c1412', margin: '0 0 6px' }}>수도권 출장 홈케어 지역 안내</h2>
          <p style={{ fontSize: '12.5px', color: '#6e5d57', margin: '0 0 18px' }}>왓포 출장 홈케어 · 강남 출장 홈케어 · 서울·경기 전지역 즉시 배차</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {SEO_REGIONS.map((reg, idx) => (
              <div key={idx} style={{ fontSize: '12.5px', lineHeight: 1.7 }}>
                <span style={{ fontWeight: 800, color: '#B87B52', marginRight: '8px' }}>{reg.name}:</span>
                {reg.keywords.map((k, ki) => (
                  <React.Fragment key={ki}>
                    <Link href={`/seo/${encodeURIComponent(k.slug)}`} style={{ color: '#5e4e48', textDecoration: 'none' }}>{k.label}</Link>
                    {ki < reg.keywords.length - 1 && <span style={{ color: '#d9cec6', margin: '0 5px' }}>·</span>}
                  </React.Fragment>
                ))}
              </div>
            ))}
          </div>
          <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid #f2e7df', fontSize: '11.5px', color: '#8c776e' }}>
            ※ 아름다운 밤 타이 홈케어(Abam)는 건전하고 투명한 프라이빗 힐링 테라피 문화만을 고수합니다.
          </div>
        </section>
      </main>

      {/* ── 하단 고정 예약 바 (일관된 순서: 카카오톡 실시간 예약 ➔ 전화상담) ── */}
      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(255,255,255,0.98)', backdropFilter: 'blur(12px)', borderTop: '1px solid #ebd8cd', padding: '10px 20px', display: 'flex', gap: '10px', zIndex: 50, boxShadow: '0 -4px 18px rgba(184,123,82,0.1)' }}>
        <div style={{ maxWidth: '1080px', width: '100%', margin: '0 auto', display: 'flex', gap: '10px' }}>
          {/* 일관된 순서 1: 카카오톡 실시간 예약 */}
          <a href={KAKAO_URL} target="_blank" rel="noopener noreferrer" style={{ flex: 1.3, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', backgroundColor: '#FEE500', color: '#181600', fontWeight: 900, fontSize: '14.5px', padding: '13px 0', borderRadius: '8px', textDecoration: 'none', boxShadow: '0 2px 10px rgba(254,229,0,0.35)' }}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none"><path d="M12 3C7.03 3 3 6.36 3 10.5c0 2.63 1.58 4.96 4 6.37L6 20l3.5-2.1c.8.17 1.63.26 2.5.26 4.97 0 9-3.36 9-7.5S16.97 3 12 3z" fill="#181600"/></svg>
            카카오톡 실시간 예약
          </a>
          {/* 일관된 순서 2: 전화상담 */}
          <a href={PHONE_TEL} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', backgroundColor: '#1e3a8a', color: '#ffffff', fontWeight: 800, fontSize: '14.5px', padding: '13px 0', borderRadius: '8px', textDecoration: 'none', boxShadow: '0 2px 10px rgba(30,58,138,0.22)' }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" fill="#ffffff"/></svg>
            전화상담
          </a>
        </div>
      </div>
    </div>
  );
}
