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
• 성함: 
• 연락처: 
• 방문 주소 (호텔/모텔명 및 객실번호): 
• 희망 코스 및 시간: (60분 / 90분 / 120분)
• 방문 희망 시간: 
• 주차 / 1층 공동현관: (비밀번호 또는 호출버튼)
• 결제 방식: 현장에서 운전기사에게 대면결제 (현금 / 계좌이체 / 카드)
----------------------------------------
※ 안내 사항:
호텔/모텔은 1층 로비에서 기사와 관리사를 만나 대면결제 후, 관리사를 객실로 안내해 주시면 됩니다.`;
  const smsHref = `sms:01066072239?body=${encodeURIComponent(defaultBody)}`;
  const phoneHref = 'tel:010-6607-2239';

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
          backgroundColor: 'rgba(15, 23, 42, 0.96)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          borderTop: '1px solid rgba(255, 255, 255, 0.12)',
          padding: '10px 16px calc(10px + env(safe-area-inset-bottom, 0px))',
          zIndex: 9999,
          boxShadow: '0 -6px 24px rgba(0, 0, 0, 0.35)',
        }}
      >
        <div
          style={{
            maxWidth: '560px',
            margin: '0 auto',
            display: 'flex',
            gap: '8px',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* 문자 간편예약 버튼 */}
          <button
            type="button"
            onClick={(e) => handleOpenModal(e, 'sms')}
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              background: 'linear-gradient(135deg, #1e293b, #334155)',
              color: '#f8fafc',
              padding: '13px 8px',
              borderRadius: '12px',
              fontWeight: 800,
              fontSize: '15px',
              letterSpacing: '-0.3px',
              border: '1px solid rgba(255, 255, 255, 0.18)',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.25)',
              cursor: 'pointer',
              transition: 'transform 0.15s ease, filter 0.15s ease',
            }}
          >
            <span style={{ fontSize: '17px' }}>✉️</span>
            <span>문자 간편예약</span>
          </button>

          {/* 전화예약 버튼 */}
          <button
            type="button"
            onClick={(e) => handleOpenModal(e, 'tel')}
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              background: 'linear-gradient(135deg, #f59e0b, #d97706)',
              color: '#0f172a',
              padding: '13px 8px',
              borderRadius: '12px',
              fontWeight: 900,
              fontSize: '15.5px',
              letterSpacing: '-0.3px',
              border: 'none',
              boxShadow: '0 3px 12px rgba(245, 158, 11, 0.4)',
              cursor: 'pointer',
              transition: 'transform 0.15s ease, filter 0.15s ease',
            }}
          >
            <span style={{ fontSize: '17px' }}>📞</span>
            <span>전화예약</span>
          </button>
        </div>
      </aside>

      {/* 예약 전 필수 안내 모달 */}
      <AbamBookingGuideModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        smsMessage={defaultBody}
        defaultAction={defaultAction}
      />
    </>
  );
}
