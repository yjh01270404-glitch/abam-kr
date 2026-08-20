'use client';

import React from 'react';
import type { TrustLevel } from '../lib/trustData';
import { TRUST_BADGE_CONFIGS } from '../lib/trustData';
import styles from './TrustBadge.module.css';

interface TrustBadgeProps {
  level: TrustLevel;
  /** 크기 변형 */
  size?: 'xs' | 'sm' | 'md' | 'lg';
  /** 자세한 정보 툴팁 표시 여부 */
  showTooltip?: boolean;
  /** 라벨 텍스트 표시 */
  showLabel?: boolean;
  /** 평점 표시 */
  rating?: number;
  reviewCount?: number;
}

export default function TrustBadge({
  level,
  size = 'sm',
  showTooltip = true,
  showLabel = false,
  rating,
  reviewCount,
}: TrustBadgeProps) {
  const cfg = TRUST_BADGE_CONFIGS[level];

  return (
    <div className={`${styles.wrapper} ${styles[`size_${size}`]}`} data-level={level}>
      <div
        className={styles.badge}
        style={{
          background: `linear-gradient(135deg, ${cfg.gradientFrom}, ${cfg.gradientTo})`,
          boxShadow: `0 2px 8px ${cfg.glowColor}`,
        }}
      >
        <span className={styles.emoji}>{cfg.emoji}</span>
        {showLabel && <span className={styles.labelText}>{cfg.label}</span>}
      </div>

      {rating !== undefined && (
        <span className={styles.ratingText}>
          ★ {rating.toFixed(1)}{reviewCount !== undefined && <span className={styles.reviewCount}>({reviewCount})</span>}
        </span>
      )}

      {showTooltip && (
        <div className={styles.tooltip}>
          <div className={styles.tooltipHeader} style={{ background: `linear-gradient(135deg, ${cfg.gradientFrom}, ${cfg.gradientTo})` }}>
            <span className={styles.tooltipEmoji}>{cfg.emoji}</span>
            <div>
              <div className={styles.tooltipTitle}>Lv.{level} {cfg.label}</div>
              <div className={styles.tooltipDesc}>{cfg.description}</div>
            </div>
          </div>
          <div className={styles.tooltipBody}>
            <div className={styles.tooltipReqTitle}>인증 조건</div>
            <ul className={styles.tooltipReqs}>
              {cfg.requirements.map(req => (
                <li key={req}><span className={styles.checkMark}>✓</span> {req}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

/** 별점 렌더링 헬퍼 */
export function StarRating({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <span style={{ fontSize: size, color: '#f59e0b', letterSpacing: '1px' }}>
      {[1, 2, 3, 4, 5].map(i => (
        <span key={i} style={{ opacity: i <= Math.round(rating) ? 1 : 0.25 }}>★</span>
      ))}
    </span>
  );
}
