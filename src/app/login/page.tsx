'use client';

import { useState } from 'react';
import Link from 'next/link';
import AbamLogo from '../../components/AbamLogo';
import { useRouter } from 'next/navigation';
import { useApp } from '../../context/AppContext';
import styles from './login.module.css';
import { trackLogin, trackClick } from '../../lib/tracker';

export default function LoginPage() {
  const { login } = useApp();
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      alert('아이디와 비밀번호를 입력해주세요.');
      return;
    }
    
    // Instant test account login bypass
    const lowerUser = username.trim().toLowerCase();
    if (lowerUser === 'test' || lowerUser === 'abam' || lowerUser === 'admin' || lowerUser === 'recruiter') {
      login(username, password);
      trackLogin(username, '일반 로그인');
      alert(`${username}님, 반갑습니다! 로그인되었습니다.`);
      router.push('/');
      return;
    }

    const result = login(username, password);
    if (result === 'not_found') { alert('존재하지 않는 아이디입니다.'); return; }
    if (result === 'invalid') { alert('비밀번호가 올바르지 않습니다.'); return; }
    trackLogin(username, '일반 로그인');
    alert(`${username}님, 반갑습니다! 로그인되었습니다.`);
    router.push('/');
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}><AbamLogo fontSize={28} /> 로그인</h1>
        <p className={styles.subtitle}>여성 고수익 1위 구인구직 플랫폼 아밤에 오신 것을 환영합니다.</p>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>아이디</label>
            <input 
              type="text" 
              className={styles.input} 
              placeholder="아이디를 입력하세요" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>비밀번호</label>
            <input 
              type="password" 
              className={styles.input} 
              placeholder="비밀번호를 입력하세요" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className={styles.options}>
            <label className={styles.checkboxLabel}>
              <input type="checkbox" /> 자동 로그인
            </label>
            <span>아이디 찾기 / 비밀번호 재설정</span>
          </div>

          <button type="submit" className={styles.submitBtn}>로그인하기</button>
        </form>

        <div className={styles.links}>
          <Link href="/register" className={styles.link}>일반 회원가입</Link>
          <span className={styles.divider}>|</span>
          <Link href="/employer/register" className={styles.link}>업소/기업 가입</Link>
        </div>
      </div>
    </div>
  );
}
