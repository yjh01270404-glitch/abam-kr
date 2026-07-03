import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerBrand}>아름다운밤</div>
        <p className={styles.footerDesc}>
          여성 전문 고수익 일자리 정보 제공 플랫폼 아름다운밤<br />
          검증된 정보와 안전한 구인구직 서비스를 약속합니다.
        </p>
        
        <div className={styles.footerLinks}>
          <span className={styles.link}>이용약관</span>
          <span className={styles.divider}>|</span>
          <span className={`${styles.link} ${styles.bold}`}>개인정보처리방침</span>
          <span className={styles.divider}>|</span>
          <span className={styles.link}>고객센터</span>
        </div>

        <div className={styles.footerInfo}>
          <p>상호: 아름다운밤(abam) | 대표: 홍길동 | 개인정보관리책임자: 김관리</p>
          <p>사업자등록번호: 123-45-67890 | 통신판매업신고: 제2026-서울강남-0000호</p>
          <p>주소: 서울특별시 강남구 테헤란로 123, 4층</p>
          <p>고객센터: 1588-0000 (평일 10:00 ~ 19:00, 주말/공휴일 휴무)</p>
          <p>이메일: help@abam.kr</p>
        </div>
        
        <div className={styles.copyright}>
          Copyright © 아름다운밤 All rights reserved.
        </div>
      </div>
    </footer>
  );
}
