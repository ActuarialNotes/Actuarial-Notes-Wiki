import { create } from 'zustand'

/**
 * The question spreadsheet's on-screen state (docs/question-spreadsheet.md):
 * where the pane is — docked beside the question, the view it always opens in,
 * or popped out into a window of its own — and the cell selected in it, which
 * is what an answer box's **Insert** button drops in.
 *
 * The working itself lives with the quiz session (`quizStore.sheets`); this is
 * only what the screen shows, so it is never saved.
 */

export type SheetView = 'docked' | 'popped'

export interface SelectedCell {
  questionId: string
  /** `H3` */
  address: string
  /** What the cell shows, as it would be typed into an answer. */
  value: string
}

interface QuestionSheetState {
  view: SheetView
  selected: SelectedCell | null
  setView: (view: SheetView) => void
  setSelected: (selected: SelectedCell | null) => void
}

export const useQuestionSheetStore = create<QuestionSheetState>(set => ({
  view: 'docked',
  selected: null,
  setView: view => set({ view }),
  setSelected: selected => set(state => (
    state.selected?.questionId === selected?.questionId
      && state.selected?.address === selected?.address
      && state.selected?.value === selected?.value
      ? state
      : { selected }
  )),
}))
