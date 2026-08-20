'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Smartphone, Download, Check, X } from 'lucide-react';
import { requestNotificationPermission } from '../lib/audioAlert';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function PwaInstallPrompt({ isAdmin = false }: { isAdmin?: boolean }) {
  const pathname = usePathname();
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);

  // 관리자페이지에서는 일반 서비스용 앱 설치 핑크 배너 100% 전면 숨김
  if (pathname?.startsWith('/abam-nightman-2026')) {
    return null;
  }

  useEffect(() => {
    // 1. Service Worker Register
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch((err) => {
        console.warn('Service Worker registration failed:', err);
      });
    }

    // 2. Check if already running in standalone mode
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    // 3. Capture beforeinstallprompt event
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);

    // 4. Request notification permission on first interaction
    requestNotificationPermission().catch(() => {});

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      if (choiceResult.outcome === 'accepted') {
        setIsInstalled(true);
        setShowPrompt(false);
      }
      setDeferredPrompt(null);
    } else {
      alert('📱 이미 앱이 설치되어 있거나 브라우저 메뉴[홈 화면에 추가]를 이용해 다운로드하실 수 있습니다.');
    }
  };

  if (isInstalled) return null;

  return (
    <div style={{
      background: isAdmin ? 'linear-gradient(135deg, #1e1b4b, #311042)' : 'linear-gradient(135deg, #be185d, #9d174d)',
      color: '#ffffff',
      padding: '10px 16px',
      borderRadius: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      margin: '12px 0',
      boxShadow: '0 4px 14px rgba(190,24,93,0.25)',
      fontFamily: '"Noto Sans KR", sans-serif',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '18px'
        }}>
          📱
        </div>
        <div>
          <div style={{ fontSize: '13.5px', fontWeight: '900', letterSpacing: '-0.3px' }}>
            {isAdmin ? '👑 아름다운밤 관리자 PWA 전용 앱 다운로드' : '📲 아름다운밤 (아밤) 공식 앱 다운로드'}
          </div>
          <div style={{ fontSize: '11px', opacity: 0.9, marginTop: '1px' }}>
            홈 화면에 앱을 추가하면 실시간 1:1 대화 띵동 알림을 바로 받을 수 있습니다.
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <button
          onClick={handleInstallClick}
          style={{
            background: '#ffffff',
            color: isAdmin ? '#311042' : '#be185d',
            border: 'none',
            borderRadius: '8px',
            padding: '6px 12px',
            fontSize: '12px',
            fontWeight: '900',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.15)'
          }}
        >
          <Download size={14} /> 앱 설치
        </button>
        {showPrompt && (
          <button
            onClick={() => setShowPrompt(false)}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'rgba(255,255,255,0.7)',
              cursor: 'pointer',
              padding: '4px'
            }}
          >
            <X size={16} />
          </button>
        )}
      </div>
    </div>
  );
}
