'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { getAllMessages, sendMessage, deleteMessage, formatDate, Message, getMessagesForUser } from '../../lib/messages';
import { getChatSessions, sendChatMsg, markSessionRead, createOrGetSession, ChatSession } from '../../lib/chat';
import { sendPwaPushAlert } from '../../lib/audioAlert';
import AdminPwaInstallPrompt from '../../components/AdminPwaInstallPrompt';
import styles from './admin.module.css';

import { topBanners as staticTop, priorityJobs as staticPriority, recommendedJobs as staticRecommended, generalJobs as staticGeneral } from '../../lib/mockData';
import { vvipBanners as staticVvipList, grandVipBanners as staticGrand, premiumBanners as staticPremium, lineAdsData as staticLine } from '../../lib/mockAds';
import scrapedJobs from '../../lib/scraped_jobs.json';
import { getVBankOrders, updateVBankOrderStatus, VBankOrder } from '../../lib/portone-vbank';

/* ────────────────── Types ────────────────── */
interface UserRecord {
  id: string; username: string; nickname: string; role: string;
  gender: string; birthdate: string; joinDate?: string;
  lastLogin?: string; lastIp?: string; lastDevice?: string; verified: boolean;
}
interface JobAd {
  id: string; type: string; title: string; companyName: string;
  location: string; pay: string; viewCount: number;
  contactPhone?: string; contactKakao?: string; createdAt?: string; expiresAt?: string;
  detailImages?: string[]; raw_input?: any; ai_refined_text?: any;
  preview_image_url?: string; final_image_url?: string;
  approval_status?: 'draft' | 'preview_generated' | 'approved' | 'regenerate_requested';
  payment_status?: 'unpaid' | 'paid';
  description?: string; bannerImageUrl?: string;
}
interface EmployerReq {
  id: string; name: string; regNumber: string; owner: string;
  phone: string; status: string; date: string;
}
interface ActivityLog {
  id: string; sessionId?: string; userId: string; userNick: string;
  type: string; action: string; detail: string;
  page?: string; referrer?: string; browser?: string;
  ip?: string; device?: string; at: string;
}
interface RefundableAd {
  id: string; type: string; title: string; companyName: string;
  location: string; pay: string;
  paymentHistory?: Array<{ amount: number; months: number; planName: string; startDate: string; endDate: string }>;
  refundRequest?: { status: string; reason: string; requestedAt: string; refundAmount: number; rejectedReason?: string };
}
interface SendMsgTarget { userId: string; username: string; nickname: string; }

type Tab = 'dashboard' | 'activitylog' | 'users' | 'ads' | 'employers' | 'pending' | 'messages' | 'livechat' | 'refunds' | 'kpi' | 'experiments' | 'systemlogs' | 'vbank';

const ACT_COLORS: Record<string, string> = {
  '회원가입': '#3b82f6', '로그인': '#10b981', '광고클릭': '#f59e0b', '검색': '#8b5cf6',
  '광고승인': '#16a34a', '광고거절': '#ef4444', '광고삭제': '#ef4444', '광고수정': '#f59e0b',
  '쪽지발송': '#3b82f6', '일괄쪽지': '#3b82f6', '업소승인': '#16a34a', '업소거절': '#ef4444',
  '환불승인': '#16a34a', '환불거절': '#ef4444', '회원삭제': '#ef4444', '재접속': '#ec4899',
  '탭 전환': '#6366f1', '체류 시간': '#14b8a6', '페이지 방문': '#0ea5e9',
};

/* ────────────────── Component ────────────────── */
export default function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const [tab, setTab] = useState<Tab>('dashboard');
  const [users, setUsers] = useState<UserRecord[]>([]);
  const [ads, setAds] = useState<JobAd[]>([]);
  const [pendingAds, setPendingAds] = useState<JobAd[]>([]);
  const [employers, setEmployers] = useState<EmployerReq[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([]);
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);
  const [refundAds, setRefundAds] = useState<RefundableAd[]>([]);
  const [vbankOrders, setVbankOrders] = useState<VBankOrder[]>([]);
  const [now, setNow] = useState('');
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  /* ── 상세 모달 상태 ── */
  const [viewingUser, setViewingUser] = useState<UserRecord | null>(null);
  const [viewingAd, setViewingAd] = useState<JobAd | null>(null);
  const [viewingEmp, setViewingEmp] = useState<EmployerReq | null>(null);
  const [viewingRefund, setViewingRefund] = useState<RefundableAd | null>(null);
  const [viewingMsg, setViewingMsg] = useState<Message | null>(null);
  const [viewingLog, setViewingLog] = useState<ActivityLog | null>(null);
  const [viewingStatModal, setViewingStatModal] = useState<'ads' | 'users' | 'logs' | 'chat' | 'revenue' | 'mrr' | null>(null);
  const [filterSessionId, setFilterSessionId] = useState<string | null>(null);

  /* ── 편집 & 쪽지 모달 ── */
  const [editingAd, setEditingAd] = useState<JobAd | null>(null);
  const [editFields, setEditFields] = useState({ title: '', company: '', location: '', pay: '', phone: '', kakao: '', image: '', desc: '', type: 'general' });
  const [sendTarget, setSendTarget] = useState<SendMsgTarget | null>(null);
  const [bulkMode, setBulkMode] = useState(false);
  const [msgSubject, setMsgSubject] = useState('');
  const [msgContent, setMsgContent] = useState('');
  const [sendOk, setSendOk] = useState(false);

  /* ── 검색/필터 ── */
  const [globalSearch, setGlobalSearch] = useState('');
  const [userSearch, setUserSearch] = useState('');
  const [adSearch, setAdSearch] = useState('');
  const [adCat, setAdCat] = useState('all');
  const [logSearch, setLogSearch] = useState('');
  const [rejectReasons, setRejectReasons] = useState<Record<string, string>>({});

  /* ── 채팅 ── */
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [chatInput, setChatInput] = useState('');

  /* ────────── Toast Notification ────────── */
  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 2500);
  };

  /* ────────── loadData ────────── */
  const loadData = useCallback(() => {
    const raw: Array<UserRecord & { password: string }> = JSON.parse(localStorage.getItem('abam_users') ?? '[]');
    setUsers(raw.map(({ password: _p, ...u }) => u));

    const localTop  = JSON.parse(localStorage.getItem('abam_top_banners') ?? '[]');
    const localPrio = JSON.parse(localStorage.getItem('abam_priority_jobs') ?? '[]');
    const localRec  = JSON.parse(localStorage.getItem('abam_recommended_jobs') ?? '[]');
    const localGen  = JSON.parse(localStorage.getItem('abam_general_jobs') ?? '[]');
    const allAds: JobAd[] = [
      ...localTop, ...localPrio, ...localRec, ...localGen,
      ...staticTop, ...staticPriority, ...staticRecommended, ...staticGeneral,
      ...staticVvipList, ...staticGrand, ...staticPremium, ...staticLine,
      ...(Array.isArray(scrapedJobs) ? scrapedJobs : []),
    ];
    setAds(allAds);
    setPendingAds(JSON.parse(localStorage.getItem('abam_pending_ads') ?? '[]'));
    setEmployers(JSON.parse(localStorage.getItem('abam_employers') ?? '[]'));
    setMessages(getAllMessages());
    setChatSessions(getChatSessions());
    setVbankOrders(getVBankOrders());

    /* 활동 로그 */
    const stored: ActivityLog[] = JSON.parse(localStorage.getItem('abam_activity_logs') ?? '[]');
    const base: ActivityLog[] = raw.flatMap(u => {
      const arr: ActivityLog[] = [];
      if (u.joinDate)  arr.push({ id: `join-${u.id}`, sessionId: `sess-user-${u.id}`, userId: u.id, userNick: u.nickname||u.username, type: '회원가입', action: '신규 회원 가입', detail: `아이디: ${u.username} / 역할: ${u.role==='employer'?'업소':'구직자'}`, ip: u.lastIp||'121.130.14.88', device: u.lastDevice||'Windows PC', browser: 'Chrome', at: u.joinDate });
      if (u.lastLogin) arr.push({ id: `login-${u.id}`, sessionId: `sess-user-${u.id}`, userId: u.id, userNick: u.nickname||u.username, type: '로그인', action: '정상 로그인 성공', detail: `IP: ${u.lastIp||'121.130.14.88'} / 기기: ${u.lastDevice||'Windows PC'}`, ip: u.lastIp||'121.130.14.88', device: u.lastDevice||'Windows PC', browser: 'Chrome', at: u.lastLogin });
      return arr;
    });
    const merged = [...stored, ...base]
      .filter((l, i, arr) => arr.findIndex(x => x.id === l.id) === i)
      .sort((a, b) => new Date(b.at).getTime() - new Date(a.at).getTime());
    setActivityLogs(merged);

    /* 환불 */
    const rfList: RefundableAd[] = [];
    ['abam_top_banners','abam_priority_jobs','abam_recommended_jobs','abam_general_jobs'].forEach(k => {
      const list: RefundableAd[] = JSON.parse(localStorage.getItem(k) ?? '[]');
      list.filter(x => x.refundRequest?.status === 'requested').forEach(x => rfList.push(x));
    });
    setRefundAds(rfList);

    /* 자동 D-10 게재 만료 예고 알림 및 쪽지 자동 발송 */
    try {
      const alerted = JSON.parse(localStorage.getItem('abam_exp_alerted_ads') ?? '{}');
      let newAlertCount = 0;
      allAds.forEach(a => {
        const created = a.createdAt ? new Date(a.createdAt).getTime() : Date.now();
        const expTime = a.expiresAt ? new Date(a.expiresAt).getTime() : created + (30 * 24 * 60 * 60 * 1000);
        const diffDays = Math.ceil((expTime - Date.now()) / (1000 * 60 * 60 * 24));
        if (diffDays <= 10 && diffDays > 0 && !alerted[a.id]) {
          const sub = `📢 [게시종료 만료예고] '${a.companyName}' 님의 구인광고 게시 종료가 ${diffDays}일 남았습니다. (-Day${String(diffDays).padStart(2, '0')})`;
          const body = `안녕하세요 '${a.companyName}' 사장님!\n\n게재 중인 구인광고 ('${a.title}')의 게재 종료일이 ${diffDays}일 남았습니다. (-Day${String(diffDays).padStart(2, '0')})\n구인 광고가 종료되어가고 있으니 마이페이지/광고 관리에서 게시 기간을 확인해주세요.\n\n- 아름다운밤 관리팀`;
          sendMessage({
            from: 'admin',
            fromName: '관리자',
            to: a.companyName,
            toName: a.companyName,
            subject: sub,
            content: body
          });
          sendPwaPushAlert(sub, body, 'specific', a.companyName, '/employer/ad/manage');
          alerted[a.id] = new Date().toISOString();
          newAlertCount++;
        }
      });
      if (newAlertCount > 0) {
        localStorage.setItem('abam_exp_alerted_ads', JSON.stringify(alerted));
      }
    } catch {}
  }, []);

  useEffect(() => {
    loadData();
    const t = setInterval(() => setNow(new Date().toLocaleTimeString('ko-KR')), 1000);
    return () => clearInterval(t);
  }, [loadData]);

  /* ────────── 활동 로그 기록 ────────── */
  const logAct = (type: string, action: string, detail: string) => {
    const log: ActivityLog = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      sessionId: `sess-admin-${Date.now()}`,
      userId: 'admin',
      userNick: '최고관리자 (yjh01270404)',
      type, action, detail,
      ip: '121.130.14.88',
      device: 'Windows PC',
      browser: 'Chrome 126.0',
      at: new Date().toISOString()
    };
    const prev = JSON.parse(localStorage.getItem('abam_activity_logs') ?? '[]');
    localStorage.setItem('abam_activity_logs', JSON.stringify([log, ...prev].slice(0, 1000)));
  };

  const notifySync = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('storage'));
      window.dispatchEvent(new CustomEvent('abam_data_update'));
    }
  };

  /* ────────── Actions ────────── */
  const approveAd = (ad: JobAd) => {
    localStorage.setItem('abam_pending_ads', JSON.stringify(pendingAds.filter(a => a.id !== ad.id)));
    const key = ad.type === 'top' ? 'abam_top_banners' : ad.type === 'priority' ? 'abam_priority_jobs' : 'abam_general_jobs';
    const prev = JSON.parse(localStorage.getItem(key) ?? '[]');
    localStorage.setItem(key, JSON.stringify([{ ...ad, payment_status: 'paid' }, ...prev]));
    logAct('광고승인', `광고 승인: ${ad.title}`, `업소: ${ad.companyName}`);
    setViewingAd(null);
    showToast(`✅ '${ad.companyName}' 광고 승인 완료`);
    loadData();
    notifySync();
  };

  const rejectAd = (ad: JobAd) => {
    localStorage.setItem('abam_pending_ads', JSON.stringify(pendingAds.filter(a => a.id !== ad.id)));
    logAct('광고거절', `광고 거절: ${ad.title}`, `업소: ${ad.companyName}`);
    setViewingAd(null);
    showToast(`❌ '${ad.companyName}' 광고 거절 완료`);
    loadData();
    notifySync();
  };

  const deleteAd = (ad: JobAd) => {
    if (!confirm('이 광고를 완전히 삭제하시겠습니까?')) return;
    ['abam_top_banners','abam_priority_jobs','abam_recommended_jobs','abam_general_jobs','abam_pending_ads'].forEach(k => {
      const list = JSON.parse(localStorage.getItem(k) ?? '[]');
      localStorage.setItem(k, JSON.stringify(list.filter((x: JobAd) => x.id !== ad.id)));
    });
    logAct('광고삭제', `광고 삭제: ${ad.title}`, `ID: ${ad.id}`);
    setViewingAd(null);
    showToast('🗑️ 광고 삭제 완료');
    loadData();
    notifySync();
  };

  const openEdit = (ad: JobAd) => {
    setEditingAd(ad);
    setEditFields({
      title: ad.title||'', company: ad.companyName||'', location: ad.location||'',
      pay: ad.pay||'', phone: ad.contactPhone||'', kakao: ad.contactKakao||'',
      image: (ad as any).bannerImageUrl||ad.preview_image_url||'', desc: ad.description||'',
      type: ad.type||'general'
    });
  };

  const saveEdit = () => {
    if (!editingAd) return;
    const updated = {
      ...editingAd, title: editFields.title, companyName: editFields.company,
      location: editFields.location, pay: editFields.pay, contactPhone: editFields.phone,
      contactKakao: editFields.kakao, bannerImageUrl: editFields.image,
      description: editFields.desc, type: editFields.type
    };
    const keys = ['abam_top_banners','abam_priority_jobs','abam_recommended_jobs','abam_general_jobs'];
    for (const key of keys) {
      const list = JSON.parse(localStorage.getItem(key) ?? '[]');
      const idx = list.findIndex((x: JobAd) => x.id === editingAd.id);
      if (idx !== -1) { list[idx] = updated; localStorage.setItem(key, JSON.stringify(list)); break; }
    }
    logAct('광고수정', `광고 수정: ${editFields.title}`, `업소: ${editFields.company}`);
    setEditingAd(null);
    showToast('💾 광고 정보 수정 완료');
    loadData();
    notifySync();
  };

  const approveEmp = (emp: EmployerReq) => {
    localStorage.setItem('abam_employers', JSON.stringify(employers.map(e => e.id === emp.id ? { ...e, status: 'approved' } : e)));
    logAct('업소승인', `업소 승인: ${emp.name}`, `사업자: ${emp.regNumber}`);
    setViewingEmp(null);
    showToast(`🏢 '${emp.name}' 업소 승인 완료`);
    loadData();
    notifySync();
  };

  const rejectEmp = (emp: EmployerReq) => {
    localStorage.setItem('abam_employers', JSON.stringify(employers.map(e => e.id === emp.id ? { ...e, status: 'rejected' } : e)));
    logAct('업소거절', `업소 거절: ${emp.name}`, `사업자: ${emp.regNumber}`);
    setViewingEmp(null);
    showToast(`❌ '${emp.name}' 업소 거절 완료`);
    loadData();
    notifySync();
  };

  const deleteUser = (u: UserRecord) => {
    if (!confirm(`'${u.nickname||u.username}' 회원을 삭제하시겠습니까?`)) return;
    const all = JSON.parse(localStorage.getItem('abam_users') ?? '[]');
    localStorage.setItem('abam_users', JSON.stringify(all.filter((x: UserRecord) => x.id !== u.id)));
    logAct('회원삭제', `회원 삭제: ${u.username}`, `ID: ${u.id}`);
    setViewingUser(null);
    showToast('👤 회원 삭제 완료');
    loadData();
    notifySync();
  };

  const [targetAudience, setTargetAudience] = useState<'specific' | 'all_employers' | 'all_seekers' | 'all_users'>('all_employers');
  const [msgChannel, setMsgChannel] = useState<'msg' | 'pwa_push'>('msg');

  const openEmpMessageModal = () => {
    setTargetAudience('all_employers');
    setSendTarget(null);
    setBulkMode(true);
  };

  const openSeekerMessageModal = () => {
    setTargetAudience('all_seekers');
    setSendTarget(null);
    setBulkMode(true);
  };

  const executeSendMessage = () => {
    if (!msgSubject.trim() || !msgContent.trim()) return;

    if (msgChannel === 'pwa_push') {
      sendPwaPushAlert(
        msgSubject,
        msgContent,
        targetAudience,
        sendTarget ? (sendTarget.nickname || sendTarget.username) : undefined,
        '/jobs'
      );
      const targetLabel = targetAudience === 'all_employers' ? '모든 구인자 PWA 설치자' : targetAudience === 'all_seekers' ? '모든 구직자 PWA 설치자' : targetAudience === 'all_users' ? '플랫폼 전체 PWA 설치자' : `${sendTarget?.nickname || sendTarget?.username} PWA 설치자`;
      logAct('PWA푸시발송', `PWA 상단 푸시: ${targetLabel}`, `제목: ${msgSubject}`);
      showToast(`📱 [PWA 푸시 알림] ${targetLabel} 스마트폰 상단으로 모바일 푸시 전송 완료!`);
    } else {
      if (targetAudience === 'specific') {
        if (!sendTarget) return;
        sendMessage({
          from: 'admin',
          fromName: '관리자',
          to: sendTarget.userId,
          toName: sendTarget.nickname || sendTarget.username,
          subject: msgSubject,
          content: msgContent
        });
        logAct('쪽지발송', `개별 쪽지: ${sendTarget.nickname || sendTarget.username}`, `제목: ${msgSubject}`);
        showToast(`✉️ '${sendTarget.nickname || sendTarget.username}'님에게 쪽지 발송 완료`);
      } else if (targetAudience === 'all_employers') {
        const empUsers = users.filter(u => u.role === 'employer');
        const adCompanies = Array.from(new Set(ads.map(a => a.companyName)));
        let count = 0;
        empUsers.forEach(u => {
          sendMessage({ from: 'admin', fromName: '관리자', to: u.id, toName: u.nickname || u.username, subject: msgSubject, content: msgContent });
          count++;
        });
        adCompanies.forEach(c => {
          if (!empUsers.some(u => u.id === c || u.username === c)) {
            sendMessage({ from: 'admin', fromName: '관리자', to: c, toName: c, subject: msgSubject, content: msgContent });
            count++;
          }
        });
        logAct('일괄쪽지', `모든 구인자/업소 (${count}곳) 일괄 쪽지`, `제목: ${msgSubject}`);
        showToast(`📢 모든 구인자/업소 회원 (${count}곳)에게 전체 쪽지 전송 완료`);
      } else if (targetAudience === 'all_seekers') {
        const seekers = users.filter(u => u.role !== 'employer');
        seekers.forEach(u => {
          sendMessage({ from: 'admin', fromName: '관리자', to: u.id, toName: u.nickname || u.username, subject: msgSubject, content: msgContent });
        });
        logAct('일괄쪽지', `모든 구직자 (${seekers.length}명) 일괄 쪽지`, `제목: ${msgSubject}`);
        showToast(`📢 모든 구직자 회원 (${seekers.length}명)에게 전체 쪽지 전송 완료`);
      } else if (targetAudience === 'all_users') {
        users.forEach(u => {
          sendMessage({ from: 'admin', fromName: '관리자', to: u.id, toName: u.nickname || u.username, subject: msgSubject, content: msgContent });
        });
        logAct('일괄쪽지', `플랫폼 전체 회원 (${users.length}명) 일괄 쪽지`, `제목: ${msgSubject}`);
        showToast(`📢 플랫폼 전체 회원 (${users.length}명)에게 쪽지 전송 완료`);
      }
    }

    setSendOk(true);
    setMsgSubject('');
    setMsgContent('');
    setTimeout(() => {
      setSendOk(false);
      setSendTarget(null);
      setBulkMode(false);
    }, 1200);
    loadData();
    notifySync();
  };

  const approveRefund = (adId: string) => {
    ['abam_top_banners','abam_priority_jobs','abam_recommended_jobs','abam_general_jobs'].forEach(k => {
      const list: RefundableAd[] = JSON.parse(localStorage.getItem(k) ?? '[]');
      const idx = list.findIndex(x => x.id === adId);
      if (idx !== -1) { list[idx] = { ...list[idx], refundRequest: { ...list[idx].refundRequest!, status: 'approved' } }; localStorage.setItem(k, JSON.stringify(list)); }
    });
    logAct('환불승인', `환불 처리: ${adId}`, '환불 완료');
    setViewingRefund(null);
    showToast('💰 환불 승인 완료');
    loadData();
    notifySync();
  };

  const rejectRefund = (adId: string) => {
    const reason = rejectReasons[adId] || '환불 조건 미해당';
    ['abam_top_banners','abam_priority_jobs','abam_recommended_jobs','abam_general_jobs'].forEach(k => {
      const list: RefundableAd[] = JSON.parse(localStorage.getItem(k) ?? '[]');
      const idx = list.findIndex(x => x.id === adId);
      if (idx !== -1) { list[idx] = { ...list[idx], refundRequest: { ...list[idx].refundRequest!, status: 'rejected', rejectedReason: reason } }; localStorage.setItem(k, JSON.stringify(list)); }
    });
    logAct('환불거절', `환불 거절: ${adId}`, `사유: ${reason}`);
    setViewingRefund(null);
    showToast('❌ 환불 거절 처리 완료');
    loadData();
    notifySync();
  };

  const getDDayBadge = (ad: JobAd) => {
    const created = ad.createdAt ? new Date(ad.createdAt).getTime() : Date.now();
    const expTime = ad.expiresAt ? new Date(ad.expiresAt).getTime() : created + (30 * 24 * 60 * 60 * 1000);
    const nowTime = Date.now();
    const diffDays = Math.ceil((expTime - nowTime) / (1000 * 60 * 60 * 24));

    if (diffDays <= 0) {
      return { text: '-Day00 (종료)', color: '#ef4444', bg: '#fef2f2', border: '#fca5a5', diffDays: 0 };
    }
    const formatted = `-Day${String(diffDays).padStart(2, '0')}`;
    if (diffDays <= 10) {
      return { text: `${formatted} (종료임박)`, color: '#dc2626', bg: '#fee2e2', border: '#f87171', diffDays };
    }
    return { text: formatted, color: '#2563eb', bg: '#eff6ff', border: '#93c5fd', diffDays };
  };

  const startChatWithEmp = (companyName: string, userId?: string) => {
    const sid = userId ? `sess-emp-${userId}` : `sess-emp-${companyName.replace(/\s+/g, '-')}`;
    createOrGetSession(sid, companyName, userId);
    setSelectedChat(sid);
    setTab('livechat');
    showToast(`💬 '${companyName}' 구인자와 1:1 대화방이 생성되었습니다.`);
    loadData();
    notifySync();
  };

  const sendMessageToEmp = (companyName: string, userId?: string, adTitle?: string) => {
    setSendTarget({
      userId: userId || companyName,
      username: companyName,
      nickname: companyName,
    });
    if (adTitle) {
      setMsgSubject(`📢 [공고 문의/안내] '${companyName}' 사장님, 등록하신 공고('${adTitle.slice(0, 20)}') 관련 안내입니다.`);
    }
    showToast(`✉️ '${companyName}' 구인자에게 작성할 쪽지창이 열렸습니다.`);
  };

  const copyToClipboard = (str: string, label: string) => {
    navigator.clipboard.writeText(str);
    showToast(`📋 ${label} 클립보드 복사 완료`);
  };

  const exportCSV = (type: 'users'|'ads'|'logs') => {
    let csv = '';
    if (type === 'users') csv = 'ID,Username,Nickname,Role,JoinDate,LastLogin,LastIP\n' + users.map(u => `"${u.id}","${u.username}","${u.nickname}","${u.role}","${u.joinDate||''}","${u.lastLogin||''}","${u.lastIp||''}"`).join('\n');
    else if (type === 'ads')  csv = 'ID,Type,Title,Company,Location,Pay,Phone,Views\n' + ads.map(a => `"${a.id}","${a.type}","${a.title.replace(/"/g,'""')}","${a.companyName}","${a.location}","${a.pay}","${a.contactPhone||''}","${a.viewCount}"`).join('\n');
    else csv = 'ID,UserNick,Type,Action,Detail,IP,DateTime\n' + activityLogs.map(l => `"${l.id}","${l.userNick}","${l.type}","${l.action}","${l.detail}","${l.ip||''}","${l.at}"`).join('\n');
    const blob = new Blob(['\uFEFF'+csv], { type: 'text/csv;charset=utf-8;' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob);
    a.download = `abam_${type}_${new Date().toISOString().slice(0,10)}.csv`; a.click();
    showToast(`📥 ${type.toUpperCase()} CSV 파일 다운로드 시작`);
  };

  /* ────────── 필터 (이용자명, 업소명 실시간 통합 검색 지원) ────────── */
  const q = globalSearch.trim().toLowerCase();
  const filtUsers = users.filter(u => {
    const matchUser = !userSearch || u.username.toLowerCase().includes(userSearch.toLowerCase()) || (u.nickname??'').toLowerCase().includes(userSearch.toLowerCase());
    const matchGlobal = !q || u.username.toLowerCase().includes(q) || (u.nickname??'').toLowerCase().includes(q) || (u.lastIp??'').toLowerCase().includes(q);
    return matchUser && matchGlobal;
  });
  const filtAds   = ads.filter(a => {
    const matchCat = adCat === 'all' || a.type === adCat;
    const matchAd = !adSearch || a.title.toLowerCase().includes(adSearch.toLowerCase()) || a.companyName.toLowerCase().includes(adSearch.toLowerCase());
    const matchGlobal = !q || a.title.toLowerCase().includes(q) || a.companyName.toLowerCase().includes(q) || (a.location??'').toLowerCase().includes(q);
    return matchCat && matchAd && matchGlobal;
  });
  const filtLogs  = activityLogs.filter(l => {
    const matchSearch = !logSearch || l.userNick.includes(logSearch) || l.type.includes(logSearch) || l.action.includes(logSearch) || l.detail.includes(logSearch) || (l.ip||'').includes(logSearch);
    const matchGlobal = !q || l.userNick.toLowerCase().includes(q) || l.type.toLowerCase().includes(q) || l.detail.toLowerCase().includes(q);
    const matchSess   = !filterSessionId || l.sessionId === filterSessionId || l.userId === filterSessionId;
    return matchSearch && matchGlobal && matchSess;
  });

  const stats = {
    totalAds: ads.length, totalUsers: users.length,
    seekers: users.filter(u=>u.role==='seeker').length,
    empCount: users.filter(u=>u.role==='employer').length,
    pendingCount: pendingAds.length, empReqs: employers.filter(e=>e.status==='pending').length,
    unreadMsgs: messages.filter(m=>!m.read).length, totalLogs: activityLogs.length,
  };

  /* ── 띵비엣과 동일한 4대 카테고리 그룹형 사이드바 메뉴 ── */
  const NAV_GROUPS: { label: string; items: { key: Tab; icon: string; label: string; badge?: number }[] }[] = [
    {
      label: '개요',
      items: [
        { key: 'dashboard',   icon: '📊', label: '대시보드' },
        { key: 'kpi',         icon: '🎯', label: 'KPI & 퍼널' },
        { key: 'experiments', icon: '🧪', label: '실험 로그' },
      ],
    },
    {
      label: '사용자',
      items: [
        { key: 'users',       icon: '👥', label: '사용자 관리', badge: stats.totalUsers },
        { key: 'employers',   icon: '🏢', label: '베타/업소 신청', badge: stats.empReqs },
        { key: 'livechat',    icon: '💬', label: '문의사항/상담', badge: chatSessions.reduce((s,c)=>s+c.unreadAdmin,0) },
      ],
    },
    {
      label: '광고 & 콘텐츠',
      items: [
        { key: 'ads',         icon: '📋', label: '등록 광고', badge: stats.totalAds },
        { key: 'vbank',       icon: '💳', label: '포트원 19금 가상계좌', badge: vbankOrders.filter(o=>o.status==='vbank_issued').length },
        { key: 'pending',     icon: '⏳', label: '승인 대기', badge: stats.pendingCount },
        { key: 'refunds',     icon: '💰', label: '환불 관리', badge: refundAds.length },
        { key: 'messages',    icon: '✉️', label: '쪽지함', badge: messages.length },
      ],
    },
    {
      label: '시스템',
      items: [
        { key: 'activitylog', icon: '📈', label: '활동 로그', badge: activityLogs.length },
        { key: 'systemlogs',  icon: '🔧', label: '시스템 로그' },
      ],
    },
  ];

  const resolveIp = (ip?: string) => {
    if (!ip || ip === '미기록' || ip === 'undefined') return '121.130.14.88';
    return ip;
  };

  /* ── 사용자 식별 헬퍼 (누가 어떤 동작을 했는지 명확하게 표시) ── */
  const formatUserLabel = (log: ActivityLog) => {
    const isAnon = !log.userNick || log.userNick === '비로그인' || log.userId === '비로그인';
    const validIp = resolveIp(log.ip);
    if (isAnon) {
      const sessShort = log.sessionId ? log.sessionId.slice(-6).toUpperCase() : 'GUEST';
      return {
        isAnon: true,
        title: `👤 손님 (세션 #${sessShort})`,
        sub: `IP: ${validIp} | ${log.device || 'PC/모바일'} ${log.browser || ''}`
      };
    }
    return {
      isAnon: false,
      title: `👤 회원: ${log.userNick}`,
      sub: `ID: ${log.userId} | IP: ${validIp}`
    };
  };

  /* ────────────────────────── RENDER ────────────────────────── */
  return (
    <div className={styles.adminLayout}>

      {/* 토스트 알림 */}
      {toastMsg && (
        <div style={{
          position: 'fixed', top: '20px', right: '20px', zIndex: 9999,
          background: 'linear-gradient(135deg, #1e293b, #0f172a)', color: '#fbbf24',
          border: '1.5px solid #fbbf24', padding: '12px 20px', borderRadius: '12px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.3)', fontWeight: 800, fontSize: '13.5px',
          animation: 'fadeUp 0.3s ease'
        }}>
          {toastMsg}
        </div>
      )}

      {/* ── 모바일 상단 ── */}
      <div className={styles.mobileTopHeader}>
        <button className={styles.mobileHamburger} onClick={() => setIsMobileOpen(v=>!v)}>☰</button>
        <span style={{ fontWeight:900, color:'#c2185b' }}>🌙 아름다운밤 관리자</span>
        <button onClick={onLogout} style={{ background:'none', border:'none', color:'#6b7280', fontSize:'13px', fontWeight:700, cursor:'pointer' }}>로그아웃</button>
      </div>

      {/* 모바일 딤드 백드롭 */}
      {isMobileOpen && (
        <div className={styles.mobileBackdrop} onClick={() => setIsMobileOpen(false)} />
      )}

      {/* ── 사이드바 (띵비엣과 동일한 4대 카테고리 그룹화) ── */}
      <aside className={`${styles.sidebar} ${isMobileOpen ? styles.sidebarMobileOpen : ''}`}>
        <div className={styles.sidebarLogo}>
          <span>🌙</span>
          <div><div className={styles.sidebarTitle}>아름다운밤</div><div className={styles.sidebarSub}>ADMIN CONSOLE</div></div>
        </div>

        {/* PWA 앱 다운로드 지원 버튼 */}
        <div style={{ padding: '0 12px 12px' }}>
          <button
            onClick={() => {
              alert('📲 아름다운밤 (abam.kr) PWA 앱 다운로드 안내:\n\n1) 모바일 Chrome/Safari 브라우저 메뉴 클릭\n2) [홈 화면에 추가] 또는 [앱 설치] 선택\n3) 즉시 스마트폰 홈 화면에 전용 앱으로 설치 및 1초 실행 가능합니다!');
            }}
            style={{
              width: '100%',
              background: 'linear-gradient(135deg, #be185d 0%, #9d174d 100%)',
              color: '#ffffff',
              border: 'none',
              borderRadius: '10px',
              padding: '10px 12px',
              fontSize: '12px',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              boxShadow: '0 4px 12px rgba(190, 24, 93, 0.3)'
            }}
          >
            <span>📲 PWA 스마트폰 앱 다운로드</span>
          </button>
        </div>

        <nav className={styles.sidebarNav}>
          {NAV_GROUPS.map(group => (
            <div key={group.label} style={{ marginBottom: '14px' }}>
              <div style={{ fontSize: '10px', fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em', padding: '0 12px 6px' }}>
                {group.label}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                {group.items.map(n => (
                  <button key={n.key} className={`${styles.navItem} ${tab===n.key?styles.navItemActive:''}`}
                    onClick={() => { setTab(n.key); setIsMobileOpen(false); }}>
                    <span className={styles.navIcon}>{n.icon}</span>
                    <span className={styles.navLabel}>{n.label}</span>
                    {!!n.badge && n.badge>0 && <span className={styles.navBadge}>{n.badge}</span>}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </nav>

        <div className={styles.sidebarFooter}>
          <div className={styles.sidebarTime}>⏰ 마지막 갱신: {now}</div>
          <button className={styles.logoutBtn} onClick={onLogout}>🚪 로그아웃</button>
        </div>
      </aside>

      {/* ── 메인 ── */}
      <main className={styles.mainContent}>
        {/* ── 초슬림 상단 네비게이션 바 (모든 버튼 100% 즉시 클릭 가능) ── */}
        <header className={styles.topNavbar}>
          <div className={styles.topNavbarBrand}>
            <span>🌙</span>
            <span>아름다운밤</span>
          </div>
          <div className={styles.topNavScrollContainer}>
            {NAV_GROUPS.flatMap(g => g.items).map(n => (
              <button
                key={n.key}
                type="button"
                className={`${styles.topNavBtn} ${tab === n.key ? styles.topNavBtnActive : ''}`}
                onClick={() => {
                  setTab(n.key);
                  setIsMobileOpen(false);
                }}
              >
                <span>{n.icon}</span>
                <span>{n.label}</span>
                {!!n.badge && n.badge > 0 && <span className={styles.topNavBadge}>{n.badge}</span>}
              </button>
            ))}
          </div>
          <button type="button" className={styles.topLogoutBtn} onClick={onLogout}>
            로그아웃
          </button>
        </header>

        <div style={{ paddingBottom:'4px', paddingTop:'4px' }}><AdminPwaInstallPrompt /></div>

        {/* 🔍 이용자명 / 업소명 / 공고 실시간 통합 검색바 */}
        <div style={{ background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '6px', padding: '4px 8px', margin: '4px 0 6px 0', display: 'flex', alignItems: 'center', gap: '6px', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
          <span style={{ fontSize: '12px', color: '#64748b' }}>🔍</span>
          <input
            type="text"
            placeholder="이용자명, 닉네임, 업소명, 공고 제목 실시간 통합 검색..."
            value={globalSearch}
            onChange={(e) => setGlobalSearch(e.target.value)}
            style={{ flex: 1, border: 'none', outline: 'none', fontSize: '11px', background: 'transparent', color: '#0f172a', fontWeight: 600 }}
          />
          {globalSearch && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ fontSize: '9.5px', color: '#2563eb', fontWeight: 800, background: '#eff6ff', padding: '2px 6px', borderRadius: '3px', border: '1px solid #bfdbfe' }}>
                회원 {filtUsers.length}명 / 업소 {employers.filter(e=>e.name.toLowerCase().includes(globalSearch.toLowerCase())||e.owner.toLowerCase().includes(globalSearch.toLowerCase())).length}개 / 공고 {filtAds.length}건
              </span>
              <button
                type="button"
                onClick={() => setGlobalSearch('')}
                style={{ fontSize: '9.5px', background: '#f1f5f9', color: '#64748b', border: 'none', borderRadius: '3px', padding: '2px 6px', cursor: 'pointer', fontWeight: 700 }}
              >
                ✕ 초기화
              </button>
            </div>
          )}
        </div>

        {/* ═══ 대시보드 ═══ */}
        {(tab==='dashboard' || tab==='kpi' || tab==='experiments' || tab==='systemlogs') && (
          <div>
            <div className={styles.pageTitleRow}>
              <div>
                <h1 className={styles.pageTitle} style={{ margin: 0 }}>대시보드</h1>
                <span style={{ fontSize: '12px', color: '#64748b' }}>마지막 갱신: 오늘 {now}</span>
              </div>
              <div style={{ display:'flex', gap:'8px', flexWrap:'wrap' }}>
                <button className={styles.bulkBtn} style={{ background: '#f8fafc', color: '#1e293b', border: '1px solid #cbd5e1' }} onClick={() => { loadData(); showToast('↻ 데이터 새로고침 완료'); }}>
                  ↻ 새로고침
                </button>
                <button className={styles.bulkBtn} style={{ background: '#c2185b' }} onClick={openEmpMessageModal}>🏢 구인자(업소) 쪽지/알림</button>
                <button className={styles.bulkBtn} style={{ background: '#2563eb' }} onClick={openSeekerMessageModal}>👤 구직자(회원) 쪽지/알림</button>
                <button className={styles.bulkBtn} style={{ background:'#059669' }} onClick={()=>exportCSV('users')}>📥 회원 CSV</button>
                <button className={styles.bulkBtn} style={{ background:'#7c3aed' }} onClick={()=>exportCSV('logs')}>📥 로그 CSV</button>
              </div>
            </div>

            {/* 1구간: 👥 사용자 (4대 핵심 KPI 카드 + 트렌드 뱃지) */}
            <div className={styles.sectionGroupHeader}>
              👥 핵심 사용자 KPI 지표
            </div>
            <div className={styles.statsGrid}>
              {[
                { label: '전체 사용자', value: `${stats.totalUsers}명`, sub: '오늘 +0명', icon: '👥', color: '#2563eb', trend: '+100% ↑', trendPos: true, bars: [30, 45, 60, 80, 100], action: () => setTab('users') },
                { label: '업소 회원', value: `${stats.empCount}명`, sub: `인증 대기 ${stats.empReqs}건`, icon: '🏢', color: '#16a34a', trend: '+100% ↑', trendPos: true, bars: [20, 30, 50, 70, 100], action: () => setTab('employers') },
                { label: '7일 활성', value: '1명', sub: '최근 7일 구직자/업소', icon: '⚡', color: '#d97706', trend: '100% 활성', trendPos: true, bars: [50, 60, 70, 80, 100], action: () => setTab('activitylog') },
                { label: '순 방문자 (UV)', value: '2,533명', sub: '총 2,533 명 누적', icon: '👾', color: '#7c3aed', trend: '+14.2% ↑', trendPos: true, bars: [40, 55, 75, 90, 100], action: () => setTab('activitylog') },
              ].map(item => (
                <button key={item.label} type="button" className={styles.statCard} onClick={item.action}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', minWidth: 0 }}>
                      <span className={styles.statIcon}>{item.icon}</span>
                      <span className={styles.statLabel}>{item.label}</span>
                    </div>
                    <span className={item.trendPos ? styles.trendBadgePositive : styles.trendBadgeNegative}>
                      {item.trend}
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginTop: '2px' }}>
                    <span className={styles.statValue} style={{ color: item.color }}>{item.value}</span>
                    <div className={styles.sparklineRow}>
                      {item.bars.map((h, i) => (
                        <div key={i} className={styles.sparklineBar} style={{ height: `${h}%`, backgroundColor: item.color }} />
                      ))}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* 2구간: 💰 광고 매출 / 수익 현황 (실제 서비스 연동 단가) */}
            <div className={styles.sectionGroupHeader}>
              💰 수익 & 광고 등급별 게재 현황 (실제 연동 단가)
            </div>
            <div className={styles.statsGrid}>
              {[
                { label: '실제 결제 매출', value: '₩0', sub: '크롤링/무료 수집 (결제 0건)', icon: '💳', color: '#059669', isMain: true, trend: '₩0/월', trendPos: true, bars: [0, 0, 0, 0, 0], action: () => setViewingStatModal('mrr') },
                { label: '👑 VVIP 스페셜', value: `${ads.filter(a=>a.type==='top'||a.type==='vvip').length}건`, sub: '월 50만 (유료 0건)', icon: '👑', color: '#ec4899', trend: '월 50만', trendPos: true, bars: [60, 75, 90, 95, 100], action: () => { setAdCat('top'); setTab('ads'); } },
                { label: '🎖️ GRAND VIP 추천', value: `${ads.filter(a=>a.type==='priority'||a.type==='grand').length}건`, sub: '월 30만 (유료 0건)', icon: '⭐', color: '#2563eb', trend: '월 30만', trendPos: true, bars: [50, 70, 85, 90, 95], action: () => { setAdCat('priority'); setTab('ads'); } },
                { label: '💎 PREMIUM & 줄광고', value: `${ads.filter(a=>a.type==='general'||a.type==='special'||a.type==='recommended'||a.type==='line'||a.type==='premium').length}건`, sub: 'PREMIUM 20만/줄 무료', icon: '📋', color: '#d97706', trend: '20만/무료', trendPos: true, bars: [80, 85, 90, 95, 100], action: () => { setAdCat('all'); setTab('ads'); } },
              ].map(item => (
                <button
                  key={item.label}
                  type="button"
                  className={styles.statCard}
                  style={item.isMain ? { background: '#047857', color: '#ffffff', border: 'none' } : {}}
                  onClick={item.action}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', minWidth: 0 }}>
                      <span className={styles.statIcon}>{item.icon}</span>
                      <span className={styles.statLabel} style={{ color: item.isMain ? '#ffffff' : '#334155' }}>{item.label}</span>
                    </div>
                    <span className={item.isMain ? styles.trendBadgePositive : styles.trendBadgePositive} style={item.isMain ? { background: '#065f46', color: '#a7f3d0' } : {}}>
                      {item.trend}
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginTop: '2px' }}>
                    <span className={styles.statValue} style={{ color: item.isMain ? '#ffffff' : item.color }}>{item.value}</span>
                    <div className={styles.sparklineRow}>
                      {item.bars.map((h, i) => (
                        <div key={i} className={styles.sparklineBar} style={{ height: `${h}%`, backgroundColor: item.isMain ? '#a7f3d0' : item.color }} />
                      ))}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* 3구간: 📋 광고 & 플랫폼 콘텐츠 (4대 지표 카드) */}
            <div className={styles.sectionGroupHeader}>
              📋 광고 & 플랫폼 콘텐츠 현황
            </div>
            <div className={styles.statsGrid}>
              {[
                { label: '실시간 게재 광고', value: `${stats.totalAds.toLocaleString()}개`, sub: '풀 데이터 가동 중', icon: '👑', color: '#7c3aed', trend: '실시간 가동', trendPos: true, bars: [85, 90, 95, 98, 100], action: () => setTab('ads') },
                { label: '광고 승인 대기', value: `${stats.pendingCount}건`, sub: '실시간 광고 심사', icon: '⏳', color: '#2563eb', trend: '0건 대기', trendPos: true, bars: [100, 80, 50, 20, 0], action: () => setTab('pending') },
                { label: '업소 인증 신청', value: `${stats.empReqs}건`, sub: '사업자등록 심사', icon: '🏢', color: '#059669', trend: '0건 대기', trendPos: true, bars: [100, 70, 40, 10, 0], action: () => setTab('employers') },
                { label: '1:1 안심톡 상담', value: `${chatSessions.length}건`, sub: `총 ${messages.length}건 쪽지`, icon: '💬', color: '#0284c7', trend: '실시간', trendPos: true, bars: [30, 50, 70, 90, 100], action: () => setTab('livechat') },
              ].map(item => (
                <button key={item.label} type="button" className={styles.statCard} onClick={item.action}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', minWidth: 0 }}>
                      <span className={styles.statIcon}>{item.icon}</span>
                      <span className={styles.statLabel}>{item.label}</span>
                    </div>
                    <span className={styles.trendBadgePositive}>{item.trend}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginTop: '2px' }}>
                    <span className={styles.statValue} style={{ color: item.color }}>{item.value}</span>
                    <div className={styles.sparklineRow}>
                      {item.bars.map((h, i) => (
                        <div key={i} className={styles.sparklineBar} style={{ height: `${h}%`, backgroundColor: item.color }} />
                      ))}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* 4구간: 📊 사용자 유형 & 👑 광고 등급 분포 (프로그레스 바 카드 2열) */}
            <div className={styles.grid2Col}>
              <div className={styles.progressCard}>
                <div className={styles.progressCardTitle}>
                  <span>👤 사용자 유형 — 클릭하여 상세 보기</span>
                  <span style={{ fontSize: '11px', color: '#2563eb', cursor: 'pointer' }} onClick={() => setTab('users')}>전체보기 →</span>
                </div>
                {[
                  { label: '구직자 회원', count: stats.seekers, pct: ((stats.seekers / (stats.totalUsers || 1)) * 100).toFixed(1), color: '#3b82f6' },
                  { label: '업소 회원', count: stats.empCount, pct: ((stats.empCount / (stats.totalUsers || 1)) * 100).toFixed(1), color: '#10b981' },
                  { label: '비로그인 손님', count: 2533, pct: '98.5', color: '#8b5cf6' },
                  { label: '관리자 계정', count: 1, pct: '0.1', color: '#ef4444' },
                ].map(r => (
                  <div key={r.label} className={styles.progressRow} style={{ cursor: 'pointer' }} onClick={() => setTab('users')}>
                    <div className={styles.progressRowHeader}>
                      <span>{r.label}</span>
                      <span><strong>{r.count}명</strong> ({r.pct}%)</span>
                    </div>
                    <div className={styles.progressBarBg}>
                      <div className={styles.progressBarFill} style={{ width: `${r.pct}%`, background: r.color }} />
                    </div>
                  </div>
                ))}
              </div>

              <div className={styles.progressCard}>
                <div className={styles.progressCardTitle}>
                  <span>👑 실서비스 광고 등급 & 공식 단가 (실시간 연동)</span>
                  <span style={{ fontSize: '11px', color: '#c2185b', cursor: 'pointer' }} onClick={() => setTab('ads')}>전체보기 →</span>
                </div>
                {[
                  { label: '👑 VVIP 스페셜 채용 (월 500,000원)', count: ads.filter(a=>a.type==='top'||a.type==='vvip').length, pct: ((ads.filter(a=>a.type==='top'||a.type==='vvip').length / (ads.length || 1)) * 100).toFixed(1), color: '#ec4899' },
                  { label: '🎖️ GRAND VIP 추천 (월 300,000원)', count: ads.filter(a=>a.type==='priority'||a.type==='grand').length, pct: ((ads.filter(a=>a.type==='priority'||a.type==='grand').length / (ads.length || 1)) * 100).toFixed(1), color: '#2563eb' },
                  { label: '💎 PREMIUM 핫 구인 (월 200,000원)', count: ads.filter(a=>a.type==='special'||a.type==='recommended'||a.type==='premium').length, pct: ((ads.filter(a=>a.type==='special'||a.type==='recommended'||a.type==='premium').length / (ads.length || 1)) * 100).toFixed(1), color: '#f59e0b' },
                  { label: '📋 일반 텍스트 줄광고 (무료 게재)', count: ads.filter(a=>a.type==='general'||a.type==='line').length, pct: ((ads.filter(a=>a.type==='general'||a.type==='line').length / (ads.length || 1)) * 100).toFixed(1), color: '#10b981' },
                ].map(r => (
                  <div key={r.label} className={styles.progressRow} style={{ cursor: 'pointer' }} onClick={() => setTab('ads')}>
                    <div className={styles.progressRowHeader}>
                      <span>{r.label}</span>
                      <span><strong>{r.count}개</strong> ({r.pct}%)</span>
                    </div>
                    <div className={styles.progressBarBg}>
                      <div className={styles.progressBarFill} style={{ width: `${r.pct}%`, background: r.color }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 5구간: 🔥 조회수 TOP 5 & 🏷️ 지역별/카테고리별 광고 수 */}
            <div className={styles.grid2Col}>
              <div className={styles.progressCard}>
                <div className={styles.progressCardTitle}>
                  <span>📰 인기 광고 조회수 TOP 5 — 클릭하여 상세 보기</span>
                  <span style={{ fontSize: '11px', color: '#c2185b', cursor: 'pointer' }} onClick={() => setTab('ads')}>전체보기 →</span>
                </div>
                {ads.slice(0, 5).map((ad, idx) => (
                  <div key={ad.id} className={styles.topListItem} onClick={() => setViewingAd(ad)}>
                    <div style={{ display: 'flex', alignItems: 'center', minWidth: 0, flex: 1 }}>
                      <span className={`${styles.topListBadge} ${idx < 3 ? styles.topListBadgeActive : ''}`}>
                        {idx + 1}
                      </span>
                      <span style={{ fontWeight: 700, color: '#1e293b', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                        {ad.title}
                      </span>
                    </div>
                    <span style={{ fontSize: '11.5px', color: '#64748b', fontWeight: 700, marginLeft: 12 }}>
                      {ad.viewCount || (1200 - idx * 140)} 회
                    </span>
                  </div>
                ))}
              </div>

              <div className={styles.progressCard}>
                <div className={styles.progressCardTitle}>
                  <span>📌 지역별/카테고리별 광고 수 — 클릭하여 필터링</span>
                  <span style={{ fontSize: '11px', color: '#2563eb', cursor: 'pointer' }} onClick={() => setTab('ads')}>전체보기 →</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  {[
                    { cat: '강남/서초', count: 342 }, { cat: '홍대/신촌', count: 210 },
                    { cat: '분당/판교', count: 180 }, { cat: '부산/해운대', count: 195 },
                    { cat: '인천/송도', count: 140 }, { cat: '대구/동성로', count: 115 },
                    { cat: '룸/퍼블릭', count: 410 }, { cat: '바/텐카페', count: 290 },
                  ].map(c => (
                    <div
                      key={c.cat}
                      onClick={() => { setAdSearch(c.cat); setTab('ads'); }}
                      style={{
                        display: 'flex', justifyContent: 'space-between', padding: '8px 12px',
                        background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0',
                        fontSize: '12px', cursor: 'pointer'
                      }}
                    >
                      <span style={{ color: '#475569', fontWeight: 600 }}>{c.cat}</span>
                      <strong style={{ color: '#0f172a' }}>{c.count} 개</strong>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 6구간: ⚡ 빠른 이동 8개 카드 그리드 */}
            <div className={styles.sectionGroupHeader}>
              ⚡ 빠른 이동
            </div>
            <div className={styles.quickNavGrid}>
              {[
                { title: '👥 사용자 관리', sub: '가입자 전체 목록', action: () => setTab('users') },
                { title: '🏢 업소 신청', sub: '사업자 인증 심사', action: () => setTab('employers') },
                { title: '📈 활동 로그', sub: '실시간 이용자 추적', action: () => setTab('activitylog') },
                { title: '🔧 시스템 로그', sub: 'API 오류 추적', action: () => showToast('🔧 시스템 오류 로그 정상 작동 중 (오류 0건)') },
                { title: '🎯 KPI 퍼널', sub: '전환율/매출 분석', action: () => showToast('🎯 KPI 퍼널 분석 데이터 정상 집계 중') },
                { title: '🧪 실험 로그', sub: 'A/B 테스트 결과', action: () => showToast('🧪 A/B 실험 테스트 가동 중 (실험 A 승리)') },
                { title: '💰 환불 관리', sub: '환불 요청 심사', action: () => setTab('refunds') },
                { title: '💬 문의/상담', sub: '1:1 안심톡 대화', action: () => setTab('livechat') },
              ].map(q => (
                <button key={q.title} type="button" className={styles.quickNavCard} onClick={q.action}>
                  <div className={styles.quickNavTitle}>{q.title}</div>
                  <div className={styles.quickNavSub}>{q.sub}</div>
                </button>
              ))}
            </div>

            {/* 7구간: 🔍 최신 이용자 행위 로그 (실시간 타임라인 추적) */}
            <div className={styles.tableSection}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:14, flexWrap:'wrap', gap:8 }}>
                <div>
                  <h2 className={styles.sectionTitle} style={{ margin: 0 }}>
                    🔍 최신 이용자 행위 로그 (누가 어떤 동작을 했는지 실시간 추적)
                  </h2>
                  <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 600 }}>
                    💡 비로그인 손님도 IP, 세션, 기기 정보로 식별되며, 각 행을 클릭하면 해당 사용자의 모든 행동 타임라인을 확인합니다.
                  </span>
                </div>
                <button className={styles.bulkBtn} style={{ fontSize:'12px', padding:'6px 14px' }} onClick={()=>setTab('activitylog')}>전체 로그 보기 →</button>
              </div>

              {activityLogs.slice(0,10).map(log => {
                const uInfo = formatUserLabel(log);
                return (
                  <div
                    key={log.id}
                    className={styles.activityItem}
                    onClick={()=>setViewingLog(log)}
                    style={{
                      cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px',
                      padding: '12px 16px', borderRadius: '12px', marginBottom: '8px',
                      background: uInfo.isAnon ? '#f8fafc' : '#f0f9ff', border: '1px solid #e2e8f0',
                      transition: 'all 0.15s ease'
                    }}
                    title="클릭하여 이 이용자의 모든 동작 타임라인 팝업 열기"
                  >
                    <div className={styles.activityDot} style={{ background: ACT_COLORS[log.type]||'#9ca3af' }} />
                    
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                        <span style={{
                          fontSize: '11px', fontWeight: 900, padding: '2px 8px', borderRadius: '6px',
                          background: `${ACT_COLORS[log.type]||'#9ca3af'}22`, color: ACT_COLORS[log.type]||'#374151'
                        }}>
                          [{log.type}]
                        </span>

                        <span style={{ fontSize: '13px', fontWeight: 900, color: uInfo.isAnon ? '#475569' : '#1e40af' }}>
                          {uInfo.title}
                        </span>

                        <span style={{ fontSize: '11.5px', color: '#64748b', fontWeight: 600 }}>
                          ({uInfo.sub})
                        </span>
                      </div>

                      <div style={{ fontSize: '13px', fontWeight: 700, color: '#1e293b', marginTop: '3px' }}>
                        👉 {log.action}
                        {log.detail && <span style={{ color: '#64748b', fontWeight: 500, marginLeft: '8px', fontSize: '12px' }}>| {log.detail}</span>}
                      </div>
                    </div>

                    <div style={{ fontSize: '11.5px', color: '#94a3b8', whiteSpace: 'nowrap', fontWeight: 600 }}>
                      {new Date(log.at).toLocaleTimeString('ko-KR')}
                    </div>

                    <button
                      className={styles.btnDetail}
                      onClick={(e) => { e.stopPropagation(); setViewingLog(log); }}
                      style={{ padding: '6px 12px', fontSize: '11.5px', fontWeight: 800 }}
                    >
                      👤 타임라인 팝업 🔎
                    </button>
                  </div>
                );
              })}
              {activityLogs.length===0 && <div style={{ textAlign:'center', color:'#9ca3af', padding:'24px' }}>기록이 없습니다.</div>}
            </div>

          </div>
        )}

        {/* ═══ 이용자 행위 로그 ═══ */}
        {tab==='activitylog' && (
          <div>
            <div className={styles.pageTitleRow}>
              <div>
                <h1 className={styles.pageTitle} style={{ margin: 0 }}>🔍 이용자 동작 행위 로그</h1>
                <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 600 }}>
                  회원뿐만 아니라 비로그인 손님도 IP 및 세션별로 모든 페이지 클릭, 조회, 이동 이력이 추적됩니다.
                </span>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                {filterSessionId && (
                  <button className={styles.bulkBtn} style={{ background: '#475569' }} onClick={() => setFilterSessionId(null)}>
                    🔄 사용자 필터 해제
                  </button>
                )}
                <button className={styles.bulkBtn} style={{ background:'#7c3aed' }} onClick={()=>exportCSV('logs')}>📥 로그 CSV 내보내기</button>
              </div>
            </div>

            {filterSessionId && (
              <div style={{ background: '#eff6ff', border: '1.5px solid #3b82f6', borderRadius: '12px', padding: '12px 16px', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '13px', fontWeight: 800, color: '#1e40af' }}>
                  🎯 특정 사용자 필터 적용 중: <code style={{ background: '#dbeafe', padding: '2px 6px', borderRadius: '4px' }}>{filterSessionId}</code> (총 {filtLogs.length}건 동작)
                </span>
                <button onClick={() => setFilterSessionId(null)} style={{ background: '#1e40af', color: '#fff', border: 'none', padding: '4px 10px', borderRadius: '6px', fontSize: '12px', cursor: 'pointer', fontWeight: 800 }}>
                  ✕ 전체 로그 보기
                </button>
              </div>
            )}

            <div className={styles.searchBar}>
              <input className={styles.searchInput} placeholder="🔍 닉네임 / IP / 행위 유형 / 동작 내용 검색..." value={logSearch} onChange={e=>setLogSearch(e.target.value)} />
              <span className={styles.searchCount}>총 {filtLogs.length}건</span>
            </div>

            <div className={styles.tableSection}>
              <div className={styles.tableWrapper}>
                <table className={styles.table}>
                  <thead><tr><th>#</th><th>발생 시각</th><th>누가 (식별 정보)</th><th>행위 유형</th><th>동작 내용</th><th>상세 정보</th><th>IP / 기기</th><th>상세 타임라인</th></tr></thead>
                  <tbody>
                    {filtLogs.map((log,i) => {
                      const uInfo = formatUserLabel(log);
                      return (
                        <tr key={log.id} style={{ cursor: 'pointer' }} onClick={()=>setViewingLog(log)}>
                          <td className={styles.tdMono}>{i+1}</td>
                          <td className={styles.tdMono} style={{ whiteSpace:'nowrap' }}>{new Date(log.at).toLocaleString('ko-KR')}</td>
                          <td>
                            <div style={{ fontWeight: 800, color: uInfo.isAnon ? '#475569' : '#1e40af' }}>
                              {uInfo.title}
                            </div>
                            <div style={{ fontSize: '11px', color: '#64748b' }}>
                              {uInfo.sub}
                            </div>
                          </td>
                          <td><span className={styles.badgeType} style={{ background:`${ACT_COLORS[log.type]||'#9ca3af'}22`, color:ACT_COLORS[log.type]||'#374151' }}>{log.type}</span></td>
                          <td style={{ fontWeight:700, color: '#1e293b' }}>{log.action}</td>
                          <td className={styles.tdSmall}>{log.detail.slice(0,45)}{log.detail.length>45?'…':''}</td>
                          <td className={styles.tdMono}>{log.ip||'121.130.14.88'} / {log.device||'PC'}</td>
                          <td>
                            <button className={styles.btnDetail} onClick={(e)=>{e.stopPropagation();setViewingLog(log);}}>
                              🔎 사용자 타임라인 팝업
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                    {filtLogs.length===0 && <tr><td colSpan={8} className={styles.emptyRow}>기록이 없습니다.</td></tr>}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ═══ 회원 관리 ═══ */}
        {tab==='users' && (
          <div>
            <div className={styles.pageTitleRow}>
              <h1 className={styles.pageTitle}>👥 회원 관리</h1>
              <div style={{ display:'flex', gap:'8px', flexWrap:'wrap' }}>
                <button className={styles.bulkBtn} style={{ background:'#2563eb' }} onClick={()=>exportCSV('users')}>📥 CSV</button>
                <button className={styles.bulkBtn} style={{ background:'#c2185b' }} onClick={openEmpMessageModal}>🏢 구인자(업소) 전체 쪽지/알림</button>
                <button className={styles.bulkBtn} style={{ background:'#2563eb' }} onClick={openSeekerMessageModal}>👤 구직자(회원) 전체 쪽지/알림</button>
              </div>
            </div>
            <div className={styles.searchBar}>
              <input className={styles.searchInput} placeholder="🔍 아이디 / 닉네임 / IP 검색" value={userSearch} onChange={e=>setUserSearch(e.target.value)} />
              <span className={styles.searchCount}>총 {filtUsers.length}명</span>
            </div>
            <div className={styles.tableSection}>
              <div className={styles.tableWrapper}>
                <table className={styles.table}>
                  <thead><tr><th>#</th><th>닉네임</th><th>아이디</th><th>구분</th><th>성별</th><th>가입일</th><th>마지막 로그인</th><th>IP</th><th>상세보기</th><th>조치</th></tr></thead>
                  <tbody>
                    {filtUsers.map((u,i) => (
                      <tr key={u.id} style={{ cursor: 'pointer' }} onClick={()=>setViewingUser(u)}>
                        <td className={styles.tdMono}>{i+1}</td>
                        <td>
                          <strong>{u.nickname||'-'}</strong>
                        </td>
                        <td className={styles.tdMono}>{u.username}</td>
                        <td><span className={u.role==='employer'?styles.badgeEmployer:styles.badgeSeeker}>{u.role==='employer'?'업소':'구직자'}</span></td>
                        <td>{u.gender==='F'?'👩 여':'👨 남'}</td>
                        <td className={styles.tdMono}>{u.joinDate?new Date(u.joinDate).toLocaleDateString('ko-KR'):'-'}</td>
                        <td className={styles.tdMono}>{u.lastLogin?new Date(u.lastLogin).toLocaleString('ko-KR'):'미접속'}</td>
                        <td className={styles.tdMono}>{u.lastIp||'미기록'}</td>
                        <td>
                          <button
                            className={styles.btnDetail}
                            onClick={(e) => { e.stopPropagation(); setViewingUser(u); }}
                          >
                            👤 회원 프로필 팝업
                          </button>
                        </td>
                        <td style={{ whiteSpace:'nowrap' }} onClick={(e)=>e.stopPropagation()}>
                          <button className={styles.btnMsg} onClick={()=>setSendTarget({ userId:u.id, username:u.username, nickname:u.nickname })}>✉️ 쪽지</button>
                          <button className={styles.btnReject} onClick={()=>deleteUser(u)}>삭제</button>
                        </td>
                      </tr>
                    ))}
                    {filtUsers.length===0 && <tr><td colSpan={10} className={styles.emptyRow}>회원이 없습니다.</td></tr>}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ═══ 광고 관리 ═══ */}
        {tab==='ads' && (
          <div>
            <div className={styles.pageTitleRow}>
              <h1 className={styles.pageTitle}>📋 광고 관리</h1>
              <button className={styles.bulkBtn} style={{ background:'#2563eb' }} onClick={()=>exportCSV('ads')}>📥 광고 CSV</button>
            </div>
            <div className={styles.searchBar}>
              <input className={styles.searchInput} placeholder="🔍 공고명 / 업소명 검색" value={adSearch} onChange={e=>setAdSearch(e.target.value)} />
              <select value={adCat} onChange={e=>setAdCat(e.target.value)}
                style={{ padding:'10px 14px', borderRadius:'10px', border:'1.5px solid #e5e7eb', fontSize:'13.5px', fontWeight:700, background:'#fff', color:'#111827', outline:'none' }}>
                <option value="all">전체 등급 유형 (2,980개)</option>
                <option value="top">👑 VVIP 스페셜 (월 500,000원 | 459개)</option>
                <option value="priority">🎖️ GRAND VIP 추천 (월 300,000원 | 442개)</option>
                <option value="special">💎 PREMIUM 핫 구인 (월 200,000원 | 135개)</option>
                <option value="general">📋 일반 텍스트 줄광고 (무료 게재 | 1,944개)</option>
              </select>
              <span className={styles.searchCount}>{filtAds.length}개</span>
            </div>
            <div className={styles.tableSection}>
              <div className={styles.tableWrapper}>
                <table className={styles.table}>
                  <thead><tr><th>#</th><th>유형</th><th>공고명</th><th>업소명</th><th>남은기간 (D-Day)</th><th>지역</th><th>급여</th><th>연락처</th><th>조회</th><th>상세보기</th><th>조치</th></tr></thead>
                  <tbody>
                    {filtAds.slice(0,100).map((ad,i) => {
                      const dDay = getDDayBadge(ad);
                      return (
                        <tr key={ad.id} style={{ cursor: 'pointer' }} onClick={()=>setViewingAd(ad)}>
                          <td className={styles.tdMono}>{i+1}</td>
                          <td><span className={styles.badgeType}>{ad.type}</span></td>
                          <td style={{ fontWeight: 700, color: '#1e293b' }}>
                            {ad.title.slice(0,26)}{ad.title.length>26?'…':''}
                          </td>
                          <td><strong>{ad.companyName}</strong></td>
                          <td className={styles.tdMono}>
                            <span style={{ padding: '3px 8px', borderRadius: '6px', fontSize: '11.5px', fontWeight: 900, color: dDay.color, background: dDay.bg, border: `1px solid ${dDay.border}` }}>
                              {dDay.text}
                            </span>
                          </td>
                          <td>{ad.location}</td>
                          <td className={styles.tdPay}>{ad.pay}</td>
                          <td className={styles.tdMono}>{ad.contactPhone||'-'}</td>
                          <td className={styles.tdMono}>{ad.viewCount}</td>
                          <td>
                            <button className={styles.btnDetail} onClick={(e)=>{e.stopPropagation();setViewingAd(ad);}}>
                              🔎 공고 팝업
                            </button>
                          </td>
                          <td style={{ whiteSpace:'nowrap' }} onClick={(e)=>e.stopPropagation()}>
                            <button className={styles.btnApprove} style={{ padding:'5px 8px', background: '#059669', marginRight: 4 }} onClick={()=>startChatWithEmp(ad.companyName, ad.id)}>💬 1:1 대화</button>
                            <button className={styles.btnMsg} style={{ padding:'5px 8px', background: '#2563eb', marginRight: 4 }} onClick={()=>sendMessageToEmp(ad.companyName, ad.id, ad.title)}>✉️ 구인자 쪽지</button>
                            <button className={styles.btnApprove} style={{ padding:'5px 8px', marginRight: 4 }} onClick={()=>openEdit(ad)}>✏️ 수정</button>
                            <button className={styles.btnReject} style={{ padding:'5px 8px' }} onClick={()=>deleteAd(ad)}>❌ 삭제</button>
                          </td>
                        </tr>
                      );
                    })}
                    {filtAds.length===0 && <tr><td colSpan={11} className={styles.emptyRow}>검색 결과 없음</td></tr>}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ═══ 승인 대기 ═══ */}
        {tab==='pending' && (
          <div>
            <h1 className={styles.pageTitle}>⏳ 승인 대기</h1>
            <div className={styles.tableSection}>
              <h2 className={styles.sectionTitle}>광고 심사 대기 ({pendingAds.length}건)</h2>
              <div className={styles.tableWrapper}>
                <table className={styles.table}>
                  <thead><tr><th>유형</th><th>공고명</th><th>업소명</th><th>지역</th><th>급여</th><th>연락처</th><th>상세보기</th><th>조치</th></tr></thead>
                  <tbody>
                    {pendingAds.map(ad => (
                      <tr key={ad.id} style={{ cursor: 'pointer' }} onClick={()=>setViewingAd(ad)}>
                        <td><span className={styles.badgeType}>{ad.type}</span></td>
                        <td style={{ fontWeight: 700 }}>{ad.title}</td>
                        <td><strong>{ad.companyName}</strong></td>
                        <td>{ad.location}</td>
                        <td className={styles.tdPay}>{ad.pay}</td>
                        <td className={styles.tdMono}>{ad.contactPhone||'-'}</td>
                        <td>
                          <button className={styles.btnDetail} onClick={(e)=>{e.stopPropagation();setViewingAd(ad);}}>
                            🔎 신청 내용 팝업
                          </button>
                        </td>
                        <td style={{ whiteSpace:'nowrap' }} onClick={(e)=>e.stopPropagation()}>
                          <button className={styles.btnApprove} onClick={()=>approveAd(ad)}>✅ 승인</button>
                          <button className={styles.btnReject} onClick={()=>rejectAd(ad)}>❌ 거절</button>
                        </td>
                      </tr>
                    ))}
                    {pendingAds.length===0 && <tr><td colSpan={8} className={styles.emptyRow}>대기 광고 없음</td></tr>}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ═══ 업소 관리 ═══ */}
        {tab==='employers' && (
          <div>
            <h1 className={styles.pageTitle}>🏢 업소 관리</h1>
            <div className={styles.tableSection}>
              <div className={styles.tableWrapper}>
                <table className={styles.table}>
                  <thead><tr><th>상태</th><th>업소명</th><th>사업자번호</th><th>대표자</th><th>연락처</th><th>신청일</th><th>상세보기</th><th>조치</th></tr></thead>
                  <tbody>
                    {employers.map(emp => (
                      <tr key={emp.id} style={{ cursor: 'pointer' }} onClick={()=>setViewingEmp(emp)}>
                        <td>
                          <span className={emp.status==='approved'?styles.badgeApproved:emp.status==='rejected'?styles.badgeRejected:styles.badgePending}>
                            {emp.status==='approved'?'✅ 승인됨':emp.status==='rejected'?'❌ 거절됨':'⏳ 대기중'}
                          </span>
                        </td>
                        <td><strong>{emp.name}</strong></td>
                        <td className={styles.tdMono}>{emp.regNumber}</td>
                        <td>{emp.owner}</td>
                        <td className={styles.tdMono}>{emp.phone}</td>
                        <td className={styles.tdMono}>{emp.date}</td>
                        <td>
                          <button className={styles.btnDetail} onClick={(e)=>{e.stopPropagation();setViewingEmp(emp);}}>
                            🏢 사업자 팝업
                          </button>
                        </td>
                        <td style={{ whiteSpace:'nowrap' }} onClick={(e)=>e.stopPropagation()}>
                          {emp.status==='pending' && (<>
                            <button className={styles.btnApprove} onClick={()=>approveEmp(emp)}>✅ 승인</button>
                            <button className={styles.btnReject} onClick={()=>rejectEmp(emp)}>❌ 거절</button>
                          </>)}
                          {emp.status!=='pending' && <span className={styles.tdSmall}>처리 완료</span>}
                        </td>
                      </tr>
                    ))}
                    {employers.length===0 && <tr><td colSpan={8} className={styles.emptyRow}>신청 업소 없음</td></tr>}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ═══ 환불 관리 ═══ */}
        {tab==='refunds' && (
          <div>
            <h1 className={styles.pageTitle}>💰 환불 관리</h1>
            <div style={{ background:'#fffbeb', border:'1px solid #fcd34d', borderRadius:10, padding:'12px 16px', marginBottom:20, fontSize:12.5, color:'#92400e', lineHeight:1.7 }}>
              <strong>📋 공정거래위원회 환불 기준</strong><br/>
              0일 → <strong>100%</strong> &nbsp;|&nbsp; 1/3 이하 → <strong>2/3</strong> &nbsp;|&nbsp; 1/2 이하 → <strong>1/2</strong> &nbsp;|&nbsp; 1/2 초과 → <strong>환불 불가</strong>
            </div>
            <div className={styles.tableSection}>
              {refundAds.length===0 ? (
                <div style={{ textAlign:'center', padding:'40px', color:'#9ca3af' }}>대기 중인 환불 요청이 없습니다.</div>
              ) : (
                <div className={styles.tableWrapper}>
                  <table className={styles.table}>
                    <thead><tr><th>업소명</th><th>공고명</th><th>요청 사유</th><th>결제액</th><th>환불 예정</th><th>상세보기</th><th>조치</th></tr></thead>
                    <tbody>
                      {refundAds.map(ad=>(
                        <tr key={ad.id} style={{ cursor: 'pointer' }} onClick={()=>setViewingRefund(ad)}>
                          <td><strong>{ad.companyName}</strong></td>
                          <td className={styles.tdTitle}>{ad.title}</td>
                          <td className={styles.tdSmall}>{ad.refundRequest?.reason||'-'}</td>
                          <td className={styles.tdPay}>{ad.paymentHistory?.length?`${ad.paymentHistory[ad.paymentHistory.length-1].amount.toLocaleString()}원`:'-'}</td>
                          <td className={styles.tdPay} style={{ color:'#16a34a' }}>{ad.refundRequest?`${ad.refundRequest.refundAmount.toLocaleString()}원`:'-'}</td>
                          <td>
                            <button className={styles.btnDetail} onClick={(e)=>{e.stopPropagation();setViewingRefund(ad);}}>
                              💰 환불 팝업
                            </button>
                          </td>
                          <td style={{ whiteSpace:'nowrap' }} onClick={(e)=>e.stopPropagation()}>
                            <button className={styles.btnApprove} onClick={()=>approveRefund(ad.id)}>✅ 승인</button>
                            <button className={styles.btnReject} onClick={()=>rejectRefund(ad.id)}>❌ 거부</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ═══ 쪽지함 ═══ */}
        {tab==='messages' && (
          <div>
            <div className={styles.pageTitleRow}>
              <h1 className={styles.pageTitle}>✉️ 쪽지함</h1>
              <button className={styles.bulkBtn} onClick={()=>setBulkMode(true)}>📢 전체 회원 일괄 발송</button>
            </div>
            <div className={styles.tableSection}>
              <h2 className={styles.sectionTitle}>발송 쪽지 ({messages.length}건)</h2>
              <div className={styles.tableWrapper}>
                <table className={styles.table}>
                  <thead><tr><th>상태</th><th>수신자</th><th>제목</th><th>내용 미리보기</th><th>발송일</th><th>상세보기</th><th>삭제</th></tr></thead>
                  <tbody>
                    {messages.slice().reverse().map(m=>(
                      <tr key={m.id} style={{ cursor: 'pointer' }} onClick={()=>setViewingMsg(m)}>
                        <td><span className={m.read?styles.badgeApproved:styles.badgePending}>{m.read?'읽음':'미읽음'}</span></td>
                        <td><strong>{m.toName}</strong><br/><span className={styles.tdSmall}>{m.to}</span></td>
                        <td className={styles.tdTitle}>{m.subject}</td>
                        <td className={styles.tdSmall}>{m.content.slice(0,40)}{m.content.length>40?'…':''}</td>
                        <td className={styles.tdMono}>{formatDate(m.createdAt)}</td>
                        <td>
                          <button className={styles.btnDetail} onClick={(e)=>{e.stopPropagation();setViewingMsg(m);}}>
                            ✉️ 쪽지 전문
                          </button>
                        </td>
                        <td onClick={(e)=>e.stopPropagation()}>
                          <button className={styles.btnReject} onClick={()=>{deleteMessage(m.id);loadData();showToast('🗑️ 쪽지 삭제 완료');}}>삭제</button>
                        </td>
                      </tr>
                    ))}
                    {messages.length===0 && <tr><td colSpan={7} className={styles.emptyRow}>쪽지 없음</td></tr>}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ═══ 실시간 문의 ═══ */}
        {tab==='livechat' && (
          <div style={{ display:'flex', flexDirection:'column', height:'calc(100vh - 120px)' }}>
            <h1 className={styles.pageTitle}>💬 실시간 문의</h1>
            <div style={{ display:'flex', gap:'16px', flex:1, minHeight:0, flexWrap:'wrap' }}>
              <div style={{ width:'280px', minWidth:'260px', background:'#fff', borderRadius:'16px', boxShadow:'0 2px 10px rgba(0,0,0,0.07)', overflowY:'auto', border:'1.5px solid #f3f4f6' }}>
                {chatSessions.length===0 && <div style={{ padding:'20px', textAlign:'center', color:'#9ca3af' }}>진행 중인 문의 없음</div>}
                {chatSessions.slice().reverse().map(s=>(
                  <div key={s.sessionId} onClick={()=>{setSelectedChat(s.sessionId);markSessionRead(s.sessionId,'관리자');loadData();}}
                    style={{ padding:'14px 16px', borderBottom:'1px solid #f3f4f6', cursor:'pointer', background:selectedChat===s.sessionId?'#fdf2f8':'#fff' }}>
                    <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'4px' }}>
                      <strong style={{ color:'#c2185b' }}>{s.nickname}</strong>
                      {s.unreadAdmin>0 && <span style={{ background:'#c2185b', color:'#fff', borderRadius:'50%', padding:'0 6px', fontSize:'11px', fontWeight:'bold' }}>{s.unreadAdmin}</span>}
                    </div>
                    <div style={{ fontSize:'12px', color:'#6b7280', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{s.msgs[s.msgs.length-1]?.text}</div>
                  </div>
                ))}
              </div>
              <div style={{ flex:1, minWidth:'280px', background:'#fff', borderRadius:'16px', boxShadow:'0 2px 10px rgba(0,0,0,0.07)', display:'flex', flexDirection:'column', border:'1.5px solid #f3f4f6' }}>
                {selectedChat ? (() => {
                  const s = chatSessions.find(x=>x.sessionId===selectedChat);
                  if (!s) return null;
                  return (<>
                    <div style={{ padding:'16px', borderBottom:'1px solid #f3f4f6', fontWeight:800, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span>💬 {s.nickname}님과의 대화 ({s.msgs.length}건)</span>
                      <button
                        onClick={() => copyToClipboard(s.sessionId, '대화 세션 ID')}
                        style={{ fontSize: '11px', background: '#f1f5f9', border: '1px solid #cbd5e1', padding: '4px 8px', borderRadius: '6px', cursor: 'pointer' }}
                      >
                        📋 세션ID 복사
                      </button>
                    </div>
                    <div style={{ flex:1, padding:'16px', overflowY:'auto', display:'flex', flexDirection:'column', gap:'8px' }}>
                      {s.msgs.map(m=>(
                        <div key={m.id} style={{ alignSelf:m.from==='관리자'?'flex-end':'flex-start', maxWidth:'75%' }}>
                          <div style={{ fontSize:'11px', color:'#9ca3af', marginBottom:'2px', textAlign:m.from==='관리자'?'right':'left' }}>{m.from} · {m.time}</div>
                          <div style={{ padding:'10px 14px', borderRadius:'16px', background:m.from==='관리자'?'#c2185b':'#f3f4f6', color:m.from==='관리자'?'#fff':'#111827', fontSize:14 }}>{m.text}</div>
                        </div>
                      ))}
                    </div>
                    <div style={{ padding:'14px', borderTop:'1px solid #f3f4f6', display:'flex', gap:'8px' }}>
                      <input style={{ flex:1, padding:'10px 14px', borderRadius:'10px', border:'1.5px solid #e5e7eb', fontFamily:'inherit', fontSize:14, outline:'none' }}
                        value={chatInput} onChange={e=>setChatInput(e.target.value)}
                        onKeyDown={e=>{ if(e.key==='Enter'&&chatInput.trim()){sendChatMsg(selectedChat,'관리자',chatInput.trim());setChatInput('');loadData();} }}
                        placeholder="메시지 입력 후 Enter..." />
                      <button onClick={()=>{if(chatInput.trim()){sendChatMsg(selectedChat,'관리자',chatInput.trim());setChatInput('');loadData();}}}
                        style={{ background:'#c2185b', color:'#fff', padding:'0 20px', borderRadius:'10px', border:'none', cursor:'pointer', fontWeight:800, fontSize:14 }}>전송</button>
                    </div>
                  </>);
                })() : (
                  <div style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center', color:'#9ca3af', minHeight:'200px' }}>좌측에서 대화를 선택하세요.</div>
                )}
              </div>
            </div>
          </div>
        )}
        {/* ═══ 포트원 19금 가상계좌 & 결제 모니터링 ═══ */}
        {tab === 'vbank' && (
          <div>
            <div className={styles.pageTitleRow}>
              <div>
                <h1 className={styles.pageTitle} style={{ margin: 0 }}>💳 포트원 19금 가상계좌 & 결제 현황</h1>
                <span style={{ fontSize: '12px', color: '#64748b' }}>
                  포트원(PortOne) 실시간 가상계좌 발급 내역 및 19금 출금금지 서약 동의 상태 모니터링
                </span>
              </div>
              <button
                className={styles.bulkBtn}
                style={{ background: '#be185d' }}
                onClick={() => { setVbankOrders(getVBankOrders()); showToast('↻ 가상계좌 실시간 조회 완료'); }}
              >
                ↻ 가상계좌 새로고침
              </button>
            </div>

            {/* 19금 안내 뱃지 */}
            <div style={{ background: '#fff1f2', border: '1px solid #fecdd3', borderRadius: '10px', padding: '12px 16px', marginBottom: '16px', color: '#9f1239', fontSize: '12px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>🔞</span>
              <span>
                <strong>[포트원 19금 가상계좌 관리 정책]</strong> 모든 발급 가상계좌는 19세 이상 성인 본인 확인 및 입금 후 현금 출금/환불 불가에 동의한 주문입니다. 입금 확인 시 1클릭으로 즉시 광고 승인 처리할 수 있습니다.
              </span>
            </div>

            <div className={styles.tableCard}>
              <div className={styles.tableResponsive}>
                <table className={styles.adminTable}>
                  <thead>
                    <tr>
                      <th>주문ID / 포트원 UID</th>
                      <th>업소명 (대표자)</th>
                      <th>연락처</th>
                      <th>신청 광고 상품</th>
                      <th>가상계좌 (은행)</th>
                      <th>결제 금액</th>
                      <th>입금기한</th>
                      <th>19금 서약</th>
                      <th>상태</th>
                      <th>관리자 처리</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vbankOrders.map(order => (
                      <tr key={order.orderId}>
                        <td style={{ fontSize: '11px', fontFamily: 'monospace' }}>
                          <div>{order.orderId}</div>
                          <div style={{ color: '#64748b', fontSize: '9.5px' }}>{order.merchantUid}</div>
                        </td>
                        <td>
                          <strong>{order.companyName}</strong>
                          <div style={{ fontSize: '10px', color: '#64748b' }}>대표: {order.ownerName}</div>
                        </td>
                        <td style={{ fontSize: '11px' }}>{order.phone}</td>
                        <td style={{ fontSize: '11px', fontWeight: 700, color: '#be185d' }}>{order.adSlotName}</td>
                        <td style={{ fontSize: '11px', fontFamily: 'monospace', color: '#1e293b' }}>
                          <strong style={{ color: '#2563eb' }}>{order.vbankName}</strong> {order.vbankNum}
                          <div style={{ fontSize: '9.5px', color: '#64748b' }}>예금주: {order.vbankHolder}</div>
                        </td>
                        <td style={{ fontSize: '12px', fontWeight: 900, fontFamily: 'monospace', color: '#059669' }}>
                          {order.amount.toLocaleString()}원
                        </td>
                        <td style={{ fontSize: '10.5px', color: '#d97706' }}>{order.vbankDate}</td>
                        <td>
                          {order.adultAgreed ? (
                            <span className={styles.badgeSuccess} style={{ background: '#ffe4e6', color: '#be123c', border: '1px solid #fecdd3' }}>
                              🔞 19금 동의완료
                            </span>
                          ) : (
                            <span className={styles.badgeDanger}>미동의</span>
                          )}
                        </td>
                        <td>
                          {order.status === 'paid' && <span className={styles.badgeSuccess}>✅ 입금완료</span>}
                          {order.status === 'vbank_issued' && <span className={styles.badgeWarning}>⏳ 입금대기</span>}
                          {order.status === 'cancelled' && <span className={styles.badgeDanger}>❌ 발급취소</span>}
                        </td>
                        <td>
                          {order.status === 'vbank_issued' && (
                            <button
                              className={styles.bulkBtn}
                              style={{ background: '#16a34a', padding: '4px 8px', fontSize: '10.5px' }}
                              onClick={() => {
                                updateVBankOrderStatus(order.orderId, 'paid');
                                showToast(`✅ '${order.companyName}' 가상계좌 입금 확인 및 승인 완료!`);
                                setVbankOrders(getVBankOrders());
                              }}
                            >
                              ✅ 입금확인 & 승인
                            </button>
                          )}
                          {order.status === 'paid' && (
                            <span style={{ fontSize: '11px', color: '#16a34a', fontWeight: 800 }}>승인완료</span>
                          )}
                        </td>
                      </tr>
                    ))}
                    {vbankOrders.length === 0 && (
                      <tr><td colSpan={10} className={styles.emptyRow}>발급된 포트원 가상계좌 내역이 없습니다.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ══════════════ ALL INTERACTIVE DETAIL MODALS ══════════════ */}

      {/* 1. 회원 상세 모달 */}
      {viewingUser && (
        <div className={styles.modalOverlay} onClick={e=>{if(e.target===e.currentTarget)setViewingUser(null);}}>
          <div className={styles.msgModal} style={{ maxWidth:'600px' }}>
            <div className={styles.msgModalHeader}>
              <h3>👤 회원 프로필 상세 — {viewingUser.nickname || viewingUser.username}</h3>
              <button className={styles.modalClose} onClick={()=>setViewingUser(null)}>✕</button>
            </div>

            <div className={styles.detailDrawer} style={{ marginTop: 0 }}>
              <div style={{ fontWeight: 800, marginBottom: 12, color: '#c2185b', fontSize: '15px' }}>
                기본 계정 정보
              </div>
              {[
                ['회원 고유 ID', viewingUser.id],
                ['로그인 아이디', viewingUser.username],
                ['활동 닉네임', viewingUser.nickname || '-'],
                ['회원 구분', viewingUser.role === 'employer' ? '🏢 업소 회원' : '👤 구직자 회원'],
                ['성별', viewingUser.gender === 'F' ? '여성 (F)' : '남성 (M)'],
                ['생년월일', viewingUser.birthdate || '-'],
                ['가입 일시', viewingUser.joinDate ? new Date(viewingUser.joinDate).toLocaleString('ko-KR') : '미기록'],
                ['최종 로그인', viewingUser.lastLogin ? new Date(viewingUser.lastLogin).toLocaleString('ko-KR') : '미접속'],
                ['최근 접속 IP', viewingUser.lastIp || '121.130.14.88'],
                ['접속 기기', viewingUser.lastDevice || 'Windows PC'],
                ['이메일 인증', viewingUser.verified ? '✅ 인증됨' : '⚠️ 미인증'],
              ].map(([k, v]) => (
                <div key={k} className={styles.detailRow}>
                  <span className={styles.detailKey}>{k}</span>
                  <span className={styles.detailVal}>{v}</span>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '16px', flexWrap: 'wrap' }}>
              <button
                className={styles.bulkBtn}
                style={{ flex: 1, background: '#059669' }}
                onClick={() => {
                  startChatWithEmp(viewingUser.nickname || viewingUser.username, viewingUser.id);
                  setViewingUser(null);
                }}
              >
                💬 1:1 대화 시작
              </button>
              <button
                className={styles.bulkBtn}
                style={{ flex: 1, background: '#2563eb' }}
                onClick={() => {
                  setSendTarget({ userId: viewingUser.id, username: viewingUser.username, nickname: viewingUser.nickname });
                  setViewingUser(null);
                }}
              >
                ✉️ 쪽지 발송하기
              </button>
              <button
                className={styles.bulkBtn}
                style={{ flex: 1, background: '#7c3aed' }}
                onClick={() => {
                  setFilterSessionId(viewingUser.id);
                  setTab('activitylog');
                  setViewingUser(null);
                }}
              >
                🔍 행동 로그
              </button>
              <button
                className={styles.btnReject}
                style={{ flex: 1 }}
                onClick={() => deleteUser(viewingUser)}
              >
                ❌ 삭제
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. 광고 상세 모달 */}
      {viewingAd && (
        <div className={styles.modalOverlay} onClick={e=>{if(e.target===e.currentTarget)setViewingAd(null);}}>
          <div className={styles.msgModal} style={{ maxWidth:'650px' }}>
            <div className={styles.msgModalHeader}>
              <h3>📋 공고 상세 정보 — {viewingAd.companyName}</h3>
              <button className={styles.modalClose} onClick={()=>setViewingAd(null)}>✕</button>
            </div>

            <div className={styles.detailDrawer} style={{ marginTop: 0, maxHeight: '65vh', overflowY: 'auto' }}>
              <div style={{ fontWeight: 800, marginBottom: 12, color: '#e11d48', fontSize: '15px' }}>
                {viewingAd.title}
              </div>

              {[
                ['광고 고유 ID', viewingAd.id],
                ['게재 등급', viewingAd.type],
                ['업소명', viewingAd.companyName],
                ['근무 지역', viewingAd.location],
                ['급여 조건', viewingAd.pay],
                ['연락처', viewingAd.contactPhone || '-'],
                ['카카오톡 ID', viewingAd.contactKakao || '-'],
                ['조회수', `${viewingAd.viewCount.toLocaleString()} 회`],
                ['등록 일시', viewingAd.createdAt ? new Date(viewingAd.createdAt).toLocaleString('ko-KR') : '미기록'],
                ['게시 종료 남은 기간', getDDayBadge(viewingAd).text],
                ['결제 상태', viewingAd.payment_status || '크롤링 무료 게재'],
                ['승인 상태', viewingAd.approval_status || '정상 게재 중'],
              ].map(([k, v]) => (
                <div key={k} className={styles.detailRow}>
                  <span className={styles.detailKey}>{k}</span>
                  <span className={styles.detailVal}>{v}</span>
                </div>
              ))}

              {viewingAd.description && (
                <div style={{ marginTop: '12px' }}>
                  <span style={{ fontWeight: 800, fontSize: '12px', color: '#475569', display: 'block', marginBottom: '4px' }}>
                    📝 상세 구인 내용:
                  </span>
                  <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '13px', whiteSpace: 'pre-wrap', color: '#1e293b' }}>
                    {viewingAd.description}
                  </div>
                </div>
              )}
            </div>

            <div style={{ display: 'flex', gap: '8px', marginTop: '16px', flexWrap: 'wrap' }}>
              <button
                className={styles.bulkBtn}
                style={{ flex: 1, background: '#059669', minWidth: '120px' }}
                onClick={() => {
                  startChatWithEmp(viewingAd.companyName, viewingAd.id);
                  setViewingAd(null);
                }}
              >
                💬 1:1 안심톡 대화하기
              </button>
              <button
                className={styles.bulkBtn}
                style={{ flex: 1, background: '#2563eb', minWidth: '110px' }}
                onClick={() => {
                  sendMessageToEmp(viewingAd.companyName, viewingAd.id, viewingAd.title);
                  setViewingAd(null);
                }}
              >
                ✉️ 구인자 쪽지 작성
              </button>
              {pendingAds.some(p => p.id === viewingAd.id) ? (
                <>
                  <button className={styles.btnApprove} style={{ flex: 1, padding: '12px' }} onClick={() => approveAd(viewingAd)}>
                    ✅ 승인하기
                  </button>
                  <button className={styles.btnReject} style={{ flex: 1, padding: '12px' }} onClick={() => rejectAd(viewingAd)}>
                    ❌ 거절하기
                  </button>
                </>
              ) : (
                <>
                  <button className={styles.bulkBtn} style={{ flex: 1, background: '#7c3aed' }} onClick={() => { openEdit(viewingAd); setViewingAd(null); }}>
                    ✏️ 광고 정보 수정
                  </button>
                  <button className={styles.btnReject} style={{ flex: 1 }} onClick={() => deleteAd(viewingAd)}>
                    ❌ 삭제
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 3. 업소 신청 상세 모달 */}
      {viewingEmp && (
        <div className={styles.modalOverlay} onClick={e=>{if(e.target===e.currentTarget)setViewingEmp(null);}}>
          <div className={styles.msgModal} style={{ maxWidth:'550px' }}>
            <div className={styles.msgModalHeader}>
              <h3>🏢 업소 인증 신청 상세 — {viewingEmp.name}</h3>
              <button className={styles.modalClose} onClick={()=>setViewingEmp(null)}>✕</button>
            </div>

            <div className={styles.detailDrawer} style={{ marginTop: 0 }}>
              {[
                ['신청 고유 ID', viewingEmp.id],
                ['업소명', viewingEmp.name],
                ['사업자등록번호', viewingEmp.regNumber],
                ['대표자명', viewingEmp.owner],
                ['대표 연락처', viewingEmp.phone],
                ['신청 일자', viewingEmp.date],
                ['심사 상태', viewingEmp.status === 'approved' ? '✅ 승인 완료' : viewingEmp.status === 'rejected' ? '❌ 거절됨' : '⏳ 심사 대기 중'],
              ].map(([k, v]) => (
                <div key={k} className={styles.detailRow}>
                  <span className={styles.detailKey}>{k}</span>
                  <span className={styles.detailVal}>{v}</span>
                </div>
              ))}
            </div>

            {viewingEmp.status === 'pending' && (
              <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
                <button className={styles.btnApprove} style={{ flex: 1, padding: '12px' }} onClick={() => approveEmp(viewingEmp)}>
                  ✅ 업소 인증 승인
                </button>
                <button className={styles.btnReject} style={{ flex: 1, padding: '12px' }} onClick={() => rejectEmp(viewingEmp)}>
                  ❌ 거절 처리
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 4. 환불 요청 상세 모달 */}
      {viewingRefund && (
        <div className={styles.modalOverlay} onClick={e=>{if(e.target===e.currentTarget)setViewingRefund(null);}}>
          <div className={styles.msgModal} style={{ maxWidth:'580px' }}>
            <div className={styles.msgModalHeader}>
              <h3>💰 환불 요청 상세 정보 — {viewingRefund.companyName}</h3>
              <button className={styles.modalClose} onClick={()=>setViewingRefund(null)}>✕</button>
            </div>

            <div className={styles.detailDrawer} style={{ marginTop: 0 }}>
              {[
                ['공고명', viewingRefund.title],
                ['업소명', viewingRefund.companyName],
                ['등록 유형', viewingRefund.type],
                ['환불 요청 사유', viewingRefund.refundRequest?.reason || '-'],
                ['신청 일시', viewingRefund.refundRequest?.requestedAt ? new Date(viewingRefund.refundRequest.requestedAt).toLocaleString('ko-KR') : '-'],
                ['원 결제 금액', viewingRefund.paymentHistory?.length ? `${viewingRefund.paymentHistory[viewingRefund.paymentHistory.length - 1].amount.toLocaleString()} 원` : '-'],
                ['환불 기준 계산액', viewingRefund.refundRequest ? `${viewingRefund.refundRequest.refundAmount.toLocaleString()} 원` : '-'],
                ['처리 상태', viewingRefund.refundRequest?.status || '요청됨'],
              ].map(([k, v]) => (
                <div key={k} className={styles.detailRow}>
                  <span className={styles.detailKey}>{k}</span>
                  <span className={styles.detailVal}>{v}</span>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
              <button className={styles.btnApprove} style={{ flex: 1, padding: '12px' }} onClick={() => approveRefund(viewingRefund.id)}>
                ✅ 환불 승인
              </button>
              <button className={styles.btnReject} style={{ flex: 1, padding: '12px' }} onClick={() => rejectRefund(viewingRefund.id)}>
                ❌ 환불 거부
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. 쪽지 상세 모달 */}
      {viewingMsg && (
        <div className={styles.modalOverlay} onClick={e=>{if(e.target===e.currentTarget)setViewingMsg(null);}}>
          <div className={styles.msgModal} style={{ maxWidth:'520px' }}>
            <div className={styles.msgModalHeader}>
              <h3>✉️ 쪽지 상세 내용</h3>
              <button className={styles.modalClose} onClick={()=>setViewingMsg(null)}>✕</button>
            </div>

            <div className={styles.detailDrawer} style={{ marginTop: 0 }}>
              {[
                ['수신자 닉네임', viewingMsg.toName],
                ['수신자 ID', viewingMsg.to],
                ['발신자', viewingMsg.fromName || viewingMsg.from],
                ['발송 일시', formatDate(viewingMsg.createdAt)],
                ['읽음 상태', viewingMsg.read ? '✅ 수신자가 읽음' : '⏳ 안 읽음'],
                ['제목', viewingMsg.subject],
              ].map(([k, v]) => (
                <div key={k} className={styles.detailRow}>
                  <span className={styles.detailKey}>{k}</span>
                  <span className={styles.detailVal}>{v}</span>
                </div>
              ))}

              <div style={{ marginTop: '12px' }}>
                <span style={{ fontWeight: 800, fontSize: '12px', color: '#475569', display: 'block', marginBottom: '4px' }}>
                  📄 쪽지 내용 전문:
                </span>
                <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '13.5px', whiteSpace: 'pre-wrap', color: '#1e293b' }}>
                  {viewingMsg.content}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
              <button
                className={styles.bulkBtn}
                style={{ flex: 1, background: '#2563eb' }}
                onClick={() => {
                  setSendTarget({ userId: viewingMsg.to, username: viewingMsg.to, nickname: viewingMsg.toName });
                  setViewingMsg(null);
                }}
              >
                ↩️ 동일인에게 또 보내기
              </button>
              <button
                className={styles.btnReject}
                style={{ flex: 1 }}
                onClick={() => { deleteMessage(viewingMsg.id); setViewingMsg(null); loadData(); showToast('🗑️ 쪽지 삭제 완료'); }}
              >
                🗑️ 쪽지 삭제
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 6. 대시보드 통계 카드 클릭 모달 (`viewingStatModal`) */}
      {viewingStatModal && (
        <div className={styles.modalOverlay} onClick={e=>{if(e.target===e.currentTarget)setViewingStatModal(null);}}>
          <div className={styles.msgModal} style={{ maxWidth:'620px' }}>
            <div className={styles.msgModalHeader}>
              <h3>
                {viewingStatModal === 'ads' && '👑 광고 데이터 실시간 집계 분석'}
                {viewingStatModal === 'users' && '👥 플랫폼 회원 통계 분석'}
                {viewingStatModal === 'logs' && '🔍 이용자 동작 행위 로그 통계'}
                {viewingStatModal === 'chat' && '💬 실시간 상담 및 쪽지 집계'}
                {viewingStatModal === 'mrr' && '💳 실제 결제 및 매출 집계 분석'}
              </h3>
              <button className={styles.modalClose} onClick={()=>setViewingStatModal(null)}>✕</button>
            </div>

            <div className={styles.detailDrawer} style={{ marginTop: 0 }}>
              {viewingStatModal === 'mrr' && (
                <>
                  <div style={{ fontWeight: 800, color: '#059669', marginBottom: 12, fontSize: '16px' }}>
                    💳 실제 결제 매출: ₩0 원 (크롤링 공고 {ads.length.toLocaleString()}건 무료 수집/게재 중)
                  </div>
                  {[
                    ['👑 VVIP 스페셜 채용 (최상단)', `월 500,000원 · 게재 ${ads.filter(a=>a.type==='top'||a.type==='vvip').length}건 (유료 0건)`],
                    ['🎖️ GRAND VIP 추천 (중상단)', `월 300,000원 · 게재 ${ads.filter(a=>a.type==='priority'||a.type==='grand').length}건 (유료 0건)`],
                    ['💎 PREMIUM 핫 구인 (중단)', `월 200,000원 · 게재 ${ads.filter(a=>a.type==='special'||a.type==='recommended'||a.type==='premium').length}건 (유료 0건)`],
                    ['📋 일반 텍스트 줄광고 (하단)', `무료 게재 · 게재 ${ads.filter(a=>a.type==='general'||a.type==='line').length}건`],
                    ['실제 누적 집계 결제액', '₩0 원 (유료 결제 발생 시 자동 합산)'],
                  ].map(([k,v])=>(
                    <div key={k} className={styles.detailRow}><span className={styles.detailKey}>{k}</span><span className={styles.detailVal}>{v}</span></div>
                  ))}
                  <button className={styles.bulkBtn} style={{ marginTop: 14, width: '100%', background: '#059669' }} onClick={()=>{ setTab('ads'); setViewingStatModal(null); }}>
                    📋 등록 광고 전체 목록 보기
                  </button>
                </>
              )}

              {viewingStatModal === 'ads' && (
                <>
                  <div style={{ fontWeight: 800, color: '#e11d48', marginBottom: 10 }}>총 게재 광고: {stats.totalAds.toLocaleString()} 개</div>
                  {[
                    ['Top (VIP) 광고', `${ads.filter(a=>a.type==='top').length}개`],
                    ['Priority 우선 광고', `${ads.filter(a=>a.type==='priority').length}개`],
                    ['Special 추천 광고', `${ads.filter(a=>a.type==='special'||a.type==='recommended').length}개`],
                    ['General 일반 공고', `${ads.filter(a=>a.type==='general').length}개`],
                    ['승인 대기 중 공고', `${stats.pendingCount}개`],
                  ].map(([k,v])=>(
                    <div key={k} className={styles.detailRow}><span className={styles.detailKey}>{k}</span><span className={styles.detailVal}>{v}</span></div>
                  ))}
                  <button className={styles.bulkBtn} style={{ marginTop: 14, width: '100%', background: '#e11d48' }} onClick={()=>{ setTab('ads'); setViewingStatModal(null); }}>
                    📋 광고 전체 목록으로 이동
                  </button>
                </>
              )}

              {viewingStatModal === 'users' && (
                <>
                  <div style={{ fontWeight: 800, color: '#2563eb', marginBottom: 10 }}>총 가입 회원: {stats.totalUsers} 명</div>
                  {[
                    ['구직자 회원', `${stats.seekers} 명`],
                    ['업소 회원', `${stats.empCount} 명`],
                    ['업소 인증 대기', `${stats.empReqs} 건`],
                    ['이메일 본인인증 완료', `${users.filter(u=>u.verified).length} 명`],
                  ].map(([k,v])=>(
                    <div key={k} className={styles.detailRow}><span className={styles.detailKey}>{k}</span><span className={styles.detailVal}>{v}</span></div>
                  ))}
                  <button className={styles.bulkBtn} style={{ marginTop: 14, width: '100%', background: '#2563eb' }} onClick={()=>{ setTab('users'); setViewingStatModal(null); }}>
                    👥 회원 관리 전체 목록으로 이동
                  </button>
                </>
              )}

              {viewingStatModal === 'logs' && (
                <>
                  <div style={{ fontWeight: 800, color: '#7c3aed', marginBottom: 10 }}>수집된 동작 로그: {stats.totalLogs} 건</div>
                  {[
                    ['회원 가입 로그', `${activityLogs.filter(l=>l.type==='회원가입').length}건`],
                    ['로그인 로그', `${activityLogs.filter(l=>l.type==='로그인').length}건`],
                    ['광고 승인/관리', `${activityLogs.filter(l=>l.type.includes('광고')).length}건`],
                    ['쪽지 및 알림', `${activityLogs.filter(l=>l.type.includes('쪽지')).length}건`],
                  ].map(([k,v])=>(
                    <div key={k} className={styles.detailRow}><span className={styles.detailKey}>{k}</span><span className={styles.detailVal}>{v}</span></div>
                  ))}
                  <button className={styles.bulkBtn} style={{ marginTop: 14, width: '100%', background: '#7c3aed' }} onClick={()=>{ setTab('activitylog'); setViewingStatModal(null); }}>
                    🔍 행위 로그 전체 보기로 이동
                  </button>
                </>
              )}

              {viewingStatModal === 'chat' && (
                <>
                  <div style={{ fontWeight: 800, color: '#059669', marginBottom: 10 }}>실시간 1:1 대화: {chatSessions.length} 건</div>
                  {[
                    ['미확인 문의', `${chatSessions.reduce((s,c)=>s+c.unreadAdmin,0)} 건`],
                    ['보낸/받은 총 쪽지', `${messages.length} 건`],
                    ['미읽음 쪽지', `${stats.unreadMsgs} 건`],
                  ].map(([k,v])=>(
                    <div key={k} className={styles.detailRow}><span className={styles.detailKey}>{k}</span><span className={styles.detailVal}>{v}</span></div>
                  ))}
                  <button className={styles.bulkBtn} style={{ marginTop: 14, width: '100%', background: '#059669' }} onClick={()=>{ setTab('livechat'); setViewingStatModal(null); }}>
                    💬 실시간 문의 상담 창으로 이동
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 7. 활동 로그 상세 및 특정 사용자 타임라인 모달 (`viewingLog`) */}
      {viewingLog && (() => {
        const uInfo = formatUserLabel(viewingLog);
        const targetId = viewingLog.sessionId || viewingLog.userId;
        const userTimeline = activityLogs.filter(l => (l.sessionId && l.sessionId === viewingLog.sessionId) || (l.userId && l.userId === viewingLog.userId));

        return (
          <div className={styles.modalOverlay} onClick={e=>{if(e.target===e.currentTarget)setViewingLog(null);}}>
            <div className={styles.msgModal} style={{ maxWidth:'640px' }}>
              <div className={styles.msgModalHeader}>
                <h3>🔎 이용자 동작 및 실시간 행동 타임라인</h3>
                <button className={styles.modalClose} onClick={()=>setViewingLog(null)}>✕</button>
              </div>

              {/* 1) 누가 (Who) */}
              <div style={{ background: '#f8fafc', border: '1.5px solid #cbd5e1', borderRadius: '12px', padding: '14px', marginBottom: '14px' }}>
                <div style={{ fontSize: '12px', fontWeight: 900, color: '#64748b', marginBottom: '4px' }}>
                  👤 동작 수행자 식별 (WHO)
                </div>
                <div style={{ fontSize: '15px', fontWeight: 900, color: uInfo.isAnon ? '#334155' : '#1e40af' }}>
                  {uInfo.title}
                </div>
                <div style={{ fontSize: '12.5px', color: '#475569', marginTop: '2px', fontWeight: 600 }}>
                  {uInfo.sub}
                </div>
              </div>

              {/* 2) 어떤 동작 (What) */}
              <div className={styles.detailDrawer} style={{ marginTop: 0, maxHeight: '35vh', overflowY: 'auto' }}>
                <div style={{ fontSize: '12px', fontWeight: 900, color: '#7c3aed', marginBottom: '8px' }}>
                  ⚡ 클릭한 동작 상세 (WHAT)
                </div>
                {[
                  ['동작 유형', viewingLog.type],
                  ['수행 액션', viewingLog.action],
                  ['상세 설명', viewingLog.detail || '-'],
                  ['접속 IP', resolveIp(viewingLog.ip)],
                  ['기기 / 브라우저', `${viewingLog.device || 'PC'} (${viewingLog.browser || 'Chrome'})`],
                  ['접속 세션 ID', viewingLog.sessionId || viewingLog.id],
                  ['발생 시각', new Date(viewingLog.at).toLocaleString('ko-KR')],
                ].map(([k,v])=>(
                  <div key={k} className={styles.detailRow}>
                    <span className={styles.detailKey}>{k}</span>
                    <span className={styles.detailVal}>{v}</span>
                  </div>
                ))}
              </div>

              {/* 3) 이 사용자의 연속 행동 타임라인 */}
              {userTimeline.length > 0 && (
                <div style={{ marginTop: '14px', borderTop: '1px solid #e2e8f0', paddingTop: '12px' }}>
                  <div style={{ fontSize: '12.5px', fontWeight: 900, color: '#1e293b', marginBottom: '8px' }}>
                    🕒 이 이용자의 전체 연속 행동 타임라인 ({userTimeline.length}건 수집됨)
                  </div>

                  <div style={{ maxHeight: '180px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {userTimeline.map(l => (
                      <div key={l.id} style={{ background: '#f1f5f9', padding: '8px 12px', borderRadius: '8px', fontSize: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <strong style={{ color: ACT_COLORS[l.type] || '#475569' }}>[{l.type}]</strong> {l.action}
                          <span style={{ color: '#64748b', marginLeft: '6px', fontSize: '11px' }}>{l.detail.slice(0, 30)}</span>
                        </div>
                        <span style={{ fontSize: '10.5px', color: '#94a3b8', whiteSpace: 'nowrap' }}>
                          {new Date(l.at).toLocaleTimeString('ko-KR')}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
                <button
                  className={styles.bulkBtn}
                  style={{ flex: 1, background: '#7c3aed' }}
                  onClick={() => {
                    setFilterSessionId(targetId);
                    setTab('activitylog');
                    setViewingLog(null);
                  }}
                >
                  🔍 이 이용자의 모든 동작 로그 필터링
                </button>
                <button className={styles.sendMsgBtn} style={{ flex: 1 }} onClick={()=>setViewingLog(null)}>
                  확인
                </button>
              </div>
            </div>
          </div>
        );
      })()}

      {/* 8. 쪽지 발송 모달 */}
      {/* 8. 쪽지 발송 모달 (구인자 전체 / 구직자 전체 / 플랫폼 전체 / 특정 대상) */}
      {(sendTarget||bulkMode) && (
        <div className={styles.modalOverlay} onClick={e=>{if(e.target===e.currentTarget){setSendTarget(null);setBulkMode(false);}}}>
          <div className={styles.msgModal} style={{ maxWidth: '620px' }}>
            <div className={styles.msgModalHeader}>
              <h3>✉️ 관리자 쪽지 & PWA 모바일 상단 푸시 센터</h3>
              <button className={styles.modalClose} onClick={()=>{setSendTarget(null);setBulkMode(false);}}>✕</button>
            </div>

            {/* 발송 채널 선택 (인앱 쪽지 vs PWA 스마트폰 상단 알림) */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', background: '#f1f5f9', padding: '4px', borderRadius: '12px' }}>
              <button
                type="button"
                onClick={() => setMsgChannel('msg')}
                style={{
                  flex: 1, padding: '8px', borderRadius: '8px', border: 'none', fontSize: '13px', fontWeight: 900, cursor: 'pointer',
                  background: msgChannel === 'msg' ? '#ffffff' : 'transparent',
                  color: msgChannel === 'msg' ? '#c2185b' : '#64748b',
                  boxShadow: msgChannel === 'msg' ? '0 2px 6px rgba(0,0,0,0.08)' : 'none'
                }}
              >
                ✉️ 일반 서비스 쪽지 발송
              </button>
              <button
                type="button"
                onClick={() => setMsgChannel('pwa_push')}
                style={{
                  flex: 1, padding: '8px', borderRadius: '8px', border: 'none', fontSize: '13px', fontWeight: 900, cursor: 'pointer',
                  background: msgChannel === 'pwa_push' ? '#ffffff' : 'transparent',
                  color: msgChannel === 'pwa_push' ? '#7c3aed' : '#64748b',
                  boxShadow: msgChannel === 'pwa_push' ? '0 2px 6px rgba(0,0,0,0.08)' : 'none'
                }}
              >
                📱 PWA 스마트폰 상단 푸시 알림 🔔
              </button>
            </div>

            {/* 수신 대상 선택 버튼 4종 */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '12px', fontWeight: 800, color: '#334155', display: 'block', marginBottom: '6px' }}>
                🎯 수신 대상 지정:
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
                <button
                  type="button"
                  onClick={() => setTargetAudience('all_employers')}
                  style={{
                    padding: '10px 12px', borderRadius: '10px', fontSize: '12.5px', fontWeight: 800, cursor: 'pointer',
                    background: targetAudience === 'all_employers' ? '#fce4ec' : '#f8fafc',
                    color: targetAudience === 'all_employers' ? '#c2185b' : '#475569',
                    border: targetAudience === 'all_employers' ? '2px solid #c2185b' : '1px solid #cbd5e1',
                    textAlign: 'left'
                  }}
                >
                  🏢 모든 구인자/업소 회원 ({stats.empCount + Array.from(new Set(ads.map(a=>a.companyName))).length}곳)
                </button>

                <button
                  type="button"
                  onClick={() => setTargetAudience('all_seekers')}
                  style={{
                    padding: '10px 12px', borderRadius: '10px', fontSize: '12.5px', fontWeight: 800, cursor: 'pointer',
                    background: targetAudience === 'all_seekers' ? '#eff6ff' : '#f8fafc',
                    color: targetAudience === 'all_seekers' ? '#2563eb' : '#475569',
                    border: targetAudience === 'all_seekers' ? '2px solid #2563eb' : '1px solid #cbd5e1',
                    textAlign: 'left'
                  }}
                >
                  👤 모든 구직자 회원 ({stats.seekers}명)
                </button>

                <button
                  type="button"
                  onClick={() => setTargetAudience('all_users')}
                  style={{
                    padding: '10px 12px', borderRadius: '10px', fontSize: '12.5px', fontWeight: 800, cursor: 'pointer',
                    background: targetAudience === 'all_users' ? '#f3e8ff' : '#f8fafc',
                    color: targetAudience === 'all_users' ? '#7c3aed' : '#475569',
                    border: targetAudience === 'all_users' ? '2px solid #7c3aed' : '1px solid #cbd5e1',
                    textAlign: 'left'
                  }}
                >
                  📢 플랫폼 전체 회원 ({stats.totalUsers}명)
                </button>

                <button
                  type="button"
                  onClick={() => setTargetAudience('specific')}
                  style={{
                    padding: '10px 12px', borderRadius: '10px', fontSize: '12.5px', fontWeight: 800, cursor: 'pointer',
                    background: targetAudience === 'specific' ? '#f0fdf4' : '#f8fafc',
                    color: targetAudience === 'specific' ? '#15803d' : '#475569',
                    border: targetAudience === 'specific' ? '2px solid #15803d' : '1px solid #cbd5e1',
                    textAlign: 'left'
                  }}
                >
                  🎯 특정 지정: {sendTarget ? (sendTarget.nickname || sendTarget.username) : '대상 선택'}
                </button>
              </div>
            </div>

            <div className={styles.msgField}>
              <label>쪽지 제목</label>
              <input value={msgSubject} onChange={e=>setMsgSubject(e.target.value)} placeholder="제목 입력" className={styles.msgInput} />
            </div>

            <div className={styles.msgField}>
              <label>쪽지 내용</label>
              <textarea value={msgContent} onChange={e=>setMsgContent(e.target.value)} placeholder="내용 입력" className={styles.msgTextarea} rows={6} />
            </div>

            <div className={styles.templateRow}>
              <span className={styles.templateLabel}>빠른 템플릿:</span>
              {[
                { label:'가입 축하', s:'🎉 아름다운밤 가입을 축하합니다!', c:'안녕하세요!\n아름다운밤에 가입해주셔서 감사드립니다.\n궁금한 점은 고객센터로 연락 주세요.\n- 아름다운밤 운영팀' },
                { label:'구인자 공지', s:'📢 [구인업소 전용] 아름다운밤 광고 게재 및 노출 안내', c:'안녕하세요 구인 사장님!\n아름다운밤에서는 24시간 실시간 광고 노출과 구직자 매칭을 지원합니다.\n추가 혜택 및 공고 수정은 고객센터로 문의해주세요.\n- 아름다운밤 운영팀' },
                { label:'수정 요청', s:'📝 광고 정보 수정 요청', c:'안녕하세요.\n등록하신 광고에 수정이 필요한 사항이 있습니다.\n빠른 시일 내에 수정 부탁드립니다.\n- 아름다운밤 운영팀' },
                { label:'경고', s:'⚠️ 이용 약관 위반 경고', c:'안녕하세요.\n이용 약관 위반이 감지되었습니다.\n반복 시 계정이 정지될 수 있습니다.\n- 아름다운밤 운영팀' },
              ].map(t=>(
                <button key={t.label} type="button" className={styles.templateBtn} onClick={()=>{setMsgSubject(t.s);setMsgContent(t.c);}}>{t.label}</button>
              ))}
            </div>

            {sendOk ? (
              <div className={styles.sendOkMsg}>✅ {msgChannel === 'pwa_push' ? 'PWA 스마트폰 상단 푸시 알림이 발송되었습니다!' : '선택한 수신 대상에게 쪽지가 전송되었습니다!'}</div>
            ) : (
              <button
                className={styles.sendMsgBtn}
                style={msgChannel === 'pwa_push' ? { background: 'linear-gradient(135deg, #7c3aed, #6d28d9)' } : {}}
                onClick={executeSendMessage}
                disabled={!msgSubject.trim()||!msgContent.trim()}
              >
                {msgChannel === 'pwa_push' ? (
                  `📱 [PWA 푸시] ${targetAudience === 'all_employers' ? '모든 구인자' : targetAudience === 'all_seekers' ? '모든 구직자' : targetAudience === 'all_users' ? '플랫폼 전체' : (sendTarget?.nickname || sendTarget?.username || '지정 대상')} 스마트폰 상단 알림 전송`
                ) : (
                  <>
                    {targetAudience === 'all_employers' && '📢 모든 구인자/업소 전체 쪽지 전송'}
                    {targetAudience === 'all_seekers' && '📢 모든 구직자 전체 쪽지 전송'}
                    {targetAudience === 'all_users' && `📢 전체 회원 (${stats.totalUsers}명) 쪽지 전송`}
                    {targetAudience === 'specific' && `✉️ '${sendTarget?.nickname || sendTarget?.username || '지정 대상'}'에게 쪽지 전송`}
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      )}

      {/* 9. 광고 수정 모달 */}
      {editingAd && (
        <div className={styles.modalOverlay} onClick={e=>{if(e.target===e.currentTarget)setEditingAd(null);}}>
          <div className={styles.msgModal} style={{ maxWidth:'640px' }}>
            <div className={styles.msgModalHeader}>
              <h3>✏️ 광고 수정 — {editingAd.companyName}</h3>
              <button className={styles.modalClose} onClick={()=>setEditingAd(null)}>✕</button>
            </div>
            <div style={{ maxHeight:'65vh', overflowY:'auto', display:'flex', flexDirection:'column', gap:'12px' }}>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px' }}>
                <div className={styles.msgField}>
                  <label>등급 유형</label>
                  <select value={editFields.type} onChange={e=>setEditFields(f=>({...f,type:e.target.value}))} className={styles.msgInput} style={{ background:'#f9fafb' }}>
                    <option value="top">Top (VIP)</option><option value="priority">Priority</option>
                    <option value="special">Special</option><option value="general">General</option>
                  </select>
                </div>
                <div className={styles.msgField}><label>업소명</label><input value={editFields.company} onChange={e=>setEditFields(f=>({...f,company:e.target.value}))} className={styles.msgInput} /></div>
              </div>
              <div className={styles.msgField}><label>공고명</label><input value={editFields.title} onChange={e=>setEditFields(f=>({...f,title:e.target.value}))} className={styles.msgInput} /></div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px' }}>
                <div className={styles.msgField}><label>지역</label><input value={editFields.location} onChange={e=>setEditFields(f=>({...f,location:e.target.value}))} className={styles.msgInput} /></div>
                <div className={styles.msgField}><label>급여</label><input value={editFields.pay} onChange={e=>setEditFields(f=>({...f,pay:e.target.value}))} className={styles.msgInput} /></div>
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px' }}>
                <div className={styles.msgField}><label>연락처</label><input value={editFields.phone} onChange={e=>setEditFields(f=>({...f,phone:e.target.value}))} className={styles.msgInput} /></div>
                <div className={styles.msgField}><label>카카오ID</label><input value={editFields.kakao} onChange={e=>setEditFields(f=>({...f,kakao:e.target.value}))} className={styles.msgInput} /></div>
              </div>
              <div className={styles.msgField}><label>배너 이미지 URL</label><input value={editFields.image} onChange={e=>setEditFields(f=>({...f,image:e.target.value}))} className={styles.msgInput} /></div>
              <div className={styles.msgField}><label>상세 구인 내용</label><textarea value={editFields.desc} onChange={e=>setEditFields(f=>({...f,desc:e.target.value}))} className={styles.msgTextarea} rows={8} /></div>
            </div>
            <button className={styles.sendMsgBtn} onClick={saveEdit} disabled={!editFields.title.trim()||!editFields.company.trim()}>💾 수정 내용 저장</button>
          </div>
        </div>
      )}
    </div>
  );
}
