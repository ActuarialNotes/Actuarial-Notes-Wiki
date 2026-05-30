import { create } from 'zustand'

interface ExamsPopoutState {
  open: boolean
  openExams: () => void
  closeExams: () => void
}

export const useExamsPopout = create<ExamsPopoutState>(set => ({
  open: false,
  openExams: () => set({ open: true }),
  closeExams: () => set({ open: false }),
}))
