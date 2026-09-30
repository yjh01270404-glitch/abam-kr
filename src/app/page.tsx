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
   디자인 토큰
───────────────────────────────────────────── */
const C = {
  bg:      '#f9f8f6',
  white:   '#ffffff',
  dark:    '#1a1a2e',
  mid:     '#4a4a6a',
  muted:   '#8b8ba7',
  border:  '#e8e6e1',
  accent:  '#c8a96e',   // warm gold
  accentBg:'#fdf8f0',
  kakao:   '#FEE500',
  kakaoBr: '#181600',
  green:   '#2d7a4f',
  greenBg: '#edf7f1',
};

/* ─────────────────────────────────────────────
   SEO 마사지 키워드 클러스터 데이터 (구글 상위노출 네트워크)
───────────────────────────────────────────── */
const SEO_KEYWORD_TAGS = [
  '강남출장마사지', '강남홈타이', '역삼출장마사지', '논현출장마사지', '선릉출장마사지', '청담출장마사지', '압구정출장마사지',
  '서초출장마사지', '서초홈타이', '반포출장마사지', '방배출장마사지', '교대출장마사지',
  '송파출장마사지', '잠실출장마사지', '잠실홈타이', '문정출장마사지', '천호출장마사지',
  '마포출장마사지', '마포홈타이', '홍대출장마사지', '합정출장마사지', '공덕출장마사지', '상암출장마사지',
  '용산출장마사지', '용산홈타이', '한남출장마사지', '이태원출장마사지', '용산역출장마사지',
  '영등포출장마사지', '여의도출장마사지', '여의도홈타이', '신도림출장마사지', '당산출장마사지',
  '성수출장마사지', '건대출장마사지', '왕십리출장마사지', '종로출장마사지', '명동출장마사지', '을지로출장마사지',
  '동작출장마사지', '사당출장마사지', '관악출장마사지', '신림출장마사지', '봉천출장마사지',
  '강서출장마사지', '마곡출장마사지', '목동출장마사지', '노원출장마사지', '수유출장마사지',
  '호텔출장마사지', '모텔출장마사지', '오피스텔출장마사지', '24시출장마사지', '선입금없는출장마사지', '대면결제출장마사지',
  '서울홈타이', '왓포출장마사지', '아로마출장마사지', '스웨디시마사지', '감성힐링테라피'
];

/* ─────────────────────────────────────────────
   데이터
───────────────────────────────────────────── */
const THERAPISTS = [
  {
    name: '민서',
    age: 23,
    spec: '166cm · 47kg · C컵 슬림',
    badge: '지명 1위',
    specialty: '감미로운 밀착 림프 순환 & 센슈얼 VIP 특화',
    desc: '상냥하고 매혹적인 눈웃음과 섬세한 손길. 지명 예약률 독보적 1위의 대표 에이스.',
    available: true,
    img: '/images/ace_yuna.jpg',
  },
  {
    name: '채원',
    age: 24,
    spec: '168cm · 49kg · S라인 글래머',
    badge: '예약 폭주',
    specialty: '정통 왓포 딥티슈 지압 + 아로마 힐링',
    desc: '도회적인 분위기와 깊이 있는 압의 조화. 건식과 오일 케어를 완벽히 소화.',
    available: false,
    img: '/images/ace_seoa.jpg',
  },
  {
    name: '예린',
    age: 22,
    spec: '165cm · 46kg · 꿀피부 슬렌더',
    badge: '에이스 힐러',
    specialty: '부드러운 손길과 섬세한 미세 근막 이완',
    desc: '살결을 스치는 감각적인 온기. 굳어있던 심신의 긴장을 완전히 녹여내는 힐러.',
    available: true,
    img: '/images/ace_jia.jpg',
  },
];

const COURSES = [
  {
    name: '타이 정통 코스',
    sub: '왓포 왕실 정통 건식 수기 지압',
    prices: [{ t:'60분', p:'80,000원' }, { t:'90분', p:'100,000원', best:true }, { t:'120분', p:'120,000원' }],
    img: '/images/thai.jpg',
    badge: null,
  },
  {
    name: '아로마 힐링 코스',
    sub: '100% 천연 식물성 에센셜 오일 케어',
    prices: [{ t:'60분', p:'90,000원' }, { t:'90분', p:'110,000원', best:true }, { t:'120분', p:'140,000원' }],
    img: '/images/aroma.jpg',
    badge: null,
  },
  {
    name: '감성힐링 테라피',
    sub: '섬세하고 감미로운 미세 근막 이완',
    prices: [{ t:'60분', p:'90,000원' }, { t:'90분', p:'120,000원', best:true }, { t:'120분', p:'150,000원' }],
    img: '/images/sensual_touch.jpg',
    badge: '추천',
  },
  {
    name: '스페셜 듀얼 코스',
    sub: '건식 지압 + 아로마 림프 믹스',
    prices: [{ t:'60분', p:'100,000원' }, { t:'90분', p:'140,000원', best:true }, { t:'120분', p:'170,000원' }],
    img: '/images/sensual_care.jpg',
    badge: '만족도 1위',
  },
  {
    name: '프리미엄 VIP 시그니처',
    sub: '전신 수기 + 최고급 오일 + 림프 풀코스',
    prices: [{ t:'60분', p:'120,000원' }, { t:'90분', p:'160,000원', best:true }, { t:'120분', p:'200,000원' }],
    img: '/images/hero_sensual_goddess.jpg',
    badge: 'BEST',
  },
];

const REVIEWS = [
  {
    author: '김*호 님',
    area: '강남 역삼동 호텔',
    course: 'VIP 시그니처 90분 · 민서 지명',
    text: '출장 중 깊은 피로를 상담부터 친절히 안내받고 말끔히 풀었습니다. 선입금 없이 도착 후 결제해서 정말 안심할 수 있었어요.',
  },
  {
    author: '박*훈 님',
    area: '마포구 공덕동 자택',
    course: '스페셜 듀얼 90분',
    text: '25분 만에 방문해 주셔서 감동이었어요. 순면 관리복과 천연 오일을 챙겨오셔서 제 방이 바로 스파로 변신했습니다.',
  },
  {
    author: '조*현 님',
    area: '여의도 콘래드 호텔',
    course: 'VIP 시그니처 120분 · 채원 지명',
    text: '채원 테라피스트님의 단아하고 품격 있는 매너에 깊은 인상을 받았습니다. 완전한 프라이버시 속에서 진정한 힐링을 누렸어요.',
  },
  {
    author: '최*민 님',
    area: '용산구 한남동 레지던스',
    course: '아로마 릴렉싱 90분 · 예린 지명',
    text: '새벽 늦은 시간에도 20분 만에 도착해 주셔서 감사했습니다. 한 주간 쌓인 피로가 완전히 가셨어요.',
  },
];

const FAQS = [
  {
    q: '서울 어디든 방문 가능한가요?',
    a: '네, 서울 25개 자치구 전지역에 방문합니다. 서울 외 지역은 이동이 불가합니다. 매일 저녁 7시~새벽 5시 운영합니다.',
  },
  {
    q: '예약금이나 선입금이 필요한가요?',
    a: '아닙니다. 단 1원도 사전 입금을 요구하지 않습니다. 전문 테라피스트가 도착 후 직접 뵙고 결제하는 100% 현장 대면결제만을 원칙으로 합니다.',
  },
  {
    q: '도착까지 얼마나 걸리나요?',
    a: '서울 전역에 상시 대기 중으로, 예약 확정 후 평균 20~30분 내외로 방문합니다. 출발 시 예상 도착 시간을 미리 알려드립니다.',
  },
  {
    q: '어떤 결제 수단이 가능한가요?',
    a: '국내외 신용·체크카드(Visa, Master, Amex, JCB), 현금(원화·달러), 계좌이체 모두 가능합니다. 현장에서 영수증도 즉시 발급됩니다.',
  },
  {
    q: '호텔·오피스텔·자택 모두 방문 가능한가요?',
    a: '고객님만의 독립된 공간이라면 모두 가능합니다. 호텔은 객실 호수만 알려주시면 조용히 찾아갑니다.',
  },
  {
    q: '프로필 속 관리사가 실제로 오나요?',
    a: '네, 실물 프로필 100% 일치를 철저한 원칙으로 운영합니다. 서울 전역 권역별 거점에 상시 대기 중인 30여 명의 엄선된 20대 전문 테라피스트(민서, 채원, 예린 등 대표 에이스를 비롯하여 다양한 스타일의 전문 힐러진)를 보유하고 있으며, 원하시는 스타일과 테라피스트를 편안하게 지정하시면 반드시 해당 관리사가 직접 방문합니다.',
  },
];

/* ─────────────────────────────────────────────
   재사용 컴포넌트
───────────────────────────────────────────── */
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      display: 'inline-block',
      fontSize: '11px',
      fontWeight: 700,
      color: C.accent,
      letterSpacing: '1.2px',
      textTransform: 'uppercase',
      marginBottom: '6px',
    }}>
      {children}
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={{
      fontSize: '22px',
      fontWeight: 900,
      color: C.dark,
      lineHeight: 1.3,
      margin: '0 0 8px',
      letterSpacing: '-0.3px',
    }}>
      {children}
    </h2>
  );
}

function Divider() {
  return <div style={{ height: '1px', backgroundColor: C.border, margin: '40px 0' }} />;
}

/* ─────────────────────────────────────────────
   메인 컴포넌트
───────────────────────────────────────────── */
export default function HomePage() {
  const [openFaq, setOpenFaq]   = useState<number | null>(null);
  const [kakaoOpen, setKakaoOpen] = useState(false);
  const [toast, setToast]       = useState<string | null>(null);

  const kakaoConnect = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard?.writeText(KAKAO_ID).catch(() => {});
    setKakaoOpen(true);
  };

  const copyKakao = () => {
    navigator.clipboard?.writeText(KAKAO_ID).catch(() => {});
    setToast(`카톡 ID [${KAKAO_ID}] 복사 완료`);
    setTimeout(() => setToast(null), 2200);
  };

  /* ── 스타일 헬퍼 ── */
  const pill = (bg: string, color: string, extra?: React.CSSProperties): React.CSSProperties => ({
    display: 'inline-block',
    padding: '2px 8px',
    borderRadius: '4px',
    fontSize: '10.5px',
    fontWeight: 700,
    backgroundColor: bg,
    color,
    ...extra,
  });

  const btn = (bg: string, color: string, extra?: React.CSSProperties): React.CSSProperties => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
    padding: '13px 20px',
    borderRadius: '10px',
    fontWeight: 800,
    fontSize: '14px',
    backgroundColor: bg,
    color,
    cursor: 'pointer',
    border: 'none',
    ...extra,
  });

  return (
    <div style={{ minHeight: '100vh', backgroundColor: C.bg, paddingBottom: '80px' }}>

      {/* ── 토스트 ── */}
      {toast && (
        <div style={{
          position: 'fixed', top: '16px', left: '50%', transform: 'translateX(-50%)',
          backgroundColor: C.dark, color: '#fff',
          padding: '9px 20px', borderRadius: '30px',
          fontSize: '12.5px', fontWeight: 700, zIndex: 99999,
          boxShadow: '0 6px 20px rgba(0,0,0,0.18)',
        }}>
          {toast}
        </div>
      )}

      {/* ── 카카오 모달 ── */}
      {kakaoOpen && (
        <div
          onClick={() => setKakaoOpen(false)}
          style={{
            position: 'fixed', inset: 0,
            backgroundColor: 'rgba(26,26,46,0.5)',
            backdropFilter: 'blur(4px)',
            zIndex: 99998,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '20px',
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              backgroundColor: C.white, borderRadius: '20px',
              maxWidth: '400px', width: '100%',
              padding: '28px 24px',
              boxShadow: '0 24px 48px rgba(0,0,0,0.14)',
            }}
          >
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <div style={{
                width: '48px', height: '48px', borderRadius: '50%',
                backgroundColor: C.kakao,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 12px',
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 3C7.03 3 3 6.36 3 10.5c0 2.63 1.58 4.96 4 6.37L6 20l3.5-2.1c.8.17 1.63.26 2.5.26 4.97 0 9-3.36 9-7.5S16.97 3 12 3z" fill={C.kakaoBr}/>
                </svg>
              </div>
              <div style={{ fontSize: '17px', fontWeight: 900, color: C.dark }}>카카오톡 1:1 예약</div>
              <div style={{ fontSize: '12.5px', color: C.muted, marginTop: '4px', lineHeight: 1.5 }}>
                친구 추가 후 희망 코스와 방문 장소를<br />말씀해 주시면 즉시 안내해 드립니다.
              </div>
            </div>

            <div style={{
              backgroundColor: C.bg, borderRadius: '10px',
              padding: '14px 16px', marginBottom: '14px',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
              <div>
                <div style={{ fontSize: '10.5px', color: C.muted, fontWeight: 600 }}>카카오톡 공식 ID</div>
                <div style={{ fontSize: '20px', fontWeight: 900, color: C.dark, marginTop: '2px' }}>{KAKAO_ID}</div>
              </div>
              <button
                onClick={copyKakao}
                style={{
                  backgroundColor: C.kakao, color: C.kakaoBr,
                  padding: '7px 14px', borderRadius: '7px',
                  fontSize: '12px', fontWeight: 800,
                }}
              >
                복사
              </button>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <a
                href={KAKAO_LINK}
                onClick={() => setKakaoOpen(false)}
                style={{
                  flex: 1, ...btn(C.kakao, C.kakaoBr),
                  borderRadius: '10px', textDecoration: 'none',
                }}
              >
                카카오톡 열기
              </a>
              <button
                onClick={() => setKakaoOpen(false)}
                style={{
                  padding: '13px 18px', borderRadius: '10px',
                  backgroundColor: '#f1f0ee', color: C.mid,
                  fontWeight: 700, fontSize: '13px',
                }}
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════
          상단 안내 띠
      ══════════════════════════════════════════ */}
      <div style={{
        backgroundColor: C.dark, color: '#c8c8e0',
        textAlign: 'center', padding: '8px 16px',
        fontSize: '11.5px', fontWeight: 500,
      }}>
        운영시간 <strong style={{ color: '#fff' }}>저녁 7시 ~ 새벽 5시</strong>
        &ensp;·&ensp;서울 25개 구 평균 <strong style={{ color: '#fff' }}>20~30분 도착</strong>
        &ensp;·&ensp;<strong style={{ color: C.kakao }}>선입금 0원</strong>
      </div>

      {/* ══════════════════════════════════════════
          헤더
      ══════════════════════════════════════════ */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 50,
        backgroundColor: 'rgba(255,255,255,0.97)',
        backdropFilter: 'blur(12px)',
        borderBottom: `1px solid ${C.border}`,
      }}>
        <div style={{
          maxWidth: '680px', margin: '0 auto',
          padding: '11px 18px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          {/* 로고 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
            <div style={{
              width: '32px', height: '32px', borderRadius: '8px',
              backgroundColor: C.dark,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              <svg width="18" height="18" viewBox="0 0 48 48" fill="none">
                <path d="M 27 12 C 18 12 13 19 13 27 C 13 35 20 40 29 40 C 23.5 38 19.5 32 19.5 26 C 19.5 18 24.5 13.5 32 12.8 C 30.5 12.2 28.8 12 27 12 Z" fill="#f3e5ab"/>
                <path d="M36 10 L37 13 L40 14 L37 15 L36 18 L35 15 L32 14 L35 13 Z" fill="#d4af37" opacity="0.9"/>
              </svg>
            </div>
            <div>
              <div style={{ fontSize: '15px', fontWeight: 900, color: C.dark, letterSpacing: '-0.3px' }}>
                아름다운 밤 <span style={{ fontSize: '10px', fontWeight: 700, color: C.accent }}>Abam</span>
              </div>
              <div style={{ fontSize: '10.5px', color: C.muted, fontWeight: 500 }}>
                프라이빗 1:1 방문 홈케어
              </div>
            </div>
          </div>

          {/* 헤더 CTA (데스크탑) */}
          <div className="desktop-only" style={{ display: 'flex', gap: '6px' }}>
            <a href={KAKAO_LINK} onClick={kakaoConnect} style={{
              ...pill(C.kakao, C.kakaoBr, { padding: '7px 13px', fontSize: '12px', fontWeight: 900, borderRadius: '7px' }),
              display: 'inline-block',
            }}>
              카톡: {KAKAO_ID}
            </a>
            <a href={PHONE_TEL} style={{
              ...pill(C.dark, '#fff', { padding: '7px 13px', fontSize: '12px', fontWeight: 800, borderRadius: '7px' }),
              display: 'inline-block',
            }}>
              {PHONE_NUM}
            </a>
          </div>
        </div>
      </header>

      {/* ══════════════════════════════════════════
          메인
      ══════════════════════════════════════════ */}
      <main style={{ maxWidth: '680px', margin: '0 auto', padding: '0 18px' }}>

        {/* ── 섹션 1: 히어로 ── */}
        <section style={{ padding: '32px 0 0', textAlign: 'center' }}>

          {/* 태그라인 */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            backgroundColor: C.accentBg, border: `1px solid #f0e0c0`,
            borderRadius: '20px', padding: '4px 12px',
            fontSize: '11.5px', fontWeight: 700, color: C.accent,
            marginBottom: '18px',
          }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#2d7a4f', flexShrink: 0 }} />
            서울 전지역 · 심야 1:1 방문 홈케어
          </div>

          {/* H1 */}
          <h1 style={{
            fontSize: 'clamp(24px, 6vw, 34px)',
            fontWeight: 900,
            color: C.dark,
            lineHeight: 1.35,
            letterSpacing: '-0.5px',
            margin: '0 0 14px',
          }}>
            지친 하루의 끝,<br />
            가장 편안한 밤을<br />
            선물합니다
          </h1>

          {/* 서브 카피 */}
          <p style={{
            fontSize: '14px', color: C.mid,
            lineHeight: 1.75, margin: '0 auto 24px',
            maxWidth: '420px',
          }}>
            엄선된 20대 전문 테라피스트가 서울 전지역
            <strong style={{ color: C.dark }}> 20~30분 내외</strong>로
            고객님의 프라이빗 공간(호텔·자택·오피스텔)으로 찾아갑니다.
            <br />
            <span style={{ color: C.green, fontWeight: 700 }}>
              사전 예약금 없이 도착 후 직접 확인하고 결제하세요.
            </span>
          </p>

          {/* CTA 버튼 2개 */}
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '20px' }}>
            <a
              href={KAKAO_LINK}
              onClick={kakaoConnect}
              style={{
                ...btn(C.kakao, C.kakaoBr),
                flex: 1, maxWidth: '200px',
                borderRadius: '10px', boxShadow: '0 4px 14px rgba(254,229,0,0.3)',
                textDecoration: 'none',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M12 3C7.03 3 3 6.36 3 10.5c0 2.63 1.58 4.96 4 6.37L6 20l3.5-2.1c.8.17 1.63.26 2.5.26 4.97 0 9-3.36 9-7.5S16.97 3 12 3z" fill={C.kakaoBr}/>
              </svg>
              카카오 상담
            </a>
            <a
              href={PHONE_TEL}
              style={{
                ...btn(C.dark, '#fff'),
                flex: 1, maxWidth: '200px',
                borderRadius: '10px', boxShadow: '0 4px 14px rgba(26,26,46,0.18)',
                textDecoration: 'none',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" fill="#fff"/>
              </svg>
              전화 예약
            </a>
          </div>

          {/* 3대 신뢰 지표 */}
          <div style={{
            display: 'flex', justifyContent: 'center', gap: '0',
            flexWrap: 'wrap',
            marginBottom: '28px',
          }}>
            {[
              '선입금 0원',
              '30여 명 20대 엄선 테라피스트',
              '서울 전지역 20~30분',
            ].map((txt, i) => (
              <React.Fragment key={i}>
                <span style={{ fontSize: '12px', color: C.mid, fontWeight: 600 }}>
                  ✓ {txt}
                </span>
                {i < 2 && (
                  <span style={{ color: C.border, margin: '0 8px', fontSize: '12px' }}>|</span>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* 히어로 이미지 */}
          <div style={{
            position: 'relative', width: '100%', height: '280px',
            borderRadius: '16px', overflow: 'hidden',
            boxShadow: '0 8px 28px rgba(0,0,0,0.08)',
          }}>
            <Image
              src="/images/hero_sensual_goddess.jpg"
              alt="아름다운 밤 · 프라이빗 홈케어"
              fill style={{ objectFit: 'cover' }}
              priority
            />
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              background: 'linear-gradient(transparent, rgba(26,26,46,0.72))',
              padding: '20px 18px',
            }}>
              <div style={{ fontSize: '10.5px', color: C.accent, fontWeight: 700, letterSpacing: '0.8px' }}>
                PRIVATE IN-ROOM SPA · SEOUL
              </div>
              <div style={{ fontSize: '15px', fontWeight: 900, color: '#fff', marginTop: '2px' }}>
                살결을 타고 흐르는 은은한 아로마와 따뜻한 손길
              </div>
            </div>
          </div>
        </section>

        <Divider />

        {/* ── 섹션 2: 오늘 밤 테라피스트 ── */}
        <section>
          <div style={{ marginBottom: '20px' }}>
            <SectionLabel>TODAY'S THERAPIST</SectionLabel>
            <SectionTitle>오늘 밤 출근 대표 테라피스트</SectionTitle>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '12px', color: C.green, fontWeight: 700 }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: C.green }} />
              서울 권역별 30여 명 전문 힐러 상시 대기 중
            </div>
          </div>

          {/* 모바일: 세로 스택, 데스크탑: 3열 그리드 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {THERAPISTS.map((t, idx) => (
              <div key={idx} style={{
                backgroundColor: C.white,
                border: `1px solid ${C.border}`,
                borderRadius: '14px',
                overflow: 'hidden',
                display: 'flex',
                gap: '0',
              }}>
                {/* 좌측: 사진 (정사각형 고정) */}
                <div style={{ position: 'relative', width: '110px', minHeight: '140px', flexShrink: 0 }}>
                  <Image src={t.img} alt={t.name} fill style={{ objectFit: 'cover' }} />
                  {/* 배지 */}
                  <div style={{
                    position: 'absolute', top: '8px', left: '8px',
                    backgroundColor: 'rgba(26,26,46,0.82)',
                    color: '#fde68a', fontSize: '10px', fontWeight: 700,
                    padding: '2px 6px', borderRadius: '4px',
                    backdropFilter: 'blur(3px)',
                  }}>
                    {t.badge}
                  </div>
                </div>

                {/* 우측: 정보 */}
                <div style={{ flex: 1, padding: '14px 14px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '3px' }}>
                      <span style={{ fontSize: '16px', fontWeight: 900, color: C.dark }}>{t.name}</span>
                      <span style={{ fontSize: '12px', color: C.muted, fontWeight: 500 }}>{t.age}세</span>
                    </div>
                    <div style={{ fontSize: '11.5px', color: C.accent, fontWeight: 700, marginBottom: '5px' }}>{t.spec}</div>
                    <div style={{ fontSize: '12px', color: C.mid, fontWeight: 700, marginBottom: '3px' }}>{t.specialty}</div>
                    <div style={{ fontSize: '11.5px', color: C.muted, lineHeight: 1.55 }}>{t.desc}</div>
                  </div>

                  {/* 가용 상태 + 버튼 */}
                  <div style={{ marginTop: '10px' }}>
                    <div style={{
                      fontSize: '11px', fontWeight: 700,
                      color: t.available ? C.green : '#c2851a',
                      marginBottom: '8px',
                    }}>
                      {t.available ? '● 즉시 배차 가능' : '○ 심야 예약 접수 중'}
                    </div>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <a href={KAKAO_LINK} onClick={kakaoConnect} style={{
                        flex: 1, ...btn(C.kakao, C.kakaoBr, { padding: '8px 0', fontSize: '12px', borderRadius: '7px', textDecoration: 'none' }),
                      }}>
                        {t.name} 카톡지명
                      </a>
                      <a href={PHONE_TEL} style={{
                        flex: 1, ...btn(C.dark, '#fff', { padding: '8px 0', fontSize: '12px', borderRadius: '7px', textDecoration: 'none' }),
                      }}>
                        전화지명
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 전체 30여 명 테라피스트 인력풀 안내 배너 */}
          <div style={{
            marginTop: '14px',
            backgroundColor: C.white,
            border: `1px solid ${C.border}`,
            borderRadius: '12px',
            padding: '14px 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
            flexWrap: 'wrap',
          }}>
            <div style={{ flex: 1, minWidth: '220px' }}>
              <div style={{ fontSize: '13px', fontWeight: 900, color: C.dark, marginBottom: '3px' }}>
                ✨ 서울 전역 30여 명의 20대 전문 테라피스트 상시 대기
              </div>
              <div style={{ fontSize: '11.5px', color: C.muted, lineHeight: 1.5 }}>
                대표 에이스 테라피스트 외에도 각 권역 거점에 다양한 매력과 맞춤 힐링 스타일(슬렌더, 글래머, 딥티슈 압 조절 등)의 전문 힐러진이 상시 근무 중입니다. 예약 시 원하시는 스타일을 편안하게 말씀해 주세요.
              </div>
            </div>
            <a
              href={KAKAO_LINK}
              onClick={kakaoConnect}
              style={{
                backgroundColor: C.accentBg,
                border: `1px solid #f0e0c0`,
                color: C.accent,
                padding: '8px 14px',
                borderRadius: '8px',
                fontSize: '12px',
                fontWeight: 800,
                textDecoration: 'none',
                whiteSpace: 'nowrap',
              }}
            >
              맞춤 스타일 상담
            </a>
          </div>
        </section>

        <Divider />

        {/* ── 섹션 3: 코스 & 가격표 ── */}
        <section>
          <div style={{ marginBottom: '20px' }}>
            <SectionLabel>MENU & PRICING</SectionLabel>
            <SectionTitle>시그니처 코스 · 투명 정찰제</SectionTitle>
            <p style={{ fontSize: '12.5px', color: C.muted }}>
              선입금 0원 · 도착 후 현장 결제 (카드·현금·계좌이체)
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {COURSES.map((c, idx) => (
              <div key={idx} style={{
                backgroundColor: C.white,
                border: `1px solid ${C.border}`,
                borderRadius: '12px',
                padding: '14px 16px',
                display: 'flex', gap: '14px', alignItems: 'center',
              }}>
                {/* 썸네일 */}
                <div style={{ position: 'relative', width: '56px', height: '56px', borderRadius: '10px', overflow: 'hidden', flexShrink: 0 }}>
                  <Image src={c.img} alt={c.name} fill style={{ objectFit: 'cover' }} />
                </div>

                {/* 내용 */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
                    <span style={{ fontSize: '15px', fontWeight: 900, color: C.dark }}>{c.name}</span>
                    {c.badge && (
                      <span style={pill('#dc2626', '#fff', { padding: '1px 6px', borderRadius: '3px' })}>{c.badge}</span>
                    )}
                  </div>
                  <div style={{ fontSize: '11.5px', color: C.muted, marginBottom: '8px' }}>{c.sub}</div>

                  {/* 가격 행 */}
                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    {c.prices.map((p, pi) => (
                      <div key={pi} style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '10.5px', color: C.muted, fontWeight: 500 }}>{p.t}</div>
                        <div style={{
                          fontSize: '13px', fontWeight: 900,
                          color: (p as any).best ? '#dc2626' : C.dark,
                        }}>{p.p}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{
            marginTop: '14px', padding: '12px 16px',
            backgroundColor: C.accentBg, borderRadius: '10px',
            fontSize: '12px', color: C.mid, textAlign: 'center',
          }}>
            ※ 모든 코스 · 순면 관리복 + 1회용 위생 패드 무상 제공 · 서울 출장비 포함
          </div>
        </section>

        <Divider />

        {/* ── 섹션 4: 이용 3단계 ── */}
        <section>
          <div style={{ marginBottom: '20px' }}>
            <SectionLabel>HOW TO USE</SectionLabel>
            <SectionTitle>이용 3단계</SectionTitle>
            <p style={{ fontSize: '12.5px', color: C.muted }}>
              가입 없이 30초 만에 예약 완료
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              { no: '01', title: '예약 접수', desc: '카카오톡 또는 전화로 원하시는 코스와 방문 장소를 알려주세요.' },
              { no: '02', title: '20~30분 내 도착', desc: '담당 테라피스트가 위생 비품을 지참하여 신속하게 방문합니다.' },
              { no: '03', title: '도착 확인 후 결제', desc: '관리사를 직접 확인하신 후 안전하게 결제하고 힐링을 즐기세요.' },
            ].map((s, i) => (
              <div key={i} style={{
                backgroundColor: C.white,
                border: `1px solid ${C.border}`,
                borderRadius: '12px', padding: '16px 18px',
                display: 'flex', alignItems: 'flex-start', gap: '14px',
              }}>
                <div style={{
                  fontSize: '18px', fontWeight: 900,
                  color: C.accent, lineHeight: 1,
                  flexShrink: 0, minWidth: '28px',
                }}>
                  {s.no}
                </div>
                <div>
                  <div style={{ fontSize: '15px', fontWeight: 800, color: C.dark, marginBottom: '4px' }}>{s.title}</div>
                  <div style={{ fontSize: '12.5px', color: C.mid, lineHeight: 1.6 }}>{s.desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* 선입금 0원 안심 박스 */}
          <div style={{
            marginTop: '14px',
            backgroundColor: C.greenBg,
            border: `1px solid #a7dfc0`,
            borderRadius: '12px', padding: '16px 18px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px',
          }}>
            <div>
              <div style={{ fontSize: '13.5px', fontWeight: 900, color: C.green }}>선입금 없는 100% 현장 대면 결제</div>
              <div style={{ fontSize: '12px', color: '#1e5038', marginTop: '3px' }}>
                방문 전 단 1원도 요구하지 않습니다. 안심하고 예약하세요.
              </div>
            </div>
            <a href={PHONE_TEL} style={{
              backgroundColor: C.green, color: '#fff',
              padding: '9px 14px', borderRadius: '8px',
              fontSize: '12px', fontWeight: 800, flexShrink: 0,
              textDecoration: 'none',
            }}>
              전화 예약
            </a>
          </div>
        </section>

        <Divider />

        {/* ── 섹션 5: 장소별 이용 안내 ── */}
        <section>
          <div style={{ marginBottom: '20px' }}>
            <SectionLabel>LOCATION GUIDE</SectionLabel>
            <SectionTitle>장소별 안심 이용 안내</SectionTitle>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              {
                title: '🏨 호텔 · 레지던스',
                desc: '호텔명과 객실 호수만 알려주시면 규정에 맞춰 조용히 룸으로 찾아갑니다.',
              },
              {
                title: '🏢 오피스텔 · 원룸',
                desc: '공동현관 출입 안내를 메모에 남겨주시면 대기 없이 신속하게 입실합니다.',
              },
              {
                title: '🏠 아파트 · 일반 자택',
                desc: '동·호수와 주차장 게이트를 미리 알려주시면 더욱 신속하게 방문 드립니다.',
              },
            ].map((item, i) => (
              <div key={i} style={{
                backgroundColor: C.white,
                border: `1px solid ${C.border}`,
                borderRadius: '12px', padding: '14px 18px',
              }}>
                <div style={{ fontSize: '14px', fontWeight: 800, color: C.dark, marginBottom: '5px' }}>{item.title}</div>
                <div style={{ fontSize: '12.5px', color: C.mid, lineHeight: 1.65 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </section>

        <Divider />

        {/* ── 섹션 6: 서울 배차 권역 ── */}
        <section>
          <div style={{ marginBottom: '20px' }}>
            <SectionLabel>SERVICE AREA</SectionLabel>
            <SectionTitle>서울 25개 구 전지역 배차</SectionTitle>
            <p style={{ fontSize: '12px', color: C.muted }}>※ 서울 외 지역은 이동이 불가합니다</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {[
              { name: '강남·서초·송파', time: '20~25분', areas: '강남구, 서초구, 송파구, 강동구' },
              { name: '마포·여의도·영등포', time: '20~25분', areas: '영등포구, 마포구, 구로구, 동작구, 강서구, 관악구, 양천구' },
              { name: '용산·도심·종로', time: '25~30분', areas: '용산구, 중구, 종로구, 서대문구, 은평구' },
              { name: '성수·동대문·동북권', time: '25~30분', areas: '성동구, 광진구, 동대문구, 중랑구, 성북구, 노원구, 강북구, 도봉구' },
            ].map((r, i) => (
              <div key={i} style={{
                backgroundColor: C.white,
                border: `1px solid ${C.border}`,
                borderRadius: '10px', padding: '12px 16px',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px',
              }}>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: '14px', fontWeight: 800, color: C.dark }}>{r.name}</div>
                  <div style={{ fontSize: '11.5px', color: C.muted, marginTop: '2px', lineHeight: 1.5 }}>{r.areas}</div>
                </div>
                <div style={{
                  flexShrink: 0,
                  fontSize: '12px', fontWeight: 800,
                  color: C.green, backgroundColor: C.greenBg,
                  padding: '4px 10px', borderRadius: '6px',
                }}>
                  {r.time}
                </div>
              </div>
            ))}
          </div>
        </section>

        <Divider />

        {/* ── 섹션 7: 고객 후기 ── */}
        <section>
          <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
            <div>
              <SectionLabel>REVIEWS</SectionLabel>
              <SectionTitle>실제 고객 후기</SectionTitle>
            </div>
            <div style={{ fontSize: '12.5px', color: C.accent, fontWeight: 800 }}>★ 5.0</div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {REVIEWS.map((r, i) => (
              <div key={i} style={{
                backgroundColor: C.white,
                border: `1px solid ${C.border}`,
                borderRadius: '12px', padding: '16px 18px',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                  <div>
                    <span style={{ fontSize: '13.5px', fontWeight: 800, color: C.dark }}>{r.author}</span>
                    <span style={{ fontSize: '11px', color: C.muted, marginLeft: '6px' }}>{r.area}</span>
                  </div>
                  <span style={{ fontSize: '11.5px', color: C.accent, fontWeight: 700, flexShrink: 0 }}>★★★★★</span>
                </div>
                <div style={{ fontSize: '11px', color: C.accent, fontWeight: 700, marginBottom: '7px' }}>{r.course}</div>
                <p style={{ fontSize: '12.5px', color: C.mid, lineHeight: 1.65, margin: 0 }}>
                  "{r.text}"
                </p>
              </div>
            ))}
          </div>
        </section>

        <Divider />

        {/* ── 섹션 8: FAQ ── */}
        <section style={{ paddingBottom: '8px' }}>
          <div style={{ marginBottom: '20px' }}>
            <SectionLabel>FAQ</SectionLabel>
            <SectionTitle>자주 묻는 질문</SectionTitle>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {FAQS.map((faq, i) => {
              const open = openFaq === i;
              return (
                <div key={i} style={{
                  backgroundColor: C.white,
                  border: `1px solid ${open ? C.accent : C.border}`,
                  borderRadius: '10px', overflow: 'hidden',
                  transition: 'border-color 0.2s',
                }}>
                  <button
                    onClick={() => setOpenFaq(open ? null : i)}
                    style={{
                      width: '100%', padding: '14px 16px',
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      textAlign: 'left', gap: '10px',
                    }}
                  >
                    <span style={{ fontSize: '13.5px', fontWeight: 700, color: C.dark, flex: 1 }}>{faq.q}</span>
                    <span style={{ fontSize: '12px', color: C.muted, flexShrink: 0 }}>{open ? '▲' : '▼'}</span>
                  </button>
                  {open && (
                    <div style={{
                      padding: '0 16px 14px',
                      fontSize: '12.5px', color: C.mid,
                      lineHeight: 1.7,
                      borderTop: `1px solid ${C.border}`,
                      paddingTop: '12px',
                    }}>
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        <Divider />

        {/* ── 외국인 컨시어지 ── */}
        <section style={{ paddingBottom: '16px' }}>
          <div style={{
            backgroundColor: C.dark,
            borderRadius: '14px',
            padding: '24px 20px',
            color: '#fff',
          }}>
            <div style={{ fontSize: '10.5px', color: C.accent, fontWeight: 700, letterSpacing: '1px', marginBottom: '8px' }}>
              GLOBAL TRAVELER CONCIERGE
            </div>
            <div style={{ fontSize: '16px', fontWeight: 900, marginBottom: '10px' }}>
              Seoul Hotel In-Room Massage
            </div>
            <p style={{ fontSize: '12.5px', color: '#c8c8e0', lineHeight: 1.7, marginBottom: '18px' }}>
              Visiting Seoul? Our professional therapist arrives at your hotel room in 30 minutes.{' '}
              <strong style={{ color: '#fff' }}>100% Pay On Arrival</strong> — zero advance payment.
              Cash, credit card, and overseas cards accepted.
            </p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <a href={WA_LINK} target="_blank" rel="noreferrer" style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                backgroundColor: '#25D366', color: '#fff',
                padding: '10px 16px', borderRadius: '8px',
                fontSize: '13px', fontWeight: 800, textDecoration: 'none',
              }}>
                💬 WhatsApp
              </a>
              <a href="tel:+82-10-6607-2239" style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                backgroundColor: 'rgba(255,255,255,0.12)', color: '#fff',
                border: '1px solid rgba(255,255,255,0.25)',
                padding: '10px 16px', borderRadius: '8px',
                fontSize: '13px', fontWeight: 700, textDecoration: 'none',
              }}>
                📞 +82-10-6607-2239
              </a>
            </div>
          </div>
        </section>

        <Divider />

        {/* ── 9. 서울 전지역 출장마사지 & 홈타이 SEO 서비스 네트워크 허브 ── */}
        <section style={{ paddingBottom: '24px' }}>
          <div style={{ marginBottom: '14px' }}>
            <SectionLabel>SEOUL SERVICE NETWORK</SectionLabel>
            <SectionTitle>서울 전지역 출장마사지 &amp; 홈타이 네트워크</SectionTitle>
            <p style={{ fontSize: '12px', color: C.muted, margin: 0, lineHeight: 1.6 }}>
              아름다운 밤 타이 홈케어는 서울 25개 자치구 및 주요 역세권 어디든 20~30분 내외로 방문 드립니다.
            </p>
          </div>

          {/* 키워드 태그 칩 그리드 */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '6px',
            backgroundColor: C.white,
            border: `1px solid ${C.border}`,
            borderRadius: '14px',
            padding: '16px',
          }}>
            {SEO_KEYWORD_TAGS.map((kw, i) => (
              <Link
                key={i}
                href={`/seo/${encodeURIComponent(kw)}`}
                style={{
                  display: 'inline-block',
                  fontSize: '11px',
                  fontWeight: 600,
                  color: C.mid,
                  backgroundColor: C.bg,
                  border: `1px solid ${C.border}`,
                  padding: '4px 10px',
                  borderRadius: '6px',
                  textDecoration: 'none',
                  transition: 'all 0.15s ease',
                }}
              >
                #{kw}
              </Link>
            ))}
          </div>

          {/* 법적 고지 및 100% 대면결제 신뢰 푸터 */}
          <div style={{
            marginTop: '16px',
            padding: '14px 16px',
            backgroundColor: '#f1f0ec',
            borderRadius: '10px',
            fontSize: '11px',
            color: '#71718a',
            lineHeight: 1.6,
          }}>
            <strong>아름다운 밤 타이 홈케어 (Abam)</strong> · 서울특별시 25개 자치구 전역 심야 프라이빗 1:1 방문 힐링 케어 · 왓포 정통 건식 수기 지압 &amp; 천연 아로마 림프 케어 · 100% 사전 예약금 없는 현장 대면결제 원칙 준수 · 24시간 연중무휴 안심 예약 (010-6607-2239)
          </div>
        </section>

      </main>

      {/* ══════════════════════════════════════════
          하단 고정 퀵 예약바
      ══════════════════════════════════════════ */}
      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0,
        backgroundColor: 'rgba(255,255,255,0.97)',
        backdropFilter: 'blur(14px)',
        borderTop: `1px solid ${C.border}`,
        padding: '10px 16px',
        zIndex: 50,
        boxShadow: '0 -4px 18px rgba(0,0,0,0.06)',
      }}>
        <div style={{ maxWidth: '680px', margin: '0 auto', display: 'flex', gap: '8px' }}>
          <a href={KAKAO_LINK} onClick={kakaoConnect} style={{
            flex: 1.3, ...btn(C.kakao, C.kakaoBr, {
              padding: '13px 0', borderRadius: '10px',
              boxShadow: '0 2px 10px rgba(254,229,0,0.25)',
              textDecoration: 'none',
            }),
          }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
              <path d="M12 3C7.03 3 3 6.36 3 10.5c0 2.63 1.58 4.96 4 6.37L6 20l3.5-2.1c.8.17 1.63.26 2.5.26 4.97 0 9-3.36 9-7.5S16.97 3 12 3z" fill={C.kakaoBr}/>
            </svg>
            카톡: {KAKAO_ID}
          </a>
          <a href={PHONE_TEL} style={{
            flex: 1, ...btn(C.dark, '#fff', {
              padding: '13px 0', borderRadius: '10px',
              textDecoration: 'none',
            }),
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" fill="#fff"/>
            </svg>
            전화 예약
          </a>
          <a href={WA_LINK} target="_blank" rel="noreferrer" style={{
            width: '46px', height: '46px', flexShrink: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backgroundColor: '#25D366', borderRadius: '10px',
            textDecoration: 'none',
          }}>
            <span style={{ fontSize: '20px' }}>💬</span>
          </a>
        </div>
      </div>

    </div>
  );
}
