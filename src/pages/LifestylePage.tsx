import { ExternalLink } from 'lucide-react'
import { EXERCISES } from '../data/exercises'
import { MEAL_PLANS } from '../data/meals'
import { useAppStore } from '../store/useAppStore'
import type { MealPlanId } from '../types'

export function LifestylePage() {
  const mealPreference = useAppStore((s) => s.profile.mealPreference)
  const setProfile = useAppStore((s) => s.setProfile)
  const plan = MEAL_PLANS.find((p) => p.id === mealPreference) ?? MEAL_PLANS[0]

  return (
    <div className="stack">
      <header className="page-intro">
        <h1>Lifestyle</h1>
        <p>Anti-inflammatory meals and gentle movement you can actually keep up with.</p>
      </header>

      <section className="panel">
        <div className="panel-head">
          <h2>Meal plans</h2>
        </div>
        <div className="pill-row">
          {MEAL_PLANS.map((p) => (
            <button
              key={p.id}
              type="button"
              className={mealPreference === p.id ? 'pill on' : 'pill'}
              onClick={() => setProfile({ mealPreference: p.id as MealPlanId })}
            >
              {p.title}
            </button>
          ))}
        </div>
        <article className="meal-card">
          <h3>{plan.title}</h3>
          <p className="muted">{plan.description}</p>
          <ul className="simple-list">
            {plan.meals.map((m) => (
              <li key={m.name}>
                <strong>{m.name}</strong>
                <span>{m.detail}</span>
              </li>
            ))}
          </ul>
        </article>
      </section>

      <section className="panel">
        <div className="panel-head">
          <h2>Exercise library</h2>
        </div>
        <div className="exercise-grid">
          {EXERCISES.map((ex) => (
            <article key={ex.id} className="exercise-card">
              <p className="badge">{ex.category}</p>
              <h3>{ex.title}</h3>
              <p className="muted">
                {ex.duration} · {ex.level} · {ex.source}
              </p>
              <a
                className="btn ghost compact"
                href={ex.youtubeUrl}
                target="_blank"
                rel="noreferrer"
              >
                Watch on YouTube <ExternalLink size={14} />
              </a>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
