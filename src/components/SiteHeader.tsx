'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Store, Megaphone, MapPin, HelpCircle, Bell, Sparkles, CreditCard
} from 'lucide-react';
import styles from './SiteHeader.module.css';

const NAV_ITEMS = [
  { href: '/',               label: '홈',          icon: Store     },
  { href: '/business',       label: '로컬 매장',    icon: MapPin    },
  { href: '/partnership',    label: '배너 광고 신청', icon: Megaphone },
  { href: '/community',      label: '이용안내/FAQ', icon: HelpCircle },
  { href: '/support',        label: '고객센터',    icon: Sparkles  },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <div className={`${styles.siteHeader} ${scrolled ? styles.scrolled : ''}`}>
      {/* 상단 유틸리티 바 */}
      <div className={styles.topUtilityBar}>
        <div className={styles.topUtilityLeft} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ color: '#38bdf8', fontWeight: 700 }}>
            ✨ 전국 로컬 매장 정보 & 프리미엄 디지털 배너 광고 플랫폼
          </span>
          <span className={styles.divider}>|</span>
          <span style={{ color: '#86efac', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
            <CreditCard size={14} /> 포트원(PortOne) 안전 결제 보장
          </span>
        </div>
        <div className={styles.topUtilityRight}>
          <Link href="/partnership" style={{ color: '#38bdf8', fontWeight: '800' }}>광고 제휴안내</Link>
          <span className={styles.divider}>|</span>
          <Link href="/login">로그인</Link>
          <span className={styles.divider}>|</span>
          <Link href="/register">회원가입</Link>
          <span className={styles.divider}>|</span>
          <Link href="/support">고객지원</Link>
        </div>
      </div>

      {/* 메인 네비게이션 */}
      <nav className={styles.mainNav}>
        <Link href="/" className={styles.brandLogoArea} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', marginRight: '16px', flexShrink: 0 }}>
          <div style={{
            background: 'linear-gradient(135deg, #0284c7, #0369a1)',
            color: '#FFF',
            fontWeight: 900,
            fontSize: '18px',
            padding: '6px 12px',
            borderRadius: '8px',
            letterSpacing: '1px'
          }}>
            ABAM
          </div>
          <span style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a' }}>아밤 비즈니스</span>
        </Link>

        {/* 메인 네비 메뉴 */}
        <div className={styles.navMenu}>
          {NAV_ITEMS.map(({ href, label, icon: Icon }) => (
            <Link
              key={label}
              href={href}
              className={`${styles.navItem}${isActive(href) ? ` ${styles.navActive}` : ''}`}
            >
              <Icon size={17} strokeWidth={2.2} />
              <span>{label}</span>
            </Link>
          ))}
        </div>

        <div className={styles.navActions}>
          <Link href="/alerts" className={styles.alertBtn} title="알림 센터">
            <Bell size={18} strokeWidth={2.2} />
          </Link>
          <Link href="/partnership" className={styles.registerBtn} style={{ background: '#0284c7' }}>
            ⚡ 배너 광고 신청하기
          </Link>
        </div>
      </nav>
    </div>
  );
}
