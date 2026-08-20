'use client';

import React from 'react';

export default function VIPVerifiedRecruiterPassCard() {
  return (
    <div style={{
      background: 'linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%)',
      border: '2px solid #be185d',
      borderRadius: '20px',
      padding: '24px',
      color: '#ffffff',
      margin: '20px 0',
      boxShadow: '0 15px 40px rgba(190,24,93,0.3)',
      fontFamily: '"Noto Sans KR", sans-serif'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '12px' }}>
        <div>
          <span style={{ fontSize: '11px', background: '#be185d', color: '#fff', padding: '3px 10px', borderRadius: '12px', fontWeight: 900, letterSpacing: '0.05em' }}>
            🔐 100% 안심 검증 업소 VIP 보장 패스
          </span>
          <h3 style={{ fontSize: '18px', fontWeight: 900, color: '#f43f5e', margin: '6px 0 0' }}>
            에스크로 예치금 검증 업소 & 비밀 수입 장부 안심 솔루션
          </h3>
        </div>
        <span style={{ fontSize: '12px', background: 'rgba(233,30,99,0.2)', color: '#f43f5e', padding: '4px 14px', borderRadius: '14px', fontWeight: 900, border: '1px solid rgba(233,30,99,0.4)' }}>
          👑 VIP ESCROW ACTIVE
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', fontSize: '12.5px' }}>
        <div style={{ background: 'rgba(255,255,255,0.05)', padding: '14px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ color: '#94a3b8', fontWeight: 700 }}>급여 예치금 검증</div>
          <div style={{ fontSize: '16px', fontWeight: 900, color: '#4ade80', marginTop: '4px' }}>100% 당일 정산 보장</div>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.05)', padding: '14px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ color: '#94a3b8', fontWeight: 700 }}>비밀 수입/지출 장부</div>
          <div style={{ fontSize: '16px', fontWeight: 900, color: '#38bdf8', marginTop: '4px' }}>PIN 6자리 암호화 잠금</div>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.05)', padding: '14px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ color: '#94a3b8', fontWeight: 700 }}>SOS 긴급 매칭 알림</div>
          <div style={{ fontSize: '16px', fontWeight: 900, color: '#ffcd00', marginTop: '4px' }}>실시간 콜 전용 패스</div>
        </div>
      </div>
    </div>
  );
}
