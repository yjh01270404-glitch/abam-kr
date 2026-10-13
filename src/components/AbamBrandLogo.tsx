import React from 'react';
import Link from 'next/link';

interface AbamBrandLogoProps {
  size?: 'hero' | 'header' | 'compact';
  titleSize?: string;
  tagSize?: string;
  moonSize?: number;
  href?: string;
}

export default function AbamBrandLogo({
  size = 'header',
  titleSize,
  tagSize,
  moonSize,
  href = '/',
}: AbamBrandLogoProps) {
  // Preset sizes based on hero, header, or compact
  const finalTitleSize =
    titleSize || (size === 'hero' ? '56px' : size === 'compact' ? '24px' : '29px');
  const finalTagSize =
    tagSize || (size === 'hero' ? '28px' : size === 'compact' ? '15px' : '18px');
  const finalMoonSize =
    moonSize || (size === 'hero' ? 36 : size === 'compact' ? 20 : 24);

  return (
    <Link
      href={href}
      className="abam-header-logo-link"
      style={{
        textDecoration: 'none',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        flexShrink: 0,
      }}
    >
      <svg
        className="abam-header-moon"
        width={finalMoonSize}
        height={finalMoonSize}
        viewBox="0 0 24 24"
        fill="none"
        style={{
          filter: 'drop-shadow(0 0 8px rgba(245, 158, 11, 0.9))',
          flexShrink: 0,
        }}
      >
        <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" fill="url(#abamBrandMoonGrad)" />
        <defs>
          <linearGradient id="abamBrandMoonGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="35%" stopColor="#fef08a" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>
        </defs>
      </svg>
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', whiteSpace: 'nowrap' }}>
        <span
          className="abam-script-font"
          style={{
            fontSize: finalTitleSize,
            fontFamily: "'KccEunyeong', 'Pinyon Script', cursive, sans-serif",
            fontStyle: 'italic',
            fontWeight: 'normal',
            lineHeight: 1,
            display: 'inline-block',
            background: 'linear-gradient(180deg, #ffffff 10%, #fef08a 60%, #f59e0b 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            filter: 'drop-shadow(0 2px 14px rgba(245, 158, 11, 0.6))',
            transform: 'rotate(-2deg) skewX(-7deg)',
            padding: '0 4px',
            letterSpacing: '0.01em',
          }}
        >
          아름다운밤
        </span>
        <span
          className="abam-brand-tag"
          style={{
            fontSize: finalTagSize,
            fontWeight: 900,
            color: '#e11d48',
            letterSpacing: '-0.3px',
            lineHeight: 1,
            display: 'inline-block',
          }}
        >
          [아밤.Abam.kr]
        </span>
      </span>
    </Link>
  );
}
