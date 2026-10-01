'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

/* ─────────────────────────────────────────────
   定数
───────────────────────────────────────────── */
const PHONE_TEL     = 'tel:+82-10-6607-2239';
const PHONE_DISPLAY = '+82 10-6607-2239';
const WA_LINK       = 'https://wa.me/821066072239?text=%E3%81%93%E3%82%93%E3%81%AB%E3%81%A1%E3%81%AF%E3%80%81%E3%82%BD%E3%82%A6%E3%83%AB%E3%81%AE%E3%83%9B%E3%83%86%E3%83%AB%E5%87%BA%E5%BC%B5%E3%83%9E%E3%83%83%E3%82%94%E3%83%BC%E3%82%B8%E3%81%AE%E4%BA%88%E7%B4%84%E3%82%92%E3%81%8A%E9%A1%98%E3%81%84%E3%81%97%E3%81%9F%E3%81%84%E3%81%A7%E3%81%99%E3%80%82';

/* ─────────────────────────────────────────────
   デザイントークン (100% ホワイト/ライトモード)
───────────────────────────────────────────── */
const C = {
  bg:          'transparent',
  card:        'rgba(15, 23, 42, 0.75)',
  cardHover:   'rgba(30, 41, 59, 0.85)',
  border:      'rgba(255, 255, 255, 0.12)',
  borderLt:    'rgba(255, 255, 255, 0.08)',
  dark:        '#ffffff',
  mid:         '#e2e8f0',
  muted:       '#94a3b8',
  accent:      '#fbbf24',
  accentBg:    'rgba(245, 158, 11, 0.18)',
  accentBd:    'rgba(245, 158, 11, 0.35)',
  kakao:       '#FEE500',
  kakaoBr:     '#181600',
  green:       '#22c55e',
  greenBg:     'rgba(34, 197, 94, 0.15)',
  greenBd:     'rgba(34, 197, 94, 0.35)',
};

/* ─────────────────────────────────────────────
   セラピストデータ (コンパクト精鋭名簿)
───────────────────────────────────────────── */
const JP_ACES = [
  {
    name: 'ユナ (Yuna)',
    age: '23歳',
    spec: '166cm · 47kg · スレンダー美形',
    badge: '指名No.1',
    specialty: '密着センシュアルリンパ特化 & VIPシグネチャー',
    desc: '愛嬌ある笑顔と極上の繊細なハンドタッチ。指名予約率ダントツNo.1の看板エース。',
    status: '即時配車可能',
    isAvailable: true,
    img: '/images/ace_yuna.jpg',
  },
  {
    name: 'ソア (Seoa)',
    age: '24歳',
    spec: '168cm · 49kg · Sライングラマー',
    badge: '予約殺到',
    specialty: 'ワットポー正統ドライ指圧 + 極上温感アロマオイル',
    desc: '洗練された美貌と深い圧の絶妙な調和。しっかりしたドライ指圧と滑らかなオイルケアを両立。',
    status: '深夜予約受付中',
    isAvailable: false,
    img: '/images/ace_seoa.jpg',
  },
  {
    name: 'ジア (Jia)',
    age: '22歳',
    spec: '165cm · 46kg · 美肌スレンダー',
    badge: 'エースヒーラー',
    specialty: 'ソフトなタッチと繊細な筋膜リリース',
    desc: '肌を優しく滑る心地よい温もり。凝り固まった旅の緊張を優しく解き放つ人気ヒーラー。',
    status: '即時配車可能',
    isAvailable: true,
    img: '/images/ace_jia.jpg',
  },
];

/* ─────────────────────────────────────────────
   施術メニュー・定額料金表
   (韓国内基準価格 + 50,000ウォン加算 / 日本円換算併記)
───────────────────────────────────────────── */
const JP_COURSES = [
  {
    name: '本場タイ伝統指圧ケア',
    subtitle: 'ワットポー王室直伝・ドライ全身指圧',
    desc: '清潔な純綿ウェアを着用して行う本格ドライ指圧。首肩の凝りや腰の張り、旅の時差ボケを爽快にほぐします。',
    badge: null,
    prices: [
      { time: '60分', price: '130,000ウォン (約14,500円)' },
      { time: '90分', price: '150,000ウォン (約16,800円)', isBest: true },
      { time: '120分', price: '170,000ウォン (約19,000円)' },
    ],
  },
  {
    name: '天然アロマリンパセラピー',
    subtitle: '100%植物性最高級エッセンシャルオイル',
    desc: '体温でとろける最高級天然オイルで全身のリンパを丁寧に流し、むくみの解消と深い熟睡を促します。',
    badge: null,
    prices: [
      { time: '60分', price: '140,000ウォン (約15,600円)' },
      { time: '90分', price: '160,000ウォン (約17,900円)', isBest: true },
      { time: '120分', price: '190,000ウォン (約21,200円)' },
    ],
  },
  {
    name: 'ヒーリング感性アロマケア',
    subtitle: '繊細なハンドタッチ・自律神経リラックス',
    desc: '心身の疲労と緊張をやさしく包み込む繊細なタッチで、日々のストレスを心地よく溶かす感性トリートメント。',
    badge: 'おすすめ',
    prices: [
      { time: '60分', price: '140,000ウォン (約15,600円)' },
      { time: '90分', price: '170,000ウォン (約19,000円)', isBest: true },
      { time: '120分', price: '200,000ウォン (約22,400円)' },
    ],
  },
  {
    name: 'スペシャルデュアル融合コース',
    subtitle: '本格タイ指圧 ＋ アロマリンパの贅沢ミックス',
    desc: 'しっかりしたドライ指圧で大筋肉群を緩めた後、滑らかなアロマオイルケアへ移行する満足度No.1複合コース。',
    badge: '人気No.1',
    prices: [
      { time: '60分', price: '150,000ウォン (約16,800円)' },
      { time: '90分', price: '190,000ウォン (約21,200円)', isBest: true },
      { time: '120分', price: '220,000ウォン (約24,600円)' },
    ],
  },
  {
    name: 'プレミアムVIPシグネチャー',
    subtitle: '全身指圧 ＋ 特級アロマ ＋ 集中リンパフルケア',
    desc: '最高峰エースセラピスト専任配属。全身ドライ指圧から天然オイルトリートメントまで贅を尽くした至福のスパ体験。',
    badge: 'BEST',
    prices: [
      { time: '60分', price: '170,000ウォン (約19,000円)' },
      { time: '90分', price: '210,000ウォン (約23,500円)', isBest: true },
      { time: '120分', price: '250,000ウォン (約28,000円)' },
    ],
  },
];

/* ─────────────────────────────────────────────
   お客様の口コミ
───────────────────────────────────────────── */
const JP_REVIEWS = [
  {
    author: 'T. Sato 様',
    area: '江南エリア 5つ星ホテル',
    course: 'VIPシグネチャー 90分 (ユナさん)',
    text: 'ソウル出張時に利用しました。事前振込が一切なく、到着後にカード決済できるので安心でした。ユナさんの丁寧な施術と心地よい力加減で長旅の疲れが一気に吹き飛びました。',
  },
  {
    author: 'M. Tanaka 様',
    area: '明洞エリア ホテル',
    course: 'スペシャルデュアル 90分',
    text: 'タイ指圧でしっかり肩をほぐしてもらった後のアロマオイルが最高でした。清潔なウェアや使い捨てシーツ持参で部屋を汚す心配もなく、とても清潔感がありました。',
  },
  {
    author: 'K. Watanabe 様',
    area: '汝矣島 ホテル',
    course: 'VIPシグネチャー 120分 (ソアさん)',
    text: 'WhatsAppで日本語でやり取りできて助かりました。深夜の予約でしたが25分ほどで来てくださり、非常に満足度の高いリラックスタイムを過ごせました。',
  },
];

/* ─────────────────────────────────────────────
   よくある質問 (FAQ)
───────────────────────────────────────────── */
const JP_FAQS = [
  {
    q: 'ソウル市内のホテルならどこでも訪問可能ですか？',
    a: 'はい、江南、明洞、東大門、弘大、汝矣島、梨泰院をはじめとするソウル特別市25区全域のホテル、レジデンス、Airbnb客室へ約20〜30分で迅速にお伺いいたします。',
  },
  {
    q: '予約時に前金や事前振込は必要ですか？',
    a: '一切不要です。当店は「100%完全現地対面決済」を厳格に徹底しております。セラピストがお部屋に到着し、直接ご挨拶を交わしてからお支払いいただきますので安心です。',
  },
  {
    q: '予約から到着までどのくらい時間がかかりますか？',
    a: 'ソウル市内各所の主要拠点に専門セラピストが待機しておりますので、予約確定後平均20〜30分前後でお伺いします。出発時に到着予定時刻をWhatsAppにてお知らせいたします。',
  },
  {
    q: 'どのような決済方法に対応していますか？',
    a: '日本の各種クレジットカード（Visa, Mastercard, JCB, Amex）、韓国ウォン現金、日本円現金、いずれもご利用いただけます。その場で領収書の発行も可能です。',
  },
  {
    q: '写真のセラピストが本当に来ますか？',
    a: 'はい、100%実物写真一致を厳守しております。ご希望のセラピスト（ユナ、ソア、ジア等）をご指名いただいた場合、必ずご指名いただいた本人が直接お伺いします。',
  },
  {
    q: '部屋で何か準備するものはありますか？',
    a: 'お客様にご用意いただくものは一切ございません。ベッドを汚さない1回用衛生シーツ、清潔な専用純綿ウェア、最高級天然オイルをすべて持参してお伺いいたします。',
  },
];

/* ─────────────────────────────────────────────
   人気検索エリア
───────────────────────────────────────────── */
const SEO_AREAS = [
  'ソウル ホテル 出張マッサージ', 'カンナム ホテル マッサージ', '明洞 客室 出張マッサージ', '弘大 ホテル アロマSPA',
  '東大門 出張マッサージ', '汝矣島 ホテル マッサージ', 'ソウル 日本語 出張マッサージ', '事前振込なし 出張マッサージ',
  'ソウル 深夜 ホテル マッサージ', '韓国 ホテル 出張エステ'
];

/* ─────────────────────────────────────────────
   メインコンポーネント
───────────────────────────────────────────── */
export default function JpPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: 'transparent',
      backgroundImage: "linear-gradient(180deg, rgba(6, 9, 19, 0.42) 0%, rgba(6, 9, 19, 0.62) 50%, rgba(6, 9, 19, 0.84) 100%), url('/images/seoul_night_sky.jpg')",
      backgroundSize: 'cover',
      backgroundPosition: 'center top',
      backgroundAttachment: 'fixed',
      backgroundRepeat: 'no-repeat',
      color: '#f8fafc',
      paddingBottom: '96px',
    }}>

      {/* ── 最上部アナウンスバー ── */}
      <div style={{ backgroundColor: 'rgba(10, 15, 29, 0.78)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', borderBottom: `1px solid ${C.border}`, padding: '8px 16px', textAlign: 'center', fontSize: '12px', color: C.mid }}>
        ソウル全域20〜30分到着 · <strong style={{ color: C.dark }}>先払い・前受金ゼロ（100%完全現地対面決済）</strong>
      </div>

      {/* ── ヘッダー ── */}
      <header style={{ position: 'sticky', top: 0, zIndex: 40, backgroundColor: 'rgba(10, 15, 29, 0.85)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: '640px', margin: '0 auto', padding: '12px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: '17px', fontWeight: 900, color: C.dark, letterSpacing: '-0.3px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span>美しい夜 Abam</span>
              <span style={{ fontSize: '11px', fontWeight: 800, color: C.accent, backgroundColor: C.accentBg, padding: '2px 6px', borderRadius: '4px' }}>アバム</span>
            </div>
            <div style={{ fontSize: '10.5px', color: C.muted, fontWeight: 500 }}>ソウル高級ホテル客室VIP出張マッサージ</div>
          </div>

          {/* 言語スイッチャー */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '3px', backgroundColor: 'rgba(255, 255, 255, 0.08)', padding: '3px', borderRadius: '6px' }}>
            <Link href="/" style={{ fontSize: '11px', color: C.muted, padding: '3px 6px', textDecoration: 'none' }}>KR</Link>
            <Link href="/en" style={{ fontSize: '11px', color: C.muted, padding: '3px 6px', textDecoration: 'none' }}>EN</Link>
            <span style={{ fontSize: '11px', fontWeight: 900, color: C.dark, backgroundColor: C.card, backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', padding: '3px 7px', borderRadius: '4px', boxShadow: '0 1px 2px rgba(0,0,0,0.06)' }}>JP</span>
            <Link href="/cn" style={{ fontSize: '11px', color: C.muted, padding: '3px 6px', textDecoration: 'none' }}>CN</Link>
          </div>
        </div>

        {/* ── クイックナビゲーションアンカー ── */}
        <div style={{ maxWidth: '640px', margin: '0 auto', padding: '0 18px 8px', display: 'flex', gap: '6px', overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
          <button
            onClick={() => scrollTo('courses')}
            style={{ padding: '5px 11px', borderRadius: '20px', backgroundColor: 'rgba(255, 255, 255, 0.08)', border: `1px solid ${C.border}`, fontSize: '11.5px', fontWeight: 800, color: C.mid, whiteSpace: 'nowrap' }}
          >
            📋 コース・料金表
          </button>
          <button
            onClick={() => scrollTo('therapists')}
            style={{ padding: '5px 11px', borderRadius: '20px', backgroundColor: 'rgba(255, 255, 255, 0.08)', border: `1px solid ${C.border}`, fontSize: '11.5px', fontWeight: 800, color: C.mid, whiteSpace: 'nowrap' }}
          >
            👤 セラピスト
          </button>
          <button
            onClick={() => scrollTo('how-it-works')}
            style={{ padding: '5px 11px', borderRadius: '20px', backgroundColor: 'rgba(255, 255, 255, 0.08)', border: `1px solid ${C.border}`, fontSize: '11.5px', fontWeight: 800, color: C.mid, whiteSpace: 'nowrap' }}
          >
            🛡️ ご利用の流れ
          </button>
          <button
            onClick={() => scrollTo('faq')}
            style={{ padding: '5px 11px', borderRadius: '20px', backgroundColor: 'rgba(255, 255, 255, 0.08)', border: `1px solid ${C.border}`, fontSize: '11.5px', fontWeight: 800, color: C.mid, whiteSpace: 'nowrap' }}
          >
            ❓ よくある質問
          </button>
        </div>
      </header>

      {/* ── メインコンテンツ ── */}
      <main style={{ maxWidth: '640px', margin: '0 auto', padding: '0 18px' }}>

        {/* ── 1. ヒーローセクション ── */}
        <section style={{ paddingTop: '24px', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 800, color: C.accent, backgroundColor: C.accentBg, padding: '4px 12px', borderRadius: '20px', marginBottom: '14px' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: C.green }} />
            ソウル全域20〜30分到着 · 先払い一切なし完全現地決済
          </div>

          <h1 style={{ fontSize: '26px', fontWeight: 950, lineHeight: 1.35, color: C.dark, margin: '0 0 10px', letterSpacing: '-0.5px' }}>
            ソウルの夜を締めくくる、<br />
            至高のホテル客室プライベートSPA
          </h1>

          <p style={{ fontSize: '13.5px', color: C.mid, lineHeight: 1.65, margin: '0 auto 20px', maxWidth: '440px' }}>
            厳選された20代の専門セラピストがご宿泊のホテル客室へ直接伺います。
            事前振込不要の<strong>完全現地対面決済（先払いゼロ）</strong>で安心してご利用いただけます。
          </p>

          {/* 2大アクションCTA */}
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
              💬 WhatsApp 日本語予約
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

          {/* ビジュアル */}
          <div style={{ position: 'relative', width: '100%', height: '220px', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
            <Image src="/images/hero_sensual_goddess.jpg" alt="ソウル ホテル 出張マッサージ" fill style={{ objectFit: 'cover' }} priority />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '14px 16px', background: 'linear-gradient(to top, rgba(15, 23, 42, 0.8), transparent)', color: '#ffffff', textAlign: 'left' }}>
              <div style={{ fontSize: '11px', color: '#fef08a', fontWeight: 800, letterSpacing: '0.5px' }}>SEOUL VIP HOTEL SPA</div>
              <div style={{ fontSize: '14.5px', fontWeight: 900 }}>肌を優しく滑るアロマオイルと至福の密着タッチ</div>
            </div>
          </div>
        </section>

        {/* ── 区切り線 ── */}
        <div style={{ height: '1px', backgroundColor: C.border, margin: '36px 0 28px' }} />

        {/* ── 2. コース・料金表 ── */}
        <section id="courses">
          <div style={{ marginBottom: '16px' }}>
            <div style={{ fontSize: '11px', fontWeight: 800, color: C.accent, letterSpacing: '0.8px' }}>SPA MENU &amp; TRANSPARENT RATES</div>
            <h2 style={{ fontSize: '19px', fontWeight: 900, color: C.dark, margin: '2px 0 4px' }}>施術メニュー・明朗定額料金表</h2>
            <p style={{ fontSize: '12px', color: C.muted, margin: 0 }}>
              先払いゼロ · お部屋到着後に対面決済（クレジットカード / 現金 / 日本円OK）
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {JP_COURSES.map((course, i) => (
              <div
                key={i}
                style={{
                  backgroundColor: C.card, backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
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

                {/* 3段料金ピル (クリックでWhatsApp連携) */}
                <div style={{ display: 'flex', gap: '6px', paddingTop: '8px', borderTop: `1px solid ${C.borderLt}`, marginTop: '4px' }}>
                  {course.prices.map((p, pi) => (
                    <a
                      key={pi}
                      href={`https://wa.me/821066072239?text=${encodeURIComponent(`こんにちは。${course.name} (${p.time}) の予約をお願いしたいです。`)}`}
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
                        {p.time} {p.isBest && '★人気'}
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

          {/* 3大清潔・衛生安心保証 */}
          <div style={{ marginTop: '14px', padding: '14px 16px', backgroundColor: 'rgba(255, 255, 255, 0.08)', borderRadius: '12px', border: `1px solid ${C.border}` }}>
            <div style={{ fontSize: '12px', fontWeight: 900, color: C.dark, marginBottom: '6px', textAlign: 'center' }}>
              ✨ 3大清潔・衛生安心プロミス
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '6px', fontSize: '11.5px', color: C.mid, lineHeight: 1.5 }}>
              <div>• <strong>1回用衛生シーツ持参</strong>（ホテルの寝具を一切汚しません）</div>
              <div>• <strong>100%水溶性オーガニックオイル</strong>（ベタつきなし）</div>
              <div>• <strong>純綿専用ウェア無償提供</strong>（ソウル全域出張費込み）</div>
            </div>
          </div>
        </section>

        {/* ── 区切り線 ── */}
        <div style={{ height: '1px', backgroundColor: C.border, margin: '36px 0 28px' }} />

        {/* ── 3. 今夜出勤の精鋭セラピスト ── */}
        <section id="therapists">
          <div style={{ marginBottom: '16px' }}>
            <div style={{ fontSize: '11px', fontWeight: 800, color: C.accent, letterSpacing: '0.8px' }}>TONIGHT'S THERAPISTS</div>
            <h2 style={{ fontSize: '19px', fontWeight: 900, color: C.dark, margin: '2px 0 4px' }}>本日出勤 代表セラピスト</h2>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '12px', color: C.green, fontWeight: 700 }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: C.green }} />
              ソウル各エリアに30名以上の専門ヒーラー常時待機中
            </div>
          </div>

          {/* コンパクト横分割カード (モバイル最適化) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {JP_ACES.map((t, i) => (
              <div
                key={i}
                style={{
                  backgroundColor: C.card, backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
                  border: `1px solid ${C.border}`,
                  borderRadius: '14px',
                  padding: '12px',
                  display: 'flex',
                  gap: '12px',
                  alignItems: 'center',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.02)',
                }}
              >
                {/* サムネイル */}
                <div style={{ position: 'relative', width: '92px', height: '115px', borderRadius: '10px', overflow: 'hidden', flexShrink: 0 }}>
                  <Image src={t.img} alt={t.name} fill style={{ objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', top: '6px', left: '6px', backgroundColor: 'rgba(15, 23, 42, 0.85)', color: '#fef08a', fontSize: '9.5px', fontWeight: 800, padding: '2px 5px', borderRadius: '4px' }}>
                    {t.badge}
                  </div>
                </div>

                {/* 詳細・指名アクション */}
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
                      {t.isAvailable ? '● 即時可能' : '○ 予約受付中'}
                    </span>

                    <div style={{ display: 'flex', gap: '4px' }}>
                      <a
                        href={`https://wa.me/821066072239?text=${encodeURIComponent(`こんにちは。${t.name}さんを指名で予約したいです。`)}`}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          backgroundColor: '#25D366', color: '#ffffff',
                          fontSize: '11px', fontWeight: 900, padding: '5px 9px', borderRadius: '6px',
                          textDecoration: 'none',
                        }}
                      >
                        指名予約
                      </a>
                      <a
                        href={PHONE_TEL}
                        style={{
                          backgroundColor: C.dark, color: '#ffffff',
                          fontSize: '11px', fontWeight: 800, padding: '5px 9px', borderRadius: '6px',
                          textDecoration: 'none',
                        }}
                      >
                        電話
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 30名待機案内 */}
          <div style={{ marginTop: '12px', padding: '12px 14px', backgroundColor: 'rgba(255, 255, 255, 0.08)', border: `1px solid ${C.border}`, borderRadius: '10px', fontSize: '12px', color: C.mid, lineHeight: 1.55 }}>
            <strong style={{ color: C.dark }}>ソウル全域に30名以上の専門ヒーラーが常時待機</strong><br />
            ご紹介した代表セラピストのほかにも、様々な魅力やスタイルのエステティシャンが待機しております。ご希望のタイプ（強もみ、癒やし密着など）をお気軽にお申し付けください。
          </div>
        </section>

        {/* ── 区切り線 ── */}
        <div style={{ height: '1px', backgroundColor: C.border, margin: '36px 0 28px' }} />

        {/* ── 4. ご利用の簡単3ステップ ── */}
        <section id="how-it-works">
          <div style={{ marginBottom: '16px' }}>
            <div style={{ fontSize: '11px', fontWeight: 800, color: C.accent, letterSpacing: '0.8px' }}>HOW IT WORKS</div>
            <h2 style={{ fontSize: '19px', fontWeight: 900, color: C.dark, margin: '2px 0 4px' }}>かんたん予約 3ステップ</h2>
            <p style={{ fontSize: '12px', color: C.muted, margin: 0 }}>韓国の電話番号不要 · 30秒で予約完了</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {[
              { no: '01', title: 'WhatsAppでお問い合わせ', desc: 'ホテル名・お部屋番号・ご希望のコースをメッセージでお送りください。' },
              { no: '02', title: '20〜30分で客室へ到着', desc: '一番近くの担当セラピストが衛生備品を持参し、静かにお部屋まで伺います。' },
              { no: '03', title: '対面確認後に安心決済', desc: 'セラピストが到着したことを直接ご確認の上、その場でお支払いいただけます。' },
            ].map((s, i) => (
              <div key={i} style={{ backgroundColor: C.card, backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', border: `1px solid ${C.border}`, borderRadius: '12px', padding: '13px 15px', display: 'flex', gap: '12px', alignItems: 'center' }}>
                <div style={{ fontSize: '15px', fontWeight: 900, color: C.accent, minWidth: '22px' }}>{s.no}</div>
                <div>
                  <div style={{ fontSize: '13.5px', fontWeight: 800, color: C.dark }}>{s.title}</div>
                  <div style={{ fontSize: '12px', color: C.mid, marginTop: '2px' }}>{s.desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* 先払いゼロ保証バナー */}
          <div style={{ marginTop: '12px', padding: '13px 15px', backgroundColor: C.greenBg, border: `1px solid ${C.greenBd}`, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
            <div>
              <div style={{ fontSize: '12.5px', fontWeight: 900, color: '#166534' }}>先払い一切なし・完全現地対面決済保証</div>
              <div style={{ fontSize: '11px', color: '#14532d', marginTop: '2px' }}>事前の予約金・保証金は1円もいただきません。安心してお申し込みください。</div>
            </div>
            <a href={WA_LINK} target="_blank" rel="noreferrer" style={{ backgroundColor: '#166534', color: '#ffffff', padding: '7px 12px', borderRadius: '7px', fontSize: '11.5px', fontWeight: 800, textDecoration: 'none', whiteSpace: 'nowrap' }}>
              WhatsApp
            </a>
          </div>
        </section>

        {/* ── 区切り線 ── */}
        <div style={{ height: '1px', backgroundColor: C.border, margin: '36px 0 28px' }} />

        {/* ── 5. お客様のリアルな口コミ ── */}
        <section>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '14px' }}>
            <div>
              <div style={{ fontSize: '11px', fontWeight: 800, color: C.accent, letterSpacing: '0.8px' }}>REVIEWS</div>
              <h2 style={{ fontSize: '19px', fontWeight: 900, color: C.dark, margin: '2px 0 0' }}>実際のご利用体験談</h2>
            </div>
            <div style={{ fontSize: '12px', color: C.accent, fontWeight: 800 }}>★ 5.0 満点評価</div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {JP_REVIEWS.map((rev, i) => (
              <div key={i} style={{ backgroundColor: C.card, backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', border: `1px solid ${C.border}`, borderRadius: '12px', padding: '13px 15px' }}>
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

        {/* ── 区切り線 ── */}
        <div style={{ height: '1px', backgroundColor: C.border, margin: '36px 0 28px' }} />

        {/* ── 6. よくある質問 (FAQアコーディオン) ── */}
        <section id="faq">
          <div style={{ marginBottom: '16px' }}>
            <div style={{ fontSize: '11px', fontWeight: 800, color: C.accent, letterSpacing: '0.8px' }}>FREQUENTLY ASKED QUESTIONS</div>
            <h2 style={{ fontSize: '19px', fontWeight: 900, color: C.dark, margin: '2px 0 4px' }}>よくある質問 (FAQ)</h2>
            <p style={{ fontSize: '12px', color: C.muted, margin: 0 }}>日本人旅行者・出張者様からよくいただくご質問です。</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {JP_FAQS.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={i} style={{ border: `1px solid ${C.border}`, borderRadius: '10px', overflow: 'hidden', backgroundColor: C.card, backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' }}>
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

        {/* ── 区切り線 ── */}
        <div style={{ height: '1px', backgroundColor: C.border, margin: '32px 0 24px' }} />

        {/* ── 7. ソウル主要エリアネットワークフッター ── */}
        <footer style={{ paddingBottom: '24px' }}>
          <div style={{ fontSize: '12px', fontWeight: 800, color: C.dark, marginBottom: '6px' }}>
            ソウル全域 ホテル客室出張マッサージ ネットワーク
          </div>
          <p style={{ fontSize: '11px', color: C.muted, lineHeight: 1.6, margin: '0 0 10px' }}>
            江南、明洞、東大門、弘大、汝矣島、梨泰院などソウル市内25区へ20〜30分で迅速にお伺いします。
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px 8px', fontSize: '11px' }}>
            {SEO_AREAS.map((area, i) => (
              <span key={i} style={{ color: '#64748b' }}>
                {area}
              </span>
            ))}
          </div>

          <div style={{ marginTop: '18px', paddingTop: '14px', borderTop: `1px solid ${C.border}`, fontSize: '10.5px', color: C.muted, lineHeight: 1.6 }}>
            <strong>美しい夜 Abam (アバム)</strong> · ソウル特別市全域ホテル客室VIP出張マッサージ · 完全現地対面決済（先払いゼロ） · WhatsApp日本語対応 &amp; お電話 {PHONE_DISPLAY}
          </div>
        </footer>

      </main>

      {/* ── 下部固定クイック予約バー ── */}
      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(10, 15, 29, 0.92)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', borderTop: `1px solid ${C.border}`, padding: '8px 16px', zIndex: 50, boxShadow: '0 -4px 24px rgba(0,0,0,0.4)' }}>
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
            💬 WhatsApp 日本語即時予約
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
            お電話
          </a>
        </div>
      </div>

    </div>
  );
}
