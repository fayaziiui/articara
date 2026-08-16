export type SymptomKey =
  | 'pain'
  | 'fatigue'
  | 'stiffness'
  | 'swelling'
  | 'skinFlare'
  | 'mood'
  | 'sleep'
  | 'stress'
  | 'water'
  | 'weight'

export interface DailyLog {
  id: string
  date: string // yyyy-MM-dd
  pain: number
  fatigue: number
  stiffness: number
  swelling: number
  skinFlare: number
  mood: number
  sleep: number
  stress: number
  water: number
  weight?: number
  joints: string[]
  notes?: string
  createdAt: string
}

export interface FlareLog {
  id: string
  date: string
  severity: number
  food?: string
  stress?: number
  sleepHours?: number
  weather?: string
  exercise?: string
  medications?: string
  notes?: string
  createdAt: string
}

export type MedType = 'tablet' | 'injection' | 'refill'

export interface Medication {
  id: string
  name: string
  type: MedType
  dose?: string
  schedule: string
  nextReminder?: string
  active: boolean
}

export interface WellnessCheck {
  date: string
  medication: boolean
  hydration: boolean
  exercise: boolean
  vegetables: boolean
  sleep: boolean
}

export interface UserProfile {
  name: string
  diagnosedYear?: number
  onboardingDone: boolean
  plan: 'free' | 'plus'
  mealPreference: MealPlanId
}

export type MealPlanId =
  | 'mediterranean'
  | 'vegetarian'
  | 'highProtein'
  | 'budget'
  | 'desi'

export interface MealPlan {
  id: MealPlanId
  title: string
  description: string
  meals: { name: string; detail: string }[]
}

export interface ExerciseItem {
  id: string
  title: string
  category: string
  duration: string
  level: 'gentle' | 'moderate'
  youtubeUrl: string
  source: string
}
