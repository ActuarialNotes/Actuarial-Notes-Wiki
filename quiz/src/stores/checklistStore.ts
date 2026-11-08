import { create } from 'zustand'
import type { ChecklistTicks } from '@/lib/essayChecklist'

// The points a reader has ticked on a written part's checklist
// (lib/essayChecklist.ts), by `<question id>:<part label>`. Kept out of the
// part card because the grading popup Next opens reads them too. Session
// only: a part open for answering again starts with no ticks
// (`clearChecklist`), and nothing is saved — the grade the ticks suggest is
// what the reader records.

interface ChecklistState {
  ticks: Record<string, ChecklistTicks>
  toggle: (key: string, sample: number, point: number) => void
  clear: (key: string) => void
}

export const checklistKey = (questionId: string, partLabel: string) => `${questionId}:${partLabel}`

export const useChecklistStore = create<ChecklistState>(set => ({
  ticks: {},
  toggle: (key, sample, point) => set(state => {
    const part = state.ticks[key] ?? {}
    const current = part[sample] ?? []
    const next = current.includes(point) ? current.filter(p => p !== point) : [...current, point]
    return { ticks: { ...state.ticks, [key]: { ...part, [sample]: next } } }
  }),
  clear: key => set(state => {
    if (!(key in state.ticks)) return state
    const { [key]: _dropped, ...rest } = state.ticks
    return { ticks: rest }
  }),
}))

const NO_TICKS: ChecklistTicks = {}

/** One part's ticks. */
export function usePartTicks(key: string): ChecklistTicks {
  return useChecklistStore(state => state.ticks[key] ?? NO_TICKS)
}
