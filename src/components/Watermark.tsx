import React from 'react';

/**
 * 아름다운밤 전용 공통 워터마크 컴포넌트
 * 황금 초승달 + 럭셔리 골드 톤 룩앤필
 */
export default function Watermark() {
  return (
    <div style={{
      position: 'absolute',
      bottom: '12px',
      right: '12px',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '4px',
      padding: '3px 8px',
      background: 'rgba(15, 23, 42, 0.75)',
      backdropFilter: 'blur(4px)',
      border: '1.5px solid #fbbf24',
      borderRadius: '6px',
      fontSize: '11px',
      fontWeight: '900',
      color: '#facc15',
      boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
      pointerEvents: 'none',
      zIndex: 10,
      fontFamily: '"Noto Sans KR", sans-serif'
    }}>
      <span style={{ fontSize: '12px', color: '#fde047' }}>🌙</span>
      <span style={{
        background: 'linear-gradient(110deg, #f59e0b 0%, #fbbf24 50%, #fde047 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        fontWeight: '900',
        letterSpacing: '0.05em'
      }}>아름다운밤</span>
    </div>
  );
}
