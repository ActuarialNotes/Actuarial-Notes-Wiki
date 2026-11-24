// The exam switcher's open state (docs/redesign-spec.md §6). The control that
// opens it sits at the top left of a place; the sheet itself is mounted once,
// at the app root (components/switcher/ExamSwitcherHost.tsx).

import { create } from 'zustand'

export type SwitcherScreen = 'list' | 'add'

interface ExamSwitcherState {
  /** The screen showing, or null while the switcher is closed. */
  screen: SwitcherScreen | null
  /**
   * The exam page the reader is visiting without having added it (an exam
   * page's id), so the sheet can offer to add it. Null anywhere else.
   */
  visiting: string | null
  /** Open on the reader's exams. */
  open: (visiting?: string | null) => void
  /** The exam page (its id) whose date question Add an exam opens on, when one was asked for. */
  adding: string | null
  /** Open straight on Add an exam, or on the date question for one exam page. */
  openAdd: (examId?: string | null) => void
  close: () => void
}

export const useExamSwitcher = create<ExamSwitcherState>(set => ({
  screen: null,
  visiting: null,
  adding: null,
  open: (visiting = null) => set({ screen: 'list', visiting, adding: null }),
  openAdd: (examId = null) => set({ screen: 'add', visiting: null, adding: examId }),
  close: () => set({ screen: null, visiting: null, adding: null }),
}))
