import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '首尔酒店上门按摩・首尔上门精油SPA | 中文微信咨询・30分钟到达・100%见面付款 (Abam)',
  description:
    '首尔江南、明洞、东大门、弘大及京畿道全境酒店客房上门按摩服务。无任何预付款定金（100%到达后当面现金/银联信用卡结账）。微信/WhatsApp/LINE快速预约，严选20代年轻专业技师30分钟内急速到达。',
  keywords: [
    '首尔上门按摩',
    '首尔酒店上门SPA',
    '江南酒店按摩',
    '明洞酒店上门按摩',
    '首尔精油上门按摩',
    '京畿道机场酒店按摩',
    '首尔晚上7点至凌晨4点可预约上门按摩',
    '首尔出差按摩 中文',
    '韩国酒店客房SPA'
  ].join(', '),
  alternates: {
    canonical: 'https://abam.kr/cn',
    languages: {
      'ko-KR': 'https://abam.kr',
      'en-US': 'https://abam.kr/en',
      'ja-JP': 'https://abam.kr/jp',
      'zh-CN': 'https://abam.kr/cn',
    },
  },
  openGraph: {
    title: '首尔酒店上门按摩・首尔上门SPA (Abam)',
    description:
      '首尔全境酒店30分钟到达。先付款0元・完全到达后当面付款（现金/银联信用卡均可）。微信/WhatsApp支持。',
    url: 'https://abam.kr/cn',
    siteName: 'Abam Thai Homecare Seoul',
    images: [{ url: 'https://abam.kr/images/hero_sensual_goddess.jpg', width: 730, height: 620, alt: '首尔酒店上门按摩' }],
  },
};

const WHATSAPP_LINK = 'https://wa.me/821066072239?text=%E4%BD%A0%E5%A5%BD%EF%BC%8C%E6%88%91%E6%83%B3%E5%92%A8%E8%AF%A2%E9%A6%96%E5%B0%94%E9%85%92%E5%BA%97%E4%B8%8A%E9%97%A8%E6%8C%89%E6%91%A9%E6%9C%8D%E5%8A%A1%E3%80%82';
const PHONE_TEL = 'tel:+82-10-6607-2239';
const PHONE_DISPLAY = '+82 10-6607-2239';

const CN_COURSES = [
  {
    id: 'thai',
    name: '正统泰式干式指压理疗',
    tag: '卧佛寺皇家指压·全身经络拉伸',
    badge: '不涂精油·穿纯棉管理服',
    img: '/images/thai.jpg',
    desc: '不使用精油，换上舒适纯棉管理服进行的卧佛寺正统干式理疗。深层缓解旅途劳顿，改善骨盆肩颈疲劳。',
    prices: [
      { time: '60分钟', price: '130,000韩元 (约¥680)' },
      { time: '90分钟', price: '150,000韩元 (约¥790)', isBest: true },
      { time: '120分钟 (2小时)', price: '170,000韩元 (约¥890)' },
    ],
  },
  {
    id: 'healing',
    name: '感性舒缓治愈理疗',
    tag: '细腻触感·深层心灵舒缓',
    badge: '调理自律神经·减压放松',
    img: '/images/sensual_touch.jpg',
    desc: '采用柔和细腻的理疗手法，深层舒缓紧绷神经，释放日常压力与倦怠，带来极致宁静的感性治愈。',
    prices: [
      { time: '60分钟', price: '140,000韩元 (约¥740)' },
      { time: '90分钟', price: '170,000韩元 (约¥890)', isBest: true },
      { time: '120分钟 (2小时)', price: '200,000韩元 (约¥1,050)' },
    ],
  },
  {
    id: 'aroma',
    name: '纯天然芳香淋巴SPA',
    tag: '100%纯植物顶级天然精油',
    badge: '全身淋巴循环·水嫩美肤',
    img: '/images/aroma.jpg',
    desc: '选用随体温融化的顶级天然植物精油，温和疏通全身淋巴，带来芳香与温热交织的梦幻级放松体验。',
    prices: [
      { time: '60分钟', price: '140,000韩元 (约¥740)' },
      { time: '90分钟', price: '160,000韩元 (约¥840)', isBest: true },
      { time: '120分钟 (2小时)', price: '190,000韩元 (约¥1,000)' },
    ],
  },
  {
    id: 'special',
    name: '特选双重融合全效套餐',
    tag: '泰式干压 ＋ 芳香精油双效合一',
    badge: '性价比之王·人气首选',
    img: '/images/sensual_care.jpg',
    desc: '先以正统泰式手法充分松解僵硬大肌肉群，随后转入芳香精油淋巴疏通，体验双重舒畅的超值精选。',
    prices: [
      { time: '60分钟', price: '150,000韩元 (约¥790)' },
      { time: '90分钟', price: '190,000韩元 (约¥1,000)', isBest: true },
      { time: '120分钟 (2小时)', price: '220,000韩元 (约¥1,150)' },
    ],
  },
  {
    id: 'vip',
    name: '尊享VIP皇家全套疗程',
    tag: '👑 最高端私人尊享·回头率第一',
    badge: '王牌技师优先派遣',
    isVip: true,
    img: '/images/hero_sensual_goddess.jpg',
    desc: '阿夜SPA倾力呈现的最高殿堂级疗程。全身深度干压+顶级精油+密集淋巴护理，为您奉献无可挑剔的私密奢享。',
    prices: [
      { time: '60分钟', price: '170,000韩元 (约¥890)' },
      { time: '90分钟', price: '210,000韩元 (约¥1,100)', isBest: true },
      { time: '120分钟 (2小时)', price: '250,000韩元 (约¥1,300)' },
    ],
  },
];

const CN_ACES = [
  {
    name: '尤娜 (Yuna)',
    age: '23岁',
    specs: '166cm · 47kg · 甜美苗条',
    role: '点单率第1 · 细腻温感淋巴特化',
    img: '/images/ace_yuna.jpg',
    badge: '招牌推荐',
  },
  {
    name: '瑞儿 (Seoa)',
    age: '24岁',
    specs: '168cm · 49kg · S型曲线好身材',
    role: '深层肌肉放松与高级精油推拿',
    img: '/images/ace_seoa.jpg',
    badge: '人气火爆',
  },
  {
    name: '知雅 (Jia)',
    age: '22岁',
    specs: '165cm · 46kg · 白皙水嫩美肌',
    role: '柔和细腻触感·极度舒缓放松',
    img: '/images/ace_jia.jpg',
    badge: '疗愈王牌',
  },
];

export default function ChinesePage() {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundImage: 'url(/images/seoul_night_sky.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center top',
      backgroundAttachment: 'fixed',
      backgroundRepeat: 'no-repeat',
      color: '#18181b',
      fontFamily: '-apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", sans-serif',
      paddingBottom: '90px',
    }}>
      {/* Top Banner */}
      <div style={{ background: '#070a10', borderBottom: '1px solid rgba(212, 175, 55, 0.45)', color: '#f3e5ab', padding: '10px 20px', textAlign: 'center', fontSize: '12px', fontWeight: 800 }}>
        🇨🇳 首尔全境及京畿道五星级酒店/公寓上门SPA · 绝无预付款（100%到达当面结账） · 30分钟急速到达 · 微信/WhatsApp/LINE均可预约
      </div>

      {/* Header */}
      <header style={{ position: 'sticky', top: 0, zIndex: 50, backgroundColor: 'rgba(255,255,255,0.98)', backdropFilter: 'blur(16px)', borderBottom: '1.5px solid rgba(212, 175, 55, 0.35)', boxShadow: '0 4px 22px rgba(0,0,0,0.18)' }}>
        <div style={{ maxWidth: '1080px', margin: '0 auto', padding: '12px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <Link href="/cn" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'linear-gradient(135deg, #090d16, #1e293b)', border: '1px solid #d4af37', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f3e5ab', fontWeight: 900, fontSize: '18px' }}>
              🌙
            </div>
            <div>
              <div style={{ fontSize: '17px', fontWeight: 950, color: '#090d16', letterSpacing: '-0.3px' }}>
                美丽之夜 <span style={{ color: '#b38728' }}>Abam (首尔高端上门SPA)</span>
              </div>
              <span style={{ fontSize: '10.5px', color: '#64748b', fontWeight: 700 }}>
                首尔酒店客房上门按摩 · 中文微信预约
              </span>
            </div>
          </Link>

          {/* Language Switcher */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#f1f5f9', padding: '4px', borderRadius: '8px' }}>
            <Link href="/" style={{ padding: '4px 10px', fontSize: '12px', fontWeight: 700, color: '#475569', textDecoration: 'none', borderRadius: '6px' }}>🇰🇷 KR</Link>
            <Link href="/en" style={{ padding: '4px 10px', fontSize: '12px', fontWeight: 700, color: '#475569', textDecoration: 'none', borderRadius: '6px' }}>🇺🇸 EN</Link>
            <Link href="/jp" style={{ padding: '4px 10px', fontSize: '12px', fontWeight: 700, color: '#475569', textDecoration: 'none', borderRadius: '6px' }}>🇯🇵 JP</Link>
            <span style={{ padding: '4px 10px', fontSize: '12px', fontWeight: 900, color: '#090d16', background: '#ffffff', borderRadius: '6px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>🇨🇳 CN</span>
          </div>

          {/* Quick Contact Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12.5px', fontWeight: 900, color: '#ffffff', backgroundColor: '#25D366', padding: '8px 16px', borderRadius: '6px', textDecoration: 'none', boxShadow: '0 2px 8px rgba(37,211,102,0.35)' }}>
              💬 WhatsApp
            </a>
            <a href={PHONE_TEL} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12.5px', fontWeight: 800, color: '#090d16', backgroundColor: '#f3e5ab', border: '1px solid #d4af37', padding: '8px 14px', borderRadius: '6px', textDecoration: 'none' }}>
              📞 电话咨询
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
                <span style={{ fontSize: '12px', fontWeight: 800, color: '#f3e5ab' }}>● 20代年轻S级管理师在岗 · 30分钟急速上门</span>
              </div>

              <div style={{ fontSize: '13px', fontWeight: 900, color: '#b38728', letterSpacing: '1px', marginBottom: '8px' }}>
                ✦ SEOUL VIP HOTEL IN-ROOM SPA ESCAPE
              </div>

              <h1 style={{ fontSize: '28px', fontWeight: 950, lineHeight: 1.35, letterSpacing: '-0.5px', margin: '0 0 16px', color: '#090d16' }}>
                在您下榻的五星级酒店客房内<br />
                <span style={{
                  background: 'linear-gradient(135deg, #b8860b 0%, #e6ca65 35%, #d4af37 70%, #996e1e 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontWeight: 950,
                  display: 'inline-block'
                }}>享受私密浪漫的极上精油SPA</span><br />
                首尔全境30分钟专车送达
              </h1>

              <p style={{ fontSize: '14.5px', color: '#334155', lineHeight: 1.7, margin: '0 0 24px' }}>
                无需韩国手机号，使用微信或WhatsApp即可一键预约。我们严选年轻高颜值20代专业管理师，带齐高级精油与卫生用品直达您的客房。<strong>100%到达当面结账，绝无任何提前汇款风险！</strong>
              </p>

              {/* 4 Guarantees */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px', marginBottom: '26px' }}>
                <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '10px 14px' }}>
                  <div style={{ fontSize: '13px', fontWeight: 900, color: '#090d16' }}>🛡️ 零定金·无任何先付</div>
                  <div style={{ fontSize: '11.5px', color: '#64748b' }}>技师到达确认后当面结账</div>
                </div>
                <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '10px 14px' }}>
                  <div style={{ fontSize: '13px', fontWeight: 900, color: '#090d16' }}>💳 现金/银联/Visa均可</div>
                  <div style={{ fontSize: '11.5px', color: '#64748b' }}>支持人民币现金/韩币/外卡刷卡</div>
                </div>
                <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '10px 14px' }}>
                  <div style={{ fontSize: '13px', fontWeight: 900, color: '#090d16' }}>🏨 首尔全境酒店覆盖</div>
                  <div style={{ fontSize: '11.5px', color: '#64748b' }}>江南、明洞、东大门、弘大、京畿道</div>
                </div>
                <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '10px 14px' }}>
                  <div style={{ fontSize: '13px', fontWeight: 900, color: '#090d16' }}>💬 微信即时沟通</div>
                  <div style={{ fontSize: '11.5px', color: '#64748b' }}>添加微信 Abam1004 立即预约</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#25D366', color: '#ffffff', fontWeight: 900, fontSize: '15px', padding: '14px 28px', borderRadius: '10px', textDecoration: 'none', boxShadow: '0 4px 16px rgba(37,211,102,0.45)' }}>
                  💬 WhatsApp 立即预约 (晚上7点至凌晨4点可预约中文对应)
                </a>
                <a href={PHONE_TEL} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#090d16', color: '#f3e5ab', fontWeight: 900, fontSize: '15px', padding: '14px 24px', borderRadius: '10px', textDecoration: 'none', border: '1px solid #d4af37', boxShadow: '0 4px 14px rgba(0,0,0,0.2)' }}>
                  📞 电话: {PHONE_DISPLAY}
                </a>
              </div>
            </div>

            {/* Right Photo Card */}
            <div style={{ position: 'relative', borderRadius: '18px', overflow: 'hidden', height: '420px', boxShadow: '0 16px 36px rgba(0,0,0,0.22)', border: '1.5px solid rgba(212, 175, 55, 0.4)' }}>
              <Image
                src="/images/hero_sensual_goddess.jpg"
                alt="首尔酒店上门精油按摩"
                fill
                style={{ objectFit: 'cover' }}
                priority
              />
              <div style={{ position: 'absolute', top: '14px', left: '14px', backgroundColor: 'rgba(9, 13, 22, 0.88)', border: '1px solid #d4af37', color: '#f3e5ab', padding: '6px 12px', borderRadius: '6px', fontSize: '11px', fontWeight: 900 }}>
                👑 1:1 酒店客房 尊享私人SPA
              </div>
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '24px 20px 16px', background: 'linear-gradient(to top, rgba(9, 13, 22, 0.95) 0%, rgba(9, 13, 22, 0.6) 70%, transparent 100%)', color: '#ffffff' }}>
                <div style={{ fontSize: '11px', color: '#e6ca65', fontWeight: 900 }}>MIDNIGHT VIP SENSUAL SPA</div>
                <div style={{ fontSize: '16px', fontWeight: 950, color: '#ffffff', margin: '4px 0 2px' }}>温热芳香精油与细腻舒缓的手法</div>
                <div style={{ fontSize: '11.5px', color: '#cbd5e1' }}>真人匹配100%保证 · 100%到达当面结账</div>
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
                今日在岗 20代年轻S级王牌管理师
              </h2>
              <p style={{ fontSize: '13px', color: '#64748b', margin: '4px 0 0' }}>
                在微信或WhatsApp预约时，您可以直接指定您心仪的管理师。
              </p>
            </div>
            <div style={{ backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', color: '#166534', padding: '6px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 800 }}>
              ● 专车随时待命（约30分钟送达酒店房间）
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '18px' }}>
            {CN_ACES.map((ace, i) => (
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
                      {ace.name} <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 700 }}>({ace.age})</span>
                    </div>
                    <div style={{ fontSize: '11.5px', color: '#475569', fontWeight: 700 }}>
                      {ace.specs}
                    </div>
                  </div>
                </div>
                <div style={{ fontSize: '12px', color: '#334155', background: '#ffffff', padding: '10px 12px', borderRadius: '8px', border: '1px solid #f1f5f9', fontWeight: 600 }}>
                  ✦ {ace.role}
                </div>
                <a href={`${WHATSAPP_LINK}&text=%E4%BD%A0%E5%A5%BD%EF%BC%8C%E6%88%91%E6%83%B3%E7%82%B9%E6%92%AD${encodeURIComponent(ace.name)}%E7%AE%A1%E7%90%86%E5%B8%88`} target="_blank" rel="noopener noreferrer" style={{ textAlign: 'center', backgroundColor: '#25D366', color: '#ffffff', fontSize: '12px', fontWeight: 900, padding: '9px 0', borderRadius: '6px', textDecoration: 'none', marginTop: 'auto' }}>
                  💬 WhatsApp点单预约 {ace.name}
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Spa Menu & Pricing */}
        <section style={{ backgroundColor: '#ffffff', borderRadius: '20px', border: '1px solid #e8e0d0', padding: '32px 28px', boxShadow: '0 12px 32px rgba(0, 0, 0, 0.28)' }}>
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <span style={{ fontSize: '11px', fontWeight: 900, color: '#b38728', backgroundColor: '#faf6ee', border: '1px solid #d4af37', padding: '3px 8px', borderRadius: '4px' }}>
              ✦ 明码实价・无任何隐形附加费
            </span>
            <h2 style={{ fontSize: '22px', fontWeight: 950, color: '#090d16', margin: '8px 0 4px' }}>
              酒店客房 SPA服务项目及价格
            </h2>
            <p style={{ fontSize: '13.5px', color: '#64748b' }}>
              包含全部车费与深夜服务费。技师到达房间后当面现金/信用卡结算。
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: '22px' }}>
            {CN_COURSES.map((course, idx) => (
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
                          {p.time} {p.isBest && <span style={{ fontSize: '10px', color: '#b38728', fontWeight: 900 }}>[热门推荐]</span>}
                        </span>
                        <span style={{ fontSize: '14.5px', fontWeight: 950, color: '#b38728' }}>{p.price}</span>
                      </div>
                    ))}
                  </div>
                  <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" style={{ display: 'block', textAlign: 'center', backgroundColor: '#25D366', color: '#ffffff', fontWeight: 900, fontSize: '13px', padding: '11px 0', borderRadius: '8px', textDecoration: 'none' }}>
                    立即预约该套餐
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Global Messengers */}
        <section style={{ backgroundColor: '#090d16', borderRadius: '20px', border: '1.5px solid #d4af37', padding: '36px 28px', color: '#ffffff', textAlign: 'center' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 950, color: '#f3e5ab', margin: '0 0 10px' }}>
            今夜在首尔，让温暖与极上香薰伴您入眠
          </h2>
          <p style={{ fontSize: '14px', color: '#cbd5e1', maxWidth: '640px', margin: '0 auto 24px', lineHeight: 1.6 }}>
            无需韩国手机号码，通过 WhatsApp 发送您的“酒店名称、房间号与心仪套餐”，即可极速安排专车送达。
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#25D366', color: '#ffffff', fontWeight: 900, fontSize: '15px', padding: '14px 28px', borderRadius: '10px', textDecoration: 'none', boxShadow: '0 4px 14px rgba(37,211,102,0.4)' }}>
              💬 WhatsApp: +82 10-6607-2239
            </a>
            <a href={PHONE_TEL} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#1e293b', border: '1px solid #d4af37', color: '#f3e5ab', fontWeight: 900, fontSize: '15px', padding: '14px 28px', borderRadius: '10px', textDecoration: 'none' }}>
              📞 国际电话: {PHONE_DISPLAY}
            </a>
          </div>
        </section>
      </main>

      {/* Fixed Bottom Bar */}
      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(255,255,255,0.98)', backdropFilter: 'blur(16px)', borderTop: '1.5px solid rgba(212, 175, 55, 0.4)', padding: '10px 16px', zIndex: 50, boxShadow: '0 -6px 25px rgba(0,0,0,0.18)' }}>
        <div style={{ maxWidth: '1080px', margin: '0 auto', display: 'flex', gap: '10px' }}>
          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" style={{ flex: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', backgroundColor: '#25D366', color: '#ffffff', fontWeight: 900, fontSize: '15px', padding: '14px 0', borderRadius: '10px', textDecoration: 'none', boxShadow: '0 2px 10px rgba(37,211,102,0.35)' }}>
            💬 WhatsApp 晚上7点至凌晨4点可预约咨询
          </a>
          <a href={PHONE_TEL} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', backgroundColor: '#090d16', color: '#f3e5ab', fontWeight: 900, fontSize: '14.5px', padding: '14px 0', borderRadius: '10px', textDecoration: 'none', border: '1px solid #d4af37' }}>
            📞 直接致电
          </a>
        </div>
      </div>
    </div>
  );
}
