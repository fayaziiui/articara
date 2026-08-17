import type { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'app.articara.companion',
  appName: 'Articara',
  webDir: 'dist',
  backgroundColor: '#E7F2EC',
  android: {
    allowMixedContent: false,
    backgroundColor: '#E7F2EC',
  },
  ios: {
    contentInset: 'automatic',
    backgroundColor: '#E7F2EC',
    preferredContentMode: 'mobile',
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 1800,
      launchAutoHide: true,
      backgroundColor: '#E7F2EC',
      androidSplashResourceName: 'splash',
      androidScaleType: 'CENTER_CROP',
      showSpinner: false,
      splashFullScreen: true,
      splashImmersive: true,
    },
    StatusBar: {
      style: 'LIGHT',
      backgroundColor: '#E7F2EC',
    },
    Keyboard: {
      resize: 'body',
      resizeOnFullScreen: true,
    },
  },
}

export default config
