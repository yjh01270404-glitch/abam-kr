'use client';

import { useState, useEffect, useCallback } from 'react';
import { getAllMessages, sendMessage, deleteMessage, formatDate, Message, getMessagesForUser } from '../../lib/messages';
import { getChatSessions, sendChatMsg, markSessionRead, ChatSession } from '../../lib/chat';
import styles from './admin.module.css';

interface UserRecord {
  id: string; username: string; nickname: string; role: string;
  gender: string; birthdate: string; joinDate?: string;
  lastLogin?: string; lastIp?: string; lastDevice?: string; verified: boolean;
}

interface JobAd {
  id: string; type: string; title: string; companyName: string;
  location: string; pay: string; viewCount: number;
  contactPhone?: string; contactKakao?: string; createdAt?: string;
}

interface EmployerReq {
  id: string; name: string; regNumber: string; owner: string;
  phone: string; status: string; date: string;
}

type Tab = 'dashboard' | 'users' | 'ads' | 'employers' | 'pending' | 'messages' | 'livechat' | 'refunds';

interface SendMsgTarget { userId: string; username: string; nickname: string; }

interface RefundableAd {
  id: string; type: string; title: string; companyName: string;
  location: string; pay: string;
  paymentHistory?: Array<{ amount: number; months: number; planName: string; startDate: string; endDate: string }>;
  refundRequest?: { status: string; reason: string; requestedAt: string; refundAmount: number; rejectedReason?: string };
}

export default function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const [tab, setTab] = useState<Tab>('dashboard');
  const [users, setUsers] = useState<UserRecord[]>([]);
  const [ads, setAds] = useState<JobAd[]>([]);
  const [pendingAds, setPendingAds] = useState<JobAd[]>([]);
  const [employers, setEmployers] = useState<EmployerReq[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([]);
  const [search, setSearch] = useState('');
  const [now, setNow] = useState('');
  const [refundAds, setRefundAds] = useState<RefundableAd[]>([]);
  const [rejectReasons, setRejectReasons] = useState<Record<string, string>>({});
  
  // 실시간 채팅
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [chatInput, setChatInput] = useState('');

  // 쪽지 발송 모달
  const [sendTarget, setSendTarget] = useState<SendMsgTarget | null>(null);
  const [msgSubject, setMsgSubject] = useState('');
  const [msgContent, setMsgContent] = useState('');
  const [sendOk, setSendOk] = useState(false);

  // 일괄 쪽지
  const [bulkMode, setBulkMode] = useState(false);

  const loadData = useCallback(() => {
    const rawUsers: Array<UserRecord & { password: string }> = JSON.parse(localStorage.getItem('abam_users') ?? '[]');
    setUsers(rawUsers.map(({ password: _p, ...u }) => u));
    const top = JSON.parse(localStorage.getItem('abam_top_banners') ?? '[]');
    const prio = JSON.parse(localStorage.getItem('abam_priority_jobs') ?? '[]');
    const rec = JSON.parse(localStorage.getItem('abam_recommended_jobs') ?? '[]');
    const gen = JSON.parse(localStorage.getItem('abam_general_jobs') ?? '[]');
    setAds([...top, ...prio, ...rec, ...gen]);
    const allAds: RefundableAd[] = [...top, ...prio, ...rec, ...gen];
    setRefundAds(allAds.filter(a => a.refundRequest?.status === 'pending'));
    setPendingAds(JSON.parse(localStorage.getItem('abam_pending_ads') ?? '[]'));
    setEmployers(JSON.parse(localStorage.getItem('abam_employers') ?? '[]'));
    setMessages(getAllMessages());
    setChatSessions(getChatSessions());
  }, []);

  useEffect(() => {
    setNow(new Date().toLocaleString('ko-KR'));
    loadData();
    const t = setInterval(() => { setNow(new Date().toLocaleString('ko-KR')); loadData(); }, 5000);
    return () => clearInterval(t);
  }, [loadData]);

  const approveAd = (adId: string) => {
    const ad = pendingAds.find(a => a.id === adId); if (!ad) return;
    const remaining = pendingAds.filter(a => a.id !== adId);
    localStorage.setItem('abam_pending_ads', JSON.stringify(remaining));
    const key = ad.type === 'top' ? 'abam_top_banners' : ad.type === 'priority' ? 'abam_priority_jobs' : 'abam_general_jobs';
    const existing = JSON.parse(localStorage.getItem(key) ?? '[]');
    localStorage.setItem(key, JSON.stringify([ad, ...existing]));
    loadData();
  };
  const rejectAd = (adId: string) => {
    localStorage.setItem('abam_pending_ads', JSON.stringify(pendingAds.filter(a => a.id !== adId)));
    loadData();
  };
  const approveEmployer = (id: string) => {
    localStorage.setItem('abam_employers', JSON.stringify(employers.map(e => e.id === id ? { ...e, status: 'approved' } : e)));
    loadData();
  };
  const rejectEmployer = (id: string) => {
    localStorage.setItem('abam_employers', JSON.stringify(employers.map(e => e.id === id ? { ...e, status: 'rejected' } : e)));
    loadData();
  };
  const deleteUser = (userId: string) => {
    if (!confirm('이 사용자를 삭제하시겠습니까?')) return;
    const all = JSON.parse(localStorage.getItem('abam_users') ?? '[]');
    localStorage.setItem('abam_users', JSON.stringify(all.filter((u: UserRecord) => u.id !== userId)));
    loadData();
  };

  // 환불 승인 — 공정위 기준 환불액으로 처리
  const approveRefund = (adId: string) => {
    const keys = ['abam_top_banners', 'abam_priority_jobs', 'abam_recommended_jobs', 'abam_general_jobs'];
    for (const key of keys) {
      const list: RefundableAd[] = JSON.parse(localStorage.getItem(key) ?? '[]');
      const idx = list.findIndex(a => a.id === adId);
      if (idx !== -1) {
        list[idx] = {
          ...list[idx],
          refundRequest: { ...list[idx].refundRequest!, status: 'approved', rejectedReason: undefined },
        };
        localStorage.setItem(key, JSON.stringify(list));
        break;
      }
    }
    loadData();
  };

  // 환불 거부
  const rejectRefundRequest = (adId: string) => {
    const reason = rejectReasons[adId] || '환불 조건에 해당하지 않습니다.';
    const keys = ['abam_top_banners', 'abam_priority_jobs', 'abam_recommended_jobs', 'abam_general_jobs'];
    for (const key of keys) {
      const list: RefundableAd[] = JSON.parse(localStorage.getItem(key) ?? '[]');
      const idx = list.findIndex(a => a.id === adId);
      if (idx !== -1) {
        list[idx] = {
          ...list[idx],
          refundRequest: { ...list[idx].refundRequest!, status: 'rejected', rejectedReason: reason },
        };
        localStorage.setItem(key, JSON.stringify(list));
        break;
      }
    }
    loadData();
  };

  // 쪽지 발송
  const handleSendMsg = () => {
    if (!sendTarget || !msgSubject.trim() || !msgContent.trim()) return;
    sendMessage({
      from: 'admin', fromName: '관리자',
      to: sendTarget.userId, toName: sendTarget.nickname || sendTarget.username,
      subject: msgSubject, content: msgContent,
    });
    setSendOk(true);
    setMsgSubject(''); setMsgContent('');
    setTimeout(() => { setSendOk(false); setSendTarget(null); }, 1200);
    loadData();
  };

  // 전체 회원 일괄 쪽지
  const handleBulkSend = () => {
    if (!msgSubject.trim() || !msgContent.trim()) return;
    users.forEach(u => sendMessage({
      from: 'admin', fromName: '관리자',
      to: u.id, toName: u.nickname || u.username,
      subject: msgSubject, content: msgContent,
    }));
    setSendOk(true);
    setMsgSubject(''); setMsgContent('');
    setTimeout(() => { setSendOk(false); setBulkMode(false); }, 1500);
    loadData();
  };

  const filteredUsers = users.filter(u =>
    u.username.includes(search) || (u.nickname ?? '').includes(search) || (u.lastIp ?? '').includes(search)
  );

  const stats = {
    totalUsers: users.length,
    seekers: users.filter(u => u.role === 'seeker').length,
    employers_count: users.filter(u => u.role === 'employer').length,
    totalAds: ads.length,
    pendingCount: pendingAds.length,
    employerReqs: employers.filter(e => e.status === 'pending').length,
    unreadMsgs: messages.filter(m => !m.read).length,
  };

  const navItems: { key: Tab; icon: string; label: string; badge?: number }[] = [
    { key: 'dashboard', icon: '📊', label: '대시보드' },
    { key: 'users', icon: '👥', label: '회원 관리', badge: stats.totalUsers },
    { key: 'ads', icon: '📋', label: '광고 관리', badge: stats.totalAds },
    { key: 'pending', icon: '⏳', label: '승인 대기', badge: stats.pendingCount + stats.employerReqs },
    { key: 'employers', icon: '🏢', label: '업소 관리', badge: stats.employerReqs },
    { key: 'refunds', icon: '💰', label: '환불 관리', badge: refundAds.length },
    { key: 'messages', icon: '✉️', label: '쪽지함', badge: messages.length },
    { key: 'livechat', icon: '💬', label: '실시간 문의', badge: chatSessions.reduce((acc, s) => acc + s.unreadAdmin, 0) },
  ];

  const handleAdminChatSend = () => {
    if (!selectedChatId || !chatInput.trim()) return;
    sendChatMsg(selectedChatId, '관리자', chatInput.trim());
    setChatInput('');
    loadData();
  };

  return (
    <div className={styles.adminLayout}>
      {/* 사이드바 */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarLogo}>
          <span>🌙</span>
          <div>
            <div className={styles.sidebarTitle}>아름다운밤</div>
            <div className={styles.sidebarSub}>Admin Console</div>
          </div>
        </div>
        <nav className={styles.sidebarNav}>
          {navItems.map(item => (
            <button key={item.key} className={`${styles.navItem} ${tab === item.key ? styles.navItemActive : ''}`} onClick={() => setTab(item.key)}>
              <span className={styles.navIcon}>{item.icon}</span>
              <span className={styles.navLabel}>{item.label}</span>
              {item.badge != null && item.badge > 0 && <span className={styles.navBadge}>{item.badge}</span>}
            </button>
          ))}
        </nav>
        <div className={styles.sidebarFooter}>
          <div className={styles.sidebarTime}>⏰ {now}</div>
          <button className={styles.logoutBtn} onClick={onLogout}>로그아웃</button>
        </div>
      </aside>

      {/* 메인 */}
      <main className={styles.adminMain}>

        {/* ── 대시보드 ── */}
        {tab === 'dashboard' && (
          <div>
            <h1 className={styles.pageTitle}>📊 대시보드</h1>
            <div className={styles.statsGrid}>
              {[
                { label: '전체 회원', value: stats.totalUsers, icon: '👥', color: '#c2185b', sub: `구직자 ${stats.seekers} / 업소 ${stats.employers_count}` },
                { label: '등록 광고', value: stats.totalAds, icon: '📋', color: '#7c3aed', sub: '활성 광고 총계' },
                { label: '승인 대기', value: stats.pendingCount, icon: '⏳', color: '#d97706', sub: '광고 심사 필요' },
                { label: '발송 쪽지', value: messages.length, icon: '✉️', color: '#0891b2', sub: `미읽음 ${stats.unreadMsgs}건` },
              ].map(s => (
                <div key={s.label} className={styles.statCard} style={{ borderTop: `3px solid ${s.color}` }}>
                  <div className={styles.statIcon}>{s.icon}</div>
                  <div className={styles.statValue} style={{ color: s.color }}>{s.value}</div>
                  <div className={styles.statLabel}>{s.label}</div>
                  <div className={styles.statSub}>{s.sub}</div>
                </div>
              ))}
            </div>

            {/* 최근 가입 */}
            <div className={styles.tableSection}>
              <h2 className={styles.sectionTitle}>최근 가입 회원 (최신 5명)</h2>
              <table className={styles.table}>
                <thead><tr><th>닉네임</th><th>아이디</th><th>구분</th><th>가입일</th><th>마지막 IP</th><th>기기</th><th>쪽지</th></tr></thead>
                <tbody>
                  {users.slice(-5).reverse().map(u => (
                    <tr key={u.id}>
                      <td><strong>{u.nickname || u.username}</strong></td>
                      <td>{u.username}</td>
                      <td><span className={u.role === 'employer' ? styles.badgeEmployer : styles.badgeSeeker}>{u.role === 'employer' ? '업소' : '구직자'}</span></td>
                      <td className={styles.tdMono}>{u.joinDate ? new Date(u.joinDate).toLocaleDateString('ko-KR') : '-'}</td>
                      <td className={styles.tdMono}>{u.lastIp || '미접속'}</td>
                      <td className={styles.tdSmall}>{u.lastDevice || '-'}</td>
                      <td><button className={styles.btnMsg} onClick={() => { setSendTarget({ userId: u.id, username: u.username, nickname: u.nickname }); setTab('users'); }}>✉️</button></td>
                    </tr>
                  ))}
                  {users.length === 0 && <tr><td colSpan={7} className={styles.emptyRow}>가입 회원이 없습니다.</td></tr>}
                </tbody>
              </table>
            </div>

            {pendingAds.length > 0 && (
              <div className={styles.tableSection}>
                <h2 className={styles.sectionTitle}>⚠️ 광고 승인 대기 ({pendingAds.length}건)</h2>
                <table className={styles.table}>
                  <thead><tr><th>공고명</th><th>업소명</th><th>지역</th><th>유형</th><th>조치</th></tr></thead>
                  <tbody>
                    {pendingAds.slice(0, 5).map(ad => (
                      <tr key={ad.id}>
                        <td>{ad.title}</td><td>{ad.companyName}</td><td>{ad.location}</td>
                        <td><span className={styles.badgeType}>{ad.type}</span></td>
                        <td>
                          <button className={styles.btnApprove} onClick={() => approveAd(ad.id)}>승인</button>
                          <button className={styles.btnReject} onClick={() => rejectAd(ad.id)}>거절</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ── 회원 관리 ── */}
        {tab === 'users' && (
          <div>
            <div className={styles.pageTitleRow}>
              <h1 className={styles.pageTitle}>👥 회원 관리</h1>
              <button className={styles.bulkBtn} onClick={() => setBulkMode(true)}>📢 전체 회원 일괄 쪽지</button>
            </div>
            <div className={styles.searchBar}>
              <input className={styles.searchInput} placeholder="🔍 아이디 / 닉네임 / IP 검색" value={search} onChange={e => setSearch(e.target.value)} />
              <span className={styles.searchCount}>총 {filteredUsers.length}명</span>
            </div>
            <div className={styles.tableSection}>
              <table className={styles.table}>
                <thead><tr>
                  <th>#</th><th>닉네임</th><th>아이디</th><th>구분</th><th>성별</th>
                  <th>생년월일</th><th>가입일</th><th>마지막 로그인</th>
                  <th>접속 IP</th><th>기기</th><th>쪽지수</th><th>조치</th>
                </tr></thead>
                <tbody>
                  {filteredUsers.map((u, i) => {
                    const userMsgs = getMessagesForUser(u.id);
                    const unread = userMsgs.filter(m => !m.read).length;
                    return (
                      <tr key={u.id}>
                        <td className={styles.tdMono}>{i + 1}</td>
                        <td><strong>{u.nickname || '-'}</strong></td>
                        <td className={styles.tdMono}>{u.username}</td>
                        <td><span className={u.role === 'employer' ? styles.badgeEmployer : styles.badgeSeeker}>{u.role === 'employer' ? '업소' : '구직자'}</span></td>
                        <td>{u.gender === 'F' ? '여성' : '남성'}</td>
                        <td className={styles.tdMono}>{u.birthdate || '-'}</td>
                        <td className={styles.tdMono}>{u.joinDate ? new Date(u.joinDate).toLocaleDateString('ko-KR') : '-'}</td>
                        <td className={styles.tdMono}>{u.lastLogin ? new Date(u.lastLogin).toLocaleString('ko-KR') : '미접속'}</td>
                        <td className={styles.tdMono}>{u.lastIp ?? '미기록'}</td>
                        <td className={styles.tdSmall}>{u.lastDevice ?? '-'}</td>
                        <td className={styles.tdMono}>
                          {userMsgs.length > 0 ? (
                            <span style={{ color: unread > 0 ? '#e91e63' : '#9ca3af' }}>
                              {userMsgs.length}건 {unread > 0 ? `(미읽음 ${unread})` : ''}
                            </span>
                          ) : '-'}
                        </td>
                        <td style={{ whiteSpace: 'nowrap' }}>
                          <button className={styles.btnMsg} onClick={() => setSendTarget({ userId: u.id, username: u.username, nickname: u.nickname })}>✉️ 쪽지</button>
                          <button className={styles.btnReject} onClick={() => deleteUser(u.id)}>삭제</button>
                        </td>
                      </tr>
                    );
                  })}
                  {filteredUsers.length === 0 && <tr><td colSpan={12} className={styles.emptyRow}>회원이 없습니다.</td></tr>}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── 광고 관리 ── */}
        {tab === 'ads' && (
          <div>
            <h1 className={styles.pageTitle}>📋 광고 관리</h1>
            <div className={styles.tableSection}>
              <table className={styles.table}>
                <thead><tr><th>#</th><th>유형</th><th>공고명</th><th>업소명</th><th>지역</th><th>급여</th><th>연락처</th><th>등록일</th><th>조회수</th></tr></thead>
                <tbody>
                  {ads.map((ad, i) => (
                    <tr key={ad.id}>
                      <td className={styles.tdMono}>{i + 1}</td>
                      <td><span className={styles.badgeType}>{ad.type}</span></td>
                      <td className={styles.tdTitle}>{ad.title}</td>
                      <td>{ad.companyName}</td>
                      <td>{ad.location}</td>
                      <td className={styles.tdPay}>{ad.pay}</td>
                      <td className={styles.tdMono}>{ad.contactPhone ?? '-'}</td>
                      <td className={styles.tdMono}>{ad.createdAt ? new Date(ad.createdAt).toLocaleDateString('ko-KR') : '미기록'}</td>
                      <td className={styles.tdMono}>{ad.viewCount}</td>
                    </tr>
                  ))}
                  {ads.length === 0 && <tr><td colSpan={9} className={styles.emptyRow}>광고 없음</td></tr>}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── 승인 대기 ── */}
        {tab === 'pending' && (
          <div>
            <h1 className={styles.pageTitle}>⏳ 승인 대기</h1>
            <div className={styles.tableSection}>
              <h2 className={styles.sectionTitle}>광고 심사 대기 ({pendingAds.length}건)</h2>
              <table className={styles.table}>
                <thead><tr><th>유형</th><th>공고명</th><th>업소명</th><th>지역</th><th>급여</th><th>연락처</th><th>신청일</th><th>조치</th></tr></thead>
                <tbody>
                  {pendingAds.map(ad => (
                    <tr key={ad.id}>
                      <td><span className={styles.badgeType}>{ad.type}</span></td>
                      <td className={styles.tdTitle}>{ad.title}</td>
                      <td>{ad.companyName}</td><td>{ad.location}</td>
                      <td className={styles.tdPay}>{ad.pay}</td>
                      <td className={styles.tdMono}>{ad.contactPhone ?? '-'}</td>
                      <td className={styles.tdMono}>{ad.createdAt ? new Date(ad.createdAt).toLocaleDateString('ko-KR') : '미기록'}</td>
                      <td>
                        <button className={styles.btnApprove} onClick={() => approveAd(ad.id)}>✅ 승인</button>
                        <button className={styles.btnReject} onClick={() => rejectAd(ad.id)}>❌ 거절</button>
                      </td>
                    </tr>
                  ))}
                  {pendingAds.length === 0 && <tr><td colSpan={8} className={styles.emptyRow}>대기 중인 광고 없음</td></tr>}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── 업소 관리 ── */}
        {tab === 'employers' && (
          <div>
            <h1 className={styles.pageTitle}>🏢 업소 관리</h1>
            <div className={styles.tableSection}>
              <table className={styles.table}>
                <thead><tr><th>상태</th><th>업소명</th><th>사업자번호</th><th>대표자</th><th>연락처</th><th>신청일</th><th>조치</th></tr></thead>
                <tbody>
                  {employers.map(emp => (
                    <tr key={emp.id}>
                      <td><span className={emp.status === 'approved' ? styles.badgeApproved : emp.status === 'rejected' ? styles.badgeRejected : styles.badgePending}>
                        {emp.status === 'approved' ? '승인됨' : emp.status === 'rejected' ? '거절됨' : '대기중'}
                      </span></td>
                      <td><strong>{emp.name}</strong></td>
                      <td className={styles.tdMono}>{emp.regNumber}</td>
                      <td>{emp.owner}</td>
                      <td className={styles.tdMono}>{emp.phone}</td>
                      <td className={styles.tdMono}>{emp.date}</td>
                      <td>
                        {emp.status === 'pending' && (<>
                          <button className={styles.btnApprove} onClick={() => approveEmployer(emp.id)}>승인</button>
                          <button className={styles.btnReject} onClick={() => rejectEmployer(emp.id)}>거절</button>
                        </>)}
                        {emp.status !== 'pending' && <span className={styles.tdSmall}>처리완료</span>}
                      </td>
                    </tr>
                  ))}
                  {employers.length === 0 && <tr><td colSpan={7} className={styles.emptyRow}>신청 업소 없음</td></tr>}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── 환불 관리 ── */}
        {tab === 'refunds' && (
          <div>
            <h1 className={styles.pageTitle}>💰 환불 관리</h1>
            <div style={{ background: '#fffbeb', border: '1px solid #fcd34d', borderRadius: 10, padding: '12px 16px', marginBottom: 20, fontSize: 12.5, color: '#92400e', lineHeight: 1.7 }}>
              <strong>📋 공정거래위원회 소비자분쟁해결기준</strong><br />
              이용기간 0일 (미사용) → <strong>100% 전액 환불</strong> &nbsp;|&nbsp;
              전체 기간의 1/3 이하 → <strong>2/3 환불</strong> &nbsp;|&nbsp;
              전체 기간의 1/2 이하 → <strong>1/2 환불</strong> &nbsp;|&nbsp;
              전체 기간의 1/2 초과 → <strong>환불 불가</strong>
            </div>
            <div className={styles.tableSection}>
              {refundAds.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px', color: '#9ca3af', fontSize: 14 }}>대기 중인 환불 요청이 없습니다.</div>
              ) : (
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>업소명</th><th>공고명</th><th>요청 사유</th>
                      <th>결제액</th><th>환불 예정액</th><th>신청일</th><th>거부 사유</th><th>조치</th>
                    </tr>
                  </thead>
                  <tbody>
                    {refundAds.map(ad => (
                      <tr key={ad.id}>
                        <td><strong>{ad.companyName}</strong></td>
                        <td className={styles.tdTitle}>{ad.title}</td>
                        <td className={styles.tdSmall}>{ad.refundRequest?.reason || '-'}</td>
                        <td className={styles.tdPay}>
                          {ad.paymentHistory && ad.paymentHistory.length > 0
                            ? `${ad.paymentHistory[ad.paymentHistory.length - 1].amount.toLocaleString()}원`
                            : '-'}
                        </td>
                        <td className={styles.tdPay} style={{ color: '#16a34a', fontWeight: 700 }}>
                          {ad.refundRequest ? `${ad.refundRequest.refundAmount.toLocaleString()}원` : '-'}
                        </td>
                        <td className={styles.tdMono}>
                          {ad.refundRequest?.requestedAt
                            ? new Date(ad.refundRequest.requestedAt).toLocaleDateString('ko-KR')
                            : '-'}
                        </td>
                        <td>
                          <input
                            style={{ fontSize: 11, padding: '4px 8px', border: '1px solid #e5e7eb', borderRadius: 6, width: 130 }}
                            placeholder="거부 사유 입력"
                            value={rejectReasons[ad.id] || ''}
                            onChange={e => setRejectReasons(prev => ({ ...prev, [ad.id]: e.target.value }))}
                          />
                        </td>
                        <td style={{ whiteSpace: 'nowrap' }}>
                          <button className={styles.btnApprove} onClick={() => approveRefund(ad.id)}>✅ 승인</button>
                          <button className={styles.btnReject} onClick={() => rejectRefundRequest(ad.id)}>❌ 거부</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}

        {/* ── 쪽지함 ── */}
        {tab === 'messages' && (
          <div>
            <div className={styles.pageTitleRow}>
              <h1 className={styles.pageTitle}>✉️ 쪽지함</h1>
              <button className={styles.bulkBtn} onClick={() => setBulkMode(true)}>📢 전체 회원 일괄 발송</button>
            </div>
            <div className={styles.tableSection}>
              <h2 className={styles.sectionTitle}>발송된 쪽지 목록 ({messages.length}건)</h2>
              <table className={styles.table}>
                <thead><tr><th>상태</th><th>수신자</th><th>제목</th><th>내용 미리보기</th><th>발송일시</th><th>조치</th></tr></thead>
                <tbody>
                  {messages.slice().reverse().map(m => (
                    <tr key={m.id}>
                      <td>
                        <span className={m.read ? styles.badgeApproved : styles.badgePending}>
                          {m.read ? '읽음' : '미읽음'}
                        </span>
                      </td>
                      <td><strong>{m.toName}</strong><br/><span className={styles.tdSmall}>{m.to}</span></td>
                      <td className={styles.tdTitle}>{m.subject}</td>
                      <td className={styles.tdSmall}>{m.content.slice(0, 40)}{m.content.length > 40 ? '…' : ''}</td>
                      <td className={styles.tdMono}>{formatDate(m.createdAt)}</td>
                      <td><button className={styles.btnReject} onClick={() => { deleteMessage(m.id); loadData(); }}>삭제</button></td>
                    </tr>
                  ))}
                  {messages.length === 0 && <tr><td colSpan={6} className={styles.emptyRow}>발송된 쪽지가 없습니다.</td></tr>}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── 실시간 문의 ── */}
        {tab === 'livechat' && (
          <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 40px)' }}>
            <h1 className={styles.pageTitle}>💬 실시간 문의</h1>
            <div style={{ display: 'flex', gap: '20px', flex: 1, minHeight: 0 }}>
              {/* 목록 */}
              <div style={{ width: '300px', background: '#fff', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', overflowY: 'auto' }}>
                {chatSessions.length === 0 && <div style={{ padding: '20px', textAlign: 'center', color: '#9ca3af' }}>진행 중인 문의가 없습니다.</div>}
                {chatSessions.slice().reverse().map(s => (
                  <div key={s.sessionId} onClick={() => { setSelectedChatId(s.sessionId); markSessionRead(s.sessionId, '관리자'); loadData(); }}
                    style={{ padding: '16px', borderBottom: '1px solid #f3f4f6', cursor: 'pointer', background: selectedChatId === s.sessionId ? '#fff0f5' : '#fff' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <strong style={{ color: '#e91e63' }}>{s.nickname}</strong>
                      {s.unreadAdmin > 0 && <span style={{ background: '#e91e63', color: '#fff', borderRadius: '50%', padding: '0 6px', fontSize: '11px', fontWeight: 'bold' }}>{s.unreadAdmin}</span>}
                    </div>
                    <div style={{ fontSize: '12px', color: '#6b7280', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {s.msgs[s.msgs.length - 1]?.text}
                    </div>
                    <div style={{ fontSize: '11px', color: '#9ca3af', marginTop: '4px' }}>{new Date(s.updatedAt).toLocaleTimeString('ko-KR')}</div>
                  </div>
                ))}
              </div>
              {/* 채팅창 */}
              <div style={{ flex: 1, background: '#fff', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column' }}>
                {selectedChatId ? (() => {
                  const s = chatSessions.find(x => x.sessionId === selectedChatId);
                  if (!s) return null;
                  return (
                    <>
                      <div style={{ padding: '16px', borderBottom: '1px solid #f3f4f6', fontWeight: 'bold' }}>{s.nickname}님과의 대화</div>
                      <div style={{ flex: 1, padding: '16px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {s.msgs.map(m => (
                          <div key={m.id} style={{ alignSelf: m.from === '관리자' ? 'flex-end' : 'flex-start', maxWidth: '70%' }}>
                            <div style={{ fontSize: '11px', color: '#9ca3af', marginBottom: '2px', textAlign: m.from === '관리자' ? 'right' : 'left' }}>{m.from} {m.time}</div>
                            <div style={{ padding: '10px 14px', borderRadius: '16px', background: m.from === '관리자' ? '#e91e63' : '#f3f4f6', color: m.from === '관리자' ? '#fff' : '#111827' }}>
                              {m.text}
                            </div>
                          </div>
                        ))}
                      </div>
                      <div style={{ padding: '16px', borderTop: '1px solid #f3f4f6', display: 'flex', gap: '8px' }}>
                        <input style={{ flex: 1, padding: '10px 14px', borderRadius: '8px', border: '1px solid #e5e7eb' }}
                          value={chatInput} onChange={e => setChatInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleAdminChatSend()}
                          placeholder="메시지를 입력하세요..." />
                        <button onClick={handleAdminChatSend} style={{ background: '#e91e63', color: '#fff', padding: '0 20px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>전송</button>
                      </div>
                    </>
                  );
                })() : (
                  <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9ca3af' }}>왼쪽에서 대화를 선택해주세요.</div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ── 쪽지 발송 모달 ── */}
      {(sendTarget || bulkMode) && (
        <div className={styles.modalOverlay} onClick={e => { if (e.target === e.currentTarget) { setSendTarget(null); setBulkMode(false); } }}>
          <div className={styles.msgModal}>
            <div className={styles.msgModalHeader}>
              <h3>{bulkMode ? '📢 전체 회원 일괄 쪽지 발송' : `✉️ 쪽지 발송 → ${sendTarget?.nickname || sendTarget?.username}`}</h3>
              <button className={styles.modalClose} onClick={() => { setSendTarget(null); setBulkMode(false); }}>✕</button>
            </div>

            {bulkMode && (
              <div className={styles.bulkWarning}>
                ⚠️ 전체 <strong>{users.length}명</strong>의 회원에게 쪽지가 발송됩니다.
              </div>
            )}

            <div className={styles.msgField}>
              <label>제목</label>
              <input
                value={msgSubject}
                onChange={e => setMsgSubject(e.target.value)}
                placeholder="쪽지 제목을 입력하세요"
                className={styles.msgInput}
              />
            </div>
            <div className={styles.msgField}>
              <label>내용</label>
              <textarea
                value={msgContent}
                onChange={e => setMsgContent(e.target.value)}
                placeholder="쪽지 내용을 입력하세요"
                className={styles.msgTextarea}
                rows={6}
              />
            </div>

            {/* 빠른 템플릿 */}
            <div className={styles.templateRow}>
              <span className={styles.templateLabel}>빠른 선택:</span>
              {[
                { label: '가입 축하', subject: '🎉 아름다운밤 가입을 축하합니다!', content: '안녕하세요!\n\n아름다운밤에 가입해주셔서 진심으로 감사드립니다. 궁금한 점이 있으시면 언제든지 고객센터로 연락 주세요.\n\n- 아름다운밤 운영팀' },
                { label: '수정 요청', subject: '📝 광고 정보 수정 요청', content: '안녕하세요.\n\n등록하신 광고에 수정이 필요한 사항이 있습니다. 아래 내용을 확인하시고 빠른 시일 내에 수정해 주시기 바랍니다.\n\n[수정 내용]\n\n- 아름다운밤 운영팀' },
                { label: '이용 안내', subject: '📋 서비스 이용 안내', content: '안녕하세요, 아름다운밤입니다.\n\n저희 서비스를 이용해 주셔서 감사합니다. 서비스 이용과 관련한 안내 말씀을 드립니다.\n\n[안내 내용]\n\n감사합니다.\n- 아름다운밤 운영팀' },
                { label: '경고', subject: '⚠️ 이용 약관 위반 경고', content: '안녕하세요.\n\n이용 약관에 위반되는 행위가 감지되어 안내 드립니다. 반복 시 계정이 정지될 수 있으니 주의 부탁드립니다.\n\n- 아름다운밤 운영팀' },
              ].map(t => (
                <button key={t.label} className={styles.templateBtn}
                  onClick={() => { setMsgSubject(t.subject); setMsgContent(t.content); }}>
                  {t.label}
                </button>
              ))}
            </div>

            {sendOk ? (
              <div className={styles.sendOkMsg}>✅ 쪽지가 발송되었습니다!</div>
            ) : (
              <button
                className={styles.sendMsgBtn}
                onClick={bulkMode ? handleBulkSend : handleSendMsg}
                disabled={!msgSubject.trim() || !msgContent.trim()}
              >
                {bulkMode ? `📢 전체 ${users.length}명에게 발송` : '✉️ 쪽지 발송'}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
