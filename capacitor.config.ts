import { CapacitorConfig } from '@capacitor/cli';
import { KeyboardResize, KeyboardStyle } from '@capacitor/keyboard';

const config: CapacitorConfig = {
  appId: process.env.NODE_ENV === 'production' ? 'com.nashstash.app' : 'com.nashstash.dev',
  appName: 'Nash Stash',
  webDir: 'build',
  server: {
    url: process.env.NODE_ENV === 'production' 
      ? 'https://nashstash.app' 
      : 'https://192.168.0.171:3000',
    cleartext: process.env.NODE_ENV !== 'production'
  },
  plugins: {
    Keyboard: {
      resize: KeyboardResize.Body,
      style: KeyboardStyle.Dark,
      resizeOnFullScreen: true,
    },
    Camera: {
      presentationStyle: 'fullscreen'
    },
    PushNotifications: {
      presentationOptions: ['badge', 'sound', 'alert']
    }
  },
  ios: {
    contentInset: 'automatic',
    limitsNavigationsToAppBoundDomains: true,
    scheme: 'NashStash'
  },
  android: {
    allowMixedContent: false,
    captureInput: true,
    webContentsDebuggingEnabled: process.env.NODE_ENV !== 'production'
  }
};

export default config;

