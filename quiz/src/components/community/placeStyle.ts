import type { CSSProperties } from 'react'
import type { CommunityPlace, PlaceKind } from '@/lib/community/places'
import { hueStyle, topicHue } from '@/lib/community/topicColors'

/**
 * Each kind of place in a colour of its own, so a shelf of them reads at a
 * glance: the CAS's affiliates in Property & Casualty's, the online places
 * sky, local clubs green, students violet.
 */
const KIND_HUE: Record<PlaceKind, number> = {
  forum: 204,
  social: 204,
  chat: 248,
  society: 222,
  'regional-affiliate': topicHue('pc'),
  'local-club': 150,
  student: topicHue('ai-tech'),
}

export function placeMonogram(place: CommunityPlace): string {
  if (place.short && place.short.length <= 5) return place.short
  return place.name
    .replace(/^(the|r\/)\s*/i, '')
    .split(/[\s/&-]+/)
    .filter(w => /^[A-Z]/.test(w))
    .slice(0, 3)
    .map(w => w[0])
    .join('')
}

export function placeStyle(place: CommunityPlace): CSSProperties {
  return hueStyle(KIND_HUE[place.kind])
}
