import { create } from 'zustand'
import { EMPTY_PROGRESS, pairKey, type CraftProgress } from '@/lib/conceptCraft'

/**
 * A reader's **Concept Craft** boards (docs/concept-craft.md): per topic, the
 * concepts put on the board, the connections found, where each concept was
 * left, and the days the daily challenge was met — plus which connections the
 * board shows (`filter`).
 *
 * localStorage only, the way Cowork's stores are (`hooks/useCoworkLibrary.ts`):
 * the record is small, it is names and pair keys rather than content, and a
 * board is a study aid whose loss on a new device costs a few minutes of
 * play — not worth a server table. Synchronous for the same reason every
 * local-first store here is: a connection lands on the board in the same
 * render it was found.
 *
 * It holds no graph. The page passes connections in where one is needed, so
 * nothing that imports the store pulls the vault into a chunk.
 */

const STORAGE_KEY = 'craft.v2'
/** The first version's save: recipes from an authored book that no longer exists. */
const RETIRED_KEYS = ['craft.v1']

/** Which connections the board draws: all of them, or only the moderate and strong, or only the strong. */
export type StrengthFilter = 'all' | 'moderate' | 'strong'

export interface CraftBoardSave {
  /** Concepts on the board, lower-cased, in the order placed. */
  placed: string[]
  /** Connections found (`pairKey`), in the order found. */
  found: string[]
  /** Where each concept was left, keyed by lower-cased name, rounded to the pixel. */
  positions: Record<string, [number, number]>
  /** Local dates (YYYY-MM-DD) on which the daily challenge was met. */
  challenges: string[]
}

const EMPTY_BOARD: CraftBoardSave = { placed: [], found: [], positions: {}, challenges: [] }

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
    placed: [...new Set(strings(r.placed).map(s => s.toLowerCase()))],
    found: [...new Set(strings(r.found).filter(s => s.includes('|')))],
    positions,
    challenges: [...new Set(strings(r.challenges))].slice(-60),
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
  /** Put concepts on a topic's board. Idempotent. */
  place: (topicId: string, names: readonly string[]) => void
  /** Record a connection found — both its ends go on the board with it. Idempotent. */
  addConnection: (topicId: string, connection: { a: string; b: string }) => void
  /** Remember where the concepts lie. Replaces the topic's positions wholesale. */
  savePositions: (topicId: string, positions: Record<string, [number, number]>) => void
  completeChallenge: (topicId: string, date: string) => void
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
  const withNames = (board: CraftBoardSave, names: readonly string[]): CraftBoardSave => {
    const add = [...new Set(names.map(n => n.toLowerCase()))].filter(n => n && !board.placed.includes(n))
    return add.length ? { ...board, placed: [...board.placed, ...add] } : board
  }

  return {
    ...load(),
    setFilter: filter => commit({ ...saved(), filter }),
    place: (topicId, names) => updateBoard(topicId, board => withNames(board, names)),
    addConnection: (topicId, { a, b }) => updateBoard(topicId, board => {
      const placed = withNames(board, [a, b])
      const key = pairKey(a, b)
      return placed.found.includes(key) ? placed : { ...placed, found: [...placed.found, key] }
    }),
    savePositions: (topicId, positions) => updateBoard(topicId, board => ({ ...board, positions })),
    completeChallenge: (topicId, date) => updateBoard(topicId, board =>
      board.challenges.includes(date) ? board : { ...board, challenges: [...board.challenges, date].slice(-60) },
    ),
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

/** The game's view of a board: what is on it and what has been found. */
export function progressOf(board: CraftBoardSave): CraftProgress {
  return board.placed.length || board.found.length ? { placed: board.placed, found: board.found } : EMPTY_PROGRESS
}
