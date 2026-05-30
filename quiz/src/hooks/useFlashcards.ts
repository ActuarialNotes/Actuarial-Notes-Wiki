import { create } from 'zustand'
import type { WikiEntryRef } from '@/lib/wikiRoutes'

export interface FlashCard extends WikiEntryRef {
  addedAt: number
}

const STORAGE_KEY = 'actuarial_flashcards'
const ORDER_KEY = 'actuarial_flashcards_order'

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
  hasCard: (name: string) => boolean
  setCustomOrder: (names: string[]) => void
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
  hasCard: (name) =>
    get().cards.some(c => c.name.toLowerCase() === name.toLowerCase()),
  setCustomOrder: (names) => {
    saveOrder(names)
    set({ customOrder: names })
  },
}))
