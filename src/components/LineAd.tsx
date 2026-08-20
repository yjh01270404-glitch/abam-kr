import React from 'react';
import Link from 'next/link';
import { JobAd } from '../lib/mockData';
import styles from './LineAd.module.css';

interface LineAdProps {
  jobAd: JobAd;
}

export default function LineAd({ jobAd }: LineAdProps) {
  // 고정 해시 값을 생성하여 동일한 공고에 항상 일관된 유료 광고 기능 배정
  let hash = 0;
  const idStr = String(jobAd.id);
  for (let i = 0; i < idStr.length; i++) {
    hash += idStr.charCodeAt(i);
  }

  // 1. 유료 배경색 하이라이트
  let bgClass = '';
  const bgType = hash % 8;
  if (bgType === 1) bgClass = styles.bgHighlightCyan;
  else if (bgType === 3) bgClass = styles.bgHighlightYellow;
  else if (bgType === 5) bgClass = styles.bgHighlightPink;

  // 2. 유료 글자색 강조
  let textClass = styles.textNormal;
  const textType = hash % 6;
  if (textType === 2) textClass = styles.textHighlightBlue;
  else if (textType === 4) textClass = styles.textHighlightRed;
  else if (textType === 5) textClass = styles.textHighlightPurple;

  // 3. 유료 급구 배지
  const hasUrgent = hash % 3 === 0;

  // 4. 신규 등록 배지 ("NEW")
  const hasNew = hash % 2 === 0;

  // 제목을 2줄로 파싱 (기호/쉼표 기준)
  const splitTitleForLineAd = (title: string): { part1: string; part2: string } => {
    if (!title) return { part1: '', part2: '' };

    const regex = /[,\"'(\[{〈《★☆♥♦!！?？]/;
    const match = title.match(regex);

    if (match && match.index !== undefined && match.index > 3) {
      const splitIndex = match.index;
      const p1 = title.slice(0, splitIndex).trim();
      const p2 = title.slice(splitIndex).trim();
      return { part1: p1, part2: p2 };
    }

    // 중간 공백 기준으로 분할
    const mid = Math.floor(title.length / 2);
    const spaces: number[] = [];
    for (let i = 0; i < title.length; i++) {
      if (title[i] === ' ') spaces.push(i);
    }

    if (spaces.length > 0) {
      const closestSpace = spaces.reduce((prev, curr) =>
        Math.abs(curr - mid) < Math.abs(prev - mid) ? curr : prev
      );
      return {
        part1: title.slice(0, closestSpace).trim(),
        part2: title.slice(closestSpace).trim()
      };
    }

    return {
      part1: title.slice(0, mid).trim(),
      part2: title.slice(mid).trim()
    };
  };

  const { part1, part2 } = splitTitleForLineAd(jobAd.title);

  // pay 짧게 자르기 (최대 10자)
  const payShort = (jobAd.pay || '').length > 10 ? jobAd.pay.slice(0, 10) + '…' : (jobAd.pay || '');

  return (
    <Link href={`/job/${jobAd.id}`} className={`${styles.lineAdContainer} ${bgClass}`}>
      {/* 1. 지역명 - 고정 너비 */}
      <div className={styles.lineAdLocation}>{jobAd.location}</div>

      {/* 2. 구인 제목 - 최대 2줄 */}
      <div className={styles.lineAdTitleWrapper}>
        <div className={`${styles.lineAdTitle} ${textClass}`}>
          {/* 1줄: 급구 배지 + part1 */}
          <div className={styles.lineAdRow1}>
            {hasUrgent && <span className={styles.urgentBadge}>급구</span>}
            <span className={styles.lineAdText}>{part1}</span>
          </div>
          {/* 2줄: part2 */}
          {part2 && (
            <div className={styles.lineAdRow2}>
              <span className={styles.lineAdIndent} />
              <span className={styles.lineAdText}>{part2}</span>
              {hasNew && <span className={styles.newBadge}>&quot;NEW&quot;</span>}
            </div>
          )}
          {!part2 && hasNew && (
            <span className={styles.newBadgeInline}>&quot;NEW&quot;</span>
          )}
        </div>
      </div>

      {/* 3. 급여 정보 - 우측 고정 */}
      <div className={styles.lineAdPay}>{payShort}</div>
    </Link>
  );
}
