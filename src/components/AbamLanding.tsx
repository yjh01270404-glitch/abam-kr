'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { LandingContent, Lang } from '../lib/landing-content';

const KAKAO_ID = 'Abam1004';
const SMS_PHONE = '010-6607-2239';
const BOOKING_TEMPLATE = `[아밤 예약 신청]
• 성함/닉네임: 
• 이용 지역(구/동/호텔명): 
• 희망 코스: (타이 / 아로마 / 스페셜 / 시간)
• 희망 시간: 바로 가능 or 희망시간`;

const SMS_BODY = encodeURIComponent(BOOKING_TEMPLATE);
const SMS_HREF = `sms:${SMS_PHONE}?body=${SMS_BODY}`;

const C = {
  bg: 'transparent',
  card: 'rgba(15, 23, 42, 0.75)',
  line: 'rgba(255, 255, 255, 0.1)',
  gold: '#fbbf24',
  goldLine: 'rgba(251, 191, 36, 0.4)',
  goldLt: '#fef08a',
  ink: '#ffffff',
  sub: '#94a3b8',
  dim: '#64748b',
  kakao: '#FEE500',
  kakaoFg: '#181600',
  green: '#22c55e',
};

const glass: React.CSSProperties = {
  background: 'rgba(15, 23, 42, 0.75)',
  backdropFilter: 'blur(16px)',
  WebkitBackdropFilter: 'blur(16px)',
  border: `1px solid ${C.line}`,
  borderRadius: '12px',
};

const section: React.CSSProperties = {
  marginTop: '36px',
};

const btn: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '6px',
  width: '100%',
  fontWeight: 800,
  borderRadius: '10px',
  textDecoration: 'none',
  cursor: 'pointer',
};

type Extra = {
  h1a: string; h1b: string;
  status: { open: string; pre: string; closed: string };
  nav: [string, string, string, string];
  priceNote: string;
  guideTitle: string; steps: string[];
  modalTitle: string; modalBody: string; callNow: string;
};

const EXTRA: Record<Lang, Extra> = {
  ko: {
    h1a: '서울·경기 출장마사지', h1b: '20대 ACE 관리사 방문 케어',
    status: { open: '지금 영업 중 · 20~30분 도착', pre: '예약 접수 중 · 19:00 영업 시작', closed: '예약은 18:00부터 · 영업 19:00~05:00' },
    nav: ['코스·요금', '테라피스트', '후기', '자주 묻는 질문'],
    priceNote: '전 코스 정찰제 · 100% 현장 후불 결제',
    guideTitle: '이용 안내', steps: ['카톡·전화로 문의', '코스·장소·시간 확정', '원하는 공간에서 1:1 케어'],
    modalTitle: '예약 및 상담 문의', modalBody: '카톡 또는 문자로 편하게 남겨주시면 바로 안내해 드립니다.', callNow: '전화 문의',
  },
  en: {
    h1a: 'Private In-Room Massage', h1b: 'Direct to your door in Seoul',
    status: { open: 'Open now · 20-30 min arrival', pre: 'Booking open · Service starts 19:00', closed: 'Booking from 18:00 · Open 19:00–05:00' },
    nav: ['Courses & Price', 'Therapists', 'Reviews', 'FAQ'],
    priceNote: 'Flat-rate pricing · 100% Pay on arrival',
    guideTitle: 'How it works', steps: ['Message or call us', 'Confirm course, place, time', '1:1 care at your location'],
    modalTitle: 'Book your private care', modalBody: 'Message us on WhatsApp or call directly.', callNow: 'Call now',
  },
  jp: {
    h1a: 'プライベート出張マッサージ', h1b: 'ソウル・京畿エリア訪問ケア',
    status: { open: '営業中 · 20~30分で到着', pre: '予約受付中 · 19:00より営業', closed: '予約は18:00から · 営業19:00〜05:00' },
    nav: ['コース・料金', 'セラピスト', 'レビュー', 'よくある質問'],
    priceNote: '明朗会計 · 100%現地後払い',
    guideTitle: 'ご利用案内', steps: ['メッセージまたはお電話', 'コース・場所・時間を確定', 'ご希望の場所で1:1ケア'],
    modalTitle: 'ご予約・ご相談', modalBody: 'WhatsAppまたはお電話でご連絡ください。', callNow: '電話する',
  },
  cn: {
    h1a: '专属上门按摩护理', h1b: '首尔及京畿极速到达',
    status: { open: '营业中 · 20-30分钟极速到达', pre: '接受预约 · 19:00开始营业', closed: '18:00起接受预约 · 营业19:00–05:00' },
    nav: ['项目·价格', '理疗师', '评价', '常见问题'],
    priceNote: '统一标价 · 100%到场后付款',
    guideTitle: '预约须知', steps: ['留言或来电咨询', '确认项目、地点、时间', '在您指定的地点1:1服务'],
    modalTitle: '预约咨询', modalBody: '请通过WhatsApp留言或直接来电。', callNow: '立即致电',
  },
};

const LANGS = [
  { code: 'ko', label: 'KR', href: '/' },
  { code: 'en', label: 'EN', href: '/en' },
  { code: 'jp', label: 'JP', href: '/jp' },
  { code: 'cn', label: 'CN', href: '/cn' },
];

function KakaoIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
      <path d="M12 3C7.03 3 3 6.36 3 10.5c0 2.63 1.58 4.96 4 6.37L6 20l3.5-2.1c.8.17 1.63.26 2.5.26 4.97 0 9-3.36 9-7.5S16.97 3 12 3z" fill="currentColor" />
    </svg>
  );
}

export default function AbamLanding({ c, areaLinks }: { c: LandingContent; areaLinks?: string[] }) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [status, setStatus] = useState<'open' | 'pre' | 'closed'>('open');
  const [kakaoModal, setKakaoModal] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    const kstH = (new Date().getUTCHours() + 9) % 24;
    setStatus(kstH >= 19 || kstH < 5 ? 'open' : kstH >= 18 ? 'pre' : 'closed');
  }, []);

  const x = EXTRA[c.lang] || EXTRA.ko;
  const isKo = c.lang === 'ko';

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2000);
  };

  const copyId = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(KAKAO_ID).catch(() => {});
    }
    showToast(c.modal.copied);
  };

  const copyTemplate = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(BOOKING_TEMPLATE).catch(() => {});
    }
    showToast('예약 양식이 복사되었습니다.');
  };

  const handleBook = (e: React.MouseEvent) => {
    if (isKo) {
      e.preventDefault();
      setKakaoModal(true);
    }
  };

  const bookHref = isKo ? '#' : c.contact.wa;
  const bookExtra = isKo ? {} : { target: '_blank', rel: 'noopener noreferrer' };
  const bookLabel = isKo ? c.cta.kakao : c.cta.whatsapp;

  const head = (label: string, title: string, sub?: string) => (
    <div style={{ marginBottom: '14px' }}>
      <div style={{ fontSize: '11px', fontWeight: 800, color: C.gold, letterSpacing: '0.8px' }}>{label}</div>
      <h2 style={{ fontSize: '19px', fontWeight: 900, color: '#ffffff', margin: '3px 0' }}>{title}</h2>
      {sub && <p style={{ fontSize: '12px', color: C.sub, margin: 0 }}>{sub}</p>}
    </div>
  );

  const navItems: [string, string][] = [
    ['price', x.nav[0]], ['reviews', x.nav[2]], ['faq', x.nav[3]],
  ];

  return (
    <div lang={c.htmlLang} style={{ position: 'relative', minHeight: '100vh', background: C.bg, color: C.ink, paddingBottom: '80px', lineHeight: 1.6 }}>
      {toast && (
        <div style={{ position: 'fixed', top: '20px', left: '50%', transform: 'translateX(-50%)', background: C.gold, color: '#181600', padding: '9px 18px', borderRadius: '8px', fontSize: '13px', fontWeight: 800, zIndex: 99999 }}>
          {toast}
        </div>
      )}

      {kakaoModal && (
        <div onClick={() => setKakaoModal(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', zIndex: 99998, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: '#0f172a', border: `1px solid ${C.goldLine}`, borderRadius: '14px', maxWidth: '380px', width: '100%', padding: '22px 18px', textAlign: 'center' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#fff', margin: '0 0 4px' }}>{isKo ? c.modal.title : x.modalTitle}</h3>
            <p style={{ fontSize: '12.5px', color: C.sub, margin: '0 0 14px' }}>{isKo ? c.modal.body : x.modalBody}</p>

            {isKo && (
              <div style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${C.line}`, borderRadius: '10px', padding: '12px 14px', marginBottom: '14px', textAlign: 'left', fontSize: '12px', lineHeight: 1.6, color: '#cbd5e1' }}>
                <div style={{ color: C.goldLt, fontWeight: 700, marginBottom: '4px' }}>※ 예약 안내</div>
                <div>• 선입금 및 예약금은 일절 요구하지 않습니다 (100% 현장 결제).</div>
                <div>• 주차장 있으시면 도착해서 연락드립니다.</div>
                <div>• 호텔/모텔은 1층 로비 픽업 및 현장 결제 가능합니다.</div>
              </div>
            )}

            {isKo && (
              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '8px', marginBottom: '12px' }}>
                <div style={{ background: 'rgba(255,255,255,0.06)', border: `1px solid ${C.line}`, borderRadius: '8px', padding: '8px 10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontSize: '10px', color: C.sub }}>카톡 ID</div>
                    <div style={{ fontSize: '15px', fontWeight: 800, color: C.goldLt }}>{KAKAO_ID}</div>
                  </div>
                  <button onClick={copyId} style={{ background: C.gold, color: '#181600', padding: '5px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: 800, border: 'none', cursor: 'pointer' }}>복사</button>
                </div>

                <button onClick={copyTemplate} style={{ background: 'rgba(251, 191, 36, 0.12)', border: `1px solid ${C.goldLine}`, color: C.goldLt, borderRadius: '8px', padding: '8px 10px', fontSize: '12px', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                  양식 복사
                </button>
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <a href={bookHref} {...bookExtra} onClick={() => setKakaoModal(false)} style={{ ...btn, background: C.kakao, color: C.kakaoFg, fontSize: '14px', padding: '12px 0' }}>
                {isKo ? <><KakaoIcon size={16} />카카오톡 상담하기</> : c.cta.whatsapp}
              </a>

              {isKo && (
                <a href={SMS_HREF} onClick={() => setKakaoModal(false)} style={{ ...btn, background: 'rgba(255,255,255,0.06)', border: `1px solid ${C.line}`, color: '#e2e8f0', fontSize: '13px', padding: '10px 0' }}>
                  문자로 예약하기
                </a>
              )}

              <a href={c.contact.tel} onClick={() => setKakaoModal(false)} style={{ ...btn, background: 'rgba(255,255,255,0.1)', border: `1px solid ${C.line}`, color: '#ffffff', fontSize: '13px', padding: '10px 0' }}>
                전화 문의 ({c.contact.phone})
              </a>

              <button onClick={() => setKakaoModal(false)} style={{ padding: '8px', background: 'transparent', color: C.sub, fontSize: '12px', border: 'none', cursor: 'pointer' }}>
                닫기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 헤더 */}
      <header style={{ position: 'sticky', top: 0, zIndex: 40, background: 'rgba(6, 9, 19, 0.92)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', borderBottom: `1px solid ${C.line}` }}>
        <div style={{ maxWidth: '640px', margin: '0 auto', padding: '10px 16px 6px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" style={{ textDecoration: 'none', fontSize: '20px', fontWeight: 900, color: '#fff', letterSpacing: '0.5px' }}>
            Abam<span style={{ color: C.gold }}>.kr</span>
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ display: 'flex', gap: '8px', fontSize: '12px' }}>
              {LANGS.map((l) =>
                l.code === c.lang ? (
                  <span key={l.code} style={{ color: C.gold, fontWeight: 800 }}>{l.label}</span>
                ) : (
                  <Link key={l.code} href={l.href} style={{ color: C.sub, textDecoration: 'none' }}>{l.label}</Link>
                ),
              )}
            </div>
            <a href={c.contact.tel} style={{ background: 'rgba(255,255,255,0.1)', border: `1px solid ${C.line}`, color: '#fff', fontWeight: 700, fontSize: '12px', padding: '5px 10px', borderRadius: '6px', textDecoration: 'none' }}>
              {c.cta.callBar}
            </a>
          </div>
        </div>
        <nav aria-label="sections" style={{ maxWidth: '640px', margin: '0 auto', padding: '0 16px', display: 'flex', justifyContent: 'space-between' }}>
          {navItems.map(([id, label]) => (
            <a key={id} href={`#${id}`} style={{ flex: 1, textAlign: 'center', padding: '8px 2px', fontSize: '12.5px', fontWeight: 700, color: C.sub, textDecoration: 'none' }}>{label}</a>
          ))}
        </nav>
      </header>

      {/* 메인 */}
      <main style={{ position: 'relative', zIndex: 1, maxWidth: '640px', margin: '0 auto', padding: '0 16px' }}>

        {/* 1. 히어로 */}
        <section style={{ paddingTop: '28px', textAlign: 'center' }}>
          {status && (
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(15, 23, 42, 0.8)', border: `1px solid ${C.line}`, borderRadius: '20px', padding: '6px 14px', fontSize: '12px', fontWeight: 700, color: '#e2e8f0' }}>
              <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: C.green }} />
              {x.status[status]}
            </div>
          )}

          <h1 style={{ fontSize: '28px', fontWeight: 900, lineHeight: 1.35, color: '#ffffff', margin: '14px 0 8px', letterSpacing: '-0.5px' }}>
            {x.h1a}<br />
            <span style={{ color: C.goldLt }}>{x.h1b}</span>
          </h1>
          <p style={{ fontSize: '14px', color: '#cbd5e1', margin: '0 0 2px', fontWeight: 600 }}>{c.hero.bannerSub.join(' · ')}</p>
          <p style={{ fontSize: '12.5px', color: C.sub, margin: 0 }}>{c.hero.tagline}</p>

          {/* 60분 시작가 카드 */}
          <a href="#price" style={{ display: 'block', marginTop: '20px', textDecoration: 'none' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', ...glass, borderColor: C.goldLine, overflow: 'hidden' }}>
              {c.courses.map((course, i) => (
                <div key={course.no} style={{ padding: '12px 4px', borderLeft: i ? `1px solid ${C.line}` : 'none' }}>
                  <div style={{ fontSize: '12px', color: C.sub }}>{course.name}</div>
                  <div style={{ fontSize: '16px', fontWeight: 800, color: C.goldLt, marginTop: '2px' }}>{course.prices[0]}</div>
                </div>
              ))}
            </div>
            <div style={{ fontSize: '11.5px', color: C.sub, marginTop: '6px' }}>{x.priceNote}</div>
          </a>

          {/* 메인 2대 CTA 버튼 */}
          <div style={{ display: 'flex', gap: '8px', marginTop: '18px' }}>
            <a href={bookHref} {...bookExtra} onClick={handleBook} style={{ ...btn, flex: 1.2, background: C.kakao, color: C.kakaoFg, fontSize: '14.5px', padding: '13px 0' }}>
              {isKo && <KakaoIcon size={18} />}{bookLabel}
            </a>
            <a href={c.contact.tel} style={{ ...btn, flex: 1, background: 'rgba(255,255,255,0.1)', border: `1px solid ${C.line}`, color: '#ffffff', fontSize: '13.5px', padding: '13px 0' }}>
              전화예약
            </a>
          </div>
        </section>

        {/* 2. 코스 & 요금 */}
        <section id="price" style={section}>
          {head('COURSE & PRICE', '코스 및 정찰제 요금표', '사전 예약금 없는 100% 현장 후불제')}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {c.courses.map((course) => (
              <article key={course.no} style={{ ...glass, overflow: 'hidden', padding: 0 }}>
                <div style={{ position: 'relative', width: '100%', height: '140px' }}>
                  <Image src={course.img} alt={course.name} fill sizes="(max-width: 640px) 100vw, 640px" style={{ objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15, 23, 42, 0.95), rgba(15, 23, 42, 0.2) 70%)' }} />
                  <div style={{ position: 'absolute', left: '14px', bottom: '10px', right: '14px' }}>
                    <div style={{ fontSize: '20px', fontWeight: 800, color: '#fff' }}>{course.name}</div>
                    <div style={{ fontSize: '12.5px', color: C.goldLt, fontWeight: 700 }}>{course.subtitle}</div>
                  </div>
                </div>
                <div style={{ padding: '12px 14px 14px' }}>
                  <p style={{ fontSize: '12.5px', color: C.sub, margin: '0 0 10px', lineHeight: 1.6 }}>{course.desc}</p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '6px' }}>
                    {course.prices.map((pr, pi) => (
                      <a key={pi} href={bookHref} {...bookExtra} onClick={handleBook} style={{ textAlign: 'center', textDecoration: 'none', border: `1px solid ${C.line}`, background: 'rgba(2, 6, 23, 0.45)', borderRadius: '8px', padding: '8px 2px' }}>
                        <div style={{ fontSize: '11.5px', color: C.sub }}>{c.priceSection.durations[pi]}</div>
                        <div style={{ fontSize: '14.5px', fontWeight: 800, color: C.goldLt, marginTop: '1px' }}>{pr}</div>
                      </a>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* 선입금 없는 후불제 안내 */}
          <div style={{ ...glass, marginTop: '14px', padding: '12px 14px', fontSize: '12px', color: '#cbd5e1', lineHeight: 1.6 }}>
            <span style={{ color: C.goldLt, fontWeight: 700 }}>• 100% 현장 후불제:</span> 예약금이나 선입금을 일절 요구하지 않습니다. 매니저 도착 후 직접 결제하시면 됩니다.
          </div>
        </section>

        {/* 3. 이용 방법 */}
        <section id="guide" style={section}>
          {head('HOW TO BOOK', x.guideTitle)}
          <div style={{ ...glass, padding: '16px 14px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {x.steps.map((st, i) => (
                <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: C.gold, color: '#181600', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '12px', flexShrink: 0 }}>
                    {i + 1}
                  </div>
                  <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#fff' }}>{st}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. 후기 */}
        <section id="reviews" style={section}>
          {head('REVIEWS', c.reviewSection.title)}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {c.reviews.map((rev, i) => (
              <article key={i} style={{ ...glass, padding: '12px 14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <div>
                    <span style={{ fontSize: '13px', fontWeight: 800, color: '#fff' }}>{rev.author}</span>
                    <span style={{ fontSize: '11.5px', color: C.sub, marginLeft: '6px' }}>{rev.area}</span>
                  </div>
                  <span style={{ fontSize: '11px', color: C.goldLt, background: 'rgba(251, 191, 36, 0.1)', padding: '2px 6px', borderRadius: '4px' }}>
                    {rev.course}
                  </span>
                </div>
                <p style={{ fontSize: '12px', color: '#cbd5e1', margin: 0, lineHeight: 1.55 }}>{rev.text}</p>
              </article>
            ))}
          </div>
        </section>

        {/* 5. FAQ */}
        <section id="faq" style={section}>
          {head('FAQ', c.faqSection.title, c.faqSection.sub)}
          <div style={{ ...glass }}>
            {c.faqs.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={i} style={{ borderBottom: i < c.faqs.length - 1 ? `1px solid ${C.line}` : 'none' }}>
                  <button onClick={() => setOpenFaq(isOpen ? null : i)} aria-expanded={isOpen} style={{ width: '100%', padding: '14px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', textAlign: 'left', color: '#fff', fontSize: '13.5px', fontWeight: 700 }}>
                    <span>{faq.q}</span>
                    <span style={{ color: C.sub, fontSize: '11px', marginLeft: '8px' }}>{isOpen ? '▲' : '▼'}</span>
                  </button>
                  {isOpen && (
                    <div style={{ padding: '0 12px 14px', fontSize: '12.5px', color: '#cbd5e1', lineHeight: 1.65, whiteSpace: 'pre-line' }}>
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* 6. 지역 링크 */}
        {areaLinks && areaLinks.length > 0 && (
          <section style={section}>
            {head('NETWORK', '서울·경기 서비스 지역')}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', justifyContent: 'center' }}>
              {areaLinks.slice(0, 36).map((area, i) => (
                <Link key={i} href={`/seo/${encodeURIComponent(area)}`} style={{ textDecoration: 'none', fontSize: '11px', color: C.sub, background: 'rgba(15, 23, 42, 0.5)', border: `1px solid ${C.line}`, borderRadius: '4px', padding: '4px 8px' }}>
                  {area}
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* 푸터 */}
        <footer style={{ marginTop: '40px', paddingTop: '20px', borderTop: `1px solid ${C.line}`, fontSize: '11px', color: C.dim, textAlign: 'center', lineHeight: 1.6 }}>
          <div style={{ fontSize: '12px', fontWeight: 700, color: '#ffffff', marginBottom: '6px' }}>{c.footer.title}</div>
          <p style={{ margin: '0 0 4px', color: C.sub }}>{c.footer.sub}</p>
          <p style={{ margin: 0, color: C.dim }}>{c.footer.line}</p>
        </footer>

      </main>

      {/* 하단 고정 예약 바 */}
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: 'rgba(6, 9, 19, 0.94)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderTop: `1px solid ${C.line}`,
        padding: '8px 16px',
      }}>
        <div style={{ maxWidth: '640px', margin: '0 auto', display: 'flex', gap: '8px', alignItems: 'center' }}>
          <a
            href={bookHref}
            {...bookExtra}
            onClick={handleBook}
            style={{
              ...btn,
              flex: 1.3,
              background: C.kakao,
              color: C.kakaoFg,
              fontSize: '14px',
              padding: '12px 0',
            }}
          >
            {isKo && <KakaoIcon size={16} />}{bookLabel}
          </a>
          <a
            href={c.contact.tel}
            style={{
              ...btn,
              flex: 1,
              background: 'rgba(255, 255, 255, 0.1)',
              border: `1px solid ${C.line}`,
              color: '#ffffff',
              fontSize: '13px',
              padding: '12px 0',
            }}
          >
            전화예약
          </a>
        </div>
      </div>

    </div>
  );
}
