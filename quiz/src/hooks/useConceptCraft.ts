import { create } from 'zustand'
import { EMPTY_PROGRESS, recipeId, type CraftProgress, type CraftRecipe } from '@/lib/conceptCraft'

/**
 * A reader's **Concept Craft** boards (docs/concept-craft.md): per module, the
 * recipes found, where each concept was left on the board, the days the daily
 * challenge was met, and how the Mastery prompt has gone — plus which of the
 * two modes they play in.
 *
 * localStorage only, the way Cowork's stores are (`hooks/useCoworkLibrary.ts`):
 * the record is small, it is ids and numbers rather than content, and a board
 * is a study aid whose loss on a new device costs a few minutes of crafting —
 * not worth a server table before the game has been played. Synchronous for
 * the same reason every local-first store here is: a craft lands on the board
 * in the same render it was made.
 *
 * It holds no recipe book. The page passes the module in where one is needed,
 * so nothing that imports the store pulls `data/conceptCraft` out of the lazy
 * Craft chunk.
 */

const STORAGE_KEY = 'craft.v1'

export type CraftMode = 'explore' | 'mastery'

export interface CraftBoardSave {
  /** Recipe ids (`pairKey`), in the order found. */
  recipes: string[]
  /** Where each concept was left, keyed by lower-cased name, rounded to the pixel. */
  positions: Record<string, [number, number]>
  /** Local dates (YYYY-MM-DD) on which the daily challenge was met. */
  challenges: string[]
  /** The Mastery prompt, answered right and wrong. */
  right: number
  wrong: number
}

const EMPTY_BOARD: CraftBoardSave = { recipes: [], positions: {}, challenges: [], right: 0, wrong: 0 }

interface Saved {
  mode: CraftMode
  boards: Record<string, CraftBoardSave>
}

function strings(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((x): x is string => typeof x === 'string') : []
}

function count(value: unknown): number {
  return typeof value === 'number' && Number.isFinite(value) && value >= 0 ? Math.floor(value) : 0
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
    recipes: [...new Set(strings(r.recipes))],
    positions,
    challenges: [...new Set(strings(r.challenges))].slice(-60),
    right: count(r.right),
    wrong: count(r.wrong),
  }
}

/** What survives a round trip through storage — every field checked, anything else dropped. */
export function parseCraftSave(raw: string | null): Saved {
  const fallback: Saved = { mode: 'explore', boards: {} }
  if (!raw) return fallback
  try {
    const parsed = JSON.parse(raw) as Record<string, unknown>
    const boards: Record<string, CraftBoardSave> = {}
    if (parsed.boards && typeof parsed.boards === 'object') {
      for (const [id, board] of Object.entries(parsed.boards as Record<string, unknown>)) boards[id] = cleanBoard(board)
    }
    return { mode: parsed.mode === 'mastery' ? 'mastery' : 'explore', boards }
  } catch {
    return fallback
  }
}

function load(): Saved {
  try {
    return parseCraftSave(localStorage.getItem(STORAGE_KEY))
  } catch {
    return { mode: 'explore', boards: {} }
  }
}

function persist(saved: Saved) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(saved))
  } catch { /* quota or private mode: the board still works for this visit */ }
}

interface ConceptCraftState extends Saved {
  setMode: (mode: CraftMode) => void
  /** Record a recipe found. Idempotent. */
  addRecipe: (moduleId: string, recipe: Pick<CraftRecipe, 'a' | 'b'>) => void
  /** Remember where the concepts lie. Replaces the module's positions wholesale. */
  savePositions: (moduleId: string, positions: Record<string, [number, number]>) => void
  completeChallenge: (moduleId: string, date: string) => void
  recordAnswer: (moduleId: string, right: boolean) => void
  /** Start a module again from its primitives. */
  resetBoard: (moduleId: string) => void
}

export const useConceptCraft = create<ConceptCraftState>((set, get) => {
  const commit = (next: Saved) => {
    persist(next)
    set(next)
  }
  const saved = (): Saved => ({ mode: get().mode, boards: get().boards })
  const updateBoard = (moduleId: string, change: (board: CraftBoardSave) => CraftBoardSave) => {
    const current = saved()
    const board = current.boards[moduleId] ?? EMPTY_BOARD
    const next = change(board)
    if (next === board) return
    commit({ ...current, boards: { ...current.boards, [moduleId]: next } })
  }

  return {
    ...load(),
    setMode: mode => commit({ ...saved(), mode }),
    addRecipe: (moduleId, recipe) => updateBoard(moduleId, board => {
      const id = recipeId(recipe)
      return board.recipes.includes(id) ? board : { ...board, recipes: [...board.recipes, id] }
    }),
    savePositions: (moduleId, positions) => updateBoard(moduleId, board => ({ ...board, positions })),
    completeChallenge: (moduleId, date) => updateBoard(moduleId, board =>
      board.challenges.includes(date) ? board : { ...board, challenges: [...board.challenges, date].slice(-60) },
    ),
    recordAnswer: (moduleId, right) => updateBoard(moduleId, board =>
      right ? { ...board, right: board.right + 1 } : { ...board, wrong: board.wrong + 1 },
    ),
    resetBoard: moduleId => {
      const current = saved()
      const boards = { ...current.boards }
      delete boards[moduleId]
      commit({ ...current, boards })
    },
  }
})

/** A module's board, or the empty one. */
export function boardFor(boards: Record<string, CraftBoardSave>, moduleId: string): CraftBoardSave {
  return boards[moduleId] ?? EMPTY_BOARD
}

/** The engine's view of a board: just the recipes. */
export function progressOf(board: CraftBoardSave): CraftProgress {
  return board.recipes.length ? { recipes: board.recipes } : EMPTY_PROGRESS
}
