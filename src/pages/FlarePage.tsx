import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppStore, today } from '../store/useAppStore'
import { hapticSuccess } from '../native/shell'

export function FlarePage() {
  const addFlare = useAppStore((s) => s.addFlare)
  const flares = useAppStore((s) => s.flares)
  const navigate = useNavigate()
  const [severity, setSeverity] = useState(6)
  const [food, setFood] = useState('')
  const [stress, setStress] = useState(5)
  const [sleepHours, setSleepHours] = useState(6)
  const [weather, setWeather] = useState('')
  const [exercise, setExercise] = useState('')
  const [medications, setMedications] = useState('')
  const [notes, setNotes] = useState('')

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    addFlare({
      date: today(),
      severity,
      food,
      stress,
      sleepHours,
      weather,
      exercise,
      medications,
      notes,
    })
    await hapticSuccess()
    navigate('/')
  }

  return (
    <div className="stack">
      <header className="page-intro">
        <h1>Flare log</h1>
        <p>
          Capture context around a flare so you can spot possible triggers over
          time.
        </p>
      </header>

      <form className="stack" onSubmit={submit}>
        <label className="slider-field">
          <div className="slider-top">
            <span>Severity</span>
            <strong>{severity}/10</strong>
          </div>
          <input
            type="range"
            min={1}
            max={10}
            value={severity}
            onChange={(e) => setSeverity(Number(e.target.value))}
          />
        </label>

        <label className="field">
          <span>Food around the flare</span>
          <input value={food} onChange={(e) => setFood(e.target.value)} placeholder="Meals, snacks, alcohol…" />
        </label>

        <label className="slider-field">
          <div className="slider-top">
            <span>Stress level</span>
            <strong>{stress}</strong>
          </div>
          <input
            type="range"
            min={0}
            max={10}
            value={stress}
            onChange={(e) => setStress(Number(e.target.value))}
          />
        </label>

        <label className="field">
          <span>Sleep hours (night before)</span>
          <input
            type="number"
            min={0}
            max={14}
            step={0.5}
            value={sleepHours}
            onChange={(e) => setSleepHours(Number(e.target.value))}
          />
        </label>

        <label className="field">
          <span>Weather</span>
          <input
            value={weather}
            onChange={(e) => setWeather(e.target.value)}
            placeholder="Cold, rainy, humid, hot…"
          />
        </label>

        <label className="field">
          <span>Exercise</span>
          <input
            value={exercise}
            onChange={(e) => setExercise(e.target.value)}
            placeholder="Walked, skipped, yoga…"
          />
        </label>

        <label className="field">
          <span>Medications</span>
          <input
            value={medications}
            onChange={(e) => setMedications(e.target.value)}
            placeholder="On schedule / delayed / missed"
          />
        </label>

        <label className="field">
          <span>Notes</span>
          <textarea
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="What stood out?"
          />
        </label>

        <button type="submit" className="btn primary wide">
          Save flare
        </button>
      </form>

      {flares.length > 0 && (
        <section className="panel">
          <h2>Recent flares</h2>
          <ul className="simple-list">
            {flares.slice(0, 5).map((f) => (
              <li key={f.id}>
                <strong>
                  {f.date} · {f.severity}/10
                </strong>
                <span>
                  {[f.weather, f.food, f.notes].filter(Boolean).join(' · ') ||
                    'No details'}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}
