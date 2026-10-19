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
              href={`sms:01066072239?body=${encodeURIComponent(`[아밤] 예약 신청 양식
• 성함: 
• 연락처: 
• 방문 주소 (호텔/모텔명 및 객실번호): 
• 희망 코스 및 시간: (60분 / 90분 / 120분)
• 방문 희망 시간: 
• 주차 / 1층 공동현관: (비밀번호 또는 호출버튼)
• 결제 방식: 현장에서 운전기사에게 대면결제 (현금 / 계좌이체 / 카드)
----------------------------------------
※ 안내 사항:
호텔/모텔은 1층 로비에서 기사와 관리사를 만나 대면결제 후, 관리사를 객실로 안내해 주시면 됩니다.`)}`}
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
