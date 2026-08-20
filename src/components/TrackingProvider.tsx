'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import {
  track,
  trackPageEnter,
  trackPageExit,
  trackReturn,
  saveExitTime,
} from '../lib/tracker';

/**
 * TrackingProvider
 * - 레이아웃에 삽입하면 모든 페이지의 사용자 동작을 자동 추적
 * - 페이지 진입/이탈, 재방문, 스크롤 깊이 자동 기록
 */
export default function TrackingProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const scrollReported = useRef<Set<number>>(new Set());
  const pageEnterTime = useRef<number>(Date.now());

  /* ── 초기화: 재접속 감지 ── */
  useEffect(() => {
    trackReturn();
  }, []);

  /* ── 페이지 변경 추적 ── */
  useEffect(() => {
    scrollReported.current = new Set();
    pageEnterTime.current = Date.now();

    // 페이지 제목 → 약간 지연(router 전환 후 title 업데이트 대기)
    const t = setTimeout(() => {
      trackPageEnter(document.title || pathname);
    }, 300);

    return () => clearTimeout(t);
  }, [pathname]);

  /* ── 이탈 추적 (beforeunload) ── */
  useEffect(() => {
    const handleUnload = () => {
      const scrollPct = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight || 1)) * 100
      );
      const stayMs = Date.now() - pageEnterTime.current;
      const stayMin = Math.round(stayMs / 1000);
      trackPageExit(document.title || pathname, scrollPct);
      track('체류 시간', `페이지 체류: ${stayMin}초`, `URL: ${pathname} | 스크롤: ${scrollPct}%`);
      saveExitTime();
    };

    window.addEventListener('beforeunload', handleUnload);
    return () => window.removeEventListener('beforeunload', handleUnload);
  }, [pathname]);

  /* ── 스크롤 깊이 추적 ── */
  useEffect(() => {
    const MILESTONES = [25, 50, 75, 100];

    const handleScroll = () => {
      const maxH = document.documentElement.scrollHeight - window.innerHeight;
      if (maxH <= 0) return;
      const pct = Math.round((window.scrollY / maxH) * 100);
      MILESTONES.forEach(m => {
        if (pct >= m && !scrollReported.current.has(m)) {
          scrollReported.current.add(m);
          track('스크롤 깊이', `스크롤 ${m}% 도달`, `페이지: ${pathname}`);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  /* ── 탭 비활성/재활성 추적 ── */
  useEffect(() => {
    let hiddenAt: number | null = null;

    const handleVisibility = () => {
      if (document.hidden) {
        hiddenAt = Date.now();
        track('탭 전환', '탭 비활성화 (다른 탭으로 이동)', `페이지: ${pathname}`);
      } else {
        if (hiddenAt) {
          const awayS = Math.round((Date.now() - hiddenAt) / 1000);
          track('탭 복귀', `탭 복귀 (${awayS}초 후)`, `페이지: ${pathname}`);
          hiddenAt = null;
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, [pathname]);

  return <>{children}</>;
}
