'use client';

import React from 'react';
import Link from 'next/link';
import { JobAd } from '../lib/mockData';
import { BannerBgImg } from './BannerImageGen';

interface DynamicBannerProps {
  jobAd: JobAd;
  className?: string;
  size?: 'normal' | 'vvip' | 'grandvip' | 'premium' | 'priority' | string;
  bgIndex?: number;
}

function parsePay(pay: string) {
  const payStr = (pay || '').trim() || '협의';
  if (payStr === '협의' || payStr === '급여') {
    return { badge: '협의', text: payStr };
  }

  let badge = '급여';
  let text = payStr;

  if (payStr.includes('시급')) {
    badge = '시급'; text = payStr.replace(/^시급\s*/, '');
  } else if (payStr.includes('일급') || payStr.includes('일당')) {
    badge = '일급'; text = payStr.replace(/^(일급|일당)\s*/, '');
  } else if (payStr.includes('월급')) {
    badge = '월급'; text = payStr.replace(/^월급\s*/, '');
  } else if (payStr.toUpperCase().includes('일급') || payStr.includes('보장')) {
    badge = '일급'; text = payStr.replace(/^(일급|T\/C|보장)\s*/i, '');
  }

  return { badge, text: text || payStr };
}

export default function DynamicBanner({ jobAd, className = '', size = 'normal', bgIndex = 0 }: DynamicBannerProps) {
  const { badge: payBadge, text: payText } = parsePay(jobAd.pay);
  const locationShort = (jobAd.location || '서울').split(' ')[0] + ' ' + ((jobAd.location || '').split(' ')[1] || '');

  // 👑 1. VVIP SPECIAL CARD (압도적 차별화 - 3D 골드/로즈 럭셔리 네온 하이라이트)
  if (size === 'vvip' || size === 'top') {
    return (
      <Link
        href={`/job/${jobAd.id}`}
        className={`abam-card-vvip ${className}`}
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          width: '100%',
          minHeight: '260px',
          border: '3px solid #f43f5e',
          borderRadius: '20px',
          padding: '16px 18px',
          boxSizing: 'border-box',
          textDecoration: 'none',
          boxShadow: '0 12px 35px rgba(244, 63, 94, 0.45), inset 0 0 20px rgba(255, 215, 0, 0.2)',
          transition: 'all 0.3s ease',
          position: 'relative',
          overflow: 'hidden',
          background: 'linear-gradient(180deg, rgba(244,63,94,0.15) 0%, rgba(15,23,42,0.95) 100%)'
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = 'translateY(-5px) scale(1.02)';
          e.currentTarget.style.boxShadow = '0 18px 45px rgba(244, 63, 94, 0.65), inset 0 0 30px rgba(255, 215, 0, 0.35)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = 'translateY(0) scale(1)';
          e.currentTarget.style.boxShadow = '0 12px 35px rgba(244, 63, 94, 0.45), inset 0 0 20px rgba(255, 215, 0, 0.2)';
        }}
      >
        {/* VVIP 전용 AI 생성이미지 배경 */}
        <BannerBgImg companyName={jobAd.companyName} jobId={String(jobAd.id)} isVvip={true} bgIndex={bgIndex} />

        {/* Top Metallic Gold Shimmering Badge */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 2 }}>
          <span style={{ fontSize: '11px', fontWeight: 900, background: 'linear-gradient(135deg, #ffd700, #ff8c00)', color: '#000000', padding: '4px 12px', borderRadius: '14px', letterSpacing: '0.05em', boxShadow: '0 3px 10px rgba(255,215,0,0.6)' }}>
            👑 VVIP SPECIAL (최우선 노출 TOP 1%)
          </span>
          <span style={{ fontSize: '9.5px', fontWeight: 900, color: '#4ade80', background: 'rgba(0,0,0,0.85)', padding: '3px 9px', borderRadius: '12px', backdropFilter: 'blur(6px)', border: '1px solid rgba(74,222,128,0.5)', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4ade80', boxShadow: '0 0 8px #4ade80', display: 'inline-block' }} /> 100% 당일지급
          </span>
        </div>

        {/* Middle Company Name & Subtitle */}
        <div style={{ textAlign: 'center', margin: '10px 0', zIndex: 2 }}>
          <h4 style={{ margin: 0, fontSize: '22px', fontWeight: 900, color: '#ffffff', letterSpacing: '-0.02em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', textShadow: '0 0 14px rgba(255,255,255,0.9), 0 3px 12px rgba(0,0,0,0.95)' }}>
            {jobAd.companyName}
          </h4>
          <p style={{ margin: '6px 0 0 0', fontSize: '13px', color: '#fed7aa', fontWeight: 800, lineHeight: '1.4', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', textShadow: '0 1px 6px rgba(0,0,0,0.95)' }}>
            {jobAd.title}
          </p>
        </div>

        {/* Bottom Floating Premium Box */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', backgroundColor: 'rgba(15,23,42,0.92)', border: '1.5px solid rgba(244,63,94,0.5)', padding: '10px 14px', borderRadius: '14px', backdropFilter: 'blur(12px)', zIndex: 2, boxShadow: '0 6px 20px rgba(0,0,0,0.7)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', color: '#f1f5f9', fontWeight: 800 }}>📍 {locationShort}</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '11px', fontWeight: 900, color: '#fde047', background: 'rgba(253,224,71,0.15)', padding: '2px 7px', borderRadius: '6px' }}>{payBadge}</span>
              <span style={{ fontSize: '16px', fontWeight: 900, color: '#4ade80' }}>{payText}</span>
            </div>
          </div>

          {/* Oversized VVIP Dual Action Buttons */}
          <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }} onClick={(e) => e.stopPropagation()}>
            <a 
              href={`tel:${(jobAd as any).phone || '010-8000-0000'}`} 
              style={{ flex: 1, height: '38px', textAlign: 'center', background: 'linear-gradient(135deg, #be185d, #9f1239)', color: '#ffffff', fontSize: '12px', fontWeight: 900, borderRadius: '8px', textDecoration: 'none', boxShadow: '0 4px 12px rgba(190,24,93,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}
              onClick={(e) => e.stopPropagation()}
            >
              📞 1초 직통전화
            </a>
            <a 
              href={`https://open.kakao.com`} 
              target="_blank" 
              rel="noreferrer"
              style={{ flex: 1, height: '38px', textAlign: 'center', background: 'linear-gradient(135deg, #f59e0b, #d97706)', color: '#000000', fontSize: '12px', fontWeight: 900, borderRadius: '8px', textDecoration: 'none', boxShadow: '0 4px 12px rgba(245,158,11,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}
              onClick={(e) => e.stopPropagation()}
            >
              💬 익명 톡문의
            </a>
          </div>
        </div>
      </Link>
    );
  }

  // 🎖️ 2. GRAND VIP CARD (중간 등급 - 아메시스트 보라 테두리 컴팩트 카드)
  if (size === 'grandvip' || size === 'grand') {
    return (
      <Link
        href={`/job/${jobAd.id}`}
        className={`abam-card-grandvip ${className}`}
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          width: '100%',
          minHeight: '185px',
          border: '1.5px solid #a855f7',
          borderRadius: '14px',
          padding: '12px',
          boxSizing: 'border-box',
          textDecoration: 'none',
          boxShadow: '0 5px 18px rgba(168, 85, 247, 0.25)',
          transition: 'all 0.2s ease',
          position: 'relative',
          overflow: 'hidden'
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 9px 24px rgba(168, 85, 247, 0.4)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 5px 18px rgba(168, 85, 247, 0.25)';
        }}
      >
        {/* GRAND VIP AI 생성이미지 배경 */}
        <BannerBgImg companyName={jobAd.companyName} jobId={String(jobAd.id)} isVvip={false} bgIndex={bgIndex} />

        {/* Top Header Tag */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 2 }}>
          <span style={{ fontSize: '9px', fontWeight: 900, background: 'linear-gradient(135deg, #a855f7, #6b21a8)', color: '#ffffff', padding: '2px 8px', borderRadius: '10px', letterSpacing: '0.04em' }}>
            🎖️ GRAND VIP
          </span>
          <span style={{ fontSize: '8.5px', fontWeight: 900, color: '#a7f3d0', background: 'rgba(0,0,0,0.65)', padding: '2px 6px', borderRadius: '8px', backdropFilter: 'blur(4px)' }}>
            🟢 Live
          </span>
        </div>

        {/* Middle Company Name & Subtitle */}
        <div style={{ textAlign: 'center', margin: '4px 0', zIndex: 2 }}>
          <h4 style={{ margin: 0, fontSize: '17px', fontWeight: 900, color: '#ffffff', letterSpacing: '-0.02em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', textShadow: '0 2px 6px rgba(0,0,0,0.95)' }}>
            {jobAd.companyName}
          </h4>
          <p style={{ margin: '3px 0 0 0', fontSize: '11.5px', color: '#e9d5ff', fontWeight: 700, lineHeight: '1.3', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', textShadow: '0 1px 4px rgba(0,0,0,0.95)' }}>
            {jobAd.title}
          </p>
        </div>

        {/* Bottom Location & Pay Box */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.85)', border: '1px solid rgba(255,255,255,0.2)', padding: '7px 10px', borderRadius: '8px', backdropFilter: 'blur(6px)', zIndex: 2 }}>
          <span style={{ fontSize: '10.5px', color: '#e2e8f0', fontWeight: 800 }}>📍 {locationShort}</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <span style={{ fontSize: '10px', fontWeight: 900, color: '#c084fc' }}>{payBadge}</span>
            <span style={{ fontSize: '13.5px', fontWeight: 900, color: '#86efac' }}>{payText}</span>
          </div>
        </div>
      </Link>
    );
  }

  // 💎 3. PREMIUM CARD (기본 등급 - 클린 스카이블루 카드)
  return (
    <Link
      href={`/job/${jobAd.id}`}
      className={`abam-card-premium ${className}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '100%',
        minHeight: '145px',
        backgroundColor: '#ffffff',
        border: '1.5px solid #0284c7',
        borderRadius: '10px',
        padding: '10px 12px',
        boxSizing: 'border-box',
        textDecoration: 'none',
        boxShadow: '0 3px 10px rgba(2, 132, 199, 0.1)',
        transition: 'all 0.2s ease',
        position: 'relative',
        overflow: 'hidden'
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = '0 6px 16px rgba(2, 132, 199, 0.2)';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 3px 10px rgba(2, 132, 199, 0.1)';
      }}
    >
      {/* Top Header Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '9.5px', fontWeight: 900, color: '#ffffff', backgroundColor: '#0284c7', padding: '2px 8px', borderRadius: '10px' }}>
          💎 PREMIUM
        </span>
        <span style={{ fontSize: '10.5px', color: '#64748b', fontWeight: 800 }}>
          📍 {locationShort}
        </span>
      </div>

      {/* Middle Company Name */}
      <div style={{ textAlign: 'center', margin: '4px 0' }}>
        <h4 style={{ margin: 0, fontSize: '15.5px', fontWeight: 900, color: '#0f172a', letterSpacing: '-0.01em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {jobAd.companyName}
        </h4>
        <p style={{ margin: '3px 0 0 0', fontSize: '11px', color: '#64748b', fontWeight: 600, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {jobAd.title}
        </p>
      </div>

      {/* Bottom Pay Box */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f0f9ff', border: '1px solid #bae6fd', padding: '6px 10px', borderRadius: '6px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span style={{ fontSize: '10px', fontWeight: 900, color: '#0284c7' }}>{payBadge}</span>
          <span style={{ fontSize: '13px', fontWeight: 900, color: '#0369a1' }}>{payText}</span>
        </div>
        <span style={{ fontSize: '10px', fontWeight: 900, color: '#0284c7', background: '#e0f2fe', padding: '2px 6px', borderRadius: '4px' }}>
          📞 바로문의
        </span>
      </div>
    </Link>
  );
}
