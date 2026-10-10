'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { KAKAO_ID, type LandingContent } from '../lib/landing-content';

const KAKAO_LINK = 'kakaotalk://';
const WA_LINK =
  'https://wa.me/821066072239?text=Hello%20Abam.kr,%20I%20would%20like%20to%20inquire%20about%20your%20private%201:1%20home%20care%20service.';

/* 실제 한국 상용 사이트 표준 디자인 토큰 — 깊은 다크 배경 + 솔리드 포인트 컬러 */
const C = {
  bg: '#0c0d11',
  cardBg: '#15171e',
  cardBgAlt: '#1c1f28',
  line: '#282b36',
  lineLight: '#3a3f50',
  text: '#ffffff',
  textSub: '#cbd5e1',
  textMuted: '#94a3b8',
  pointRed: '#e11d48',      // 강렬한 직관적 통화/강조 레드
  pointGold: '#f59e0b',     // 단색 웜 골드/옐로우 (그라데이션 제거)
  pointGreen: '#10b981',    // 후불제 신뢰 그린
  kakao: '#fee500',
  kakaoText: '#181600',
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
    h1a: '출장안마 · 출장마사지 24시 아밤',
    h1b: '20대 ACE가 문 앞으로 찾아갑니다',
    status: { open: '지금 영업 중 · 바로 상담 가능', pre: '예약 접수 중 · 19:00 영업 시작', closed: '예약은 18:00부터 · 영업 19:00~05:00' },
    nav: ['소개말', '코스안내', '방문·결제', '고객후기', '자주묻는질문'],
    priceNote: '60분 기준 · 전체 정찰제 요금',
    guideTitle: '이용 안내',
    steps: ['카톡·전화로 예약', '코스·주소·시간 전달', '30분 내 방문 1:1 케어'],
    modalTitle: '아밤 24시 예약 및 상담',
    modalBody: '카톡 또는 문자로 편하게 남겨주시면 바로 안내해 드립니다.',
    callNow: '전화 바로연결',
  },
  en: {
    h1a: 'Tonight, a private massage',
    h1b: 'comes to your door',
    status: { open: 'Open now · Message us anytime', pre: 'Booking open · Service starts 19:00', closed: 'Booking from 18:00 · Open 19:00–05:00' },
    nav: ['Intro', 'Courses', 'Visit/Pay', 'Reviews', 'FAQ'],
    priceNote: 'Per 60 min · all transparent prices',
    guideTitle: 'How it works',
    steps: ['Message or call us', 'Confirm course, place, time', '1:1 care at your location'],
    modalTitle: 'Book your private care',
    modalBody: 'Message us on WhatsApp or call directly.',
    callNow: 'Call now',
  },
  jp: {
    h1a: '今夜、プライベートな癒しが',
    h1b: 'あなたの元へ伺います',
    status: { open: '営業中 · すぐにご相談いただけます', pre: '予約受付中 · 19:00より営業', closed: '予約は18:00から · 営業19:00〜05:00' },
    nav: ['紹介', 'コース', '利用案内', 'レビュー', 'よくある質問'],
    priceNote: '60分の料金 · 全料金表示',
    guideTitle: 'ご利用案内',
    steps: ['メッセージまたはお電話', 'コース・場所・時間を確定', 'ご希望の場所で1:1ケア'],
    modalTitle: 'ご予約・ご相談',
    modalBody: 'WhatsAppまたはお電話でご連絡ください。',
    callNow: '電話する',
  },
  cn: {
    h1a: '今晚，私人专属护理',
    h1b: '上门为您服务',
    status: { open: '营业中 · 可立即咨询', pre: '接受预约 · 19:00开始营业', closed: '18:00起接受预约 · 营业19:00–05:00' },
    nav: ['介绍', '项目', '须知', '评价', '常见问题'],
    priceNote: '60分钟价格 · 查看全部',
    guideTitle: '预约须知',
    steps: ['留言或来电咨询', '确认项目、地点、时间', '在您指定的地点1:1服务'],
    modalTitle: '预约咨询',
    modalBody: '请通过WhatsApp留言或直接来电。',
    callNow: '立即致电',
  },
};

const KakaoIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M12 3C7.03 3 3 6.36 3 10.5c0 2.63 1.58 4.96 4 6.37L6 20l3.5-2.1c.8.17 1.63.26 2.5.26 4.97 0 9-3.36 9-7.5S16.97 3 12 3z" fill={C.kakaoBr} />
  </svg>
);

const PhoneIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.02-.24 11.72 11.72 0 003.68.59 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.59 3.68a1 1 0 01-.24 1.02l-2.23 2.09z" />
  </svg>
);

// 화면 전체에 은은하게 반짝이는 별들의 고정 좌표 데이터
const STARS = [
  { t: '6%', l: '10%', s: 2, d: '0s', dur: '3.1s' },
  { t: '12%', l: '42%', s: 2.5, d: '0.8s', dur: '4.2s' },
  { t: '5%', l: '76%', s: 2, d: '1.5s', dur: '2.9s' },
  { t: '20%', l: '88%', s: 3, d: '0.3s', dur: '3.7s' },
  { t: '26%', l: '18%', s: 1.5, d: '2.1s', dur: '4.5s' },
  { t: '34%', l: '64%', s: 2.5, d: '1.1s', dur: '3.2s' },
  { t: '40%', l: '28%', s: 2, d: '2.7s', dur: '3.8s' },
  { t: '46%', l: '84%', s: 2, d: '0.5s', dur: '4.1s' },
  { t: '54%', l: '9%', s: 2.5, d: '1.8s', dur: '3.5s' },
  { t: '60%', l: '52%', s: 1.5, d: '0.9s', dur: '3.0s' },
  { t: '66%', l: '94%', s: 3, d: '2.3s', dur: '4.0s' },
  { t: '74%', l: '22%', s: 2, d: '1.2s', dur: '3.6s' },
  { t: '80%', l: '68%', s: 2.5, d: '0.2s', dur: '4.3s' },
  { t: '86%', l: '35%', s: 1.5, d: '1.9s', dur: '3.3s' },
  { t: '92%', l: '82%', s: 2, d: '2.5s', dur: '3.9s' },
  { t: '16%', l: '30%', s: 2, d: '1.7s', dur: '3.6s' },
  { t: '50%', l: '38%', s: 2.5, d: '0.6s', dur: '4.4s' },
  { t: '78%', l: '5%', s: 2, d: '2.0s', dur: '3.2s' },
  { t: '9%', l: '92%', s: 1.5, d: '1.4s', dur: '3.8s' },
  { t: '64%', l: '76%', s: 2.5, d: '2.8s', dur: '4.7s' },
];

export default function AbamLanding({ c, areaLinks }: { c: LandingContent; areaLinks?: string[] }) {
  const isKo = c.lang === 'ko';
  const x = EXTRA[c.lang];
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [kakaoModal, setKakaoModal] = useState(false);
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

  const copyKakao = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(KAKAO_ID).catch(() => {});
    }
  };

  const handleBook = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isKo) copyKakao();
    setKakaoModal(true);
  };

  const handleMain = isKo ? handleBook : undefined;

  const copyId = () => {
    copyKakao();
    setToast(c.modal.copied);
    setTimeout(() => setToast(null), 2000);
  };

  // 주차장, 현관비번, 호텔1층 미팅, 결제수단(현금/이체/카드) 포함 오리지널 템플릿
  const BOOKING_TEMPLATE = `[아밤(Abam) 1:1 빠른 예약 신청]
• 희망 코스: (타이 / 아로마 / 스페셜 / 시간)
• 방문 주소: (예: 강남구 역삼동 OOO)
• 주차장 유무: (있음 / 없음 / 주차장 도착시 호출 요망)
• 공동현관: (비밀번호 기재 또는 도착 시 세대 호출벨)
• 호텔·모텔: (1층 로비 픽업 및 결제 or 객실 앞 방문)
• 결제 방식: (현금 / 계좌이체 / 카드)`;

  const SMS_BODY = encodeURIComponent(
`[아밤 예약신청]
1. 코스: 
2. 방문주소/호수: 
3. 주차장유무(도착시호출): 
4. 현관비번(세대호출): 
5. 호텔1층 픽업여부: 
6. 결제(현금/이체/카드): 
(차량 이동 특성상 주차장 도착시 호출드리며 호텔은 1층 픽업 및 결제 가능합니다. 100% 현장 후불제)`
  );
  const SMS_HREF = `sms:01066072239?body=${SMS_BODY}`;

  const copyTemplate = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(BOOKING_TEMPLATE).catch(() => {});
      setToast('📋 예약 양식이 복사되었습니다. 카톡/문자에 붙여넣어 주세요.');
      setTimeout(() => setToast(null), 2500);
    }
  };

  const bookHref = isKo ? KAKAO_LINK : WA_LINK;
  const bookExtra = isKo ? {} : { target: '_blank', rel: 'noreferrer' };
  const bookBg = isKo ? C.kakao : '#25D366';
  const bookFg = isKo ? C.kakaoText : '#ffffff';
  const bookLabel = isKo ? c.cta.kakao : c.cta.whatsapp;

  const card: React.CSSProperties = {
    background: C.cardBg,
    border: `1px solid ${C.line}`,
    borderRadius: '8px',
  };

  const btn: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    fontWeight: 700,
    borderRadius: '6px',
    textDecoration: 'none',
    cursor: 'pointer',
    transition: 'opacity 0.15s ease',
  };

  const section: React.CSSProperties = { marginTop: '44px', scrollMarginTop: '70px' };

  /* 직관적이고 깔끔한 한국형 섹션 타이틀 (영문 세리프 및 불필요한 장식 제거) */
  const head = (title: string, sub?: string) => (
    <div style={{ marginBottom: '16px', borderLeft: `4px solid ${C.pointRed}`, paddingLeft: '12px' }}>
      <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#ffffff', margin: 0, letterSpacing: '-0.3px' }}>{title}</h2>
      {sub && <p style={{ fontSize: '13px', color: C.textMuted, margin: '4px 0 0' }}>{sub}</p>}
    </div>
  );

  return (
    <div lang={c.htmlLang} style={{ position: 'relative', minHeight: '100vh', background: C.bg, color: C.text, fontFamily: FONT, paddingBottom: '88px', lineHeight: 1.6 }}>
      
      {/* ── 키프레임 애니메이션: 별 반짝임, 상태 펄스 ── */}
      <style>{`
        html { scroll-behavior: smooth; font-family: ${FONT}; }
        @keyframes abamTwinkle {
          0%, 100% { opacity: 0.15; transform: scale(0.7); }
          50% { opacity: 0.95; transform: scale(1.2); }
        }
        @keyframes abamPulse {
          0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); }
          70% { box-shadow: 0 0 0 6px rgba(16, 185, 129, 0); }
          100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
        }
      `}</style>

      {/* ── 전체 페이지 밤하늘 고정 배경 + 반짝이는 별 애니메이션 레이어 ── */}
      <div aria-hidden="true" style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(12,13,17,0.7), rgba(12,13,17,0.95)), url(/images/seoul-night.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
        {STARS.map((star, idx) => (
          <div
            key={idx}
            style={{
              position: 'absolute',
              top: star.t,
              left: star.l,
              width: `${star.s}px`,
              height: `${star.s}px`,
              borderRadius: '50%',
              backgroundColor: '#ffffff',
              boxShadow: `0 0 ${star.s * 2}px #fef08a`,
              animation: `abamTwinkle ${star.dur} ease-in-out infinite`,
              animationDelay: star.d,
            }}
          />
        ))}
      </div>

      {/* 토스트 */}
      {toast && (
        <div style={{ position: 'fixed', top: '16px', left: '50%', transform: 'translateX(-50%)', background: '#1e293b', border: `1px solid ${C.lineLight}`, color: '#ffffff', padding: '10px 20px', borderRadius: '6px', fontSize: '13px', fontWeight: 700, zIndex: 99999, boxShadow: '0 8px 24px rgba(0,0,0,0.8)' }}>
          {toast}
        </div>
      )}

      {/* ── 직관적이고 깔끔한 단일 예약 상담 모달 (AI스러운 중첩 박스 전면 제거) ── */}
      {kakaoModal && (
        <div onClick={() => setKakaoModal(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.82)', zIndex: 99998, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: '#161820', border: `1px solid ${C.lineLight}`, borderRadius: '10px', maxWidth: '380px', width: '100%', padding: '24px 20px', textAlign: 'center', boxShadow: '0 20px 45px rgba(0,0,0,0.9)' }}>
            
            {/* 모달 헤더 */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <div style={{ fontSize: '18px', fontWeight: 800, color: '#ffffff' }}>{isKo ? '아밤(Abam) 24시 빠른 예약' : x.modalTitle}</div>
              <button onClick={() => setKakaoModal(false)} style={{ background: 'transparent', border: 'none', color: C.textMuted, fontSize: '20px', cursor: 'pointer', lineHeight: 1, padding: '2px 6px' }}>✕</button>
            </div>
            
            <p style={{ fontSize: '13px', color: C.textSub, margin: '0 0 18px', textAlign: 'left' }}>
              {isKo ? '원하시는 상담 방식을 선택하시면 관리자에게 즉시 연결됩니다.' : x.modalBody}
            </p>

            {/* 메인 3대 액션 버튼 (직관적인 원터치 연결) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '9px', marginBottom: '16px' }}>
              <a href={bookHref} {...bookExtra} onClick={() => { copyKakao(); setKakaoModal(false); }} style={{ ...btn, background: bookBg, color: bookFg, fontSize: '15px', padding: '13px 0' }}>
                {isKo ? <><KakaoIcon size={18} />카카오톡 실시간 상담 (ID: {KAKAO_ID})</> : c.cta.whatsapp}
              </a>

              {isKo && (
                <a href={SMS_HREF} onClick={() => setKakaoModal(false)} style={{ ...btn, background: '#272935', border: `1px solid ${C.lineLight}`, color: '#ffffff', fontSize: '14.5px', padding: '12px 0' }}>
                  ✉️ 문자메시지로 간편 예약하기
                </a>
              )}

              <a href={c.contact.tel} onClick={() => setKakaoModal(false)} style={{ ...btn, background: C.pointRed, color: '#ffffff', fontSize: '15px', padding: '13px 0' }}>
                <PhoneIcon size={18} /> {c.contact.phone} 24시 전화 상담
              </a>
            </div>

            {/* 핵심 필수 안내 (1개의 단정한 카드) */}
            {isKo && (
              <div style={{ background: '#1c1f2b', border: `1px solid ${C.line}`, borderRadius: '6px', padding: '12px 14px', textAlign: 'left', fontSize: '12.5px', lineHeight: 1.65, color: '#cbd5e1' }}>
                <div style={{ color: C.pointGold, fontWeight: 700, marginBottom: '4px' }}>※ 필수 이용 수칙 (100% 현장 후불제)</div>
                <div>• 선입금·예약금·출발비 일절 요구하지 않습니다.</div>
                <div>• 주차장 도착 시 전화 / 호텔·모텔은 1층 미팅</div>
                <div>• 결제는 만나뵙고 현금 · 계좌이체 · 카드 모두 가능</div>
              </div>
            )}

            <button onClick={() => setKakaoModal(false)} style={{ marginTop: '14px', width: '100%', padding: '10px 0', background: 'transparent', color: C.textMuted, fontSize: '13px', border: `1px solid ${C.line}`, borderRadius: '6px', cursor: 'pointer' }}>
              {c.modal.close}
            </button>
          </div>
        </div>
      )}

      {/* ── 1. 상단 헤더: 좌측 로고 & 상단 우측 메뉴 배치 (깔끔한 표준 UI) ── */}
      <header style={{ position: 'sticky', top: 0, zIndex: 40, background: 'rgba(12,13,17,0.96)', borderBottom: `1px solid ${C.line}` }}>
        <div style={{ maxWidth: '680px', margin: '0 auto', padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          
          <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '20px', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.5px' }}>
              Abam<span style={{ color: C.pointRed }}>.kr</span>
            </span>
            <span style={{ fontSize: '11px', fontWeight: 700, color: C.pointGold, border: `1px solid ${C.lineLight}`, background: 'rgba(245,158,11,0.08)', padding: '2px 6px', borderRadius: '4px' }}>
              100% 후불제
            </span>
          </Link>

          {/* 우측 메뉴 (도도안마 표준 우측 정렬 내비게이션) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <nav style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
              <a href="#intro" style={{ color: C.textSub, fontSize: '13px', fontWeight: 600, textDecoration: 'none', padding: '6px 7px' }}>소개말</a>
              <a href="#price" style={{ color: '#ffffff', fontSize: '13px', fontWeight: 700, textDecoration: 'none', padding: '6px 7px' }}>코스안내</a>
              <a href="#rules" style={{ color: C.textSub, fontSize: '13px', fontWeight: 600, textDecoration: 'none', padding: '6px 7px' }}>방문안내</a>
              <a href="#reviews" style={{ color: C.textSub, fontSize: '13px', fontWeight: 600, textDecoration: 'none', padding: '6px 7px' }}>후기</a>
              <a href="#caution" style={{ color: '#f87171', fontSize: '13px', fontWeight: 700, textDecoration: 'none', padding: '6px 7px' }}>선입금주의</a>
            </nav>
            <div style={{ display: 'flex', gap: '6px', fontSize: '11px', borderLeft: `1px solid ${C.line}`, paddingLeft: '8px' }}>
              {LANGS.map((l) =>
                l.code === c.lang ? (
                  <span key={l.code} style={{ color: C.pointGold, fontWeight: 800 }}>{l.label}</span>
                ) : (
                  <Link key={l.code} href={l.href} style={{ color: C.textMuted, textDecoration: 'none' }}>{l.label}</Link>
                ),
              )}
            </div>
          </div>
        </div>
      </header>

      {/* ── 메인 콘텐츠 ── */}
      <main style={{ position: 'relative', zIndex: 1, maxWidth: '640px', margin: '0 auto', padding: '0 16px' }}>

        {/* ── 2. 히어로 섹션 ── */}
        <section style={{ padding: '32px 0 0', textAlign: 'center' }}>
          
          {/* 영업 상태 인디케이터 */}
          {status && (
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#171922', border: `1px solid ${C.lineLight}`, borderRadius: '20px', padding: '5px 14px', fontSize: '12px', fontWeight: 600, color: C.textSub, marginBottom: '16px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: status === 'closed' ? C.pointGold : '#10b981', animation: status === 'closed' ? 'none' : 'abamPulse 1.8s infinite' }} />
              {x.status[status]}
            </div>
          )}

          <h1 style={{ fontSize: '25px', fontWeight: 800, lineHeight: 1.35, color: '#ffffff', margin: '0 0 10px', letterSpacing: '-0.5px' }}>
            {x.h1a}<br />
            <span style={{ color: C.pointRed }}>{x.h1b}</span>
          </h1>

          <p style={{ fontSize: '14px', color: C.textSub, margin: '0 0 18px', fontWeight: 500 }}>
            {c.hero.bannerSub.join(' · ')} · {c.hero.tagline}
          </p>

          {/* 핵심 안심 서비스 4대 포인트 배너 (인위적인 하트 제거, 단정하고 직관적인 그리드) */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '8px', maxWidth: '480px', margin: '0 auto 20px', textAlign: 'left' }}>
            <div style={{ background: C.cardBg, border: `1px solid ${C.line}`, borderRadius: '6px', padding: '9px 12px', fontSize: '13px', color: '#e2e8f0', fontWeight: 600 }}>
              <span style={{ color: C.pointRed, marginRight: '6px', fontWeight: 800 }}>✓</span> 100% 현장 후불제
            </div>
            <div style={{ background: C.cardBg, border: `1px solid ${C.line}`, borderRadius: '6px', padding: '9px 12px', fontSize: '13px', color: '#e2e8f0', fontWeight: 600 }}>
              <span style={{ color: C.pointRed, marginRight: '6px', fontWeight: 800 }}>✓</span> 20대 전문 에이스 힐러
            </div>
            <div style={{ background: C.cardBg, border: `1px solid ${C.line}`, borderRadius: '6px', padding: '9px 12px', fontSize: '13px', color: '#e2e8f0', fontWeight: 600 }}>
              <span style={{ color: C.pointRed, marginRight: '6px', fontWeight: 800 }}>✓</span> 서울·경기 전지역 30분 내
            </div>
            <div style={{ background: C.cardBg, border: `1px solid ${C.line}`, borderRadius: '6px', padding: '9px 12px', fontSize: '13px', color: '#e2e8f0', fontWeight: 600 }}>
              <span style={{ color: C.pointGreen, marginRight: '6px', fontWeight: 800 }}>✓</span> 현금 · 계좌이체 · 카드 결제
            </div>
          </div>

          {/* 직관적인 대표 전화연결 버튼 (단단한 사각형 룩앤필) */}
          <div style={{ marginBottom: '12px' }}>
            <a
              href={c.contact.tel}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                background: C.pointRed,
                color: '#ffffff',
                fontWeight: 800,
                fontSize: '20px',
                padding: '14px 32px',
                borderRadius: '8px',
                textDecoration: 'none',
                boxShadow: '0 4px 14px rgba(225, 29, 72, 0.35)',
              }}
            >
              <PhoneIcon size={20} /> {c.contact.phone}
            </a>
            <div style={{ fontSize: '12px', color: C.textMuted, marginTop: '6px' }}>
              터치 시 24시간 실시간 전화로 즉시 연결됩니다
            </div>
          </div>

          {/* 카카오톡 & 문자 간편 예약 버튼군 */}
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '8px' }}>
            <a
              href={bookHref}
              {...bookExtra}
              onClick={handleMain}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                background: bookBg,
                color: bookFg,
                fontWeight: 700,
                fontSize: '14px',
                padding: '11px 20px',
                borderRadius: '6px',
                textDecoration: 'none',
              }}
            >
              {isKo && <KakaoIcon size={16} />}{bookLabel} ({KAKAO_ID})
            </a>

            {isKo && (
              <a
                href={SMS_HREF}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  background: '#232632',
                  border: `1px solid ${C.lineLight}`,
                  color: '#ffffff',
                  fontWeight: 700,
                  fontSize: '14px',
                  padding: '11px 20px',
                  borderRadius: '6px',
                  textDecoration: 'none',
                }}
              >
                ✉️ 문자로 간편 예약
              </a>
            )}
          </div>
          <div style={{ fontSize: '12px', color: C.textMuted, marginBottom: '20px' }}>
            통화가 곤란하신 경우 카톡이나 일반 문자(SMS)로 남겨주시면 즉시 답변드립니다.
          </div>

          {/* 히어로 실사 모델 화보 */}
          <div style={{ position: 'relative', width: '100%', height: '280px', borderRadius: '8px', overflow: 'hidden', border: `1px solid ${C.line}` }}>
            <Image
              src="/images/abam_hero_seductive.jpg"
              alt="아밤 24시 출장마사지 힐링 케어"
              fill
              sizes="(max-width: 640px) 100vw, 640px"
              style={{ objectFit: 'cover' }}
              priority
            />
          </div>
        </section>

        {/* ── 3. 출장안마 서비스 안내 ── */}
        <section id="intro" style={section}>
          {head('출장안마 서비스 안내', '서울·경기 전지역 100% 현장 후불제')}
          <div style={{ ...card, padding: '18px 20px', fontSize: '13.5px', color: '#cbd5e1', lineHeight: 1.8 }}>
            <p style={{ margin: '0 0 10px' }}>
              출장안마는 고객님이 계신 곳(자택, 아파트, 오피스텔, 호텔, 모텔)으로 전문 힐러가 직접 찾아가는 1:1 방문 맞춤 마사지 케어 서비스입니다.
            </p>
            <p style={{ margin: '0 0 10px' }}>
              아밤(Abam)은 선입금, 예약금, 출발비 등을 절대 요구하지 않는 <strong>100% 후불 결제 원칙</strong>을 준수합니다. 매니저가 현장에 도착하여 고객님과 직접 대면한 후 결제가 진행되므로 안심하고 이용하실 수 있습니다.
            </p>
            <p style={{ margin: 0 }}>
              과중한 업무와 일상에서 지친 심신을 가장 편안하고 익숙한 프라이빗 공간에서 최고의 힐링으로 채워드립니다.
            </p>
          </div>
        </section>

        {/* ── 4. 코스 및 정찰 가격표 (3대 코스 + 하단 화보) ── */}
        <section id="price" style={section}>
          {head('코스 안내 및 정찰 가격표', '선입금 없는 100% 현장 후불 결제')}
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {c.courses.map((course) => (
              <article key={course.no} style={{ ...card, overflow: 'hidden' }}>
                <div style={{ padding: '12px 16px', background: '#1c1f2b', borderBottom: `1px solid ${C.line}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ background: C.pointRed, color: '#ffffff', fontWeight: 800, fontSize: '11px', padding: '2px 8px', borderRadius: '4px' }}>
                      {course.no === 1 ? 'A코스' : course.no === 2 ? 'B코스' : 'C코스'}
                    </span>
                    <strong style={{ fontSize: '16px', color: '#ffffff' }}>{course.name} 코스</strong>
                  </div>
                  <span style={{ fontSize: '12.5px', color: C.pointGold, fontWeight: 700 }}>{course.subtitle}</span>
                </div>
                <div style={{ padding: '14px 16px' }}>
                  <p style={{ fontSize: '13px', color: C.textSub, margin: '0 0 12px', lineHeight: 1.6 }}>{course.desc}</p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '8px' }}>
                    {course.prices.map((pr, pi) => (
                      <div key={pi} style={{ textAlign: 'center', border: `1px solid ${C.line}`, background: '#101218', borderRadius: '6px', padding: '9px 4px' }}>
                        <div style={{ fontSize: '11.5px', color: C.textMuted }}>{c.priceSection.durations[pi]}</div>
                        <div style={{ fontSize: '15px', fontWeight: 800, color: '#ffffff', marginTop: '2px' }}>{pr}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* 코스 설명 하단 화보 */}
          <div style={{ marginTop: '16px', position: 'relative', width: '100%', height: '260px', borderRadius: '8px', overflow: 'hidden', border: `1px solid ${C.line}` }}>
            <Image
              src="/images/abam_penthouse_night.jpg"
              alt="서울의 밤 프라이빗 출장마사지 아밤"
              fill
              sizes="(max-width: 640px) 100vw, 640px"
              style={{ objectFit: 'cover' }}
            />
          </div>

          {/* 외국인 전용 VIP 요금 정책 안내 (다국어 페이지) */}
          {c.priceNotice && (
            <div style={{ ...card, marginTop: '14px', padding: '16px', border: `1px solid ${C.lineLight}` }}>
              <div style={{ display: 'inline-block', fontSize: '11px', fontWeight: 800, color: C.pointGold, background: 'rgba(245,158,11,0.12)', padding: '2px 6px', borderRadius: '4px', marginBottom: '8px' }}>
                {c.priceNotice.tag}
              </div>
              <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#ffffff', margin: '0 0 6px' }}>{c.priceNotice.title}</h3>
              <p style={{ fontSize: '12.5px', color: C.textSub, margin: '0 0 10px' }}>{c.priceNotice.desc}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {c.priceNotice.reasons.map((r, ri) => (
                  <div key={ri} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', background: '#1c1f2b', padding: '9px 12px', borderRadius: '6px', borderLeft: `3px solid ${C.pointRed}` }}>
                    <span style={{ fontSize: '14px' }}>{r.icon}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '13px', fontWeight: 700, color: '#ffffff' }}>{r.title}</div>
                      <div style={{ fontSize: '12px', color: C.textSub }}>{r.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* ── 5. 방문 확인사항 및 결제 안내 (오리지널 3대 수칙) ── */}
        <section id="rules" style={section}>
          {head('방문 확인사항 및 결제 안내', '편안하고 안전한 방문을 위한 필수 체크')}
          
          <div style={{ ...card, padding: '16px 18px', borderLeft: `3px solid ${C.pointRed}` }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '14px', marginBottom: '6px' }}>
              <div>
                <div style={{ fontSize: '13.5px', fontWeight: 800, color: '#ffffff', marginBottom: '3px' }}>🚗 주차장 확인</div>
                <div style={{ fontSize: '12.5px', color: C.textSub, lineHeight: 1.6 }}>건물 내 주차장이 있으시면 도착해서 기사가 바로 전화드립니다.</div>
              </div>
              <div>
                <div style={{ fontSize: '13.5px', fontWeight: 800, color: '#ffffff', marginBottom: '3px' }}>🔔 공동현관 비번</div>
                <div style={{ fontSize: '12.5px', color: C.textSub, lineHeight: 1.6 }}>비번을 미리 남겨주시거나 도착 시 세대 호출벨을 누릅니다.</div>
              </div>
              <div>
                <div style={{ fontSize: '13.5px', fontWeight: 800, color: '#ffffff', marginBottom: '3px' }}>🏨 호텔·모텔 1층 미팅</div>
                <div style={{ fontSize: '12.5px', color: C.textSub, lineHeight: 1.6 }}>도착 전 기사가 미리 연락드리며, 1층 로비에서 결제 후 만나시면 됩니다.</div>
              </div>
              <div>
                <div style={{ fontSize: '13.5px', fontWeight: 800, color: C.pointGreen, marginBottom: '3px' }}>💳 100% 현장 후불 결제</div>
                <div style={{ fontSize: '12.5px', color: C.textSub, lineHeight: 1.6 }}>현금, 계좌이체, 카드 결제 모두 가능합니다. (선입금 일절 없음)</div>
              </div>
              <div style={{ gridColumn: 'span 2' }}>
                <div style={{ fontSize: '13.5px', fontWeight: 800, color: C.pointGold, marginBottom: '3px' }}>💬 카톡 &amp; 📱 문자 24시 예약 접수</div>
                <div style={{ fontSize: '12.5px', color: C.textSub, lineHeight: 1.6 }}>전화 통화 없이 카카오톡 또는 휴대폰 일반 문자로도 24시간 언제든 주소와 코스를 남겨주시면 바로 접수 및 안내드립니다.</div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 6. 선입금 주의 안내 (도도안마 YES! 스타일 안심 경고) ── */}
        <section id="caution" style={section}>
          <div style={{ background: '#1c1417', border: `1px solid ${C.pointRed}`, borderRadius: '8px', padding: '18px 16px', textAlign: 'center' }}>
            <h3 style={{ color: C.pointRed, fontSize: '16px', fontWeight: 800, margin: '0 0 8px' }}>
              아밤 출장안마 100% 안심 후불제 (선입금 사기 주의)
            </h3>
            <div style={{ fontSize: '13px', color: '#e2e8f0', lineHeight: 1.7, maxWidth: '520px', margin: '0 auto' }}>
              아밤은 선입금 없는 <strong>100% 현장 후불제</strong> 출장안마입니다.<br />
              예약금, 보증금, 출발비 등의 명목으로 사전에 입금을 요구하는 곳은 100% 사기입니다!<br /><br />
              서울·경기 전지역 자택 / 아파트 / 오피스텔 / 호텔 / 모텔<br />
              관리사 문 앞 도착 후 직접 만나뵙고 결제하는 정직한 안심 시스템입니다.
            </div>
          </div>
        </section>

        {/* ── 화보 2: 천연 에센셜 오일 테라피 ── */}
        <div style={{ marginTop: '16px', position: 'relative', width: '100%', height: '240px', borderRadius: '8px', overflow: 'hidden', border: `1px solid ${C.line}` }}>
          <Image
            src="/images/sensual_back.jpg"
            alt="천연 아로마 오일 테라피"
            fill
            sizes="(max-width: 640px) 100vw, 640px"
            style={{ objectFit: 'cover' }}
          />
        </div>

        {/* ── 7. 이용 안내 ── */}
        <section id="guide" style={section}>
          {head(x.guideTitle, '전화나 카톡 한 통으로 간편하게 예약')}
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '8px', marginBottom: '10px' }}>
            {c.info.map((p, i) => (
              <div key={i} style={{ ...card, borderLeft: `3px solid ${C.pointRed}`, padding: '12px' }}>
                <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#ffffff' }}>{p.title}</div>
                <div style={{ fontSize: '12px', color: C.textMuted, marginTop: '2px' }}>{p.sub}</div>
              </div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '8px' }}>
            {x.steps.map((s, i) => (
              <div key={i} style={{ ...card, padding: '12px 8px', textAlign: 'center' }}>
                <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: C.pointRed, color: '#ffffff', fontWeight: 800, fontSize: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 6px' }}>{i + 1}</div>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#ffffff' }}>{s}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── 화보 3: 프라이빗 1:1 케어 ── */}
        <div style={{ marginTop: '16px', position: 'relative', width: '100%', height: '240px', borderRadius: '8px', overflow: 'hidden', border: `1px solid ${C.line}` }}>
          <Image
            src="/images/sensual_touch.jpg"
            alt="프라이빗 1:1 맞춤 힐링 케어"
            fill
            sizes="(max-width: 640px) 100vw, 640px"
            style={{ objectFit: 'cover' }}
          />
        </div>

        {/* ── 8. 고객 후기 (11개 전체 표시) ── */}
        <section id="reviews" style={section}>
          {head(c.reviewSection.title, '실제 이용 고객님들의 진솔한 이용 후기 (100% 리얼)')}
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {c.reviews.map((rev, i) => (
              <figure key={i} style={{ ...card, margin: 0, padding: '14px 16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <span style={{ color: C.pointGold, fontSize: '11px', letterSpacing: '1px' }}>★★★★★</span>
                  <span style={{ fontSize: '12px', color: C.pointGold, fontWeight: 700 }}>{rev.course}</span>
                </div>
                <blockquote style={{ margin: 0, fontSize: '13px', color: '#e2e8f0', lineHeight: 1.65 }}>
                  {rev.text}
                </blockquote>
                <figcaption style={{ fontSize: '11.5px', color: C.textMuted, marginTop: '8px' }}>
                  <span style={{ color: '#ffffff', fontWeight: 700 }}>{rev.author}</span> · {rev.area}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* ── 9. 자주 묻는 질문 FAQ ── */}
        <section id="faq" style={section}>
          {head(c.faqSection.title, c.faqSection.sub)}
          
          <div style={{ ...card, overflow: 'hidden' }}>
            {c.faqs.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={i} style={{ borderTop: i ? `1px solid ${C.line}` : 'none', background: isOpen ? '#1a1d27' : 'transparent' }}>
                  <button onClick={() => setOpenFaq(isOpen ? null : i)} aria-expanded={isOpen} style={{ width: '100%', padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', textAlign: 'left', gap: '10px', background: 'none', border: 'none', cursor: 'pointer' }}>
                    <span style={{ fontSize: '14px', fontWeight: 700, color: isOpen ? C.pointGold : '#ffffff' }}>{faq.q}</span>
                    <span style={{ fontSize: '16px', color: C.pointRed, fontWeight: 700 }}>{isOpen ? '−' : '+'}</span>
                  </button>
                  {isOpen && (
                    <div style={{ margin: '0 16px 14px', padding: '12px 14px', background: '#101218', borderLeft: `3px solid ${C.pointRed}`, borderRadius: '4px', fontSize: '13px', color: C.textSub, lineHeight: 1.75, whiteSpace: 'pre-line' }}>
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* ── 10. SEO 본문 안내 ── */}
        <section id="about" style={{ marginTop: '36px', paddingTop: '18px', borderTop: `1px solid ${C.line}` }}>
          <h2 style={{ fontSize: '14px', fontWeight: 800, color: '#ffffff', margin: '0 0 8px' }}>{c.about.title}</h2>
          <div style={{ fontSize: '12.5px', color: C.textMuted, lineHeight: 1.75 }}>
            <p style={{ margin: '0 0 8px' }}>{c.about.p1}</p>
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

        {/* ── 11. 푸터 & 지역 네트워크 링크 ── */}
        <footer style={{ marginTop: '24px', paddingTop: '16px', borderTop: `1px solid ${C.line}`, paddingBottom: '20px' }}>
          <div style={{ fontSize: '13px', fontWeight: 800, color: '#ffffff', marginBottom: '4px' }}>{c.footer.title}</div>
          <p style={{ fontSize: '12px', color: C.textMuted, lineHeight: 1.6, margin: '0 0 10px' }}>{c.footer.sub}</p>
          {areaLinks && areaLinks.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px 8px', fontSize: '11px', marginBottom: '12px' }}>
              {areaLinks.slice(0, 36).map((area, i) => (
                <Link key={i} href={`/seo/${encodeURIComponent(area)}`} style={{ textDecoration: 'none', color: '#64748b' }}>{area}</Link>
              ))}
            </div>
          )}
          <div style={{ fontSize: '11px', color: '#64748b', lineHeight: 1.6 }}>{c.footer.line}</div>
        </footer>

      </main>

      {/* ── 12. 하단 고정 퀵바 (24시 직통 전화 + 카톡·문자) ── */}
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        background: 'rgba(12,13,17,0.98)',
        borderTop: `1px solid ${C.line}`,
        padding: '8px 16px',
        zIndex: 50,
      }}>
        <div style={{ maxWidth: '640px', margin: '0 auto', display: 'flex', gap: '8px' }}>
          <a href={bookHref} {...bookExtra} onClick={handleMain} style={{ ...btn, flex: isKo ? 1.2 : 2, background: bookBg, color: bookFg, fontSize: '14.5px', padding: '12px 0' }}>
            {isKo ? <><KakaoIcon size={16} />카톡 · 문자 예약</> : c.cta.whatsapp}
          </a>
          <a href={c.contact.tel} style={{ ...btn, flex: 1, background: C.pointRed, color: '#ffffff', fontSize: '14.5px', padding: '12px 0' }}>
            <PhoneIcon size={16} /> {c.cta.callBar}
          </a>
        </div>
      </div>

    </div>
  );
}
