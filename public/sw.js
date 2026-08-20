// 아름다운밤 (아밤) PWA Service Worker - 백그라운드 푸시 알림 및 띵동 사운드 지원
const CACHE_NAME = 'abam-pwa-v2';

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// 백그라운드 푸시 알림 수신 (PWA 앱이 꺼져 있어도 실행됨)
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'ADMIN_PUSH') {
    const { title, body, url } = event.data;
    self.registration.showNotification(title, {
      body,
      icon: '/icon.png',
      badge: '/icon.png',
      vibrate: [200, 100, 200, 100, 300],
      tag: 'abam-admin-push',
      data: { url: url || '/abam-nightman-2026' }
    });
  }
});

self.addEventListener('push', (event) => {
  let data = { title: '🔔 아름다운밤 알림', body: '새로운 알림이 있습니다.', url: '/abam-nightman-2026' };
  try {
    if (event.data) data = event.data.json();
  } catch (e) {}

  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: '/icon.png',
      badge: '/icon.png',
      vibrate: [200, 100, 200],
      data: { url: data.url }
    })
  );
});

// 상단 알림 클릭 시 PWA 관리자 앱 열기
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const urlToOpen = event.notification.data?.url || '/abam-nightman-2026';

  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url.includes(urlToOpen) && 'focus' in client) {
          return client.focus();
        }
      }
      if (self.clients.openWindow) {
        return self.clients.openWindow(urlToOpen);
      }
    })
  );
});
