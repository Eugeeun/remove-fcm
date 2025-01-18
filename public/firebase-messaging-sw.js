// src/public/firebase-messaging-sw.js

importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js");

// 알림 클릭 이벤트 처리
self.addEventListener("notificationclick", event => {
  console.log("[firebase-messaging-sw.js] Notification click Received.");

  event.notification.close();

  // 알림 클릭 시 특정 URL로 이동
  event.waitUntil(clients.openWindow("https://your-site-url.com"));
});

// 서비스 워커 파일
self.addEventListener("install", function () {
  self.skipWaiting();
});

self.addEventListener("activate", function () {
  console.log("fcm sw activate..");
});
self.addEventListener("push", function (e) {
  if (!e.data.json()) return;
  const resultData = e.data.json().notification;
  const notificationTitle = resultData.title;
  const notificationOptions = {
    body: resultData.body,
  };
  console.log(resultData.title, {
    body: resultData.body,
  });
  e.waitUntil(self.registration.showNotification(notificationTitle, notificationOptions));
});
