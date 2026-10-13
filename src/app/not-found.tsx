'use client';

import Link from 'next/link';
import styles from './not-found.module.css';

export default function NotFound() {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.moonIcon}>🌙</div>
        <div className={styles.errorCode}>안내</div>
        <h1 className={styles.title}>아름다운밤 [아밤.Abam.kr]</h1>
        <p className={styles.desc}>
          요청하신 페이지가 공식 주소로 개편되었거나 변경되었습니다.<br />
          아래 버튼을 누르시면 실시간 예약 및 서비스 안내로 바로 연결됩니다.
        </p>
        <div className={styles.actions} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Link href="/" className={styles.homeBtn}>
            🏠 메인 홈 바로가기
          </Link>
          <div style={{ display: 'flex', gap: '8px', width: '100%' }}>
            <a
              href="tel:010-6607-2239"
              style={{
                flex: 1,
                background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                color: '#0f172a',
                padding: '12px 6px',
                borderRadius: '8px',
                fontWeight: 900,
                fontSize: '14px',
                textDecoration: 'none',
                textAlign: 'center',
              }}
            >
              📞 전화예약
            </a>
            <a
              href="sms:01066072239?body=%5B%EC%95%84%EB%B0%A4%20%EC%98%88%EC%95%BD%EB%AC%B8%EC%9D%98%5D%20%EC%BD%94%EC%8A%A4%20%EB%B0%8F%20%EC%98%88%EC%95%BD%20%EB%AC%B8%EC%9D%98%EB%93%9C%EB%A6%BD%EB%8B%88%EB%8B%A4."
              style={{
                flex: 1,
                background: '#1e293b',
                color: '#ffffff',
                border: '1px solid #475569',
                padding: '12px 6px',
                borderRadius: '8px',
                fontWeight: 800,
                fontSize: '14px',
                textDecoration: 'none',
                textAlign: 'center',
              }}
            >
              ✉️ 문자예약
            </a>
          </div>
        </div>
        <div className={styles.brandTag}>서울·경기 100% 현장후불제 · abam.kr</div>
      </div>
    </div>
  );
}
