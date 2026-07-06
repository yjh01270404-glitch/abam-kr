export type TierType = 'vip' | 'premium' | 'general';

export interface ColorPalette {
  bg: string;
  border: string;
  text: string;
  accent: string;
  badgeBg: string;
  badgeText: string;
}

export interface CopyTemplate {
  label: string;
  main: string;
  sub: string;
}

export interface BannerStylePool {
  colorPalettes: ColorPalette[];
  animationStyles: string[];
  copyTemplates: CopyTemplate[];
}

export const VIP_POOL: BannerStylePool = {
  colorPalettes: [
    { bg: 'linear-gradient(135deg, #111111 0%, #2b003b 100%)', border: '#ffd700', text: '#ffffff', accent: '#ffea00', badgeBg: 'linear-gradient(to bottom, #d4af37, #aa7f00)', badgeText: '#ffffff' }, 
    { bg: 'linear-gradient(135deg, #0f2027 0%, #203a43 100%)', border: '#00e5ff', text: '#ffffff', accent: '#00ffff', badgeBg: 'linear-gradient(to bottom, #00b4db, #0083b0)', badgeText: '#ffffff' }, 
    { bg: 'linear-gradient(135deg, #2b0000 0%, #4b0024 100%)', border: '#ffb6c1', text: '#ffffff', accent: '#ff69b4', badgeBg: 'linear-gradient(to bottom, #e91e63, #880e4f)', badgeText: '#ffffff' }, 
  ],
  animationStyles: ['pulse-shake', 'shine-sweep', 'glow-border', 'wobble', 'float-up-down'],
  copyTemplates: [
    { label: '{companyName}', main: '{pay} 100% 보장', sub: '초보/경력 무관 · 에이스 특별 대우' },
    { label: 'VIP {location}', main: '업계 1위 최고대우', sub: '당일 {pay} 현금 지급 · 출퇴근 지원' },
    { label: '에이스 특별', main: '{pay}+@ 맞춤 케어', sub: '24시간 상담환영 · 텐프로급 대우' },
  ],
};

export const PREMIUM_POOL: BannerStylePool = {
  colorPalettes: [
    { bg: 'linear-gradient(135deg, #4A00E0 0%, #8E2DE2 100%)', border: '#c77dff', text: '#ffffff', accent: '#e0aaff', badgeBg: '#9d4edd', badgeText: '#ffffff' },
    { bg: 'linear-gradient(135deg, #ff0844 0%, #ffb199 100%)', border: '#ffffff', text: '#ffffff', accent: '#ffe1d9', badgeBg: '#ff4d6d', badgeText: '#ffffff' },
    { bg: 'linear-gradient(135deg, #1f4037 0%, #3b7b62 100%)', border: '#2ecc71', text: '#ffffff', accent: '#a8ff78', badgeBg: '#27ae60', badgeText: '#ffffff' },
  ],
  animationStyles: ['shine-sweep', 'glow-border', 'float-up-down', 'pulse-shake'],
  copyTemplates: [
    { label: '{location}', main: '{companyName} 특별 모집', sub: '{pay} 이상 확실하게 맞춰드려요' },
    { label: '{companyName}', main: '빠른 출근 특급 대우', sub: '당일 {pay} 지급 · 꿀알바 보장' },
    { label: 'PREMIUM', main: '초보 대환영! {pay}', sub: '{location} 일하기 편한 가게 1위' },
  ],
};

export const GENERAL_POOL: BannerStylePool = {
  colorPalettes: [
    { bg: 'linear-gradient(135deg, #440020 0%, #000000 100%)', border: '#ff0055', text: '#ffffff', accent: '#ff0a54', badgeBg: '#ff0055', badgeText: '#ffffff' },
    { bg: 'linear-gradient(135deg, #001030 0%, #000000 100%)', border: '#0044ff', text: '#ffffff', accent: '#4338ca', badgeBg: '#0044ff', badgeText: '#ffffff' },
  ],
  animationStyles: ['shine-sweep', 'wobble', 'glow-border', 'float-up-down'],
  copyTemplates: [
    { label: '{location}', main: '시급 {pay} 단기알바', sub: '{companyName}에서 가족같이 일하실 분' },
    { label: 'HOT', main: '초보가능 알바 시급 {pay}', sub: '{location} 편안한 분위기 보장' },
  ],
};

export const STYLE_POOLS: Record<TierType, BannerStylePool> = {
  vip: VIP_POOL,
  premium: PREMIUM_POOL,
  general: GENERAL_POOL,
};