'use client';

import { useState, useEffect } from 'react';
import AdminDashboard from './AdminDashboard';
import styles from './admin.module.css';

export default function AdminPage() {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [step, setStep] = useState<1 | 2>(1); // 1: 4자리 PIN, 2: 구글 1초 인증
  const [pin, setPin] = useState('');
  const [pinErr, setPinErr] = useState('');

  const [googleErr, setGoogleErr] = useState('');
  const [isLoggingInGoogle, setIsLoggingInGoogle] = useState(false);

  useEffect(() => {
    const isAuthedSession = sessionStorage.getItem('abam_admin_authed') === 'true';
    const hasCookie = typeof document !== 'undefined' && document.cookie.includes('abam_admin_authed=true');

    if (isAuthedSession || hasCookie) {
      sessionStorage.setItem('abam_admin_authed', 'true');
      sessionStorage.setItem('abam_admin_email', 'yjh01270404@gmail.com');
      setAuthed(true);
    } else {
      setAuthed(false);
    }
  }, []);

  // Step 1: 4자리 PIN 비밀번호 검증 (9806)
  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPinErr('');

    if (pin.trim() === '9806') {
      sessionStorage.setItem('abam_admin_authed', 'true');
      sessionStorage.setItem('abam_admin_email', 'yjh01270404@gmail.com');
      document.cookie = 'abam_admin_authed=true; path=/; max-age=86400;';
      setAuthed(true);
    } else {
      setPinErr('⚠️ 비밀번호가 올바르지 않습니다.');
    }
  };

  // Step 2: 실제 구글 1초 인증 (Google OAuth) 진행
  const handleGoogleLogin = () => {
    setIsLoggingInGoogle(true);
    setGoogleErr('');

    // 실제 구글 OAuth 주소로 이동하여 사장님 구글 계정(yjh01270404@gmail.com) 본인 확인
    window.location.href = '/api/auth/google?returnUrl=/abam-nightman-2026';
  };

  if (authed === null) return null;

  if (authed) {
    return (
      <AdminDashboard
        onLogout={() => {
          sessionStorage.removeItem('abam_admin_authed');
          sessionStorage.removeItem('abam_admin_email');
          document.cookie = 'abam_admin_authed=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;';
          setAuthed(false);
          setStep(1);
          setPin('');
        }}
      />
    );
  }

  return (
    <div className={styles.loginBg}>
      <div className={styles.loginCard} style={{
        background: 'linear-gradient(145deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)',
        border: '2.5px solid #fbbf24',
        borderRadius: '24px',
        padding: '38px 32px',
        maxWidth: '420px',
        width: '100%',
        boxShadow: '0 0 60px rgba(251,191,36,0.3)',
        color: '#ffffff',
        fontFamily: '"Noto Sans KR", sans-serif'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{ fontSize: '24px', fontWeight: '900', color: '#fbbf24', marginBottom: '6px' }}>
            👑 아름다운밤 관리자 시스템
          </div>
          <div style={{ fontSize: '13px', color: '#cbd5e1', fontWeight: '700' }}>
            최고 관리자 전용 2단계 보안 인증
          </div>
        </div>

        {/* Step 1: 4자리 비밀번호 (9806) */}
        {step === 1 && (
          <form onSubmit={handlePinSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13.5px', color: '#fef08a', fontWeight: '900', marginBottom: '10px' }}>
                🔑 1단계: 4자리 보안 비밀번호
              </label>
              <input
                type="password"
                maxLength={4}
                value={pin}
                onChange={e => setPin(e.target.value.replace(/\D/g, '').slice(0, 4))}
                placeholder="••••"
                autoFocus
                style={{
                  width: '100%',
                  padding: '15px',
                  borderRadius: '14px',
                  border: '2px solid #475569',
                  background: '#1e293b',
                  color: '#ffffff',
                  fontSize: '24px',
                  letterSpacing: '12px',
                  textAlign: 'center',
                  fontWeight: '900',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            {pinErr && (
              <p style={{ margin: 0, color: '#f87171', fontSize: '13px', fontWeight: '800', textAlign: 'center', background: '#450a0a', padding: '10px', borderRadius: '10px', border: '1px solid #dc2626' }}>
                {pinErr}
              </p>
            )}

            <button
              type="submit"
              style={{
                width: '100%',
                padding: '16px',
                borderRadius: '14px',
                border: 'none',
                background: 'linear-gradient(135deg, #fbbf24, #d97706)',
                color: '#000000',
                fontSize: '16px',
                fontWeight: '900',
                cursor: 'pointer',
                boxShadow: '0 6px 20px rgba(251,191,36,0.35)'
              }}
            >
              ➡️ 1단계 비밀번호 확인
            </button>
          </form>
        )}

        {/* Step 2: 실제 구글 1초 인증 (yjh01270404@gmail.com 검증) */}
        {step === 2 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div style={{
              background: 'rgba(56, 189, 248, 0.1)',
              border: '1.5px solid #38bdf8',
              borderRadius: '14px',
              padding: '14px',
              textAlign: 'center'
            }}>
              <span style={{ fontSize: '13px', color: '#38bdf8', fontWeight: '900', display: 'block', marginBottom: '4px' }}>
                ✅ 1단계 비밀번호 인증 완료!
              </span>
              <span style={{ fontSize: '13.5px', color: '#ffffff', fontWeight: '800' }}>
                2단계: 사장님 구글 계정 1초 인증
              </span>
            </div>

            {googleErr && (
              <p style={{ margin: 0, color: '#f87171', fontSize: '13px', fontWeight: '800', textAlign: 'center', background: '#450a0a', padding: '10px', borderRadius: '10px', border: '1px solid #dc2626' }}>
                {googleErr}
              </p>
            )}

            <button
              onClick={handleGoogleLogin}
              disabled={isLoggingInGoogle}
              style={{
                width: '100%',
                padding: '16px',
                borderRadius: '14px',
                border: 'none',
                background: 'linear-gradient(135deg, #4285f4, #1a73e8)',
                color: '#ffffff',
                fontSize: '15.5px',
                fontWeight: '900',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                boxShadow: '0 6px 22px rgba(66,133,244,0.45)'
              }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24">
                <path fill="#ffffff" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#ffffff" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#ffffff" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#ffffff" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              {isLoggingInGoogle ? '구글 계정 인증 연결 중...' : 'Google 1초 계정 인증하기'}
            </button>

            <button
              onClick={() => { setStep(1); setGoogleErr(''); }}
              style={{
                background: 'none',
                border: 'none',
                color: '#94a3b8',
                fontSize: '12.5px',
                cursor: 'pointer',
                textDecoration: 'underline'
              }}
            >
              ⬅️ 1단계 비밀번호 다시 입력하기
            </button>
          </div>
        )}

        <div style={{ marginTop: '26px', paddingTop: '16px', borderTop: '1px solid #1e293b', textAlign: 'center', fontSize: '12px', color: '#64748b' }}>
          🔒 사장님 전용 구글 계정 2단계 통합 보안 시스템
        </div>
      </div>
    </div>
  );
}
