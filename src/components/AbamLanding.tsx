'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { type LandingContent } from '../lib/landing-content';
import { UI } from '../lib/landing-ui';
import AbamBottomBookingBar, { openDirectAbamSms } from './AbamBottomBookingBar';

const C = {
  bg: '#0d1320',
  cardBg: '#111827',
  border: '#243048',
  textWhite: '#ffffff',
  textSub: '#cbd5e1',
  textMuted: '#94a3b8',
  accent: '#f2ca50',
  blue: '#1e293b',
};

const FONT = '"Pretendard", "Noto Sans KR", -apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo", "Malgun Gothic", sans-serif';

type Lang = 'ko' | 'en' | 'jp' | 'cn';

const LANGS: { code: Lang; label: string; href: string }[] = [
  { code: 'ko', label: 'KR', href: '/' },
  { code: 'en', label: 'EN', href: '/en' },
  { code: 'jp', label: 'JP', href: '/jp' },
  { code: 'cn', label: 'CN', href: '/cn' },
];

export default function AbamLanding({ c, areaLinks }: { c: LandingContent; areaLinks?: string[] }) {
  const t = UI[c.lang];
  const isKo = c.lang === 'ko';
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const cleanPhone = c.contact.phone.replace(/[^0-9]/g, '') || '01066072239';

  const guideItems = isKo
    ? [
        {
          no: '01',
          title: '영업시간 안내 (영업시간 내 100% 방문 가능)',
          lines: [
            '예약 접수 18:00부터 · 매니저 출발 19:00 ~ 새벽 05:00 마감입니다.',
            '영업시간 내 서울·경기 전 지역 100% 방문 가능하며, 희망 시간 1시간 전 예약을 권장드립니다.',
          ],
        },
        {
          no: '02',
          title: '주차장 및 1층 공동현관 출입 안내 (필수 확인)',
          lines: [
            '신속한 방문을 위해 예약 시 주소(동·호수), 주차 가능 여부를 알려주세요.',
            '1층 공동현관 비밀번호(어려우실 경우 호출버튼 개방 가능 여부)를 함께 기재해 주시면 됩니다.',
          ],
        },
        {
          no: '03',
          title: '호텔·모텔 이용 및 100% 현장 대면결제',
          lines: [
            '호텔·모텔은 도착 시 연락드린 후 1층 로비에서 만나 대면결제(현금·이체·카드) 후 객실로 함께 이동합니다.',
            '웹사이트 예약 양식에 입력하시는 모든 정보는 서버에 절대 기록·저장되지 않으며 고객님 문자창으로만 전달됩니다.',
          ],
        },
      ]
    : t.rules.slice(0, 3).map(([title, desc], i) => ({
        no: `0${i + 1}`,
        title: title.replace(/^\d+\.\s*/, ''),
        lines: [desc],
      }));

  return (
    <div
      lang={c.htmlLang}
      style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        backgroundColor: C.bg,
        color: C.textWhite,
        fontFamily: FONT,
        paddingBottom: '94px',
        lineHeight: 1.58,
        wordBreak: 'keep-all',
        overflowWrap: 'break-word',
      }}
    >
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
                  '서울 25개 구 및 경기 전 지역 자택·호텔 방문 출장마사지·홈타이. 선입금 없는 100% 현장 결제.',
                telephone: '+82-10-6607-2239',
                priceRange: '₩80,000 - ₩160,000',
                paymentAccepted: 'Cash, Credit Card, Bank Transfer',
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

      {/* 1. 상단 헤더 */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 40,
          backgroundColor: 'rgba(10, 14, 26, 0.95)',
          backdropFilter: 'blur(12px)',
          borderBottom: `1px solid ${C.border}`,
        }}
      >
        <div
          style={{
            maxWidth: '720px',
            margin: '0 auto',
            padding: '10px 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '8px',
          }}
        >
          <Link
            href="/"
            style={{
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }}
          >
            <span style={{ fontSize: '19px', fontWeight: 900, color: '#ffffff', letterSpacing: '-0.5px' }}>
              아밤
            </span>
            <span
              style={{
                fontSize: '12.5px',
                fontWeight: 800,
                color: C.accent,
                fontVariantNumeric: 'tabular-nums',
              }}
            >
              010-6607-2239
            </span>
          </Link>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
            <nav style={{ display: 'flex', alignItems: 'center', gap: '10px', whiteSpace: 'nowrap' }}>
              <a href="#price" style={{ color: C.textWhite, fontSize: '13px', fontWeight: 700 }}>
                {isKo ? '요금표' : t.hnav[1]}
              </a>
              <a href="#therapists" style={{ color: C.accent, fontSize: '13px', fontWeight: 700 }}>
                {isKo ? '에이스' : 'Roster'}
              </a>
              <a href="#guide" style={{ color: C.textSub, fontSize: '13px', fontWeight: 600 }}>
                {isKo ? '이용안내' : t.hnav[2]}
              </a>
              <a href="#faq" style={{ color: C.textSub, fontSize: '13px', fontWeight: 600 }}>
                FAQ
              </a>
            </nav>

            <div style={{ display: 'flex', gap: '3px', whiteSpace: 'nowrap' }}>
              {LANGS.map((l) => (
                <Link
                  key={l.code}
                  href={l.href}
                  style={{
                    fontSize: '11px',
                    fontWeight: 800,
                    padding: '3px 6px',
                    borderRadius: '4px',
                    color: l.code === c.lang ? '#0f172a' : '#94a3b8',
                    backgroundColor: l.code === c.lang ? C.accent : '#161f33',
                  }}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* 2. 메인 영역 */}
      <main style={{ maxWidth: '720px', margin: '0 auto', padding: '16px 16px 24px' }}>
        {/* HERO SECTION */}
        <section style={{ marginBottom: '28px' }}>
          {/* 실시간 상태 배지 */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '12px',
              fontWeight: 800,
              color: C.accent,
              backgroundColor: 'rgba(242, 202, 80, 0.12)',
              border: '1px solid rgba(242, 202, 80, 0.35)',
              borderRadius: '20px',
              padding: '4px 12px',
              marginBottom: '12px',
              whiteSpace: 'nowrap',
            }}
          >
            <span className="abam-live-dot" />
            <span>{isKo ? '실시간 예약 접수 중 · 서울·경기 30~40분 총알 출발' : t.badge}</span>
          </div>

          <h1
            style={{
              fontSize: 'clamp(26px, 7vw, 36px)',
              fontWeight: 900,
              color: '#ffffff',
              letterSpacing: '-0.6px',
              margin: '0 0 10px',
              lineHeight: 1.22,
              wordBreak: 'keep-all',
            }}
          >
            {isKo ? (
              <>
                서울·경기 출장마사지 & 홈타이 1위
                <br />
                <span className="abam-gold-text">아밤 (ABAM)</span>
              </>
            ) : (
              c.about.title
            )}
          </h1>

          <p style={{ fontSize: '14px', color: C.textSub, margin: '0 0 16px', lineHeight: 1.6 }}>
            {isKo ? (
              <>
                20대 전문 힐러 1:1 방문 케어 · 자택, 호텔, 오피스텔 어디든 <strong>30~40분 내 신속 방문</strong>합니다.
                <br />
                <strong style={{ color: '#ffffff' }}>선입금 없는 100% 현장 대면결제</strong>로 안심하고 이용하세요.
              </>
            ) : (
              c.about.p1
            )}
          </p>

          {/* 대형 비주얼 배너 (스티치 스타일 럭셔리 프레임) */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: '230px',
              borderRadius: '14px',
              overflow: 'hidden',
              border: '1px solid rgba(242, 202, 80, 0.35)',
              boxShadow: '0 12px 35px -8px rgba(0, 0, 0, 0.7)',
              marginBottom: '16px',
            }}
          >
            <Image
              src="/images/abam_hero_seductive.jpg"
              alt={t.altHero}
              fill
              sizes="(max-width: 720px) 100vw, 720px"
              style={{ objectFit: 'cover', objectPosition: 'center top' }}
              priority
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(13, 19, 32, 0.95) 0%, rgba(13, 19, 32, 0.2) 60%, transparent 100%)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: '12px',
                left: '14px',
                right: '14px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
              }}
            >
              <div>
                <span
                  style={{
                    display: 'inline-block',
                    fontSize: '11px',
                    fontWeight: 800,
                    color: C.accent,
                    backgroundColor: 'rgba(10, 14, 26, 0.85)',
                    padding: '3px 8px',
                    borderRadius: '6px',
                    marginBottom: '4px',
                  }}
                >
                  ✦ 1:1 프라이빗 힐링 케어
                </span>
                <div style={{ fontSize: '15px', fontWeight: 800, color: '#ffffff' }}>
                  서울·경기 전지역 30~40분 총알 방문
                </div>
              </div>
              <span
                style={{
                  fontSize: '11.5px',
                  fontWeight: 800,
                  color: '#22c55e',
                  backgroundColor: 'rgba(10, 14, 26, 0.85)',
                  padding: '4px 10px',
                  borderRadius: '20px',
                  border: '1px solid rgba(34, 197, 94, 0.4)',
                  whiteSpace: 'nowrap',
                }}
              >
                100% 현장결제
              </span>
            </div>
          </div>

          {/* 주요 전환 버튼 2개 (골드 발광 버튼 + 다크 슬레이트 전화 버튼) */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '16px' }}>
            <button
              type="button"
              onClick={() => openDirectAbamSms()}
              className="abam-gold-btn"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '12px',
                padding: '14px 10px',
                border: 'none',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
            >
              <span style={{ fontSize: '16px', fontWeight: 900, color: '#0a0e17' }}>
                💬 {isKo ? '간편 문자예약' : t.smsBar}
              </span>
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#1e293b', marginTop: '2px' }}>
                {isKo ? '기록 없는 1-클릭 안심 양식' : 'Instant SMS Form'}
              </span>
            </button>

            <a
              href={`tel:${cleanPhone}`}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#162138',
                border: '1px solid #3b4b6e',
                color: '#ffffff',
                borderRadius: '12px',
                padding: '14px 10px',
                textDecoration: 'none',
                whiteSpace: 'nowrap',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)',
              }}
            >
              <span style={{ fontSize: '16px', fontWeight: 900 }}>
                📞 {isKo ? '전화 문의' : t.callBar}
              </span>
              <span
                style={{
                  fontSize: '12px',
                  fontWeight: 700,
                  color: C.accent,
                  marginTop: '2px',
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                {c.contact.phone}
              </span>
            </a>
          </div>

          {/* 4대 안심 보증 그리드 */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '8px',
              marginBottom: '16px',
            }}
          >
            <div
              style={{
                backgroundColor: '#111827',
                border: '1px solid rgba(242, 202, 80, 0.2)',
                borderRadius: '10px',
                padding: '10px 12px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <span style={{ fontSize: '18px' }}>🛡️</span>
              <div>
                <strong style={{ fontSize: '12.5px', color: '#ffffff', display: 'block' }}>
                  100% 현장 대면결제
                </strong>
                <span style={{ fontSize: '11px', color: C.textMuted }}>선입금 0원 · 예약금 사기 근절</span>
              </div>
            </div>

            <div
              style={{
                backgroundColor: '#111827',
                border: '1px solid rgba(242, 202, 80, 0.2)',
                borderRadius: '10px',
                padding: '10px 12px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <span style={{ fontSize: '18px' }}>⚡</span>
              <div>
                <strong style={{ fontSize: '12.5px', color: '#ffffff', display: 'block' }}>
                  30~40분 총알 도착
                </strong>
                <span style={{ fontSize: '11px', color: C.textMuted }}>서울·경기 전지역 순차 배차</span>
              </div>
            </div>

            <div
              style={{
                backgroundColor: '#111827',
                border: '1px solid rgba(242, 202, 80, 0.2)',
                borderRadius: '10px',
                padding: '10px 12px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <span style={{ fontSize: '18px' }}>🔒</span>
              <div>
                <strong style={{ fontSize: '12.5px', color: '#ffffff', display: 'block' }}>
                  개인정보 서버 미저장
                </strong>
                <span style={{ fontSize: '11px', color: C.textMuted }}>문자창 직접 전송 안심 보안</span>
              </div>
            </div>

            <div
              style={{
                backgroundColor: '#111827',
                border: '1px solid rgba(242, 202, 80, 0.2)',
                borderRadius: '10px',
                padding: '10px 12px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <span style={{ fontSize: '18px' }}>💳</span>
              <div>
                <strong style={{ fontSize: '12.5px', color: '#ffffff', display: 'block' }}>
                  모든 결제수단 지원
                </strong>
                <span style={{ fontSize: '11px', color: C.textMuted }}>현금 · 계좌이체 · 카드 결제</span>
              </div>
            </div>
          </div>
        </section>

        {/* 3. 코스 및 요금표 (실제 코스 사진 + 럭셔리 카드 디자인) */}
        <section id="price" style={{ marginBottom: '30px', scrollMarginTop: '56px' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              marginBottom: '12px',
              gap: '8px',
            }}
          >
            <div>
              <span style={{ fontSize: '11px', fontWeight: 800, color: C.accent, letterSpacing: '1px', textTransform: 'uppercase' }}>
                Signature Courses
              </span>
              <h2 style={{ fontSize: '20px', fontWeight: 900, color: '#ffffff', margin: '2px 0 0', whiteSpace: 'nowrap' }}>
                {isKo ? '코스 및 정찰 요금표' : t.priceTitle}
              </h2>
            </div>
            <span style={{ fontSize: '12px', color: C.accent, fontWeight: 700, whiteSpace: 'nowrap' }}>
              {isKo ? '요금 터치 시 즉시 예약' : 'Tap price to book'}
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {c.courses.map((course, idx) => {
              const coursePhotos = ['/images/thai.jpg', '/images/aroma.jpg', '/images/flower_spa.jpg'];
              const photo = coursePhotos[idx] || course.img;
              const badges = ['왓포 전통 건식 지압', '⭐ 고객 선호 1위 유기농 오일', '👑 VIP 시그니처 콤비네이션'];
              const badge = badges[idx] || course.subtitle;

              return (
                <div
                  key={course.no}
                  style={{
                    backgroundColor: C.cardBg,
                    border: idx === 1 ? '2px solid #f2ca50' : `1px solid ${C.border}`,
                    borderRadius: '14px',
                    overflow: 'hidden',
                    boxShadow: idx === 1 ? '0 10px 30px -10px rgba(242, 202, 80, 0.3)' : '0 6px 20px rgba(0, 0, 0, 0.4)',
                  }}
                >
                  {/* 코스 이미지 헤더 */}
                  <div style={{ position: 'relative', width: '100%', height: '140px', overflow: 'hidden' }}>
                    <Image
                      src={photo}
                      alt={course.name}
                      fill
                      sizes="(max-width: 720px) 100vw, 720px"
                      style={{ objectFit: 'cover' }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(to top, rgba(17, 24, 39, 0.95) 0%, rgba(17, 24, 39, 0.2) 70%, transparent 100%)',
                      }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        top: '10px',
                        left: '12px',
                        backgroundColor: 'rgba(10, 14, 26, 0.85)',
                        backdropFilter: 'blur(8px)',
                        border: '1px solid rgba(242, 202, 80, 0.4)',
                        borderRadius: '6px',
                        padding: '3px 8px',
                        fontSize: '11px',
                        fontWeight: 800,
                        color: C.accent,
                      }}
                    >
                      {badge}
                    </div>
                  </div>

                  <div style={{ padding: '14px' }}>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '6px',
                        gap: '8px',
                      }}
                    >
                      <strong style={{ fontSize: '18px', color: '#ffffff', fontWeight: 900 }}>
                        {course.name} 코스
                      </strong>
                      <span style={{ fontSize: '12.5px', color: C.accent, fontWeight: 700 }}>
                        {course.subtitle}
                      </span>
                    </div>

                    <p
                      style={{
                        fontSize: '13px',
                        color: C.textSub,
                        margin: '0 0 12px',
                        lineHeight: 1.55,
                      }}
                    >
                      {course.desc}
                    </p>

                    {/* 시간/가격 선택 버튼 3개 */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                      {course.prices.map((pr, pi) => {
                        const slipCodes = [
                          ['타이 60분 8만', '타이 90분 10만', '타이 120분 12만'],
                          ['아로마 60분 9만', '아로마 90분 11만', '아로마 120분 14만'],
                          ['스페셜 60분 10만', '스페셜 90분 12만', '스페셜 120분 16만'],
                        ];
                        const code = slipCodes[idx]?.[pi] || `${course.name} ${c.priceSection.durations[pi]} ${pr}`;
                        return (
                          <button
                            key={pi}
                            type="button"
                            onClick={() => openDirectAbamSms(code)}
                            style={{
                              textAlign: 'center',
                              border: '1px solid rgba(242, 202, 80, 0.25)',
                              backgroundColor: '#0a0e1a',
                              borderRadius: '8px',
                              padding: '10px 4px',
                              cursor: 'pointer',
                              whiteSpace: 'nowrap',
                              transition: 'all 0.2s',
                            }}
                          >
                            <div style={{ fontSize: '11.5px', color: C.textMuted, fontWeight: 600 }}>
                              {c.priceSection.durations[pi]}
                            </div>
                            <div
                              style={{
                                fontSize: '15px',
                                fontWeight: 900,
                                color: '#ffffff',
                                marginTop: '2px',
                                fontVariantNumeric: 'tabular-nums',
                              }}
                            >
                              {pr}
                            </div>
                            <span style={{ fontSize: '10px', color: C.accent, fontWeight: 700, display: 'block', marginTop: '2px' }}>
                              예약하기 ➔
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 4. 20대 ACE 관리사 라인업 SHOWCASE */}
        {c.therapists && c.therapists.length > 0 && (
          <section id="therapists" style={{ marginBottom: '30px', scrollMarginTop: '56px' }}>
            <div style={{ marginBottom: '12px' }}>
              <span style={{ fontSize: '11px', fontWeight: 800, color: C.accent, letterSpacing: '1px', textTransform: 'uppercase' }}>
                Ace Roster
              </span>
              <h2 style={{ fontSize: '20px', fontWeight: 900, color: '#ffffff', margin: '2px 0 0' }}>
                {isKo ? '오늘 밤 20대 ACE 총출동 라인업' : 'Featured Therapists'}
              </h2>
              <p style={{ fontSize: '13px', color: C.textSub, margin: '4px 0 0' }}>
                {isKo ? '20대 전문 힐러 1:1 방문 케어 · 실시간 도로 교통/배차 기준 순차 이동' : 'Vetted professionals dispatched promptly.'}
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
              {c.therapists.slice(0, 6).map((th, ti) => (
                <div
                  key={ti}
                  style={{
                    backgroundColor: C.cardBg,
                    border: '1px solid rgba(242, 202, 80, 0.2)',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div style={{ position: 'relative', width: '100%', height: '180px', overflow: 'hidden' }}>
                    <Image
                      src={th.img}
                      alt={th.name}
                      fill
                      sizes="(max-width: 720px) 50vw, 360px"
                      style={{ objectFit: 'cover', objectPosition: 'top' }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        top: '8px',
                        left: '8px',
                        backgroundColor: 'rgba(10, 14, 26, 0.85)',
                        backdropFilter: 'blur(6px)',
                        borderRadius: '4px',
                        padding: '2px 6px',
                        fontSize: '10.5px',
                        fontWeight: 800,
                        color: C.accent,
                        border: '1px solid rgba(242, 202, 80, 0.3)',
                      }}
                    >
                      {th.badge}
                    </div>
                  </div>

                  <div style={{ padding: '10px 12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '2px' }}>
                      <strong style={{ fontSize: '15px', fontWeight: 900, color: '#ffffff' }}>
                        {th.name} 매니저
                      </strong>
                      <span style={{ fontSize: '11.5px', color: C.accent, fontWeight: 700 }}>
                        {th.age}
                      </span>
                    </div>
                    <div style={{ fontSize: '11px', color: C.textMuted, marginBottom: '6px' }}>
                      {th.spec}
                    </div>
                    <div style={{ fontSize: '11.5px', color: C.textSub, lineHeight: 1.4, marginBottom: '8px' }}>
                      {th.desc}
                    </div>
                    <button
                      type="button"
                      onClick={() => openDirectAbamSms(`${th.name} 매니저 지명 예약`)}
                      style={{
                        width: '100%',
                        backgroundColor: '#1f293d',
                        border: '1px solid rgba(242, 202, 80, 0.3)',
                        color: C.accent,
                        borderRadius: '6px',
                        padding: '7px 0',
                        fontSize: '12px',
                        fontWeight: 800,
                        cursor: 'pointer',
                      }}
                    >
                      문자지명 예약 ➔
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 5. 이용 및 예약 필수 안내 */}
        <section id="guide" style={{ marginBottom: '30px', scrollMarginTop: '56px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 900, color: '#ffffff', margin: '0 0 12px' }}>
            {isKo ? '이용 및 예약 필수 안내' : t.rulesTitle}
          </h2>

          <div
            style={{
              backgroundColor: C.cardBg,
              border: `1px solid ${C.border}`,
              borderRadius: '12px',
              padding: '14px',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
            }}
          >
            {guideItems.map((item, idx) => (
              <div
                key={item.no}
                style={{
                  borderTop: idx > 0 ? `1px solid ${C.border}` : 'none',
                  paddingTop: idx > 0 ? '14px' : 0,
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '10px',
                }}
              >
                <span
                  style={{
                    flexShrink: 0,
                    width: '26px',
                    height: '24px',
                    borderRadius: '6px',
                    backgroundColor: 'rgba(242, 202, 80, 0.15)',
                    color: C.accent,
                    fontSize: '12px',
                    fontWeight: 900,
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: '1px',
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  {item.no}
                </span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <strong style={{ color: '#ffffff', fontSize: '14px', display: 'block', marginBottom: '4px' }}>
                    {item.title}
                  </strong>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '13px', color: C.textSub, lineHeight: 1.55 }}>
                    {item.lines.map((line, li) => (
                      <div key={li}>{line}</div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 6. 고객 리얼 후기 */}
        {c.reviews && c.reviews.length > 0 && (
          <section style={{ marginBottom: '30px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 900, color: '#ffffff', margin: '0 0 12px' }}>
              {isKo ? '실제 이용 고객 후기' : 'Verified Reviews'}
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {c.reviews.slice(0, 3).map((rev, ri) => (
                <div
                  key={ri}
                  style={{
                    backgroundColor: '#111827',
                    border: '1px solid rgba(242, 202, 80, 0.18)',
                    borderRadius: '10px',
                    padding: '12px 14px',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <span style={{ fontSize: '13px', fontWeight: 800, color: '#ffffff' }}>
                      {rev.author} <span style={{ color: C.accent }}>({rev.area})</span>
                    </span>
                    <span style={{ fontSize: '11px', color: C.textMuted, backgroundColor: '#162138', padding: '2px 6px', borderRadius: '4px' }}>
                      {rev.course}
                    </span>
                  </div>
                  <p style={{ fontSize: '12.5px', color: C.textSub, margin: 0, lineHeight: 1.5 }}>
                    "{rev.text}"
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 7. 자주 묻는 질문 FAQ */}
        <section id="faq" style={{ marginBottom: '30px', scrollMarginTop: '56px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 900, color: '#ffffff', margin: '0 0 12px' }}>
            {isKo ? '자주 묻는 질문 (FAQ)' : t.faqSection?.title || 'FAQ'}
          </h2>

          <div
            style={{
              backgroundColor: C.cardBg,
              border: `1px solid ${C.border}`,
              borderRadius: '12px',
              overflow: 'hidden',
            }}
          >
            {c.faqs.map((faq, i) => {
              const isOpen = openFaq === i;
              const cleanQ = faq.q.replace(/^Q\.\s*/i, '');
              return (
                <div key={i} style={{ borderTop: i ? `1px solid ${C.border}` : 'none' }}>
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      display: 'flex',
                      alignItems: 'flex-start',
                      justifyContent: 'space-between',
                      textAlign: 'left',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      gap: '10px',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', flex: 1, minWidth: 0 }}>
                      <span
                        style={{
                          flexShrink: 0,
                          fontSize: '14px',
                          fontWeight: 900,
                          color: C.accent,
                          width: '20px',
                        }}
                      >
                        Q.
                      </span>
                      <span
                        style={{
                          flex: 1,
                          fontSize: '14px',
                          fontWeight: 700,
                          color: isOpen ? C.accent : '#ffffff',
                          lineHeight: 1.45,
                        }}
                      >
                        {cleanQ}
                      </span>
                    </div>
                    <span style={{ fontSize: '18px', color: C.textMuted, fontWeight: 700, flexShrink: 0, lineHeight: 1.2 }}>
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>
                  {isOpen && (
                    <div
                      style={{
                        padding: '0 16px 14px 44px',
                        fontSize: '13px',
                        color: C.textSub,
                        lineHeight: 1.6,
                        whiteSpace: 'pre-line',
                      }}
                    >
                      <div style={{ paddingLeft: '10px', borderLeft: '2px solid #334155' }}>
                        {faq.a}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* 8. 서울·경기 주요 방문 지역 링크 */}
        {areaLinks && areaLinks.length > 0 && (
          <section style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <h2 style={{ fontSize: '15px', fontWeight: 800, color: '#ffffff', margin: 0 }}>
                서울·경기 지역별 방문 안내
              </h2>
              <Link href="/keywords" style={{ fontSize: '12px', color: C.accent, fontWeight: 700, whiteSpace: 'nowrap' }}>
                전체 지역 보기 ➔
              </Link>
            </div>
            <div
              style={{
                backgroundColor: C.cardBg,
                border: `1px solid ${C.border}`,
                borderRadius: '10px',
                padding: '10px',
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '6px',
              }}
            >
              {areaLinks.slice(0, 48).map((kw) => (
                <Link
                  key={kw}
                  href={`/seo/${encodeURIComponent(kw.replace(/\s+/g, '-'))}`}
                  style={{
                    fontSize: '12px',
                    color: C.textSub,
                    backgroundColor: '#090d18',
                    border: `1px solid ${C.border}`,
                    borderRadius: '5px',
                    padding: '6px 4px',
                    textAlign: 'center',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {kw}
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* 9. 푸터 */}
        <footer style={{ borderTop: `1px solid ${C.border}`, paddingTop: '16px', paddingBottom: '12px' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '6px',
              fontSize: '12px',
              marginBottom: '12px',
              textAlign: 'center',
            }}
          >
            <Link href="/keywords" style={{ color: C.accent, fontWeight: 700, backgroundColor: '#0f1626', padding: '6px 4px', borderRadius: '4px', border: `1px solid ${C.border}` }}>
              전체 지역 안내
            </Link>
            <Link href="/regions/seoul" style={{ color: C.textSub, backgroundColor: '#0f1626', padding: '6px 4px', borderRadius: '4px', border: `1px solid ${C.border}` }}>
              서울 25개구
            </Link>
            <Link href="/regions/gyeonggi-south" style={{ color: C.textSub, backgroundColor: '#0f1626', padding: '6px 4px', borderRadius: '4px', border: `1px solid ${C.border}` }}>
              경기 남부권
            </Link>
            <Link href="/regions/gyeonggi-north" style={{ color: C.textSub, backgroundColor: '#0f1626', padding: '6px 4px', borderRadius: '4px', border: `1px solid ${C.border}` }}>
              경기 북부권
            </Link>
            <Link href="/regions/incheon-bucheon" style={{ color: C.textSub, backgroundColor: '#0f1626', padding: '6px 4px', borderRadius: '4px', border: `1px solid ${C.border}` }}>
              인천·부천권
            </Link>
            <Link href="/guide/chuljang-massage-price" style={{ color: C.textSub, backgroundColor: '#0f1626', padding: '6px 4px', borderRadius: '4px', border: `1px solid ${C.border}` }}>
              정찰 요금 안내
            </Link>
          </div>
          <div style={{ fontSize: '11.5px', color: '#64748b', lineHeight: 1.6, paddingLeft: '8px', borderLeft: '2px solid #1e293b' }}>
            <div>아밤 (abam.kr) · 서울·경기 자택·호텔 방문 홈케어</div>
            <div>예약 및 상담 직통: {c.contact.phone} (접수 18:00 ~ 마감 05:00)</div>
          </div>
        </footer>
      </main>

      {/* 10. 모바일/PC 화면 하단 고정 버튼 */}
      <AbamBottomBookingBar
        phone={cleanPhone}
        smsLabel={isKo ? '문자예약하기' : t.smsBar}
        callLabel={isKo ? '전화하기' : t.callBar}
      />
    </div>
  );
}
