'use client';

import React, { useState } from 'react';

export default function LiveEmployerSocketChat() {
  const [messages, setMessages] = useState([
    { sender: '업주 (강남 VIP 룸)', text: '안녕하세요! 금일 시급 5만원 당일정산 구인 진행 중입니다.', time: '14:50' },
    { sender: '아밤 실시간 알림', text: '🟢 WebSocket P2P 소켓 암호화 채널이 연결되었습니다.', time: '14:51' }
  ]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { sender: '구직자 (나)', text: input, time: '방금' }]);
    setInput('');
  };

  return (
    <div style={{
      background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)',
      border: '1.5px solid rgba(233,30,99,0.35)',
      borderRadius: '16px',
      padding: '20px',
      color: '#ffffff',
      margin: '18px 0',
      boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
      fontFamily: '"Noto Sans KR", sans-serif'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px' }}>
        <div>
          <h3 style={{ fontSize: '16px', fontWeight: 900, color: '#f43f5e', margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
            💬 매장-구직자 1:1 실시간 P2P 소켓 톡
          </h3>
          <p style={{ fontSize: '11.5px', color: '#94a3b8', margin: '3px 0 0' }}>전화번호 노출 없이 안전한 1:1 라이브 메신저 소통</p>
        </div>
        <span style={{ fontSize: '11px', background: 'rgba(34,197,94,0.2)', color: '#4ade80', padding: '3px 10px', borderRadius: '12px', fontWeight: 900, border: '1px solid rgba(34,197,94,0.4)' }}>
          🟢 Socket Connected
        </span>
      </div>

      <div style={{ background: 'rgba(0,0,0,0.4)', borderRadius: '12px', padding: '12px', height: '140px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px', border: '1px solid rgba(255,255,255,0.08)' }}>
        {messages.map((m, i) => (
          <div key={i} style={{ fontSize: '12px' }}>
            <span style={{ fontWeight: 800, color: m.sender.includes('업주') ? '#f43f5e' : m.sender.includes('알림') ? '#38bdf8' : '#4ade80' }}>{m.sender}: </span>
            <span style={{ color: '#e2e8f0' }}>{m.text}</span>
            <span style={{ fontSize: '10px', color: '#64748b', marginLeft: '8px' }}>{m.time}</span>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="업주에게 보낼 1:1 실시간 메시지를 입력하세요..."
          style={{
            flex: 1,
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: '8px',
            padding: '8px 12px',
            color: '#fff',
            fontSize: '12px',
            outline: 'none'
          }}
        />
        <button
          onClick={sendMessage}
          style={{
            background: '#be185d',
            border: 'none',
            color: '#fff',
            padding: '8px 16px',
            borderRadius: '8px',
            fontWeight: 900,
            fontSize: '12px',
            cursor: 'pointer'
          }}
        >
          전송
        </button>
      </div>
    </div>
  );
}
