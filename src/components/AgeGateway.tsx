'use client';

import { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import AbamLogo from './AbamLogo';
import PassIdentityAuthModal from './PassIdentityAuthModal';
import styles from './AgeGateway.module.css';

type Tab = 'login' | 'signup';

export default function AgeGateway({ children }: { children: React.ReactNode }) {
  const { currentUser, login, signup } = useApp();
  const [mounted, setMounted] = useState(false);
  const [tab, setTab] = useState<Tab>('login');
  const [isPassModalOpen, setIsPassModalOpen] = useState(false);

  // 로그인 폼
  const [loginId, setLoginId] = useState('');
  const [loginPw, setLoginPw] = useState('');
  const [showLoginPw, setShowLoginPw] = useState(false);
  const [loginError, setLoginError] = useState('');

  // 회원가입 폼
  const [signId, setSignId] = useState('');
  const [signPw, setSignPw] = useState('');
  const [signPw2, setSignPw2] = useState('');
  const [signNick, setSignNick] = useState('');
  const [signBirth, setSignBirth] = useState('');
  const [signGender, setSignGender] = useState<'M' | 'F' | ''>('');
  const [signRole, setSignRole] = useState<'seeker' | 'employer'>('seeker');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreeAge, setAgreeAge] = useState(false);
  const [showSignPw, setShowSignPw] = useState(false);
  const [signError, setSignError] = useState('');

  useEffect(() => { setMounted(true); }, []);

  if (!mounted) {
    return <>{children}</>;
  }

  /* ── 로그인 처리 ── */
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    if (!loginId || !loginPw) { setLoginError('아이디와 비밀번호를 입력해주세요.'); return; }
    const result = login(loginId, loginPw);
    if (result === 'not_found') setLoginError('존재하지 않는 아이디입니다.');
    else if (result === 'invalid') setLoginError('비밀번호가 올바르지 않습니다.');
  };

  /* ── 회원가입 처리 ── */
  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setSignError('');
    if (!signId || !signPw || !signNick || !signBirth || !signGender)
      { setSignError('모든 항목을 입력해주세요.'); return; }
    if (signPw !== signPw2) { setSignError('비밀번호가 일치하지 않습니다.'); return; }
    if (signBirth.length !== 8 || !/^\d{8}$/.test(signBirth))
      { setSignError('생년월일 8자리를 입력해주세요. (예: 19900101)'); return; }
    if (!agreeTerms || !agreeAge) { setSignError('이용약관 및 연령 확인에 동의해주세요.'); return; }

    const result = signup({ username: signId, password: signPw, nickname: signNick, birthdate: signBirth, gender: signGender, role: signRole });
    if (result === 'duplicate') setSignError('이미 사용 중인 아이디입니다.');
    else if (result === 'underage') setSignError('만 19세 미만은 가입하실 수 없습니다.');
  };

  const formatBirth = (v: string) => v.replace(/\D/g, '').slice(0, 8);

  return (
    <>
      {children}
      {!currentUser && (
        <div className={styles.overlay}>
          <div className={styles.modal}>
            {/* 헤더 */}
            <div className={styles.modalHeader}>
              <div className={styles.logo}><AbamLogo fontSize="inherit" /></div>
              <div className={styles.badge19}>19+</div>
            </div>

            <p className={styles.headerDesc}>
              성인 회원 전용 서비스입니다.<br />
              <strong>로그인</strong> 또는 <strong>회원가입</strong> 후 이용하세요.
            </p>

            {/* 🔞 만 19세 미만 청소년 이용 불가 및 PASS 핸드폰 본인인증 필수 알림 */}
            <div style={{ background: '#fff1f2', border: '1px solid #fecdd3', borderRadius: '12px', padding: '12px', marginBottom: '14px', textAlign: 'left' }}>
              <div style={{ fontSize: '12px', color: '#be123c', fontWeight: 800, marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span>🔞 [경고: 만 19세 미만 청소년 이용 불가]</span>
              </div>
              <p style={{ margin: 0, fontSize: '11px', color: '#9f1239', lineHeight: 1.5, wordBreak: 'keep-all' }}>
                본 서비스는 만 19세 이상 성인 전용 구인구직 플랫폼입니다.<br />
                일반 구직 이용자는 <strong>100% 전액 무료</strong>로 이용 가능하며, 청소년보호법에 의하여 만 19세 미만 청소년의 가입 및 이용을 엄격히 금지합니다.
              </p>
              <button
                type="button"
                onClick={() => setIsPassModalOpen(true)}
                style={{
                  width: '100%', marginTop: '10px', padding: '10px', borderRadius: '8px', border: 'none',
                  background: 'linear-gradient(135deg, #be185d 0%, #9d174d 100%)', color: '#ffffff',
                  fontSize: '13px', fontWeight: 900, cursor: 'pointer', boxShadow: '0 4px 12px rgba(190,24,93,0.3)'
                }}
              >
                📱 PASS 핸드폰 1초 성인 본인인증 시작하기
              </button>
            </div>

            {/* 탭 */}
            <div className={styles.tabRow}>
              <button
                className={`${styles.tabBtn} ${tab === 'login' ? styles.tabBtnActive : ''}`}
                onClick={() => { setTab('login'); setLoginError(''); }}
              >로그인</button>
              <button
                className={`${styles.tabBtn} ${tab === 'signup' ? styles.tabBtnActive : ''}`}
                onClick={() => { setTab('signup'); setSignError(''); }}
              >회원가입</button>
            </div>

            {/* ── 로그인 탭 ── */}
            {tab === 'login' && (
              <form className={styles.form} onSubmit={handleLogin}>
                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel}>아이디</label>
                  <input
                    className={styles.fieldInput}
                    placeholder="아이디 입력"
                    value={loginId}
                    onChange={e => setLoginId(e.target.value)}
                    autoComplete="username"
                  />
                </div>
                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel}>비밀번호</label>
                  <div className={styles.pwRow}>
                    <input
                      className={styles.fieldInput}
                      type={showLoginPw ? 'text' : 'password'}
                      placeholder="비밀번호 입력"
                      value={loginPw}
                      onChange={e => setLoginPw(e.target.value)}
                      autoComplete="current-password"
                    />
                    <button type="button" className={styles.eyeBtn} onClick={() => setShowLoginPw(v => !v)}>
                      {showLoginPw ? '🙈' : '👁️'}
                    </button>
                  </div>
                </div>

                {loginError && <p className={styles.errorTxt}>⚠️ {loginError}</p>}

                <button type="submit" className={styles.submitBtn}>
                  🔓 로그인
                </button>

                <p className={styles.switchTxt}>
                  계정이 없으신가요?{' '}
                  <button type="button" className={styles.switchLink} onClick={() => setTab('signup')}>
                    회원가입하기
                  </button>
                </p>
              </form>
            )}

            {/* ── 회원가입 탭 ── */}
            {tab === 'signup' && (
              <form className={styles.form} onSubmit={handleSignup}>
                {/* 휴대폰 1초 본인인증 버튼 */}
                <div style={{
                  background: 'linear-gradient(135deg, #0f172a, #1e293b)',
                  border: '1.5px solid #38bdf8',
                  borderRadius: '14px',
                  padding: '14px',
                  textAlign: 'center',
                  marginBottom: '4px'
                }}>
                  <div style={{ fontSize: '12px', color: '#38bdf8', fontWeight: '800', marginBottom: '6px' }}>
                    📱 NICE / PASS 휴대폰 본인확인 인증
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsPassModalOpen(true)}
                    style={{
                      width: '100%',
                      padding: '11px',
                      borderRadius: '10px',
                      border: 'none',
                      background: 'linear-gradient(135deg, #0284c7, #0369a1)',
                      color: '#ffffff',
                      fontSize: '13.5px',
                      fontWeight: '900',
                      cursor: 'pointer',
                      boxShadow: '0 4px 14px rgba(2,132,199,0.4)'
                    }}
                  >
                    📱 PASS / NICE 휴대폰 본인인증
                  </button>
                  <p style={{ margin: '6px 0 0 0', fontSize: '11px', color: '#94a3b8' }}>
                    1회 인증 시 직접 로그아웃 전까지 본 기기에 영구 자동 로그인됩니다.
                  </p>
                </div>

                {/* 가입 유형 */}
                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel}>가입 유형</label>
                  <div className={styles.roleRow}>
                    <button type="button"
                      className={`${styles.roleBtn} ${signRole === 'seeker' ? styles.roleBtnActive : ''}`}
                      onClick={() => setSignRole('seeker')}>
                      👩 구직자 (알바생)
                    </button>
                    <button type="button"
                      className={`${styles.roleBtn} ${signRole === 'employer' ? styles.roleBtnActive : ''}`}
                      onClick={() => setSignRole('employer')}>
                      🏢 구인자 (업소)
                    </button>
                  </div>
                </div>

                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel}>아이디</label>
                  <input className={styles.fieldInput} placeholder="영문/숫자 조합" value={signId}
                    onChange={e => setSignId(e.target.value.replace(/[^a-zA-Z0-9_]/g, '').slice(0, 20))} />
                </div>

                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel}>닉네임</label>
                  <input className={styles.fieldInput} placeholder="사용할 닉네임" value={signNick}
                    onChange={e => setSignNick(e.target.value.slice(0, 12))} />
                </div>

                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel}>비밀번호</label>
                  <div className={styles.pwRow}>
                    <input className={styles.fieldInput} type={showSignPw ? 'text' : 'password'}
                      placeholder="8자 이상" value={signPw}
                      onChange={e => setSignPw(e.target.value)} />
                    <button type="button" className={styles.eyeBtn} onClick={() => setShowSignPw(v => !v)}>
                      {showSignPw ? '🙈' : '👁️'}
                    </button>
                  </div>
                </div>

                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel}>비밀번호 확인</label>
                  <input className={`${styles.fieldInput} ${signPw2 && signPw !== signPw2 ? styles.inputError : ''}`}
                    type="password" placeholder="비밀번호 재입력" value={signPw2}
                    onChange={e => setSignPw2(e.target.value)} />
                </div>

                {/* 생년월일 + 성별 */}
                <div className={styles.twoCol}>
                  <div className={styles.fieldGroup}>
                    <label className={styles.fieldLabel}>생년월일 (8자리)</label>
                    <input className={styles.fieldInput} placeholder="예) 19901225" inputMode="numeric"
                      value={signBirth} onChange={e => setSignBirth(formatBirth(e.target.value))} maxLength={8} />
                  </div>
                  <div className={styles.fieldGroup}>
                    <label className={styles.fieldLabel}>성별</label>
                    <div className={styles.genderRow}>
                      {(['F', 'M'] as const).map(g => (
                        <button key={g} type="button"
                          className={`${styles.genderBtn} ${signGender === g ? styles.genderBtnActive : ''}`}
                          onClick={() => setSignGender(g)}>
                          {g === 'F' ? '여성' : '남성'}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 동의 체크박스 */}
                <div className={styles.agreeBox}>
                  <label className={styles.checkRow}>
                    <input type="checkbox" checked={agreeAge} onChange={e => setAgreeAge(e.target.checked)} />
                    <span>본인은 <strong>만 19세 이상</strong>이며 성인임을 확인합니다.</span>
                  </label>
                  <label className={styles.checkRow}>
                    <input type="checkbox" checked={agreeTerms} onChange={e => setAgreeTerms(e.target.checked)} />
                    <span>이용약관 및 개인정보처리방침에 동의합니다.</span>
                  </label>
                </div>

                {signError && <p className={styles.errorTxt}>⚠️ {signError}</p>}

                <button type="submit" className={styles.submitBtn}>
                  ✨ 회원가입
                </button>

                <p className={styles.switchTxt}>
                  이미 계정이 있으신가요?{' '}
                  <button type="button" className={styles.switchLink} onClick={() => setTab('login')}>
                    로그인하기
                  </button>
                </p>
              </form>
            )}

            <a href="https://www.naver.com" className={styles.exitLink}>
              미성년자입니다. 사이트를 떠납니다 →
            </a>
          </div>
        </div>
      )}
      <PassIdentityAuthModal
        isOpen={isPassModalOpen}
        onClose={() => setIsPassModalOpen(false)}
        onSuccess={(info) => {
          setSignNick(info.name);
          setSignBirth(info.birthdate);
          setSignGender(info.gender);
          setAgreeAge(true);
          setAgreeTerms(true);
          // 19세 이상 본인인증 성공 시 회원 가입 및 로그인 자동 처리
          signup({
            username: `pass_${info.phone.slice(-4)}_${Date.now().toString().slice(-4)}`,
            password: `pass${info.phone.slice(-4)}!`,
            nickname: info.name,
            birthdate: info.birthdate,
            gender: info.gender,
            role: 'seeker'
          });
        }}
      />
    </>
  );
}
