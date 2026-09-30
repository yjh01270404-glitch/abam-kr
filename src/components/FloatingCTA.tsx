'use client';

import { useState, useEffect } from 'react';

export default function FloatingCTA() {
  const [visible, setVisible] = useState(false);
  const [pulsing, setPulsing] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  const kakaoLink = 'kakaotalk://';
  const phoneNumber = 'tel:010-6607-2239';

  return (
    <>
      {/* Floating CTA Buttons */}
      <div style={{
        position: 'fixed',
        bottom: '28px',
        right: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        zIndex: 9999,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
      }}>
        {/* Kakao Button */}
        <a
          href={kakaoLink}
          id="floating-kakao-btn"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            background: '#FEE500',
            color: '#3C1E1E',
            padding: '14px 20px',
            borderRadius: '50px',
            fontWeight: 800,
            fontSize: '14px',
            boxShadow: '0 4px 20px rgba(254,229,0,0.5)',
            textDecoration: 'none',
            whiteSpace: 'nowrap',
            animation: pulsing ? 'pulse-glow-kakao 2s infinite' : 'none',
          }}
        >
          <span style={{ fontSize: '20px' }}>💬</span>
          카카오 즉시 상담
        </a>

        {/* Phone Button */}
        <a
          href={phoneNumber}
          id="floating-phone-btn"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            background: '#8B5CF6',
            color: '#ffffff',
            padding: '14px 20px',
            borderRadius: '50px',
            fontWeight: 800,
            fontSize: '14px',
            boxShadow: '0 4px 20px rgba(139,92,246,0.4)',
            textDecoration: 'none',
            whiteSpace: 'nowrap',
          }}
        >
          <span style={{ fontSize: '18px' }}>📞</span>
          전화 예약
        </a>
      </div>

      {/* Sticky Bottom Bar (Mobile) */}
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        background: '#ffffff',
        borderTop: '1px solid #E5E7EB',
        padding: '12px 16px',
        display: 'flex',
        gap: '10px',
        zIndex: 9998,
        boxShadow: '0 -4px 20px rgba(0,0,0,0.08)',
      }}
      className="mobile-sticky-bar"
      >
        <a
          href={kakaoLink}
          style={{
            flex: 1,
            background: '#FEE500',
            color: '#3C1E1E',
            padding: '14px',
            borderRadius: '12px',
            fontWeight: 800,
            fontSize: '15px',
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
          }}
        >
          💬 카카오 상담
        </a>
        <a
          href={phoneNumber}
          style={{
            flex: 1,
            background: '#8B5CF6',
            color: '#ffffff',
            padding: '14px',
            borderRadius: '12px',
            fontWeight: 800,
            fontSize: '15px',
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
          }}
        >
          📞 전화 예약
        </a>
      </div>

      <style>{`
        @keyframes pulse-glow-kakao {
          0%, 100% { box-shadow: 0 4px 20px rgba(254,229,0,0.5); }
          50% { box-shadow: 0 4px 30px rgba(254,229,0,0.8), 0 0 0 6px rgba(254,229,0,0.15); }
        }
        @media (min-width: 768px) {
          .mobile-sticky-bar { display: none !important; }
        }
        @media (max-width: 767px) {
          /* floating buttons overlap on mobile — hide them, use sticky bar instead */
          body { padding-bottom: 80px; }
        }
      `}</style>
    </>
  );
}
