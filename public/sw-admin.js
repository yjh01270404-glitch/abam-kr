// 아름다운밤 관리자 전용 독립 PWA Service Worker (Scope: /abam-nightman-2026/)
const ADMIN_CACHE_NAME = 'abam-admin-sw-v1';

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// 관리자 전용 백그라운드 푸시 알림 수신
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
  let data = { title: '👑 아밤 관리자 알림', body: '새로운 가입자 또는 결제가 발생했습니다.', url: '/abam-nightman-2026' };
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
