import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'ソウル出張マッサージ・ホテル客室VIPアロマSPA | 日本語対応・30分到着・完全現地払い (Abam)',
  description:
    'ソウル全域専属（25区100%対応）のホテル客室へ30分でお伺いする高級出張マッサージ。先払い・前受金一切なし（完全現地払い・各種クレジットカード＆日本円/ウォン対応）。LINE＆WhatsAppで簡単日本語予約可能。20代厳選セラピスト在籍。',
  keywords: [
    'ソウル 出張マッサージ',
    'ソウル ホテル マッサージ',
    'カンナム 出張アロマ',
    '明洞 ホテル マッサージ',
    '弘大 出張マッサージ',
    '東大門 ホテル マッサージ',
    '明洞 ホテル 出張マッサージ',
    '韓国 出張マッサージ 日本語',
    'ソウル 客室 マッサージ',
    'ソウル 深夜 マッサージ',
    'ソウル 高級 出張エステ'
  ].join(', '),
  alternates: {
    canonical: 'https://abam.kr/jp',
    languages: {
      'ko-KR': 'https://abam.kr',
      'en-US': 'https://abam.kr/en',
      'ja-JP': 'https://abam.kr/jp',
      'zh-CN': 'https://abam.kr/cn',
    },
  },
  openGraph: {
    title: 'ソウル出張マッサージ・ホテル客室VIPアロマSPA (Abam)',
    description:
      'ソウル全域・首都圏のホテル客室へ30分到着。先払いゼロ・完全現地対面決済。LINE日本語予約対応。',
    url: 'https://abam.kr/jp',
    siteName: 'Abam Thai Homecare Seoul',
    images: [{ url: 'https://abam.kr/images/hero_sensual_goddess.jpg', width: 730, height: 620, alt: 'ソウル ホテル 出張マッサージ' }],
  },
};

const WHATSAPP_LINK = 'https://wa.me/821066072239?text=%E3%81%93%E3%82%93%E3%81%AB%E3%81%A1%E3%81%AF%E3%80%81%E3%82%BD%E3%82%A6%E3%83%AB%E3%81%AE%E3%83%9B%E3%83%86%E3%83%AB%E5%87%BA%E5%BC%B5%E3%83%9E%E3%83%83%E3%82%94%E3%83%BC%E3%82%B8%E3%81%AE%E4%BA%88%E7%B4%84%E3%82%92%E3%81%8A%E9%A1%98%E3%81%84%E3%81%97%E3%81%9F%E3%81%84%E3%81%A7%E3%81%99%E3%80%82';
const PHONE_TEL = 'tel:+82-10-6607-2239';
const PHONE_DISPLAY = '+82 10-6607-2239';

const JP_COURSES = [
  {
    id: 'thai',
    name: '本場タイ伝統指圧ケア',
    tag: 'ワットポー王室直伝・ドライ全身指圧',
    badge: 'オイル不使用・専用ウェア着用',
    img: '/images/thai.jpg',
    desc: 'オイルを使わず清潔な純綿ウェアを着用し、経穴指圧と全身ストレッチで旅行の疲れや肩・腰のこりを徹底的にほぐします。',
    prices: [
      { time: '60分', price: '80,000ウォン (約8,800円)' },
      { time: '90分', price: '100,000ウォン (約11,000円)', isBest: true },
      { time: '120分 (2時間)', price: '120,000ウォン (約13,200円)' },
    ],
  },
  {
    id: 'healing',
    name: 'ヒーリング感性アロマケア',
    tag: '繊細なハンドタッチ・深いリラックス',
    badge: '自律神経調整＆ストレス解消',
    img: '/images/sensual_touch.jpg',
    desc: '心身의 疲労と緊張をやさしく包み込む繊細なタッチで、日々のストレスを心地よく溶かす感性リラクゼーションです。',
    prices: [
      { time: '60分', price: '90,000ウォン (約9,900円)' },
      { time: '90分', price: '120,000ウォン (約13,200円)', isBest: true },
      { time: '120分 (2시간)', price: '150,000ウォン (約16,500円)' },
    ],
  },
  {
    id: 'aroma',
    name: '天然アロマリンパセラピー',
    tag: '最高級エッセンシャルオイル使用',
    badge: '全身リンパ循環＆艶やか美肌ケア',
    img: '/images/aroma.jpg',
    desc: '100%植物性天然アロマオイルを贅沢に使用し、全身のリンパ節をやさしく流して極上の安らぎをお届けします。',
    prices: [
      { time: '60分', price: '90,000ウォン (約9,900円)' },
      { time: '90分', price: '110,000ウォン (約12,100円)', isBest: true },
      { time: '120分 (2時間)', price: '140,000ウォン (約15,400円)' },
    ],
  },
  {
    id: 'special',
    name: 'スペシャルデュアル融合コース',
    tag: 'タイ指圧 ＋ アロマオイル贅沢配合',
    badge: 'コスパ満足度No.1おすすめ',
    img: '/images/sensual_care.jpg',
    desc: '本格タイ指圧で凝り固まった筋肉をしっかり緩めた後、アロマリンパオイルで全身をとろけるように癒す人気コースです。',
    prices: [
      { time: '60分', price: '100,000ウォン (約11,000円)' },
      { time: '90分', price: '140,000ウォン (約15,400円)', isBest: true },
      { time: '120分 (2時間)', price: '170,000ウォン (約18,700円)' },
    ],
  },
  {
    id: 'vip',
    name: 'プレミアムVIPシグネチャー',
    tag: '👑 最高峰フルコース・指名率No.1',
    badge: 'エースセラピスト優先配属',
    isVip: true,
    img: '/images/hero_sensual_goddess.jpg',
    desc: '全身ドライ指圧＋特級アロマオイル＋集中リンパケアまで、贅を尽くした至福のプライベートスパプログラムです。',
    prices: [
      { time: '60分', price: '120,000ウォン (約13,200円)' },
      { time: '90分', price: '160,000ウォン (約17,600円)', isBest: true },
      { time: '120分 (2時間)', price: '200,000ウォン (約22,000円)' },
    ],
  },
];

const JP_ACES = [
  {
    name: 'ユナ (Yuna)',
    age: '23歳',
    specs: '166cm · 47kg · スレンダー美形',
    role: '指名率No.1 · 密着センシュアルリンパ特化',
    img: '/images/ace_yuna.jpg',
    badge: '人気No.1',
  },
  {
    name: 'ソア (Seoa)',
    age: '24歳',
    specs: '168cm · 49kg · Sライン・グラマー',
    role: 'ディープティッシュ指圧＆極上アロマ',
    img: '/images/ace_seoa.jpg',
    badge: '予約集中',
  },
  {
    name: 'ジア (Jia)',
    age: '22歳',
    specs: '165cm · 46kg · 美肌スレンダー',
    role: '優しい癒やしのタッチ・筋膜リリース',
    img: '/images/ace_jia.jpg',
    badge: 'エースヒーラー',
  },
];

export default function JapanesePage() {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundImage: 'url(/images/seoul_night_sky.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center top',
      backgroundAttachment: 'fixed',
      backgroundRepeat: 'no-repeat',
      color: '#18181b',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Hiragino Kaku Gothic ProN", "Meiryo", sans-serif',
      paddingBottom: '90px',
    }}>
      {/* Top Banner */}
      <div style={{ background: '#070a10', borderBottom: '1px solid rgba(212, 175, 55, 0.45)', color: '#f3e5ab', padding: '10px 20px', textAlign: 'center', fontSize: '12px', fontWeight: 800 }}>
        🇯🇵 ソウル全域専属（25区100%対応） ホテル客室VIP出張マッサージ · 先払い一切なし（完全現地払い） · 30分スピード到着 · LINE日本語対応
      </div>

      {/* Header */}
      <header style={{ position: 'sticky', top: 0, zIndex: 50, backgroundColor: 'rgba(255,255,255,0.98)', backdropFilter: 'blur(16px)', borderBottom: '1.5px solid rgba(212, 175, 55, 0.35)', boxShadow: '0 4px 22px rgba(0,0,0,0.18)' }}>
        <div style={{ maxWidth: '1080px', margin: '0 auto', padding: '12px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <Link href="/jp" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'linear-gradient(135deg, #090d16, #1e293b)', border: '1px solid #d4af37', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f3e5ab', fontWeight: 900, fontSize: '18px' }}>
              🌙
            </div>
            <div>
              <div style={{ fontSize: '17px', fontWeight: 950, color: '#090d16', letterSpacing: '-0.3px' }}>
                美しい夜 <span style={{ color: '#b38728' }}>Abam (アバム)</span>
              </div>
              <span style={{ fontSize: '10.5px', color: '#64748b', fontWeight: 700 }}>
                ソウル高級ホテル出張マッサージ・日本語対応
              </span>
            </div>
          </Link>

          {/* Language Switcher */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#f1f5f9', padding: '4px', borderRadius: '8px' }}>
            <Link href="/" style={{ padding: '4px 10px', fontSize: '12px', fontWeight: 700, color: '#475569', textDecoration: 'none', borderRadius: '6px' }}>🇰🇷 KR</Link>
            <Link href="/en" style={{ padding: '4px 10px', fontSize: '12px', fontWeight: 700, color: '#475569', textDecoration: 'none', borderRadius: '6px' }}>🇺🇸 EN</Link>
            <span style={{ padding: '4px 10px', fontSize: '12px', fontWeight: 900, color: '#090d16', background: '#ffffff', borderRadius: '6px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>🇯🇵 JP</span>
            <Link href="/cn" style={{ padding: '4px 10px', fontSize: '12px', fontWeight: 700, color: '#475569', textDecoration: 'none', borderRadius: '6px' }}>🇨🇳 CN</Link>
          </div>

          {/* LINE Contact */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12.5px', fontWeight: 900, color: '#ffffff', backgroundColor: '#25D366', padding: '8px 16px', borderRadius: '6px', textDecoration: 'none', boxShadow: '0 2px 8px rgba(6,199,85,0.35)' }}>
              LINEで簡単予約 (abam1004)
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
                <span style={{ fontSize: '12px', fontWeight: 800, color: '#f3e5ab' }}>● 20代厳選セラピスト出勤中 · ソウル市内30分到着</span>
              </div>

              <div style={{ fontSize: '13px', fontWeight: 900, color: '#b38728', letterSpacing: '1px', marginBottom: '8px' }}>
                ✦ SEOUL VIP HOTEL IN-ROOM RELAXATION
              </div>

              <h1 style={{ fontSize: '28px', fontWeight: 950, lineHeight: 1.35, letterSpacing: '-0.5px', margin: '0 0 16px', color: '#090d16' }}>
                ご宿泊のホテル客室で味わう<br />
                <span style={{
                  background: 'linear-gradient(135deg, #b8860b 0%, #e6ca65 35%, #d4af37 70%, #996e1e 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontWeight: 950,
                  display: 'inline-block'
                }}>至高の密着センシュアル癒やし</span><br />
                20代厳選エステティシャン派遣
              </h1>

              <p style={{ fontSize: '14.5px', color: '#334155', lineHeight: 1.7, margin: '0 0 24px' }}>
                ソウル滞在中のホテル客室・レジデンス・Airbnbへ、お電話・LINEひとつで<strong>約30分</strong>でお伺いします。安心の<strong>「完全現地対面決済（先払い一切なし）」</strong>で、日本人の旅行者様・出張者様も安心してご利用いただけます。
              </p>

              {/* 4 Guarantees */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px', marginBottom: '26px' }}>
                <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '10px 14px' }}>
                  <div style={{ fontSize: '13px', fontWeight: 900, color: '#090d16' }}>🛡️ 先払い・前受金 ゼロ</div>
                  <div style={{ fontSize: '11.5px', color: '#64748b' }}>セラピスト到着後に対面でお支払い</div>
                </div>
                <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '10px 14px' }}>
                  <div style={{ fontSize: '13px', fontWeight: 900, color: '#090d16' }}>💳 各種カード・日本円OK</div>
                  <div style={{ fontSize: '11.5px', color: '#64748b' }}>JCB, Visa, Master, 現金決済可能</div>
                </div>
                <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '10px 14px' }}>
                  <div style={{ fontSize: '13px', fontWeight: 900, color: '#090d16' }}>🏨 ソウル全域ホテル対応</div>
                  <div style={{ fontSize: '11.5px', color: '#64748b' }}>江南、明洞、東大門、弘大、汝矣島</div>
                </div>
                <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '10px 14px' }}>
                  <div style={{ fontSize: '13px', fontWeight: 900, color: '#090d16' }}>🇯🇵 LINE日本語サポート</div>
                  <div style={{ fontSize: '11.5px', color: '#64748b' }}>韓国の電話番号不要でLINE予約完了</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#25D366', color: '#ffffff', fontWeight: 900, fontSize: '15px', padding: '14px 28px', borderRadius: '10px', textDecoration: 'none', boxShadow: '0 4px 16px rgba(37,211,102,0.45)' }}>
                  💬 WhatsAppで即時予約 (午後7時〜深夜4時予約可能日本語対応)
                </a>
                <a href={PHONE_TEL} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#090d16', color: '#f3e5ab', fontWeight: 900, fontSize: '15px', padding: '14px 24px', borderRadius: '10px', textDecoration: 'none', border: '1px solid #d4af37', boxShadow: '0 4px 14px rgba(0,0,0,0.2)' }}>
                  📞 お電話: {PHONE_DISPLAY}
                </a>
              </div>
            </div>

            {/* Right Photo Card */}
            <div style={{ position: 'relative', borderRadius: '18px', overflow: 'hidden', height: '420px', boxShadow: '0 16px 36px rgba(0,0,0,0.22)', border: '1.5px solid rgba(212, 175, 55, 0.4)' }}>
              <Image
                src="/images/hero_sensual_goddess.jpg"
                alt="ソウル ホテル 出張マッサージ 高級エステ"
                fill
                style={{ objectFit: 'cover' }}
                priority
              />
              <div style={{ position: 'absolute', top: '14px', left: '14px', backgroundColor: 'rgba(9, 13, 22, 0.88)', border: '1px solid #d4af37', color: '#f3e5ab', padding: '6px 12px', borderRadius: '6px', fontSize: '11px', fontWeight: 900 }}>
                👑 1:1 ホテル客室 プライベートSPA
              </div>
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '24px 20px 16px', background: 'linear-gradient(to top, rgba(9, 13, 22, 0.95) 0%, rgba(9, 13, 22, 0.6) 70%, transparent 100%)', color: '#ffffff' }}>
                <div style={{ fontSize: '11px', color: '#e6ca65', fontWeight: 900 }}>MIDNIGHT VIP SENSUAL SPA</div>
                <div style={{ fontSize: '16px', fontWeight: 950, color: '#ffffff', margin: '4px 0 2px' }}>温もり溢れる天然アロマ＆繊細な手技</div>
                <div style={{ fontSize: '11.5px', color: '#cbd5e1' }}>実物一致100%保証 · 完全現地対面決済</div>
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
                本日出勤 20代S級エース セラピスト一覧
              </h2>
              <p style={{ fontSize: '13px', color: '#64748b', margin: '4px 0 0' }}>
                LINE予約時にお好みのセラピストをご指名いただけます。
              </p>
            </div>
            <div style={{ backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', color: '#166534', padding: '6px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 800 }}>
              ● 即時配車可能（約30分でお部屋に到着）
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '18px' }}>
            {JP_ACES.map((ace, i) => (
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
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" style={{ textAlign: 'center', backgroundColor: '#25D366', color: '#ffffff', fontSize: '12px', fontWeight: 900, padding: '9px 0', borderRadius: '6px', textDecoration: 'none', marginTop: 'auto' }}>
                  💬 WhatsAppで{ace.name}を指名予約
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Spa Menu & Pricing */}
        <section style={{ backgroundColor: '#ffffff', borderRadius: '20px', border: '1px solid #e8e0d0', padding: '32px 28px', boxShadow: '0 12px 32px rgba(0, 0, 0, 0.28)' }}>
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <span style={{ fontSize: '11px', fontWeight: 900, color: '#b38728', backgroundColor: '#faf6ee', border: '1px solid #d4af37', padding: '3px 8px', borderRadius: '4px' }}>
              ✦ 明朗会計・完全定額料金
            </span>
            <h2 style={{ fontSize: '22px', fontWeight: 950, color: '#090d16', margin: '8px 0 4px' }}>
              ホテル客室 施術メニュー・料金表
            </h2>
            <p style={{ fontSize: '13.5px', color: '#64748b' }}>
              出張費・深夜割増込み。お部屋到着後、セラピストに直接お支払いいただけます。
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: '22px' }}>
            {JP_COURSES.map((course, idx) => (
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
                          {p.time} {p.isBest && <span style={{ fontSize: '10px', color: '#b38728', fontWeight: 900 }}>[おすすめ]</span>}
                        </span>
                        <span style={{ fontSize: '14.5px', fontWeight: 950, color: '#b38728' }}>{p.price}</span>
                      </div>
                    ))}
                  </div>
                  <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" style={{ display: 'block', textAlign: 'center', backgroundColor: '#25D366', color: '#ffffff', fontWeight: 900, fontSize: '13px', padding: '11px 0', borderRadius: '8px', textDecoration: 'none' }}>
                    WhatsAppで今すぐ予約
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Global Messengers */}
        <section style={{ backgroundColor: '#090d16', borderRadius: '20px', border: '1.5px solid #d4af37', padding: '36px 28px', color: '#ffffff', textAlign: 'center' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 950, color: '#f3e5ab', margin: '0 0 10px' }}>
            今夜の旅の疲れを、極上のプライベートマッサージで癒やしませんか？
          </h2>
          <p style={{ fontSize: '14px', color: '#cbd5e1', maxWidth: '640px', margin: '0 auto 24px', lineHeight: 1.6 }}>
            韓国の電話番号は不要です。WhatsAppで「ホテル名・部屋番号・ご希望のコース」をお送りいただくだけで、すぐにお伺いします。
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#25D366', color: '#ffffff', fontWeight: 900, fontSize: '15px', padding: '14px 28px', borderRadius: '10px', textDecoration: 'none', boxShadow: '0 4px 14px rgba(37,211,102,0.4)' }}>
              💬 WhatsApp: +82 10-6607-2239
            </a>
            <a href={PHONE_TEL} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#1e293b', border: '1px solid #d4af37', color: '#f3e5ab', fontWeight: 900, fontSize: '15px', padding: '14px 28px', borderRadius: '10px', textDecoration: 'none' }}>
              📞 国際電話: {PHONE_DISPLAY}
            </a>
          </div>
        </section>
      </main>

      {/* Fixed Bottom Bar */}
      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(255,255,255,0.98)', backdropFilter: 'blur(16px)', borderTop: '1.5px solid rgba(212, 175, 55, 0.4)', padding: '10px 16px', zIndex: 50, boxShadow: '0 -6px 25px rgba(0,0,0,0.18)' }}>
        <div style={{ maxWidth: '1080px', margin: '0 auto', display: 'flex', gap: '10px' }}>
          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" style={{ flex: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', backgroundColor: '#25D366', color: '#ffffff', fontWeight: 900, fontSize: '15px', padding: '14px 0', borderRadius: '10px', textDecoration: 'none', boxShadow: '0 2px 10px rgba(37,211,102,0.35)' }}>
            💬 WhatsApp 午後7時〜深夜4時予約可能予約
          </a>
          <a href={PHONE_TEL} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', backgroundColor: '#090d16', color: '#f3e5ab', fontWeight: 900, fontSize: '14.5px', padding: '14px 0', borderRadius: '10px', textDecoration: 'none', border: '1px solid #d4af37' }}>
            📞 今すぐお電話
          </a>
        </div>
      </div>
    </div>
  );
}
