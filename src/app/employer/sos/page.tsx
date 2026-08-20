'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { notifySosSubscribers } from '../../../lib/sos-notify';

export default function SOSPostPage() {
  const [submitted, setSubmitted] = useState(false);
  const [agreeCancel, setAgreeCancel] = useState(false);
  const [timeSlot, setTimeSlot] = useState('evening');
  const [targetDate, setTargetDate] = useState(new Date().toISOString().split('T')[0]);
  
  const regionRef = useRef<HTMLInputElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const payRef = useRef<HTMLInputElement>(null);

  const SLOTS = [
    { key: 'morning', label: '오전 타임 (06:00 ~ 12:00)', price: 11000 },
    { key: 'afternoon', label: '오후 타임 (12:00 ~ 18:00)', price: 15000 },
    { key: 'evening', label: '저녁 골든타임 (18:00 ~ 24:00)', price: 22000 },
    { key: 'night', label: '심야 피크타임 (00:00 ~ 06:00)', price: 33000 }
  ];

  const selectedSlot = SLOTS.find(s => s.key === timeSlot) || SLOTS[2];
  const totalPrice = selectedSlot.price;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreeCancel) {
      alert('조건 불일치 시 캔슬 동의에 체크해 주세요.');
      return;
    }
    const region = regionRef.current?.value || '';
    const title = titleRef.current?.value || '';
    const pay = payRef.current?.value || '';

    const confirmPayment = window.confirm(`선택 시간대: ${selectedSlot.label}\n지정 일자: ${targetDate}\n결제 금액: ${totalPrice.toLocaleString()}원 (VAT 포함)\n\n결제를 진행하시겠습니까?`);
    if (confirmPayment) {
      const existing = JSON.parse(localStorage.getItem('abam_sos_posts') ?? '[]');
      const newPost = {
        id: `sos_${Date.now()}`,
        region, 
        title: `[${selectedSlot.label}] ${title}`, 
        pay,
        timeSlot: selectedSlot.label,
        targetDate,
        createdAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 4 * 3600000).toISOString(),
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
        <p>선택하신 일자 및 시간대에 메인 화면 상단 SOS 긴급콜에 즉시 활성화됩니다.</p>
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
          (원하시는 **지정 일자**와 **특정 시간대**를 선택하여 유료 긴급 노출을 신청할 수 있습니다.)
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* 1. Time / Location */}
          <div style={{ display: 'flex', gap: '12px' }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>지역 (예: 강남역)</label>
              <input ref={regionRef} required type="text" placeholder="지역 입력" style={{ width: '100%', padding: '12px', border: '1px solid #cbd5e1', borderRadius: '8px', outline: 'none' }} />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>지정 광고 일자</label>
              <input 
                required 
                type="date" 
                value={targetDate} 
                onChange={(e) => setTargetDate(e.target.value)}
                style={{ width: '100%', padding: '12px', border: '1px solid #cbd5e1', borderRadius: '8px', outline: 'none', fontWeight: 700 }} 
              />
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

          {/* 3. Designated Time Slot selector */}
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '8px' }}>광고 희망 시간대 선택 (개별 결제)</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {SLOTS.map((slot) => {
                const isSelected = timeSlot === slot.key;
                return (
                  <div 
                    key={slot.key}
                    onClick={() => setTimeSlot(slot.key)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '12px 16px',
                      borderRadius: '10px',
                      border: isSelected ? '2px solid #ef4444' : '1.5px solid #cbd5e1',
                      background: isSelected ? '#fef2f2' : '#ffffff',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <input 
                        type="radio" 
                        name="timeSlot"
                        checked={isSelected}
                        onChange={() => setTimeSlot(slot.key)}
                        style={{ accentColor: '#ef4444', width: '16px', height: '16px' }}
                      />
                      <span style={{ fontSize: '14px', fontWeight: isSelected ? 800 : 600, color: isSelected ? '#ef4444' : '#334155' }}>
                        {slot.label}
                      </span>
                    </div>
                    <strong style={{ fontSize: '14px', color: isSelected ? '#ef4444' : '#475569' }}>
                      {slot.price.toLocaleString()}원
                    </strong>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 4. Strict Conditions */}
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px', color: '#ef4444' }}>★ 필수 조건 (엄격하게 기재해 주세요)</label>
            <textarea 
              required 
              placeholder="예: 20대 초중반, 키 160 이상, 사이즈 44~55 필수. 조건 안 맞으면 캔슬될 수 있습니다." 
              style={{ width: '100%', padding: '12px', border: '1px solid #ef4444', borderRadius: '8px', outline: 'none', minHeight: '80px', resize: 'vertical' }} 
            />
            <p style={{ fontSize: '12px', color: '#94a3b8', marginTop: '6px' }}>* 명확한 조건을 기재해야 구직자의 헛걸음을 방지하고 분쟁을 막을 수 있습니다.</p>
          </div>

          {/* 5. Disclaimer Checkbox */}
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

          {/* 6. Payment Display UI */}
          <div style={{ marginTop: '10px', padding: '20px', border: '2px solid #e2e8f0', borderRadius: '12px', textAlign: 'center', background: '#f8fafc' }}>
            <div style={{ fontSize: '13px', color: '#64748b', marginBottom: '4px' }}>SOS 지정 시간대 등록 결제 총 금액</div>
            <div style={{ fontSize: '28px', fontWeight: 800, color: '#ef4444' }}>{totalPrice.toLocaleString()}원</div>
            <div style={{ fontSize: '12px', color: '#64748b', marginTop: '8px', fontWeight: 600 }}>* 프리미엄 배너 회원: 월 3회 무료 노출 쿠폰 제공</div>
          </div>

          <button type="submit" style={{ marginTop: '10px', background: '#ef4444', color: '#fff', border: 'none', padding: '16px', borderRadius: '12px', fontSize: '16px', fontWeight: 800, cursor: 'pointer', transition: 'transform 0.1s' }} onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.98)'} onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}>
            결제하고 지정 시간대에 광고 등록하기 ⚡
          </button>
        </form>
      </div>
    </div>
  );
}
