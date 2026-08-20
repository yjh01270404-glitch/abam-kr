'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useApp } from '../context/AppContext';
import { createOrGetSession, sendChatMsg, markSessionRead, getChatSession, ChatMsg } from '../lib/chat';
import styles from './ChatWidget.module.css';

export default function ChatWidget() {
  const { currentUser } = useApp();
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<ChatMsg[]>([]);
  const [input, setInput] = useState('');
  const [notif, setNotif] = useState(0);
  const bottomRef = useRef<HTMLDivElement>(null);
  
  const [sessionId, setSessionId] = useState('');

  useEffect(() => {
    let sid = localStorage.getItem('abam_chat_session_id');
    if (currentUser) {
      sid = `user_${currentUser.id}`;
    } else if (!sid) {
      sid = `anon_${Math.random().toString(36).substring(2, 9)}`;
      localStorage.setItem('abam_chat_session_id', sid);
    }
    setSessionId(sid);

    const handleOpenChat = () => setOpen(true);
    window.addEventListener('abam-open-chat', handleOpenChat);
    return () => window.removeEventListener('abam-open-chat', handleOpenChat);
  }, [currentUser]);

  const refreshChat = () => {
    if (!sessionId) return;
    const nickname = currentUser?.nickname || currentUser?.username || '비회원 고객';
    const session = createOrGetSession(sessionId, nickname, currentUser?.id);
    setMsgs(session.msgs);
    setNotif(session.unreadUser);
  };

  useEffect(() => {
    if (!sessionId) return;
    refreshChat();
    const t = setInterval(refreshChat, 2000);
    return () => clearInterval(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionId]);

  const sendMsg = () => {
    if (!input.trim() || !sessionId) return;
    sendChatMsg(sessionId, '고객', input.trim());
    setInput('');
    refreshChat();
    setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 50);
  };

  useEffect(() => {
    if (open) {
      markSessionRead(sessionId, '고객');
      setNotif(0);
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    }
  }, [open, msgs, sessionId]);

  return (
    <>



      {/* ====================================================
          RIGHT FLOATING CHAT BUTTON — 우측 채팅 플로팅 버튼
          (사이드 배너 아래 공간 / 우측 최하단)
          ==================================================== */}
      <button
        className={styles.floatingBtn}
        onClick={() => setOpen(o => !o)}
        aria-label="채팅 상담"
        title="채팅 상담"
      >
        {open ? '✕' : '💬'}
        {!open && notif > 0 && <span className={styles.notifBadge}>{notif}</span>}
      </button>

      {/* 채팅 패널 */}
      {open && (
        <div className={styles.chatPanel}>
          <div className={styles.chatHeader}>
            <div className={styles.adminAvatar}>🌙</div>
            <div className={styles.adminInfo}>
              <div className={styles.adminName}>아름다운밤 관리자</div>
              <div className={styles.adminStatus}>
                <span className={styles.onlineDot} />
                온라인 · 평균 응답 1분 이내
              </div>
            </div>
            <button className={styles.closeBtn} onClick={() => setOpen(false)}>✕</button>
          </div>

          <div className={styles.msgList}>
            {msgs.map(msg => (
              <div
                key={msg.id}
                className={msg.from === '나' ? styles.msgMine : styles.msgTheirs}
              >
                {msg.from === '관리자' && (
                  <div className={styles.msgAvatar}>관</div>
                )}
                <div className={styles.msgBubbleWrap}>
                  <div className={msg.from === '나' ? styles.bubbleMine : styles.bubbleTheirs}>
                    {msg.text}
                  </div>
                  <div className={styles.msgTime}>{msg.time}</div>
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          <div className={styles.inputArea}>
            <input
              className={styles.chatInput}
              placeholder="메시지를 입력하세요..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMsg()}
            />
            <button className={styles.sendBtn} onClick={sendMsg}>전송</button>
          </div>

          <div className={styles.chatFooter}>
            📞 고객센터 070-8057-6615 (평일 09:30 ~ 19:00)
          </div>
        </div>
      )}
    </>
  );
}
