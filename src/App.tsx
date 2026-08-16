import { Navigate, Route, Routes } from 'react-router-dom'
import { AppShell } from './components/AppShell'
import { useAppStore } from './store/useAppStore'
import { OnboardingPage } from './pages/OnboardingPage'
import { HomePage } from './pages/HomePage'
import { TrackPage } from './pages/TrackPage'
import { FlarePage } from './pages/FlarePage'
import { MedsPage } from './pages/MedsPage'
import { ProgressPage } from './pages/ProgressPage'
import { LifestylePage } from './pages/LifestylePage'
import { LearnPage } from './pages/LearnPage'
import { SettingsPage } from './pages/SettingsPage'

function RequireOnboarded({ children }: { children: React.ReactNode }) {
  const done = useAppStore((s) => s.profile.onboardingDone)
  if (!done) return <Navigate to="/onboarding" replace />
  return children
}

export default function App() {
  return (
    <Routes>
      <Route path="/onboarding" element={<OnboardingPage />} />
      <Route
        element={
          <RequireOnboarded>
            <AppShell />
          </RequireOnboarded>
        }
      >
        <Route path="/" element={<HomePage />} />
        <Route path="/track" element={<TrackPage />} />
        <Route path="/flare" element={<FlarePage />} />
        <Route path="/meds" element={<MedsPage />} />
        <Route path="/progress" element={<ProgressPage />} />
        <Route path="/lifestyle" element={<LifestylePage />} />
        <Route path="/learn" element={<LearnPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
