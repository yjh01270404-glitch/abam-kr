import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '고객센터 | 아름다운밤 (아밤)',
  description: '아름다운밤 고객센터 - 업소 등록, 공고 수정, 문의사항을 운영자 1:1 실시간 톡으로 빠르게 처리해드립니다.',
};

export default function SupportPage() {
  return (
    <div style={{
      maxWidth: '800px',
      margin: '0 auto',
      padding: '40px 20px',
      minHeight: '70vh',
      fontFamily: "'Noto Sans KR', sans-serif",
    }}>
      <h1 style={{ fontSize: '28px', fontWeight: '900', color: '#1f2937', marginBottom: '8px' }}>
        고객센터
      </h1>
      <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '40px' }}>
        아름다운밤(아밤) 이용에 관한 모든 문의를 운영자 1:1 실시간 톡으로 빠르게 처리해드립니다.
      </p>

      {/* 연락처 및 1:1 실시간 톡 카드 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '40px' }}>
        <div style={{
          background: '#ffffff',
          border: '1.5px solid #f0c0d8',
          borderRadius: '16px',
          padding: '24px',
          boxShadow: '0 4px 16px rgba(194,24,91,0.06)',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: '32px', marginBottom: '10px' }}>📞</div>
          <div style={{ fontSize: '12px', color: '#9ca3af', fontWeight: '700', marginBottom: '4px' }}>대표 전화</div>
          <div style={{ fontSize: '16px', fontWeight: '800', color: '#c2185b', marginBottom: '4px' }}>070-8057-6615</div>
          <div style={{ fontSize: '11px', color: '#9ca3af' }}>평일 09:30 ~ 19:00</div>
        </div>

        <Link href="/messages" style={{ textDecoration: 'none' }}>
          <div style={{
            background: 'linear-gradient(135deg, #fff1f2 0%, #ffe4e6 100%)',
            border: '2px solid #be185d',
            borderRadius: '16px',
            padding: '24px',
            boxShadow: '0 6px 20px rgba(190,24,93,0.12)',
            textAlign: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}>
            <div style={{ fontSize: '32px', marginBottom: '10px' }}>💬</div>
            <div style={{ fontSize: '12px', color: '#be185d', fontWeight: '900', marginBottom: '4px' }}>운영자 1:1 실시간 톡</div>
            <div style={{ fontSize: '16px', fontWeight: '900', color: '#be185d', marginBottom: '4px' }}>1:1 대화 시작하기 ➔</div>
            <div style={{ fontSize: '11px', color: '#be185d', fontWeight: '700' }}>24시간 실시간 무인/자동 접수</div>
          </div>
        </Link>

        <Link href="/employer/post" style={{ textDecoration: 'none' }}>
          <div style={{
            background: '#ffffff',
            border: '1.5px solid #f0c0d8',
            borderRadius: '16px',
            padding: '24px',
            boxShadow: '0 4px 16px rgba(194,24,91,0.06)',
            textAlign: 'center',
            cursor: 'pointer'
          }}>
            <div style={{ fontSize: '32px', marginBottom: '10px' }}>⚡</div>
            <div style={{ fontSize: '12px', color: '#9ca3af', fontWeight: '700', marginBottom: '4px' }}>구인광고 / 제휴 문의</div>
            <div style={{ fontSize: '16px', fontWeight: '800', color: '#c2185b', marginBottom: '4px' }}>광고 신청하기 ➔</div>
            <div style={{ fontSize: '11px', color: '#9ca3af' }}>VVIP 상단 노출 & 실시간 점프</div>
          </div>
        </Link>
      </div>

      {/* FAQ */}
      <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#1f2937', marginBottom: '20px', borderLeft: '4px solid #c2185b', paddingLeft: '12px' }}>
        자주 묻는 질문 (FAQ)
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {[
          { q: '구인공고는 어떻게 등록하나요?', a: '상단 메뉴 "구인등록" 버튼을 클릭하시거나, 사이트 내 [운영자 1:1 실시간 톡]으로 문의주시면 빠르게 처리해드립니다.' },
          { q: '광고비는 얼마인가요?', a: 'VVIP, GRAND, PREMIUM, LINE 등 다양한 광고 상품이 있습니다. 자세한 금액은 광고안내 페이지 및 운영자 1:1 톡으로 확인하실 수 있습니다.' },
          { q: '내 비밀 장부는 어디서 이용할 수 있나요?', a: '상단 채팅 버튼 옆의 📒 아이콘을 클릭하시면 비밀 장부 기능을 이용하실 수 있습니다. PIN 설정으로 안전하게 관리됩니다.' },
          { q: 'SOS 긴급알바는 어떻게 이용하나요?', a: '메인 페이지의 SOS 긴급콜 배너에서 긴급 구인을 등록하거나 확인하실 수 있습니다. 당일 즉시 매칭을 도와드립니다.' },
          { q: '업소 양도 매물은 어디에서 볼 수 있나요?', a: '상단 메뉴 또는 메인 페이지에서 업소 양도 섹션을 확인하세요. 무료로 매물 정보를 확인하실 수 있습니다.' },
          { q: '허위 광고나 사기 업소를 신고하고 싶어요.', a: '사이트 내 [운영자 1:1 실시간 톡]으로 신고해주시면 즉시 검증 후 해당 공고 조치 및 신속히 내리겠습니다.' },
        ].map((item, i) => (
          <div key={i} style={{
            background: '#ffffff',
            border: '1.5px solid #f0c0d8',
            borderRadius: '12px',
            padding: '18px 20px',
            boxShadow: '0 2px 8px rgba(194,24,91,0.04)',
          }}>
            <div style={{ fontWeight: '800', color: '#1f2937', marginBottom: '8px', fontSize: '14px' }}>
              Q. {item.q}
            </div>
            <div style={{ color: '#6b7280', fontSize: '13.5px', lineHeight: '1.6' }}>
              A. {item.a}
            </div>
          </div>
        ))}
      </div>

      {/* 운영 안내 */}
      <div style={{
        marginTop: '40px',
        background: '#fff8fc',
        border: '1.5px solid #f0c0d8',
        borderRadius: '16px',
        padding: '20px 24px',
        textAlign: 'center',
      }}>
        <p style={{ fontSize: '14px', color: '#4b5563', lineHeight: '1.8', margin: 0 }}>
          ⭐ 아름다운밤은 <strong style={{ color: '#c2185b' }}>24시간 365일</strong> 여러분의 문의를 받고 있습니다.<br />
          빠른 처리를 위해 <Link href="/messages" style={{ color: '#c2185b', fontWeight: '900', textDecoration: 'underline' }}>운영자 1:1 실시간 톡</Link>으로 문의해 주시면 가장 신속하게 답변 드립니다.
        </p>
      </div>
    </div>
  );
}
