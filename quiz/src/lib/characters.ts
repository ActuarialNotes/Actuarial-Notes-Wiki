import type { AnimalType } from '@/components/AvatarDisplay'

export interface CharacterDefinition {
  animal: AnimalType
  label: string
  free: boolean
  priceGems: number
  purchaseId: string
}

export const CHARACTERS: CharacterDefinition[] = [
  { animal: 'fox',     label: 'Fox',     free: true,  priceGems: 0,  purchaseId: 'character:fox' },
  { animal: 'koala',   label: 'Koala',   free: true,  priceGems: 0,  purchaseId: 'character:koala' },
  { animal: 'frog',    label: 'Frog',    free: true,  priceGems: 0,  purchaseId: 'character:frog' },
  { animal: 'owl',     label: 'Owl',     free: false, priceGems: 50, purchaseId: 'character:owl' },
  { animal: 'wolf',    label: 'Wolf',    free: false, priceGems: 50, purchaseId: 'character:wolf' },
  { animal: 'octopus', label: 'Octopus', free: false, priceGems: 50, purchaseId: 'character:octopus' },
]

export const FREE_ANIMALS = new Set<AnimalType>(['fox', 'koala', 'frog'])
