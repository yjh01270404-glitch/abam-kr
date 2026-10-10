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
• 희망 코스: (타이 / 아로마 / VIP 스페셜)
• 이용 시간: (60분 / 90분 / 120분)
• 희망 시간: 바로 가능 or 희망시간`;

const SMS_HREF = `sms:${PHONE_NUM}?body=${encodeURIComponent(BOOKING_TEMPLATE)}`;

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
    showToast('예약 양식이 복사되었습니다.');
  };

  const handleKakaoClick = (e: React.MouseEvent) => {
    if (isKo) {
      e.preventDefault();
      setKakaoModal(true);
    }
  };

  return (
    <div lang={c.htmlLang} style={{ minHeight: '100vh', background: '#0b0c10', color: '#ffffff', fontFamily: '-apple-system, BlinkMacSystemFont, "Pretendard", "Noto Sans KR", sans-serif', paddingBottom: '90px', lineHeight: 1.65 }}>
      
      {/* 토스트 */}
      {toast && (
        <div style={{ position: 'fixed', top: '24px', left: '50%', transform: 'translateX(-50%)', background: '#f59e0b', color: '#000', padding: '10px 24px', borderRadius: '30px', fontSize: '13.5px', fontWeight: 800, zIndex: 99999, boxShadow: '0 8px 25px rgba(0,0,0,0.8)' }}>
          {toast}
        </div>
      )}

      {/* 예약 상담 모달 */}
      {kakaoModal && (
        <div onClick={() => setKakaoModal(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', zIndex: 99998, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: '#12151f', border: '1px solid #2a3148', borderRadius: '16px', maxWidth: '380px', width: '100%', padding: '24px 20px', textAlign: 'center', boxShadow: '0 20px 50px rgba(0,0,0,0.9)' }}>
            <h3 style={{ fontSize: '19px', fontWeight: 900, color: '#fff', marginBottom: '6px' }}>아밤 24시 예약 및 상담</h3>
            <p style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '16px' }}>전화 또는 카톡으로 편하게 문의주세요.</p>

            <div style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '10px', padding: '12px', marginBottom: '16px', textAlign: 'left', fontSize: '12.5px', lineHeight: 1.6 }}>
              <div style={{ color: '#34d399', fontWeight: 900, marginBottom: '2px' }}>선입금 없는 100% 현장 후불제</div>
              <div style={{ color: '#cbd5e1' }}>도착 전 예약금·보증금을 요구하는 곳은 100% 사기입니다. 아밤은 관리사 도착 후 직접 대면 결제합니다.</div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '8px', marginBottom: '14px' }}>
              <div style={{ background: '#1a1f30', border: '1px solid #2e3752', borderRadius: '8px', padding: '8px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: '10px', color: '#94a3b8' }}>카톡 ID</div>
                  <div style={{ fontSize: '15px', fontWeight: 900, color: '#f59e0b' }}>{KAKAO_ID}</div>
                </div>
                <button onClick={copyId} style={{ background: '#f59e0b', color: '#000', padding: '4px 10px', borderRadius: '4px', fontSize: '11px', fontWeight: 800, border: 'none', cursor: 'pointer' }}>복사</button>
              </div>

              <button onClick={copyTemplate} style={{ background: '#1a1f30', border: '1px solid #2e3752', color: '#fcd34d', borderRadius: '8px', padding: '8px 10px', fontSize: '12px', fontWeight: 800, cursor: 'pointer' }}>
                양식 복사
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <a href={isKo ? '#' : c.contact.wa} onClick={copyId} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: '#fee500', color: '#181600', fontWeight: 900, fontSize: '14.5px', padding: '12px 0', borderRadius: '10px', textDecoration: 'none' }}>
                <KakaoIcon size={18} /> 카카오톡 ID 복사 &amp; 상담열기
              </a>

              <a href={SMS_HREF} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#1e2438', border: '1px solid #333d5c', color: '#ffffff', fontWeight: 800, fontSize: '14px', padding: '11px 0', borderRadius: '10px', textDecoration: 'none' }}>
                문자로 간편 예약하기
              </a>

              <a href={PHONE_TEL} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', background: '#c02654', color: '#ffffff', fontWeight: 900, fontSize: '14.5px', padding: '12px 0', borderRadius: '10px', textDecoration: 'none' }}>
                <PhoneIcon size={18} /> 전화 바로연결 ({PHONE_NUM})
              </a>

              <button onClick={() => setKakaoModal(false)} style={{ padding: '8px', background: 'transparent', color: '#94a3b8', fontSize: '12px', border: 'none', cursor: 'pointer', marginTop: '2px' }}>
                닫기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── 1. 상단 헤더: 좌측 로고 & 우측 메뉴 ── */}
      <header style={{ position: 'sticky', top: 0, zIndex: 1000, background: '#0b0c10', borderBottom: '1px solid #1f2433', padding: '14px 16px' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          
          <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '20px', fontWeight: 900, color: '#ffffff', letterSpacing: '-0.5px' }}>아밤출장마사지</span>
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#f59e0b', border: '1px solid #f59e0b', padding: '1px 6px', borderRadius: '3px' }}>100% 후불제</span>
          </Link>

          <nav style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <a href="#intro" style={{ color: '#cbd5e1', fontSize: '13.5px', fontWeight: 600, textDecoration: 'none', padding: '6px 8px' }}>소개말</a>
            <a href="#courses" style={{ color: '#cbd5e1', fontSize: '13.5px', fontWeight: 600, textDecoration: 'none', padding: '6px 8px' }}>코스안내</a>
            <a href="#guide" style={{ color: '#cbd5e1', fontSize: '13.5px', fontWeight: 600, textDecoration: 'none', padding: '6px 8px' }}>이용안내</a>
            <a href="#caution" style={{ color: '#f87171', fontSize: '13.5px', fontWeight: 700, textDecoration: 'none', padding: '6px 8px' }}>선입금주의</a>
          </nav>
        </div>
      </header>

      {/* ── 메인 본문 ── */}
      <main style={{ maxWidth: '640px', margin: '0 auto', padding: '0 16px' }}>

        {/* ── 2. 히어로 섹션 (도도안마 표준형) ── */}
        <section style={{ textAlign: 'center', paddingTop: '32px', paddingBottom: '20px' }}>
          
          <h1 style={{ fontSize: '28px', fontWeight: 900, lineHeight: 1.3, color: '#ffffff', margin: '0 0 14px', letterSpacing: '-0.5px' }}>
            출장안마 · 출장마사지 24시 아밤
          </h1>

          <p style={{ color: '#94a3b8', fontSize: '14px', lineHeight: 1.7, margin: '0 auto 18px', maxWidth: '480px' }}>
            아밤출장안마 &amp; 아밤출장마사지<br />
            서울 전 지역 · 경기 전역 선입금 없는 100% 후불제 프리미엄 출장 서비스
          </p>

          <div style={{ display: 'inline-flex', flexDirection: 'column', gap: '7px', textAlign: 'left', background: '#12151f', border: '1px solid #1f2538', borderRadius: '12px', padding: '14px 20px', marginBottom: '22px' }}>
            <div style={{ color: '#e2e8f0', fontSize: '13.5px', fontWeight: 600 }}>✓ 24시간 실시간 예약가능 시스템 ♥</div>
            <div style={{ color: '#e2e8f0', fontSize: '13.5px', fontWeight: 600 }}>✓ 프라이빗한 1:1 맞춤 케어 서비스 ♥</div>
            <div style={{ color: '#e2e8f0', fontSize: '13.5px', fontWeight: 600 }}>✓ 전문 교육을 수료한 20대 에이스 관리사 ♥</div>
            <div style={{ color: '#34d399', fontSize: '13.5px', fontWeight: 800 }}>✓ 선입금·예약금 없는 100% 현장 후불제 ♥</div>
          </div>

          <p style={{ fontSize: '14.5px', fontWeight: 700, color: '#fcd34d', margin: '0 0 16px' }}>
            힐링이 필요한 오늘 밤, 아밤을 편안하게 불러보세요!
          </p>

          {/* 초대형 전화연결 버튼 */}
          <div style={{ marginBottom: '14px' }}>
            <a
              href={PHONE_TEL}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                background: '#c02654',
                color: '#ffffff',
                fontWeight: 900,
                fontSize: '23px',
                padding: '16px 36px',
                borderRadius: '50px',
                textDecoration: 'none',
                boxShadow: '0 4px 20px rgba(192, 38, 84, 0.45)',
              }}
            >
              <PhoneIcon size={22} /> {PHONE_NUM}
            </a>
            <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '6px' }}>
              ( 터치 시 키패드로 바로 이동합니다 )
            </div>
          </div>

          {/* 카카오톡 상담 버튼 */}
          <div style={{ marginBottom: '26px' }}>
            <a
              href="#"
              onClick={handleKakaoClick}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                background: '#fee500',
                color: '#181600',
                fontWeight: 900,
                fontSize: '14.5px',
                padding: '12px 26px',
                borderRadius: '30px',
                textDecoration: 'none',
              }}
            >
              <KakaoIcon size={18} /> 카톡 ID - {KAKAO_ID}
            </a>
          </div>

          {/* 메인 히어로 고화질 실사 모델 화보 */}
          <div style={{ position: 'relative', width: '100%', height: '300px', borderRadius: '12px', overflow: 'hidden', border: '1px solid #1f2538' }}>
            <Image
              src="/images/abam_hero_seductive.jpg"
              alt="아밤 24시 출장마사지 힐링 케어"
              fill
              sizes="(max-width: 768px) 100vw, 640px"
              style={{ objectFit: 'cover' }}
              priority
            />
          </div>

        </section>

        {/* ── 3. 출장안마 서비스 안내 (도도안마 표준 본문 스타일) ── */}
        <section id="intro" style={{ marginTop: '28px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 900, color: '#ffffff', marginBottom: '8px', textAlign: 'center' }}>
            출장안마 서비스 안내
          </h2>
          <div style={{ width: '40px', height: '2px', background: '#f59e0b', margin: '0 auto 16px' }} />

          <div style={{ background: '#12151f', border: '1px solid #1f2538', borderRadius: '12px', padding: '22px 18px', fontSize: '13.5px', color: '#cbd5e1', lineHeight: 1.8 }}>
            <p style={{ margin: '0 0 14px' }}>
              출장안마는 고객이 원하는 장소로 전문 관리사가 직접 방문하여 편안하게 마사지를 받을 수 있는 방문형 힐링 서비스입니다.
            </p>
            <p style={{ margin: '0 0 14px' }}>
              아밤은 서울 및 경기 지역을 중심으로 선입금이나 예약금을 요구하지 않는 <strong>100% 후불제 출장안마 서비스</strong>를 24시간 운영하고 있으며, 고객이 안심하고 이용할 수 있는 환경을 최우선으로 생각합니다.
            </p>
            <p style={{ margin: 0 }}>
              바쁜 일상 속에서 마사지샵을 직접 방문하기 어려운 분들도 집, 호텔, 오피스텔, 숙소 등 원하시는 장소에서 편안하게 전문 마사지 케어를 받아보실 수 있습니다.
            </p>
          </div>
        </section>

        {/* ── 4. 아밤출장마사지는 고객님께 약속합니다 ── */}
        <section style={{ marginTop: '28px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 900, color: '#ffffff', marginBottom: '8px', textAlign: 'center' }}>
            아밤출장마사지는 고객님께 약속합니다
          </h2>
          <div style={{ width: '40px', height: '2px', background: '#f59e0b', margin: '0 auto 16px' }} />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
            <div style={{ background: '#12151f', border: '1px solid #1f2538', borderRadius: '10px', padding: '14px' }}>
              <div style={{ fontSize: '14.5px', fontWeight: 800, color: '#34d399', marginBottom: '4px' }}>1. 안심 후불제 원칙</div>
              <div style={{ fontSize: '12px', color: '#94a3b8', lineHeight: 1.6 }}>고객님의 불안을 없애기 위해 관리사 도착 후 결제하는 100% 후불제만을 고집합니다.</div>
            </div>

            <div style={{ background: '#12151f', border: '1px solid #1f2538', borderRadius: '10px', padding: '14px' }}>
              <div style={{ fontSize: '14.5px', fontWeight: 800, color: '#f59e0b', marginBottom: '4px' }}>2. 철저한 프라이버시</div>
              <div style={{ fontSize: '12px', color: '#94a3b8', lineHeight: 1.6 }}>연락처와 주소 등 고객님의 모든 정보는 관리 종료 즉시 안전하게 파기됩니다.</div>
            </div>

            <div style={{ background: '#12151f', border: '1px solid #1f2538', borderRadius: '10px', padding: '14px' }}>
              <div style={{ fontSize: '14.5px', fontWeight: 800, color: '#f59e0b', marginBottom: '4px' }}>3. 검증된 전문 힐러</div>
              <div style={{ fontSize: '12px', color: '#94a3b8', lineHeight: 1.6 }}>체계적인 교육과 실력, 인성이 검증된 20대 전문 관리사만을 채용합니다.</div>
            </div>

            <div style={{ background: '#12151f', border: '1px solid #1f2538', borderRadius: '10px', padding: '14px' }}>
              <div style={{ fontSize: '14.5px', fontWeight: 800, color: '#34d399', marginBottom: '4px' }}>4. 30분 총알 방문</div>
              <div style={{ fontSize: '12px', color: '#94a3b8', lineHeight: 1.6 }}>서울 25개 구 및 경기 전역 평균 20~30분 내로 신속하게 방문합니다.</div>
            </div>
          </div>
        </section>

        {/* ── 5. 코스 안내 (기존 아밤 오리지널 3대 코스: 타이, 아로마, 스페셜) ── */}
        <section id="courses" style={{ marginTop: '36px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 900, color: '#ffffff', marginBottom: '6px', textAlign: 'center' }}>
            아밤 대표코스 안내
          </h2>
          <p style={{ fontSize: '12.5px', color: '#94a3b8', textAlign: 'center', margin: '0 0 16px' }}>
            선입금 없는 100% 현장 후불 결제
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            
            {/* A코스: 타이 정통 테라피 */}
            <div style={{ background: '#12151f', border: '1px solid #1f2538', borderRadius: '12px', overflow: 'hidden' }}>
              <div style={{ padding: '14px 18px', borderBottom: '1px solid #1a2030', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <strong style={{ fontSize: '16.5px', color: '#ffffff', fontWeight: 800 }}>A코스 타이 정통 테라피 (건식 지압)</strong>
                <span style={{ fontSize: '12px', color: '#f59e0b' }}>왓포 수기</span>
              </div>
              <div style={{ padding: '14px 18px' }}>
                <p style={{ fontSize: '12.5px', color: '#94a3b8', margin: '0 0 12px', lineHeight: 1.6 }}>
                  오일을 사용하지 않고 편안한 관리복을 착용한 상태에서 진행되는 왓포 전통 방식의 건식 수기 지압 관리입니다. 뭉친 어깨, 목, 허리 근육을 시원하게 풀어드립니다.
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                  <div style={{ background: '#0b0c10', border: '1px solid #1f2538', borderRadius: '8px', padding: '10px 4px', textAlign: 'center' }}>
                    <div style={{ fontSize: '11.5px', color: '#94a3b8' }}>60분</div>
                    <div style={{ fontSize: '15px', fontWeight: 900, color: '#34d399', marginTop: '2px' }}>80,000원</div>
                  </div>
                  <div style={{ background: 'rgba(245, 158, 11, 0.08)', border: '1px solid #f59e0b', borderRadius: '8px', padding: '10px 4px', textAlign: 'center' }}>
                    <div style={{ fontSize: '11.5px', color: '#fcd34d' }}>90분 (인기)</div>
                    <div style={{ fontSize: '15.5px', fontWeight: 900, color: '#f59e0b', marginTop: '2px' }}>100,000원</div>
                  </div>
                  <div style={{ background: '#0b0c10', border: '1px solid #1f2538', borderRadius: '8px', padding: '10px 4px', textAlign: 'center' }}>
                    <div style={{ fontSize: '11.5px', color: '#94a3b8' }}>120분</div>
                    <div style={{ fontSize: '15px', fontWeight: 900, color: '#34d399', marginTop: '2px' }}>120,000원</div>
                  </div>
                </div>
              </div>
            </div>

            {/* B코스: 아로마 릴렉싱 케어 */}
            <div style={{ background: '#12151f', border: '1px solid #1f2538', borderRadius: '12px', overflow: 'hidden' }}>
              <div style={{ padding: '14px 18px', borderBottom: '1px solid #1a2030', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <strong style={{ fontSize: '16.5px', color: '#ffffff', fontWeight: 800 }}>B코스 아로마 릴렉싱 케어 (천연 에센셜)</strong>
                <span style={{ fontSize: '12px', color: '#34d399' }}>림프 순환</span>
              </div>
              <div style={{ padding: '14px 18px' }}>
                <p style={{ fontSize: '12.5px', color: '#94a3b8', margin: '0 0 12px', lineHeight: 1.6 }}>
                  피부 자극이 없는 최고급 천연 식물성 에센셜 오일을 전신에 도포하여 부드럽고 섬세한 수기 테크닉으로 림프절을 자극하고 깊은 휴식과 피로 해소를 돕습니다.
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                  <div style={{ background: '#0b0c10', border: '1px solid #1f2538', borderRadius: '8px', padding: '10px 4px', textAlign: 'center' }}>
                    <div style={{ fontSize: '11.5px', color: '#94a3b8' }}>60분</div>
                    <div style={{ fontSize: '15px', fontWeight: 900, color: '#34d399', marginTop: '2px' }}>90,000원</div>
                  </div>
                  <div style={{ background: 'rgba(245, 158, 11, 0.08)', border: '1px solid #f59e0b', borderRadius: '8px', padding: '10px 4px', textAlign: 'center' }}>
                    <div style={{ fontSize: '11.5px', color: '#fcd34d' }}>90분 (추천)</div>
                    <div style={{ fontSize: '15.5px', fontWeight: 900, color: '#f59e0b', marginTop: '2px' }}>110,000원</div>
                  </div>
                  <div style={{ background: '#0b0c10', border: '1px solid #1f2538', borderRadius: '8px', padding: '10px 4px', textAlign: 'center' }}>
                    <div style={{ fontSize: '11.5px', color: '#94a3b8' }}>120분</div>
                    <div style={{ fontSize: '15px', fontWeight: 900, color: '#34d399', marginTop: '2px' }}>140,000원</div>
                  </div>
                </div>
              </div>
            </div>

            {/* 중간 실사 화보 (서울 야경 펜트하우스 고혹적인 모델) */}
            <div style={{ position: 'relative', width: '100%', height: '280px', borderRadius: '12px', overflow: 'hidden', border: '1px solid #1f2538' }}>
              <Image
                src="/images/abam_penthouse_night.jpg"
                alt="서울의 밤 프라이빗 출장마사지 아밤"
                fill
                sizes="(max-width: 768px) 100vw, 640px"
                style={{ objectFit: 'cover' }}
              />
            </div>

            {/* C코스: 스페셜 VIP 올인원 코스 */}
            <div style={{ background: '#12151f', border: '1.5px solid #f59e0b', borderRadius: '12px', overflow: 'hidden' }}>
              <div style={{ padding: '14px 18px', borderBottom: '1px solid #1a2030', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(245, 158, 11, 0.08)' }}>
                <strong style={{ fontSize: '16.5px', color: '#ffffff', fontWeight: 800 }}>C코스 스페셜 VIP 올인원 힐링 코스</strong>
                <span style={{ fontSize: '12px', color: '#f59e0b', fontWeight: 800 }}>재이용률 1위</span>
              </div>
              <div style={{ padding: '14px 18px' }}>
                <p style={{ fontSize: '12.5px', color: '#cbd5e1', margin: '0 0 12px', lineHeight: 1.6 }}>
                  정통 건식 수기 지압으로 큰 근육을 먼저 시원하게 이완한 뒤, 천연 에센셜 오일로 림프와 미세 근막을 정밀하게 케어하는 최고 만족도의 복합 프로그램입니다.
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                  <div style={{ background: '#0b0c10', border: '1px solid #1f2538', borderRadius: '8px', padding: '10px 4px', textAlign: 'center' }}>
                    <div style={{ fontSize: '11.5px', color: '#94a3b8' }}>60분</div>
                    <div style={{ fontSize: '15px', fontWeight: 900, color: '#34d399', marginTop: '2px' }}>100,000원</div>
                  </div>
                  <div style={{ background: 'rgba(245, 158, 11, 0.12)', border: '1.5px solid #f59e0b', borderRadius: '8px', padding: '10px 4px', textAlign: 'center' }}>
                    <div style={{ fontSize: '11.5px', color: '#fcd34d', fontWeight: 700 }}>90분 (대표BEST)</div>
                    <div style={{ fontSize: '16px', fontWeight: 900, color: '#f59e0b', marginTop: '2px' }}>120,000원</div>
                  </div>
                  <div style={{ background: '#0b0c10', border: '1px solid #1f2538', borderRadius: '8px', padding: '10px 4px', textAlign: 'center' }}>
                    <div style={{ fontSize: '11.5px', color: '#94a3b8' }}>120분</div>
                    <div style={{ fontSize: '15px', fontWeight: 900, color: '#34d399', marginTop: '2px' }}>160,000원</div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ── 6. 선입금 주의 안내 (도도안마 YES! 스타일) ── */}
        <section id="caution" style={{ marginTop: '36px' }}>
          <div style={{ background: 'rgba(192, 38, 84, 0.08)', border: '1.5px dashed #c02654', borderRadius: '12px', padding: '20px 18px', textAlign: 'center' }}>
            <h3 style={{ color: '#f43f5e', fontSize: '17px', fontWeight: 900, margin: '0 0 8px' }}>
              아밤 출장안마 YES!
            </h3>
            <div style={{ fontSize: '13px', color: '#f1f5f9', lineHeight: 1.75, maxWidth: '500px', margin: '0 auto' }}>
              선입금 없는 100% 후불제 출장안마입니다.<br />
              선입금 또는 예약금, 보증금을 요구하거나 유도하는 업체는 100% 사기입니다!<br /><br />
              서울 전지역 자택 / 원룸 / 오피스텔 / 호텔 / 모텔<br />
              관리사 문 앞 도착 후 직접 만나뵙고 결제하는 안심 후불제 시스템입니다.
            </div>
          </div>
        </section>

        {/* ── 화보 2: 천연 에센셜 오일 테라피 ── */}
        <div style={{ marginTop: '20px', position: 'relative', width: '100%', height: '260px', borderRadius: '12px', overflow: 'hidden', border: '1px solid #1f2538' }}>
          <Image
            src="/images/sensual_back.jpg"
            alt="천연 아로마 오일 테라피"
            fill
            sizes="(max-width: 768px) 100vw, 640px"
            style={{ objectFit: 'cover' }}
          />
        </div>

        {/* ── 7. 이용 안내 4단계 ── */}
        <section id="guide" style={{ marginTop: '36px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 900, color: '#ffffff', marginBottom: '8px', textAlign: 'center' }}>
            출장마사지 이용 안내
          </h2>
          <div style={{ width: '40px', height: '2px', background: '#f59e0b', margin: '0 auto 16px' }} />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
            <div style={{ background: '#12151f', border: '1px solid #1f2538', borderRadius: '10px', padding: '14px' }}>
              <div style={{ color: '#f59e0b', fontWeight: 800, fontSize: '13px' }}>1단계</div>
              <div style={{ fontSize: '14.5px', fontWeight: 800, color: '#fff', margin: '2px 0' }}>코스 선택</div>
              <div style={{ fontSize: '12px', color: '#94a3b8' }}>타이 / 아로마 / 스페셜 중 선택</div>
            </div>

            <div style={{ background: '#12151f', border: '1px solid #1f2538', borderRadius: '10px', padding: '14px' }}>
              <div style={{ color: '#f59e0b', fontWeight: 800, fontSize: '13px' }}>2단계</div>
              <div style={{ fontSize: '14.5px', fontWeight: 800, color: '#fff', margin: '2px 0' }}>위치 전달</div>
              <div style={{ fontSize: '12px', color: '#94a3b8' }}>전화나 카톡으로 주소 전달</div>
            </div>

            <div style={{ background: '#12151f', border: '1px solid #1f2538', borderRadius: '10px', padding: '14px' }}>
              <div style={{ color: '#f59e0b', fontWeight: 800, fontSize: '13px' }}>3단계</div>
              <div style={{ fontSize: '14.5px', fontWeight: 800, color: '#fff', margin: '2px 0' }}>30분 내 도착</div>
              <div style={{ fontSize: '12px', color: '#94a3b8' }}>비품 일체 구비 후 매니저 도착</div>
            </div>

            <div style={{ background: '#12151f', border: '1px solid #1f2538', borderRadius: '10px', padding: '14px' }}>
              <div style={{ color: '#f59e0b', fontWeight: 800, fontSize: '13px' }}>4단계</div>
              <div style={{ fontSize: '14.5px', fontWeight: 800, color: '#fff', margin: '2px 0' }}>대면 후불 결제</div>
              <div style={{ fontSize: '12px', color: '#94a3b8' }}>관리사 직접 대면 후 결제</div>
            </div>
          </div>
        </section>

        {/* ── 화보 3: 프라이빗 케어 ── */}
        <div style={{ marginTop: '20px', position: 'relative', width: '100%', height: '260px', borderRadius: '12px', overflow: 'hidden', border: '1px solid #1f2538' }}>
          <Image
            src="/images/sensual_touch.jpg"
            alt="프라이빗 1:1 맞춤 힐링 케어"
            fill
            sizes="(max-width: 768px) 100vw, 640px"
            style={{ objectFit: 'cover' }}
          />
        </div>

        {/* ── 8. 고객 이용 후기 ── */}
        <section style={{ marginTop: '36px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 900, color: '#ffffff', marginBottom: '8px', textAlign: 'center' }}>
            고객 리얼 이용 후기
          </h2>
          <div style={{ width: '40px', height: '2px', background: '#f59e0b', margin: '0 auto 16px' }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ background: '#12151f', border: '1px solid #1f2538', borderRadius: '10px', padding: '14px 16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ fontWeight: 800, fontSize: '13.5px', color: '#fff' }}>강남구 역삼동 김OO 님 | ★★★★★</span>
                <span style={{ color: '#f59e0b', fontSize: '12px' }}>스페셜 90분</span>
              </div>
              <p style={{ fontSize: '12.5px', color: '#cbd5e1', margin: 0, lineHeight: 1.65 }}>
                야근 때문에 어깨랑 허리가 굳어서 불렀는데 기대 이상이었습니다. 선입금 요구도 전혀 없고 관리사분 도착하셔서 직접 뵙고 결제하니 안심되었습니다. 손길이 너무 부드럽고 시원해서 재방문 의사 100%입니다.
              </p>
            </div>

            <div style={{ background: '#12151f', border: '1px solid #1f2538', borderRadius: '10px', padding: '14px 16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ fontWeight: 800, fontSize: '13.5px', color: '#fff' }}>분당구 정자동 박OO 님 | ★★★★★</span>
                <span style={{ color: '#f59e0b', fontSize: '12px' }}>아로마 90분</span>
              </div>
              <p style={{ fontSize: '12.5px', color: '#cbd5e1', margin: 0, lineHeight: 1.65 }}>
                새벽 늦은 시간에 예약했는데 25분 만에 정확히 오셨네요. 관리사분 미모도 훌륭하시고 대화도 상냥하게 잘 이끌어주셔서 대접받는 기분으로 푹 쉬었습니다. 강추합니다.
              </p>
            </div>

            <div style={{ background: '#12151f', border: '1px solid #1f2538', borderRadius: '10px', padding: '14px 16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ fontWeight: 800, fontSize: '13.5px', color: '#fff' }}>마포구 공덕동 최OO 님 | ★★★★★</span>
                <span style={{ color: '#f59e0b', fontSize: '12px' }}>타이 60분</span>
              </div>
              <p style={{ fontSize: '12.5px', color: '#cbd5e1', margin: 0, lineHeight: 1.65 }}>
                호텔 출장으로 이용했는데 로비에서 대면 후 같이 방으로 올라와 관리받았습니다. 샵에 굳이 나갈 필요 없이 숙소에서 받으니 편안함의 차원이 다릅니다.
              </p>
            </div>
          </div>
        </section>

        {/* ── 9. 자주 묻는 질문 ── */}
        <section id="faq" style={{ marginTop: '36px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 900, color: '#ffffff', marginBottom: '8px', textAlign: 'center' }}>
            자주 묻는 질문
          </h2>
          <div style={{ width: '40px', height: '2px', background: '#f59e0b', margin: '0 auto 16px' }} />

          <div style={{ background: '#12151f', borderRadius: '12px', border: '1px solid #1f2538', overflow: 'hidden' }}>
            {[
              { q: '정말 선입금이나 예약금을 먼저 보내야 하는 경우는 없나요?', a: '네, 어떠한 경우에도 없습니다. 아밤은 100% 현장 후불제만을 운영하며, 관리사가 고객님께 도착하기 전 선입금을 요구하는 행위는 100% 사기이므로 절대 입금하시면 안 됩니다.' },
              { q: '방문 가능한 장소는 어디인가요?', a: '고객님이 머무시는 서울 및 경기 전지역의 자택(아파트·빌라·오피스텔 등)과 호텔, 모텔 등 숙박업소 어디든 관리사가 직접 방문합니다.' },
              { q: '도착하는 데 얼마나 걸리나요?', a: '서울 25개 자치구 및 경기 주요 거점에 24시간 항시 대기 인력이 배치되어 있어 예약 확정 후 평균 20~30분 이내에 신속하게 도착합니다.' },
              { q: '결제 방법은 어떻게 되나요?', a: '관리사 도착 시 현금 또는 계좌이체 등 편하신 방법으로 현장에서 직접 대면 결제하시면 됩니다.' },
              { q: '따로 준비해야 할 비품이 있나요?', a: '아닙니다. 편안하게 기다려주시기만 하면 됩니다. 최고급 타월, 천연 오일 등 관리에 필요한 모든 비품은 담당 힐러가 완벽하게 준비하여 방문합니다.' },
            ].map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={i} style={{ borderBottom: i < 4 ? '1px solid #1a2030' : 'none' }}>
                  <button onClick={() => setOpenFaq(isOpen ? null : i)} style={{ width: '100%', padding: '15px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', textAlign: 'left', color: '#fff', fontSize: '13.5px', fontWeight: 700, background: 'none', border: 'none', cursor: 'pointer' }}>
                    <span>Q. {faq.q}</span>
                    <span style={{ color: '#f59e0b', fontSize: '11px', marginLeft: '8px' }}>{isOpen ? '▲' : '▼'}</span>
                  </button>
                  {isOpen && (
                    <div style={{ padding: '0 16px 15px', fontSize: '13px', color: '#cbd5e1', lineHeight: 1.7, borderTop: '1px solid #161a26', paddingTop: '10px' }}>
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* ── 10. 서비스 가능 지역 ── */}
        {areaLinks && areaLinks.length > 0 && (
          <section style={{ marginTop: '36px' }}>
            <div style={{ fontSize: '13px', fontWeight: 800, color: '#f59e0b', marginBottom: '8px', textAlign: 'center' }}>
              서비스 가능 지역 (서울 · 경기 전지역 30분 신속 방문)
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', justifyContent: 'center' }}>
              {areaLinks.slice(0, 32).map((area, i) => (
                <Link key={i} href={`/seo/${encodeURIComponent(area)}`} style={{ textDecoration: 'none', fontSize: '11.5px', color: '#cbd5e1', background: '#12151f', border: '1px solid #1f2538', borderRadius: '4px', padding: '4px 8px' }}>
                  {area}
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* ── 11. 푸터 ── */}
        <footer style={{ marginTop: '40px', paddingTop: '20px', borderTop: '1px solid #1f2433', fontSize: '12px', color: '#64748b', textAlign: 'center', lineHeight: 1.7 }}>
          <div style={{ fontSize: '14px', fontWeight: 800, color: '#ffffff', marginBottom: '6px' }}>
            아밤출장마사지 (Abam.kr) · 서울·경기 100% 현장 후불제
          </div>
          <p style={{ margin: '0 0 4px', color: '#94a3b8' }}>
            서울 25개 자치구 및 경기 전역 30분 도착 · 20대 에이스 관리사 상시대기
          </p>
          <p style={{ margin: 0, color: '#64748b' }}>
            고객센터 {PHONE_NUM} · 카톡 ID: {KAKAO_ID} · 365일 24시간 연중무휴 · 선입금 없는 100% 현장 후불제
          </p>
          <p style={{ margin: '6px 0 0', fontSize: '11px', color: '#475569' }}>
            ©2024 Copyrightⓒ. 아밤출장마사지 All right reserved.
          </p>
        </footer>

      </main>

      {/* ── 12. 하단 고정 퀵바 (24시 전화 + 카톡 상담) ── */}
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 2000,
        background: '#0b0c10',
        borderTop: '1px solid #2a3148',
        padding: '10px 16px',
        boxShadow: '0 -4px 20px rgba(0,0,0,0.8)',
      }}>
        <div style={{ maxWidth: '640px', margin: '0 auto', display: 'flex', gap: '10px', alignItems: 'center' }}>
          <a
            href={PHONE_TEL}
            style={{
              flex: 1.1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              background: '#c02654',
              color: '#ffffff',
              fontWeight: 900,
              fontSize: '15px',
              padding: '13px 0',
              borderRadius: '10px',
              textDecoration: 'none',
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
              background: '#fee500',
              color: '#181600',
              fontWeight: 900,
              fontSize: '14.5px',
              padding: '13px 0',
              borderRadius: '10px',
              textDecoration: 'none',
            }}
          >
            <KakaoIcon size={18} /> 카톡 상담
          </a>
        </div>
      </div>

    </div>
  );
}
