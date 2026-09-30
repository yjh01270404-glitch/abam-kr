import os

# 1. Prepare src/app/page.tsx
with open('hero_upgrade_chunk.txt', 'r', encoding='utf-8') as f:
    hero_chunk = f.read()

page_code = f"""'use client';

import React, {{ useState, useEffect }} from 'react';
import Image from 'next/image';
import Link from 'next/link';

const KAKAO_ID = 'Abam1004';
const KAKAO_LINK = 'kakaotalk://';
const PHONE_TEL = 'tel:010-6607-2239';
const PHONE_NUM = '010-6607-2239';
const WHATSAPP_LINK = 'https://wa.me/821066072239?text=Hello%20Abam%20Spa,%20I%20am%20interested%20in%20booking%20a%20hotel%20massage%20in%20Seoul.';

function AbamMoonLogo({{ size = 42 }}: {{ size?: number }}) {{
  return (
    <svg width={{size}} height={{size}} viewBox="0 0 48 48" fill="none" style={{{{ borderRadius: '10px', flexShrink: 0, boxShadow: '0 4px 14px rgba(0,0,0,0.3)', border: '1px solid rgba(212, 175, 55, 0.45)' }}}}>
      <rect width="48" height="48" rx="10" fill="url(#abamNightBg)" />
      <defs>
        <linearGradient id="abamNightBg" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#080c14" />
          <stop offset="0.6" stopColor="#0f172a" />
          <stop offset="1" stopColor="#05080f" />
        </linearGradient>
        <linearGradient id="abamMoon" x1="14" y1="12" x2="34" y2="36" gradientUnits="userSpaceOnUse">
          <stop stopColor="#f3e5ab" />
          <stop offset="0.5" stopColor="#d4af37" />
          <stop offset="1" stopColor="#997a29" />
        </linearGradient>
        <filter id="abamGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1.2" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      {{/* Night Sky Stars */}}
      <circle cx="36" cy="14" r="1.1" fill="#e5d5aa" opacity="0.9" />
      <path d="M36 10 L37 13 L40 14 L37 15 L36 18 L35 15 L32 14 L35 13 Z" fill="#d4af37" opacity="0.85" />
      <path d="M14 14 L14.7 15.8 L16.5 16.5 L14.7 17.2 L14 19 L13.3 17.2 L11.5 16.5 L13.3 15.8 Z" fill="#c5a880" opacity="0.75" />
      <circle cx="15" cy="34" r="0.9" fill="#e5d5aa" opacity="0.7" />
      {{/* Glowing Crescent Moon */}}
      <path d="M 27 12 C 18 12 13 19 13 27 C 13 35 20 40 29 40 C 23.5 38 19.5 32 19.5 26 C 19.5 18 24.5 13.5 32 12.8 C 30.5 12.2 28.8 12 27 12 Z" fill="url(#abamMoon)" filter="url(#abamGlow)" />
    </svg>
  );
}}

type CourseItem = {{
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
  prices: {{ time: string; price: string; isBest?: boolean }}[];
}};

const COURSES: CourseItem[] = [
  {{
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
      {{ time: '60분', price: '70,000원' }},
      {{ time: '90분', price: '90,000원', isBest: true }},
      {{ time: '120분', price: '110,000원' }},
    ],
  }},
  {{
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
      {{ time: '60분', price: '80,000원' }},
      {{ time: '90분', price: '110,000원', isBest: true }},
      {{ time: '120분', price: '140,000원' }},
    ],
  }},
  {{
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
      {{ time: '60분', price: '100,000원' }},
      {{ time: '90분', price: '140,000원', isBest: true }},
      {{ time: '120분', price: '180,000원' }},
    ],
  }},
];

const SENSORY_GALLERY = [
  {{
    img: '/images/sensual_touch.jpg',
    tag: 'SENSUAL TOUCH',
    title: '매혹적인 아로마 림프 케어',
    desc: '살결을 타고 흐르는 은은한 온기와 섬세한 손길의 전신 이완',
  }},
  {{
    img: '/images/sensual_back.jpg',
    tag: 'DEEP RELAXATION',
    title: '매끄러운 바디 라인 테라피',
    desc: '경직된 척추와 승모근을 부드럽게 감싸는 감각적인 휴식',
  }},
  {{
    img: '/images/sensual_lips.jpg',
    tag: 'TRANQUIL HEALING',
    title: '오직 나만을 위한 은밀한 시간',
    desc: '숨소리까지 차분해지는 완벽한 독립 공간 속 프라이빗 스파',
  }},
  {{
    img: '/images/sensual_care.jpg',
    tag: 'PURE ESSENTIAL',
    title: '최고급 천연 오일 테크닉',
    desc: '100% 천연 식물성 에센셜로 피로를 향기롭게 녹여내는 힐링',
  }},
];

const COMPARISON_ROWS = [
  {{ category: '가격대', thai: '7~11만원', aroma: '8~14만원', vip: '10~18만원' }},
  {{ category: '관리 기법', thai: '왓포 건식 수기 지압 & 전신 스트레칭', aroma: '천연 아로마 전신 림프 순환 케어', vip: '건식 지압(40분) + 천연 아로마(50분)' }},
  {{ category: '압의 강도', thai: '시원하고 깊은 압', aroma: '감미롭고 부드러운 압', vip: '시원한 지압 + 매혹적인 림프 압' }},
  {{ category: '오일 사용', thai: '오일 미사용 (순면 관리복)', aroma: '천연 식물성 에센셜 오일 도포', vip: '건식 후 프리미엄 천연 오일 집중 도포' }},
  {{ category: '주요 감각', thai: '관절 스트레칭, 깊은 개운함', aroma: '은은한 향기, 매끄러운 림프 순환', vip: '최상의 개운함 + 황홀한 심신 힐링' }},
];

const SEO_REGIONS = [
  {{
    name: '서울 강남권',
    keywords: [
      {{ label: '강남 출장 홈케어', slug: '강남출장홈케어' }},
      {{ label: '역삼 마사지', slug: '역삼출장마사지' }},
      {{ label: '논현 마사지', slug: '논현출장마사지' }},
      {{ label: '청담 홈케어', slug: '청담출장홈케어' }},
      {{ label: '선릉 출장케어', slug: '선릉출장마사지' }},
      {{ label: '서초 출장홈케어', slug: '서초출장홈케어' }},
      {{ label: '반포 마사지', slug: '반포출장마사지' }},
      {{ label: '송파 홈케어', slug: '송파출장홈케어' }},
      {{ label: '잠실 출장마사지', slug: '잠실출장마사지' }},
    ],
  }},
  {{
    name: '서울 강북·서부권',
    keywords: [
      {{ label: '마포 출장홈케어', slug: '마포출장홈케어' }},
      {{ label: '홍대 마사지', slug: '홍대출장마사지' }},
      {{ label: '합정 홈케어', slug: '합정출장홈케어' }},
      {{ label: '용산 출장마사지', slug: '용산출장마사지' }},
      {{ label: '한남 홈케어', slug: '한남출장홈케어' }},
      {{ label: '여의도 출장홈케어', slug: '여의도출장홈케어' }},
      {{ label: '영등포 마사지', slug: '영등포출장마사지' }},
      {{ label: '성수 홈케어', slug: '성수출장홈케어' }},
    ],
  }},
  {{
    name: '경기 남부권',
    keywords: [
      {{ label: '분당 출장홈케어', slug: '분당출장홈케어' }},
      {{ label: '판교 홈케어', slug: '판교출장홈케어' }},
      {{ label: '수원 출장마사지', slug: '수원출장홈케어' }},
      {{ label: '광교 홈케어', slug: '광교출장홈케어' }},
      {{ label: '용인 수지 마사지', slug: '수지출장마사지' }},
      {{ label: '동탄 출장홈케어', slug: '동탄출장홈케어' }},
      {{ label: '안양 평촌 마사지', slug: '평촌출장마사지' }},
      {{ label: '부천 출장홈케어', slug: '부천출장홈케어' }},
    ],
  }},
  {{
    name: '경기 북부·인천권',
    keywords: [
      {{ label: '일산 출장홈케어', slug: '일산출장홈케어' }},
      {{ label: '고양 마사지', slug: '고양출장마사지' }},
      {{ label: '김포 출장마사지', slug: '김포출장마사지' }},
      {{ label: '하남 미사 홈케어', slug: '하남출장홈케어' }},
      {{ label: '남양주 마사지', slug: '남양주출장마사지' }},
      {{ label: '인천 송도 홈케어', slug: '송도출장홈케어' }},
      {{ label: '부평 출장마사지', slug: '부평출장홈케어' }},
      {{ label: '청라 홈케어', slug: '청라출장홈케어' }},
    ],
  }},
];

export default function HomePage() {{
  const [selectedCourse, setSelectedCourse] = useState('all');
  const [pulse, setPulse] = useState(true);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [globalLang, setGlobalLang] = useState<'en' | 'jp' | 'cn'>('en');

  const handleKakaoConnect = (e: React.MouseEvent) => {{
    e.preventDefault();
    if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {{
      navigator.clipboard.writeText(KAKAO_ID).catch(() => {{}});
    }}
    setToastMsg(`카톡 ID [${{KAKAO_ID}}] 복사 완료 · 카카오톡 앱을 실행합니다.`);
    setTimeout(() => setToastMsg(null), 3500);
    window.location.href = KAKAO_LINK;
  }};

  const handlePhoneCall = () => {{
    window.location.href = PHONE_TEL;
  }};

  useEffect(() => {{
    const interval = setInterval(() => setPulse(p => !p), 1200);
    return () => clearInterval(interval);
  }}, []);

  const visibleCourses = selectedCourse === 'all' ? COURSES : COURSES.filter(c => c.id === selectedCourse);

  return (
    <div style={{{{
      minHeight: '100vh',
      backgroundColor: '#080c14',
      backgroundImage: "linear-gradient(180deg, rgba(8, 12, 20, 0.52) 0%, rgba(8, 12, 20, 0.84) 100%), url('/images/seoul_night_sky.jpg')",
      backgroundSize: 'cover',
      backgroundPosition: 'center top',
      backgroundAttachment: 'fixed',
      backgroundRepeat: 'no-repeat',
      color: '#18181b',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Pretendard Variable", Pretendard, "Apple SD Gothic Neo", sans-serif',
      paddingBottom: '90px',
    }}}}>

      {{/* ── 카카오 ID 복사 및 앱 연결 토스트 팝업 ── */}}
      {{toastMsg && (
        <div style={{{{
          position: 'fixed',
          top: '65px',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: '#090d16',
          border: '1.5px solid #d4af37',
          color: '#f3e5ab',
          padding: '12px 24px',
          borderRadius: '30px',
          fontSize: '13.5px',
          fontWeight: 900,
          zIndex: 99999,
          boxShadow: '0 8px 30px rgba(0,0,0,0.6)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
        }}}}>
          <span style={{{{ fontSize: '18px' }}}}>💬</span>
          <span>{{toastMsg}}</span>
        </div>
      )}}

      {{/* ── 최상단 프레스티지 블랙 & 샴페인 골드 안내 띠 ── */}}
      <div style={{{{ background: '#070a10', borderBottom: '1px solid rgba(212, 175, 55, 0.45)', color: '#f3e5ab', padding: '10px 16px', textAlign: 'center', fontSize: '12px', fontWeight: 800, letterSpacing: '0.5px', boxShadow: '0 2px 12px rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}}}>
        <span>🌙 GANGNAM MIDNIGHT VIP · 강남·청담 프라이빗 나이트 홈케어 · 선입금 X 100% 현장 대면결제 · 새벽 5시 마감</span>
        <span style={{{{ color: '#d4af37' }}}}>|</span>
        <span style={{{{ color: '#ffffff' }}}}>🌍 Foreigners Welcome · Hotel In-Room VIP Spa · WhatsApp 24/7 Available</span>
      </div>

      {{/* ── 상단 네비게이션 헤더 ── */}}
      <header style={{{{ position: 'sticky', top: 0, zIndex: 50, backgroundColor: 'rgba(255,255,255,0.98)', backdropFilter: 'blur(16px)', borderBottom: '1.5px solid rgba(212, 175, 55, 0.35)', boxShadow: '0 4px 22px rgba(0,0,0,0.18)' }}}}>
        <div style={{{{ maxWidth: '1080px', margin: '0 auto', padding: '12px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}}}>
          <div style={{{{ display: 'flex', alignItems: 'center', gap: '12px' }}}}>
            <AbamMoonLogo size={44} />
            <div>
              <div style={{{{ display: 'flex', alignItems: 'center', gap: '8px' }}}}>
                <span style={{{{ fontSize: '18px', fontWeight: 950, color: '#090d16', letterSpacing: '-0.5px' }}}}>
                  아름다운 밤 <span style={{{{ color: '#b38728', fontSize: '16.5px', fontWeight: 900 }}}}>타이 홈케어</span>
                </span>
                <span style={{{{ fontSize: '10.5px', fontWeight: 900, color: '#b38728', backgroundColor: '#faf6ee', border: '1px solid #d4af37', padding: '2px 8px', borderRadius: '4px', letterSpacing: '0.5px' }}}}>
                  Abam
                </span>
              </div>
              <span style={{{{ display: 'block', fontSize: '11px', color: '#64748b', fontWeight: 700, letterSpacing: '0.4px', marginTop: '1px' }}}}>
                MIDNIGHT VIP SENSORY THERAPY · 프라이빗 심야 힐링
              </span>
            </div>
          </div>

          {{/* 우측: 다국어 스위처 & 예약 버튼 그룹 (WhatsApp / 카카오 / 전화) */}}
          <div style={{{{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}}}>
            <div style={{{{ display: 'flex', alignItems: 'center', gap: '4px', background: '#f1f5f9', padding: '3px 6px', borderRadius: '8px', border: '1px solid #e2e8f0' }}}}>
              <span style={{{{ fontSize: '11px', fontWeight: 950, color: '#090d16', background: '#ffffff', padding: '3px 7px', borderRadius: '5px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}}}>🇰🇷 KR</span>
              <Link href="/en" style={{{{ fontSize: '11px', fontWeight: 800, color: '#475569', textDecoration: 'none', padding: '3px 6px' }}}}>🇺🇸 EN</Link>
              <Link href="/jp" style={{{{ fontSize: '11px', fontWeight: 800, color: '#475569', textDecoration: 'none', padding: '3px 6px' }}}}>🇯🇵 JP</Link>
              <Link href="/cn" style={{{{ fontSize: '11px', fontWeight: 800, color: '#475569', textDecoration: 'none', padding: '3px 6px' }}}}>🇨🇳 CN</Link>
            </div>

            <a href={{WHATSAPP_LINK}} target="_blank" rel="noopener noreferrer" style={{{{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '12.5px', fontWeight: 900, color: '#ffffff', backgroundColor: '#25D366', padding: '9px 13px', borderRadius: '6px', textDecoration: 'none', boxShadow: '0 2px 8px rgba(37,211,102,0.3)', cursor: 'pointer' }}}}>
              WhatsApp
            </a>

            <a href={{KAKAO_LINK}} onClick={{handleKakaoConnect}} style={{{{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '13px', fontWeight: 900, color: '#181600', backgroundColor: '#FEE500', padding: '9px 16px', borderRadius: '6px', textDecoration: 'none', boxShadow: '0 2px 10px rgba(254,229,0,0.32)', cursor: 'pointer' }}}}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 3C7.03 3 3 6.36 3 10.5c0 2.63 1.58 4.96 4 6.37L6 20l3.5-2.1c.8.17 1.63.26 2.5.26 4.97 0 9-3.36 9-7.5S16.97 3 12 3z" fill="#181600"/></svg>
              카톡: {{KAKAO_ID}}
            </a>
            <a href={{PHONE_TEL}} onClick={{handlePhoneCall}} style={{{{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '13px', fontWeight: 800, color: '#f8fafc', padding: '9px 16px', borderRadius: '6px', textDecoration: 'none', backgroundColor: '#090d16', border: '1px solid #d4af37', boxShadow: '0 2px 10px rgba(0,0,0,0.3)', cursor: 'pointer' }}}}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" fill="#f8fafc"/></svg>
              전화예약
            </a>
          </div>
        </div>
      </header>

      {{/* ── 본문 중앙 럭셔리 컨테이너 ── */}}
      <main style={{{{ maxWidth: '1080px', margin: '24px auto', padding: '0 16px', display: 'flex', flexDirection: 'column', gap: '26px' }}}}>

        {{/* ── 매혹적인 분위기의 럭셔리 스파 히어로 카드 & 오늘 밤 출근 20대 S급 에이스 라인업 ── */}}
        <section style={{{{ position: 'relative', overflow: 'hidden', backgroundColor: '#ffffff', borderRadius: '22px', border: '1.5px solid rgba(212, 175, 55, 0.45)', boxShadow: '0 0 35px rgba(212, 175, 55, 0.16), 0 22px 50px rgba(0, 0, 0, 0.36)', padding: '46px 32px' }}}}>
          <div style={{{{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'url(/images/seoul_night_sky.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center 35%',
            opacity: 0.09,
            filter: 'saturate(1.1)',
            pointerEvents: 'none',
          }}}} />
          <div style={{{{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.97) 100%)',
            pointerEvents: 'none',
          }}}} />

{hero_chunk}

        {{/* ── 🌍 외국인 전용 글로벌 호텔 인룸 VIP 컨시어지 카드 (단일 왓츠앱 & 직통전화 통합) ── */}}
        <section style={{{{ backgroundColor: '#ffffff', borderRadius: '20px', border: '1.5px solid rgba(212, 175, 55, 0.55)', boxShadow: '0 12px 35px rgba(212, 175, 55, 0.16), 0 16px 40px rgba(0, 0, 0, 0.28)', padding: '36px 28px', position: 'relative', overflow: 'hidden' }}}}>
          <div style={{{{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '22px', flexWrap: 'wrap', gap: '12px' }}}}>
            <div>
              <div style={{{{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 900, color: '#b38728', backgroundColor: '#faf6ee', border: '1px solid #d4af37', padding: '3px 10px', borderRadius: '4px', marginBottom: '6px' }}}}>
                <span>🌍 GLOBAL TRAVELER CONCIERGE</span>
                <span>·</span>
                <span>외국인 관광객 / 비즈니스 출장객 전용 VIP</span>
              </div>
              <h2 style={{{{ fontSize: '21px', fontWeight: 950, color: '#090d16', margin: 0, letterSpacing: '-0.5px' }}}}>
                Seoul Hotel In-Room Outcall VIP Massage · ソウル出張マッサージ · 首尔酒店上门SPA
              </h2>
              <p style={{{{ fontSize: '13px', color: '#64748b', margin: '4px 0 0' }}}}>
                한국 전화번호가 없어도 <strong>WhatsApp</strong> 또는 <strong>직통 전화</strong>로 즉시 예약 가능합니다. (서울·인천 전 지역 30분 도착)
              </p>
            </div>

            <div style={{{{ display: 'flex', gap: '6px', backgroundColor: '#f1f5f9', padding: '4px', borderRadius: '10px' }}}}>
              <button
                type="button"
                onClick={{() => setGlobalLang('en')}}
                style={{{{ padding: '6px 14px', borderRadius: '8px', fontSize: '12.5px', fontWeight: globalLang === 'en' ? 950 : 700, backgroundColor: globalLang === 'en' ? '#090d16' : 'transparent', color: globalLang === 'en' ? '#f3e5ab' : '#475569', border: 'none', cursor: 'pointer', transition: 'all 0.2s ease' }}}}
              >
                🇺🇸 English
              </button>
              <button
                type="button"
                onClick={{() => setGlobalLang('jp')}}
                style={{{{ padding: '6px 14px', borderRadius: '8px', fontSize: '12.5px', fontWeight: globalLang === 'jp' ? 950 : 700, backgroundColor: globalLang === 'jp' ? '#090d16' : 'transparent', color: globalLang === 'jp' ? '#f3e5ab' : '#475569', border: 'none', cursor: 'pointer', transition: 'all 0.2s ease' }}}}
              >
                🇯🇵 日本語
              </button>
              <button
                type="button"
                onClick={{() => setGlobalLang('cn')}}
                style={{{{ padding: '6px 14px', borderRadius: '8px', fontSize: '12.5px', fontWeight: globalLang === 'cn' ? 950 : 700, backgroundColor: globalLang === 'cn' ? '#090d16' : 'transparent', color: globalLang === 'cn' ? '#f3e5ab' : '#475569', border: 'none', cursor: 'pointer', transition: 'all 0.2s ease' }}}}
              >
                🇨🇳 中文
              </button>
            </div>
          </div>

          <div style={{{{ backgroundColor: '#faf9f6', border: '1px solid #e8e0d0', borderRadius: '16px', padding: '22px 24px', marginBottom: '22px' }}}}>
            {{globalLang === 'en' && (
              <div>
                <div style={{{{ fontSize: '16px', fontWeight: 950, color: '#090d16', marginBottom: '8px' }}}}>
                  👑 5-Star Hotel & Residence In-Room Private Massage across Seoul & Incheon
                </div>
                <p style={{{{ fontSize: '13.5px', color: '#334155', lineHeight: 1.7, margin: '0 0 16px' }}}}>
                  Visiting Seoul for vacation or business? Enjoy private, discrete luxury spa therapy delivered right to your hotel room (Four Seasons, Shilla, Grand Hyatt, Signiel, Marriott, etc.) within <strong>30 minutes</strong>. 
                  <strong> 100% Pay On Arrival</strong> (Cash: KRW/USD or Any International Credit Card). <strong>Zero Advance Deposits Guaranteed!</strong>
                </p>
                <div style={{{{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}}}>
                  <Link href="/en" style={{{{ display: 'inline-flex', alignItems: 'center', gap: '6px', backgroundColor: '#090d16', color: '#f3e5ab', border: '1px solid #d4af37', padding: '9px 18px', borderRadius: '8px', fontSize: '12.5px', fontWeight: 900, textDecoration: 'none' }}}}>
                    View Full English Guide & Treatment Menu →
                  </Link>
                  <a href={{WHATSAPP_LINK}} target="_blank" rel="noopener noreferrer" style={{{{ display: 'inline-flex', alignItems: 'center', gap: '6px', backgroundColor: '#25D366', color: '#ffffff', padding: '9px 18px', borderRadius: '8px', fontSize: '12.5px', fontWeight: 900, textDecoration: 'none', boxShadow: '0 2px 8px rgba(37,211,102,0.3)' }}}}>
                    WhatsApp Chat (+82 10-6607-2239)
                  </a>
                </div>
              </div>
            )}}

            {{globalLang === 'jp' && (
              <div>
                <div style={{{{ fontSize: '16px', fontWeight: 950, color: '#090d16', marginBottom: '8px' }}}}>
                  👑 ソウル・仁川エリアのホテル客室へ30分でお伺いする高級出張マッサージ
                </div>
                <p style={{{{ fontSize: '13.5px', color: '#334155', lineHeight: 1.7, margin: '0 0 16px' }}}}>
                  江南、明洞、東大門、弘大などソウル市内全域および仁川のホテル客室・レジデンスへ迅速に派遣いたします。
                  安心の<strong>「完全現地払い（先払い・デポジット一切なし）」</strong>。日本円・韓国ウォン現金および各種クレジットカード（JCB/Visa/Master）ご利用可能です。WhatsAppまたはお電話で簡単にご予約いただけます。
                </p>
                <div style={{{{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}}}>
                  <Link href="/jp" style={{{{ display: 'inline-flex', alignItems: 'center', gap: '6px', backgroundColor: '#090d16', color: '#f3e5ab', border: '1px solid #d4af37', padding: '9px 18px', borderRadius: '8px', fontSize: '12.5px', fontWeight: 900, textDecoration: 'none' }}}}>
                    日本語専用ページ・料金表を見る →
                  </Link>
                  <a href={{WHATSAPP_LINK}} target="_blank" rel="noopener noreferrer" style={{{{ display: 'inline-flex', alignItems: 'center', gap: '6px', backgroundColor: '#25D366', color: '#ffffff', padding: '9px 18px', borderRadius: '8px', fontSize: '12.5px', fontWeight: 900, textDecoration: 'none', boxShadow: '0 2px 8px rgba(37,211,102,0.3)' }}}}>
                    WhatsAppで簡単予約 (+82 10-6607-2239)
                  </a>
                </div>
              </div>
            )}}

            {{globalLang === 'cn' && (
              <div>
                <div style={{{{ fontSize: '16px', fontWeight: 950, color: '#090d16', marginBottom: '8px' }}}}>
                  👑 首尔全境五星级酒店/公寓客房上门SPA服务 · WhatsApp快速预约
                </div>
                <p style={{{{ fontSize: '13.5px', color: '#334155', lineHeight: 1.7, margin: '0 0 16px' }}}}>
                  首尔江南、明洞、东大门、弘大及仁川全境酒店30分钟内急速到达。
                  严选年轻20代高颜值专业技师，带齐高级芳香精油与专用床垫直达您的客房。
                  <strong>100%到达当面付款，绝无任何提前转账风险！</strong> 支持韩币/人民币现金及银联/Visa信用卡刷卡。
                </p>
                <div style={{{{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}}}>
                  <Link href="/cn" style={{{{ display: 'inline-flex', alignItems: 'center', gap: '6px', backgroundColor: '#090d16', color: '#f3e5ab', border: '1px solid #d4af37', padding: '9px 18px', borderRadius: '8px', fontSize: '12.5px', fontWeight: 900, textDecoration: 'none' }}}}>
                    查看中文专页与项目价目表 →
                  </Link>
                  <a href={{WHATSAPP_LINK}} target="_blank" rel="noopener noreferrer" style={{{{ display: 'inline-flex', alignItems: 'center', gap: '6px', backgroundColor: '#25D366', color: '#ffffff', padding: '9px 18px', borderRadius: '8px', fontSize: '12.5px', fontWeight: 900, textDecoration: 'none', boxShadow: '0 2px 8px rgba(37,211,102,0.3)' }}}}>
                    WhatsApp预约 (+82 10-6607-2239)
                  </a>
                </div>
              </div>
            )}}
          </div>

          {{/* 2대 글로벌 전용 채널 (WhatsApp & 직통전화) 원터치 연동 그리드 */}}
          <div style={{{{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px' }}}}>
            <a href={{WHATSAPP_LINK}} target="_blank" rel="noopener noreferrer" style={{{{ display: 'flex', alignItems: 'center', gap: '12px', backgroundColor: '#ffffff', border: '1.5px solid #22c55e', padding: '14px 18px', borderRadius: '12px', textDecoration: 'none', boxShadow: '0 3px 12px rgba(37,211,102,0.2)' }}}}>
              <div style={{{{ width: '38px', height: '38px', borderRadius: '10px', backgroundColor: '#25D366', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '18px' }}}}>W</div>
              <div>
                <div style={{{{ fontSize: '13.5px', fontWeight: 950, color: '#090d16' }}}}>WhatsApp 24/7 Global Chat</div>
                <div style={{{{ fontSize: '12px', color: '#16a34a', fontWeight: 800 }}}}>+82 10-6607-2239 (Instant Message)</div>
              </div>
            </a>

            <a href="tel:+82-10-6607-2239" style={{{{ display: 'flex', alignItems: 'center', gap: '12px', backgroundColor: '#090d16', border: '1.5px solid #d4af37', padding: '14px 18px', borderRadius: '12px', textDecoration: 'none', boxShadow: '0 3px 12px rgba(0,0,0,0.3)' }}}}>
              <div style={{{{ width: '38px', height: '38px', borderRadius: '10px', backgroundColor: '#d4af37', color: '#090d16', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '18px' }}}}>📞</div>
              <div>
                <div style={{{{ fontSize: '13.5px', fontWeight: 950, color: '#f3e5ab' }}}}>24/7 Hotel Direct Hotline</div>
                <div style={{{{ fontSize: '12px', color: '#cbd5e1', fontWeight: 700 }}}}>+82 10-6607-2239 (English / Korean)</div>
              </div>
            </a>
          </div>
        </section>

        {{/* ── 4대 매혹적인 센슈얼 갤러리 카드 (골드 앰비언트 글로우) ── */}}
        <section style={{{{ backgroundColor: '#ffffff', borderRadius: '20px', border: '1px solid #e8e0d0', boxShadow: '0 12px 32px rgba(0, 0, 0, 0.28)', padding: '24px 20px' }}}}>
          <div style={{{{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px' }}}}>
            {{SENSORY_GALLERY.map((item, i) => (
              <div key={{i}} style={{{{ display: 'flex', alignItems: 'center', gap: '12px', backgroundColor: '#faf9f6', border: '1px solid #e8e0d0', borderRadius: '12px', padding: '12px 14px' }}}}>
                <div style={{{{ position: 'relative', width: '60px', height: '60px', borderRadius: '10px', overflow: 'hidden', flexShrink: 0, border: '1.5px solid rgba(212, 175, 55, 0.45)' }}}}>
                  <Image src={{item.img}} alt={{item.title}} fill style={{{{ objectFit: 'cover' }}}} />
                </div>
                <div>
                  <div style={{{{ fontSize: '10px', fontWeight: 900, color: '#b38728', letterSpacing: '0.8px' }}}}>{{item.tag}}</div>
                  <div style={{{{ fontSize: '13.5px', fontWeight: 900, color: '#090d16', marginTop: '1px' }}}}>{{item.title}}</div>
                  <div style={{{{ fontSize: '11.5px', color: '#475569', marginTop: '2px', lineHeight: 1.35 }}}}>{{item.desc}}</div>
                </div>
              </div>
            ))}}
          </div>
        </section>

        {{/* ── 4대 시그니처 힐링 포인트 카드 (미드나잇 VIP 시크릿) ── */}}
        <section style={{{{ backgroundColor: '#ffffff', borderRadius: '20px', border: '1px solid #e8e0d0', boxShadow: '0 12px 32px rgba(0, 0, 0, 0.28)', padding: '38px 24px' }}}}>
          <div style={{{{ textAlign: 'center', marginBottom: '28px' }}}}>
            <span style={{{{ fontSize: '11.5px', fontWeight: 900, color: '#b38728', letterSpacing: '1.2px', textTransform: 'uppercase' }}}}>MIDNIGHT VIP SENSORY WELLNESS</span>
            <h2 style={{{{ fontSize: '24px', fontWeight: 950, color: '#090d16', margin: '4px 0 6px', letterSpacing: '-0.5px' }}}}>
              아름다운 밤 타이 홈케어 (Abam)만의 4대 웰니스 테라피
            </h2>
            <p style={{{{ fontSize: '13.5px', color: '#64748b', margin: 0 }}}}>단순 마사지를 넘어, 온몸의 감각을 깨우는 전문 테라피스트의 정밀 수기 힐링을 선사합니다.</p>
          </div>

          <div style={{{{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}}}>
            {{[
              {{
                icon: '🌸',
                title: '매혹적인 아로마 림프 케어',
                desc: '체온에 부드럽게 스며드는 최고급 식물성 오일로 전신 림프절을 자극하여 부종을 녹이고 피부 결을 매끄럽게 가꿔줍니다.',
                tag: '감미로운 림프 힐링',
              }},
              {{
                icon: '🧘',
                title: '왓포 정통 딥티슈 지압',
                desc: '태국 정통 왓포 방식으로 승모근, 척추기립근, 굳은 골반 관절을 정교한 체중 지압과 스트레칭으로 깊게 이완합니다.',
                tag: '만성 근육통 완화',
              }},
              {{
                icon: '🌙',
                title: '달빛 아래 프라이빗 시크릿 케어',
                desc: '이동 시간 없이 고객님의 자택, 호텔 객실, 오피스텔 등 가장 편안한 독립 공간에서 타인의 시선 없이 오롯이 누립니다.',
                tag: '1:1 방문 맞춤 스파',
              }},
              {{
                icon: '🛡️',
                title: '선입금 X · 100% 대면결제',
                desc: '예약금 없이 관리사가 도착한 것을 직접 확인하신 후 결제하시는 가장 투명하고 편안한 거래 방식만을 고수합니다.',
                tag: '100% 대면결제 원칙',
              }},
            ].map((card, i) => (
              <div key={{i}} style={{{{ backgroundColor: '#faf9f6', border: '1px solid #e8e0d0', borderRadius: '16px', padding: '24px 20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}}}>
                <div>
                  <div style={{{{ fontSize: '28px', marginBottom: '10px' }}}}>{{card.icon}}</div>
                  <div style={{{{ fontSize: '11px', fontWeight: 900, color: '#b38728', backgroundColor: '#faf6ee', border: '1px solid #d4af37', padding: '3px 8px', borderRadius: '4px', display: 'inline-block', marginBottom: '8px' }}}}>
                    {{card.tag}}
                  </div>
                  <h3 style={{{{ fontSize: '16px', fontWeight: 950, color: '#090d16', margin: '0 0 8px', letterSpacing: '-0.3px' }}}}>{{card.title}}</h3>
                  <p style={{{{ fontSize: '13px', color: '#475569', lineHeight: 1.6, margin: 0 }}}}>{{card.desc}}</p>
                </div>
              </div>
            ))}}
          </div>
        </section>

        {{/* ── 정찰제 코스 프로그램 카드 ── */}}
        <section style={{{{ backgroundColor: '#ffffff', borderRadius: '20px', border: '1px solid #e8e0d0', boxShadow: '0 12px 32px rgba(0, 0, 0, 0.28)', padding: '38px 24px' }}}}>
          <div style={{{{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '22px', flexWrap: 'wrap', gap: '10px' }}}}>
            <div>
              <span style={{{{ fontSize: '11.5px', fontWeight: 900, color: '#b38728', letterSpacing: '1px' }}}}>PROGRAM &amp; PRICE</span>
              <h2 style={{{{ fontSize: '24px', fontWeight: 950, color: '#090d16', margin: '2px 0 0', letterSpacing: '-0.6px' }}}}>정찰제 코스 프로그램</h2>
              <p style={{{{ fontSize: '13px', color: '#64748b', margin: '4px 0 0' }}}}>VAT 포함 · 추가 출장비 없음 · 가격 흥정 없는 투명한 정찰제</p>
            </div>
          </div>

          {{/* 탭 버튼 */}}
          <div style={{{{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}}}>
            {{[{{ id: 'all', label: '전체 코스' }}, {{ id: 'thai', label: '타이 건식' }}, {{ id: 'aroma', label: '아로마 오일' }}, {{ id: 'vip', label: '👑 힐링 VIP (시그니처)' }}].map(tab => (
              <button key={{tab.id}} onClick={{() => setSelectedCourse(tab.id)}} style={{{{ padding: '9px 20px', borderRadius: '6px', fontSize: '13.5px', fontWeight: selectedCourse === tab.id ? 900 : 700, cursor: 'pointer', border: selectedCourse === tab.id ? '1.5px solid #d4af37' : '1px solid #e2e8f0', backgroundColor: selectedCourse === tab.id ? '#090d16' : '#ffffff', color: selectedCourse === tab.id ? '#f3e5ab' : '#475569', transition: 'all 0.15s', boxShadow: selectedCourse === tab.id ? '0 2px 10px rgba(0,0,0,0.2)' : 'none' }}}}>
                {{tab.label}}
              </button>
            ))}}
          </div>

          {{/* 코스 카드 리스트 */}}
          <div style={{{{ display: 'flex', flexDirection: 'column', gap: '26px' }}}}>
            {{visibleCourses.map(c => (
              <div key={{c.id}} style={{{{ backgroundColor: '#ffffff', border: c.isVip ? '2px solid #d4af37' : '1px solid #e8e0d0', borderRadius: '18px', overflow: 'hidden', boxShadow: c.isVip ? '0 8px 30px rgba(212,175,55,0.18)' : '0 3px 12px rgba(0,0,0,0.04)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', position: 'relative' }}}}>
                <div style={{{{ position: 'relative', minHeight: '260px', backgroundColor: '#f8f6f2' }}}}>
                  <Image src={{c.img}} alt={{c.name}} fill style={{{{ objectFit: 'cover' }}}} priority={{c.id === 'thai'}} />
                  <div style={{{{ position: 'absolute', top: '12px', left: '12px', backgroundColor: c.isVip ? '#090d16' : '#1e293b', border: '1px solid #d4af37', color: '#f3e5ab', fontSize: '11px', fontWeight: 900, padding: '4px 10px', borderRadius: '4px', letterSpacing: '-0.2px' }}}}>
                    {{c.tag}}
                  </div>
                  <div style={{{{ position: 'absolute', bottom: '12px', left: '12px', right: '12px', background: 'rgba(255,255,255,0.94)', backdropFilter: 'blur(6px)', padding: '8px 12px', borderRadius: '6px', fontSize: '11px', fontWeight: 800, color: '#090d16', border: '1px solid #e8e0d0' }}}}>
                    {{c.badge}}
                  </div>
                </div>

                <div style={{{{ padding: '24px 26px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}}}>
                  <div>
                    <div style={{{{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}}}>
                      <h3 style={{{{ fontSize: '20px', fontWeight: 950, color: '#090d16', margin: 0, letterSpacing: '-0.4px' }}}}>{{c.name}}</h3>
                      {{c.isVip && (
                        <span style={{{{ fontSize: '11px', fontWeight: 900, color: '#b38728', backgroundColor: '#faf6ee', border: '1px solid #d4af37', padding: '3px 8px', borderRadius: '12px' }}}}>
                          인기 1위
                        </span>
                      )}}
                    </div>
                    <div style={{{{ fontSize: '13px', fontWeight: 800, color: '#b38728', marginBottom: '12px' }}}}>{{c.subtitle}}</div>
                    <p style={{{{ fontSize: '13.5px', color: '#475569', lineHeight: 1.6, margin: '0 0 14px' }}}}>{{c.description}}</p>
                    
                    <div style={{{{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}}}>
                      {{c.features.map((feat, fi) => (
                        <span key={{fi}} style={{{{ fontSize: '11.5px', color: '#b38728', backgroundColor: '#faf6ee', border: '1px solid #eddcc6', padding: '3px 8px', borderRadius: '4px', fontWeight: 700 }}}}>
                          ✓ {{feat}}
                        </span>
                      ))}}
                    </div>

                    <div style={{{{ backgroundColor: '#faf9f6', border: '1px solid #e8e0d0', borderRadius: '6px', padding: '9px 12px', fontSize: '12px', color: '#475569', marginBottom: '18px' }}}}>
                      <strong style={{{{ color: '#090d16' }}}}>권장 대상:</strong> {{c.recommend}}
                    </div>
                  </div>

                  <div>
                    <div style={{{{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginBottom: '14px' }}}}>
                      {{c.prices.map((p, idx) => (
                        <div key={{idx}} style={{{{ backgroundColor: p.isBest ? '#faf6ee' : '#faf9f6', border: p.isBest ? '1.5px solid #d4af37' : '1px solid #e8e0d0', borderRadius: '8px', padding: '10px 6px', textAlign: 'center' }}}}>
                          <div style={{{{ fontSize: '11px', color: '#64748b', fontWeight: 700 }}}}>{{p.time}}</div>
                          <div style={{{{ fontSize: '15.5px', color: p.isBest ? '#b38728' : '#090d16', fontWeight: 950, marginTop: '2px' }}}}>{{p.price}}</div>
                          {{p.isBest && <div style={{{{ fontSize: '10px', color: '#b38728', fontWeight: 900, marginTop: '2px' }}}}>추천</div>}}
                        </div>
                      ))}}
                    </div>

                    <div style={{{{ display: 'flex', gap: '8px' }}}}>
                      <a href={{KAKAO_LINK}} onClick={{handleKakaoConnect}} style={{{{ flex: 1.2, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', backgroundColor: '#FEE500', color: '#181600', fontWeight: 900, fontSize: '13px', padding: '10px 0', borderRadius: '6px', textDecoration: 'none', boxShadow: '0 2px 6px rgba(254,229,0,0.3)', cursor: 'pointer' }}}}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 3C7.03 3 3 6.36 3 10.5c0 2.63 1.58 4.96 4 6.37L6 20l3.5-2.1c.8.17 1.63.26 2.5.26 4.97 0 9-3.36 9-7.5S16.97 3 12 3z" fill="#181600"/></svg>
                        카카오톡 예약
                      </a>
                      <a href={{PHONE_TEL}} onClick={{handlePhoneCall}} style={{{{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px', backgroundColor: '#090d16', color: '#ffffff', fontWeight: 800, fontSize: '13px', padding: '10px 0', borderRadius: '6px', textDecoration: 'none', border: '1px solid #d4af37', cursor: 'pointer' }}}}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" fill="#ffffff"/></svg>
                        전화예약
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}}
          </div>
        </section>

        {{/* ── 3대 코스 특성 비교표 ── */}}
        <section style={{{{ backgroundColor: '#ffffff', border: '1px solid #e8e0d0', borderRadius: '20px', padding: '32px 24px', boxShadow: '0 12px 32px rgba(0, 0, 0, 0.28)' }}}}>
          <h2 style={{{{ fontSize: '20px', fontWeight: 950, color: '#090d16', margin: '0 0 6px', textAlign: 'center', letterSpacing: '-0.3px' }}}}>3대 코스 특성 비교</h2>
          <p style={{{{ fontSize: '13px', color: '#64748b', margin: '0 0 20px', textAlign: 'center' }}}}>고객님의 컨디션과 선호에 맞는 최적의 코스를 확인하세요.</p>
          <div style={{{{ overflowX: 'auto' }}}}>
            <table style={{{{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left', minWidth: '580px' }}}}>
              <thead>
                <tr style={{{{ backgroundColor: '#faf9f6', borderBottom: '1.5px solid #e8e0d0' }}}}>
                  <th style={{{{ padding: '12px 14px', color: '#64748b', fontWeight: 800, width: '16%' }}}}>구분</th>
                  <th style={{{{ padding: '12px 14px', color: '#090d16', fontWeight: 900, width: '28%' }}}}>타이 정통 테라피</th>
                  <th style={{{{ padding: '12px 14px', color: '#090d16', fontWeight: 900, width: '28%' }}}}>아로마 릴렉싱 테라피</th>
                  <th style={{{{ padding: '12px 14px', color: '#b38728', fontWeight: 950, width: '28%', backgroundColor: '#faf6ee' }}}}>👑 힐링 VIP (시그니처)</th>
                </tr>
              </thead>
              <tbody>
                {{COMPARISON_ROWS.map((row, idx) => (
                  <tr key={{idx}} style={{{{ borderBottom: '1px solid #f1f5f9', backgroundColor: idx % 2 === 0 ? '#ffffff' : '#fafbfc' }}}}>
                    <td style={{{{ padding: '11px 14px', fontWeight: 800, color: '#64748b' }}}}>{{row.category}}</td>
                    <td style={{{{ padding: '11px 14px', color: '#334155' }}}}>{{row.thai}}</td>
                    <td style={{{{ padding: '11px 14px', color: '#334155' }}}}>{{row.aroma}}</td>
                    <td style={{{{ padding: '11px 14px', color: '#b38728', fontWeight: 900, backgroundColor: '#faf6ee' }}}}>{{row.vip}}</td>
                  </tr>
                ))}}
              </tbody>
            </table>
          </div>
        </section>

        {{/* ── 3단계 간편 이용 프로세스 ── */}}
        <section style={{{{ backgroundColor: '#ffffff', border: '1px solid #e8e0d0', borderRadius: '20px', padding: '36px 24px', boxShadow: '0 12px 32px rgba(0, 0, 0, 0.28)' }}}}>
          <div style={{{{ textAlign: 'center', marginBottom: '24px' }}}}>
            <span style={{{{ fontSize: '11.5px', fontWeight: 900, color: '#b38728', letterSpacing: '1px' }}}}>EASY 3 STEPS</span>
            <h2 style={{{{ fontSize: '22px', fontWeight: 950, color: '#090d16', margin: '4px 0 4px', letterSpacing: '-0.4px' }}}}>간편 이용 프로세스</h2>
            <p style={{{{ fontSize: '13px', color: '#64748b', margin: 0 }}}}>복잡한 가입 절차 없이, 30초 만에 예약하고 30분 내 편안하게 케어받으세요.</p>
          </div>

          <div style={{{{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}}}>
            {{[
              {{
                step: 'STEP 01',
                title: '심야 실시간 예약 접수',
                desc: '카카오톡 또는 전화로 원하시는 코스와 방문 장소(자택·호텔·오피스텔)를 말씀해 주세요.',
                highlight: '30초 간편 접수',
              }},
              {{
                step: 'STEP 02',
                title: '전문 테라피스트 30분 도착',
                desc: '가장 가까운 권역의 20대 전문 테라피스트가 소독 용품을 지참하여 평균 30분 이내 방문합니다.',
                highlight: '새벽 5시 마감까지',
              }},
              {{
                step: 'STEP 03',
                title: '대면 확인 후 결제 & 힐링 케어',
                desc: '관리사가 도착한 것을 직접 확인하신 후 안전하게 결제하시고 프라이빗 테라피를 누리세요.',
                highlight: '선입금 X · 100% 대면결제',
              }},
            ].map((s, i) => (
              <div key={{i}} style={{{{ backgroundColor: '#faf9f6', border: '1px solid #e8e0d0', borderRadius: '16px', padding: '24px 20px', textAlign: 'center' }}}}>
                <div style={{{{ fontSize: '12px', fontWeight: 950, color: '#b38728', letterSpacing: '0.5px', marginBottom: '6px' }}}}>{{s.step}}</div>
                <h3 style={{{{ fontSize: '16px', fontWeight: 900, color: '#090d16', margin: '0 0 6px' }}}}>{{s.title}}</h3>
                <div style={{{{ fontSize: '11px', fontWeight: 800, color: '#b38728', backgroundColor: '#faf6ee', border: '1px solid #d4af37', padding: '2px 8px', borderRadius: '4px', display: 'inline-block', marginBottom: '10px' }}}}>
                  {{s.highlight}}
                </div>
                <p style={{{{ fontSize: '12.5px', color: '#475569', lineHeight: 1.55, margin: 0 }}}}>{{s.desc}}</p>
              </div>
            ))}}
          </div>
        </section>

        {{/* ── 심야 VIP 시크릿 힐링 배너 ── */}}
        <section style={{{{
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: '#090d16',
          border: '1.5px solid #d4af37',
          borderRadius: '20px',
          padding: '44px 28px',
          textAlign: 'center',
          boxShadow: '0 16px 40px rgba(0, 0, 0, 0.45)',
        }}}}>
          <div style={{{{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'url(/images/seoul_night_sky.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center 40%',
            opacity: 0.18,
            pointerEvents: 'none',
          }}}} />
          <div style={{{{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, rgba(7, 10, 16, 0.9) 0%, rgba(15, 23, 42, 0.92) 100%)',
            pointerEvents: 'none',
          }}}} />
          <div style={{{{ position: 'relative', zIndex: 1 }}}}>
            <div style={{{{ fontSize: '13px', fontWeight: 900, color: '#f3e5ab', marginBottom: '8px', letterSpacing: '1px' }}}}>
              🌙 MIDNIGHT VIP SECRET ESCAPE · 새벽 5시 마감까지 상시 즉시 배차
            </div>
            <h3 style={{{{ fontSize: '26px', fontWeight: 950, color: '#ffffff', margin: '0 0 10px', letterSpacing: '-0.5px' }}}}>
              깊어가는 밤, 당신만을 위한 가장 은밀한 힐링 — 아름다운 밤 (Abam)
            </h3>
            <p style={{{{ fontSize: '14.5px', color: '#cbd5e1', margin: '0 auto 26px', maxWidth: '600px', lineHeight: 1.65 }}}}>
              선입금 X · 100% 현장 대면결제. 새벽 5시 마감 전까지 수도권 전지역 30분 내외 즉시 찾아갑니다. 강남·청담 VIP 라운지의 깊은 힐링과 매혹적인 손길을 고객님의 프라이빗 공간에서 누리세요.
            </p>
            <div style={{{{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}}}>
              <a href={{KAKAO_LINK}} onClick={{handleKakaoConnect}}
                style={{{{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#FEE500', color: '#181600', fontWeight: 900, fontSize: '15px', padding: '14px 28px', borderRadius: '8px', textDecoration: 'none', boxShadow: '0 4px 14px rgba(254,229,0,0.35)', cursor: 'pointer' }}}}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 3C7.03 3 3 6.36 3 10.5c0 2.63 1.58 4.96 4 6.37L6 20l3.5-2.1c.8.17 1.63.26 2.5.26 4.97 0 9-3.36 9-7.5S16.97 3 12 3z" fill="#181600"/></svg>
                카카오톡 바로연결 (ID: {{KAKAO_ID}})
              </a>
              <a href={{PHONE_TEL}} onClick={{handlePhoneCall}}
                style={{{{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(255,255,255,0.1)', color: '#ffffff', fontWeight: 800, fontSize: '15px', padding: '14px 28px', borderRadius: '8px', textDecoration: 'none', border: '1px solid #d4af37', backdropFilter: 'blur(8px)', boxShadow: '0 4px 14px rgba(0,0,0,0.3)', cursor: 'pointer' }}}}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" fill="#ffffff"/></svg>
                {{PHONE_NUM}} 즉시 전화연결
              </a>
            </div>
          </div>
        </section>

        {{/* SEO 지역 디렉토리 */}}
        <section style={{{{ backgroundColor: '#ffffff', border: '1px solid #e8e0d0', borderRadius: '20px', padding: '30px 24px', boxShadow: '0 12px 32px rgba(0, 0, 0, 0.28)' }}}}>
          <div style={{{{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}}}>
            <span style={{{{ fontSize: '11px', fontWeight: 900, color: '#b38728', backgroundColor: '#faf6ee', border: '1px solid #d4af37', padding: '2px 8px', borderRadius: '4px' }}}}>24H DIRECTORY</span>
            <h2 style={{{{ fontSize: '16px', fontWeight: 950, color: '#090d16', margin: 0 }}}}>수도권 심야 출장 홈케어 지역 안내</h2>
          </div>
          <p style={{{{ fontSize: '12.5px', color: '#64748b', margin: '0 0 18px' }}}}>정통 왓포 건식 & 천연 아로마 림프 케어 · 강남·서초·송파·수도권 전지역 30분 즉시 배차</p>
          <div style={{{{ display: 'flex', flexDirection: 'column', gap: '14px' }}}}>
            {{SEO_REGIONS.map((reg, idx) => (
              <div key={{idx}} style={{{{ fontSize: '12.5px', lineHeight: 1.7 }}}}>
                <span style={{{{ fontWeight: 900, color: '#b38728', marginRight: '8px' }}}}>{{reg.name}}:</span>
                {{reg.keywords.map((k, ki) => (
                  <React.Fragment key={{ki}}>
                    <Link href={{`/seo/${{encodeURIComponent(k.slug)}}`}} style={{{{ color: '#475569', textDecoration: 'none' }}}}>{{k.label}}</Link>
                    {{ki < reg.keywords.length - 1 && <span style={{{{ color: '#cbd5e1', margin: '0 5px' }}}}>·</span>}}
                  </React.Fragment>
                ))}}
              </div>
            ))}}
          </div>
          <div style={{{{ marginTop: '18px', paddingTop: '14px', borderTop: '1px solid #f1f5f9', fontSize: '12px', color: '#64748b', lineHeight: 1.6 }}}}>
            ※ 아름다운 밤 타이 홈케어(Abam)는 건전하고 투명한 프라이빗 힐링 테라피 문화만을 고수합니다.
          </div>
        </section>
      </main>

      {{/* ── 하단 고정 예약 바 (외국인은 WhatsApp 1개, 국내는 카톡 1개, 공통 전화) ── */}}
      <div style={{{{ position: 'fixed', bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(255,255,255,0.98)', backdropFilter: 'blur(16px)', borderTop: '1.5px solid rgba(212, 175, 55, 0.4)', padding: '10px 16px', display: 'flex', gap: '8px', zIndex: 50, boxShadow: '0 -6px 25px rgba(0,0,0,0.18)' }}}}>
        <div style={{{{ maxWidth: '1080px', width: '100%', margin: '0 auto', display: 'flex', gap: '8px', alignItems: 'center' }}}}>
          <a href={{WHATSAPP_LINK}} target="_blank" rel="noopener noreferrer" style={{{{ flex: 0.9, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px', backgroundColor: '#25D366', color: '#ffffff', fontWeight: 900, fontSize: '13.5px', padding: '13px 0', borderRadius: '8px', textDecoration: 'none', boxShadow: '0 2px 10px rgba(37,211,102,0.3)', cursor: 'pointer' }}}}>
            <span style={{{{ fontSize: '15px' }}}}>💬</span> WhatsApp
          </a>
          <a href={{KAKAO_LINK}} onClick={{handleKakaoConnect}} style={{{{ flex: 1.2, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', backgroundColor: '#FEE500', color: '#181600', fontWeight: 950, fontSize: '14px', padding: '13px 0', borderRadius: '8px', textDecoration: 'none', boxShadow: '0 2px 10px rgba(254,229,0,0.32)', cursor: 'pointer' }}}}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none"><path d="M12 3C7.03 3 3 6.36 3 10.5c0 2.63 1.58 4.96 4 6.37L6 20l3.5-2.1c.8.17 1.63.26 2.5.26 4.97 0 9-3.36 9-7.5S16.97 3 12 3z" fill="#181600"/></svg>
            카톡: {{KAKAO_ID}}
          </a>
          <a href={{PHONE_TEL}} onClick={{handlePhoneCall}} style={{{{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px', backgroundColor: '#090d16', color: '#ffffff', fontWeight: 800, fontSize: '14px', padding: '13px 0', borderRadius: '8px', textDecoration: 'none', border: '1px solid #d4af37', boxShadow: '0 2px 10px rgba(0,0,0,0.3)', cursor: 'pointer' }}}}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" fill="#ffffff"/></svg>
            전화연결
          </a>
        </div>
      </div>
    </div>
  );
}}
"""

with open(r'src\app\page.tsx', 'w', encoding='utf-8') as f:
    f.write(page_code)

print("Successfully wrote src/app/page.tsx, length:", len(page_code))
