'use client';

import Link from 'next/link';
import styles from './Footer.module.css';
import { Phone, CreditCard, ShieldCheck } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{ background: '#f8fafc', color: '#475569', borderTop: '1px solid #e2e8f0', marginTop: '60px' }}>
      {/* 1. Upper Footer Dashboard */}
      <div style={{ padding: '36px 0', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '30px' }}>
            {/* Column 1: Customer Center */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <div style={{ background: '#0284c7', color: '#ffffff', padding: '10px', borderRadius: '10px' }}>
                  <Phone size={20} />
                </div>
                <div>
                  <div style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a' }}>070-8057-6615</div>
                  <div style={{ fontSize: '13px', color: '#64748b' }}>평일 09:30 ~ 18:30 (점심 12:00 ~ 13:30)</div>
                </div>
              </div>
              <div style={{ fontSize: '12px', color: '#94a3b8' }}>* 주말 및 공휴일은 1:1 온라인 문의를 이용해 주세요.</div>
            </div>

            {/* Column 2: Service Links */}
            <div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a', marginBottom: '12px' }}>서비스 바로가기</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
                <Link href="/business" style={{ color: '#475569', textDecoration: 'none' }}>전국 매장 디렉토리</Link>
                <Link href="/partnership" style={{ color: '#475569', textDecoration: 'none' }}>배너 광고 상품 안내</Link>
                <Link href="/community" style={{ color: '#475569', textDecoration: 'none' }}>자주 묻는 질문 (FAQ)</Link>
              </div>
            </div>

            {/* Column 3: Legal Terms */}
            <div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a', marginBottom: '12px' }}>약관 및 정책</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
                <Link href="/terms" style={{ color: '#0284c7', fontWeight: 600, textDecoration: 'none' }}>서비스 이용약관</Link>
                <Link href="/privacy" style={{ color: '#0284c7', fontWeight: 600, textDecoration: 'none' }}>개인정보 처리방침</Link>
                <Link href="/refund" style={{ color: '#0284c7', fontWeight: 600, textDecoration: 'none' }}>전자상거래 환불/취소 규정</Link>
              </div>
            </div>

            {/* Column 4: Payment Escrow Guarantee */}
            <div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CreditCard size={18} color="#0284c7" /> 안전 결제 시스템
              </div>
              <div style={{ fontSize: '13px', color: '#64748b', lineHeight: '1.6' }}>
                <p style={{ margin: 0, fontWeight: 700, color: '#1e293b' }}>💳 포트원(PortOne) PG사 정식 연동</p>
                <p style={{ margin: '4px 0 0' }}>신용카드 및 실시간 가상계좌 에스크로를 통해 안전한 전자상거래 결제를 보장합니다.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Bottom Corporate Info */}
      <div style={{ padding: '28px 0', fontSize: '12.5px', color: '#64748b' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px' }}>
            <div style={{ lineHeight: '1.9' }}>
              <div style={{ color: '#334155', fontWeight: 600 }}>
                <span>상호명: 제이에이치스토어 (서비스명: 아밤 ABAM)</span> <span style={{ margin: '0 6px', color: '#cbd5e1' }}>|</span>
                <span>대표자: 양정호</span> <span style={{ margin: '0 6px', color: '#cbd5e1' }}>|</span>
                <span>사업자등록번호: 541-09-03234</span> <span style={{ margin: '0 6px', color: '#cbd5e1' }}>|</span>
                <span>통신판매업신고번호: 제2026-서울서대문-0168호</span>
              </div>
              <div>
                <span>사업장 주소: 서울특별시 서대문구 거북골로 18가길 23</span> <span style={{ margin: '0 6px', color: '#cbd5e1' }}>|</span>
                <span>직업정보제공사업 신고번호: 제2026-서울서대문-0001호</span>
              </div>
              <div>
                <span>대표전화: 070-8057-6615</span> <span style={{ margin: '0 6px', color: '#cbd5e1' }}>|</span>
                <span>이메일 문의: <a href="mailto:help@abam.kr" style={{ color: '#0284c7', textDecoration: 'none', fontWeight: 600 }}>help@abam.kr</a></span> <span style={{ margin: '0 6px', color: '#cbd5e1' }}>|</span>
                <span>개인정보보호책임자: 양정호</span>
              </div>
              <div style={{ marginTop: '12px', fontSize: '12px', color: '#94a3b8' }}>
                아밤(ABAM)은 전국 로컬 매장 정보 및 디지털 배너 광고 플랫폼이며, 전자상거래 등에서의 소비자보호에 관한 법률 및 직업안정법 등 관련 법규를 준수합니다.
              </div>
              <div style={{ marginTop: '6px', fontSize: '12px', color: '#94a3b8' }}>
                Copyright © 2026 ABAM Business Platform. All rights reserved.
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <div style={{ border: '1px solid #e2e8f0', borderRadius: '10px', padding: '10px 16px', textAlign: 'center', background: '#ffffff', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                <ShieldCheck size={22} color="#10b981" style={{ margin: '0 auto 4px' }} />
                <div style={{ fontSize: '11px', fontWeight: 800, color: '#059669' }}>CLEAN B2B<br/>VERIFIED</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
