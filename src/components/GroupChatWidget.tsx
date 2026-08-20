import React, { useState, useEffect, useRef } from 'react';
import { Send, User, MessageCircle, ShieldAlert, Trash2, CornerUpLeft, Heart, ThumbsUp, ThumbsDown } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface ChatMessage {
  id: string;
  nickname: string;
  message: string;
  time: string;
  isMe: boolean;
  replyTo?: {
    nickname: string;
    message: string;
  };
  reactions: {
    heart: number;
    thumbsUp: number;
    thumbsDown: number;
  };
  isDeletedByAdmin?: boolean;
  deletedReason?: string;
}



export default function GroupChatWidget() {
  const { currentUser, topBanners, priorityJobs, recommendedJobs, generalJobs } = useApp();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [anonNickname, setAnonNickname] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [editingNickname, setEditingNickname] = useState(false);
  const [tempNickname, setTempNickname] = useState('');
  const [inputText, setInputText] = useState('');
  const [onlineCount, setOnlineCount] = useState(142);
  const [chatHeight, setChatHeight] = useState('580px');
  const [isMobile, setIsMobile] = useState(false);
  
  // Quoted reply state
  const [replyingTo, setReplyingTo] = useState<ChatMessage | null>(null);

  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Responsive chat height and mode adjust
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        const mobile = window.innerWidth <= 768;
        setIsMobile(mobile);
        if (mobile) {
          setChatHeight('450px');
        } else {
          setChatHeight('580px');
        }
      };
      handleResize();
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  // Initialize random anonymous nickname and load real persisted messages
  useEffect(() => {
    const randomNum = Math.floor(Math.random() * 900) + 100;
    const initialNick = `익명_${randomNum}`;
    setAnonNickname(initialNick);
    setTempNickname(initialNick);

    const stored = localStorage.getItem('abam_chat_messages');
    if (stored) {
      try {
        setMessages(JSON.parse(stored));
      } catch (e) {
        setMessages([]);
      }
    } else {
      setMessages([]);
    }

    const countInterval = setInterval(() => {
      setOnlineCount(prev => prev + (Math.random() > 0.5 ? 1 : -1));
    }, 10000);

    return () => clearInterval(countInterval);
  }, []);

  // Sync isAnonymous toggling with user session and advertising status
  useEffect(() => {
    if (currentUser) {
      if (currentUser.role === 'employer') {
        const activeAds = Array.from(new Map([
          ...topBanners,
          ...priorityJobs,
          ...recommendedJobs,
          ...generalJobs,
        ].map(job => [job.id, job])).values());
        const activeOwnerAd = activeAds.some(ad => {
          const isOwner = ad.companyName === currentUser.companyName;
          const isNotExpired = ad.expiresAt ? new Date(ad.expiresAt).getTime() > Date.now() : true;
          return isOwner && isNotExpired;
        });
        setIsAnonymous(!activeOwnerAd);
      } else {
        setIsAnonymous(false);
      }
    } else {
      setIsAnonymous(true);
    }
  }, [currentUser, topBanners, priorityJobs, recommendedJobs, generalJobs]);

  // Persist real-time messages to localStorage when updated
  useEffect(() => {
    localStorage.setItem('abam_chat_messages', JSON.stringify(messages));
  }, [messages]);

  // Scroll to bottom of inner chat container when messages update (without jumping browser focus)
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const activeNickname = isAnonymous 
    ? anonNickname 
    : (currentUser?.role === 'employer' 
        ? (currentUser.companyName || currentUser.username) 
        : (currentUser?.username || '회원'));

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const now = new Date();
    const hours = now.getHours();
    const ampm = hours >= 12 ? '오후' : '오전';
    const displayHour = hours % 12 === 0 ? 12 : hours % 12;
    const minStr = String(now.getMinutes()).padStart(2, '0');
    const timeStr = `${ampm} ${String(displayHour).padStart(2, '0')}:${minStr}`;

    const newMsg: ChatMessage = {
      id: `me-${Date.now()}`,
      nickname: activeNickname,
      message: inputText.trim(),
      time: timeStr,
      isMe: true,
      reactions: { heart: 0, thumbsUp: 0, thumbsDown: 0 },
      ...(replyingTo ? { replyTo: { nickname: replyingTo.nickname, message: replyingTo.message } } : {})
    };

    setMessages(prev => [...prev, newMsg]);
    setInputText('');
    setReplyingTo(null); // Clear reply context
  };

  const handleSaveNickname = () => {
    if (tempNickname.trim()) {
      setAnonNickname(tempNickname.trim());
      setEditingNickname(false);
    }
  };

  const isAdmin = (currentUser as any)?.role === 'admin' || currentUser?.username === 'admin' || currentUser?.nickname?.includes('관리자') || anonNickname.includes('관리자');

  const handleAdminDeleteMessage = (id: string) => {
    const reasons = [
      '부적절한 광고/홍보글 기재',
      '부적절한 욕설 및 타인 비방',
      '불법 음란 콘텐츠 유포',
      '기타 커뮤니티 이용 규칙 위반'
    ];
    
    const reasonText = window.prompt(
      `[관리자 삭제] 삭제 사유를 선택하거나 직접 입력하세요:\n\n1. ${reasons[0]}\n2. ${reasons[1]}\n3. ${reasons[2]}\n4. ${reasons[3]}`, 
      reasons[0]
    );

    if (reasonText === null) return; // Cancelled

    let finalReason = reasonText.trim();
    if (finalReason === '1') finalReason = reasons[0];
    else if (finalReason === '2') finalReason = reasons[1];
    else if (finalReason === '3') finalReason = reasons[2];
    else if (finalReason === '4') finalReason = reasons[3];

    setMessages(prev => prev.map(msg => {
      if (msg.id === id) {
        return {
          ...msg,
          isDeletedByAdmin: true,
          deletedReason: finalReason || '부적절한 내용으로 인한 블라인드 처리'
        };
      }
      return msg;
    }));
  };

  const handleDeleteMessage = (id: string) => {
    setMessages(prev => prev.filter(msg => msg.id !== id));
  };

  const handleAddReaction = (id: string, type: 'heart' | 'thumbsUp' | 'thumbsDown') => {
    setMessages(prev => prev.map(msg => {
      if (msg.id === id) {
        return {
          ...msg,
          reactions: {
            ...msg.reactions,
            [type]: msg.reactions[type] + 1
          }
        };
      }
      return msg;
    }));
  };

  return (
    <div style={{
      width: '100%',
      background: '#ffffff',
      border: '1.5px solid #fbcfe8',
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: '0 4px 15px rgba(219,39,119,0.04)',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Top Header */}
      <div style={{
        background: 'linear-gradient(90deg, #fce7f3 0%, #fae8ff 100%)',
        borderBottom: '1.5px solid #fbcfe8',
        padding: '12px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '8px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <MessageCircle size={18} style={{ color: '#db2777' }} />
          <strong style={{ fontSize: '15px', color: '#881337' }}>아밤 실시간 통합 수다방</strong>
          <span style={{
            fontSize: '11px',
            background: '#db2777',
            color: '#ffffff',
            padding: '1.5px 7px',
            borderRadius: '10px',
            fontWeight: 800,
            display: 'flex',
            alignItems: 'center',
            gap: '3px'
          }}>
            <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#4ade80', display: 'inline-block' }}></span>
            ON {onlineCount}명
          </span>
        </div>

        {/* User Identity Toggle Panel (Anonymous vs Account ID) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12px', flexWrap: 'wrap' }}>
          {currentUser && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', borderRight: '1px solid #cbd5e1', paddingRight: '10px', marginRight: '4px' }}>
              <button
                onClick={() => {
                  if (isAnonymous) {
                    if (currentUser.role === 'employer') {
                      const activeAds = Array.from(new Map([
                        ...topBanners,
                        ...priorityJobs,
                        ...recommendedJobs,
                        ...generalJobs,
                      ].map(job => [job.id, job])).values());
                      const activeOwnerAd = activeAds.some(ad => {
                        const isOwner = ad.companyName === currentUser.companyName;
                        const isNotExpired = ad.expiresAt ? new Date(ad.expiresAt).getTime() > Date.now() : true;
                        return isOwner && isNotExpired;
                      });

                      if (!activeOwnerAd) {
                        alert('광고가 진행 중인(종료되지 않은) 업체 회원만 업체명 닉네임으로 채팅하실 수 있습니다.\n광고글 기재 없이는 채팅을 하실 수 없으며, 익명으로만 가능합니다.');
                        return;
                      }
                    }
                    setIsAnonymous(false);
                  } else {
                    setIsAnonymous(true);
                  }
                }}
                style={{
                  padding: '3px 8px',
                  background: isAnonymous ? '#f1f5f9' : '#db2777',
                  color: isAnonymous ? '#475569' : '#ffffff',
                  border: '1px solid #cbd5e1',
                  borderRadius: '15px',
                  fontSize: '11px',
                  fontWeight: '800',
                  cursor: 'pointer',
                  transition: 'all 0.15s'
                }}
              >
                {isAnonymous ? '👤 익명 해제 (업체명/아이디 사용)' : '🔒 익명 모드로 변경'}
              </button>
            </div>
          )}

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <User size={13} style={{ color: isAnonymous ? '#65a30d' : '#2563eb' }} />
            <span style={{ fontWeight: '700', color: isAnonymous ? '#4d7c0f' : '#1d4ed8' }}>
              {isAnonymous ? '내 익명닉네임:' : '내 회원아이디:'}
            </span>

            {isAnonymous ? (
              editingNickname ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <input
                    type="text"
                    value={tempNickname}
                    onChange={(e) => setTempNickname(e.target.value)}
                    maxLength={10}
                    style={{
                      border: '1px solid #db2777',
                      borderRadius: '4px',
                      padding: '2px 6px',
                      fontSize: '12px',
                      outline: 'none',
                      width: '90px'
                    }}
                  />
                  <button 
                    onClick={handleSaveNickname}
                    style={{ padding: '2px 6px', background: '#db2777', color: 'white', border: 'none', borderRadius: '4px', fontSize: '11px', cursor: 'pointer' }}
                  >
                    저장
                  </button>
                </div>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ fontWeight: '800', color: '#1e293b' }}>{anonNickname}</span>
                  <button 
                    onClick={() => setEditingNickname(true)}
                    style={{ padding: '1px 5px', background: 'transparent', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '10.5px', color: '#64748b', cursor: 'pointer' }}
                  >
                    변경
                  </button>
                </div>
              )
            ) : (
              <span style={{ fontWeight: '800', color: '#1e293b' }}>{currentUser?.username}</span>
            )}
          </div>
        </div>
      </div>

      {/* Main Chat Layout Area */}
      <div style={{
        display: isMobile ? 'block' : 'grid',
        gridTemplateColumns: isMobile ? 'none' : '1fr 220px',
        height: chatHeight,
        boxSizing: 'border-box',
      }} className="abam-chat-grid-container">
        
        {/* Left: Chat History Stream */}
        <div 
          ref={chatContainerRef}
          style={{
            height: '100%',
            overflowY: 'auto',
            padding: '16px',
            background: '#fafaf9',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px'
          }}
        >
          {messages.map((msg) => (
            <div 
              key={msg.id}
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
                width: '100%',
                gap: '8px',
                padding: '4px 8px',
                borderRadius: '6px',
                background: msg.isMe ? '#fdf2f8' : 'transparent',
                boxSizing: 'border-box'
              }}
            >
              {/* Sender Nickname */}
              <span style={{
                fontSize: '12px',
                fontWeight: '900',
                color: msg.isMe ? '#db2777' : '#b91c1c',
                whiteSpace: 'nowrap',
                flexShrink: 0
              }}>
                {msg.nickname}
              </span>

              {/* Colon separator */}
              <span style={{ color: '#cbd5e1', fontSize: '11px', flexShrink: 0 }}>:</span>

              {/* Message Bubble Container */}
              <div style={{ display: 'flex', alignItems: 'center', flexGrow: 1, minWidth: 0, gap: '6px' }}>
                {msg.isDeletedByAdmin ? (
                  <div style={{
                    padding: '3px 8px',
                    borderRadius: '4px',
                    background: '#f1f5f9',
                    color: '#64748b',
                    fontSize: '11px',
                    fontWeight: '700',
                    border: '1px dashed #cbd5e1',
                    wordBreak: 'break-all',
                    lineHeight: '1.3',
                    fontStyle: 'italic',
                    boxSizing: 'border-box'
                  }}>
                    🚫 부적절한 내용으로 블라인드 처리됨 (사유: {msg.deletedReason})
                  </div>
                ) : (
                  <div style={{
                    padding: '4px 10px',
                    borderRadius: '12px',
                    background: msg.isMe ? '#db2777' : '#ffffff',
                    color: msg.isMe ? '#ffffff' : '#1e293b',
                    fontSize: '12px',
                    fontWeight: '500',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                    border: msg.isMe ? 'none' : '1px solid #e2e8f0',
                    wordBreak: 'break-all',
                    lineHeight: '1.3'
                  }}>
                    {msg.message}
                  </div>
                )}

                {/* Reaction Badges inline */}
                {!msg.isDeletedByAdmin && (msg.reactions.heart > 0 || msg.reactions.thumbsUp > 0 || msg.reactions.thumbsDown > 0) && (
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '3px',
                    background: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    padding: '1px 4px',
                    fontSize: '9px',
                    flexShrink: 0
                  }}>
                    {msg.reactions.heart > 0 && <span>❤️{msg.reactions.heart}</span>}
                    {msg.reactions.thumbsUp > 0 && <span>👍{msg.reactions.thumbsUp}</span>}
                    {msg.reactions.thumbsDown > 0 && <span>👎{msg.reactions.thumbsDown}</span>}
                  </div>
                )}
              </div>

              {/* Time Stamp */}
              <span style={{ fontSize: '9.5px', color: '#94a3b8', flexShrink: 0, whiteSpace: 'nowrap', marginLeft: 'auto' }}>
                {msg.time}
              </span>

              {/* Message Actions Row (inline buttons) */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flexShrink: 0 }}>
                {/* Reaction Picker Panel inline */}
                {!msg.isDeletedByAdmin && (
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '2px',
                    background: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    padding: '1px 3px',
                    opacity: 0.75
                  }} className="abam-chat-reaction-picker">
                    <button onClick={() => handleAddReaction(msg.id, 'heart')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '10px', padding: '0 1px' }}>❤️</button>
                    <button onClick={() => handleAddReaction(msg.id, 'thumbsUp')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '10px', padding: '0 1px' }}>👍</button>
                  </div>
                )}

                {/* User message delete */}
                {msg.isMe && !msg.isDeletedByAdmin && (
                  <button 
                    onClick={() => handleDeleteMessage(msg.id)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', padding: '2px' }}
                    title="삭제"
                  >
                    <Trash2 size={11} />
                  </button>
                )}

                {/* Admin Delete Action Button */}
                {isAdmin && !msg.isDeletedByAdmin && (
                  <button 
                    onClick={() => handleAdminDeleteMessage(msg.id)}
                    style={{
                      border: 'none',
                      cursor: 'pointer',
                      color: '#be185d',
                      padding: '1px 3px',
                      borderRadius: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      background: '#fce7f3'
                    }}
                    title="관리자 권한 삭제"
                  >
                    <ShieldAlert size={10} style={{ color: '#db2777' }} />
                    <span style={{ fontSize: '8.5px', fontWeight: '900', color: '#db2777' }}>삭제</span>
                  </button>
                )}

                {/* Quote reply action button */}
                {!msg.isDeletedByAdmin && (
                  <button
                    onClick={() => setReplyingTo(msg)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', padding: '2px' }}
                    title="답장"
                  >
                    <CornerUpLeft size={11} />
                  </button>
                )}
              </div>
            </div>
          ))}

        </div>

        {/* Right: Info Panel Sidebar */}
        {!isMobile && (
          <div style={{
            height: '100%',
            borderLeft: '1.5px solid #f1f5f9',
            padding: '16px',
            background: '#ffffff',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }} className="abam-chat-info-sidebar">
            <div style={{ display: 'flex', alignItems: 'center', gap: '4.5px', color: '#dc2626' }}>
              <ShieldAlert size={14} />
              <strong style={{ fontSize: '12px' }}>클린 채팅 수칙</strong>
            </div>
            <div style={{
              fontSize: '11px',
              color: '#64748b',
              lineHeight: '1.5',
              background: '#f8fafc',
              padding: '8px',
              borderRadius: '6px',
              border: '1px solid #f1f5f9',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px'
            }}>
              <div>
                📢 <strong>업주 회원 정책</strong>: 광고가 현재 진행 중인(종료되지 않은) 업체만 업체명으로 채팅하실 수 있으며, 광고글이 미등록 상태이거나 기간이 만료되어 종료된 경우는 <strong>익명으로만 채팅이 가능</strong>합니다.
              </div>
              <div>
                🚫 <strong>클린 채팅 수칙</strong>: 비방, 욕설, 도배, 불법 광고 등은 즉각적인 차단 사유가 됩니다.
              </div>
            </div>
            <div style={{ flexGrow: 1 }} />
            <div style={{
              fontSize: '10.5px',
              color: '#db2777',
              fontWeight: '700',
              textAlign: 'center',
              padding: '6px',
              border: '1px dashed #fbcfe8',
              borderRadius: '6px',
              background: '#fff5f5'
            }}>
              🌟 아밤 24시간 실시간 모니터링 작동 중
            </div>
          </div>
        )}
      </div>

      {/* Reply indicator block if replying */}
      {replyingTo && (
        <div style={{
          background: '#f1f5f9',
          borderTop: '1px solid #e2e8f0',
          padding: '6px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '11.5px',
          color: '#475569'
        }}>
          <span>
            💬 <strong>{replyingTo.nickname}</strong>님에게 답글 남기는 중...
          </span>
          <button 
            onClick={() => setReplyingTo(null)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#ef4444',
              fontWeight: '800',
              fontSize: '12px'
            }}
          >
            취소 [X]
          </button>
        </div>
      )}

      {/* Message Input Bottom Panel */}
      <form 
        onSubmit={handleSendMessage}
        style={{
          borderTop: '1.5px solid #fbcfe8',
          padding: '10px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          background: '#ffffff'
        }}
      >
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={replyingTo ? `${replyingTo.nickname}님에게 답장 입력...` : "공용 수다방에 메시지를 남겨보세요..."}
          style={{
            flexGrow: 1,
            border: '1.5px solid #e2e8f0',
            borderRadius: '30px',
            padding: '10px 18px',
            fontSize: '13px',
            outline: 'none',
            transition: 'border-color 0.2s',
            boxSizing: 'border-box'
          }}
          onFocus={(e) => e.target.style.borderColor = '#db2777'}
          onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
        />
        <button
          type="submit"
          style={{
            background: 'linear-gradient(135deg, #f472b6 0%, #db2777 100%)',
            color: '#ffffff',
            border: 'none',
            borderRadius: '50%',
            width: '38px',
            height: '38px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(219,39,119,0.3)',
            transition: 'transform 0.15s, opacity 0.15s'
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <Send size={15} style={{ marginLeft: '2px' }} />
        </button>
      </form>
    </div>
  );
}
