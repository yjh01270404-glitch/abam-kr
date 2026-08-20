'use client';

import React, { useState } from 'react';
import { mockBusinessTrust, TRUST_BADGE_CONFIGS, type BusinessTrust, type TrustLevel } from '../../../lib/trustData';
import { mockReviews, type Review } from '../../../lib/reviewData';
import type { Metadata } from 'next';
import styles from './business.module.css';

// 상대 시간
function relTime(iso: string): string {
  const diff = (Date.now() - new Date(iso).getTime()) / 1000;
  if (diff < 86400) return `${Math.floor(diff / 3600)}시간 전`;
  return `${Math.floor(diff / 86400)}일 전`;
}

// 별점 렌더링
function Stars({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <span style={{ fontSize: size, letterSpacing: '1px' }}>
      {[1,2,3,4,5].map(i => (
        <span key={i} style={{ color: i <= Math.round(rating) ? '#f59e0b' : '#e5e7eb' }}>★</span>
      ))}
    </span>
  );
}

// 신뢰 배지 (인라인)
function TrustBadge({ level }: { level: TrustLevel }) {
  const cfg = TRUST_BADGE_CONFIGS[level];
  return (
    <div
      className={styles.trustBadge}
      style={{
        background: `linear-gradient(135deg, ${cfg.gradientFrom}, ${cfg.gradientTo})`,
        boxShadow: `0 4px 16px ${cfg.glowColor}`,
      }}
      data-level={level}
    >
      <span className={styles.trustBadgeEmoji}>{cfg.emoji}</span>
      <div>
        <div className={styles.trustBadgeLabel}>Lv.{level} {cfg.label}</div>
        <div className={styles.trustBadgeDesc}>{cfg.description}</div>
      </div>
    </div>
  );
}

// 신뢰 지표 바
function TrustStat({ label, value, max, unit }: { label: string; value: number; max: number; unit: string }) {
  const pct = Math.min((value / max) * 100, 100);
  const color = pct >= 80 ? '#10b981' : pct >= 50 ? '#f59e0b' : '#ef4444';
  return (
    <div className={styles.trustStat}>
      <div className={styles.trustStatLabel}>{label}</div>
      <div className={styles.trustStatBar}>
        <div className={styles.trustStatFill} style={{ width: `${pct}%`, background: color }} />
      </div>
      <div className={styles.trustStatVal} style={{ color }}>{value}{unit}</div>
    </div>
  );
}

// 리뷰 작성 모달
function ReviewModal({ business, onClose, onSubmit }: {
  business: BusinessTrust;
  onClose: () => void;
  onSubmit: (r: Partial<Review>) => void;
}) {
  const [overall, setOverall] = useState(5);
  const [payAcc, setPayAcc] = useState(5);
  const [workEnv, setWorkEnv] = useState(5);
  const [safety, setSafety] = useState(5);
  const [ownerAtt, setOwnerAtt] = useState(5);
  const [wouldReturn, setWouldReturn] = useState(true);
  const [period, setPeriod] = useState<Review['workPeriod']>('1~3개월');
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const RatingRow = ({ label, val, set }: { label: string; val: number; set: (n: number) => void }) => (
    <div className={styles.ratingRow}>
      <span className={styles.ratingLabel}>{label}</span>
      <div className={styles.ratingStars}>
        {[1,2,3,4,5].map(i => (
          <button key={i} className={`${styles.starBtn} ${i <= val ? styles.starBtnActive : ''}`} onClick={() => set(i)}>★</button>
        ))}
      </div>
      <span className={styles.ratingVal}>{val}.0</span>
    </div>
  );

  const handleSubmit = () => {
    if (content.trim().length < 30) return;
    setSubmitting(true);
    setTimeout(() => {
      onSubmit({
        overallRating: overall,
        ratings: { payAccuracy: payAcc, workEnv, safety, ownerAttitude: ownerAtt, wouldReturn },
        workPeriod: period,
        content: content.trim(),
        anonymousId: `언니${Math.floor(Math.random() * 9000 + 1000)}호`,
      });
      setSubmitting(false);
      onClose();
    }, 700);
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalBox} onClick={e => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>⭐ {business.businessName} 리뷰 작성</h2>
          <button className={styles.modalClose} onClick={onClose}>✕</button>
        </div>
        <div className={styles.modalBody}>
          <div className={styles.modalNotice}>
            🔒 완전 익명 처리됩니다. 매장 이름 외 개인 식별 정보는 노출되지 않습니다.
          </div>

          <div className={styles.fieldLabel}>종합 평점</div>
          <RatingRow label="" val={overall} set={setOverall} />

          <div className={styles.fieldLabel}>세부 항목 평가</div>
          <div className={styles.ratingGrid}>
            <RatingRow label="💰 급여 정확도" val={payAcc} set={setPayAcc} />
            <RatingRow label="🏠 근무 환경" val={workEnv} set={setWorkEnv} />
            <RatingRow label="🛡️ 안전함" val={safety} set={setSafety} />
            <RatingRow label="👤 사장 태도" val={ownerAtt} set={setOwnerAtt} />
          </div>

          <div className={styles.fieldLabel}>재취업 의향</div>
          <div className={styles.wouldReturnRow}>
            <button className={`${styles.yesBtn} ${wouldReturn ? styles.yesBtnActive : ''}`} onClick={() => setWouldReturn(true)}>👍 있어요</button>
            <button className={`${styles.noBtn} ${!wouldReturn ? styles.noBtnActive : ''}`} onClick={() => setWouldReturn(false)}>👎 없어요</button>
          </div>

          <div className={styles.fieldLabel}>근무 기간</div>
          <div className={styles.periodRow}>
            {(['1일~1주', '1주~1개월', '1~3개월', '3개월 이상'] as Review['workPeriod'][]).map(p => (
              <button key={p} className={`${styles.periodBtn} ${period === p ? styles.periodBtnActive : ''}`} onClick={() => setPeriod(p)}>{p}</button>
            ))}
          </div>

          <div className={styles.fieldLabel}>리뷰 내용 <span className={styles.fieldHint}>(최소 30자)</span></div>
          <textarea className={styles.modalTextarea} placeholder="솔직한 경험을 공유해주세요. 좋은 점, 아쉬운 점 모두 작성해주시면 다른 언니들에게 큰 도움이 됩니다." value={content} onChange={e => setContent(e.target.value)} rows={5} />
          <div className={styles.contentLen}>{content.length}/500</div>

          <button className={styles.submitBtn} onClick={handleSubmit} disabled={content.trim().length < 30 || submitting}>
            {submitting ? '등록 중...' : '✓ 리뷰 등록하기'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── 메인 매장 프로필 페이지 ─────────────────────────────────────
export default function BusinessPage({ params }: { params: { id: string } }) {
  const business = mockBusinessTrust.find(b => b.businessId === params.id) ?? mockBusinessTrust[0];
  const cfg = TRUST_BADGE_CONFIGS[business.level];

  const [reviews, setReviews] = useState<Review[]>(mockReviews.filter(r => r.businessId === business.businessId));
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set());
  const [sortBy, setSortBy] = useState<'latest' | 'helpful'>('helpful');

  const sorted = [...reviews].sort((a, b) =>
    sortBy === 'helpful'
      ? b.helpfulCount - a.helpfulCount
      : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const avgRating = reviews.length > 0
    ? Math.round(reviews.reduce((s, r) => s + r.overallRating, 0) / reviews.length * 10) / 10
    : 0;

  const avgByKey = (key: keyof Review['ratings']): number => {
    if (reviews.length === 0 || key === 'wouldReturn') return 0;
    return Math.round(
      reviews.reduce((s, r) => s + (r.ratings[key] as number), 0) / reviews.length * 10
    ) / 10;
  };

  const handleNewReview = (partial: Partial<Review>) => {
    const newRev: Review = {
      id: `rev-new-${Date.now()}`,
      businessId: business.businessId,
      businessName: business.businessName,
      category: 'modern_bar',
      workRegion: '미공개',
      overallRating: partial.overallRating ?? 5,
      ratings: partial.ratings ?? { payAccuracy: 5, workEnv: 5, safety: 5, ownerAttitude: 5, wouldReturn: true },
      content: partial.content ?? '',
      workPeriod: partial.workPeriod ?? '1~3개월',
      anonymousId: partial.anonymousId ?? '언니???호',
      createdAt: new Date().toISOString(),
      helpfulCount: 0,
      verified: false,
      tags: [],
    };
    setReviews(prev => [newRev, ...prev]);
  };

  return (
    <div className={styles.page}>
      {/* 매장 헤더 */}
      <div className={styles.businessHeader} style={{ borderBottomColor: cfg.gradientFrom }}>
        <div className={styles.businessHeaderInner}>
          <div className={styles.businessNameRow}>
            <h1 className={styles.businessName}>{business.businessName}</h1>
            <TrustBadge level={business.level} />
          </div>

          <div className={styles.businessStats}>
            <div className={styles.bStat}>
              <Stars rating={avgRating} size={18} />
              <span className={styles.bStatVal}>{avgRating.toFixed(1)}</span>
              <span className={styles.bStatSub}>({reviews.length}개 리뷰)</span>
            </div>
            <div className={styles.bStatDivider} />
            <div className={styles.bStat}>
              <span className={styles.bStatIcon}>✅</span>
              <span className={styles.bStatVal}>{business.hiredCount}명</span>
              <span className={styles.bStatSub}>채용 성공</span>
            </div>
            <div className={styles.bStatDivider} />
            <div className={styles.bStat}>
              <span className={styles.bStatIcon}>⚡</span>
              <span className={styles.bStatVal}>{business.avgResponseMin}분</span>
              <span className={styles.bStatSub}>평균 응답</span>
            </div>
            <div className={styles.bStatDivider} />
            <div className={styles.bStat}>
              <span className={styles.bStatIcon}>🔄</span>
              <span className={styles.bStatVal}>{business.returnRate}%</span>
              <span className={styles.bStatSub}>재취업 의향</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.layout}>
        {/* 사이드바 */}
        <aside className={styles.sidebar}>
          {/* 신뢰 지표 */}
          <div className={styles.sideCard}>
            <div className={styles.sideTitle}>🔐 신뢰 지표</div>
            <div className={styles.verifiedList}>
              {[
                { key: 'identityVerified', label: '신원 인증' },
                { key: 'bankVerified', label: '계좌 인증' },
                { key: 'bizVerified', label: '사업자 인증' },
              ].map(({ key, label }) => (
                <div key={key} className={styles.verifiedItem}>
                  <span style={{ color: business[key as keyof BusinessTrust] ? '#10b981' : '#d1d5db' }}>
                    {business[key as keyof BusinessTrust] ? '✓' : '○'}
                  </span>
                  <span className={styles.verifiedLabel}>{label}</span>
                </div>
              ))}
            </div>

            <div className={styles.statsDivider} />

            <TrustStat label="응답률" value={business.responseRate} max={100} unit="%" />
            <TrustStat label="평균 응답" value={Math.min(business.avgResponseMin, 120)} max={120} unit="분" />
          </div>

          {/* 리뷰 요약 */}
          {reviews.length > 0 && (
            <div className={styles.sideCard}>
              <div className={styles.sideTitle}>⭐ 평균 평점</div>
              {[
                { label: '급여 정확도', val: avgByKey('payAccuracy') },
                { label: '근무 환경', val: avgByKey('workEnv') },
                { label: '안전함', val: avgByKey('safety') },
                { label: '사장 태도', val: avgByKey('ownerAttitude') },
              ].map(item => (
                <div key={item.label} className={styles.avgItem}>
                  <span className={styles.avgLabel}>{item.label}</span>
                  <Stars rating={item.val} size={12} />
                  <span className={styles.avgVal}>{item.val}</span>
                </div>
              ))}
            </div>
          )}

          <button className={styles.reviewWriteBtn} onClick={() => setShowReviewModal(true)}>
            ✍️ 리뷰 작성하기
          </button>
        </aside>

        {/* 메인 리뷰 목록 */}
        <main className={styles.main}>
          <div className={styles.reviewHeader}>
            <div className={styles.reviewHeaderTitle}>💬 이용자 리뷰 {reviews.length}개</div>
            <div className={styles.sortBtns}>
              {(['helpful', 'latest'] as const).map(s => (
                <button
                  key={s}
                  className={`${styles.sortBtn} ${sortBy === s ? styles.sortBtnActive : ''}`}
                  onClick={() => setSortBy(s)}
                >
                  {s === 'helpful' ? '🙌 도움순' : '🕐 최신순'}
                </button>
              ))}
            </div>
          </div>

          {sorted.length === 0 ? (
            <div className={styles.emptyReview}>
              <div>아직 리뷰가 없습니다. 첫 번째 리뷰를 남겨주세요!</div>
              <button className={styles.reviewWriteBtn} style={{ marginTop: 16 }} onClick={() => setShowReviewModal(true)}>
                ✍️ 첫 리뷰 작성
              </button>
            </div>
          ) : (
            sorted.map(rev => (
              <div key={rev.id} className={styles.reviewCard}>
                <div className={styles.reviewTop}>
                  <Stars rating={rev.overallRating} size={14} />
                  <span className={styles.reviewRating}>{rev.overallRating}.0</span>
                  {rev.verified && <span className={styles.verifiedBadge}>✓ 검증된 경험자</span>}
                  <span className={styles.reviewTime}>{relTime(rev.createdAt)}</span>
                </div>

                <div className={styles.reviewTags}>
                  {rev.tags.map(t => <span key={t} className={styles.reviewTag}>#{t}</span>)}
                </div>

                <div className={styles.reviewContent}>{rev.content}</div>

                <div className={styles.reviewMiniStats}>
                  <span>📍 {rev.workRegion}</span>
                  <span>🗓 {rev.workPeriod}</span>
                  <span>👤 {rev.anonymousId}</span>
                </div>

                {/* 세부 평점 */}
                <div className={styles.reviewSubRatings}>
                  {[
                    { label: '급여', val: rev.ratings.payAccuracy },
                    { label: '환경', val: rev.ratings.workEnv },
                    { label: '안전', val: rev.ratings.safety },
                    { label: '사장', val: rev.ratings.ownerAttitude },
                  ].map(item => (
                    <div key={item.label} className={styles.subRatingItem}>
                      <span className={styles.subRatingLabel}>{item.label}</span>
                      <span style={{ color: '#f59e0b', fontSize: 11 }}>{'★'.repeat(item.val)}{'☆'.repeat(5 - item.val)}</span>
                    </div>
                  ))}
                  <div className={styles.subRatingItem} style={{ marginLeft: 'auto' }}>
                    <span className={styles.subRatingLabel}>재취업</span>
                    <span style={{ fontSize: 11 }}>{rev.ratings.wouldReturn ? '👍 의향있음' : '👎 없음'}</span>
                  </div>
                </div>

                <div className={styles.reviewFooter}>
                  <button
                    className={`${styles.helpfulBtn} ${likedIds.has(rev.id) ? styles.helpfulBtnActive : ''}`}
                    onClick={() => {
                      if (likedIds.has(rev.id)) return;
                      setLikedIds(prev => new Set([...prev, rev.id]));
                      setReviews(prev => prev.map(r => r.id === rev.id ? { ...r, helpfulCount: r.helpfulCount + 1 } : r));
                    }}
                  >
                    🙌 도움됐어요 {rev.helpfulCount}
                  </button>
                </div>
              </div>
            ))
          )}
        </main>
      </div>

      {showReviewModal && (
        <ReviewModal business={business} onClose={() => setShowReviewModal(false)} onSubmit={handleNewReview} />
      )}
    </div>
  );
}
