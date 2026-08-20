'use client';

import React from 'react';
import styles from './BannerTemplate.module.css';

export type BannerTheme =
  | 'theme_strawberry'
  | 'theme_rosegold'
  | 'theme_lavender'
  | 'theme_peach'
  | 'theme_cherry'
  | 'theme_mint'
  | 'theme_champagne'
  | 'theme_coral';

export interface BannerStyle {
  id: string;
  bgGradient: string;
  textColor: string;
  borderColor: string;
  glowColor: string;
  decorations: string[];
  animationClass: string;
  badgeBg: string;
  badgeTextColor: string;
  tagBg: string;
  tagTextColor: string;
}

export interface BannerData {
  companyName: string;
  region: string;
  jobType: string;
  payType: string;
  payAmount: string;
  description: string;
  tags: string[];
  theme?: BannerTheme;
  customStyle?: BannerStyle;
}

// 24 highly styled gradient variations
const BG_GRADIENTS = [
  'linear-gradient(135deg, #ff007f 0%, #7928ca 100%)', // Neon Pink Purple
  'linear-gradient(135deg, #111111 0%, #d4af37 50%, #111111 100%)', // Gold Luxury
  'linear-gradient(135deg, #0d001a 0%, #30005a 45%, #7a00cc 85%, #0d001a 100%)', // Midnight Galaxy
  'linear-gradient(135deg, #021a11 0%, #00a86b 50%, #00ff88 100%)', // Emerald Glow
  'linear-gradient(135deg, #ff1a1a 0%, #ff8c00 50%, #ff007f 100%)', // Blazing Flame
  'linear-gradient(135deg, #001f4f 0%, #0056b3 40%, #00aaff 75%, #001f4f 100%)', // Ocean Wave
  'linear-gradient(135deg, #fff0f5 0%, #ffb7c5 55%, #ffa4b4 100%)', // Sakura Cherry (Light)
  'linear-gradient(135deg, #120136 0%, #03001e 30%, #7303c0 70%, #ec38bc 100%)', // Retro Wave
  'linear-gradient(135deg, #000000 0%, #1e293b 50%, #0f172a 100%)', // Slate Silver (Premium Sleek)
  'linear-gradient(135deg, #4b0082 0%, #8a2be2 50%, #dda0dd 100%)', // Indigo Velvet
  'linear-gradient(135deg, #ff7e5f 0%, #feb47b 100%)', // Sunset Peach
  'linear-gradient(135deg, #2c0003 0%, #800000 45%, #ff3333 80%, #2c0003 100%)', // Dark Crimson
  'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)', // Metallic Steel
  'linear-gradient(135deg, #134e5e 0%, #71b280 100%)', // Green Oasis
  'linear-gradient(135deg, #ec008c 0%, #fc6767 100%)', // Bubblegum Neon
  'linear-gradient(135deg, #ff0844 0%, #ffb199 100%)', // Coral Sunrise
  'linear-gradient(135deg, #1a002c 0%, #4c004c 50%, #990099 100%)', // Royal Purple Orchid
  'linear-gradient(135deg, #00c6ff 0%, #0072ff 100%)', // Sapphire Glow
  'linear-gradient(135deg, #f857a6 0%, #ff5858 100%)', // Sweet Rose
  'linear-gradient(135deg, #30cfd0 0%, #330867 100%)', // Aurora Abyss
  'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)', // Classy Royal Blue
  'linear-gradient(135deg, #000000 0%, #2c3e50 100%)', // Luxury Onyx
  'linear-gradient(135deg, #ffd700 0%, #ff8c00 50%, #b22222 100%)', // Solar Flare
  'linear-gradient(135deg, #23074d 0%, #cc5333 100%)', // Velvet Flame
];

const BORDER_COLORS = [
  '2px solid #ff007f', '3px solid #ffd700', '2px solid #a855f7',
  '2.5px solid #00ff88', '3px solid #ef4444', '2px solid #00ffff',
  '2px solid #fda4af', '2.5px solid #ec4899', '2px solid #e2e8f0',
  '2.5px solid #8b5cf6', '2px solid #f97316', '3px solid #b91c1c',
  '2px solid #94a3b8', '2px solid #10b981', '2.5px solid #ff1493',
  '2px solid #fb7185', '2.5px solid #d946ef', '2.5px solid #3b82f6',
  '2px solid #f43f5e', '2.5px solid #06b6d4', '2px solid #60a5fa',
  '2px solid #ffffff', '3px solid #f59e0b', '2px solid #fb923c'
];

const GLOWS = [
  '0 0 15px rgba(255, 0, 127, 0.7), 0 0 5px rgba(255, 0, 127, 0.4)',
  '0 0 20px rgba(251, 191, 36, 0.8), 0 0 8px rgba(251, 191, 36, 0.5)',
  '0 0 15px rgba(168, 85, 247, 0.6), 0 0 5px rgba(168, 85, 247, 0.3)',
  '0 0 15px rgba(0, 255, 136, 0.7), 0 0 5px rgba(0, 255, 136, 0.4)',
  '0 0 18px rgba(239, 68, 68, 0.7), 0 0 6px rgba(239, 68, 68, 0.4)',
  '0 0 16px rgba(6, 182, 212, 0.7), 0 0 6px rgba(6, 182, 212, 0.4)',
  '0 0 14px rgba(253, 164, 175, 0.6), 0 0 4px rgba(253, 164, 175, 0.3)',
  '0 0 18px rgba(236, 72, 153, 0.7), 0 0 6px rgba(236, 72, 153, 0.4)',
  '0 4px 20px rgba(255, 255, 255, 0.15)',
  '0 0 15px rgba(139, 92, 246, 0.7), 0 0 5px rgba(139, 92, 246, 0.4)',
  '0 0 15px rgba(249, 115, 22, 0.6), 0 0 5px rgba(249, 115, 22, 0.3)',
  '0 0 20px rgba(185, 28, 28, 0.7), 0 0 6px rgba(185, 28, 28, 0.4)'
];

const DECO_SETS = [
  ['💎', '✨', '💖', '🌟'],
  ['👑', '✨', '🥂', '💫'],
  ['🌹', '✨', '💖', '🌟'],
  ['🍒', '✨', '💋', '❤️'],
  ['🌸', '✨', '🦋', '💗'],
  ['🔥', '⚡', '💥', '⭐'],
  ['🍑', '✨', '🌼', '💛'],
  ['🌿', '✨', '🍃', '💚'],
  ['🌌', '✨', '⭐', '💫'],
  ['💋', '💖', '✨', '🌟'],
  ['🎀', '✨', '💗', '⭐'],
  ['🍇', '🔮', '💜', '🌟']
];

const ANIMATION_CLASSES = [
  'pulse',
  'bounce',
  'flicker',
  'shimmer',
  'pulse'
];

function hashStr(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash);
}

export function generateRandomBannerStyle(seed: string): BannerStyle {
  const h = hashStr(seed);
  
  const bgIdx = h % BG_GRADIENTS.length;
  const borderIdx = (h + 3) % BORDER_COLORS.length;
  const glowIdx = (h + 7) % GLOWS.length;
  const decoIdx = (h + 13) % DECO_SETS.length;
  const animIdx = (h + 19) % ANIMATION_CLASSES.length;

  const bg = BG_GRADIENTS[bgIdx];
  const isLight = bg.includes('#fff0f5') || bg.includes('#ffffff');
  
  const textColor = isLight ? '#5c1221' : '#ffffff';
  const badgeBg = isLight ? 'rgba(92, 18, 33, 0.15)' : 'rgba(255, 255, 255, 0.22)';
  const badgeTextColor = isLight ? '#5c1221' : '#ffffff';
  
  return {
    id: `style_${seed}`,
    bgGradient: bg,
    textColor,
    borderColor: BORDER_COLORS[borderIdx],
    glowColor: GLOWS[glowIdx],
    decorations: DECO_SETS[decoIdx],
    animationClass: ANIMATION_CLASSES[animIdx],
    badgeBg,
    badgeTextColor,
    tagBg: badgeBg,
    tagTextColor: badgeTextColor
  };
}

export function getDefaultTheme(jobType: string): BannerTheme {
  const map: Record<string, BannerTheme> = {
    '프리미엄 살롱':     'theme_strawberry',
    '하이엔드 스튜디오':       'theme_cherry',
    '하이퍼블릭': 'theme_rosegold',
    '퍼블릭':     'theme_peach',
    '룸살롱':     'theme_lavender',
    '클래식바':   'theme_champagne',
    '라운지바':   'theme_mint',
    '와인바':     'theme_cherry',
    '노래방':     'theme_coral',
    '클럽/이벤트':'theme_coral',
    '라이브 카페':   'theme_peach',
    '일반주점':   'theme_strawberry',
  };
  return map[jobType] ?? 'theme_strawberry';
}

export const THEME_META: { id: BannerTheme; label: string; bg: string; text: string; emoji: string }[] = [
  { id: 'theme_strawberry', label: '딸기크림', bg: 'linear-gradient(135deg,#ff6b9d,#ff4777)', text: '#fff', emoji: '🍓' },
  { id: 'theme_rosegold',   label: '로즈골드', bg: 'linear-gradient(135deg,#f4a0b5,#e8738a)', text: '#fff', emoji: '🌹' },
  { id: 'theme_lavender',   label: '라벤더',   bg: 'linear-gradient(135deg,#b39ddb,#9575cd)', text: '#fff', emoji: '💜' },
  { id: 'theme_peach',      label: '복숭아',   bg: 'linear-gradient(135deg,#ffb347,#ff8c69)', text: '#fff', emoji: '🍑' },
  { id: 'theme_cherry',     label: '체리',     bg: 'linear-gradient(135deg,#c2185b,#880e4f)', text: '#fff', emoji: '🍒' },
  { id: 'theme_mint',       label: '민트',     bg: 'linear-gradient(135deg,#4db6ac,#26a69a)', text: '#fff', emoji: '🌿' },
  { id: 'theme_champagne',  label: '샴페인',   bg: 'linear-gradient(135deg,#f5c842,#e8a800)', text: '#5c3a00', emoji: '✨' },
  { id: 'theme_coral',      label: '코랄',     bg: 'linear-gradient(135deg,#ff6f61,#e84393)', text: '#fff', emoji: '🌸' },
];

const DECO_MAP: Record<BannerTheme, [string, string, string, string]> = {
  theme_strawberry: ['🍓','✨','💕','⭐'],
  theme_rosegold:   ['🌹','✨','💖','🌟'],
  theme_lavender:   ['💜','✨','🌸','⭐'],
  theme_peach:      ['🍑','✨','🌼','💛'],
  theme_cherry:     ['🍒','✨','💋','❤️'],
  theme_mint:       ['🌿','✨','🍃','💚'],
  theme_champagne:  ['✨','🥂','⭐','💫'],
  theme_coral:      ['🌸','✨','🦋','💗'],
};

interface BannerTemplateProps {
  data: BannerData;
  compact?: boolean;
}

export default function BannerTemplate({ data, compact }: BannerTemplateProps) {
  const { companyName, region, jobType, payType, payAmount, description, tags, theme = 'theme_strawberry', customStyle } = data;
  
  const d1 = customStyle ? customStyle.decorations[0] : (DECO_MAP[theme]?.[0] || '✨');
  const d2 = customStyle ? customStyle.decorations[1] : (DECO_MAP[theme]?.[1] || '⭐');
  const d3 = customStyle ? customStyle.decorations[2] : (DECO_MAP[theme]?.[2] || '💕');
  const d4 = customStyle ? customStyle.decorations[3] : (DECO_MAP[theme]?.[3] || '🌟');

  const payStr = payType === '협의'
    ? '급여 협의'
    : payAmount
      ? `${payType} ${Number(payAmount).toLocaleString('ko-KR')}원`
      : '';

  const displayName = companyName || '업소명';
  const displayRegion = region || '지역 미설정';
  const displayJob = jobType || '업종';

  const cardStyleObj = customStyle ? {
    background: customStyle.bgGradient,
    border: customStyle.borderColor,
    boxShadow: customStyle.glowColor,
    color: customStyle.textColor,
  } : {};

  return (
    <div
      className={`${styles.bannerCard} ${customStyle ? '' : styles[theme]} ${customStyle ? styles[customStyle.animationClass] : ''}`}
      style={{
        ...cardStyleObj,
        ...(compact ? { aspectRatio: '3/1', minHeight: '80px' } : {})
      }}
    >
      <span className={`${styles.sparkle} ${styles.sp1}`} style={customStyle ? { color: customStyle.textColor } : {}}>{d2}</span>
      <span className={`${styles.sparkle} ${styles.sp2}`} style={customStyle ? { color: customStyle.textColor } : {}}>{d3}</span>
      <span className={`${styles.sparkle} ${styles.sp3}`} style={customStyle ? { color: customStyle.textColor } : {}}>{d2}</span>
      <span className={`${styles.sparkle} ${styles.sp4}`} style={customStyle ? { color: customStyle.textColor } : {}}>{d4}</span>
      <span className={`${styles.sparkle} ${styles.sp5}`} style={customStyle ? { color: customStyle.textColor } : {}}>{d2}</span>
      <span className={`${styles.sparkle} ${styles.sp6}`} style={customStyle ? { color: customStyle.textColor } : {}}>{d3}</span>

      <div className={styles.waveTop} style={customStyle ? { background: 'rgba(255,255,255,0.2)' } : {}} />

      <div className={styles.bannerInner}>
        <div className={styles.topRow}>
          <span 
            className={styles.badge} 
            style={customStyle ? { 
              background: customStyle.badgeBg, 
              color: customStyle.badgeTextColor,
              borderColor: 'rgba(255,255,255,0.3)',
              textShadow: 'none'
            } : {}}
          >
            {d1} HOT
          </span>
          <span className={styles.regionTag} style={customStyle ? { color: customStyle.textColor } : {}}>
            📍 {displayRegion}
          </span>
        </div>

        <div className={styles.nameRow}>
          <span 
            className={styles.companyName} 
            style={customStyle ? { 
              color: customStyle.textColor,
              textShadow: 'none',
              animation: 'none'
            } : {}}
          >
            {displayName}
          </span>
          <span 
            className={styles.jobTypeTag}
            style={customStyle ? { 
              background: customStyle.tagBg, 
              color: customStyle.tagTextColor,
              borderColor: 'rgba(255,255,255,0.3)',
              textShadow: 'none',
              animation: 'none'
            } : {}}
          >
            {displayJob}
          </span>
        </div>

        {payStr && (
          <div 
            className={styles.payRow} 
            style={customStyle ? { color: customStyle.textColor, textShadow: 'none' } : {}}
          >
            💰 {payStr}
          </div>
        )}

        {description && (
          <div 
            className={styles.descRow} 
            style={customStyle ? { color: customStyle.textColor, opacity: 0.85 } : {}}
          >
            {description}
          </div>
        )}

        {tags.length > 0 && (
          <div className={styles.tagsRow}>
            {tags.slice(0, 4).map(t => (
              <span 
                key={t} 
                className={styles.tagChip}
                style={customStyle ? { 
                  background: customStyle.tagBg, 
                  color: customStyle.tagTextColor,
                  borderColor: 'rgba(255,255,255,0.3)',
                  textShadow: 'none'
                } : {}}
              >
                {t}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className={styles.ribbonBottom} style={customStyle ? { background: 'rgba(255,255,255,0.15)' } : {}} />
    </div>
  );
}

interface ThemeSelectorProps {
  selected: BannerTheme;
  onChange: (t: BannerTheme) => void;
}

export function ThemeSelector({ selected, onChange }: ThemeSelectorProps) {
  return (
    <div className={styles.themePicker}>
      {THEME_META.map(t => (
        <button
          key={t.id}
          className={`${styles.themeBtn} ${selected === t.id ? styles.themeBtnActive : ''}`}
          style={{
            background: t.bg,
            color: t.text,
            boxShadow: selected === t.id
              ? '0 0 0 3px #fff, 0 0 0 5px rgba(194,24,91,0.5)'
              : '0 2px 8px rgba(0,0,0,0.15)',
          }}
          onClick={() => onChange(t.id)}
          type="button"
        >
          {t.emoji} {t.label}
        </button>
      ))}
    </div>
  );
}