import { useState } from 'react'
import { Trash2 } from 'lucide-react'
import { useAppStore } from '../store/useAppStore'
import type { MedType } from '../types'

export function MedsPage() {
  const medications = useAppStore((s) => s.medications)
  const addMedication = useAppStore((s) => s.addMedication)
  const removeMedication = useAppStore((s) => s.removeMedication)
  const [name, setName] = useState('')
  const [type, setType] = useState<MedType>('tablet')
  const [dose, setDose] = useState('')
  const [schedule, setSchedule] = useState('')

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !schedule.trim()) return
    addMedication({
      name: name.trim(),
      type,
      dose: dose.trim() || undefined,
      schedule: schedule.trim(),
      active: true,
    })
    setName('')
    setDose('')
    setSchedule('')
  }

  return (
    <div className="stack">
      <header className="page-intro">
        <h1>Medications</h1>
        <p>
          Track tablets, injections, and refill timing. Browser notifications
          can be added when you connect Firebase later.
        </p>
      </header>

      <form className="panel stack-sm" onSubmit={submit}>
        <h2>Add reminder</h2>
        <label className="field">
          <span>Name</span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Methotrexate"
            required
          />
        </label>
        <label className="field">
          <span>Type</span>
          <select value={type} onChange={(e) => setType(e.target.value as MedType)}>
            <option value="tablet">Tablet</option>
            <option value="injection">Injection</option>
            <option value="refill">Refill</option>
          </select>
        </label>
        <label className="field">
          <span>Dose</span>
          <input
            value={dose}
            onChange={(e) => setDose(e.target.value)}
            placeholder="e.g. 15 mg"
          />
        </label>
        <label className="field">
          <span>Schedule</span>
          <input
            value={schedule}
            onChange={(e) => setSchedule(e.target.value)}
            placeholder="Weekly Sunday 9 AM"
            required
          />
        </label>
        <button type="submit" className="btn primary">
          Add medication
        </button>
      </form>

      <section className="stack-sm">
        {medications.length === 0 ? (
          <p className="muted">No medications yet.</p>
        ) : (
          medications.map((m) => (
            <article key={m.id} className="med-card">
              <div>
                <p className="badge">{m.type}</p>
                <h3>{m.name}</h3>
                <p className="muted">
                  {m.dose ? `${m.dose} · ` : ''}
                  {m.schedule}
                </p>
              </div>
              <button
                type="button"
                className="icon-btn"
                aria-label={`Remove ${m.name}`}
                onClick={() => removeMedication(m.id)}
              >
                <Trash2 size={18} />
              </button>
            </article>
          ))
        )}
      </section>
    </div>
  )
}
