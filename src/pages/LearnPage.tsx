import { DisclaimerBanner } from '../components/Disclaimer'
import { EDUCATION } from '../data/education'
import { Link } from 'react-router-dom'

export function LearnPage() {
  return (
    <div className="stack">
      <header className="page-intro">
        <h1>Learn</h1>
        <p>Short, practical education for living with PsA.</p>
      </header>

      <DisclaimerBanner />

      {EDUCATION.map((item) => (
        <article key={item.id} className="panel">
          <h2>{item.title}</h2>
          <p>{item.body}</p>
        </article>
      ))}

      <section className="panel premium-tease">
        <h2>Coming in Plus</h2>
        <ul>
          <li>Weather correlation with flares</li>
          <li>Smartwatch sync</li>
          <li>Food scanner & voice logging</li>
          <li>Lab tracking (CRP, ESR, Vitamin D)</li>
          <li>Deeper personalized plans</li>
        </ul>
        <Link className="btn secondary" to="/settings">
          View pricing
        </Link>
      </section>
    </div>
  )
}
