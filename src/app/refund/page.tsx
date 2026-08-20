import React from 'react';

export const metadata = {
  title: '환불 및 취소 규정 | 아밤(ABAM)',
  description: '아밤(ABAM) 전자상거래법 준수 환불 및 배송/취소 규정',
};

export default function RefundPage() {
  return (
    <div style={{ maxWidth: '900px', margin: '40px auto', padding: '0 20px', color: '#334155', lineHeight: '1.8' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a', marginBottom: '24px', borderBottom: '2px solid #e2e8f0', paddingBottom: '12px' }}>
        전자상거래 환불 / 취소 정책
      </h1>

      <section style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#1e293b', marginBottom: '8px' }}>1. 청약철회 (결제 취소) 기준</h2>
        <p>
          - <strong>광고 게재 전:</strong> 결제 후 배너 제작 및 광고 게재가 시작되기 전에는 즉시 100% 전액 환불이 가능합니다.<br />
          - <strong>광고 게재 후 (이용 중):</strong> 디지털 서비스의 특성상 광고가 라이브 게재된 이후에는 기이용 일수에 해당하는 금액과 전자결제 수수료(원 결제금액의 5%)를 공제한 잔액이 환불됩니다.
        </p>
      </section>

      <section style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#1e293b', marginBottom: '8px' }}>2. 환불 처리 절차</h2>
        <p>
          1. 고객센터(070-8057-6615) 또는 이메일(help@abam.kr)로 환불 신청 접수.<br />
          2. 담당자 확인 후 1~2 영업일 이내 환불 승인.<br />
          3. 신용카드 결제는 카드 승인 취소, 가상계좌/계좌이체는 요청하신 본인 명의 계좌로 입금 처리.
        </p>
      </section>

      <section style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#1e293b', marginBottom: '8px' }}>3. 소비자 피해보상 및 분쟁처리</h2>
        <p>
          본 서비스는 전자상거래 등에서의 소비자보호에 관한 법률 등 관련 법령을 준수하며, 결제와 관련한 분쟁 발생 시 공정거래위원회 표준 기준에 따라 신속하게 처리됩니다.
        </p>
      </section>
    </div>
  );
}
