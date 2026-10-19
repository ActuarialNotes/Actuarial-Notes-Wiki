import { create } from 'zustand'
import { cleanFollows, toggleFollow, type TopicId } from '@/lib/community/topics'
import { parseHome, type Home } from '@/lib/community/places'

/**
 * The reader's own corner of the Community tab — the topics they follow, the
 * places they follow, and where "near me" is measured from.
 *
 * localStorage only, like Cowork's library (`hooks/useCoworkLibrary.ts`),
 * while the tab is in Preview: the catalogue is seed data, so a server table
 * keyed to today's ids would be a migration to write before anyone has used
 * it. Ids and a point, nothing else. A home is a city the reader chose, or
 * the city nearest where their browser said they were — never the raw fix.
 */

const STORAGE_KEY = 'community.v1'

interface Persisted {
  topics: TopicId[]
  places: string[]
  home: Home | null
  radiusKm: number | null
}

const EMPTY: Persisted = { topics: [], places: [], home: null, radiusKm: 250 }

function load(): Persisted {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return EMPTY
    const parsed = JSON.parse(raw) as Partial<Persisted>
    return {
      topics: cleanFollows(parsed.topics),
      places: Array.isArray(parsed.places) ? [...new Set(parsed.places.filter((x): x is string => typeof x === 'string'))] : [],
      home: parseHome(parsed.home),
      radiusKm: parsed.radiusKm === null || (typeof parsed.radiusKm === 'number' && parsed.radiusKm > 0) ? (parsed.radiusKm ?? null) : EMPTY.radiusKm,
    }
  } catch {
    return EMPTY
  }
}

function persist(state: Persisted) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch { /* ignore quota errors */ }
}

interface CommunityState extends Persisted {
  toggleTopic: (id: TopicId) => void
  togglePlace: (id: string) => void
  setHome: (home: Home | null) => void
  setRadius: (km: number | null) => void
}

export const useCommunity = create<CommunityState>((set, get) => {
  const commit = (patch: Partial<Persisted>) => {
    const { topics, places, home, radiusKm } = { ...get(), ...patch }
    persist({ topics, places, home, radiusKm })
    set(patch)
  }
  return {
    ...load(),
    toggleTopic: id => commit({ topics: toggleFollow(get().topics, id) }),
    togglePlace: id => {
      const places = get().places
      commit({ places: places.includes(id) ? places.filter(p => p !== id) : [...places, id] })
    },
    setHome: home => commit({ home }),
    setRadius: radiusKm => commit({ radiusKm }),
  }
})
