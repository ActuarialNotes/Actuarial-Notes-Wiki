import type { AnimalType } from '@/components/AvatarDisplay'

export interface AnimalPalette {
  primary: string
  secondary: string
  belly: string
}

export type CosmeticRarity = 'common' | 'rare' | 'mythic'

export interface Cosmetic {
  id: string
  type: 'variant' | 'badge'
  animal?: AnimalType
  variantKey?: string
  variantName: string
  palette?: AnimalPalette
  priceGems: number
  tier?: 'basic' | 'rare'    // basic = 10 gems, rare = 50 gems
  rarity: CosmeticRarity
  premiumOnly?: boolean
}

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

// All variants are based on real-world animal types, subspecies, or color morphs.
// basic (10 gems) = common real-world color morph
// rare  (50 gems) = distinctive subspecies or separate species
export const COSMETICS: Cosmetic[] = [
  // Fox
  { id: 'fox:crimson',   type: 'variant', animal: 'fox',     variantKey: 'crimson',   variantName: 'Red Fox',
    palette: { primary: '#C0392B', secondary: '#E74C3C', belly: '#FECACA' },
    priceGems: 10, tier: 'basic', rarity: 'common' },
  { id: 'fox:arctic',    type: 'variant', animal: 'fox',     variantKey: 'arctic',    variantName: 'Arctic Fox',
    palette: { primary: '#E5E7EB', secondary: '#FFFFFF', belly: '#F3F4F6' },
    priceGems: 50, tier: 'rare', rarity: 'rare' },

  // Koala
  { id: 'koala:rose',    type: 'variant', animal: 'koala',   variantKey: 'rose',      variantName: 'Northern Koala',
    palette: { primary: '#9E7B5C', secondary: '#7A5C42', belly: '#D4B99A' },
    priceGems: 10, tier: 'basic', rarity: 'common' },
  { id: 'koala:slate',   type: 'variant', animal: 'koala',   variantKey: 'slate',     variantName: 'White Koala',
    palette: { primary: '#F0EDE8', secondary: '#CBBFB2', belly: '#FAF8F5' },
    priceGems: 50, tier: 'rare', rarity: 'rare' },

  // Frog
  { id: 'frog:azure',    type: 'variant', animal: 'frog',    variantKey: 'azure',     variantName: 'Dart Frog',
    palette: { primary: '#0EA5E9', secondary: '#0369A1', belly: '#BAE6FD' },
    priceGems: 10, tier: 'basic', rarity: 'common' },
  { id: 'frog:tropical', type: 'variant', animal: 'frog',    variantKey: 'tropical',  variantName: 'Tomato Frog',
    palette: { primary: '#DC4E20', secondary: '#AE3010', belly: '#FBCAB2' },
    priceGems: 50, tier: 'rare', rarity: 'rare' },

  // Owl
  { id: 'owl:emerald',   type: 'variant', animal: 'owl',     variantKey: 'emerald',   variantName: 'Barn Owl',
    palette: { primary: '#C8963A', secondary: '#6B4A20', belly: '#F5EDD3' },
    priceGems: 10, tier: 'basic', rarity: 'common' },
  { id: 'owl:snowy',     type: 'variant', animal: 'owl',     variantKey: 'snowy',     variantName: 'Snowy Owl',
    palette: { primary: '#F8FAFC', secondary: '#CBD5E1', belly: '#FFFFFF' },
    priceGems: 50, tier: 'rare', rarity: 'rare' },

  // Wolf
  { id: 'wolf:shadow',   type: 'variant', animal: 'wolf',    variantKey: 'shadow',    variantName: 'Timber Wolf',
    palette: { primary: '#6B7280', secondary: '#4B5563', belly: '#E5E7EB' },
    priceGems: 10, tier: 'basic', rarity: 'common' },
  { id: 'wolf:ivory',    type: 'variant', animal: 'wolf',    variantKey: 'ivory',     variantName: 'Arctic Wolf',
    palette: { primary: '#F1F5F9', secondary: '#CBD5E1', belly: '#FFFFFF' },
    priceGems: 50, tier: 'rare', rarity: 'rare' },

  // Octopus
  { id: 'octopus:coral', type: 'variant', animal: 'octopus', variantKey: 'coral',     variantName: 'Giant Pacific',
    palette: { primary: '#9B2335', secondary: '#6B1521', belly: '#D4806A' },
    priceGems: 10, tier: 'basic', rarity: 'common' },
  { id: 'octopus:abyss', type: 'variant', animal: 'octopus', variantKey: 'abyss',     variantName: 'Blue-ringed',
    palette: { primary: '#D97706', secondary: '#1D4ED8', belly: '#FEF9C3' },
    priceGems: 50, tier: 'rare', rarity: 'rare' },

  // Premium-only
  { id: 'badge:custom', type: 'badge', variantName: 'Custom Badge', priceGems: 100, rarity: 'mythic', premiumOnly: true },
]

// Alias kept for any code that imports PAINTS
export const PAINTS = COSMETICS

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
    if (c?.palette) return c.palette
  }
  return DEFAULT_PALETTES[animal]
}
