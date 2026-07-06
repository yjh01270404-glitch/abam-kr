'use client';

import { useState, useEffect } from 'react';
import styles from './LegalWarning.module.css';

export default function LegalWarning() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const seen = sessionStorage.getItem('legalWarningAccepted');
    if (!seen) setVisible(true);
  }, []);

  const handleAccept = () => {
    sessionStorage.setItem('legalWarningAccepted', 'true');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        {/* 상단 경고 배지 */}
        <div className={styles.warningBadge}>
          <span className={styles.badgeIcon}>⚠️</span>
          <span>청소년 유해 매체물 접속 경고</span>
        </div>

        {/* 19+ 마크 */}
        <div className={styles.ageCircle}>19+</div>

        <h1 className={styles.title}>19세 미만 출입금지</h1>

        {/* 법적 고지 본문 */}
        <div className={styles.legalBox}>
          <p>
            본 사이트는 <strong>청소년 유해 매체물</strong>을 포함하고 있으며,<br />
            아래 법령에 의하여 <strong>만 19세 미만 청소년의 접근을 금지</strong>합니다.
          </p>
          <ul className={styles.lawList}>
            <li>정보통신망 이용촉진 및 정보보호 등에 관한 법률 제42조의2</li>
            <li>청소년보호법 제16조, 제17조</li>
            <li>방송통신위원회 고시 제2023-5호</li>
          </ul>
          <p className={styles.lawNote}>
            본 사이트는 성인 회원가입 시 본인인증을 통해 연령을 확인하며,<br />
            미성년자의 허위 접속으로 인한 법적 책임은 이용자 본인에게 있습니다.
          </p>
        </div>

        {/* 운영자 정보 */}
        <div className={styles.operatorInfo}>
          <span>운영: 아름다운밤 (abam.kr)</span>
          <span>|</span>
          <span>사업자: 541-09-03234</span>
          <span>|</span>
          <span>서울 서대문구</span>
        </div>

        {/* 버튼 */}
        <button className={styles.confirmBtn} onClick={handleAccept}>
          ✅ 본인은 만 19세 이상이며 동의합니다
        </button>

        <a href="https://www.naver.com" className={styles.exitLink}>
          미성년자입니다. 이 사이트를 떠납니다 →
        </a>
      </div>
    </div>
  );
}
