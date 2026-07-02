import type { AnimalType } from '@/components/AvatarDisplay'

// Story mode (planned replacement for the old mnemonic feature): each concept
// gets a short narrative per animal character, told by the user's chosen
// avatar. Structurally identical to data/mnemonics.ts — same per-concept,
// per-animal shape — but content is written later.
export type AnimalStories = Record<AnimalType, string>

export const STORIES: Record<string, AnimalStories> = {}
