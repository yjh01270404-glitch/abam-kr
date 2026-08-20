'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '../../context/AppContext';
import {
  getMessagesForUser, getUnreadCount,
  markAsRead, markAllRead, deleteMessage, formatDate, Message
} from '../../lib/messages';
import AbamLogo from '../../components/AbamLogo';
import Link from 'next/link';
import styles from './messages.module.css';

export default function MessagesPage() {
  const { currentUser } = useApp();
  const router = useRouter();

  const [messages, setMessages] = useState<Message[]>([]);
  const [unread, setUnread] = useState(0);
  const [selected, setSelected] = useState<Message | null>(null);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const refresh = () => {
    if (!currentUser) return;
    const msgs = getMessagesForUser(currentUser.id).slice().reverse();
    setMessages(msgs);
    setUnread(getUnreadCount(currentUser.id));
  };

  useEffect(() => {
    if (!currentUser) { router.push('/'); return; }
    refresh();

    const handleNewMsg = () => {
      refresh();
    };

    window.addEventListener('abam_new_message', handleNewMsg);
    const t = setInterval(refresh, 3000);
    return () => {
      window.removeEventListener('abam_new_message', handleNewMsg);
      clearInterval(t);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  if (!currentUser) return null;

  const displayMessages = filter === 'unread' ? messages.filter(m => !m.read) : messages;

  const handleRead = (msg: Message) => {
    setSelected(msg);
    if (!msg.read) { markAsRead(msg.id); refresh(); }
  };

  const handleDelete = (id: string) => {
    deleteMessage(id);
    setSelected(null);
    refresh();
  };

  const handleMarkAllRead = () => { markAllRead(currentUser.id); refresh(); };

  return (
    <div className={styles.page}>
      {/* 헤더 */}
      <header className={styles.header}>
        <Link href="/" className={styles.logo}><AbamLogo fontSize={22} /></Link>
        <h1 className={styles.pageTitle}>✉️ 내 쪽지함</h1>
        <div className={styles.headerRight}>
          {unread > 0 && (
            <button className={styles.markAllBtn} onClick={handleMarkAllRead}>
              모두 읽음 처리
            </button>
          )}
          <Link href="/" className={styles.backBtn}>← 메인으로</Link>
        </div>
      </header>

      {/* 탭 필터 */}
      <div className={styles.tabRow}>
        <button
          className={`${styles.tab} ${filter === 'all' ? styles.tabActive : ''}`}
          onClick={() => setFilter('all')}
        >
          전체 <span className={styles.tabCount}>{messages.length}</span>
        </button>
        <button
          className={`${styles.tab} ${filter === 'unread' ? styles.tabActive : ''}`}
          onClick={() => setFilter('unread')}
        >
          읽지 않음 {unread > 0 && <span className={`${styles.tabCount} ${styles.tabCountRed}`}>{unread}</span>}
        </button>
      </div>

      {/* 메인 2단 레이아웃 */}
      <div className={styles.body}>
        {/* 목록 */}
        <div className={styles.listPanel}>
          {displayMessages.length === 0 ? (
            <div className={styles.empty}>
              <div className={styles.emptyIcon}>📭</div>
              <div className={styles.emptyTitle}>
                {filter === 'unread' ? '읽지 않은 쪽지가 없습니다.' : '받은 쪽지가 없습니다.'}
              </div>
              <div className={styles.emptyDesc}>
                관리자로부터 쪽지가 오면 여기서 확인할 수 있습니다.
              </div>
            </div>
          ) : (
            displayMessages.map(msg => (
              <div
                key={msg.id}
                className={`${styles.msgItem} ${!msg.read ? styles.msgUnread : ''} ${selected?.id === msg.id ? styles.msgActive : ''}`}
                onClick={() => handleRead(msg)}
              >
                <div className={styles.msgMeta}>
                  <span className={styles.msgFrom}>
                    {!msg.read && <span className={styles.newDot} />}
                    {msg.fromName}
                  </span>
                  <span className={styles.msgDate}>
                    {new Date(msg.createdAt).toLocaleDateString('ko-KR', { month: '2-digit', day: '2-digit' })}
                  </span>
                </div>
                <div className={styles.msgSubject}>{msg.subject}</div>
                <div className={styles.msgPreview}>{msg.content.slice(0, 50)}...</div>
              </div>
            ))
          )}
        </div>

        {/* 상세 */}
        <div className={styles.detailPanel}>
          {selected ? (
            <div className={styles.detailInner}>
              <div className={styles.detailSubject}>{selected.subject}</div>
              <div className={styles.detailInfo}>
                <div className={styles.detailFrom}>
                  <span className={styles.avatarIcon}>👤</span>
                  <div>
                    <div className={styles.fromName}>{selected.fromName}</div>
                    <div className={styles.fromRole}>아름다운밤 운영팀</div>
                  </div>
                </div>
                <div className={styles.detailDate}>{formatDate(selected.createdAt)}</div>
              </div>
              <div className={styles.detailDivider} />
              <div className={styles.detailContent}>
                {selected.content.split('\n').map((line, i) => (
                  <p key={i}>{line || <br />}</p>
                ))}
              </div>
              <div className={styles.detailActions}>
                <button className={styles.deleteBtn} onClick={() => handleDelete(selected.id)}>
                  🗑️ 삭제
                </button>
              </div>
            </div>
          ) : (
            <div className={styles.noSelect}>
              <div className={styles.noSelectIcon}>✉️</div>
              <div className={styles.noSelectText}>왼쪽에서 쪽지를 선택하세요</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
