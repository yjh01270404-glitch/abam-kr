'use client';

import React from 'react';
import Link from 'next/link';
import { MapPin, Star, Sparkles, Filter, Phone } from 'lucide-react';

const STORES = [
  { id: 1, name: '루미에르 에스테틱 강남점', cat: '뷰티·피부관리', loc: '서울 강남구 테헤란로', tel: '02-1234-5678', rating: 4.9 },
  { id: 2, name: '아틀리에 청담 헤어살롱', cat: '헤어·바디', loc: '서울 강남구 도산대로', tel: '02-2345-6789', rating: 4.8 },
  { id: 3, name: '카페 드 로맨티크 한남', cat: '카페·디저트', loc: '서울 용산구 한남대로', tel: '02-3456-7890', rating: 4.9 },
  { id: 4, name: '더 프라임 필라테스 서초', cat: '피트니스·운동', loc: '서울 서초구 사임당로', tel: '02-4567-8901', rating: 5.0 },
  { id: 5, name: '스튜디오 모멘트 홍대', cat: '스튜디오·문화', loc: '서울 마포구 와우산로', tel: '02-5678-9012', rating: 4.7 },
  { id: 6, name: '라비에벨 스파 분당본점', cat: '스파·테라피', loc: '경기 성남시 분당구 판교로', tel: '031-123-4567', rating: 4.9 },
];

export default function BusinessPage() {
  return (
    <div style={{ maxWidth: '1100px', margin: '40px auto', padding: '0 20px' }}>
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 900, color: '#0f172a', marginBottom: '8px' }}>
          전국 로컬 매장 디렉토리
        </h1>
        <p style={{ fontSize: '15px', color: '#64748b' }}>
          검증된 전국의 우수 소상공인 및 프리미엄 매장 정보를 한눈에 확인하세요.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        {STORES.map(s => (
          <div key={s.id} style={{ background: '#FFF', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#0284c7', marginBottom: '6px' }}>{s.cat}</div>
            <h2 style={{ fontSize: '17px', fontWeight: 800, color: '#0f172a', marginBottom: '6px' }}>{s.name}</h2>
            <div style={{ fontSize: '13px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '6px' }}>
              <MapPin size={14} /> {s.loc}
            </div>
            <div style={{ fontSize: '13px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '14px' }}>
              <Phone size={14} /> {s.tel}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f1f5f9', paddingTop: '12px' }}>
              <span style={{ fontSize: '13px', color: '#f59e0b', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '3px' }}>
                <Star size={14} fill="#f59e0b" /> {s.rating}
              </span>
              <button onClick={() => alert(`[${s.name}] 매장 예약/상담 연결`)} style={{ background: '#0284c7', color: '#FFF', border: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}>
                매장 상세정보
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
