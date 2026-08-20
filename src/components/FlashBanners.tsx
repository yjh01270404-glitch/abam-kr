'use client';

import Link from 'next/link';
import styles from './FlashBanners.module.css';

// 각 매장마다 완전히 다른 디자인 테마를 적용
const BANNER_CONFIGS = [
  {
    id: 'b1',
    theme: 'neon_pink',
    name: '청담 시그널',
    badge: '강남 NO.1',
    line1: '시급 15~25+@',
    line2: '하루 100~150만원',
    line3: '하이엔드 스튜디오 에이스',
    emoji: '💎',
    stars: '⭐⭐⭐⭐⭐',
    region: '강남구/청담동',
    tag: '프리미엄 살롱 · 하이퍼블릭',
    link: '/job/top-0',
  },
  {
    id: 'b2',
    theme: 'galaxy_purple',
    name: '역삼 릴렉스',
    badge: '비즈니스의 종가',
    line1: '당일 지급 100%',
    line2: '초보자 전담 안심케어',
    line3: '주/야 24시간 상담',
    emoji: '🔮',
    stars: '⭐⭐⭐⭐⭐',
    region: '강남구/역삼동',
    tag: '하이퍼블릭 · 퍼블릭',
    link: '/job/top-1',
  },
  {
    id: 'b3',
    theme: 'golden_vip',
    name: '논현 클라우드',
    badge: '갯수 보장',
    line1: '철송근무 / 마이킹 가능',
    line2: '실장 직접 전담 케어',
    line3: '1% VVIP 고객 유치',
    emoji: '👑',
    stars: '⭐⭐⭐⭐⭐',
    region: '강남구/논현동',
    tag: '프리미엄 살롱 · 클래식바',
    link: '/job/top-2',
  },
  {
    id: 'b4',
    theme: 'cyber_green',
    name: '신사 밸벳',
    badge: '의전 모델',
    line1: '120+α 플레이 보장',
    line2: '초보/대학생 투잡 환영',
    line3: '즉시 출근 / 자유 출퇴근',
    emoji: '🌟',
    stars: '⭐⭐⭐⭐⭐',
    region: '강남구/신사동',
    tag: '프리미엄 살롱 · 다이닝 라운지',
    link: '/job/top-3',
  },
  {
    id: 'b5',
    theme: 'electric_blue',
    name: '잠실 플러스',
    badge: '플러스 매장',
    line1: '매너 손님 100% 보장',
    line2: '블랙 관리 철저',
    line3: '잠실 랜드마크 매장',
    emoji: '🏆',
    stars: '⭐⭐⭐⭐⭐',
    region: '송파구/잠실동',
    tag: '퍼블릭 · 바알바',
    link: '/job/top-4',
  },
];

export default function FlashBanners() {
  return (
    <section className={styles.flashBannersSection}>
      <h2 className={styles.sectionTitle}>
        <span className={styles.titleIcon}>⚡</span>
        플래시 퀵광고
        <span className={styles.titleSub}>초당 1건씩 문의 폭주!</span>
      </h2>
      <div className={styles.flashGrid}>
        {BANNER_CONFIGS.map((banner) => (
          <Link key={banner.id} href={banner.link} className={`${styles.flashCard} ${styles[banner.theme]}`} style={{ textDecoration: 'none' }}>
            <div className={styles.cardHeader}>
              <span className={styles.badge}>{banner.badge}</span>
              <span className={styles.stars}>{banner.stars}</span>
            </div>
            
            <div className={styles.cardBody}>
              <div className={styles.brandBox}>
                <span className={styles.emoji}>{banner.emoji}</span>
                <h3 className={styles.name}>{banner.name}</h3>
                <span className={styles.region}>{banner.region}</span>
              </div>
              <div className={styles.divider} />
              <div className={styles.infoBox}>
                <p className={styles.line1}>{banner.line1}</p>
                <p className={styles.line2}>{banner.line2}</p>
                <p className={styles.line3}>{banner.line3}</p>
              </div>
            </div>

            <div className={styles.cardFooter}>
              <span className={styles.tag}>{banner.tag}</span>
              <span className={styles.arrow}>바로가기 ▶</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
