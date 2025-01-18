// src/public/firebase-messaging-sw.js

importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js");

fetch("/firebase-config.json")
  .then(response => {
    return response.json();
  })
  .then(jsContent => {
    const config = eval(jsContent);
    firebase.initializeApp(config.firebaseConfig);
    const messaging = firebase.messaging();

    // 백그라운드 메시지 처리
    messaging.onBackgroundMessage(payload => {
      console.log("[firebase-messaging-sw.js] Received background message ", payload);

      // 알림 표시
      const notificationTitle = `background: ${payload.notification.title}`;
      const notificationOptions = {
        body: payload.notification.body,
        icon: "/path/to/icon.png", // 알림에 표시할 아이콘 경로
        // 추가 옵션을 여기에 설정할 수 있습니다.
      };

      self.registration.showNotification(notificationTitle, notificationOptions);
    });
  })
  .catch(error => {
    console.error("Error initializing Firebase in service worker:", error);
  });

// 알림 클릭 이벤트 처리
self.addEventListener("notificationclick", event => {
  console.log("[firebase-messaging-sw.js] Notification click Received.");

  event.notification.close();

  // 알림 클릭 시 특정 URL로 이동
  event.waitUntil(clients.openWindow("https://your-site-url.com"));
});
