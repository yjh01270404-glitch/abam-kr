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

export function sendChatMsg(sessionId: string, from: '관리자' | '고객', text: string) {
  const sessions = getChatSessions();
  const session = sessions.find(s => s.sessionId === sessionId);
  if (!session) return;

  session.msgs.push({
    id: Date.now(),
    from: from === '관리자' ? '관리자' : (from === '고객' ? '나' : from),
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
