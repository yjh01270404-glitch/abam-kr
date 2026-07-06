'use client';

import { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { getMessagesForUser, getUnreadCount, markAsRead, markAllRead, deleteMessage, formatDate, Message } from '../lib/messages';
import styles from './MessageInbox.module.css';

export default function MessageInbox() {
  const { currentUser } = useApp();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [unread, setUnread] = useState(0);
  const [selected, setSelected] = useState<Message | null>(null);

  const refresh = () => {
    if (!currentUser) return;
    const msgs = getMessagesForUser(currentUser.id);
    setMessages(msgs.slice().reverse());
    setUnread(getUnreadCount(currentUser.id));
  };

  useEffect(() => {
    refresh();
    const t = setInterval(refresh, 3000);
    return () => clearInterval(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  if (!currentUser) return null;

  const handleOpen = () => { setOpen(true); refresh(); };
  const handleClose = () => { setOpen(false); setSelected(null); };

  const handleRead = (msg: Message) => {
    setSelected(msg);
    if (!msg.read) {
      markAsRead(msg.id);
      refresh();
    }
  };

  const handleDelete = (msgId: string) => {
    deleteMessage(msgId);
    setSelected(null);
    refresh();
  };

  const handleMarkAllRead = () => {
    markAllRead(currentUser.id);
    refresh();
  };

  return (
    <>
      {/* 쪽지함 버튼 */}
      <button className={styles.inboxBtn} onClick={handleOpen} title="쪽지함">
        ✉️
        {unread > 0 && <span className={styles.unreadBadge}>{unread > 9 ? '9+' : unread}</span>}
      </button>

      {/* 쪽지함 패널 */}
      {open && (
        <div className={styles.overlay} onClick={e => { if (e.target === e.currentTarget) handleClose(); }}>
          <div className={styles.panel}>
            {/* 헤더 */}
            <div className={styles.panelHeader}>
              <div className={styles.panelTitle}>
                <span>✉️ 쪽지함</span>
                <span className={styles.countChip}>{messages.length}개</span>
              </div>
              <div className={styles.panelActions}>
                {unread > 0 && (
                  <button className={styles.markAllBtn} onClick={handleMarkAllRead}>
                    모두 읽음
                  </button>
                )}
                <button className={styles.closeBtn} onClick={handleClose}>✕</button>
              </div>
            </div>

            <div className={styles.panelBody}>
              {/* 메시지 목록 */}
              <div className={styles.msgList}>
                {messages.length === 0 && (
                  <div className={styles.emptyMsg}>
                    <div style={{ fontSize: 32 }}>📭</div>
                    <div>받은 쪽지가 없습니다.</div>
                  </div>
                )}
                {messages.map(msg => (
                  <div
                    key={msg.id}
                    className={`${styles.msgItem} ${!msg.read ? styles.msgUnread : ''} ${selected?.id === msg.id ? styles.msgSelected : ''}`}
                    onClick={() => handleRead(msg)}
                  >
                    <div className={styles.msgItemHeader}>
                      <span className={styles.msgFrom}>{msg.fromName}</span>
                      <span className={styles.msgDate}>{new Date(msg.createdAt).toLocaleDateString('ko-KR')}</span>
                    </div>
                    <div className={styles.msgSubject}>
                      {!msg.read && <span className={styles.newDot} />}
                      {msg.subject}
                    </div>
                    <div className={styles.msgPreview}>{msg.content.slice(0, 40)}…</div>
                  </div>
                ))}
              </div>

              {/* 메시지 상세 */}
              {selected && (
                <div className={styles.msgDetail}>
                  <div className={styles.detailHeader}>
                    <div className={styles.detailSubject}>{selected.subject}</div>
                    <div className={styles.detailMeta}>
                      <span>보낸 사람: <strong>{selected.fromName}</strong></span>
                      <span>{formatDate(selected.createdAt)}</span>
                    </div>
                  </div>
                  <div className={styles.detailContent}>
                    {selected.content.split('\n').map((line, i) => (
                      <p key={i}>{line || <br />}</p>
                    ))}
                  </div>
                  <button className={styles.deleteBtn} onClick={() => handleDelete(selected.id)}>
                    🗑️ 삭제
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
