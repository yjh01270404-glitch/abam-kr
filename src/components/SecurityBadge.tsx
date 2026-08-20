'use client';

import { ShieldCheck, Lock, EyeOff, CheckCircle } from 'lucide-react';

export default function SecurityBadge() {
  return (
    <div style={{
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: '12px',
      padding: '10px 16px',
      color: '#f8fafc',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '12px',
      marginTop: '10px',
      marginBottom: '10px',
      fontSize: '12px'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <ShieldCheck size={18} color="#10b981" />
        <span style={{ fontWeight: '800', color: '#ffffff' }}>
          🔒 256-Bit SSL 암호화 & 익명 보안 시스템 가동 중
        </span>
        <span style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#34d399', fontSize: '10px', padding: '1px 6px', borderRadius: '6px', fontWeight: '800' }}>
          보안 1등급
        </span>
      </div>

      <div style={{ display: 'flex', gap: '10px', flexShrink: 0 }} className="security-badges-desktop">
        <span style={{ color: '#94a3b8', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '3px' }}>
          <Lock size={12} color="#38bdf8" /> IP 차단
        </span>
        <span style={{ color: '#94a3b8', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '3px' }}>
          <EyeOff size={12} color="#38bdf8" /> 익명성 보장
        </span>
        <span style={{ color: '#94a3b8', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '3px' }}>
          <CheckCircle size={12} color="#38bdf8" /> 실시간 방어
        </span>
      </div>
    </div>
  );
}
