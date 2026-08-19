import { create } from 'zustand'
import type { WikiEntryRef } from '@/lib/wikiRoutes'
import { queueDeckSync } from '@/lib/flashcardSync'

// The study deck and its custom order. Persisted to localStorage (the immediate
// source of truth, which keeps this store's API synchronous) and — for
// signed-in users — mirrored to user_flashcards so the deck follows the learner
// across devices. The server writes are fire-and-forget and debounced; see
// lib/flashcardSync.ts.

export interface FlashCard extends WikiEntryRef {
  addedAt: number
  // Timestamp the card was marked "completed" in the deck, or undefined if not.
  // Completed cards stay in the deck (with a checkmark) until "Clear Completed"
  // sweeps them out of it.
  completedAt?: number
}

const STORAGE_KEY = 'actuarial_flashcards'
const ORDER_KEY = 'actuarial_flashcards_order'

// Saved packs are gone — sweep the key older builds left behind rather than
// leaving a dead list sitting in every returning learner's storage.
try { localStorage.removeItem('actuarial_saved_flashcard_packs') } catch { /* ignore */ }

function load(): FlashCard[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as (WikiEntryRef | FlashCard)[]
    return parsed.map((c, i) => ({
      ...c,
      addedAt: (c as FlashCard).addedAt ?? i,
    }))
  } catch {
    return []
  }
}

function save(cards: FlashCard[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cards))
  } catch { /* ignore */ }
}

function loadOrder(): string[] {
  try {
    const raw = localStorage.getItem(ORDER_KEY)
    return raw ? (JSON.parse(raw) as string[]) : []
  } catch {
    return []
  }
}

function saveOrder(order: string[]) {
  try {
    localStorage.setItem(ORDER_KEY, JSON.stringify(order))
  } catch { /* ignore */ }
}

interface FlashcardsState {
  cards: FlashCard[]
  customOrder: string[]
  addCard: (ref: WikiEntryRef) => void
  removeCard: (name: string) => void
  clearCards: () => void
  toggleCompleted: (name: string) => void
  clearCompleted: () => void
  resetCompleted: () => void
  hasCard: (name: string) => boolean
  setCustomOrder: (names: string[]) => void
  /**
   * Replace deck and order from the server (see hooks/useFlashcardSync).
   * Writes through to localStorage but does *not* queue a server push — the
   * caller decides whether the merged state needs pushing back.
   */
  hydrate: (state: { cards: FlashCard[]; customOrder: string[] }) => void
}

export const useFlashcards = create<FlashcardsState>((set, get) => ({
  cards: load(),
  customOrder: loadOrder(),
  addCard: (ref) => {
    const { cards, customOrder } = get()
    if (cards.some(c => c.name.toLowerCase() === ref.name.toLowerCase())) return
    const newCard: FlashCard = { ...ref, addedAt: Date.now() }
    const nextCards = [...cards, newCard]
    const nextOrder = [...customOrder, ref.name]
    save(nextCards)
    saveOrder(nextOrder)
    queueDeckSync(nextCards, nextOrder)
    set({ cards: nextCards, customOrder: nextOrder })
  },
  removeCard: (name) => {
    const { cards, customOrder } = get()
    const nextCards = cards.filter(c => c.name.toLowerCase() !== name.toLowerCase())
    const nextOrder = customOrder.filter(n => n.toLowerCase() !== name.toLowerCase())
    save(nextCards)
    saveOrder(nextOrder)
    queueDeckSync(nextCards, nextOrder)
    set({ cards: nextCards, customOrder: nextOrder })
  },
  clearCards: () => {
    save([])
    saveOrder([])
    queueDeckSync([], [])
    set({ cards: [], customOrder: [] })
  },
  toggleCompleted: (name) => {
    const { cards, customOrder } = get()
    const nextCards = cards.map(c =>
      c.name.toLowerCase() === name.toLowerCase()
        ? { ...c, completedAt: c.completedAt ? undefined : Date.now() }
        : c,
    )
    save(nextCards)
    queueDeckSync(nextCards, customOrder)
    set({ cards: nextCards })
  },
  // Un-complete every card without removing anything — used by "Study again"
  // at the end of a study session to restart the deck from scratch.
  resetCompleted: () => {
    const { cards, customOrder } = get()
    if (!cards.some(c => c.completedAt)) return
    const nextCards = cards.map(c => (c.completedAt ? { ...c, completedAt: undefined } : c))
    save(nextCards)
    queueDeckSync(nextCards, customOrder)
    set({ cards: nextCards })
  },
  // Drop every completed card out of the deck. The cards themselves are not
  // lost: they stay collected, so the Collected view can put any of them back.
  clearCompleted: () => {
    const { cards, customOrder } = get()
    const completed = cards.filter(c => c.completedAt)
    if (completed.length === 0) return
    const completedLower = new Set(completed.map(c => c.name.toLowerCase()))

    const nextCards = cards.filter(c => !c.completedAt)
    const nextOrder = customOrder.filter(n => !completedLower.has(n.toLowerCase()))
    save(nextCards)
    saveOrder(nextOrder)
    queueDeckSync(nextCards, nextOrder)
    set({ cards: nextCards, customOrder: nextOrder })
  },
  hasCard: (name) =>
    get().cards.some(c => c.name.toLowerCase() === name.toLowerCase()),
  setCustomOrder: (names) => {
    saveOrder(names)
    queueDeckSync(get().cards, names)
    set({ customOrder: names })
  },
  hydrate: ({ cards, customOrder }) => {
    save(cards)
    saveOrder(customOrder)
    set({ cards, customOrder })
  },
}))
