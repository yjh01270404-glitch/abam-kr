'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { type LandingContent } from '../lib/landing-content';
import { UI } from '../lib/landing-ui';
import AbamBookingGuideModal from './AbamBookingGuideModal';

const WA_LINK =
  'https://wa.me/821066072239?text=Hello%20Abam.kr,%20I%20would%20like%20to%20inquire%20about%20your%20private%201:1%20home%20care%20service.';

/* 루미노케이(Luminok) 정통 하이엔드 디자인 토큰 — 딥 네이비 블루 + 샴페인 골드 & 옐로우 악센트 */
const C = {
  bg: '#060a17',                  // 루미노케이 시그니처 딥 미드나잇 블루
  cardBg: 'rgba(10, 18, 38, 0.92)', // 루미노케이형 딥 블루 글래스 카드
  border: 'rgba(212, 175, 55, 0.3)', // 샴페인 골드 림라이트 라인
  textWhite: '#ffffff',
  textSub: '#cbd5e1',
  textMuted: '#94a3b8',
  gold: '#fbbf24',                // 루미노케이 텍스트 강조 옐로우-골드
  goldSoft: '#d4af37',
  red: '#dc2626',
  brandRed: '#e11d48',
};

const FONT = '-apple-system, BlinkMacSystemFont, "Pretendard", "Noto Sans KR", "Apple SD Gothic Neo", sans-serif';

type Lang = 'ko' | 'en' | 'jp' | 'cn';

const LANGS: { code: Lang; label: string; href: string }[] = [
  { code: 'ko', label: 'KR', href: '/' },
  { code: 'en', label: 'EN', href: '/en' },
  { code: 'jp', label: 'JP', href: '/jp' },
  { code: 'cn', label: 'CN', href: '/cn' },
];

export default function AbamLanding({ c, areaLinks }: { c: LandingContent; areaLinks?: string[] }) {
  const isKo = c.lang === 'ko';
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
    const timer = setInterval(calc, 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div lang={c.htmlLang} style={{ position: 'relative', minHeight: '100vh', width: '100%', color: C.textWhite, fontFamily: FONT, paddingBottom: '120px', lineHeight: 1.65 }}>
      {/* 구글 리치 검색 결과(FAQ 아코디언 및 로컬 비즈니스)를 위한 공식 JSON-LD 구조화 데이터 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': ['HealthAndBeautyBusiness', 'ProfessionalService'],
                '@id': 'https://abam.kr/#business',
                name: '아밤 (Abam)',
                alternateName: ['아름다운밤', 'Abam.kr'],
                url: 'https://abam.kr',
                logo: 'https://abam.kr/icon.png',
                image: 'https://abam.kr/opengraph-image',
                description:
                  '서울 25개 구 및 경기 전역 1:1 방문 맞춤 홈케어 및 호텔 테라피 서비스. 선입금 없는 100% 현장 대면결제 안심 후불제.',
                telephone: '+82-10-6607-2239',
                priceRange: '₩₩',
                paymentAccepted: 'Cash, Credit Card, Bank Transfer (100% On-site Payment)',
                currenciesAccepted: 'KRW',
                areaServed: [
                  { '@type': 'AdministrativeArea', name: '서울특별시' },
                  { '@type': 'AdministrativeArea', name: '경기도' },
                  { '@type': 'AdministrativeArea', name: '인천광역시' },
                ],
              },
              {
                '@type': 'FAQPage',
                '@id': 'https://abam.kr/#faq',
                mainEntity: c.faqs.map((faq) => ({
                  '@type': 'Question',
                  name: faq.q,
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: faq.a,
                  },
                })),
              },
            ],
          }),
        }}
      />


      {/* 토스트 알림 */}
      {toast && (
        <div style={{ position: 'fixed', top: '16px', left: '50%', transform: 'translateX(-50%)', background: '#1e293b', border: `1px solid ${C.border}`, color: '#ffffff', padding: '10px 20px', borderRadius: '6px', fontSize: '13.5px', fontWeight: 700, zIndex: 99999, boxShadow: '0 8px 24px rgba(0,0,0,0.8)' }}>
          {toast}
        </div>
      )}

      {/* 예약 안내 모달 */}
      <AbamBookingGuideModal
        isOpen={smsModal}
        onClose={() => setSmsModal(false)}
        smsMessage={t.smsBody}
      />

      {/* ── 1. 상단 헤더: 아밤 고유 골드 달 로고 + 신뢰성 있는 정통 한글 타이포그래피 ── */}
      <header style={{ position: 'sticky', top: 0, zIndex: 40, background: '#0a0e1c', borderBottom: '1px solid #1e293b' }}>
        <div style={{ maxWidth: '860px', margin: '0 auto', padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          
          <Link href="/" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
            {/* 아밤 시그니처 골드 달 로고 */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
              <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" fill="#f59e0b" />
            </svg>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <span
                className="abam-script-font"
                style={{
                  fontSize: '24px',
                  fontWeight: 800,
                  lineHeight: 1,
                  display: 'inline-block',
                  color: '#f59e0b',
                  padding: '0 2px',
                }}
              >
                아름다운밤
              </span>
              <span style={{ fontSize: '17px', fontWeight: 900, color: C.brandRed, letterSpacing: '-0.3px', lineHeight: 1 }}>
                [아밤.Abam.kr]
              </span>
            </span>
          </Link>

          {/* 우측 메뉴 & 언어 전환 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <nav style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <a href="#intro" style={{ color: C.textSub, fontSize: '13px', fontWeight: 600, textDecoration: 'none', padding: '4px 6px' }}>{t.hnav[0]}</a>
              <a href="#price" style={{ color: C.gold, fontSize: '13px', fontWeight: 700, textDecoration: 'none', padding: '4px 6px' }}>{t.hnav[1]}</a>
              <a href="#rules" style={{ color: C.textSub, fontSize: '13px', fontWeight: 600, textDecoration: 'none', padding: '4px 6px' }}>{t.hnav[2]}</a>
              <a href="#faq" style={{ color: C.textSub, fontSize: '13px', fontWeight: 600, textDecoration: 'none', padding: '4px 6px' }}>{t.hnav[4]}</a>
            </nav>

            <div style={{ display: 'flex', gap: '4px' }}>
              {LANGS.map((l) => (
                <Link
                  key={l.code}
                  href={l.href}
                  style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    padding: '2px 6px',
                    borderRadius: '4px',
                    textDecoration: 'none',
                    color: l.code === c.lang ? '#060a17' : '#94a3b8',
                    background: l.code === c.lang ? C.gold : 'rgba(255,255,255,0.06)',
                  }}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

        </div>
      </header>

      {/* ── 메인 콘텐츠 ── */}
      <main className="abam-container" style={{ position: 'relative', zIndex: 1, paddingTop: '36px' }}>

        {/* ── 2. 히어로 섹션: 아밤 브랜드 로고 + 루미노케이 2-Box CTA 시스템 ── */}
        <section style={{ textAlign: 'left', marginBottom: '32px' }}>
          
          {/* 상단 아밤 시그니처 엠블럼 & 정통 타이틀 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px', flexWrap: 'wrap' }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
              <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" fill="#f59e0b" />
            </svg>
            <span
              className="abam-script-font abam-hero-title-cursive"
              style={{
                fontStyle: 'normal',
                fontWeight: 800,
                lineHeight: 1,
                display: 'inline-block',
                color: '#f59e0b',
                padding: '0 4px',
              }}
            >
              아름다운밤
            </span>
            <span className="abam-hero-title-tag" style={{ fontWeight: 900, color: C.brandRed, letterSpacing: '-0.3px', lineHeight: 1 }}>
              [아밤.Abam.kr]
            </span>
          </div>

          {/* 메인 헤드라인 */}
          <h1 style={{ fontSize: '28px', fontWeight: 900, color: '#ffffff', letterSpacing: '-0.6px', margin: '4px 0 10px', lineHeight: 1.3, wordBreak: 'keep-all' }}>
            출장마사지 · 출장 홈타이 아밤
          </h1>

          <div style={{ fontSize: '16.5px', fontWeight: 700, color: '#e2e8f0', letterSpacing: '-0.3px', marginBottom: '14px' }}>
            서울·경기 전지역 1:1 방문 맞춤 케어 · 100% 현장 대면결제
          </div>

          {/* 실시간 긴급 배차 대기조 현황 티커 (전환율 극대화) */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(220, 38, 38, 0.12)',
              border: '1px solid rgba(220, 38, 38, 0.45)',
              padding: '8px 14px',
              borderRadius: '24px',
              marginBottom: '22px',
              fontSize: '13px',
              fontWeight: 800,
              color: '#fecaca',
              flexWrap: 'wrap',
            }}
          >
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#ef4444',
                boxShadow: '0 0 8px #ef4444',
                display: 'inline-block',
                flexShrink: 0,
              }}
            />
            <span style={{ color: '#ffffff' }}>🔥 실시간 배차 대기 현황:</span>
            <span>강남·서초 2팀 (예상 25분) · 마포·용산 1팀 · 분당·판교 1팀 대기중</span>
            <span style={{ color: C.gold, fontWeight: 900 }}>[선입금 0원 · 현장후불제]</span>
          </div>

          {/* 루미노케이 스타일 본문 스토리텔링 소개 (좌측 골드 라인) */}
          <div style={{ borderLeft: `3px solid ${C.goldSoft}`, paddingLeft: '16px', margin: '0 0 26px', fontSize: '15.5px', color: '#cbd5e1', lineHeight: 1.8, wordBreak: 'keep-all' }}>
            <p style={{ margin: '0 0 8px' }}>
              <span className="abam-script-font" style={{ color: C.gold, fontSize: '18px', fontWeight: 800, verticalAlign: 'baseline', display: 'inline-block', marginRight: '6px', fontStyle: 'normal' }}>아름다운 밤</span>을 뜻하는 저희 <strong style={{ color: '#ffffff' }}>‘아밤(Abam)’</strong>은 고객님이 계신 가장 편안하고 익숙한 프라이빗 공간(자택, 아파트, 호텔)으로 전문 테라피스트가 직접 찾아가는 1:1 방문 힐링 케어 서비스입니다.
            </p>
            <p style={{ margin: 0 }}>
              어떠한 경우에도 사전 입금이나 예약금을 요구하지 않는 <strong style={{ color: C.gold }}>100% 현장 대면결제 원칙</strong>을 준수하며, 지친 일상의 피로를 품격 있는 관리로 완벽하게 해소해 드립니다.
            </p>
          </div>

          {/* ── [루미노케이 시그니처 2-Box CTA]: 묵직하고 신뢰감 넘치는 2대 대표 박스 ── */}
          <div className="luminok-cta-grid">
            
            {/* 좌측 카드: 상담 및 간편 예약 */}
            <div
              className="luminok-cta-card"
              onClick={() => setSmsModal(true)}
              role="button"
              tabIndex={0}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ fontSize: '20px', fontWeight: 900, color: C.gold, letterSpacing: '-0.4px' }}>
                  문자 간편예약 Click!
                </span>
                <span style={{ fontSize: '12px', fontWeight: 700, color: C.textSub, background: 'rgba(251, 191, 36, 0.12)', border: `1px solid ${C.border}`, padding: '2px 8px', borderRadius: '4px' }}>
                  실시간 접수
                </span>
              </div>
              <div style={{ fontSize: '13.5px', color: '#94a3b8', lineHeight: 1.5 }}>
                전화 통화 없이 문자로 주소와 코스만 남겨주시면<br />
                가장 가까운 전문 매니저가 즉시 배차됩니다.
              </div>
            </div>

            {/* 우측 카드: 직통 상담전화 */}
            <a
              href={`tel:${c.contact.phone.replace(/[^0-9]/g, '')}`}
              className="luminok-cta-card"
            >
              <div style={{ fontSize: '13px', fontWeight: 700, color: C.textSub, marginBottom: '2px' }}>
                빠른 상담신청! 직통 상담전화
              </div>
              <div style={{ fontSize: '26px', fontWeight: 900, color: '#ffffff', letterSpacing: '-0.5px', margin: '2px 0' }}>
                {c.contact.phone}
              </div>
              <div style={{ fontSize: '12.5px', color: C.goldSoft }}>
                예약 접수 18:00 ~ 익일 05:00 · 19:00부터 순차 출발
              </div>
            </a>

          </div>

          {/* 히어로 실사 모델 화보 */}
          <div style={{ position: 'relative', width: '100%', height: '320px', borderRadius: '12px', overflow: 'hidden', border: `1px solid ${C.border}`, boxShadow: '0 12px 36px rgba(0,0,0,0.6)' }}>
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

        {/* ── 3. 아밤 4대 핵심 가이드 카드 (루미노케이 4-Box 림라이트 그리드) ── */}
        <section style={{ marginBottom: '44px' }}>
          <div style={{ borderLeft: `3px solid ${C.goldSoft}`, paddingLeft: '14px', marginBottom: '16px' }}>
            <h2 className="luminok-section-title">아밤 4대 이용 원칙</h2>
            <p className="luminok-section-sub">고객님의 안전과 신뢰를 위한 100% 현장 대면결제 및 운영 안내</p>
          </div>

          <div className="luminok-guide-grid">
            
            {/* 카드 1 */}
            <div className="luminok-guide-card">
              <div style={{ fontSize: '12.5px', fontWeight: 800, color: C.gold, marginBottom: '6px' }}>
                PRINCIPLE 01
              </div>
              <div style={{ fontSize: '17px', fontWeight: 800, color: '#ffffff', marginBottom: '6px' }}>
                100% 현장 대면결제
              </div>
              <div style={{ fontSize: '13.5px', color: '#94a3b8', lineHeight: 1.5, wordBreak: 'keep-all' }}>
                선입금이나 예약금은 일체 요구하지 않습니다. 매니저 도착 후 현장에서 안심하고 결제하세요.
              </div>
            </div>

            {/* 카드 2 */}
            <div className="luminok-guide-card">
              <div style={{ fontSize: '12.5px', fontWeight: 800, color: C.gold, marginBottom: '6px' }}>
                PRINCIPLE 02
              </div>
              <div style={{ fontSize: '17px', fontWeight: 800, color: '#ffffff', marginBottom: '6px' }}>
                영업 및 배차 시간
              </div>
              <div style={{ fontSize: '13.5px', color: '#94a3b8', lineHeight: 1.5, wordBreak: 'keep-all' }}>
                예약 접수는 18:00부터 가능하며, 매니저 출발은 19:00부터, 마지막 예약은 새벽 05:00 마감됩니다.
              </div>
            </div>

            {/* 카드 3 */}
            <div className="luminok-guide-card">
              <div style={{ fontSize: '12.5px', fontWeight: 800, color: C.gold, marginBottom: '6px' }}>
                PRINCIPLE 03
              </div>
              <div style={{ fontSize: '17px', fontWeight: 800, color: '#ffffff', marginBottom: '6px' }}>
                원하는 프라이빗 공간
              </div>
              <div style={{ fontSize: '13.5px', color: '#94a3b8', lineHeight: 1.5, wordBreak: 'keep-all' }}>
                자택, 아파트, 오피스텔, 호텔 등 고객님이 계신 곳으로 전담 테라피스트가 1:1 방문합니다.
              </div>
            </div>

            {/* 카드 4 */}
            <div className="luminok-guide-card">
              <div style={{ fontSize: '12.5px', fontWeight: 800, color: C.gold, marginBottom: '6px' }}>
                PRINCIPLE 04
              </div>
              <div style={{ fontSize: '17px', fontWeight: 800, color: '#ffffff', marginBottom: '6px' }}>
                1시간 전 예약 추천
              </div>
              <div style={{ fontSize: '13.5px', color: '#94a3b8', lineHeight: 1.5, wordBreak: 'keep-all' }}>
                원활한 이용을 위해 1시간 전 예약을 권장하며, 서울·경기 30~40분 내 신속하게 도착합니다.
              </div>
            </div>

          </div>
        </section>

        {/* ── 4. 시그니처 코스 및 정찰 가격표 (루미노케이 마스터 프레임) ── */}
        <section id="price" style={{ marginBottom: '44px', scrollMarginTop: '70px' }}>
          <div style={{ borderLeft: `3px solid ${C.goldSoft}`, paddingLeft: '14px', marginBottom: '16px' }}>
            <h2 className="luminok-section-title">코스 안내 및 정찰 가격표</h2>
            <p className="luminok-section-sub">선입금 없는 100% 현장 대면결제 정찰제 요금</p>
          </div>

          <div className="abam-panel" style={{ padding: 0, overflow: 'hidden' }}>
            
            {/* 상단 정찰제 알림 바 */}
            <div style={{ padding: '14px 20px', background: 'rgba(15, 26, 56, 0.95)', borderBottom: `1px solid ${C.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '14.5px', fontWeight: 800, color: '#ffffff' }}>아밤 3대 프라이빗 시그니처 코스</span>
              <span style={{ fontSize: '13px', color: C.gold, fontWeight: 700 }}>전 코스 100% 대면결제 정찰제</span>
            </div>

            {/* 코스 목록 */}
            {c.courses.map((course, idx) => {
              const isThai = course.no === 1;
              const isAroma = course.no === 2;
              const isSpecial = course.no === 3;
              const themeColor = isAroma ? '#f59e0b' : isSpecial ? '#e11d48' : '#38bdf8';
              const badgeText = t.courseLetter[course.no - 1] ?? t.courseLetter[0];

              return (
                <div key={course.no} style={{ borderTop: idx > 0 ? '1px solid rgba(255,255,255,0.08)' : 'none', padding: '22px 20px' }}>
                  
                  {/* 코스 헤더 */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ background: themeColor, color: '#ffffff', fontWeight: 900, fontSize: '12px', padding: '3px 8px', borderRadius: '4px' }}>
                        {badgeText}
                      </span>
                      <strong style={{ fontSize: '18px', color: '#ffffff' }}>{course.name}{t.courseSuffix}</strong>
                    </div>
                    <span style={{ fontSize: '13.5px', color: themeColor, fontWeight: 700 }}>
                      {course.subtitle}
                    </span>
                  </div>

                  <p style={{ fontSize: '14.5px', color: C.textSub, margin: '0 0 16px', lineHeight: 1.7, wordBreak: 'keep-all' }}>
                    {course.desc}
                  </p>

                  {/* 3열 정찰제 가격 그리드 */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                    {course.prices.map((pr, pi) => {
                      const isRecom = (isThai && pi === 1) || (isAroma && pi === 1) || (isSpecial && pi === 2);
                      return (
                        <div
                          key={pi}
                          onClick={() => setSmsModal(true)}
                          role="button"
                          tabIndex={0}
                          style={{
                            textAlign: 'center',
                            border: isRecom ? `1.5px solid ${themeColor}` : `1px solid rgba(255,255,255,0.1)`,
                            background: isRecom ? `${themeColor}15` : 'rgba(6, 12, 26, 0.7)',
                            borderRadius: '8px',
                            padding: '14px 6px',
                            cursor: 'pointer',
                          }}
                        >
                          <div style={{ fontSize: '13px', color: C.textMuted, fontWeight: 700 }}>{c.priceSection.durations[pi]}</div>
                          <div style={{ fontSize: '18px', fontWeight: 900, color: isRecom ? '#ffffff' : '#f1f5f9', marginTop: '4px', letterSpacing: '-0.4px' }}>
                            {pr}
                          </div>
                          <div style={{ fontSize: '11px', color: C.gold, fontWeight: 700, marginTop: '4px' }}>
                            간편예약 →
                          </div>
                        </div>
                      );
                    })}
                  </div>

                </div>
              );
            })}

          </div>

          {/* 코스 하단 화보 */}
          <div style={{ position: 'relative', width: '100%', height: '300px', borderRadius: '12px', overflow: 'hidden', marginTop: '16px', border: `1px solid ${C.border}` }}>
            <Image
              src="/images/abam_penthouse_night.jpg"
              alt={t.altNight}
              fill
              sizes="(max-width: 640px) 100vw, 860px"
              style={{ objectFit: 'cover' }}
            />
          </div>
        </section>

        {/* ── 5. 방문 확인사항 및 호텔/주차 이용 안내 ── */}
        <section id="rules" style={{ marginBottom: '44px', scrollMarginTop: '70px' }}>
          <div style={{ borderLeft: `3px solid ${C.goldSoft}`, paddingLeft: '14px', marginBottom: '16px' }}>
            <h2 className="luminok-section-title">이용 및 방문 전 확인 안내</h2>
            <p className="luminok-section-sub">편안하고 안전한 방문 관리를 위해 꼭 확인해 주세요</p>
          </div>

          <div className="abam-panel">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <div style={{ fontSize: '16.5px', fontWeight: 800, color: C.gold, marginBottom: '4px' }}>1. 예약 및 출발 시간 안내</div>
                <div style={{ fontSize: '14.5px', color: C.textSub, lineHeight: 1.7 }}>
                  예약 접수는 18:00부터 가능하며, 매니저 출발은 19:00부터, 마지막 예약 마감은 새벽 05:00입니다. 희망 시간 1시간 전 예약해 주시면 가장 수월합니다.
                </div>
              </div>

              <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '16px' }}>
                <div style={{ fontSize: '16.5px', fontWeight: 800, color: '#ffffff', marginBottom: '4px' }}>2. 주차장 및 1층 공동현관 안내</div>
                <div style={{ fontSize: '14.5px', color: C.textSub, lineHeight: 1.7 }}>
                  주차장과 1층 공동현관 비밀번호는 예약 시 미리 알려주세요. 비밀번호 안내가 어려우실 경우 호출버튼으로 열어주실 수 있다고 미리 말씀해 주시면, 도착 후 매니저가 전화드리고 호출을 누릅니다.
                </div>
              </div>

              <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '16px' }}>
                <div style={{ fontSize: '16.5px', fontWeight: 800, color: '#ffffff', marginBottom: '4px' }}>3. 호텔 · 모텔 이용 안내</div>
                <div style={{ fontSize: '14.5px', color: C.textSub, lineHeight: 1.7 }}>
                  호텔 및 모텔 이용 시 예약 시 상호명을 알려주시면 도착 전 매니저가 연락드립니다. 1층 로비에서 매니저를 만나 대면결제 후 객실까지 함께 이동합니다.
                </div>
              </div>

              <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '16px' }}>
                <div style={{ fontSize: '16.5px', fontWeight: 800, color: C.gold, marginBottom: '4px' }}>4. 100% 현장 직접 대면결제</div>
                <div style={{ fontSize: '14.5px', color: C.textSub, lineHeight: 1.7 }}>
                  현금, 계좌이체, 카드 결제 모두 가능하며 어떠한 선입금이나 예약금도 절대 요구하지 않습니다.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 화보 2 ── */}
        <div style={{ position: 'relative', width: '100%', height: '280px', borderRadius: '12px', overflow: 'hidden', marginBottom: '44px', border: `1px solid ${C.border}` }}>
          <Image
            src="/images/sensual_back.jpg"
            alt={t.altAroma}
            fill
            sizes="(max-width: 640px) 100vw, 860px"
            style={{ objectFit: 'cover' }}
          />
        </div>

        {/* ── 6. 고객 이용 후기 ── */}
        <section id="reviews" style={{ marginBottom: '44px', scrollMarginTop: '70px' }}>
          <div style={{ borderLeft: `3px solid ${C.goldSoft}`, paddingLeft: '14px', marginBottom: '16px' }}>
            <h2 className="luminok-section-title">실제 고객 이용 후기</h2>
            <p className="luminok-section-sub">아밤을 이용해 주신 고객님들의 진솔한 이용 경험</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {c.reviews.slice(0, 6).map((rev, i) => (
              <div key={i} className="abam-panel" style={{ padding: '18px 20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <span style={{ color: C.gold, fontSize: '13px', letterSpacing: '2px' }}>★★★★★</span>
                  <span style={{ fontSize: '13px', color: C.gold, fontWeight: 700 }}>{rev.course}</span>
                </div>
                <div style={{ fontSize: '15px', color: '#e2e8f0', lineHeight: 1.75, wordBreak: 'keep-all' }}>
                  {rev.text}
                </div>
                <div style={{ fontSize: '12.5px', color: C.textMuted, marginTop: '10px' }}>
                  <span style={{ color: '#ffffff', fontWeight: 600 }}>{rev.author}</span> · {rev.area}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── 7. 자주 묻는 질문 FAQ ── */}
        <section id="faq" style={{ marginBottom: '44px', scrollMarginTop: '70px' }}>
          <div style={{ borderLeft: `3px solid ${C.goldSoft}`, paddingLeft: '14px', marginBottom: '16px' }}>
            <h2 className="luminok-section-title">자주 묻는 질문 FAQ</h2>
            <p className="luminok-section-sub">예약 및 이용 전 가장 궁금해하시는 질문들입니다</p>
          </div>

          <div className="abam-panel" style={{ padding: 0, overflow: 'hidden' }}>
            {c.faqs.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={i} style={{ borderTop: i ? '1px solid rgba(255,255,255,0.08)' : 'none' }}>
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    style={{
                      width: '100%',
                      padding: '18px 20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      textAlign: 'left',
                      background: isOpen ? 'rgba(15, 26, 56, 0.5)' : 'none',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    <span style={{ fontSize: '15.5px', fontWeight: 700, color: isOpen ? C.gold : '#ffffff' }}>{faq.q}</span>
                    <span style={{ fontSize: '18px', color: C.gold, fontWeight: 800 }}>{isOpen ? '−' : '+'}</span>
                  </button>
                  {isOpen && (
                    <div style={{ padding: '0 20px 18px', fontSize: '14.5px', color: C.textSub, lineHeight: 1.75, wordBreak: 'keep-all' }}>
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* ── 8. 푸터 ── */}
        <footer style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '24px', paddingBottom: '32px' }}>
          <div style={{ fontSize: '15px', fontWeight: 800, color: '#ffffff', marginBottom: '8px' }}>{c.footer.title}</div>
          <p style={{ fontSize: '13px', color: C.textMuted, lineHeight: 1.65, margin: '0 0 14px' }}>{c.footer.sub}</p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 14px', fontSize: '12.5px', margin: '14px 0', padding: '12px 0', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <Link href="/keywords" style={{ color: C.gold, textDecoration: 'none', fontWeight: 700 }}>전체 570+ 지역별 안내 →</Link>
            <Link href="/regions/seoul" style={{ color: '#cbd5e1', textDecoration: 'none' }}>서울 25개 자치구</Link>
            <Link href="/regions/gyeonggi-south" style={{ color: '#cbd5e1', textDecoration: 'none' }}>경기 남부</Link>
            <Link href="/regions/gyeonggi-north" style={{ color: '#cbd5e1', textDecoration: 'none' }}>경기 북부</Link>
            <Link href="/guide/chuljang-massage-price" style={{ color: '#94a3b8', textDecoration: 'none' }}>정찰 가격표</Link>
          </div>

          <div style={{ fontSize: '12px', color: '#64748b', lineHeight: 1.65 }}>{c.footer.line}</div>
        </footer>

      </main>

      {/* ── 9. 루미노케이형 하단 고정 퀵바 ── */}
      <div className="luminok-bottom-bar">
        <div style={{ maxWidth: '860px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '10px' }}>
          <button
            type="button"
            onClick={() => setSmsModal(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'linear-gradient(135deg, #d4af37 0%, #b89628 100%)',
              color: '#060a17',
              fontSize: '16.5px',
              fontWeight: 900,
              padding: '14px 0',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 4px 18px rgba(212, 175, 55, 0.3)',
            }}
          >
            문자 간편예약
          </button>

          <a
            href={`tel:${c.contact.phone.replace(/[^0-9]/g, '')}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: C.red,
              color: '#ffffff',
              fontSize: '16.5px',
              fontWeight: 900,
              padding: '14px 0',
              borderRadius: '8px',
              textDecoration: 'none',
              boxShadow: '0 4px 18px rgba(220, 38, 38, 0.35)',
            }}
          >
            전화 바로연결
          </a>
        </div>
      </div>

    </div>
  );
}
