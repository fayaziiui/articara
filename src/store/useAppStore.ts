import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type {
  DailyLog,
  FlareLog,
  Medication,
  MealPlanId,
  UserProfile,
  WellnessCheck,
} from '../types'

function uid() {
  return crypto.randomUUID()
}

function today() {
  return new Date().toISOString().slice(0, 10)
}

interface AppState {
  profile: UserProfile
  dailyLogs: DailyLog[]
  flares: FlareLog[]
  medications: Medication[]
  wellness: WellnessCheck[]
  setProfile: (partial: Partial<UserProfile>) => void
  saveDailyLog: (log: Omit<DailyLog, 'id' | 'createdAt'> & { id?: string }) => void
  getLogForDate: (date: string) => DailyLog | undefined
  addFlare: (flare: Omit<FlareLog, 'id' | 'createdAt'>) => void
  addMedication: (med: Omit<Medication, 'id'>) => void
  updateMedication: (id: string, partial: Partial<Medication>) => void
  removeMedication: (id: string) => void
  toggleWellness: (key: keyof Omit<WellnessCheck, 'date'>) => void
  getTodayWellness: () => WellnessCheck
  seedDemo: () => void
}

export const defaultWellness = (date: string): WellnessCheck => ({
  date,
  medication: false,
  hydration: false,
  exercise: false,
  vegetables: false,
  sleep: false,
})

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      profile: {
        name: '',
        onboardingDone: false,
        plan: 'free',
        mealPreference: 'mediterranean',
      },
      dailyLogs: [],
      flares: [],
      medications: [],
      wellness: [],

      setProfile: (partial) =>
        set((s) => ({ profile: { ...s.profile, ...partial } })),

      saveDailyLog: (log) =>
        set((s) => {
          const existing = s.dailyLogs.find((l) => l.date === log.date)
          if (existing || log.id) {
            const id = log.id ?? existing!.id
            return {
              dailyLogs: s.dailyLogs.map((l) =>
                l.id === id || l.date === log.date
                  ? { ...l, ...log, id, createdAt: l.createdAt }
                  : l,
              ),
            }
          }
          return {
            dailyLogs: [
              {
                ...log,
                id: uid(),
                createdAt: new Date().toISOString(),
              },
              ...s.dailyLogs,
            ],
          }
        }),

      getLogForDate: (date) => get().dailyLogs.find((l) => l.date === date),

      addFlare: (flare) =>
        set((s) => ({
          flares: [
            {
              ...flare,
              id: uid(),
              createdAt: new Date().toISOString(),
            },
            ...s.flares,
          ],
        })),

      addMedication: (med) =>
        set((s) => ({
          medications: [...s.medications, { ...med, id: uid() }],
        })),

      updateMedication: (id, partial) =>
        set((s) => ({
          medications: s.medications.map((m) =>
            m.id === id ? { ...m, ...partial } : m,
          ),
        })),

      removeMedication: (id) =>
        set((s) => ({
          medications: s.medications.filter((m) => m.id !== id),
        })),

      getTodayWellness: () => {
        const d = today()
        return get().wellness.find((w) => w.date === d) ?? defaultWellness(d)
      },

      toggleWellness: (key) =>
        set((s) => {
          const d = today()
          const current = s.wellness.find((w) => w.date === d) ?? defaultWellness(d)
          const next = { ...current, [key]: !current[key] }
          const others = s.wellness.filter((w) => w.date !== d)
          return { wellness: [next, ...others] }
        }),

      seedDemo: () => {
        const logs: DailyLog[] = []
        for (let i = 13; i >= 0; i--) {
          const d = new Date()
          d.setDate(d.getDate() - i)
          const date = d.toISOString().slice(0, 10)
          logs.push({
            id: uid(),
            date,
            pain: 2 + Math.round(Math.sin(i / 2) * 2 + Math.random() * 2),
            fatigue: 3 + Math.round(Math.cos(i / 3) * 2 + Math.random()),
            stiffness: 2 + Math.round(Math.random() * 4),
            swelling: 1 + Math.round(Math.random() * 3),
            skinFlare: Math.round(Math.random() * 5),
            mood: 5 + Math.round(Math.random() * 4),
            sleep: 5 + Math.round(Math.random() * 4),
            stress: 2 + Math.round(Math.random() * 5),
            water: 4 + Math.round(Math.random() * 4),
            weight: 70 + Math.round(Math.random() * 2),
            joints: i % 3 === 0 ? ['left_knee', 'right_hand'] : ['lower_back'],
            createdAt: d.toISOString(),
          })
        }
        set({
          dailyLogs: logs,
          flares: [
            {
              id: uid(),
              date: logs[10]?.date ?? today(),
              severity: 7,
              food: 'Processed snacks, late dinner',
              stress: 8,
              sleepHours: 5,
              weather: 'Cold / rainy',
              exercise: 'Skipped',
              medications: 'On schedule',
              notes: 'Morning stiffness lasted 90 minutes',
              createdAt: new Date().toISOString(),
            },
          ],
          medications: [
            {
              id: uid(),
              name: 'Methotrexate',
              type: 'tablet',
              dose: '15 mg',
              schedule: 'Weekly · Sunday 9:00 AM',
              active: true,
            },
            {
              id: uid(),
              name: 'Adalimumab',
              type: 'injection',
              dose: '40 mg',
              schedule: 'Every 2 weeks',
              active: true,
            },
          ],
        })
      },
    }),
    { name: 'articara-storage-v1' },
  ),
)

export { today }
export type { MealPlanId }
