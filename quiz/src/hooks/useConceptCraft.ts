import { create } from 'zustand'
import { EMPTY_PROGRESS, pairKey, type CraftProgress } from '@/lib/conceptCraft'

/**
 * A reader's **Concept Craft** boards (docs/concept-craft.md): per topic, the
 * connections found and where each concept was left — plus which connections
 * the board shows (`filter`). Everything else on a board, the concepts in hand
 * among it, is made from the connections found (`boardState`).
 *
 * localStorage only, the way Cowork's stores are (`hooks/useCoworkLibrary.ts`):
 * the record is small, it is pair keys rather than content, and a board is a
 * study aid whose loss on a new device costs a few minutes of play — not worth
 * a server table. Synchronous for the same reason every local-first store here
 * is: a connection lands on the board in the same render it was found.
 *
 * It holds no graph. The page passes connections in where one is needed, so
 * nothing that imports the store pulls the vault into a chunk.
 */

const STORAGE_KEY = 'craft.v3'
/**
 * Earlier saves: the first version's recipes from an authored book, and the
 * second's concepts placed by hand. Neither means anything to a board whose
 * concepts are made, so they are cleared rather than read.
 */
const RETIRED_KEYS = ['craft.v1', 'craft.v2']

/** Which connections the board draws: all of them, or only the moderate and strong, or only the strong. */
export type StrengthFilter = 'all' | 'moderate' | 'strong'

export interface CraftBoardSave {
  /** Connections found (`pairKey`), in the order found. */
  found: string[]
  /** Where each concept was left, keyed by lower-cased name, rounded to the pixel. */
  positions: Record<string, [number, number]>
}

const EMPTY_BOARD: CraftBoardSave = { found: [], positions: {} }

interface Saved {
  filter: StrengthFilter
  boards: Record<string, CraftBoardSave>
}

const FILTERS: readonly StrengthFilter[] = ['all', 'moderate', 'strong']

function strings(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((x): x is string => typeof x === 'string') : []
}

function cleanBoard(raw: unknown): CraftBoardSave {
  if (!raw || typeof raw !== 'object') return EMPTY_BOARD
  const r = raw as Record<string, unknown>
  const positions: Record<string, [number, number]> = {}
  if (r.positions && typeof r.positions === 'object') {
    for (const [key, value] of Object.entries(r.positions as Record<string, unknown>)) {
      if (Array.isArray(value) && value.length === 2 && value.every(n => typeof n === 'number' && Number.isFinite(n))) {
        positions[key] = [value[0] as number, value[1] as number]
      }
    }
  }
  return {
    found: [...new Set(strings(r.found).filter(s => s.includes('|')))],
    positions,
  }
}

/** What survives a round trip through storage — every field checked, anything else dropped. */
export function parseCraftSave(raw: string | null): Saved {
  const fallback: Saved = { filter: 'all', boards: {} }
  if (!raw) return fallback
  try {
    const parsed = JSON.parse(raw) as Record<string, unknown>
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return fallback
    const boards: Record<string, CraftBoardSave> = {}
    if (parsed.boards && typeof parsed.boards === 'object') {
      for (const [id, board] of Object.entries(parsed.boards as Record<string, unknown>)) boards[id] = cleanBoard(board)
    }
    const filter = FILTERS.includes(parsed.filter as StrengthFilter) ? (parsed.filter as StrengthFilter) : 'all'
    return { filter, boards }
  } catch {
    return fallback
  }
}

function load(): Saved {
  try {
    for (const key of RETIRED_KEYS) localStorage.removeItem(key)
    return parseCraftSave(localStorage.getItem(STORAGE_KEY))
  } catch {
    return { filter: 'all', boards: {} }
  }
}

function persist(saved: Saved) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(saved))
  } catch { /* quota or private mode: the board still works for this visit */ }
}

interface ConceptCraftState extends Saved {
  setFilter: (filter: StrengthFilter) => void
  /** Record a connection found. Idempotent. */
  addConnection: (topicId: string, connection: { a: string; b: string }) => void
  /** Remember where the concepts lie. Replaces the topic's positions wholesale. */
  savePositions: (topicId: string, positions: Record<string, [number, number]>) => void
  /** Clear a topic's board. */
  resetBoard: (topicId: string) => void
}

export const useConceptCraft = create<ConceptCraftState>((set, get) => {
  const commit = (next: Saved) => {
    persist(next)
    set(next)
  }
  const saved = (): Saved => ({ filter: get().filter, boards: get().boards })
  const updateBoard = (topicId: string, change: (board: CraftBoardSave) => CraftBoardSave) => {
    const current = saved()
    const board = current.boards[topicId] ?? EMPTY_BOARD
    const next = change(board)
    if (next === board) return
    commit({ ...current, boards: { ...current.boards, [topicId]: next } })
  }

  return {
    ...load(),
    setFilter: filter => commit({ ...saved(), filter }),
    addConnection: (topicId, { a, b }) => updateBoard(topicId, board => {
      const key = pairKey(a, b)
      return board.found.includes(key) ? board : { ...board, found: [...board.found, key] }
    }),
    savePositions: (topicId, positions) => updateBoard(topicId, board => ({ ...board, positions })),
    resetBoard: topicId => {
      const current = saved()
      const boards = { ...current.boards }
      delete boards[topicId]
      commit({ ...current, boards })
    },
  }
})

/** A topic's board, or the empty one. */
export function boardFor(boards: Record<string, CraftBoardSave>, topicId: string): CraftBoardSave {
  return boards[topicId] ?? EMPTY_BOARD
}

/** The game's view of a board: the connections found. */
export function progressOf(board: CraftBoardSave): CraftProgress {
  return board.found.length ? { found: board.found } : EMPTY_PROGRESS
}
