'use client';

import Link from 'next/link';
import styles from './not-found.module.css';

export default function NotFound() {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.moonIcon}>🌙</div>
        <div className={styles.errorCode}>404</div>
        <h1 className={styles.title}>페이지를 찾을 수 없어요</h1>
        <p className={styles.desc}>
          요청하신 페이지가 삭제되었거나 주소가 변경되었습니다.<br />
          아름다운밤의 다른 채용공고를 확인해보세요.
        </p>
        <div className={styles.actions}>
          <Link href="/" className={styles.homeBtn}>
            🏠 메인으로 돌아가기
          </Link>
          <Link href="/jobs" className={styles.jobsBtn}>
            📋 채용공고 보기
          </Link>
        </div>
        <div className={styles.brandTag}>아름다운밤 · abam.kr</div>
      </div>
    </div>
  );
}
