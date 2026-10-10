'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { LandingContent, Lang } from '../lib/landing-content';

const KAKAO_ID = 'Abam1004';
const PHONE_NUM = '010-6607-2239';
const PHONE_TEL = 'tel:010-6607-2239';

const BOOKING_TEMPLATE = `[아밤 24시 예약 신청]
• 성함/닉네임: 
• 방문 위치(구/동/호텔명): 
• 희망 코스: (타이 / 아로마 / VIP스페셜)
• 이용 시간: (60분 / 90분 / 120분)
• 희망 시간: 바로 가능 or 희망시간`;

const SMS_HREF = `sms:${PHONE_NUM}?body=${encodeURIComponent(BOOKING_TEMPLATE)}`;

const T = {
  bg: '#080a12',
  card: 'rgba(15, 20, 34, 0.85)',
  cardBorder: 'rgba(255, 215, 0, 0.22)',
  gold: '#ffd700',
  goldLt: '#fef08a',
  neonGreen: '#00ffb3',
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
    setTimeout(() => setToast(null), 2000);
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
    <div lang={c.htmlLang} style={{ position: 'relative', minHeight: '100vh', color: T.textWhite, paddingBottom: '90px', fontFamily: '-apple-system, BlinkMacSystemFont, "Pretendard", "Noto Sans KR", sans-serif', lineHeight: 1.6 }}>
      
      {/* ── 전체 백그라운드 서울 야경 고정 배경 (고급스러운 딥 나이트 앰비언스) ── */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          backgroundImage: 'linear-gradient(180deg, rgba(8, 10, 18, 0.72) 0%, rgba(8, 10, 18, 0.85) 40%, rgba(8, 10, 18, 0.95) 100%), url(/images/seoul_night_sky.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          backgroundAttachment: 'fixed',
          pointerEvents: 'none',
        }}
      />

      {/* 토스트 */}
      {toast && (
        <div style={{ position: 'fixed', top: '24px', left: '50%', transform: 'translateX(-50%)', background: T.gold, color: '#000', padding: '10px 24px', borderRadius: '30px', fontSize: '13.5px', fontWeight: 900, zIndex: 99999, boxShadow: '0 8px 30px rgba(0,0,0,0.6)' }}>
          {toast}
        </div>
      )}

      {/* 예약 상담 모달 */}
      {kakaoModal && (
        <div onClick={() => setKakaoModal(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)', zIndex: 99998, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: '#0f1424', border: `1.5px solid ${T.gold}`, borderRadius: '18px', maxWidth: '400px', width: '100%', padding: '26px 20px', textAlign: 'center', boxShadow: '0 20px 60px rgba(0,0,0,0.85)' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 900, color: '#fff', marginBottom: '6px' }}>아밤 24시 예약 및 상담</h3>
            <p style={{ fontSize: '13px', color: T.textMuted, marginBottom: '16px' }}>카톡 또는 전화로 편하게 문의주시면 3분 내 배정 안내드립니다.</p>

            <div style={{ background: 'rgba(0, 255, 179, 0.08)', border: '1px solid rgba(0, 255, 179, 0.35)', borderRadius: '12px', padding: '14px', marginBottom: '16px', textAlign: 'left', fontSize: '12.5px', lineHeight: 1.65 }}>
              <div style={{ color: T.neonGreen, fontWeight: 900, marginBottom: '4px', fontSize: '13px' }}>※ 선입금 없는 100% 현장 후불제</div>
              <div style={{ color: '#e2e8f0' }}>• 관리사 도착 전 예약금·보증금을 요구하는 곳은 100% 사기입니다.</div>
              <div style={{ color: '#e2e8f0' }}>• 아밤은 계신 곳에 도착 후 직접 대면하여 결제합니다.</div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '8px', marginBottom: '14px' }}>
              <div style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '10px', padding: '8px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: '10px', color: T.textMuted }}>카톡 ID</div>
                  <div style={{ fontSize: '16px', fontWeight: 900, color: T.gold }}>{KAKAO_ID}</div>
                </div>
                <button onClick={copyId} style={{ background: T.gold, color: '#000', padding: '5px 12px', borderRadius: '6px', fontSize: '11.5px', fontWeight: 900, border: 'none', cursor: 'pointer' }}>복사</button>
              </div>

              <button onClick={copyTemplate} style={{ background: 'rgba(255, 215, 0, 0.12)', border: `1px solid ${T.cardBorder}`, color: T.goldLt, borderRadius: '10px', padding: '8px 10px', fontSize: '12.5px', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                양식 복사
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '9px' }}>
              <a href={isKo ? '#' : c.contact.wa} onClick={copyId} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: T.kakao, color: T.kakaoFg, fontWeight: 900, fontSize: '15px', padding: '13px 0', borderRadius: '12px', textDecoration: 'none', boxShadow: '0 4px 15px rgba(254, 229, 0, 0.35)' }}>
                <KakaoIcon size={18} /> 카카오톡 ID 복사 &amp; 상담열기
              </a>

              <a href={SMS_HREF} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: '#ffffff', fontWeight: 800, fontSize: '14px', padding: '12px 0', borderRadius: '12px', textDecoration: 'none' }}>
                문자로 간편 예약하기
              </a>

              <a href={PHONE_TEL} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: T.ctaPinkGradient, color: '#ffffff', fontWeight: 900, fontSize: '14.5px', padding: '13px 0', borderRadius: '12px', textDecoration: 'none', boxShadow: '0 4px 18px rgba(255, 59, 107, 0.4)' }}>
                전화 바로연결 ({PHONE_NUM})
              </a>

              <button onClick={() => setKakaoModal(false)} style={{ padding: '8px', background: 'transparent', color: T.textMuted, fontSize: '12.5px', border: 'none', cursor: 'pointer', marginTop: '4px' }}>
                닫기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── 1. 상단 스티키 헤더 ── */}
      <header style={{ position: 'sticky', top: 0, zIndex: 1000, background: 'rgba(8, 10, 18, 0.94)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', borderBottom: `1px solid ${T.cardBorder}`, padding: '12px 16px' }}>
        <div style={{ maxWidth: '640px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" style={{ textDecoration: 'none', fontSize: '22px', fontWeight: 950, color: T.gold, letterSpacing: '-0.5px' }}>
            아밤출장안마<span style={{ color: '#fff', fontSize: '15px', fontWeight: 700, marginLeft: '4px' }}>Abam.kr</span>
          </Link>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ display: 'flex', gap: '6px', fontSize: '12px' }}>
              {LANGS.map((l) => (
                <Link key={l.code} href={l.href} style={{ color: l.code === c.lang ? T.gold : T.textDim, fontWeight: l.code === c.lang ? 900 : 600, textDecoration: 'none', padding: '2px 4px' }}>
                  {l.label}
                </Link>
              ))}
            </div>

            <a href={PHONE_TEL} style={{ background: T.ctaPink, color: '#fff', fontSize: '12.5px', fontWeight: 900, padding: '7px 14px', borderRadius: '20px', textDecoration: 'none', boxShadow: '0 0 12px rgba(255, 59, 107, 0.4)' }}>
              24시 전화
            </a>
          </div>
        </div>

        {/* 앵커 탭 */}
        <nav style={{ maxWidth: '640px', margin: '8px auto 0', display: 'flex', justifyContent: 'space-around', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '6px' }}>
          <a href="#about" style={{ color: T.textMuted, fontSize: '13px', fontWeight: 700, textDecoration: 'none', padding: '4px 8px' }}>서비스소개</a>
          <a href="#courses" style={{ color: T.textMuted, fontSize: '13px', fontWeight: 700, textDecoration: 'none', padding: '4px 8px' }}>코스안내</a>
          <a href="#process" style={{ color: T.textMuted, fontSize: '13px', fontWeight: 700, textDecoration: 'none', padding: '4px 8px' }}>이용안내</a>
          <a href="#caution" style={{ color: '#f87171', fontSize: '13px', fontWeight: 800, textDecoration: 'none', padding: '4px 8px' }}>선입금주의</a>
          <a href="#faq" style={{ color: T.textMuted, fontSize: '13px', fontWeight: 700, textDecoration: 'none', padding: '4px 8px' }}>자주묻는질문</a>
        </nav>
      </header>

      {/* ── 메인 콘텐츠 ── */}
      <main style={{ position: 'relative', zIndex: 1, maxWidth: '640px', margin: '0 auto', padding: '0 16px' }}>

        {/* ── 2. 히어로 영역 & 메인 브랜디드 배너 ── */}
        <section style={{ textAlign: 'center', paddingTop: '20px' }}>
          <div style={{ display: 'inline-block', background: 'rgba(0, 255, 179, 0.1)', border: `1px solid ${T.neonGreen}`, color: T.neonGreen, padding: '6px 16px', borderRadius: '25px', fontSize: '12.5px', fontWeight: 900, marginBottom: '14px' }}>
            100% 현장 후불제 · 예약금 / 보증금 일절 없음
          </div>

          <h1 style={{ fontSize: '28px', fontWeight: 950, lineHeight: 1.35, color: '#ffffff', margin: '0 0 10px', letterSpacing: '-0.8px' }}>
            서울·경기 전지역 출장안마 · 출장마사지<br />
            <span style={{ color: T.gold }}>30분 신속 방문 1:1 프라이빗 힐링 케어</span>
          </h1>

          <p style={{ color: T.textMuted, fontSize: '13.5px', lineHeight: 1.6, margin: '0 auto 16px', maxWidth: '480px' }}>
            자택, 호텔, 오피스텔 등 고객님이 머무시는 가장 편안한 공간으로 전문 관리사가 직접 방문합니다. 선입금 없는 100% 현장 후불제로 안심하고 이용하세요.
          </p>

          {/* 2대 메인 CTA 버튼 */}
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '18px' }}>
            <a href="#" onClick={handleKakaoClick} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', background: T.kakao, color: T.kakaoFg, fontWeight: 900, fontSize: '15px', padding: '14px 0', borderRadius: '12px', textDecoration: 'none', boxShadow: '0 4px 16px rgba(254, 229, 0, 0.35)' }}>
              <KakaoIcon size={18} /> 카카오톡 1:1 상담
            </a>
            <a href={PHONE_TEL} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', background: T.ctaPinkGradient, color: '#ffffff', fontWeight: 900, fontSize: '15px', padding: '14px 0', borderRadius: '12px', textDecoration: 'none', boxShadow: '0 4px 18px rgba(255, 59, 107, 0.4)' }}>
              24시 전화 바로예약
            </a>
          </div>

          {/* [이미지 1] 도도 스타일 아밤 대표 로고 워터마크 히어로 배너 */}
          <div style={{ position: 'relative', width: '100%', height: '230px', borderRadius: '16px', overflow: 'hidden', border: `1px solid ${T.cardBorder}`, boxShadow: '0 12px 36px rgba(0,0,0,0.6)' }}>
            <Image src="/images/abam_hero_banner.jpg" alt="아밤출장안마 서울·경기 100% 후불제" fill sizes="640px" style={{ objectFit: 'cover' }} priority />
          </div>
        </section>

        {/* ── 3. 도도안마 스타일 소개말 & 신뢰 원칙 ── */}
        <section id="about" style={{ marginTop: '32px' }}>
          <div style={{ background: T.card, border: `1px solid ${T.cardBorder}`, borderRadius: '16px', padding: '22px 18px', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 950, color: T.gold, marginBottom: '12px', textAlign: 'center' }}>
              도도처럼 확실한 아밤의 100% 후불제 약속
            </h2>
            <p style={{ fontSize: '13px', color: '#e2e8f0', lineHeight: 1.7, margin: '0 0 14px' }}>
              출장안마는 고객님이 계신 곳으로 관리사가 직접 찾아가는 1:1 방문형 힐링 서비스입니다.
              아밤(Abam)은 고객님들이 우려하시는 선입금 사기, 허위 청구 등 불안 요소를 100% 원천 차단하기 위해 <strong>처음부터 끝까지 100% 현장 후불제</strong>만을 고집합니다.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', paddingTop: '8px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ background: 'rgba(0,0,0,0.35)', borderRadius: '10px', padding: '12px', textAlign: 'center' }}>
                <div style={{ fontSize: '14px', fontWeight: 900, color: T.neonGreen }}>1. 도착 후 대면 결제</div>
                <div style={{ fontSize: '11.5px', color: T.textMuted, marginTop: '2px' }}>예약금·보증금 일절 없음</div>
              </div>
              <div style={{ background: 'rgba(0,0,0,0.35)', borderRadius: '10px', padding: '12px', textAlign: 'center' }}>
                <div style={{ fontSize: '14px', fontWeight: 900, color: T.gold }}>2. 20대 전문 에이스</div>
                <div style={{ fontSize: '11.5px', color: T.textMuted, marginTop: '2px' }}>검증된 정예 관리사 상시대기</div>
              </div>
              <div style={{ background: 'rgba(0,0,0,0.35)', borderRadius: '10px', padding: '12px', textAlign: 'center' }}>
                <div style={{ fontSize: '14px', fontWeight: 900, color: T.gold }}>3. 30분 신속 방문</div>
                <div style={{ fontSize: '11.5px', color: T.textMuted, marginTop: '2px' }}>서울 25개 구 및 경기 전역</div>
              </div>
              <div style={{ background: 'rgba(0,0,0,0.35)', borderRadius: '10px', padding: '12px', textAlign: 'center' }}>
                <div style={{ fontSize: '14px', fontWeight: 900, color: T.neonGreen }}>4. 100% 비밀 보장</div>
                <div style={{ fontSize: '11.5px', color: T.textMuted, marginTop: '2px' }}>개인정보 일절 미수집</div>
              </div>
            </div>
          </div>
        </section>

        {/* ── [이미지 2] 도도 스타일 아밤 세로형 대표 플라이어 배너 ── */}
        <div style={{ marginTop: '28px', position: 'relative', width: '100%', height: '340px', borderRadius: '16px', overflow: 'hidden', border: `1px solid ${T.cardBorder}`, boxShadow: '0 12px 36px rgba(0,0,0,0.6)' }}>
          <Image src="/images/abam_vertical_flyer.jpg" alt="아밤 24시 출장안마 안내" fill sizes="640px" style={{ objectFit: 'cover' }} />
        </div>

        {/* ── 4. 코스 및 정찰 가격표 (도도안마 표준 코스 레이아웃) ── */}
        <section id="courses" style={{ marginTop: '36px' }}>
          <div style={{ textAlign: 'center', marginBottom: '18px' }}>
            <h2 style={{ fontSize: '22px', fontWeight: 950, color: T.gold }}>아밤 대표 코스 및 정찰 요금표</h2>
            <p style={{ fontSize: '12.5px', color: T.textMuted, margin: '4px 0 0' }}>사전 예약금 없는 100% 현장 후불 결제</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            
            {/* A코스: 타이 정통 케어 */}
            <div style={{ background: T.card, borderRadius: '16px', border: `1px solid ${T.cardBorder}`, overflow: 'hidden', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' }}>
              <div style={{ padding: '16px 18px', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span style={{ background: T.gold, color: '#000', fontWeight: 950, fontSize: '11px', padding: '2px 8px', borderRadius: '4px', marginRight: '6px' }}>A코스</span>
                  <strong style={{ fontSize: '18px', color: '#fff' }}>타이 정통 테라피 (건식 지압)</strong>
                </div>
                <span style={{ fontSize: '12px', color: T.goldLt }}>왓포 정통 수기</span>
              </div>
              <div style={{ padding: '14px 18px' }}>
                <p style={{ fontSize: '12.5px', color: '#cbd5e1', margin: '0 0 14px', lineHeight: 1.6 }}>
                  오일을 사용하지 않고 편안한 관리복을 착용한 상태에서 진행되는 왓포 전통 방식의 건식 수기 지압 관리입니다. 뭉친 어깨, 목, 허리 근육을 시원하게 풀어드립니다.
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                  <div style={{ background: 'rgba(0,0,0,0.45)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', padding: '10px 4px', textAlign: 'center' }}>
                    <div style={{ fontSize: '11.5px', color: T.textMuted }}>60분</div>
                    <div style={{ fontSize: '16px', fontWeight: 900, color: T.neonGreen, marginTop: '2px' }}>80,000원</div>
                  </div>
                  <div style={{ background: 'rgba(255, 215, 0, 0.12)', border: `1.5px solid ${T.gold}`, borderRadius: '10px', padding: '10px 4px', textAlign: 'center' }}>
                    <div style={{ fontSize: '11.5px', color: T.goldLt }}>90분 (인기)</div>
                    <div style={{ fontSize: '16px', fontWeight: 950, color: T.gold, marginTop: '2px' }}>100,000원</div>
                  </div>
                  <div style={{ background: 'rgba(0,0,0,0.45)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', padding: '10px 4px', textAlign: 'center' }}>
                    <div style={{ fontSize: '11.5px', color: T.textMuted }}>120분</div>
                    <div style={{ fontSize: '16px', fontWeight: 900, color: T.neonGreen, marginTop: '2px' }}>120,000원</div>
                  </div>
                </div>
              </div>
            </div>

            {/* B코스: 아로마 릴렉싱 케어 */}
            <div style={{ background: T.card, borderRadius: '16px', border: `1px solid ${T.cardBorder}`, overflow: 'hidden', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' }}>
              <div style={{ padding: '16px 18px', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span style={{ background: T.neonGreen, color: '#000', fontWeight: 950, fontSize: '11px', padding: '2px 8px', borderRadius: '4px', marginRight: '6px' }}>B코스</span>
                  <strong style={{ fontSize: '18px', color: '#fff' }}>아로마 릴렉싱 케어 (천연 에센셜)</strong>
                </div>
                <span style={{ fontSize: '12px', color: T.neonGreen }}>림프 순환 케어</span>
              </div>
              <div style={{ padding: '14px 18px' }}>
                <p style={{ fontSize: '12.5px', color: '#cbd5e1', margin: '0 0 14px', lineHeight: 1.6 }}>
                  피부 자극이 없는 최고급 천연 식물성 에센셜 오일을 전신에 도포하여 부드럽고 섬세한 수기 테크닉으로 림프절을 자극하고 깊은 휴식과 피로 해소를 돕습니다.
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                  <div style={{ background: 'rgba(0,0,0,0.45)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', padding: '10px 4px', textAlign: 'center' }}>
                    <div style={{ fontSize: '11.5px', color: T.textMuted }}>60분</div>
                    <div style={{ fontSize: '16px', fontWeight: 900, color: T.neonGreen, marginTop: '2px' }}>90,000원</div>
                  </div>
                  <div style={{ background: 'rgba(255, 215, 0, 0.12)', border: `1.5px solid ${T.gold}`, borderRadius: '10px', padding: '10px 4px', textAlign: 'center' }}>
                    <div style={{ fontSize: '11.5px', color: T.goldLt }}>90분 (추천)</div>
                    <div style={{ fontSize: '16px', fontWeight: 950, color: T.gold, marginTop: '2px' }}>110,000원</div>
                  </div>
                  <div style={{ background: 'rgba(0,0,0,0.45)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', padding: '10px 4px', textAlign: 'center' }}>
                    <div style={{ fontSize: '11.5px', color: T.textMuted }}>120분</div>
                    <div style={{ fontSize: '16px', fontWeight: 900, color: T.neonGreen, marginTop: '2px' }}>140,000원</div>
                  </div>
                </div>
              </div>
            </div>

            {/* C코스: 스페셜 VIP 올인원 케어 (BEST) */}
            <div style={{ background: T.card, borderRadius: '16px', border: `2px solid ${T.gold}`, overflow: 'hidden', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', boxShadow: '0 8px 30px rgba(255, 215, 0, 0.2)' }}>
              <div style={{ padding: '16px 18px', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span style={{ background: T.ctaPink, color: '#fff', fontWeight: 950, fontSize: '11px', padding: '2px 8px', borderRadius: '4px', marginRight: '6px' }}>C코스</span>
                  <strong style={{ fontSize: '18px', color: '#fff' }}>스페셜 VIP 올인원 힐링 코스</strong>
                </div>
                <span style={{ fontSize: '12px', color: T.gold, fontWeight: 900 }}>재이용률 1위</span>
              </div>
              <div style={{ padding: '14px 18px' }}>
                <p style={{ fontSize: '12.5px', color: '#cbd5e1', margin: '0 0 14px', lineHeight: 1.6 }}>
                  정통 건식 수기 지압으로 큰 근육을 먼저 시원하게 이완한 뒤, 천연 에센셜 오일로 림프와 미세 근막을 정밀하게 케어하는 최고 만족도의 복합 프로그램입니다.
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                  <div style={{ background: 'rgba(0,0,0,0.45)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', padding: '10px 4px', textAlign: 'center' }}>
                    <div style={{ fontSize: '11.5px', color: T.textMuted }}>60분</div>
                    <div style={{ fontSize: '16px', fontWeight: 900, color: T.neonGreen, marginTop: '2px' }}>100,000원</div>
                  </div>
                  <div style={{ background: 'rgba(255, 215, 0, 0.16)', border: `2px solid ${T.gold}`, borderRadius: '10px', padding: '10px 4px', textAlign: 'center' }}>
                    <div style={{ fontSize: '11.5px', color: T.goldLt, fontWeight: 800 }}>90분 (대표BEST)</div>
                    <div style={{ fontSize: '16.5px', fontWeight: 950, color: T.gold, marginTop: '2px' }}>120,000원</div>
                  </div>
                  <div style={{ background: 'rgba(0,0,0,0.45)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', padding: '10px 4px', textAlign: 'center' }}>
                    <div style={{ fontSize: '11.5px', color: T.textMuted }}>120분</div>
                    <div style={{ fontSize: '16px', fontWeight: 900, color: T.neonGreen, marginTop: '2px' }}>160,000원</div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ── [이미지 3] 코스 안내 VIP 배너 ── */}
        <div style={{ marginTop: '24px', position: 'relative', width: '100%', height: '210px', borderRadius: '16px', overflow: 'hidden', border: `1px solid ${T.cardBorder}`, boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
          <Image src="/images/abam_vip_course_banner.jpg" alt="아밤 시그니처 VIP 코스" fill sizes="640px" style={{ objectFit: 'cover' }} />
        </div>

        {/* ── 5. 도도안마 스타일 선입금 사기 예방 필수 안내 ── */}
        <section id="caution" style={{ marginTop: '36px' }}>
          <div style={{ background: 'rgba(255, 59, 107, 0.08)', border: `2px dashed ${T.ctaPink}`, borderRadius: '16px', padding: '20px 18px', textAlign: 'center' }}>
            <h3 style={{ color: T.ctaPink, fontSize: '16.5px', fontWeight: 950, marginBottom: '8px' }}>
              선입금 및 예약금 사기 피해 예방 필독 안내
            </h3>
            <p style={{ color: '#e2e8f0', fontSize: '13px', lineHeight: 1.7, margin: 0 }}>
              최근 온라인상에서 예약금, 안전보증금, 차량 출발비 명목으로 선입금을 유도한 뒤 연락을 두절하는 <strong>선입금 사기 업체</strong>가 기승을 부리고 있습니다.<br /><br />
              <strong>아밤(Abam)은 어떠한 경우에도 관리사 도착 전 먼저 입금을 요구하지 않습니다!</strong><br />
              지정하신 장소(자택, 호텔, 오피스텔 등)에 관리사가 도착하면 직접 확인 후 결제해 주세요.
            </p>
          </div>
        </section>

        {/* ── [이미지 4] 안심 후불제 보증 배너 ── */}
        <div style={{ marginTop: '20px', position: 'relative', width: '100%', height: '190px', borderRadius: '16px', overflow: 'hidden', border: `1px solid ${T.cardBorder}`, boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
          <Image src="/images/abam_safety_banner.jpg" alt="선입금 없는 안심 출장 서비스" fill sizes="640px" style={{ objectFit: 'cover' }} />
        </div>

        {/* ── 6. 간편 이용 안내 (4단계 프로세스) ── */}
        <section id="process" style={{ marginTop: '36px' }}>
          <div style={{ textAlign: 'center', marginBottom: '16px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 950, color: T.gold }}>간편 이용 4단계 안내</h2>
            <p style={{ fontSize: '12px', color: T.textMuted, margin: '2px 0 0' }}>전화 또는 카톡 한 통으로 1분 만에 예약 완료</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
            <div style={{ background: T.card, border: `1px solid ${T.cardBorder}`, borderRadius: '12px', padding: '14px' }}>
              <div style={{ color: T.gold, fontWeight: 950, fontSize: '13px' }}>STEP 1</div>
              <div style={{ fontSize: '14px', fontWeight: 900, color: '#fff', margin: '2px 0' }}>코스 &amp; 시간 선택</div>
              <div style={{ fontSize: '11.5px', color: T.textMuted }}>타이·아로마·VIP 중 선택</div>
            </div>

            <div style={{ background: T.card, border: `1px solid ${T.cardBorder}`, borderRadius: '12px', padding: '14px' }}>
              <div style={{ color: T.gold, fontWeight: 950, fontSize: '13px' }}>STEP 2</div>
              <div style={{ fontSize: '14px', fontWeight: 900, color: '#fff', margin: '2px 0' }}>위치 및 시간 전달</div>
              <div style={{ fontSize: '11.5px', color: T.textMuted }}>자택, 호텔, 오피스텔 주소</div>
            </div>

            <div style={{ background: T.card, border: `1px solid ${T.cardBorder}`, borderRadius: '12px', padding: '14px' }}>
              <div style={{ color: T.gold, fontWeight: 950, fontSize: '13px' }}>STEP 3</div>
              <div style={{ fontSize: '14px', fontWeight: 900, color: '#fff', margin: '2px 0' }}>30분 신속 방문</div>
              <div style={{ fontSize: '11.5px', color: T.textMuted }}>준비물 일체 구비 후 도착</div>
            </div>

            <div style={{ background: T.card, border: `1px solid ${T.cardBorder}`, borderRadius: '12px', padding: '14px' }}>
              <div style={{ color: T.gold, fontWeight: 950, fontSize: '13px' }}>STEP 4</div>
              <div style={{ fontSize: '14px', fontWeight: 900, color: '#fff', margin: '2px 0' }}>현장 후불 결제</div>
              <div style={{ fontSize: '11.5px', color: T.textMuted }}>관리사 대면 후 안전 결제</div>
            </div>
          </div>
        </section>

        {/* ── 7. 고객 솔직 후기 (도도안마 스타일 고객 리뷰) ── */}
        <section style={{ marginTop: '36px' }}>
          <div style={{ textAlign: 'center', marginBottom: '16px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 950, color: T.gold }}>고객 리얼 이용 후기</h2>
            <p style={{ fontSize: '12px', color: T.textMuted, margin: '2px 0 0' }}>실제 이용 고객님들의 진솔한 평가</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ background: T.card, border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '14px 16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ fontWeight: 800, fontSize: '13px', color: '#fff' }}>강남구 역삼동 김OO 님 | ★★★★★</span>
                <span style={{ color: T.gold, fontSize: '11.5px' }}>스페셜 90분</span>
              </div>
              <p style={{ fontSize: '12.5px', color: '#cbd5e1', margin: 0, lineHeight: 1.6 }}>
                출장마사지 처음 이용해보는데 선입금 요구도 전혀 없고 관리사분 도착하셔서 직접 뵙고 결제하니 정말 안심되었습니다. 어깨랑 목 뭉쳤던 게 다 풀렸네요.
              </p>
            </div>

            <div style={{ background: T.card, border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '14px 16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ fontWeight: 800, fontSize: '13px', color: '#fff' }}>분당구 정자동 박OO 님 | ★★★★★</span>
                <span style={{ color: T.gold, fontSize: '11.5px' }}>아로마 90분</span>
              </div>
              <p style={{ fontSize: '12.5px', color: '#cbd5e1', margin: 0, lineHeight: 1.6 }}>
                야근 끝나고 늦은 새벽에 불렀는데 25분 만에 오셨습니다. 천연 오일 향도 너무 좋고 섬세하게 케어해주셔서 간만에 푹 잤습니다. 강추합니다.
              </p>
            </div>

            <div style={{ background: T.card, border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '14px 16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ fontWeight: 800, fontSize: '13px', color: '#fff' }}>마포구 공덕동 정OO 님 | ★★★★★</span>
                <span style={{ color: T.gold, fontSize: '11.5px' }}>타이 60분</span>
              </div>
              <p style={{ fontSize: '12.5px', color: '#cbd5e1', margin: 0, lineHeight: 1.6 }}>
                호텔 출장으로 불렀는데 로비에서 만나 방으로 같이 올라와 관리받았습니다. 샵에 직접 찾아갈 필요 없이 방에서 받으니 너무 편안하네요.
              </p>
            </div>
          </div>
        </section>

        {/* ── 8. 자주 묻는 질문 (FAQ) ── */}
        <section id="faq" style={{ marginTop: '36px' }}>
          <div style={{ textAlign: 'center', marginBottom: '16px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 950, color: T.gold }}>자주 묻는 질문 (FAQ)</h2>
            <p style={{ fontSize: '12px', color: T.textMuted, margin: '2px 0 0' }}>궁금하신 사항을 바로 확인하세요</p>
          </div>

          <div style={{ background: T.card, borderRadius: '14px', border: `1px solid ${T.cardBorder}`, overflow: 'hidden' }}>
            {[
              { q: '정말 선입금이나 예약금을 먼저 보내야 하는 경우는 없나요?', a: '네, 어떠한 경우에도 없습니다. 아밤은 100% 현장 후불제만을 운영하며, 관리사가 고객님께 도착하기 전 입금을 요구하는 행위는 100% 사기입니다.' },
              { q: '방문 가능한 장소는 어디인가요?', a: '고객님이 머무시는 서울 및 경기 전지역의 자택(아파트·빌라·오피스텔 등)과 호텔, 모텔 등 숙박업소 어디든 방문 가능합니다.' },
              { q: '도착하는 데 얼마나 걸리나요?', a: '서울 25개 자치구 및 경기 주요 거점에 항시 대기 인력이 배치되어 있어 예약 확정 후 평균 20~30분 이내에 신속하게 도착합니다.' },
              { q: '결제 방법은 어떻게 되나요?', a: '관리사 도착 시 현금 또는 계좌이체 등 편하신 방법으로 현장에서 직접 결제하시면 됩니다.' },
              { q: '영업시간과 예약 시간은 어떻게 되나요?', a: '사전 예약은 18:00부터 접수받으며, 현장 영업 시간은 매일 19:00부터 익일 05:00까지 연중무휴 24시간 체제로 운영됩니다.' },
            ].map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={i} style={{ borderBottom: i < 4 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
                  <button onClick={() => setOpenFaq(isOpen ? null : i)} style={{ width: '100%', padding: '15px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', textAlign: 'left', color: '#fff', fontSize: '14px', fontWeight: 800, background: 'none', border: 'none', cursor: 'pointer' }}>
                    <span>Q. {faq.q}</span>
                    <span style={{ color: T.gold, fontSize: '12px', marginLeft: '8px' }}>{isOpen ? '▲' : '▼'}</span>
                  </button>
                  {isOpen && (
                    <div style={{ padding: '0 16px 15px', fontSize: '13px', color: '#cbd5e1', lineHeight: 1.7, borderTop: '1px solid rgba(255,255,255,0.04)', paddingTop: '10px' }}>
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
                <Link key={i} href={`/seo/${encodeURIComponent(area)}`} style={{ textDecoration: 'none', fontSize: '11px', color: T.textMuted, background: 'rgba(15, 20, 34, 0.7)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '4px', padding: '4px 8px' }}>
                  {area}
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* ── 10. 정갈한 푸터 ── */}
        <footer style={{ marginTop: '40px', paddingTop: '20px', borderTop: `1px solid ${T.cardBorder}`, fontSize: '11.5px', color: T.textDim, textAlign: 'center', lineHeight: 1.7 }}>
          <div style={{ fontSize: '13.5px', fontWeight: 800, color: '#ffffff', marginBottom: '6px' }}>
            아밤(Abam.kr) · 서울·경기 1위 100% 현장 후불제 출장안마 · 출장마사지
          </div>
          <p style={{ margin: '0 0 4px', color: T.textMuted }}>
            서울 25개 자치구 및 경기 전역 30분 도착 · 전원 20대 에이스 관리사 상시 대기
          </p>
          <p style={{ margin: 0, color: T.textDim }}>
            고객센터 {PHONE_NUM} · 영업시간 19:00 ~ 05:00 · 선입금 없는 100% 현장 대면결제
          </p>
        </footer>

      </main>

      {/* ── 11. 모바일 하단 고정 퀵 바 (도도안마 표준 2대 퀵버튼) ── */}
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 2000,
        background: 'rgba(8, 10, 18, 0.96)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderTop: `1.5px solid ${T.gold}`,
        padding: '9px 16px',
        boxShadow: '0 -8px 25px rgba(0,0,0,0.7)',
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
              fontWeight: 950,
              fontSize: '15px',
              padding: '13px 0',
              borderRadius: '12px',
              textDecoration: 'none',
              boxShadow: '0 4px 15px rgba(255, 59, 107, 0.45)',
            }}
          >
            24시 전화상담
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
              fontWeight: 950,
              fontSize: '15px',
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
