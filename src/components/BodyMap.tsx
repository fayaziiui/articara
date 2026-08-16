import { JOINTS } from '../data/joints'

interface Props {
  selected: string[]
  onChange: (next: string[]) => void
}

export function BodyMap({ selected, onChange }: Props) {
  const toggle = (id: string) => {
    onChange(
      selected.includes(id)
        ? selected.filter((x) => x !== id)
        : [...selected, id],
    )
  }

  return (
    <div className="body-map">
      <div className="body-canvas" role="group" aria-label="Painful joints">
        <div className="body-silhouette" aria-hidden />
        {JOINTS.map((j) => (
          <button
            key={j.id}
            type="button"
            className={selected.includes(j.id) ? 'joint on' : 'joint'}
            style={{ left: `${j.x}%`, top: `${j.y}%` }}
            onClick={() => toggle(j.id)}
            aria-pressed={selected.includes(j.id)}
            title={j.label}
          >
            <span className="sr-only">{j.label}</span>
          </button>
        ))}
      </div>
      <div className="joint-chips">
        {selected.length === 0 ? (
          <span className="muted">Tap joints that hurt today</span>
        ) : (
          selected.map((id) => {
            const label = JOINTS.find((j) => j.id === id)?.label ?? id
            return (
              <button
                key={id}
                type="button"
                className="chip"
                onClick={() => toggle(id)}
              >
                {label} ×
              </button>
            )
          })
        )}
      </div>
    </div>
  )
}
