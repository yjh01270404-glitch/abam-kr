'use client';

import React, { useState } from 'react';

export default function Vvip3DHologramArCard() {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setRotateX(-y / 10);
    setRotateY(x / 10);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div style={{
      background: 'linear-gradient(135deg, rgba(255,215,0,0.18) 0%, rgba(15,23,42,0.98) 100%)',
      border: '2.5px solid #ffd700',
      borderRadius: '24px',
      padding: '24px',
      color: '#ffffff',
      margin: '24px 0',
      boxShadow: '0 20px 50px rgba(255,215,0,0.3)',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '1px solid rgba(255,215,0,0.3)', paddingBottom: '14px' }}>
        <div>
          <span style={{ fontSize: '11px', background: 'linear-gradient(135deg, #ffd700, #ff8c00)', color: '#000', padding: '4px 12px', borderRadius: '12px', fontWeight: 900 }}>
            👑 VVIP 3D HOLOGRAM AR CARD &amp; SMART CONTRACT
          </span>
          <h3 style={{ fontSize: '20px', fontWeight: 900, color: '#ffd700', margin: '8px 0 0' }}>
            입체 회전 AR 홀로그램 카드 &amp; 포트원 가상계좌 100% 당일정산 약서
          </h3>
        </div>
      </div>

      <div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          perspective: '1000px',
          cursor: 'pointer',
          maxWidth: '500px',
          margin: '0 auto'
        }}
      >
        <div style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transition: 'transform 0.1s ease-out',
          background: 'linear-gradient(135deg, #20003b 0%, #4a0072 50%, #1a0030 100%)',
          border: '3px solid #ffd700',
          borderRadius: '20px',
          padding: '24px',
          boxShadow: '0 20px 40px rgba(255,215,0,0.4)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '11px', fontWeight: 900, color: '#000', background: '#ffd700', padding: '3px 10px', borderRadius: '10px' }}>
              👑 VVIP HOLOGRAM AR
            </span>
            <span style={{ fontSize: '11px', color: '#4ade80', fontWeight: 800 }}>⚡ PortOne Escrow Valid</span>
          </div>

          <div style={{ margin: '20px 0', textAlign: 'center' }}>
            <h4 style={{ margin: 0, fontSize: '24px', fontWeight: 900, color: '#fff', textShadow: '0 0 10px #ffd700' }}>
              강남 에이스 프리미엄 살롱 (SPECIAL)
            </h4>
            <p style={{ margin: '6px 0 0 0', fontSize: '13px', color: '#fed7aa' }}>
              마우스 이동 시 3D 홀로그램 입체 회전 · 당일 정산 100% 보장 약서
            </p>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,215,0,0.3)', paddingTop: '12px' }}>
            <span style={{ fontSize: '12px', color: '#f1f5f9' }}>📍 서울 강남구</span>
            <span style={{ fontSize: '16px', fontWeight: 900, color: '#4ade80' }}>일급 120만원+ (당일지급)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
