/**
 * tracker.ts — 아름다운밤 실제 사용자 행동 추적 라이브러리
 * localStorage에 저장 → 관리자 페이지에서 실시간 조회 가능
 */

const LOG_KEY = 'abam_activity_logs';
const SESSION_KEY = 'abam_session_id';
const MAX_LOGS = 2000;

let cachedIp = '';

if (typeof window !== 'undefined') {
  cachedIp = localStorage.getItem('abam_user_ip') || '';
  if (!cachedIp) {
    fetch('https://api.ipify.org?format=json')
      .then(res => res.json())
      .then(data => {
        if (data && data.ip) {
          cachedIp = data.ip;
          localStorage.setItem('abam_user_ip', data.ip);
        }
      })
      .catch(() => {
        cachedIp = '121.130.14.88';
        localStorage.setItem('abam_user_ip', cachedIp);
      });
  }
}

function getUserIp(): string {
  if (cachedIp) return cachedIp;
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('abam_user_ip');
    if (stored) return stored;
  }
  return '121.130.14.88';
}

function getSessionId(): string {
  let sid = sessionStorage.getItem(SESSION_KEY);
  if (!sid) {
    sid = `sess-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    sessionStorage.setItem(SESSION_KEY, sid);
  }
  return sid;
}

function getCurrentUser(): { id: string; nick: string } {
  try {
    const raw = localStorage.getItem('abam_current_user');
    if (raw) {
      const u = JSON.parse(raw);
      return { id: u.username || u.id || '?', nick: u.nickname || u.username || '비로그인' };
    }
  } catch {}
  return { id: '비로그인', nick: '비로그인' };
}

function getDevice(): string {
  if (typeof navigator === 'undefined') return 'PC';
  const ua = navigator.userAgent;
  if (/iPhone|iPad|iPod/.test(ua)) return 'iOS';
  if (/Android/.test(ua)) return 'Android';
  if (/Windows/.test(ua)) return 'Windows PC';
  if (/Mac/.test(ua)) return 'macOS';
  return 'Unknown';
}

function getBrowser(): string {
  if (typeof navigator === 'undefined') return 'Browser';
  const ua = navigator.userAgent;
  if (ua.includes('Chrome')) return 'Chrome';
  if (ua.includes('Safari')) return 'Safari';
  if (ua.includes('Firefox')) return 'Firefox';
  if (ua.includes('Edge')) return 'Edge';
  return 'Browser';
}

export interface TrackLog {
  id: string;
  sessionId: string;
  userId: string;
  userNick: string;
  type: string;
  action: string;
  detail: string;
  ip: string;
  page: string;
  pageTitle: string;
  referrer?: string;
  device: string;
  browser: string;
  screenW: number;
  screenH: number;
  at: string;
}

export function track(type: string, action: string, detail: string = '', extra: Partial<TrackLog> = {}): void {
  try {
    const user = getCurrentUser();
    const log: TrackLog = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      sessionId: getSessionId(),
      userId: user.id,
      userNick: user.nick,
      type,
      action,
      detail,
      ip: getUserIp(),
      page: typeof window !== 'undefined' ? window.location.pathname : '',
      pageTitle: typeof document !== 'undefined' ? (document.title || window.location.pathname) : '',
      referrer: typeof document !== 'undefined' ? (document.referrer || '직접 접속') : '직접 접속',
      device: getDevice(),
      browser: getBrowser(),
      screenW: typeof window !== 'undefined' ? window.screen.width : 1920,
      screenH: typeof window !== 'undefined' ? window.screen.height : 1080,
      at: new Date().toISOString(),
      ...extra,
    };

    const existing: TrackLog[] = JSON.parse(localStorage.getItem(LOG_KEY) ?? '[]');
    existing.unshift(log);
    localStorage.setItem(LOG_KEY, JSON.stringify(existing.slice(0, MAX_LOGS)));

    // Legal Compliance Audit Log DB Sync
    if (typeof window !== 'undefined') {
      try {
        fetch('/api/audit-log', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(log),
        }).catch(() => {});
      } catch {}
    }
  } catch {}
}

/** 페이지 입장 자동 기록 */
export function trackPageEnter(pageName?: string): void {
  track(
    '페이지 방문',
    `페이지 진입: ${pageName || (typeof document !== 'undefined' ? document.title : '아름다운밤')}`,
    `URL: ${typeof window !== 'undefined' ? window.location.pathname : ''} | 유입: ${typeof document !== 'undefined' ? (document.referrer || '직접 접속') : '직접 접속'}`,
  );
}

/** 페이지 이탈 기록 */
export function trackPageExit(pageName?: string, scrollPct?: number): void {
  track(
    '페이지 이탈',
    `페이지 종료: ${pageName || (typeof document !== 'undefined' ? document.title : '아름다운밤')}`,
    `마지막 스크롤: ${scrollPct ?? 0}% | URL: ${typeof window !== 'undefined' ? window.location.pathname : ''}`,
  );
}

/** 광고 클릭 */
export function trackAdClick(adId: string, adTitle: string, adType: string, position?: string): void {
  track('광고 클릭', `광고 클릭: ${adTitle}`, `광고ID: ${adId} | 유형: ${adType}${position ? ` | 위치: ${position}` : ''}`);
}

/** 구인글 상세 조회 */
export function trackJobView(jobId: string, jobTitle: string, company: string): void {
  track('구인글 조회', `구인글 상세보기: ${jobTitle}`, `업소: ${company} | ID: ${jobId}`);
}

/** 검색 */
export function trackSearch(keyword: string, resultCount: number): void {
  track('검색', `검색어 입력: "${keyword}"`, `결과: ${resultCount}건`);
}

/** 연락처 클릭 */
export function trackContact(type: 'phone' | 'kakao', company: string): void {
  track('연락처 클릭', `${type === 'phone' ? '전화번호' : '카카오톡'} 클릭`, `업소: ${company}`);
}

/** 로그인 */
export function trackLogin(username: string, method: string = '일반'): void {
  track('로그인', `로그인 성공: ${username}`, `로그인 방법: ${method}`);
}

/** 로그아웃 */
export function trackLogout(username: string): void {
  track('로그아웃', `로그아웃: ${username}`, `세션 종료`);
}

/** 회원가입 */
export function trackRegister(username: string, role: string): void {
  track('회원가입', `신규 가입: ${username}`, `역할: ${role === 'employer' ? '업소' : '구직자'}`);
}

/** 채팅 시작 */
export function trackChatStart(with_: string): void {
  track('1:1 채팅', `안심톡 채팅 시작`, `대화 상대: ${with_}`);
}

/** 스크롤 depth */
export function trackScroll(depth: number): void {
  track('스크롤', `스크롤 ${depth}%`, `페이지: ${typeof window !== 'undefined' ? window.location.pathname : ''}`);
}

/** 버튼 / 메뉴 클릭 */
export function trackClick(label: string, section?: string): void {
  track('버튼 클릭', `클릭: ${label}`, section ? `섹션: ${section}` : '');
}

/** 필터 변경 */
export function trackFilter(filterType: string, value: string): void {
  track('필터 변경', `필터 적용: ${filterType}`, `값: ${value}`);
}

/** 쪽지 발송 */
export function trackMessage(to: string, subject: string): void {
  track('쪽지 발송', `쪽지 전송: ${subject}`, `수신자: ${to}`);
}

/** 재접속 감지 */
export function trackReturn(): void {
  if (typeof localStorage === 'undefined') return;
  const lastExit = localStorage.getItem('abam_last_exit');
  if (lastExit) {
    const ago = Math.round((Date.now() - new Date(lastExit).getTime()) / 60000);
    track('재접속', `재방문 감지`, `이전 이탈 후 ${ago}분 경과 | 마지막 이탈: ${new Date(lastExit).toLocaleString('ko-KR')}`);
  }
}

/** 이탈 시각 저장 (beforeunload) */
export function saveExitTime(): void {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('abam_last_exit', new Date().toISOString());
  }
}
