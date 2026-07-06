'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { notifySosSubscribers } from '../../../lib/sos-notify';

export default function SOSPostPage() {
  const [submitted, setSubmitted] = useState(false);
  const [agreeCancel, setAgreeCancel] = useState(false);
  const [hours, setHours] = useState(1);
  const regionRef = useRef<HTMLInputElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const payRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreeCancel) {
      alert('조건 불일치 시 캔슬 동의에 체크해 주세요.');
      return;
    }
    const region = regionRef.current?.value || '';
    const title = titleRef.current?.value || '';
    const pay = payRef.current?.value || '';

    const totalPrice = hours * 11000;
    const confirmPayment = window.confirm(`결제 금액: ${totalPrice.toLocaleString()}원 (VAT 포함)\n\n결제를 진행하시겠습니까?`);
    if (confirmPayment) {
      // SOS 피드 등록
      const existing = JSON.parse(localStorage.getItem('abam_sos_posts') ?? '[]');
      const newPost = {
        id: `sos_${Date.now()}`,
        region, title, pay,
        hours,
        createdAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + hours * 3600000).toISOString(),
      };
      localStorage.setItem('abam_sos_posts', JSON.stringify([newPost, ...existing]));

      // ⚡ 구독 구직자에게 Push 알림 발송
      const notifiedCount = await notifySosSubscribers({ region, title, pay });

      setSubmitted(true);
      setTimeout(() => {
        window.location.href = '/';
      }, 2500);

      if (notifiedCount > 0) {
        console.log(`[SOS] ${notifiedCount}명에게 알림 발송 완료`);
      }
    }
  };

  if (submitted) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc', flexDirection: 'column' }}>
        <h2 style={{ color: '#ef4444', fontSize: '24px', marginBottom: '16px' }}>⚡ 긴급 콜 결제 및 등록 완료!</h2>
        <p>메인 화면 상단 피드에 즉시 노출됩니다.</p>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', padding: '40px 20px', fontFamily: 'inherit' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', background: '#fff', padding: '30px', borderRadius: '16px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
        <Link href="/" style={{ color: '#64748b', textDecoration: 'none', display: 'inline-block', marginBottom: '20px' }}>← 메인으로 돌아가기</Link>
        
        <h1 style={{ fontSize: '22px', fontWeight: 800, marginBottom: '8px' }}>
          <span style={{ color: '#ef4444' }}>⚡ 프리미엄 당일 픽업 SOS</span> 긴급 콜 등록
        </h1>
        <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '24px', lineHeight: '1.5' }}>
          갑자기 펑크난 자리, 당일 바로 출근 가능한 스태프를 실시간으로 구해보세요!<br/>
          (무분별한 캔슬 방지를 위해 <strong style={{color:'#ef4444'}}>명확한 자격 조건</strong>을 기재해 주셔야 합니다.)
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* 1. Time / Location */}
          <div style={{ display: 'flex', gap: '12px' }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>지역 (예: 강남역)</label>
              <input ref={regionRef} required type="text" placeholder="지역 입력" style={{ width: '100%', padding: '12px', border: '1px solid #cbd5e1', borderRadius: '8px', outline: 'none' }} />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>급구 시간 (예: 23:00~03:00)</label>
              <input required type="text" placeholder="시간대 필수 입력" style={{ width: '100%', padding: '12px', border: '1px solid #cbd5e1', borderRadius: '8px', outline: 'none' }} />
            </div>
          </div>

          {/* 2. Title & Pay */}
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>공고 제목 (예: 모던바 에이스 급구)</label>
            <input ref={titleRef} required type="text" placeholder="눈에 띄는 제목 입력" style={{ width: '100%', padding: '12px', border: '1px solid #cbd5e1', borderRadius: '8px', outline: 'none' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>급여 조건 (예: 30만+@ 당일지급)</label>
            <input ref={payRef} required type="text" placeholder="급여 조건 입력" style={{ width: '100%', padding: '12px', border: '1px solid #cbd5e1', borderRadius: '8px', outline: 'none' }} />
          </div>

          {/* 3. Strict Conditions */}
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px', color: '#ef4444' }}>★ 필수 조건 (엄격하게 기재해 주세요)</label>
            <textarea 
              required 
              placeholder="예: 20대 초중반, 키 160 이상, 사이즈 44~55 필수. 조건 안 맞으면 캔슬될 수 있습니다." 
              style={{ width: '100%', padding: '12px', border: '1px solid #ef4444', borderRadius: '8px', outline: 'none', minHeight: '80px', resize: 'vertical' }} 
            />
            <p style={{ fontSize: '12px', color: '#94a3b8', marginTop: '6px' }}>* 명확한 조건을 기재해야 구직자의 헛걸음을 방지하고 분쟁을 막을 수 있습니다.</p>
          </div>

          {/* 4. Disclaimer Checkbox */}
          <div style={{ background: '#fef2f2', padding: '16px', borderRadius: '8px', border: '1px solid #fecaca' }}>
            <label style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', cursor: 'pointer' }}>
              <input 
                type="checkbox" 
                checked={agreeCancel} 
                onChange={(e) => setAgreeCancel(e.target.checked)} 
                style={{ marginTop: '2px', width: '16px', height: '16px' }}
              />
              <span style={{ fontSize: '13px', color: '#991b1b', lineHeight: '1.4', fontWeight: 600 }}>
                [필수] 작성한 조건과 확연히 다른 스태프가 도착했을 경우 면접 후 캔슬 조치될 수 있음을 구직자에게 명시하는 것에 동의합니다.
              </span>
            </label>
          </div>

          {/* 5. Time Selector & Payment UI */}
          <div style={{ marginTop: '10px', padding: '20px', border: '2px solid #e2e8f0', borderRadius: '12px', textAlign: 'center', background: '#f8fafc' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '16px' }}>
              <span style={{ fontSize: '14px', fontWeight: 600 }}>피드 노출 시간:</span>
              <select
                value={hours}
                style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', fontWeight: 700 }}
                onChange={(e) => setHours(parseInt(e.target.value))}
              >
                {[1,2,3,4,5].map(h => <option key={h} value={h}>{h}시간</option>)}
              </select>
            </div>
            <div style={{ fontSize: '13px', color: '#64748b', marginBottom: '4px' }}>SOS 콜 결제 예상 금액 (시간당 11,000원)</div>
            <div style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a' }}>{(hours * 11000).toLocaleString()}원</div>
            <div style={{ fontSize: '12px', color: '#ef4444', marginTop: '8px', fontWeight: 600 }}>* 프리미엄 배너 회원: 월 3시간 무료 제공</div>
          </div>

          <button type="submit" style={{ marginTop: '10px', background: '#ef4444', color: '#fff', border: 'none', padding: '16px', borderRadius: '12px', fontSize: '16px', fontWeight: 800, cursor: 'pointer', transition: 'transform 0.1s' }} onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.98)'} onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}>
            결제하고 즉시 피드 띄우기 ⚡
          </button>
        </form>
      </div>
    </div>
  );
}
