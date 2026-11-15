import { useMemo } from 'react'
import { create } from 'zustand'
import { useExamProgress } from '@/contexts/examProgress'
import { useWikiSyllabus } from '@/hooks/useWikiSyllabus'
import { EXAM_FOCUS_KEY, focusExams, parseStoredFocus, resolveFocus, studiedExams, type FocusExam } from '@/lib/examFocus'

function load(): string | null {
  try { return parseStoredFocus(localStorage.getItem(EXAM_FOCUS_KEY)) } catch { return null }
}

interface ExamFocusStore {
  /** The stored exam page file name, or null when the reader hasn't picked. */
  file: string | null
  setFocus: (file: string) => void
}

/** The stored choice (`lib/examFocus.ts`), kept in this browser. */
export const useExamFocusStore = create<ExamFocusStore>(set => ({
  file: load(),
  setFocus: file => {
    try { localStorage.setItem(EXAM_FOCUS_KEY, file) } catch { /* private mode */ }
    set({ file })
  },
}))

/**
 * The exam in focus, with every exam it could be and the ones the reader is
 * studying. With nothing stored it is the first exam they are studying; a
 * visitor who hasn't picked has none.
 */
export function useExamFocus(): {
  focus: FocusExam | null
  exams: FocusExam[]
  studied: FocusExam[]
  /** Whether the reader picked it (stored), not just inherited it from their exams. */
  picked: boolean
  setFocus: (file: string) => void
} {
  const { syllabi } = useWikiSyllabus()
  const { progress, examVariants } = useExamProgress()
  const file = useExamFocusStore(s => s.file)
  const setFocus = useExamFocusStore(s => s.setFocus)
  return useMemo(() => {
    const exams = focusExams(syllabi)
    const studied = studiedExams(exams, progress, examVariants)
    return { focus: resolveFocus(file, exams, studied), exams, studied, picked: exams.some(e => e.file === file), setFocus }
  }, [syllabi, progress, examVariants, file, setFocus])
}
