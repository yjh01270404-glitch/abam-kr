'use client';

import React, { useState } from 'react';

const REGION_PINS = [
  { id: 'gangnam', name: '강남 / 역삼', count: 184, lat: '37.4979', lng: '127.0276', active: true },
  { id: 'hongdae', name: '홍대 / 신촌', count: 96, lat: '37.5563', lng: '126.9228', active: false },
  { id: 'suwon', name: '수원 / 인계', count: 112, lat: '37.2636', lng: '127.0286', active: false },
  { id: 'incheon', name: '인천 / 부평', count: 145, lat: '37.4923', lng: '126.7248', active: false },
  { id: 'busan', name: '부산 / 서면', count: 168, lat: '35.1578', lng: '129.0592', active: false },
  { id: 'daegu', name: '대구 / 동성로', count: 87, lat: '35.8714', lng: '128.6014', active: false }
];

export default function InteractiveMapJobFilter() {
  const [selectedRegion, setSelectedRegion] = useState('gangnam');

  return (
    <div style={{
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
      border: '1px solid rgba(233,30,99,0.3)',
      borderRadius: '16px',
      padding: '20px',
      color: '#ffffff',
      margin: '18px 0',
      boxShadow: '0 10px 30px rgba(0,0,0,0.25)',
      fontFamily: '"Noto Sans KR", sans-serif'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px' }}>
        <div>
          <h3 style={{ fontSize: '16px', fontWeight: 900, color: '#f43f5e', margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
            🗺️ 전국 지오로케이션(Geolocation) 인터랙티브 구인 맵
          </h3>
          <p style={{ fontSize: '11.5px', color: '#94a3b8', margin: '3px 0 0' }}>실시간 지역별 매장 핀 클릭 시 맞춤형 급여/공고 실시간 소켓 필터링</p>
        </div>
        <span style={{ fontSize: '11px', background: '#e11d48', color: '#fff', padding: '3px 10px', borderRadius: '12px', fontWeight: 900 }}>
          LIVE 핀 792개 가동 중
        </span>
      </div>

      {/* Region Pins Grid */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {REGION_PINS.map(pin => {
          const isSelected = selectedRegion === pin.id;
          return (
            <button
              key={pin.id}
              onClick={() => setSelectedRegion(pin.id)}
              style={{
                background: isSelected ? 'linear-gradient(135deg, #be185d, #9d174d)' : 'rgba(255,255,255,0.06)',
                border: isSelected ? '1.5px solid #f43f5e' : '1px solid rgba(255,255,255,0.15)',
                color: isSelected ? '#ffffff' : '#cbd5e1',
                padding: '8px 14px',
                borderRadius: '10px',
                fontSize: '12px',
                fontWeight: isSelected ? 900 : 700,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                boxShadow: isSelected ? '0 4px 14px rgba(190,24,93,0.4)' : 'none'
              }}
            >
              <span>📍 {pin.name}</span>
              <span style={{ background: isSelected ? '#ffffff' : 'rgba(255,255,255,0.15)', color: isSelected ? '#be185d' : '#94a3b8', padding: '1px 6px', borderRadius: '10px', fontSize: '10px', fontWeight: 900 }}>
                {pin.count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
