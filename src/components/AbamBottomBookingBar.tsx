'use client';

import React from 'react';

interface Props {
  smsMessage?: string;
}

export default function AbamBottomBookingBar({ smsMessage }: Props) {
  const defaultBody = smsMessage || '[아밤 예약문의] 코스 및 예약 가능 시간 문의드립니다.';
  const smsHref = `sms:01066072239?body=${encodeURIComponent(defaultBody)}`;
  const phoneHref = 'tel:010-6607-2239';
  const whatsappHref = 'https://wa.me/821066072239?text=' + encodeURIComponent('Hello Abam, I would like to inquire about massage booking.');

  return (
    <aside
      aria-label="아밤 실시간 예약 및 상담"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.96)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        borderTop: '1px solid rgba(255, 255, 255, 0.12)',
        padding: '10px 16px calc(10px + env(safe-area-inset-bottom, 0px))',
        zIndex: 9999,
        boxShadow: '0 -6px 24px rgba(0, 0, 0, 0.35)',
      }}
    >
      <div
        style={{
          maxWidth: '560px',
          margin: '0 auto',
          display: 'flex',
          gap: '8px',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* 문자 간편예약 버튼 */}
        <a
          href={smsHref}
          style={{
            flex: 1.25,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            background: 'linear-gradient(135deg, #1e293b, #334155)',
            color: '#f8fafc',
            padding: '12px 6px',
            borderRadius: '12px',
            fontWeight: 800,
            fontSize: '14.5px',
            letterSpacing: '-0.3px',
            textDecoration: 'none',
            border: '1px solid rgba(255, 255, 255, 0.18)',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.25)',
            transition: 'transform 0.15s ease, filter 0.15s ease',
          }}
        >
          <span style={{ fontSize: '16px' }}>✉️</span>
          <span>문자 간편예약</span>
        </a>

        {/* 전화예약 버튼 */}
        <a
          href={phoneHref}
          style={{
            flex: 1.25,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            background: 'linear-gradient(135deg, #f59e0b, #d97706)',
            color: '#0f172a',
            padding: '12px 6px',
            borderRadius: '12px',
            fontWeight: 900,
            fontSize: '15px',
            letterSpacing: '-0.3px',
            textDecoration: 'none',
            boxShadow: '0 3px 12px rgba(245, 158, 11, 0.4)',
            transition: 'transform 0.15s ease, filter 0.15s ease',
          }}
        >
          <span style={{ fontSize: '16px' }}>📞</span>
          <span>전화예약</span>
        </a>

        {/* WhatsApp 상담 버튼 (외국인·해외고객 대응) */}
        <a
          href={whatsappHref}
          target="_blank"
          rel="noreferrer"
          title="WhatsApp 상담 (For English / Overseas)"
          style={{
            width: '44px',
            height: '44px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#25D366',
            color: '#ffffff',
            borderRadius: '12px',
            flexShrink: 0,
            textDecoration: 'none',
            boxShadow: '0 3px 10px rgba(37, 211, 102, 0.35)',
            fontSize: '19px',
          }}
        >
          <span>💬</span>
        </a>
      </div>
    </aside>
  );
}
