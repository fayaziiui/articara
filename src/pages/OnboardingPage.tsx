import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MEAL_PLANS } from '../data/meals'
import type { MealPlanId } from '../types'
import { useAppStore } from '../store/useAppStore'
import { DisclaimerBanner } from '../components/Disclaimer'

export function OnboardingPage() {
  const setProfile = useAppStore((s) => s.setProfile)
  const seedDemo = useAppStore((s) => s.seedDemo)
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [year, setYear] = useState('')
  const [meal, setMeal] = useState<MealPlanId>('mediterranean')
  const years = useMemo(() => {
    const y = new Date().getFullYear()
    return Array.from({ length: 40 }, (_, i) => y - i)
  }, [])

  const finish = (withDemo: boolean) => {
    setProfile({
      name: name.trim() || 'Friend',
      diagnosedYear: year ? Number(year) : undefined,
      mealPreference: meal,
      onboardingDone: true,
      plan: 'free',
    })
    if (withDemo) seedDemo()
    navigate('/')
  }

  return (
    <div className="onboarding">
      <div className="onboarding-hero">
        <p className="eyebrow">Welcome</p>
        <h1 className="display">Articara</h1>
        <p className="lede">
          A calm companion for psoriatic arthritis — track symptoms, spot
          patterns, and walk into appointments prepared.
        </p>
      </div>

      <label className="field">
        <span>What should we call you?</span>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your first name"
          autoComplete="given-name"
        />
      </label>

      <label className="field">
        <span>Diagnosis year (optional)</span>
        <select value={year} onChange={(e) => setYear(e.target.value)}>
          <option value="">Prefer not to say</option>
          {years.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      </label>

      <fieldset className="field">
        <legend>Meal plan preference</legend>
        <div className="choice-grid">
          {MEAL_PLANS.map((p) => (
            <button
              key={p.id}
              type="button"
              className={meal === p.id ? 'choice on' : 'choice'}
              onClick={() => setMeal(p.id)}
            >
              <strong>{p.title}</strong>
              <span>{p.description}</span>
            </button>
          ))}
        </div>
      </fieldset>

      <DisclaimerBanner />

      <div className="btn-row">
        <button type="button" className="btn primary" onClick={() => finish(false)}>
          Start fresh
        </button>
        <button type="button" className="btn ghost" onClick={() => finish(true)}>
          Explore with sample data
        </button>
      </div>
    </div>
  )
}
