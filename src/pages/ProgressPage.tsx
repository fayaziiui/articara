import { useMemo } from 'react'
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { format, parseISO } from 'date-fns'
import { useAppStore } from '../store/useAppStore'

export function ProgressPage() {
  const dailyLogs = useAppStore((s) => s.dailyLogs)
  const flares = useAppStore((s) => s.flares)

  const chartData = useMemo(() => {
    return [...dailyLogs]
      .sort((a, b) => a.date.localeCompare(b.date))
      .slice(-21)
      .map((l) => ({
        day: format(parseISO(l.date), 'MMM d'),
        pain: l.pain,
        fatigue: l.fatigue,
        sleep: l.sleep,
        stress: l.stress,
      }))
  }, [dailyLogs])

  const flareCount = flares.length
  const exerciseProxy = useMemo(() => {
    return [...dailyLogs]
      .sort((a, b) => a.date.localeCompare(b.date))
      .slice(-21)
      .map((l) => ({
        day: format(parseISO(l.date), 'MMM d'),
        exercise: Math.max(1, 10 - l.stiffness),
      }))
  }, [dailyLogs])

  return (
    <div className="stack">
      <header className="page-intro">
        <h1>Progress</h1>
        <p>Charts for pain, fatigue, sleep, and recent flare frequency.</p>
      </header>

      <section className="stat-row">
        <div className="stat">
          <span>Logs</span>
          <strong>{dailyLogs.length}</strong>
        </div>
        <div className="stat">
          <span>Flares</span>
          <strong>{flareCount}</strong>
        </div>
        <div className="stat">
          <span>Window</span>
          <strong>21d</strong>
        </div>
      </section>

      {chartData.length === 0 ? (
        <p className="muted">Log a few days to unlock charts.</p>
      ) : (
        <>
          <section className="panel chart-panel">
            <h2>Pain & fatigue</h2>
            <div className="chart-wrap">
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={chartData}>
                  <CartesianGrid stroke="rgba(15,107,92,0.12)" strokeDasharray="4 4" />
                  <XAxis dataKey="day" tick={{ fontSize: 11 }} />
                  <YAxis domain={[0, 10]} tick={{ fontSize: 11 }} width={28} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="pain" stroke="#0F6B5C" strokeWidth={2.4} dot={false} />
                  <Line type="monotone" dataKey="fatigue" stroke="#C45C26" strokeWidth={2.4} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </section>

          <section className="panel chart-panel">
            <h2>Sleep & stress</h2>
            <div className="chart-wrap">
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={chartData}>
                  <CartesianGrid stroke="rgba(15,107,92,0.12)" strokeDasharray="4 4" />
                  <XAxis dataKey="day" tick={{ fontSize: 11 }} />
                  <YAxis domain={[0, 10]} tick={{ fontSize: 11 }} width={28} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="sleep" stroke="#2F6FED" strokeWidth={2.4} dot={false} />
                  <Line type="monotone" dataKey="stress" stroke="#7A5C2E" strokeWidth={2.4} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </section>

          <section className="panel chart-panel">
            <h2>Movement readiness</h2>
            <p className="muted small">
              Soft estimate from stiffness trends — pair with your exercise log.
            </p>
            <div className="chart-wrap">
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={exerciseProxy}>
                  <CartesianGrid stroke="rgba(15,107,92,0.12)" strokeDasharray="4 4" />
                  <XAxis dataKey="day" tick={{ fontSize: 11 }} />
                  <YAxis domain={[0, 10]} tick={{ fontSize: 11 }} width={28} />
                  <Tooltip />
                  <Line type="monotone" dataKey="exercise" stroke="#3D8B6E" strokeWidth={2.4} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </section>
        </>
      )}
    </div>
  )
}
