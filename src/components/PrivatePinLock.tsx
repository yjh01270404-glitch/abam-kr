'use client';

import React, { useState, useEffect } from 'react';

const MASTER_PIN = '9806';

export default function PrivatePinLock({ children }: { children: React.ReactNode }) {
  const [unlocked, setUnlocked] = useState<boolean | null>(null);
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('abam_auth_pin');
    if (saved === MASTER_PIN) {
      setUnlocked(true);
    } else {
      setUnlocked(false);
    }
  }, []);

  const handleDigit = (d: string) => {
    if (pin.length >= 4) return;
    const next = pin + d;
    setPin(next);
    setError('');

    if (next.length === 4) {
      if (next === MASTER_PIN) {
        localStorage.setItem('abam_auth_pin', MASTER_PIN);
        document.cookie = 'abam_auth_pin=9806; path=/; max-age=2592000';
        setUnlocked(true);
      } else {
        setError('접근 보안 코드가 일치하지 않습니다.');
        setPin('');
      }
    }
  };

  const handleBackspace = () => {
    setPin(prev => prev.slice(0, -1));
    setError('');
  };

  if (unlocked === null) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0b0f19', color: '#fff', fontFamily: 'Pretendard, -apple-system, sans-serif' }}>
        <div style={{ textAlign: 'center', fontWeight: 700 }}>
          <div style={{ fontSize: '28px', marginBottom: '8px' }}>🌙</div>
          보안 상태 확인 중...
        </div>
      </div>
    );
  }

  if (!unlocked) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0b0f19', padding: '20px', fontFamily: 'Pretendard, -apple-system, sans-serif' }}>
        <div style={{ background: '#111827', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '24px', padding: '36px 28px', width: '100%', maxWidth: '380px', boxShadow: '0 25px 60px rgba(0,0,0,0.6)', textAlign: 'center' }}>
          <div style={{ width: '56px', height: '56px', background: 'rgba(190,24,93,0.15)', border: '1px solid rgba(190,24,93,0.3)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontSize: '24px' }}>
            🔒
          </div>
          <div style={{ fontSize: '20px', fontWeight: 900, color: '#ffffff', marginBottom: '8px' }}>
            비공개 서비스 안내
          </div>
          <p style={{ fontSize: '12px', color: '#cbd5e1', lineHeight: 1.6, marginBottom: '24px' }}>
            현재 비공개 서비스입니다.<br />
            인가된 관리자 전용 4자리 보안 코드를 입력해 주세요.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', marginBottom: '24px' }}>
            {[0, 1, 2, 3].map(i => (
              <div
                key={i}
                style={{
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  border: '2px solid rgba(255,255,255,0.3)',
                  background: pin.length > i ? '#be185d' : 'transparent',
                  borderColor: pin.length > i ? '#be185d' : 'rgba(255,255,255,0.3)',
                  transition: 'all 0.2s',
                }}
              />
            ))}
          </div>

          {error && (
            <div style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '10px', padding: '10px', color: '#fca5a5', fontSize: '11px', fontWeight: 700, marginBottom: '18px' }}>
              ⚠️ {error}
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '12px' }}>
            {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map(d => (
              <button
                key={d}
                type="button"
                onClick={() => handleDigit(d)}
                style={{
                  height: '56px',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '14px',
                  color: '#f8fafc',
                  fontSize: '20px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                }}
              >
                {d}
              </button>
            ))}
            <button
              type="button"
              onClick={handleBackspace}
              style={{
                height: '56px',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '14px',
                color: '#94a3b8',
                fontSize: '18px',
                cursor: 'pointer',
              }}
            >
              ⌫
            </button>
            <button
              type="button"
              onClick={() => handleDigit('0')}
              style={{
                height: '56px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '14px',
                color: '#f8fafc',
                fontSize: '20px',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              0
            </button>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', color: '#64748b' }}>
              SECURE
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
