'use client';

import React from 'react';
import Link from 'next/link';

export default function SmartDockBar() {
  const handleOpenLiveChat = () => {
    window.dispatchEvent(new CustomEvent('abam-open-chat'));
  };

  return (
    <div style={{
      position: 'fixed',
      bottom: '16px',
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 9999,
      background: 'rgba(15, 23, 42, 0.94)',
      backdropFilter: 'blur(20px)',
      border: '1.5px solid rgba(233,30,99,0.4)',
      borderRadius: '35px',
      padding: '8px 20px',
      boxShadow: '0 12px 35px rgba(233,30,99,0.25)',
      display: 'flex',
      alignItems: 'center',
      gap: '14px',
      fontFamily: '"Noto Sans KR", sans-serif'
    }}>
      <span style={{ fontSize: '12px', fontWeight: 900, color: '#f43f5e', whiteSpace: 'nowrap' }}>
        👑 아름다운밤 1-Tap 스마트 도크:
      </span>

      <Link href="/jobs" style={{ textDecoration: 'none', background: 'rgba(255,255,255,0.08)', color: '#fff', padding: '6px 14px', borderRadius: '20px', fontSize: '11.5px', fontWeight: 800 }}>
        📍 전국 구인 핀
      </Link>

      <Link href="/employer/post" style={{ textDecoration: 'none', background: 'linear-gradient(135deg, #be185d, #9d174d)', color: '#fff', padding: '6px 14px', borderRadius: '20px', fontSize: '11.5px', fontWeight: 900 }}>
        ⚡ 광고 등록
      </Link>

      <button onClick={handleOpenLiveChat} style={{ background: 'linear-gradient(135deg, #d97706, #b45309)', border: 'none', color: '#fff', padding: '6px 14px', borderRadius: '20px', fontSize: '11.5px', fontWeight: 900, cursor: 'pointer' }}>
        💬 1:1 톡상담
      </button>
    </div>
  );
}
