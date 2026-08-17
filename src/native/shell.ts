import { App } from '@capacitor/app'
import { Capacitor } from '@capacitor/core'
import { Haptics, ImpactStyle, NotificationType } from '@capacitor/haptics'
import { Keyboard, KeyboardResize } from '@capacitor/keyboard'
import { SplashScreen } from '@capacitor/splash-screen'
import { StatusBar, Style } from '@capacitor/status-bar'

export const isNative = () => Capacitor.isNativePlatform()

export const nativePlatform = () => Capacitor.getPlatform()

export function platformLabel() {
  switch (Capacitor.getPlatform()) {
    case 'ios':
      return 'iOS app'
    case 'android':
      return 'Android app'
    default:
      return 'Web PWA'
  }
}

export async function initNativeShell() {
  if (!Capacitor.isNativePlatform()) return

  document.documentElement.classList.add('is-native', `is-${Capacitor.getPlatform()}`)

  try {
    if (Capacitor.getPlatform() === 'ios') {
      await StatusBar.setOverlaysWebView({ overlay: true })
    } else {
      await StatusBar.setOverlaysWebView({ overlay: false })
      await StatusBar.setBackgroundColor({ color: '#E7F2EC' })
    }
    await StatusBar.setStyle({ style: Style.Light })
  } catch {
    // StatusBar is unavailable in some simulators / web previews.
  }

  try {
    await Keyboard.setResizeMode({ mode: KeyboardResize.Body })
  } catch {
    // Keyboard plugin is optional on web.
  }

  try {
    await SplashScreen.hide({ fadeOutDuration: 280 })
  } catch {
    // Splash may already be hidden.
  }

  App.addListener('backButton', ({ canGoBack }) => {
    if (canGoBack || window.history.length > 1) {
      window.history.back()
      return
    }
    void App.exitApp()
  })
}

export async function hapticLight() {
  if (!Capacitor.isNativePlatform()) return
  try {
    await Haptics.impact({ style: ImpactStyle.Light })
  } catch {
    // Ignore devices without a haptic engine.
  }
}

export async function hapticSuccess() {
  if (!Capacitor.isNativePlatform()) return
  try {
    await Haptics.notification({ type: NotificationType.Success })
  } catch {
    await hapticLight()
  }
}

export async function getNativeAppInfo() {
  if (!Capacitor.isNativePlatform()) {
    return {
      platform: platformLabel(),
      version: import.meta.env.VITE_APP_VERSION || '0.1.0',
      build: 'web',
    }
  }

  try {
    const info = await App.getInfo()
    return {
      platform: platformLabel(),
      version: info.version,
      build: info.build,
    }
  } catch {
    return {
      platform: platformLabel(),
      version: import.meta.env.VITE_APP_VERSION || '0.1.0',
      build: 'native',
    }
  }
}
