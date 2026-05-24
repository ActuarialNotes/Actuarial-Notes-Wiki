import type { AnimalType } from '@/components/AvatarDisplay'

export type CharacterRarity = 'free' | 'common' | 'rare' | 'mythic'

export interface CharacterDefinition {
  animal: AnimalType
  label: string
  free: boolean
  priceGems: number
  purchaseId: string
  rarity: CharacterRarity
  quote: string
}

export const CHARACTERS: CharacterDefinition[] = [
  { animal: 'fox', label: 'Fox', free: true, priceGems: 0, purchaseId: 'character:fox',
    rarity: 'free', quote: "I spotted that arbitrage before it hit the pricing model." },
  { animal: 'koala', label: 'Koala', free: true, priceGems: 0, purchaseId: 'character:koala',
    rarity: 'free', quote: "Sleep is underrated. So is the expected value of rest." },
  { animal: 'frog', label: 'Frog', free: true, priceGems: 0, purchaseId: 'character:frog',
    rarity: 'free', quote: "Every distribution has its leap of faith." },
  { animal: 'owl', label: 'Owl', free: false, priceGems: 50, purchaseId: 'character:owl',
    rarity: 'rare', quote: "The wisest risk is the one you've already quantified." },
  { animal: 'wolf', label: 'Wolf', free: false, priceGems: 50, purchaseId: 'character:wolf',
    rarity: 'rare', quote: "Running with the pack is fine — until you need to price the tail risk." },
  { animal: 'octopus', label: 'Octopus', free: false, priceGems: 50, purchaseId: 'character:octopus',
    rarity: 'rare', quote: "Eight arms, infinite contingency plans." },
]

export const FREE_ANIMALS = new Set<AnimalType>(['fox', 'koala', 'frog'])
