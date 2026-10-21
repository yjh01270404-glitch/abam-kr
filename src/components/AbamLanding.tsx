'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { type LandingContent } from '../lib/landing-content';
import { UI } from '../lib/landing-ui';
import AbamBookingGuideModal from './AbamBookingGuideModal';

const WA_LINK =
  'https://wa.me/821066072239?text=Hello%20Abam.kr,%20I%20would%20like%20to%20inquire%20about%20your%20private%201:1%20home%20care%20service.';

/* 루미노케이(Luminok) 하이엔드 디자인 시스템 토큰 — 미드나잇 다크 네이비 + 샴페인 골드 + 림라이트 */
const C = {
  bg: '#070a14',                 // 루미노케이 미드나잇 다크 네이비 베이스
  bgSurface: '#0b101d',          // 세컨더리 표면 네이비
  cardBg: 'rgba(15, 23, 42, 0.95)', // 루미노케이형 딥 슬레이트 네이비 카드
  cardBgAlt: 'rgba(20, 30, 55, 0.92)',
  line: 'rgba(212, 175, 55, 0.22)',  // 은은한 샴페인 골드 림라이트 보더
  lineLight: 'rgba(212, 175, 55, 0.38)',
  lineMuted: '#1e293b',
  text: '#ffffff',
  textSub: '#cbd5e1',
  textMuted: '#94a3b8',
  pointRed: '#dc2626',           // 직관적 긴급/상담 크림슨 레드
  pointGold: '#d4af37',          // 루미노케이 시그니처 샴페인 골드
  pointGoldBright: '#f59e0b',    // 밝은 골드 앰버
  pointGreen: '#10b981',         // 후불제 신뢰 그린
  cardShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.6), 0 0 15px rgba(212, 175, 55, 0.08)',
};

const FONT = '-apple-system, BlinkMacSystemFont, "Pretendard", "Noto Sans KR", "Apple SD Gothic Neo", "Malgun Gothic", sans-serif';

type Lang = 'ko' | 'en' | 'jp' | 'cn';

const LANGS: { code: Lang; label: string; href: string }[] = [
  { code: 'ko', label: 'KR', href: '/' },
  { code: 'en', label: 'EN', href: '/en' },
  { code: 'jp', label: 'JP', href: '/jp' },
  { code: 'cn', label: 'CN', href: '/cn' },
];

type Extra = {
  h1a: string;
  h1b: string;
  status: { open: string; pre: string; closed: string };
  nav: [string, string, string, string, string];
  priceNote: string;
  guideTitle: string;
  steps: string[];
  modalTitle: string;
  modalBody: string;
  callNow: string;
};

const EXTRA: Record<Lang, Extra> = {
  ko: {
    h1a: '출장마사지 · 출장 홈타이 아밤',
    h1b: '서울·경기 전지역 1:1 방문 맞춤 케어',
    status: { open: '지금 예약 접수 중 · 실시간 상담 가능', pre: '예약 접수 중 · 19:00부터 순차 출발', closed: '예약 접수 18:00부터 · 출발 19:00부터' },
    nav: ['소개', '코스', '안내', '후기', 'FAQ'],
    priceNote: '60분 기준 · 전 코스 정찰제',
    guideTitle: '이용 안내',
    steps: ['전화·문자 상담 접수', '코스·주소·시간 전달', '순차 출발 후 1:1 케어'],
    modalTitle: '아밤 예약 및 상담',
    modalBody: '전화 또는 문자로 편하게 남겨주시면 바로 안내해 드립니다.',
    callNow: '전화 바로연결',
  },
  en: {
    h1a: 'Private Outcall Massage Abam',
    h1b: 'Seoul & Gyeonggi 1:1 Private Visit Care',
    status: { open: 'Booking open now · Message us', pre: 'Booking open · Departures from 19:00', closed: 'Booking from 18:00 · Departures from 19:00' },
    nav: ['Intro', 'Courses', 'Visit/Pay', 'Reviews', 'FAQ'],
    priceNote: 'Per 60 min · All transparent prices',
    guideTitle: 'How it works',
    steps: ['Message or call us', 'Confirm course, place, time', '1:1 care at your location'],
    modalTitle: 'Book your private care',
    modalBody: 'Message us on WhatsApp or call directly.',
    callNow: 'Call now',
  },
  jp: {
    h1a: '出張マッサージ・ホームタイ Abam',
    h1b: 'ソウル・京畿全域 1:1訪問プライベートケア',
    status: { open: 'ご予約受付中 · すぐにご相談いただけます', pre: '予約受付中 · 19:00より順次出発', closed: '予約は18:00から · 出発19:00から' },
    nav: ['紹介', 'コース', '利用案内', 'レビュー', 'よくある質問'],
    priceNote: '60分の料金 · 全コース定額',
    guideTitle: 'ご利用案内',
    steps: ['メッセージまたはお電話', 'コース・場所・時間を確定', 'ご希望の場所で1:1ケア'],
    modalTitle: 'ご予約・ご相談',
    modalBody: 'WhatsAppまたはお電話でご連絡ください。',
    callNow: '電話する',
  },
  cn: {
    h1a: '上门按摩·居家推拿 Abam',
    h1b: '首尔·京畿全境 1:1上门专属护理',
    status: { open: '正在接受预约 · 可立即咨询', pre: '接受预约 · 19:00起顺次出发', closed: '18:00起接受预约 · 19:00起出发' },
    nav: ['介绍', '项目', '须知', '评价', '常见问题'],
    priceNote: '60分钟价格 · 全项目明码标价',
    guideTitle: '预约须知',
    steps: ['留言或来电咨询', '确认项目、地点、时间', '在您指定的地点1:1服务'],
    modalTitle: '预约咨询',
    modalBody: '请通过WhatsApp留言或直接来电。',
    callNow: '立即致电',
  },
};

/* **굵게** 와 \n 줄바꿈을 지원하는 간단한 텍스트 렌더러 */
const rich = (str: string, color?: string) =>
  str.split('\n').map((line, li) => (
    <React.Fragment key={li}>
      {li > 0 && <br />}
      {line.split('**').map((p, i) =>
        i % 2 ? <strong key={i} style={color ? { color } : undefined}>{p}</strong> : <React.Fragment key={i}>{p}</React.Fragment>,
      )}
    </React.Fragment>
  ));

const LANG_NAME: Record<Lang, string> = { ko: '한국어', en: 'English', jp: '日本語', cn: '中文' };

/* 미니멀 SVG 라인 아이콘 컴포넌트들 (인위적인 이모지 대체) */
const PhoneIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.02-.24 11.72 11.72 0 003.68.59 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.59 3.68a1 1 0 01-.24 1.02l-2.23 2.09z" />
  </svg>
);

const SmsIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17L4 17.17V4h16v12zM7 9h10v2H7zm0-3h10v2H7zm0 6h7v2H7z" />
  </svg>
);

const ShieldCheckIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

const ClockIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const MapPinHomeIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const BoltIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

export default function AbamLanding({ c, areaLinks }: { c: LandingContent; areaLinks?: string[] }) {
  const isKo = c.lang === 'ko';
  const x = EXTRA[c.lang];
  const t = UI[c.lang];
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [smsModal, setSmsModal] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [status, setStatus] = useState<'open' | 'pre' | 'closed' | null>(null);

  /* 영업 상태 (한국 시간 기준) */
  useEffect(() => {
    const calc = () => {
      const h = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Seoul' })).getHours();
      setStatus(h >= 19 || h < 5 ? 'open' : h === 18 ? 'pre' : 'closed');
    };
    calc();
    const t = setInterval(calc, 60000);
    return () => clearInterval(t);
  }, []);

  const card: React.CSSProperties = {
    background: C.cardBg,
    border: `1px solid ${C.line}`,
    borderRadius: '12px',
  };

  const btn: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    fontWeight: 700,
    borderRadius: '8px',
    textDecoration: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.15s ease',
  };

  const section: React.CSSProperties = { marginTop: '44px', scrollMarginTop: '70px', width: '100%' };

  /* 루미노케이 스타일 프리미엄 섹션 타이틀: 샴페인 골드 바 인디케이터 + 선명한 산세리프 헤드라인 (인위적인 영문 대문자 배지 제거) */
  const head = (title: string, sub?: string) => {
    return (
      <div style={{ marginBottom: '20px', borderLeft: `3px solid ${C.pointGold}`, paddingLeft: '14px', position: 'relative' }}>
        <h2 className="abam-head-title" style={{ fontWeight: 800, fontSize: '24px', color: '#ffffff', margin: 0, letterSpacing: '-0.4px', wordBreak: 'keep-all', lineHeight: 1.35 }}>{title}</h2>
        {sub && <p className="abam-head-sub" style={{ color: '#94a3b8', fontSize: '14.5px', margin: '6px 0 0', wordBreak: 'keep-all', fontWeight: 500, lineHeight: 1.6 }}>{sub}</p>}
      </div>
    );
  };

  return (
    <div lang={c.htmlLang} style={{ position: 'relative', minHeight: '100vh', width: '100%', background: C.bg, color: C.text, fontFamily: FONT, paddingBottom: '140px', lineHeight: 1.65 }}>
      
      {/* ── 브라우저 기본 스크롤 및 고딕 폰트 지정 ── */}
      <style jsx global>{`
        html { scroll-behavior: smooth; font-family: ${FONT}; width: 100%; overflow-x: hidden; }
        body { width: 100%; overflow-x: hidden; margin: 0; padding: 0; background: #070a14; }

        /* ── 아밤 프리미엄 밸런스 레이아웃: 과도한 팽창 없이 단정하고 세련된 860px 비례 시스템 ── */
        .abam-container {
          width: 100%;
          max-width: 100%;
          margin: 0 auto;
          padding: 0 16px;
          box-sizing: border-box;
        }
        @media (min-width: 640px) {
          html:not(.abam-m) .abam-container {
            max-width: 860px;
            padding: 0 24px;
          }
        }

        .abam-header-right { margin-left: auto; }
        .abam-lang {
          display: flex;
          align-items: center;
          gap: 6px;
          order: 3;
          margin-left: 16px;
        }
        .abam-lang-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 44px;
          height: 34px;
          padding: 0 10px;
          border-radius: 6px;
          border: 1px solid rgba(255, 255, 255, 0.12);
          background: rgba(255, 255, 255, 0.05);
          color: #cbd5e1;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.3px;
          text-decoration: none;
          box-sizing: border-box;
          cursor: pointer;
          transition: background 0.15s, border-color 0.15s, color 0.15s;
        }
        .abam-lang-btn:hover { border-color: #d4af37; color: #ffffff; background: rgba(212, 175, 55, 0.15); }
        .abam-lang-btn:active { transform: scale(0.96); }
        .abam-lang-on {
          background: #d4af37;
          border-color: #d4af37;
          color: #070a14;
          font-weight: 800;
          cursor: default;
        }
        .abam-lang-on:hover { background: #d4af37; color: #070a14; }

        .abam-header-inner {
          width: 100%;
          max-width: 100%;
          margin: 0 auto;
          padding: 12px 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          box-sizing: border-box;
        }
        @media (min-width: 640px) {
          html:not(.abam-m) .abam-header-inner {
            max-width: 860px;
            padding: 14px 24px;
          }
        }

        /* 루미노케이 하이엔드 박스 표현 시스템: 슬레이트 네이비 카드 + 골드 림라이트 보더 + 깊은 입체 음영 */
        .abam-card {
          background: rgba(15, 23, 42, 0.95);
          border: 1px solid rgba(212, 175, 55, 0.22);
          border-radius: 12px;
          padding: 22px 20px;
          box-sizing: border-box;
          width: 100%;
          margin: 0 auto;
          box-shadow: 0 10px 28px -4px rgba(0, 0, 0, 0.6), 0 0 12px rgba(212, 175, 55, 0.05);
          transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
        }
        @media (min-width: 640px) {
          html:not(.abam-m) .abam-card {
            border-radius: 14px;
            padding: 26px 26px;
          }
          html:not(.abam-m) .abam-card:hover {
            transform: translateY(-2px);
            border-color: rgba(212, 175, 55, 0.4);
            box-shadow: 0 14px 34px -4px rgba(0, 0, 0, 0.7), 0 0 16px rgba(212, 175, 55, 0.08);
          }
        }

        /* ── 4대 핵심 가이드 카드: 미니멀 라인 아이콘 + 정돈된 2열 그리드 ── */
        .abam-guide-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: rgba(15, 23, 42, 0.95);
          border: 1px solid rgba(212, 175, 55, 0.22);
          border-radius: 12px;
          padding: 20px 14px;
          text-align: center;
          box-shadow: 0 6px 20px -4px rgba(0,0,0,0.5);
          min-height: 124px;
          box-sizing: border-box;
          transition: transform 0.2s ease, border-color 0.2s ease;
        }
        .abam-guide-card-icon {
          width: 38px;
          height: 38px;
          border-radius: 8px;
          background: rgba(212, 175, 55, 0.1);
          border: 1px solid rgba(212, 175, 55, 0.25);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 10px;
          color: #d4af37;
          flex-shrink: 0;
        }
        .abam-guide-card-title {
          font-size: 15.5px;
          font-weight: 800;
          color: #ffffff;
          margin-bottom: 4px;
          letter-spacing: -0.3px;
          line-height: 1.35;
          text-wrap: balance;
          word-break: keep-all;
        }
        .abam-guide-card-sub {
          font-size: 13px;
          color: #94a3b8;
          line-height: 1.45;
          text-wrap: pretty;
          word-break: keep-all;
          margin: 0;
        }
        @media (min-width: 640px) {
          .abam-guide-card {
            padding: 22px 18px;
            min-height: 136px;
          }
          .abam-guide-card:hover {
            transform: translateY(-2px);
            border-color: rgba(212, 175, 55, 0.45);
          }
          .abam-guide-card-title {
            font-size: 16.5px;
            margin-bottom: 6px;
          }
          .abam-guide-card-sub {
            font-size: 13.5px;
          }
        }

        /* ── PC & 모바일 반응형 줄바꿈 및 줄맞춤 타이포그래피 시스템 ── */
        .pc-br { display: inline; }
        .mo-br { display: none; }
        .abam-head-title, .abam-course-name, .abam-rule-title, .abam-faq-q, .abam-hero-title-main {
          text-wrap: balance !important;
          word-break: keep-all !important;
          letter-spacing: -0.4px !important;
        }
        .abam-head-sub, .abam-body-text, .abam-course-desc, .abam-rule-desc, .abam-review-text, .abam-faq-a {
          text-wrap: pretty !important;
          word-break: keep-all !important;
          line-height: 1.72 !important;
        }

        .abam-head-title { font-size: 24px; }
        .abam-head-sub { font-size: 15px; }

        @media (max-width: 640px) {
          .pc-br { display: none !important; }
          .mo-br { display: inline !important; }
          .abam-header-inner {
            padding: 0 12px !important;
            height: 52px !important;
          }
          .abam-lang { display: none !important; }
          .abam-nav-intro { display: none !important; }
          .abam-nav-link {
            padding: 5px 6px !important;
            font-size: 13px !important;
            font-weight: 700 !important;
          }
          .abam-head-title { font-size: 20px !important; }
          .abam-head-sub { font-size: 14px !important; line-height: 1.55 !important; }
          .abam-card { padding: 18px 16px !important; }
        }

        /* ── 하단 고정 퀵바 (블러 네이비 독 + 상단 골드 악센트 라인) ── */
        .abam-bottom-bar {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          background: rgba(7, 10, 20, 0.96);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border-top: 1px solid rgba(212, 175, 55, 0.35);
          box-shadow: 0 -8px 28px rgba(0, 0, 0, 0.75);
          padding: 10px 14px;
          z-index: 50;
          box-sizing: border-box;
          width: 100%;
        }
        @media (min-width: 640px) {
          html:not(.abam-m) .abam-bottom-bar {
            padding: 12px 24px;
          }
        }
        @media (max-width: 640px) {
          .abam-bottom-bar { padding: 8px 10px calc(8px + env(safe-area-inset-bottom)) !important; }
        }

        .abam-photo-banner {
          position: relative;
          width: 100%;
          height: 260px;
          overflow: hidden;
          border: 1px solid rgba(212, 175, 55, 0.22);
          border-radius: 12px;
          box-sizing: border-box;
          margin-top: 16px;
        }
        @media (min-width: 640px) {
          html:not(.abam-m) .abam-photo-banner {
            border-radius: 14px;
            height: 360px;
            box-shadow: 0 12px 36px -4px rgba(0, 0, 0, 0.65);
          }
        }
      `}</style>

      {/* ── 정갈한 미드나잇 다크 네이비 앰비언트 배경 (AI스러운 별빛·유성 완전 제거) ── */}
      <div aria-hidden="true" style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(20, 30, 55, 0.45), #070a14 70%)' }} />
      </div>

      {/* 토스트 알림 */}
      {toast && (
        <div style={{ position: 'fixed', top: '16px', left: '50%', transform: 'translateX(-50%)', background: '#1e293b', border: `1px solid ${C.lineLight}`, color: '#ffffff', padding: '10px 20px', borderRadius: '6px', fontSize: '13px', fontWeight: 700, zIndex: 99999, boxShadow: '0 8px 24px rgba(0,0,0,0.8)' }}>
          {toast}
        </div>
      )}

      {/* ── 아밤 5대 핵심 예약 가이드 모달 ── */}
      <AbamBookingGuideModal
        isOpen={smsModal}
        onClose={() => setSmsModal(false)}
        smsMessage={t.smsBody}
      />

      {/* ── 1. 상단 헤더: 미니멀 로고 & 깔끔한 네비게이션 ── */}
      <header style={{ position: 'sticky', top: 0, zIndex: 40, background: 'rgba(7, 10, 20, 0.94)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', borderBottom: `1px solid ${C.line}` }}>
        <div className="abam-header-inner">
          
          <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
            {/* 세련된 샴페인 골드 크레센트 아이콘 */}
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" fill="#d4af37" />
            </svg>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '19px', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.3px', lineHeight: 1 }}>{t.logoA}</span>
              <span style={{ fontSize: '13px', fontWeight: 800, color: C.pointGold, background: 'rgba(212, 175, 55, 0.14)', border: `1px solid ${C.line}`, padding: '2px 6px', borderRadius: '4px', lineHeight: 1 }}>{t.heroTag}</span>
            </span>
          </Link>

          {/* 우측 네비게이션 메뉴 */}
          <div className="abam-header-right" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <nav style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
              <a href="#intro" className="abam-nav-link abam-nav-intro" style={{ color: C.textSub, fontSize: '13px', fontWeight: 600, textDecoration: 'none', padding: '6px 8px' }}>{t.hnav[0]}</a>
              <a href="#price" className="abam-nav-link" style={{ color: '#ffffff', fontSize: '13px', fontWeight: 700, textDecoration: 'none', padding: '6px 8px' }}>{t.hnav[1]}</a>
              <a href="#rules" className="abam-nav-link" style={{ color: C.textSub, fontSize: '13px', fontWeight: 600, textDecoration: 'none', padding: '6px 8px' }}>{t.hnav[2]}</a>
              <a href="#reviews" className="abam-nav-link" style={{ color: C.textSub, fontSize: '13px', fontWeight: 600, textDecoration: 'none', padding: '6px 8px' }}>{t.hnav[3]}</a>
              <a href="#faq" className="abam-nav-link" style={{ color: C.textSub, fontSize: '13px', fontWeight: 600, textDecoration: 'none', padding: '6px 8px' }}>{t.hnav[4]}</a>
            </nav>

            {/* 언어 선택 버튼 (데스크톱 전용) */}
            <div className="abam-lang" role="group" aria-label="Language">
              {LANGS.map((l) =>
                l.code === c.lang ? (
                  <span key={l.code} className="abam-lang-btn abam-lang-on" aria-current="page">{l.label}</span>
                ) : (
                  <Link key={l.code} href={l.href} className="abam-lang-btn">{l.label}</Link>
                ),
              )}
            </div>
          </div>
        </div>
      </header>

      {/* ── 메인 콘텐츠 ── */}
      <main className="abam-container" style={{ position: 'relative', zIndex: 1 }}>

        {/* ── 2. 히어로 섹션 (Luminok 스타일: 정갈한 단일 마스터 블록과 직관적 CTA) ── */}
        <section style={{ position: 'relative', paddingTop: '32px', textAlign: 'center' }}>
          
          {/* 영업 상태 인디케이터 */}
          {status && (
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(15, 23, 42, 0.8)', border: `1px solid ${C.line}`, borderRadius: '20px', padding: '6px 16px', fontSize: '13.5px', fontWeight: 700, color: C.textSub, marginBottom: '20px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: status === 'closed' ? C.pointGold : '#10b981' }} />
              {x.status[status]}
            </div>
          )}

          {/* 메인 헤드라인 (정갈한 볼드 산세리프 타이포그래피) */}
          <h1 style={{ margin: '0 0 20px', padding: '0 8px' }}>
            <span style={{ display: 'block', fontSize: '32px', fontWeight: 900, color: '#ffffff', letterSpacing: '-0.6px', lineHeight: 1.3 }}>
              {isKo ? '출장마사지 · 출장 홈타이 아밤' : x.h1a}
            </span>
            <span style={{ display: 'block', fontSize: '17px', fontWeight: 600, color: C.pointGold, marginTop: '8px', letterSpacing: '-0.3px', lineHeight: 1.5 }}>
              {t.heroSub}
            </span>
          </h1>

          {/* ── [루미노케이형 통합 마스터 인포 카드]: 난잡하게 흩어진 5개 박스를 1개로 완벽 정돈 ── */}
          <div className="abam-card" style={{ maxWidth: '680px', margin: '0 auto 24px', textAlign: 'left', background: 'rgba(15, 23, 42, 0.95)', border: `1px solid ${C.lineLight}` }}>
            
            {/* 상단: 아밤 서비스 소개 */}
            <div style={{ fontSize: '15px', color: '#e2e8f0', lineHeight: 1.7, paddingBottom: '16px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
              <strong style={{ color: '#ffffff', fontWeight: 800 }}>{t.leadA}</strong>{t.leadB}<strong style={{ color: C.pointGold }}>{t.leadC}</strong>{t.leadD}<br />
              <span style={{ color: C.textSub, fontSize: '14px' }}>{t.leadE}</span>
            </div>

            {/* 중단: 3대 핵심 요약 그리드 */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', padding: '16px 0', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', textAlign: 'center' }}>
              <div style={{ padding: '8px 4px', background: 'rgba(212, 175, 55, 0.08)', borderRadius: '6px', border: `1px solid ${C.line}` }}>
                <div style={{ fontSize: '13.5px', fontWeight: 800, color: '#ffffff' }}>{t.sum[0]}</div>
                <div style={{ fontSize: '11.5px', color: C.pointGold, marginTop: '2px' }}>선입금 0원</div>
              </div>
              <div style={{ padding: '8px 4px', background: 'rgba(212, 175, 55, 0.08)', borderRadius: '6px', border: `1px solid ${C.line}` }}>
                <div style={{ fontSize: '13.5px', fontWeight: 800, color: '#ffffff' }}>18:00 ~ 05:00</div>
                <div style={{ fontSize: '11.5px', color: C.pointGold, marginTop: '2px' }}>19:00 순차 출발</div>
              </div>
              <div style={{ padding: '8px 4px', background: 'rgba(212, 175, 55, 0.08)', borderRadius: '6px', border: `1px solid ${C.line}` }}>
                <div style={{ fontSize: '13.5px', fontWeight: 800, color: '#ffffff' }}>{t.sum[2]}</div>
                <div style={{ fontSize: '11.5px', color: C.pointGold, marginTop: '2px' }}>30~40분 내 도착</div>
              </div>
            </div>

            {/* 하단: 방문 전 안내 (주차장·공동현관·호텔 로비) */}
            <div style={{ paddingTop: '14px', fontSize: '13.5px', color: '#cbd5e1', lineHeight: 1.65 }}>
              <div style={{ fontWeight: 800, color: C.pointGold, marginBottom: '4px', fontSize: '14px' }}>{t.noticeTitle}</div>
              <div>{rich(t.notice1)}</div>
              <div style={{ marginTop: '3px' }}>{rich(t.notice2)}</div>
            </div>

          </div>

          {/* ── 듀얼 CTA 액션 버튼 (전화예약 + 문자예약) ── */}
          <div style={{ maxWidth: '680px', margin: '0 auto 10px', display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '10px' }}>
            <a
              href={`tel:${c.contact.phone.replace(/[^0-9]/g, '')}`}
              style={{
                ...btn,
                background: C.pointRed,
                color: '#ffffff',
                fontSize: '18px',
                fontWeight: 800,
                padding: '16px 12px',
                boxShadow: '0 4px 18px rgba(220, 38, 38, 0.35)',
                border: 'none',
              }}
            >
              <PhoneIcon size={20} />
              <span>{c.contact.phone} {t.callHero}</span>
            </a>

            <button
              type="button"
              onClick={() => setSmsModal(true)}
              style={{
                ...btn,
                background: 'rgba(212, 175, 55, 0.15)',
                border: `1px solid ${C.pointGold}`,
                color: '#ffffff',
                fontSize: '16px',
                fontWeight: 800,
                padding: '16px 12px',
              }}
            >
              <SmsIcon size={18} />
              <span>{t.smsHero}</span>
            </button>
          </div>

          <div style={{ fontSize: '13px', color: C.textMuted, marginBottom: '24px' }}>
            {t.smsNote}
          </div>

          {/* 히어로 실사 모델 화보 */}
          <div className="abam-photo-banner">
            <Image
              src="/images/abam_hero_seductive.jpg"
              alt={t.altHero}
              fill
              sizes="(max-width: 640px) 100vw, 860px"
              style={{ objectFit: 'cover' }}
              priority
            />
          </div>

        </section>

        {/* ── 3. 4대 핵심 이용 안내 카드 (루미노케이 슬레이트 네이비 + 미니멀 라인 아이콘) ── */}
        <section style={{ margin: '24px auto 0', width: '100%', boxSizing: 'border-box' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '12px',
          }}>
            {/* 카드 1: 100% 현장 대면결제 */}
            <div className="abam-guide-card">
              <div className="abam-guide-card-icon">
                <ShieldCheckIcon size={20} />
              </div>
              <div className="abam-guide-card-title">
                100% 현장 대면결제
              </div>
              <p className="abam-guide-card-sub">
                선입금 없는 안심 대면결제
              </p>
            </div>

            {/* 카드 2: 예약 접수 18:00부터 */}
            <div className="abam-guide-card">
              <div className="abam-guide-card-icon">
                <ClockIcon size={20} />
              </div>
              <div className="abam-guide-card-title">
                예약 접수 18:00부터
              </div>
              <p className="abam-guide-card-sub">
                출발 19:00부터<span className="mo-br"><br /></span><span className="pc-br"> · </span>마지막 예약 05:00
              </p>
            </div>

            {/* 카드 3: 원하는 프라이빗 공간 */}
            <div className="abam-guide-card">
              <div className="abam-guide-card-icon">
                <MapPinHomeIcon size={20} />
              </div>
              <div className="abam-guide-card-title">
                원하는 프라이빗 공간
              </div>
              <p className="abam-guide-card-sub">
                자택 · 아파트 · 호텔 등<span className="mo-br"><br /></span><span className="pc-br"> </span>1:1 방문 케어
              </p>
            </div>

            {/* 카드 4: 1시간 전 예약 추천 / 서울·경기 30~40분 내 도착 */}
            <div className="abam-guide-card">
              <div className="abam-guide-card-icon">
                <BoltIcon size={20} />
              </div>
              <div className="abam-guide-card-title">
                1시간 전 예약 추천
              </div>
              <p className="abam-guide-card-sub">
                1시간 전 추천<span className="mo-br"><br /></span><span className="pc-br"> · </span>서울·경기 30~40분 내 도착
              </p>
            </div>
          </div>
        </section>

        {/* ── 4. 출장안마 서비스 안내 ── */}
        <section id="intro" style={section}>
          {head(t.introTitle, t.introSub)}
          <div className="abam-card abam-body-text" style={{ fontSize: '15.5px', color: '#e2e8f0', lineHeight: 1.8 }}>
            <p style={{ margin: '0 0 14px' }}>
              {t.intro1}
            </p>
            <p style={{ margin: '0 0 14px' }}>
              {rich(t.intro2, '#ffffff')}
            </p>
            <p style={{ margin: 0 }}>
              {t.intro3}
            </p>
          </div>
        </section>

        {/* ── 5. 코스 및 정찰 가격표 (하나의 일체형 큰 박스 안에서 종류별 고유 컬러 구분) ── */}
        <section id="price" style={section}>
          {head(t.priceTitle, t.priceSub)}
          
          <div
            className="abam-card"
            style={{
              padding: 0,
              overflow: 'hidden',
              border: `1px solid ${C.line}`,
              borderRadius: '14px',
              background: 'rgba(15, 23, 42, 0.95)',
            }}
          >
            {/* 마스터 안내 바 */}
            <div
              style={{
                padding: '14px 20px',
                background: 'rgba(20, 30, 55, 0.95)',
                borderBottom: `1px solid ${C.line}`,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '8px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: C.pointGold }} />
                <span style={{ fontSize: '14px', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.3px' }}>{t.priceBar1}</span>
              </div>
              <span style={{ fontSize: '12.5px', color: C.pointGold, fontWeight: 700 }}>{t.priceBar2}</span>
            </div>

            {/* 3대 코스 목록 */}
            {c.courses.map((course, idx) => {
              const isThai = course.no === 1;
              const isAroma = course.no === 2;
              const isSpecial = course.no === 3;

              const themeColor = isAroma ? '#f59e0b' : isSpecial ? '#e11d48' : '#38bdf8';
              const themeBg = isAroma
                ? 'rgba(245, 158, 11, 0.03)'
                : isSpecial
                ? 'rgba(225, 29, 72, 0.03)'
                : 'transparent';

              const badgeText = t.courseLetter[course.no - 1] ?? t.courseLetter[0];
              const tagText = isAroma ? t.tags[1] : isSpecial ? t.tags[2] : t.tags[0];
              const chips = isThai ? t.chips[0] : isAroma ? t.chips[1] : t.chips[2];

              return (
                <div
                  key={course.no}
                  style={{
                    background: themeBg,
                    borderTop: idx > 0 ? '1px solid #1e293b' : 'none',
                    borderLeft: `4px solid ${themeColor}`,
                  }}
                >
                  {/* 코스별 헤더 바 */}
                  <div
                    style={{
                      padding: '14px 18px',
                      background: isAroma ? 'rgba(245, 158, 11, 0.06)' : isSpecial ? 'rgba(225, 29, 72, 0.06)' : 'rgba(56, 189, 248, 0.05)',
                      borderBottom: '1px solid #1e293b',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      gap: '8px',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                      <span
                        style={{
                          background: themeColor,
                          color: '#ffffff',
                          fontWeight: 800,
                          fontSize: '12px',
                          padding: '3px 8px',
                          borderRadius: '4px',
                        }}
                      >
                        {badgeText}
                      </span>
                      <strong style={{ fontSize: '17px', color: '#ffffff' }}>{course.name}{t.courseSuffix}</strong>

                      <span
                        style={{
                          background: isAroma ? 'rgba(245, 158, 11, 0.15)' : isSpecial ? 'rgba(225, 29, 72, 0.15)' : 'rgba(56, 189, 248, 0.12)',
                          border: `1px solid ${themeColor}66`,
                          color: isAroma ? '#fef08a' : isSpecial ? '#fda4af' : '#bae6fd',
                          fontSize: '11.5px',
                          fontWeight: 700,
                          padding: '2px 8px',
                          borderRadius: '4px',
                        }}
                      >
                        {tagText}
                      </span>
                    </div>

                    <span style={{ fontSize: '13px', color: isAroma ? '#fef08a' : themeColor, fontWeight: 700 }}>
                      {course.subtitle}
                    </span>
                  </div>

                  {/* 코스 본문 & 특징 불릿 칩 & 3열 가격표 그리드 */}
                  <div style={{ padding: '18px 18px 22px' }}>
                    <p className="abam-course-desc" style={{ fontSize: '15.5px', color: C.textSub, margin: '0 0 14px', lineHeight: 1.75 }}>
                      {course.desc}
                    </p>

                    {/* 핵심 포인트 칩 3개 */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
                      {chips.map((chip, ci) => (
                        <span
                          key={ci}
                          style={{
                            background: '#0d111d',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            color: '#cbd5e1',
                            fontSize: '13px',
                            fontWeight: 600,
                            padding: '5px 10px',
                            borderRadius: '5px',
                          }}
                        >
                          {chip}
                        </span>
                      ))}
                    </div>

                    {/* 가격표 셀 */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '8px' }}>
                      {course.prices.map((pr, pi) => {
                        const isRecom = (isThai && pi === 1) || (isAroma && pi === 1) || (isSpecial && pi === 2);
                        return (
                          <div
                            key={pi}
                            style={{
                              textAlign: 'center',
                              border: isRecom ? `1.5px solid ${themeColor}` : `1px solid ${C.line}`,
                              background: isRecom ? `${themeColor}15` : '#0d111d',
                              borderRadius: '8px',
                              padding: '14px 6px',
                              position: 'relative',
                            }}
                          >
                            {isRecom && (
                              <div
                                style={{
                                  position: 'absolute',
                                  top: '-10px',
                                  left: '50%',
                                  transform: 'translateX(-50%)',
                                  background: themeColor,
                                  color: '#ffffff',
                                  fontSize: '11px',
                                  fontWeight: 800,
                                  padding: '2px 8px',
                                  borderRadius: '3px',
                                  whiteSpace: 'nowrap',
                                }}
                              >
                                {isSpecial ? t.vipFull : t.recommend}
                              </div>
                            )}
                            <div style={{ fontSize: '13px', color: C.textMuted, fontWeight: 700 }}>{c.priceSection.durations[pi]}</div>
                            <div
                              style={{
                                fontSize: '18px',
                                fontWeight: 900,
                                color: isRecom ? '#ffffff' : '#f1f5f9',
                                marginTop: '4px',
                                letterSpacing: '-0.5px',
                                whiteSpace: 'nowrap',
                              }}
                            >
                              {pr}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* 코스 설명 하단 화보 */}
          <div className="abam-photo-banner">
            <Image
              src="/images/abam_penthouse_night.jpg"
              alt={t.altNight}
              fill
              sizes="(max-width: 640px) 100vw, 860px"
              style={{ objectFit: 'cover' }}
            />
          </div>

          {/* 외국인 전용 안내 (다국어 페이지) */}
          {c.priceNotice && (
            <div className="abam-card" style={{ marginTop: '16px', border: `1px solid ${C.lineLight}` }}>
              <div style={{ display: 'inline-block', fontSize: '11px', fontWeight: 800, color: C.pointGold, background: 'rgba(212,175,55,0.12)', padding: '2px 6px', borderRadius: '4px', marginBottom: '8px' }}>
                {c.priceNotice.tag}
              </div>
              <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#ffffff', margin: '0 0 6px' }}>{c.priceNotice.title}</h3>
              <p style={{ fontSize: '13px', color: C.textSub, margin: '0 0 10px' }}>{c.priceNotice.desc}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {c.priceNotice.reasons.map((r, ri) => (
                  <div key={ri} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', background: '#1c1f2b', padding: '10px 12px', borderRadius: '6px', borderLeft: `3px solid ${C.pointRed}` }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#ffffff' }}>{r.title}</div>
                      <div style={{ fontSize: '12.5px', color: C.textSub, marginTop: '2px' }}>{r.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* ── 6. 방문 확인사항 및 결제 안내 ── */}
        <section id="rules" style={section}>
          {head(t.rulesTitle, t.rulesSub)}
          
          <div className="abam-card" style={{ padding: '22px 20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div>
                <div className="abam-rule-title" style={{ fontSize: '17px', fontWeight: 800, color: '#ffffff', marginBottom: '4px' }}>{t.rules[0][0]}</div>
                <div className="abam-rule-desc" style={{ fontSize: '15px', color: C.textSub, lineHeight: 1.75 }}>{t.rules[0][1]}</div>
              </div>
              <div>
                <div className="abam-rule-title" style={{ fontSize: '17px', fontWeight: 800, color: '#ffffff', marginBottom: '4px' }}>{t.rules[1][0]}</div>
                <div className="abam-rule-desc" style={{ fontSize: '15px', color: C.textSub, lineHeight: 1.75 }}>{t.rules[1][1]}</div>
              </div>
              <div>
                <div className="abam-rule-title" style={{ fontSize: '17px', fontWeight: 800, color: '#ffffff', marginBottom: '4px' }}>{t.rules[2][0]}</div>
                <div className="abam-rule-desc" style={{ fontSize: '15px', color: C.textSub, lineHeight: 1.75 }}>{t.rules[2][1]}</div>
              </div>
              <div>
                <div className="abam-rule-title" style={{ fontSize: '17px', fontWeight: 800, color: '#ffffff', marginBottom: '4px' }}>{t.rules[3][0]}</div>
                <div className="abam-rule-desc" style={{ fontSize: '15px', color: C.textSub, lineHeight: 1.75 }}>{t.rules[3][1]}</div>
              </div>
              <div>
                <div className="abam-rule-title" style={{ fontSize: '17px', fontWeight: 800, color: C.pointGold, marginBottom: '4px' }}>{t.rules[4][0]}</div>
                <div className="abam-rule-desc" style={{ fontSize: '15px', color: C.textSub, lineHeight: 1.75 }}>{t.rules[4][1]}</div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 7. 100% 현장 직접 대면결제 원칙 ── */}
        <section id="safety" style={section}>
          <div className="abam-card" style={{ borderLeft: `5px solid ${C.pointRed}`, textAlign: 'left', padding: '22px 20px' }}>
            <h3 className="abam-rule-title" style={{ color: '#ffffff', fontSize: '19px', fontWeight: 800, margin: '0 0 10px' }}>
              {t.safetyTitle}
            </h3>
            <div className="abam-rule-desc" style={{ fontSize: '16px', color: '#e2e8f0', lineHeight: 1.8, wordBreak: 'keep-all' }}>
              {t.safety1}<br />
              {t.safety2}
            </div>
          </div>
        </section>

        {/* ── 화보 2: 천연 에센셜 오일 테라피 ── */}
        <div className="abam-photo-banner">
          <Image
            src="/images/sensual_back.jpg"
            alt={t.altAroma}
            fill
            sizes="(max-width: 640px) 100vw, 860px"
            style={{ objectFit: 'cover' }}
          />
        </div>

        {/* ── 8. 이용 절차 안내 ── */}
        <section id="guide" style={section}>
          {head(x.guideTitle, t.guideSub)}
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '10px', marginBottom: '12px' }}>
            {c.info.map((p, i) => (
              <div key={i} className="abam-card" style={{ borderLeft: `4px solid ${C.pointGold}`, padding: '16px 16px' }}>
                <div style={{ fontSize: '16.5px', fontWeight: 800, color: '#ffffff' }}>{p.title}</div>
                <div style={{ fontSize: '14px', color: '#cbd5e1', marginTop: '6px', lineHeight: 1.5 }}>{p.sub}</div>
              </div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '10px' }}>
            {x.steps.map((s, i) => (
              <div key={i} className="abam-card" style={{ padding: '16px 10px', textAlign: 'center' }}>
                <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: 'rgba(212, 175, 55, 0.15)', border: `1px solid ${C.pointGold}`, color: C.pointGold, fontWeight: 800, fontSize: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px' }}>{i + 1}</div>
                <div style={{ fontSize: '14.5px', fontWeight: 800, color: '#ffffff', lineHeight: 1.4 }}>{s}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── 화보 3: 프라이빗 1:1 케어 ── */}
        <div className="abam-photo-banner">
          <Image
            src="/images/sensual_touch.jpg"
            alt={t.altCare}
            fill
            sizes="(max-width: 640px) 100vw, 860px"
            style={{ objectFit: 'cover' }}
          />
        </div>

        {/* ── 9. 고객 후기 ── */}
        <section id="reviews" style={section}>
          {head(c.reviewSection.title, t.reviewsSub)}
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {c.reviews.map((rev, i) => (
              <figure key={i} className="abam-card" style={{ margin: 0, padding: '18px 20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ color: C.pointGold, fontSize: '13px', letterSpacing: '1px' }}>★★★★★</span>
                  <span style={{ fontSize: '13.5px', color: C.pointGold, fontWeight: 700 }}>{rev.course}</span>
                </div>
                <blockquote className="abam-review-text" style={{ margin: 0, fontSize: '15.5px', color: '#e2e8f0', lineHeight: 1.75, wordBreak: 'keep-all' }}>
                  {rev.text}
                </blockquote>
                <figcaption style={{ fontSize: '13px', color: C.textMuted, marginTop: '10px' }}>
                  <span style={{ color: '#ffffff', fontWeight: 600 }}>{rev.author}</span> · {rev.area}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* ── 10. 자주 묻는 질문 FAQ ── */}
        <section id="faq" style={section}>
          {head(c.faqSection.title, c.faqSection.sub)}
          
          <div className="abam-card" style={{ overflow: 'hidden', padding: 0 }}>
            {c.faqs.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={i} style={{ borderTop: i ? `1px solid ${C.line}` : 'none', background: isOpen ? 'rgba(20, 30, 55, 0.4)' : 'transparent' }}>
                  <button onClick={() => setOpenFaq(isOpen ? null : i)} aria-expanded={isOpen} style={{ width: '100%', padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', textAlign: 'left', gap: '8px', background: 'none', border: 'none', cursor: 'pointer' }}>
                    <span className="abam-faq-q" style={{ fontSize: '16px', fontWeight: 800, color: isOpen ? C.pointGold : '#ffffff' }}>{faq.q}</span>
                    <span style={{ fontSize: '18px', color: C.pointGold, fontWeight: 800 }}>{isOpen ? '−' : '+'}</span>
                  </button>
                  {isOpen && (
                    <div className="abam-faq-a" style={{ margin: '0 16px 16px', padding: '14px 16px', background: '#0d111d', borderLeft: `3px solid ${C.pointGold}`, borderRadius: '6px', fontSize: '15px', color: C.textSub, lineHeight: 1.75, whiteSpace: 'pre-line', wordBreak: 'keep-all' }}>
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* ── 11. SEO 본문 안내 ── */}
        <section id="about" style={{ marginTop: '38px', paddingTop: '22px', borderTop: `1px solid ${C.line}`, paddingLeft: '8px', paddingRight: '8px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 800, color: '#ffffff', margin: '0 0 10px' }}>{c.about.title}</h2>
          <div style={{ fontSize: '14px', color: C.textMuted, lineHeight: 1.8, wordBreak: 'keep-all' }}>
            <p style={{ margin: '0 0 10px' }}>{c.about.p1}</p>
            <p style={{ margin: 0 }}>
              {c.about.p2}
              {isKo && (
                <>
                  {' '}지역별 안내는 <Link href="/keywords" style={{ color: '#ffffff', fontWeight: 700, textDecoration: 'underline' }}>서울·경기 지역별 안내</Link>에서, 이용 방법은 <Link href="/guide" style={{ color: '#ffffff', fontWeight: 700, textDecoration: 'underline' }}>이용 가이드</Link>에서 확인하실 수 있습니다.
                </>
              )}
            </p>
          </div>
        </section>

        {/* ── 12. 푸터 & 지역 네트워크 링크 ── */}
        <footer style={{ marginTop: '30px', paddingTop: '22px', borderTop: `1px solid ${C.line}`, paddingBottom: '28px', paddingLeft: '8px', paddingRight: '8px' }}>
          <div style={{ fontSize: '15px', fontWeight: 800, color: '#ffffff', marginBottom: '8px' }}>{c.footer.title}</div>
          <p style={{ fontSize: '13px', color: C.textMuted, lineHeight: 1.65, margin: '0 0 14px', wordBreak: 'keep-all' }}>{c.footer.sub}</p>
          {areaLinks && areaLinks.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 10px', fontSize: '12px', marginBottom: '16px' }}>
              {areaLinks.slice(0, 80).map((area, i) => (
                <Link key={i} href={`/seo/${encodeURIComponent(area)}`} style={{ textDecoration: 'none', color: i < 5 ? '#f59e0b' : '#94a3b8', fontWeight: i < 5 ? 700 : 400 }}>{area}</Link>
              ))}
            </div>
          )}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 14px', fontSize: '12.5px', margin: '14px 0', padding: '12px 0', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <Link href="/keywords" style={{ color: '#fef08a', textDecoration: 'none', fontWeight: 800 }}>전체 570+ 지역별 안내 →</Link>
            <Link href="/regions/seoul" style={{ color: '#cbd5e1', textDecoration: 'none', fontWeight: 600 }}>서울 25개 자치구 안내</Link>
            <Link href="/regions/gyeonggi-south" style={{ color: '#cbd5e1', textDecoration: 'none', fontWeight: 600 }}>경기 남부 (수원·분당·평택)</Link>
            <Link href="/regions/gyeonggi-north" style={{ color: '#cbd5e1', textDecoration: 'none', fontWeight: 600 }}>경기 북부 (일산·파주·남양주)</Link>
            <Link href="/regions/incheon-bucheon" style={{ color: '#cbd5e1', textDecoration: 'none', fontWeight: 600 }}>인천·부천 권역 안내</Link>
            <Link href="/guide/chuljang-massage-price" style={{ color: '#94a3b8', textDecoration: 'none' }}>출장마사지 정찰 가격표</Link>
            <Link href="/guide/outcall-massage-scam-prevention-comparison" style={{ color: '#94a3b8', textDecoration: 'none' }}>선입금 사기 예방 가이드</Link>
            <Link href="/guide/outcall-massage-platform-ranking-comparison" style={{ color: '#94a3b8', textDecoration: 'none' }}>플랫폼 순위 및 비교</Link>
            <Link href="/guide/late-night-massage" style={{ color: '#94a3b8', textDecoration: 'none' }}>심야 방문 케어 안내</Link>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '8px', margin: '14px 0 10px', padding: '10px 12px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.08)' }}>
            <span style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 700 }}>Language:</span>
            <div style={{ display: 'flex', gap: '6px' }}>
              {LANGS.map((l) => (
                <Link
                  key={l.code}
                  href={l.href}
                  style={{
                    fontSize: '12px',
                    fontWeight: 800,
                    padding: '3px 8px',
                    borderRadius: '4px',
                    textDecoration: 'none',
                    color: l.code === c.lang ? '#070a14' : '#cbd5e1',
                    background: l.code === c.lang ? '#d4af37' : 'rgba(255,255,255,0.06)',
                    border: `1px solid ${l.code === c.lang ? '#d4af37' : 'rgba(255,255,255,0.1)'}`,
                  }}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
          <div style={{ fontSize: '12px', color: '#64748b', lineHeight: 1.65 }}>{c.footer.line}</div>
        </footer>

      </main>

      {/* ── 13. [루미노케이 벤치마크] 하단 고정 듀얼 액션 독 (샴페인 골드 실시간 예약 + 크림슨 레드 상담전화) ── */}
      <div className="abam-bottom-bar">
        <div style={{ maxWidth: '860px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '12px' }}>
          {isKo ? (
            <button
              type="button"
              onClick={() => setSmsModal(true)}
              className="abam-bottom-btn"
              style={{
                ...btn,
                background: 'linear-gradient(135deg, #d4af37 0%, #b89628 100%)',
                color: '#070a14',
                fontSize: '16.5px',
                fontWeight: 900,
                padding: '15px 0',
                borderRadius: '8px',
                boxShadow: '0 4px 18px rgba(212, 175, 55, 0.3)',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              <SmsIcon size={20} /> {t.smsBar}
            </button>
          ) : (
            <a
              href={WA_LINK}
              target="_blank"
              rel="noreferrer"
              className="abam-bottom-btn"
              style={{
                ...btn,
                background: '#25D366',
                color: '#ffffff',
                fontSize: '16.5px',
                fontWeight: 800,
                padding: '15px 0',
                borderRadius: '8px',
              }}
            >
              {c.cta.whatsapp}
            </a>
          )}
          {isKo ? (
            <a
              href={`tel:${c.contact.phone.replace(/[^0-9]/g, '')}`}
              className="abam-bottom-btn"
              style={{
                ...btn,
                background: C.pointRed,
                color: '#ffffff',
                fontSize: '16.5px',
                fontWeight: 900,
                padding: '15px 0',
                borderRadius: '8px',
                boxShadow: '0 4px 18px rgba(220, 38, 38, 0.35)',
                border: 'none',
              }}
            >
              <PhoneIcon size={20} /> {t.callBar}
            </a>
          ) : (
            <a
              href={c.contact.tel}
              className="abam-bottom-btn"
              style={{
                ...btn,
                background: C.pointRed,
                color: '#ffffff',
                fontSize: '16.5px',
                fontWeight: 800,
                padding: '15px 0',
                borderRadius: '8px',
                boxShadow: '0 4px 18px rgba(220, 38, 38, 0.35)',
              }}
            >
              <PhoneIcon size={20} /> {t.callBar}
            </a>
          )}
        </div>
      </div>

    </div>
  );
}
