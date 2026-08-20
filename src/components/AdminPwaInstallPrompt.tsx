'use client';

import React, { useState, useEffect } from 'react';
import { Crown, Download, Sparkles, ShieldCheck } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function AdminPwaInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // 1. 관리자 전용 독립 manifest (/admin-manifest.json) 동적 전환
    let manifestLink = document.querySelector('link[rel="manifest"]') as HTMLLinkElement;
    if (manifestLink) {
      manifestLink.href = '/admin-manifest.json';
    } else {
      manifestLink = document.createElement('link');
      manifestLink.rel = 'manifest';
      manifestLink.href = '/admin-manifest.json';
      document.head.appendChild(manifestLink);
    }

    // 2. 관리자 전용 독립 Service Worker (/sw-admin.js) 등록 (Scope: /abam-nightman-2026/)
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw-admin.js', { scope: '/abam-nightman-2026/' })
        .then((reg) => console.log('Admin Service Worker registered:', reg.scope))
        .catch((err) => console.warn('Admin Service Worker registration failed:', err));
    }

    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
      return;
    }

    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
    };
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      if (choiceResult.outcome === 'accepted') {
        setIsInstalled(true);
      }
      setDeferredPrompt(null);
    } else {
      alert('👑 사장님 스마트폰 브라우저 하단/상단 메뉴 [홈 화면에 추가] 또는 [앱 설치]를 누르시면 이용자용 앱과 완전히 독립된 [👑아밤 관리자 전용 앱]이 홈화면에 2번째 전용 앱으로 별도 설치됩니다!');
    }
  };

  if (isInstalled) return null;

  return (
    <div style={{
      background: 'linear-gradient(135deg, #18181b 0%, #311b92 100%)',
      border: '1px solid #fbbf24',
      borderRadius: '8px',
      padding: '6px 12px',
      margin: '0 0 10px 0',
      color: '#ffffff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '8px',
      fontFamily: '"Noto Sans KR", sans-serif'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Crown size={15} style={{ color: '#fbbf24', flexShrink: 0 }} />
        <span style={{ fontSize: '11px', fontWeight: '800', color: '#ffffff' }}>
          👑 아름다운밤 사장님 전용 관리자 앱 (홈 화면 추가)
        </span>
      </div>

      <button
        onClick={handleInstall}
        style={{
          background: '#fbbf24',
          color: '#000000',
          border: 'none',
          borderRadius: '4px',
          padding: '3px 8px',
          fontSize: '10.5px',
          fontWeight: '900',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          whiteSpace: 'nowrap'
        }}
      >
        <Download size={12} /> 앱 설치
      </button>
    </div>
  );
}
