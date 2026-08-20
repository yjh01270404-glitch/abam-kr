'use client';
import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
  AdTier,
  PostedAd,
  getPostedAds,
  addPostedAd,
  deletePostedAd,
  useJump,
  getRemainingJumps,
  JUMP_LIMITS,
  TIER_LABELS,
  TIER_COLORS,
} from '../../../../lib/recruiterStore';

const TIER_BG: Record<AdTier, string> = {
  vvip:    'linear-gradient(135deg,#4c1d95,#7c3aed)',
  grand:   'linear-gradient(135deg,#831843,#be185d)',
  premium: 'linear-gradient(135deg,#1e1b4b,#312e81)',
  line:    'linear-gradient(135deg,#1f2937,#374151)',
};

const TIER_BADGE_COLOR: Record<AdTier, string> = {
  vvip:    '#a78bfa',
  grand:   '#f9a8d4',
  premium: '#818cf8',
  line:    '#9ca3af',
};

export default function AdManagePage() {
  const [ads, setAds] = useState<PostedAd[]>([]);
  const [remaining, setRemaining] = useState<Record<AdTier, number>>({
    vvip: JUMP_LIMITS.vvip,
    grand: JUMP_LIMITS.grand,
    premium: JUMP_LIMITS.premium,
    line: JUMP_LIMITS.line,
  });
  const [jumpMsg, setJumpMsg] = useState<string>('');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    companyName: '',
    tier: 'premium' as AdTier,
    title: '',
    location: '',
    pay: '',
    tag: '',
  });

  const refresh = useCallback(() => {
    setAds(getPostedAds());
    setRemaining({
      vvip: getRemainingJumps('vvip'),
      grand: getRemainingJumps('grand'),
      premium: getRemainingJumps('premium'),
      line: getRemainingJumps('line'),
    });
  }, []);

  useEffect(() => {
    refresh();
    const handler = () => refresh();
    window.addEventListener('abam-ad-update', handler);
    return () => window.removeEventListener('abam-ad-update', handler);
  }, [refresh]);

  function handleJump(tier: AdTier) {
    const ok = useJump(tier);
    if (ok) {
      setJumpMsg(`✅ ${TIER_LABELS[tier]} 등급 광고가 최상단으로 점프되었습니다!`);
    } else {
      setJumpMsg(`❌ 오늘 ${TIER_LABELS[tier]} 점프 횟수(${JUMP_LIMITS[tier]}회)를 모두 사용했습니다.`);
    }
    refresh();
    setTimeout(() => setJumpMsg(''), 3500);
  }

  function handlePost(e: React.FormEvent) {
    e.preventDefault();
    if (!form.companyName.trim() || !form.title.trim()) return;
    addPostedAd({
      companyName: form.companyName.trim(),
      tier: form.tier,
      title: form.title.trim(),
      location: form.location.trim() || '서울 강남구',
      pay: form.pay.trim() || '협의',
      tag: form.tag.trim(),
    });
    setForm({ companyName: '', tier: 'premium', title: '', location: '', pay: '', tag: '' });
    setShowForm(false);
    setJumpMsg('🎉 새 광고가 해당 등급 섹션 최상단에 게시되었습니다!');
    setTimeout(() => setJumpMsg(''), 3500);
  }

  function handleDelete(id: string) {
    if (confirm('이 광고를 삭제하시겠습니까?')) {
      deletePostedAd(id);
      refresh();
    }
  }

  const tierGroups = (['vvip', 'grand', 'premium', 'line'] as AdTier[]);

  return (
    <div style={{ minHeight: '100vh', background: '#0f0a1e', color: '#f9fafb', fontFamily: "'Pretendard', sans-serif", padding: '0 0 80px' }}>
      {/* 헤더 */}
      <div style={{
        background: 'linear-gradient(135deg,#1e1b4b 0%,#312e81 50%,#4c1d95 100%)',
        padding: '28px 32px 24px',
        borderBottom: '1px solid rgba(167,139,250,0.2)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: 900, margin: '0 auto' }}>
          <div>
            <Link href="/" style={{ color: '#a78bfa', fontSize: 13, textDecoration: 'none' }}>← 메인으로</Link>
            <h1 style={{ margin: '8px 0 4px', fontSize: 24, fontWeight: 900, color: '#fff' }}>
              🌙 광고 관리 센터
            </h1>
            <p style={{ margin: 0, fontSize: 13, color: 'rgba(200,180,255,0.75)' }}>
              등록된 광고를 관리하고 점프 기능으로 최상단에 노출하세요
            </p>
          </div>
          <button
            onClick={() => setShowForm(v => !v)}
            style={{
              background: 'linear-gradient(135deg,#be185d,#7c3aed)',
              color: '#fff', border: 'none', borderRadius: 12,
              padding: '12px 22px', fontSize: 14, fontWeight: 800,
              cursor: 'pointer', boxShadow: '0 4px 16px rgba(124,58,237,0.4)',
            }}
          >
            + 새 광고 등록
          </button>
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 20px' }}>
        {/* 메시지 */}
        {jumpMsg && (
          <div style={{
            margin: '20px 0 0',
            background: jumpMsg.startsWith('✅') || jumpMsg.startsWith('🎉')
              ? 'rgba(16,185,129,0.15)' : 'rgba(239,68,68,0.15)',
            border: jumpMsg.startsWith('✅') || jumpMsg.startsWith('🎉')
              ? '1px solid rgba(16,185,129,0.4)' : '1px solid rgba(239,68,68,0.4)',
            borderRadius: 10, padding: '14px 20px', fontSize: 14, fontWeight: 700,
            color: jumpMsg.startsWith('✅') || jumpMsg.startsWith('🎉') ? '#6ee7b7' : '#fca5a5',
          }}>
            {jumpMsg}
          </div>
        )}

        {/* 새 광고 등록 폼 */}
        {showForm && (
          <div style={{
            marginTop: 24,
            background: 'rgba(30,27,75,0.7)',
            border: '1px solid rgba(167,139,250,0.25)',
            borderRadius: 16, padding: '24px',
            backdropFilter: 'blur(10px)',
          }}>
            <h2 style={{ margin: '0 0 20px', fontSize: 18, fontWeight: 900, color: '#c4b5fd' }}>
              📝 새 광고 등록
            </h2>
            <form onSubmit={handlePost}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
                <label style={labelStyle}>
                  <span style={labelTextStyle}>상호명 *</span>
                  <input
                    style={inputStyle}
                    value={form.companyName}
                    onChange={e => setForm(f => ({ ...f, companyName: e.target.value }))}
                    placeholder="업소명을 입력하세요"
                    required
                  />
                </label>
                <label style={labelStyle}>
                  <span style={labelTextStyle}>등급 *</span>
                  <select
                    style={inputStyle}
                    value={form.tier}
                    onChange={e => setForm(f => ({ ...f, tier: e.target.value as AdTier }))}
                  >
                    <option value="vvip">VVIP</option>
                    <option value="grand">GRAND VIP</option>
                    <option value="premium">PREMIUM</option>
                    <option value="line">줄광고</option>
                  </select>
                </label>
                <label style={labelStyle}>
                  <span style={labelTextStyle}>광고 제목 *</span>
                  <input
                    style={inputStyle}
                    value={form.title}
                    onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                    placeholder="예: [급구] 초보환영 당일지급"
                    required
                  />
                </label>
                <label style={labelStyle}>
                  <span style={labelTextStyle}>지역</span>
                  <input
                    style={inputStyle}
                    value={form.location}
                    onChange={e => setForm(f => ({ ...f, location: e.target.value }))}
                    placeholder="예: 서울 강남구"
                  />
                </label>
                <label style={labelStyle}>
                  <span style={labelTextStyle}>급여</span>
                  <input
                    style={inputStyle}
                    value={form.pay}
                    onChange={e => setForm(f => ({ ...f, pay: e.target.value }))}
                    placeholder="예: 일급 50만+"
                  />
                </label>
                <label style={labelStyle}>
                  <span style={labelTextStyle}>태그</span>
                  <input
                    style={inputStyle}
                    value={form.tag}
                    onChange={e => setForm(f => ({ ...f, tag: e.target.value }))}
                    placeholder="예: #단기 #초보가능"
                  />
                </label>
              </div>
              <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
                <button type="button" onClick={() => setShowForm(false)}
                  style={{ ...btnStyle, background: 'rgba(255,255,255,0.08)', color: '#d1d5db' }}>
                  취소
                </button>
                <button type="submit"
                  style={{ ...btnStyle, background: 'linear-gradient(135deg,#be185d,#7c3aed)', color: '#fff' }}>
                  📢 게시하기
                </button>
              </div>
            </form>
          </div>
        )}

        {/* 점프 현황 패널 */}
        <div style={{ marginTop: 28 }}>
          <h2 style={{ margin: '0 0 16px', fontSize: 16, fontWeight: 900, color: '#e2d9ff' }}>
            ⚡ 오늘의 점프 현황
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
            {tierGroups.map(tier => {
              const rem = remaining[tier];
              const total = JUMP_LIMITS[tier];
              const pct = ((total - rem) / total) * 100;
              return (
                <div key={tier} style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: `1px solid ${TIER_BADGE_COLOR[tier]}30`,
                  borderRadius: 14, padding: '16px 14px',
                  textAlign: 'center',
                }}>
                  <div style={{
                    display: 'inline-block',
                    background: TIER_BG[tier],
                    color: '#fff', fontSize: 11, fontWeight: 900,
                    padding: '3px 10px', borderRadius: 20, marginBottom: 10,
                  }}>
                    {TIER_LABELS[tier]}
                  </div>
                  <div style={{ fontSize: 28, fontWeight: 900, color: rem > 0 ? '#a78bfa' : '#6b7280' }}>
                    {rem}<span style={{ fontSize: 14, color: '#6b7280' }}>/{total}</span>
                  </div>
                  <div style={{ fontSize: 11, color: '#6b7280', marginBottom: 10 }}>잔여 횟수</div>
                  {/* 진행바 */}
                  <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: 4, height: 4, marginBottom: 12 }}>
                    <div style={{
                      width: `${pct}%`, height: '100%',
                      background: TIER_BADGE_COLOR[tier],
                      borderRadius: 4, transition: 'width 0.3s',
                    }} />
                  </div>
                  <button
                    onClick={() => handleJump(tier)}
                    disabled={rem <= 0}
                    style={{
                      width: '100%',
                      background: rem > 0 ? TIER_BG[tier] : 'rgba(255,255,255,0.05)',
                      color: rem > 0 ? '#fff' : '#6b7280',
                      border: 'none', borderRadius: 8,
                      padding: '8px 0', fontSize: 13, fontWeight: 800,
                      cursor: rem > 0 ? 'pointer' : 'not-allowed',
                      transition: 'all 0.15s',
                    }}
                  >
                    {rem > 0 ? '⬆ 점프하기' : '소진'}
                  </button>
                </div>
              );
            })}
          </div>
          <p style={{ fontSize: 12, color: '#6b7280', marginTop: 10 }}>
            * 점프 횟수는 매일 00:00에 초기화됩니다. 점프 시 해당 등급의 모든 게시글이 한 번에 최상단으로 이동합니다.
          </p>
        </div>

        {/* 게시된 광고 목록 */}
        <div style={{ marginTop: 32 }}>
          <h2 style={{ margin: '0 0 16px', fontSize: 16, fontWeight: 900, color: '#e2d9ff' }}>
            📋 내 게시 광고 ({ads.length}건)
          </h2>

          {ads.length === 0 ? (
            <div style={{
              textAlign: 'center', padding: '60px 20px',
              background: 'rgba(255,255,255,0.03)',
              border: '1px dashed rgba(255,255,255,0.1)',
              borderRadius: 16, color: '#6b7280',
            }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>📭</div>
              <div style={{ fontSize: 15, fontWeight: 700 }}>등록된 광고가 없습니다</div>
              <div style={{ fontSize: 13, marginTop: 6 }}>위의 "새 광고 등록" 버튼으로 첫 광고를 게시해보세요!</div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {ads.map((ad, idx) => {
                const isJumped = ad.jumpedAt > 0 && (Date.now() - ad.jumpedAt) < 24 * 60 * 60 * 1000;
                const postedDate = new Date(ad.postedAt).toLocaleDateString('ko-KR');
                return (
                  <div key={ad.id} style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: isJumped
                      ? `1px solid ${TIER_BADGE_COLOR[ad.tier]}60`
                      : '1px solid rgba(255,255,255,0.06)',
                    borderRadius: 12, padding: '14px 18px',
                    display: 'flex', alignItems: 'center', gap: 14,
                    boxShadow: isJumped ? `0 0 12px ${TIER_BADGE_COLOR[ad.tier]}20` : 'none',
                    position: 'relative',
                  }}>
                    {/* 순위 */}
                    <div style={{
                      width: 28, height: 28, borderRadius: '50%',
                      background: idx === 0 ? 'linear-gradient(135deg,#f59e0b,#ef4444)' : 'rgba(255,255,255,0.08)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 12, fontWeight: 900, color: idx === 0 ? '#fff' : '#6b7280',
                      flexShrink: 0,
                    }}>{idx + 1}</div>
                    {/* 등급 배지 */}
                    <div style={{
                      background: TIER_BG[ad.tier],
                      color: '#fff', fontSize: 10, fontWeight: 900,
                      padding: '3px 8px', borderRadius: 12, flexShrink: 0,
                    }}>
                      {TIER_LABELS[ad.tier]}
                    </div>
                    {/* 내용 */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 14, fontWeight: 800, color: '#f9fafb', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {ad.companyName}
                      </div>
                      <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {ad.title} · {ad.location} · {ad.pay}
                      </div>
                    </div>
                    {/* D-Day 남은 기간 배지 */}
                    {(() => {
                      const created = ad.postedAt ? new Date(ad.postedAt).getTime() : Date.now();
                      const expTime = created + (30 * 24 * 60 * 60 * 1000);
                      const diffDays = Math.ceil((expTime - Date.now()) / (1000 * 60 * 60 * 24));
                      const dDayText = diffDays > 0 ? `-Day${String(diffDays).padStart(2, '0')}` : '-Day00 (게시종료)';
                      const isImminent = diffDays <= 10 && diffDays > 0;
                      return (
                        <div style={{
                          fontSize: 12, fontWeight: 900,
                          color: isImminent ? '#ef4444' : '#60a5fa',
                          background: isImminent ? 'rgba(239,68,68,0.15)' : 'rgba(96,165,250,0.15)',
                          border: isImminent ? '1px solid rgba(239,68,68,0.4)' : '1px solid rgba(96,165,250,0.4)',
                          padding: '4px 10px', borderRadius: 8, flexShrink: 0,
                          display: 'flex', alignItems: 'center', gap: 4
                        }}>
                          <span>⌛ 게재기간: {dDayText}</span>
                          {isImminent && <span style={{ fontSize: 10, color: '#fca5a5' }}>(만료예고)</span>}
                        </div>
                      );
                    })()}
                    {/* 점프 표시 */}
                    {isJumped && (
                      <div style={{
                        fontSize: 11, fontWeight: 800, color: '#fbbf24',
                        background: 'rgba(251,191,36,0.12)',
                        border: '1px solid rgba(251,191,36,0.3)',
                        padding: '3px 8px', borderRadius: 8, flexShrink: 0,
                      }}>
                        ⬆ 점프됨
                      </div>
                    )}
                    {/* 날짜 */}
                    <div style={{ fontSize: 11, color: '#6b7280', flexShrink: 0 }}>{postedDate}</div>
                    {/* 삭제 */}
                    <button
                      onClick={() => handleDelete(ad.id)}
                      style={{
                        background: 'rgba(239,68,68,0.1)',
                        border: '1px solid rgba(239,68,68,0.2)',
                        color: '#f87171', borderRadius: 8,
                        padding: '5px 10px', fontSize: 12, cursor: 'pointer',
                        flexShrink: 0,
                      }}
                    >
                      삭제
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Styles ────────────────────────────────────────────────────────────────

const labelStyle: React.CSSProperties = {
  display: 'flex', flexDirection: 'column', gap: 6,
};
const labelTextStyle: React.CSSProperties = {
  fontSize: 12, fontWeight: 700, color: '#c4b5fd',
};
const inputStyle: React.CSSProperties = {
  background: 'rgba(255,255,255,0.06)',
  border: '1px solid rgba(167,139,250,0.25)',
  borderRadius: 8, padding: '10px 12px',
  color: '#f9fafb', fontSize: 13,
  outline: 'none',
};
const btnStyle: React.CSSProperties = {
  padding: '10px 20px', borderRadius: 10,
  border: 'none', fontSize: 13, fontWeight: 800,
  cursor: 'pointer',
};
