'use client';

import React, { useState } from 'react';

interface MatchResult {
  region: string;
  avgDailyWage: number;
  matchScore: number;
  openings: number;
  demand: 'high' | 'medium' | 'low';
  topRoles: string[];
}

const MATCH_DATA: Record<string, MatchResult> = {
  '서울': { region: '서울', avgDailyWage: 280000, matchScore: 94, openings: 1842, demand: 'high', topRoles: ['클럽 MD', 'VIP 룸 서빙', '카지노 딜러'] },
  '부산': { region: '부산', avgDailyWage: 245000, matchScore: 87, openings: 743, demand: 'high', topRoles: ['해운대 바', '해변 클럽', 'VIP 라운지'] },
  '인천': { region: '인천', avgDailyWage: 255000, matchScore: 81, openings: 512, demand: 'medium', topRoles: ['공항 라운지', '호텔 바', '카지노 서비스'] },
  '대구': { region: '대구', avgDailyWage: 230000, matchScore: 76, openings: 384, demand: 'medium', topRoles: ['나이트 클럽', 'KTV', '풀살롱'] },
  '수원': { region: '수원', avgDailyWage: 240000, matchScore: 79, openings: 298, demand: 'medium', topRoles: ['바 서빙', '룸살롱', '가라오케'] },
  '제주': { region: '제주', avgDailyWage: 260000, matchScore: 89, openings: 421, demand: 'high', topRoles: ['리조트 바', '클럽', 'VIP 풀파티'] },
};

const DEMAND_COLOR: Record<string, string> = {
  high: '#10b981', medium: '#f59e0b', low: '#ef4444',
};
const DEMAND_LABEL: Record<string, string> = {
  high: '🔥 수요 높음', medium: '📊 보통', low: '📉 낮음',
};

export default function JobMatchScoreCard({
  region = '서울',
  annualBaseWage = 280000,
}: {
  region?: string;
  annualBaseWage?: number;
}) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [result, setResult] = useState<MatchResult | null>(null);
  const [selectedRegion, setSelectedRegion] = useState(region);

  const handleMatch = () => {
    setIsAnimating(true);
    setResult(null);
    setTimeout(() => {
      setResult(MATCH_DATA[selectedRegion] ?? MATCH_DATA['서울']);
      setIsAnimating(false);
    }, 1400);
  };

  const r = result;

  // SVG circular gauge
  const CircleGauge = ({ score }: { score: number }) => {
    const R = 42;
    const C = 2 * Math.PI * R;
    const filled = (score / 100) * C;
    const color = score >= 90 ? '#10b981' : score >= 75 ? '#f59e0b' : '#ef4444';
    return (
      <svg width="110" height="110" viewBox="0 0 110 110">
        <circle cx="55" cy="55" r={R} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="10" />
        <circle
          cx="55" cy="55" r={R} fill="none"
          stroke={color} strokeWidth="10"
          strokeDasharray={`${filled} ${C - filled}`}
          strokeLinecap="round"
          transform="rotate(-90 55 55)"
          style={{ transition: 'stroke-dasharray 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
        />
        <text x="55" y="52" textAnchor="middle" fill="#fff" fontSize="20" fontWeight="800">{score}</text>
        <text x="55" y="66" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9">/ 100</text>
      </svg>
    );
  };

  // Spark bar chart
  const SparkBar = ({ label, val, max, color }: { label: string; val: number; max: number; color: string }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
      <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', minWidth: '70px' }}>{label}</span>
      <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.07)', borderRadius: '3px', overflow: 'hidden' }}>
        <div style={{
          width: `${(val / max) * 100}%`, height: '100%',
          background: `linear-gradient(90deg, ${color}88, ${color})`,
          borderRadius: '3px',
          transition: 'width 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
        }} />
      </div>
      <span style={{ fontSize: '11px', color, fontWeight: '700', minWidth: '50px', textAlign: 'right' }}>
        {val.toLocaleString()}건
      </span>
    </div>
  );

  return (
    <div style={{
      background: 'linear-gradient(135deg, rgba(15,23,42,0.97), rgba(30,27,75,0.97))',
      border: '1px solid rgba(139,92,246,0.25)',
      borderRadius: '24px',
      padding: '24px',
      boxShadow: '0 0 40px rgba(139,92,246,0.1)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
        <div style={{
          width: '36px', height: '36px', borderRadius: '10px',
          background: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '18px',
        }}>🤖</div>
        <div>
          <h3 style={{ fontSize: '14px', fontWeight: '800', color: '#e2e8f0', margin: 0 }}>
            AI 1:1 실시간 매칭 스코어카드
          </h3>
          <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', margin: 0 }}>지역별 수요·평균 일급·공고 수 분석</p>
        </div>
      </div>

      {/* Region Selector */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
        {Object.keys(MATCH_DATA).map(reg => (
          <button
            key={reg}
            onClick={() => setSelectedRegion(reg)}
            style={{
              padding: '4px 12px', fontSize: '12px', borderRadius: '20px',
              border: selectedRegion === reg ? '1px solid #8b5cf6' : '1px solid rgba(255,255,255,0.1)',
              background: selectedRegion === reg ? 'rgba(139,92,246,0.25)' : 'rgba(255,255,255,0.04)',
              color: selectedRegion === reg ? '#c4b5fd' : 'rgba(255,255,255,0.5)',
              cursor: 'pointer', fontWeight: selectedRegion === reg ? '700' : '400',
              transition: 'all 0.2s',
            }}
          >
            {reg}
          </button>
        ))}
      </div>

      {/* Match Button */}
      <button
        onClick={handleMatch}
        disabled={isAnimating}
        style={{
          width: '100%', padding: '12px',
          background: isAnimating
            ? 'rgba(139,92,246,0.3)'
            : 'linear-gradient(135deg, #8b5cf6, #ec4899)',
          border: 'none', borderRadius: '14px',
          color: '#fff', fontSize: '13px', fontWeight: '800',
          cursor: isAnimating ? 'not-allowed' : 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
          boxShadow: isAnimating ? 'none' : '0 4px 20px rgba(139,92,246,0.4)',
          transition: 'all 0.2s', marginBottom: '16px',
        }}
      >
        {isAnimating ? (
          <>
            <span style={{ display: 'inline-block', animation: 'spin 1s linear infinite' }}>⟳</span>
            AI 매칭 분석 중...
          </>
        ) : '🚀 AI 실시간 1:1 맞춤 일자리 매칭하기'}
      </button>

      {/* Result */}
      {r && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Score + Stats Row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
            <CircleGauge score={r.matchScore} />
            <div style={{ flex: 1, minWidth: '180px' }}>
              <div style={{
                fontSize: '22px', fontWeight: '900', color: '#fff', marginBottom: '4px',
                background: 'linear-gradient(90deg, #c4b5fd, #f9a8d4)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>
                {r.avgDailyWage.toLocaleString()}원
              </div>
              <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', marginBottom: '8px' }}>
                {r.region} 평균 일급 · 현재 공고 {r.openings.toLocaleString()}건
              </div>
              <span style={{
                fontSize: '11px', color: DEMAND_COLOR[r.demand],
                background: `${DEMAND_COLOR[r.demand]}22`,
                border: `1px solid ${DEMAND_COLOR[r.demand]}44`,
                borderRadius: '6px', padding: '3px 8px', fontWeight: '700',
              }}>
                {DEMAND_LABEL[r.demand]}
              </span>
            </div>
          </div>

          {/* Demand Chart */}
          <div>
            <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', marginBottom: '8px', fontWeight: '600' }}>
              📊 인접 지역 공고 현황 비교
            </p>
            {Object.values(MATCH_DATA).slice(0, 4).map((d) => (
              <SparkBar key={d.region} label={d.region} val={d.openings} max={2000} color={d.region === r.region ? '#8b5cf6' : '#60a5fa'} />
            ))}
          </div>

          {/* Top Roles */}
          <div>
            <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', marginBottom: '8px', fontWeight: '600' }}>
              🎯 {r.region} 추천 포지션
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {r.topRoles.map(role => (
                <span key={role} style={{
                  fontSize: '11px', padding: '4px 10px',
                  background: 'rgba(139,92,246,0.15)',
                  border: '1px solid rgba(139,92,246,0.3)',
                  borderRadius: '8px', color: '#c4b5fd', fontWeight: '600',
                }}>{role}</span>
              ))}
            </div>
          </div>

          {/* Annual estimate */}
          <div style={{
            background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)',
            borderRadius: '12px', padding: '12px 14px',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)' }}>📅 연간 예상 수익 (주 5일 기준)</span>
            <span style={{ fontSize: '16px', fontWeight: '900', color: '#34d399' }}>
              {(r.avgDailyWage * 5 * 52).toLocaleString()}원
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
