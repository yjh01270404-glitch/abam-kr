'use client';
/**
 * 아밤 클럽 배너 시스템 v3 — 성능 최적화 + 상호명 가독성 개선
 *
 * 성능 최적화:
 *  - <style> 태그를 전역 1개로 통합 (배너별 인라인 style 제거)
 *  - Sparkles (JS 파티클) 완전 제거 → CSS-only 파티클
 *  - LaserBeams conic-gradient 회전 제거 (GPU 부하 최대) → CSS 선형 빔만 유지
 *  - 스트로브 오버레이 제거 → CSS border 애니메이션만
 *  - will-change: transform 추가로 GPU 레이어 분리
 *
 * 상호명 가독성:
 *  - holoText (WebkitTextFillColor:transparent) 제거
 *  - 흰색 굵은 텍스트 + 뚜렷한 drop-shadow 적용
 *  - 텍스트 배경 반투명 pill 추가 (배경 이미지 관계없이 항상 보임)
 */

import React from 'react';
import Link from 'next/link';
import { BannerBgImg } from './BannerImageGen';

// ─── DJB2 해시 ─────────────────────────────────────────────────────
function djb2Hash(str: string): number {
  let h = 5381;
  for (let i = 0; i < str.length; i++) {
    h = ((h << 5) + h) + str.charCodeAt(i);
  }
  return Math.abs(h);
}

// ─── 테마 팔레트 (6종) ─────────────────────────────────────────────
const CLUB_PALETTES = [
  { primary: '#ff00ff', secondary: '#00ffff', accent: '#ff69b4' },
  { primary: '#ff0080', secondary: '#ffd700', accent: '#ff4500' },
  { primary: '#a855f7', secondary: '#00e5ff', accent: '#ff00ff' },
  { primary: '#ff4444', secondary: '#ff8c00', accent: '#ffd700' },
  { primary: '#00ff88', secondary: '#00bfff', accent: '#9400d3' },
  { primary: '#ff6600', secondary: '#ff1493', accent: '#ffe600' },
];

// ─── 전역 CSS (1회 삽입) ──────────────────────────────────────────
// conic-gradient, sparkle 제거 → 가벼운 CSS만 유지
const CLUB_GLOBAL_CSS = `
  /* VVIP/GRAND 테두리 순환 — opacity/box-shadow만 사용 (GPU 친화적) */
  @keyframes borderGlowA {
    0%,100% { opacity:1; }
    50%      { opacity:0.6; }
  }
  @keyframes borderPulse {
    0%,100% { box-shadow: 0 0 10px var(--bp), 0 0 24px var(--bp); }
    50%      { box-shadow: 0 0 20px var(--bp), 0 0 50px var(--bp), 0 0 80px var(--bp); }
  }

  /* 배지 */
  @keyframes badgePulse {
    0%,100% { transform: scale(1); }
    50%      { transform: scale(1.05); }
  }

  /* LED 금액 깜빡임 — opacity만 (가벼움) */
  @keyframes ledBlink {
    0%,100% { opacity:1; }
    48%     { opacity:0.75; }
    52%     { opacity:1; }
  }

  /* CSS 스파클 (JS 없이) */
  @keyframes cssSparkle {
    0%,100% { opacity:0; transform: scale(0) rotate(0deg); }
    50%     { opacity:1; transform: scale(1) rotate(180deg); }
  }

  /* 호버 */
  .abam-banner-main:hover  { transform: scale(1.03) translateY(-4px); z-index: 10; transition: transform 0.2s ease; }
  .abam-banner-side:hover  { transform: scale(1.04) translateY(-6px); z-index: 50; transition: transform 0.2s ease; }
`;

// 전역 CSS 한 번만 렌더 (React 18+ strict mode 안전)
let _cssInjected = false;
function GlobalCSS() {
  if (typeof window === 'undefined') return null; // SSR skip
  if (_cssInjected) return null;
  _cssInjected = true;
  return <style dangerouslySetInnerHTML={{ __html: CLUB_GLOBAL_CSS }} />;
}

// ─── CSS 스파클 (JS 없음) ─────────────────────────────────────────
function CssSparkles({ color }: { color: string }) {
  const dots = [
    { top: '10%', left: '8%',  delay: '0s',   dur: '1.6s' },
    { top: '8%',  left: '80%', delay: '0.5s', dur: '1.9s' },
    { top: '72%', left: '6%',  delay: '0.8s', dur: '1.4s' },
    { top: '76%', left: '84%', delay: '0.3s', dur: '1.7s' },
  ];
  return (
    <>
      {dots.map((d, i) => (
        <div key={i} style={{
          position: 'absolute', top: d.top, left: d.left,
          fontSize: '10px', color, lineHeight: 1, pointerEvents: 'none', zIndex: 4,
          animationName: 'cssSparkle',
          animationDuration: d.dur, animationDelay: d.delay,
          animationIterationCount: 'infinite', animationTimingFunction: 'ease-in-out',
          willChange: 'transform, opacity',
        }}>✦</div>
      ))}
    </>
  );
}

// ─── 상호명 렌더 (가독성 최우선 — 절대 잘리지 않음) ─────────────
function BannerName({ name, fontSize, isSide = false }: {
  name: string; fontSize: string; isSide?: boolean;
}) {
  return (
    <div style={{
      flex: 1, display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: isSide ? '2px 4px' : '4px 6px',
      width: '100%',
    }}>
      <div style={{
        fontSize,
        fontWeight: 900,
        fontFamily: '"Noto Sans KR", "Malgun Gothic", sans-serif',
        lineHeight: 1.2,
        letterSpacing: '-0.02em',
        textAlign: 'center',
        color: '#ffffff',
        // 명확한 드롭 섀도우 — 배경 이미지 위에서도 항상 읽힘
        textShadow: '0 2px 8px rgba(0,0,0,0.98), 0 0 16px rgba(0,0,0,0.9), 2px 2px 0 rgba(0,0,0,1), -1px -1px 0 rgba(0,0,0,0.9)',
        padding: isSide ? '4px 8px' : '6px 10px',
        borderRadius: '8px',
        // 반투명 배경 — 어떤 배경 이미지 위에서도 읽힘
        background: 'rgba(0,0,0,0.55)',
        display: 'inline-block',
        maxWidth: '95%',
        // 절대 잘리지 않음 — 최대 2줄 허용
        whiteSpace: 'normal',
        wordBreak: 'keep-all',
        overflowWrap: 'anywhere',
        overflow: 'visible',
      }}>
        {name}
      </div>
    </div>
  );
}

// ─── VVIP 메인 배너 ───────────────────────────────────────────────
interface ClubBannerMainProps {
  companyName: string;
  location: string;
  pay: string;
  jobId: string;
  isVvip?: boolean;
  bgIndex?: number;
}

export function ClubBannerMain({ companyName, location, pay, jobId, isVvip = true, bgIndex }: ClubBannerMainProps) {
  const h = djb2Hash(jobId);
  const palette = CLUB_PALETTES[h % CLUB_PALETTES.length];
  const loc = location.split(' ').slice(0, 2).join(' ');
  const nameLen = companyName.replace(/\s/g, '').length;
  // VVIP: 더 크게, GRAND: 적당히 크게 — 텍스트가 절대 잘리지 않도록
  const nameFS = isVvip
    ? (nameLen <= 3 ? '36px' : nameLen <= 5 ? '30px' : nameLen <= 8 ? '24px' : nameLen <= 11 ? '19px' : '16px')
    : (nameLen <= 3 ? '28px' : nameLen <= 5 ? '23px' : nameLen <= 8 ? '19px' : nameLen <= 11 ? '16px' : '13px');

  return (
    <Link href={`/job/${jobId}`} style={{
      display: 'block',
      width: '100%',
      minHeight: isVvip ? '220px' : '190px',
      borderRadius: '10px',
      overflow: 'hidden',
      textDecoration: 'none',
      position: 'relative',
      border: `2.5px solid ${palette.primary}`,
      boxShadow: `0 0 12px ${palette.primary}, inset 0 0 8px ${palette.primary}`,
      boxSizing: 'border-box',
      backgroundColor: '#0a0015',
      // GPU 레이어 분리
      willChange: 'transform',
      // 테두리 글로우 CSS 변수
      ['--bp' as any]: palette.primary,
      animationName: 'borderPulse',
      animationDuration: `${2 + (h % 4) * 0.5}s`,
      animationIterationCount: 'infinite',
      animationTimingFunction: 'ease-in-out',
    }} className="abam-banner-main">
      <GlobalCSS />

      {/* 배경 이미지 — bgIndex 전달로 중복 방지 */}
      <BannerBgImg companyName={companyName} title="" tag="" jobId={jobId} isVvip={true} width={240} height={isVvip ? 260 : 220} bgIndex={bgIndex} />

      {/* 스파클 (CSS only) */}
      <CssSparkles color={palette.secondary} />

      {/* 콘텐츠 */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 5,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'space-between',
        padding: isVvip ? '12px 10px 10px' : '10px 8px 8px',
        boxSizing: 'border-box',
      }}>
        {/* 등급 배지 */}
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <span style={{
            background: isVvip
              ? 'linear-gradient(135deg, #78350f, #d97706, #fbbf24)'
              : 'linear-gradient(135deg, #831843, #db2777, #f9a8d4)',
            color: isVvip ? '#000' : '#fff',
            fontSize: isVvip ? '11px' : '10.5px',
            fontWeight: 900,
            padding: '3px 14px',
            borderRadius: '20px',
            letterSpacing: '0.05em',
            whiteSpace: 'nowrap',
            boxShadow: isVvip
              ? '0 0 10px rgba(251,191,36,0.7), 0 2px 6px rgba(0,0,0,0.5)'
              : '0 0 10px rgba(219,39,119,0.7), 0 2px 6px rgba(0,0,0,0.5)',
            animationName: 'badgePulse',
            animationDuration: '2s',
            animationIterationCount: 'infinite',
            animationTimingFunction: 'ease-in-out',
          }}>
            {isVvip ? '👑 VVIP SPECIAL' : '💎 GRAND VIP'}
          </span>
        </div>

        {/* 상호명 — 흰색 + 강한 그림자 */}
        <BannerName name={companyName.trim()} fontSize={nameFS} />

        {/* 하단: 지역 + 금액 */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px', width: '100%' }}>
          <span style={{
            fontSize: isVvip ? '11.5px' : '10.5px',
            fontWeight: 800,
            color: '#fff',
            background: 'rgba(0,0,0,0.65)',
            border: `1px solid ${palette.primary}70`,
            padding: '2px 12px',
            borderRadius: '20px',
            whiteSpace: 'nowrap',
            textShadow: '0 1px 3px rgba(0,0,0,0.9)',
          }}>📍 {loc}</span>

          <div style={{
            background: 'rgba(0,0,0,0.75)',
            border: `2px solid ${palette.secondary}`,
            borderRadius: '8px',
            padding: isVvip ? '5px 16px' : '4px 12px',
            boxShadow: `0 0 10px ${palette.secondary}60`,
            display: 'flex', alignItems: 'center', gap: '4px',
          }}>
            <span style={{
              color: palette.secondary,
              fontSize: isVvip ? '13px' : '12px',
              fontWeight: 900,
              fontFamily: '"Noto Sans KR", sans-serif',
              letterSpacing: '0.02em',
              animationName: 'ledBlink',
              animationDuration: '1.4s',
              animationIterationCount: 'infinite',
              whiteSpace: 'nowrap',
              textShadow: `0 0 8px ${palette.secondary}`,
            }}>💰 {pay}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

// ─── VVIP EXCLUSIVE 사이드 배너 ──────────────────────────────────
interface ClubSideBannerProps {
  companyName: string;
  location: string;
  pay: string;
  jobId: string;
}

export function ClubSideBanner({ companyName, location, pay, jobId }: ClubSideBannerProps) {
  const h = djb2Hash(jobId);
  const palette = CLUB_PALETTES[h % CLUB_PALETTES.length];
  const loc = location.split(' ').slice(0, 2).join(' ');
  const nameLen = companyName.replace(/\s/g, '').length;
  const nameFS = nameLen <= 2 ? '17px' : nameLen <= 4 ? '15px' : nameLen <= 7 ? '13px' : '11px';

  return (
    <Link href={`/job/${jobId}`} style={{
      display: 'block',
      width: '100%',
      height: '105px',
      borderRadius: '8px',
      overflow: 'hidden',
      border: `2px solid ${palette.primary}`,
      marginBottom: '4px',
      textDecoration: 'none',
      position: 'relative',
      backgroundColor: '#05000e',
      boxSizing: 'border-box',
      willChange: 'transform',
      ['--bp' as any]: palette.primary,
      animationName: 'borderPulse',
      animationDuration: `${1.8 + (h % 5) * 0.4}s`,
      animationIterationCount: 'infinite',
      animationTimingFunction: 'ease-in-out',
    }} className="abam-banner-side">

      {/* 배경 이미지 */}
      <BannerBgImg companyName={companyName} title="" tag="" jobId={`side-${jobId}`} isSide={true} width={180} height={105} />

      {/* 스파클 */}
      <CssSparkles color={palette.accent} />

      {/* 콘텐츠 */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 5,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'space-between',
        padding: '4px 5px 4px',
        boxSizing: 'border-box',
      }}>
        {/* 배지 */}
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <span style={{
            background: 'linear-gradient(135deg, #1a0030, #4a0080, #7b00cc)',
            border: `1px solid ${palette.primary}`,
            color: '#fff',
            fontSize: '8px',
            fontWeight: 900,
            padding: '1px 6px',
            borderRadius: '10px',
            letterSpacing: '0.03em',
            whiteSpace: 'nowrap',
            boxShadow: `0 0 4px ${palette.primary}60`,
            animationName: 'badgePulse',
            animationDuration: '2s',
            animationIterationCount: 'infinite',
            animationTimingFunction: 'ease-in-out',
          }}>
            👑 VVIP EXCLUSIVE
          </span>
        </div>

        {/* 상호명 */}
        <BannerName name={companyName.trim()} fontSize={nameFS} isSide={true} />

        {/* 지역 & 급여 */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px', width: '100%' }}>
          <span style={{
            fontSize: '9px',
            fontWeight: 800,
            color: '#fff',
            background: 'rgba(0,0,0,0.7)',
            border: `1px solid ${palette.secondary}60`,
            padding: '1px 6px',
            borderRadius: '10px',
            whiteSpace: 'nowrap',
            textShadow: '0 1px 2px rgba(0,0,0,0.9)',
          }}>📍 {loc}</span>

          {/* 금액 */}
          <div style={{
            background: 'rgba(0,0,0,0.85)',
            border: `1px solid ${palette.accent}`,
            borderRadius: '4px',
            padding: '1px 4px',
            boxShadow: `0 0 5px ${palette.accent}50`,
            width: '94%',
            display: 'flex', justifyContent: 'center',
          }}>
            <span style={{
              color: palette.accent,
              fontSize: '10px',
              fontWeight: 900,
              fontFamily: '"Noto Sans KR", sans-serif',
              animationName: 'ledBlink',
              animationDuration: '1.2s',
              animationIterationCount: 'infinite',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              textShadow: `0 0 4px ${palette.accent}`,
            }}>💰 {pay}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

// ─── 래퍼 ─────────────────────────────────────────────────────────
import type { JobAd } from '../lib/mockData';

interface Props {
  jobAd: JobAd;
  size?: 'vvip' | 'grandvip' | 'side_exclusive';
}
export default function ClubBannerSystem({ jobAd, size = 'vvip' }: Props) {
  if (size === 'side_exclusive') {
    return (
      <ClubSideBanner
        companyName={jobAd.companyName}
        location={jobAd.location}
        pay={jobAd.pay}
        jobId={String(jobAd.id)}
      />
    );
  }
  return (
    <ClubBannerMain
      companyName={jobAd.companyName}
      location={jobAd.location}
      pay={jobAd.pay}
      jobId={String(jobAd.id)}
      isVvip={size === 'vvip'}
    />
  );
}
