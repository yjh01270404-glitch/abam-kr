/**
 * AbamLogo — "아름다운밤" 원본 시그니처 시각 로고 컴포넌트
 * 황금 초승달 + 3D 스케일 캘리그라피 (아 름다운 밤)
 */

import React, { CSSProperties } from 'react';

interface AbamLogoProps {
  fontSize?: string | number;
  style?: CSSProperties;
  className?: string;
}

function CrescentMoon({ size }: { size: string | number }) {
  const uid = 'abam-moon-orig';
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden="true"
      style={{ display: 'block', flexShrink: 0, filter: 'drop-shadow(0 0 8px rgba(253, 224, 71, 0.6))' }}
    >
      <defs>
        <mask id={`${uid}-mask`}>
          <rect width="40" height="40" fill="white" />
          <circle cx="26" cy="16" r="14" fill="black" />
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

export default function AbamLogo({ fontSize = 24, style, className }: AbamLogoProps) {
  const numericSize = typeof fontSize === 'number' ? fontSize : (fontSize === 'inherit' ? 22 : parseInt(fontSize) || 22);

  return (
    <span
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        userSelect: 'none',
        verticalAlign: 'middle',
        ...style,
      }}
    >
      {/* 🌙 황금 글로우 초승달 */}
      <CrescentMoon size={`${numericSize * 1.25}px`} />

      {/* 깔끔하고 고급스러운 아름다운밤 시그니처 텍스트 */}
      <span style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '1px',
        fontWeight: 900,
        fontFamily: "'GmarketSansBold', 'Pretendard', 'Noto Sans KR', sans-serif",
        lineHeight: 1,
        fontSize: `${numericSize}px`,
        letterSpacing: '-0.02em',
        filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))'
      }}>
        <span style={{
          color: '#f59e0b',
          fontSize: '1.15em',
          fontWeight: 900,
          background: 'linear-gradient(180deg, #fef08a 0%, #f59e0b 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          아
        </span>
        <span style={{
          color: '#fb923c',
          fontSize: '0.95em',
          fontWeight: 800,
          background: 'linear-gradient(180deg, #fed7aa 0%, #f97316 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          margin: '0 1px'
        }}>
          름다운
        </span>
        <span style={{
          color: '#f43f5e',
          fontSize: '1.2em',
          fontWeight: 900,
          background: 'linear-gradient(180deg, #fecdd3 0%, #e11d48 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          밤
        </span>
      </span>
    </span>
  );
}
