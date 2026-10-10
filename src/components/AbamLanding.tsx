'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { LandingContent, Lang } from '../lib/landing-content';

const KAKAO_ID = 'Abam1004';
const PHONE_NUM = '010-6607-2239';
const PHONE_TEL = 'tel:010-6607-2239';

const BOOKING_TEMPLATE = `[아밤 24시 예약 신청]
• 예약자명: 
• 방문 위치(구/동/호텔명): 
• 희망 코스: (타이 / 아로마 / 스페셜)
• 관리 시간: (60분 / 90분 / 120분)
• 희망 시간: 바로 가능 or 희망시간`;

const SMS_HREF = `sms:${PHONE_NUM}?body=${encodeURIComponent(BOOKING_TEMPLATE)}`;

/* ─────────────────────────────────────────────────────────────
   실제 업계 대표 플랫폼(스피드·도도) 기반 럭셔리 다크 디자인 시스템
───────────────────────────────────────────────────────────── */
const T = {
  bg: '#0a0a12',
  card: '#131726',
  cardBorder: 'rgba(255, 215, 0, 0.18)',
  gold: '#ffd700',
  goldGradient: 'linear-gradient(135deg, #ffd700 0%, #f59e0b 100%)',
  goldLt: '#fef08a',
  neonGreen: '#00ffb3',
  neonGreenBg: 'rgba(0, 255, 179, 0.1)',
  neonGreenBorder: 'rgba(0, 255, 179, 0.35)',
  ctaPink: '#ff3b6b',
  ctaPinkGradient: 'linear-gradient(135deg, #ff3b6b 0%, #e11d48 100%)',
  kakao: '#fee500',
  kakaoFg: '#181600',
  textWhite: '#ffffff',
  textMuted: '#94a3b8',
  textDim: '#64748b',
};

const LANGS = [
  { code: 'ko', label: 'KR', href: '/' },
  { code: 'en', label: 'EN', href: '/en' },
  { code: 'jp', label: 'JP', href: '/jp' },
  { code: 'cn', label: 'CN', href: '/cn' },
];

function KakaoIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
      <path d="M12 3C7.03 3 3 6.36 3 10.5c0 2.63 1.58 4.96 4 6.37L6 20l3.5-2.1c.8.17 1.63.26 2.5.26 4.97 0 9-3.36 9-7.5S16.97 3 12 3z" fill="currentColor" />
    </svg>
  );
}

export default function AbamLanding({ c, areaLinks }: { c: LandingContent; areaLinks?: string[] }) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [kakaoModal, setKakaoModal] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const isKo = c.lang === 'ko';

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2200);
  };

  const copyId = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(KAKAO_ID).catch(() => {});
    }
    showToast('카톡 ID [' + KAKAO_ID + '] 복사 완료');
  };

  const copyTemplate = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(BOOKING_TEMPLATE).catch(() => {});
    }
    showToast('예약 양식이 복사되었습니다. 카톡/문자에 붙여넣어 주세요.');
  };

  const handleKakaoClick = (e: React.MouseEvent) => {
    if (isKo) {
      e.preventDefault();
      setKakaoModal(true);
    }
  };

  return (
    <div lang={c.htmlLang} style={{ minHeight: '100vh', backgroundColor: T.bg, color: T.textWhite, paddingBottom: '84px', fontFamily: '-apple-system, BlinkMacSystemFont, "Pretendard", "Noto Sans KR", sans-serif', lineHeight: 1.6 }}>
      
      {/* 토스트 팝업 */}
      {toast && (
        <div style={{ position: 'fixed', top: '24px', left: '50%', transform: 'translateX(-50%)', background: T.gold, color: '#000', padding: '10px 22px', borderRadius: '30px', fontSize: '13.5px', fontWeight: 800, zIndex: 99999, boxShadow: '0 8px 25px rgba(0,0,0,0.6)' }}>
          {toast}
        </div>
      )}

      {/* 예약 상담 모달 */}
      {kakaoModal && (
        <div onClick={() => setKakaoModal(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.82)', backdropFilter: 'blur(8px)', zIndex: 99998, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: T.card, border: `1.5px solid ${T.gold}`, borderRadius: '20px', maxWidth: '420px', width: '100%', padding: '26px 20px', textAlign: 'center', boxShadow: '0 20px 60px rgba(0,0,0,0.8)' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 900, color: '#fff', marginBottom: '6px' }}>24시 빠른 예약 및 상담</h3>
            <p style={{ fontSize: '13px', color: T.textMuted, marginBottom: '16px' }}>카톡 또는 전화로 편하게 문의주시면 3분 내 배정 안내드립니다.</p>

            {/* 안심 후불제 수칙 */}
            <div style={{ background: 'rgba(0, 255, 179, 0.06)', border: `1px solid ${T.neonGreenBorder}`, borderRadius: '12px', padding: '14px 16px', marginBottom: '16px', textAlign: 'left', fontSize: '12.5px', lineHeight: 1.65 }}>
              <div style={{ color: T.neonGreen, fontWeight: 900, marginBottom: '4px', fontSize: '13px' }}>🔒 100% 현장 후불제 안심 원칙</div>
              <div style={{ color: '#e2e8f0' }}>• <b>선입금·예약금 0원</b>: 도착 전 입금 요구 시 100% 사기입니다.</div>
              <div style={{ color: '#e2e8f0' }}>• <b>현장 결제</b>: 관리사가 도착하면 직접 확인 후 결제합니다.</div>
              <div style={{ color: '#e2e8f0' }}>• <b>호텔·모텔</b>: 1층 로비 미팅 및 현장 결제 가능합니다.</div>
            </div>

            {/* 카톡 ID & 양식 복사 */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '8px', marginBottom: '14px' }}>
              <div style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '10px', padding: '10px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: '11px', color: T.textMuted }}>카톡 ID</div>
                  <div style={{ fontSize: '16px', fontWeight: 900, color: T.gold }}>{KAKAO_ID}</div>
                </div>
                <button onClick={copyId} style={{ background: T.gold, color: '#000', padding: '6px 12px', borderRadius: '6px', fontSize: '11.5px', fontWeight: 900, border: 'none', cursor: 'pointer' }}>복사</button>
              </div>

              <button onClick={copyTemplate} style={{ background: 'rgba(255, 215, 0, 0.12)', border: `1px solid ${T.cardBorder}`, color: T.goldLt, borderRadius: '10px', padding: '10px', fontSize: '12.5px', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                📋 양식 복사
              </button>
            </div>

            {/* 액션 버튼군 */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '9px' }}>
              <a href={isKo ? '#' : c.contact.wa} onClick={copyId} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: T.kakao, color: T.kakaoFg, fontWeight: 900, fontSize: '15px', padding: '13px 0', borderRadius: '12px', textDecoration: 'none', boxShadow: '0 4px 15px rgba(254, 229, 0, 0.3)' }}>
                <KakaoIcon size={18} /> 카카오톡 ID 복사 &amp; 상담열기
              </a>

              <a href={SMS_HREF} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: '#ffffff', fontWeight: 800, fontSize: '14px', padding: '12px 0', borderRadius: '12px', textDecoration: 'none' }}>
                💬 문자로 간편 예약하기
              </a>

              <a href={PHONE_TEL} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: T.ctaPinkGradient, color: '#ffffff', fontWeight: 900, fontSize: '14.5px', padding: '13px 0', borderRadius: '12px', textDecoration: 'none', boxShadow: '0 4px 18px rgba(255, 59, 107, 0.4)' }}>
                📞 24시 전화 바로연결 ({PHONE_NUM})
              </a>

              <button onClick={() => setKakaoModal(false)} style={{ padding: '8px', background: 'transparent', color: T.textMuted, fontSize: '12.5px', border: 'none', cursor: 'pointer', marginTop: '4px' }}>
                닫기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── 1. 스티키 헤더 (Sticky Navigation Header) ── */}
      <header style={{ position: 'sticky', top: 0, zIndex: 1000, background: 'rgba(10, 10, 18, 0.95)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', borderBottom: `1px solid ${T.cardBorder}`, padding: '12px 16px' }}>
        <div style={{ maxWidth: '640px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" style={{ textDecoration: 'none', fontSize: '21px', fontWeight: 900, color: T.gold, display: 'flex', alignItems: 'center', gap: '4px', letterSpacing: '-0.5px' }}>
            👑 아밤<span style={{ color: '#fff', fontSize: '16px', fontWeight: 700 }}>.kr</span>
          </Link>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {/* 다국어 선택 */}
            <div style={{ display: 'flex', gap: '6px', fontSize: '12px' }}>
              {LANGS.map((l) => (
                <Link key={l.code} href={l.href} style={{ color: l.code === c.lang ? T.gold : T.textDim, fontWeight: l.code === c.lang ? 900 : 600, textDecoration: 'none', padding: '2px 4px' }}>
                  {l.label}
                </Link>
              ))}
            </div>

            {/* 헤더 전화 버튼 */}
            <a href={PHONE_TEL} style={{ background: T.ctaPink, color: '#fff', fontSize: '12.5px', fontWeight: 900, padding: '7px 14px', borderRadius: '20px', textDecoration: 'none', boxShadow: '0 0 12px rgba(255, 59, 107, 0.4)' }}>
              📞 24시 전화
            </a>
          </div>
        </div>

        {/* 앵커 네비게이션 */}
        <nav style={{ maxWidth: '640px', margin: '8px auto 0', display: 'flex', justifyContent: 'space-around', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '6px' }}>
          <a href="#about" style={{ color: T.textMuted, fontSize: '13px', fontWeight: 700, textDecoration: 'none', padding: '4px 8px' }}>특장점</a>
          <a href="#courses" style={{ color: T.textMuted, fontSize: '13px', fontWeight: 700, textDecoration: 'none', padding: '4px 8px' }}>코스안내</a>
          <a href="#process" style={{ color: T.textMuted, fontSize: '13px', fontWeight: 700, textDecoration: 'none', padding: '4px 8px' }}>이용방법</a>
          <a href="#caution" style={{ color: '#f87171', fontSize: '13px', fontWeight: 800, textDecoration: 'none', padding: '4px 8px' }}>선입금주의</a>
          <a href="#faq" style={{ color: T.textMuted, fontSize: '13px', fontWeight: 700, textDecoration: 'none', padding: '4px 8px' }}>FAQ</a>
        </nav>
      </header>

      {/* ── 메인 컨테이너 ── */}
      <main style={{ maxWidth: '640px', margin: '0 auto', padding: '0 16px' }}>

        {/* ── 2. 히어로 배너 (Hero Section) ── */}
        <section style={{ textAlign: 'center', padding: '28px 0 20px' }}>
          {/* 네온 그린 100% 후불제 뱃지 */}
          <div style={{ display: 'inline-block', background: T.neonGreenBg, border: `1px solid ${T.neonGreen}`, color: T.neonGreen, padding: '6px 16px', borderRadius: '25px', fontSize: '12.5px', fontWeight: 900, marginBottom: '14px', boxShadow: '0 0 15px rgba(0, 255, 179, 0.25)' }}>
            🔒 100% 현장 후불제 · 예약금 / 보증금 0원
          </div>

          <h1 style={{ fontSize: '29px', fontWeight: 950, lineHeight: 1.3, color: '#ffffff', margin: '0 0 10px', letterSpacing: '-0.8px' }}>
            서울·경기 전지역<br />
            <span style={{ background: T.goldGradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', filter: 'drop-shadow(0 2px 10px rgba(255, 215, 0, 0.3))' }}>
              30분 초스피드 방문 케어
            </span>
          </h1>

          <p style={{ color: T.textMuted, fontSize: '13.5px', lineHeight: 1.6, margin: '0 auto 18px', maxWidth: '460px' }}>
            엄선된 20대 전문 에이스 관리사가 자택, 호텔, 오피스텔로 신속히 방문하여 지친 몸과 마음을 최상의 힐링 케어로 완성해 드립니다.
          </p>

          {/* 2대 메인 CTA 버튼 */}
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '20px' }}>
            <a href="#" onClick={handleKakaoClick} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', background: T.kakao, color: T.kakaoFg, fontWeight: 900, fontSize: '15px', padding: '14px 0', borderRadius: '14px', textDecoration: 'none', boxShadow: '0 4px 18px rgba(254, 229, 0, 0.35)' }}>
              <KakaoIcon size={18} /> 카카오톡 1:1 상담
            </a>
            <a href={PHONE_TEL} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', background: T.ctaPinkGradient, color: '#ffffff', fontWeight: 900, fontSize: '15px', padding: '14px 0', borderRadius: '14px', textDecoration: 'none', boxShadow: '0 4px 18px rgba(255, 59, 107, 0.4)' }}>
              📞 24시 전화 바로연결
            </a>
          </div>

          {/* 대표 비주얼 이미지 */}
          <div style={{ position: 'relative', width: '100%', height: '200px', borderRadius: '16px', overflow: 'hidden', border: `1px solid ${T.cardBorder}`, boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
            <Image src="/images/hero_sensual_goddess.jpg" alt="아밤 출장마사지" fill sizes="640px" style={{ objectFit: 'cover' }} priority />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10, 10, 18, 0.85) 0%, transparent 60%)' }} />
            <div style={{ position: 'absolute', bottom: '12px', left: '16px', right: '16px', textAlign: 'left' }}>
              <div style={{ fontSize: '11.5px', color: T.gold, fontWeight: 800 }}>PRIVATE IN-ROOM HEALING SPA</div>
              <div style={{ fontSize: '15px', fontWeight: 900, color: '#ffffff' }}>내 공간에서 편안하게 누리는 1:1 프리미엄 테라피</div>
            </div>
          </div>
        </section>

        {/* ── 3. 4대 특장점 카드 (Features Grid) ── */}
        <section id="about" style={{ marginTop: '24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
            <div style={{ background: T.card, border: `1px solid ${T.cardBorder}`, borderRadius: '14px', padding: '16px 14px', textAlign: 'center' }}>
              <div style={{ fontSize: '22px', marginBottom: '4px' }}>🛡️</div>
              <div style={{ fontSize: '14px', fontWeight: 900, color: T.gold, marginBottom: '4px' }}>100% 현장 후불제</div>
              <div style={{ fontSize: '11.5px', color: T.textMuted, lineHeight: 1.5 }}>선입금·예약금 0원<br />도착 후 직접 결제</div>
            </div>

            <div style={{ background: T.card, border: `1px solid ${T.cardBorder}`, borderRadius: '14px', padding: '16px 14px', textAlign: 'center' }}>
              <div style={{ fontSize: '22px', marginBottom: '4px' }}>👑</div>
              <div style={{ fontSize: '14px', fontWeight: 900, color: T.gold, marginBottom: '4px' }}>20대 ACE 관리사</div>
              <div style={{ fontSize: '11.5px', color: T.textMuted, lineHeight: 1.5 }}>전원 체계적 교육 이수<br />젊고 활력 넘치는 테라피</div>
            </div>

            <div style={{ background: T.card, border: `1px solid ${T.cardBorder}`, borderRadius: '14px', padding: '16px 14px', textAlign: 'center' }}>
              <div style={{ fontSize: '22px', marginBottom: '4px' }}>⚡</div>
              <div style={{ fontSize: '14px', fontWeight: 900, color: T.gold, marginBottom: '4px' }}>30분 신속 방문</div>
              <div style={{ fontSize: '11.5px', color: T.textMuted, lineHeight: 1.5 }}>서울 25개 구 및 경기<br />거점 대기 시스템</div>
            </div>

            <div style={{ background: T.card, border: `1px solid ${T.cardBorder}`, borderRadius: '14px', padding: '16px 14px', textAlign: 'center' }}>
              <div style={{ fontSize: '22px', marginBottom: '4px' }}>🔒</div>
              <div style={{ fontSize: '14px', fontWeight: 900, color: T.gold, marginBottom: '4px' }}>철저한 비밀 보장</div>
              <div style={{ fontSize: '11.5px', color: T.textMuted, lineHeight: 1.5 }}>개인정보 일절 보관 안 함<br />100% 프라이빗 케어</div>
            </div>
          </div>
        </section>

        {/* ── 4. 코스 및 정찰 가격표 (Course Pricing Section) ── */}
        <section id="courses" style={{ marginTop: '36px' }}>
          <div style={{ textAlign: 'center', marginBottom: '18px' }}>
            <h2 style={{ fontSize: '22px', fontWeight: 950, color: T.gold }}>✨ 아밤 시그니처 코스 &amp; 요금 안내</h2>
            <p style={{ fontSize: '12.5px', color: T.textMuted, margin: '4px 0 0' }}>사전 예약금 없는 100% 현장 후불제 정찰 요금</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            
            {/* 타이 코스 */}
            <div style={{ background: T.card, borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', overflow: 'hidden', boxShadow: '0 8px 24px rgba(0,0,0,0.3)' }}>
              <div style={{ position: 'relative', width: '100%', height: '140px' }}>
                <Image src="/images/thai.jpg" alt="타이 정통 코스" fill sizes="640px" style={{ objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(19, 23, 38, 0.95), transparent)' }} />
                <div style={{ position: 'absolute', left: '16px', bottom: '10px' }}>
                  <div style={{ fontSize: '19px', fontWeight: 900, color: '#fff' }}>타이 정통 테라피</div>
                  <div style={{ fontSize: '12px', color: T.goldLt, fontWeight: 700 }}>왓포 정통 건식 수기 지압 &amp; 전신 스트레칭</div>
                </div>
              </div>
              <div style={{ padding: '14px 16px' }}>
                <p style={{ fontSize: '12.5px', color: '#cbd5e1', margin: '0 0 12px', lineHeight: 1.6 }}>
                  오일을 사용하지 않는 전통 방식의 건식 지압으로 뭉친 어깨, 목, 허리 근육을 시원하게 이완합니다.
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                  <div style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', padding: '10px 4px', textAlign: 'center' }}>
                    <div style={{ fontSize: '11.5px', color: T.textMuted }}>60분</div>
                    <div style={{ fontSize: '16px', fontWeight: 900, color: T.neonGreen, marginTop: '2px' }}>80,000원</div>
                  </div>
                  <div style={{ background: 'rgba(255, 215, 0, 0.1)', border: `1.5px solid ${T.gold}`, borderRadius: '10px', padding: '10px 4px', textAlign: 'center', position: 'relative' }}>
                    <span style={{ position: 'absolute', top: '-9px', left: '50%', transform: 'translateX(-50%)', background: T.gold, color: '#000', fontSize: '9.5px', fontWeight: 900, padding: '1px 6px', borderRadius: '4px' }}>인기</span>
                    <div style={{ fontSize: '11.5px', color: T.goldLt }}>90분</div>
                    <div style={{ fontSize: '16px', fontWeight: 900, color: T.gold, marginTop: '2px' }}>100,000원</div>
                  </div>
                  <div style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', padding: '10px 4px', textAlign: 'center' }}>
                    <div style={{ fontSize: '11.5px', color: T.textMuted }}>120분</div>
                    <div style={{ fontSize: '16px', fontWeight: 900, color: T.neonGreen, marginTop: '2px' }}>120,000원</div>
                  </div>
                </div>
              </div>
            </div>

            {/* 아로마 코스 */}
            <div style={{ background: T.card, borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', overflow: 'hidden', boxShadow: '0 8px 24px rgba(0,0,0,0.3)' }}>
              <div style={{ position: 'relative', width: '100%', height: '140px' }}>
                <Image src="/images/aroma.jpg" alt="아로마 릴렉싱 코스" fill sizes="640px" style={{ objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(19, 23, 38, 0.95), transparent)' }} />
                <div style={{ position: 'absolute', left: '16px', bottom: '10px' }}>
                  <div style={{ fontSize: '19px', fontWeight: 900, color: '#fff' }}>아로마 릴렉싱 테라피</div>
                  <div style={{ fontSize: '12px', color: T.goldLt, fontWeight: 700 }}>천연 식물성 에센셜 오일 전신 림프 순환 케어</div>
                </div>
              </div>
              <div style={{ padding: '14px 16px' }}>
                <p style={{ fontSize: '12.5px', color: '#cbd5e1', margin: '0 0 12px', lineHeight: 1.6 }}>
                  피부 자극이 없는 최고급 천연 오일로 전신 림프절을 부드럽게 케어하여 깊은 숙면과 피로 회복을 돕습니다.
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                  <div style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', padding: '10px 4px', textAlign: 'center' }}>
                    <div style={{ fontSize: '11.5px', color: T.textMuted }}>60분</div>
                    <div style={{ fontSize: '16px', fontWeight: 900, color: T.neonGreen, marginTop: '2px' }}>90,000원</div>
                  </div>
                  <div style={{ background: 'rgba(255, 215, 0, 0.1)', border: `1.5px solid ${T.gold}`, borderRadius: '10px', padding: '10px 4px', textAlign: 'center', position: 'relative' }}>
                    <span style={{ position: 'absolute', top: '-9px', left: '50%', transform: 'translateX(-50%)', background: T.gold, color: '#000', fontSize: '9.5px', fontWeight: 900, padding: '1px 6px', borderRadius: '4px' }}>추천</span>
                    <div style={{ fontSize: '11.5px', color: T.goldLt }}>90분</div>
                    <div style={{ fontSize: '16px', fontWeight: 900, color: T.gold, marginTop: '2px' }}>110,000원</div>
                  </div>
                  <div style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', padding: '10px 4px', textAlign: 'center' }}>
                    <div style={{ fontSize: '11.5px', color: T.textMuted }}>120분</div>
                    <div style={{ fontSize: '16px', fontWeight: 900, color: T.neonGreen, marginTop: '2px' }}>140,000원</div>
                  </div>
                </div>
              </div>
            </div>

            {/* 스페셜 VIP 코스 (BEST 하이라이트) */}
            <div style={{ background: T.card, borderRadius: '16px', border: `2px solid ${T.gold}`, overflow: 'hidden', boxShadow: '0 0 25px rgba(255, 215, 0, 0.2)', position: 'relative' }}>
              <div style={{ position: 'relative', width: '100%', height: '150px' }}>
                <Image src="/images/sensual_back.jpg" alt="스페셜 VIP 코스" fill sizes="640px" style={{ objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(19, 23, 38, 0.95), transparent)' }} />
                <span style={{ position: 'absolute', top: '12px', right: '12px', background: T.gold, color: '#000', fontWeight: 950, fontSize: '11px', padding: '4px 10px', borderRadius: '12px' }}>
                  BEST 시그니처 👑
                </span>
                <div style={{ position: 'absolute', left: '16px', bottom: '10px' }}>
                  <div style={{ fontSize: '20px', fontWeight: 950, color: '#fff' }}>스페셜 VIP 힐링 코스</div>
                  <div style={{ fontSize: '12.5px', color: T.goldLt, fontWeight: 800 }}>타이 건식 지압 + 천연 아로마 올인원 복합 케어</div>
                </div>
              </div>
              <div style={{ padding: '14px 16px' }}>
                <p style={{ fontSize: '12.5px', color: '#cbd5e1', margin: '0 0 12px', lineHeight: 1.6 }}>
                  시원한 건식 수기 지압으로 큰 근육을 푼 후 천연 에센셜 오일로 림프를 케어하는 재이용률 1위 대표 코스입니다.
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                  <div style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', padding: '10px 4px', textAlign: 'center' }}>
                    <div style={{ fontSize: '11.5px', color: T.textMuted }}>60분</div>
                    <div style={{ fontSize: '16px', fontWeight: 900, color: T.neonGreen, marginTop: '2px' }}>100,000원</div>
                  </div>
                  <div style={{ background: 'rgba(255, 215, 0, 0.15)', border: `1.5px solid ${T.gold}`, borderRadius: '10px', padding: '10px 4px', textAlign: 'center' }}>
                    <div style={{ fontSize: '11.5px', color: T.goldLt }}>90분 (추천)</div>
                    <div style={{ fontSize: '16.5px', fontWeight: 950, color: T.gold, marginTop: '2px' }}>120,000원</div>
                  </div>
                  <div style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', padding: '10px 4px', textAlign: 'center' }}>
                    <div style={{ fontSize: '11.5px', color: T.textMuted }}>120분</div>
                    <div style={{ fontSize: '16px', fontWeight: 900, color: T.neonGreen, marginTop: '2px' }}>160,000원</div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ── 5. ⚠️ 선입금 사기 예방 배너 (Caution Box) ── */}
        <section id="caution" style={{ marginTop: '32px' }}>
          <div style={{ background: 'rgba(255, 59, 107, 0.08)', border: `2px dashed ${T.ctaPink}`, borderRadius: '16px', padding: '20px 18px', textAlign: 'center' }}>
            <h3 style={{ color: T.ctaPink, fontSize: '16px', fontWeight: 900, marginBottom: '8px' }}>⚠️ 선입금 사기 피해 예방 필독 안내</h3>
            <p style={{ color: '#e2e8f0', fontSize: '12.5px', lineHeight: 1.65, margin: 0 }}>
              최근 예약금, 보증금, 출발 교통비 명목으로 선입금을 요구하는 <strong>사기 업체</strong>가 기승을 부리고 있습니다.<br />
              <strong>아밤(Abam)은 어떠한 경우에도 관리사 도착 전 먼저 입금을 요구하지 않습니다!</strong><br />
              관리사가 지정하신 장소에 도착한 후 직접 대면하여 결제하세요.
            </p>
          </div>
        </section>

        {/* ── 6. 간편 이용 절차 (Process Guide) ── */}
        <section id="process" style={{ marginTop: '36px' }}>
          <div style={{ textAlign: 'center', marginBottom: '16px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 900, color: T.gold }}>간편 이용 4단계</h2>
            <p style={{ fontSize: '12px', color: T.textMuted, margin: '2px 0 0' }}>전화 또는 카톡으로 1분 만에 예약 완료</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
            <div style={{ background: T.card, border: `1px solid ${T.cardBorder}`, borderRadius: '12px', padding: '14px' }}>
              <div style={{ color: T.gold, fontWeight: 900, fontSize: '14px' }}>STEP 1</div>
              <div style={{ fontSize: '13.5px', fontWeight: 800, color: '#fff', margin: '2px 0' }}>코스 &amp; 시간 선택</div>
              <div style={{ fontSize: '11.5px', color: T.textMuted }}>타이·아로마·스페셜 중 원하는 코스 결정</div>
            </div>

            <div style={{ background: T.card, border: `1px solid ${T.cardBorder}`, borderRadius: '12px', padding: '14px' }}>
              <div style={{ color: T.gold, fontWeight: 900, fontSize: '14px' }}>STEP 2</div>
              <div style={{ fontSize: '13.5px', fontWeight: 800, color: '#fff', margin: '2px 0' }}>위치 &amp; 시간 전달</div>
              <div style={{ fontSize: '11.5px', color: T.textMuted }}>자택, 호텔, 오피스텔 주소 전달</div>
            </div>

            <div style={{ background: T.card, border: `1px solid ${T.cardBorder}`, borderRadius: '12px', padding: '14px' }}>
              <div style={{ color: T.gold, fontWeight: 900, fontSize: '14px' }}>STEP 3</div>
              <div style={{ fontSize: '13.5px', fontWeight: 800, color: '#fff', margin: '2px 0' }}>30분 내 방문 도착</div>
              <div style={{ fontSize: '11.5px', color: T.textMuted }}>담당 관리사가 준비물 구비 후 방문</div>
            </div>

            <div style={{ background: T.card, border: `1px solid ${T.cardBorder}`, borderRadius: '12px', padding: '14px' }}>
              <div style={{ color: T.gold, fontWeight: 900, fontSize: '14px' }}>STEP 4</div>
              <div style={{ fontSize: '13.5px', fontWeight: 800, color: '#fff', margin: '2px 0' }}>현장 후불 결제</div>
              <div style={{ fontSize: '11.5px', color: T.textMuted }}>관리사 대면 후 안전하게 결제</div>
            </div>
          </div>
        </section>

        {/* ── 7. 이용 후기 (Reviews) ── */}
        <section style={{ marginTop: '36px' }}>
          <div style={{ textAlign: 'center', marginBottom: '16px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 900, color: T.gold }}>고객 솔직 이용 후기</h2>
            <p style={{ fontSize: '12px', color: T.textMuted, margin: '2px 0 0' }}>실제 이용 고객님들이 직접 남겨주신 생생한 평가</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ background: T.card, border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '14px 16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ fontWeight: 800, fontSize: '13px', color: '#fff' }}>강남구 역삼동 자택 · 이*현 고객님</span>
                <span style={{ color: T.gold, fontSize: '11.5px' }}>★★★★★</span>
              </div>
              <p style={{ fontSize: '12px', color: '#cbd5e1', margin: 0, lineHeight: 1.55 }}>
                야근 끝나고 늦은 밤에 불렀는데 25분 만에 오셨네요. 선입금 요구도 전혀 없고 관리사분 손끝 압이 너무 시원해서 어깨 뭉친 게 다 풀렸습니다.
              </p>
            </div>

            <div style={{ background: T.card, border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '14px 16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ fontWeight: 800, fontSize: '13px', color: '#fff' }}>마포구 공덕 호텔 · 박*준 고객님</span>
                <span style={{ color: T.gold, fontSize: '11.5px' }}>★★★★★</span>
              </div>
              <p style={{ fontSize: '12px', color: '#cbd5e1', margin: 0, lineHeight: 1.55 }}>
                서울 출장 중 호텔에서 이용했습니다. 로비에서 만나서 방으로 같이 올라와 관리받았는데 프라이빗하고 매너가 정말 좋으십니다. 90분 스페셜 강추!
              </p>
            </div>

            <div style={{ background: T.card, border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '14px 16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ fontWeight: 800, fontSize: '13px', color: '#fff' }}>수원 팔달구 인계동 · 최*우 고객님</span>
                <span style={{ color: T.gold, fontSize: '11.5px' }}>★★★★★</span>
              </div>
              <p style={{ fontSize: '12px', color: '#cbd5e1', margin: 0, lineHeight: 1.55 }}>
                경기 지역도 30분 도착이라더니 시간 약속 칼같이 지키시네요. 깔끔하고 친절하셔서 다음 주말에도 또 부를 생각입니다.
              </p>
            </div>
          </div>
        </section>

        {/* ── 8. 자주 묻는 질문 (FAQ) ── */}
        <section id="faq" style={{ marginTop: '36px' }}>
          <div style={{ textAlign: 'center', marginBottom: '16px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 900, color: T.gold }}>자주 묻는 질문 (FAQ)</h2>
            <p style={{ fontSize: '12px', color: T.textMuted, margin: '2px 0 0' }}>궁금하신 사항을 바로 확인하세요</p>
          </div>

          <div style={{ background: T.card, borderRadius: '14px', border: `1px solid ${T.cardBorder}`, overflow: 'hidden' }}>
            {[
              { q: '정말 선입금이나 예약금이 전혀 없나요?', a: '네, 100% 현장 후불제입니다. 관리사가 계신 곳에 도착한 후 대면하여 결제하시면 됩니다. 출발 전 입금을 요구하는 업체는 사기이므로 절대 입금하지 마세요.' },
              { q: '방문 가능한 장소는 어디인가요?', a: '고객님께서 편히 쉬실 수 있는 자택(아파트·오피스텔·빌라 등) 및 서울·경기 전역 호텔, 모텔 등 숙박업소 어디든 방문 가능합니다.' },
              { q: '도착하는 데 얼마나 걸리나요?', a: '서울 25개 구 및 경기 주요 거점에 항시 대기 중이므로 예약 확정 후 평균 20~30분 이내에 도착합니다.' },
              { q: '결제 방법은 어떻게 되나요?', a: '현금, 계좌이체 등 관리사 도착 시 원하시는 방식으로 편리하게 결제하실 수 있습니다.' },
              { q: '영업 및 예약 가능 시간은 언제인가요?', a: '사전 예약은 18:00부터 접수받으며, 현장 영업 시간은 매일 19:00부터 익일 05:00까지 연중무휴로 운영됩니다.' },
            ].map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={i} style={{ borderBottom: i < 4 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
                  <button onClick={() => setOpenFaq(isOpen ? null : i)} style={{ width: '100%', padding: '14px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', textAlign: 'left', color: '#fff', fontSize: '13.5px', fontWeight: 800, background: 'none', border: 'none', cursor: 'pointer' }}>
                    <span>Q. {faq.q}</span>
                    <span style={{ color: T.gold, fontSize: '12px', marginLeft: '8px' }}>{isOpen ? '▲' : '▼'}</span>
                  </button>
                  {isOpen && (
                    <div style={{ padding: '0 16px 14px', fontSize: '12.5px', color: '#cbd5e1', lineHeight: 1.65 }}>
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* ── 9. 서울·경기 서비스 지역 네트워크 ── */}
        {areaLinks && areaLinks.length > 0 && (
          <section style={{ marginTop: '36px' }}>
            <div style={{ fontSize: '13px', fontWeight: 800, color: T.gold, marginBottom: '8px', textAlign: 'center' }}>
              서울·경기 전지역 서비스 네트워크
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', justifyContent: 'center' }}>
              {areaLinks.slice(0, 32).map((area, i) => (
                <Link key={i} href={`/seo/${encodeURIComponent(area)}`} style={{ textDecoration: 'none', fontSize: '11px', color: T.textMuted, background: 'rgba(19, 23, 38, 0.6)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '4px', padding: '4px 8px' }}>
                  {area}
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* ── 10. 푸터 정보 ── */}
        <footer style={{ marginTop: '40px', paddingTop: '20px', borderTop: `1px solid ${T.cardBorder}`, fontSize: '11px', color: T.textDim, textAlign: 'center', lineHeight: 1.65 }}>
          <div style={{ fontSize: '13px', fontWeight: 800, color: '#ffffff', marginBottom: '6px' }}>
            아밤(Abam.kr) · 서울·경기 1위 100% 현장 후불제 출장마사지
          </div>
          <p style={{ margin: '0 0 4px', color: T.textMuted }}>
            서울 25개 자치구 및 경기 전역 30분 도착 · 전원 20대 에이스 관리사 상시 대기
          </p>
          <p style={{ margin: 0, color: T.textDim }}>
            고객센터 {PHONE_NUM} · 영업시간 19:00 ~ 05:00 · 선입금 없는 100% 현장 대면결제
          </p>
        </footer>

      </main>

      {/* ── 11. 모바일 하단 고정 퀵 바 (Mobile Bottom Sticky Bar) ── */}
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 2000,
        background: 'rgba(10, 10, 18, 0.98)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderTop: `1.5px solid ${T.gold}`,
        padding: '9px 16px',
        boxShadow: '0 -8px 25px rgba(0,0,0,0.6)',
      }}>
        <div style={{ maxWidth: '640px', margin: '0 auto', display: 'flex', gap: '10px', alignItems: 'center' }}>
          <a
            href={PHONE_TEL}
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              background: T.ctaPinkGradient,
              color: '#ffffff',
              fontWeight: 900,
              fontSize: '14.5px',
              padding: '13px 0',
              borderRadius: '12px',
              textDecoration: 'none',
              boxShadow: '0 4px 15px rgba(255, 59, 107, 0.45)',
            }}
          >
            📞 24시 전화상담
          </a>
          <a
            href="#"
            onClick={handleKakaoClick}
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              background: T.kakao,
              color: T.kakaoFg,
              fontWeight: 900,
              fontSize: '14.5px',
              padding: '13px 0',
              borderRadius: '12px',
              textDecoration: 'none',
              boxShadow: '0 4px 15px rgba(254, 229, 0, 0.35)',
            }}
          >
            <KakaoIcon size={18} /> 카카오톡 문의
          </a>
        </div>
      </div>

    </div>
  );
}
