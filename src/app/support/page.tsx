import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '고객센터 및 예약 안내 | 아밤 (Abam.kr) 프라이빗 1:1 방문 홈케어',
  description: '아밤(Abam.kr) 서울·경기 전역 자택·호텔 1:1 방문 홈케어 고객센터 및 실시간 전화·문자 예약 안내 (매일 18:00~익일 05:00, 010-6607-2239).',
  alternates: { canonical: 'https://abam.kr/support' },
};

export default function SupportPage() {
  return (
    <div style={{ maxWidth: '680px', margin: '0 auto', padding: '40px 20px', minHeight: '70vh', fontFamily: "'Noto Sans KR', sans-serif", color: '#0f172a' }}>
      <h1 style={{ fontSize: '26px', fontWeight: 900, marginBottom: '10px' }}>아밤 (Abam.kr) 고객센터 및 예약 상담</h1>
      <p style={{ color: '#475569', fontSize: '14px', lineHeight: 1.7, marginBottom: '28px' }}>
        서울 25개 구 및 경기 전역 자택·호텔 1:1 방문 홈케어 관련 코스 문의, 도착 예정 시간 확인, 불편 사항 접수를 안내해 드립니다.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '32px' }}>
        <a href="tel:010-6607-2239" style={{ textDecoration: 'none', background: '#0f172a', color: '#ffffff', borderRadius: '14px', padding: '24px', textAlign: 'center' }}>
          <div style={{ fontSize: '13px', color: '#fde047', fontWeight: 800, marginBottom: '6px' }}>직통 전화 예약 · 상담</div>
          <div style={{ fontSize: '22px', fontWeight: 900, marginBottom: '6px' }}>010-6607-2239</div>
          <div style={{ fontSize: '12px', color: '#cbd5e1' }}>예약 접수 18:00 ~ 익일 05:00 마감</div>
        </a>
        <a href="sms:01066072239" style={{ textDecoration: 'none', background: '#f8fafc', color: '#0f172a', border: '1px solid #cbd5e1', borderRadius: '14px', padding: '24px', textAlign: 'center' }}>
          <div style={{ fontSize: '13px', color: '#0284c7', fontWeight: 800, marginBottom: '6px' }}>문자(SMS) 간편 접수</div>
          <div style={{ fontSize: '20px', fontWeight: 900, marginBottom: '6px' }}>문자 메시지 바로 보내기</div>
          <div style={{ fontSize: '12px', color: '#64748b' }}>방문 주소와 희망 코스를 남겨주시면 즉시 회신</div>
        </a>
      </div>
      <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '13.5px', lineHeight: 1.75, color: '#334155' }}>
        <strong>이용 안내:</strong> 아밤(Abam.kr)은 사전 예약금이나 보증금을 요구하지 않는 <strong>100% 현장 대면결제(현금·계좌이체·카드)</strong> 원칙을 준수합니다.
      </div>
      <div style={{ marginTop: '24px' }}>
        <Link href="/" style={{ color: '#0284c7', fontWeight: 800, textDecoration: 'none', fontSize: '14px' }}>← 메인 홈으로 돌아가기</Link>
      </div>
    </div>
  );
}
