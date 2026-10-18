// **Who the Tutor is** (docs/tutor.md §9): the reader's own character — the
// one they chose and dressed in the Gem Shop. The Tutor has no face of its own;
// it wears the animal and the colourway on the account (`user_metadata.avatar_url`,
// read by `parseAvatarUrl`), drawn by the same `AvatarDisplay` the Gem Shop
// draws, so a skin bought there is the Tutor the next time it looks up.
//
// An account with no animal equipped — a colour or a photo — gets the first
// free character, the fox, until it picks one.

import { ANIMAL_LABELS, parseAvatarUrl, serializeAvatar, type AnimalType } from '../avatar'
import { COSMETICS } from '../cosmetics'

/** The character an account with none equipped is tutored by: the first free one. */
export const DEFAULT_TUTOR_ANIMAL: AnimalType = 'fox'

export interface TutorCharacter {
  /** What `AvatarDisplay` draws — always an animal. */
  avatarUrl: string
  animal: AnimalType
  variant: string | null
  /** "Fox", or the colourway's name — "Red Fox". */
  name: string
  /** True when the account has an animal equipped; false for the default. */
  chosen: boolean
}

export function tutorCharacter(avatarUrl: string | null | undefined): TutorCharacter {
  const parsed = parseAvatarUrl(avatarUrl ?? '')
  if (parsed.type === 'animal') {
    const variant = parsed.variant ?? null
    const skin = variant ? COSMETICS.find(c => c.type === 'variant' && c.animal === parsed.value && c.variantKey === variant) : undefined
    return {
      avatarUrl: avatarUrl!,
      animal: parsed.value,
      variant,
      name: skin?.variantName ?? ANIMAL_LABELS[parsed.value],
      chosen: true,
    }
  }
  return {
    avatarUrl: serializeAvatar({ type: 'animal', value: DEFAULT_TUTOR_ANIMAL }),
    animal: DEFAULT_TUTOR_ANIMAL,
    variant: null,
    name: ANIMAL_LABELS[DEFAULT_TUTOR_ANIMAL],
    chosen: false,
  }
}
