'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

/* ─────────────────────────────────────────────
   常量
───────────────────────────────────────────── */
const PHONE_TEL     = 'tel:+82-10-6607-2239';
const PHONE_DISPLAY = '+82 10-6607-2239';
const WA_LINK       = 'https://wa.me/821066072239?text=%E4%BD%A0%E5%A5%BD%EF%BC%8C%E6%88%91%E6%83%B3%E5%92%A8%E8%AF%A2%E9%A6%96%E5%B0%94%E9%85%92%E5%BA%97%E4%B8%8A%E9%97%A8%E6%8C%89%E6%91%A9%E6%9C%8D%E5%8A%A1%E3%80%82';

/* ─────────────────────────────────────────────
   设计风格 (100% 纯白/浅色高级精品极简)
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
   技师数据 (精简精品名录)
───────────────────────────────────────────── */
const CN_ACES = [
  {
    name: '尤娜 (Yuna)',
    age: '23岁',
    spec: '166cm · 47kg · 甜美苗条',
    badge: '点单率第1',
    specialty: '细腻温感淋巴特化 & 浪漫感性VIP护理',
    desc: '温柔甜美的笑容与极尽轻柔细腻的指尖触感。客户复购率第一的代表招牌技师。',
    status: '专车随时待命',
    isAvailable: true,
    img: '/images/ace_yuna.jpg',
  },
  {
    name: '瑞雅 (Seoa)',
    age: '24岁',
    spec: '168cm · 49kg · S曲线身材',
    badge: '预约爆满',
    specialty: '正统泰式深层指压 + 芳香精油温热理疗',
    desc: '都市优雅气质与恰到好处的力道融合。完美兼顾泰式松骨与精油深层舒缓。',
    status: '深夜预约中',
    isAvailable: false,
    img: '/images/ace_seoa.jpg',
  },
  {
    name: '智雅 (Jia)',
    age: '22岁',
    spec: '165cm · 46kg · 白皙水嫩',
    badge: '王牌治愈',
    specialty: '柔和指法与细腻微细筋膜松解',
    desc: '温润舒适的手掌温度。彻底舒缓旅途中的全身紧绷感与精神倦怠。',
    status: '专车随时待命',
    isAvailable: true,
    img: '/images/ace_jia.jpg',
  },
];

/* ─────────────────────────────────────────────
   服务套餐·透明明码标价
   (韩国基准价 + 50,000韩元 / 人民币换算折合)
───────────────────────────────────────────── */
const CN_COURSES = [
  {
    name: '正统泰式干式指压理疗',
    subtitle: '卧佛寺皇家指压·全身经络拉伸',
    desc: '不使用精油，换上舒适纯棉管理服进行的卧佛寺正统干式理疗。深层缓解旅途劳顿，改善骨盆肩颈疲劳。',
    badge: null,
    prices: [
      { time: '60分钟', price: '130,000韩元 (约¥680)' },
      { time: '90分钟', price: '150,000韩元 (约¥790)', isBest: true },
      { time: '120分钟', price: '170,000韩元 (约¥890)' },
    ],
  },
  {
    name: '纯天然芳香淋巴SPA',
    subtitle: '100%纯植物顶级天然精油',
    desc: '选用随体温融化的顶级天然植物精油，温和疏通全身淋巴，带来芳香与温热交织的梦幻级放松体验。',
    badge: null,
    prices: [
      { time: '60分钟', price: '140,000韩元 (约¥740)' },
      { time: '90分钟', price: '160,000韩元 (约¥840)', isBest: true },
      { time: '120分钟', price: '190,000韩元 (约¥1,000)' },
    ],
  },
  {
    name: '感性舒缓治愈理疗',
    subtitle: '细腻触感·调理神经舒压放松',
    desc: '采用柔和细腻的理疗手法，深层舒缓紧绷神经，释放日常压力与倦怠，带来极致宁静的感性治愈。',
    badge: '推荐',
    prices: [
      { time: '60分钟', price: '140,000韩元 (约¥740)' },
      { time: '90分钟', price: '170,000韩元 (约¥890)', isBest: true },
      { time: '120分钟', price: '200,000韩元 (约¥1,050)' },
    ],
  },
  {
    name: '特选双重融合全效套餐',
    subtitle: '泰式干压 ＋ 芳香精油双效合一',
    desc: '先以正统泰式手法充分松解僵硬大肌肉群，随后转入芳香精油淋巴疏通，体验双重舒畅的超值精选。',
    badge: '人气第1',
    prices: [
      { time: '60分钟', price: '150,000韩元 (约¥790)' },
      { time: '90分钟', price: '190,000韩元 (约¥1,000)', isBest: true },
      { time: '120分钟', price: '220,000韩元 (约¥1,150)' },
    ],
  },
  {
    name: '尊享VIP皇家全套疗程',
    subtitle: '全身深度干压 + 顶级精油 + 密集淋巴护理',
    desc: '阿夜SPA倾力呈现的最高殿堂级疗程。王牌技师专职派遣，为您奉献无可挑剔的私密奢享。',
    badge: 'BEST',
    prices: [
      { time: '60分钟', price: '170,000韩元 (约¥890)' },
      { time: '90分钟', price: '210,000韩元 (约¥1,100)', isBest: true },
      { time: '120分钟', price: '250,000韩元 (约¥1,300)' },
    ],
  },
];

/* ─────────────────────────────────────────────
   真实客户评价
───────────────────────────────────────────── */
const CN_REVIEWS = [
  {
    author: '王先生',
    area: '江南区五星级酒店',
    course: 'VIP皇家全套 90分钟 (尤娜)',
    text: '首尔出差入住酒店体验。无需预付定金这点让人非常放心。尤娜技师25分钟就到了，携带全套消毒用品，手法极其专业细致，彻底解除了长途飞行的疲惫。',
  },
  {
    author: '张女士',
    area: '明洞商圈酒店',
    course: '特选双重融合 90分钟',
    text: '先干压后精油的搭配太舒服了。完全不需要韩国电话卡，用WhatsApp就能用中文流畅沟通，到达后刷银联卡付款，非常安全便利。',
  },
  {
    author: '刘先生',
    area: '汝矣岛酒店',
    course: 'VIP皇家全套 120分钟 (瑞雅)',
    text: '深夜预约响应非常迅速，技师相貌气质和照片完全一致。环境安静，服务周到，强烈推荐给在首尔旅行出差的朋友。',
  },
];

/* ─────────────────────────────────────────────
   常见问题 (FAQ)
───────────────────────────────────────────── */
const CN_FAQS = [
  {
    q: '首尔市内的所有酒店客房都可以上门吗？',
    a: '是的，江南、明洞、东大门、弘大、汝矣岛、梨泰院等首尔特别市全部25个区域的酒店、公寓式客房、Airbnb均可服务，专车约20~30分钟急速送达。',
  },
  {
    q: '预约需要提前支付定金或押金吗？',
    a: '绝对不需要！我们严格实行“100%到达后当面付款”原则。技师到达您的客房并核实后才进行结算，彻底杜绝任何网络欺诈风险。',
  },
  {
    q: '预约后多久可以到达客房？',
    a: '我们在首尔各核心商圈均设有待命调度中心，预约确认后通常20~30分钟内即可送达。出发时会通过WhatsApp告知您准确预计到达时间。',
  },
  {
    q: '支持哪些付款方式？',
    a: '支持各类国际信用卡（Visa, MasterCard, 银联UnionPay, Amex, JCB）、韩币现金、人民币现金均可。现场可提供正规收据凭证。',
  },
  {
    q: '照片上的技师是否为本人出勤？',
    a: '是的，我们严格执行实物照片100%一致原则。若您指定了特定技师（尤娜、瑞雅、智雅等），必由该技师本人亲自上门服务。',
  },
  {
    q: '在客房内需要自行准备什么吗？',
    a: '无需准备任何物品。技师上门自带一次性卫生消毒床垫（绝不弄脏酒店床单）、纯棉专属管理服、顶级天然精油等全套专业备品。',
  },
];

/* ─────────────────────────────────────────────
   热门搜索区域
───────────────────────────────────────────── */
const SEO_AREAS = [
  '首尔 酒店上门按摩', '江南 酒店SPA', '明洞 酒店上门按摩', '弘大 精油按摩',
  '东大门 酒店上门', '汝矣岛 上门按摩', '首尔 中文预约 按摩', '首尔 无定金 酒店按摩',
  '首尔 深夜 24小时SPA', '韩国 酒店客房按摩'
];

/* ─────────────────────────────────────────────
   主页面组件
───────────────────────────────────────────── */
export default function CnPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: C.bg, color: C.dark, paddingBottom: '96px' }}>

      {/* ── 顶部公告栏 ── */}
      <div style={{ backgroundColor: C.bgSoft, borderBottom: `1px solid ${C.border}`, padding: '8px 16px', textAlign: 'center', fontSize: '12px', color: C.mid }}>
        首尔全境20~30分钟到达 · <strong style={{ color: C.dark }}>无任何预付定金（100%到达后当面结账）</strong>
      </div>

      {/* ── 顶部导航栏 ── */}
      <header style={{ position: 'sticky', top: 0, zIndex: 40, backgroundColor: 'rgba(255, 255, 255, 0.98)', backdropFilter: 'blur(12px)', borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: '640px', margin: '0 auto', padding: '12px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: '17px', fontWeight: 900, color: C.dark, letterSpacing: '-0.3px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span>美丽之夜 Abam</span>
              <span style={{ fontSize: '11px', fontWeight: 800, color: C.accent, backgroundColor: C.accentBg, padding: '2px 6px', borderRadius: '4px' }}>阿夜</span>
            </div>
            <div style={{ fontSize: '10.5px', color: C.muted, fontWeight: 500 }}>首尔高端酒店客房VIP上门精油SPA</div>
          </div>

          {/* 语言切换 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '3px', backgroundColor: C.bgSoft, padding: '3px', borderRadius: '6px' }}>
            <Link href="/" style={{ fontSize: '11px', color: C.muted, padding: '3px 6px', textDecoration: 'none' }}>KR</Link>
            <Link href="/en" style={{ fontSize: '11px', color: C.muted, padding: '3px 6px', textDecoration: 'none' }}>EN</Link>
            <Link href="/jp" style={{ fontSize: '11px', color: C.muted, padding: '3px 6px', textDecoration: 'none' }}>JP</Link>
            <span style={{ fontSize: '11px', fontWeight: 900, color: C.dark, backgroundColor: '#ffffff', padding: '3px 7px', borderRadius: '4px', boxShadow: '0 1px 2px rgba(0,0,0,0.06)' }}>CN</span>
          </div>
        </div>

        {/* ── 快捷导航锚点栏 ── */}
        <div style={{ maxWidth: '640px', margin: '0 auto', padding: '0 18px 8px', display: 'flex', gap: '6px', overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
          <button
            onClick={() => scrollTo('courses')}
            style={{ padding: '5px 11px', borderRadius: '20px', backgroundColor: C.bgSoft, border: `1px solid ${C.border}`, fontSize: '11.5px', fontWeight: 800, color: C.mid, whiteSpace: 'nowrap' }}
          >
            📋 套餐·价目表
          </button>
          <button
            onClick={() => scrollTo('therapists')}
            style={{ padding: '5px 11px', borderRadius: '20px', backgroundColor: C.bgSoft, border: `1px solid ${C.border}`, fontSize: '11.5px', fontWeight: 800, color: C.mid, whiteSpace: 'nowrap' }}
          >
            👤 技师介绍
          </button>
          <button
            onClick={() => scrollTo('how-it-works')}
            style={{ padding: '5px 11px', borderRadius: '20px', backgroundColor: C.bgSoft, border: `1px solid ${C.border}`, fontSize: '11.5px', fontWeight: 800, color: C.mid, whiteSpace: 'nowrap' }}
          >
            🛡️ 预约流程
          </button>
          <button
            onClick={() => scrollTo('faq')}
            style={{ padding: '5px 11px', borderRadius: '20px', backgroundColor: C.bgSoft, border: `1px solid ${C.border}`, fontSize: '11.5px', fontWeight: 800, color: C.mid, whiteSpace: 'nowrap' }}
          >
            ❓ 常见问题
          </button>
        </div>
      </header>

      {/* ── 主体内容 ── */}
      <main style={{ maxWidth: '640px', margin: '0 auto', padding: '0 18px' }}>

        {/* ── 1. 首屏视觉 ── */}
        <section style={{ paddingTop: '24px', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 800, color: C.accent, backgroundColor: C.accentBg, padding: '4px 12px', borderRadius: '20px', marginBottom: '14px' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: C.green }} />
            首尔全境20~30分钟到达 · 100%到达后当面结账
          </div>

          <h1 style={{ fontSize: '26px', fontWeight: 950, lineHeight: 1.35, color: C.dark, margin: '0 0 10px', letterSpacing: '-0.5px' }}>
            首尔旅途疲惫尽消，<br />
            尽享私密尊贵客房SPA
          </h1>

          <p style={{ fontSize: '13.5px', color: C.mid, lineHeight: 1.65, margin: '0 auto 20px', maxWidth: '440px' }}>
            严选高颜值20代年轻专业技师直达您的客房。
            坚持<strong>100%到达当面结账（零定金、无预付）</strong>原则，安全放心。
          </p>

          {/* 2大核心CTA */}
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
              💬 WhatsApp 中文预约
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

          {/* 视觉图 */}
          <div style={{ position: 'relative', width: '100%', height: '220px', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
            <Image src="/images/hero_sensual_goddess.jpg" alt="首尔酒店客房上门按摩" fill style={{ objectFit: 'cover' }} priority />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '14px 16px', background: 'linear-gradient(to top, rgba(15, 23, 42, 0.8), transparent)', color: '#ffffff', textAlign: 'left' }}>
              <div style={{ fontSize: '11px', color: '#fef08a', fontWeight: 800, letterSpacing: '0.5px' }}>SEOUL VIP HOTEL SPA</div>
              <div style={{ fontSize: '14.5px', fontWeight: 900 }}>温润高级精油与细腻舒压的极致呵护</div>
            </div>
          </div>
        </section>

        {/* ── 分割线 ── */}
        <div style={{ height: '1px', backgroundColor: C.border, margin: '36px 0 28px' }} />

        {/* ── 2. 服务套餐·价目表 ── */}
        <section id="courses">
          <div style={{ marginBottom: '16px' }}>
            <div style={{ fontSize: '11px', fontWeight: 800, color: C.accent, letterSpacing: '0.8px' }}>SPA MENU &amp; TRANSPARENT RATES</div>
            <h2 style={{ fontSize: '19px', fontWeight: 900, color: C.dark, margin: '2px 0 4px' }}>精选套餐·明码标价</h2>
            <p style={{ fontSize: '12px', color: C.muted, margin: 0 }}>
              零预付定金 · 技师到达客房当面结账（支持刷卡 / 现金 / 银联 / 韩币）
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {CN_COURSES.map((course, i) => (
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

                {/* 3段价格按钮 (点击直接打开WhatsApp) */}
                <div style={{ display: 'flex', gap: '6px', paddingTop: '8px', borderTop: `1px solid ${C.borderLt}`, marginTop: '4px' }}>
                  {course.prices.map((p, pi) => (
                    <a
                      key={pi}
                      href={`https://wa.me/821066072239?text=${encodeURIComponent(`你好，我想预约【${course.name}】(${p.time})。`)}`}
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
                        {p.time} {p.isBest && '★人气'}
                      </div>
                      <div style={{ fontSize: '12px', fontWeight: 900, color: p.isBest ? '#dc2626' : C.dark, marginTop: '1px' }}>
                        {p.price}
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* 3大清洁卫生保障 */}
          <div style={{ marginTop: '14px', padding: '14px 16px', backgroundColor: C.bgSoft, borderRadius: '12px', border: `1px solid ${C.border}` }}>
            <div style={{ fontSize: '12px', fontWeight: 900, color: C.dark, marginBottom: '6px', textAlign: 'center' }}>
              ✨ 3大安心清洁与卫生承诺
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '6px', fontSize: '11.5px', color: C.mid, lineHeight: 1.5 }}>
              <div>• <strong>携带一次性卫生消毒床垫</strong>（绝不弄脏酒店床单）</div>
              <div>• <strong>100%水溶性天然植物精油</strong>（清爽温和易洗净）</div>
              <div>• <strong>提供舒适纯棉管理服</strong>（包含首尔全境出车费）</div>
            </div>
          </div>
        </section>

        {/* ── 分割线 ── */}
        <div style={{ height: '1px', backgroundColor: C.border, margin: '36px 0 28px' }} />

        {/* ── 3. 今夜在岗王牌技师 ── */}
        <section id="therapists">
          <div style={{ marginBottom: '16px' }}>
            <div style={{ fontSize: '11px', fontWeight: 800, color: C.accent, letterSpacing: '0.8px' }}>TONIGHT'S THERAPISTS</div>
            <h2 style={{ fontSize: '19px', fontWeight: 900, color: C.dark, margin: '2px 0 4px' }}>今夜出勤 代表技师</h2>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '12px', color: C.green, fontWeight: 700 }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: C.green }} />
              首尔各片区30余名专业技师常时待命
            </div>
          </div>

          {/* 精简横向卡片 (手机端优化) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {CN_ACES.map((t, i) => (
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
                {/* 缩略图 */}
                <div style={{ position: 'relative', width: '92px', height: '115px', borderRadius: '10px', overflow: 'hidden', flexShrink: 0 }}>
                  <Image src={t.img} alt={t.name} fill style={{ objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', top: '6px', left: '6px', backgroundColor: 'rgba(15, 23, 42, 0.85)', color: '#fef08a', fontSize: '9.5px', fontWeight: 800, padding: '2px 5px', borderRadius: '4px' }}>
                    {t.badge}
                  </div>
                </div>

                {/* 技师详情与预约 */}
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
                      {t.isAvailable ? '● 即可出车' : '○ 预约排班'}
                    </span>

                    <div style={{ display: 'flex', gap: '4px' }}>
                      <a
                        href={`https://wa.me/821066072239?text=${encodeURIComponent(`你好，我想指定【${t.name}】技师预约酒店客房按摩。`)}`}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          backgroundColor: '#25D366', color: '#ffffff',
                          fontSize: '11px', fontWeight: 900, padding: '5px 9px', borderRadius: '6px',
                          textDecoration: 'none',
                        }}
                      >
                        指定预约
                      </a>
                      <a
                        href={PHONE_TEL}
                        style={{
                          backgroundColor: C.dark, color: '#ffffff',
                          fontSize: '11px', fontWeight: 800, padding: '5px 9px', borderRadius: '6px',
                          textDecoration: 'none',
                        }}
                      >
                        致电
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 30名待命提示 */}
          <div style={{ marginTop: '12px', padding: '12px 14px', backgroundColor: C.bgSoft, border: `1px solid ${C.border}`, borderRadius: '10px', fontSize: '12px', color: C.mid, lineHeight: 1.55 }}>
            <strong style={{ color: C.dark }}>首尔全境常驻30余名专业理疗师随时候命</strong><br />
            除上述展示的代表招牌技师外，各商圈据点还有多位不同风格（泰式深层重压、温柔感性等）的技师在岗。预约时可随时告知您偏好的类型。
          </div>
        </section>

        {/* ── 分割线 ── */}
        <div style={{ height: '1px', backgroundColor: C.border, margin: '36px 0 28px' }} />

        {/* ── 4. 轻松预约3步流程 ── */}
        <section id="how-it-works">
          <div style={{ marginBottom: '16px' }}>
            <div style={{ fontSize: '11px', fontWeight: 800, color: C.accent, letterSpacing: '0.8px' }}>HOW IT WORKS</div>
            <h2 style={{ fontSize: '19px', fontWeight: 900, color: C.dark, margin: '2px 0 4px' }}>轻松预约 3步完成</h2>
            <p style={{ fontSize: '12px', color: C.muted, margin: 0 }}>无需韩国手机号码 · 30秒即可完成预约</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {[
              { no: '01', title: '通过WhatsApp咨询', desc: '发送您的酒店名称、房间号与心仪套餐，客服将立即为您确认并调度。' },
              { no: '02', title: '20~30分钟送达客房', desc: '就近区域专属技师随身携带全套消毒备品，专车静音送达客房门前。' },
              { no: '03', title: '见面核实后当面结算', desc: '确认技师本人到达后当面付款（现金或刷卡），安心享受尊贵放松护理。' },
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

          {/* 零定金保证横幅 */}
          <div style={{ marginTop: '12px', padding: '13px 15px', backgroundColor: C.greenBg, border: `1px solid ${C.greenBd}`, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
            <div>
              <div style={{ fontSize: '12.5px', fontWeight: 900, color: '#166534' }}>绝无提前定金·100%见面付款保证</div>
              <div style={{ fontSize: '11px', color: '#14532d', marginTop: '2px' }}>到达前绝不收取哪怕1分钱预付款，杜绝任何风险。</div>
            </div>
            <a href={WA_LINK} target="_blank" rel="noreferrer" style={{ backgroundColor: '#166534', color: '#ffffff', padding: '7px 12px', borderRadius: '7px', fontSize: '11.5px', fontWeight: 800, textDecoration: 'none', whiteSpace: 'nowrap' }}>
              WhatsApp
            </a>
          </div>
        </section>

        {/* ── 分割线 ── */}
        <div style={{ height: '1px', backgroundColor: C.border, margin: '36px 0 28px' }} />

        {/* ── 5. 真实客户评价 ── */}
        <section>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '14px' }}>
            <div>
              <div style={{ fontSize: '11px', fontWeight: 800, color: C.accent, letterSpacing: '0.8px' }}>GUEST REVIEWS</div>
              <h2 style={{ fontSize: '19px', fontWeight: 900, color: C.dark, margin: '2px 0 0' }}>真实房客口碑评价</h2>
            </div>
            <div style={{ fontSize: '12px', color: C.accent, fontWeight: 800 }}>★ 5.0满分好评</div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {CN_REVIEWS.map((rev, i) => (
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

        {/* ── 分割线 ── */}
        <div style={{ height: '1px', backgroundColor: C.border, margin: '36px 0 28px' }} />

        {/* ── 6. 常见问题 (FAQ折叠面板) ── */}
        <section id="faq">
          <div style={{ marginBottom: '16px' }}>
            <div style={{ fontSize: '11px', fontWeight: 800, color: C.accent, letterSpacing: '0.8px' }}>FREQUENTLY ASKED QUESTIONS</div>
            <h2 style={{ fontSize: '19px', fontWeight: 900, color: C.dark, margin: '2px 0 4px' }}>常见问题解答 (FAQ)</h2>
            <p style={{ fontSize: '12px', color: C.muted, margin: 0 }}>针对在韩商旅及观光住客的快速答疑。</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {CN_FAQS.map((faq, i) => {
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

        {/* ── 分割线 ── */}
        <div style={{ height: '1px', backgroundColor: C.border, margin: '32px 0 24px' }} />

        {/* ── 7. 区域服务网络页脚 ── */}
        <footer style={{ paddingBottom: '24px' }}>
          <div style={{ fontSize: '12px', fontWeight: 800, color: C.dark, marginBottom: '6px' }}>
            首尔全境 酒店客房VIP上门精油SPA 网络
          </div>
          <p style={{ fontSize: '11px', color: C.muted, lineHeight: 1.6, margin: '0 0 10px' }}>
            覆盖江南、明洞、东大门、弘大、汝矣岛、梨泰院等首尔全部25区，专车20~30分钟急速到达。
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px 8px', fontSize: '11px' }}>
            {SEO_AREAS.map((area, i) => (
              <span key={i} style={{ color: '#64748b' }}>
                {area}
              </span>
            ))}
          </div>

          <div style={{ marginTop: '18px', paddingTop: '14px', borderTop: `1px solid ${C.border}`, fontSize: '10.5px', color: C.muted, lineHeight: 1.6 }}>
            <strong>美丽之夜 Abam (阿夜SPA)</strong> · 首尔特别市全境五星级酒店客房上门服务 · 100%到达见面结账（无先付） · WhatsApp中文客服 &amp; 电话 {PHONE_DISPLAY}
          </div>
        </footer>

      </main>

      {/* ── 底部固定快捷预约栏 ── */}
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
            💬 WhatsApp 中文即时预约
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
            致电咨询
          </a>
        </div>
      </div>

    </div>
  );
}
