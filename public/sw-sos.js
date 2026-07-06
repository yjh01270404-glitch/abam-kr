// ⚡ 아름다운밤 SOS 긴급 알림 Service Worker
// 브라우저 백그라운드에서도 폰 알림창에 푸시 표시

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));

// 메인 앱에서 postMessage로 알림 요청 수신
self.addEventListener('message', async (event) => {
  if (!event.data || event.data.type !== 'SOS_PUSH') return;

  const { title, body, region, url } = event.data;

  await self.registration.showNotification(title || '⚡ SOS 긴급 알림', {
    body: body || '새로운 SOS 긴급공고가 등록되었습니다!',
    icon: '/icon',
    badge: '/icon',
    vibrate: [300, 100, 400, 100, 300],
    tag: `sos-${region || 'all'}-${Date.now()}`,
    requireInteraction: true,   // 사용자가 탭할 때까지 알림 유지
    data: { url: url || '/' },
    actions: [
      { action: 'open', title: '공고 확인' },
      { action: 'close', title: '닫기' },
    ],
  });
});

// 알림 클릭 시 사이트 열기
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'close') return;

  const targetUrl = event.notification.data?.url || '/';

  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      // 이미 열린 탭이 있으면 포커스
      for (const client of clientList) {
        if ('focus' in client) {
          client.focus();
          return;
        }
      }
      // 없으면 새 탭 열기
      return self.clients.openWindow(targetUrl);
    })
  );
});
