// The avatar a profile carries, as data: what `avatar_url` holds (a colour, an
// animal with an optional variant, a custom value or an image URL), how it is
// read and written, and the animals' names. Drawn by components/AvatarDisplay.tsx.

export type AvatarData =
  | { type: 'color'; value: string }
  | { type: 'animal'; value: AnimalType; variant?: string }
  | { type: 'custom'; value: string }
  | { type: 'image'; value: string }

export type AnimalType = 'fox' | 'koala' | 'frog' | 'owl' | 'wolf' | 'octopus'

export const ANIMAL_TYPES: AnimalType[] = ['fox', 'koala', 'frog', 'owl', 'wolf', 'octopus']

export function parseAvatarUrl(url: string): AvatarData {
  if (!url) return { type: 'color', value: '#475569' }
  if (url.startsWith('{')) {
    try {
      const parsed = JSON.parse(url)
      if (parsed.type === 'color') return { type: 'color', value: parsed.value }
      if (parsed.type === 'animal') {
        return {
          type: 'animal',
          value: parsed.value as AnimalType,
          variant: typeof parsed.variant === 'string' ? parsed.variant : undefined,
        }
      }
      if (parsed.type === 'custom') return { type: 'custom', value: parsed.value }
    } catch { /* fall through */ }
  }
  return { type: 'image', value: url }
}

export function serializeAvatar(data: AvatarData): string {
  if (data.type === 'color') return JSON.stringify({ type: 'color', value: data.value })
  if (data.type === 'animal') {
    const payload: { type: 'animal'; value: AnimalType; variant?: string } = { type: 'animal', value: data.value }
    if (data.variant) payload.variant = data.variant
    return JSON.stringify(payload)
  }
  if (data.type === 'custom') return JSON.stringify({ type: 'custom', value: data.value })
  return data.value
}

export const ANIMAL_LABELS: Record<AnimalType, string> = {
  fox: 'Fox',
  koala: 'Koala',
  frog: 'Frog',
  owl: 'Owl',
  wolf: 'Wolf',
  octopus: 'Octopus',
}
