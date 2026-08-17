import { useEffect, useState } from 'react'
import { useAppStore } from '../store/useAppStore'
import { getNativeAppInfo, isNative } from '../native/shell'

export function SettingsPage() {
  const profile = useAppStore((s) => s.profile)
  const setProfile = useAppStore((s) => s.setProfile)
  const seedDemo = useAppStore((s) => s.seedDemo)
  const [appInfo, setAppInfo] = useState({
    platform: isNative() ? 'Native app' : 'Web PWA',
    version: import.meta.env.VITE_APP_VERSION || '0.1.0',
    build: 'web',
  })

  useEffect(() => {
    void getNativeAppInfo().then(setAppInfo)
  }, [])

  return (
    <div className="stack">
      <header className="page-intro">
        <h1>Settings & pricing</h1>
        <p>Manage your profile and Articara plan.</p>
      </header>

      <section className="panel">
        <h2>This device</h2>
        <p className="badge">{appInfo.platform}</p>
        <p className="muted small">
          Version {appInfo.version}
          {appInfo.build !== 'web' ? ` · build ${appInfo.build}` : ''}
        </p>
        <p className="muted small">
          {isNative()
            ? 'You are using the native iOS or Android shell. Data stays on this device until cloud sync is added.'
            : 'You are using the web app. Install Articara from the App Store, Google Play, or “Add to Home Screen”.'}
        </p>
      </section>

      <section className="panel">
        <h2>Profile</h2>
        <label className="field">
          <span>Name</span>
          <input
            value={profile.name}
            onChange={(e) => setProfile({ name: e.target.value })}
          />
        </label>
        <button type="button" className="btn ghost" onClick={() => seedDemo()}>
          Load sample data
        </button>
        <button
          type="button"
          className="btn ghost"
          onClick={() => setProfile({ onboardingDone: false })}
        >
          Replay onboarding
        </button>
      </section>

      <section className="pricing">
        <article className={`price-card ${profile.plan === 'free' ? 'current' : ''}`}>
          <p className="badge">Free</p>
          <h2>$0</h2>
          <ul>
            <li>Daily symptom & body map</li>
            <li>Flare logging</li>
            <li>Medication list</li>
            <li>7-day charts</li>
            <li>Basic wellness checklist</li>
            <li>Core education</li>
          </ul>
          <button
            type="button"
            className="btn secondary"
            onClick={() => setProfile({ plan: 'free' })}
          >
            {profile.plan === 'free' ? 'Current plan' : 'Switch to Free'}
          </button>
        </article>

        <article className={`price-card plus ${profile.plan === 'plus' ? 'current' : ''}`}>
          <p className="badge">Plus</p>
          <h2>
            $4.99<span>/mo</span>
          </h2>
          <p className="muted">or $39.99/year · 7-day trial</p>
          <ul>
            <li>Everything in Free</li>
            <li>AI insights & trigger hints</li>
            <li>Full history & advanced charts</li>
            <li>Doctor PDF reports</li>
            <li>Full meal plans & exercise library</li>
            <li>Priority roadmap: weather, labs, wearables</li>
          </ul>
          <button
            type="button"
            className="btn primary"
            onClick={() => setProfile({ plan: 'plus' })}
          >
            {profile.plan === 'plus' ? 'Plus enabled (demo)' : 'Start Plus (demo)'}
          </button>
        </article>
      </section>

      <p className="muted small">
        Payments are not connected yet — plan toggle is for product preview. Target
        launch pricing mirrors arthritis app competitors (~$4–5/mo).
      </p>
    </div>
  )
}
