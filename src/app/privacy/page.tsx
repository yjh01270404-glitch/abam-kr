import React from 'react';

export const metadata = {
  title: '개인정보 처리방침 | 아밤(ABAM)',
  description: '아밤(ABAM) 개인정보 처리방침 및 이용자 권리 보호 정책',
};

export default function PrivacyPage() {
  return (
    <div style={{ maxWidth: '900px', margin: '40px auto', padding: '0 20px', color: '#334155', lineHeight: '1.8' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a', marginBottom: '24px', borderBottom: '2px solid #e2e8f0', paddingBottom: '12px' }}>
        아밤(ABAM) 개인정보 처리방침
      </h1>

      <section style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#1e293b', marginBottom: '8px' }}>1. 수집하는 개인정보 항목 및 수집방법</h2>
        <p>회사는 회원가입, 원활한 고객상담, 유료 광고 결제 및 서비스 제공을 위해 아래와 같은 개인정보를 수집하고 있습니다.<br />
        - 수집항목: 상호명, 담당자 성명, 연락처, 이메일, 사업장 주소, 사업자등록번호(세금계산서 발행 시), 결제 승인 기록<br />
        - 수집방법: 홈페이지 가입 양식, 유료 결제 신청창, 고객센터 문의</p>
      </section>

      <section style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#1e293b', marginBottom: '8px' }}>2. 개인정보의 수집 및 이용목적</h2>
        <p>1. 서비스 제공 및 계약 이행: 매장 정보 등록, 디지털 배너 광고 게재, 결제 및 정산, 세금계산서 발행<br />
        2. 회원 관리: 회원제 서비스 이용에 따른 본인 식별, 불만 처리 등 민원 처리, 고지사항 전달</p>
      </section>

      <section style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#1e293b', marginBottom: '8px' }}>3. 개인정보의 보유 및 이용기간</h2>
        <p>전자상거래 등에서의 소비자보호에 관한 법률 등 관계 법령의 규정에 의하여 보존할 필요가 있는 경우, 회사는 법령에서 정한 일정한 기간 동안 회원정보를 보관합니다.<br />
        - 계약 또는 청약철회 등에 관한 기록: 5년<br />
        - 대금결제 및 재화 등의 공급에 관한 기록: 5년<br />
        - 소비자의 불만 또는 분쟁처리에 관한 기록: 3년</p>
      </section>

      <section style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#1e293b', marginBottom: '8px' }}>4. 개인정보 보호책임자</h2>
        <p>성명: 양정호<br />연락처: 070-8057-6615 / help@abam.kr</p>
      </section>
    </div>
  );
}
