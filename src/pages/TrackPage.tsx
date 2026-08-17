import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BodyMap } from '../components/BodyMap'
import { SYMPTOM_FIELDS } from '../data/joints'
import { hapticSuccess } from '../native/shell'
import { useAppStore, today } from '../store/useAppStore'
import type { DailyLog } from '../types'

const blank = (): Omit<DailyLog, 'id' | 'createdAt'> => ({
  date: today(),
  pain: 3,
  fatigue: 3,
  stiffness: 3,
  swelling: 2,
  skinFlare: 2,
  mood: 6,
  sleep: 6,
  stress: 4,
  water: 6,
  weight: undefined,
  joints: [],
  notes: '',
})

export function TrackPage() {
  const getLogForDate = useAppStore((s) => s.getLogForDate)
  const saveDailyLog = useAppStore((s) => s.saveDailyLog)
  const navigate = useNavigate()
  const [form, setForm] = useState(blank)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const existing = getLogForDate(today())
    if (existing) {
      setForm({
        date: existing.date,
        pain: existing.pain,
        fatigue: existing.fatigue,
        stiffness: existing.stiffness,
        swelling: existing.swelling,
        skinFlare: existing.skinFlare,
        mood: existing.mood,
        sleep: existing.sleep,
        stress: existing.stress,
        water: existing.water,
        weight: existing.weight,
        joints: existing.joints,
        notes: existing.notes,
      })
    }
  }, [getLogForDate])

  const setNum = (key: keyof typeof form, value: number) =>
    setForm((f) => ({ ...f, [key]: value }))

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    saveDailyLog(form)
    await hapticSuccess()
    setSaved(true)
    setTimeout(() => navigate('/'), 700)
  }

  return (
    <form className="stack" onSubmit={submit}>
      <header className="page-intro">
        <h1>Daily check-in</h1>
        <p>Slide to rate how today feels. Takes about a minute.</p>
      </header>

      {SYMPTOM_FIELDS.map((field) => (
        <label key={field.key} className="slider-field">
          <div className="slider-top">
            <span>{field.label}</span>
            <strong>{form[field.key] as number}</strong>
          </div>
          <input
            type="range"
            min={field.min}
            max={field.max}
            value={form[field.key] as number}
            onChange={(e) => setNum(field.key, Number(e.target.value))}
          />
          <span className="hint">{field.tip}</span>
        </label>
      ))}

      <label className="field">
        <span>Weight (optional, kg)</span>
        <input
          type="number"
          inputMode="decimal"
          step="0.1"
          value={form.weight ?? ''}
          onChange={(e) =>
            setForm((f) => ({
              ...f,
              weight: e.target.value ? Number(e.target.value) : undefined,
            }))
          }
          placeholder="e.g. 70"
        />
      </label>

      <section className="panel">
        <h2>Body map</h2>
        <BodyMap
          selected={form.joints}
          onChange={(joints) => setForm((f) => ({ ...f, joints }))}
        />
      </section>

      <label className="field">
        <span>Notes</span>
        <textarea
          rows={3}
          value={form.notes ?? ''}
          onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
          placeholder="Anything else worth remembering?"
        />
      </label>

      <button type="submit" className="btn primary wide">
        {saved ? 'Saved' : 'Save today’s log'}
      </button>
    </form>
  )
}
