'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

/* ─────────────────────────────────────────────
   상수
───────────────────────────────────────────── */
const KAKAO_ID   = 'Abam1004';
const KAKAO_LINK = 'kakaotalk://';
const PHONE_TEL  = 'tel:010-6607-2239';
const PHONE_NUM  = '010-6607-2239';
const WA_LINK    = 'https://wa.me/821066072239?text=Hello%20Abam%20Spa';

/* ─────────────────────────────────────────────
   디자인 토큰 (100% 화이트/라이트 모드 · 하이엔드 미니멀)
───────────────────────────────────────────── */
const C = {
  bg:      '#ffffff',
  bgSoft:  '#f8f9fa',
  dark:    '#111827',   // 짙은 텍스트
  mid:     '#4b5563',   // 보조 텍스트
  muted:   '#9ca3af',   // 연한 텍스트
  border:  '#f1f2f4',   // 극도로 은은한 구분선
  accent:  '#92400e',   // 웜 골드/앰버
  accentBg:'#fffbeb',
  kakao:   '#FEE500',
  kakaoBr: '#181600',
  green:   '#15803d',
  greenBg: '#f0fdf4',
};

/* ─────────────────────────────────────────────
   데이터
───────────────────────────────────────────── */
const THERAPISTS = [
  {
    name: '민서',
    age: '23세',
    spec: '166cm · 47kg · C컵 슬림',
    badge: '지명 1위',
    specialty: '감미로운 밀착 림프 순환 & 센슈얼 VIP 특화',
    desc: '상냥하고 매혹적인 눈웃음과 극상의 섬세한 손길. 지명 예약률 독보적 1위의 대표 에이스.',
    status: '즉시 배차 가능',
    isAvailable: true,
    img: '/images/ace_yuna.jpg',
  },
  {
    name: '채원',
    age: '24세',
    spec: '168cm · 49kg · S라인 글래머',
    badge: '예약 폭주',
    specialty: '정통 왓포 딥티슈 지압 + 황홀한 아로마 힐링',
    desc: '도회적인 분위기와 깊이 있는 압의 조화. 시원한 건식과 매혹적인 오일 케어를 완벽히 소화.',
    status: '심야 예약 접수 중',
    isAvailable: false,
    img: '/images/ace_seoa.jpg',
  },
  {
    name: '예린',
    age: '22세',
    spec: '165cm · 46kg · 꿀피부 슬렌더',
    badge: '에이스 힐러',
    specialty: '부드러운 손길과 섬세한 미세 근막 이완',
    desc: '살결을 스치는 조심스럽고 감각적인 온기. 굳어있던 심신의 긴장을 완전히 녹여내는 힐러.',
    status: '즉시 배차 가능',
    isAvailable: true,
    img: '/images/ace_jia.jpg',
  },
];

const COURSES = [
  {
    name: '타이 정통 코스',
    subtitle: '왓포 왕실 정통 건식 수기 지압',
    desc: '순면 관리복 착용 후 진행되는 왓포 정통 건식 지압. 뭉친 승모근, 척추, 골반의 피로를 시원하게 이완합니다.',
    badge: null,
    prices: [
      { time: '60분', price: '80,000원' },
      { time: '90분', price: '100,000원', isBest: true },
      { time: '120분', price: '120,000원' },
    ],
  },
  {
    name: '아로마 힐링 코스',
    subtitle: '100% 천연 식물성 에센셜 오일 케어',
    desc: '체온에 녹아드는 최고급 천연 오일로 전신 림프를 부드럽게 이완하여 부종 완화와 깊은 숙면을 선사합니다.',
    badge: null,
    prices: [
      { time: '60분', price: '90,000원' },
      { time: '90분', price: '110,000원', isBest: true },
      { time: '120분', price: '140,000원' },
    ],
  },
  {
    name: '감성힐링 테라피',
    subtitle: '섬세하고 감미로운 미세 근막 이완',
    desc: '심신의 긴장과 일상의 스트레스를 녹여내는 섬세한 터치와 따뜻한 손길로 극상의 심신 안정을 제공합니다.',
    badge: '추천',
    prices: [
      { time: '60분', price: '90,000원' },
      { time: '90분', price: '120,000원', isBest: true },
      { time: '120분', price: '150,000원' },
    ],
  },
  {
    name: '스페셜 듀얼 코스',
    subtitle: '정통 건식 지압 + 아로마 림프 믹스',
    desc: '시원한 타이 수기로 대근육을 먼저 풀어준 뒤, 아로마 오일 테라피로 전환하는 만족도 1위 복합 프로그램.',
    badge: '만족도 1위',
    prices: [
      { time: '60분', price: '100,000원' },
      { time: '90분', price: '140,000원', isBest: true },
      { time: '120분', price: '170,000원' },
    ],
  },
  {
    name: '프리미엄 VIP 시그니처',
    subtitle: '전신 수기 + 최고급 천연 오일 + 림프 풀코스',
    desc: '에이스 테라피스트 전담 배정. 전신 건식 수기부터 천연 힐링 오일, 림프 집중 케어까지 전 과정을 정성껏 진행합니다.',
    badge: 'BEST',
    prices: [
      { time: '60분', price: '120,000원' },
      { time: '90분', price: '160,000원', isBest: true },
      { time: '120분', price: '200,000원' },
    ],
  },
];

const REVIEWS = [
  {
    author: '김*호 님',
    area: '강남구 역삼동 호텔',
    course: 'VIP 시그니처 90분 (민서 쌤)',
    text: '서울 출장 중 이용했습니다. 사전 예약금 없이 직접 도착하신 후 결제하는 방식이라 안심할 수 있었고, 민서 관리사님의 정성 어린 손길 덕분에 출장 피로가 말끔히 풀렸습니다.',
  },
  {
    author: '박*훈 님',
    area: '마포구 공덕동 자택',
    course: '스페셜 듀얼 테라피 90분',
    text: '마포 집까지 25분 만에 정확히 방문해 주셨습니다. 순면 관리복과 천연 오일을 챙겨오셔서 제 방이 순식간에 호텔 스파로 변신했네요. 깊은 숙면을 취했습니다.',
  },
  {
    author: '조*현 님',
    area: '여의도 콘래드 호텔',
    course: 'VIP 시그니처 120분 (채원 쌤)',
    text: '채원 테라피스트님의 단아한 매너와 섬세한 테크닉에 깊은 인상을 받았습니다. 철저한 프라이버시 속에서 진정한 힐링을 누렸습니다.',
  },
];

const FAQS = [
  {
    q: '서울 전지역 모두 방문 가능한가요?',
    a: '네, 서울특별시 25개 자치구 전지역 모두 정성껏 찾아뵙고 있습니다. 최상의 서비스 품질과 20~30분 내외 신속 방문을 위해 서울 전역에 집중 배차하며, 매일 저녁 7시부터 새벽 5시까지 운영합니다.',
  },
  {
    q: '예약 시 선입금이나 예약금을 요구하나요?',
    a: '아닙니다. 아름다운 밤은 사전 예약금, 보증금 등을 일체 요구하지 않습니다. 전문 테라피스트가 고객님 계신 곳에 도착하여 직접 인사드린 후 결제하는 100% 현장 대면결제 원칙만을 고수합니다.',
  },
  {
    q: '예약 후 도착까지 시간은 얼마나 걸리나요?',
    a: '서울 전역 주요 거점에 전문 테라피스트가 상시 대기하고 있어, 예약 확정 후 평균 20~30분 내외로 신속하게 방문합니다. 출발 시 예상 도착 시간을 미리 친절히 안내해 드립니다.',
  },
  {
    q: '결제는 어떤 수단으로 가능한가요? (카드/현금)',
    a: '국내외 모든 신용카드 및 체크카드(Visa, Master, Amex, JCB), 현금(원화·달러), 계좌이체 결제가 모두 가능하며, 현장에서 영수증 증빙도 즉시 발급됩니다.',
  },
  {
    q: '호텔, 레지던스, 오피스텔, 일반 자택 모두 방문이 가능한가요?',
    a: '네, 고객님만의 독립된 공간이라면 어디든 방문 가능합니다. 일반 자택(아파트·빌라)은 물론 서울 전역 호텔, 레지던스, 오피스텔 모두 가능하며, 호텔의 경우 객실 호수만 알려주시면 규정에 맞춰 조용히 찾아갑니다.',
  },
  {
    q: '프로필 속 관리사분이 실제로 직접 오시나요?',
    a: '네, 실물 프로필 100% 일치를 철저한 원칙으로 운영합니다. 서울 전역 권역별 거점에 상시 대기 중인 30여 명의 엄선된 20대 전문 테라피스트(민서, 채원, 예린 등 대표 에이스를 비롯하여 다양한 스타일의 전문 힐러진)를 보유하고 있으며, 원하시는 테라피스트를 지정하시면 반드시 해당 관리사가 직접 방문합니다.',
  },
];

// 서울 주요 지역 SEO 키워드
const POPULAR_AREAS = [
  '강남출장마사지', '강남홈타이', '역삼출장마사지', '논현출장마사지', '선릉출장마사지', '청담출장마사지', '압구정출장마사지',
  '서초출장마사지', '서초홈타이', '반포출장마사지', '송파출장마사지', '잠실출장마사지', '마포출장마사지', '홍대출장마사지',
  '공덕출장마사지', '용산출장마사지', '한남출장마사지', '이태원출장마사지', '여의도출장마사지', '영등포출장마사지',
  '성수출장마사지', '종로출장마사지', '명동출장마사지', '동작출장마사지', '사당출장마사지', '관악출장마사지', '신림출장마사지',
  '호텔출장마사지', '24시출장마사지', '선입금없는출장마사지', '대면결제출장마사지'
];

/* ─────────────────────────────────────────────
   메인 컴포넌트
───────────────────────────────────────────── */
export default function HomePage() {
  const [openFaq, setOpenFaq]     = useState<number | null>(null);
  const [kakaoModal, setKakaoModal] = useState(false);
  const [toast, setToast]         = useState<string | null>(null);

  const handleKakao = (e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(KAKAO_ID).catch(() => {});
    }
    setKakaoModal(true);
  };

  const copyId = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(KAKAO_ID).catch(() => {});
    }
    setToast(`카톡 ID [${KAKAO_ID}] 복사 완료`);
    setTimeout(() => setToast(null), 2000);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: C.bg, color: C.dark, paddingBottom: '90px' }}>

      {/* ── 토스트 ── */}
      {toast && (
        <div style={{
          position: 'fixed', top: '16px', left: '50%', transform: 'translateX(-50%)',
          backgroundColor: C.dark, color: '#ffffff',
          padding: '10px 22px', borderRadius: '30px',
          fontSize: '13px', fontWeight: 700, zIndex: 99999,
          boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
        }}>
          {toast}
        </div>
      )}

      {/* ── 카카오톡 상담 모달 ── */}
      {kakaoModal && (
        <div
          onClick={() => setKakaoModal(false)}
          style={{
            position: 'fixed', inset: 0,
            backgroundColor: 'rgba(17, 24, 39, 0.45)',
            backdropFilter: 'blur(4px)',
            zIndex: 99998,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '20px',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: '#ffffff', borderRadius: '20px',
              maxWidth: '380px', width: '100%',
              padding: '28px 22px', textAlign: 'center',
              boxShadow: '0 24px 48px rgba(0,0,0,0.12)',
            }}
          >
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: C.kakao, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 3C7.03 3 3 6.36 3 10.5c0 2.63 1.58 4.96 4 6.37L6 20l3.5-2.1c.8.17 1.63.26 2.5.26 4.97 0 9-3.36 9-7.5S16.97 3 12 3z" fill={C.kakaoBr}/></svg>
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: 900, color: C.dark, margin: '0 0 6px' }}>카카오톡 1:1 예약 상담</h3>
            <p style={{ fontSize: '13px', color: C.mid, margin: '0 0 18px', lineHeight: 1.5 }}>
              친구 추가 후 희망 코스와 방문 장소를<br />말씀해 주시면 즉시 친절히 안내해 드립니다.
            </p>

            <div style={{ backgroundColor: C.bgSoft, border: `1px solid ${C.border}`, borderRadius: '12px', padding: '14px 16px', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '11px', color: C.muted, fontWeight: 600 }}>카카오톡 공식 ID</div>
                <div style={{ fontSize: '18px', fontWeight: 900, color: C.dark }}>{KAKAO_ID}</div>
              </div>
              <button
                onClick={copyId}
                style={{ backgroundColor: C.kakao, color: C.kakaoBr, padding: '7px 14px', borderRadius: '7px', fontSize: '12px', fontWeight: 800 }}
              >
                ID 복사
              </button>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <a
                href={KAKAO_LINK}
                onClick={() => setKakaoModal(false)}
                style={{ flex: 1, backgroundColor: C.kakao, color: C.kakaoBr, fontWeight: 900, fontSize: '14px', padding: '13px 0', borderRadius: '10px', textDecoration: 'none' }}
              >
                카카오톡 열기
              </a>
              <button
                onClick={() => setKakaoModal(false)}
                style={{ padding: '13px 18px', backgroundColor: '#f3f4f6', color: C.mid, borderRadius: '10px', fontWeight: 700, fontSize: '13px' }}
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── 상단 띠 (초간결) ── */}
      <div style={{ backgroundColor: C.bgSoft, borderBottom: `1px solid ${C.border}`, padding: '8px 16px', textAlign: 'center', fontSize: '12px', color: C.mid }}>
        서울 전지역 20~30분 도착 · <strong style={{ color: C.dark }}>100% 현장 대면결제 (선입금 0원)</strong>
      </div>

      {/* ── 헤더 ── */}
      <header style={{ position: 'sticky', top: 0, zIndex: 40, backgroundColor: 'rgba(255, 255, 255, 0.98)', backdropFilter: 'blur(12px)', borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: '640px', margin: '0 auto', padding: '12px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: '17px', fontWeight: 900, color: C.dark, letterSpacing: '-0.3px' }}>
              아름다운 밤 <span style={{ fontSize: '11px', fontWeight: 700, color: C.accent }}>Abam</span>
            </div>
            <div style={{ fontSize: '11px', color: C.muted }}>프라이빗 심야 1:1 방문 홈케어</div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, color: C.dark, backgroundColor: C.bgSoft, padding: '3px 7px', borderRadius: '4px' }}>KR</span>
            <Link href="/en" style={{ fontSize: '11px', color: C.muted, padding: '3px 5px' }}>EN</Link>
            <Link href="/jp" style={{ fontSize: '11px', color: C.muted, padding: '3px 5px' }}>JP</Link>
            <Link href="/cn" style={{ fontSize: '11px', color: C.muted, padding: '3px 5px' }}>CN</Link>
          </div>
        </div>
      </header>

      {/* ── 본문 ── */}
      <main style={{ maxWidth: '640px', margin: '0 auto', padding: '0 18px' }}>

        {/* ── 1. 히어로 ── */}
        <section style={{ paddingTop: '32px', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '12px', fontWeight: 700, color: C.accent, backgroundColor: C.accentBg, padding: '4px 12px', borderRadius: '20px', marginBottom: '16px' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: C.green }} />
            서울 전지역 20~30분 신속 방문 · 100% 현장 대면결제
          </div>

          <h1 style={{ fontSize: '28px', fontWeight: 900, lineHeight: 1.35, color: C.dark, margin: '0 0 14px', letterSpacing: '-0.5px' }}>
            지친 하루의 끝,<br />
            가장 아늑한 밤을 선물합니다
          </h1>

          <p style={{ fontSize: '14px', color: C.mid, lineHeight: 1.7, margin: '0 auto 24px', maxWidth: '440px' }}>
            도메인 <strong>abam.kr</strong> 그대로, 엄선된 20대 전문 테라피스트가 고객님의 프라이빗 룸(호텔, 자택, 오피스텔)으로 직접 찾아갑니다.
            사전 예약금 없는 100% 현장 대면결제로 안심하고 편안한 휴식을 누리세요.
          </p>

          {/* 2대 메인 CTA 버튼 */}
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '28px' }}>
            <a
              href={KAKAO_LINK}
              onClick={handleKakao}
              style={{
                flex: 1, maxWidth: '210px',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                backgroundColor: C.kakao, color: C.kakaoBr,
                fontWeight: 900, fontSize: '14.5px', padding: '14px 0', borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(254, 229, 0, 0.25)',
                textDecoration: 'none',
              }}
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none"><path d="M12 3C7.03 3 3 6.36 3 10.5c0 2.63 1.58 4.96 4 6.37L6 20l3.5-2.1c.8.17 1.63.26 2.5.26 4.97 0 9-3.36 9-7.5S16.97 3 12 3z" fill={C.kakaoBr}/></svg>
              카카오톡 1:1 상담
            </a>
            <a
              href={PHONE_TEL}
              style={{
                flex: 1, maxWidth: '210px',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                backgroundColor: C.dark, color: '#ffffff',
                fontWeight: 800, fontSize: '14.5px', padding: '14px 0', borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(17, 24, 39, 0.15)',
                textDecoration: 'none',
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" fill="#ffffff"/></svg>
              010-6607-2239
            </a>
          </div>

          {/* 대형 호텔 스파 비주얼 */}
          <div style={{ position: 'relative', width: '100%', height: '240px', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
            <Image src="/images/hero_sensual_goddess.jpg" alt="아름다운 밤 타이 홈케어" fill style={{ objectFit: 'cover' }} priority />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '16px', background: 'linear-gradient(to top, rgba(17, 24, 39, 0.75), transparent)', color: '#ffffff', textAlign: 'left' }}>
              <div style={{ fontSize: '11px', color: '#fef08a', fontWeight: 700 }}>SEOUL PRIVATE IN-ROOM SPA</div>
              <div style={{ fontSize: '15px', fontWeight: 900 }}>살결을 타고 흐르는 은은한 아로마와 따뜻한 손길</div>
            </div>
          </div>
        </section>

        {/* ── 구분선 ── */}
        <div style={{ height: '1px', backgroundColor: C.border, margin: '44px 0 36px' }} />

        {/* ── 2. 오늘 밤 테라피스트 (30여 명 인력풀) ── */}
        <section>
          <div style={{ marginBottom: '18px' }}>
            <div style={{ fontSize: '11px', fontWeight: 800, color: C.accent, letterSpacing: '0.8px' }}>TODAY'S THERAPISTS</div>
            <h2 style={{ fontSize: '20px', fontWeight: 900, color: C.dark, margin: '2px 0 4px' }}>오늘 밤 출근 대표 테라피스트</h2>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '12px', color: C.green, fontWeight: 700 }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: C.green }} />
              서울 권역별 30여 명 전문 힐러 상시 대기 중
            </div>
          </div>

          {/* 3인 테라피스트 프로필 리스트 (모바일 최적화 세로형 카드) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {THERAPISTS.map((t, i) => (
              <div
                key={i}
                style={{
                  backgroundColor: '#ffffff',
                  border: `1px solid ${C.border}`,
                  borderRadius: '16px',
                  overflow: 'hidden',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.02)',
                }}
              >
                {/* 사진 */}
                <div style={{ position: 'relative', width: '100%', height: '260px' }}>
                  <Image src={t.img} alt={t.name} fill style={{ objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', top: '12px', left: '12px', backgroundColor: 'rgba(17, 24, 39, 0.8)', color: '#fef08a', fontSize: '11px', fontWeight: 800, padding: '3px 8px', borderRadius: '6px', backdropFilter: 'blur(4px)' }}>
                    {t.badge}
                  </div>
                </div>

                {/* 프로필 정보 */}
                <div style={{ padding: '16px 16px 12px' }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <div style={{ fontSize: '18px', fontWeight: 900, color: C.dark }}>
                      {t.name} <span style={{ fontSize: '13px', color: C.muted, fontWeight: 500 }}>({t.age})</span>
                    </div>
                    <div style={{ fontSize: '12.5px', fontWeight: 800, color: C.accent }}>{t.spec}</div>
                  </div>

                  <div style={{ fontSize: '13px', fontWeight: 800, color: C.dark, margin: '6px 0 3px' }}>{t.specialty}</div>
                  <p style={{ fontSize: '12px', color: C.mid, lineHeight: 1.55, margin: '0 0 10px' }}>{t.desc}</p>

                  <div style={{ fontSize: '11.5px', fontWeight: 700, color: t.isAvailable ? C.green : '#d97706', marginBottom: '12px' }}>
                    {t.isAvailable ? '●' : '○'} {t.status}
                  </div>

                  {/* 지명 버튼 */}
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <a
                      href={KAKAO_LINK}
                      onClick={handleKakao}
                      style={{
                        flex: 1.2,
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px',
                        backgroundColor: C.kakao, color: C.kakaoBr,
                        fontWeight: 900, fontSize: '13px', padding: '11px 0', borderRadius: '8px',
                        textDecoration: 'none',
                      }}
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M12 3C7.03 3 3 6.36 3 10.5c0 2.63 1.58 4.96 4 6.37L6 20l3.5-2.1c.8.17 1.63.26 2.5.26 4.97 0 9-3.36 9-7.5S16.97 3 12 3z" fill={C.kakaoBr}/></svg>
                      {t.name} 카톡지명
                    </a>
                    <a
                      href={PHONE_TEL}
                      style={{
                        flex: 1,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        backgroundColor: C.dark, color: '#ffffff',
                        fontWeight: 800, fontSize: '13px', padding: '11px 0', borderRadius: '8px',
                        textDecoration: 'none',
                      }}
                    >
                      전화지명
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 30여 명 인력풀 정갈한 안내 박스 */}
          <div style={{ marginTop: '16px', padding: '14px 16px', backgroundColor: C.bgSoft, border: `1px solid ${C.border}`, borderRadius: '12px', fontSize: '12.5px', color: C.mid, lineHeight: 1.6 }}>
            <strong style={{ color: C.dark }}>서울 전역 30여 명의 20대 전문 테라피스트 상시 대기</strong><br />
            소개된 대표 에이스 외에도 각 권역 거점에 다양한 매력과 스타일(슬렌더, 글래머, 딥티슈 압 조절 등)의 전문 힐러진이 대기 중입니다. 예약 시 희망하시는 스타일을 편안하게 말씀해 주세요.
          </div>
        </section>

        {/* ── 구분선 ── */}
        <div style={{ height: '1px', backgroundColor: C.border, margin: '44px 0 36px' }} />

        {/* ── 3. 코스 및 정찰제 가격표 (호텔 스파 메뉴판 스타일) ── */}
        <section>
          <div style={{ marginBottom: '18px' }}>
            <div style={{ fontSize: '11px', fontWeight: 800, color: C.accent, letterSpacing: '0.8px' }}>SPA MENU &amp; PRICING</div>
            <h2 style={{ fontSize: '20px', fontWeight: 900, color: C.dark, margin: '2px 0 4px' }}>시그니처 코스 및 투명 정찰제</h2>
            <p style={{ fontSize: '12.5px', color: C.muted, margin: 0 }}>
              선입금 0원 · 전 코스 도착 후 직접 뵙고 현장 결제 (카드 / 현금 / 계좌이체)
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {COURSES.map((course, i) => (
              <div
                key={i}
                style={{
                  backgroundColor: '#ffffff',
                  border: `1px solid ${C.border}`,
                  borderRadius: '14px',
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontSize: '16px', fontWeight: 900, color: C.dark }}>{course.name}</span>
                    {course.badge && (
                      <span style={{ fontSize: '10px', fontWeight: 800, color: '#ffffff', backgroundColor: '#dc2626', padding: '1px 6px', borderRadius: '4px' }}>
                        {course.badge}
                      </span>
                    )}
                  </div>
                  <span style={{ fontSize: '11px', color: C.accent, fontWeight: 700 }}>{course.subtitle}</span>
                </div>

                <p style={{ fontSize: '12px', color: C.mid, lineHeight: 1.5, margin: 0 }}>
                  {course.desc}
                </p>

                {/* 가격표 3단 (군더더기 없는 가로 정렬) */}
                <div style={{ display: 'flex', gap: '8px', paddingTop: '8px', borderTop: `1px solid ${C.border}`, marginTop: '4px' }}>
                  {course.prices.map((p, pi) => (
                    <div key={pi} style={{ flex: 1, backgroundColor: C.bgSoft, padding: '7px 8px', borderRadius: '8px', textAlign: 'center' }}>
                      <div style={{ fontSize: '10.5px', color: C.muted }}>{p.time}</div>
                      <div style={{ fontSize: '13px', fontWeight: 900, color: p.isBest ? '#dc2626' : C.dark }}>
                        {p.price}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* 3대 위생 & 청결 안심 약속 (군더더기 없는 정갈한 텍스트 그리드) */}
          <div style={{ marginTop: '16px', padding: '16px', backgroundColor: C.bgSoft, borderRadius: '12px', border: `1px solid ${C.border}` }}>
            <div style={{ fontSize: '12px', fontWeight: 800, color: C.dark, marginBottom: '8px', textAlign: 'center' }}>
              ✨ 아름다운 밤 3대 청결 &amp; 위생 안심 원칙
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '8px', fontSize: '11.5px', color: C.mid, lineHeight: 1.5 }}>
              <div>• <strong>1회용 청결 소독 패드</strong> 완비 (침구 오염 원천 방지)</div>
              <div>• <strong>100% 최고급 천연 수용성 오일</strong> (끈적임·얼룩 없음)</div>
              <div>• <strong>순면 고급 관리복 무상 제공</strong> (서울 전지역 출장비 포함)</div>
            </div>
          </div>
        </section>

        {/* ── 구분선 ── */}
        <div style={{ height: '1px', backgroundColor: C.border, margin: '44px 0 36px' }} />

        {/* ── 4. 간편 이용 3단계 & 100% 안심 보장 ── */}
        <section>
          <div style={{ marginBottom: '18px' }}>
            <div style={{ fontSize: '11px', fontWeight: 800, color: C.accent, letterSpacing: '0.8px' }}>HOW TO USE</div>
            <h2 style={{ fontSize: '20px', fontWeight: 900, color: C.dark, margin: '2px 0 4px' }}>간편 이용 3단계</h2>
            <p style={{ fontSize: '12.5px', color: C.muted, margin: 0 }}>가입 없이 30초 만에 예약 완료</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {[
              { no: '01', title: '실시간 예약 접수', desc: '카카오톡 또는 전화로 희망 코스와 방문 장소(자택, 호텔, 오피스텔)를 말씀해 주세요.' },
              { no: '02', title: '20~30분 내 도착', desc: '가장 가까운 권역의 전담 테라피스트가 위생 비품을 지참하여 신속히 방문합니다.' },
              { no: '03', title: '대면 확인 후 결제', desc: '관리사가 도착한 것을 직접 확인하신 후 안전하게 결제하시고 편안한 힐링을 누리세요.' },
            ].map((s, i) => (
              <div key={i} style={{ backgroundColor: '#ffffff', border: `1px solid ${C.border}`, borderRadius: '12px', padding: '14px 16px', display: 'flex', gap: '14px', alignItems: 'center' }}>
                <div style={{ fontSize: '16px', fontWeight: 900, color: C.accent, minWidth: '24px' }}>{s.no}</div>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 800, color: C.dark }}>{s.title}</div>
                  <div style={{ fontSize: '12px', color: C.mid, marginTop: '2px' }}>{s.desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* 선입금 없는 안심 결제 배너 */}
          <div style={{ marginTop: '12px', padding: '14px 16px', backgroundColor: C.greenBg, border: '1px solid #bbf7d0', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px' }}>
            <div>
              <div style={{ fontSize: '13px', fontWeight: 900, color: '#166534' }}>선입금 없는 100% 현장 대면 안심결제 원칙</div>
              <div style={{ fontSize: '11.5px', color: '#14532d', marginTop: '2px' }}>방문 전 사전 입금은 단 1원도 요구하지 않으므로 안심하고 예약하세요.</div>
            </div>
            <a href={PHONE_TEL} style={{ backgroundColor: '#166534', color: '#ffffff', padding: '8px 14px', borderRadius: '8px', fontSize: '12px', fontWeight: 800, textDecoration: 'none', whiteSpace: 'nowrap' }}>
              전화예약
            </a>
          </div>
        </section>

        {/* ── 구분선 ── */}
        <div style={{ height: '1px', backgroundColor: C.border, margin: '44px 0 36px' }} />

        {/* ── 5. 고객 리얼 후기 ── */}
        <section>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div>
              <div style={{ fontSize: '11px', fontWeight: 800, color: C.accent, letterSpacing: '0.8px' }}>REVIEWS</div>
              <h2 style={{ fontSize: '20px', fontWeight: 900, color: C.dark, margin: '2px 0 0' }}>실제 고객 솔직 후기</h2>
            </div>
            <div style={{ fontSize: '12px', color: C.accent, fontWeight: 800 }}>★ 평점 5.0 만점</div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {REVIEWS.map((rev, i) => (
              <div key={i} style={{ backgroundColor: '#ffffff', border: `1px solid ${C.border}`, borderRadius: '12px', padding: '14px 16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 800, color: C.dark }}>{rev.author} <span style={{ fontSize: '11px', color: C.muted, fontWeight: 500 }}>({rev.area})</span></span>
                  <span style={{ fontSize: '11px', color: '#eab308' }}>★★★★★</span>
                </div>
                <div style={{ fontSize: '11px', color: C.accent, fontWeight: 700, marginBottom: '6px' }}>{rev.course}</div>
                <p style={{ fontSize: '12.5px', color: C.mid, lineHeight: 1.55, margin: 0 }}>"{rev.text}"</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── 구분선 ── */}
        <div style={{ height: '1px', backgroundColor: C.border, margin: '44px 0 36px' }} />

        {/* ── 6. 자주 묻는 질문 (FAQ) ── */}
        <section>
          <div style={{ marginBottom: '18px' }}>
            <div style={{ fontSize: '11px', fontWeight: 800, color: C.accent, letterSpacing: '0.8px' }}>FAQ</div>
            <h2 style={{ fontSize: '20px', fontWeight: 900, color: C.dark, margin: '2px 0 4px' }}>자주 묻는 질문</h2>
            <p style={{ fontSize: '12.5px', color: C.muted, margin: 0 }}>궁금하신 점을 빠르게 확인하세요.</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {FAQS.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={i} style={{ border: `1px solid ${C.border}`, borderRadius: '10px', overflow: 'hidden', backgroundColor: '#ffffff' }}>
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    style={{ width: '100%', padding: '13px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', textAlign: 'left' }}
                  >
                    <span style={{ fontSize: '13.5px', fontWeight: 800, color: C.dark }}>{faq.q}</span>
                    <span style={{ fontSize: '12px', color: C.muted }}>{isOpen ? '▲' : '▼'}</span>
                  </button>
                  {isOpen && (
                    <div style={{ padding: '0 16px 14px', fontSize: '12.5px', color: C.mid, lineHeight: 1.65, borderTop: `1px solid ${C.border}`, paddingTop: '10px' }}>
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* ── 글로벌 외국인 호텔 투숙객 1줄 컨시어지 ── */}
        <div style={{ marginTop: '20px', padding: '12px 16px', backgroundColor: C.dark, borderRadius: '10px', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
          <div style={{ fontSize: '12px' }}>
            <span style={{ color: '#fde68a', fontWeight: 700 }}>GLOBAL TRAVELER</span> &nbsp;Visiting Seoul? Hotel in-room massage within 30 mins. 100% Pay on Arrival.
          </div>
          <a href={WA_LINK} target="_blank" rel="noreferrer" style={{ backgroundColor: '#25D366', color: '#ffffff', padding: '5px 12px', borderRadius: '6px', fontSize: '11.5px', fontWeight: 800, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            💬 WhatsApp
          </a>
        </div>

        {/* ── 구분선 ── */}
        <div style={{ height: '1px', backgroundColor: C.border, margin: '36px 0 28px' }} />

        {/* ── 7. 서울 전지역 마사지 서비스 네트워크 (정갈한 텍스트 풋노트 링크) ── */}
        <section style={{ paddingBottom: '20px' }}>
          <div style={{ fontSize: '12px', fontWeight: 800, color: C.dark, marginBottom: '8px' }}>
            서울 전지역 출장마사지 &amp; 홈타이 네트워크
          </div>
          <p style={{ fontSize: '11.5px', color: C.muted, lineHeight: 1.6, margin: '0 0 10px' }}>
            강남, 서초, 송파, 마포, 용산, 여의도, 성수, 영등포 등 서울 25개 자치구 어디든 20~30분 내외로 신속 방문합니다.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 10px', fontSize: '11px', color: C.mid }}>
            {POPULAR_AREAS.map((area, i) => (
              <Link key={i} href={`/seo/${encodeURIComponent(area)}`} style={{ textDecoration: 'none', color: '#6b7280' }}>
                {area}
              </Link>
            ))}
          </div>

          <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: `1px solid ${C.border}`, fontSize: '11px', color: C.muted, lineHeight: 1.6 }}>
            <strong>아름다운 밤 타이 홈케어 (Abam)</strong> · 서울특별시 25개 구 전역 심야 1:1 방문 힐링 케어 · 왓포 정통 건식 &amp; 천연 아로마 케어 · 100% 현장 대면결제 (선입금 0원) · 문의 010-6607-2239
          </div>
        </section>

      </main>

      {/* ── 하단 고정 모바일 퀵 예약바 ── */}
      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(255, 255, 255, 0.98)', backdropFilter: 'blur(12px)', borderTop: `1px solid ${C.border}`, padding: '9px 16px', zIndex: 50, boxShadow: '0 -4px 16px rgba(0,0,0,0.04)' }}>
        <div style={{ maxWidth: '640px', margin: '0 auto', display: 'flex', gap: '8px', alignItems: 'center' }}>
          <a
            href={KAKAO_LINK}
            onClick={handleKakao}
            style={{
              flex: 1.2,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
              backgroundColor: C.kakao, color: C.kakaoBr,
              fontWeight: 900, fontSize: '14px', padding: '12px 0', borderRadius: '10px',
              textDecoration: 'none',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 3C7.03 3 3 6.36 3 10.5c0 2.63 1.58 4.96 4 6.37L6 20l3.5-2.1c.8.17 1.63.26 2.5.26 4.97 0 9-3.36 9-7.5S16.97 3 12 3z" fill={C.kakaoBr}/></svg>
            카톡: {KAKAO_ID}
          </a>
          <a
            href={PHONE_TEL}
            style={{
              flex: 1,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px',
              backgroundColor: C.dark, color: '#ffffff',
              fontWeight: 800, fontSize: '14px', padding: '12px 0', borderRadius: '10px',
              textDecoration: 'none',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" fill="#ffffff"/></svg>
            전화예약
          </a>
          <a
            href={WA_LINK}
            target="_blank"
            rel="noreferrer"
            style={{
              width: '44px', height: '44px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              backgroundColor: '#25D366', color: '#ffffff',
              borderRadius: '10px', flexShrink: 0, textDecoration: 'none',
            }}
          >
            <span style={{ fontSize: '18px' }}>💬</span>
          </a>
        </div>
      </div>

    </div>
  );
}
