'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import AbamLogo from '../../components/AbamLogo';
import { useRouter } from 'next/navigation';
import { useApp } from '../../context/AppContext';
import { sendMessage } from '../../lib/messages';
import { broadcastAdminPush } from '../../lib/audioAlert';
import {
  SOS_REGIONS,
  registerSosServiceWorker,
  requestSosPermission,
} from '../../lib/sos-notify';
import styles from './register.module.css';

export default function RegisterPage() {
  const { signup } = useApp();
  const router = useRouter();
  const [role, setRole] = useState<'employer' | 'seeker'>('seeker');
  const [username, setUsername] = useState('');
  const [nickname, setNickname] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [gender, setGender] = useState<'F' | 'M'>('F');
  const [companyName, setCompanyName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // ── SOS 알림 설정 ──
  const [sosAlert, setSosAlert] = useState(false);
  const [sosRegions, setSosRegions] = useState<string[]>([]);
  const [pushPermission, setPushPermission] = useState<'granted' | 'denied' | 'default' | 'unsupported'>('default');

  useEffect(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      setPushPermission(Notification.permission as 'granted' | 'denied' | 'default');
    } else {
      setPushPermission('unsupported');
    }
  }, []);

  const toggleRegion = (r: string) => {
    setSosRegions((prev) =>
      prev.includes(r) ? prev.filter((x) => x !== r) : prev.length >= 5 ? prev : [...prev, r],
    );
  };

  const handleRequestPush = async () => {
    await registerSosServiceWorker();
    const result = await requestSosPermission();
    setPushPermission(result === 'granted' ? 'granted' : result === 'denied' ? 'denied' : 'default');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password || !confirmPassword || !nickname || !birthdate) {
      alert('필수 항목을 모두 입력해주세요.');
      return;
    }
    if (role === 'employer' && (!companyName || !phone)) {
      alert('매장명과 담당자 연락처를 모두 입력해주세요.');
      return;
    }
    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    if (sosAlert && sosRegions.length === 0) {
      alert('SOS 알림을 받으시려면 최소 1개 지역을 선택해주세요.');
      return;
    }

    const result = signup({ username, password, nickname, birthdate, gender, role, sosAlert, sosRegions, phone });
    if (result === 'duplicate') { alert('이미 사용 중인 아이디입니다.'); return; }
    if (result === 'underage') { alert('만 19세 이상만 가입 가능합니다.'); return; }

    // 브라우저 push 권한 요청 (SOS ON인 경우)
    if (role === 'seeker' && sosAlert && sosRegions.length > 0 && pushPermission !== 'granted') {
      await registerSosServiceWorker();
      await requestSosPermission();
    }

    // 가입 축하 쪽지
    const userId = `u_${username}`;

    // 관리자 PWA 푸시 알림 전송
    broadcastAdminPush(
      '🎉 [신규 회원 가입]',
      `새로운 ${role === 'employer' ? '매장 구인회원' : '일반 구직회원'} (${nickname || username}) 님이 회원가입 하셨습니다!`,
      '/abam-nightman-2026'
    );

    alert('아름다운밤 회원가입이 성공적으로 완료되었습니다!');
    router.push('/');
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}><AbamLogo fontSize={28} /> 회원가입</h1>
        <p className={styles.subtitle}>간편 가입 후 광고 게재 및 인재 찾기 서비스를 바로 시작해보세요.</p>

        <div className={styles.typeSelect}>
          <div
            className={`${styles.typeCard} ${role === 'seeker' ? styles.typeActive : ''}`}
            onClick={() => setRole('seeker')}
          >
            <div className={styles.typeName}>👩 일반 구직회원</div>
            <div className={styles.typeDesc}>공고 열람 및 1대1 채용 문의 가능</div>
          </div>
          <div
            className={`${styles.typeCard} ${role === 'employer' ? styles.typeActive : ''}`}
            onClick={() => setRole('employer')}
          >
            <div className={styles.typeName}>💼 기업/광고주 회원</div>
            <div className={styles.typeDesc}>구인공고 등록 및 배너 광고 신청 가능</div>
          </div>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>아이디 *</label>
            <input
              type="text"
              className={styles.input}
              placeholder="사용할 아이디 입력"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>닉네임 *</label>
            <input
              type="text"
              className={styles.input}
              placeholder="닉네임 입력"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>생년월일 * <span style={{ fontWeight: 400, fontSize: 12, color: '#9ca3af' }}>(8자리, 예: 19990101)</span></label>
            <input
              type="text"
              className={styles.input}
              placeholder="19990101"
              maxLength={8}
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value.replace(/\D/g, '').slice(0, 8))}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>성별 *</label>
            <div style={{ display: 'flex', gap: 10 }}>
              {(['F', 'M'] as const).map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setGender(g)}
                  style={{
                    flex: 1, padding: '10px', borderRadius: 8, border: '2px solid',
                    borderColor: gender === g ? '#e91e63' : '#e5e7eb',
                    background: gender === g ? '#fff0f5' : '#fff',
                    fontWeight: 700, cursor: 'pointer', fontSize: 14,
                    color: gender === g ? '#e91e63' : '#6b7280',
                  }}
                >
                  {g === 'F' ? '👩 여성' : '👨 남성'}
                </button>
              ))}
            </div>
          </div>

          {role === 'employer' && (
            <>
              <div className={styles.formGroup}>
                <label>매장명 (상호명) *</label>
                <input
                  type="text"
                  className={styles.input}
                  placeholder="예: 아름다운밤 룸라운지"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label>담당자 연락처 (휴대폰 번호) *</label>
                <input
                  type="text"
                  className={styles.input}
                  placeholder="예: 010-8294-6330"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
            </>
          )}

          <div className={styles.formGroup}>
            <label>비밀번호 *</label>
            <input
              type="password"
              className={styles.input}
              placeholder="6자리 이상 비밀번호 입력"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>비밀번호 확인 *</label>
            <input
              type="password"
              className={styles.input}
              placeholder="비밀번호 재입력"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          {/* ── SOS 알림 설정 (구직자 전용) ── */}
          {role === 'seeker' && (
            <div style={{
              background: sosAlert ? 'linear-gradient(135deg, #fff0f5, #fce7f3)' : '#f8fafc',
              border: `2px solid ${sosAlert ? '#f9a8d4' : '#e5e7eb'}`,
              borderRadius: 14, padding: '18px 16px', marginTop: 4,
              transition: 'all 0.3s ease',
            }}>
              {/* 헤더 토글 */}
              <label style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}>
                <div
                  onClick={() => setSosAlert(v => !v)}
                  style={{
                    width: 48, height: 26, borderRadius: 13,
                    background: sosAlert ? '#e91e63' : '#d1d5db',
                    position: 'relative', transition: 'background 0.25s', flexShrink: 0,
                    cursor: 'pointer',
                  }}
                >
                  <div style={{
                    width: 20, height: 20, borderRadius: '50%', background: '#fff',
                    position: 'absolute', top: 3,
                    left: sosAlert ? 25 : 3,
                    transition: 'left 0.25s',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
                  }} />
                </div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: 14, color: sosAlert ? '#be185d' : '#374151' }}>
                    ⚡ SOS 긴급 알림 받기
                  </div>
                  <div style={{ fontSize: 11.5, color: '#6b7280', marginTop: 2 }}>
                    선택한 지역에 급구 공고가 뜨면 폰 알림으로 즉시 알려드려요
                  </div>
                </div>
              </label>

              {sosAlert && (
                <>
                  {/* 지역 선택 */}
                  <div style={{ marginTop: 14 }}>
                    <div style={{ fontSize: 12.5, fontWeight: 700, color: '#be185d', marginBottom: 8 }}>
                      알림 받을 지역 선택 <span style={{ fontWeight: 400, color: '#9ca3af' }}>(최대 5개)</span>
                      {sosRegions.length > 0 && (
                        <span style={{ marginLeft: 8, color: '#e91e63' }}>{sosRegions.length}/5 선택됨</span>
                      )}
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                      {SOS_REGIONS.map((r) => {
                        const selected = sosRegions.includes(r);
                        const disabled = !selected && sosRegions.length >= 5;
                        return (
                          <button
                            key={r}
                            type="button"
                            onClick={() => toggleRegion(r)}
                            disabled={disabled}
                            style={{
                              padding: '6px 13px', borderRadius: 20, fontSize: 12.5, fontWeight: 700,
                              border: `1.5px solid ${selected ? '#e91e63' : '#e5e7eb'}`,
                              background: selected ? '#e91e63' : '#fff',
                              color: selected ? '#fff' : disabled ? '#d1d5db' : '#374151',
                              cursor: disabled ? 'not-allowed' : 'pointer',
                              transition: 'all 0.15s',
                            }}
                          >
                            {selected ? '✓ ' : ''}{r}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* 브라우저 Push 권한 */}
                  <div style={{
                    marginTop: 14, padding: '12px 14px', borderRadius: 10,
                    background: pushPermission === 'granted' ? '#f0fdf4' : '#fffbeb',
                    border: `1px solid ${pushPermission === 'granted' ? '#86efac' : '#fcd34d'}`,
                  }}>
                    {pushPermission === 'granted' ? (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ fontSize: 18 }}>✅</span>
                        <div>
                          <div style={{ fontSize: 12.5, fontWeight: 700, color: '#15803d' }}>알림 권한 허용됨</div>
                          <div style={{ fontSize: 11, color: '#6b7280' }}>폰 알림창에 SOS가 즉시 표시됩니다</div>
                        </div>
                      </div>
                    ) : pushPermission === 'denied' ? (
                      <div>
                        <div style={{ fontSize: 12.5, fontWeight: 700, color: '#dc2626' }}>⛔ 알림 차단됨</div>
                        <div style={{ fontSize: 11, color: '#6b7280', marginTop: 3 }}>브라우저 설정에서 알림을 허용해주세요</div>
                      </div>
                    ) : pushPermission === 'unsupported' ? (
                      <div style={{ fontSize: 12, color: '#9ca3af' }}>이 브라우저는 알림을 지원하지 않습니다</div>
                    ) : (
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
                        <div>
                          <div style={{ fontSize: 12.5, fontWeight: 700, color: '#92400e' }}>📱 폰 알림 허용 필요</div>
                          <div style={{ fontSize: 11, color: '#6b7280', marginTop: 2 }}>허용 시 SOS 발생 즉시 알림창에 표시됩니다</div>
                        </div>
                        <button
                          type="button"
                          onClick={handleRequestPush}
                          style={{
                            background: '#e91e63', color: '#fff', border: 'none',
                            padding: '7px 14px', borderRadius: 8, fontSize: 12, fontWeight: 700,
                            cursor: 'pointer',
                          }}
                        >
                          알림 허용하기
                        </button>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          )}

          <button type="submit" className={styles.submitBtn}>가입 완료 및 자동 로그인</button>
        </form>

        <div className={styles.links}>
          <span>이미 계정이 있으신가요?</span>
          <Link href="/login" className={styles.link}>로그인하기</Link>
        </div>
      </div>
    </div>
  );
}
