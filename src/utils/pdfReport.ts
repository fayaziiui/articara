import { jsPDF } from 'jspdf'
import { format, parseISO } from 'date-fns'
import type { DailyLog, FlareLog, Medication, UserProfile } from '../types'
import { JOINTS } from '../data/joints'

export function exportDoctorReport(opts: {
  profile: UserProfile
  logs: DailyLog[]
  flares: FlareLog[]
  medications: Medication[]
}) {
  const { profile, logs, flares, medications } = opts
  const doc = new jsPDF()
  const sorted = [...logs].sort((a, b) => a.date.localeCompare(b.date)).slice(-30)

  let y = 16
  const line = (text: string, size = 11, gap = 7) => {
    doc.setFontSize(size)
    const split = doc.splitTextToSize(text, 180)
    doc.text(split, 14, y)
    y += split.length * (size * 0.4) + gap * 0.35
    if (y > 275) {
      doc.addPage()
      y = 16
    }
  }

  doc.setFont('helvetica', 'bold')
  line('Articara — Doctor Visit Summary', 16, 8)
  doc.setFont('helvetica', 'normal')
  line(`Patient: ${profile.name || 'Not set'}`)
  line(`Generated: ${format(new Date(), 'MMM d, yyyy')}`)
  line(
    'Disclaimer: Patient-reported data only. Not a medical diagnosis or substitute for clinical judgment.',
    9,
    10,
  )

  doc.setFont('helvetica', 'bold')
  line('Active medications', 13, 6)
  doc.setFont('helvetica', 'normal')
  if (medications.filter((m) => m.active).length === 0) {
    line('None logged')
  } else {
    medications
      .filter((m) => m.active)
      .forEach((m) => line(`• ${m.name} (${m.type}) ${m.dose ?? ''} — ${m.schedule}`))
  }

  doc.setFont('helvetica', 'bold')
  line('Symptom averages (last up to 30 logs)', 13, 6)
  doc.setFont('helvetica', 'normal')
  if (sorted.length === 0) {
    line('No daily logs yet.')
  } else {
    const avg = (key: keyof DailyLog) => {
      const vals = sorted.map((l) => Number(l[key])).filter((n) => !Number.isNaN(n))
      return (vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(1)
    }
    line(
      `Pain ${avg('pain')} · Fatigue ${avg('fatigue')} · Stiffness ${avg('stiffness')} · Swelling ${avg('swelling')}`,
    )
    line(
      `Skin flare ${avg('skinFlare')} · Mood ${avg('mood')} · Sleep ${avg('sleep')} · Stress ${avg('stress')}`,
    )
  }

  doc.setFont('helvetica', 'bold')
  line('Recent daily logs', 13, 6)
  doc.setFont('helvetica', 'normal')
  sorted.slice(-14).forEach((l) => {
    const jointLabels = l.joints
      .map((id) => JOINTS.find((j) => j.id === id)?.label ?? id)
      .join(', ')
    line(
      `${format(parseISO(l.date), 'MMM d')}: pain ${l.pain}, fatigue ${l.fatigue}, stiff ${l.stiffness}` +
        (jointLabels ? ` | joints: ${jointLabels}` : ''),
      9,
      5,
    )
  })

  doc.setFont('helvetica', 'bold')
  line('Flare notes', 13, 6)
  doc.setFont('helvetica', 'normal')
  if (flares.length === 0) {
    line('No flares logged.')
  } else {
    flares.slice(0, 8).forEach((f) => {
      line(
        `${f.date} · severity ${f.severity}/10 · food: ${f.food || '—'} · stress: ${f.stress ?? '—'} · weather: ${f.weather || '—'}`,
        9,
        5,
      )
      if (f.notes) line(`  Notes: ${f.notes}`, 9, 5)
    })
  }

  doc.save(`Articara-Report-${format(new Date(), 'yyyy-MM-dd')}.pdf`)
}
