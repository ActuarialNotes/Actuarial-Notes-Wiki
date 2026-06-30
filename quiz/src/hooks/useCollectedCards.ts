import { create } from 'zustand'

// "Collected" flashcards — a concept becomes collected once the user reads it
// and passes a basic comprehension check (see CollectConceptModal). Collecting
// is the first active-learning step and is distinct from manually adding a
// concept to the flashcard gallery (useFlashcards). State is persisted to
// localStorage, mirroring the offline-first pattern used elsewhere in the app.

export interface CollectedCard {
  name: string
  collectedAt: number
}

const STORAGE_KEY = 'actuarial_collected_cards'

// Fired on every successful collection so always-mounted nav (BottomNav /
// Sidebar) can light up the Flashcards tab without subscribing to the store.
export const COLLECTED_EVENT = 'flashcard-collected'

function load(): CollectedCard[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as CollectedCard[]
    if (!Array.isArray(parsed)) return []
    return parsed.filter(c => c && typeof c.name === 'string')
  } catch {
    return []
  }
}

function persist(cards: CollectedCard[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cards))
  } catch { /* ignore quota errors */ }
}

interface CollectedCardsState {
  cards: CollectedCard[]
  isCollected: (name: string) => boolean
  collect: (name: string) => void
  uncollect: (name: string) => void
}

export const useCollectedCards = create<CollectedCardsState>((set, get) => ({
  cards: load(),
  isCollected: name => get().cards.some(c => c.name.toLowerCase() === name.toLowerCase()),
  collect: name => {
    const { cards } = get()
    if (cards.some(c => c.name.toLowerCase() === name.toLowerCase())) return
    const next = [...cards, { name, collectedAt: Date.now() }]
    persist(next)
    set({ cards: next })
    try {
      window.dispatchEvent(new CustomEvent(COLLECTED_EVENT, { detail: { name } }))
    } catch { /* ignore */ }
  },
  uncollect: name => {
    const next = get().cards.filter(c => c.name.toLowerCase() !== name.toLowerCase())
    persist(next)
    set({ cards: next })
  },
}))
