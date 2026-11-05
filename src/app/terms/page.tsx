import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '서비스 이용약관 | 아밤 (Abam.kr)',
  description: '아밤(Abam.kr) 프라이빗 1:1 방문 홈케어 서비스 이용약관 및 현장 후불제 운영 원칙 안내.',
  alternates: { canonical: 'https://abam.kr/terms' },
};

export default function TermsPage() {
  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', padding: '0 20px', color: '#334155', lineHeight: '1.8' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a', marginBottom: '24px', borderBottom: '2px solid #e2e8f0', paddingBottom: '12px' }}>
        아밤 (Abam.kr) 서비스 이용약관
      </h1>
      <section style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#1e293b', marginBottom: '8px' }}>제1조 (목적)</h2>
        <p>본 약관은 아밤(abam.kr, 이하 "서비스")이 제공하는 서울·경기 1:1 방문 홈케어(타이·아로마·스페셜 테라피) 예약 안내 및 서비스 이용에 관한 제반 사항을 규정함을 목적으로 합니다.</p>
      </section>
      <section style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#1e293b', marginBottom: '8px' }}>제2조 (100% 현장 대면결제 원칙)</h2>
        <p>1. 본 서비스는 사전 예약금, 보증금, 출장비 등 어떠한 명목의 선입금도 요구하지 않습니다.<br />
        2. 모든 결제는 관리사 및 운전기사가 고객님의 방문 장소(자택 또는 호텔 1층 로비)에 도착하여 대면한 후 현금, 계좌이체, 카드로 진행됩니다.</p>
      </section>
      <section style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#1e293b', marginBottom: '8px' }}>제3조 (예약 변경 및 취소)</h2>
        <p>배차 출발 전 예약 변경 및 취소는 고객센터(010-6607-2239) 전화 또는 문자를 통해 위약금 없이 가능합니다. 원활한 배차를 위해 일정 변경 시 최소 30분 전 연락을 권장합니다.</p>
      </section>
    </div>
  );
}
