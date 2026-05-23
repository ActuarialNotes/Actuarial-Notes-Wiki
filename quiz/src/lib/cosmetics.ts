import type { AnimalType } from '@/components/AvatarDisplay'

export interface AnimalPalette {
  primary: string
  secondary: string
  belly: string
}

export interface Cosmetic {
  id: string                 // '<animal>:<variantKey>'
  animal: AnimalType
  variantKey: string         // e.g. 'crimson'
  variantName: string        // 'Crimson'
  palette: AnimalPalette
  priceGems: number
}

const DEFAULT_PRICE = 50

// Default palettes match the original AvatarDisplay colors so existing avatars
// continue to render identically when no variant is selected.
export const DEFAULT_PALETTES: Record<AnimalType, AnimalPalette> = {
  fox:     { primary: '#D9622C', secondary: '#F8A07A', belly: '#F5DEB3' },
  koala:   { primary: '#7A9BB5', secondary: '#6389A6', belly: '#A8C4D8' },
  frog:    { primary: '#3E9C6A', secondary: '#2D7A50', belly: '#C8EDD8' },
  owl:     { primary: '#7C5C2E', secondary: '#5C3E18', belly: '#C8A876' },
  wolf:    { primary: '#5B6E8A', secondary: '#8AABCC', belly: '#8AABCC' },
  octopus: { primary: '#7C3AED', secondary: '#6025C0', belly: '#9D5FF5' },
}

// 2 variants per animal — the launch catalog. Add more rows here to expand
// the Store without touching the schema.
export const COSMETICS: Cosmetic[] = [
  { id: 'fox:crimson',   animal: 'fox', variantKey: 'crimson',   variantName: 'Crimson Fox',
    palette: { primary: '#B91C1C', secondary: '#F87171', belly: '#FECACA' }, priceGems: DEFAULT_PRICE },
  { id: 'fox:arctic',    animal: 'fox', variantKey: 'arctic',    variantName: 'Arctic Fox',
    palette: { primary: '#E5E7EB', secondary: '#FFFFFF', belly: '#F3F4F6' }, priceGems: DEFAULT_PRICE },

  { id: 'koala:rose',    animal: 'koala', variantKey: 'rose',    variantName: 'Rose Koala',
    palette: { primary: '#BE6188', secondary: '#9C3F69', belly: '#E8B2CE' }, priceGems: DEFAULT_PRICE },
  { id: 'koala:slate',   animal: 'koala', variantKey: 'slate',   variantName: 'Slate Koala',
    palette: { primary: '#475569', secondary: '#334155', belly: '#94A3B8' }, priceGems: DEFAULT_PRICE },

  { id: 'frog:tropical', animal: 'frog', variantKey: 'tropical', variantName: 'Tropical Frog',
    palette: { primary: '#10B981', secondary: '#047857', belly: '#FCD34D' }, priceGems: DEFAULT_PRICE },
  { id: 'frog:azure',    animal: 'frog', variantKey: 'azure',    variantName: 'Azure Frog',
    palette: { primary: '#0EA5E9', secondary: '#0369A1', belly: '#BAE6FD' }, priceGems: DEFAULT_PRICE },

  { id: 'owl:snowy',     animal: 'owl', variantKey: 'snowy',     variantName: 'Snowy Owl',
    palette: { primary: '#F8FAFC', secondary: '#CBD5E1', belly: '#FFFFFF' }, priceGems: DEFAULT_PRICE },
  { id: 'owl:emerald',   animal: 'owl', variantKey: 'emerald',   variantName: 'Emerald Owl',
    palette: { primary: '#065F46', secondary: '#022C22', belly: '#A7F3D0' }, priceGems: DEFAULT_PRICE },

  { id: 'wolf:shadow',   animal: 'wolf', variantKey: 'shadow',   variantName: 'Shadow Wolf',
    palette: { primary: '#1F2937', secondary: '#374151', belly: '#6B7280' }, priceGems: DEFAULT_PRICE },
  { id: 'wolf:ivory',    animal: 'wolf', variantKey: 'ivory',    variantName: 'Ivory Wolf',
    palette: { primary: '#E7E5E4', secondary: '#A8A29E', belly: '#FAFAF9' }, priceGems: DEFAULT_PRICE },

  { id: 'octopus:coral', animal: 'octopus', variantKey: 'coral', variantName: 'Coral Octopus',
    palette: { primary: '#F97316', secondary: '#C2410C', belly: '#FDBA74' }, priceGems: DEFAULT_PRICE },
  { id: 'octopus:abyss', animal: 'octopus', variantKey: 'abyss', variantName: 'Abyss Octopus',
    palette: { primary: '#1E3A8A', secondary: '#0B1E54', belly: '#3B82F6' }, priceGems: DEFAULT_PRICE },
]

const COSMETICS_BY_ID = new Map(COSMETICS.map(c => [c.id, c]))

export function getCosmetic(id: string): Cosmetic | undefined {
  return COSMETICS_BY_ID.get(id)
}

export function getCosmeticsForAnimal(animal: AnimalType): Cosmetic[] {
  return COSMETICS.filter(c => c.animal === animal)
}

export function getAnimalPalette(animal: AnimalType, variantKey?: string): AnimalPalette {
  if (variantKey) {
    const c = COSMETICS_BY_ID.get(`${animal}:${variantKey}`)
    if (c) return c.palette
  }
  return DEFAULT_PALETTES[animal]
}
