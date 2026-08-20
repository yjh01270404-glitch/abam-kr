'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MapPin, Search, Navigation, Award, ArrowLeft, Phone, Compass } from 'lucide-react';

interface MapJobAd {
  id: string;
  companyName: string;
  title: string;
  pay: string;
  location: string;
  lat: number;
  lng: number;
  category: string;
}

export default function JobMapPage() {
  const [selectedRegion, setSelectedRegion] = useState('강남');
  const [selectedJob, setSelectedJob] = useState<MapJobAd | null>(null);

  const mockMapJobs: MapJobAd[] = [
    {
      id: 'crawled-1',
      companyName: '강남 루체 모던바',
      title: '테이블 모던바 바텐더 급구 (초보 환영)',
      pay: '시급 45,000원',
      location: '서울 강남구 역삼동 820-1',
      lat: 120,
      lng: 150,
      category: '모던바'
    },
    {
      id: 'crawled-2',
      companyName: '마포 시크릿 셔츠',
      title: '당일지급 확실한 마포역 셔츠룸 스태프 모집',
      pay: '일급 600,000원',
      location: '서울 마포구 공덕동 456',
      lat: 180,
      lng: 220,
      category: '룸알바'
    },
    {
      id: 'crawled-3',
      companyName: '수원 로얄 인계점',
      title: '수원 인계동 초보가능 단기/주말 파트 알바 모집',
      pay: '시급 40,000원',
      location: '경기 수원시 인계동 1120',
      lat: 220,
      lng: 320,
      category: '토킹바'
    },
    {
      id: 'crawled-4',
      companyName: '신림 텐프로 벨벳',
      title: '정통 텐프로 하이퍼블릭 여직원 모집',
      pay: '일급 700,000원',
      location: '서울 관악구 신림동 1420',
      lat: 250,
      lng: 110,
      category: '텐프로'
    }
  ];

  const regionsCoords: Record<string, { lat: number; lng: number }> = {
    '강남': { lat: 120, lng: 150 },
    '마포': { lat: 180, lng: 220 },
    '수원': { lat: 220, lng: 320 },
    '신림': { lat: 250, lng: 110 }
  };

  const currentCoords = regionsCoords[selectedRegion] || regionsCoords['강남'];

  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      background: '#0b0f19',
      color: '#f8fafc',
      fontFamily: '"Noto Sans KR", sans-serif'
    }}>
      {/* Header */}
      <header style={{
        background: '#111827',
        borderBottom: '1.5px solid #1f2937',
        padding: '12px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexShrink: 0
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Link href="/" style={{ color: '#94a3b8', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <ArrowLeft size={16} /> 홈
          </Link>
          <h1 style={{ fontSize: '18px', fontWeight: '900', color: '#db2777', margin: 0 }}>📍 아밤 내 주변 안심 지도 서비스</h1>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          {['강남', '마포', '수원', '신림'].map((r) => (
            <button
              key={r}
              onClick={() => {
                setSelectedRegion(r);
                setSelectedJob(null);
              }}
              style={{
                background: selectedRegion === r ? '#db2777' : '#1f2937',
                border: 'none',
                color: '#ffffff',
                borderRadius: '6px',
                padding: '6px 12px',
                fontSize: '13px',
                fontWeight: '900',
                cursor: 'pointer'
              }}
            >
              {r}구역
            </button>
          ))}
        </div>
      </header>

      {/* Map Content Area */}
      <div style={{ flexGrow: 1, position: 'relative', overflow: 'hidden', display: 'flex' }}>
        
        {/* Left Interactive Sidebar */}
        <div style={{
          width: '320px',
          background: 'rgba(17, 24, 39, 0.95)',
          backdropFilter: 'blur(10px)',
          borderRight: '1.5px solid #1f2937',
          zIndex: 10,
          padding: '16px',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          overflowY: 'auto'
        }}>
          <h3 style={{ margin: '0 0 4px 0', fontSize: '15px', color: '#db2777', fontWeight: '900' }}>
            🗺️ {selectedRegion} 인근 채용공고
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {mockMapJobs.filter(j => j.location.includes(selectedRegion)).map((job) => (
              <div
                key={job.id}
                onClick={() => setSelectedJob(job)}
                style={{
                  background: selectedJob?.id === job.id ? '#1e1b4b' : '#1f2937',
                  border: selectedJob?.id === job.id ? '1.5px solid #db2777' : '1.5px solid transparent',
                  borderRadius: '8px',
                  padding: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                <div style={{ fontSize: '11px', color: '#db2777', fontWeight: 900, marginBottom: '4px' }}>
                  [{job.category}]
                </div>
                <h4 style={{ margin: '0 0 6px 0', fontSize: '14px', color: '#ffffff', fontWeight: 800 }}>
                  {job.companyName}
                </h4>
                <div style={{ fontSize: '13px', color: '#facc15', fontWeight: 900 }}>
                  💰 {job.pay}
                </div>
                <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '6px' }}>
                  📍 {job.location}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Vector SVG Mock Map */}
        <div style={{
          flexGrow: 1,
          background: '#090d16',
          backgroundImage: 'radial-gradient(#1f2937 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          
          {/* Mock Map Board Map Graphics */}
          <svg style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            opacity: 0.15
          }}>
            {/* Mock roads */}
            <path d="M 0,100 L 1000,100 M 0,300 L 1000,300 M 0,500 L 1000,500" stroke="#94a3b8" strokeWidth="4" fill="none" />
            <path d="M 200,0 L 200,800 M 500,0 L 500,800 M 800,0 L 800,800" stroke="#94a3b8" strokeWidth="4" fill="none" />
            {/* Mock River */}
            <path d="M 0,200 Q 300,150 600,250 T 1000,220" stroke="#1d4ed8" strokeWidth="40" fill="none" opacity="0.3" />
          </svg>

          {/* Current Area Compass */}
          <div style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'rgba(17,24,39,0.8)',
            padding: '8px 12px',
            borderRadius: '20px',
            fontSize: '12.5px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            color: '#38bdf8'
          }}>
            <Compass size={14} className="animate-spin" /> GPS 신호 정상 수신 중
          </div>

          {/* Render Job Pin Markers */}
          {mockMapJobs.map((job) => {
            const isSelected = selectedJob?.id === job.id;
            return (
              <div
                key={job.id}
                onClick={() => setSelectedJob(job)}
                style={{
                  position: 'absolute',
                  left: `${job.lng}px`,
                  top: `${job.lat}px`,
                  transform: 'translate(-50%, -100%)',
                  cursor: 'pointer',
                  zIndex: isSelected ? 99 : 5,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}
              >
                {/* Marker label */}
                <div style={{
                  background: isSelected ? '#db2777' : '#1f2937',
                  color: '#ffffff',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontSize: '11px',
                  fontWeight: 900,
                  whiteSpace: 'nowrap',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
                  border: isSelected ? '1px solid #ffffff' : '1px solid #db2777',
                  marginBottom: '2px'
                }}>
                  {job.companyName}
                </div>
                
                {/* Pin Icon */}
                <MapPin size={32} color={isSelected ? '#db2777' : '#f472b6'} style={{
                  filter: isSelected ? 'drop-shadow(0 0 8px #db2777)' : 'none'
                }} />
              </div>
            );
          })}

          {/* Map Overlay Popup Card when a pin is selected */}
          {selectedJob && (
            <div style={{
              position: 'absolute',
              bottom: '30px',
              left: '50%',
              transform: 'translateX(-50%)',
              background: '#111827',
              border: '2px solid #db2777',
              borderRadius: '8px',
              width: '340px',
              padding: '16px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
              zIndex: 999
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                <span style={{ background: '#db2777', color: '#ffffff', fontSize: '10.5px', fontWeight: 900, padding: '2px 6px', borderRadius: '12px' }}>
                  {selectedJob.category} [인증완료]
                </span>
                <button
                  onClick={() => setSelectedJob(null)}
                  style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '16px', cursor: 'pointer' }}
                >
                  ✕
                </button>
              </div>
              <h3 style={{ margin: '0 0 6px 0', fontSize: '16px', fontWeight: '900', color: '#ffffff' }}>
                {selectedJob.companyName}
              </h3>
              <p style={{ margin: '0 0 10px 0', fontSize: '13px', color: '#cbd5e1' }}>
                {selectedJob.title}
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #1f2937', paddingTop: '10px' }}>
                <span style={{ fontSize: '14.5px', color: '#facc15', fontWeight: 900 }}>
                  {selectedJob.pay}
                </span>
                <Link href={`/job/${selectedJob.id}`} style={{
                  background: '#db2777',
                  color: '#ffffff',
                  textDecoration: 'none',
                  borderRadius: '4px',
                  padding: '6px 12px',
                  fontSize: '12.5px',
                  fontWeight: 900
                }}>
                  공고 보기 ➔
                </Link>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
