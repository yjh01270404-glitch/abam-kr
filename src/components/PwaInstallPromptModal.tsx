'use client';

import React, { useState, useEffect } from 'react';
import { Download, X, Sparkles, ShieldCheck } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function PwaInstallPromptModal() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // 1. 이미 앱으로 접속했는지 확인
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
      return;
    }

    // 2. 오늘 하루 보지 않기 체크
    const hideUntil = localStorage.getItem('abam_pwa_modal_hide');
    if (hideUntil && new Date().getTime() < parseInt(hideUntil, 10)) {
      return;
    }

    // 3. PWA 설치 프롬프트 이벤트 감지
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      // 초기 접속 후 1초 뒤에 럭셔리 모달창 오픈
      setTimeout(() => setIsOpen(true), 800);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);

    // 데스크톱 또는 구형 브라우저에서도 설치 모달 1회 안내
    const hasSeenModal = sessionStorage.getItem('abam_pwa_seen_session');
    if (!hasSeenModal) {
      setTimeout(() => setIsOpen(true), 1200);
    }

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
        setIsOpen(false);
      }
      setDeferredPrompt(null);
    } else {
      alert('📱 이미 앱이 설치되어 있거나 브라우저 메뉴[홈 화면에 추가]를 눌러 바로 설치하실 수 있습니다!');
      setIsOpen(false);
    }
  };

  const handleClose = () => {
    sessionStorage.setItem('abam_pwa_seen_session', 'true');
    setIsOpen(false);
  };

  const handleHideToday = () => {
    const oneDayLater = new Date().getTime() + 24 * 60 * 60 * 1000;
    localStorage.setItem('abam_pwa_modal_hide', oneDayLater.toString());
    setIsOpen(false);
  };

  if (isInstalled || !isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 99999,
      background: 'rgba(3, 7, 18, 0.75)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      fontFamily: '"Noto Sans KR", sans-serif',
    }}>
      <div style={{
        width: '100%',
        maxWidth: '420px',
        background: 'linear-gradient(145deg, #111827 0%, #030712 100%)',
        border: '2px solid #db2777',
        borderRadius: '24px',
        padding: '28px 24px 20px 24px',
        boxShadow: '0 20px 50px rgba(219,39,119,0.3)',
        color: '#ffffff',
        position: 'relative',
        animation: 'modalSlideUp 0.35s ease-out',
        textAlign: 'center',
      }}>
        {/* 닫기 버튼 */}
        <button
          onClick={handleClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'rgba(255,255,255,0.1)',
            border: 'none',
            color: '#9ca3af',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
        >
          <X size={18} />
        </button>

        {/* 뱃지 & 아이콘 */}
        <div style={{
          width: '72px',
          height: '72px',
          borderRadius: '22px',
          background: 'linear-gradient(135deg, #db2777, #be185d)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 16px auto',
          fontSize: '36px',
          boxShadow: '0 8px 24px rgba(219,39,119,0.4)',
          border: '2px solid rgba(255,255,255,0.2)',
        }}>
          📱
        </div>

        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '4px',
          background: 'rgba(219,39,119,0.15)',
          color: '#f43f5e',
          border: '1px solid rgba(219,39,119,0.3)',
          padding: '4px 12px',
          borderRadius: '20px',
          fontSize: '12px',
          fontWeight: '900',
          marginBottom: '12px'
        }}>
          <Sparkles size={13} /> 아름다운밤(아밤) 공식 모바일 앱
        </div>

        <h3 style={{
          fontSize: '22px',
          fontWeight: '900',
          color: '#ffffff',
          margin: '0 0 10px 0',
          letterSpacing: '-0.5px'
        }}>
          모바일 앱 설치하고<br /><span style={{ color: '#db2777' }}>1:1 실시간 톡 알림</span> 받기!
        </h3>

        <p style={{
          fontSize: '13.5px',
          color: '#9ca3af',
          margin: '0 0 24px 0',
          lineHeight: '1.6',
          wordBreak: 'keep-all'
        }}>
          앱을 설치하시면 홈 화면에서 1초 접속 및 구인 문의 1:1 톡 띵동 사운드 알림을 가장 빠르게 받으실 수 있습니다.
        </p>

        {/* 설치 버튼 */}
        <button
          onClick={handleInstall}
          style={{
            width: '100%',
            background: 'linear-gradient(135deg, #db2777 0%, #be185d 100%)',
            color: '#ffffff',
            border: 'none',
            borderRadius: '16px',
            padding: '16px',
            fontSize: '16px',
            fontWeight: '900',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            boxShadow: '0 8px 20px rgba(219,39,119,0.35)',
            marginBottom: '14px',
            transition: 'transform 0.15s active'
          }}
        >
          <Download size={20} /> 모바일 앱 지금 설치하기
        </button>

        {/* 푸터 보지 않기 옵션 */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '12px',
          color: '#6b7280',
          paddingTop: '8px'
        }}>
          <span onClick={handleHideToday} style={{ cursor: 'pointer', textDecoration: 'underline' }}>
            오늘 하루 보지 않기
          </span>
          <span onClick={handleClose} style={{ cursor: 'pointer' }}>
            닫기
          </span>
        </div>
      </div>
    </div>
  );
}
