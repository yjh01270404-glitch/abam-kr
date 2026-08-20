'use client';

import React, { useState } from 'react';
import { Bot, Sparkles, MapPin, Send, ShieldCheck } from 'lucide-react';
import JobMatchScoreCard from './JobMatchScoreCard';

const REGIONS = ['강남/역삼', '홍대/신촌', '수원/인계', '인천/부평', '부산/해운대', '대구/동성로', '대전/둔산', '광주/상무'];
const CATEGORIES = ['하이퍼블릭', '프리미엄 살롱/하이엔드 스튜디오', '프라이빗 라운지', '클래식/모던바', '라이브 카페', '노래방바'];
const PAY_OPTIONS = ['일 20만원 이상', '일 30만원 이상', '일 50만원 이상', '시급 6만원 이상', '월 1,000만원 이상'];

interface Recommendation {
  id: number;
  title: string;
  pay: string;
  benefits: string[];
  location: string;
  trustBadge: string;
}

export default function AbamAiMatchAssistant() {
  const [selectedRegion, setSelectedRegion] = useState<string>(REGIONS[0]);
  const [selectedCategory, setSelectedCategory] = useState<string>(CATEGORIES[0]);
  const [desiredPay, setDesiredPay] = useState<string>(PAY_OPTIONS[1]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [recommendations, setRecommendations] = useState<Recommendation[] | null>(null);
  const [statusMsg, setStatusMsg] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);

  const handleMatchSearch = () => {
    if (!selectedRegion || !selectedCategory) {
      setStatusMsg('지역과 업종을 선택해 주세요.');
      setIsError(true);
      return;
    }
    setStatusMsg('');
    setIsError(false);
    setIsSearching(true);
    setRecommendations(null);

    // 실제 서비스에서는 /api/match 엔드포인트로 교체
    setTimeout(() => {
      setRecommendations([
        {
          id: 1,
          title: `[${selectedRegion}] 갤러리 ${selectedCategory}`,
          pay: '급여 협의 (상담 후 결정)',
          benefits: ['당일 급여 지급 협의 가능', '초보 상담 가능', '근로 조건 사전 확인 필수', '만 19세 이상'],
          location: `${selectedRegion} 인근`,
          trustBadge: '아밤 등록 매장'
        },
        {
          id: 2,
          title: `[${selectedRegion}] VIP 라운지`,
          pay: '급여 협의 (면접 후 확정)',
          benefits: ['조건 협의 가능', '만 19세 이상 지원 가능', '사전 계약서 필수 확인', '비밀 유지'],
          location: `${selectedRegion} 중심가`,
          trustBadge: '아밤 공개 채용 정보'
        }
      ]);
      setIsSearching(false);
      setStatusMsg('✅ 조건에 맞는 매장 2건을 찾았습니다. 실제 조건은 반드시 직접 상담으로 확인하세요.');
      setIsError(false);
    }, 800);
  };

  return (
    <div style={{
      background: 'linear-gradient(135deg, rgba(20, 10, 30, 0.95) 0%, rgba(35, 12, 45, 0.98) 100%)',
      border: '1px solid rgba(255, 42, 109, 0.35)',
      borderRadius: '24px',
      padding: '24px',
      margin: '24px 0',
      boxShadow: '0 15px 45px rgba(0,0,0,0.5)',
      color: '#fff'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
        <div style={{
          width: '42px',
          height: '42px',
          borderRadius: '12px',
          background: 'linear-gradient(135deg, #ff2a6d 0%, #7b002c 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 12px rgba(255, 42, 109, 0.5)'
        }}>
          <Bot style={{ width: '22px', height: '22px', color: '#fff' }} />
        </div>
        <div>
          <h3 style={{ fontSize: '19px', fontWeight: '800', margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
            AI 1:1 맞춤 일자리 매칭 가이드 <Sparkles style={{ width: '16px', height: '16px', color: '#ffd700' }} />
          </h3>
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', margin: '2px 0 0 0' }}>
            희망 지역, 직종, 조건만 선택하면 3초 만에 검증된 안심 일자리를 추천합니다.
          </p>
        </div>
      </div>

      {/* Selectors */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', marginBottom: '16px' }}>
        <div>
          <label style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', display: 'block', marginBottom: '6px' }}>희망 지역</label>
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            style={{
              width: '100%', background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(255, 42, 109, 0.3)',
              borderRadius: '10px', padding: '10px', color: '#fff', outline: 'none', fontSize: '14px'
            }}
          >
            {REGIONS.map(r => <option key={r} value={r} style={{ background: '#190d24' }}>{r}</option>)}
          </select>
        </div>

        <div>
          <label style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', display: 'block', marginBottom: '6px' }}>희망 업종</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{
              width: '100%', background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(255, 42, 109, 0.3)',
              borderRadius: '10px', padding: '10px', color: '#fff', outline: 'none', fontSize: '14px'
            }}
          >
            {CATEGORIES.map(c => <option key={c} value={c} style={{ background: '#190d24' }}>{c}</option>)}
          </select>
        </div>

        <div>
          <label style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', display: 'block', marginBottom: '6px' }}>희망 급여 조건</label>
          <select
            value={desiredPay}
            onChange={(e) => setDesiredPay(e.target.value)}
            style={{
              width: '100%', background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(255, 42, 109, 0.3)',
              borderRadius: '10px', padding: '10px', color: '#ffd700', fontWeight: '700', outline: 'none', fontSize: '14px'
            }}
          >
            {PAY_OPTIONS.map(p => <option key={p} value={p} style={{ background: '#190d24', color: '#fff' }}>{p}</option>)}
          </select>
        </div>
      </div>

      {/* Inline status message - replaces alert() */}
      {statusMsg && (
        <div style={{
          background: isError ? 'rgba(239, 68, 68, 0.12)' : 'rgba(34, 197, 94, 0.12)',
          border: `1px solid ${isError ? 'rgba(239,68,68,0.3)' : 'rgba(34,197,94,0.3)'}`,
          borderRadius: '10px', padding: '10px 14px', marginBottom: '12px',
          fontSize: '13px', color: isError ? '#fca5a5' : '#86efac'
        }}>
          {statusMsg}
        </div>
      )}

      <button
        onClick={handleMatchSearch}
        disabled={isSearching}
        style={{
          width: '100%',
          background: isSearching ? 'rgba(100,40,70,0.7)' : 'linear-gradient(135deg, #ff2a6d 0%, #c2185b 100%)',
          color: '#fff', border: 'none', padding: '14px', borderRadius: '12px',
          fontSize: '16px', fontWeight: '800', cursor: isSearching ? 'not-allowed' : 'pointer',
          boxShadow: '0 4px 15px rgba(255, 42, 109, 0.4)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'all 0.2s ease'
        }}
      >
        {isSearching ? <>⏳ AI 알고리즘 매칭 중...</> : <><Send style={{ width: '18px', height: '18px' }} /> AI 실시간 1:1 맞춤 일자리 매칭하기</>}
      </button>

      <div style={{ marginTop: '12px', fontSize: '11px', color: 'rgba(255,255,255,0.35)', lineHeight: 1.5 }}>
        ※ 표시된 급여 및 조건은 참고 정보이며 실제 근로 조건은 사업장과 직접 확인하시기 바랍니다. 아밤은 광고 플랫폼으로 고용계약의 직접 당사자가 아닙니다.
      </div>

      {/* Results list */}
      {recommendations && (
        <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {recommendations.map((rec) => (
            <div key={rec.id} style={{
              background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255, 215, 0, 0.3)',
              borderRadius: '14px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '6px' }}>
                <span style={{ fontSize: '12px', background: 'rgba(255, 215, 0, 0.15)', color: '#ffd700', padding: '4px 8px', borderRadius: '6px', fontWeight: '700' }}>
                  {rec.trustBadge}
                </span>
                <span style={{ fontSize: '14px', fontWeight: '900', color: '#ff2a6d' }}>{rec.pay}</span>
              </div>
              <h4 style={{ fontSize: '16px', fontWeight: '800', margin: 0, color: '#fff' }}>{rec.title}</h4>
              <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <MapPin style={{ width: '14px', height: '14px', color: '#ff2a6d' }} /> {rec.location}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '4px' }}>
                {rec.benefits.map((b: string, i: number) => (
                  <span key={i} style={{ fontSize: '11px', background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.8)', padding: '3px 8px', borderRadius: '4px' }}>
                    ✓ {b}
                  </span>
                ))}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
                <ShieldCheck style={{ width: '14px', height: '14px', color: '#22c55e', flexShrink: 0 }} />
                <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.45)' }}>실제 조건·급여는 직접 상담으로 확인하세요</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* JobMatchScoreCard — shows after match results */}
      {recommendations && (
        <div style={{ marginTop: '24px' }}>
          <JobMatchScoreCard region={selectedRegion} />
        </div>
      )}
    </div>
  );
}
