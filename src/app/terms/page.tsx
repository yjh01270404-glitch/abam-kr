import React from 'react';

export const metadata = {
  title: '서비스 이용약관 | 아밤(ABAM)',
  description: '아밤(ABAM) 전자상거래 및 온라인 비즈니스 플랫폼 표준 이용약관',
};

export default function TermsPage() {
  return (
    <div style={{ maxWidth: '900px', margin: '40px auto', padding: '0 20px', color: '#334155', lineHeight: '1.8' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a', marginBottom: '24px', borderBottom: '2px solid #e2e8f0', paddingBottom: '12px' }}>
        아밤(ABAM) 서비스 이용약관
      </h1>

      <section style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#1e293b', marginBottom: '8px' }}>제1조 (목적)</h2>
        <p>본 약관은 제이에이치스토어(이하 "회사")가 운영하는 아밤(abam.kr, 이하 "서비스")에서 제공하는 전자상거래 및 온라인 광고 배너 서비스의 이용조건 및 절차, 회사와 회원의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.</p>
      </section>

      <section style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#1e293b', marginBottom: '8px' }}>제2조 (용어의 정의)</h2>
        <p>1. "서비스"란 회사가 회원에게 제공하는 전국 로컬 매장 정보 검색, 매장 홍보 페이지, 디지털 배너 광고 게재 및 이와 관련된 제반 서비스를 의미합니다.<br />
        2. "회원"이란 본 약관에 동의하고 회사에 개인정보를 제공하여 회원등록을 한 자로서, 회사의 서비스를 지속적으로 이용할 수 있는 자를 말합니다.<br />
        3. "광고주"란 매장 홍보 또는 배너 광고 게재를 위해 회사에 유료 결제를 진행한 회원을 말합니다.</p>
      </section>

      <section style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#1e293b', marginBottom: '8px' }}>제3조 (결제 및 유료 서비스)</h2>
        <p>1. 회원은 회사가 제공하는 결제 수단(신용카드, 실시간 계좌이체, 가상계좌 등)을 통하여 광고비 및 서비스 이용료를 결제할 수 있습니다.<br />
        2. 결제 과정은 전자금융거래법 및 전자상거래 등에서의 소비자보호에 관한 법률을 준수하며, 안전한 거래를 위해 공인된 전자결제대행사(PG) 시스템을 사용합니다.</p>
      </section>

      <section style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#1e293b', marginBottom: '8px' }}>제4조 (청약철회 및 환불)</h2>
        <p>1. 유료 광고 서비스를 결제한 회원은 광고 게재 시작 전까지 결제 취소 및 전액 환불을 요청할 수 있습니다.<br />
        2. 광고가 이미 게재되어 서비스가 개시된 경우에는 잔여 기간에 해당하는 일할 계산 금액에서 결제 수수료를 공제한 후 환불이 진행됩니다.<br />
        3. 세부 환불 기준은 전자상거래 환불/취소 규정에 따릅니다.</p>
      </section>
    </div>
  );
}
