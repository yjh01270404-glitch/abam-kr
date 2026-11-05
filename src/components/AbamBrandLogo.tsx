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
  const finalTitleSize =
    titleSize || (size === 'hero' ? '26px' : size === 'compact' ? '18px' : '20px');
  const finalTagSize =
    tagSize || (size === 'hero' ? '14px' : size === 'compact' ? '12px' : '13px');
  const finalMoonSize =
    moonSize || (size === 'hero' ? 24 : size === 'compact' ? 18 : 20);

  return (
    <Link
      href={href}
      className="abam-header-logo-link"
      style={{
        textDecoration: 'none',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '7px',
        flexShrink: 0,
      }}
    >
      <svg
        className="abam-header-moon"
        width={finalMoonSize}
        height={finalMoonSize}
        viewBox="0 0 24 24"
        fill="none"
        style={{ flexShrink: 0 }}
      >
        <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" fill="#fbbf24" />
      </svg>
      <span style={{ display: 'inline-flex', alignItems: 'baseline', gap: '6px', whiteSpace: 'nowrap' }}>
        <span
          style={{
            fontSize: finalTitleSize,
            fontWeight: 900,
            color: '#ffffff',
            letterSpacing: '-0.4px',
            lineHeight: 1,
          }}
        >
          아밤
        </span>
        <span
          style={{
            fontSize: finalTagSize,
            fontWeight: 700,
            color: '#fbbf24',
            letterSpacing: '0.02em',
            lineHeight: 1,
          }}
        >
          ABAM
        </span>
      </span>
    </Link>
  );
}
