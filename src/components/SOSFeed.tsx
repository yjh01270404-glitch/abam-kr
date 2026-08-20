'use client';

import React, { useState, useEffect } from 'react';
import styles from './SOSFeed.module.css';
import Link from 'next/link';
import { Zap } from 'lucide-react';

const MOCK_SOS_DATA = [
  { id: 1, loc: '강남역', company: '강남 에이스 클럽', title: '오늘 10시~2시 급구 (경력무관)', pay: '30만+@ 당일지급' },
  { id: 2, loc: '선릉역', company: '청담 시그니처', title: '하이엔드 스튜디오 펑크 대타 구함 (차량지원)', pay: '50만 보장' },
  { id: 3, loc: '홍대',   company: '마포 노래바',   title: '노래방 도우미 2시간만', pay: '시급 10만' },
  { id: 4, loc: '해운대', company: '해운대 오션 클럽', title: '모던바 주말 에이스 급구', pay: '협의+당일지급' },
];

export default function SOSFeed() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animKey, setAnimKey] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % MOCK_SOS_DATA.length);
      setAnimKey((k) => k + 1);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const sos = MOCK_SOS_DATA[activeIndex];

  return (
    <div className={styles.sosWrapper}>
      <div className={styles.sosInner}>
        <Link href="/employer/sos" style={{ textDecoration: 'none', flexShrink: 0 }}>
          <div className={styles.sosBadge}>
            <Zap size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 3 }} />
            당일 SOS 콜 등록
          </div>
        </Link>
        <div className={styles.tickerContainer}>
          <div key={animKey} className={styles.sosSlide}>
            <span className={styles.sosLoc}>{sos.loc}</span>
            <span className={styles.sosCompany}>{sos.company}</span>
            <span className={styles.sosTitle}>{sos.title}</span>
            <span className={styles.sosPay}>{sos.pay}</span>
            <button
              className={styles.applyBtn}
              onClick={() => alert('긴급 콜 지원: 사장님과 바로 1:1 익명 톡이 연결됩니다.')}
            >
              즉시지원
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
