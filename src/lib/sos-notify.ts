/**
 * sos-notify.ts
 * 아름다운밤 SOS 긴급 알림 시스템
 * - 브라우저 Notification API + Service Worker
 * - Android: 폰 알림창 표시 ✅
 * - iOS (PWA): 알림창 표시 ✅ (홈화면 추가 필요)
 * - PC: 우측 상단 시스템 알림 ✅
 */

export const SOS_REGIONS = [
  '서울', '경기', '인천', '부산', '대구', '광주',
  '대전', '울산', '세종', '충북', '충남', '전북',
  '전남', '경북', '경남', '강원', '제주',
] as const;

export type SosRegion = typeof SOS_REGIONS[number];

// ──────────────────────────────────────────────
// Service Worker 등록
// ──────────────────────────────────────────────
export async function registerSosServiceWorker(): Promise<ServiceWorkerRegistration | null> {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) return null;
  try {
    const reg = await navigator.serviceWorker.register('/sw-sos.js', { scope: '/' });
    await navigator.serviceWorker.ready;
    return reg;
  } catch (err) {
    console.warn('[SOS] SW 등록 실패:', err);
    return null;
  }
}

// ──────────────────────────────────────────────
// 알림 권한 요청
// ──────────────────────────────────────────────
export async function requestSosPermission(): Promise<'granted' | 'denied' | 'unsupported'> {
  if (typeof window === 'undefined') return 'unsupported';
  if (!('Notification' in window)) return 'unsupported';
  if (Notification.permission === 'granted') return 'granted';
  if (Notification.permission === 'denied') return 'denied';

  const result = await Notification.requestPermission();
  return result as 'granted' | 'denied';
}

export function getSosPermission(): 'granted' | 'denied' | 'default' | 'unsupported' {
  if (typeof window === 'undefined') return 'unsupported';
  if (!('Notification' in window)) return 'unsupported';
  return Notification.permission;
}

// ──────────────────────────────────────────────
// 알림 직접 표시 (foreground + SW background)
// ──────────────────────────────────────────────
export async function fireSosNotification(opts: {
  region: string;
  title: string;
  body: string;
  url?: string;
}): Promise<void> {
  if (typeof window === 'undefined') return;
  if (!('Notification' in window)) return;
  if (Notification.permission !== 'granted') return;

  const { region, title, body, url = '/' } = opts;

  // 방법 1: Service Worker 통해 알림 (백그라운드에서도 작동)
  if ('serviceWorker' in navigator) {
    try {
      const sw = await navigator.serviceWorker.ready;
      if (sw.active) {
        sw.active.postMessage({ type: 'SOS_PUSH', title, body, region, url });
        return;
      }
    } catch (_) {/* SW 없으면 폴백 */}
  }

  // 방법 2: 직접 Notification API (포그라운드 전용)
  const n = new Notification(title, {
    body,
    icon: '/icon',
    badge: '/icon',
    tag: `sos-${region}`,
    requireInteraction: true,
  } as NotificationOptions);
  n.onclick = () => { window.focus(); window.location.href = url; n.close(); };
}

// ──────────────────────────────────────────────
// SOS 등록 시 구독 중인 구직자들에게 알림 발송
// ──────────────────────────────────────────────
export interface SosPayload {
  region: string;   // SOS 등록 지역 (예: "강남역", "서울")
  title: string;    // 공고 제목
  pay: string;      // 급여 조건
}

export async function notifySosSubscribers(payload: SosPayload): Promise<number> {
  if (typeof window === 'undefined') return 0;

  const { region, title, pay } = payload;

  // localStorage에서 구독 구직자 필터링
  const allUsers: Array<{
    id: string;
    username: string;
    role: string;
    sosAlert?: boolean;
    sosRegions?: string[];
  }> = JSON.parse(localStorage.getItem('abam_users') ?? '[]');

  const matched = allUsers.filter(
    (u) =>
      u.role === 'seeker' &&
      u.sosAlert === true &&
      Array.isArray(u.sosRegions) &&
      u.sosRegions.length > 0 &&
      u.sosRegions.some((r) => region.includes(r) || r === '전국' || region.includes(r.replace('서울', ''))),
  );

  if (matched.length === 0) return 0;

  // 브라우저 알림 발송
  await fireSosNotification({
    region,
    title: `⚡ [${region}] SOS 긴급 알림`,
    body: `${title}\n💰 ${pay} · 지금 바로 확인하세요!`,
    url: '/',
  });

  return matched.length;
}
