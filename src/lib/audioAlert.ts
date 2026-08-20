// Web Audio API 기반 맑은 띵동(Ding-Dong) 2음계 실시간 사운드 및 PWA 알림 유틸리티

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

/**
 * 맑고 경쾌한 2음계 띵~동! 사운드를 재생합니다.
 */
export function playDingDongSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    // --- 1음 ("띵" - High Tone 880Hz, A5) ---
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(880, now);

    gain1.gain.setValueAtTime(0, now);
    gain1.gain.linearRampToValueAtTime(0.35, now + 0.02);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    osc1.connect(gain1);
    gain1.connect(ctx.destination);

    osc1.start(now);
    osc1.stop(now + 0.35);

    // --- 2음 ("동" - Soft Mid Tone 659.25Hz, E5) ---
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();

    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(659.25, now + 0.12);

    gain2.gain.setValueAtTime(0, now + 0.12);
    gain2.gain.linearRampToValueAtTime(0.45, now + 0.14);
    gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.75);

    osc2.connect(gain2);
    gain2.connect(ctx.destination);

    osc2.start(now + 0.12);
    osc2.stop(now + 0.75);
  } catch (err) {
    console.warn('Audio play error:', err);
  }
}

/**
 * PWA & 브라우저 알림 권한을 요청합니다.
 */
export async function requestNotificationPermission(): Promise<boolean> {
  if (typeof window === 'undefined' || !('Notification' in window)) return false;
  if (Notification.permission === 'granted') return true;
  if (Notification.permission !== 'denied') {
    const perm = await Notification.requestPermission();
    return perm === 'granted';
  }
  return false;
}

/**
 * 1:1 대화 수신 시 띵동 소리와 PWA/브라우저 시각 알림을 동시에 띄웁니다.
 */
export function notifyNewMessage(title: string, body: string, url: string = '/messages') {
  // 1. 띵동 사운드 즉시 재생
  playDingDongSound();

  // 2. 브라우저/PWA 시각 알림
  if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
    try {
      if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
        navigator.serviceWorker.ready.then((registration) => {
          registration.showNotification(title, {
            body,
            icon: '/icon.png',
            badge: '/icon.png',
            data: { url },
          });
        });
      } else {
        const n = new Notification(title, {
          body,
          icon: '/icon.png',
          data: { url },
        });
        n.onclick = () => {
          window.focus();
          window.location.href = url;
        };
      }
    } catch (e) {
      console.warn('Notification show error:', e);
    }
  }
}

/**
 * 관리자 PWA로 신규 회원가입 및 결제 성공 실시간 알림을 백그라운드 포함 전송합니다.
 */
export function broadcastAdminPush(title: string, body: string, url: string = '/abam-nightman-2026') {
  // 1. 띵동 사운드 재생
  playDingDongSound();

  if (typeof window === 'undefined') return;

  // 2. Service Worker 메시지 브로드캐스트 (PWA 앱이 꺼져 있거나 background 상태일 때도 팝업)
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then((reg) => {
      if (reg.active) {
        reg.active.postMessage({
          type: 'ADMIN_PUSH',
          title,
          body,
          url,
        });
      }
    }).catch(() => {});
  }

  // 3. 브라우저 직접 알림 (관리자 탭이 열려있을 때)
  notifyNewMessage(title, body, url);
}

/**
 * PWA 앱 설치자의 모바일 상단으로 푸시 알림 및 사운드를 보냅니다.
 */
export function sendPwaPushAlert(title: string, body: string, targetAudience: string, targetName?: string, url: string = '/') {
  playDingDongSound();

  if (typeof window === 'undefined') return;

  const pushPayload = {
    id: `push-${Date.now()}`,
    title,
    body,
    targetAudience,
    targetName: targetName || '',
    url,
    createdAt: new Date().toISOString()
  };

  // 1. Save to PWA push log storage
  try {
    const existing = JSON.parse(localStorage.getItem('abam_pwa_push_logs') ?? '[]');
    existing.unshift(pushPayload);
    localStorage.setItem('abam_pwa_push_logs', JSON.stringify(existing.slice(0, 500)));
  } catch {}

  // 2. Service Worker Push
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then((reg) => {
      if (reg.active) {
        reg.active.postMessage({
          type: 'PWA_TOP_PUSH',
          title,
          body,
          url,
        });
      }
    }).catch(() => {});
  }

  // 3. Native Browser / PWA Notification
  if ('Notification' in window && Notification.permission === 'granted') {
    try {
      new Notification(title, {
        body,
        icon: '/icon.png',
        badge: '/icon.png',
        data: { url },
      });
    } catch {}
  }

  // 4. Custom window event for real-time app top banner alert
  window.dispatchEvent(new CustomEvent('abam_pwa_push_event', { detail: pushPayload }));
  window.dispatchEvent(new Event('storage'));
}
