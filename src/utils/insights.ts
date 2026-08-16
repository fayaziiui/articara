import type { DailyLog, FlareLog } from '../types'

export interface Insight {
  id: string
  tone: 'encourage' | 'watch' | 'tip'
  title: string
  detail: string
}

export function buildInsights(
  logs: DailyLog[],
  flares: FlareLog[],
  name?: string,
): Insight[] {
  const insights: Insight[] = []
  const recent = [...logs].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 7)
  const greet = name ? `${name}, ` : ''

  if (recent.length === 0) {
    insights.push({
      id: 'start',
      tone: 'tip',
      title: 'Start with today’s check-in',
      detail: `${greet}a 60-second symptom log builds the foundation for personal insights.`,
    })
    return insights
  }

  const avg = (key: keyof DailyLog) => {
    const vals = recent.map((l) => Number(l[key])).filter((n) => !Number.isNaN(n))
    return vals.reduce((a, b) => a + b, 0) / vals.length
  }

  const pain = avg('pain')
  const sleep = avg('sleep')
  const stress = avg('stress')
  const fatigue = avg('fatigue')
  const water = avg('water')

  if (pain >= 6) {
    insights.push({
      id: 'pain-high',
      tone: 'watch',
      title: 'Pain has been elevated',
      detail:
        'Your 7-day pain average is on the higher side. Consider gentle mobility, pacing, and sharing this trend at your next visit.',
    })
  } else if (pain <= 3) {
    insights.push({
      id: 'pain-good',
      tone: 'encourage',
      title: 'Pain trending steadier',
      detail: `${greet}nice work — recent pain scores look more manageable. Keep the habits that are working.`,
    })
  }

  if (sleep <= 4) {
    insights.push({
      id: 'sleep',
      tone: 'watch',
      title: 'Sleep may be a trigger',
      detail:
        'Lower sleep quality often travels with flares and fatigue. A consistent wind-down and medication timing review can help.',
    })
  }

  if (stress >= 6 && pain >= 5) {
    insights.push({
      id: 'stress-pain',
      tone: 'tip',
      title: 'Stress and pain are rising together',
      detail:
        'Your recent logs show higher stress alongside pain. Short breathing breaks and a lighter activity day may ease the load.',
    })
  }

  if (water < 5) {
    insights.push({
      id: 'hydrate',
      tone: 'tip',
      title: 'Hydration nudge',
      detail: 'Aim for a few more cups of water today — dehydration can worsen fatigue and stiffness for some people.',
    })
  }

  if (fatigue >= 6) {
    insights.push({
      id: 'fatigue',
      tone: 'encourage',
      title: 'Honor low-energy days',
      detail:
        'Fatigue is real with PsA. Chair exercises or a short walk still count. Rest is productive, not failure.',
    })
  }

  const rainyFlares = flares.filter((f) =>
    (f.weather ?? '').toLowerCase().match(/rain|cold|humid/),
  )
  if (rainyFlares.length >= 1) {
    insights.push({
      id: 'weather',
      tone: 'tip',
      title: 'Possible weather link',
      detail:
        'You’ve noted cold/rainy conditions around flares. Keep logging weather — patterns get clearer after a few weeks.',
    })
  }

  if (insights.length === 0) {
    insights.push({
      id: 'steady',
      tone: 'encourage',
      title: 'Steady day plan',
      detail: `${greet}keep medications, hydration, and a gentle stretch on today’s checklist.`,
    })
  }

  return insights.slice(0, 4)
}
