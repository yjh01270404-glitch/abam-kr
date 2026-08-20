'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeft, MapPin, Clock, ShieldCheck, PhoneCall, MessageSquare, Phone, Eye, Tag, Star, Lock, Sparkles, CheckCircle2 } from 'lucide-react';
import styles from './detail.module.css';
import { sendMessage } from '../../../lib/messages';
import { JobAd } from '../../../lib/mockData';
import { formatDetailHtml } from '../../../lib/detailFormatter';
import { createOrGetSession, sendChatMsg, getChatSession, ChatMsg } from '../../../lib/chat';
import { trackChatStart } from '../../../lib/tracker';

export default function JobDetailClient({ job, currentUser }: { job: JobAd; currentUser: any }) {
  const [showChatModal, setShowChatModal] = useState(false);
  const [chatMsgs, setChatMsgs] = useState<ChatMsg[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [chatSessionId, setChatSessionId] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  const phone = (job as any).contactPhone ?? '010-7925-8874';
  const kakao = (job as any).contactKakao ?? 'SUPER8874';
  const company = job.companyName || '아름다운밤 추천업소';
  const loc = job.location || '서울 강남구';
  const pay = job.pay || '일급 50만원 이상';
  const rawDesc = job.description || '안녕하세요! 최고 우대 조건으로 언니들을 모시고 있습니다. 자율 출퇴근, 당일 100% 현금정산, 초보환영!';

  // 고도화된 정밀 HTML 포맷팅 (어색함 0% 완벽판)
  const formattedHtml = formatDetailHtml(rawDesc);

  /* ── 안심톡: 업소별 1:1 채팅 세션 개설 ── */
  function openChat() {
    let anonId = localStorage.getItem('abam_chat_session_id');
    if (!anonId) { anonId = Math.random().toString(36).slice(2, 9); localStorage.setItem('abam_chat_session_id', anonId); }
    const myId = currentUser?.id ? `user_${currentUser.id}` : `anon_${anonId}`;
    const sid = `job_${job.id}_${myId}`;
    const nick = currentUser?.nickname || currentUser?.username || '비회원 구직자';
    const tStr = new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });
    const sessions = JSON.parse(localStorage.getItem('abam_live_chats') ?? '[]');
    const exists = sessions.find((s: any) => s.sessionId === sid);
    if (!exists) {
      sessions.push({
        sessionId: sid, userId: currentUser?.id, nickname: nick,
        jobId: job.id, companyName: company,
        msgs: [
          { id: Date.now(), from: '관리자', text: `안녕하세요! 🌙 [${company}] 담당자와 연결됩니다.`, time: tStr },
          { id: Date.now() + 1, from: '관리자', text: `📍 위치: ${loc}\n💰 급여: ${pay}\n\n궁금하신 사항을 편하게 질문해주세요! 😊`, time: tStr },
        ],
        updatedAt: Date.now(), unreadAdmin: 0, unreadUser: 1,
      });
      localStorage.setItem('abam_live_chats', JSON.stringify(sessions));
    }
    const s = JSON.parse(localStorage.getItem('abam_live_chats') ?? '[]').find((x: any) => x.sessionId === sid);
    setChatSessionId(sid);
    setChatMsgs(s ? s.msgs : []);
    setShowChatModal(true);
    trackChatStart(company);
    setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 150);
  }

  function sendChatMessage() {
    if (!chatInput.trim() || !chatSessionId) return;
    sendChatMsg(chatSessionId, '고객', chatInput.trim());
    const updated = getChatSession(chatSessionId);
    if (updated) setChatMsgs([...updated.msgs]);
    setChatInput('');
    setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 50);
  }

  useEffect(() => {
    if (!showChatModal || !chatSessionId) return;
    const t = setInterval(() => {
      const s = getChatSession(chatSessionId);
      if (s) setChatMsgs([...s.msgs]);
    }, 1500);
    return () => clearInterval(t);
  }, [showChatModal, chatSessionId]);

  return (
    <div className={styles.container} style={{ background: '#fcf6f9', minHeight: '100vh', paddingBottom: '100px', fontFamily: '"Noto Sans KR", sans-serif' }}>
      {/* 1. 상단 네비게이션 헤더 */}
      <header className={styles.header} style={{ background: '#ffffff', borderBottom: '1px solid #f3e2eb', boxShadow: '0 2px 8px rgba(190, 24, 93, 0.05)', position: 'sticky', top: 0, zIndex: 100 }}>
        <Link href="/jobs" className={styles.backButton} style={{ color: '#4b5563', textDecoration: 'none', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
          <ChevronLeft size={22} />
          <span>목록으로</span>
        </Link>
        <div className={styles.headerTitle} style={{ fontWeight: 900, color: '#1f2937', fontSize: '16px' }}>구인 상세 정보</div>
        <div className={styles.headerRight} style={{ color: '#9ca3af', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Eye size={14} />
          <span>{job.viewCount || 1240}회 조회</span>
        </div>
      </header>

      <main className={styles.main} style={{ maxWidth: '680px', margin: '20px auto 0', padding: '0 16px' }}>
        {job.payment_status === 'unpaid' && (
          <div style={{ background: '#fff1f2', border: '1px solid #fecdd3', borderRadius: '12px', padding: '14px', marginBottom: '20px', textAlign: 'center', fontSize: '13.5px', color: '#be123c', fontWeight: 800 }}>
            ⚠️ 본 구인 광고는 현재 [결제 승인 대기] 상태입니다. 프리뷰 화면만 노출됩니다.
          </div>
        )}

        {/* 2. 럭셔리 고도화 구인 전단지 프레임 */}
        <div style={{
          background: '#ffffff',
          border: '2.5px solid #f3e2eb',
          borderRadius: '24px',
          overflow: 'hidden',
          boxShadow: '0 10px 40px rgba(190, 24, 93, 0.08)',
          boxSizing: 'border-box'
        }}>
          {/* Top Brand Header */}
          <div style={{
            background: 'linear-gradient(135deg, #be185d 0%, #e11d48 50%, #9d174d 100%)',
            padding: '16px 20px',
            color: '#ffffff',
            textAlign: 'center',
            fontWeight: 900,
            fontSize: '19px',
            letterSpacing: '-0.02em',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}>
            <span>🌙 아름다운밤 [안심보증 1위 추천업소]</span>
          </div>

          {/* Main Title Banner Box (타이틀 겹침 0% + 럭셔리 네온 하이라이트) */}
          <div style={{ padding: '24px 20px 16px' }}>
            <div style={{
              background: 'linear-gradient(180deg, #ffffff 0%, #fff1f2 100%)',
              border: '2.5px solid #fbbf24',
              borderRadius: '20px',
              padding: '22px 18px',
              textAlign: 'center',
              boxShadow: '0 4px 20px rgba(251, 191, 36, 0.2)'
            }}>
              <span style={{
                background: 'linear-gradient(135deg, #be185d 0%, #9d174d 100%)',
                color: '#ffffff',
                fontSize: '12px',
                fontWeight: 900,
                padding: '4px 14px',
                borderRadius: '20px',
                display: 'inline-block',
                marginBottom: '12px',
                boxShadow: '0 2px 8px rgba(190, 24, 93, 0.3)'
              }}>
                👑 BEST PREMIUM (📍 {loc})
              </span>

              <h1 style={{
                fontSize: '28px',
                fontWeight: 900,
                color: '#be185d',
                margin: '4px 0 10px 0',
                lineHeight: 1.25,
                letterSpacing: '-0.02em'
              }}>
                {company}
              </h1>

              <div style={{
                fontSize: '18px',
                fontWeight: 900,
                color: '#d97706',
                margin: '6px 0 14px 0'
              }}>
                💰 {pay} <span style={{ fontSize: '13.5px', color: '#16a34a', fontWeight: 800 }}>(당일 100% 즉시정산)</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', flexWrap: 'wrap', marginTop: '10px' }}>
                <span style={{ background: '#f43f5e', color: '#fff', fontSize: '12px', fontWeight: 900, padding: '4px 12px', borderRadius: '10px' }}>당일정산</span>
                <span style={{ background: '#0284c7', color: '#fff', fontSize: '12px', fontWeight: 900, padding: '4px 12px', borderRadius: '10px' }}>초보환영</span>
                <span style={{ background: '#eab308', color: '#000', fontSize: '12px', fontWeight: 900, padding: '4px 12px', borderRadius: '10px' }}>숙소제공</span>
                <span style={{ background: '#10b981', color: '#fff', fontSize: '12px', fontWeight: 900, padding: '4px 12px', borderRadius: '10px' }}>자율출퇴근</span>
              </div>
            </div>
          </div>

          {/* 3. 본문 상세 내용 (어색함 없는 통합 섹션 카드 & 들여쓰기) */}
          <div style={{ padding: '0 20px 24px' }}>
            <div style={{
              background: '#ffffff',
              border: '1.5px solid #f3e2eb',
              borderRadius: '20px',
              padding: '24px 20px',
              boxSizing: 'border-box'
            }}>
              <h2 style={{
                fontSize: '17.5px',
                fontWeight: 900,
                color: '#0d9488',
                margin: '0 0 18px 0',
                borderBottom: '2px dashed #ccfbf1',
                paddingBottom: '10px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                <span>│</span> <span>[상세 구인소개 및 근무조건]</span>
              </h2>

              <div
                style={{
                  fontFamily: '"Noto Sans KR", sans-serif',
                  fontSize: '15px',
                  color: '#374151',
                  lineHeight: 1.85,
                  fontWeight: 500,
                  wordBreak: 'keep-all'
                }}
                dangerouslySetInnerHTML={{ __html: formattedHtml }}
              />

              <div style={{
                marginTop: '22px',
                background: 'linear-gradient(135deg, #fdf2f8 0%, #fff1f2 100%)',
                padding: '14px 16px',
                borderRadius: '14px',
                border: '1px solid #fbcfe8',
                color: '#9d174d',
                fontWeight: 800,
                fontSize: '13.5px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 2px 8px rgba(251, 207, 232, 0.3)'
              }}>
                <Sparkles size={20} color="#be185d" />
                <span>💡 100% 철저한 개인정보 비밀보장! 당일 퇴근 시 100% 현금/계좌 즉시 정산을 약속드립니다.</span>
              </div>
            </div>
          </div>

          {/* 4. 하단 24시간 실시간 문의 연락처 바 */}
          <div style={{
            background: 'linear-gradient(135deg, #be185d 0%, #9d174d 100%)',
            padding: '22px 20px',
            color: '#ffffff',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '23px', fontWeight: 900, marginBottom: '6px', letterSpacing: '0.02em' }}>
              📞 전화문의: <a href={`tel:${phone}`} style={{ color: '#ffffff', textDecoration: 'none' }}>{phone}</a>
            </div>
            <div style={{ fontSize: '15.5px', fontWeight: 800, color: '#fef08a' }}>
              💬 카카오톡 ID: <strong>{kakao}</strong> (24시간 1:1 친절상담)
            </div>
            <p style={{ fontSize: '12.5px', opacity: 0.9, margin: '8px 0 0 0', fontWeight: 600 }}>
              "아름다운밤 보고 연락하셨다"고 말씀하시면 우선 우대 혜택을 받으실 수 있습니다.
            </p>
          </div>
        </div>
      </main>

      {/* 플로팅 1:1 연락 액션 바 */}
      <div className={styles.floatingActionBar} style={{ background: '#ffffff', borderTop: '1px solid #f3e2eb', boxShadow: '0 -4px 15px rgba(0,0,0,0.06)', zIndex: 100 }}>
        {job.payment_status === 'unpaid' ? (
          <span className={styles.actionDisabled} style={{ width: '100%', justifyContent: 'center' }}>
            <Lock size={16} />
            결제 대기 중 (연락처 열람 불가)
          </span>
        ) : (
          <>
            <button
              onClick={openChat}
              style={{
                flex: 1,
                background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                color: '#ffffff',
                border: 'none',
                borderRadius: '12px',
                padding: '13px',
                fontSize: '15px',
                fontWeight: 900,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                boxShadow: '0 4px 12px rgba(99, 102, 241, 0.25)'
              }}
            >
              <MessageSquare size={18} />
              <span>실시간 안심 톡</span>
            </button>
            <a
              href={`tel:${phone}`}
              style={{
                flex: 1,
                background: 'linear-gradient(135deg, #be185d 0%, #9d174d 100%)',
                color: '#ffffff',
                textDecoration: 'none',
                borderRadius: '12px',
                padding: '13px',
                fontSize: '15px',
                fontWeight: 900,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                boxShadow: '0 4px 12px rgba(190, 24, 93, 0.25)'
              }}
            >
              <Phone size={18} />
              <span>전화하기</span>
            </a>
          </>
        )}
      </div>

      {/* ── 안심톡 1:1 채팅 모달 ── */}
      {showChatModal && (
        <div style={{
          position: 'fixed', bottom: 0, right: 0, width: '100%', maxWidth: '400px',
          height: '520px', background: '#fff', borderRadius: '20px 20px 0 0',
          boxShadow: '0 -8px 40px rgba(0,0,0,0.18)', zIndex: 9999,
          display: 'flex', flexDirection: 'column', fontFamily: '"Noto Sans KR",sans-serif'
        }}>
          <div style={{ background: 'linear-gradient(135deg,#be185d,#9d174d)', padding: '14px 16px', borderRadius: '20px 20px 0 0', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: 38, height: 38, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>🌙</div>
            <div style={{ flex: 1 }}>
              <div style={{ color: '#fff', fontWeight: 900, fontSize: 14 }}>{company} 안심톡</div>
              <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: 11, display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#4ade80', display: 'inline-block' }} />
                온라인 · 평균 응답 1분 이내
              </div>
            </div>
            <button onClick={() => setShowChatModal(false)} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: 8, color: '#fff', padding: '4px 10px', cursor: 'pointer', fontWeight: 900, fontSize: 16 }}>✕</button>
          </div>

          <div style={{ flex: 1, overflowY: 'auto', padding: '16px 12px', display: 'flex', flexDirection: 'column', gap: 10, background: '#fcf6f9' }}>
            {chatMsgs.map(msg => (
              <div key={msg.id} style={{ display: 'flex', justifyContent: msg.from === '나' ? 'flex-end' : 'flex-start', gap: 8, alignItems: 'flex-end' }}>
                {msg.from !== '나' && (
                  <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'linear-gradient(135deg,#be185d,#9d174d)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 900, flexShrink: 0 }}>관</div>
                )}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: msg.from === '나' ? 'flex-end' : 'flex-start' }}>
                  <div style={{
                    background: msg.from === '나' ? 'linear-gradient(135deg,#be185d,#9d174d)' : '#fff',
                    color: msg.from === '나' ? '#fff' : '#111',
                    padding: '9px 13px', borderRadius: msg.from === '나' ? '16px 4px 16px 16px' : '4px 16px 16px 16px',
                    fontSize: 13, fontWeight: 500, maxWidth: 240, lineHeight: 1.55,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)', whiteSpace: 'pre-wrap'
                  }}>{msg.text}</div>
                  <span style={{ fontSize: 10, color: '#9ca3af' }}>{msg.time}</span>
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          <div style={{ padding: '10px 12px', borderTop: '1px solid #f3e2eb', background: '#fff', display: 'flex', gap: 8 }}>
            <input
              value={chatInput}
              onChange={e => setChatInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendChatMessage()}
              placeholder="메시지를 입력하세요..."
              style={{ flex: 1, border: '1.5px solid #f3e2eb', borderRadius: 10, padding: '10px 14px', fontSize: 13, fontFamily: 'inherit', outline: 'none' }}
            />
            <button onClick={sendChatMessage} style={{ background: 'linear-gradient(135deg,#be185d,#9d174d)', border: 'none', borderRadius: 10, color: '#fff', padding: '0 16px', fontWeight: 900, fontSize: 14, cursor: 'pointer' }}>전송</button>
          </div>
          <div style={{ textAlign: 'center', fontSize: 11, color: '#9ca3af', padding: '6px 0 10px', background: '#fff' }}>
            📞 고객센터 070-8057-6615 (평일 09:30 ~ 19:00)
          </div>
        </div>
      )}
    </div>
  );
}
