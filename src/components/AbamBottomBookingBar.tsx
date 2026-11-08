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
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent('abam-open-booking-modal', {
        detail: { course: initialCourse || '' },
      }),
    );
  }
}

export default function AbamBottomBookingBar({
  regionHint,
  phone = '01066072239',
  smsLabel = '문자예약하기',
  callLabel = '전화하기',
}: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<string | undefined>(undefined);
  const [toast, setToast] = useState<string | null>(null);

  const cleanPhone = phone.replace(/[^0-9]/g, '') || '01066072239';

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
          padding: '10px 14px calc(10px + env(safe-area-inset-bottom, 0px))',
          zIndex: 99999,
        }}
      >
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
            onClick={() => {
              setSelectedCourse(undefined);
              setIsModalOpen(true);
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              height: '48px',
              backgroundColor: '#c59b27',
              boxShadow: '0 2px 10px rgba(197, 155, 39, 0.35)',
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
            <span>{smsLabel}</span>
          </button>

          <a
            href={`tel:${cleanPhone}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              height: '48px',
              backgroundColor: '#1e293b',
              border: '1px solid #475569',
              color: '#f8fafc',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.25)',
              borderRadius: '10px',
              fontWeight: 800,
              fontSize: '15px',
              letterSpacing: '-0.3px',
              textDecoration: 'none',
            }}
          >
            <span>📞</span>
            <span>{callLabel}</span>
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
