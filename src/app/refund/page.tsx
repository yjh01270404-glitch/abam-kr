import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '예약 취소 및 환불 정책 | 아밤 (Abam.kr)',
  description: '아밤(Abam.kr) 100% 현장 후불제 운영에 따른 예약 변경·취소 및 환불 기준 안내.',
  alternates: { canonical: 'https://abam.kr/refund' },
};

export default function RefundPage() {
  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', padding: '0 20px', color: '#334155', lineHeight: '1.8' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a', marginBottom: '24px', borderBottom: '2px solid #e2e8f0', paddingBottom: '12px' }}>
        예약 취소 및 환불 정책
      </h1>
      <section style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#1e293b', marginBottom: '8px' }}>1. 사전 예약금 0원 (선입금 없음)</h2>
        <p>아밤(Abam.kr)은 100% 현장 대면결제로 운영되므로, 예약 접수 단계에서 금전적 결제나 취소 위약금이 발생하지 않습니다.</p>
      </section>
      <section style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#1e293b', marginBottom: '8px' }}>2. 현장 결제 후 코스 변경 및 환불 안내</h2>
        <p>현장 대면결제 직후 관리 시작 전 고객 사정으로 인한 취소 시 전액 환불 처리되며, 코스 시간 단축·연장 시 정찰제 차액 기준으로 즉시 정산해 드립니다. (문의: 010-6607-2239)</p>
      </section>
    </div>
  );
}
