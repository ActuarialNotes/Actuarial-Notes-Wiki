import { create } from 'zustand'
import type { WikiEntryRef } from '@/lib/wikiRoutes'

export interface FlashCard extends WikiEntryRef {
  addedAt: number
  // Timestamp the card was marked "completed" in the deck, or undefined if not.
  // Completed cards stay in the deck (with a checkmark) until "Clear Completed"
  // sweeps them into a date-stamped saved pack.
  completedAt?: number
}

export interface SavedFlashcardPack {
  id: string
  label: string
  concepts: string[]
  savedAt: number
}

const STORAGE_KEY = 'actuarial_flashcards'
const ORDER_KEY = 'actuarial_flashcards_order'
const SAVED_PACKS_KEY = 'actuarial_saved_flashcard_packs'

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

function loadSavedPacks(): SavedFlashcardPack[] {
  try {
    const raw = localStorage.getItem(SAVED_PACKS_KEY)
    return raw ? (JSON.parse(raw) as SavedFlashcardPack[]) : []
  } catch {
    return []
  }
}

function persistSavedPacks(packs: SavedFlashcardPack[]) {
  try {
    localStorage.setItem(SAVED_PACKS_KEY, JSON.stringify(packs))
  } catch { /* ignore */ }
}

interface FlashcardsState {
  cards: FlashCard[]
  customOrder: string[]
  savedPacks: SavedFlashcardPack[]
  addCard: (ref: WikiEntryRef) => void
  removeCard: (name: string) => void
  clearCards: () => void
  toggleCompleted: (name: string) => void
  clearCompleted: () => void
  hasCard: (name: string) => boolean
  setCustomOrder: (names: string[]) => void
  addSavedPack: (label: string, concepts: string[]) => void
  deleteSavedPack: (id: string) => void
}

export const useFlashcards = create<FlashcardsState>((set, get) => ({
  cards: load(),
  customOrder: loadOrder(),
  savedPacks: loadSavedPacks(),
  addCard: (ref) => {
    const { cards, customOrder } = get()
    if (cards.some(c => c.name.toLowerCase() === ref.name.toLowerCase())) return
    const newCard: FlashCard = { ...ref, addedAt: Date.now() }
    const nextCards = [...cards, newCard]
    const nextOrder = [...customOrder, ref.name]
    save(nextCards)
    saveOrder(nextOrder)
    set({ cards: nextCards, customOrder: nextOrder })
  },
  removeCard: (name) => {
    const { cards, customOrder } = get()
    const nextCards = cards.filter(c => c.name.toLowerCase() !== name.toLowerCase())
    const nextOrder = customOrder.filter(n => n.toLowerCase() !== name.toLowerCase())
    save(nextCards)
    saveOrder(nextOrder)
    set({ cards: nextCards, customOrder: nextOrder })
  },
  clearCards: () => {
    save([])
    saveOrder([])
    set({ cards: [], customOrder: [] })
  },
  toggleCompleted: (name) => {
    const { cards } = get()
    const nextCards = cards.map(c =>
      c.name.toLowerCase() === name.toLowerCase()
        ? { ...c, completedAt: c.completedAt ? undefined : Date.now() }
        : c,
    )
    save(nextCards)
    set({ cards: nextCards })
  },
  clearCompleted: () => {
    const { cards, customOrder, savedPacks } = get()
    const completed = cards.filter(c => c.completedAt)
    if (completed.length === 0) return
    const completedNames = completed.map(c => c.name)
    const completedLower = new Set(completedNames.map(n => n.toLowerCase()))

    // Move the cleared cards into a date-stamped "Completed <date>" pack so they
    // can be re-added from the Packs tab. Merge into today's pack when clearing
    // more than once in a day rather than spawning duplicate packs.
    const label = `Completed ${new Date().toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })}`
    const existing = savedPacks.find(p => p.label === label)
    let nextPacks: SavedFlashcardPack[]
    if (existing) {
      const merged = [...existing.concepts]
      const seen = new Set(merged.map(n => n.toLowerCase()))
      for (const name of completedNames) {
        if (!seen.has(name.toLowerCase())) { merged.push(name); seen.add(name.toLowerCase()) }
      }
      nextPacks = savedPacks.map(p =>
        p.id === existing.id ? { ...p, concepts: merged, savedAt: Date.now() } : p,
      )
    } else {
      const newPack: SavedFlashcardPack = {
        id: `completed_${Date.now()}`,
        label,
        concepts: completedNames,
        savedAt: Date.now(),
      }
      nextPacks = [...savedPacks, newPack]
    }

    const nextCards = cards.filter(c => !c.completedAt)
    const nextOrder = customOrder.filter(n => !completedLower.has(n.toLowerCase()))
    save(nextCards)
    saveOrder(nextOrder)
    persistSavedPacks(nextPacks)
    set({ cards: nextCards, customOrder: nextOrder, savedPacks: nextPacks })
  },
  hasCard: (name) =>
    get().cards.some(c => c.name.toLowerCase() === name.toLowerCase()),
  setCustomOrder: (names) => {
    saveOrder(names)
    set({ customOrder: names })
  },
  addSavedPack: (label, concepts) => {
    const newPack: SavedFlashcardPack = {
      id: `saved_${Date.now()}`,
      label,
      concepts,
      savedAt: Date.now(),
    }
    const next = [...get().savedPacks, newPack]
    persistSavedPacks(next)
    set({ savedPacks: next })
  },
  deleteSavedPack: (id) => {
    const next = get().savedPacks.filter(p => p.id !== id)
    persistSavedPacks(next)
    set({ savedPacks: next })
  },
}))
