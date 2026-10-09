const fs = require('fs');

// 1. Update landing-content.ts
const landingPath = 'src/lib/landing-content.ts';
let landing = fs.readFileSync(landingPath, 'utf8');
const isCrlf = landing.includes('\r\n');
if (isCrlf) landing = landing.replace(/\r\n/g, '\n');

// Add foreign price objects right after PRICES
const oldPricesDef = `const PRICES = {
  thai: ['80,000원', '100,000원', '120,000원'],
  aroma: ['90,000원', '110,000원', '140,000원'],
  special: ['100,000원', '120,000원', '160,000원'],
};`;

const newPricesDef = `const PRICES = {
  thai: ['80,000원', '100,000원', '120,000원'],
  aroma: ['90,000원', '110,000원', '140,000원'],
  special: ['100,000원', '120,000원', '160,000원'],
};

/* 외국인 전용 VIP 프리미엄 요금표 (업계 표준 호텔·방문 단가) */
const PRICES_GLOBAL = {
  thai: ['₩150,000', '₩180,000', '₩220,000'],
  aroma: ['₩160,000', '₩200,000', '₩250,000'],
  special: ['₩180,000', '₩230,000', '₩280,000'],
};

const PRICES_JP = {
  thai: ['150,000ウォン', '180,000ウォン', '220,000ウォン'],
  aroma: ['160,000ウォン', '200,000ウォン', '250,000ウォン'],
  special: ['180,000ウォン', '230,000ウォン', '280,000ウォン'],
};

const PRICES_CN = {
  thai: ['150,000韩元', '180,000韩元', '220,000韩元'],
  aroma: ['160,000韩元', '200,000韩元', '250,000韩元'],
  special: ['180,000韩元', '230,000韩元', '280,000韩元'],
};`;

if (!landing.includes(oldPricesDef)) {
  console.error('oldPricesDef not found!');
  process.exit(1);
}
landing = landing.replace(oldPricesDef, newPricesDef);

// Update EN courses
const oldEnCourses = `  courses: [
    { no: 1, name: 'Thai', subtitle: 'Traditional dry acupressure · Refreshing pressure', desc: 'Traditional Wat Pho-style dry acupressure releases tight muscles, and stretching restores your body’s balance.', img: IMG.thai, icon: '🍃', tint: TINT.thai, prices: PRICES.thai },
    { no: 2, name: 'Aroma', subtitle: 'Natural aroma oil · Gentle care', desc: 'Using natural plant-based aroma oils, we gently care for your whole body and support lymphatic circulation and deep rest.', img: IMG.aroma, icon: '🌸', tint: TINT.aroma, prices: PRICES.aroma },
    { no: 3, name: 'Special', subtitle: 'Thai + Aroma combination care', desc: 'A premium course that combines the refreshing acupressure of Thai and the gentle oil treatment of Aroma at the same time.', img: IMG.special, icon: '🍃🌸', tint: TINT.special, prices: PRICES.special },
  ],`;

const newEnCourses = `  courses: [
    { no: 1, name: 'Thai', subtitle: 'Traditional dry acupressure · Refreshing pressure', desc: 'Traditional Wat Pho-style dry acupressure releases tight muscles, and stretching restores your body’s balance.', img: IMG.thai, icon: '🍃', tint: TINT.thai, prices: PRICES_GLOBAL.thai },
    { no: 2, name: 'Aroma', subtitle: 'Natural aroma oil · Gentle care', desc: 'Using natural plant-based aroma oils, we gently care for your whole body and support lymphatic circulation and deep rest.', img: IMG.aroma, icon: '🌸', tint: TINT.aroma, prices: PRICES_GLOBAL.aroma },
    { no: 3, name: 'Special', subtitle: 'Thai + Aroma combination care', desc: 'A premium course that combines the refreshing acupressure of Thai and the gentle oil treatment of Aroma at the same time.', img: IMG.special, icon: '🍃🌸', tint: TINT.special, prices: PRICES_GLOBAL.special },
  ],`;

landing = landing.replace(oldEnCourses, newEnCourses);

// Update EN FAQ & About
const oldEnFaqPrice = `      q: 'How much is each course?',
      a: 'Transparent flat-rate pricing across all courses:\\n\\n• Thai Care (Dry)\\n  -  60 min :  ₩80,000\\n  -  90 min : ₩100,000\\n  - 120 min : ₩120,000\\n\\n• Aroma Care (Oil)\\n  -  60 min :  ₩90,000\\n  -  90 min : ₩110,000\\n  - 120 min : ₩140,000\\n\\n• Special Care (Thai + Aroma)\\n  -  60 min : ₩100,000\\n  -  90 min : ₩120,000\\n  - 120 min : ₩160,000',`;

const newEnFaqPrice = `      q: 'How much is each course?',
      a: 'Transparent flat-rate VIP pricing across all courses:\\n\\n• Thai Care (Dry)\\n  -  60 min : ₩150,000\\n  -  90 min : ₩180,000\\n  - 120 min : ₩220,000\\n\\n• Aroma Care (Oil)\\n  -  60 min : ₩160,000\\n  -  90 min : ₩200,000\\n  - 120 min : ₩250,000\\n\\n• Special Care (Thai + Aroma)\\n  -  60 min : ₩180,000\\n  -  90 min : ₩230,000\\n  - 120 min : ₩280,000',`;

landing = landing.replace(oldEnFaqPrice, newEnFaqPrice);

landing = landing.replace(
  "p2: 'Choose from 3 courses — Thai (from ₩80,000 / 60 min), Aroma (from ₩90,000 / 60 min) and Special (from ₩100,000 / 60 min) — in 60, 90 or 120 minutes.',",
  "p2: 'Choose from 3 VIP courses — Thai (from ₩150,000 / 60 min), Aroma (from ₩160,000 / 60 min) and Special (from ₩180,000 / 60 min) — in 60, 90 or 120 minutes.',"
);

// Update JP courses
const oldJpCourses = `  courses: [
    { no: 1, name: 'タイ', subtitle: '伝統的な乾式指圧 · 爽快な圧', desc: 'ワットポー伝統式の乾式指圧で凝り固まった筋肉をすっきりほぐし、ストレッチで体のバランスを整えます。', img: IMG.thai, icon: '🍃', tint: TINT.thai, prices: PRICES.thai },
    { no: 2, name: 'アロマ', subtitle: '天然アロマオイル · やさしいケア', desc: '天然植物性アロマオイルを使用して全身をやさしくケアし、リンパの流れと深いリラックスをサポートします。', img: IMG.aroma, icon: '🌸', tint: TINT.aroma, prices: PRICES.aroma },
    { no: 3, name: 'スペシャル', subtitle: 'タイ + アロマ 複合ケア', desc: 'タイの爽快な指圧とアロマのやさしいオイルトリートメントを同時に受けられるプレミアムコースです。', img: IMG.special, icon: '🍃🌸', tint: TINT.special, prices: PRICES.special },
  ],`;

const newJpCourses = `  courses: [
    { no: 1, name: 'タイ', subtitle: '伝統的な乾式指圧 · 爽快な圧', desc: 'ワットポー伝統式の乾式指圧で凝り固まった筋肉をすっきりほぐし、ストレッチで体のバランスを整えます。', img: IMG.thai, icon: '🍃', tint: TINT.thai, prices: PRICES_JP.thai },
    { no: 2, name: 'アロマ', subtitle: '天然アロマオイル · やさしいケア', desc: '天然植物性アロマオイルを使用して全身をやさしくケアし、リンパの流れと深いリラックスをサポートします。', img: IMG.aroma, icon: '🌸', tint: TINT.aroma, prices: PRICES_JP.aroma },
    { no: 3, name: 'スペシャル', subtitle: 'タイ + アロマ 複合ケア', desc: 'タイの爽快な指圧とアロマのやさしいオイルトリートメントを同時に受けられるプレミアムコースです。', img: IMG.special, icon: '🍃🌸', tint: TINT.special, prices: PRICES_JP.special },
  ],`;

landing = landing.replace(oldJpCourses, newJpCourses);

const oldJpFaqPrice = `      q: 'コース別の料金を教えてください。',
      a: '全コース明朗会計の定額料金制です。\\n\\n• タイコース (乾式指圧)\\n  -  60分 :  80,000ウォン\\n  -  90分 : 100,000ウォン\\n  - 120分 : 120,000ウォン\\n\\n• アロマコース (天然オイル)\\n  -  60分 :  90,000ウォン\\n  -  90分 : 110,000ウォン\\n  - 120分 : 140,000ウォン\\n\\n• スペシャルコース (タイ + アロマ)\\n  -  60分 : 100,000ウォン\\n  -  90分 : 120,000ウォン\\n  - 120分 : 160,000ウォン',`;

const newJpFaqPrice = `      q: 'コース別の料金を教えてください。',
      a: '全コース明朗会計のVIP定額料金制です。\\n\\n• タイコース (乾式指圧)\\n  -  60分 : 150,000ウォン\\n  -  90分 : 180,000ウォン\\n  - 120分 : 220,000ウォン\\n\\n• アロマコース (天然オイル)\\n  -  60分 : 160,000ウォン\\n  -  90分 : 200,000ウォン\\n  - 120分 : 250,000ウォン\\n\\n• スペシャルコース (タイ + アロマ)\\n  -  60分 : 180,000ウォン\\n  -  90分 : 230,000ウォン\\n  - 120分 : 280,000ウォン',`;

landing = landing.replace(oldJpFaqPrice, newJpFaqPrice);

landing = landing.replace(
  "p2: 'タイ(60分 80,000ウォン〜)、アロマ(60分 90,000ウォン〜)、スペシャル(60分 100,000ウォン〜)の3コースを、60・90・120分からお選びいただけます。',",
  "p2: 'タイ(60分 150,000ウォン〜)、アロマ(60分 160,000ウォン〜)、スペシャル(60分 180,000ウォン〜)の3コースを、60・90・120分からお選びいただけます。',"
);

// Update CN courses
const oldCnCourses = `  courses: [
    { no: 1, name: '泰式', subtitle: '传统干式指压 · 清爽力度', desc: '以卧佛寺传统方式进行干式指压，舒缓僵硬的肌肉，并通过拉伸调整身体的平衡。', img: IMG.thai, icon: '🍃', tint: TINT.thai, prices: PRICES.thai },
    { no: 2, name: '芳香', subtitle: '天然芳香精油 · 温柔护理', desc: '使用天然植物性芳香精油温柔护理全身，帮助淋巴循环并获得深度放松。', img: IMG.aroma, icon: '🌸', tint: TINT.aroma, prices: PRICES.aroma },
    { no: 3, name: '特别', subtitle: '泰式 + 芳香 复合护理', desc: '可同时享受泰式清爽指压与芳香温柔精油护理的高级课程。', img: IMG.special, icon: '🍃🌸', tint: TINT.special, prices: PRICES.special },
  ],`;

const newCnCourses = `  courses: [
    { no: 1, name: '泰式', subtitle: '传统干式指压 · 清爽力度', desc: '以卧佛寺传统方式进行干式指压，舒缓僵硬的肌肉，并通过拉伸调整身体的平衡。', img: IMG.thai, icon: '🍃', tint: TINT.thai, prices: PRICES_CN.thai },
    { no: 2, name: '芳香', subtitle: '天然芳香精油 · 温柔护理', desc: '使用天然植物性芳香精油温柔护理全身，帮助淋巴循环并获得深度放松。', img: IMG.aroma, icon: '🌸', tint: TINT.aroma, prices: PRICES_CN.aroma },
    { no: 3, name: '特别', subtitle: '泰式 + 芳香 复合护理', desc: '可同时享受泰式清爽指压与芳香温柔精油护理的高级课程。', img: IMG.special, icon: '🍃🌸', tint: TINT.special, prices: PRICES_CN.special },
  ],`;

landing = landing.replace(oldCnCourses, newCnCourses);

const oldCnFaqPrice = `      q: '各课程的价格是多少？',
      a: '全课程明码标价，透明公开:\\n\\n• 泰式课程 (干式指压)\\n  -  60分钟 :  80,000韩元\\n  -  90分钟 : 100,000韩元\\n  - 120分钟 : 120,000韩元\\n\\n• 芳香课程 (天然精油)\\n  -  60分钟 :  90,000韩元\\n  -  90分钟 : 110,000韩元\\n  - 120分钟 : 140,000韩元\\n\\n• 特别课程 (泰式 + 芳香)\\n  -  60分钟 : 100,000韩元\\n  -  90分钟 : 120,000韩元\\n  - 120分钟 : 160,000韩元',`;

const newCnFaqPrice = `      q: '各课程的价格是多少？',
      a: '全课程明码标价，透明公开:\\n\\n• 泰式课程 (干式指压)\\n  -  60分钟 : 150,000韩元\\n  -  90分钟 : 180,000韩元\\n  - 120分钟 : 220,000韩元\\n\\n• 芳香课程 (天然精油)\\n  -  60分钟 : 160,000韩元\\n  -  90分钟 : 200,000韩元\\n  - 120分钟 : 250,000韩元\\n\\n• 特别课程 (泰式 + 芳香)\\n  -  60分钟 : 180,000韩元\\n  -  90分钟 : 230,000韩元\\n  - 120分钟 : 280,000韩元',`;

landing = landing.replace(oldCnFaqPrice, newCnFaqPrice);

landing = landing.replace(
  "p2: '泰式(60分钟 80,000韩元起)、芳香(60分钟 90,000韩元起)、特别(60分钟 100,000韩元起)三种课程，可选择60、90、120分钟。',",
  "p2: '泰式(60分钟 150,000韩元起)、芳香(60分钟 160,000韩元起)、特别(60分钟 180,000韩元起)三种课程，可选择60、90、120分钟。',"
);

if (isCrlf) landing = landing.replace(/\n/g, '\r\n');
fs.writeFileSync(landingPath, landing, 'utf8');
console.log('landing-content.ts foreign pricing successfully updated!');

// 2. Update EN layout.tsx
const enLayoutPath = 'src/app/en/layout.tsx';
let enL = fs.readFileSync(enLayoutPath, 'utf8');
enL = enL.replace(
  "title: 'Abam.kr | Private 1:1 Home Visit Care · Seoul Home & Hotel',",
  "title: 'Abam.kr | Seoul Outcall Massage · Hotel & Home 1:1 Private Care',"
);
enL = enL.replace(
  "description:\n    'A beautiful night, a special time just for you. Abam.kr private 1:1 home visit care across Seoul — home and hotel. Booking from 18:00 (open 19:00~05:00). Thai, Aroma and Special courses in 60/90/120 minutes.',",
  "description:\n    'Premium Seoul outcall massage & in-room hotel service. Top 20s ACE therapists on standby across all of Seoul. 20-30 min fast arrival, 100% pay-on-arrival (no advance deposit). Booking from 18:00 (open 19:00~05:00).',"
);
enL = enL.replace(
  "keywords: [\n    'Abam.kr',\n    'Seoul home visit care',\n    'Seoul private home care',\n    'Seoul hotel massage',\n    'Thai massage Seoul',\n    'Aroma massage Seoul',\n  ].join(', '),",
  "keywords: [\n    'Seoul outcall massage',\n    'Seoul hotel massage',\n    'Seoul in-room massage',\n    'Gangnam hotel massage',\n    'Seoul private home care',\n    'Thai massage Seoul',\n    'Aroma massage Seoul',\n    'Abam.kr',\n  ].join(', '),"
);
fs.writeFileSync(enLayoutPath, enL, 'utf8');
console.log('en/layout.tsx updated!');

// 3. Update JP layout.tsx
const jpLayoutPath = 'src/app/jp/layout.tsx';
let jpL = fs.readFileSync(jpLayoutPath, 'utf8');
jpL = jpL.replace(
  "title: 'Abam.kr | プライベート1:1訪問ホームケア・ソウル全域 ご自宅・ホテル',",
  "title: 'Abam.kr | ソウル 出張マッサージ · ホテル・自宅 1:1 プライベートケア',"
);
jpL = jpL.replace(
  "description:\n    '美しい夜、あなたのための特別な時間。Abam.kr プライベート1:1訪問ホームケア。ソウル全域のご自宅・ホテルへ訪問。ご予約は18:00から（営業 19:00~05:00）。タイ・アロマ・スペシャルの3コース、60分/90分/120分。',",
  "description:\n    'ソウル出張マッサージ・ホテル客室への1:1プライベート訪問ケア。20代エースセラピスト常時待機、ソウル全域30分以内に迅速到着。安心の完全後払い制（事前振込・予約金ゼロ）。ご予約は18:00から（営業 19:00〜05:00）。',"
);
jpL = jpL.replace(
  "keywords: [\n    'Abam.kr',\n    'ソウル 訪問ホームケア',\n    'ソウル ホテル マッサージ',\n    'ソウル タイ式 マッサージ',\n    'ソウル アロマ マッサージ',\n  ].join(', '),",
  "keywords: [\n    'ソウル 出張マッサージ',\n    'ソウル ホテル マッサージ',\n    'カンナム 出張マッサージ',\n    'ソウル エステ 出張',\n    'ソウル アロマ マッサージ',\n    'ソウル タイ式 マッサージ',\n    'Abam.kr',\n  ].join(', '),"
);
fs.writeFileSync(jpLayoutPath, jpL, 'utf8');
console.log('jp/layout.tsx updated!');

// 4. Update CN layout.tsx
const cnLayoutPath = 'src/app/cn/layout.tsx';
let cnL = fs.readFileSync(cnLayoutPath, 'utf8');
cnL = cnL.replace(
  "title: 'Abam.kr | 私密1:1上门居家护理・首尔全境 住宅・酒店',",
  "title: 'Abam.kr | 首尔上门按摩 · 酒店・住宅 1:1 私密高端护理',"
);
cnL = cnL.replace(
  "description:\n    '美丽的夜晚，专属于您的特别时光。Abam.kr 私密1:1上门居家护理。首尔全境住宅、酒店上门。预约从18:00开始（营业 19:00~05:00）。泰式、芳香、特别三种课程，60分钟/90分钟/120分钟。',",
  "description:\n    '首尔高端上门按摩与酒店客房1:1私密护理。全员20代王牌技师团队，首尔全境20~30分钟内极速抵达。无定金100%现场后付款，安全放心。预约从18:00开始（营业 19:00~05:00）。',"
);
cnL = cnL.replace(
  "keywords: [\n    'Abam.kr',\n    '首尔上门居家护理',\n    '首尔酒店上门按摩',\n    '首尔泰式按摩',\n    '首尔芳香精油按摩',\n  ].join(', '),",
  "keywords: [\n    '首尔上门按摩',\n    '首尔酒店上门按摩',\n    '江南上门按摩',\n    '首尔出差按摩',\n    '首尔泰式精油',\n    '首尔出差SPA',\n    'Abam.kr',\n  ].join(', '),"
);
fs.writeFileSync(cnLayoutPath, cnL, 'utf8');
console.log('cn/layout.tsx updated!');
