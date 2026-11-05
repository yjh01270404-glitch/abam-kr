import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '개인정보 처리방침 | 아밤 (Abam.kr)',
  description: '아밤(Abam.kr) 프라이빗 1:1 방문 홈케어 고객 개인정보 보호 및 즉시 파기 원칙 안내.',
  alternates: { canonical: 'https://abam.kr/privacy' },
};

export default function PrivacyPage() {
  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', padding: '0 20px', color: '#334155', lineHeight: '1.8' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a', marginBottom: '24px', borderBottom: '2px solid #e2e8f0', paddingBottom: '12px' }}>
        아밤 (Abam.kr) 개인정보 처리방침
      </h1>
      <section style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#1e293b', marginBottom: '8px' }}>1. 최소한의 정보 확인 및 목적 외 사용 금지</h2>
        <p>아밤(Abam.kr)은 별도의 회원가입 없이 전화 또는 문자(SMS)를 통해 방문 홈케어 예약을 접수하며, 배차 및 방문을 위한 최소 정보(방문 주소 또는 호텔/객실 정보, 연락처, 희망 코스)만을 확인합니다.</p>
      </section>
      <section style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#1e293b', marginBottom: '8px' }}>2. 케어 완료 후 즉시 파기 원칙</h2>
        <p>고객님의 프라이버시 보호를 최우선으로 하며, 1:1 방문 홈케어 서비스 제공이 완료된 이후 예약 문자 및 방문 기록은 외부에 절대 유출되지 않고 안전하게 파기·관리됩니다.</p>
      </section>
      <section style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#1e293b', marginBottom: '8px' }}>3. 고객센터 문의</h2>
        <p>개인정보 보호 및 예약 관련 문의: 010-6607-2239 (연중무휴 18:00 ~ 익일 05:00)</p>
      </section>
    </div>
  );
}
