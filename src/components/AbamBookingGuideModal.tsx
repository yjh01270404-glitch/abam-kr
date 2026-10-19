'use client';

import React, { useEffect, useState } from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  smsMessage?: string;
  defaultAction?: 'sms' | 'tel' | null;
}

export default function AbamBookingGuideModal({
  isOpen,
  onClose,
}: Props) {
  const [addr, setAddr] = useState('');
  const [door, setDoor] = useState('');
  const [parking, setParking] = useState('주차가능');
  const [course, setCourse] = useState('타이90 10만');
  const [pay, setPay] = useState('');
  const [timeText, setTimeText] = useState('');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const now = new Date();
      const target = new Date(now.getTime() + 60 * 60 * 1000);
      const pad = (n: number) => (n < 10 ? '0' : '') + n;
      const str = `${pad(now.getHours())}:${pad(now.getMinutes())} ~ ${pad(target.getHours())}:${pad(target.getMinutes())}`;
      setTimeText(`지금부터 1시간 이내 도착 (예상: ${str})`);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // Build compact single-line dispatch slip for call room sharing
  const getSummarySlip = () => {
    const parts: string[] = [];
    const cleanAddr = addr.trim();
    const cleanDoor = door.trim();

    if (cleanAddr) parts.push(cleanAddr);
    if (cleanDoor) {
      if (!cleanDoor.startsWith('공비') && !cleanDoor.startsWith('비번') && !cleanDoor.startsWith('호텔')) {
        parts.push(`공비${cleanDoor}`);
      } else {
        parts.push(cleanDoor);
      }
    }
    if (parking) parts.push(parking);
    if (course) parts.push(course);
    if (pay === '잔돈 필요') {
      parts.push('잔돈 필요');
    } else if (pay && pay !== '잔돈X' && pay !== '잔돈불필요') {
      parts.push(pay);
    }

    return parts.join(' ').replace(/\s+/g, ' ').trim();
  };

  const finalSummary = getSummarySlip();

  const handleSendSms = () => {
    if (!addr.trim()) {
      alert('방문 주소(동/호수 포함)를 입력해 주세요.');
      return;
    }
    onClose();
    const phone = '01066072239';
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    const sep = isIOS ? '&body=' : '?body=';
    const url = `sms:${phone}${sep}${encodeURIComponent(finalSummary)}`;
    window.location.href = url;
  };

  const handleFastDoor = (val: string) => {
    setDoor(val);
  };

  const handleFastPay = (val: string) => {
    setPay(val);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="notranslate"
      translate="no"
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100000,
        backgroundColor: 'rgba(0, 0, 0, 0.82)',
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '12px',
        boxSizing: 'border-box',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '500px',
          maxHeight: '92vh',
          backgroundColor: '#0f172a',
          border: '1.5px solid #f59e0b',
          borderRadius: '16px',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.9)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Pretendard", "Noto Sans KR", sans-serif',
          color: '#ffffff',
        }}
      >
        {/* 헤더 */}
        <div
          style={{
            padding: '16px 20px',
            borderBottom: '1.5px solid rgba(245, 158, 11, 0.3)',
            background: '#161e31',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div
              style={{
                fontSize: '11.5px',
                fontWeight: 800,
                color: '#f59e0b',
                marginBottom: '4px',
                letterSpacing: '1px',
                textTransform: 'uppercase',
              }}
            >
              ABAM QUICK CONCIERGE
            </div>
            <h2
              id="modal-title"
              style={{
                fontSize: '19px',
                fontWeight: 800,
                color: '#ffffff',
                margin: 0,
                lineHeight: 1.2,
              }}
            >
              프라이빗 간편 예약 접수
            </h2>
            <div
              style={{
                fontSize: '12.5px',
                color: '#94a3b8',
                marginTop: '4px',
              }}
            >
              가정집·오피스텔·호텔 방문 배차 (100% 현장 대면결제)
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="닫기"
            style={{
              background: 'transparent',
              border: 'none',
              color: '#94a3b8',
              fontSize: '24px',
              cursor: 'pointer',
              padding: '0 4px',
              lineHeight: 1,
            }}
          >
            &times;
          </button>
        </div>

        {/* 본문 폼 입력 */}
        <div
          style={{
            padding: '18px 20px',
            overflowY: 'auto',
            WebkitOverflowScrolling: 'touch',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
          }}
        >
          {/* 1. 방문 주소 */}
          <div>
            <label style={{ display: 'block', fontSize: '13.5px', fontWeight: 700, color: '#f1f5f9', marginBottom: '6px' }}>
              방문 주소 (동/호수 포함) <span style={{ color: '#f59e0b' }}>*</span>
            </label>
            <input
              type="text"
              value={addr}
              onChange={(e) => setAddr(e.target.value)}
              placeholder="예: 역삼동 649-4 역삼푸르지오 102동 1204호"
              style={{
                width: '100%',
                boxSizing: 'border-box',
                padding: '12px 14px',
                backgroundColor: '#1e293b',
                border: '1.5px solid #334155',
                borderRadius: '10px',
                color: '#ffffff',
                fontSize: '14.5px',
                outline: 'none',
              }}
            />
          </div>

          {/* 2. 1층 공동현관 비번 */}
          <div>
            <label style={{ display: 'block', fontSize: '13.5px', fontWeight: 700, color: '#f1f5f9', marginBottom: '6px' }}>
              공동현관 출입 안내 (가정집/오피스텔) <span style={{ color: '#f59e0b' }}>*</span>
            </label>
            <input
              type="text"
              value={door}
              onChange={(e) => setDoor(e.target.value)}
              placeholder="예: #1234* 또는 종1234열 (없으면 비번없음)"
              style={{
                width: '100%',
                boxSizing: 'border-box',
                padding: '12px 14px',
                backgroundColor: '#1e293b',
                border: '1.5px solid #334155',
                borderRadius: '10px',
                color: '#ffffff',
                fontSize: '14.5px',
                outline: 'none',
              }}
            />
            {/* 빠른 선택 칩 */}
            <div style={{ display: 'flex', gap: '6px', marginTop: '6px', flexWrap: 'wrap' }}>
              {['비번없음', '경비호출', '자유출입', '도착시연락', '호텔로비방문'].map((chip) => (
                <button
                  key={chip}
                  type="button"
                  onClick={() => handleFastDoor(chip)}
                  style={{
                    backgroundColor: '#1e293b',
                    border: '1px solid #475569',
                    color: '#cbd5e1',
                    fontSize: '11.5px',
                    fontWeight: 700,
                    padding: '4px 8px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                  }}
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>

          {/* 3. 주차장 진입 여부 */}
          <div>
            <label style={{ display: 'block', fontSize: '13.5px', fontWeight: 700, color: '#f1f5f9', marginBottom: '6px' }}>
              주차 가능 여부 <span style={{ color: '#f59e0b' }}>*</span>
            </label>
            <select
              value={parking}
              onChange={(e) => setParking(e.target.value)}
              style={{
                width: '100%',
                boxSizing: 'border-box',
                padding: '12px 14px',
                backgroundColor: '#1e293b',
                border: '1.5px solid #334155',
                borderRadius: '10px',
                color: '#ffffff',
                fontSize: '14.5px',
                outline: 'none',
                cursor: 'pointer',
              }}
            >
              <option value="주차가능">지상/지하 주차가능 (방문객 주차)</option>
              <option value="지하주차">지하주차장 완비 (진입수월)</option>
              <option value="주차불가">주차불가 (인근 유료주차/골목)</option>
              <option value="도착전안내">도착 5분 전 주차위치 안내</option>
            </select>
          </div>

          {/* 4. 코스 선택 (타이/아로마/스페셜 x 60/90/120분) */}
          <div>
            <label style={{ display: 'block', fontSize: '13.5px', fontWeight: 700, color: '#f1f5f9', marginBottom: '6px' }}>
              코스 및 시간 선택 <span style={{ color: '#f59e0b' }}>*</span>
            </label>
            <select
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              style={{
                width: '100%',
                boxSizing: 'border-box',
                padding: '12px 14px',
                backgroundColor: '#1e293b',
                border: '1.5px solid #f59e0b',
                borderRadius: '10px',
                color: '#ffffff',
                fontSize: '14.5px',
                fontWeight: 700,
                outline: 'none',
                cursor: 'pointer',
              }}
            >
              <optgroup label="── 1. 타이 코스 (건식 지압) ──">
                <option value="타이1 8만">타이 60분 (8만) — 80,000원</option>
                <option value="타이90 10만">타이 90분 (10만) — 100,000원 (추천)</option>
                <option value="타이2 12만">타이 120분 (12만) — 120,000원</option>
              </optgroup>
              <optgroup label="── 2. 아로마 코스 (천연 오일) ──">
                <option value="아로마1 9만">아로마 60분 (9만) — 90,000원</option>
                <option value="아로마90 11만">아로마 90분 (11만) — 110,000원 (인기)</option>
                <option value="아로마2 14만">아로마 120분 (14만) — 140,000원</option>
              </optgroup>
              <optgroup label="── 3. 스페셜 코스 [타이+아로마] ──">
                <option value="스페셜1 10만">스페셜 60분 (10만) — 100,000원</option>
                <option value="스페셜90 12만">스페셜 90분 (12만) — 120,000원 (인기)</option>
                <option value="스페셜2 16만">스페셜 120분 (16만) — 160,000원 (풀코스)</option>
              </optgroup>
            </select>
          </div>

          {/* 5. 결제 방식 및 현금 잔돈 여부 */}
          <div>
            <label style={{ display: 'block', fontSize: '13.5px', fontWeight: 700, color: '#f1f5f9', marginBottom: '6px' }}>
              결제 방식 <span style={{ color: '#f59e0b' }}>*</span>
            </label>
            <select
              value={pay}
              onChange={(e) => setPay(e.target.value)}
              style={{
                width: '100%',
                boxSizing: 'border-box',
                padding: '12px 14px',
                backgroundColor: '#1e293b',
                border: '1.5px solid #334155',
                borderRadius: '10px',
                color: '#ffffff',
                fontSize: '14.5px',
                outline: 'none',
                cursor: 'pointer',
              }}
            >
              <option value="">현금 결제 — 잔돈 불필요 (금액 딱 맞춤)</option>
              <option value="잔돈 필요">현금 결제 — 잔돈 필요 (거스름돈 준비 요청)</option>
              <option value="계좌이체">현장 계좌이체</option>
              <option value="카드결제">현장 카드결제</option>
            </select>
            {/* 빠른 선택 칩 */}
            <div style={{ display: 'flex', gap: '6px', marginTop: '6px', flexWrap: 'wrap' }}>
              {[
                { label: '현금 (잔돈 불필요)', val: '' },
                { label: '현금 (잔돈 필요)', val: '잔돈 필요' },
                { label: '계좌이체', val: '계좌이체' },
                { label: '카드결제', val: '카드결제' },
              ].map((item) => (
                <button
                  key={item.val}
                  type="button"
                  onClick={() => handleFastPay(item.val)}
                  style={{
                    backgroundColor: pay === item.val ? '#f59e0b' : '#1e293b',
                    border: '1px solid ' + (pay === item.val ? '#f59e0b' : '#475569'),
                    color: pay === item.val ? '#0f172a' : '#cbd5e1',
                    fontSize: '11.5px',
                    fontWeight: 700,
                    padding: '4px 8px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* 6. 도착 시간 안내 */}
          <div>
            <label style={{ display: 'block', fontSize: '13.5px', fontWeight: 700, color: '#f1f5f9', marginBottom: '6px' }}>
              도착 예정 시간
            </label>
            <div
              style={{
                width: '100%',
                boxSizing: 'border-box',
                padding: '12px 14px',
                backgroundColor: '#1e293b',
                border: '1px solid rgba(245, 158, 11, 0.4)',
                borderRadius: '10px',
                color: '#fbbf24',
                fontSize: '13.5px',
                fontWeight: 700,
              }}
            >
              <span>{timeText || '지금부터 1시간 이내 신속 도착'}</span>
            </div>
          </div>

          {/* 실시간 요약 미리보기 */}
          <div
            style={{
              backgroundColor: '#161e31',
              border: '1px solid rgba(245, 158, 11, 0.35)',
              borderRadius: '12px',
              padding: '14px 16px',
            }}
          >
            <div style={{ fontSize: '11.5px', fontWeight: 700, color: '#fbbf24', letterSpacing: '0.8px', marginBottom: '8px' }}>
              전송 내용 미리보기
            </div>
            <div
              className="notranslate"
              translate="no"
              style={{
                margin: 0,
                fontSize: '14px',
                lineHeight: 1.6,
                color: '#f8fafc',
                fontWeight: 600,
                wordBreak: 'break-word',
                backgroundColor: 'rgba(0, 0, 0, 0.35)',
                padding: '12px 14px',
                borderRadius: '8px',
                border: '1px solid rgba(255, 255, 255, 0.08)',
              }}
            >
              {finalSummary || '주소를 입력해 주세요.'}
            </div>
          </div>

          <div
            style={{
              backgroundColor: 'rgba(245, 158, 11, 0.08)',
              borderLeft: '3px solid #f59e0b',
              padding: '11px 13px',
              fontSize: '12.5px',
              lineHeight: 1.5,
              color: '#cbd5e1',
            }}
          >
            [현장 대면결제 안내] 예약금이나 선입금은 일체 요구하지 않습니다. 매니저 도착 후 현장에서 결제해 주시면 됩니다.
          </div>
        </div>

        {/* 하단 버튼 */}
        <div
          style={{
            padding: '14px 18px',
            borderTop: '1px solid #222634',
            background: '#161e31',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}
        >
          <button
            type="button"
            onClick={handleSendSms}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              background: 'linear-gradient(135deg, #0284c7, #2563eb)',
              color: '#ffffff',
              padding: '14px',
              borderRadius: '12px',
              fontWeight: 800,
              fontSize: '15.5px',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(37, 99, 235, 0.35)',
            }}
          >
            문자로 간편 예약 전송
          </button>
          <a
            href="tel:010-6607-2239"
            onClick={onClose}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              background: 'linear-gradient(135deg, #f59e0b, #d97706)',
              color: '#0f172a',
              padding: '12px',
              borderRadius: '12px',
              fontWeight: 800,
              fontSize: '14.5px',
              textDecoration: 'none',
              boxSizing: 'border-box',
            }}
          >
            전화 상담 연결 (010-6607-2239)
          </a>
          <button
            type="button"
            onClick={onClose}
            style={{
              width: '100%',
              padding: '9px',
              borderRadius: '10px',
              fontSize: '13px',
              cursor: 'pointer',
              background: 'transparent',
              color: '#94a3b8',
              border: '1px solid rgba(255, 255, 255, 0.15)',
            }}
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}
