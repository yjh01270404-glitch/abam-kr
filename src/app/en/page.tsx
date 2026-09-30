'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

/* ─────────────────────────────────────────────
   Constants
───────────────────────────────────────────── */
const PHONE_TEL     = 'tel:+82-10-6607-2239';
const PHONE_DISPLAY = '+82 10-6607-2239';
const WA_LINK       = 'https://wa.me/821066072239?text=Hello%20Abam%20Spa,%20I%20would%20like%20to%20book%20a%20hotel%20in-room%20massage%20in%20Seoul.';

/* ─────────────────────────────────────────────
   Design Tokens (100% White/Light Mode · Boutique Minimal)
───────────────────────────────────────────── */
const C = {
  bg:       '#ffffff',
  bgSoft:   '#f8fafc',
  dark:     '#0f172a',
  mid:      '#334155',
  muted:    '#64748b',
  border:   '#e2e8f0',
  borderLt: '#f1f5f9',
  accent:   '#b45309',
  accentBg: '#fef3c7',
  green:    '#16a34a',
  greenBg:  '#f0fdf4',
  greenBd:  '#bbf7d0',
};

/* ─────────────────────────────────────────────
   Therapists Data (Compact Elite Roster)
───────────────────────────────────────────── */
const EN_ACES = [
  {
    name: 'Yuna',
    age: '23 yrs',
    spec: '166cm · 47kg · Slim & Lovely',
    badge: 'Top Pick',
    specialty: 'Sensual Lymphatic Drainage & VIP Signature Touch',
    desc: 'Charming warm demeanor and delicate soothing touch. #1 most requested ace healer.',
    status: 'Ready for Dispatch',
    isAvailable: true,
    img: '/images/ace_yuna.jpg',
  },
  {
    name: 'Seoa',
    age: '24 yrs',
    spec: '168cm · 49kg · Glamour S-Line',
    badge: 'High Demand',
    specialty: 'Authentic Wat Pho Dry Acupressure + Warm Essential Oil',
    desc: 'Urban elegance with deep tissue muscle release. Perfect blend of dry acupressure and soothing oil.',
    status: 'Booking Open',
    isAvailable: false,
    img: '/images/ace_seoa.jpg',
  },
  {
    name: 'Jia',
    age: '22 yrs',
    spec: '165cm · 46kg · Silky Smooth Skin',
    badge: 'Ace Healer',
    specialty: 'Gentle Myofascial Release & Tension Reliever',
    desc: 'Silky delicate strokes with relaxing warmth. Completely melts away travel fatigue and stiff muscles.',
    status: 'Ready for Dispatch',
    isAvailable: true,
    img: '/images/ace_jia.jpg',
  },
];

/* ─────────────────────────────────────────────
   Courses & Fixed Transparent Pricing
   (Domestic Rate + 50,000 KRW with Clean USD Conversion)
───────────────────────────────────────────── */
const EN_COURSES = [
  {
    name: 'Authentic Thai Deep Tissue',
    subtitle: 'Wat Pho Royal Dry Acupressure',
    desc: 'Dry acupressure performed in clean cotton robes. Relieves tight shoulders, back stiffness, and travel jet lag.',
    badge: null,
    prices: [
      { time: '60 min', price: '₩130,000 (~$98)' },
      { time: '90 min', price: '₩150,000 (~$115)', isBest: true },
      { time: '120 min', price: '₩170,000 (~$128)' },
    ],
  },
  {
    name: 'Organic Aroma Lymphatic Spa',
    subtitle: '100% Plant-Based Essential Oil Care',
    desc: 'Warm organic essential oil melts into the body, promoting deep lymphatic circulation and profound restorative sleep.',
    badge: null,
    prices: [
      { time: '60 min', price: '₩140,000 (~$105)' },
      { time: '90 min', price: '₩160,000 (~$120)', isBest: true },
      { time: '120 min', price: '₩190,000 (~$145)' },
    ],
  },
  {
    name: 'Sensual Healing Relaxation',
    subtitle: 'Delicate Myofascial Release & Stress Relief',
    desc: 'Gentle, comforting strokes that soothe overstimulated autonomic nerves and release mental burnout.',
    badge: 'Recommended',
    prices: [
      { time: '60 min', price: '₩140,000 (~$105)' },
      { time: '90 min', price: '₩170,000 (~$128)', isBest: true },
      { time: '120 min', price: '₩200,000 (~$150)' },
    ],
  },
  {
    name: 'Special Dual Combination',
    subtitle: 'Dry Acupressure + Smooth Aromatic Oil',
    desc: 'Begins with firm Thai acupressure to loosen large muscles, then transitions into smooth lymphatic oil therapy.',
    badge: 'Most Popular',
    prices: [
      { time: '60 min', price: '₩150,000 (~$115)' },
      { time: '90 min', price: '₩190,000 (~$145)', isBest: true },
      { time: '120 min', price: '₩220,000 (~$165)' },
    ],
  },
  {
    name: 'Signature VIP Full Care',
    subtitle: 'Full-Body Release + Luxury Essential Oil + Lymphatic Care',
    desc: 'Priority assignment of our highest-rated ace therapist. An indulgent private experience from head to toe.',
    badge: 'BEST',
    prices: [
      { time: '60 min', price: '₩170,000 (~$128)' },
      { time: '90 min', price: '₩210,000 (~$160)', isBest: true },
      { time: '120 min', price: '₩250,000 (~$190)' },
    ],
  },
];

/* ─────────────────────────────────────────────
   Guest Reviews
───────────────────────────────────────────── */
const EN_REVIEWS = [
  {
    author: 'David M.',
    area: 'Gangnam 5-Star Hotel',
    course: 'VIP Signature 90m (Yuna)',
    text: 'Visited Seoul on business. No deposit required was a huge relief. Yuna arrived in 25 mins with clean towels and oils. Outstanding professional service that dissolved my jet lag.',
  },
  {
    author: 'Alex K.',
    area: 'Myeongdong Residence',
    course: 'Special Dual 90m',
    text: 'The combination of Thai deep tissue followed by warm aroma oil was heavenly. Therapist was polite and respectful. Paid via Visa card easily upon arrival.',
  },
  {
    author: 'Chris B.',
    area: 'Yeouido Hotel',
    course: 'VIP Signature 120m (Seoa)',
    text: 'Top tier in-room hotel spa experience. Smooth communication in English on WhatsApp. Highly recommend to anyone traveling in Seoul.',
  },
];

/* ─────────────────────────────────────────────
   FAQs
───────────────────────────────────────────── */
const EN_FAQS = [
  {
    q: 'Do you visit all hotels and residences in Seoul?',
    a: 'Yes, we provide 100% full coverage across all 25 districts of Seoul (Gangnam, Myeongdong, Itaewon, Hongdae, Yeouido, Yongsan, etc.). Simply provide your hotel name and room number.',
  },
  {
    q: 'Do you require any advance deposit or pre-payment?',
    a: 'Never. We strictly uphold a 100% Pay-on-Arrival policy. You pay in person directly to the therapist only after they arrive at your room. Zero advance deposit required.',
  },
  {
    q: 'How fast can a therapist arrive?',
    a: 'With multiple hub centers stationed throughout Seoul, our therapists typically arrive within 20 to 30 minutes of your booking confirmation. We will text you the exact ETA via WhatsApp.',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We accept all major credit and debit cards (Visa, MasterCard, Amex, JCB), cash (Korean Won, USD), and on-the-spot receipts can be provided.',
  },
  {
    q: 'Are the photos 100% genuine?',
    a: 'Yes. We strictly follow a 100% real profile match guarantee. When you request a specific therapist (Yuna, Seoa, Jia, etc.), that exact therapist will personally visit your room.',
  },
  {
    q: 'What should I prepare for the session?',
    a: 'Nothing at all. The therapist arrives equipped with single-use sanitary bed covers, pure cotton massage attire, and warm organic essential oils to ensure your hotel room remains clean.',
  },
];

/* ─────────────────────────────────────────────
   Popular Search Areas
───────────────────────────────────────────── */
const SEO_AREAS = [
  'Gangnam Hotel Massage', 'Myeongdong Outcall Massage', 'Itaewon English Massage', 'Hongdae Hotel Spa',
  'Yeouido In-Room Massage', 'Yongsan Hotel Massage', 'Jamsil Outcall Massage', 'Seoul 24H Hotel Massage',
  'Seoul English Friendly Massage', 'No Deposit Massage Seoul', 'Pay On Arrival Spa Seoul'
];

/* ─────────────────────────────────────────────
   Main Component
───────────────────────────────────────────── */
export default function EnPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: C.bg, color: C.dark, paddingBottom: '96px' }}>

      {/* ── Top Announcement Bar ── */}
      <div style={{ backgroundColor: C.bgSoft, borderBottom: `1px solid ${C.border}`, padding: '8px 16px', textAlign: 'center', fontSize: '12px', color: C.mid }}>
        Seoul All 25 Districts 20~30 Min Arrival · <strong style={{ color: C.dark }}>100% Pay on Arrival (Zero Advance Deposit)</strong>
      </div>

      {/* ── Header ── */}
      <header style={{ position: 'sticky', top: 0, zIndex: 40, backgroundColor: 'rgba(255, 255, 255, 0.98)', backdropFilter: 'blur(12px)', borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: '640px', margin: '0 auto', padding: '12px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: '17px', fontWeight: 900, color: C.dark, letterSpacing: '-0.3px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span>Abam Spa</span>
              <span style={{ fontSize: '11px', fontWeight: 800, color: C.accent, backgroundColor: C.accentBg, padding: '2px 6px', borderRadius: '4px' }}>VIP</span>
            </div>
            <div style={{ fontSize: '10.5px', color: C.muted, fontWeight: 500 }}>Seoul Hotel In-Room Private Massage</div>
          </div>

          {/* Language Switcher */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '3px', backgroundColor: C.bgSoft, padding: '3px', borderRadius: '6px' }}>
            <Link href="/" style={{ fontSize: '11px', color: C.muted, padding: '3px 6px', textDecoration: 'none' }}>KR</Link>
            <span style={{ fontSize: '11px', fontWeight: 900, color: C.dark, backgroundColor: '#ffffff', padding: '3px 7px', borderRadius: '4px', boxShadow: '0 1px 2px rgba(0,0,0,0.06)' }}>EN</span>
            <Link href="/jp" style={{ fontSize: '11px', color: C.muted, padding: '3px 6px', textDecoration: 'none' }}>JP</Link>
            <Link href="/cn" style={{ fontSize: '11px', color: C.muted, padding: '3px 6px', textDecoration: 'none' }}>CN</Link>
          </div>
        </div>

        {/* ── Quick Navigation Anchor Bar ── */}
        <div style={{ maxWidth: '640px', margin: '0 auto', padding: '0 18px 8px', display: 'flex', gap: '6px', overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
          <button
            onClick={() => scrollTo('courses')}
            style={{ padding: '5px 11px', borderRadius: '20px', backgroundColor: C.bgSoft, border: `1px solid ${C.border}`, fontSize: '11.5px', fontWeight: 800, color: C.mid, whiteSpace: 'nowrap' }}
          >
            📋 Spa Menu &amp; Rates
          </button>
          <button
            onClick={() => scrollTo('therapists')}
            style={{ padding: '5px 11px', borderRadius: '20px', backgroundColor: C.bgSoft, border: `1px solid ${C.border}`, fontSize: '11.5px', fontWeight: 800, color: C.mid, whiteSpace: 'nowrap' }}
          >
            👤 Therapists
          </button>
          <button
            onClick={() => scrollTo('how-it-works')}
            style={{ padding: '5px 11px', borderRadius: '20px', backgroundColor: C.bgSoft, border: `1px solid ${C.border}`, fontSize: '11.5px', fontWeight: 800, color: C.mid, whiteSpace: 'nowrap' }}
          >
            🛡️ How It Works
          </button>
          <button
            onClick={() => scrollTo('faq')}
            style={{ padding: '5px 11px', borderRadius: '20px', backgroundColor: C.bgSoft, border: `1px solid ${C.border}`, fontSize: '11.5px', fontWeight: 800, color: C.mid, whiteSpace: 'nowrap' }}
          >
            ❓ FAQs
          </button>
        </div>
      </header>

      {/* ── Main Content ── */}
      <main style={{ maxWidth: '640px', margin: '0 auto', padding: '0 18px' }}>

        {/* ── 1. Hero Section ── */}
        <section style={{ paddingTop: '24px', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 800, color: C.accent, backgroundColor: C.accentBg, padding: '4px 12px', borderRadius: '20px', marginBottom: '14px' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: C.green }} />
            Seoul All 25 Districts · 20~30 Min Hotel In-Room Dispatch
          </div>

          <h1 style={{ fontSize: '26px', fontWeight: 950, lineHeight: 1.35, color: C.dark, margin: '0 0 10px', letterSpacing: '-0.5px' }}>
            Unwind in Seoul With<br />
            Luxury Hotel In-Room Spa
          </h1>

          <p style={{ fontSize: '13.5px', color: C.mid, lineHeight: 1.65, margin: '0 auto 20px', maxWidth: '440px' }}>
            Verified 20s therapists directly dispatched to your hotel or residence room.
            Strict <strong>100% Pay on Arrival (Zero Advance Deposit)</strong> policy.
          </p>

          {/* 2 Main Action CTAs */}
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '22px' }}>
            <a
              href={WA_LINK}
              target="_blank"
              rel="noreferrer"
              style={{
                flex: 1, maxWidth: '210px',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                backgroundColor: '#25D366', color: '#ffffff',
                fontWeight: 900, fontSize: '14px', padding: '13px 0', borderRadius: '12px',
                boxShadow: '0 2px 10px rgba(37, 211, 102, 0.35)',
                textDecoration: 'none',
              }}
            >
              💬 WhatsApp Inquiry
            </a>
            <a
              href={PHONE_TEL}
              style={{
                flex: 1, maxWidth: '210px',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                backgroundColor: C.dark, color: '#ffffff',
                fontWeight: 800, fontSize: '14px', padding: '13px 0', borderRadius: '12px',
                boxShadow: '0 2px 10px rgba(15, 23, 42, 0.12)',
                textDecoration: 'none',
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" fill="#ffffff"/></svg>
              {PHONE_DISPLAY}
            </a>
          </div>

          {/* Hero Visual */}
          <div style={{ position: 'relative', width: '100%', height: '220px', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
            <Image src="/images/hero_sensual_goddess.jpg" alt="Seoul Hotel In-Room Massage" fill style={{ objectFit: 'cover' }} priority />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '14px 16px', background: 'linear-gradient(to top, rgba(15, 23, 42, 0.8), transparent)', color: '#ffffff', textAlign: 'left' }}>
              <div style={{ fontSize: '11px', color: '#fef08a', fontWeight: 800, letterSpacing: '0.5px' }}>SEOUL PRIVATE IN-ROOM SPA</div>
              <div style={{ fontSize: '14.5px', fontWeight: 900 }}>Gentle warm aroma touch and deep restorative relief</div>
            </div>
          </div>
        </section>

        {/* ── Divider ── */}
        <div style={{ height: '1px', backgroundColor: C.border, margin: '36px 0 28px' }} />

        {/* ── 2. Spa Menu & Pricing ── */}
        <section id="courses">
          <div style={{ marginBottom: '16px' }}>
            <div style={{ fontSize: '11px', fontWeight: 800, color: C.accent, letterSpacing: '0.8px' }}>SPA MENU &amp; TRANSPARENT RATES</div>
            <h2 style={{ fontSize: '19px', fontWeight: 900, color: C.dark, margin: '2px 0 4px' }}>Signature Courses &amp; Rates</h2>
            <p style={{ fontSize: '12px', color: C.muted, margin: 0 }}>
              Zero deposit · Pay in person on arrival (Visa / Master / Amex / Cash / KRW)
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {EN_COURSES.map((course, i) => (
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
                  boxShadow: '0 1px 4px rgba(0,0,0,0.02)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '6px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontSize: '15.5px', fontWeight: 900, color: C.dark }}>{course.name}</span>
                    {course.badge && (
                      <span style={{ fontSize: '10px', fontWeight: 800, color: '#ffffff', backgroundColor: '#dc2626', padding: '1px 6px', borderRadius: '4px' }}>
                        {course.badge}
                      </span>
                    )}
                  </div>
                  <span style={{ fontSize: '11.5px', color: C.accent, fontWeight: 700 }}>{course.subtitle}</span>
                </div>

                <p style={{ fontSize: '12px', color: C.mid, lineHeight: 1.5, margin: 0 }}>
                  {course.desc}
                </p>

                {/* 3-Tier Price Pills (Click opens WhatsApp) */}
                <div style={{ display: 'flex', gap: '6px', paddingTop: '8px', borderTop: `1px solid ${C.borderLt}`, marginTop: '4px' }}>
                  {course.prices.map((p, pi) => (
                    <a
                      key={pi}
                      href={`https://wa.me/821066072239?text=Hello%20Abam%20Spa,%20I%20would%20like%20to%20book%20${encodeURIComponent(course.name)}%20(${encodeURIComponent(p.time)})`}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        flex: 1,
                        backgroundColor: p.isBest ? '#fffbeb' : C.bgSoft,
                        border: p.isBest ? '1px solid #fde68a' : `1px solid ${C.borderLt}`,
                        padding: '8px 6px',
                        borderRadius: '8px',
                        textAlign: 'center',
                        textDecoration: 'none',
                        color: 'inherit',
                      }}
                    >
                      <div style={{ fontSize: '10.5px', color: p.isBest ? C.accent : C.muted, fontWeight: 600 }}>
                        {p.time} {p.isBest && '★Popular'}
                      </div>
                      <div style={{ fontSize: '12.5px', fontWeight: 900, color: p.isBest ? '#dc2626' : C.dark, marginTop: '1px' }}>
                        {p.price}
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* 3-Pillar Hygiene & Comfort Guarantee */}
          <div style={{ marginTop: '14px', padding: '14px 16px', backgroundColor: C.bgSoft, borderRadius: '12px', border: `1px solid ${C.border}` }}>
            <div style={{ fontSize: '12px', fontWeight: 900, color: C.dark, marginBottom: '6px', textAlign: 'center' }}>
              ✨ 3-Pillar Hygiene &amp; Room Protection Guarantee
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '6px', fontSize: '11.5px', color: C.mid, lineHeight: 1.5 }}>
              <div>• <strong>Single-Use Sanitized Bed Covers</strong> (zero stain on hotel sheets)</div>
              <div>• <strong>100% Water-Soluble Organic Oils</strong> (non-sticky, washed easily)</div>
              <div>• <strong>Complimentary Pure Cotton Robes</strong> (all-inclusive travel fee)</div>
            </div>
          </div>
        </section>

        {/* ── Divider ── */}
        <div style={{ height: '1px', backgroundColor: C.border, margin: '36px 0 28px' }} />

        {/* ── 3. Tonight's Elite Therapists ── */}
        <section id="therapists">
          <div style={{ marginBottom: '16px' }}>
            <div style={{ fontSize: '11px', fontWeight: 800, color: C.accent, letterSpacing: '0.8px' }}>TONIGHT'S THERAPISTS</div>
            <h2 style={{ fontSize: '19px', fontWeight: 900, color: C.dark, margin: '2px 0 4px' }}>On-Duty Ace Therapists</h2>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '12px', color: C.green, fontWeight: 700 }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: C.green }} />
              30+ Verified 20s Healers on Standby Across Seoul
            </div>
          </div>

          {/* Compact Horizontal Cards (Mobile Optimized) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {EN_ACES.map((t, i) => (
              <div
                key={i}
                style={{
                  backgroundColor: '#ffffff',
                  border: `1px solid ${C.border}`,
                  borderRadius: '14px',
                  padding: '12px',
                  display: 'flex',
                  gap: '12px',
                  alignItems: 'center',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.02)',
                }}
              >
                {/* Thumbnail */}
                <div style={{ position: 'relative', width: '92px', height: '115px', borderRadius: '10px', overflow: 'hidden', flexShrink: 0 }}>
                  <Image src={t.img} alt={t.name} fill style={{ objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', top: '6px', left: '6px', backgroundColor: 'rgba(15, 23, 42, 0.85)', color: '#fef08a', fontSize: '9.5px', fontWeight: 800, padding: '2px 5px', borderRadius: '4px' }}>
                    {t.badge}
                  </div>
                </div>

                {/* Details & Action */}
                <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                    <div style={{ fontSize: '16px', fontWeight: 900, color: C.dark }}>
                      {t.name} <span style={{ fontSize: '12px', color: C.muted, fontWeight: 500 }}>({t.age})</span>
                    </div>
                    <div style={{ fontSize: '11px', fontWeight: 800, color: C.accent }}>{t.spec}</div>
                  </div>

                  <div style={{ fontSize: '12px', fontWeight: 800, color: C.dark, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {t.specialty}
                  </div>
                  <div style={{ fontSize: '11px', color: C.muted, lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {t.desc}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '4px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: t.isAvailable ? C.green : '#d97706' }}>
                      {t.isAvailable ? '● Ready' : '○ Standby'}
                    </span>

                    <div style={{ display: 'flex', gap: '4px' }}>
                      <a
                        href={`https://wa.me/821066072239?text=Hello%20Abam%20Spa,%20I%20would%20like%20to%20request%20${t.name}%20for%20a%20hotel%20massage.`}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          backgroundColor: '#25D366', color: '#ffffff',
                          fontSize: '11px', fontWeight: 900, padding: '5px 9px', borderRadius: '6px',
                          textDecoration: 'none',
                        }}
                      >
                        Request
                      </a>
                      <a
                        href={PHONE_TEL}
                        style={{
                          backgroundColor: C.dark, color: '#ffffff',
                          fontSize: '11px', fontWeight: 800, padding: '5px 9px', borderRadius: '6px',
                          textDecoration: 'none',
                        }}
                      >
                        Call
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Standby Pool Note */}
          <div style={{ marginTop: '12px', padding: '12px 14px', backgroundColor: C.bgSoft, border: `1px solid ${C.border}`, borderRadius: '10px', fontSize: '12px', color: C.mid, lineHeight: 1.55 }}>
            <strong style={{ color: C.dark }}>30+ Professional Healers on Standby Across Seoul</strong><br />
            In addition to our featured aces, we maintain a large roster of skilled therapists stationed across all districts. Feel free to specify your preferred style (firm acupressure, gentle sensual touch, etc.) when booking.
          </div>
        </section>

        {/* ── Divider ── */}
        <div style={{ height: '1px', backgroundColor: C.border, margin: '36px 0 28px' }} />

        {/* ── 4. How It Works ── */}
        <section id="how-it-works">
          <div style={{ marginBottom: '16px' }}>
            <div style={{ fontSize: '11px', fontWeight: 800, color: C.accent, letterSpacing: '0.8px' }}>HOW IT WORKS</div>
            <h2 style={{ fontSize: '19px', fontWeight: 900, color: C.dark, margin: '2px 0 4px' }}>Book in 3 Simple Steps</h2>
            <p style={{ fontSize: '12px', color: C.muted, margin: 0 }}>No Korean phone number required · 30-sec instant booking</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {[
              { no: '01', title: 'Message via WhatsApp', desc: 'Send your hotel name, room number, and preferred course to our English concierge.' },
              { no: '02', title: '20~30 Min Arrival', desc: 'Your designated therapist arrives quietly at your hotel room with sanitized equipment.' },
              { no: '03', title: '100% Pay in Person', desc: 'Pay directly on arrival after greeting your therapist. Cash or credit cards accepted.' },
            ].map((s, i) => (
              <div key={i} style={{ backgroundColor: '#ffffff', border: `1px solid ${C.border}`, borderRadius: '12px', padding: '13px 15px', display: 'flex', gap: '12px', alignItems: 'center' }}>
                <div style={{ fontSize: '15px', fontWeight: 900, color: C.accent, minWidth: '22px' }}>{s.no}</div>
                <div>
                  <div style={{ fontSize: '13.5px', fontWeight: 800, color: C.dark }}>{s.title}</div>
                  <div style={{ fontSize: '12px', color: C.mid, marginTop: '2px' }}>{s.desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Zero Deposit Guarantee Banner */}
          <div style={{ marginTop: '12px', padding: '13px 15px', backgroundColor: C.greenBg, border: `1px solid ${C.greenBd}`, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
            <div>
              <div style={{ fontSize: '12.5px', fontWeight: 900, color: '#166534' }}>Zero Advance Deposit Guarantee</div>
              <div style={{ fontSize: '11px', color: '#14532d', marginTop: '2px' }}>We never ask for pre-payment. 100% pay in person only upon arrival.</div>
            </div>
            <a href={WA_LINK} target="_blank" rel="noreferrer" style={{ backgroundColor: '#166534', color: '#ffffff', padding: '7px 12px', borderRadius: '7px', fontSize: '11.5px', fontWeight: 800, textDecoration: 'none', whiteSpace: 'nowrap' }}>
              WhatsApp
            </a>
          </div>
        </section>

        {/* ── Divider ── */}
        <div style={{ height: '1px', backgroundColor: C.border, margin: '36px 0 28px' }} />

        {/* ── 5. Guest Reviews ── */}
        <section>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '14px' }}>
            <div>
              <div style={{ fontSize: '11px', fontWeight: 800, color: C.accent, letterSpacing: '0.8px' }}>GUEST REVIEWS</div>
              <h2 style={{ fontSize: '19px', fontWeight: 900, color: C.dark, margin: '2px 0 0' }}>Verified Traveler Experiences</h2>
            </div>
            <div style={{ fontSize: '12px', color: C.accent, fontWeight: 800 }}>★ 5.0 / 5.0 Rating</div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {EN_REVIEWS.map((rev, i) => (
              <div key={i} style={{ backgroundColor: '#ffffff', border: `1px solid ${C.border}`, borderRadius: '12px', padding: '13px 15px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 800, color: C.dark }}>{rev.author} <span style={{ fontSize: '11px', color: C.muted, fontWeight: 500 }}>({rev.area})</span></span>
                  <span style={{ fontSize: '11px', color: '#eab308' }}>★★★★★</span>
                </div>
                <div style={{ fontSize: '11px', color: C.accent, fontWeight: 700, marginBottom: '5px' }}>{rev.course}</div>
                <p style={{ fontSize: '12px', color: C.mid, lineHeight: 1.5, margin: 0 }}>"{rev.text}"</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Divider ── */}
        <div style={{ height: '1px', backgroundColor: C.border, margin: '36px 0 28px' }} />

        {/* ── 6. FAQs (Interactive Accordion) ── */}
        <section id="faq">
          <div style={{ marginBottom: '16px' }}>
            <div style={{ fontSize: '11px', fontWeight: 800, color: C.accent, letterSpacing: '0.8px' }}>FREQUENTLY ASKED QUESTIONS</div>
            <h2 style={{ fontSize: '19px', fontWeight: 900, color: C.dark, margin: '2px 0 4px' }}>Frequently Asked Questions</h2>
            <p style={{ fontSize: '12px', color: C.muted, margin: 0 }}>Quick answers for international hotel guests in Seoul.</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {EN_FAQS.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={i} style={{ border: `1px solid ${C.border}`, borderRadius: '10px', overflow: 'hidden', backgroundColor: '#ffffff' }}>
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    style={{ width: '100%', padding: '13px 15px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', textAlign: 'left' }}
                  >
                    <span style={{ fontSize: '13px', fontWeight: 800, color: C.dark }}>{faq.q}</span>
                    <span style={{ fontSize: '11px', color: C.muted }}>{isOpen ? '▲' : '▼'}</span>
                  </button>
                  {isOpen && (
                    <div style={{ padding: '0 15px 13px', fontSize: '12px', color: C.mid, lineHeight: 1.6, borderTop: `1px solid ${C.borderLt}`, paddingTop: '10px' }}>
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* ── Divider ── */}
        <div style={{ height: '1px', backgroundColor: C.border, margin: '32px 0 24px' }} />

        {/* ── 7. Seoul District Network Footer ── */}
        <footer style={{ paddingBottom: '24px' }}>
          <div style={{ fontSize: '12px', fontWeight: 800, color: C.dark, marginBottom: '6px' }}>
            Seoul Premium In-Room Hotel Massage Network
          </div>
          <p style={{ fontSize: '11px', color: C.muted, lineHeight: 1.6, margin: '0 0 10px' }}>
            Serving Gangnam, Myeongdong, Itaewon, Hongdae, Yeouido, Yongsan, Jamsil, and all 25 districts within 20~30 mins.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px 8px', fontSize: '11px' }}>
            {SEO_AREAS.map((area, i) => (
              <span key={i} style={{ color: '#64748b' }}>
                {area}
              </span>
            ))}
          </div>

          <div style={{ marginTop: '18px', paddingTop: '14px', borderTop: `1px solid ${C.border}`, fontSize: '10.5px', color: C.muted, lineHeight: 1.6 }}>
            <strong>Abam Thai Homecare Seoul</strong> · All 25 Districts In-Room Hotel VIP Spa · 100% Pay on Arrival (Zero Deposit) · WhatsApp &amp; International Hotline {PHONE_DISPLAY}
          </div>
        </footer>

      </main>

      {/* ── Fixed Bottom Quick Booking Bar ── */}
      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(255, 255, 255, 0.98)', backdropFilter: 'blur(12px)', borderTop: `1px solid ${C.border}`, padding: '8px 16px', zIndex: 50, boxShadow: '0 -4px 16px rgba(0,0,0,0.06)' }}>
        <div style={{ maxWidth: '640px', margin: '0 auto', display: 'flex', gap: '8px', alignItems: 'center' }}>
          <a
            href={WA_LINK}
            target="_blank"
            rel="noreferrer"
            style={{
              flex: 1.6,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
              backgroundColor: '#25D366', color: '#ffffff',
              fontWeight: 900, fontSize: '14px', padding: '12px 0', borderRadius: '10px',
              textDecoration: 'none',
              boxShadow: '0 2px 8px rgba(37, 211, 102, 0.3)',
            }}
          >
            💬 WhatsApp 24/7 Booking
          </a>
          <a
            href={PHONE_TEL}
            style={{
              flex: 1,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px',
              backgroundColor: C.dark, color: '#ffffff',
              fontWeight: 800, fontSize: '13.5px', padding: '12px 0', borderRadius: '10px',
              textDecoration: 'none',
              boxShadow: '0 2px 8px rgba(15, 23, 42, 0.15)',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" fill="#ffffff"/></svg>
            Direct Call
          </a>
        </div>
      </div>

    </div>
  );
}
