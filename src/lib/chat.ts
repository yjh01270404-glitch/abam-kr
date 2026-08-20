import { notifyNewMessage, playDingDongSound } from './audioAlert';

// 실시간 채팅 유틸리티 (localStorage 기반)

export interface ChatMsg {
  id: number;
  from: '관리자' | '나' | '고객';
  text: string;
  time: string;
}

export interface ChatSession {
  sessionId: string;
  userId?: string;
  nickname: string;
  msgs: ChatMsg[];
  updatedAt: number;
  unreadAdmin: number;
  unreadUser: number;
}

const STORAGE_KEY = 'abam_live_chats';

export function getChatSessions(): ChatSession[] {
  if (typeof window === 'undefined') return [];
  return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
}

export function saveChatSessions(sessions: ChatSession[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
}

export function getChatSession(sessionId: string): ChatSession | undefined {
  return getChatSessions().find(s => s.sessionId === sessionId);
}

export function createOrGetSession(sessionId: string, nickname: string, userId?: string): ChatSession {
  const sessions = getChatSessions();
  const existing = sessions.find(s => s.sessionId === sessionId);
  if (existing) return existing;

  const newSession: ChatSession = {
    sessionId,
    userId,
    nickname,
    msgs: [
      { id: Date.now(), from: '관리자', text: '안녕하세요! 아름다운밤 관리자입니다 🌙', time: now() },
      { id: Date.now() + 1, from: '관리자', text: '궁금한 점이 있으시면 편하게 말씀해주세요 😊', time: now() },
    ],
    updatedAt: Date.now(),
    unreadAdmin: 0,
    unreadUser: 1,
  };
  sessions.push(newSession);
  saveChatSessions(sessions);
  return newSession;
}

export function sendChatMsg(sessionId: string, from: '관리자' | '고객' | string, text: string) {
  const sessions = getChatSessions();
  const session = sessions.find(s => s.sessionId === sessionId);
  if (!session) return;

  const senderLabel = from === '관리자' ? '관리자' : (from === '고객' ? '구직회원' : from);

  session.msgs.push({
    id: Date.now(),
    from: from === '관리자' ? '관리자' : '나',
    text,
    time: now()
  });
  session.updatedAt = Date.now();
  
  if (from === '고객') {
    session.unreadAdmin += 1;
  } else {
    session.unreadUser += 1;
  }

  saveChatSessions(sessions);

  // PWA 백그라운드 띵동 알림 트리거 (프로그램을 켜지 않은 상태에서도 상단 알림 바 표시)
  if (typeof window !== 'undefined') {
    playDingDongSound();

    const title = from === '관리자' 
      ? '💬 [아밤 1:1 톡] 관리자님의 대화 메시지' 
      : `💬 [아밤 1:1 톡] ${session.nickname || '상대방'}님의 1:1 대화 메시지`;
    const targetUrl = from === '관리자' ? '/' : '/abam-nightman-2026';

    // Service Worker 메시지 전송 (PWA 앱이 백그라운드나 꺼져 있을 때)
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then((reg) => {
        if (reg.active) {
          reg.active.postMessage({
            type: 'ADMIN_PUSH',
            title,
            body: text,
            url: targetUrl,
          });
        }
      }).catch(() => {});
    }

    notifyNewMessage(title, text, targetUrl);
    window.dispatchEvent(new CustomEvent('abam_new_chat', { detail: { sessionId, text, from } }));
  }
}

export function markSessionRead(sessionId: string, by: '관리자' | '고객') {
  const sessions = getChatSessions();
  const session = sessions.find(s => s.sessionId === sessionId);
  if (!session) return;

  if (by === '관리자') {
    session.unreadAdmin = 0;
  } else {
    session.unreadUser = 0;
  }
  saveChatSessions(sessions);
}

function now() {
  const d = new Date();
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
}
