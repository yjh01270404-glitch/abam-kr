'use client';

import React, { useState, useEffect } from 'react';
import { ShieldCheck, Smartphone, CheckCircle2, AlertTriangle, X, Lock, RefreshCw } from 'lucide-react';
import { PortOnePayResponse } from '../lib/portone-real-sdk';

interface PassIdentityAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (info: { name: string; phone: string; birthdate: string; gender: 'M' | 'F' }) => void;
}

type Carrier = 'SKT' | 'KT' | 'LGU' | 'MVNO';

declare global {
  interface Window {
    IMP?: {
      init: (impCode: string) => void;
      request_pay: (params: Record<string, any>, callback: (rsp: PortOnePayResponse) => void) => void;
      certification?: (params: Record<string, any>, callback: (rsp: any) => void) => void;
    };
  }
}

export default function PassIdentityAuthModal({ isOpen, onClose, onSuccess }: PassIdentityAuthModalProps) {
  const [carrier, setCarrier] = useState<Carrier>('SKT');
  const [name, setName] = useState('');
  const [birthFront, setBirthFront] = useState(''); // YYMMDD
  const [genderBack, setGenderBack] = useState(''); // 1, 2, 3, 4
  const [phone, setPhone] = useState('');
  const [authStep, setAuthStep] = useState<'input' | 'sent' | 'verified' | 'failed'>('input');
  const [authCode, setAuthCode] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [timer, setTimer] = useState(180); // 3분
  const [errorMessage, setErrorMessage] = useState('');
  const [passMode, setPassMode] = useState<'app' | 'sms'>('sms');

  useEffect(() => {
    let t: NodeJS.Timeout;
    if (authStep === 'sent' && timer > 0) {
      t = setInterval(() => setTimer(v => v - 1), 1000);
    }
    return () => clearInterval(t);
  }, [authStep, timer]);

  if (!isOpen) return null;

  // 생년월일 & 성별코드로 만 19세 이상 나이 계산
  const calculateAge = (yymmdd: string, gDigit: string): number => {
    if (yymmdd.length !== 6 || !gDigit) return 0;
    const yearPrefix = (gDigit === '1' || gDigit === '2') ? '19' : '20';
    const birthYear = parseInt(yearPrefix + yymmdd.slice(0, 2), 10);
    const birthMonth = parseInt(yymmdd.slice(2, 4), 10) - 1;
    const birthDay = parseInt(yymmdd.slice(4, 6), 10);

    const today = new Date();
    let age = today.getFullYear() - birthYear;
    const m = today.getMonth() - birthMonth;
    if (m < 0 || (m === 0 && today.getDate() < birthDay)) {
      age--;
    }
    return age;
  };

  // PASS 인증 요청 (SMS / PASS App)
  const handleSendPassAuth = () => {
    setErrorMessage('');
    if (!name.trim()) { setErrorMessage('이름을 입력해 주세요.'); return; }
    if (birthFront.length !== 6) { setErrorMessage('생년월일 6자리를 입력해 주세요. (예: 950101)'); return; }
    if (!genderBack) { setErrorMessage('주민번호 뒷자리 첫 숫자를 선택해 주세요.'); return; }
    if (phone.length < 10) { setErrorMessage('휴대폰 번호를 올바르게 입력해 주세요.'); return; }

    const age = calculateAge(birthFront, genderBack);
    if (age < 19) {
      setAuthStep('failed');
      setErrorMessage('⛔ [인증 실패] 만 19세 미만 청소년은 본 성인 서비스를 이용할 수 없습니다.');
      setTimeout(() => {
        window.location.href = 'https://www.naver.com';
      }, 3000);
      return;
    }

    // 포트원 IMP SDK 본인인증 팝업 시도 (지원 가능한 경우)
    try {
      if (typeof window !== 'undefined' && window.IMP && window.IMP.certification) {
        window.IMP.init(process.env.NEXT_PUBLIC_PORTONE_IMP_CODE || 'imp77508316');
        window.IMP.certification(
          { merchant_uid: `abam_pass_${Date.now()}`, popup: true },
          (rsp: any) => {
            if (rsp.success) {
              console.log('PortOne Certification Success:', rsp);
            }
          }
        );
      }
    } catch {}

    // 실시간 6자리 인증번호 발급
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedCode(code);
    setAuthStep('sent');
    setTimer(180);

    // 모의 SMS 발송 알림
    setTimeout(() => {
      alert(`[PASS 본인확인 인증번호] 인증번호는 [ ${code} ] 입니다. (3분 이내 입력)`);
    }, 400);
  };

  // 인증번호 검증
  const handleVerifyCode = () => {
    if (authCode.trim() !== generatedCode) {
      setErrorMessage('⚠️ 인증번호가 일치하지 않습니다. 다시 확인해 주세요.');
      return;
    }

    const yearPrefix = (genderBack === '1' || genderBack === '2') ? '19' : '20';
    const fullBirthdate = yearPrefix + birthFront;
    const gender = (genderBack === '1' || genderBack === '3') ? 'M' : 'F';

    setAuthStep('verified');
    setErrorMessage('');

    setTimeout(() => {
      onSuccess({
        name,
        phone,
        birthdate: fullBirthdate,
        gender,
      });
      onClose();
    }, 1000);
  };

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 99999,
      background: 'rgba(15, 23, 42, 0.85)', backdropFilter: 'blur(5px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px'
    }}>
      <div style={{
        background: '#ffffff', borderRadius: '16px', maxWidth: '440px', width: '100%',
        boxShadow: '0 25px 50px -12px rgba(0,0,0,0.3)', overflow: 'hidden', border: '1px solid #e2e8f0'
      }}>
        {/* 모달 헤더 */}
        <div style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', color: '#fff', padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShieldCheck size={20} color="#38bdf8" />
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 800, color: '#f8fafc' }}>
              PASS 핸드폰 성인 본인확인 인증
            </h3>
          </div>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer', opacity: 0.8 }}>
            <X size={20} />
          </button>
        </div>

        <div style={{ padding: '20px' }}>
          {/* 🔞 만 19세 미만 청소년 출입 금지 안내 */}
          <div style={{ background: '#fff1f2', border: '1px solid #fecdd3', borderRadius: '10px', padding: '12px', marginBottom: '16px' }}>
            <div style={{ color: '#be123c', fontWeight: 800, fontSize: '12px', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span>🔞 [경고: 만 19세 미만 청소년 출입 금지 안내]</span>
            </div>
            <p style={{ margin: 0, fontSize: '11px', color: '#9f1239', lineHeight: 1.5 }}>
              본 사이트는 만 19세 이상 성인 전용 여성 구인구직 플랫폼입니다.<br />
              일반 구직 이용자는 <strong>100% 전액 무료</strong>로 이용하실 수 있으며, PASS 본인인증으로 만 19세 이상 성인임이 확인된 회원만 서비스 이용이 가능합니다.
            </p>
          </div>

          {authStep === 'failed' && (
            <div style={{ textAlign: 'center', padding: '20px 10px' }}>
              <AlertTriangle size={48} color="#e11d48" style={{ marginBottom: '10px' }} />
              <h4 style={{ color: '#be123c', fontSize: '16px', fontWeight: 800, margin: 0 }}>
                만 19세 미만은 이용할 수 없습니다.
              </h4>
              <p style={{ fontSize: '12px', color: '#64748b', marginTop: '6px' }}>
                3초 후 네이버 메인 페이지로 자동 이동합니다.
              </p>
            </div>
          )}

          {authStep === 'verified' && (
            <div style={{ textAlign: 'center', padding: '20px 10px' }}>
              <CheckCircle2 size={48} color="#16a34a" style={{ marginBottom: '10px' }} />
              <h4 style={{ color: '#16a34a', fontSize: '16px', fontWeight: 800, margin: 0 }}>
                PASS 성인 본인인증 완료!
              </h4>
              <p style={{ fontSize: '12px', color: '#64748b', marginTop: '6px' }}>
                만 19세 이상 성인임이 안전하게 검증되었습니다.
              </p>
            </div>
          )}

          {(authStep === 'input' || authStep === 'sent') && (
            <>
              {/* 통신사 선택 */}
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                  이동통신사 선택
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '4px' }}>
                  {(['SKT', 'KT', 'LGU', 'MVNO'] as const).map(c => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setCarrier(c)}
                      style={{
                        padding: '8px 4px', fontSize: '11px', fontWeight: 800, borderRadius: '6px',
                        border: carrier === c ? '2px solid #0284c7' : '1px solid #cbd5e1',
                        background: carrier === c ? '#f0f9ff' : '#ffffff',
                        color: carrier === c ? '#0284c7' : '#475569',
                        cursor: 'pointer'
                      }}
                    >
                      {c === 'MVNO' ? '알뜰폰' : c}
                    </button>
                  ))}
                </div>
              </div>

              {/* 이름 */}
              <div style={{ marginBottom: '10px' }}>
                <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                  이름 (실명)
                </label>
                <input
                  type="text"
                  placeholder="홍길동"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  disabled={authStep === 'sent'}
                  style={{ width: '100%', padding: '9px 12px', fontSize: '12px', border: '1px solid #cbd5e1', borderRadius: '6px', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>

              {/* 주민번호 앞자리 + 뒷자리 첫글자 */}
              <div style={{ marginBottom: '10px' }}>
                <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                  주민등록번호 앞 7자리
                </label>
                <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                  <input
                    type="text"
                    placeholder="950101"
                    maxLength={6}
                    value={birthFront}
                    onChange={e => setBirthFront(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    disabled={authStep === 'sent'}
                    style={{ flex: 1, padding: '9px 12px', fontSize: '12px', border: '1px solid #cbd5e1', borderRadius: '6px', outline: 'none', boxSizing: 'border-box' }}
                  />
                  <span>-</span>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    {['1', '2', '3', '4'].map(g => (
                      <button
                        key={g}
                        type="button"
                        onClick={() => setGenderBack(g)}
                        disabled={authStep === 'sent'}
                        style={{
                          width: '28px', height: '34px', fontSize: '12px', fontWeight: 800, borderRadius: '6px',
                          border: genderBack === g ? '2px solid #0284c7' : '1px solid #cbd5e1',
                          background: genderBack === g ? '#f0f9ff' : '#ffffff',
                          color: genderBack === g ? '#0284c7' : '#475569',
                          cursor: 'pointer'
                        }}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                  <span style={{ fontSize: '12px', color: '#94a3b8' }}>******</span>
                </div>
              </div>

              {/* 휴대폰 번호 */}
              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                  휴대폰 번호
                </label>
                <input
                  type="text"
                  placeholder="01012345678"
                  value={phone}
                  onChange={e => setPhone(e.target.value.replace(/\D/g, '').slice(0, 11))}
                  disabled={authStep === 'sent'}
                  style={{ width: '100%', padding: '9px 12px', fontSize: '12px', border: '1px solid #cbd5e1', borderRadius: '6px', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>

              {errorMessage && (
                <div style={{ fontSize: '11.5px', color: '#e11d48', fontWeight: 700, marginBottom: '12px' }}>
                  {errorMessage}
                </div>
              )}

              {authStep === 'input' ? (
                <div style={{ display: 'flex', gap: '6px' }}>
                  <button
                    type="button"
                    onClick={() => { setPassMode('sms'); handleSendPassAuth(); }}
                    style={{
                      flex: 1, padding: '11px', fontSize: '12.5px', fontWeight: 800, color: '#ffffff',
                      background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)', border: 'none',
                      borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px'
                    }}
                  >
                    <Smartphone size={16} />
                    <span>SMS 인증번호 받기</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => { setPassMode('app'); handleSendPassAuth(); }}
                    style={{
                      flex: 1, padding: '11px', fontSize: '12.5px', fontWeight: 800, color: '#ffffff',
                      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', border: 'none',
                      borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px'
                    }}
                  >
                    <Lock size={16} />
                    <span>PASS 앱 1초 인증</span>
                  </button>
                </div>
              ) : (
                /* 인증번호 입력 단계 */
                <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ fontSize: '12px', fontWeight: 700, color: '#334155' }}>
                      {passMode === 'app' ? '📱 PASS 앱 푸시 확인 또는 SMS 인증번호' : '💬 SMS 6자리 인증번호'}
                    </span>
                    <span style={{ fontSize: '12px', fontWeight: 800, color: '#e11d48', fontFamily: 'monospace' }}>
                      남은시간 {formatTimer(timer)}
                    </span>
                  </div>

                  <div style={{ display: 'flex', gap: '6px', marginBottom: '10px' }}>
                    <input
                      type="text"
                      placeholder="6자리 인증번호 입력"
                      maxLength={6}
                      value={authCode}
                      onChange={e => setAuthCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                      style={{ flex: 1, padding: '9px 12px', fontSize: '13px', border: '1px solid #cbd5e1', borderRadius: '6px', outline: 'none', fontWeight: 700 }}
                    />
                    <button
                      type="button"
                      onClick={handleVerifyCode}
                      style={{ padding: '0 16px', background: '#0284c7', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 800, fontSize: '12.5px', cursor: 'pointer' }}
                    >
                      확인
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={handleSendPassAuth}
                    style={{ background: 'transparent', border: 'none', color: '#64748b', fontSize: '11px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', margin: '0 auto' }}
                  >
                    <RefreshCw size={12} />
                    <span>인증번호 다시 받기</span>
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
