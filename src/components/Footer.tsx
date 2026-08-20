'use client';

import Link from 'next/link';
import styles from './Footer.module.css';
import { Phone, MessageSquare, BookOpen, Headset, CreditCard, HelpCircle, ShieldCheck } from 'lucide-react';

export default function Footer() {
  return (
    <footer className={styles.footer} style={{ background: '#0f172a', color: '#94a3b8', borderTop: '1px solid #1e293b' }}>
      {/* 1. Upper Footer Dashboard */}
      <div className={styles.upperFooter} style={{ padding: '30px 0', borderBottom: '1px solid #1e293b' }}>
        <div className={styles.container} style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px' }}>
          <div className={styles.footerGrid} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px' }}>
            {/* Column 1: Customer Center */}
            <div className={styles.gridCol}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <div style={{ background: '#0284c7', color: '#FFF', padding: '8px', borderRadius: '8px' }}>
                  <Phone size={18} />
                </div>
                <div>
                  <div style={{ fontSize: '18px', fontWeight: 800, color: '#f8fafc' }}>070-8057-6615</div>
                  <div style={{ fontSize: '12px', color: '#94a3b8' }}>평일 09:30~18:30 (점심 12:00~13:30)</div>
                </div>
              </div>
              <div style={{ fontSize: '11px', color: '#64748b' }}>* 주말 및 공휴일은 1:1 온라인 문의를 이용해 주세요.</div>
            </div>

            {/* Column 2: Service Links */}
            <div className={styles.gridCol}>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#f8fafc', marginBottom: '10px' }}>서비스 바로가기</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12px' }}>
                <Link href="/business" style={{ color: '#cbd5e1', textDecoration: 'none' }}>전국 매장 디렉토리</Link>
                <Link href="/partnership" style={{ color: '#cbd5e1', textDecoration: 'none' }}>배너 광고 상품 안내</Link>
                <Link href="/community" style={{ color: '#cbd5e1', textDecoration: 'none' }}>자주 묻는 질문 (FAQ)</Link>
              </div>
            </div>

            {/* Column 3: Legal Terms */}
            <div className={styles.gridCol}>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#f8fafc', marginBottom: '10px' }}>약관 및 정책</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12px' }}>
                <Link href="/terms" style={{ color: '#38bdf8', fontWeight: 700, textDecoration: 'none' }}>서비스 이용약관</Link>
                <Link href="/privacy" style={{ color: '#38bdf8', fontWeight: 700, textDecoration: 'none' }}>개인정보 처리방침</Link>
                <Link href="/refund" style={{ color: '#38bdf8', fontWeight: 700, textDecoration: 'none' }}>전자상거래 환불/취소 규정</Link>
              </div>
            </div>

            {/* Column 4: Payment Escrow Guarantee */}
            <div className={styles.gridCol}>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#f8fafc', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CreditCard size={16} /> 안전 결제 시스템
              </div>
              <div style={{ fontSize: '12px', color: '#94a3b8', lineHeight: '1.5' }}>
                <p style={{ margin: 0, fontWeight: 700, color: '#e2e8f0' }}>💳 포트원(PortOne) PG사 연동</p>
                <p style={{ margin: '4px 0 0' }}>신용카드 및 실시간 가상계좌 에스크로를 통해 안전한 전자상거래 결제를 보장합니다.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Bottom Corporate Info */}
      <div className={styles.bottomSection} style={{ padding: '24px 0', fontSize: '12px', color: '#64748b' }}>
        <div className={styles.container} style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
            <div style={{ lineHeight: '1.8' }}>
              <div style={{ color: '#94a3b8', fontWeight: 600 }}>
                <span>상호명: 제이에이치스토어 (서비스명: 아밤 ABAM)</span> <span style={{ margin: '0 6px' }}>|</span>
                <span>대표자: 양정호</span> <span style={{ margin: '0 6px' }}>|</span>
                <span>사업자등록번호: 541-09-03234</span> <span style={{ margin: '0 6px' }}>|</span>
                <span>통신판매업신고번호: 제2026-서울서대문-0168호</span>
              </div>
              <div>
                <span>사업장 주소: 서울특별시 서대문구 거북골로 18가길 23</span> <span style={{ margin: '0 6px' }}>|</span>
                <span>직업정보제공사업 신고번호: 제2026-서울서대문-0001호</span>
              </div>
              <div>
                <span>대표전화: 070-8057-6615</span> <span style={{ margin: '0 6px' }}>|</span>
                <span>이메일 문의: <a href="mailto:help@abam.kr" style={{ color: '#38bdf8', textDecoration: 'none' }}>help@abam.kr</a></span> <span style={{ margin: '0 6px' }}>|</span>
                <span>개인정보보호책임자: 양정호</span>
              </div>
              <div style={{ marginTop: '10px', fontSize: '11px', color: '#475569' }}>
                아밤(ABAM)은 전국 로컬 매장 정보 및 디지털 배너 광고 플랫폼이며, 전자상거래 등에서의 소비자보호에 관한 법률 및 직업안정법 등 관련 법규를 엄격히 준수합니다.
              </div>
              <div style={{ marginTop: '6px', fontSize: '11px', color: '#475569' }}>
                Copyright © 2026 ABAM Business Portal. All rights reserved.
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <div style={{ border: '1px solid #334155', borderRadius: '8px', padding: '8px 12px', textAlign: 'center', background: '#1e293b' }}>
                <ShieldCheck size={20} color="#10b981" style={{ margin: '0 auto 4px' }} />
                <div style={{ fontSize: '10px', fontWeight: 800, color: '#10b981' }}>CLEAN B2B<br/>VERIFIED</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
