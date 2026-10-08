'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { KAKAO_ID, type LandingContent } from '../lib/landing-content';

const KAKAO_LINK = 'kakaotalk://';
const WA_LINK =
  'https://wa.me/821066072239?text=Hello%20Abam.kr,%20I%20would%20like%20to%20inquire%20about%20your%20private%201:1%20home%20care%20service.';

/* 디자인 토큰 — 서울 야경 위에 반투명 블랙 글래스 + 골드 포인트 */
const C = {
  bg:      '#06090d',
  glass:   'rgba(10, 15, 21, 0.78)',
  glassHi: 'rgba(14, 20, 27, 0.9)',
  line:    'rgba(255, 255, 255, 0.14)',
  goldLine:'rgba(224, 176, 74, 0.5)',
  gold:    '#e0b04a',
  goldLt:  '#f3d58e',
  goldBg:  'rgba(224, 176, 74, 0.1)',
  btnFg:   '#10181a',
  ink:     '#f2f4f2',
  sub:     '#aab3ae',
  kakao:   '#FEE500',
  kakaoBr: '#181600',
};

const SERIF = "'Playfair Display', Georgia, 'Times New Roman', serif";
const GOLD_TEXT: React.CSSProperties = {
  background: 'linear-gradient(180deg, #f8e2a6 0%, #e0b04a 100%)',
  WebkitBackgroundClip: 'text', backgroundClip: 'text',
  WebkitTextFillColor: 'transparent', color: C.goldLt,
};

type Lang = 'ko' | 'en' | 'jp' | 'cn';

const LANGS: { code: Lang; label: string; href: string }[] = [
  { code: 'ko', label: 'KR', href: '/' },
  { code: 'en', label: 'EN', href: '/en' },
  { code: 'jp', label: 'JP', href: '/jp' },
  { code: 'cn', label: 'CN', href: '/cn' },
];

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
    h1a: '오늘 밤, 편안한 휴식이', h1b: '당신의 문 앞으로 찾아갑니다',
    status: { open: '지금 영업 중 · 바로 상담 가능', pre: '예약 접수 중 · 19:00 영업 시작', closed: '예약은 18:00부터 · 영업 19:00~05:00' },
    nav: ['코스·요금', '테라피스트', '후기', '자주 묻는 질문'],
    priceNote: '60분 기준 · 눌러서 전체 요금 보기',
    guideTitle: '이용 안내', steps: ['카톡·전화로 문의', '코스·장소·시간 확정', '원하는 공간에서 1:1 케어'],
    modalTitle: '', modalBody: '', callNow: '전화 연결',
  },
  en: {
    h1a: 'Tonight, a private massage', h1b: 'comes to your door',
    status: { open: 'Open now · Message us anytime', pre: 'Booking open · Service starts 19:00', closed: 'Booking from 18:00 · Open 19:00–05:00' },
    nav: ['Courses & Price', 'Therapists', 'Reviews', 'FAQ'],
    priceNote: 'Per 60 min · tap to see all prices',
    guideTitle: 'How it works', steps: ['Message or call us', 'Confirm course, place, time', '1:1 care at your location'],
    modalTitle: 'Book your private care', modalBody: 'Message us on WhatsApp or call directly.', callNow: 'Call now',
  },
  jp: {
    h1a: '今夜、プライベートな癒しが', h1b: 'あなたの元へ伺います',
    status: { open: '営業中 · すぐにご相談いただけます', pre: '予約受付中 · 19:00より営業', closed: '予約は18:00から · 営業19:00〜05:00' },
    nav: ['コース・料金', 'セラピスト', 'レビュー', 'よくある質問'],
    priceNote: '60分の料金 · タップで全料金を見る',
    guideTitle: 'ご利用案内', steps: ['メッセージまたはお電話', 'コース・場所・時間を確定', 'ご希望の場所で1:1ケア'],
    modalTitle: 'ご予約・ご相談', modalBody: 'WhatsAppまたはお電話でご連絡ください。', callNow: '電話する',
  },
  cn: {
    h1a: '今晚，私人专属护理', h1b: '上门为您服务',
    status: { open: '营业中 · 可立即咨询', pre: '接受预约 · 19:00开始营业', closed: '18:00起接受预约 · 营业19:00–05:00' },
    nav: ['项目·价格', '理疗师', '评价', '常见问题'],
    priceNote: '60分钟价格 · 点击查看全部',
    guideTitle: '预约须知', steps: ['留言或来电咨询', '确认项目、地点、时间', '在您指定的地点1:1服务'],
    modalTitle: '预约咨询', modalBody: '请通过WhatsApp留言或直接来电。', callNow: '立即致电',
  },
};

const KakaoIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"><path d="M12 3C7.03 3 3 6.36 3 10.5c0 2.63 1.58 4.96 4 6.37L6 20l3.5-2.1c.8.17 1.63.26 2.5.26 4.97 0 9-3.36 9-7.5S16.97 3 12 3z" fill={C.kakaoBr}/></svg>
);

export default function AbamLanding({ c, areaLinks }: { c: LandingContent; areaLinks?: string[] }) {
  const isKo = c.lang === 'ko';
  const x = EXTRA[c.lang];
  const [openFaq, setOpenFaq]       = useState<number | null>(null);
  const [kakaoModal, setKakaoModal] = useState(false);
  const [toast, setToast]           = useState<string | null>(null);
  const [status, setStatus]         = useState<'open' | 'pre' | 'closed' | null>(null);

  /* 영업 상태 (한국 시간 기준, 클라이언트에서만 계산) */
  useEffect(() => {
    const calc = () => {
      const h = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Seoul' })).getHours();
      setStatus(h >= 19 || h < 5 ? 'open' : h === 18 ? 'pre' : 'closed');
    };
    calc();
    const t = setInterval(calc, 60000);
    return () => clearInterval(t);
  }, []);

  const copyKakao = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(KAKAO_ID).catch(() => {});
    }
  };
  const handleBook = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isKo) copyKakao();
    setKakaoModal(true);
  };
  /* 주요 CTA: 한국어는 상담창, 해외는 메신저로 바로 연결 */
  const handleMain = isKo ? handleBook : undefined;
  const copyId = () => {
    copyKakao();
    setToast(c.modal.copied);
    setTimeout(() => setToast(null), 2000);
  };

  const bookHref = isKo ? KAKAO_LINK : WA_LINK;
  const bookExtra = isKo ? {} : { target: '_blank', rel: 'noreferrer' };
  const bookBg = isKo ? C.kakao : '#25D366';
  const bookFg = isKo ? C.kakaoBr : '#ffffff';
  const bookLabel = isKo ? c.cta.kakao : c.cta.whatsapp;

  const glass: React.CSSProperties = {
    background: C.glass, border: `1px solid ${C.line}`, borderRadius: '12px',
    backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
  };
  const btn: React.CSSProperties = {
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
    fontWeight: 800, borderRadius: '10px', textDecoration: 'none',
  };
  const section: React.CSSProperties = { marginTop: '52px', scrollMarginTop: '96px' };

  const head = (eyebrow: string, title: string, sub?: string) => (
    <div style={{ marginBottom: '18px' }}>
      <div style={{ fontFamily: SERIF, fontSize: '11.5px', letterSpacing: '4px', color: C.gold, fontWeight: 700 }}>{eyebrow}</div>
      <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#fff', margin: '4px 0 0', letterSpacing: '-0.4px' }}>{title}</h2>
      {sub && <p style={{ fontSize: '13px', color: C.sub, margin: '5px 0 0' }}>{sub}</p>}
      <div style={{ width: '36px', height: '2px', background: C.gold, marginTop: '12px' }} />
    </div>
  );

  const navItems: [string, string][] = [
    ['price', x.nav[0]], ['therapists', x.nav[1]], ['reviews', x.nav[2]], ['faq', x.nav[3]],
  ];

  return (
    <div lang={c.htmlLang} style={{ position: 'relative', minHeight: '100vh', background: C.bg, color: C.ink, paddingBottom: '88px', lineHeight: 1.6 }}>
      <style>{`html{scroll-behavior:smooth}@keyframes abamPulse{0%{box-shadow:0 0 0 0 rgba(74,222,128,.7)}70%{box-shadow:0 0 0 9px rgba(74,222,128,0)}100%{box-shadow:0 0 0 0 rgba(74,222,128,0)}}@keyframes abamGlow{0%,100%{box-shadow:0 4px 18px rgba(0,0,0,.4)}50%{box-shadow:0 4px 26px rgba(224,176,74,.55)}}`}</style>

      {/* 서울 야경 배경 */}
      <div aria-hidden="true" style={{ position: 'fixed', inset: 0, zIndex: 0, backgroundImage: 'linear-gradient(rgba(4,7,11,0.5), rgba(4,7,11,0.82)), url(/images/seoul-night.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }} />

      {toast && (
        <div style={{ position: 'fixed', top: '18px', left: '50%', transform: 'translateX(-50%)', background: C.gold, color: C.btnFg, padding: '10px 20px', borderRadius: '8px', fontSize: '13px', fontWeight: 800, zIndex: 99999 }}>
          {toast}
        </div>
      )}

      {kakaoModal && (
        <div onClick={() => setKakaoModal(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.65)', zIndex: 99998, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: '#121a1f', border: `1px solid ${C.line}`, borderRadius: '14px', maxWidth: '360px', width: '100%', padding: '24px 20px', textAlign: 'center' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#fff', margin: '0 0 6px' }}>{isKo ? c.modal.title : x.modalTitle}</h3>
            <p style={{ fontSize: '13px', color: C.sub, margin: '0 0 16px' }}>{isKo ? c.modal.body : x.modalBody}</p>
            {isKo && <div style={{ background: 'rgba(255,255,255,0.06)', border: `1px solid ${C.line}`, borderRadius: '10px', padding: '12px 14px', marginBottom: '14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '11px', color: C.sub }}>{c.modal.idLabel}</div>
                <div style={{ fontSize: '18px', fontWeight: 800, color: C.goldLt }}>{KAKAO_ID}</div>
              </div>
              <button onClick={copyId} style={{ background: C.gold, color: C.btnFg, padding: '8px 14px', borderRadius: '6px', fontSize: '12px', fontWeight: 800 }}>{c.modal.copy}</button>
            </div>}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <a href={bookHref} {...bookExtra} onClick={() => setKakaoModal(false)} style={{ ...btn, background: bookBg, color: bookFg, fontSize: '15px', padding: '14px 0' }}>{isKo ? c.modal.open : c.cta.whatsapp}</a>
              <a href={c.contact.tel} onClick={() => setKakaoModal(false)} style={isKo ? { ...btn, background: C.gold, color: C.btnFg, fontSize: '15px', padding: '14px 0' } : { ...btn, background: 'transparent', color: C.sub, border: `1px solid ${C.line}`, fontSize: '13px', padding: '10px 0', fontWeight: 600 }}>{isKo ? `전화 연결 · ${c.contact.phone}` : `${x.callNow} · ${c.contact.phone}`}</a>
              <button onClick={() => setKakaoModal(false)} style={{ padding: '11px 18px', background: 'rgba(255,255,255,0.1)', color: C.ink, borderRadius: '10px', fontWeight: 700, fontSize: '13px' }}>{c.modal.close}</button>
            </div>
          </div>
        </div>
      )}

      {/* 헤더: 로고 · 언어 · 전화 + 섹션 바로가기 */}
      <header style={{ position: 'sticky', top: 0, zIndex: 40, background: 'rgba(5,9,13,0.9)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', borderBottom: `1px solid ${C.line}` }}>
        <div style={{ maxWidth: '640px', margin: '0 auto', padding: '10px 16px 6px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontFamily: SERIF, fontSize: '22px', fontWeight: 800, color: '#fff', letterSpacing: '0.5px' }}>
            Abam<span style={{ color: C.gold }}>.kr</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ display: 'flex', gap: '9px', fontSize: '12px' }}>
              {(isKo ? LANGS : LANGS.filter((l) => l.code !== 'ko')).map((l) =>
                l.code === c.lang ? (
                  <span key={l.code} style={{ color: C.gold, fontWeight: 800 }}>{l.label}</span>
                ) : (
                  <Link key={l.code} href={l.href} style={{ color: C.sub, textDecoration: 'none' }}>{l.label}</Link>
                ),
              )}
            </div>
            <a href={c.contact.tel} style={{ background: isKo ? C.gold : 'transparent', color: isKo ? C.btnFg : C.sub, border: isKo ? 'none' : `1px solid ${C.line}`, fontWeight: 800, fontSize: '13px', padding: '6px 12px', borderRadius: '6px', textDecoration: 'none' }}>
              {c.cta.callBar}
            </a>
          </div>
        </div>
        <nav aria-label="sections" style={{ maxWidth: '640px', margin: '0 auto', padding: '0 16px', display: 'flex', justifyContent: 'space-between' }}>
          {navItems.map(([id, label]) => (
            <a key={id} href={`#${id}`} style={{ flex: 1, textAlign: 'center', padding: '8px 2px 9px', fontSize: '12.5px', fontWeight: 700, color: C.sub, textDecoration: 'none' }}>{label}</a>
          ))}
        </nav>
      </header>

      <main style={{ position: 'relative', zIndex: 1, maxWidth: '640px', margin: '0 auto', padding: '0 16px' }}>

        {/* 1. 히어로 — 상태 · 핵심 메시지 · 코스별 시작가 · 상담 버튼 */}
        <section style={{ padding: '46px 0 0', textAlign: 'center' }}>
          {status && (
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(0,0,0,0.55)', border: `1px solid ${C.line}`, borderRadius: '30px', padding: '7px 15px', fontSize: '12.5px', fontWeight: 700, color: C.ink }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: status === 'closed' ? C.gold : '#4ade80', animation: status === 'closed' ? 'none' : 'abamPulse 1.8s infinite' }} />
              {x.status[status]}
            </div>
          )}

          <div style={{ fontFamily: SERIF, fontSize: '11.5px', letterSpacing: isKo ? '2.5px' : '5px', color: C.gold, fontWeight: 700, marginTop: '26px' }}>
            {isKo ? '서울 출장마사지 · 출장안마 · ' + c.hero.badge : c.hero.badge}
          </div>
          <h1 style={{ fontSize: '33px', fontWeight: 800, lineHeight: 1.3, color: '#fff', margin: '12px 0 12px', letterSpacing: '-0.8px', textShadow: '0 2px 20px rgba(0,0,0,0.75)' }}>
            {x.h1a}<br /><span style={GOLD_TEXT}>{x.h1b}</span>
          </h1>
          <p style={{ fontSize: '15px', color: '#e9ede9', margin: '0 0 2px', fontWeight: 600 }}>{c.hero.bannerSub.join(' · ')}</p>
          <p style={{ fontSize: '13px', color: C.sub, margin: 0 }}>{c.hero.tagline}</p>

          {/* 코스별 60분 요금 — 누르면 요금 섹션으로 */}
          <a href="#price" style={{ display: 'block', marginTop: '26px', textDecoration: 'none' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', ...glass, borderColor: C.goldLine, overflow: 'hidden' }}>
              {c.courses.map((course, i) => (
                <div key={course.no} style={{ padding: '12px 4px', borderLeft: i ? `1px solid ${C.line}` : 'none' }}>
                  <div style={{ fontSize: '12.5px', color: C.sub, fontWeight: 600 }}>{course.name}</div>
                  <div style={{ fontSize: '17px', fontWeight: 800, color: C.goldLt }}>{course.prices[0]}</div>
                </div>
              ))}
            </div>
            <div style={{ fontSize: '11.5px', color: C.sub, marginTop: '7px' }}>{x.priceNote}</div>
          </a>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '20px' }}>
            <a href={bookHref} {...bookExtra} onClick={handleMain} style={{ ...btn, background: bookBg, color: bookFg, fontSize: '17px', padding: '17px 0', animation: 'abamGlow 2.6s infinite' }}>
              {isKo && <KakaoIcon size={20} />}{bookLabel}
            </a>
            <a href={c.contact.tel} style={{ ...btn, background: 'rgba(0,0,0,0.55)', color: isKo ? '#fff' : C.sub, border: `1px solid ${isKo ? C.goldLine : C.line}`, fontSize: isKo ? '16px' : '13.5px', padding: isKo ? '15px 0' : '11px 0', fontWeight: isKo ? 800 : 600 }}>
              {c.contact.phone}
            </a>
          </div>
        </section>

        {/* 2. 코스 & 요금 */}
        <section id="price" style={section}>
          {head('COURSE & PRICE', c.priceSection.title === 'COURSE & PRICE' ? x.nav[0] : c.priceSection.title)}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {c.courses.map((course) => (
              <article key={course.no} style={{ ...glass, overflow: 'hidden', padding: 0 }}>
                <div style={{ position: 'relative', width: '100%', height: '150px' }}>
                  <Image src={course.img} alt={course.name} fill sizes="(max-width: 640px) 100vw, 640px" style={{ objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(5,9,13,0.95), rgba(5,9,13,0.1) 75%)' }} />
                  <div style={{ position: 'absolute', left: '16px', bottom: '10px', right: '16px' }}>
                    <div style={{ fontSize: '24px', fontWeight: 800, color: '#fff' }}>{course.name}</div>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: C.goldLt }}>{course.subtitle}</div>
                  </div>
                </div>
                <div style={{ padding: '12px 16px 16px' }}>
                  <p style={{ fontSize: '13px', color: C.sub, margin: '0 0 12px', lineHeight: 1.6 }}>{course.desc}</p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '8px' }}>
                    {course.prices.map((pr, pi) => (
                      <a key={pi} href={bookHref} {...bookExtra} onClick={handleBook} style={{ textAlign: 'center', textDecoration: 'none', border: `1px solid ${C.goldLine}`, background: C.goldBg, borderRadius: '8px', padding: '9px 2px' }}>
                        <div style={{ fontSize: '12px', color: C.sub }}>{c.priceSection.durations[pi]}</div>
                        <div style={{ fontSize: '15px', fontWeight: 800, color: C.goldLt }}>{pr}</div>
                      </a>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* 외국인 전용 VIP 요금 정책 및 할증 사유 명시 (외국인 페이지에만 노출) */}
          {c.priceNotice && (
            <div
              style={{
                ...glass,
                marginTop: '18px',
                padding: '20px 18px',
                border: `1px solid ${C.goldLine}`,
                background: 'linear-gradient(180deg, rgba(224,176,74,0.09) 0%, rgba(10,15,21,0.88) 100%)',
                borderRadius: '12px',
              }}
            >
              <div style={{ display: 'inline-block', fontSize: '11px', fontWeight: 800, letterSpacing: '1.5px', color: C.gold, background: 'rgba(224,176,74,0.18)', padding: '3px 8px', borderRadius: '4px', marginBottom: '8px' }}>
                {c.priceNotice.tag}
              </div>
              <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#fff', margin: '0 0 8px', lineHeight: 1.4 }}>
                {c.priceNotice.title}
              </h3>
              <p style={{ fontSize: '13px', color: C.sub, margin: '0 0 14px', lineHeight: 1.6 }}>
                {c.priceNotice.desc}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {c.priceNotice.reasons.map((r, ri) => (
                  <div key={ri} style={{ display: 'flex', gap: '11px', alignItems: 'flex-start', background: 'rgba(255,255,255,0.04)', padding: '11px 13px', borderRadius: '8px', borderLeft: `3px solid ${C.gold}` }}>
                    <span style={{ fontSize: '16px', lineHeight: 1.2 }}>{r.icon}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '13.5px', fontWeight: 700, color: C.goldLt, marginBottom: '3px' }}>{r.title}</div>
                      <div style={{ fontSize: '12.5px', color: '#d1d5db', lineHeight: 1.55 }}>{r.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* 3. 이용 안내 — 영업 정보 4가지 + 3단계 */}
        <section id="guide" style={section}>
          {head('HOW TO BOOK', x.guideTitle)}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '8px' }}>
            {c.info.map((p, i) => (
              <div key={i} style={{ ...glass, borderLeft: `3px solid ${C.gold}`, padding: '12px' }}>
                <div style={{ fontSize: '14px', fontWeight: 800, color: '#fff', lineHeight: 1.3 }}>{p.title}</div>
                <div style={{ fontSize: '12px', color: C.sub, marginTop: '3px', lineHeight: 1.4 }}>{p.sub}</div>
              </div>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '8px', marginTop: '10px' }}>
            {x.steps.map((s, i) => (
              <div key={i} style={{ ...glass, padding: '12px 8px', textAlign: 'center' }}>
                <div style={{ width: '26px', height: '26px', borderRadius: '50%', background: C.gold, color: C.btnFg, fontWeight: 800, fontSize: '13px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px' }}>{i + 1}</div>
                <div style={{ fontSize: '12.5px', fontWeight: 700, color: C.ink, lineHeight: 1.4 }}>{s}</div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. 테라피스트 */}
        <section id="therapists" style={section}>
          {head('THERAPISTS', c.therapistSection.title, c.therapistSection.note)}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {c.therapists.map((t, i) => (
              <article key={i} style={{ ...glass, display: 'flex', gap: '14px', padding: '12px' }}>
                <div style={{ position: 'relative', width: '105px', height: '140px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0 }}>
                  <Image src={t.img} alt={t.name} fill sizes="105px" style={{ objectFit: 'cover' }} />
                </div>
                <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '3px' }}>
                  <div style={{ fontSize: '17px', fontWeight: 800, color: '#fff' }}>
                    {t.name} <span style={{ fontSize: '12.5px', color: C.sub, fontWeight: 500 }}>({t.age})</span>
                  </div>
                  <div style={{ fontSize: '12.5px', color: C.sub }}>{t.spec}</div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: C.goldLt }}>{t.specialty}</div>
                  <div style={{ fontSize: '12.5px', color: C.sub, lineHeight: 1.45 }}>{t.desc}</div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginTop: 'auto', paddingTop: '6px' }}>
                    <a href={bookHref} {...bookExtra} onClick={handleBook} style={{ background: C.gold, color: C.btnFg, fontSize: '12px', fontWeight: 800, padding: '7px 16px', borderRadius: '6px', textDecoration: 'none' }}>{c.therapistSection.kakaoBtn}</a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* 5. 후기 */}
        <section id="reviews" style={section}>
          {head('REVIEWS', c.reviewSection.title)}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {c.reviews.map((rev, i) => (
              <figure key={i} style={{ ...glass, margin: 0, padding: '14px 16px' }}>
                <div style={{ color: C.gold, fontSize: '11px', marginBottom: '6px', letterSpacing: '2px' }}>★★★★★</div>
                <blockquote style={{ margin: 0, fontSize: '13.5px', color: C.ink, lineHeight: 1.65 }}>{rev.text}</blockquote>
                <figcaption style={{ fontSize: '12px', color: C.sub, marginTop: '8px' }}>
                  <span style={{ color: C.goldLt, fontWeight: 700 }}>{rev.author}</span> · {rev.area} · {rev.course}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* 6. FAQ */}
        <section id="faq" style={section}>
          {head('FAQ', c.faqSection.title, c.faqSection.sub)}
          <div style={{ ...glass }}>
            {c.faqs.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={i} style={{ borderTop: i ? `1px solid ${C.line}` : 'none', background: isOpen ? 'rgba(224,176,74,0.08)' : 'transparent' }}>
                  <button onClick={() => setOpenFaq(isOpen ? null : i)} aria-expanded={isOpen} style={{ width: '100%', padding: '15px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', textAlign: 'left', gap: '10px' }}>
                    <span style={{ fontSize: '15px', fontWeight: 700, color: isOpen ? C.goldLt : '#fff' }}>{faq.q}</span>
                    <span style={{ fontSize: '18px', color: C.gold, fontWeight: 700 }}>{isOpen ? '−' : '+'}</span>
                  </button>
                  {isOpen && (
                    <div
                      style={{
                        margin: '0 16px 16px',
                        padding: '16px 18px',
                        background: 'rgba(255,255,255,0.06)',
                        borderLeft: `3px solid ${C.gold}`,
                        borderRadius: '6px',
                        fontSize: '14.5px',
                        fontWeight: 400,
                        color: '#f3f4f6',
                        lineHeight: 1.8,
                        whiteSpace: 'pre-line',
                        wordBreak: 'keep-all',
                        letterSpacing: '-0.2px',
                      }}
                    >
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* 7. 마지막 상담 유도 */}
        <section style={section}>
          <div style={{ ...glass, background: C.glassHi, borderColor: C.goldLine, padding: '26px 18px', textAlign: 'center' }}>
            <div style={{ fontSize: '13px', color: C.gold, fontWeight: 700, marginBottom: '6px' }}>{c.contact.tagline}</div>
            <a href={c.contact.tel} style={{ fontSize: isKo ? '32px' : '22px', fontWeight: 800, color: isKo ? '#fff' : C.sub, textDecoration: 'none', display: 'block', letterSpacing: '0.5px' }}>{c.contact.phone}</a>
            <div style={{ fontSize: '12.5px', color: C.sub, margin: '2px 0 16px' }}>{c.contact.site}</div>
            <a href={bookHref} {...bookExtra} onClick={handleMain} style={{ ...btn, background: bookBg, color: bookFg, fontSize: '15px', padding: '14px 0' }}>
              {isKo && <KakaoIcon size={18} />}{bookLabel}
            </a>
          </div>
          <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px', fontSize: '12.5px', color: C.sub }}>
            <span>{c.globalLine}</span>
            <a href={WA_LINK} target="_blank" rel="noreferrer" style={{ color: C.goldLt, fontWeight: 700 }}>WhatsApp</a>
          </div>
        </section>

        {/* 8. 이용 안내(SEO 본문) */}
        <section id="about" aria-labelledby="about-title" style={{ marginTop: '40px', paddingTop: '22px', borderTop: `1px solid ${C.line}` }}>
          <h2 id="about-title" style={{ fontSize: '14px', fontWeight: 800, color: '#fff', margin: '0 0 8px' }}>{c.about.title}</h2>
          <div style={{ fontSize: '12.5px', color: C.sub, lineHeight: 1.8 }}>
            <p style={{ margin: '0 0 8px' }}>{c.about.p1}</p>
            <p style={{ margin: 0 }}>
              {c.about.p2}
              {isKo && (
                <>
                  {' '}지역별 이용 안내는
                  <Link href="/keywords" style={{ color: C.goldLt, fontWeight: 700 }}> 서울 지역별 안내</Link>에서,
                  코스 및 예약 방법은
                  <Link href="/guide" style={{ color: C.goldLt, fontWeight: 700 }}> 이용 가이드</Link>에서 확인하실 수 있습니다.
                </>
              )}
            </p>
          </div>
        </section>

        {/* 9. 푸터 */}
        <footer style={{ marginTop: '20px', paddingTop: '16px', borderTop: `1px solid ${C.line}`, paddingBottom: '20px' }}>
          <div style={{ fontSize: '12.5px', fontWeight: 700, color: '#fff', marginBottom: '4px' }}>{c.footer.title}</div>
          <p style={{ fontSize: '12px', color: C.sub, lineHeight: 1.6, margin: '0 0 10px' }}>{c.footer.sub}</p>
          {areaLinks && areaLinks.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px 10px', fontSize: '11.5px' }}>
              {areaLinks.map((area, i) => (
                <Link key={i} href={`/seo/${encodeURIComponent(area)}`} style={{ textDecoration: 'none', color: '#8a928d' }}>{area}</Link>
              ))}
            </div>
          )}
          <div style={{ marginTop: '14px', fontSize: '11px', color: C.sub, lineHeight: 1.6 }}>{c.footer.line}</div>
        </footer>
      </main>

      {/* 하단 고정 상담 바 */}
      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: 'rgba(5,9,13,0.95)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', borderTop: `1px solid ${C.line}`, padding: '8px 16px', zIndex: 50 }}>
        <div style={{ maxWidth: '640px', margin: '0 auto', display: 'flex', gap: '8px' }}>
          <a href={bookHref} {...bookExtra} onClick={handleMain} style={{ ...btn, flex: isKo ? 1.3 : 2, background: bookBg, color: bookFg, fontSize: '14px', padding: '12px 0' }}>
            {isKo ? <><KakaoIcon size={16} />카톡 상담</> : c.cta.whatsapp}
          </a>
          <a href={c.contact.tel} style={{ ...btn, flex: 1, background: isKo ? C.gold : 'transparent', color: isKo ? C.btnFg : C.sub, border: isKo ? 'none' : `1px solid ${C.line}`, fontSize: '14px', padding: '12px 0' }}>
            {c.cta.callBar}
          </a>
        </div>
      </div>
    </div>
  );
}