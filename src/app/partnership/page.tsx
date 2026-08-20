'use client';

import React, { useState } from 'react';
import { Megaphone, CheckCircle, ShieldCheck, CreditCard } from 'lucide-react';

export default function PartnershipPage() {
  const [formData, setFormData] = useState({
    companyName: '',
    ownerName: '',
    phone: '',
    email: '',
    pkg: 'vip',
    memo: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`[광고 신청 완료]\n상호명: ${formData.companyName}\n담당자: ${formData.ownerName}\n연락처: ${formData.phone}\n\n신청이 정상 접수되었습니다. 담당자가 확인 후 1영업일 이내 연락드립니다.`);
  };

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', padding: '0 20px', color: '#1e293b' }}>
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 900, color: '#0f172a', marginBottom: '8px' }}>
          배너 광고 및 입점 제휴 신청
        </h1>
        <p style={{ fontSize: '15px', color: '#64748b' }}>
          아밤(ABAM) 플랫폼을 통해 귀사의 매장과 브랜드를 효과적으로 홍보하세요.
        </p>
      </div>

      <form onSubmit={handleSubmit} style={{ background: '#FFF', padding: '30px', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 15px rgba(0,0,0,0.04)' }}>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: 700, marginBottom: '6px', color: '#334155' }}>
            매장명 (상호명) *
          </label>
          <input
            type="text"
            required
            placeholder="예: 루미에르 에스테틱 강남점"
            value={formData.companyName}
            onChange={e => setFormData({ ...formData, companyName: e.target.value })}
            style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px' }}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 700, marginBottom: '6px', color: '#334155' }}>
              담당자 성명 *
            </label>
            <input
              type="text"
              required
              placeholder="예: 홍길동"
              value={formData.ownerName}
              onChange={e => setFormData({ ...formData, ownerName: e.target.value })}
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 700, marginBottom: '6px', color: '#334155' }}>
              연락처 (휴대폰) *
            </label>
            <input
              type="tel"
              required
              placeholder="예: 010-1234-5678"
              value={formData.phone}
              onChange={e => setFormData({ ...formData, phone: e.target.value })}
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px' }}
            />
          </div>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: 700, marginBottom: '6px', color: '#334155' }}>
            희망 광고 상품 *
          </label>
          <select
            value={formData.pkg}
            onChange={e => setFormData({ ...formData, pkg: e.target.value })}
            style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px', background: '#FFF' }}
          >
            <option value="vip">메인 최상단 VIP 배너 (30일 / 100,000원)</option>
            <option value="premium">지역 추천 프리미엄 배너 (30일 / 50,000원)</option>
            <option value="standard">신규 매장 스탠다드 등록 (30일 / 30,000원)</option>
          </select>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: 700, marginBottom: '6px', color: '#334155' }}>
            요청사항 및 매장 소개
          </label>
          <textarea
            rows={4}
            placeholder="매장 위치, 주요 서비스, 희망 노출 키워드 등을 자유롭게 적어주세요."
            value={formData.memo}
            onChange={e => setFormData({ ...formData, memo: e.target.value })}
            style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px' }}
          />
        </div>

        <button
          type="submit"
          style={{
            width: '100%',
            padding: '16px',
            borderRadius: '10px',
            border: 'none',
            background: '#0284c7',
            color: '#FFF',
            fontWeight: 800,
            fontSize: '16px',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(2, 132, 199, 0.3)'
          }}
        >
          🚀 배너 광고 신청 접수하기
        </button>
      </form>
    </div>
  );
}
