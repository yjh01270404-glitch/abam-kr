/**
 * 아름다운밤 (abam.kr) 등급별(VVIP / GRAND VIP / PREMIUM) 구조적 차별화 AI 배너 자동 생성기 (Version 6.0)
 * 
 * 👑 VVIP: 600x320 3D 대형 시네마틱 클럽 스테이지 + 이중 회전 네온 레이저 + 3D 입체 타이포 + 레드 1424/1375 대형 숫자 뱃지 + 하단 전화 바
 * 🎖️ GRAND VIP: 600x250 사이버 퍼플 네온 프레임 + 엠블럼 뱃지 + 네온 그린 일급 뱃지 + 컴팩트 레이아웃
 * 💎 PREMIUM: 600x180 사파이어 블루 슬림 바 + 분할 그라데이션 타이포 + 퀵 콜 버튼
 */

export interface BannerInfo {
  id?: string | number;
  tier?: 'vvip' | 'grandvip' | 'premium' | string;
  companyName: string;
  title: string;
  pay: string;
  location: string;
  contactPhone?: string;
  contactKakao?: string;
  badge?: string;
}

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

// 12가지 화려한 클럽 스테이지 레이저 배경
const CLUB_LASER_BGS = [
  { bg1: '#090514', bg2: '#2e0854', laser1: '#ec4899', laser2: '#06b6d4', glow: '#f43f5e' }, // Cyber Pink & Cyan
  { bg1: '#1a051d', bg2: '#5b0640', laser1: '#f43f5e', laser2: '#fbbf24', glow: '#ec4899' }, // Neon Rose & Gold
  { bg1: '#030712', bg2: '#1e1b4b', laser1: '#38bdf8', laser2: '#c084fc', glow: '#3b82f6' }, // Sapphire & Violet
  { bg1: '#051923', bg2: '#004369', laser1: '#00e676', laser2: '#00b0ff', glow: '#1de9b6' }, // Emerald Cyber
  { bg1: '#1c0a00', bg2: '#4a1500', laser1: '#ffab00', laser2: '#ff1744', glow: '#ff9100' }, // Crimson Flame
  { bg1: '#12002b', bg2: '#4a0072', laser1: '#e040fb', laser2: '#00e5ff', glow: '#d500f9' }, // Amethyst Strobe
  { bg1: '#00101d', bg2: '#003666', laser1: '#00b0ff', laser2: '#76ff03', glow: '#00e5ff' }, // Electric Blue
  { bg1: '#1c0018', bg2: '#58003b', laser1: '#ff4081', laser2: '#ffd600', glow: '#ff1744' }, // Glamour Magenta
  { bg1: '#0a0a0a', bg2: '#2d2d2d', laser1: '#ffd700', laser2: '#ffffff', glow: '#ffab00' }, // Gold VIP Suite
  { bg1: '#190019', bg2: '#4d004d', laser1: '#ff007f', laser2: '#00ffff', glow: '#ff00ff' }, // Tokyo Cyber Neon
  { bg1: '#001f1d', bg2: '#005b56', laser1: '#1de9b6', laser2: '#ff4081', glow: '#64ffda' }, // Lagoon Stage
  { bg1: '#180018', bg2: '#3c003c', laser1: '#e040fb', laser2: '#ff9100', glow: '#f50057' }  // Club Strobe Sunset
];

const SLANTED_CATCHPHRASES = [
  '🔥 엉덩일 흔들어봐!',
  '⚡ PARTY WITHOUT ME',
  '👑 HIP SONG EXCLUSIVE',
  '💎 당일 100% 현금정산',
  '💖 에이스 최고대우 보장',
  '🍹 하이앤드 럭셔리 룸',
  '🎉 NO.1 프리미엄 살롱 라운지',
  '✨ 초보·대학생 1초 환영',
  '🚀 일급 50만~100만+@',
  '🍸 최고 분위기 자유근무',
  '🔮 럭셔리 룸 바텐더',
  '🥂 샴페인 VIP 라운지'
];

export function generateAbamBannerSvg(info: BannerInfo): string {
  const company = info.companyName || '아름다운밤 럭셔리 업소';
  const pay = info.pay || '일급 50만원 이상';
  const loc = (info.location || '서울 강남').split(' ')[0] + ' ' + ((info.location || '').split(' ')[1] || '');
  const phone = info.contactPhone || '010-8057-6615';
  const tier = (info.tier || 'vvip').toLowerCase();
  const title = info.title ? info.title.slice(0, 24) : '당일100%정산 / 럭셔리 근무환경 / 초보환영';

  const seed = hashString(`${company}_${pay}_${loc}_${info.id || 1}`);
  const theme = CLUB_LASER_BGS[seed % CLUB_LASER_BGS.length];
  const catchphrase = SLANTED_CATCHPHRASES[seed % SLANTED_CATCHPHRASES.length];
  const numberTag = 1300 + (seed % 600);

  // 👑 1. VVIP TIER: 600x320 3D 시네마틱 클럽 스테이지 구조
  if (tier === 'vvip' || tier === 'top') {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="320" viewBox="0 0 600 320">
    <defs>
      <linearGradient id="clubBg_${seed}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${theme.bg1}" />
        <stop offset="50%" stop-color="${theme.bg2}" />
        <stop offset="100%" stop-color="${theme.bg1}" />
      </linearGradient>
      <linearGradient id="textGrad_${seed}" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#ffffff" />
        <stop offset="60%" stop-color="#f8fafc" />
        <stop offset="100%" stop-color="#cbd5e1" />
      </linearGradient>
      <linearGradient id="redNumGrad_${seed}" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#ff1744" />
        <stop offset="50%" stop-color="#d50000" />
        <stop offset="100%" stop-color="#990000" />
      </linearGradient>
      <filter id="laserGlow_${seed}" x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="5" result="blur1" />
        <feGaussianBlur stdDeviation="12" result="blur2" />
        <feMerge><feMergeNode in="blur2" /><feMergeNode in="blur1" /><feMergeNode in="SourceGraphic" /></feMerge>
      </filter>
      <filter id="heavyDropShadow_${seed}" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="3" dy="5" stdDeviation="3" flood-color="#000000" flood-opacity="0.95" />
      </filter>
      <style>
        @keyframes laserSweep1 { 0% { transform: rotate(0deg); opacity: 0.3; } 50% { transform: rotate(15deg); opacity: 0.8; } 100% { transform: rotate(0deg); opacity: 0.3; } }
        @keyframes laserSweep2 { 0% { transform: rotate(0deg); opacity: 0.4; } 50% { transform: rotate(-18deg); opacity: 0.9; } 100% { transform: rotate(0deg); opacity: 0.4; } }
        @keyframes starSparkle { 0%, 100% { opacity: 0.2; transform: scale(0.8); } 50% { opacity: 1; transform: scale(1.3); } }
        @keyframes textNeonPulse { 0%, 100% { filter: drop-shadow(0 0 6px ${theme.laser1}); } 50% { filter: drop-shadow(0 0 18px ${theme.glow}); } }
        @keyframes redNumStrobe { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.88; transform: scale(1.04); } }
        @keyframes borderGlowPulse { 0%, 100% { stroke: ${theme.laser1}; } 50% { stroke: ${theme.laser2}; } }
        .anim-laser1 { animation: laserSweep1 4s infinite ease-in-out; transform-origin: 150px 150px; }
        .anim-laser2 { animation: laserSweep2 5s infinite ease-in-out; transform-origin: 450px 150px; }
        .anim-sparkle1 { animation: starSparkle 1.8s infinite ease-in-out; }
        .anim-sparkle2 { animation: starSparkle 2.4s infinite ease-in-out 0.6s; }
        .anim-text-neon { animation: textNeonPulse 2s infinite ease-in-out; }
        .anim-red-num { animation: redNumStrobe 1.2s infinite ease-in-out; }
        .anim-border { animation: borderGlowPulse 2.5s infinite ease-in-out; }
      </style>
    </defs>
    <rect width="600" height="320" rx="14" fill="url(#clubBg_${seed})" stroke="${theme.laser1}" stroke-width="3.5" className="anim-border" />
    <g opacity="0.65" filter="url(#laserGlow_${seed})">
      <g className="anim-laser1">
        <line x1="-50" y1="350" x2="350" y2="-50" stroke="${theme.laser1}" stroke-width="14" />
        <line x1="300" y1="350" x2="650" y2="0" stroke="${theme.glow}" stroke-width="18" />
      </g>
      <g className="anim-laser2">
        <line x1="100" y1="350" x2="500" y2="-50" stroke="${theme.laser2}" stroke-width="10" />
        <line x1="-50" y1="100" x2="450" y2="350" stroke="${theme.laser1}" stroke-width="8" />
      </g>
    </g>
    <g>
      <text x="70" y="50" font-size="20" fill="#ffffff" className="anim-sparkle1">✨</text>
      <text x="320" y="45" font-size="24" fill="#ffff00" className="anim-sparkle2">⭐</text>
      <text x="520" y="80" font-size="22" fill="#00ffff" className="anim-sparkle1">✨</text>
    </g>
    <g transform="translate(15, 20)">
      <path d="M 90 270 Q 70 200 85 140 Q 95 100 115 70 Q 135 40 155 70 Q 175 100 185 140 Q 200 200 180 270 Z" fill="${theme.bg2}" stroke="${theme.laser1}" stroke-width="4" filter="url(#laserGlow_${seed})" opacity="0.7" />
      <circle cx="135" cy="75" r="38" fill="#1e1b4b" stroke="${theme.laser2}" stroke-width="3" />
      <path d="M 100 95 Q 135 130 170 95 Q 185 180 175 270 L 95 270 Z" fill="#0f172a" stroke="${theme.glow}" stroke-width="2.5" />
      <text x="135" y="165" font-family="'Pretendard', sans-serif" font-weight="900" font-size="28" fill="${theme.laser1}" text-anchor="middle">💃</text>
    </g>
    <g transform="translate(240, 25)">
      <rect x="0" y="0" width="130" height="28" rx="14" fill="${theme.glow}" />
      <text x="65" y="19" font-family="'Pretendard', sans-serif" font-weight="900" font-size="12" fill="#ffffff" text-anchor="middle">📍 ${loc}</text>
      <rect x="140" y="0" width="190" height="28" rx="14" fill="#0f172a" stroke="${theme.laser2}" stroke-width="1.5" />
      <text x="235" y="19" font-family="'Pretendard', sans-serif" font-weight="900" font-size="12" fill="${theme.laser2}" text-anchor="middle">👑 VVIP 100% 검증업소</text>
    </g>
    <g transform="translate(240, 105) skewX(-8)" className="anim-text-neon">
      <text x="3" y="33" font-family="'Impact', 'Pretendard', sans-serif" font-weight="900" font-size="34" fill="#000000" stroke="#000000" stroke-width="6" stroke-linejoin="round">${catchphrase}</text>
      <text x="0" y="30" font-family="'Impact', 'Pretendard', sans-serif" font-weight="900" font-size="34" fill="url(#textGrad_${seed})" stroke="#000000" stroke-width="5" stroke-linejoin="round">${catchphrase}</text>
    </g>
    <g transform="translate(240, 160) skewX(-6)" filter="url(#heavyDropShadow_${seed})">
      <text x="0" y="26" font-family="'Pretendard', sans-serif" font-weight="900" font-size="27" fill="${theme.laser2}" stroke="#000000" stroke-width="4" stroke-linejoin="round">${company}</text>
    </g>
    <g transform="translate(240, 202)">
      <rect x="0" y="0" width="330" height="38" rx="8" fill="#000000" stroke="${theme.laser1}" stroke-width="2.5" />
      <text x="165" y="26" font-family="'Pretendard', sans-serif" font-weight="900" font-size="19" fill="#00ff91" text-anchor="middle" filter="url(#laserGlow_${seed})">💰 ${pay} (당일지급)</text>
    </g>
    <g transform="translate(420, 240)" className="anim-red-num">
      <text x="80" y="55" font-family="'Impact', sans-serif" font-weight="900" font-size="64" fill="none" stroke="#ffffff" stroke-width="10" stroke-linejoin="round" text-anchor="end">${numberTag}</text>
      <text x="80" y="55" font-family="'Impact', sans-serif" font-weight="900" font-size="64" fill="url(#redNumGrad_${seed})" stroke="#000000" stroke-width="2" stroke-linejoin="round" text-anchor="end">${numberTag}</text>
    </g>
    <g transform="translate(240, 252)">
      <rect x="0" y="0" width="200" height="38" rx="8" fill="${theme.laser1}" />
      <text x="100" y="25" font-family="'Pretendard', sans-serif" font-weight="900" font-size="15" fill="#ffffff" text-anchor="middle">📞 ${phone}</text>
    </g>
    </svg>`;
  }

  // 🎖️ 2. GRAND VIP TIER: 600x250 사이버 퍼플 컴팩트 배너 구조
  if (tier === 'grandvip' || tier === 'grand') {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="250" viewBox="0 0 600 250">
    <defs>
      <linearGradient id="grandBg_${seed}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#1e1b4b" />
        <stop offset="50%" stop-color="#3b0764" />
        <stop offset="100%" stop-color="#1e1b4b" />
      </linearGradient>
      <filter id="grandGlow_${seed}">
        <feGaussianBlur stdDeviation="4" result="blur" /><feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>
    <rect width="600" height="250" rx="12" fill="url(#grandBg_${seed})" stroke="#a855f7" stroke-width="3" />
    <rect x="6" y="6" width="588" height="238" rx="8" fill="none" stroke="#e040fb" stroke-width="1.5" stroke-dasharray="6 3" />
    <g transform="translate(20, 20)">
      <rect x="0" y="0" width="130" height="26" rx="13" fill="#a855f7" />
      <text x="65" y="18" font-family="'Pretendard', sans-serif" font-weight="900" font-size="11.5" fill="#ffffff" text-anchor="middle">🎖️ GRAND VIP</text>
    </g>
    <g transform="translate(450, 20)">
      <rect x="0" y="0" width="130" height="26" rx="6" fill="#0f172a" stroke="#c084fc" stroke-width="1.5" />
      <text x="65" y="18" font-family="'Pretendard', sans-serif" font-weight="900" font-size="11.5" fill="#c084fc" text-anchor="middle">📍 ${loc}</text>
    </g>
    <text x="300" y="95" font-family="'Pretendard', sans-serif" font-weight="900" font-size="30" fill="#ffffff" text-anchor="middle" filter="url(#grandGlow_${seed})">${company}</text>
    <text x="300" y="130" font-family="'Pretendard', sans-serif" font-weight="800" font-size="16" fill="#e9d5ff" text-anchor="middle">${catchphrase}</text>
    <rect x="100" y="152" width="400" height="42" rx="10" fill="#581c87" stroke="#e040fb" stroke-width="2" />
    <text x="300" y="180" font-family="'Pretendard', sans-serif" font-weight="900" font-size="18" fill="#4ade80" text-anchor="middle">💰 ${pay} (당일정산)</text>
    <text x="300" y="222" font-family="'Pretendard', sans-serif" font-weight="800" font-size="13" fill="#fef08a" text-anchor="middle">📞 ${phone} · 아밤 추천업소</text>
    </svg>`;
  }

  // 💎 3. PREMIUM TIER: 600x180 슬림 모던 배너 구조
  return `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="180" viewBox="0 0 600 180">
  <defs>
    <linearGradient id="premBg_${seed}" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#0f172a" />
      <stop offset="100%" stop-color="#1e293b" />
    </linearGradient>
  </defs>
  <rect width="600" height="180" rx="10" fill="url(#premBg_${seed})" stroke="#38bdf8" stroke-width="2.5" />
  <rect x="16" y="14" width="110" height="24" rx="6" fill="#0284c7" />
  <text x="71" y="31" font-family="'Pretendard', sans-serif" font-weight="900" font-size="11" fill="#ffffff" text-anchor="middle">💎 PREMIUM</text>
  <text x="580" y="31" font-family="'Pretendard', sans-serif" font-weight="800" font-size="12" fill="#38bdf8" text-anchor="end">📍 ${loc}</text>
  <text x="300" y="78" font-family="'Pretendard', sans-serif" font-weight="900" font-size="25" fill="#ffffff" text-anchor="middle">${company}</text>
  <rect x="80" y="100" width="440" height="36" rx="8" fill="#1e3a8a" stroke="#60a5fa" stroke-width="1.5" />
  <text x="300" y="124" font-family="'Pretendard', sans-serif" font-weight="900" font-size="16" fill="#60a5fa" text-anchor="middle">💰 ${pay} · 📞 ${phone}</text>
  <text x="300" y="160" font-family="'Pretendard', sans-serif" font-weight="700" font-size="11.5" fill="#94a3b8" text-anchor="middle">${title}</text>
  </svg>`;
}
