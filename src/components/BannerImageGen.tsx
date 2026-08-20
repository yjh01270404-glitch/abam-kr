'use client';
import Image from 'next/image';
/**
 * 아밤 배너 배경 이미지 시스템 v8 — AI 생성 실제 이미지 삽입
 *
 * - /public/banners/vvip/bg_vvip_1~12.png : AI 생성 프리미엄 클럽/라운지 이미지
 * - djb2 해시로 jobId → 이미지 인덱스 결정 (배너마다 고유 이미지 보장)
 * - onError fallback: 로드 실패 시 프리미엄 CSS 그라디언트로 대체
 */

import React, { useState } from 'react';

// ─── DJB2 해시 ─────────────────────────────────────────────────────
function djb2(str: string): number {
  let h = 5381;
  for (let i = 0; i < str.length; i++) {
    h = ((h << 5) + h) + str.charCodeAt(i);
  }
  return Math.abs(h);
}

// ─── 실제 AI 생성 배경 이미지 12종 ────────────────────────────────
const VVIP_BG_IMAGES = [
  '/banners/vvip/bg_vvip_1.png',   // 퍼플 네온 클럽
  '/banners/vvip/bg_vvip_2.png',   // 골드 칵테일 바
  '/banners/vvip/bg_vvip_3.png',   // 사이안 댄스 클럽
  '/banners/vvip/bg_vvip_4.png',   // 레드 VIP 룸
  '/banners/vvip/bg_vvip_5.png',   // 핑크 네온 라운지
  '/banners/vvip/bg_vvip_6.png',   // 오렌지 골드 파티
  '/banners/vvip/bg_vvip_7.png',   // 에메랄드 바
  '/banners/vvip/bg_vvip_8.png',   // 스카이바 야경
  '/banners/vvip/bg_vvip_9.png',   // 다크 프라이빗 라운지
  '/banners/vvip/bg_vvip_10.png',  // 그랜드 볼룸
  '/banners/vvip/bg_vvip_11.png',  // 하이퍼블릭 모던
  '/banners/vvip/bg_vvip_12.png',  // 프리미엄 살롱 버건디
];

// ─── fallback CSS 그라디언트 (이미지 로드 실패 시) ───────────────
const FALLBACK_GRADIENTS = [
  'linear-gradient(145deg, #0d0020, #1a0040, #2d0060)',
  'linear-gradient(145deg, #1a0008, #280010, #1a000a)',
  'linear-gradient(145deg, #000520, #000c38, #000825)',
  'linear-gradient(145deg, #000d10, #001a15, #000d1a)',
  'linear-gradient(145deg, #0a001a, #15003a, #0a0025)',
  'linear-gradient(145deg, #080808, #121212, #0a0a0a)',
  'linear-gradient(145deg, #150005, #280010, #1a000a)',
  'linear-gradient(145deg, #100800, #200f00, #180a00)',
  'linear-gradient(145deg, #010820, #030f3a, #020a2d)',
  'linear-gradient(145deg, #0a0018, #1a0035, #0a0028)',
  'linear-gradient(145deg, #040015, #0a0030, #060020)',
  'linear-gradient(145deg, #100005, #1e000a, #160005)',
];

// ─── 개별 분위기 컬러 오버레이 12종 (카드별 독보적 개성 표출) ──────────
const COLOR_ATMOSPHERES = [
  'linear-gradient(135deg, rgba(168,85,247,0.35) 0%, rgba(15,23,42,0.85) 100%)', // 퍼플 네온
  'linear-gradient(135deg, rgba(245,158,11,0.35) 0%, rgba(15,23,42,0.85) 100%)', // 골드 앰버
  'linear-gradient(135deg, rgba(14,165,233,0.35) 0%, rgba(15,23,42,0.85) 100%)', // 사이안 클럽
  'linear-gradient(135deg, rgba(225,29,72,0.35) 0%, rgba(15,23,42,0.85) 100%)',  // 루비 라운지
  'linear-gradient(135deg, rgba(16,185,129,0.35) 0%, rgba(15,23,42,0.85) 100%)', // 에메랄드 바
  'linear-gradient(135deg, rgba(236,72,153,0.35) 0%, rgba(15,23,42,0.85) 100%)', // 로즈 핑크
  'linear-gradient(135deg, rgba(99,102,241,0.35) 0%, rgba(15,23,42,0.85) 100%)', // 사파이어 인디고
  'linear-gradient(135deg, rgba(249,115,22,0.35) 0%, rgba(15,23,42,0.85) 100%)', // 선셋 오렌지
  'linear-gradient(135deg, rgba(139,92,246,0.35) 0%, rgba(15,23,42,0.85) 100%)', // 바이올렛 나이트
  'linear-gradient(135deg, rgba(190,18,93,0.35) 0%, rgba(15,23,42,0.85) 100%)',  // 디프 크림슨
  'linear-gradient(135deg, rgba(20,184,166,0.35) 0%, rgba(15,23,42,0.85) 100%)', // 아쿠아 틸
  'linear-gradient(135deg, rgba(217,119,6,0.35) 0%, rgba(15,23,42,0.85) 100%)',  // 브론즈 매직
];

// ─── BannerBgImg 컴포넌트 ────────────────────────────────────────
interface BannerBgImgProps {
  companyName?: string;
  title?: string;
  tag?: string;
  jobId: string;
  isVvip?: boolean;
  isSide?: boolean;
  width?: number;
  height?: number;
  style?: React.CSSProperties;
}

export function BannerBgImg({
  jobId, companyName = '', isVvip = false, isSide = false, style, bgIndex,
}: BannerBgImgProps & { bgIndex?: number }) {
  const [imgFailed, setImgFailed] = useState(false);

  const imageCount = VVIP_BG_IMAGES.length; // 12
  // bgIndex가 0이거나 명시적으로 전달되지 않았을 경우 고유 해시 계산
  const computedIdx = djb2((companyName || '') + (jobId || '') + (isVvip ? 'vvip' : 'std')) % imageCount;
  const idx = bgIndex !== undefined && bgIndex > 0 ? bgIndex % imageCount : computedIdx;

  const imgSrc = VVIP_BG_IMAGES[idx];
  const fallback = FALLBACK_GRADIENTS[idx];
  const atmosphere = COLOR_ATMOSPHERES[idx % COLOR_ATMOSPHERES.length];

  return (
    <>
      {/* 배경: 실제 이미지 OR CSS fallback */}
      {imgFailed ? (
        <div style={{
          position: 'absolute', inset: 0,
          background: fallback,
          zIndex: 0, pointerEvents: 'none',
        }} />
      ) : (
        <Image
          src={imgSrc}
          fill
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          onError={() => setImgFailed(true)}
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            display: 'block',
            pointerEvents: 'none',
            zIndex: 0,
            ...style,
          }}
        />
      )}

      {/* 카드별 독보적 개성 컬러 분위기 오버레이 */}
      <div style={{
        position: 'absolute', inset: 0,
        background: atmosphere,
        mixBlendMode: 'color-dodge',
        opacity: 0.85,
        zIndex: 1, pointerEvents: 'none',
      }} />

      {/* 텍스트 가독성 어두운 오버레이 */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.2) 40%, rgba(0,0,0,0.85) 100%)',
        zIndex: 1, pointerEvents: 'none',
      }} />
    </>
  );
}
