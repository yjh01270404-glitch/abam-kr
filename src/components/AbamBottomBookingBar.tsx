'use client';

import React, { useEffect, useState } from 'react';
import AbamBookingGuideModal from './AbamBookingGuideModal';

interface Props {
  smsMessage?: string;
  regionHint?: string;
  phone?: string;
  smsLabel?: string;
  callLabel?: string;
}

export function openDirectAbamSms(initialCourse?: string) {
  if (typeof window === 'undefined') return;
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent || '');
  const sep = isIOS ? '&body=' : '?body=';
  const courseStr = initialCourse || 'A코스 90분 (10만)';
  const text = `[아밤 빠른예약]\n• 코스: ${courseStr}\n• 주소: [동/호수/호텔명 입력]\n• 공비: [공동현관 비번 or 1층호출]\n• 결제: [계좌이체 / 현금 / 카드]\n(작성 후 전송 시 추가 질문 없이 30분 내 즉시 출발)`;
  window.location.href = `sms:01066072239${sep}${encodeURIComponent(text)}`;
}

export default function AbamBottomBookingBar({
  regionHint,
  phone = '01066072239',
  smsLabel = '문자 간편예약',
  callLabel = '전화 즉시예약',
}: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<string | undefined>(undefined);
  const [toast, setToast] = useState<string | null>(null);
  const [isOpenNow, setIsOpenNow] = useState<boolean>(true);
  const [isLateNight, setIsLateNight] = useState<boolean>(false);

  const cleanPhone = phone.replace(/[^0-9]/g, '') || '01066072239';

  useEffect(() => {
    const checkKst = () => {
      const now = new Date();
      const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
      const kst = new Date(utc + (9 * 3600000));
      const h = kst.getHours();
      setIsOpenNow(h >= 18 || h < 5);
      setIsLateNight(h >= 3 && h < 5);
    };
    checkKst();
    const timer = setInterval(checkKst, 60000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleToast = (ev: Event) => {
      const msg = (ev as CustomEvent).detail || '문자창으로 이동합니다';
      setToast(msg);
      setTimeout(() => setToast(null), 3200);
    };

    const handleOpenModalEvent = (ev: Event) => {
      const detail = (ev as CustomEvent).detail;
      if (detail?.course) {
        setSelectedCourse(detail.course);
      } else {
        setSelectedCourse(undefined);
      }
      setIsModalOpen(true);
    };

    const handleDocClick = (ev: MouseEvent) => {
      const target = (ev.target as HTMLElement)?.closest?.('[data-abam-course], [data-abam-open-modal]') as HTMLElement | null;
      if (!target) return;
      ev.preventDefault();
      const courseAttr = target.getAttribute('data-abam-course');
      setSelectedCourse(courseAttr || undefined);
      setIsModalOpen(true);
    };

    window.addEventListener('abam-sms-toast', handleToast);
    window.addEventListener('abam-open-booking-modal', handleOpenModalEvent);
    document.addEventListener('click', handleDocClick);
    return () => {
      window.removeEventListener('abam-sms-toast', handleToast);
      window.removeEventListener('abam-open-booking-modal', handleOpenModalEvent);
      document.removeEventListener('click', handleDocClick);
    };
  }, []);

  return (
    <>
      {toast && (
        <div
          style={{
            position: 'fixed',
            bottom: '76px',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: '#1e293b',
            color: '#ffffff',
            border: '1px solid #475569',
            padding: '9px 16px',
            borderRadius: '8px',
            fontSize: '12.5px',
            fontWeight: 700,
            zIndex: 100001,
            whiteSpace: 'nowrap',
            boxShadow: '0 4px 16px rgba(0,0,0,0.6)',
          }}
        >
          {toast}
        </div>
      )}

      <aside
        aria-label="하단 예약 바"
        className="abam-fixed-bottom-bar"
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          width: '100%',
          backgroundColor: '#0a0e1a',
          borderTop: '1px solid #1e293b',
          padding: '8px 14px calc(8px + env(safe-area-inset-bottom, 0px))',
          zIndex: 99999,
        }}
      >
        {/* 상하 분리형 실시간 영업/배차 상태 안내 (모바일 2줄 깔끔 배치) */}
        <div
          style={{
            maxWidth: '680px',
            margin: '0 auto 6px',
            display: 'flex',
            flexDirection: 'column',
            gap: '2px',
            padding: '0 2px',
            fontSize: '12px',
            fontWeight: 800,
          }}
        >
          {/* 상단 1행: 실시간 배차/접수 상태 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', minHeight: '18px' }}>
            {isLateNight ? (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#34d399', fontWeight: 900, fontSize: '12px', whiteSpace: 'nowrap' }}>
                <span
                  style={{
                    display: 'inline-block',
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: '#10b981',
                    boxShadow: '0 0 10px #10b981',
                    flexShrink: 0,
                  }}
                />
                ⚡ [심야 긴급배차] 새벽 04:00까지 예약 접수
              </span>
            ) : isOpenNow ? (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#34d399', fontWeight: 900, fontSize: '12px', whiteSpace: 'nowrap' }}>
                <span
                  style={{
                    display: 'inline-block',
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: '#10b981',
                    boxShadow: '0 0 10px #10b981',
                    flexShrink: 0,
                  }}
                />
                🟢 [실시간 즉시 이용 가능] 배차 대기중
              </span>
            ) : (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#fbbf24', fontWeight: 900, fontSize: '12px', whiteSpace: 'nowrap' }}>
                <span
                  style={{
                    display: 'inline-block',
                    width: '7px',
                    height: '7px',
                    borderRadius: '50%',
                    backgroundColor: '#f59e0b',
                    boxShadow: '0 0 8px #f59e0b',
                    flexShrink: 0,
                  }}
                />
                🌙 사전 예약 접수중 (오늘 저녁 18:00 오픈 · 19:00 순차출발)
              </span>
            )}
          </div>

          {/* 하단 2행: 영업 시간 / 도착 보장 안내 */}
          <div style={{ display: 'flex', alignItems: 'center', paddingLeft: '13px', minHeight: '16px' }}>
            <span style={{ color: '#eec14b', fontSize: '11px', fontWeight: 700, whiteSpace: 'nowrap' }}>
              {isLateNight
                ? '🚨 지금 예약 시 20~25분 내 도착'
                : isOpenNow
                ? '⚡ 선입금 0원 · 30분 도착 보장 (04시까지 예약 가능)'
                : '영업: 매일 18:00~04:00 (19시 순차출발 · 04시까지 접수)'}
            </span>
          </div>
        </div>

        <div
          style={{
            maxWidth: '680px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '8px',
            alignItems: 'center',
          }}
        >
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              height: '48px',
              background: 'linear-gradient(135deg, #EEC14B 0%, #D4A528 100%)',
              boxShadow: '0 2px 12px rgba(238, 193, 75, 0.4)',
              color: '#0f172a',
              borderRadius: '10px',
              fontWeight: 900,
              fontSize: '15px',
              letterSpacing: '-0.3px',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            <span>💬</span>
            <span>{isLateNight ? '문자 빠른예약' : smsLabel}</span>
          </button>

          <a
            href={`tel:${cleanPhone}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              height: '48px',
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              border: '1px solid #34d399',
              color: '#ffffff',
              boxShadow: '0 2px 12px rgba(16, 185, 129, 0.4)',
              borderRadius: '10px',
              fontWeight: 900,
              fontSize: '15px',
              letterSpacing: '-0.3px',
              textDecoration: 'none',
            }}
          >
            <span>📞</span>
            <span>{isLateNight ? '지금 즉시 통화' : callLabel}</span>
          </a>
        </div>
      </aside>

      <AbamBookingGuideModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialCourse={selectedCourse}
        regionHint={regionHint}
      />
    </>
  );
}
