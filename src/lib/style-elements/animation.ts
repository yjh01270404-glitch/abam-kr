export interface AnimationStyle {
  id: string;
  name: string;
  className: string;
  tone: 'cheerful' | 'luxury' | 'sexy' | 'powerful';
  description: string;
}

export const ANIMATION_STYLES: AnimationStyle[] = [
  {
    id: 'anim-1',
    name: '통통 바운스 (유쾌/발랄)',
    className: 'animate-bounce-gentle',
    tone: 'cheerful',
    description: '통통 튀며 시선을 끄는 부드러운 스케일 모션'
  },
  {
    id: 'anim-2',
    name: '골드 글로우 펄스 (도도/고급)',
    className: 'animate-gold-glow-pulse',
    tone: 'luxury',
    description: '은은한 황금빛 네온 테두리가 차오르는 펄스 모션'
  },
  {
    id: 'anim-3',
    name: '네온 테두리 플래시 (섹시/글래머)',
    className: 'animate-neon-border-flash',
    tone: 'sexy',
    description: '사이버 네온 블루 톤의 역동적인 사이클 깜빡임 모션'
  },
  {
    id: 'anim-4',
    name: '강렬한 핑크 펄스 (파워풀/자신감)',
    className: 'animate-strong-pulse',
    tone: 'powerful',
    description: '대비 높은 핑크 네온 빛이 맥박치듯 번지는 파워풀 모션'
  }
];
