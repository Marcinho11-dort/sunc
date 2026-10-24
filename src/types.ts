export type BodyKind = 'terrestrial' | 'gas-giant' | 'ice-giant' | 'dwarf'

export interface Planet {
  id: string
  name: string
  nameEn: string
  kind: BodyKind
  tagline: string
  description: string
  /** CSS colours for the sphere gradient */
  colors: [string, string, string]
  hasRings?: boolean
  /** mean radius, km */
  radiusKm: number
  /** mass, 10^24 kg */
  massE24: number
  /** gravity, m/s² */
  gravity: number
  /** mean distance from the Sun, million km */
  distanceMkm: number
  /** orbital period, Earth days */
  orbitDays: number
  /** rotation period, hours */
  dayHours: number
  /** mean temperature, °C */
  tempC: number
  moons: number
  facts: string[]
}

export interface Mission {
  id: string
  name: string
  agency: string
  year: number
  target: string
  status: 'success' | 'ongoing' | 'lost'
  summary: string
}

export interface QuizQuestion {
  id: string
  question: string
  options: string[]
  answer: number
  explain: string
}
