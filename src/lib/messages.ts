// 쪽지 시스템 유틸리티

export interface Message {
  id: string;
  from: 'admin' | string;      // 발신자 (admin or userId)
  fromName: string;            // 표시 이름
  to: string;                  // 수신자 userId
  toName: string;
  subject: string;
  content: string;
  createdAt: string;           // ISO string
  read: boolean;
}

const STORAGE_KEY = 'abam_messages';

export function getAllMessages(): Message[] {
  if (typeof window === 'undefined') return [];
  return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
}

export function getMessagesForUser(userId: string): Message[] {
  return getAllMessages().filter(m => m.to === userId);
}

export function getUnreadCount(userId: string): number {
  return getMessagesForUser(userId).filter(m => !m.read).length;
}

export function sendMessage(msg: Omit<Message, 'id' | 'createdAt' | 'read'>): Message {
  const messages = getAllMessages();
  const newMsg: Message = {
    ...msg,
    id: `msg_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    createdAt: new Date().toISOString(),
    read: false,
  };
  messages.push(newMsg);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  return newMsg;
}

export function markAsRead(msgId: string) {
  const messages = getAllMessages();
  const updated = messages.map(m => m.id === msgId ? { ...m, read: true } : m);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

export function markAllRead(userId: string) {
  const messages = getAllMessages();
  const updated = messages.map(m => m.to === userId ? { ...m, read: true } : m);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

export function deleteMessage(msgId: string) {
  const messages = getAllMessages().filter(m => m.id !== msgId);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
}

export function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' });
}
