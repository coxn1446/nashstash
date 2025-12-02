import { initializeApp } from 'firebase/app';
import { getMessaging } from 'firebase/messaging';
// import { getToken, onMessage } from 'firebase/messaging'; // Commented out until push notifications are implemented

// Placeholder Firebase configuration
// Will be configured when Firebase is set up
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || 'placeholder',
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || 'placeholder',
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || 'placeholder',
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || 'placeholder',
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || 'placeholder',
  appId: process.env.REACT_APP_FIREBASE_APP_ID || 'placeholder',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Cloud Messaging and get a token
let messaging = null;

// Check if browser supports required APIs for Firebase Messaging
function isMessagingSupported() {
  return (
    typeof window !== 'undefined' &&
    'serviceWorker' in navigator &&
    'indexedDB' in window &&
    'Notification' in window &&
    'PushManager' in window
  );
}

// Initialize messaging only if browser supports it
if (isMessagingSupported()) {
  try {
    messaging = getMessaging(app);
  } catch (error) {
    // Silently handle unsupported browser errors
    if (error.code === 'messaging/unsupported-browser') {
      console.warn('⚠️ [Firebase] Messaging not supported in this browser');
    } else {
      console.warn('⚠️ [Firebase] Messaging initialization failed:', error.message);
    }
    messaging = null;
  }
} else {
  console.warn('⚠️ [Firebase] Messaging not available: Required browser APIs not supported');
}

export { app, messaging };
export default app;

