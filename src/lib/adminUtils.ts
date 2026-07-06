// 디바이스 파싱 유틸
export function parseDevice(ua: string): string {
  if (/iPhone/.test(ua)) {
    const ver = ua.match(/iPhone OS ([\d_]+)/);
    return `iPhone (iOS ${ver ? ver[1].replace(/_/g, '.') : ''})`;
  }
  if (/iPad/.test(ua)) return 'iPad';
  const android = ua.match(/Android.*?;\s*(.+?)\s*(Build|;)/);
  if (android) return `Android: ${android[1].trim()}`;
  if (/Windows NT 10/.test(ua)) return 'Windows 10/11';
  if (/Windows NT 6\.3/.test(ua)) return 'Windows 8.1';
  if (/Mac OS X/.test(ua)) {
    const ver = ua.match(/Mac OS X ([\d_]+)/);
    return `macOS ${ver ? ver[1].replace(/_/g, '.') : ''}`;
  }
  if (/Linux/.test(ua)) return 'Linux';
  return '알 수 없음';
}

// IP 조회 (클라이언트용)
export async function fetchClientIP(): Promise<string> {
  try {
    const res = await fetch('https://api.ipify.org?format=json', { signal: AbortSignal.timeout(3000) });
    const data = await res.json();
    return data.ip ?? '알 수 없음';
  } catch {
    return '알 수 없음';
  }
}

// 관리자 자격증명 (실제 운영 시 서버 env로 이동)
export const ADMIN_CREDENTIALS = {
  username: 'abam_admin',
  password: 'Abam@2026!',
};
