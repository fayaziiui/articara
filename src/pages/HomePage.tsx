import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Check, FileDown, Flame } from 'lucide-react'
import { DisclaimerBanner } from '../components/Disclaimer'
import { defaultWellness, useAppStore, today } from '../store/useAppStore'
import { buildInsights } from '../utils/insights'
import { exportDoctorReport } from '../utils/pdfReport'

const checklistKeys = [
  { key: 'medication' as const, label: 'Medication taken' },
  { key: 'hydration' as const, label: 'Hydration' },
  { key: 'exercise' as const, label: 'Gentle movement' },
  { key: 'vegetables' as const, label: 'Vegetables / plants' },
  { key: 'sleep' as const, label: 'Sleep priority' },
]

export function HomePage() {
  const profile = useAppStore((s) => s.profile)
  const dailyLogs = useAppStore((s) => s.dailyLogs)
  const flares = useAppStore((s) => s.flares)
  const medications = useAppStore((s) => s.medications)
  const toggleWellness = useAppStore((s) => s.toggleWellness)
  const wellnessEntries = useAppStore((s) => s.wellness)
  const wellness = useMemo(() => {
    const date = today()
    return wellnessEntries.find((w) => w.date === date) ?? defaultWellness(date)
  }, [wellnessEntries])
  const todayLog = dailyLogs.find((l) => l.date === today())
  const insights = buildInsights(dailyLogs, flares, profile.name)
  const doneCount = checklistKeys.filter((c) => wellness[c.key]).length

  return (
    <div className="stack">
      <section className="hero-card">
        <p className="eyebrow">Today</p>
        <h1 className="display-sm">
          {profile.name ? `Hi, ${profile.name}` : 'Hi there'}
        </h1>
        <p className="lede">
          {todayLog
            ? 'Today’s check-in is saved. Review trends or log a flare if things shifted.'
            : 'A quick check-in helps Articara personalize suggestions for your day.'}
        </p>
        <div className="btn-row">
          <Link className="btn primary" to="/track">
            {todayLog ? 'Update check-in' : 'Log symptoms'}
          </Link>
          <Link className="btn ghost" to="/flare">
            <Flame size={16} /> Log flare
          </Link>
        </div>
      </section>

      <section className="panel">
        <div className="panel-head">
          <h2>Daily suggestions</h2>
          <span className="badge">AI-style insights</span>
        </div>
        <div className="insight-list">
          {insights.map((i) => (
            <article key={i.id} className={`insight ${i.tone}`}>
              <h3>{i.title}</h3>
              <p>{i.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="panel">
        <div className="panel-head">
          <h2>Wellness checklist</h2>
          <span className="muted">
            {doneCount}/{checklistKeys.length}
          </span>
        </div>
        <ul className="checklist">
          {checklistKeys.map((c) => (
            <li key={c.key}>
              <button
                type="button"
                className={wellness[c.key] ? 'check on' : 'check'}
                onClick={() => toggleWellness(c.key)}
              >
                <span className="check-icon">
                  {wellness[c.key] ? <Check size={14} /> : null}
                </span>
                {c.label}
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section className="panel">
        <div className="panel-head">
          <h2>Doctor-ready report</h2>
        </div>
        <p className="muted">
          Export a PDF summary of symptoms, flares, and medications for your
          next rheumatology visit.
        </p>
        <button
          type="button"
          className="btn secondary"
          onClick={() =>
            exportDoctorReport({ profile, logs: dailyLogs, flares, medications })
          }
        >
          <FileDown size={16} /> Download PDF
        </button>
      </section>

      <DisclaimerBanner compact />
    </div>
  )
}
