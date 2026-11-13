'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { type LandingContent } from '../lib/landing-content';
import AbamBottomBookingBar, { openDirectAbamSms } from './AbamBottomBookingBar';

export default function AbamLanding({ c, areaLinks }: { c: LandingContent; areaLinks?: string[] }) {
  const cleanPhone = c.contact.phone.replace(/[^0-9]/g, '') || '01066072239';
  const formattedPhone = c.contact.phone || '010-6607-2239';

  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showAllLinks, setShowAllLinks] = useState(false);
  const [scheduleState, setScheduleState] = useState<{
    isDispatchActive: boolean; // 19:00 ~ 03:59: 순차출발 가동중 (04시까지 예약 가능)
    isBookingOpen: boolean;    // 18:00 ~ 18:59: 18시 예약 오픈 (19시 순차출발)
    isDaytime: boolean;        // 04:00 ~ 17:59: 오늘 밤 사전예약
    isGreen: boolean;
  }>({
    isDispatchActive: true,
    isBookingOpen: false,
    isDaytime: false,
    isGreen: true
  });

  React.useEffect(() => {
    const checkKst = () => {
      const now = new Date();
      const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
      const kstDate = new Date(utc + (9 * 3600000));
      const hour = kstDate.getHours();

      // 운영 시간 공식 규칙:
      // 18:00부터 예약 가능
      // 19:00부터 순차 출발
      // 04:00까지 예약 가능 (04시 마감이 아닌 04시까지 예약 접수)
      const isDispatchActive = (hour >= 19 || hour < 4);
      const isBookingOpen = (hour === 18);
      const isDaytime = (hour >= 4 && hour < 18);
      const isGreen = (isDispatchActive || isBookingOpen);

      setScheduleState({
        isDispatchActive,
        isBookingOpen,
        isDaytime,
        isGreen
      });
    };
    checkKst();
    const interval = setInterval(checkKst, 60000);
    return () => clearInterval(interval);
  }, []);

  const cityName = c.city || '';
  const heroTitle = cityName 
    ? `${cityName} 아름다운 밤, 아밤(ABAM.kr)` 
    : '아름다운 밤, 아밤(ABAM.kr)';

  const heroSubtitle = "아밤은 '아름다운 밤'의 줄임말로, 지친 하루의 끝 가장 편안하고 프라이빗한 프리미엄 야간 힐링을 선물합니다. 자택 및 호텔 어디서든 전화나 문자 한 통으로 100% 현장 후불제로 품격 있게 시작하세요.";

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const [quickCourse, setQuickCourse] = useState('A코스 90분 (10만)');
  const [quickAddr, setQuickAddr] = useState('');
  const [quickDoor, setQuickDoor] = useState('');
  const [quickPay, setQuickPay] = useState('계좌이체');
  const [cashChange, setCashChange] = useState<'exact' | 'needChange'>('exact');
  const finalQuickPay = quickPay === '현금 (후불)'
    ? (cashChange === 'needChange' ? '현금(거스름돈 요청)' : '현금(딱맞춤)')
    : quickPay;
  const [quickPlaceType, setQuickPlaceType] = useState<'home' | 'hotel'>('home');
  const isHotelBooking = quickPlaceType === 'hotel' || (/호텔|모텔|스테이|리조트|게스트|숙소|비즈니스|파크|호스텔|inn|hotel|motel/i.test(quickAddr) && quickPlaceType !== 'home');

  const handleQuickSmsSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const isIOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent || '');
    const sep = isIOS ? '&body=' : '?body=';
    const addrStr = quickAddr.trim() || '[방문 상세주소/호텔명·호수 입력]';
    const doorStr = quickDoor.trim() || '[공동현관 비번 or 1층호출]';
    const text = `[아밤 빠른예약신청]\n• 코스: ${quickCourse}\n• 주소: ${addrStr}\n• 공비: ${doorStr}\n• 결제: ${quickPay}\n(신속 배차 요청)`;
    if (typeof window !== 'undefined') {
      window.location.href = `sms:01066072239${sep}${encodeURIComponent(text)}`;
    }
  };

  const copyQuickSlip = () => {
    const addrStr = quickAddr.trim() || '역삼동 OO오피스텔 1204호';
    const doorStr = quickDoor.trim() || '#1234 (또는 1층 호출)';
    const text = `[아밤 빠른예약신청]\n• 코스: ${quickCourse}\n• 주소: ${addrStr}\n• 공비: ${doorStr}\n• 결제: ${finalQuickPay}`;
    if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).catch(() => {});
    }
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('abam-sms-toast', {
          detail: '📋 예약 양식이 복사되었습니다. 문자로 붙여넣어 전송해주세요!',
        }),
      );
    }
  };

  const copyBookingSlip = () => {
    const text = `[아밤 빠른예약신청]\n• 코스: A코스 90분 (10만)\n• 주소: [방문 상세주소/호텔명·호수]\n• 공비: [공동현관 비번 or 1층호출]\n• 결제: [계좌이체 / 현금 / 카드]`;
    if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).catch(() => {});
    }
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('abam-sms-toast', {
          detail: '📋 예약 양식이 복사되었습니다. 문자로 붙여넣어 전송해주세요!',
        }),
      );
    }
  };

  const faqs = [
    {
      q: '선입금이나 예약금이 전혀 없나요?',
      a: '네, 100% 안심 현장 후불제입니다. 아밤은 어떠한 경우에도 예약금이나 보증금, 유류비를 요구하지 않으며, 관리사가 계신 곳에 도착하여 직접 대면한 후 현장 결제(현금, 계좌이체, 카드)로 진행됩니다.'
    },
    {
      q: '관리사분들은 어떤 분들이 오시나요? (사진 요구 및 나이/프로필)',
      a: '아밤의 테라피스트는 전원 철저한 마인드와 실기 교육을 수료한 20대 전문 에이스 힐러로 구성되어 있습니다. 인터넷에 떠도는 불법 도용 및 과도한 포토샵 사진으로 고객님을 기만하지 않으며, 100% 실물 중심의 품격 있는 힐링을 약속드립니다. 선입금 0원의 현장 후불제 시스템으로 안전하게 이용하실 수 있습니다.'
    },
    {
      q: '예약 후 도착까지 얼마나 걸리나요?',
      a: '접수는 매일 저녁 18:00부터 시작되며, 매니저 출발은 19:00부터 익일 새벽 04:00 마감까지 운영됩니다. 서울 25개 구 및 경기 주요 거점 도시(분당, 판교, 수원, 일산, 부천, 안양, 평택, 동탄 등) 기준 1분 내 예약 접수 확인 후 평균 25분~35분 내에 신속하게 도착합니다.'
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
      a: '네, 서울 및 수도권 소재 5성급 호텔, 비즈니스 호텔, 모텔, 오피스텔, 일반 아파트 및 빌라 등 편안하게 쉴 수 있는 프라이빗한 실내 공간이라면 어디든 방문 가능합니다. 단, 호텔, 모텔 포함 모든 숙박업소는 1층에서 운전기사와 대면하여 관리사를 픽업해 주시기 바랍니다.'
    },
    {
      q: '비밀 보장 및 프라이버시가 철저한가요?',
      a: '고객님의 방문 주소 및 연락처는 배차 완료 후 안전하게 파기되며 어떠한 서버나 장부에도 기록되지 않습니다. 철저한 1:1 비밀 보장 원칙으로 안심하고 이용하실 수 있습니다.'
    },
    {
      q: 'A코스, B코스, C코스 중 어떤 코스를 추천하나요?',
      a: '오일 없는 시원한 깊은 지압과 뭉친 근육 스트레칭을 원하시면 "A코스(로얄 건식 지압 타이)", 최고급 식물성 오일과 부드러운 유러피언 림프 이완을 원하시면 "B코스(힐링아로마 스웨디시)", 두 가지 장점을 결합하여 최고의 만족도를 선사하는 복합 풀케어를 원하신다면 고객 선호도 1위인 "C코스(로얄 스페셜 더블케어 90분/120분)" 코스를 가장 추천해 드립니다.'
    },
    {
      q: '전화 통화 없이 문자로만 예약할 수 있나요?',
      a: '네, 가능합니다! 하단의 [문자 간편 예약]을 누르시거나 010-6607-2239 번호로 코스, 방문 주소(또는 호텔명·호수), 출입 방법을 남겨주시면 통화 없이 문자로 즉시 접수 및 도착 안내를 도와드립니다.'
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

          {/* 모바일 상단 중앙: "아름다운 밤" 브랜드 대표 슬로건 (궁서체 캘리그래피 스타일) */}
          <div className="flex md:hidden items-center justify-center flex-1 px-1 text-center select-none pointer-events-none">
            <span
              className="abam-header-slogan"
              style={{
                fontFamily: "'ChosunGs', 'Song Myung', 'Gungsuh', 'GungSeo', '궁서체', '궁서', 'Batang', serif",
                fontSize: '14.5px',
                fontWeight: 700,
                color: '#FDE68A',
                letterSpacing: '0.06em',
                whiteSpace: 'nowrap',
                textShadow: '0 0 12px rgba(238, 193, 75, 0.45), 0 1px 3px rgba(0, 0, 0, 0.9)',
                display: 'inline-block',
              }}
            >
              아름다운 밤
            </span>
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
              <span className={`w-2 h-2 rounded-full ${scheduleState.isGreen ? 'bg-[#10B981] animate-pulse' : 'bg-[#F59E0B]'} shrink-0`}></span>
              <span className="text-[12px] text-text-muted font-medium whitespace-nowrap">
                {scheduleState.isDispatchActive ? '🟢 실시간 순차출발중 (04시까지 예약 가능)' : scheduleState.isBookingOpen ? '🟢 18시 예약 오픈 (19시 순차출발)' : '🌙 오늘 밤 사전예약 (18시 오픈 / 19시 출발)'}
              </span>
            </div>

            {/* 2. 100% 현장후불제 안심 뱃지 (한국인 전용 안심 보증) */}
            <div className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#141C2E] border border-primary/30 text-[11.5px] font-bold text-primary shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span>선입금 0원 · 100% 현장후불제</span>
            </div>

            {/* 3. 예약 상담 버튼 (모바일 & 데스크톱 1줄 최적화) */}
            <a
              href={`tel:${cleanPhone}`}
              style={{ whiteSpace: 'nowrap', flexShrink: 0 }} className="abam-header-call inline-flex items-center justify-center gap-1.5 px-2.5 sm:px-4 bg-gradient-to-r from-primary via-primary to-accent-gold-light text-[#080C16] font-extrabold text-[12.5px] shadow-[0_2px_12px_rgba(238,193,75,0.3)] hover:brightness-105 active:scale-95 transition-all shrink-0 whitespace-nowrap"
            >
              <span className="material-symbols-outlined text-[16px]">call</span>
              <span>실시간 예약상담</span>
            </a>
          </div>
        </div>
      </header>

      {/* 0. SINGLE 1-LINE LIVE DISPATCH TOP BANNER (NO OVERLAP / ZERO CLUTTER) */}
      <aside
        style={{
          position: 'fixed',
          top: '56px',
          left: 0,
          right: 0,
          width: '100%',
          height: '34px',
          zIndex: 40,
          background: scheduleState.isGreen
            ? 'linear-gradient(90deg, #032014 0%, #083321 50%, #032014 100%)'
            : 'linear-gradient(90deg, #1c1503 0%, #2e2205 50%, #1c1503 100%)',
          borderBottom: scheduleState.isGreen ? '1px solid #34d399' : '1px solid #f59e0b',
          boxShadow: scheduleState.isGreen ? '0 2px 10px rgba(16,185,129,0.25)' : '0 2px 10px rgba(245,158,11,0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 12px',
          boxSizing: 'border-box',
          overflow: 'hidden',
          transition: 'all 0.3s ease',
        }}
      >
        <a
          href="#courses"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            textDecoration: 'none',
            color: '#ffffff',
            fontSize: '12px',
            fontWeight: 800,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            maxWidth: '100%',
            textAlign: 'center',
            lineHeight: 1,
            letterSpacing: '-0.2px',
          }}
        >
          {scheduleState.isDispatchActive ? (
            <>
              <span style={{ display: 'inline-block', width: '6px', height: '6px', borderRadius: '50%', background: '#34d399', boxShadow: '0 0 6px #34d399', flexShrink: 0 }}></span>
              <span><strong style={{ color: '#6ee7b7' }}>실시간 순차출발 가동중</strong> · 오늘 밤 04시까지 예약 가능</span>
            </>
          ) : scheduleState.isBookingOpen ? (
            <>
              <span style={{ display: 'inline-block', width: '6px', height: '6px', borderRadius: '50%', background: '#fde047', boxShadow: '0 0 6px #fde047', flexShrink: 0 }}></span>
              <span><strong style={{ color: '#fde047' }}>18시 예약 오픈!</strong> 19시 순차출발 (오늘 밤 04시까지 예약 가능)</span>
            </>
          ) : (
            <>
              <span style={{ flexShrink: 0 }}>🌙</span>
              <span><strong style={{ color: '#fde047' }}>오늘 밤 사전예약:</strong> 18시 예약 오픈 · 19시 순차출발 (04시까지 접수)</span>
            </>
          )}
        </a>
      </aside>

      <main className="w-full bg-surface-deep min-h-screen" style={{ paddingTop: '96px' }}>
        {/* HERO SECTION */}
        <section className="relative w-full overflow-hidden bg-gradient-to-b from-[#080C16] via-[#0F1626] to-[#080C16] px-4 md:px-6 lg:px-8 pt-6 md:pt-12 pb-16 md:pb-24">
          {/* Ambient Subtle Midnight Glow */}
          <div className="absolute -top-24 right-1/2 md:right-1/4 translate-x-1/2 w-96 h-96 rounded-full bg-primary/10 blur-[120px] pointer-events-none"></div>
          <div className="absolute top-1/3 left-10 w-72 h-72 rounded-full bg-lavender-deep/20 blur-[100px] pointer-events-none"></div>

          <div className="max-w-[1240px] mx-auto relative z-10">
            {/* HERO INNER CONTAINER: 2-COLUMN ON PC, CLEAN VERTICAL STACK ON MOBILE */}
            <div className="abam-hero-grid">
                
                {/* LEFT COLUMN: HEADLINE, BADGES, CTAS */}
                <div className="abam-hero-left">
                  
                  {/* Minimal Eyebrow Pill */}
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#121826] border border-[#223049] shadow-sm mb-4">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span className="text-[12px] sm:text-[13px] text-[#EEC14B] font-bold tracking-tight">
                      서울·경기·인천 100% 현장후불제 (매일 18:00~04:00)
                    </span>
                  </div>

                  {/* Main Clean Headline */}
                  <div className="w-full mb-3">
                    <h1 className="text-[26px] sm:text-[34px] lg:text-[44px] font-black text-white tracking-tight leading-tight">
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
                    <span className="block text-[15.5px] sm:text-[18px] text-amber-200/90 font-bold mt-1.5">
                      홈케어 &amp; 5성급 호텔 방문 프리미엄 힐링 수기 케어
                    </span>
                  </div>

                  {/* Spacious Subtitle */}
                  <p className="text-[14px] sm:text-[15.5px] text-[#94A3B8] max-w-2xl mb-5 leading-relaxed">
                    자택 및 호텔 어디서든 전화나 문자 한 통으로 <strong>30분 내 신속 도착</strong>합니다.<br className="hidden sm:inline" />
                    예약금 일절 없는 100% 안심 현장후불제로 가장 편안하게 맞이하세요.
                  </p>

                  {/* MOBILE-ONLY HERO VISUAL (< 1024px) */}
                  <div className="abam-hero-mobile-visual group">
                    <Image
                      src="/images/abam_hero_seductive.jpg"
                      alt="아밤 프리미엄 홈타이 & 호텔 출장마사지 1:1 프라이빗 케어"
                      fill
                      priority
                      sizes="(max-width: 768px) 100vw, 600px"
                      className="object-cover object-[center_20%] group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#080C16]/85 backdrop-blur-md border border-[#EEC14B]/40 text-[#EEC14B] text-[11px] font-extrabold flex items-center gap-1.5">
                      <span>👑</span>
                      <span>프리미엄 1:1 전담 케어 #1</span>
                    </div>
                  </div>

                  {/* 실시간 배차 & 안심 이용 보증 바 */}
                  <div className="hidden md:flex w-full max-w-xl lg:max-w-none mb-5 p-4 rounded-xl bg-[#0f172a] border border-[#334155] text-left flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#1e293b] border border-[#475569] flex items-center justify-center text-xl shrink-0 text-[#EEC14B]">
                        🛡️
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[14px] sm:text-[15px] font-bold text-white">실시간 배차 현황</span>
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[11px] font-bold">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                            {scheduleState.isDispatchActive ? '실시간 순차출발중 (04시까지 예약 가능)' : scheduleState.isBookingOpen ? '18시 예약 오픈 (19시 순차출발)' : '사전예약 접수중 (18시 오픈 / 19시 순차출발)'}
                          </span>
                        </div>
                        <p className="text-[12px] text-slate-300 leading-snug mt-1">
                          선입금·예약금 0원, 관리사 대면 후 결제하는 <strong>100% 현장후불제 정찰 시스템</strong>입니다.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
                      <button
                        onClick={() => openDirectAbamSms()}
                        className="w-full sm:w-auto px-4 py-2.5 rounded-lg bg-[#EEC14B] text-[#080C16] text-[12.5px] font-extrabold hover:bg-[#F2CA50] active:scale-95 transition-all cursor-pointer text-center"
                      >
                        간편 문자 예약
                      </button>
                    </div>
                  </div>

                  {/* 3 Key Trust Chips */}
                  <div className="w-full flex flex-wrap items-center justify-center lg:justify-start gap-2.5 sm:gap-3.5 mb-6">
                    <div className="flex items-center gap-1.5 text-[12.5px] text-[#E2E8F0] font-semibold bg-[#121826] px-4 py-2 rounded-full border border-[#202C42] shadow-sm">
                      <span className="text-[#EEC14B]">⚡</span>
                      <span>평균 30분 도착 보장</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[12.5px] text-[#E2E8F0] font-semibold bg-[#121826] px-4 py-2 rounded-full border border-[#202C42] shadow-sm">
                      <span className="text-emerald-400">🛡️</span>
                      <span>선입금 0원 안심 후불제</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[12.5px] text-[#E2E8F0] font-semibold bg-[#121826] px-4 py-2 rounded-full border border-[#202C42] shadow-sm">
                      <span className="text-sky-400">📍</span>
                      <span>서울·경기·인천 전지역</span>
                    </div>
                  </div>

                  {/* High-Conversion Action CTAs (54px height) */}
                  <div className="w-full max-w-md lg:max-w-lg grid grid-cols-2 gap-3.5 mb-4">
                    {/* SMS Button (Primary Gold) */}
                    <button
                      type="button"
                      onClick={() => openDirectAbamSms()}
                      className="abam-hero-btn-sms"
                    >
                      <span className="material-symbols-outlined text-[22px]">chat</span>
                      <span>문자 간편예약</span>
                    </button>

                    {/* Call Button (Emerald Green) */}
                    <a
                      href={`tel:${cleanPhone}`}
                      className="abam-hero-btn-call"
                    >
                      <span className="material-symbols-outlined text-[22px]">call</span>
                      <span>전화 즉시예약</span>
                    </a>
                  </div>

                  {/* Under CTA Anti-Scam Notice */}
                  <div className="text-[12px] text-[#94A3B8] flex items-center gap-1.5 justify-center lg:justify-start">
                    <span className="text-emerald-400 font-bold">🛡️ 안심 보증:</span>
                    <span>100% 현장 대면 후불제로 어떠한 선입금이나 예약금도 요구하지 않습니다.</span>
                  </div>

                </div>

                {/* RIGHT COLUMN: LUXURY MODEL CARD (DESKTOP ONLY >= 1024px) */}
                <div className="abam-hero-desktop-visual group">
                    <Image
                      src="/images/abam_hero_seductive.jpg"
                      alt="아밤 프리미엄 홈타이 & 호텔 출장마사지 1:1 프라이빗 케어"
                      fill
                      priority
                      sizes="480px"
                      className="object-cover object-[center_20%] group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#080C16]/95 via-transparent to-[#080C16]/30 pointer-events-none" />

                    {/* Top Badge */}
                    <div className="abam-hero-top-badge">
                      <span className="text-[#EEC14B]">👑</span>
                      <span>프리미엄 1:1 전담 케어 #1</span>
                    </div>

                    {/* Bottom Bar */}
                    <div className="abam-hero-bottom-bar">
                      <div>
                        <span className="block text-[11.5px] text-[#EEC14B] font-extrabold uppercase tracking-wider">
                          ⚡ 30분 내 신속 방문 배차
                        </span>
                        <span className="block text-[13.5px] text-white font-bold mt-0.5">
                          서울 전역 · 경기 수도권 · 인천 전지역
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => openDirectAbamSms()}
                        className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#EEC14B] to-[#D4A528] text-slate-950 font-black text-[12px] uppercase tracking-wider shadow-md hover:brightness-110 cursor-pointer"
                      >
                        간편 예약
                      </button>
                    </div>
                  </div>

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

        {/* 2. SERVICE COURSES & TRANSPARENT PRICING */}
        <section id="courses" className="w-full bg-[#0a0e18] px-4 md:px-6 lg:px-8 py-16 md:py-28 border-t border-[#1E293B]">
          <div className="max-w-[1240px] mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
              <span className="inline-block px-3 py-1 rounded-full bg-[#171b26] border border-[#262a35] text-primary text-[11px] md:text-[12px] font-bold tracking-widest uppercase mb-2.5 shadow-sm">
                아밤 시그니처 코스
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
                    <span className="px-3 py-1 rounded-full bg-[#1b1f2a] text-text-secondary text-[11px] font-semibold">오일 없는 건식 깊은 압</span>
                    <span className="text-[11px] text-[#EEC14B] font-bold">집중 피로회복 · 강한 압</span>
                  </div>
                  <h3 className="text-[22px] font-bold text-text-primary mb-1">A코스 · 로얄 건식 지압 타이</h3>
                  <p className="text-[13px] text-text-muted mb-6 leading-relaxed">
                    오일 없는 건식 깊은 압의 전신 지압 &amp; 파워 스트레칭으로 뭉친 속근육과 피로를 집중 해소하고 전신 밸런스를 바로잡아 드립니다.
                  </p>

                  {/* Price Tiers */}
                  <div className="space-y-3 mb-8">
                    <button
                      type="button"
                      onClick={() => openDirectAbamSms('A코스 60분 (8만)')}
                      className="abam-price-row"
                    >
                      <span className="text-[13px] font-semibold text-text-secondary">60분 코스</span>
                      <span className="text-[17px] font-bold text-text-primary">₩80,000<span className="text-[12px] font-normal text-text-muted ml-0.5">원</span></span>
                    </button>
                    <button
                      type="button"
                      onClick={() => openDirectAbamSms('A코스 90분 (10만)')}
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
                      onClick={() => openDirectAbamSms('A코스 120분 (12만)')}
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
                  onClick={() => openDirectAbamSms('A코스 90분 (10만)')}
                  className="abam-course-btn-gold"
                >
                  <span className="material-symbols-outlined text-[18px]">chat</span>
                  <span>A코스 로얄 타이 간편예약</span>
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
                    <span className="px-3 py-1 rounded-full bg-primary/15 text-primary text-[11px] font-bold">최고급 식물성 에센셜 오일</span>
                    <span className="text-[11px] text-primary font-semibold">부드러운 이완 &amp; 숙면</span>
                  </div>
                  <h3 className="text-[22px] font-bold text-text-primary mb-1">B코스 · 힐링아로마 스웨디시</h3>
                  <p className="text-[13px] text-text-muted mb-6 leading-relaxed">
                    최고급 100% 천연 식물성 에센셜 오일과 부드러운 유러피언 림프 스웨디시 테크닉으로 림프 순환을 돕고 깊은 릴랙세이션과 숙면을 유도합니다.
                  </p>

                  {/* Price Tiers */}
                  <div className="space-y-3 mb-8">
                    <button
                      type="button"
                      onClick={() => openDirectAbamSms('B코스 60분 (9만)')}
                      className="abam-price-row"
                    >
                      <span className="text-[13px] font-semibold text-text-secondary">60분 코스</span>
                      <span className="text-[17px] font-bold text-text-primary">₩90,000<span className="text-[12px] font-normal text-text-muted ml-0.5">원</span></span>
                    </button>
                    <button
                      type="button"
                      onClick={() => openDirectAbamSms('B코스 90분 (11만)')}
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
                      onClick={() => openDirectAbamSms('B코스 120분 (14만)')}
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
                  onClick={() => openDirectAbamSms('B코스 90분 (11만)')}
                  className="abam-course-btn-featured"
                >
                  <span className="material-symbols-outlined text-[18px]">chat</span>
                  <span>B코스 힐링아로마 간편예약</span>
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
                    <span className="px-3 py-1 rounded-full bg-[#312E81]/40 text-[#818CF8] text-[11px] font-bold">건식 지압 + 아로마 스웨디시</span>
                    <span className="text-[11px] text-[#818CF8] font-semibold">👑 VIP 올인원 (90분/120분)</span>
                  </div>
                  <h3 className="text-[22px] font-bold text-text-primary mb-1">C코스 · 로얄 스페셜 더블케어</h3>
                  <p className="text-[13px] text-text-muted mb-6 leading-relaxed">
                    전반부 건식 딥티슈 지압으로 뭉친 근육을 깊이 있게 분해하고, 후반부 따뜻한 힐링 아로마 스웨디시로 림프를 순환시켜 주는 VIP 고객 만족도 1위 올인원 프로그램입니다.
                  </p>

                  {/* Price Tiers */}
                  <div className="space-y-3 mb-8">
                    <button
                      type="button"
                      onClick={() => openDirectAbamSms('C코스 90분 (12만)')}
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
                      onClick={() => openDirectAbamSms('C코스 120분 (16만)')}
                      className="abam-price-row"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-[13px] font-semibold text-text-secondary">120분 코스</span>
                        <span className="px-1.5 py-0.5 rounded bg-[#818CF8]/20 text-[#818CF8] text-[10px] font-bold">VIP 풀코스</span>
                      </div>
                      <span className="text-[17px] font-bold text-text-primary">₩160,000<span className="text-[12px] font-normal text-text-muted ml-0.5">원</span></span>
                    </button>
                    <div className="text-[11.5px] text-[#A5B4FC] font-medium text-center py-1.5 px-2 bg-[#1e293b]/60 rounded-lg border border-[#818CF8]/30">
                      ※ 건식 지압과 아로마의 최상의 밸런스 풀케어를 위해 90분·120분으로만 정성껏 모십니다. (1시간 코스 제외)
                    </div>
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
                  onClick={() => openDirectAbamSms('C코스 90분 (12만)')}
                  className="abam-course-btn-gold"
                >
                  <span className="material-symbols-outlined text-[18px]">chat</span>
                  <span>C코스 로얄 스페셜 더블케어 간편예약</span>
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

        {/* 3. SIMPLE 3-STEP PROCESS */}
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
                    고객님과 가장 가까운 거점에 상주 중인 전문 테라피스트가 배정되어 즉시 출발하며, 25~35분 내 신속하게 도착합니다.
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
                    테라피스트 도착 후 현장에서 직접 대면하여 결제하신 후, 프라이빗하고 안락한 공간에서 최고급 힐링을 누리세요. (호텔, 모텔 포함 모든 숙박업소는 1층에서 운전기사와 대면하여 관리사를 픽업해 주세요.)
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

        {/* 4. ULTRA-INTUITIVE 10-SECOND RESERVATION BUILDER & CHAT MOCKUP */}
        <section id="fast-booking-builder" className="w-full bg-gradient-to-b from-[#0c1424] via-[#09101d] to-[#070b14] px-4 md:px-6 lg:px-8 py-12 md:py-18 border-y-2 border-[#EEC14B]/35 shadow-[0_10px_40px_rgba(0,0,0,0.8)]">
          <div className="max-w-[1240px] mx-auto">
            {/* Header: 직관적인 '예약하기' 대주제 명시 */}
            <div className="text-center max-w-3xl mx-auto mb-8 md:mb-10">
              <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EEC14B]/15 border border-[#EEC14B]/40 text-[#EEC14B] text-[12px] font-black tracking-wider uppercase mb-3 shadow-sm">
                ONLINE RESERVATION · 실시간 예약 접수처
              </span>
              <h2 className="text-[26px] sm:text-[32px] md:text-[36px] font-black text-white mb-3 tracking-tight">
                예약하기 <span className="text-[#EEC14B]">· 30초 간편 신청</span>
              </h2>
              <p className="text-[14px] sm:text-[15.5px] text-[#cbd5e1] leading-relaxed">
                여기부터는 실시간 방문 예약 구간입니다. 원하시는 코스와 주소를 선택하시면 통화 없이 문자로 즉각 접수 및 배차됩니다.
              </p>
            </div>

            {/* 2-Column Responsive Layout: Left = Visual Chat Mockup, Right = Interactive Builder */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              
              {/* LEFT: AUTHENTIC ASSURANCE & DISPATCH PROTOCOL (5 Cols) */}
              <div className="lg:col-span-5 rounded-xl bg-[#0f172a] border border-[#1e293b] p-5 sm:p-6 flex flex-col justify-between shadow-lg">
                <div>
                  <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-[#1e293b]">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                      <span className="text-[14px] font-bold text-white">아밤 안심 예약 3원칙</span>
                    </div>
                    <span className="text-[11px] text-[#94a3b8]">안심 후불제 운영</span>
                  </div>

                  {/* 3 Principles Checklist */}
                  <div className="space-y-3.5 my-2">
                    <div className="p-3.5 rounded-lg bg-[#162032] border border-[#25334d]">
                      <div className="flex items-center gap-2 text-[13px] font-bold text-white mb-1">
                        <span className="text-emerald-400">01</span>
                        <span>선입금·예약금 0원 (대면 결제)</span>
                      </div>
                      <p className="text-[12px] text-[#94a3b8] leading-relaxed">
                        관리사가 도착하기 전까지 일절 비용을 요구하지 않습니다. 현장 대면 후 직접 결제하세요.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-lg bg-[#162032] border border-[#25334d]">
                      <div className="flex items-center gap-2 text-[13px] font-bold text-white mb-1">
                        <span className="text-[#EEC14B]">02</span>
                        <span>실시간 교통 반영 신속 출발</span>
                      </div>
                      <p className="text-[12px] text-[#94a3b8] leading-relaxed">
                        서울 25개 구 및 수도권 주요 거점에서 대기 중인 전담 매니저가 평균 25~35분 내 방문합니다.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-lg bg-[#162032] border border-[#25334d]">
                      <div className="flex items-center gap-2 text-[13px] font-bold text-white mb-1">
                        <span className="text-sky-400">03</span>
                        <span>철저한 개인정보 즉시 파기</span>
                      </div>
                      <p className="text-[12px] text-[#94a3b8] leading-relaxed">
                        서비스 종료 즉시 방문 주소 및 접수 기록은 복구 불가능하게 영구 파기됩니다.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Accommodation Pickup Callout */}
                <div className="mt-4 p-3 rounded-lg bg-amber-500/10 border border-amber-500/25 flex items-start gap-2 text-[12px] text-amber-200/90 leading-snug">
                  <span className="text-amber-400 text-[14px] shrink-0">※</span>
                  <span><strong>호텔·모텔 이용 안내:</strong> 숙박업소의 경우 관리사 보호 및 보안 규정상 1층 로비에서 기사와 대면하여 동행해 주셔야 합니다.</span>
                </div>
              </div>

              {/* RIGHT: INTERACTIVE 10-SECOND RESERVATION BUILDER (7 Cols) */}
              <div className="lg:col-span-7 rounded-2xl bg-gradient-to-b from-[#10192e] to-[#0c1424] border-2 border-[#f2ca50]/40 p-5 sm:p-7 flex flex-col justify-between shadow-2xl relative">
                
                <div className="pb-4 mb-5 border-b border-[#334155]">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-md bg-[#EEC14B] text-[#080C16] font-black text-[12px] tracking-wide shadow-sm">
                        예약하기
                      </span>
                      <span className="text-[12px] text-emerald-400 font-bold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                        선입금 0원 · 100% 안심 현장후불
                      </span>
                    </div>
                    <span className="text-[11.5px] text-[#94a3b8] font-semibold hidden sm:inline">
                      ⚡ 접수 확인 즉시 30분 내 방문
                    </span>
                  </div>
                  <h3 className="text-[18px] sm:text-[20px] font-black text-white leading-tight">
                    방문 코스 및 장소 선택 (30초 간편 예약)
                  </h3>
                  <p className="text-[12.5px] text-[#94a3b8] mt-1 leading-snug">
                    아래 1~4 항목을 순서대로 선택하시면 문자로 자동 완성되어 신속하게 배차 접수됩니다.
                  </p>
                </div>

                <form onSubmit={handleQuickSmsSubmit} className="space-y-4">
                  {/* Step 1: Course Selection Dropdown (서울로얄 스타일 프리미엄 드롭다운) */}
                  <div>
                    <label className="block text-[12.5px] font-bold text-white mb-2 flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="w-5 h-5 rounded-full bg-[#f2ca50] text-slate-950 flex items-center justify-center text-[11px] font-black">1</span>
                        <span>희망 코스 선택</span>
                      </div>
                      <span className="text-[11px] text-[#f2ca50] font-semibold">드롭다운 간편 선택</span>
                    </label>

                    {/* 서울로얄 스타일의 프리미엄 깔끔 드롭다운 */}
                    <div style={{ position: 'relative', width: '100%' }}>
                      <select
                        id="abamQuickCourseSelect"
                        value={quickCourse}
                        onChange={(e) => setQuickCourse(e.target.value)}
                        style={{
                          width: '100%',
                          boxSizing: 'border-box',
                          padding: '12px 40px 12px 14px',
                          backgroundColor: '#0c1424',
                          border: '1.5px solid #2d3e5d',
                          borderRadius: '12px',
                          color: '#ffffff',
                          WebkitTextFillColor: '#ffffff',
                          fontSize: '14px',
                          fontWeight: 700,
                          outline: 'none',
                          cursor: 'pointer',
                          appearance: 'none',
                          WebkitAppearance: 'none',
                          MozAppearance: 'none',
                          boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.4)',
                          transition: 'border-color 0.2s, box-shadow 0.2s',
                        }}
                        onFocus={(e) => {
                          e.currentTarget.style.borderColor = '#EEC14B';
                          e.currentTarget.style.boxShadow = '0 0 12px rgba(238, 193, 75, 0.35)';
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.borderColor = '#2d3e5d';
                          e.currentTarget.style.boxShadow = 'inset 0 2px 4px rgba(0, 0, 0, 0.4)';
                        }}
                      >
                        <optgroup label="── A코스 · 로얄 건식 지압 타이 ──" style={{ backgroundColor: '#0c1424', color: '#94a3b8' }}>
                          <option value="A코스 60분 (8만)" style={{ backgroundColor: '#0c1424', color: '#ffffff' }}>A코스 60분 (8만) — 80,000원 [기본 힐링]</option>
                          <option value="A코스 90분 (10만)" style={{ backgroundColor: '#0c1424', color: '#ffffff' }}>A코스 90분 (10만) — 100,000원 ⭐ [인기 추천]</option>
                          <option value="A코스 120분 (12만)" style={{ backgroundColor: '#0c1424', color: '#ffffff' }}>A코스 120분 (12만) — 120,000원 [전신 집중 케어]</option>
                        </optgroup>
                        <optgroup label="── B코스 · 힐링아로마 스웨디시 ⭐ [BEST 대표 추천] ──" style={{ backgroundColor: '#0c1424', color: '#94a3b8' }}>
                          <option value="B코스 60분 (9만)" style={{ backgroundColor: '#0c1424', color: '#ffffff' }}>B코스 60분 (9만) — 90,000원 [아로마 이완]</option>
                          <option value="B코스 90분 (11만)" style={{ backgroundColor: '#0c1424', color: '#ffffff' }}>B코스 90분 (11만) — 110,000원 ⭐ [BEST 대표 추천]</option>
                          <option value="B코스 120분 (14만)" style={{ backgroundColor: '#0c1424', color: '#ffffff' }}>B코스 120분 (14만) — 140,000원 [프리미엄 림프 케어]</option>
                        </optgroup>
                        <optgroup label="── C코스 · 로얄 스페셜 더블케어 [VIP 90분/120분] ──" style={{ backgroundColor: '#0c1424', color: '#94a3b8' }}>
                          <option value="C코스 90분 (12만)" style={{ backgroundColor: '#0c1424', color: '#ffffff' }}>C코스 90분 (12만) — 120,000원 👑 [VIP 최고 인기]</option>
                          <option value="C코스 120분 (16만)" style={{ backgroundColor: '#0c1424', color: '#ffffff' }}>C코스 120분 (16만) — 160,000원 👑 [VIP 스페셜 풀코스]</option>
                        </optgroup>
                      </select>

                      {/* 드롭다운 골드 화살표 아이콘 */}
                      <div style={{
                        position: 'absolute',
                        right: '14px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        pointerEvents: 'none',
                        color: '#EEC14B',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                      </div>
                    </div>


                  </div>

                  {/* Step 2: Address Input */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-[12.5px] font-bold text-white flex items-center gap-1.5">
                        <span className="w-5 h-5 rounded-full bg-[#f2ca50] text-slate-950 flex items-center justify-center text-[11px] font-black">2</span>
                        <span>방문 상세 주소 (동/호수/호텔명)</span>
                      </label>
                      <span className="text-[11px] text-[#94a3b8]">문자 자동완성</span>
                    </div>

                    {/* Quick Place Type Switcher with Bulletproof Inline Styles */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '8px' }}>
                      <button
                        type="button"
                        onClick={() => {
                          setQuickPlaceType('home');
                          if (quickDoor === '호텔 1층 로비 픽업') setQuickDoor('');
                        }}
                        style={{
                          backgroundColor: quickPlaceType === 'home' ? 'rgba(238, 193, 75, 0.2)' : '#121c30',
                          border: '2px solid ' + (quickPlaceType === 'home' ? '#EEC14B' : '#2d3e5d'),
                          color: quickPlaceType === 'home' ? '#FDE047' : '#94a3b8',
                          padding: '9px 12px',
                          borderRadius: '10px',
                          fontWeight: 800,
                          fontSize: '12.5px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '6px',
                          boxShadow: quickPlaceType === 'home' ? '0 0 12px rgba(238, 193, 75, 0.35)' : 'none',
                          transition: 'all 0.2s',
                        }}
                      >
                        <span>🏡 자택 / 일반 주거</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setQuickPlaceType('hotel');
                          if (!quickDoor) setQuickDoor('호텔 1층 로비 픽업');
                        }}
                        style={{
                          backgroundColor: quickPlaceType === 'hotel' ? '#f59e0b' : '#121c30',
                          border: '2px solid ' + (quickPlaceType === 'hotel' ? '#fbbf24' : '#2d3e5d'),
                          color: quickPlaceType === 'hotel' ? '#080C16' : '#cbd5e1',
                          padding: '9px 12px',
                          borderRadius: '10px',
                          fontWeight: 900,
                          fontSize: '12.5px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '6px',
                          boxShadow: quickPlaceType === 'hotel' ? '0 0 16px rgba(245, 158, 11, 0.5)' : 'none',
                          transition: 'all 0.2s',
                        }}
                      >
                        <span>🏨 호텔 / 모텔 (숙박업소)</span>
                      </button>
                    </div>

                    <input
                      type="text"
                      value={quickAddr}
                      onChange={(e) => setQuickAddr(e.target.value)}
                      placeholder={quickPlaceType === 'hotel' ? "예: 신라스테이 역삼 804호 / OO모텔 00호" : "예: 강남구 역삼동 OO오피스텔 1204호"}
                      className="abam-booking-input w-full"
                      style={{
                        width: '100%',
                        boxSizing: 'border-box',
                        padding: '13px 14px',
                        backgroundColor: '#0c1424',
                        background: '#0c1424',
                        border: '2px solid #334155',
                        borderRadius: '12px',
                        color: '#ffffff',
                        WebkitTextFillColor: '#ffffff',
                        colorScheme: 'dark',
                        WebkitAppearance: 'none',
                        fontSize: '16px',
                        fontWeight: 700,
                        outline: 'none',
                        boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.4)',
                        caretColor: '#EEC14B',
                      }}
                    />

                    {/* Intuitive Accommodation Pickup Guidance with User Exact Specification */}
                    {isHotelBooking ? (
                      <div style={{
                        marginTop: '10px',
                        padding: '12px 14px',
                        backgroundColor: 'rgba(245, 158, 11, 0.18)',
                        border: '2px solid #f59e0b',
                        borderRadius: '12px',
                        color: '#fef3c7',
                        fontSize: '12.5px',
                        lineHeight: 1.5,
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '10px',
                        boxShadow: '0 4px 16px rgba(245, 158, 11, 0.25)',
                      }}>
                        <span style={{ fontSize: '22px', flexShrink: 0, lineHeight: 1 }}>🏨</span>
                        <div>
                          <div style={{ fontWeight: 900, color: '#fbbf24', fontSize: '13px', marginBottom: '3px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span>[숙박업소 필수 픽업 수칙]</span>
                            <span style={{ backgroundColor: '#f59e0b', color: '#080c16', fontSize: '10px', fontWeight: 900, padding: '1px 5px', borderRadius: '4px' }}>필독</span>
                          </div>
                          <p style={{ color: '#ffffff', fontWeight: 600, margin: 0 }}>
                            호텔, 모텔 포함 모든 숙박업소는 <strong style={{ color: '#fef08a' }}>1층에서 운전기사와 대면하여 관리사를 픽업</strong>해 주세요.
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div style={{
                        marginTop: '8px',
                        padding: '10px 12px',
                        backgroundColor: 'rgba(30, 41, 59, 0.65)',
                        border: '1.5px solid rgba(148, 163, 184, 0.25)',
                        borderRadius: '10px',
                        fontSize: '12px',
                        color: '#cbd5e1',
                        lineHeight: 1.5,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                      }}>
                        <span style={{ fontSize: '16px', flexShrink: 0 }}>🏡</span>
                        <span><strong style={{ color: '#fde047' }}>자택 안내:</strong> 자택을 제외한 호텔, 모텔 포함 모든 숙박업소는 <strong>1층에서 운전기사와 대면하여 관리사를 픽업</strong>해 주세요.</span>
                      </div>
                    )}
                  </div>

                  {/* Step 3: Door Access Code (Clean, No Duplicate Note) */}
                  <div>
                    <label className="block text-[12.5px] font-bold text-white mb-1.5 flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-full bg-[#f2ca50] text-slate-950 flex items-center justify-center text-[11px] font-black">3</span>
                      <span>공동현관 출입 방법 / 로비 안내</span>
                    </label>
                    <input
                      type="text"
                      value={quickDoor}
                      onChange={(e) => setQuickDoor(e.target.value)}
                      placeholder={isHotelBooking ? "예: 호텔 1층 로비 픽업 (또는 객실 번호)" : "예: 공동현관 비번 #1234 (또는 1층 도착 시 호출)"}
                      className="abam-booking-input w-full"
                      style={{
                        width: '100%',
                        boxSizing: 'border-box',
                        padding: '13px 14px',
                        backgroundColor: '#0c1424',
                        background: '#0c1424',
                        border: '2px solid #334155',
                        borderRadius: '12px',
                        color: '#ffffff',
                        WebkitTextFillColor: '#ffffff',
                        colorScheme: 'dark',
                        WebkitAppearance: 'none',
                        fontSize: '16px',
                        fontWeight: 700,
                        outline: 'none',
                        boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.4)',
                        caretColor: '#EEC14B',
                      }}
                    />
                  </div>

                  {/* Step 4: Ultra-Visible Tactile Payment Buttons with Bulletproof Inline Styles */}
                  <div style={{ marginTop: '14px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <label style={{ fontSize: '13px', fontWeight: 900, color: '#ffffff', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#EEC14B', color: '#080C16', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 900 }}>4</span>
                        <span>결제 방식 선택 (터치하여 선택)</span>
                      </label>
                      <span style={{ fontSize: '11px', fontWeight: 800, color: '#4ade80', backgroundColor: 'rgba(34, 197, 94, 0.15)', border: '1px solid rgba(34, 197, 94, 0.35)', padding: '2px 8px', borderRadius: '9999px' }}>
                        100% 현장 후불제 (선입금 0원)
                      </span>
                    </div>

                    {/* 3 High-Contrast Tactile Cards with Direct Inline Styles */}
                    <div className="abam-payment-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', width: '100%' }}>
                      {[
                        {
                          id: '계좌이체',
                          icon: '📱',
                          title: '계좌이체',
                          sub: '도착 후 실시간 송금',
                          badge: '추천 1위',
                          badgeBg: '#38bdf8',
                          badgeColor: '#080c16',
                        },
                        {
                          id: '현금 (후불)',
                          icon: '💵',
                          title: '현금 (후불)',
                          sub: '대면 직접 결제',
                          badge: '선입금 0원',
                          badgeBg: '#22c55e',
                          badgeColor: '#080c16',
                        },
                        {
                          id: '카드 결제',
                          icon: '💳',
                          title: '카드 결제',
                          sub: '무선단말기 지참',
                          badge: '현장 단말기',
                          badgeBg: '#c084fc',
                          badgeColor: '#080c16',
                        },
                      ].map((item) => {
                        const isSelected = quickPay === item.id;
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => {
                              setQuickPay(item.id);
                              if (typeof window !== 'undefined') {
                                window.dispatchEvent(
                                  new CustomEvent('abam-sms-toast', {
                                    detail: `✓ [${item.id}] 결제 방식이 선택되었습니다.`,
                                  }),
                                );
                              }
                            }}
                            className={`abam-payment-card ${isSelected ? 'active' : ''}`}
                            style={{
                              position: 'relative',
                              display: 'flex',
                              flexDirection: 'column',
                              justifyContent: 'space-between',
                              alignItems: 'flex-start',
                              minHeight: '84px',
                              padding: '10px 9px',
                              borderRadius: '12px',
                              backgroundColor: isSelected ? 'rgba(238, 193, 75, 0.22)' : '#131e33',
                              border: isSelected ? '2px solid #EEC14B' : '2px solid #334769',
                              boxShadow: isSelected ? '0 0 16px rgba(238, 193, 75, 0.45)' : '0 2px 8px rgba(0, 0, 0, 0.3)',
                              cursor: 'pointer',
                              textAlign: 'left',
                              transition: 'all 0.2s',
                              width: '100%',
                              boxSizing: 'border-box',
                            }}
                          >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginBottom: '6px' }}>
                              <span style={{ fontSize: '22px', lineHeight: 1 }}>{item.icon}</span>
                              {isSelected ? (
                                <span style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#EEC14B', color: '#080C16', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 900, boxShadow: '0 0 8px rgba(238, 193, 75, 0.7)' }}>
                                  ✓
                                </span>
                              ) : (
                                <span style={{ fontSize: '9.5px', fontWeight: 900, padding: '2px 5px', borderRadius: '4px', backgroundColor: item.badgeBg, color: item.badgeColor }}>
                                  {item.badge}
                                </span>
                              )}
                            </div>
                            <div style={{ width: '100%' }}>
                              <div style={{ fontSize: '13.5px', fontWeight: 900, color: isSelected ? '#FDE047' : '#ffffff', lineHeight: 1.2, marginBottom: '2px' }}>
                                {item.title}
                              </div>
                              <div style={{ fontSize: '10.5px', color: isSelected ? '#cbd5e1' : '#94a3b8', fontWeight: 600, lineHeight: 1.2 }}>
                                {item.sub}
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    {/* Instant Dynamic Interactive Feedback Box with Explicit Inline Styles */}
                    {quickPay === '계좌이체' && (
                      <div style={{
                        marginTop: '10px',
                        padding: '12px 14px',
                        backgroundColor: 'rgba(56, 189, 248, 0.15)',
                        border: '2px solid #38bdf8',
                        borderRadius: '12px',
                        color: '#e0f2fe',
                        fontSize: '12.5px',
                        lineHeight: 1.5,
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '10px',
                        boxShadow: '0 4px 14px rgba(56, 189, 248, 0.25)',
                      }}>
                        <span style={{ fontSize: '22px', flexShrink: 0, lineHeight: 1 }}>📱</span>
                        <div>
                          <div style={{ fontWeight: 900, color: '#38bdf8', fontSize: '13px', marginBottom: '2px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span>계좌이체 결제 선택됨 (선입금 0원 보장)</span>
                            <span style={{ fontSize: '10px', backgroundColor: '#38bdf8', color: '#080c16', padding: '1px 5px', borderRadius: '4px', fontWeight: 900 }}>선택완료</span>
                          </div>
                          <p style={{ color: '#f1f5f9', fontWeight: 500, margin: 0 }}>
                            관리사가 고객님 계신 곳에 <strong>도착하여 대면한 후</strong> 계좌번호를 안내받고 실시간 이체해 주시면 됩니다. (출발 전 선입금은 절대 없습니다.)
                          </p>
                        </div>
                      </div>
                    )}

                    {quickPay === '현금 (후불)' && (
                      <div style={{
                        marginTop: '10px',
                        padding: '12px 14px',
                        backgroundColor: 'rgba(34, 197, 94, 0.15)',
                        border: '2px solid #22c55e',
                        borderRadius: '12px',
                        color: '#dcfce7',
                        fontSize: '12.5px',
                        lineHeight: 1.5,
                        boxShadow: '0 4px 14px rgba(34, 197, 94, 0.25)',
                      }}>
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '10px' }}>
                          <span style={{ fontSize: '22px', flexShrink: 0, lineHeight: 1 }}>💵</span>
                          <div>
                            <div style={{ fontWeight: 900, color: '#4ade80', fontSize: '13px', marginBottom: '2px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <span>현금 결제 선택됨 (100% 현장 후불)</span>
                              <span style={{ fontSize: '10px', backgroundColor: '#22c55e', color: '#080c16', padding: '1px 5px', borderRadius: '4px', fontWeight: 900 }}>선택완료</span>
                            </div>
                            <p style={{ color: '#f1f5f9', fontWeight: 500, margin: 0 }}>
                              관리사 대면 후 현금을 직접 전달해 주시면 됩니다. <strong>거스름돈이 필요하신가요?</strong>
                            </p>
                          </div>
                        </div>

                        {/* Interactive Cash Change Pills */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingLeft: '32px' }}>
                          <button
                            type="button"
                            onClick={() => setCashChange('exact')}
                            style={{
                              backgroundColor: cashChange === 'exact' ? '#22c55e' : '#172338',
                              color: cashChange === 'exact' ? '#080c16' : '#cbd5e1',
                              border: '2px solid ' + (cashChange === 'exact' ? '#4ade80' : '#3d5275'),
                              fontWeight: 900,
                              fontSize: '12px',
                              padding: '7px 12px',
                              borderRadius: '8px',
                              cursor: 'pointer',
                              boxShadow: cashChange === 'exact' ? '0 0 12px rgba(34, 197, 94, 0.5)' : 'none',
                              transition: 'all 0.2s',
                            }}
                          >
                            <span>✓ 정액 지참 (잔돈 불필요)</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setCashChange('needChange')}
                            style={{
                              backgroundColor: cashChange === 'needChange' ? '#f59e0b' : '#172338',
                              color: cashChange === 'needChange' ? '#080c16' : '#cbd5e1',
                              border: '2px solid ' + (cashChange === 'needChange' ? '#fbbf24' : '#3d5275'),
                              fontWeight: 900,
                              fontSize: '12px',
                              padding: '7px 12px',
                              borderRadius: '8px',
                              cursor: 'pointer',
                              boxShadow: cashChange === 'needChange' ? '0 0 12px rgba(245, 158, 11, 0.5)' : 'none',
                              transition: 'all 0.2s',
                            }}
                          >
                            <span>🪙 거스름돈 준비 요청</span>
                          </button>
                        </div>
                      </div>
                    )}

                    {quickPay === '카드 결제' && (
                      <div style={{
                        marginTop: '10px',
                        padding: '12px 14px',
                        backgroundColor: 'rgba(192, 132, 252, 0.15)',
                        border: '2px solid #c084fc',
                        borderRadius: '12px',
                        color: '#f3e8ff',
                        fontSize: '12.5px',
                        lineHeight: 1.5,
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '10px',
                        boxShadow: '0 4px 14px rgba(192, 132, 252, 0.25)',
                      }}>
                        <span style={{ fontSize: '22px', flexShrink: 0, lineHeight: 1 }}>💳</span>
                        <div>
                          <div style={{ fontWeight: 900, color: '#c084fc', fontSize: '13px', marginBottom: '2px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span>현장 카드 결제 선택됨 (단말기 지참)</span>
                            <span style={{ fontSize: '10px', backgroundColor: '#c084fc', color: '#080c16', padding: '1px 5px', borderRadius: '4px', fontWeight: 900 }}>선택완료</span>
                          </div>
                          <p style={{ color: '#f1f5f9', fontWeight: 500, margin: 0 }}>
                            <strong>휴대용 무선 카드 단말기</strong>를 지참한 테라피스트로 우선 배정됩니다. 현장 도착 후 실물 카드로 편리하게 결제하세요.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* 최종 예약 확인 & 문자 예약 전환 섹션 */}
                  <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid rgba(255, 255, 255, 0.12)' }}>
                    
                    {/* 1. 예약 구성 확인 카드 (이용자 선택 내용 직접 확인) */}
                    <div style={{
                      padding: '12px 16px',
                      backgroundColor: '#0c1322',
                      border: '1.5px solid rgba(238, 193, 75, 0.55)',
                      borderRadius: '12px',
                      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.45)',
                      marginBottom: '14px',
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <span style={{ color: '#EEC14B', fontWeight: 900, fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span>✓ 최종 예약 구성 확인</span>
                        </span>
                        <span style={{ color: '#4ade80', fontSize: '11px', fontWeight: 900, backgroundColor: 'rgba(34, 197, 94, 0.15)', padding: '2px 8px', borderRadius: '4px', border: '1px solid rgba(34, 197, 94, 0.3)' }}>
                          문자 자동완성
                        </span>
                      </div>

                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center', color: '#ffffff', fontSize: '13.5px', fontWeight: 700 }}>
                        <span style={{ color: '#FDE047', backgroundColor: 'rgba(253, 224, 71, 0.12)', padding: '3px 9px', borderRadius: '6px', border: '1px solid rgba(253, 224, 71, 0.3)' }}>
                          {quickCourse}
                        </span>
                        <span style={{ color: '#94a3b8' }}>·</span>
                        <span style={{ color: '#e2e8f0', backgroundColor: 'rgba(255, 255, 255, 0.08)', padding: '3px 9px', borderRadius: '6px' }}>
                          {finalQuickPay}
                        </span>
                        {quickAddr && (
                          <>
                            <span style={{ color: '#94a3b8' }}>·</span>
                            <span style={{ color: '#38bdf8', backgroundColor: 'rgba(56, 189, 248, 0.1)', padding: '3px 9px', borderRadius: '6px', fontSize: '12.5px', maxWidth: '240px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                              📍 {quickAddr}
                            </span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* 2. "이대로 예약하시겠습니까?" 문구 */}
                    <div style={{ textAlign: 'center', marginBottom: '12px' }}>
                      <p style={{ color: '#ffffff', fontSize: '16px', fontWeight: 900, margin: '0 0 4px 0', letterSpacing: '-0.3px' }}>
                        이대로 예약하시겠습니까?
                      </p>
                      <p style={{ color: '#94a3b8', fontSize: '12px', margin: 0 }}>
                        아래 확인 버튼을 누르시면 입력하신 내용이 문자로 즉시 완성되어 전송됩니다.
                      </p>
                    </div>

                    {/* 3. 명확한 대형 확인 버튼 (문자 예약 전환) */}
                    <button
                      type="submit"
                      style={{
                        width: '100%',
                        padding: '16px 20px',
                        borderRadius: '14px',
                        background: 'linear-gradient(135deg, #EEC14B 0%, #F3CE6D 50%, #D4A528 100%)',
                        color: '#080C16',
                        fontWeight: 900,
                        fontSize: '16px',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        boxShadow: '0 6px 24px rgba(238, 193, 75, 0.45)',
                        transition: 'all 0.2s',
                        letterSpacing: '-0.3px',
                      }}
                    >
                      <span style={{ fontSize: '20px' }}>💬</span>
                      <span>네, 이대로 예약하기 (문자 접수 🚀)</span>
                    </button>

                    {/* 4. 보조 옵션: 전화 예약 & 양식 복사 */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '16px',
                      marginTop: '14px',
                      paddingTop: '6px',
                      fontSize: '12.5px',
                      color: '#94a3b8',
                    }}>
                      <a
                        href={`tel:${cleanPhone}`}
                        style={{
                          color: '#34d399',
                          fontWeight: 800,
                          textDecoration: 'none',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                        }}
                      >
                        <span>📞 전화로 직접 예약하기</span>
                      </a>
                      <span style={{ color: '#475569' }}>|</span>
                      <button
                        type="button"
                        onClick={copyQuickSlip}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#94a3b8',
                          fontWeight: 600,
                          fontSize: '12.5px',
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          padding: 0,
                        }}
                      >
                        <span>📋 양식 복사</span>
                      </button>
                    </div>
                  </div>
                </form>

              </div>

            </div>

          </div>
        </section>

        {/* 5. TOP ESSENTIAL Q&A */}
        <section id="essential-qa" className="w-full bg-[#0a0f1d] px-4 md:px-6 lg:px-8 py-12 md:py-16 border-t border-[#1E293B]">
          <div className="max-w-[1240px] mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1e293b] border border-[#f2ca50]/50 text-[#f2ca50] text-[11px] md:text-[12px] font-black tracking-widest uppercase mb-3 shadow">
                💡 1초 즉문즉답 가이드
              </span>
              <h2 className="text-[22px] sm:text-[28px] md:text-[32px] font-black text-white mb-2">
                이용 전 <span className="text-[#EEC14B]">가장 많이 묻는 질문 TOP 6</span>
              </h2>
              <p className="text-[13px] sm:text-[14.5px] text-[#94a3b8]">
                되묻지 않으셔도 됩니다. 이용자분들이 가장 궁금해하시는 핵심 질문을 투명하게 안내해 드립니다.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {/* Q1 */}
              <div className="rounded-2xl bg-[#080d18] border border-[#f2ca50]/30 p-5 shadow-lg flex flex-col justify-between hover:border-[#f2ca50]/60 transition-colors">
                <div>
                  <div className="flex items-center gap-2 mb-2.5">
                    <span className="w-6 h-6 rounded-full bg-[#1e293b] text-[#EEC14B] border border-[#334155] flex items-center justify-center text-xs font-bold">Q1</span>
                    <h3 className="text-[15px] font-extrabold text-white">선입금이나 예약금이 정말 없나요?</h3>
                  </div>
                  <div className="inline-block px-2.5 py-1 rounded-md bg-[#EEC14B]/10 border border-[#EEC14B]/30 text-[#EEC14B] text-[12px] font-bold mb-2.5">
                    ✅ 100% 현장 후불제 (선입금 절대 0원)
                  </div>
                  <p className="text-[13px] text-[#94a3b8] leading-relaxed">
                    출장 사기나 먹튀 걱정 ZERO! 관리사가 고객님이 계신 곳(자택/호텔)에 도착하여 직접 대면한 후 결제합니다. 예약금, 유류비, 보증금 등을 먼저 요구하는 곳은 100% 사기입니다.
                  </p>
                </div>
              </div>

              {/* Q2 */}
              <div className="rounded-2xl bg-[#080d18] border border-[#1e293b] p-5 shadow-lg flex flex-col justify-between hover:border-[#f2ca50]/40 transition-colors">
                <div>
                  <div className="flex items-center gap-2 mb-2.5">
                    <span className="w-6 h-6 rounded-full bg-[#1e293b] text-[#EEC14B] border border-[#334155] flex items-center justify-center text-xs font-bold">Q2</span>
                    <h3 className="text-[15px] font-extrabold text-white">예약 후 도착까지 얼마나 걸리나요?</h3>
                  </div>
                  <div className="inline-block px-2.5 py-1 rounded-md bg-[#EEC14B]/10 border border-[#EEC14B]/30 text-[#EEC14B] text-[12px] font-bold mb-2.5">
                    ⚡ 평균 25분 ~ 35분 내 신속 도착
                  </div>
                  <p className="text-[13px] text-[#94a3b8] leading-relaxed">
                    서울 25개 구 및 경기 주요 거점 도시 기준, 예약 접수 확인 후 가장 가까운 전문 매니저가 출발하여 평균 25~35분 내에 신속하게 도착합니다.
                  </p>
                </div>
              </div>

              {/* Q3 */}
              <div className="rounded-2xl bg-[#080d18] border border-[#1e293b] p-5 shadow-lg flex flex-col justify-between hover:border-[#f2ca50]/40 transition-colors">
                <div>
                  <div className="flex items-center gap-2 mb-2.5">
                    <span className="w-6 h-6 rounded-full bg-[#1e293b] text-[#EEC14B] border border-[#334155] flex items-center justify-center text-xs font-bold">Q3</span>
                    <h3 className="text-[15px] font-extrabold text-white">관리사 사진(프로필)은 왜 없나요?</h3>
                  </div>
                  <div className="inline-block px-2.5 py-1 rounded-md bg-[#EEC14B]/10 border border-[#EEC14B]/30 text-[#EEC14B] text-[12px] font-bold mb-2.5">
                    🛡️ 가짜 도용 사진 근절 · 20대 에이스 힐러
                  </div>
                  <p className="text-[13px] text-[#94a3b8] leading-relaxed">
                    인터넷에 떠도는 가짜 모델 도용 사진으로 고객님을 기만하지 않습니다. 전원 철저한 마인드와 실무 교육을 이수한 20대 전문 테라피스트가 방문하며, 100% 현장 후불제로 투명하고 정직하게 운영됩니다.
                  </p>
                </div>
              </div>

              {/* Q4 */}
              <div className="rounded-2xl bg-[#080d18] border border-[#1e293b] p-5 shadow-lg flex flex-col justify-between hover:border-[#f2ca50]/40 transition-colors">
                <div>
                  <div className="flex items-center gap-2 mb-2.5">
                    <span className="w-6 h-6 rounded-full bg-[#1e293b] text-[#EEC14B] border border-[#334155] flex items-center justify-center text-xs font-bold">Q4</span>
                    <h3 className="text-[15px] font-extrabold text-white">어디서 이용할 수 있나요?</h3>
                  </div>
                  <div className="inline-block px-2.5 py-1 rounded-md bg-[#EEC14B]/10 border border-[#EEC14B]/30 text-[#EEC14B] text-[12px] font-bold mb-2.5">
                    📍 자택 · 오피스텔 · 호텔 · 모텔 전지역
                  </div>
                  <p className="text-[13px] text-[#94a3b8] leading-relaxed">
                    일반 아파트, 빌라, 원룸, 오피스텔부터 서울 5성급 호텔, 비즈니스 호텔, 모텔까지 편안하게 누우실 수 있는 실내 공간이라면 어디든 방문 가능합니다. (호텔, 모텔 포함 모든 숙박업소는 1층에서 운전기사와 대면하여 관리사를 픽업해 주세요.)
                  </p>
                </div>
              </div>

              {/* Q5 */}
              <div className="rounded-2xl bg-[#080d18] border border-[#1e293b] p-5 shadow-lg flex flex-col justify-between hover:border-[#f2ca50]/40 transition-colors">
                <div>
                  <div className="flex items-center gap-2 mb-2.5">
                    <span className="w-6 h-6 rounded-full bg-[#1e293b] text-[#EEC14B] border border-[#334155] flex items-center justify-center text-xs font-bold">Q5</span>
                    <h3 className="text-[15px] font-extrabold text-white">결제는 어떻게 하나요?</h3>
                  </div>
                  <div className="inline-block px-2.5 py-1 rounded-md bg-[#EEC14B]/10 border border-[#EEC14B]/30 text-[#EEC14B] text-[12px] font-bold mb-2.5">
                    💳 현금 · 계좌이체 · 카드 결제 모두 가능
                  </div>
                  <p className="text-[13px] text-[#94a3b8] leading-relaxed">
                    현장 도착 후 관리사 대면 시 원하시는 방식으로 결제하시면 됩니다. 현금 결제 시 거스름돈이 필요하시면 예약 시 미리 말씀해 주시면 준비해 드립니다.
                  </p>
                </div>
              </div>

              {/* Q6 */}
              <div className="rounded-2xl bg-[#080d18] border border-[#1e293b] p-5 shadow-lg flex flex-col justify-between hover:border-[#f2ca50]/40 transition-colors">
                <div>
                  <div className="flex items-center gap-2 mb-2.5">
                    <span className="w-6 h-6 rounded-full bg-[#1e293b] text-[#EEC14B] border border-[#334155] flex items-center justify-center text-xs font-bold">Q6</span>
                    <h3 className="text-[15px] font-extrabold text-white">따로 준비할 물품이 있나요?</h3>
                  </div>
                  <div className="inline-block px-2.5 py-1 rounded-md bg-[#EEC14B]/10 border border-[#EEC14B]/30 text-[#EEC14B] text-[12px] font-bold mb-2.5">
                    🎒 준비물 0개 (청결 위생 비품 완비)
                  </div>
                  <p className="text-[13px] text-[#94a3b8] leading-relaxed">
                    관리사가 1회용 청결 위생 매트, 호텔급 고급 타월, 최고급 천연 아로마 오일 등 필요한 모든 전문 비품을 지참하여 방문하므로 고객님께서는 편안하게 휴식만 취하시면 됩니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. TRUST & EXCELLENCE */}
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
                  <span>25~35분 내 신속 도착 보장</span>
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
                  야간 안심 프라이빗 (18:00~04:00)
                </span>
              </div>
            </div>

            <div className="w-full max-w-md flex flex-col sm:flex-row items-center justify-center gap-3.5">
              <button
                type="button"
                onClick={() => openDirectAbamSms()}
                className="abam-hero-btn-sms w-full sm:w-1/2"
              >
                <span className="material-symbols-outlined text-[20px]">sms</span>
                <span>문자 간편예약</span>
              </button>
              <a
                className="abam-hero-btn-call w-full sm:w-1/2"
                href={`tel:${cleanPhone}`}
              >
                <span className="material-symbols-outlined text-[20px]">call</span>
                <span>전화 즉시예약</span>
              </a>
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
          <div className="abam-footer-trust-strip">
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
          <div className="abam-footer-3col-grid">
            {/* Col 1: Brand */}
            <div className="space-y-4">
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
                  <span className="text-primary font-bold">운영시간</span>
                  <span className="text-slate-300">매일 18:00 ~ 04:00 (18:00부터 예약 가능 · 19:00부터 순차출발 · 04:00까지 예약 접수)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-primary font-bold">방문지역</span>
                  <span className="text-slate-300">서울 전역 · 경기 수도권 · 인천 전 지역</span>
                </div>
              </div>
            </div>

            {/* Col 2: Services & Coverage */}
            <div className="space-y-3">
              <h4 className="text-[13.5px] font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <span className="text-primary">❖</span> 서비스 프로그램 &amp; 코스
              </h4>
              <div className="space-y-2">
                <div className="abam-footer-course-row">
                  <span className="font-semibold text-slate-200">A코스 · 로얄 건식 지압 타이</span>
                  <span className="abam-footer-course-badge">
                    60분 / 90분 / 120분
                  </span>
                </div>
                <div className="abam-footer-course-row">
                  <span className="font-semibold text-slate-200">B코스 · 힐링아로마 스웨디시</span>
                  <span className="abam-footer-course-badge">
                    60분 / 90분 / 120분
                  </span>
                </div>
                <div className="abam-footer-course-row" style={{ borderColor: 'rgba(238, 193, 75, 0.4)', background: 'linear-gradient(90deg, #0d1424 0%, #161e33 100%)' }}>
                  <span className="font-bold text-white flex items-center gap-1.5">
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-primary text-slate-950 font-black">인기</span>
                    C코스 · 로얄 스페셜 더블케어
                  </span>
                  <span className="text-primary font-extrabold text-[12px]">90분 추천</span>
                </div>
              </div>
            </div>

            {/* Col 3: Customer Support (18:00 ~ 04:00) */}
            <div className="space-y-3">
              <h4 className="text-[13.5px] font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <span className="text-primary">❖</span> 실시간 접수 &amp; 고객센터
              </h4>
              <div className="abam-footer-cta-card space-y-3">
                <div className="flex items-center gap-2">
                  <span className="abam-live-dot"></span>
                  <span className="text-[12px] text-emerald-400 font-bold tracking-wide">
                    매일 18:00 ~ 익일 04:00 운영 (연중무휴)
                  </span>
                </div>
                <a
                  href={`tel:${cleanPhone}`}
                  className="text-[23px] font-black text-white hover:text-primary transition-colors block tracking-tight"
                >
                  {formattedPhone}
                </a>
                <div className="abam-footer-btn-grid">
                  <button
                    type="button"
                    onClick={() => openDirectAbamSms()}
                    className="abam-footer-btn-sms"
                  >
                    <span>💬</span> 문자 간편예약
                  </button>
                  <a
                    href={`tel:${cleanPhone}`}
                    className="abam-footer-btn-call"
                  >
                    <span>📞</span> 전화 즉시예약
                  </a>
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
              <span className="text-[#334155]">•</span>
              <a href="https://seoulroyalspa.com" target="_blank" rel="noopener" className="hover:text-primary transition-colors text-[11px] text-slate-500">외국인 전용 호텔 스파 (Seoul Royal Spa) ↗</a>
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

      {/* FIXED BOTTOM BOOKING BAR */}
      <AbamBottomBookingBar phone={cleanPhone} />
    </div>
  );
}
