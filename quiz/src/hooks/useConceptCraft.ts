import { create } from 'zustand'
import { EMPTY_PROGRESS, pairKey, type CraftProgress } from '@/lib/conceptCraft'

/**
 * A reader's **Concept Craft** board (docs/concept-craft.md): one board, the
 * **starter packs** added to it (topic ids, in the order added), the
 * connections found and where each concept was left — plus which connections
 * the board shows (`filter`). Everything else on the board, the concepts in
 * hand among it, is made from the packs and the connections found
 * (`boardState`).
 *
 * localStorage only, the way Cowork's stores are (`hooks/useCoworkLibrary.ts`):
 * the record is small, it is ids and pair keys rather than content, and a board
 * is a study aid whose loss on a new device costs a few minutes of play — not
 * worth a server table. Synchronous for the same reason every local-first store
 * here is: a connection lands on the board in the same render it was found.
 *
 * It holds no graph. The page passes connections in where one is needed, so
 * nothing that imports the store pulls the vault into a chunk.
 */

const STORAGE_KEY = 'craft.v4'
/**
 * The third version's save: a board per topic, each picked before it opened.
 * Its boards are folded into the one board — each topic played becomes a pack
 * on it, with what was found and where it lay — then the key is cleared.
 */
const PER_TOPIC_KEY = 'craft.v3'
/**
 * Earlier saves: the first version's recipes from an authored book, and the
 * second's concepts placed by hand. Neither means anything to a board whose
 * concepts are made, so they are cleared rather than read. Nor do the scores
 * a connection's practice used to earn, and the note it left for its quiz:
 * practice scores nothing now.
 */
const RETIRED_KEYS = ['craft.v1', 'craft.v2', 'craft.practice.v1', 'craft.practice.pending']

/** Which connections the board draws: all of them, or only the moderate and strong, or only the strong. */
export type StrengthFilter = 'all' | 'moderate' | 'strong'

export interface CraftBoardSave {
  /** The starter packs added (topic ids), in the order added. */
  packs: string[]
  /** Connections found (`pairKey`), in the order found. */
  found: string[]
  /** Where each concept was left, keyed by lower-cased name, rounded to the pixel. */
  positions: Record<string, [number, number]>
}

export const EMPTY_BOARD: CraftBoardSave = { packs: [], found: [], positions: {} }

interface Saved {
  filter: StrengthFilter
  board: CraftBoardSave
}

const FILTERS: readonly StrengthFilter[] = ['all', 'moderate', 'strong']
const FALLBACK: Saved = { filter: 'all', board: EMPTY_BOARD }

function strings(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((x): x is string => typeof x === 'string') : []
}

function cleanPositions(raw: unknown): Record<string, [number, number]> {
  const positions: Record<string, [number, number]> = {}
  if (raw && typeof raw === 'object') {
    for (const [key, value] of Object.entries(raw as Record<string, unknown>)) {
      if (Array.isArray(value) && value.length === 2 && value.every(n => typeof n === 'number' && Number.isFinite(n))) {
        positions[key] = [value[0] as number, value[1] as number]
      }
    }
  }
  return positions
}

function cleanBoard(raw: unknown): CraftBoardSave {
  if (!raw || typeof raw !== 'object') return EMPTY_BOARD
  const r = raw as Record<string, unknown>
  return {
    packs: [...new Set(strings(r.packs).filter(Boolean))],
    found: [...new Set(strings(r.found).filter(s => s.includes('|')))],
    positions: cleanPositions(r.positions),
  }
}

function parseObject(raw: string | null): Record<string, unknown> | null {
  if (!raw) return null
  try {
    const parsed = JSON.parse(raw) as unknown
    return parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? (parsed as Record<string, unknown>) : null
  } catch {
    return null
  }
}

const cleanFilter = (value: unknown): StrengthFilter =>
  (FILTERS.includes(value as StrengthFilter) ? (value as StrengthFilter) : 'all')

/** What survives a round trip through storage — every field checked, anything else dropped. */
export function parseCraftSave(raw: string | null): Saved {
  const parsed = parseObject(raw)
  if (!parsed) return FALLBACK
  return { filter: cleanFilter(parsed.filter), board: cleanBoard(parsed.board) }
}

/**
 * The third version's boards, one per topic, as the one board: every topic with
 * a connection found becomes a pack, in the order saved, its connections and
 * positions kept. Null when there is nothing to carry over.
 */
export function migratePerTopicSave(raw: string | null): Saved | null {
  const parsed = parseObject(raw)
  if (!parsed || !parsed.boards || typeof parsed.boards !== 'object') return null
  const board: CraftBoardSave = { packs: [], found: [], positions: {} }
  for (const [id, value] of Object.entries(parsed.boards as Record<string, unknown>)) {
    if (!value || typeof value !== 'object') continue
    const r = value as Record<string, unknown>
    const found = strings(r.found).filter(s => s.includes('|'))
    if (found.length === 0) continue
    board.packs.push(id)
    for (const key of found) if (!board.found.includes(key)) board.found.push(key)
    board.positions = { ...cleanPositions(r.positions), ...board.positions }
  }
  if (board.packs.length === 0) return null
  return { filter: cleanFilter(parsed.filter), board }
}

function load(): Saved {
  try {
    for (const key of RETIRED_KEYS) localStorage.removeItem(key)
    const current = localStorage.getItem(STORAGE_KEY)
    const old = localStorage.getItem(PER_TOPIC_KEY)
    if (old !== null) {
      localStorage.removeItem(PER_TOPIC_KEY)
      const migrated = current === null ? migratePerTopicSave(old) : null
      if (migrated) {
        persist(migrated)
        return migrated
      }
    }
    return parseCraftSave(current)
  } catch {
    return FALLBACK
  }
}

function persist(saved: Saved) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(saved))
  } catch { /* quota or private mode: the board still works for this visit */ }
}

interface ConceptCraftState extends Saved {
  setFilter: (filter: StrengthFilter) => void
  /** Add a starter pack — a topic's seeds — to the board. Idempotent. */
  addPack: (topicId: string) => void
  /** Record a connection found. Idempotent. */
  addConnection: (connection: { a: string; b: string }) => void
  /** Remember where the concepts lie. Replaces the positions wholesale. */
  savePositions: (positions: Record<string, [number, number]>) => void
  /** Clear the board: no packs, nothing found. */
  resetBoard: () => void
}

export const useConceptCraft = create<ConceptCraftState>((set, get) => {
  const commit = (next: Saved) => {
    persist(next)
    set(next)
  }
  const updateBoard = (change: (board: CraftBoardSave) => CraftBoardSave) => {
    const { filter, board } = get()
    const next = change(board)
    if (next !== board) commit({ filter, board: next })
  }

  return {
    ...load(),
    setFilter: filter => commit({ filter, board: get().board }),
    addPack: topicId => updateBoard(board => (board.packs.includes(topicId) ? board : { ...board, packs: [...board.packs, topicId] })),
    addConnection: ({ a, b }) => updateBoard(board => {
      const key = pairKey(a, b)
      return board.found.includes(key) ? board : { ...board, found: [...board.found, key] }
    }),
    savePositions: positions => updateBoard(board => ({ ...board, positions })),
    resetBoard: () => commit({ filter: get().filter, board: EMPTY_BOARD }),
  }
})

/** The game's view of a board: the connections found. */
export function progressOf(board: CraftBoardSave): CraftProgress {
  return board.found.length ? { found: board.found } : EMPTY_PROGRESS
}
