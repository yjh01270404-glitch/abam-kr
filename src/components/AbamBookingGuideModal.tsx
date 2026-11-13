'use client';

import React, { useEffect, useState } from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  smsMessage?: string;
  defaultAction?: 'sms' | 'tel' | null;
  initialCourse?: string;
  regionHint?: string;
}

export default function AbamBookingGuideModal({
  isOpen,
  onClose,
  initialCourse,
  regionHint,
}: Props) {
  const [addr, setAddr] = useState('');
  const [door, setDoor] = useState('');
  const [placeType, setPlaceType] = useState<'home' | 'hotel'>('home');
  const [parking, setParking] = useState('주차가능');
  const [course, setCourse] = useState('Course A 90분 (10만)');
  const [pay, setPay] = useState('');
  const [timeText, setTimeText] = useState('');
  const [sentNotice, setSentNotice] = useState(false);
  const [showFaq, setShowFaq] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isOpenNow, setIsOpenNow] = useState(true);
  const [isLateNight, setIsLateNight] = useState(false);

  useEffect(() => {
    const checkKst = () => {
      const now = new Date();
      const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
      const kstDate = new Date(utc + (9 * 3600000));
      const h = kstDate.getHours();
      setIsOpenNow(h >= 18 || h < 5);
      setIsLateNight(h >= 3 && h < 5);
    };
    checkKst();
  }, [isOpen]);

  useEffect(() => {
    if (typeof navigator !== 'undefined') {
      const ua = navigator.userAgent || '';
      setIsIOS(
        /iPad|iPhone|iPod/.test(ua) ||
          (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1),
      );
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setSentNotice(false);
      const now = new Date();
      const target = new Date(now.getTime() + 40 * 60 * 1000);
      const pad = (n: number) => (n < 10 ? '0' : '') + n;
      const str = `${pad(now.getHours())}:${pad(now.getMinutes())} ~ ${pad(target.getHours())}:${pad(target.getMinutes())}`;
      setTimeText(`영업시간 내 100% 방문 가능 · 30~40분 내 도착 (예상: ${str})`);

      if (initialCourse) {
        setCourse(initialCourse);
      }
      if (regionHint && !addr) {
        setAddr(regionHint);
      }
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, initialCourse, regionHint]);

  if (!isOpen) return null;

  // 배차실 공유용 1줄 요약 양식 생성 (필수 예약 항목 절대 누락 없음)
  const getSummarySlip = () => {
    const parts: string[] = [];
    const cleanAddr = addr.trim();
    const cleanDoor = door.trim();

    if (cleanAddr) {
      parts.push(cleanAddr);
    } else {
      parts.push('[방문주소/호텔명·호수 입력]');
    }

    if (cleanDoor) {
      if (!cleanDoor.startsWith('공비') && !cleanDoor.startsWith('비번') && !cleanDoor.startsWith('호텔')) {
        parts.push(`공비${cleanDoor}`);
      } else {
        parts.push(cleanDoor);
      }
    } else {
      parts.push('공비[1층비번/호출/호텔로비]');
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
  const phone = '01066072239';
  const sep = isIOS ? '&body=' : '?body=';
  const nativeSmsHref = `sms:${phone}${sep}${encodeURIComponent(finalSummary)}`;

  const handleSmsLinkClick = () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(finalSummary).catch(() => {});
      }
    } catch {}
    setSentNotice(true);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('abam-sms-toast', {
          detail: '예약 양식이 자동 복사되었으며 문자창으로 연결합니다 (010-6607-2239)',
        }),
      );
    }
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
        backgroundColor: 'rgba(5, 8, 16, 0.92)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '10px',
        boxSizing: 'border-box',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '460px',
          maxHeight: 'min(92dvh, 760px)',
          backgroundColor: '#0f172a',
          border: '1px solid rgba(197, 155, 39, 0.4)',
          borderRadius: '14px',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.9)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          fontFamily: '"Pretendard", "Noto Sans KR", -apple-system, BlinkMacSystemFont, sans-serif',
          color: '#ffffff',
          wordBreak: 'keep-all',
          overflowWrap: 'break-word',
        }}
      >
        {/* 헤더 */}
        <div
          style={{
            padding: '12px 16px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            background: '#161e31',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: '8px',
          }}
        >
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px', flexWrap: 'wrap' }}>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 800,
                  color: '#0f172a',
                  backgroundColor: isLateNight ? '#10b981' : isOpenNow ? '#10b981' : '#c59b27',
                  padding: '2px 7px',
                  borderRadius: '4px',
                  whiteSpace: 'nowrap',
                }}
              >
                {isLateNight ? '⚡ [심야 배차] 새벽 05:00까지 정상영업' : isOpenNow ? '🟢 실시간 영업중 (18:00~05:00)' : '🌙 사전 예약 접수중'}
              </span>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  color: '#93c5fd',
                  backgroundColor: '#1e3a8a',
                  padding: '2px 7px',
                  borderRadius: '4px',
                  whiteSpace: 'nowrap',
                }}
              >
                100% 현장 후불제
              </span>
            </div>
            <h2
              id="modal-title"
              style={{
                fontSize: '17px',
                fontWeight: 800,
                color: '#ffffff',
                margin: 0,
                lineHeight: 1.25,
                letterSpacing: '-0.3px',
              }}
            >
              문자 간편 예약 양식 (010-6607-2239)
            </h2>
            <div style={{ fontSize: '11.5px', color: '#cbd5e1', marginTop: '3px', lineHeight: 1.4 }}>
              {isLateNight ? '⚡ 새벽 5시까지 정상 접수 · 지금 예약 시 20~25분 내 신속 도착' : '접수 18:00 ~ 마감 05:00 (출발 19:00~) · 서울·경기 30~40분 내 도착'}
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="닫기"
            style={{
              background: 'rgba(255,255,255,0.08)',
              border: 'none',
              color: '#cbd5e1',
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              fontSize: '20px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            &times;
          </button>
        </div>

        {/* 개인정보 비저장 안심 안내 배너 (들여쓰기 및 줄맞춤 적용) */}
        <div
          style={{
            padding: '9px 16px',
            backgroundColor: '#0c192c',
            borderBottom: '1px solid #1e3a5f',
          }}
        >
          <div style={{ paddingLeft: '10px', borderLeft: '2.5px solid #38bdf8', fontSize: '11.5px', lineHeight: 1.45, color: '#e2e8f0' }}>
            <div style={{ fontWeight: 800, color: '#fbbf24', marginBottom: '2px' }}>
              안심 안내 (개인정보 저장 0%)
            </div>
            <div>
              입력하시는 주소·출입번호는 <strong style={{ color: '#ffffff', textDecoration: 'underline' }}>웹사이트나 서버에 절대 기록되지 않으며</strong> 휴대폰 문자창에만 자동 입력됩니다.
            </div>
          </div>
        </div>

        {/* 본문 폼 입력 (예약 필수 항목 · 번호 정렬 및 들여쓰기 통일) */}
        <div
          style={{
            padding: '12px 16px',
            overflowY: 'auto',
            WebkitOverflowScrolling: 'touch',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          }}
        >
          {/* 1. 코스 선택 */}
          <div>
            <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: '#f1f5f9', marginBottom: '4px' }}>
              1. 희망 코스 및 시간 선택
            </label>
            <select
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              style={{
                width: '100%',
                boxSizing: 'border-box',
                padding: '9px 11px',
                backgroundColor: '#1e293b',
                border: '1.5px solid #c59b27',
                borderRadius: '8px',
                color: '#ffffff',
                fontSize: '13.5px',
                fontWeight: 700,
                outline: 'none',
                cursor: 'pointer',
              }}
            >
              <optgroup label="── Course A · 로얄 건식 지압 타이 (Deep Thai) ──">
                <option value="Course A 60분 (8만)">Course A 60분 (8만) — 80,000원</option>
                <option value="Course A 90분 (10만)">Course A 90분 (10만) — 100,000원 (추천)</option>
                <option value="Course A 120분 (12만)">Course A 120분 (12만) — 120,000원</option>
              </optgroup>
              <optgroup label="── Course B · 힐링아로마 스웨디시 (Swedish) ⭐ [BEST] ──">
                <option value="Course B 60분 (9만)">Course B 60분 (9만) — 90,000원</option>
                <option value="Course B 90분 (11만)">Course B 90분 (11만) — 110,000원 (BEST)</option>
                <option value="Course B 120분 (14만)">Course B 120분 (14만) — 140,000원</option>
              </optgroup>
              <optgroup label="── Course C · 로얄 VIP 더블 케어 [Thai+Swedish] 👑 [VIP] ──">
                <option value="Course C 60분 (10만)">Course C 60분 (10만) — 100,000원</option>
                <option value="Course C 90분 (12만)">Course C 90분 (12만) — 120,000원 (인기)</option>
                <option value="Course C 120분 (16만)">Course C 120분 (16만) — 160,000원 (풀코스)</option>
              </optgroup>
            </select>
          </div>

          {/* 2. 방문 주소 또는 호텔명 */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
              <label style={{ fontSize: '12.5px', fontWeight: 700, color: '#f1f5f9' }}>
                2. 방문 주소 또는 호텔명·객실번호
              </label>
              <span style={{ color: '#94a3b8', fontSize: '11px' }}>문자창 직접 기재 가능</span>
            </div>

            {/* Place Type Switcher */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', marginBottom: '6px' }}>
              <button
                type="button"
                onClick={() => {
                  setPlaceType('home');
                  if (door === '호텔 1층 로비 픽업') setDoor('');
                }}
                style={{
                  backgroundColor: placeType === 'home' ? 'rgba(238, 193, 75, 0.15)' : '#1e293b',
                  border: '1px solid ' + (placeType === 'home' ? '#eec14b' : '#475569'),
                  color: placeType === 'home' ? '#fde047' : '#94a3b8',
                  fontSize: '12px',
                  fontWeight: 700,
                  padding: '7px 4px',
                  borderRadius: '7px',
                  cursor: 'pointer',
                }}
              >
                🏡 자택 / 일반 주거
              </button>
              <button
                type="button"
                onClick={() => {
                  setPlaceType('hotel');
                  if (!door || door === '비번없음') setDoor('호텔 1층 로비 픽업');
                }}
                style={{
                  backgroundColor: placeType === 'hotel' ? '#f59e0b' : '#1e293b',
                  border: '1px solid ' + (placeType === 'hotel' ? '#fbbf24' : '#475569'),
                  color: placeType === 'hotel' ? '#0f172a' : '#cbd5e1',
                  fontSize: '12px',
                  fontWeight: 800,
                  padding: '7px 4px',
                  borderRadius: '7px',
                  cursor: 'pointer',
                }}
              >
                🏨 호텔 / 모텔 (숙박업소)
              </button>
            </div>

            <input
              type="text"
              value={addr}
              onChange={(e) => setAddr(e.target.value)}
              placeholder={placeType === 'hotel' ? "예: 신라스테이 역삼 804호 / OO호텔 00호" : "예: 역삼동 649-4 102동 1204호"}
              style={{
                width: '100%',
                boxSizing: 'border-box',
                padding: '9px 11px',
                backgroundColor: '#1e293b',
                border: '1px solid #475569',
                borderRadius: '8px',
                color: '#ffffff',
                fontSize: '13px',
                outline: 'none',
              }}
            />

            {/* Intuitive Accommodation Alert with User Exact Specification */}
            {(placeType === 'hotel' || (/호텔|모텔|스테이|리조트|게스트|숙소|비즈니스|파크|호스텔|inn|hotel|motel/i.test(addr) && placeType !== 'home')) ? (
              <div style={{
                marginTop: '6px',
                padding: '8px 10px',
                backgroundColor: 'rgba(245, 158, 11, 0.2)',
                border: '1.5px solid #f59e0b',
                borderRadius: '7px',
                fontSize: '11.5px',
                lineHeight: 1.45,
                color: '#fef3c7',
              }}>
                <div style={{ fontWeight: 800, color: '#fbbf24', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '2px' }}>
                  <span>🏨 [숙박업소 필수 픽업 수칙]</span>
                  <span style={{ fontSize: '9.5px', backgroundColor: '#f59e0b', color: '#0f172a', padding: '1px 4px', borderRadius: '3px', fontWeight: 900 }}>필독</span>
                </div>
                <div>호텔, 모텔 포함 모든 숙박업소는 <strong style={{ color: '#fef08a' }}>1층에서 운전기사와 대면하여 관리사를 픽업</strong>해 주세요.</div>
              </div>
            ) : (
              <div style={{
                marginTop: '6px',
                padding: '7px 10px',
                backgroundColor: 'rgba(30, 41, 59, 0.65)',
                border: '1px solid rgba(148, 163, 184, 0.2)',
                borderRadius: '6px',
                fontSize: '11px',
                color: '#cbd5e1',
                lineHeight: 1.4,
              }}>
                <strong style={{ color: '#fde047' }}>🏡 자택 안내:</strong> 자택을 제외한 호텔, 모텔 포함 모든 숙박업소는 <strong>1층에서 운전기사와 대면하여 관리사를 픽업</strong>해 주세요.
              </div>
            )}
          </div>

          {/* 3. 1층 공동현관 비밀번호 / 호텔 로비 안내 */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
              <label style={{ fontSize: '12.5px', fontWeight: 700, color: '#f1f5f9' }}>
                3. 1층 공동현관 출입 / 호텔 로비 안내
              </label>
              <span style={{ color: '#94a3b8', fontSize: '11px' }}>터치 또는 직접 입력</span>
            </div>
            <input
              type="text"
              value={door}
              onChange={(e) => setDoor(e.target.value)}
              placeholder="예: #1234* / 종1234열 / 호출버튼 / 호텔 1층 로비"
              style={{
                width: '100%',
                boxSizing: 'border-box',
                padding: '9px 11px',
                backgroundColor: '#1e293b',
                border: '1px solid #475569',
                borderRadius: '8px',
                color: '#ffffff',
                fontSize: '13px',
                outline: 'none',
              }}
            />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '4px', marginTop: '5px' }}>
              {['비번없음', '호출버튼', '자유출입', '도착연락', '호텔로비'].map((chip) => (
                <button
                  key={chip}
                  type="button"
                  onClick={() => setDoor(chip)}
                  style={{
                    backgroundColor: door === chip ? '#c59b27' : '#1e293b',
                    border: '1px solid ' + (door === chip ? '#c59b27' : '#475569'),
                    color: door === chip ? '#0f172a' : '#cbd5e1',
                    fontSize: '11.5px',
                    fontWeight: 700,
                    minHeight: '34px',
                    padding: '6px 2px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    textAlign: 'center',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>

          {/* 4. 주차 가능 여부 & 5. 현장 결제 방식 (2열 배치로 스크롤 최소화) */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: '#f1f5f9', marginBottom: '4px' }}>
                4. 주차 가능 여부
              </label>
              <select
                value={parking}
                onChange={(e) => setParking(e.target.value)}
                style={{
                  width: '100%',
                  boxSizing: 'border-box',
                  padding: '9px 8px',
                  backgroundColor: '#1e293b',
                  border: '1px solid #475569',
                  borderRadius: '8px',
                  color: '#ffffff',
                  fontSize: '12.5px',
                  outline: 'none',
                  cursor: 'pointer',
                }}
              >
                <option value="주차가능">주차가능 (방문객)</option>
                <option value="지하주차">지하주차장 완비</option>
                <option value="주차불가">주차불가 (인근주차)</option>
                <option value="도착전안내">도착 전 위치 안내</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: '#f1f5f9', marginBottom: '4px' }}>
                5. 현장 결제 · 잔돈 여부
              </label>
              <select
                value={pay}
                onChange={(e) => setPay(e.target.value)}
                style={{
                  width: '100%',
                  boxSizing: 'border-box',
                  padding: '9px 8px',
                  backgroundColor: '#1e293b',
                  border: '1px solid #475569',
                  borderRadius: '8px',
                  color: '#ffffff',
                  fontSize: '12.5px',
                  outline: 'none',
                  cursor: 'pointer',
                }}
              >
                <option value="">현금 (잔돈 불필요)</option>
                <option value="잔돈 필요">현금 (잔돈 필요)</option>
                <option value="계좌이체">현장 계좌이체</option>
                <option value="카드결제">현장 카드결제</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px' }}>
            {[
              { label: '현금(딱맞춤)', val: '' },
              { label: '현금(잔돈요청)', val: '잔돈 필요' },
              { label: '계좌이체', val: '계좌이체' },
              { label: '카드결제', val: '카드결제' },
            ].map((item) => (
              <button
                key={item.val}
                type="button"
                onClick={() => setPay(item.val)}
                style={{
                  backgroundColor: pay === item.val ? '#c59b27' : '#1e293b',
                  border: '1px solid ' + (pay === item.val ? '#c59b27' : '#475569'),
                  color: pay === item.val ? '#0f172a' : '#cbd5e1',
                  fontSize: '12px',
                  fontWeight: 800,
                  minHeight: '36px',
                  padding: '7px 4px',
                  borderRadius: '7px',
                  cursor: 'pointer',
                  textAlign: 'center',
                  whiteSpace: 'nowrap',
                }}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* 실시간 문자 전송 내용 미리보기 */}
          <div
            style={{
              backgroundColor: '#161e31',
              border: '1px solid rgba(245, 158, 11, 0.35)',
              borderRadius: '8px',
              padding: '9px 11px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#fbbf24' }}>
                문자창 자동 입력 미리보기 ({timeText.split('·')[1]?.trim() || '30~40분 내 도착'})
              </span>
              <span style={{ fontSize: '10.5px', color: '#94a3b8' }}>
                웹사이트 미저장
              </span>
            </div>
            <div
              className="notranslate"
              translate="no"
              style={{
                margin: 0,
                fontSize: '12.5px',
                lineHeight: 1.45,
                color: '#f8fafc',
                fontWeight: 700,
                wordBreak: 'break-word',
                backgroundColor: 'rgba(0, 0, 0, 0.35)',
                padding: '7px 9px',
                borderRadius: '6px',
                border: '1px solid rgba(255, 255, 255, 0.08)',
              }}
            >
              {finalSummary}
            </div>
          </div>

          {/* 궁금사항 원클릭 빠른 확인 (FAQ 토글) */}
          <div
            style={{
              backgroundColor: '#0c192c',
              border: '1px solid rgba(56, 189, 248, 0.25)',
              borderRadius: '8px',
              overflow: 'hidden',
            }}
          >
            <button
              type="button"
              onClick={() => setShowFaq(!showFaq)}
              style={{
                width: '100%',
                padding: '8px 12px',
                background: 'transparent',
                border: 'none',
                color: '#93c5fd',
                fontSize: '12px',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <span>💡</span>
                <span>궁금한 점이 있으신가요? (자주 묻는 질문 3초 확인)</span>
              </span>
              <span style={{ fontSize: '11px', color: '#38bdf8' }}>{showFaq ? '닫기 ▲' : '열기 ▼'}</span>
            </button>
            {showFaq && (
              <div
                style={{
                  padding: '10px 12px',
                  borderTop: '1px solid rgba(56, 189, 248, 0.15)',
                  fontSize: '11.5px',
                  lineHeight: 1.55,
                  color: '#cbd5e1',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                }}
              >
                <div>
                  <strong style={{ color: '#fbbf24' }}>Q. 관리사 프로필 / 사진 볼 수 있나요?</strong>
                  <br />
                  A. 20대 전문 에이스 힐러로 구성되며, 인터넷 도용 및 허위 사진은 절대 사용하지 않습니다. 100% 실물 중심의 품격 있는 힐링을 보장하며, 선입금 없는 현장 후불제 시스템으로 안전하게 이용하실 수 있습니다.
                </div>
                <div>
                  <strong style={{ color: '#fbbf24' }}>Q. 선입금이나 예약금이 있나요?</strong>
                  <br />
                  A. 일절 없습니다. 100% 관리사 대면 후 현장 결제(현금, 계좌이체, 카드)로 진행됩니다.
                </div>
                <div>
                  <strong style={{ color: '#fbbf24' }}>Q. 몇 시까지 영업하며 도착 시간은?</strong>
                  <br />
                  A. 매일 18:00 접수 시작, 19:00~05:00 운영되며 접수 후 평균 25~35분 내에 신속 도착합니다.
                </div>
                <div>
                  <strong style={{ color: '#fbbf24' }}>Q. 따로 준비할 물품이 있나요?</strong>
                  <br />
                  A. 전혀 없습니다. 관리사가 전용 매트, 일회용 시트, 타월, 고급 오일 일체를 직접 지참하여 방문합니다.
                </div>
              </div>
            )}
          </div>

          {sentNotice && (
            <div
              style={{
                backgroundColor: 'rgba(34, 197, 94, 0.15)',
                border: '1px solid #22c55e',
                borderRadius: '8px',
                padding: '9px 11px',
                fontSize: '12px',
                lineHeight: 1.5,
                color: '#bbf7d0',
              }}
            >
              <strong>✓ 예약 양식이 클립보드에 자동 복사되었습니다!</strong>
              <br />
              휴대폰 문자창이 열리면 그대로 전송해 주시고, 인앱 브라우저에서 문자창이 안 열릴 경우{' '}
              <strong style={{ color: '#ffffff' }}>010-6607-2239</strong>로 붙여넣어 보내주시면 즉시 출발합니다.
            </div>
          )}
        </div>

        {/* 하단 버튼 (고정 푸터 · safe-area 대응 · 버튼 크기 통일) */}
        <div
          style={{
            flexShrink: 0,
            padding: '10px 16px calc(10px + env(safe-area-inset-bottom, 0px))',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            background: '#161e31',
            boxShadow: '0 -4px 16px rgba(0, 0, 0, 0.4)',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
          }}
        >
          <a
            href={nativeSmsHref}
            onClick={handleSmsLinkClick}
            style={{
              width: '100%',
              height: '48px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              background: 'linear-gradient(135deg, #EEC14B 0%, #D4A528 100%)',
              color: '#080C16',
              borderRadius: '10px',
              fontWeight: 900,
              fontSize: '15px',
              textDecoration: 'none',
              cursor: 'pointer',
              boxSizing: 'border-box',
              boxShadow: '0 4px 16px rgba(238, 193, 75, 0.4)',
            }}
          >
            <span>💬</span>
            문자 앱으로 예약 양식 바로 전송하기
          </a>
          <a
            href="tel:01066072239"
            style={{
              width: '100%',
              height: '46px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
              border: '1px solid #34D399',
              color: '#ffffff',
              borderRadius: '10px',
              fontWeight: 900,
              fontSize: '14.5px',
              textDecoration: 'none',
              cursor: 'pointer',
              boxSizing: 'border-box',
              boxShadow: '0 4px 16px rgba(16, 185, 129, 0.35)',
            }}
          >
            <span>📞</span>
            전화 즉시예약 (010-6607-2239)
          </a>
        </div>
      </div>
    </div>
  );
}
