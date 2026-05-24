import { create } from 'zustand'
import type { WikiEntryRef } from '@/lib/wikiRoutes'

const STORAGE_KEY = 'actuarial_flashcards'

function load(): WikiEntryRef[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as WikiEntryRef[]) : []
  } catch {
    return []
  }
}

function save(cards: WikiEntryRef[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cards))
  } catch { /* ignore */ }
}

interface FlashcardsState {
  cards: WikiEntryRef[]
  addCard: (ref: WikiEntryRef) => void
  removeCard: (name: string) => void
  hasCard: (name: string) => boolean
}

export const useFlashcards = create<FlashcardsState>((set, get) => ({
  cards: load(),
  addCard: (ref) => {
    const { cards } = get()
    if (cards.some(c => c.name.toLowerCase() === ref.name.toLowerCase())) return
    const next = [...cards, ref]
    save(next)
    set({ cards: next })
  },
  removeCard: (name) => {
    const next = get().cards.filter(c => c.name.toLowerCase() !== name.toLowerCase())
    save(next)
    set({ cards: next })
  },
  hasCard: (name) =>
    get().cards.some(c => c.name.toLowerCase() === name.toLowerCase()),
}))
