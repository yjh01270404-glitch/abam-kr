/**
 * AbamLogo — "아름다운밤" 브랜드 로고 컴포넌트
 * 황금 초승달 + 나눔 붓 서명체 (필기/사인 스타일)
 */

import React, { CSSProperties } from 'react';

interface AbamLogoProps {
  fontSize?: string | number;
  style?: CSSProperties;
  className?: string;
}

function CrescentMoon({ size }: { size: number }) {
  const uid = 'abam-moon';
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden="true"
      style={{ display: 'block', flexShrink: 0 }}
    >
      <defs>
        <mask id={`${uid}-mask`}>
          <rect width="40" height="40" fill="white" />
          <circle cx="27" cy="17" r="13" fill="black" />
        </mask>
      </defs>
      <circle
        cx="20"
        cy="20"
        r="16"
        fill="#fde047"
        mask={`url(#${uid}-mask)`}
      />
    </svg>
  );
}

export default function AbamLogo({ fontSize, style, className }: AbamLogoProps) {
  const iconSize = (() => {
    if (typeof fontSize === 'number') return Math.max(Math.round(fontSize * 1.3), 16);
    if (typeof fontSize === 'string' && fontSize !== 'inherit') {
      const n = parseFloat(fontSize);
      if (!isNaN(n)) return Math.max(Math.round(n * 1.3), 16);
    }
    return 26;
  })();

  const textStyle: CSSProperties = {
    // ── 서명 느낌의 붓 필기체 ──
    fontFamily: "'Nanum Brush Script', 'Black Han Sans', cursive, sans-serif",
    fontWeight: 400,           // 붓체는 기본 weight 사용
    fontStyle: 'normal',       // 폰트 자체가 기울어진 느낌
    letterSpacing: '0.04em',   // 서명처럼 글자 간격 살짝 여유
    lineHeight: 1,

    // ── 황금 → 핑크 그라디언트 ──
    background: 'linear-gradient(110deg, #f59e0b 0%, #fbbf24 30%, #e11d48 65%, #be185d 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    color: 'transparent',

    // ── 서명처럼 살짝 기울임 + 자연스러운 사선 ──
    display: 'inline-block',
    transform: 'skewX(-10deg) rotate(-2deg)',
    transformOrigin: 'left center',

    // ── 입체감 있는 그림자 (시인성 ↑) ──
    filter: 'drop-shadow(0px 1px 2px rgba(190,24,93,0.35)) drop-shadow(0px 2px 8px rgba(245,158,11,0.2))',

    whiteSpace: 'nowrap',
    paddingTop: '0.05em',
    paddingBottom: '0.05em',
    paddingRight: '0.1em',   // skew로 잘리지 않도록
    ...(fontSize ? { fontSize } : {}),
  };

  return (
    <span
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
        ...style,
      }}
    >
      {/* 황금 초승달 심볼 */}
      <CrescentMoon size={iconSize} />

      {/* 서명체 텍스트 — 통일된 크기, 한 덩어리로 */}
      <span style={textStyle}>아름다운밤</span>
    </span>
  );
}
