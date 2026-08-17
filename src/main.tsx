import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import { Capacitor } from '@capacitor/core'
import { initNativeShell } from './native/shell'
import './index.css'
import App from './App.tsx'

async function bootstrap() {
  if (Capacitor.isNativePlatform()) {
    await initNativeShell()
  } else if ('serviceWorker' in navigator) {
    const { registerSW } = await import('virtual:pwa-register')
    registerSW({ immediate: true })
  }

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <HashRouter>
        <App />
      </HashRouter>
    </StrictMode>,
  )
}

void bootstrap()
