// src/config/firebase.ts

import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage, Messaging } from "firebase/messaging";

export const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
};

export const FIREBASE_VAPID_KEY = import.meta.env.VITE_VAPID_KEY;

const app = initializeApp(firebaseConfig);
const messaging: Messaging = getMessaging(app);

export const requestForToken = (): Promise<string | null> => {
  return getToken(messaging, { vapidKey: FIREBASE_VAPID_KEY })
    .then((currentToken: string) => {
      if (currentToken) {
        return currentToken;
      } else {
        alert("No registration token available. Request permission to generate one.");
        return null;
      }
    })
    .catch((err: Error) => {
      alert("An error occurred while retrieving token - " + err);
      return null;
    });
};

onMessage(messaging, ({ notification }) => {
  if (notification) {
    new Notification(notification.title || "", {
      body: notification.body,
      icon: notification.icon,
    });
  }
});
