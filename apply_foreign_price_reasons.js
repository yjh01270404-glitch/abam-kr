const fs = require('fs');
const path = require('path');

// 1. Update landing-content.ts
const landingPath = path.join(__dirname, 'src', 'lib', 'landing-content.ts');
let landingSrc = fs.readFileSync(landingPath, 'utf8');

// Add priceNotice to LandingContent interface
if (!landingSrc.includes('priceNotice?:')) {
  landingSrc = landingSrc.replace(
    `  priceSection: { title: string; head: string; durations: string[] };`,
    `  priceSection: { title: string; head: string; durations: string[] };\r\n  priceNotice?: {\r\n    tag: string;\r\n    title: string;\r\n    desc: string;\r\n    reasons: { icon: string; title: string; desc: string }[];\r\n  };`
  );
}

// EN priceNotice definition
const enNotice = `  priceNotice: {
    tag: 'VIP HOSPITALITY & PRICING POLICY',
    title: 'Why International Guest VIP Rates Apply',
    desc: 'Our international guest pricing is an all-inclusive VIP rate specifically structured to guarantee seamless luxury, complete safety, and barrier-free communication for overseas visitors in Seoul.',
    reasons: [
      {
        icon: '🌐',
        title: 'Dedicated Multilingual Concierge (24/7)',
        desc: 'Real-time English booking coordination, hotel front desk and room liaison, and 24/7 dedicated support via WhatsApp with zero language barrier.',
      },
      {
        icon: '👑',
        title: 'Priority Top-Tier Ace Therapists',
        desc: 'Exclusive priority assignment of our highest-rated 20s Korean therapists with verified technique, refined hospitality etiquette, and foreign guest experience.',
      },
      {
        icon: '🚕',
        title: 'All-Inclusive Hotel Dispatch & Rapid Transit',
        desc: 'Covers private rapid transit across all 25 districts of Seoul directly to your hotel suite with zero hidden late-night or distance delivery fees.',
      },
      {
        icon: '🛡️',
        title: '100% Pay-on-Arrival Scam Protection & Sealed Amenities',
        desc: 'Strict zero-advance-deposit policy to protect international travelers against online scams; pay directly upon therapist arrival. Includes sealed single-use hygienic sheets and premium imported natural oils.',
      },
    ],
  },`;

// JP priceNotice definition
const jpNotice = `  priceNotice: {
    tag: 'VIP HOSPITALITY & PRICING POLICY',
    title: '外国人・ホテルVIP特別料金についてのご案内',
    desc: '外国人観光客・出張者の皆様へ、言葉の不安やトラブルのない最高峰の癒しをお届けするため、出張諸費用・専任通訳サポートを全て含んだVIP定額料金制を採用しております。',
    reasons: [
      {
        icon: '🌐',
        title: '専任日本語コンシェルジュ・LINE/WhatsApp対応',
        desc: 'リアルタイムでの日本語予約受付、ホテル入室やフロント対応の完全サポートを行い、言語の壁を感じさせません。',
      },
      {
        icon: '👑',
        title: '特選20代エースセラピストの最優先手配',
        desc: '外国人のお客様対応に精通し、高い接客マナーと確かな技術を誇る当店最高ランクのセラピストを優先配属いたします。',
      },
      {
        icon: '🚕',
        title: 'ソウル全域ホテル出張交通費・深夜諸費用一式込み',
        desc: 'ソウル全域（江南・明洞・東大門・汝矣島等）のホテル・レジデンスへの迅速な移動交通費が全て含まれており、追加請求は一切ございません。',
      },
      {
        icon: '🛡️',
        title: '100% 完全現地後払い保証＆個別滅菌衛生アメニティ',
        desc: '観光客を狙った前受金詐欺を徹底排除。セラピスト到着後の完全後払い決済です。使い捨て衛生シーツと高級天然アロマオイルを完備してお伺いします。',
      },
    ],
  },`;

// CN priceNotice definition
const cnNotice = `  priceNotice: {
    tag: 'VIP HOSPITALITY & PRICING POLICY',
    title: '关于国际宾客 VIP 专属定价说明',
    desc: '为确保海外游客及商务出差人士在首尔享有零语言障碍、绝对安全及高标准的奢华体验，本服务采取全包式国际VIP统一定价。',
    reasons: [
      {
        icon: '🌐',
        title: '专属中文/微信实时客服无缝对接',
        desc: '提供全中文一对一预约协助、酒店客房指引与沟通协调，全程无语言阻碍。',
      },
      {
        icon: '👑',
        title: '特选20代顶级王牌理疗师优先派单',
        desc: '优先派遣通过涉外高端礼仪培训、手法精湛且深获好评的资深王牌理疗师。',
      },
      {
        icon: '🚕',
        title: '首尔全境酒店专车快速上门交通费全包',
        desc: '包含前往江南、明洞、汝矣岛等首尔各大酒店、商务公寓的专车交通调度费，明码实价无任何隐形附加费。',
      },
      {
        icon: '🛡️',
        title: '100% 见面现场后付款 & 独立密封卫生耗材',
        desc: '坚决杜绝定金诈骗，理疗师到店当面结算；配备独立包装一次性卫生床单、纯天然植物精油及齐全专业护理备品。',
      },
    ],
  },`;

// Insert priceNotice into EN
landingSrc = landingSrc.replace(
  `  priceSection: { title: 'COURSE & PRICE', head: 'Course', durations: ['60 min', '90 min', '120 min'] },`,
  `  priceSection: { title: 'COURSE & PRICE', head: 'Course', durations: ['60 min', '90 min', '120 min'] },\r\n${enNotice}`
);

// Insert priceNotice into JP
landingSrc = landingSrc.replace(
  `  priceSection: { title: 'COURSE & PRICE', head: 'コース', durations: ['60分', '90分', '120分'] },`,
  `  priceSection: { title: 'COURSE & PRICE', head: 'コース', durations: ['60分', '90分', '120分'] },\r\n${jpNotice}`
);

// Insert priceNotice into CN
landingSrc = landingSrc.replace(
  `  priceSection: { title: 'COURSE & PRICE', head: '课程', durations: ['60分钟', '90分钟', '120分钟'] },`,
  `  priceSection: { title: 'COURSE & PRICE', head: '课程', durations: ['60分钟', '90分钟', '120分钟'] },\r\n${cnNotice}`
);

// Update FAQ pricing note in EN, JP, CN
landingSrc = landingSrc.replace(
  `  - 120 min : ₩280,000',`,
  `  - 120 min : ₩280,000\\n\\n※ International VIP pricing includes dedicated multilingual concierge support, priority dispatch of top-tier therapists, hotel rapid transit, and 100% pay-on-arrival scam protection.',`
);

landingSrc = landingSrc.replace(
  `  - 120分 : 280,000ウォン',`,
  `  - 120分 : 280,000ウォン\\n\\n※ 外国人・ホテルVIP料金には、専任日本語対応、特選エース優先配属、ソウル全域ホテル出張交通費、100%完全後払い保証が全て含まれております。',`
);

landingSrc = landingSrc.replace(
  `  - 120分钟 : 280,000韩元',`,
  `  - 120分钟 : 280,000韩元\\n\\n※ 国际宾客专属VIP价格已全包中文专职客服、顶级王牌优先派遣、首尔酒店快速上门交通费及100%现场后付保障。',`
);

// Remove '한국어' from foreign globalLine
landingSrc = landingSrc.replace(
  `  globalLine: '한국어 · 日本語 · 中文 · WhatsApp',`,
  `  globalLine: 'English · 日本語 · 中文 · WhatsApp 24/7 Concierge',`
);
landingSrc = landingSrc.replace(
  `  globalLine: '한국어 · English · 中文 · WhatsApp',`,
  `  globalLine: 'English · 日本語 · 中文 · WhatsApp 24/7 Concierge',`
);
landingSrc = landingSrc.replace(
  `  globalLine: '한국어 · English · 日本語 · WhatsApp',`,
  `  globalLine: 'English · 日本語 · 中文 · WhatsApp 24/7 Concierge',`
);

fs.writeFileSync(landingPath, landingSrc, 'utf8');
console.log('landing-content.ts updated successfully.');

// 2. Update AbamLanding.tsx
const landingComponentPath = path.join(__dirname, 'src', 'components', 'AbamLanding.tsx');
let compSrc = fs.readFileSync(landingComponentPath, 'utf8');

// Filter out KR link when !isKo in header language switcher
const oldNavLangs = `{LANGS.map((l) =>
                l.code === c.lang ? (
                  <span key={l.code} style={{ color: C.gold, fontWeight: 800 }}>{l.label}</span>
                ) : (
                  <Link key={l.code} href={l.href} style={{ color: C.sub, textDecoration: 'none' }}>{l.label}</Link>
                ),
              )}`;

const newNavLangs = `{(isKo ? LANGS : LANGS.filter((l) => l.code !== 'ko')).map((l) =>
                l.code === c.lang ? (
                  <span key={l.code} style={{ color: C.gold, fontWeight: 800 }}>{l.label}</span>
                ) : (
                  <Link key={l.code} href={l.href} style={{ color: C.sub, textDecoration: 'none' }}>{l.label}</Link>
                ),
              )}`;

if (compSrc.includes(oldNavLangs)) {
  compSrc = compSrc.replace(oldNavLangs, newNavLangs);
} else {
  // If line breaks differ, use regex
  compSrc = compSrc.replace(
    /\{LANGS\.map\(\(l\)\s*=>/g,
    '{(isKo ? LANGS : LANGS.filter((l) => l.code !== \'ko\')).map((l) =>'
  );
}

// Render priceNotice right after courses list in priceSection
const targetCourseClose = `              </article>
            ))}
          </div>
        </section>`;

const targetCourseCloseRegex = /<\/article>\s*\)\)\}\s*<\/div>\s*<\/section>/;

const priceNoticeSnippet = `              </article>
            ))}
          </div>

          {/* 외국인 전용 VIP 요금 정책 및 할증 사유 명시 (외국인 페이지에만 노출) */}
          {c.priceNotice && (
            <div
              style={{
                ...glass,
                marginTop: '18px',
                padding: '20px 18px',
                border: \`1px solid \${C.goldLine}\`,
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
                  <div key={ri} style={{ display: 'flex', gap: '11px', alignItems: 'flex-start', background: 'rgba(255,255,255,0.04)', padding: '11px 13px', borderRadius: '8px', borderLeft: \`3px solid \${C.gold}\` }}>
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
        </section>`;

if (compSrc.includes(targetCourseClose)) {
  compSrc = compSrc.replace(targetCourseClose, priceNoticeSnippet);
} else {
  compSrc = compSrc.replace(targetCourseCloseRegex, priceNoticeSnippet);
}

fs.writeFileSync(landingComponentPath, compSrc, 'utf8');
console.log('AbamLanding.tsx updated successfully.');
