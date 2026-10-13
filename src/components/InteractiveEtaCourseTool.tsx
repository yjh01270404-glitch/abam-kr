'use client';

import React, { useState } from 'react';

type AreaItem = {
  name: string;
  region: 'seoul' | 'gyeonggi';
  eta: string;
  managers: number;
  highlight: string;
};

const AREAS: AreaItem[] = [
  { name: '강남구', region: 'seoul', eta: '20~25분', managers: 4, highlight: '테헤란로·역삼·논현 즉시 배차' },
  { name: '서초구', region: 'seoul', eta: '20~25분', managers: 3, highlight: '반포·교대·양재 빠른 방문' },
  { name: '송파구', region: 'seoul', eta: '25~30분', managers: 3, highlight: '잠실·문정·가락 전역 1:1 케어' },
  { name: '마포구', region: 'seoul', eta: '20~25분', managers: 3, highlight: '홍대·합정·공덕 호텔/오피스텔' },
  { name: '영등포구', region: 'seoul', eta: '20~25분', managers: 3, highlight: '여의도·당산 비즈니스 안심 출장' },
  { name: '용산구', region: 'seoul', eta: '20~25분', managers: 2, highlight: '이태원·한남·용산역 프라이빗' },
  { name: '성동/광진', region: 'seoul', eta: '25~30분', managers: 2, highlight: '성수·건대 상권 30분 도착' },
  { name: '종로/중구', region: 'seoul', eta: '20~25분', managers: 3, highlight: '명동·을지로·광화문 호텔 투숙객' },
  { name: '강서/양천', region: 'seoul', eta: '25~30분', managers: 2, highlight: '마곡 R&D·목동 아파트 단지' },
  { name: '구로/금천', region: 'seoul', eta: '25~30분', managers: 2, highlight: '구디·가디 IT 직장인 심야 케어' },
  
  { name: '수원시', region: 'gyeonggi', eta: '25~35분', managers: 4, highlight: '인계동·영통·광교 즉시 방문' },
  { name: '성남/분당', region: 'gyeonggi', eta: '20~30분', managers: 3, highlight: '판교 테크노밸리·정자·서현' },
  { name: '화성/동탄', region: 'gyeonggi', eta: '25~35분', managers: 3, highlight: '동탄 1·2신도시 전역 빠른 배차' },
  { name: '평택시', region: 'gyeonggi', eta: '30~40분', managers: 3, highlight: '고덕·송탄·평택역 안심 후불제' },
  { name: '고양/일산', region: 'gyeonggi', eta: '25~35분', managers: 3, highlight: '킨텍스·백석·정발산 프라이빗' },
  { name: '부천시', region: 'gyeonggi', eta: '20~30분', managers: 3, highlight: '신중동·상동·부천역 대면결제' },
  { name: '안양/군포', region: 'gyeonggi', eta: '25~35분', managers: 2, highlight: '평촌·범계·산본 자택/호텔' },
  { name: '용인시', region: 'gyeonggi', eta: '25~35분', managers: 2, highlight: '수지·기흥·처인구 정찰제 케어' },
];

export default function InteractiveEtaCourseTool() {
  const [tab, setTab] = useState<'eta' | 'quiz'>('eta');
  const [selectedArea, setSelectedArea] = useState<AreaItem>(AREAS[0]);

  // Quiz State
  const [qSymptom, setQSymptom] = useState<string>('shoulder');
  const [qPressure, setQPressure] = useState<string>('strong');

  const getRecommendedCourse = () => {
    if (qPressure === 'soft') {
      return {
        name: 'B코스 · 천연 아로마 테라피',
        tag: '림프 순환 & 깊은 숙면 유도',
        desc: '최고급 천연 식물성 에센셜 오일을 사용하여 전신 림프를 자극하고 근육을 부드럽게 이완시키는 릴렉싱 코스입니다.',
        price: '60분 9만원 / 90분 11만원 / 120분 14만원',
        recommendTime: '90분 코스 추천 (고객 선호도 1위)',
        code: 'B',
      };
    }
    if (qPressure === 'mix' || qSymptom === 'all') {
      return {
        name: 'C코스 · VIP 스페셜 올케어',
        tag: '👑 시원한 지압 + 부드러운 아로마 복합 케어',
        desc: '전통 건식 지압으로 굳은 척추·골반을 시원하게 풀고, 천연 아로마 오일로 전신 피로를 사르르 녹여주는 종합 테라피입니다.',
        price: '60분 10만원 / 90분 12만원 / 120분 16만원',
        recommendTime: '90분 또는 120분 코스 추천',
        code: 'C',
      };
    }
    return {
      name: 'A코스 · 정통 건식 타이 수기 지압',
      tag: '뭉친 어깨·허리 피로 타파',
      desc: '오일 없이 왓포 전통 방식으로 인체 에너지 라인을 따라 깊은 압으로 뭉친 결림을 완벽하게 풀어주는 정통 지압 코스입니다.',
      price: '60분 8만원 / 90분 10만원 / 120분 12만원',
      recommendTime: '90분 코스 추천 (가장 시원한 압)',
      code: 'A',
    };
  };

  const rec = getRecommendedCourse();
  const etaSmsHref = `sms:01066072239?body=${encodeURIComponent(
    `[아밤 예약신청]\n- 희망지역: ${selectedArea.name}\n- 코스: 타이 or 아로마 (상담)\n- 희망시간: 바로 or 시간 조율\n100% 현장후불제로 신청합니다.`
  )}`;
  const quizSmsHref = `sms:01066072239?body=${encodeURIComponent(
    `[아밤 맞춤추천 예약]\n- 추천코스: ${rec.name}\n- 증상: ${qSymptom === 'shoulder' ? '어깨/목 뭉침' : qSymptom === 'legs' ? '하체부종/피로' : '전신 극심한 피로'}\n- 결제: 100% 현장후불제\n신청합니다.`
  )}`;

  return (
    <div style={{ margin: '28px 12px 36px', background: '#12141c', border: '1px solid #282b36', borderRadius: '14px', overflow: 'hidden', boxShadow: '0 12px 36px rgba(0,0,0,0.6)' }}>
      {/* 상단 탭 스위처 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', background: '#0e1017', borderBottom: '1px solid #282b36' }}>
        <button
          onClick={() => setTab('eta')}
          style={{
            padding: '14px 10px',
            border: 'none',
            background: tab === 'eta' ? '#181b26' : 'transparent',
            color: tab === 'eta' ? '#fef08a' : '#94a3b8',
            fontSize: '14.5px',
            fontWeight: 800,
            cursor: 'pointer',
            borderBottom: tab === 'eta' ? '2.5px solid #f59e0b' : '2.5px solid transparent',
            transition: 'all 0.15s',
          }}
        >
          📍 실시간 도착시간 조회
        </button>
        <button
          onClick={() => setTab('quiz')}
          style={{
            padding: '14px 10px',
            border: 'none',
            background: tab === 'quiz' ? '#181b26' : 'transparent',
            color: tab === 'quiz' ? '#fef08a' : '#94a3b8',
            fontSize: '14.5px',
            fontWeight: 800,
            cursor: 'pointer',
            borderBottom: tab === 'quiz' ? '2.5px solid #f59e0b' : '2.5px solid transparent',
            transition: 'all 0.15s',
          }}
        >
          🎯 3초 맞춤 코스 진단기
        </button>
      </div>

      {/* 탭 1: 실시간 도착시간 & 예약 배차 현황 */}
      {tab === 'eta' && (
        <div style={{ padding: '20px 18px' }}>
          <div style={{ fontSize: '13px', color: '#f59e0b', fontWeight: 800, letterSpacing: '0.05em', marginBottom: '4px' }}>
            REAL-TIME DISPATCH MONITOR
          </div>
          <h3 style={{ fontSize: '19px', fontWeight: 900, color: '#ffffff', margin: '0 0 14px' }}>
            내 위치 기준 매니저 실시간 도착시간
          </h3>

          {/* 지역 선택 칩 버튼들 */}
          <div style={{ fontSize: '12.5px', color: '#94a3b8', marginBottom: '8px' }}>방문 희망 지역을 선택하세요:</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '18px' }}>
            {AREAS.map((a) => (
              <button
                key={a.name}
                onClick={() => setSelectedArea(a)}
                style={{
                  padding: '6px 11px',
                  borderRadius: '6px',
                  fontSize: '13px',
                  fontWeight: selectedArea.name === a.name ? 800 : 500,
                  cursor: 'pointer',
                  border: `1px solid ${selectedArea.name === a.name ? '#f59e0b' : '#282b36'}`,
                  background: selectedArea.name === a.name ? 'rgba(245, 158, 11, 0.18)' : '#181b24',
                  color: selectedArea.name === a.name ? '#fef08a' : '#cbd5e1',
                  transition: 'all 0.12s',
                }}
              >
                {a.name}
              </button>
            ))}
          </div>

          {/* 실시간 현황 디스플레이 카드 */}
          <div style={{ background: '#181b26', border: '1px solid #33384a', borderRadius: '10px', padding: '16px 18px', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px', borderBottom: '1px solid #282b36', paddingBottom: '10px' }}>
              <div>
                <span style={{ fontSize: '18px', fontWeight: 900, color: '#ffffff' }}>{selectedArea.name}</span>
                <span style={{ fontSize: '12.5px', color: '#10b981', marginLeft: '8px', fontWeight: 700 }}>● 실시간 출발 가능</span>
              </div>
              <div style={{ fontSize: '12.5px', color: '#94a3b8' }}>
                대기 매니저: <strong style={{ color: '#fef08a', fontSize: '15px' }}>{selectedArea.managers}명</strong>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '12px' }}>
              <div style={{ background: '#10121a', padding: '10px 12px', borderRadius: '8px', border: '1px solid #282b36' }}>
                <div style={{ fontSize: '11.5px', color: '#94a3b8' }}>예상 도착 소요시간</div>
                <div style={{ fontSize: '20px', fontWeight: 900, color: '#f59e0b', marginTop: '2px' }}>{selectedArea.eta}</div>
              </div>
              <div style={{ background: '#10121a', padding: '10px 12px', borderRadius: '8px', border: '1px solid #282b36' }}>
                <div style={{ fontSize: '11.5px', color: '#94a3b8' }}>안심 결제 원칙</div>
                <div style={{ fontSize: '15px', fontWeight: 900, color: '#10b981', marginTop: '4px' }}>100% 현장후불제</div>
              </div>
            </div>

            <div style={{ fontSize: '12.5px', color: '#cbd5e1', lineHeight: 1.5 }}>
              💡 <strong>지역 특성:</strong> {selectedArea.highlight} · 예약 18:00부터 · 매니저 출발 19:00부터
            </div>
          </div>

          {/* 원터치 예약 링크 */}
          <a
            href={etaSmsHref}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              width: '100%',
              padding: '14px 0',
              background: '#e11d48',
              color: '#ffffff',
              fontSize: '15px',
              fontWeight: 800,
              textDecoration: 'none',
              borderRadius: '8px',
              boxShadow: '0 4px 14px rgba(225, 29, 72, 0.4)',
              boxSizing: 'border-box',
            }}
          >
            <span>📱</span> {selectedArea.name} {selectedArea.eta} 방문 예약 문자 보내기
          </a>
        </div>
      )}

      {/* 탭 2: 3초 맞춤 코스 진단기 */}
      {tab === 'quiz' && (
        <div style={{ padding: '20px 18px' }}>
          <div style={{ fontSize: '13px', color: '#f59e0b', fontWeight: 800, letterSpacing: '0.05em', marginBottom: '4px' }}>
            AI BODY THERAPY DIAGNOSTIC
          </div>
          <h3 style={{ fontSize: '19px', fontWeight: 900, color: '#ffffff', margin: '0 0 14px' }}>
            나에게 딱 맞는 1:1 테라피 코스 찾기
          </h3>

          {/* 질문 1: 불편한 부위 */}
          <div style={{ marginBottom: '14px' }}>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#e2e8f0', marginBottom: '6px' }}>
              Q1. 오늘 가장 풀고 싶은 피로 부위는?
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '6px' }}>
              {[
                { id: 'shoulder', label: '어깨·목 결림' },
                { id: 'legs', label: '하체 부종·순환' },
                { id: 'all', label: '전신 극심한 피로' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setQSymptom(item.id)}
                  style={{
                    padding: '8px 4px',
                    fontSize: '12.5px',
                    fontWeight: qSymptom === item.id ? 800 : 500,
                    borderRadius: '6px',
                    border: `1px solid ${qSymptom === item.id ? '#f59e0b' : '#282b36'}`,
                    background: qSymptom === item.id ? 'rgba(245, 158, 11, 0.18)' : '#181b24',
                    color: qSymptom === item.id ? '#fef08a' : '#94a3b8',
                    cursor: 'pointer',
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* 질문 2: 선호 관리 방식 */}
          <div style={{ marginBottom: '18px' }}>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#e2e8f0', marginBottom: '6px' }}>
              Q2. 선호하는 테라피 압(Intensity) 스타일은?
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '6px' }}>
              {[
                { id: 'strong', label: '시원하고 강한 압' },
                { id: 'soft', label: '부드러운 오일' },
                { id: 'mix', label: '지압+오일 복합' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setQPressure(item.id)}
                  style={{
                    padding: '8px 4px',
                    fontSize: '12.5px',
                    fontWeight: qPressure === item.id ? 800 : 500,
                    borderRadius: '6px',
                    border: `1px solid ${qPressure === item.id ? '#f59e0b' : '#282b36'}`,
                    background: qPressure === item.id ? 'rgba(245, 158, 11, 0.18)' : '#181b24',
                    color: qPressure === item.id ? '#fef08a' : '#94a3b8',
                    cursor: 'pointer',
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* 추천 결과 카드 */}
          <div style={{ background: '#181b26', border: '1.5px solid #f59e0b', borderRadius: '10px', padding: '16px 18px', marginBottom: '16px' }}>
            <div style={{ display: 'inline-block', background: '#f59e0b', color: '#1a1204', fontSize: '11px', fontWeight: 900, padding: '2px 8px', borderRadius: '4px', marginBottom: '6px' }}>
              {rec.tag}
            </div>
            <div style={{ fontSize: '18px', fontWeight: 900, color: '#ffffff', marginBottom: '6px' }}>
              {rec.name}
            </div>
            <p style={{ fontSize: '13px', color: '#cbd5e1', lineHeight: 1.6, margin: '0 0 10px' }}>
              {rec.desc}
            </p>
            <div style={{ borderTop: '1px solid #282b36', paddingTop: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12.5px' }}>
              <span style={{ color: '#94a3b8' }}>{rec.recommendTime}</span>
              <strong style={{ color: '#fef08a', fontSize: '13.5px' }}>{rec.price.split('/')[1]?.trim() || rec.price}</strong>
            </div>
          </div>

          {/* 맞춤 예약 버튼 */}
          <a
            href={quizSmsHref}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              width: '100%',
              padding: '14px 0',
              background: '#e11d48',
              color: '#ffffff',
              fontSize: '15px',
              fontWeight: 800,
              textDecoration: 'none',
              borderRadius: '8px',
              boxShadow: '0 4px 14px rgba(225, 29, 72, 0.4)',
              boxSizing: 'border-box',
            }}
          >
            <span>✨</span> 이 맞춤 코스로 1초 문자 예약하기 (현장후불제)
          </a>
        </div>
      )}
    </div>
  );
}
