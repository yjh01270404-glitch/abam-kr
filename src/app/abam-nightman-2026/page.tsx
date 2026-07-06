'use client';

import { useState, useEffect } from 'react';
import { ADMIN_CREDENTIALS } from '../../lib/adminUtils';

import AdminDashboard from './AdminDashboard';
import styles from './admin.module.css';

export default function AdminPage() {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [err, setErr] = useState('');

  useEffect(() => {
    setAuthed(sessionStorage.getItem('abam_admin_authed') === 'true');
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (id === ADMIN_CREDENTIALS.username && pw === ADMIN_CREDENTIALS.password) {
      sessionStorage.setItem('abam_admin_authed', 'true');
      setAuthed(true);
    } else {
      setErr('관리자 계정 정보가 올바르지 않습니다.');
    }
  };

  if (authed === null) return null;
  if (authed) return <AdminDashboard onLogout={() => { sessionStorage.removeItem('abam_admin_authed'); setAuthed(false); }} />;

  return (
    <div className={styles.loginBg}>
      <div className={styles.loginCard}>
        <div className={styles.loginLogo}>🌙 아름다운밤</div>
        <div className={styles.loginSubtitle}>관리자 시스템</div>
        <div className={styles.loginBadge}>ADMIN CONSOLE</div>

        <form onSubmit={handleLogin} className={styles.loginForm}>
          <div className={styles.loginField}>
            <label>관리자 아이디</label>
            <input value={id} onChange={e => setId(e.target.value)} placeholder="아이디" autoComplete="off" />
          </div>
          <div className={styles.loginField}>
            <label>비밀번호</label>
            <div className={styles.pwWrap}>
              <input type={showPw ? 'text' : 'password'} value={pw} onChange={e => setPw(e.target.value)} placeholder="비밀번호" autoComplete="off" />
              <button type="button" onClick={() => setShowPw(v => !v)}>{showPw ? '🙈' : '👁️'}</button>
            </div>
          </div>
          {err && <p className={styles.loginErr}>{err}</p>}
          <button type="submit" className={styles.loginBtn}>로그인</button>
        </form>

        <p className={styles.loginFooter}>허가받지 않은 접근은 법적 처벌을 받을 수 있습니다.</p>
      </div>
    </div>
  );
}
