/**
 * Service Worker for receiving PUSH notifications
 */
self.addEventListener('install', () => {
    console.log('[sw]', 'Your ServiceWorker is installed');
});

self.addEventListener('push', ev => {
    const { title, msg, icon } = ev.data.json();
    self.registration.showNotification(title, {
        body: msg,
        icon: icon,
    });
});

self.addEventListener('notificationclick', event => {
    event.notification.close();
    event.waitUntil(
      clients.openWindow(event.notification.data.url + "?notification_id=" + event.notification.data.id)
    );
})