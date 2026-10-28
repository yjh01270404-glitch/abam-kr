'use client';

import React, { useState } from 'react';
import AbamBookingGuideModal from './AbamBookingGuideModal';

interface Props {
  smsMessage?: string;
}

export default function AbamBottomBookingBar({ smsMessage }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [defaultAction, setDefaultAction] = useState<'sms' | 'tel' | null>(null);

  const defaultBody = smsMessage || `[아밤] 예약 신청 양식
• 방문 주소 (동/호수 또는 호텔명·객실번호): 
• 희망 코스 및 시간: (타이 / 아로마 / 스페셜 · 60분 / 90분 / 120분)
• 주차 / 1층 공동현관: (비밀번호 또는 호출버튼)
• 결제 방식: 현장에서 대면결제 (현금 / 계좌이체 / 카드 · 잔돈 필요 시 기재)`;

  const handleOpenModal = (e: React.MouseEvent, action: 'sms' | 'tel') => {
    e.preventDefault();
    setDefaultAction(action);
    setIsModalOpen(true);
  };

  return (
    <>
      <aside
        aria-label="아밤 실시간 예약 및 상담"
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: 'rgba(10, 14, 28, 0.97)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          borderTop: '1px solid rgba(212, 175, 55, 0.28)',
          padding: '10px 16px calc(10px + env(safe-area-inset-bottom, 0px))',
          zIndex: 9999,
          boxShadow: '0 -6px 24px rgba(0, 0, 0, 0.45)',
        }}
      >
        <div
          style={{
            maxWidth: '860px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: '1.2fr 1fr',
            gap: '10px',
            alignItems: 'center',
          }}
        >
          {/* 문자 간편예약 버튼 */}
          <button
            type="button"
            onClick={(e) => handleOpenModal(e, 'sms')}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              background: 'linear-gradient(135deg, #d4af37 0%, #b89628 100%)',
              color: '#060a17',
              padding: '14px 8px',
              borderRadius: '8px',
              fontWeight: 900,
              fontSize: '16px',
              letterSpacing: '-0.3px',
              border: 'none',
              boxShadow: '0 4px 18px rgba(212, 175, 55, 0.3)',
              cursor: 'pointer',
            }}
          >
            <span>✉️</span>
            <span>문자 간편예약</span>
          </button>

          {/* 전화 바로연결 버튼 (모달 가로채기 없이 즉시 다이얼 연결) */}
          <a
            href="tel:01066072239"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              background: '#dc2626',
              color: '#ffffff',
              padding: '14px 8px',
              borderRadius: '8px',
              fontWeight: 900,
              fontSize: '16px',
              letterSpacing: '-0.3px',
              textDecoration: 'none',
              boxShadow: '0 4px 18px rgba(220, 38, 38, 0.35)',
            }}
          >
            <span>📞</span>
            <span>전화 바로연결</span>
          </a>
        </div>
      </aside>

      {/* 간편 예약 모달 */}
      <AbamBookingGuideModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        smsMessage={defaultBody}
        defaultAction={defaultAction}
      />
    </>
  );
}
