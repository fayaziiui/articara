import { MEDICAL_DISCLAIMER } from '../data/education'

export function DisclaimerBanner({ compact = false }: { compact?: boolean }) {
  return (
    <aside className={`disclaimer ${compact ? 'compact' : ''}`} role="note">
      {compact
        ? 'Educational use only — not a substitute for medical care.'
        : MEDICAL_DISCLAIMER}
    </aside>
  )
}
