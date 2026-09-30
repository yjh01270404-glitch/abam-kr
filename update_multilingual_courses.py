# -*- coding: utf-8 -*-

NEW_EN_COURSES = '''const EN_COURSES = [
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
];'''

NEW_JP_COURSES = '''const JP_COURSES = [
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
];'''

NEW_CN_COURSES = '''const CN_COURSES = [
  {
    id: 'thai',
    name: '正统泰式干式指压理疗',
    tag: '卧佛寺皇家指压·全身经络拉伸',
    badge: '不涂精油·穿纯棉管理服',
    img: '/images/thai.jpg',
    desc: '不使用精油，换上舒适纯棉管理服进行的卧佛寺正统干式理疗。深层缓解旅途劳顿，改善骨盆肩颈疲劳。',
    prices: [
      { time: '60分钟', price: '80,000韩元 (约¥420)' },
      { time: '90分钟', price: '100,000韩元 (约¥530)', isBest: true },
      { time: '120分钟 (2小时)', price: '120,000韩元 (约¥630)' },
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
      { time: '60分钟', price: '90,000韩元 (约¥475)' },
      { time: '90分钟', price: '120,000韩元 (约¥630)', isBest: true },
      { time: '120分钟 (2小时)', price: '150,000韩元 (约¥790)' },
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
      { time: '60分钟', price: '90,000韩元 (约¥475)' },
      { time: '90分钟', price: '110,000韩元 (约¥580)', isBest: true },
      { time: '120分钟 (2小时)', price: '140,000韩元 (约¥740)' },
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
      { time: '60分钟', price: '100,000韩元 (约¥530)' },
      { time: '90分钟', price: '140,000韩元 (约¥740)', isBest: true },
      { time: '120分钟 (2小时)', price: '170,000韩元 (约¥900)' },
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
      { time: '60分钟', price: '120,000韩元 (约¥630)' },
      { time: '90分钟', price: '160,000韩元 (约¥845)', isBest: true },
      { time: '120分钟 (2小时)', price: '200,000韩元 (约¥1,055)' },
    ],
  },
];'''

def update_lang(lang, var_name, new_code):
    path = f'src/app/{lang}/page.tsx'
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    start = content.find(f'const {var_name} = [')
    end = content.find('];', start)
    if start == -1 or end == -1:
        print(f'Error finding {var_name} in {lang}')
        return
    content = content[:start] + new_code + content[end+2:]
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f'Updated {lang}/page.tsx with standard market prices successfully!')

update_lang('en', 'EN_COURSES', NEW_EN_COURSES)
update_lang('jp', 'JP_COURSES', NEW_JP_COURSES)
update_lang('cn', 'CN_COURSES', NEW_CN_COURSES)
