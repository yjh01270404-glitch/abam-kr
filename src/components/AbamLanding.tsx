'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { LandingContent } from '../lib/landing-content';

const KAKAO_ID = 'Abam1004';
const PHONE_NUM = '010-6607-2239';
const PHONE_TEL = 'tel:010-6607-2239';

const BOOKING_TEMPLATE = `[아밤 24시 예약 신청]
• 성함/닉네임: 
• 방문 위치(구/동/호텔·모텔명): 
• 희망 코스: (VIP 스웨디시 / 힐링 혼혈 / 정통 타이)
• 이용 시간: (60분 / 90분 / 120분)
• 희망 시간: 바로 가능 or 희망시간`;

const SMS_HREF = `sms:${PHONE_NUM}?body=${encodeURIComponent(BOOKING_TEMPLATE)}`;

// 정통 한국형 출장마사지 최상급 컬러 팔레트 (도도안마 & 스피드 벤치마크)
const T = {
  bg: '#07090e',
  card: 'rgba(13, 17, 28, 0.92)',
  cardBorder: 'rgba(255, 215, 0, 0.25)',
  gold: '#ffcf33',
  goldLt: '#fff1a8',
  neonGreen: '#00ffb3',
  hotPink: '#e11d48',
  hotPinkHover: '#be123c',
  kakao: '#fee500',
  kakaoFg: '#181600',
  textWhite: '#ffffff',
  textMuted: '#94a3b8',
  textDim: '#64748b',
};

function KakaoIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
      <path d="M12 3C7.03 3 3 6.36 3 10.5c0 2.63 1.58 4.96 4 6.37L6 20l3.5-2.1c.8.17 1.63.26 2.5.26 4.97 0 9-3.36 9-7.5S16.97 3 12 3z" fill="currentColor" />
    </svg>
  );
}

function PhoneIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
      <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.02-.24 11.72 11.72 0 003.68.59 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.59 3.68a1 1 0 01-.24 1.02l-2.23 2.09z" />
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
    <div lang={c.htmlLang} style={{ position: 'relative', minHeight: '100vh', color: T.textWhite, paddingBottom: '96px', fontFamily: '-apple-system, BlinkMacSystemFont, "Pretendard", "Noto Sans KR", sans-serif', lineHeight: 1.6, background: '#07090e' }}>
      
      {/* ── 서울 야경 고정 배경 ── */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          backgroundImage: 'linear-gradient(180deg, rgba(7, 9, 14, 0.82) 0%, rgba(7, 9, 14, 0.92) 50%, rgba(7, 9, 14, 0.98) 100%), url(/images/seoul_night_sky.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          backgroundAttachment: 'fixed',
          pointerEvents: 'none',
        }}
      />

      {/* 토스트 팝업 */}
      {toast && (
        <div style={{ position: 'fixed', top: '24px', left: '50%', transform: 'translateX(-50%)', background: T.gold, color: '#000', padding: '10px 24px', borderRadius: '30px', fontSize: '13.5px', fontWeight: 900, zIndex: 99999, boxShadow: '0 8px 30px rgba(0,0,0,0.7)' }}>
          {toast}
        </div>
      )}

      {/* 예약/상담 팝업 모달 */}
      {kakaoModal && (
        <div onClick={() => setKakaoModal(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', zIndex: 99998, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: '#0e1322', border: `1.5px solid ${T.gold}`, borderRadius: '18px', maxWidth: '400px', width: '100%', padding: '24px 20px', textAlign: 'center', boxShadow: '0 20px 60px rgba(0,0,0,0.9)' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 950, color: '#fff', marginBottom: '6px' }}>아밤 24시 실시간 상담 예약</h3>
            <p style={{ fontSize: '13px', color: T.textMuted, marginBottom: '16px' }}>전화나 카톡으로 편하게 문의주시면 3분 내로 안내드립니다.</p>

            <div style={{ background: 'rgba(0, 255, 179, 0.08)', border: '1px solid rgba(0, 255, 179, 0.3)', borderRadius: '12px', padding: '12px 14px', marginBottom: '16px', textAlign: 'left', fontSize: '12.5px', lineHeight: 1.6 }}>
              <div style={{ color: T.neonGreen, fontWeight: 900, marginBottom: '2px', fontSize: '13px' }}>※ 선입금 없는 100% 현장 후불제</div>
              <div style={{ color: '#cbd5e1' }}>관리사 도착 전 예약금·보증금을 요구하는 곳은 100% 사기입니다. 아밤은 도착 후 직접 대면하여 결제합니다.</div>
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
              <a href={isKo ? '#' : c.contact.wa} onClick={copyId} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: T.kakao, color: T.kakaoFg, fontWeight: 950, fontSize: '15px', padding: '13px 0', borderRadius: '12px', textDecoration: 'none', boxShadow: '0 4px 15px rgba(254, 229, 0, 0.35)' }}>
                <KakaoIcon size={18} /> 카카오톡 ID 복사 &amp; 상담열기
              </a>

              <a href={SMS_HREF} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: '#ffffff', fontWeight: 800, fontSize: '14px', padding: '12px 0', borderRadius: '12px', textDecoration: 'none' }}>
                문자로 간편 예약하기
              </a>

              <a href={PHONE_TEL} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', background: T.hotPink, color: '#ffffff', fontWeight: 950, fontSize: '15px', padding: '13px 0', borderRadius: '12px', textDecoration: 'none', boxShadow: '0 4px 18px rgba(225, 29, 72, 0.5)' }}>
                <PhoneIcon size={18} /> 24시 전화 연결 ({PHONE_NUM})
              </a>

              <button onClick={() => setKakaoModal(false)} style={{ padding: '8px', background: 'transparent', color: T.textMuted, fontSize: '12.5px', border: 'none', cursor: 'pointer', marginTop: '4px' }}>
                닫기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── 1. 도도안마 스타일 상단 헤더: 좌측 로고 & 상단 우측 깔끔한 메뉴 배치 ── */}
      <header style={{ position: 'sticky', top: 0, zIndex: 1000, background: 'rgba(7, 9, 14, 0.97)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', borderBottom: `1.5px solid ${T.cardBorder}`, padding: '12px 16px' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          
          {/* 좌측 브랜드 로고 */}
          <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '21px', fontWeight: 950, color: T.gold, letterSpacing: '-0.5px' }}>아밤출장마사지</span>
            <span style={{ fontSize: '11px', fontWeight: 800, color: '#fff', background: 'rgba(255,215,0,0.15)', border: `1px solid ${T.cardBorder}`, padding: '2px 6px', borderRadius: '4px' }}>100% 후불제</span>
          </Link>

          {/* 상단 우측 메뉴 배치 (도도안마 표준 우측 정렬 텍스트 링크) */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <a href="#about" style={{ color: '#e2e8f0', fontSize: '13px', fontWeight: 700, textDecoration: 'none', padding: '6px 8px' }}>소개말</a>
            <a href="#courses" style={{ color: T.gold, fontSize: '13px', fontWeight: 800, textDecoration: 'none', padding: '6px 8px' }}>코스안내</a>
            <a href="#process" style={{ color: '#e2e8f0', fontSize: '13px', fontWeight: 700, textDecoration: 'none', padding: '6px 8px' }}>이용안내</a>
            <a href="#caution" style={{ color: '#f87171', fontSize: '13px', fontWeight: 800, textDecoration: 'none', padding: '6px 8px' }}>선입금주의</a>
          </nav>
        </div>
      </header>

      {/* ── 메인 콘텐츠 ── */}
      <main style={{ position: 'relative', zIndex: 1, maxWidth: '680px', margin: '0 auto', padding: '0 16px' }}>

        {/* ── 2. 히어로 섹션 (도도안마 스타일의 강력한 직관성과 이끌림) ── */}
        <section style={{ textAlign: 'center', paddingTop: '28px', paddingBottom: '16px' }}>
          
          {/* 상단 후불제 보증 뱃지 */}
          <div style={{ display: 'inline-block', background: 'rgba(0, 255, 179, 0.12)', border: `1.5px solid ${T.neonGreen}`, color: T.neonGreen, padding: '6px 18px', borderRadius: '30px', fontSize: '13px', fontWeight: 900, marginBottom: '16px', letterSpacing: '-0.3px' }}>
            서울·경기 전지역 선입금 없는 100% 현장 후불제
          </div>

          {/* 메인 타이틀 */}
          <h1 style={{ fontSize: '32px', fontWeight: 950, lineHeight: 1.25, color: '#ffffff', margin: '0 0 12px', letterSpacing: '-1px' }}>
            출장안마 · 출장마사지 24시 아밤
          </h1>

          {/* 서브 카피 */}
          <p style={{ color: '#cbd5e1', fontSize: '15px', fontWeight: 700, lineHeight: 1.6, margin: '0 auto 16px', maxWidth: '520px' }}>
            아밤출장안마 &amp; 아밤출장마사지<br />
            서울 전 지역 · 경기 전역 30분 총알 방문 프리미엄 힐링 서비스
          </p>

          {/* 체크리스트 안내 (하트 포인트) */}
          <div style={{ display: 'inline-flex', flexDirection: 'column', gap: '6px', textAlign: 'left', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px', padding: '14px 20px', marginBottom: '22px' }}>
            <div style={{ color: '#f8fafc', fontSize: '13.5px', fontWeight: 800 }}>✓ 24시간 실시간 예약 가능 시스템 ♥</div>
            <div style={{ color: '#f8fafc', fontSize: '13.5px', fontWeight: 800 }}>✓ 프라이빗 1:1 감성 밀착 케어 서비스 ♥</div>
            <div style={{ color: '#f8fafc', fontSize: '13.5px', fontWeight: 800 }}>✓ 전문자격증 보유 20대 한국인/에이스 관리사 ♥</div>
            <div style={{ color: T.neonGreen, fontSize: '13.5px', fontWeight: 900 }}>✓ 선입금·예약금 일절 없는 100% 현장 후불제 ♥</div>
          </div>

          <div style={{ fontSize: '14.5px', fontWeight: 800, color: T.goldLt, marginBottom: '18px' }}>
            지친 하루, 힐링이 필요한 오늘 밤 아밤을 불러보세요!
          </div>

          {/* ── [핵심 센터피스 1] 도도안마 대표 초대형 전화연결 버튼 ── */}
          <div style={{ marginBottom: '12px' }}>
            <a
              href={PHONE_TEL}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                background: T.hotPink,
                color: '#ffffff',
                fontWeight: 950,
                fontSize: '24px',
                letterSpacing: '1px',
                padding: '16px 36px',
                borderRadius: '50px',
                textDecoration: 'none',
                boxShadow: '0 8px 30px rgba(225, 29, 72, 0.65), 0 0 20px rgba(225, 29, 72, 0.4)',
                transition: 'transform 0.15s ease',
              }}
            >
              <PhoneIcon size={24} /> {PHONE_NUM}
            </a>
            <div style={{ fontSize: '12px', color: T.textMuted, marginTop: '6px' }}>
              ( 터치 시 즉시 24시 직통 상담전화로 연결됩니다 )
            </div>
          </div>

          {/* 카카오톡 1:1 상담 버튼 */}
          <div style={{ marginBottom: '24px' }}>
            <a
              href="#"
              onClick={handleKakaoClick}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                background: T.kakao,
                color: T.kakaoFg,
                fontWeight: 950,
                fontSize: '15px',
                padding: '12px 28px',
                borderRadius: '30px',
                textDecoration: 'none',
                boxShadow: '0 4px 16px rgba(254, 229, 0, 0.35)',
              }}
            >
              <KakaoIcon size={18} /> 카카오톡 1:1 비밀상담 (ID: {KAKAO_ID})
            </a>
          </div>

          {/* ── [이미지 1: 메인 히어로 섹시 모델 비주얼] ── */}
          {/* 호텔 침대 위 실크 가운을 입은 고혹적이고 매력적인 20대 모델 */}
          <div style={{ position: 'relative', width: '100%', height: '280px', borderRadius: '18px', overflow: 'hidden', border: `1.5px solid ${T.cardBorder}`, boxShadow: '0 16px 40px rgba(0,0,0,0.8)' }}>
            <Image
              src="/images/abam_hero_seductive.jpg"
              alt="아밤 24시 출장안마 20대 에이스 관리사 프라이빗 힐링"
              fill
              sizes="(max-width: 768px) 100vw, 680px"
              style={{ objectFit: 'cover' }}
              priority
            />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(180deg, transparent 0%, rgba(7, 9, 14, 0.95) 100%)', padding: '20px 16px 12px', textAlign: 'left' }}>
              <div style={{ color: T.gold, fontSize: '12px', fontWeight: 900 }}>ABAM 24H PRIVATE RELAXATION</div>
              <div style={{ color: '#ffffff', fontSize: '15px', fontWeight: 950 }}>20대 최상급 에이스 관리사진 상시대기 · 100% 현장 후불제</div>
            </div>
          </div>

        </section>

        {/* ── 3. 도도안마 스타일 소개말 & 신뢰의 4대 약속 ── */}
        <section id="about" style={{ marginTop: '28px' }}>
          <div style={{ background: T.card, border: `1.5px solid ${T.cardBorder}`, borderRadius: '18px', padding: '24px 20px', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' }}>
            <h2 style={{ fontSize: '22px', fontWeight: 950, color: T.gold, marginBottom: '14px', textAlign: 'center' }}>
              아밤출장마사지는 고객님께 4가지를 약속합니다
            </h2>
            
            <p style={{ fontSize: '13.5px', color: '#cbd5e1', lineHeight: 1.75, margin: '0 0 18px', textAlign: 'center' }}>
              출장안마는 고객님이 머무시는 가장 편안한 장소로 전문 관리사가 직접 방문하는 1:1 방문형 힐링 서비스입니다.<br />
              아밤은 고객님들이 우려하시는 불안 요소를 원천 차단하기 위해 <strong>처음부터 끝까지 100% 현장 후불제</strong>만을 고집합니다.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
              <div style={{ background: 'rgba(0,0,0,0.45)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '14px', textAlign: 'left' }}>
                <div style={{ fontSize: '15px', fontWeight: 950, color: T.neonGreen, marginBottom: '4px' }}>1. 안심 후불제 원칙</div>
                <div style={{ fontSize: '12px', color: '#94a3b8', lineHeight: 1.6 }}>관리사 도착 후 직접 대면 결제! 예약금·보증금 0원입니다.</div>
              </div>

              <div style={{ background: 'rgba(0,0,0,0.45)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '14px', textAlign: 'left' }}>
                <div style={{ fontSize: '15px', fontWeight: 950, color: T.gold, marginBottom: '4px' }}>2. 100% 비밀 보장</div>
                <div style={{ fontSize: '12px', color: '#94a3b8', lineHeight: 1.6 }}>연락처 및 주소 등 일체의 정보는 관리 종료 즉시 안전하게 파기됩니다.</div>
              </div>

              <div style={{ background: 'rgba(0,0,0,0.45)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '14px', textAlign: 'left' }}>
                <div style={{ fontSize: '15px', fontWeight: 950, color: T.gold, marginBottom: '4px' }}>3. 20대 검증된 힐러</div>
                <div style={{ fontSize: '12px', color: '#94a3b8', lineHeight: 1.6 }}>철저한 마인드와 실력을 갖춘 20대 에이스 관리사만을 고집합니다.</div>
              </div>

              <div style={{ background: 'rgba(0,0,0,0.45)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '14px', textAlign: 'left' }}>
                <div style={{ fontSize: '15px', fontWeight: 950, color: T.neonGreen, marginBottom: '4px' }}>4. 30분 총알 방문</div>
                <div style={{ fontSize: '12px', color: '#94a3b8', lineHeight: 1.6 }}>서울 25개 구 및 경기 전역 30분 내로 신속하게 찾아갑니다.</div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 4. 대표 코스 및 직관적인 정찰 가격표 (도도안마 표준 코스 체계) ── */}
        <section id="courses" style={{ marginTop: '36px' }}>
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <div style={{ display: 'inline-block', background: 'rgba(255, 207, 51, 0.15)', border: `1px solid ${T.gold}`, color: T.gold, padding: '4px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: 900, marginBottom: '8px' }}>
              정찰 요금제 · 선입금 0원 100% 현장 후불제
            </div>
            <h2 style={{ fontSize: '26px', fontWeight: 950, color: '#ffffff', margin: 0 }}>
              아밤 대표 힐링 코스 안내
            </h2>
            <p style={{ fontSize: '13px', color: T.textMuted, margin: '6px 0 0' }}>고객님의 취향과 피로도에 맞춘 1:1 맞춤형 힐링 프로그램</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            
            {/* 코스 1: 한국인 관리사 스웨디시 VIP 코스 (대표 BEST) */}
            <div style={{ background: T.card, borderRadius: '18px', border: `2px solid ${T.gold}`, overflow: 'hidden', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', boxShadow: '0 8px 30px rgba(255, 207, 51, 0.25)' }}>
              <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255, 207, 51, 0.08)' }}>
                <div>
                  <span style={{ background: T.hotPink, color: '#fff', fontWeight: 950, fontSize: '11px', padding: '3px 8px', borderRadius: '4px', marginRight: '8px' }}>대표 BEST</span>
                  <strong style={{ fontSize: '18px', color: '#fff', fontWeight: 950 }}>한국인 관리사 스웨디시 VIP 코스</strong>
                </div>
                <span style={{ fontSize: '12.5px', color: T.gold, fontWeight: 900 }}>재이용률 1위</span>
              </div>
              <div style={{ padding: '16px 20px' }}>
                <p style={{ fontSize: '13px', color: '#cbd5e1', margin: '0 0 16px', lineHeight: 1.65 }}>
                  일상 속 쌓인 극심한 피로를 최고급 천연 에센셜 오일과 섬세한 림프 순환 테크닉으로 부드럽게 녹여드리는 아밤의 대표 시그니처 힐링 프로그램입니다.
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                  <div style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '12px 6px', textAlign: 'center' }}>
                    <div style={{ fontSize: '12px', color: T.textMuted }}>A코스 (60분)</div>
                    <div style={{ fontSize: '17px', fontWeight: 950, color: T.neonGreen, marginTop: '2px' }}>150,000원</div>
                  </div>
                  <div style={{ background: 'rgba(255, 207, 51, 0.16)', border: `2px solid ${T.gold}`, borderRadius: '12px', padding: '12px 6px', textAlign: 'center' }}>
                    <div style={{ fontSize: '12px', color: T.goldLt, fontWeight: 800 }}>B코스 (90분/추천)</div>
                    <div style={{ fontSize: '18px', fontWeight: 950, color: T.gold, marginTop: '2px' }}>190,000원</div>
                  </div>
                  <div style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '12px 6px', textAlign: 'center' }}>
                    <div style={{ fontSize: '12px', color: T.textMuted }}>C코스 (120분)</div>
                    <div style={{ fontSize: '17px', fontWeight: 950, color: T.neonGreen, marginTop: '2px' }}>240,000원</div>
                  </div>
                </div>
              </div>
            </div>

            {/* ── [이미지 2: 야경 펜트하우스 고혹적인 모델 비주얼] ── */}
            {/* 서울 야경이 내려다보이는 펜트하우스 소파 위 슬립 드레스의 매혹적인 여인 */}
            <div style={{ position: 'relative', width: '100%', height: '270px', borderRadius: '18px', overflow: 'hidden', border: `1.5px solid ${T.cardBorder}`, boxShadow: '0 14px 36px rgba(0,0,0,0.7)' }}>
              <Image
                src="/images/abam_penthouse_night.jpg"
                alt="서울의 밤 럭셔리 프라이빗 출장마사지 아밤"
                fill
                sizes="(max-width: 768px) 100vw, 680px"
                style={{ objectFit: 'cover' }}
              />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(180deg, transparent 0%, rgba(7, 9, 14, 0.95) 100%)', padding: '20px 16px 12px', textAlign: 'left' }}>
                <div style={{ color: T.gold, fontSize: '12px', fontWeight: 900 }}>PRIVATE LUXURY THERAPY</div>
                <div style={{ color: '#ffffff', fontSize: '15px', fontWeight: 950 }}>서울의 밤, 가장 완벽한 힐링 파트너 · 내상 없는 20대 에이스</div>
              </div>
            </div>

            {/* 코스 2: 20대 혼혈/글래머 힐링 코스 (인기 1위) */}
            <div style={{ background: T.card, borderRadius: '18px', border: `1.5px solid ${T.cardBorder}`, overflow: 'hidden', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' }}>
              <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span style={{ background: T.neonGreen, color: '#000', fontWeight: 950, fontSize: '11px', padding: '3px 8px', borderRadius: '4px', marginRight: '8px' }}>만족도 최고</span>
                  <strong style={{ fontSize: '18px', color: '#fff', fontWeight: 950 }}>20대 혼혈 VIP 스페셜 코스</strong>
                </div>
                <span style={{ fontSize: '12px', color: T.neonGreen, fontWeight: 800 }}>가성비 인기 1위</span>
              </div>
              <div style={{ padding: '16px 20px' }}>
                <p style={{ fontSize: '13px', color: '#cbd5e1', margin: '0 0 16px', lineHeight: 1.65 }}>
                  이국적인 매력과 섬세한 마인드를 겸비한 20대 정예 힐러들이 심신의 안정과 뭉친 근육을 부드럽게 이완하며 특별한 감동을 선사합니다.
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                  <div style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '12px 6px', textAlign: 'center' }}>
                    <div style={{ fontSize: '12px', color: T.textMuted }}>A코스 (60분)</div>
                    <div style={{ fontSize: '17px', fontWeight: 950, color: T.neonGreen, marginTop: '2px' }}>110,000원</div>
                  </div>
                  <div style={{ background: 'rgba(255, 207, 51, 0.14)', border: `1.5px solid ${T.gold}`, borderRadius: '12px', padding: '12px 6px', textAlign: 'center' }}>
                    <div style={{ fontSize: '12px', color: T.goldLt, fontWeight: 800 }}>B코스 (90분/인기)</div>
                    <div style={{ fontSize: '17.5px', fontWeight: 950, color: T.gold, marginTop: '2px' }}>130,000원</div>
                  </div>
                  <div style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '12px 6px', textAlign: 'center' }}>
                    <div style={{ fontSize: '12px', color: T.textMuted }}>C코스 (120분)</div>
                    <div style={{ fontSize: '17px', fontWeight: 950, color: T.neonGreen, marginTop: '2px' }}>150,000원</div>
                  </div>
                </div>
              </div>
            </div>

            {/* 코스 3: 정통 왓포 건식 타이 코스 (실속 피로회복) */}
            <div style={{ background: T.card, borderRadius: '18px', border: `1.5px solid ${T.cardBorder}`, overflow: 'hidden', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' }}>
              <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span style={{ background: 'rgba(255,255,255,0.2)', color: '#fff', fontWeight: 950, fontSize: '11px', padding: '3px 8px', borderRadius: '4px', marginRight: '8px' }}>실속 케어</span>
                  <strong style={{ fontSize: '18px', color: '#fff', fontWeight: 950 }}>정통 왓포 수기 지압 코스</strong>
                </div>
                <span style={{ fontSize: '12px', color: '#cbd5e1' }}>건식 전신 수기</span>
              </div>
              <div style={{ padding: '16px 20px' }}>
                <p style={{ fontSize: '13px', color: '#cbd5e1', margin: '0 0 16px', lineHeight: 1.65 }}>
                  오일을 사용하지 않고 편안한 복장 상태에서 진행되는 정통 왓포 방식의 수기 지압으로 뭉친 어깨, 목, 허리를 시원하게 풀어드립니다.
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                  <div style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '12px 6px', textAlign: 'center' }}>
                    <div style={{ fontSize: '12px', color: T.textMuted }}>60분</div>
                    <div style={{ fontSize: '17px', fontWeight: 950, color: T.neonGreen, marginTop: '2px' }}>80,000원</div>
                  </div>
                  <div style={{ background: 'rgba(255, 207, 51, 0.12)', border: `1.5px solid ${T.gold}`, borderRadius: '12px', padding: '12px 6px', textAlign: 'center' }}>
                    <div style={{ fontSize: '12px', color: T.goldLt, fontWeight: 800 }}>90분 (추천)</div>
                    <div style={{ fontSize: '17px', fontWeight: 950, color: T.gold, marginTop: '2px' }}>100,000원</div>
                  </div>
                  <div style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '12px 6px', textAlign: 'center' }}>
                    <div style={{ fontSize: '12px', color: T.textMuted }}>120분</div>
                    <div style={{ fontSize: '17px', fontWeight: 950, color: T.neonGreen, marginTop: '2px' }}>120,000원</div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ── 5. 선입금 사기 예방 필수 안내 (도도안마 YES! 스타일) ── */}
        <section id="caution" style={{ marginTop: '36px' }}>
          <div style={{ background: 'rgba(225, 29, 72, 0.08)', border: `2px dashed ${T.hotPink}`, borderRadius: '18px', padding: '22px 20px', textAlign: 'center' }}>
            <h3 style={{ color: T.hotPink, fontSize: '18px', fontWeight: 950, marginBottom: '8px' }}>
              선입금 및 예약금 사기 피해 예방 필독 안내
            </h3>
            <p style={{ color: '#f1f5f9', fontSize: '13.5px', lineHeight: 1.75, margin: '0 auto', maxWidth: '520px' }}>
              최근 예약금, 보증금, 출발비 등의 명목으로 선입금을 요구한 뒤 연락을 두절하는 <strong>선입금 사기 사이트</strong>가 많습니다.<br /><br />
              <strong>아밤(Abam)은 어떠한 경우에도 관리사 도착 전 단 1원도 먼저 입금을 요구하지 않습니다!</strong><br />
              자택, 원룸, 호텔, 모텔 등 계신 장소에 관리사가 도착하면 직접 확인하신 후 결제해 주세요.
            </p>
          </div>
        </section>

        {/* ── [이미지 3: 아로마 에센셜 오일 테라피 비주얼] ── */}
        <div style={{ marginTop: '20px', position: 'relative', width: '100%', height: '240px', borderRadius: '18px', overflow: 'hidden', border: `1.5px solid ${T.cardBorder}`, boxShadow: '0 12px 30px rgba(0,0,0,0.6)' }}>
          <Image
            src="/images/sensual_back.jpg"
            alt="최고급 천연 아로마 오일 테라피 아밤"
            fill
            sizes="(max-width: 768px) 100vw, 680px"
            style={{ objectFit: 'cover' }}
          />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(180deg, transparent 0%, rgba(7, 9, 14, 0.95) 100%)', padding: '16px', textAlign: 'left' }}>
            <div style={{ color: T.gold, fontSize: '12px', fontWeight: 900 }}>NATURAL ESSENTIAL OIL CARE</div>
            <div style={{ color: '#ffffff', fontSize: '14.5px', fontWeight: 950 }}>지친 전신 근육과 림프절을 부드럽게 이완하는 감성 힐링 케어</div>
          </div>
        </div>

        {/* ── 6. 간편 이용 안내 4단계 ── */}
        <section id="process" style={{ marginTop: '36px' }}>
          <div style={{ textAlign: 'center', marginBottom: '18px' }}>
            <h2 style={{ fontSize: '22px', fontWeight: 950, color: T.gold }}>간편 이용 4단계 프로세스</h2>
            <p style={{ fontSize: '12.5px', color: T.textMuted, margin: '2px 0 0' }}>복잡한 절차 없이 전화나 카톡 한 통으로 1분 만에 예약 완료</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
            <div style={{ background: T.card, border: `1px solid ${T.cardBorder}`, borderRadius: '14px', padding: '16px' }}>
              <div style={{ color: T.gold, fontWeight: 950, fontSize: '13px' }}>STEP 1</div>
              <div style={{ fontSize: '15px', fontWeight: 950, color: '#fff', margin: '3px 0' }}>코스 &amp; 시간 선택</div>
              <div style={{ fontSize: '12px', color: T.textMuted }}>스웨디시 / 아로마 / 타이 중 선택</div>
            </div>

            <div style={{ background: T.card, border: `1px solid ${T.cardBorder}`, borderRadius: '14px', padding: '16px' }}>
              <div style={{ color: T.gold, fontWeight: 950, fontSize: '13px' }}>STEP 2</div>
              <div style={{ fontSize: '15px', fontWeight: 950, color: '#fff', margin: '3px 0' }}>위치 및 시간 전달</div>
              <div style={{ fontSize: '12px', color: T.textMuted }}>자택, 호텔, 오피스텔 주소 전달</div>
            </div>

            <div style={{ background: T.card, border: `1px solid ${T.cardBorder}`, borderRadius: '14px', padding: '16px' }}>
              <div style={{ color: T.gold, fontWeight: 950, fontSize: '13px' }}>STEP 3</div>
              <div style={{ fontSize: '15px', fontWeight: 950, color: '#fff', margin: '3px 0' }}>30분 신속 방문</div>
              <div style={{ fontSize: '12px', color: T.textMuted }}>비품 일체 구비 후 매니저 도착</div>
            </div>

            <div style={{ background: T.card, border: `1px solid ${T.cardBorder}`, borderRadius: '14px', padding: '16px' }}>
              <div style={{ color: T.gold, fontWeight: 950, fontSize: '13px' }}>STEP 4</div>
              <div style={{ fontSize: '15px', fontWeight: 950, color: '#fff', margin: '3px 0' }}>현장 후불 결제</div>
              <div style={{ fontSize: '12px', color: T.textMuted }}>관리사 대면 후 안전하게 결제</div>
            </div>
          </div>
        </section>

        {/* ── [이미지 4: 프라이빗 1:1 케어 힐링 비주얼] ── */}
        <div style={{ marginTop: '20px', position: 'relative', width: '100%', height: '240px', borderRadius: '18px', overflow: 'hidden', border: `1.5px solid ${T.cardBorder}`, boxShadow: '0 12px 30px rgba(0,0,0,0.6)' }}>
          <Image
            src="/images/sensual_touch.jpg"
            alt="프라이빗 1:1 밀착 힐링 아밤"
            fill
            sizes="(max-width: 768px) 100vw, 680px"
            style={{ objectFit: 'cover' }}
          />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(180deg, transparent 0%, rgba(7, 9, 14, 0.95) 100%)', padding: '16px', textAlign: 'left' }}>
            <div style={{ color: T.gold, fontSize: '12px', fontWeight: 900 }}>EXCLUSIVE PRIVATE MASSAGE</div>
            <div style={{ color: '#ffffff', fontSize: '14.5px', fontWeight: 950 }}>오직 고객님 한 분만을 위한 프라이빗 맞춤 힐링 솔루션</div>
          </div>
        </div>

        {/* ── 7. 고객 솔직 후기 (도도 스타일 리얼 후기) ── */}
        <section style={{ marginTop: '36px' }}>
          <div style={{ textAlign: 'center', marginBottom: '18px' }}>
            <h2 style={{ fontSize: '22px', fontWeight: 950, color: T.gold }}>고객 리얼 이용 후기</h2>
            <p style={{ fontSize: '12.5px', color: T.textMuted, margin: '2px 0 0' }}>실제 이용 고객님들이 직접 남겨주신 솔직한 평가</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ background: T.card, border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px', padding: '16px 18px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ fontWeight: 900, fontSize: '14px', color: '#fff' }}>강남구 역삼동 김OO 님 | ★★★★★</span>
                <span style={{ color: T.gold, fontSize: '12px', fontWeight: 800 }}>스웨디시 90분</span>
              </div>
              <p style={{ fontSize: '13px', color: '#cbd5e1', margin: 0, lineHeight: 1.65 }}>
                야근 때문에 어깨랑 허리가 굳어서 불렀는데 기대 이상이었습니다. 선입금 요구도 전혀 없고 관리사분 도착하셔서 직접 뵙고 결제하니 안심되었습니다. 손길이 너무 부드럽고 시원해서 재방문 의사 100%입니다.
              </p>
            </div>

            <div style={{ background: T.card, border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px', padding: '16px 18px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ fontWeight: 900, fontSize: '14px', color: '#fff' }}>분당구 정자동 박OO 님 | ★★★★★</span>
                <span style={{ color: T.gold, fontSize: '12px', fontWeight: 800 }}>혼혈 VIP 90분</span>
              </div>
              <p style={{ fontSize: '13px', color: '#cbd5e1', margin: 0, lineHeight: 1.65 }}>
                새벽 늦은 시간에 예약했는데 25분 만에 정확히 오셨네요. 관리사분 미모도 훌륭하시고 대화도 상냥하게 잘 이끌어주셔서 대접받는 기분으로 푹 쉬었습니다. 강추합니다.
              </p>
            </div>

            <div style={{ background: T.card, border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px', padding: '16px 18px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ fontWeight: 900, fontSize: '14px', color: '#fff' }}>마포구 공덕동 최OO 님 | ★★★★★</span>
                <span style={{ color: T.gold, fontSize: '12px', fontWeight: 800 }}>정통 타이 60분</span>
              </div>
              <p style={{ fontSize: '13px', color: '#cbd5e1', margin: 0, lineHeight: 1.65 }}>
                호텔 출장으로 이용했는데 로비에서 대면 후 같이 방으로 올라와 관리받았습니다. 샵에 굳이 나갈 필요 없이 숙소에서 받으니 편안함의 차원이 다릅니다.
              </p>
            </div>
          </div>
        </section>

        {/* ── 8. 자주 묻는 질문 FAQ ── */}
        <section id="faq" style={{ marginTop: '36px' }}>
          <div style={{ textAlign: 'center', marginBottom: '18px' }}>
            <h2 style={{ fontSize: '22px', fontWeight: 950, color: T.gold }}>자주 묻는 질문 (FAQ)</h2>
            <p style={{ fontSize: '12.5px', color: T.textMuted, margin: '2px 0 0' }}>고객님께서 가장 자주 문의하시는 내용입니다</p>
          </div>

          <div style={{ background: T.card, borderRadius: '16px', border: `1.5px solid ${T.cardBorder}`, overflow: 'hidden' }}>
            {[
              { q: '정말 선입금이나 예약금을 먼저 보내야 하는 경우는 없나요?', a: '네, 어떠한 경우에도 없습니다. 아밤은 100% 현장 후불제만을 운영하며, 관리사가 고객님께 도착하기 전 선입금을 요구하는 행위는 100% 사기이므로 절대 입금하시면 안 됩니다.' },
              { q: '방문 가능한 장소는 어디인가요?', a: '고객님이 머무시는 서울 및 경기 전지역의 자택(아파트·빌라·오피스텔 등)과 호텔, 모텔 등 숙박업소 어디든 관리사가 직접 방문합니다.' },
              { q: '도착하는 데 얼마나 걸리나요?', a: '서울 25개 자치구 및 경기 주요 거점에 24시간 항시 대기 인력이 배치되어 있어 예약 확정 후 평균 20~30분 이내에 신속하게 도착합니다.' },
              { q: '결제 방법은 어떻게 되나요?', a: '관리사 도착 시 현금 또는 계좌이체 등 편하신 방법으로 현장에서 직접 대면 결제하시면 됩니다.' },
              { q: '따로 준비해야 할 비품이 있나요?', a: '아닙니다. 편안하게 기다려주시기만 하면 됩니다. 최고급 타월, 천연 오일 등 관리에 필요한 모든 비품은 담당 힐러가 완벽하게 준비하여 방문합니다.' },
            ].map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={i} style={{ borderBottom: i < 4 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
                  <button onClick={() => setOpenFaq(isOpen ? null : i)} style={{ width: '100%', padding: '16px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', textAlign: 'left', color: '#fff', fontSize: '14px', fontWeight: 800, background: 'none', border: 'none', cursor: 'pointer' }}>
                    <span>Q. {faq.q}</span>
                    <span style={{ color: T.gold, fontSize: '12px', marginLeft: '8px' }}>{isOpen ? '▲' : '▼'}</span>
                  </button>
                  {isOpen && (
                    <div style={{ padding: '0 18px 16px', fontSize: '13px', color: '#cbd5e1', lineHeight: 1.7, borderTop: '1px solid rgba(255,255,255,0.04)', paddingTop: '10px' }}>
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* ── 9. 도도안마 스타일 서울·수도권 전지역 서비스 네트워크 태그 ── */}
        {areaLinks && areaLinks.length > 0 && (
          <section style={{ marginTop: '36px' }}>
            <div style={{ fontSize: '13px', fontWeight: 900, color: T.gold, marginBottom: '10px', textAlign: 'center' }}>
              서울·경기 전지역 서비스 네트워크 (30분 신속 방문)
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', justifyContent: 'center' }}>
              {areaLinks.slice(0, 36).map((area, i) => (
                <Link key={i} href={`/seo/${encodeURIComponent(area)}`} style={{ textDecoration: 'none', fontSize: '11.5px', color: '#cbd5e1', background: 'rgba(15, 20, 34, 0.75)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '6px', padding: '4px 8px' }}>
                  {area}
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* ── 10. 푸터 ── */}
        <footer style={{ marginTop: '40px', paddingTop: '22px', borderTop: `1px solid ${T.cardBorder}`, fontSize: '12px', color: T.textDim, textAlign: 'center', lineHeight: 1.75 }}>
          <div style={{ fontSize: '14.5px', fontWeight: 950, color: '#ffffff', marginBottom: '6px' }}>
            아밤출장마사지 (Abam.kr) · 서울·경기 100% 현장 후불제 출장안마
          </div>
          <p style={{ margin: '0 0 4px', color: T.textMuted }}>
            서울 25개 자치구 및 경기 전역 30분 도착 · 20대 에이스 관리사 상시 대기
          </p>
          <p style={{ margin: 0, color: T.textDim }}>
            고객센터 {PHONE_NUM} · 카톡 ID: {KAKAO_ID} · 365일 24시간 연중무휴 · 선입금 없는 100% 현장 후불제
          </p>
        </footer>

      </main>

      {/* ── 11. 하단 고정 퀵 바 (도도안마 표준 초강력 2대 CTA) ── */}
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 2000,
        background: 'rgba(7, 9, 14, 0.98)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderTop: `1.5px solid ${T.gold}`,
        padding: '10px 16px',
        boxShadow: '0 -8px 25px rgba(0,0,0,0.8)',
      }}>
        <div style={{ maxWidth: '680px', margin: '0 auto', display: 'flex', gap: '10px', alignItems: 'center' }}>
          <a
            href={PHONE_TEL}
            style={{
              flex: 1.1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              background: T.hotPink,
              color: '#ffffff',
              fontWeight: 950,
              fontSize: '15.5px',
              padding: '13px 0',
              borderRadius: '12px',
              textDecoration: 'none',
              boxShadow: '0 4px 18px rgba(225, 29, 72, 0.55)',
            }}
          >
            <PhoneIcon size={18} /> 24시 전화 ({PHONE_NUM})
          </a>
          <a
            href="#"
            onClick={handleKakaoClick}
            style={{
              flex: 0.9,
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
            <KakaoIcon size={18} /> 카톡 상담
          </a>
        </div>
      </div>

    </div>
  );
}
