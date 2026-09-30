import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Seoul Outcall Massage & Hotel In-Room VIP Spa | English Operating Hours: 7:00 PM – 5:00 AM (Booking Available) (Abam)',
  description:
    'Premium 24/7 English-friendly outcall massage service in Seoul Exclusive (All 25 Districts). In-room hotel spa delivered within 30 minutes. 100% pay-on-arrival (Cash & All Credit Cards). No advance deposit. Book easily via WhatsApp (+82 10-6607-2239) & Direct Call.',
  keywords: [
    'Seoul outcall massage',
    'Seoul hotel massage',
    'Seoul in-room massage',
    'Gangnam hotel outcall spa',
    'Myeongdong hotel massage',
    'Itaewon massage English',
    'Hongdae hotel massage',
    'Seoul 5 star hotel massage',
    'English speaking massage Seoul',
    'Seoul 24 hour massage',
    'Seoul VIP sensory massage',
    'Pangyo hotel massage'
  ].join(', '),
  alternates: {
    canonical: 'https://abam.kr/en',
    languages: {
      'ko-KR': 'https://abam.kr',
      'en-US': 'https://abam.kr/en',
      'ja-JP': 'https://abam.kr/jp',
      'zh-CN': 'https://abam.kr/cn',
    },
  },
  openGraph: {
    title: 'Seoul Outcall Massage & Hotel In-Room VIP Spa (Abam)',
    description:
      'Seoul Exclusive (All 25 Districts) 7:00 PM – 5:00 AM Hotel In-Room Massage. 30-min arrival, 100% pay on arrival (Visa/Master/Amex/Cash). English concierge via WhatsApp & Direct Phone Call.',
    url: 'https://abam.kr/en',
    siteName: 'Abam Thai Homecare Seoul',
    images: [{ url: 'https://abam.kr/images/hero_sensual_goddess.jpg', width: 730, height: 620, alt: 'Seoul VIP Hotel Massage' }],
  },
};

const WHATSAPP_LINK = 'https://wa.me/821066072239?text=Hello%20Abam%20Spa,%20I%20am%20interested%20in%20booking%20a%20hotel%20massage%20in%20Seoul.';
// Clean 2-Channel Concierge: WhatsApp & Direct Phone
const PHONE_TEL = 'tel:+82-10-6607-2239';
const PHONE_DISPLAY = '+82 10-6607-2239';

const EN_COURSES = [
  {
    id: 'thai',
    name: 'Authentic Thai Deep Tissue',
    tag: 'Wat Pho Royal Dry Acupressure',
    badge: 'No Oil · Pure Cotton Robe',
    img: '/images/thai.jpg',
    desc: 'Relieves intense travel fatigue, stiff neck, and jet lag through rhythmic acupressure and full-body passive yoga stretching.',
    prices: [
      { time: '60 min', price: '₩80,000 (~$60)' },
      { time: '90 min', price: '₩100,000 (~$75)', isBest: true },
      { time: '120 min (2h)', price: '₩120,000 (~$90)' },
    ],
  },
  {
    id: 'healing',
    name: 'Sensual Healing Relaxation',
    tag: 'Emotional Comfort & Gentle Relief',
    badge: 'Swedish Gentle Touch & Stress Relief',
    img: '/images/sensual_touch.jpg',
    desc: 'Deeply relaxing Swedish-style soothing strokes to calm your autonomic nerves, releasing mental burnout and daily tension.',
    prices: [
      { time: '60 min', price: '₩90,000 (~$68)' },
      { time: '90 min', price: '₩120,000 (~$90)', isBest: true },
      { time: '120 min (2h)', price: '₩150,000 (~$113)' },
    ],
  },
  {
    id: 'aroma',
    name: 'Organic Aroma Lymphatic Spa',
    tag: '100% Organic Essential Oils',
    badge: 'Deep Lymphatic & Smooth Touch',
    img: '/images/aroma.jpg',
    desc: 'Soothing body strokes with warm natural essential oils designed to release muscle tension, stimulate lymphatic drainage, and melt away travel stress.',
    prices: [
      { time: '60 min', price: '₩90,000 (~$68)' },
      { time: '90 min', price: '₩110,000 (~$83)', isBest: true },
      { time: '120 min (2h)', price: '₩140,000 (~$105)' },
    ],
  },
  {
    id: 'special',
    name: 'Special Dual Combination',
    tag: 'Thai Dry + Aroma Oil Synergy',
    badge: '#1 Best Value All-in-One',
    img: '/images/sensual_care.jpg',
    desc: 'First relieves deep muscular knots with dry acupressure, then transitions into smooth aromatic oil lymphatic therapy.',
    prices: [
      { time: '60 min', price: '₩100,000 (~$75)' },
      { time: '90 min', price: '₩140,000 (~$105)', isBest: true },
      { time: '120 min (2h)', price: '₩170,000 (~$128)' },
    ],
  },
  {
    id: 'vip',
    name: 'Signature VIP Full Care',
    tag: '👑 #1 Most Requested Luxury Experience',
    badge: 'Dedicated Ace Therapist Priority',
    isVip: true,
    img: '/images/hero_sensual_goddess.jpg',
    desc: 'The ultimate luxury spa experience: deep acupressure release for fatigued muscles followed by warm aromatic sensual touch and intensive lymphatic care.',
    prices: [
      { time: '60 min', price: '₩120,000 (~$90)' },
      { time: '90 min', price: '₩160,000 (~$120)', isBest: true },
      { time: '120 min (2h)', price: '₩200,000 (~$150)' },
    ],
  },
];

const EN_ACES = [
  {
    name: 'Yuna',
    age: '23 yrs',
    specs: '166cm · 47kg · Slim & Lovely',
    role: 'Top #1 Requested · Sensual Lymph Care',
    img: '/images/ace_yuna.jpg',
    badge: 'Top Pick',
  },
  {
    name: 'Seoa',
    age: '24 yrs',
    specs: '168cm · 49kg · Glamour S-Line',
    role: 'Deep Tissue & Warm Oil Therapy',
    img: '/images/ace_seoa.jpg',
    badge: 'Popular',
  },
  {
    name: 'Jia',
    age: '22 yrs',
    specs: '165cm · 46kg · Silky Smooth Skin',
    role: 'Gentle Myofascial Release & Tension Reliever',
    img: '/images/ace_jia.jpg',
    badge: 'Ace Healer',
  },
];

export default function EnglishPage() {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundImage: 'url(/images/seoul_night_sky.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center top',
      backgroundAttachment: 'fixed',
      backgroundRepeat: 'no-repeat',
      color: '#18181b',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      paddingBottom: '90px',
    }}>
      {/* Top Banner */}
      <div style={{ background: '#070a10', borderBottom: '1px solid rgba(212, 175, 55, 0.45)', color: '#f3e5ab', padding: '10px 20px', textAlign: 'center', fontSize: '12px', fontWeight: 800, letterSpacing: '0.5px' }}>
        🌍 SEOUL VIP HOTEL & RESIDENCE OUTCALL SPA · 100% PAY ON ARRIVAL (ZERO DEPOSIT) · 30-MIN RAPID HOTEL DISPATCH
      </div>

      {/* Header */}
      <header style={{ position: 'sticky', top: 0, zIndex: 50, backgroundColor: 'rgba(255,255,255,0.98)', backdropFilter: 'blur(16px)', borderBottom: '1.5px solid rgba(212, 175, 55, 0.35)', boxShadow: '0 4px 22px rgba(0,0,0,0.18)' }}>
        <div style={{ maxWidth: '1080px', margin: '0 auto', padding: '12px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <Link href="/en" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'linear-gradient(135deg, #090d16, #1e293b)', border: '1px solid #d4af37', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f3e5ab', fontWeight: 900, fontSize: '18px' }}>
              🌙
            </div>
            <div>
              <div style={{ fontSize: '17px', fontWeight: 950, color: '#090d16', letterSpacing: '-0.3px' }}>
                ABAM <span style={{ color: '#b38728' }}>SEOUL VIP SPA</span>
              </div>
              <span style={{ fontSize: '10.5px', color: '#64748b', fontWeight: 700 }}>
                ENGLISH 24/7 IN-ROOM HOTEL MASSAGE
              </span>
            </div>
          </Link>

          {/* Language Switcher */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#f1f5f9', padding: '4px', borderRadius: '8px' }}>
            <Link href="/" style={{ padding: '4px 10px', fontSize: '12px', fontWeight: 700, color: '#475569', textDecoration: 'none', borderRadius: '6px' }}>🇰🇷 KR</Link>
            <span style={{ padding: '4px 10px', fontSize: '12px', fontWeight: 900, color: '#090d16', background: '#ffffff', borderRadius: '6px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>🇺🇸 EN</span>
            <Link href="/jp" style={{ padding: '4px 10px', fontSize: '12px', fontWeight: 700, color: '#475569', textDecoration: 'none', borderRadius: '6px' }}>🇯🇵 JP</Link>
            <Link href="/cn" style={{ padding: '4px 10px', fontSize: '12px', fontWeight: 700, color: '#475569', textDecoration: 'none', borderRadius: '6px' }}>🇨🇳 CN</Link>
          </div>

          {/* Quick Contact Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12.5px', fontWeight: 900, color: '#ffffff', backgroundColor: '#25D366', padding: '8px 16px', borderRadius: '6px', textDecoration: 'none', boxShadow: '0 2px 8px rgba(37,211,102,0.35)' }}>
              💬 WhatsApp
            </a>
            <a href={PHONE_TEL} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12.5px', fontWeight: 800, color: '#090d16', backgroundColor: '#f3e5ab', border: '1px solid #d4af37', padding: '8px 14px', borderRadius: '6px', textDecoration: 'none' }}>
              📞 Call
            </a>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main style={{ maxWidth: '1080px', margin: '24px auto', padding: '0 16px', display: 'flex', flexDirection: 'column', gap: '26px' }}>
        
        {/* Hero Card */}
        <section style={{ position: 'relative', overflow: 'hidden', backgroundColor: '#ffffff', borderRadius: '22px', border: '1.5px solid rgba(212, 175, 55, 0.45)', boxShadow: '0 0 35px rgba(212, 175, 55, 0.16), 0 22px 50px rgba(0, 0, 0, 0.36)', padding: '44px 32px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '36px', alignItems: 'center' }}>
            
            {/* Left Content */}
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#090d16', border: '1px solid rgba(212, 175, 55, 0.45)', padding: '6px 14px', borderRadius: '20px', marginBottom: '16px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#22c55e', display: 'inline-block' }} />
                <span style={{ fontSize: '12px', fontWeight: 800, color: '#f3e5ab' }}>LIVE · 20s S-Class Therapists On Duty · 30-min Hotel Arrival</span>
              </div>

              <div style={{ fontSize: '13px', fontWeight: 900, color: '#b38728', letterSpacing: '1px', marginBottom: '8px' }}>
                ✦ SEOUL VIP HOTEL & RESIDENCE IN-ROOM SPA ESCAPE
              </div>

              <h1 style={{ fontSize: '30px', fontWeight: 950, lineHeight: 1.3, letterSpacing: '-0.8px', margin: '0 0 16px', color: '#090d16' }}>
                Sensual Luxury Spa<br />
                <span style={{
                  background: 'linear-gradient(135deg, #b8860b 0%, #e6ca65 35%, #d4af37 70%, #996e1e 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontWeight: 950,
                  display: 'inline-block'
                }}>Delivered to Your Hotel Room</span><br />
                Across Seoul Exclusive (All 25 Districts)
              </h1>

              <p style={{ fontSize: '15px', color: '#334155', lineHeight: 1.7, margin: '0 0 24px' }}>
                Experience Korea’s finest private wellness therapy without leaving the comfort of your hotel room or residence. Our handpicked, attractive 20s certified therapists arrive at your door within <strong>30 minutes</strong>.
              </p>

              {/* 4 Guarantees */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px', marginBottom: '26px' }}>
                <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '10px 14px' }}>
                  <div style={{ fontSize: '13px', fontWeight: 900, color: '#090d16' }}>🛡️ ZERO Advance Deposit</div>
                  <div style={{ fontSize: '11.5px', color: '#64748b' }}>Pay 100% on arrival in room</div>
                </div>
                <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '10px 14px' }}>
                  <div style={{ fontSize: '13px', fontWeight: 900, color: '#090d16' }}>💳 Cash & Credit Cards</div>
                  <div style={{ fontSize: '11.5px', color: '#64748b' }}>Visa, Master, Amex, JCB, KRW/USD</div>
                </div>
                <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '10px 14px' }}>
                  <div style={{ fontSize: '13px', fontWeight: 900, color: '#090d16' }}>🏨 Any 4~5 Star Hotel</div>
                  <div style={{ fontSize: '11.5px', color: '#64748b' }}>Gangnam, Myeongdong, Yeouido, etc.</div>
                </div>
                <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '10px 14px' }}>
                  <div style={{ fontSize: '13px', fontWeight: 900, color: '#090d16' }}>💬 English Concierge</div>
                  <div style={{ fontSize: '11.5px', color: '#64748b' }}>Instant WhatsApp & Phone hotline</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#25D366', color: '#ffffff', fontWeight: 900, fontSize: '15px', padding: '14px 28px', borderRadius: '10px', textDecoration: 'none', boxShadow: '0 4px 16px rgba(37,211,102,0.45)' }}>
                  💬 Book on WhatsApp (Instant 24/7)
                </a>
                <a href={PHONE_TEL} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#090d16', color: '#f3e5ab', fontWeight: 900, fontSize: '15px', padding: '14px 24px', borderRadius: '10px', textDecoration: 'none', border: '1px solid #d4af37', boxShadow: '0 4px 14px rgba(0,0,0,0.2)' }}>
                  📞 Call {PHONE_DISPLAY}
                </a>
              </div>
            </div>

            {/* Right Photo Card */}
            <div style={{ position: 'relative', borderRadius: '18px', overflow: 'hidden', height: '420px', boxShadow: '0 16px 36px rgba(0,0,0,0.22)', border: '1.5px solid rgba(212, 175, 55, 0.4)' }}>
              <Image
                src="/images/hero_sensual_goddess.jpg"
                alt="Seoul Hotel VIP In-Room Outcall Massage"
                fill
                style={{ objectFit: 'cover' }}
                priority
              />
              <div style={{ position: 'absolute', top: '14px', left: '14px', backgroundColor: 'rgba(9, 13, 22, 0.88)', border: '1px solid #d4af37', color: '#f3e5ab', padding: '6px 12px', borderRadius: '6px', fontSize: '11px', fontWeight: 900 }}>
                👑 1:1 VIP IN-ROOM HOTEL MASSAGE
              </div>
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '24px 20px 16px', background: 'linear-gradient(to top, rgba(9, 13, 22, 0.95) 0%, rgba(9, 13, 22, 0.6) 70%, transparent 100%)', color: '#ffffff' }}>
                <div style={{ fontSize: '11px', color: '#e6ca65', fontWeight: 900, letterSpacing: '1px' }}>SEOUL MIDNIGHT VIP SENSORY ESCAPE</div>
                <div style={{ fontSize: '16px', fontWeight: 950, color: '#ffffff', margin: '4px 0 2px' }}>Warm Organic Oils & Expert Delicate Touch</div>
                <div style={{ fontSize: '11.5px', color: '#cbd5e1' }}>100% Verified Therapists · 100% Face-to-Face Payment On Arrival</div>
              </div>
            </div>
          </div>
        </section>

        {/* Tonight's Ace Lineup */}
        <section style={{ backgroundColor: '#ffffff', borderRadius: '20px', border: '1px solid #e8e0d0', padding: '32px 28px', boxShadow: '0 12px 32px rgba(0, 0, 0, 0.28)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
            <div>
              <div style={{ fontSize: '11px', fontWeight: 900, color: '#b38728', backgroundColor: '#faf6ee', border: '1px solid #d4af37', padding: '3px 8px', borderRadius: '4px', display: 'inline-block', marginBottom: '6px' }}>
                ✦ TONIGHT'S VIP ACE ROSTER
              </div>
              <h2 style={{ fontSize: '20px', fontWeight: 950, color: '#090d16', margin: 0 }}>
                Tonight's S-Class Ace Therapists on Duty
              </h2>
              <p style={{ fontSize: '13px', color: '#64748b', margin: '4px 0 0' }}>
                You may request your preferred therapist when making your reservation via WhatsApp or LINE.
              </p>
            </div>
            <div style={{ backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', color: '#166534', padding: '6px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 800 }}>
              ● Ready for Immediate Dispatch (30 min)
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '18px' }}>
            {EN_ACES.map((ace, i) => (
              <div key={i} style={{ border: '1px solid #e2e8f0', borderRadius: '16px', padding: '18px', background: '#fafbfc', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                  <div style={{ position: 'relative', width: '74px', height: '74px', borderRadius: '12px', overflow: 'hidden', border: '1.5px solid #d4af37', flexShrink: 0 }}>
                    <Image src={ace.img} alt={ace.name} fill style={{ objectFit: 'cover' }} />
                  </div>
                  <div>
                    <span style={{ fontSize: '10px', fontWeight: 900, color: '#b38728', background: '#faf6ee', border: '1px solid #d4af37', padding: '2px 6px', borderRadius: '4px' }}>
                      {ace.badge}
                    </span>
                    <div style={{ fontSize: '17px', fontWeight: 950, color: '#090d16', marginTop: '3px' }}>
                      Ace {ace.name} <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 700 }}>({ace.age})</span>
                    </div>
                    <div style={{ fontSize: '11.5px', color: '#475569', fontWeight: 700 }}>
                      {ace.specs}
                    </div>
                  </div>
                </div>
                <div style={{ fontSize: '12px', color: '#334155', background: '#ffffff', padding: '10px 12px', borderRadius: '8px', border: '1px solid #f1f5f9', fontWeight: 600 }}>
                  ✦ {ace.role}
                </div>
                <div style={{ marginTop: 'auto' }}>
                  <a href={`${WHATSAPP_LINK}&text=Hi,%20I%20would%20like%20to%20request%20Therapist%20${ace.name}`} target="_blank" rel="noopener noreferrer" style={{ display: 'block', textAlign: 'center', backgroundColor: '#25D366', color: '#ffffff', fontSize: '12.5px', fontWeight: 900, padding: '10px 0', borderRadius: '8px', textDecoration: 'none', boxShadow: '0 2px 8px rgba(37,211,102,0.3)' }}>
                    💬 Request {ace.name} on WhatsApp
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Spa Menu & Pricing */}
        <section style={{ backgroundColor: '#ffffff', borderRadius: '20px', border: '1px solid #e8e0d0', padding: '32px 28px', boxShadow: '0 12px 32px rgba(0, 0, 0, 0.28)' }}>
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <span style={{ fontSize: '11px', fontWeight: 900, color: '#b38728', backgroundColor: '#faf6ee', border: '1px solid #d4af37', padding: '3px 8px', borderRadius: '4px', letterSpacing: '1px' }}>
              ✦ TRANSPARENT FIXED PRICING
            </span>
            <h2 style={{ fontSize: '22px', fontWeight: 950, color: '#090d16', margin: '8px 0 4px' }}>
              VIP In-Room Treatment Menu
            </h2>
            <p style={{ fontSize: '13.5px', color: '#64748b' }}>
              No hidden travel fees. Pay the therapist directly upon arrival in your room.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: '22px' }}>
            {EN_COURSES.map((course, idx) => (
              <div key={idx} style={{ border: course.isVip ? '2px solid #d4af37' : '1px solid #e2e8f0', borderRadius: '18px', overflow: 'hidden', background: course.isVip ? '#fffdf7' : '#ffffff', display: 'flex', flexDirection: 'column', boxShadow: course.isVip ? '0 8px 24px rgba(212,175,55,0.18)' : '0 2px 10px rgba(0,0,0,0.04)' }}>
                <div style={{ position: 'relative', height: '170px' }}>
                  <Image src={course.img} alt={course.name} fill style={{ objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', top: '10px', left: '10px', backgroundColor: '#090d16', color: '#f3e5ab', fontSize: '10.5px', fontWeight: 900, padding: '3px 8px', borderRadius: '4px', border: '1px solid #d4af37' }}>
                    {course.badge}
                  </div>
                </div>
                <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <div style={{ fontSize: '11.5px', fontWeight: 800, color: '#b38728', marginBottom: '4px' }}>{course.tag}</div>
                  <h3 style={{ fontSize: '18px', fontWeight: 950, color: '#090d16', margin: '0 0 10px' }}>{course.name}</h3>
                  <p style={{ fontSize: '12.5px', color: '#64748b', lineHeight: 1.6, margin: '0 0 18px', flex: 1 }}>
                    {course.desc}
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '18px' }}>
                    {course.prices.map((p, pi) => (
                      <div key={pi} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', background: p.isBest ? '#faf6ee' : '#f8fafc', borderRadius: '8px', border: p.isBest ? '1px solid #d4af37' : '1px solid #f1f5f9' }}>
                        <span style={{ fontSize: '13px', fontWeight: 800, color: '#090d16' }}>
                          {p.time} {p.isBest && <span style={{ fontSize: '10px', color: '#b38728', fontWeight: 900 }}>[BEST CHOICE]</span>}
                        </span>
                        <span style={{ fontSize: '14.5px', fontWeight: 950, color: '#b38728' }}>{p.price}</span>
                      </div>
                    ))}
                  </div>
                  <a href={`${WHATSAPP_LINK}&text=Hi,%20I%20would%20like%20to%20book%20the%20${encodeURIComponent(course.name)}%20course.`} target="_blank" rel="noopener noreferrer" style={{ display: 'block', textAlign: 'center', backgroundColor: '#25D366', color: '#ffffff', fontWeight: 900, fontSize: '13px', padding: '11px 0', borderRadius: '8px', textDecoration: 'none' }}>
                    Book {course.name} (WhatsApp)
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works & Hotel Service Area */}
        <section style={{ backgroundColor: '#ffffff', borderRadius: '20px', border: '1px solid #e8e0d0', padding: '32px 28px', boxShadow: '0 12px 32px rgba(0, 0, 0, 0.28)' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 950, color: '#090d16', margin: '0 0 18px', textAlign: 'center' }}>
            How To Book in 3 Simple Steps
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '32px' }}>
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '20px', textAlign: 'center' }}>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>💬</div>
              <div style={{ fontSize: '14px', fontWeight: 900, color: '#090d16', marginBottom: '4px' }}>1. Send Message</div>
              <div style={{ fontSize: '12px', color: '#64748b' }}>
                Contact us via WhatsApp or LINE with your hotel name, room number, and preferred course.
              </div>
            </div>
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '20px', textAlign: 'center' }}>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>🚗</div>
              <div style={{ fontSize: '14px', fontWeight: 900, color: '#090d16', marginBottom: '4px' }}>2. 30-Min Arrival</div>
              <div style={{ fontSize: '12px', color: '#64748b' }}>
                Your selected therapist arrives directly at your hotel room with pure cotton robes, organic oils, and sanitary items.
              </div>
            </div>
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '20px', textAlign: 'center' }}>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>💳</div>
              <div style={{ fontSize: '14px', fontWeight: 900, color: '#090d16', marginBottom: '4px' }}>3. Pay In Person</div>
              <div style={{ fontSize: '12px', color: '#64748b' }}>
                Pay directly upon arrival via Cash (KRW, USD) or any International Credit Card. ZERO advance deposits!
              </div>
            </div>
          </div>

          <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '24px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 950, color: '#090d16', margin: '0 0 10px' }}>
              🏨 Serviceable Hotels & Districts across Greater Seoul
            </h3>
            <div style={{ fontSize: '12.5px', color: '#475569', lineHeight: 1.8 }}>
              <strong>Seoul Central:</strong> Gangnam, Myeongdong, Itaewon, Hongdae, Dongdaemun, Yeouido, Yongsan, Songpa (Jamsil), Seongsu.<br />
              <strong>Major 5-Star Hotels:</strong> Four Seasons Seoul, The Shilla, Grand Hyatt, Signiel Seoul, Josun Palace Gangnam, JW Marriott, InterContinental Parnas, Sofitel Ambassador, Josun Palace.<br />
              <strong>Airport & Transit:</strong> Gimpo Airport area, Pangyo Tech Valley Hotels, Bundang area.
            </div>
          </div>
        </section>

        {/* Global Messenger Floating Card */}
        <section style={{ backgroundColor: '#090d16', borderRadius: '20px', border: '1.5px solid #d4af37', padding: '36px 28px', color: '#ffffff', textAlign: 'center' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 950, color: '#f3e5ab', margin: '0 0 10px' }}>
            Ready to Unwind Tonight? We Are Standing By 24/7.
          </h2>
          <p style={{ fontSize: '14px', color: '#cbd5e1', maxWidth: '640px', margin: '0 auto 24px', lineHeight: 1.6 }}>
            No Korean phone number required. Connect directly with our English concierge via WhatsApp or call our international hotline.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#25D366', color: '#ffffff', fontWeight: 900, fontSize: '15px', padding: '14px 28px', borderRadius: '10px', textDecoration: 'none', boxShadow: '0 4px 14px rgba(37,211,102,0.4)' }}>
              💬 WhatsApp: +82 10-6607-2239
            </a>
            <a href={PHONE_TEL} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#1e293b', border: '1px solid #d4af37', color: '#f3e5ab', fontWeight: 900, fontSize: '15px', padding: '14px 28px', borderRadius: '10px', textDecoration: 'none' }}>
              📞 International Call: {PHONE_DISPLAY}
            </a>
          </div>
        </section>
      </main>

      {/* Fixed Bottom Bar for Mobile/Tablet */}
      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(255,255,255,0.98)', backdropFilter: 'blur(16px)', borderTop: '1.5px solid rgba(212, 175, 55, 0.4)', padding: '10px 16px', zIndex: 50, boxShadow: '0 -6px 25px rgba(0,0,0,0.18)' }}>
        <div style={{ maxWidth: '1080px', margin: '0 auto', display: 'flex', gap: '10px' }}>
          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" style={{ flex: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', backgroundColor: '#25D366', color: '#ffffff', fontWeight: 900, fontSize: '15px', padding: '14px 0', borderRadius: '10px', textDecoration: 'none', boxShadow: '0 2px 10px rgba(37,211,102,0.35)' }}>
            💬 WhatsApp 24/7 Booking
          </a>
          <a href={PHONE_TEL} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', backgroundColor: '#090d16', color: '#f3e5ab', fontWeight: 900, fontSize: '14.5px', padding: '14px 0', borderRadius: '10px', textDecoration: 'none', border: '1px solid #d4af37' }}>
            📞 Call Now
          </a>
        </div>
      </div>
    </div>
  );
}
