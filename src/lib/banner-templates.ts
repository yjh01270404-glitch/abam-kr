export interface BannerTemplateType {
  id: number;
  name: string;
  background: string;
  textColor: string;
  borderColor: string;
  glowColor?: string;
  fontFamily: string;
}

export const BANNER_TEMPLATES: BannerTemplateType[] = [
  {
    id: 1,
    name: '네온 핑크 퍼플',
    background: 'linear-gradient(135deg, #1e1b4b 0%, #311042 100%)',
    textColor: '#f472b6',
    glowColor: '0 0 15px rgba(244,114,182,0.8), 0 0 5px rgba(244,114,182,0.4)',
    borderColor: '#db2777',
    fontFamily: 'Black Han Sans'
  },
  {
    id: 2,
    name: '골드 럭셔리',
    background: 'linear-gradient(135deg, #0b0f19 0%, #1a1e2d 100%)',
    textColor: '#fbbf24',
    glowColor: '0 0 18px rgba(251,191,36,0.6), 0 0 6px rgba(251,191,36,0.3)',
    borderColor: '#d97706',
    fontFamily: 'Do Hyeon'
  },
  {
    id: 3,
    name: '에메랄드 글로우',
    background: 'linear-gradient(135deg, #022c22 0%, #064e3b 100%)',
    textColor: '#34d399',
    glowColor: '0 0 15px rgba(52,211,153,0.8), 0 0 5px rgba(52,211,153,0.4)',
    borderColor: '#059669',
    fontFamily: 'Do Hyeon'
  },
  {
    id: 4,
    name: '크림슨 플레임',
    background: 'linear-gradient(135deg, #450a0a 0%, #7f1d1d 100%)',
    textColor: '#f87171',
    glowColor: '0 0 15px rgba(248,113,113,0.8), 0 0 5px rgba(248,113,113,0.4)',
    borderColor: '#dc2626',
    fontFamily: 'Black Han Sans'
  },
  {
    id: 5,
    name: '벚꽃 사쿠라',
    background: 'linear-gradient(135deg, #fff1f2 0%, #ffe4e6 100%)',
    textColor: '#db2777',
    glowColor: '0 0 10px rgba(219,39,119,0.3)',
    borderColor: '#f43f5e',
    fontFamily: 'Jua'
  },
  {
    id: 6,
    name: '딥 오션 글로우',
    background: 'linear-gradient(135deg, #0f172a 0%, #0f766e 100%)',
    textColor: '#38bdf8',
    glowColor: '0 0 15px rgba(56,189,248,0.8), 0 0 5px rgba(56,189,248,0.4)',
    borderColor: '#0284c7',
    fontFamily: 'Do Hyeon'
  },
  {
    id: 7,
    name: '미드나잇 퍼플',
    background: 'linear-gradient(135deg, #020617 0%, #1e1b4b 100%)',
    textColor: '#c084fc',
    glowColor: '0 0 15px rgba(192,132,252,0.8), 0 0 5px rgba(192,132,252,0.4)',
    borderColor: '#7c3aed',
    fontFamily: 'Black Han Sans'
  },
  {
    id: 8,
    name: '선셋 오렌지',
    background: 'linear-gradient(135deg, #2a085c 0%, #c2410c 100%)',
    textColor: '#fb923c',
    glowColor: '0 0 12px rgba(251,146,60,0.8), 0 0 4px rgba(251,146,60,0.4)',
    borderColor: '#ea580c',
    fontFamily: 'Jua'
  },
  {
    id: 9,
    name: '애시드 라임',
    background: 'linear-gradient(135deg, #172554 0%, #030712 100%)',
    textColor: '#a3e635',
    glowColor: '0 0 15px rgba(163,230,53,0.8), 0 0 5px rgba(163,230,53,0.4)',
    borderColor: '#84cc16',
    fontFamily: 'Do Hyeon'
  },
  {
    id: 10,
    name: '블랙 앤 플래티넘',
    background: 'linear-gradient(135deg, #18181b 0%, #27272a 100%)',
    textColor: '#ffffff',
    glowColor: '0 0 20px rgba(255,255,255,0.4), 0 0 6px rgba(255,255,255,0.2)',
    borderColor: '#a1a1aa',
    fontFamily: 'Black Han Sans'
  }
];
