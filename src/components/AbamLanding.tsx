'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { type LandingContent } from '../lib/landing-content';
import { UI } from '../lib/landing-ui';
import AbamBottomBookingBar, { openDirectAbamSms } from './AbamBottomBookingBar';

const C = {
  bg: '#0d1320',
  cardBg: '#161b29',
  border: '#2a3248',
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

      {/* 1. 상단 헤더 (모바일 줄바꿈 깨짐 방지를 위한 정돈된 레이아웃) */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 40,
          backgroundColor: '#0a0e1a',
          borderBottom: `1px solid ${C.border}`,
        }}
      >
        <div
          style={{
            maxWidth: '640px',
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
              gap: '7px',
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }}
          >
            <span style={{ fontSize: '18px', fontWeight: 900, color: '#ffffff', letterSpacing: '-0.4px' }}>
              아밤
            </span>
            <span
              style={{
                fontSize: '12px',
                fontWeight: 800,
                color: C.accent,
                fontVariantNumeric: 'tabular-nums',
              }}
            >
              010-6607-2239
            </span>
          </Link>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
            <nav style={{ display: 'flex', alignItems: 'center', gap: '8px', whiteSpace: 'nowrap' }}>
              <a href="#price" style={{ color: C.textWhite, fontSize: '12.5px', fontWeight: 700 }}>
                {isKo ? '요금표' : t.hnav[1]}
              </a>
              <a href="#guide" style={{ color: C.textSub, fontSize: '12.5px', fontWeight: 600 }}>
                {isKo ? '이용안내' : t.hnav[2]}
              </a>
              <a href="#faq" style={{ color: C.textSub, fontSize: '12.5px', fontWeight: 600 }}>
                FAQ
              </a>
            </nav>

            <div style={{ display: 'flex', gap: '3px', whiteSpace: 'nowrap' }}>
              {LANGS.map((l) => (
                <Link
                  key={l.code}
                  href={l.href}
                  style={{
                    fontSize: '10.5px',
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

      {/* 2. 메인 영역 (좌우 여백 16px 통일로 모바일 수직 정렬선 일치) */}
      <main style={{ maxWidth: '640px', margin: '0 auto', padding: '18px 16px 24px' }}>
        {/* 상단 소개 & 바로 예약 */}
        <section style={{ marginBottom: '24px' }}>
          <div
            style={{
              display: 'inline-block',
              fontSize: '11.5px',
              fontWeight: 800,
              color: C.accent,
              backgroundColor: 'rgba(245, 158, 11, 0.12)',
              border: '1px solid rgba(245, 158, 11, 0.3)',
              borderRadius: '4px',
              padding: '3px 8px',
              marginBottom: '8px',
              whiteSpace: 'nowrap',
            }}
          >
            {isKo ? '서울 25개구 · 경기 전 지역 자택·호텔 방문' : t.badge}
          </div>

          <h1
            style={{
              fontSize: 'clamp(24px, 6.4vw, 32px)',
              fontWeight: 900,
              color: '#ffffff',
              letterSpacing: '-0.5px',
              margin: '0 0 12px',
              lineHeight: 1.28,
              wordBreak: 'keep-all',
            }}
          >
            {isKo ? (
              <>
                서울·경기 출장마사지
                <br />
                출장안마 · 홈타이 아밤
              </>
            ) : (
              c.about.title
            )}
          </h1>

          {/* 들여쓰기 및 줄맞춤된 핵심 요약 문단 */}
          <div
            style={{
              paddingLeft: '12px',
              borderLeft: '2px solid #334155',
              marginBottom: '14px',
              fontSize: '13.5px',
              color: C.textSub,
              lineHeight: 1.55,
            }}
          >
            {isKo ? (
              <>
                <div>자택·오피스텔·호텔 전 지역 30~40분 내 방문합니다.</div>
                <div>선입금·예약금 없는 100% 도착 후 현장 대면결제입니다.</div>
              </>
            ) : (
              <div>{c.about.p1}</div>
            )}
          </div>

          {/* 영업시간 100% 방문 가능 & 개인정보 미저장 안심 안내 박스 (들여쓰기·줄맞춤 정렬) */}
          <div
            style={{
              backgroundColor: '#111a2e',
              border: `1px solid ${C.border}`,
              borderRadius: '10px',
              padding: '12px 14px',
              marginBottom: '14px',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}
          >
            <div style={{ paddingLeft: '10px', borderLeft: `2.5px solid ${C.accent}` }}>
              <div style={{ fontSize: '13px', fontWeight: 800, color: C.accent, marginBottom: '2px' }}>
                영업시간 내 100% 방문 가능
              </div>
              <div style={{ fontSize: '12.5px', color: '#e2e8f0', lineHeight: 1.5 }}>
                예약 접수 <strong>18:00부터</strong> · 매니저 출발 <strong>19:00 ~ 새벽 05:00 마감</strong>
                <br />
                서울·경기 전 지역 30~40분 내 즉시 배차·방문합니다.
              </div>
            </div>

            <div style={{ paddingLeft: '10px', borderLeft: '2.5px solid #38bdf8' }}>
              <div style={{ fontSize: '13px', fontWeight: 800, color: '#93c5fd', marginBottom: '2px' }}>
                개인정보 미저장 안심 안내 (웹사이트 기록 없음)
              </div>
              <div style={{ fontSize: '12.5px', color: '#cbd5e1', lineHeight: 1.5 }}>
                예약 양식에 입력하시는 주소·출입번호 등 모든 내용은{' '}
                <strong style={{ color: '#ffffff', textDecoration: 'underline' }}>
                  웹사이트에 절대 저장·기록되지 않으며
                </strong>{' '}
                휴대폰 문자창에만 자동 입력됩니다.
              </div>
            </div>
          </div>

          {/* 상단 직통 버튼 2개 */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '14px' }}>
            <button
              type="button"
              onClick={() => openDirectAbamSms()}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: C.accent,
                color: '#0a0e17',
                boxShadow: '0 2px 8px rgba(197, 155, 39, 0.2)',
                borderRadius: '8px',
                padding: '12px 8px',
                border: 'none',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
            >
              <span style={{ fontSize: '15px', fontWeight: 900 }}>
                {isKo ? '문자예약하기' : t.smsBar}
              </span>
              <span style={{ fontSize: '11px', fontWeight: 700, opacity: 0.85, marginTop: '2px' }}>
                {isKo ? '예약 양식 작성 (기록 없음)' : 'SMS Booking Form'}
              </span>
            </button>

            <a
              href={`tel:${cleanPhone}`}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: C.blue,
                border: '1px solid #334155',
                color: '#f8fafc',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.25)',
                borderRadius: '8px',
                padding: '12px 8px',
                textDecoration: 'none',
                whiteSpace: 'nowrap',
              }}
            >
              <span style={{ fontSize: '15px', fontWeight: 900 }}>
                {isKo ? '전화하기' : t.callBar}
              </span>
              <span
                style={{
                  fontSize: '11.5px',
                  fontWeight: 700,
                  opacity: 0.9,
                  marginTop: '2px',
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                {c.contact.phone}
              </span>
            </a>
          </div>

          <div
            style={{
              position: 'relative',
              width: '100%',
              height: '180px',
              borderRadius: '10px',
              overflow: 'hidden',
              border: `1px solid ${C.border}`,
            }}
          >
            <Image
              src="/images/abam_hero_seductive.jpg"
              alt={t.altHero}
              fill
              sizes="(max-width: 640px) 100vw, 640px"
              style={{ objectFit: 'cover' }}
              priority
            />
          </div>
        </section>

        {/* 3. 코스 및 요금표 */}
        <section id="price" style={{ marginBottom: '26px', scrollMarginTop: '56px' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              marginBottom: '10px',
              gap: '8px',
            }}
          >
            <h2 style={{ fontSize: '17.5px', fontWeight: 800, color: '#ffffff', margin: 0, whiteSpace: 'nowrap' }}>
              {isKo ? '코스 및 정찰 요금표' : t.priceTitle}
            </h2>
            <span style={{ fontSize: '12px', color: C.accent, fontWeight: 700, whiteSpace: 'nowrap' }}>
              {isKo ? '요금 터치 시 예약 양식 열림' : 'Tap price to book'}
            </span>
          </div>

          <div
            style={{
              backgroundColor: C.cardBg,
              border: `1px solid ${C.border}`,
              borderRadius: '10px',
              overflow: 'hidden',
            }}
          >
            {c.courses.map((course, idx) => (
              <div
                key={course.no}
                style={{
                  borderTop: idx > 0 ? `1px solid ${C.border}` : 'none',
                  padding: '14px',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '6px',
                    gap: '8px',
                  }}
                >
                  <strong style={{ fontSize: '16px', color: '#ffffff', fontWeight: 800, whiteSpace: 'nowrap' }}>
                    {course.name} 코스
                  </strong>
                  <span style={{ fontSize: '12px', color: C.accent, fontWeight: 700, whiteSpace: 'nowrap' }}>
                    {course.subtitle}
                  </span>
                </div>

                <p
                  style={{
                    fontSize: '13px',
                    color: C.textSub,
                    margin: '0 0 10px',
                    paddingLeft: '10px',
                    borderLeft: '2px solid #1e293b',
                    lineHeight: 1.5,
                  }}
                >
                  {course.desc}
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px' }}>
                  {course.prices.map((pr, pi) => {
                    const slipCodes = [
                      ['타이1 8만', '타이90 10만', '타이2 12만'],
                      ['아로마1 9만', '아로마90 11만', '아로마2 14만'],
                      ['스페셜1 10만', '스페셜90 12만', '스페셜2 16만'],
                    ];
                    const code = slipCodes[idx]?.[pi] || '타이90 10만';
                    return (
                      <button
                        key={pi}
                        type="button"
                        onClick={() => openDirectAbamSms(code)}
                        style={{
                          textAlign: 'center',
                          border: `1px solid ${C.border}`,
                          backgroundColor: '#090d18',
                          borderRadius: '6px',
                          padding: '10px 4px',
                          cursor: 'pointer',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        <div style={{ fontSize: '12px', color: C.textMuted, fontWeight: 600 }}>
                          {c.priceSection.durations[pi]}
                        </div>
                        <div
                          style={{
                            fontSize: '14.5px',
                            fontWeight: 800,
                            color: '#ffffff',
                            marginTop: '2px',
                            fontVariantNumeric: 'tabular-nums',
                          }}
                        >
                          {pr}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. 이용 안내 (번호 배지 + 본문 내어쓰기 정렬로 줄맞춤 완성) */}
        <section id="guide" style={{ marginBottom: '26px', scrollMarginTop: '56px' }}>
          <h2 style={{ fontSize: '17.5px', fontWeight: 800, color: '#ffffff', margin: '0 0 10px' }}>
            {isKo ? '이용 및 예약 필수 안내' : t.rulesTitle}
          </h2>

          <div
            style={{
              backgroundColor: C.cardBg,
              border: `1px solid ${C.border}`,
              borderRadius: '10px',
              padding: '14px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            {guideItems.map((item, idx) => (
              <div
                key={item.no}
                style={{
                  borderTop: idx > 0 ? `1px solid ${C.border}` : 'none',
                  paddingTop: idx > 0 ? '12px' : 0,
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '10px',
                }}
              >
                <span
                  style={{
                    flexShrink: 0,
                    width: '24px',
                    height: '22px',
                    borderRadius: '4px',
                    backgroundColor: 'rgba(245, 158, 11, 0.15)',
                    color: C.accent,
                    fontSize: '11.5px',
                    fontWeight: 800,
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
                  <strong style={{ color: '#ffffff', fontSize: '13.5px', display: 'block', marginBottom: '4px' }}>
                    {item.title}
                  </strong>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', fontSize: '13px', color: C.textSub, lineHeight: 1.55 }}>
                    {item.lines.map((line, li) => (
                      <div key={li}>{line}</div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. 자주 묻는 질문 FAQ (Q/A 좌측 정렬선 일치 및 들여쓰기 적용) */}
        <section id="faq" style={{ marginBottom: '26px', scrollMarginTop: '56px' }}>
          <h2 style={{ fontSize: '17.5px', fontWeight: 800, color: '#ffffff', margin: '0 0 10px' }}>
            {isKo ? '자주 묻는 질문' : t.faqSection?.title || 'FAQ'}
          </h2>

          <div
            style={{
              backgroundColor: C.cardBg,
              border: `1px solid ${C.border}`,
              borderRadius: '10px',
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
                      padding: '13px 14px',
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
                          fontSize: '13.5px',
                          fontWeight: 800,
                          color: C.accent,
                          width: '18px',
                        }}
                      >
                        Q.
                      </span>
                      <span
                        style={{
                          flex: 1,
                          fontSize: '13.5px',
                          fontWeight: 700,
                          color: isOpen ? C.accent : '#ffffff',
                          lineHeight: 1.45,
                        }}
                      >
                        {cleanQ}
                      </span>
                    </div>
                    <span style={{ fontSize: '16px', color: C.textMuted, fontWeight: 700, flexShrink: 0, lineHeight: 1.2 }}>
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>
                  {isOpen && (
                    <div
                      style={{
                        padding: '0 14px 13px 40px',
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

        {/* 6. 서울·경기 주요 방문 지역 링크 (3열 균등 그리드로 줄맞춤 정렬) */}
        {areaLinks && areaLinks.length > 0 && (
          <section style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <h2 style={{ fontSize: '15px', fontWeight: 800, color: '#ffffff', margin: 0 }}>
                서울·경기 지역별 방문 안내
              </h2>
              <Link href="/keywords" style={{ fontSize: '12px', color: C.accent, fontWeight: 700, whiteSpace: 'nowrap' }}>
                전체 지역 보기 →
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

        {/* 7. 푸터 */}
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

      {/* 8. 모바일/PC 화면 하단 고정 버튼 (문자예약하기 / 전화하기) */}
      <AbamBottomBookingBar
        phone={cleanPhone}
        smsLabel={isKo ? '문자예약하기' : t.smsBar}
        callLabel={isKo ? '전화하기' : t.callBar}
      />
    </div>
  );
}
