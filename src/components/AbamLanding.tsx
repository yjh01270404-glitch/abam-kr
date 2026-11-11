'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { type LandingContent } from '../lib/landing-content';
import AbamBottomBookingBar, { openDirectAbamSms } from './AbamBottomBookingBar';

type Lang = 'ko' | 'en' | 'jp' | 'cn';

const LANGS: { code: Lang; label: string; href: string }[] = [
  { code: 'ko', label: 'KR', href: '/' },
  { code: 'en', label: 'EN', href: 'https://seoulroyalspa.com' },
  { code: 'jp', label: 'JP', href: 'https://seoulroyalspa.com/jp' },
  { code: 'cn', label: 'CN', href: 'https://seoulroyalspa.com/cn' },
];

export default function AbamLanding({ c, areaLinks }: { c: LandingContent; areaLinks?: string[] }) {
  const isKo = c.lang === 'ko';
  const cleanPhone = c.contact.phone.replace(/[^0-9]/g, '') || '01066072239';
  const formattedPhone = c.contact.phone || '010-6607-2239';

  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showAllLinks, setShowAllLinks] = useState(false);
  const [isOpenNow, setIsOpenNow] = useState<boolean>(true);

  React.useEffect(() => {
    const checkKst = () => {
      const now = new Date();
      const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
      const kstDate = new Date(utc + (9 * 3600000));
      const hour = kstDate.getHours();
      setIsOpenNow(hour >= 18 || hour < 5);
    };
    checkKst();
    const interval = setInterval(checkKst, 60000);
    return () => clearInterval(interval);
  }, []);

  const cityName = c.city || '';
  const heroTitle = cityName 
    ? `${cityName} 아름다운 밤, 아밤(ABAM.kr)` 
    : '아름다운 밤, 아밤(ABAM.kr)';

  const heroSubtitle = isKo
    ? "아밤은 '아름다운 밤'의 줄임말로, 지친 하루의 끝 가장 편안하고 프라이빗한 프리미엄 야간 힐링을 선물합니다. 자택 및 호텔 어디서든 전화나 문자 한 통으로 100% 현장 후불제로 품격 있게 시작하세요."
    : 'Private premium in-room relaxation at your residence or hotel. 100% on-site settlement with zero advance deposit.';

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = isKo ? [
    {
      q: '선입금이나 예약금이 전혀 없나요?',
      a: '네, 100% 안심 현장 후불제입니다. 아밤은 어떠한 경우에도 예약금이나 보증금, 유류비를 요구하지 않으며, 관리사가 계신 곳에 도착하여 직접 대면한 후 현장 결제(현금, 계좌이체, 카드)로 진행됩니다.'
    },
    {
      q: '관리사분들은 어떤 분들이 오시나요? (사진 요구 및 나이/프로필)',
      a: '아밤의 테라피스트는 전원 철저한 마인드와 실기 교육을 수료한 20대 전문 힐러로 구성되어 있습니다. 인터넷에 떠도는 불법 도용 사진으로 고객님을 기만하지 않으며, 선입금 0원의 100% 현장 대면 시스템이므로 도착 후 직접 확인하신 뒤 마음에 들지 않으실 경우 현장에서 즉시 무료 취소 가능합니다.'
    },
    {
      q: '예약 후 도착까지 얼마나 걸리나요?',
      a: '접수는 매일 저녁 18:00부터 시작되며, 매니저 출발은 19:00부터 익일 새벽 05:00 마감까지 운영됩니다. 서울 25개 구 및 경기 주요 거점 도시(분당, 판교, 수원, 일산, 부천, 안양, 평택, 동탄 등) 기준 접수 후 평균 25분~35분 내에 신속하게 도착합니다. 실시간 도로 상황에 따라 배차 즉시 예상 도착 시간을 안내해 드립니다.'
    },
    {
      q: '따로 준비해야 할 물품이 있나요?',
      a: '전혀 없습니다. 관리사가 1회용 청결 위생 시트, 호텔급 타월, 최고급 천연 아로마 오일 등 필요한 모든 전문 비품을 지참하여 방문하므로 편안하게 휴식만 취하시면 됩니다.'
    },
    {
      q: '결제 수단은 무엇이 가능한가요? (현금·계좌이체·카드)',
      a: '현금, 실시간 계좌이체, 현장 카드 결제 모두 가능합니다. 현금 결제 시 잔돈이 필요하시면 예약 시 말씀해 주시면 미리 준비해 드립니다.'
    },
    {
      q: '호텔 및 오피스텔, 일반 자택에서도 이용 가능한가요?',
      a: '네, 서울 및 수도권 소재 5성급 호텔, 비즈니스 호텔, 모텔, 오피스텔, 일반 아파트 및 빌라 등 편안하게 쉴 수 있는 프라이빗한 실내 공간이라면 어디든 방문 가능합니다.'
    },
    {
      q: '비밀 보장 및 프라이버시가 철저한가요?',
      a: '고객님의 방문 주소 및 연락처는 배차 완료 후 안전하게 파기되며 어떠한 서버나 장부에도 기록되지 않습니다. 철저한 1:1 비밀 보장 원칙으로 안심하고 이용하실 수 있습니다.'
    },
    {
      q: '타이, 아로마, 스페셜 중 어떤 코스를 추천하나요?',
      a: '시원한 수기 지압과 뭉친 근육 스트레칭을 원하시면 "타이(건식)", 부드러운 전신 순환과 림프 이완을 원하시면 "아로마(오일)", 두 가지의 장점을 모두 경험하고 싶으시다면 고객 만족도 1위인 "스페셜(타이+아로마) 90분" 코스를 추천해 드립니다.'
    },
    {
      q: '전화 통화 없이 문자로만 예약할 수 있나요?',
      a: '네, 가능합니다! 하단의 [문자 간편 예약]을 누르시거나 010-6607-2239 번호로 코스, 방문 주소(또는 호텔명·호수), 출입 방법을 남겨주시면 통화 없이 문자로 즉시 접수 및 도착 안내를 도와드립니다.'
    }
  ] : [
    {
      q: 'Is any deposit required in advance?',
      a: 'Strictly NO deposit. 100% cash settlement on site upon meeting our therapist.'
    },
    {
      q: 'Can I see therapist photos beforehand?',
      a: 'We strictly protect therapists\' real privacy and refuse stolen internet model photos. 100% in-person lobby verification before payment guarantees zero catfishing and zero deposit risk.'
    },
    {
      q: 'How quickly can you arrive?',
      a: 'Average arrival time is 25-35 minutes across Seoul and metropolitan areas.'
    },
    {
      q: 'Do I need to prepare towels or sheets?',
      a: 'No, our professional therapist brings single-use sanitized linens and all essentials.'
    },
    {
      q: 'Can I book to my hotel room?',
      a: 'Yes, all 5-star hotels, luxury suites, and private residences are served 24/7.'
    }
  ];

  return (
    <div className="bg-surface-deep text-on-surface font-body-md text-body-md antialiased min-h-screen selection:bg-primary-container selection:text-on-primary-container">
      {/* 1. TOP HEADER (모바일 1줄 고정 깔끔한 미니멀 디자인) */}
      <header className="abam-site-header fixed top-0 left-0 right-0 w-full z-50 shadow-[0_4px_24px_rgba(0,0,0,0.7)]" style={{ backgroundColor: '#080C16', borderBottom: '1px solid rgba(238, 193, 75, 0.25)', height: '56px' }}>
        <div className="max-w-[1200px] mx-auto px-3.5 sm:px-4 md:px-6 lg:px-8 flex items-center justify-between gap-3" style={{ height: '56px' }}>
          <div className="flex items-center shrink-0">
            <Link href="/" className="flex items-center gap-2 group whitespace-nowrap">
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  minWidth: '32px',
                  minHeight: '32px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #EEC14B 0%, #F3CE6D 50%, #997724 100%)',
                  padding: '1.5px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0 10px rgba(238, 193, 75, 0.25)',
                  flexShrink: 0,
                }}
              >
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    backgroundColor: '#080C16',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ display: 'block', flexShrink: 0 }}
                  >
                    <defs>
                      <linearGradient id="abamHeaderGoldMoon" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#FFF4BD" />
                        <stop offset="50%" stopColor="#EEC14B" />
                        <stop offset="100%" stopColor="#C4931A" />
                      </linearGradient>
                    </defs>
                    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" fill="url(#abamHeaderGoldMoon)" />
                    <path d="M19 4L19.4 5.2L20.6 5.6L19.4 6L19 7.2L18.6 6L17.4 5.6L18.6 5.2L19 4Z" fill="#FFFCE6" />
                  </svg>
                </div>
              </div>
              <div className="flex items-center gap-1.5 whitespace-nowrap">
                <span className="text-[16px] sm:text-[17px] md:text-headline-sm text-text-primary tracking-tight font-extrabold group-hover:text-primary transition-colors">
                  <span className="hidden sm:inline">아름다운 밤 </span>아밤
                </span>
                <span className="text-primary text-[11.5px] sm:text-[13px] font-black tracking-wider px-1.5 py-0.5 rounded bg-primary/10 border border-primary/20">
                  ABAM
                </span>
              </div>
            </Link>
          </div>

          <nav className="abam-desktop-nav" aria-label="Sections">
            <a href="#courses" className="text-[13.5px] font-semibold text-text-secondary hover:text-primary transition-colors py-1.5 px-2.5 rounded-lg hover:bg-surface-raised/40 whitespace-nowrap">서비스 코스</a>
            <a href="#guide" className="text-[13.5px] font-semibold text-text-secondary hover:text-primary transition-colors py-1.5 px-2.5 rounded-lg hover:bg-surface-raised/40 whitespace-nowrap">이용 안내</a>
            <a href="#regions" className="text-[13.5px] font-semibold text-text-secondary hover:text-primary transition-colors py-1.5 px-2.5 rounded-lg hover:bg-surface-raised/40 whitespace-nowrap">서비스 지역</a>
            <a href="#reviews" className="text-[13.5px] font-semibold text-text-secondary hover:text-primary transition-colors py-1.5 px-2.5 rounded-lg hover:bg-surface-raised/40 whitespace-nowrap">고객 후기</a>
            <a href="#faq" className="text-[13.5px] font-semibold text-text-secondary hover:text-primary transition-colors py-1.5 px-2.5 rounded-lg hover:bg-surface-raised/40 whitespace-nowrap">자주 묻는 질문</a>
          </nav>

          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            {/* 1. 실시간 접수 상태 배지 (데스크톱 전용) */}
            <div className="abam-header-badge hidden lg:inline-flex items-center gap-2 px-3.5 bg-[#0F1626] border border-[#1E293B] shrink-0">
              <span className={`w-2 h-2 rounded-full ${isOpenNow ? 'bg-[#10B981] animate-pulse' : 'bg-[#F59E0B]'} shrink-0`}></span>
              <span className="text-[12px] text-text-muted font-medium whitespace-nowrap">
                {isOpenNow ? '🟢 실시간 영업중 (18:00 ~ 05:00)' : '🌙 사전 예약 접수중 (18:00 순차출발)'}
              </span>
            </div>

            {/* 2. 다국어 선택기 (태블릿/데스크톱 전용) */}
            <div className="abam-header-lang hidden md:inline-flex items-center bg-[#1E293B]/90 border border-[#2A374A] p-1 text-[11.5px] font-bold shrink-0">
              {LANGS.map((lang) => (
                <Link
                  key={lang.code}
                  href={lang.href}
                  className={`h-7 px-2.5 flex items-center justify-center rounded-full transition-all text-center leading-none ${
                    c.lang === lang.code
                      ? 'bg-primary text-[#080C16] shadow-sm font-extrabold'
                      : 'text-text-muted hover:text-text-primary'
                  }`}
                >
                  {lang.label}
                </Link>
              ))}
            </div>

            {/* 3. 24시 상담 버튼 (모바일 & 데스크톱 1줄 최적화) */}
            <a
              href={`tel:${cleanPhone}`}
              className="abam-header-call inline-flex items-center justify-center gap-1.5 px-3.5 sm:px-4 bg-gradient-to-r from-primary via-primary to-accent-gold-light text-[#080C16] font-extrabold text-[12.5px] shadow-[0_2px_12px_rgba(238,193,75,0.3)] hover:brightness-105 active:scale-95 transition-all shrink-0 whitespace-nowrap"
            >
              <span className="material-symbols-outlined text-[16px]">call</span>
              <span>24시 상담</span>
            </a>
          </div>
        </div>
      </header>

      {/* 0. ULTRA HIGH-VISIBILITY LIVE DISPATCH TOP BANNER */}
      <aside className="fixed top-[56px] left-0 right-0 w-full z-40 bg-gradient-to-r from-[#032014] via-[#064e3b] to-[#032014] border-b-2 border-emerald-400 py-2.5 px-3 sm:px-6 shadow-[0_4px_20px_rgba(16,185,129,0.35)]">
        <div className="max-w-[1200px] mx-auto flex flex-wrap items-center justify-between gap-2.5 text-xs sm:text-sm">
          <div className="flex items-center gap-2 text-left">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500 text-slate-950 font-black text-[11px] sm:text-xs animate-pulse">
              <span className="w-2 h-2 rounded-full bg-white"></span>
              실시간 배차
            </span>
            <span className="text-white font-black text-[13px] sm:text-[15px] tracking-tight">
              🟢 <span className="text-emerald-300">지금 즉시 이용 가능:</span> 서울·경기 전지역 <strong className="text-amber-300">25~35분 내 신속 도착!</strong>
            </span>
            <span className="hidden md:inline-block text-[11.5px] text-emerald-200/90 font-bold bg-black/40 px-2 py-0.5 rounded border border-emerald-500/30">
              대기 0분 · 예약금 0원 100% 현장후불제
            </span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => openDirectAbamSms()}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#EEC14B] to-[#D4A528] text-slate-950 font-black text-[12px] shadow-md hover:brightness-110 cursor-pointer"
            >
              💬 문자 즉시예약
            </button>
            <a
              href={`tel:${cleanPhone}`}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-[12px] shadow-md cursor-pointer"
            >
              📞 24시 직통전화
            </a>
          </div>
        </div>
      </aside>

      <main className="w-full bg-surface-deep min-h-screen" style={{ paddingTop: '106px' }}>
        {/* HERO SECTION */}
        <section className="relative w-full overflow-hidden bg-gradient-to-b from-[#080C16] via-[#0F1626] to-[#080C16] px-4 md:px-6 lg:px-8 pt-6 md:pt-12 pb-16 md:pb-24">
          {/* Ambient Subtle Midnight Glow */}
          <div className="absolute -top-24 right-1/2 md:right-1/4 translate-x-1/2 w-96 h-96 rounded-full bg-primary/10 blur-[120px] pointer-events-none"></div>
          <div className="absolute top-1/3 left-10 w-72 h-72 rounded-full bg-lavender-deep/20 blur-[100px] pointer-events-none"></div>

          <div className="max-w-[1200px] mx-auto relative z-10 flex flex-col items-center text-center">
            {/* Minimal Eyebrow Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#121826] border border-[#223049] shadow-sm mb-5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-[12px] sm:text-[13px] text-[#EEC14B] font-semibold tracking-tight">
                24시간 서울·경기 전지역 100% 현장후불제
              </span>
            </div>

            {/* Main Clean Headline - Single Clean Impactful Line (No multi-line overlap) */}
            <div className="max-w-3xl mx-auto mb-5">
              <h1 className="text-[22px] sm:text-[32px] md:text-[42px] font-black text-white tracking-tight leading-snug">
                {cityName ? (
                  <>
                    {cityName}{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFF4BD] via-[#EEC14B] to-[#D4A528]">
                      아름다운 밤, 아밤(ABAM)
                    </span>
                  </>
                ) : (
                  <>
                    아름다운 밤,{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFF4BD] via-[#EEC14B] to-[#D4A528]">
                      아밤(ABAM.kr)
                    </span>
                  </>
                )}
              </h1>
            </div>

            {/* Spacious Subtitle with Generous Line Height */}
            <p className="text-[14px] sm:text-[15.5px] text-[#94A3B8] max-w-xl mx-auto mb-4 leading-[1.8] px-2">
              자택 및 호텔 어디서든 전화나 문자 한 통으로 30분 내 도착합니다.<br className="hidden sm:inline" />
              예약금 일절 없는 100% 안심 현장후불제로 가장 편안하게 맞이하세요.
            </p>

            {/* GOOGLE ADS & NAVER SEARCH REAL-TIME VERIFIED GUARANTEE BOX */}
            <div className="w-full max-w-xl mx-auto my-3 p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-[#0F172A] via-[#11253E] to-[#0F172A] border-2 border-emerald-400 shadow-[0_0_25px_rgba(16,185,129,0.3)] text-left flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center text-2xl font-black text-emerald-400 shrink-0">
                  🛡️
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[14px] sm:text-[15.5px] font-black text-white">공식 광고 인증: 지금 즉시 배차 가능</span>
                    <span className="px-2 py-0.5 rounded-md bg-emerald-500 text-slate-950 text-[10.5px] font-black uppercase tracking-wider animate-pulse">실시간 대기</span>
                  </div>
                  <p className="text-[12px] sm:text-[12.5px] text-slate-300 font-medium leading-snug mt-1">
                    선입금/예약금 일절 없는 <strong>100% 현장후불제 안심 매칭</strong>입니다. 매니저 도착 시 대면 후 결제하세요!
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
                <button
                  onClick={() => openDirectAbamSms()}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#EEC14B] to-[#D4A528] text-slate-950 text-[12.5px] font-black shadow-lg hover:brightness-110 active:scale-95 transition-all cursor-pointer text-center"
                >
                  ⚡ 간편 예약하기
                </button>
              </div>
            </div>

            {/* 럭셔리 호텔 인룸 메인 비주얼 배너 (여성 모델 메인 사진 복원) */}
            <div
              className="w-full max-w-xl mx-auto rounded-2xl overflow-hidden border border-[#EEC14B]/35 shadow-[0_12px_35px_-8px_rgba(0,0,0,0.85)] relative mb-7 group"
              style={{ height: '230px', minHeight: '230px' }}
            >
              <Image
                src="/images/abam_hero_seductive.jpg"
                alt="아밤 프리미엄 홈타이 & 호텔 출장마사지 1:1 프라이빗 케어"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 600px"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(8,12,22,0.95) 0%, rgba(8,12,22,0.15) 50%, transparent 100%)', pointerEvents: 'none' }} />
              <div style={{ position: 'absolute', bottom: '12px', left: '12px', right: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 10, pointerEvents: 'none' }}>
                <div style={{ background: 'rgba(8,12,22,0.85)', backdropFilter: 'blur(8px)', padding: '6px 12px', borderRadius: '8px', border: '1px solid rgba(238,193,75,0.35)', textAlign: 'left' }}>
                  <span style={{ fontSize: '10.5px', fontWeight: 800, color: '#EEC14B', letterSpacing: '0.08em', textTransform: 'uppercase', display: 'block' }}>
                    VIP 1:1 PRIVATE IN-ROOM
                  </span>
                  <span style={{ fontSize: '13px', fontWeight: 700, color: '#ffffff' }}>
                    편안한 자택·호텔에서 누리는 힐링
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(8,12,22,0.85)', backdropFilter: 'blur(8px)', padding: '6px 12px', borderRadius: '9999px', border: isOpenNow ? '1px solid rgba(16,185,129,0.4)' : '1px solid rgba(245,158,11,0.4)', flexShrink: 0 }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: isOpenNow ? '#10B981' : '#F59E0B', display: 'inline-block' }}></span>
                  <span style={{ fontSize: '11.5px', fontWeight: 700, color: isOpenNow ? '#6EE7B7' : '#FCD34D', whiteSpace: 'nowrap' }}>
                    {isOpenNow ? '🟢 실시간 영업중 (18:00~05:00)' : '🌙 사전 예약 접수중'}
                  </span>
                </div>
              </div>
            </div>

            {/* 3 Key Trust Chips - Generously Spaced Horizontal Pills */}
            <div className="w-full max-w-xl mx-auto flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 mb-9 px-2">
              <div className="flex items-center gap-1.5 text-[12px] sm:text-[13px] text-[#E2E8F0] font-semibold bg-[#121826] px-4 py-2 rounded-full border border-[#202C42] shadow-sm">
                <span className="text-[#EEC14B]">⚡</span>
                <span>평균 30분 도착 보장</span>
              </div>
              <div className="flex items-center gap-1.5 text-[12px] sm:text-[13px] text-[#E2E8F0] font-semibold bg-[#121826] px-4 py-2 rounded-full border border-[#202C42] shadow-sm">
                <span className="text-emerald-400">🛡️</span>
                <span>선입금 0원 안심 후불제</span>
              </div>
              <div className="flex items-center gap-1.5 text-[12px] sm:text-[13px] text-[#E2E8F0] font-semibold bg-[#121826] px-4 py-2 rounded-full border border-[#202C42] shadow-sm">
                <span className="text-sky-400">📍</span>
                <span>서울·경기 전지역</span>
              </div>
            </div>

            {/* High-Conversion Action CTAs with Generous Bottom Separation */}
            <div className="w-full max-w-md mx-auto grid grid-cols-2 gap-3.5 mb-12 px-2">
              {/* Call Button */}
              <a
                href={`tel:${cleanPhone}`}
                className="h-13 py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#EEC14B] via-[#F3CE6D] to-[#D4A528] text-[#080C16] font-black text-[14.5px] sm:text-[15.5px] flex items-center justify-center gap-2 shadow-[0_6px_20px_rgba(238,193,75,0.35)] hover:brightness-105 active:scale-[0.98] transition-all"
              >
                <span className="material-symbols-outlined text-[20px]">call</span>
                <span>전화 즉시 예약</span>
              </a>

              {/* SMS Button */}
              <button
                type="button"
                onClick={() => openDirectAbamSms()}
                className="h-13 py-3.5 px-4 rounded-xl bg-[#151D2E] hover:bg-[#1C273E] border border-[#273854] text-white font-bold text-[14.5px] sm:text-[15.5px] flex items-center justify-center gap-2 shadow-md active:scale-[0.98] transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px] text-[#EEC14B]">chat</span>
                <span>문자 간편 예약</span>
              </button>
            </div>

            {/* Visual Showcase with Proper Margin Separation */}
            <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mt-4 pt-2">
              <div
                className="relative overflow-hidden rounded-xl md:rounded-2xl bg-[#0F1626] border border-[#1E293B] shadow-lg group h-[140px] sm:h-[190px] md:h-[240px]"
              >
                <Image
                  src="/images/abam_hero_speed_model.jpg"
                  alt="프리미엄 호텔 전담 힐링"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500 brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060911]/95 via-[#060911]/50 to-transparent pointer-events-none" />
                <div className="absolute bottom-0 left-0 right-0 p-3.5 sm:p-4 md:p-5 flex flex-col items-start gap-1 text-left z-20">
                  <span className="px-2 py-0.5 rounded-full bg-[#0B0F19]/90 border border-primary/50 text-[10.5px] sm:text-[11px] text-primary font-bold tracking-wider uppercase">
                    호텔 객실 전담
                  </span>
                  <span className="text-[13.5px] sm:text-[15px] md:text-[16px] font-extrabold text-white">
                    조용하고 은밀한 객실 케어
                  </span>
                </div>
              </div>

              <div
                className="relative overflow-hidden rounded-xl md:rounded-2xl bg-[#0F1626] border border-[#1E293B] shadow-lg group h-[140px] sm:h-[190px] md:h-[240px]"
              >
                <Image
                  src="/images/aroma.jpg"
                  alt="100% 천연 에센셜 오일"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500 brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060911]/95 via-[#060911]/50 to-transparent pointer-events-none" />
                <div className="absolute bottom-0 left-0 right-0 p-3.5 sm:p-4 md:p-5 flex flex-col items-start gap-1 text-left z-20">
                  <span className="px-2 py-0.5 rounded-full bg-[#0B0F19]/90 border border-primary/50 text-[10.5px] sm:text-[11px] text-primary font-bold tracking-wider uppercase">
                    100% 천연 에센셜 오일
                  </span>
                  <span className="text-[13.5px] sm:text-[15px] md:text-[16px] font-extrabold text-white">
                    전문 테라피스트 전용 키트
                  </span>
                </div>
              </div>

              <div
                className="relative overflow-hidden rounded-xl md:rounded-2xl bg-[#0F1626] border border-[#1E293B] shadow-lg group h-[140px] sm:h-[190px] md:h-[240px]"
              >
                <Image
                  src="/images/flower_spa.jpg"
                  alt="내 집에서 누리는 프라이빗 힐링"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500 brightness-85"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060911]/95 via-[#060911]/50 to-transparent pointer-events-none" />
                <div className="absolute bottom-0 left-0 right-0 p-3.5 sm:p-4 md:p-5 flex flex-col items-start gap-1 text-left z-20">
                  <span className="px-2 py-0.5 rounded-full bg-[#0B0F19]/90 border border-primary/50 text-[10.5px] sm:text-[11px] text-primary font-bold tracking-wider uppercase">
                    내 집에서 누리는 힐링
                  </span>
                  <span className="text-[13.5px] sm:text-[15px] md:text-[16px] font-extrabold text-white">
                    외출 없는 홈 스파 케어
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. VALUE PROPOSITIONS (Why Abam) */}
        <section className="w-full bg-[#080C16] px-4 md:px-6 lg:px-8 py-16 md:py-24 border-t border-[#1E293B]">
          <div className="max-w-[1240px] mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
              <span className="inline-block px-3.5 py-1 rounded-full bg-[#171b26] border border-[#262a35] text-primary text-[11px] md:text-[12px] font-bold tracking-widest uppercase mb-3 shadow-sm">
                TRUST &amp; EXCELLENCE
              </span>
              <h2 className="text-[22px] sm:text-[28px] md:text-[34px] font-bold text-white mb-3">왜 아름다운 밤, 아밤(ABAM)일까요?</h2>
              <p className="text-[13.5px] sm:text-[15px] text-text-muted leading-relaxed max-w-lg mx-auto">
                엄격한 관리사 검증과 100% 현장 후불제로 가장 안전하고 품격 있는 힐링을 약속합니다.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
              {/* Card 1 */}
              <div className="abam-trust-card">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#171b26] border border-[#262a35] flex items-center justify-center text-primary mb-4 shadow-inner">
                    <span className="material-symbols-outlined text-[24px]">timer</span>
                  </div>
                  <h3 className="text-[18px] font-bold text-white mb-2">신속한 30분 도착</h3>
                  <p className="text-[13.5px] text-[#94A3B8] leading-relaxed">
                    서울, 경기 주요 거점 대기 시스템으로 접수 완료 즉시 가장 가까운 관리사가 배정되어 빠르게 도착합니다.
                  </p>
                </div>
                <div className="flex items-center gap-2 text-primary text-[12.5px] font-semibold pt-4 mt-6 border-t border-[#1E293B]">
                  <span className="material-symbols-outlined text-[16px]">check_circle</span>
                  <span>도착 예상 시간 실시간 안내</span>
                </div>
              </div>

              {/* Card 2 */}
              <div className="abam-trust-card">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#171b26] border border-[#262a35] flex items-center justify-center text-primary mb-4 shadow-inner">
                    <span className="material-symbols-outlined text-[24px]">payments</span>
                  </div>
                  <h3 className="text-[18px] font-bold text-white mb-2">100% 안심 후불제</h3>
                  <p className="text-[13.5px] text-[#94A3B8] leading-relaxed">
                    예약금이나 선입금을 요구하는 사기 피해를 원천 차단합니다. 관리사 대면 후 직접 결제하세요.
                  </p>
                </div>
                <div className="flex items-center gap-2 text-primary text-[12.5px] font-semibold pt-4 mt-6 border-t border-[#1E293B]">
                  <span className="material-symbols-outlined text-[16px]">check_circle</span>
                  <span>선입금·보증금 일체 요구 없음</span>
                </div>
              </div>

              {/* Card 3 */}
              <div className="abam-trust-card">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#171b26] border border-[#262a35] flex items-center justify-center text-primary mb-4 shadow-inner">
                    <span className="material-symbols-outlined text-[24px]">lock_person</span>
                  </div>
                  <h3 className="text-[18px] font-bold text-white mb-2">철저한 비밀 &amp; 프라이버시</h3>
                  <p className="text-[13.5px] text-[#94A3B8] leading-relaxed">
                    개인 정보는 상담 및 배차 목적으로만 사용되며, 서비스 종료 후 즉시 안전하게 파기됩니다.
                  </p>
                </div>
                <div className="flex items-center gap-2 text-primary text-[12.5px] font-semibold pt-4 mt-6 border-t border-[#1E293B]">
                  <span className="material-symbols-outlined text-[16px]">check_circle</span>
                  <span>완전 무기명 안심 케어 보장</span>
                </div>
              </div>

              {/* Card 4 */}
              <div className="abam-trust-card">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#171b26] border border-[#262a35] flex items-center justify-center text-primary mb-4 shadow-inner">
                    <span className="material-symbols-outlined text-[24px]">spa</span>
                  </div>
                  <h3 className="text-[18px] font-bold text-white mb-2">엄선된 전문 테라피스트</h3>
                  <p className="text-[13.5px] text-[#94A3B8] leading-relaxed">
                    체계적인 교육 과정을 거친 실력파 테라피스트들이 품격 있고 세심한 수기 테라피를 선사합니다.
                  </p>
                </div>
                <div className="flex items-center gap-2 text-primary text-[12.5px] font-semibold pt-4 mt-6 border-t border-[#1E293B]">
                  <span className="material-symbols-outlined text-[16px]">check_circle</span>
                  <span>전원 정규 테라피 교육 수료</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. SERVICE COURSES WITH TRANSPARENT PRICING */}
        <section id="courses" className="w-full bg-[#0a0e18] px-4 md:px-6 lg:px-8 py-16 md:py-28 border-t border-[#1E293B]">
          <div className="max-w-[1240px] mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
              <span className="inline-block px-3 py-1 rounded-full bg-[#171b26] border border-[#262a35] text-primary text-[11px] md:text-[12px] font-bold tracking-widest uppercase mb-2.5 shadow-sm">
                Select Your Course
              </span>
              <h2 className="text-[24px] sm:text-[30px] md:text-[36px] font-bold text-text-primary mb-2.5">투명하고 정직한 서비스 코스</h2>
              <p className="text-[13px] sm:text-[14px] md:text-[15px] text-text-muted leading-relaxed">
                추가 요금이나 숨은 비용이 전혀 없는 100% 정찰제 요금입니다.
              </p>
            </div>

            <div className="abam-courses-grid items-stretch">
              {/* Course 1: Thai Healing */}
              <div className="abam-course-card">
                <div>
                  {/* 코스 대표 비주얼 이미지 */}
                  <div
                    className="relative w-full rounded-xl overflow-hidden mb-4 border border-[#EEC14B]/25 group"
                    style={{ height: '170px', minHeight: '170px' }}
                  >
                    <Image
                      src="/images/thai.jpg"
                      alt="전통 타이 건식 지압 테라피"
                      fill
                      sizes="(max-width: 768px) 100vw, 380px"
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,14,24,0.92) 0%, rgba(10,14,24,0.2) 60%, transparent 100%)', pointerEvents: 'none' }} />
                    <span style={{ position: 'absolute', bottom: '10px', left: '12px', fontSize: '11px', fontWeight: 800, color: '#EEC14B', background: 'rgba(8,12,22,0.85)', padding: '3px 10px', borderRadius: '9999px', border: '1px solid rgba(238,193,75,0.3)', pointerEvents: 'none' }}>
                      건식 전통 지압
                    </span>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 rounded-full bg-[#1b1f2a] text-text-secondary text-[11px] font-semibold">건식 스트레칭</span>
                    <span className="text-[11px] text-text-muted font-medium">기본 릴렉스</span>
                  </div>
                  <h3 className="text-[22px] font-bold text-text-primary mb-1">타이 코스</h3>
                  <p className="text-[13px] text-text-muted mb-6 leading-relaxed">
                    전신 스트레칭과 정통 지압 요법으로 만성 근육 뭉침과 뻐근함을 시원하게 해소해 드립니다.
                  </p>

                  {/* Price Tiers */}
                  <div className="space-y-3 mb-8">
                    <button
                      type="button"
                      onClick={() => openDirectAbamSms('타이1 8만')}
                      className="abam-price-row"
                    >
                      <span className="text-[13px] font-semibold text-text-secondary">60분 코스</span>
                      <span className="text-[17px] font-bold text-text-primary">₩80,000<span className="text-[12px] font-normal text-text-muted ml-0.5">원</span></span>
                    </button>
                    <button
                      type="button"
                      onClick={() => openDirectAbamSms('타이90 10만')}
                      className="abam-price-row highlight"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-[13px] font-semibold text-text-secondary">90분 코스</span>
                        <span className="px-1.5 py-0.5 rounded bg-primary/20 text-primary text-[10px] font-bold">추천</span>
                      </div>
                      <span className="text-[17px] font-bold text-primary">₩100,000<span className="text-[12px] font-normal text-text-muted ml-0.5">원</span></span>
                    </button>
                    <button
                      type="button"
                      onClick={() => openDirectAbamSms('타이2 12만')}
                      className="abam-price-row"
                    >
                      <span className="text-[13px] font-semibold text-text-secondary">120분 코스</span>
                      <span className="text-[17px] font-bold text-text-primary">₩120,000<span className="text-[12px] font-normal text-text-muted ml-0.5">원</span></span>
                    </button>
                  </div>

                  {/* Features */}
                  <div className="space-y-2.5 mb-8">
                    <div className="flex items-center gap-2 text-text-secondary text-[12px]">
                      <span className="material-symbols-outlined text-primary text-[17px]">check</span>
                      <span>전신 건식 수기 지압 및 골반·어깨 스트레칭</span>
                    </div>
                    <div className="flex items-center gap-2 text-text-secondary text-[12px]">
                      <span className="material-symbols-outlined text-primary text-[17px]">check</span>
                      <span>호텔/홈 전용 1회용 청결 위생 커버 지참</span>
                    </div>
                    <div className="flex items-center gap-2 text-text-secondary text-[12px]">
                      <span className="material-symbols-outlined text-primary text-[17px]">check</span>
                      <span>목·두피 쿨링 릴렉스 아로마 밤 서비스</span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => openDirectAbamSms('타이90 10만')}
                  className="w-full min-h-[48px] rounded-xl bg-[#1E293B] hover:bg-[#27354A] text-text-primary text-center font-bold text-[14px] transition-colors border border-[#27354A] flex items-center justify-center gap-2 cursor-pointer shadow-sm mt-4"
                >
                  <span className="material-symbols-outlined text-[18px] text-primary">chat</span>
                  <span>타이 코스 간편 예약</span>
                </button>
              </div>

              {/* Course 2: Aroma Relaxing (POPULAR BEST) */}
              <div className="abam-course-card featured">
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-primary to-accent-gold-muted text-[#080C16] text-[11px] font-extrabold tracking-wide uppercase shadow-md z-20">
                  ★ 가장 많은 고객 선택 BEST
                </div>

                <div>
                  {/* 코스 대표 비주얼 이미지 */}
                  <div
                    className="relative w-full rounded-xl overflow-hidden mb-4 mt-2 border border-primary/40 group"
                    style={{ height: '170px', minHeight: '170px' }}
                  >
                    <Image
                      src="/images/aroma.jpg"
                      alt="프리미엄 아로마 오일 테라피"
                      fill
                      sizes="(max-width: 768px) 100vw, 380px"
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,14,24,0.92) 0%, rgba(10,14,24,0.2) 60%, transparent 100%)', pointerEvents: 'none' }} />
                    <span style={{ position: 'absolute', bottom: '10px', left: '12px', fontSize: '11px', fontWeight: 800, color: '#EEC14B', background: 'rgba(8,12,22,0.85)', padding: '3px 10px', borderRadius: '9999px', border: '1px solid rgba(238,193,75,0.4)', pointerEvents: 'none' }}>
                      유기농 천연 에센셜 오일
                    </span>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 rounded-full bg-primary/15 text-primary text-[11px] font-bold">오일 테라피</span>
                    <span className="text-[11px] text-primary font-semibold">심신 안정 &amp; 힐링</span>
                  </div>
                  <h3 className="text-[22px] font-bold text-text-primary mb-1">프리미엄 아로마 코스</h3>
                  <p className="text-[13px] text-text-muted mb-6 leading-relaxed">
                    최고급 유기농 에센셜 오일과 부드러운 스웨디시 기법으로 깊은 숙면과 심신의 안정을 선물합니다.
                  </p>

                  {/* Price Tiers */}
                  <div className="space-y-3 mb-8">
                    <button
                      type="button"
                      onClick={() => openDirectAbamSms('아로마1 9만')}
                      className="abam-price-row"
                    >
                      <span className="text-[13px] font-semibold text-text-secondary">60분 코스</span>
                      <span className="text-[17px] font-bold text-text-primary">₩90,000<span className="text-[12px] font-normal text-text-muted ml-0.5">원</span></span>
                    </button>
                    <button
                      type="button"
                      onClick={() => openDirectAbamSms('아로마90 11만')}
                      className="abam-price-row highlight"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-[13px] font-semibold text-primary font-bold">90분 코스</span>
                        <span className="px-1.5 py-0.5 rounded bg-primary text-[#080C16] text-[10px] font-extrabold">BEST</span>
                      </div>
                      <span className="text-[17px] font-bold text-primary">₩110,000<span className="text-[12px] font-normal text-text-muted ml-0.5">원</span></span>
                    </button>
                    <button
                      type="button"
                      onClick={() => openDirectAbamSms('아로마2 14만')}
                      className="abam-price-row"
                    >
                      <span className="text-[13px] font-semibold text-text-secondary">120분 코스</span>
                      <span className="text-[17px] font-bold text-text-primary">₩140,000<span className="text-[12px] font-normal text-text-muted ml-0.5">원</span></span>
                    </button>
                  </div>

                  {/* Features */}
                  <div className="space-y-2.5 mb-8">
                    <div className="flex items-center gap-2 text-text-secondary text-[12px]">
                      <span className="material-symbols-outlined text-primary text-[17px]">check</span>
                      <span>천연 오가닉 베이스 라벤더 &amp; 유칼립투스 블렌딩</span>
                    </div>
                    <div className="flex items-center gap-2 text-text-secondary text-[12px]">
                      <span className="material-symbols-outlined text-primary text-[17px]">check</span>
                      <span>전신 림프 순환 케어 및 부종 완화 테라피</span>
                    </div>
                    <div className="flex items-center gap-2 text-text-secondary text-[12px]">
                      <span className="material-symbols-outlined text-primary text-[17px]">check</span>
                      <span>온습포 타월 릴렉싱 및 마무리 케어 제공</span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => openDirectAbamSms('아로마90 11만')}
                  className="w-full min-h-[48px] rounded-xl bg-gradient-to-r from-primary via-primary to-accent-gold-muted text-[#080C16] text-center font-extrabold text-[14px] hover:brightness-105 transition-all shadow-[0_2px_12px_rgba(238,193,75,0.3)] flex items-center justify-center gap-2 cursor-pointer mt-4"
                >
                  <span className="material-symbols-outlined text-[18px]">chat</span>
                  <span>아로마 베스트 예약 접수</span>
                </button>
              </div>

              {/* Course 3: Special (Thai + Aroma) */}
              <div className="abam-course-card">
                <div>
                  {/* 코스 대표 비주얼 이미지 */}
                  <div
                    className="relative w-full rounded-xl border border-[#818CF8]/30 overflow-hidden mb-4 group"
                    style={{ height: '170px', minHeight: '170px' }}
                  >
                    <Image
                      src="/images/flower_spa.jpg"
                      alt="VIP 스페셜 복합 콤비네이션 케어"
                      fill
                      sizes="(max-width: 768px) 100vw, 380px"
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,14,24,0.92) 0%, rgba(10,14,24,0.2) 60%, transparent 100%)', pointerEvents: 'none' }} />
                    <span style={{ position: 'absolute', bottom: '10px', left: '12px', fontSize: '11px', fontWeight: 800, color: '#A5B4FC', background: 'rgba(8,12,22,0.85)', padding: '3px 10px', borderRadius: '9999px', border: '1px solid rgba(129,140,248,0.4)', pointerEvents: 'none' }}>
                      건식 수기 + 아로마 콤보
                    </span>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 rounded-full bg-[#312E81]/40 text-[#818CF8] text-[11px] font-bold">건식 + 아로마 콤보</span>
                    <span className="text-[11px] text-[#818CF8] font-semibold">복합 힐링</span>
                  </div>
                  <h3 className="text-[22px] font-bold text-text-primary mb-1">스페셜 (타이+아로마)</h3>
                  <p className="text-[13px] text-text-muted mb-6 leading-relaxed">
                    타이의 시원한 수기 지압과 아로마의 부드러운 오일 케어를 동시에 누리는 인기 복합 코스입니다.
                  </p>

                  {/* Price Tiers */}
                  <div className="space-y-3 mb-8">
                    <button
                      type="button"
                      onClick={() => openDirectAbamSms('스페셜1 10만')}
                      className="abam-price-row"
                    >
                      <span className="text-[13px] font-semibold text-text-secondary">60분 코스</span>
                      <span className="text-[17px] font-bold text-text-primary">₩100,000<span className="text-[12px] font-normal text-text-muted ml-0.5">원</span></span>
                    </button>
                    <button
                      type="button"
                      onClick={() => openDirectAbamSms('스페셜90 12만')}
                      className="abam-price-row highlight"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-[13px] font-semibold text-text-secondary">90분 코스</span>
                        <span className="px-1.5 py-0.5 rounded bg-[#818CF8]/20 text-[#818CF8] text-[10px] font-bold">인기 추천</span>
                      </div>
                      <span className="text-[17px] font-bold text-[#818CF8]">₩120,000<span className="text-[12px] font-normal text-text-muted ml-0.5">원</span></span>
                    </button>
                    <button
                      type="button"
                      onClick={() => openDirectAbamSms('스페셜2 16만')}
                      className="abam-price-row"
                    >
                      <span className="text-[13px] font-semibold text-text-secondary">120분 코스</span>
                      <span className="text-[17px] font-bold text-text-primary">₩160,000<span className="text-[12px] font-normal text-text-muted ml-0.5">원</span></span>
                    </button>
                  </div>

                  {/* Features */}
                  <div className="space-y-2.5 mb-8">
                    <div className="flex items-center gap-2 text-text-secondary text-[12px]">
                      <span className="material-symbols-outlined text-[#818CF8] text-[17px]">check</span>
                      <span>전신 수기 지압 + 프리미엄 딥티슈 아로마 블렌딩</span>
                    </div>
                    <div className="flex items-center gap-2 text-text-secondary text-[12px]">
                      <span className="material-symbols-outlined text-[#818CF8] text-[17px]">check</span>
                      <span>발 반사구 지압 + 두피·목 집중 쿨링 릴렉싱</span>
                    </div>
                    <div className="flex items-center gap-2 text-text-secondary text-[12px]">
                      <span className="material-symbols-outlined text-[#818CF8] text-[17px]">check</span>
                      <span>에이스 수석 테라피스트 최우선 배차 서비스</span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => openDirectAbamSms('스페셜90 12만')}
                  className="w-full min-h-[48px] rounded-xl bg-[#1E293B] hover:bg-[#27354A] text-text-primary text-center font-bold text-[14px] transition-colors border border-[#27354A] flex items-center justify-center gap-2 cursor-pointer shadow-sm mt-4"
                >
                  <span className="material-symbols-outlined text-[18px] text-primary">chat</span>
                  <span>스페셜 코스 예약 접수</span>
                </button>
              </div>
            </div>

            {/* Bottom Reassurance Banner */}
            <div className="mt-12 p-4 md:p-5 rounded-2xl bg-[#0F1626] border border-primary/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-primary text-[22px]">verified_user</span>
                </div>
                <div>
                  <h4 className="text-[14px] font-bold text-text-primary">선입금 없는 100% 현장 후불제 보장</h4>
                  <p className="text-[12px] text-text-muted">관리사가 계신 곳에 도착하여 대면 후 현금, 계좌이체, 카드로 직접 결제하세요.</p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="px-2.5 py-1 rounded bg-[#171b26] text-text-secondary text-[11px] font-semibold">현금</span>
                <span className="px-2.5 py-1 rounded bg-[#171b26] text-text-secondary text-[11px] font-semibold">계좌이체</span>
                <span className="px-2.5 py-1 rounded bg-[#171b26] text-text-secondary text-[11px] font-semibold">카드결제</span>
              </div>
            </div>
          </div>
        </section>

        {/* 4. HOW IT WORKS (3 Simple Steps) */}
        <section id="guide" className="w-full bg-[#080C16] px-4 md:px-6 lg:px-8 py-20 md:py-28 lg:py-32 border-t border-[#1E293B]">
          <div className="max-w-[1240px] mx-auto">
            <div className="text-center max-w-xl mx-auto mb-16 md:mb-20">
              <span className="text-[12px] text-primary tracking-widest uppercase font-bold">Simple 3-Step Process</span>
              <h2 className="text-[26px] md:text-[34px] font-bold text-text-primary mt-1 mb-2">누구나 쉬운 간편 이용 안내</h2>
              <p className="text-[13px] md:text-[14px] text-text-muted">
                복잡한 가입 절차 없이, 전화나 문자 한 통으로 30분 안에 힐링이 시작됩니다.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 relative">
              {/* Step 1 */}
              <div className="abam-step-card">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="w-11 h-11 rounded-full bg-primary/15 text-primary font-black text-lg flex items-center justify-center border border-primary/30">1</span>
                    <span className="text-[11px] text-text-muted font-bold tracking-wider">STEP 01</span>
                  </div>
                  <h3 className="text-[19px] font-bold text-text-primary mb-3">전화 또는 문자 간편 접수</h3>
                  <p className="text-[13.5px] text-text-muted leading-relaxed mb-6">
                    원하시는 코스와 시간, 그리고 계신 곳의 주소(자택 주소 또는 호텔/모텔 상호명 및 호수)를 전달해 주세요.
                  </p>
                </div>
                <div className="pt-4 border-t border-[#1E293B] text-[12.5px] text-primary font-semibold flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[17px]">timer</span>
                  <span>소요 시간: 약 1분</span>
                </div>
              </div>

              {/* Step 2 */}
              <div className="abam-step-card">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="w-11 h-11 rounded-full bg-primary/15 text-primary font-black text-lg flex items-center justify-center border border-primary/30">2</span>
                    <span className="text-[11px] text-text-muted font-bold tracking-wider">STEP 02</span>
                  </div>
                  <h3 className="text-[19px] font-bold text-text-primary mb-3">테라피스트 배정 &amp; 신속 출발</h3>
                  <p className="text-[13.5px] text-text-muted leading-relaxed mb-6">
                    고객님과 가장 가까운 거점에 상주 중인 전문 테라피스트가 배정되어 즉시 출발하며, 실시간 예상 도착 시간을 안내해 드립니다.
                  </p>
                </div>
                <div className="pt-4 border-t border-[#1E293B] text-[12.5px] text-primary font-semibold flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[17px]">near_me</span>
                  <span>평균 도착: 25~35분</span>
                </div>
              </div>

              {/* Step 3 */}
              <div className="abam-step-card">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="w-11 h-11 rounded-full bg-primary/15 text-primary font-black text-lg flex items-center justify-center border border-primary/30">3</span>
                    <span className="text-[11px] text-text-muted font-bold tracking-wider">STEP 03</span>
                  </div>
                  <h3 className="text-[19px] font-bold text-text-primary mb-3">맞춤 케어 &amp; 안심 후불 결제</h3>
                  <p className="text-[13.5px] text-text-muted leading-relaxed mb-6">
                    테라피스트 도착 후 현장에서 직접 대면하여 결제하신 후, 프라이빗하고 안락한 공간에서 최고급 힐링을 누리세요.
                  </p>
                </div>
                <div className="pt-4 border-t border-[#1E293B] text-[12.5px] text-primary font-semibold flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[17px]">verified</span>
                  <span>100% 현장 대면 결제</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. SERVICE REGIONS GRID */}
        <section id="regions" className="w-full bg-[#0a0e18] px-4 md:px-6 lg:px-8 py-20 md:py-28 lg:py-32 border-t border-[#1E293B]">
          <div className="max-w-[1240px] mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-20 gap-6">
              <div>
                <span className="text-[12px] text-primary tracking-widest uppercase font-bold">Coverage Area</span>
                <h2 className="text-[26px] md:text-[34px] font-bold text-text-primary mt-1">서울·경기·인천 전 지역 서비스</h2>
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1b1f2a] border border-[#262a35] text-text-secondary text-[12px]">
                <span className="w-2.5 h-2.5 rounded-full bg-status-online animate-pulse"></span>
                <span>현재 전 구역 실시간 배차 가동</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
              {/* Seoul Area */}
              <div className="abam-region-card">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-11 h-11 rounded-xl bg-[#1b1f2a] flex items-center justify-center text-primary border border-primary/20">
                    <span className="material-symbols-outlined text-[24px]">apartment</span>
                  </div>
                  <div>
                    <h3 className="text-[18px] font-bold text-text-primary">서울특별시 전역</h3>
                    <p className="text-[12px] text-primary font-medium">25개 자치구 전 구역 30분 출장</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2.5 text-[12px] text-text-secondary">
                  <div className="abam-region-pill">강남·서초·송파</div>
                  <div className="abam-region-pill">마포·용산·성동</div>
                  <div className="abam-region-pill">영등포·여의도</div>
                  <div className="abam-region-pill">종로·중구·동대문</div>
                  <div className="abam-region-pill">강서·양천·구로</div>
                  <div className="abam-region-pill">광진·강동·노원</div>
                </div>
              </div>

              {/* Gyeonggi Area */}
              <div className="abam-region-card">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-11 h-11 rounded-xl bg-[#1b1f2a] flex items-center justify-center text-primary border border-primary/20">
                    <span className="material-symbols-outlined text-[24px]">location_city</span>
                  </div>
                  <div>
                    <h3 className="text-[18px] font-bold text-text-primary">경기 수도권 전역</h3>
                    <p className="text-[12px] text-primary font-medium">주요 신도시 및 전 거점 집중 배차</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2.5 text-[12px] text-text-secondary">
                  <div className="abam-region-pill">분당·판교·성남</div>
                  <div className="abam-region-pill">수원·광교·영통</div>
                  <div className="abam-region-pill">용인·기흥·수지</div>
                  <div className="abam-region-pill">일산·고양·파주</div>
                  <div className="abam-region-pill">부천·광명·시흥</div>
                  <div className="abam-region-pill">하남·남양주·구리</div>
                </div>
              </div>

              {/* Incheon Area */}
              <div className="abam-region-card">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-11 h-11 rounded-xl bg-[#1b1f2a] flex items-center justify-center text-primary border border-primary/20">
                    <span className="material-symbols-outlined text-[24px]">travel_explore</span>
                  </div>
                  <div>
                    <h3 className="text-[18px] font-bold text-text-primary">인천 광역시 전역</h3>
                    <p className="text-[12px] text-primary font-medium">국제도시 및 전 자치구 배차망</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2.5 text-[12px] text-text-secondary">
                  <div className="abam-region-pill">송도 국제도시</div>
                  <div className="abam-region-pill">청라 국제도시</div>
                  <div className="abam-region-pill">부평·계양구</div>
                  <div className="abam-region-pill">남동구·구월동</div>
                  <div className="abam-region-pill">미추홀·연수구</div>
                  <div className="abam-region-pill">영종도 공항 호텔</div>
                </div>
              </div>
            </div>

            {/* SEO Area Links Index (Collapsible / Expandable for maximum SEO crawling) */}
            {areaLinks && areaLinks.length > 0 && (
              <div className="mt-8 p-5 md:p-6 rounded-2xl bg-[#0F1626] border border-[#1E293B]">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#1E293B]/80">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-[18px]">travel_explore</span>
                    <span className="text-[13px] md:text-[14px] font-bold text-white">
                      수도권 세부 지역별 출장마사지 바로가기 ({areaLinks.length}개 지역)
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowAllLinks(!showAllLinks)}
                    className="text-[12px] text-primary hover:text-white hover:border-primary/50 transition-colors font-semibold cursor-pointer px-3 py-1 rounded-md bg-[#171b26] border border-[#262a35]"
                  >
                    {showAllLinks ? '접기 ▲' : '전체 지역 보기 ▼'}
                  </button>
                </div>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(115px, 1fr))',
                    gap: '8px',
                    maxHeight: showAllLinks ? '3000px' : '96px',
                    overflow: 'hidden',
                    transition: 'max-height 0.3s ease',
                  }}
                >
                  {areaLinks.map((link) => {
                    const rawName = link.replace(/^\//, '').replace(/-/g, ' ');
                    const href = link.startsWith('/') || link.startsWith('#')
                      ? link
                      : `/seo/${encodeURIComponent(link.trim().replace(/\s+/g, '-'))}`;
                    return (
                      <Link
                        key={link}
                        href={href}
                        className="text-[11.5px] text-[#94A3B8] hover:text-white hover:border-primary/50 hover:bg-[#1E293B] transition-all truncate text-center py-2 px-2.5 rounded-lg bg-[#141A28] border border-[#222B3D] block font-medium"
                        title={rawName}
                      >
                        {rawName}
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* 6. CUSTOMER REVIEWS */}
        <section id="reviews" className="w-full bg-[#080C16] px-4 md:px-6 lg:px-8 py-20 md:py-28 lg:py-32 border-t border-[#1E293B]">
          <div className="max-w-[1240px] mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-20 gap-6">
              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-[#171b26] border border-[#262a35] text-primary text-[11px] md:text-[12px] font-bold tracking-widest uppercase mb-3 shadow-sm">
                  Verified Reviews
                </span>
                <h2 className="text-[26px] md:text-[34px] font-bold text-white mt-1">실제 이용 고객님들의 안심 후기</h2>
              </div>
              <div className="flex items-center gap-3.5 px-5 py-2.5 rounded-full bg-[#1b1f2a] border border-[#262a35] shadow-md">
                <div className="flex items-center gap-1.5" style={{ color: '#EEC14B' }}>
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      style={{ width: '20px', height: '20px', minWidth: '20px', fill: '#EEC14B', display: 'inline-block' }}
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-[16px] font-extrabold text-white">4.9 / 5.0</span>
                <span className="text-[13px] text-text-muted">누적 만족 리뷰 1,280+건</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
              {/* Review 1 */}
              <div className="abam-review-card">
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-1.5" style={{ color: '#EEC14B' }}>
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          width="18"
                          height="18"
                          viewBox="0 0 20 20"
                          style={{ width: '18px', height: '18px', minWidth: '18px', fill: '#EEC14B', display: 'inline-block' }}
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-[12px] text-text-muted">어제 밤 01:20</span>
                  </div>
                  <p className="text-[14px] text-text-secondary leading-relaxed mb-8">
                    &quot;출장 때문에 역삼동 호텔에 묵으면서 야근 후 너무 피곤해서 불러봤는데 정확히 25분 만에 오셨어요. 타월이랑 일회용 깔개도 챙겨오시고 실력이 웬만한 고급 호텔 스파 이상이었습니다. 예약금 없어서 제일 안심됐어요.&quot;
                  </p>
                </div>
                <div className="flex items-center gap-3 pt-5 border-t border-[#1E293B]">
                  <div className="w-9 h-9 rounded-full bg-primary/15 text-primary font-black text-[13px] flex items-center justify-center border border-primary/30">이*</div>
                  <div>
                    <div className="text-[13px] font-bold text-white">이** 고객님</div>
                    <div className="text-[11.5px] text-text-muted">강남 역삼동 비즈니스 호텔 이용 · 아로마 90분</div>
                  </div>
                </div>
              </div>

              {/* Review 2 */}
              <div className="abam-review-card">
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-1.5" style={{ color: '#EEC14B' }}>
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          width="18"
                          height="18"
                          viewBox="0 0 20 20"
                          style={{ width: '18px', height: '18px', minWidth: '18px', fill: '#EEC14B', display: 'inline-block' }}
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-[12px] text-text-muted">3일 전</span>
                  </div>
                  <p className="text-[14px] text-text-secondary leading-relaxed mb-8">
                    &quot;판교 쪽에서 재택근무 하면서 목이랑 어깨가 너무 결렸는데, 집에서 편하게 받을 수 있어서 너무 좋네요. 아로마 향도 고급스럽고 압도 중간중간 세심하게 체크해 주셔서 푹 쉬었습니다. 단골 예약입니다.&quot;
                  </p>
                </div>
                <div className="flex items-center gap-3 pt-5 border-t border-[#1E293B]">
                  <div className="w-9 h-9 rounded-full bg-primary/15 text-primary font-black text-[13px] flex items-center justify-center border border-primary/30">박*</div>
                  <div>
                    <div className="text-[13px] font-bold text-white">박** 고객님</div>
                    <div className="text-[11.5px] text-text-muted">분당 판교 자택 이용 · VIP 120분</div>
                  </div>
                </div>
              </div>

              {/* Review 3 */}
              <div className="abam-review-card">
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-1.5" style={{ color: '#EEC14B' }}>
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          width="18"
                          height="18"
                          viewBox="0 0 20 20"
                          style={{ width: '18px', height: '18px', minWidth: '18px', fill: '#EEC14B', display: 'inline-block' }}
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-[12px] text-text-muted">지난주 금요일</span>
                  </div>
                  <p className="text-[14px] text-text-secondary leading-relaxed mb-8">
                    &quot;새벽 3시에 연락드렸는데 친절하고 빠르게 상담해 주셔서 놀랐습니다. 도착 시간도 약속대로 딱 맞춰 오셨고 마사지 테크닉이 확실히 전문적이셨어요. 밤늦게 피로 풀기에 최고입니다.&quot;
                  </p>
                </div>
                <div className="flex items-center gap-3 pt-5 border-t border-[#1E293B]">
                  <div className="w-9 h-9 rounded-full bg-primary/15 text-primary font-black text-[13px] flex items-center justify-center border border-primary/30">최*</div>
                  <div>
                    <div className="text-[13px] font-bold text-white">최** 고객님</div>
                    <div className="text-[11.5px] text-text-muted">용산 한남동 오피스텔 이용 · 타이 90분</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 7. FAQ SECTION */}
        <section id="faq" className="w-full bg-[#0a0e18] px-4 md:px-6 lg:px-8 py-20 md:py-28 lg:py-32 border-t border-[#1E293B]">
          <div className="max-w-[1240px] mx-auto">
            <div className="text-center max-w-xl mx-auto mb-16 md:mb-20">
              <span className="text-[12px] text-primary tracking-widest uppercase font-bold">FAQ</span>
              <h2 className="text-[26px] md:text-[34px] font-bold text-text-primary mt-1 mb-2">자주 묻는 질문</h2>
              <p className="text-[13px] md:text-[14px] text-text-muted">
                궁금하신 내용을 미리 확인하시고 편안하게 상담받으세요.
              </p>
            </div>

            <div className="max-w-3xl mx-auto space-y-5">
              {faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="abam-faq-card"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-6 flex items-center justify-between text-left cursor-pointer hover:bg-[#1E293B]/40 transition-colors"
                  >
                    <span className="text-[16px] font-bold text-text-primary pr-4">{faq.q}</span>
                    <span
                      className={`material-symbols-outlined text-primary text-[22px] transition-transform duration-200 shrink-0 ${
                        openFaq === idx ? 'rotate-180' : ''
                      }`}
                    >
                      expand_more
                    </span>
                  </button>
                  {openFaq === idx && (
                    <div className="px-6 pb-6 pt-1 text-[13.5px] text-text-muted leading-relaxed border-t border-[#1E293B]/60">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 8. BOTTOM CALL-TO-ACTION BANNER */}
        <section className="w-full bg-gradient-to-b from-[#080C16] via-[#0F1626] to-[#05080F] px-4 md:px-6 lg:px-8 py-20 md:py-24 text-center border-t border-[#1E293B]">
          <div className="max-w-2xl mx-auto flex flex-col items-center">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/25 flex items-center justify-center text-primary mb-6 shadow-[0_0_24px_rgba(238,193,75,0.2)]">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z" />
              </svg>
            </div>
            <h2 className="text-[26px] md:text-[36px] font-bold text-white tracking-tight mb-3">
              오늘 밤, 지친 하루의 피로를 풀어보세요
            </h2>
            <p className="text-[14px] md:text-[15px] text-text-muted mb-6 leading-relaxed">
              복잡한 예약 절차 없이 전화 한 통, 문자 한 통이면 충분합니다.<br className="hidden sm:inline"/>
              계신 곳에서 가장 편안하고 안전한 힐링을 지금 바로 누려보세요.
            </p>

            {/* 하단 마감 럭셔리 비주얼 배너 */}
            <div
              className="w-full max-w-xl mx-auto rounded-2xl overflow-hidden border border-[#EEC14B]/35 shadow-[0_16px_40px_-10px_rgba(0,0,0,0.85)] relative mb-8 group"
              style={{ height: '220px', minHeight: '220px' }}
            >
              <Image
                src="/images/abam_penthouse_night.jpg"
                alt="아밤 프라이빗 야간 배차 힐링 케어"
                fill
                sizes="(max-width: 768px) 100vw, 600px"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(8,12,22,0.92) 0%, rgba(8,12,22,0.25) 55%, transparent 100%)', pointerEvents: 'none' }} />
              <div style={{ position: 'absolute', bottom: '14px', left: '16px', right: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', pointerEvents: 'none' }}>
                <span style={{ fontSize: '12px', fontWeight: 800, color: '#EEC14B', background: 'rgba(8,12,22,0.85)', padding: '4px 12px', borderRadius: '9999px', border: '1px solid rgba(238,193,75,0.4)' }}>
                  🌙 서울 전 지역 30분대 빠른 방문 배차
                </span>
                <span style={{ fontSize: '11px', color: '#94A3B8', fontWeight: 600 }}>
                  24시 안심 프라이빗
                </span>
              </div>
            </div>

            <div className="w-full max-w-md flex flex-col sm:flex-row items-center justify-center gap-3.5">
              <a
                className="w-full sm:w-1/2 flex items-center justify-center gap-2 min-h-[50px] px-6 rounded-xl bg-gradient-to-r from-primary via-primary to-accent-gold-muted text-[#080C16] font-bold text-[15px] shadow-[0_4px_16px_rgba(238,193,75,0.3)] hover:brightness-105 transition-all no-underline"
                href={`tel:${cleanPhone}`}
              >
                <span className="material-symbols-outlined text-[19px]">call</span>
                <span>실시간 전화 상담</span>
              </a>
              <button
                type="button"
                onClick={() => openDirectAbamSms()}
                className="w-full sm:w-1/2 flex items-center justify-center gap-2 min-h-[50px] px-6 rounded-xl bg-[#171b26] border border-[#2a3040] text-white font-bold text-[15px] hover:bg-[#202636] transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-primary text-[19px]">sms</span>
                <span>문자 간편 상담 접수</span>
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer
        className="w-full bg-[#060913] text-[#94A3B8] border-t border-[#1E293B] abam-site-footer"
        style={{
          paddingTop: '56px',
          paddingBottom: 'calc(100px + env(safe-area-inset-bottom, 24px))',
        }}
      >
        <div className="max-w-[1240px] mx-auto px-4 md:px-6 lg:px-8">
          
          {/* Top Trust Pillar Strip */}
          <div className="mb-10 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#0C1222] via-[#0F172A] to-[#0C1222] border border-[#1E293B] shadow-[0_4px_20px_rgba(0,0,0,0.5)] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary text-xl shrink-0">
                🛡️
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[14.5px] sm:text-[15.5px] font-extrabold text-white tracking-tight">
                    100% 현장 대면 안심 후불제 원칙
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 text-[11px] font-bold border border-emerald-500/30">
                    선입금·예약금 0원 보증
                  </span>
                </div>
                <p className="text-[12px] sm:text-[12.5px] text-[#94A3B8] mt-0.5 leading-snug">
                  예약금이나 유류비를 절대 사전에 요구하지 않으며, 관리사 도착 대면 후 직접 결제합니다.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 w-full md:w-auto shrink-0 flex-wrap">
              <span className="px-3 py-1.5 rounded-lg bg-[#141C2E] text-[12px] font-semibold text-slate-300 border border-[#222F49] flex items-center gap-1.5">
                <span>⚡</span> 30분 신속 도착
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-[#141C2E] text-[12px] font-semibold text-slate-300 border border-[#222F49] flex items-center gap-1.5">
                <span>🔒</span> 1:1 프라이빗 보장
              </span>
            </div>
          </div>

          {/* 3-Column Structured Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10 pb-10 border-b border-[#1E293B]">
            {/* Col 1: Brand (span 4) */}
            <div className="md:col-span-4 space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-primary/15 border border-primary/40 flex items-center justify-center text-primary shadow-[0_0_12px_rgba(238,193,75,0.25)]">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z" />
                  </svg>
                </div>
                <span className="text-[18px] font-black text-white tracking-tight">아밤 (ABAM.kr)</span>
                <span className="px-2 py-0.5 rounded-full bg-[#161D2F] text-primary text-[10.5px] font-bold border border-primary/30">
                  VIP Concierge
                </span>
              </div>
              <p className="text-[13px] text-[#94A3B8] leading-relaxed">
                서울 25개구 및 수도권 전 지역 자택·호텔 30분 방문 프리미엄 힐링 케어 플랫폼. 100% 실명 검증 관리사와 정찰제 현장 후불제만을 엄격히 고집합니다.
              </p>
              <div className="pt-1 space-y-1.5 text-[12px] text-[#64748B]">
                <div className="flex items-center gap-2">
                  <span className="text-primary font-bold">운영안내</span>
                  <span className="text-slate-300">연중무휴 24시간 실시간 배차 접수</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-primary font-bold">방문지역</span>
                  <span className="text-slate-300">서울 전역 · 경기 수도권 · 인천 전 지역</span>
                </div>
              </div>
            </div>

            {/* Col 2: Services & Coverage (span 4) */}
            <div className="md:col-span-4 space-y-3">
              <h4 className="text-[13.5px] font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <span className="text-primary">❖</span> 서비스 프로그램 &amp; 코스
              </h4>
              <div className="space-y-2 text-[12.5px]">
                <div className="p-3 rounded-xl bg-[#0C1222] border border-[#1E293B] flex items-center justify-between">
                  <span className="font-semibold text-slate-200">타이 테라피 (건식 지압)</span>
                  <span className="text-slate-300 font-bold bg-[#141C2E] px-2 py-0.5 rounded border border-[#222F49]">
                    60분 / 90분 / 120분
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-[#0C1222] border border-[#1E293B] flex items-center justify-between">
                  <span className="font-semibold text-slate-200">프리미엄 아로마 (오가닉)</span>
                  <span className="text-slate-300 font-bold bg-[#141C2E] px-2 py-0.5 rounded border border-[#222F49]">
                    60분 / 90분 / 120분
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-gradient-to-r from-[#0C1222] to-[#161F36] border border-primary/40 flex items-center justify-between">
                  <span className="font-bold text-white flex items-center gap-1.5">
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-primary text-slate-950 font-black">인기</span>
                    스페셜 콤보 (타이+아로마)
                  </span>
                  <span className="text-primary font-extrabold">120분 추천</span>
                </div>
              </div>
            </div>

            {/* Col 3: 24h Customer Support (span 4) */}
            <div className="md:col-span-4 space-y-3">
              <h4 className="text-[13.5px] font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <span className="text-primary">❖</span> 24시 실시간 접수 &amp; 고객센터
              </h4>
              <div className="p-4 rounded-2xl bg-gradient-to-b from-[#0F172A] to-[#0A101D] border border-primary/30 shadow-[0_4px_25px_rgba(0,0,0,0.4)] space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#10B981]"></span>
                  <span className="text-[12px] text-emerald-400 font-bold tracking-wide">
                    연중무휴 실시간 접수 중
                  </span>
                </div>
                <a
                  href={`tel:${cleanPhone}`}
                  className="text-[23px] font-black text-white hover:text-primary transition-colors block tracking-tight"
                >
                  {formattedPhone}
                </a>
                <div className="grid grid-cols-2 gap-2 pt-0.5">
                  <a
                    href={`tel:${cleanPhone}`}
                    className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-gradient-to-r from-primary to-accent-gold-muted text-slate-950 font-black text-[12.5px] hover:brightness-105 active:scale-95 transition-all text-center no-underline shadow-md"
                  >
                    <span>📞</span> 전화 문의
                  </a>
                  <button
                    type="button"
                    onClick={() => openDirectAbamSms()}
                    className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#141C2E] hover:bg-[#1C263D] text-white font-bold text-[12.5px] border border-[#2E3D5E] active:scale-95 transition-all text-center cursor-pointer"
                  >
                    <span>💬</span> 문자 예약
                  </button>
                </div>
                <p className="text-[11.5px] text-[#64748B] leading-relaxed pt-1">
                  예약금이나 선입금을 절대 요구하지 않는 100% 안심 후불제 플랫폼입니다.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Copyright & Policy Links */}
          <div className="pt-7 flex flex-col md:flex-row items-center justify-between text-[11.5px] text-[#64748B] gap-4">
            <div className="space-y-1 text-center md:text-left">
              <div>
                © {new Date().getFullYear()} Abam.kr. All rights reserved. 건전한 프리미엄 수기 힐링 문화를 지향합니다.
              </div>
              <div className="text-[11px] text-[#475569]">
                아밤은 건전 힐링 케어 정보 제공 플랫폼으로 관련 법규를 엄격히 준수하며 퇴폐·불법 문의는 사절합니다.
              </div>
            </div>
            <div className="flex items-center gap-4 text-[#94A3B8] flex-wrap justify-center">
              <span className="hover:text-primary transition-colors cursor-pointer">이용약관</span>
              <span className="text-[#334155]">•</span>
              <span className="hover:text-primary transition-colors cursor-pointer">개인정보처리방침</span>
              <span className="text-[#334155]">•</span>
              <span className="text-primary font-semibold">100% 현장후불제 원칙</span>
            </div>
          </div>

          {/* 모바일 하단 고정 예약 버튼바와 콘텐츠 겹침 방지 여백 (Clearance Spacer) */}
          <div
            className="w-full block md:hidden"
            style={{
              height: 'calc(76px + env(safe-area-inset-bottom, 20px))',
              pointerEvents: 'none',
            }}
            aria-hidden="true"
          />
        </div>
      </footer>

          {/* 모바일 하단 고정 예약 버튼바와 콘텐츠 겹침 방지 여백 (Clearance Spacer) */}
          <div
            className="w-full block md:hidden"
            style={{
              height: 'calc(76px + env(safe-area-inset-bottom, 20px))',
              pointerEvents: 'none',
            }}
            aria-hidden="true"
          />
        </div>
      </footer>

      {/* FIXED BOTTOM BOOKING BAR */}
      <AbamBottomBookingBar phone={cleanPhone} />
    </div>
  );
}
