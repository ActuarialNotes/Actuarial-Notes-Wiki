// The exam in focus (docs/redesign-spec.md §6): the one exam every place opens
// on. The reader's exams that the vault has a page for, and which of them was
// last used, kept with the account and mirrored in the browser
// (contexts/ExamProgressContext.tsx). The rules are lib/examFocus.ts.

import { useCallback, useMemo } from 'react'
import { useExamProgress } from '@/contexts/examProgress'
import { useWikiSyllabus } from '@/hooks/useWikiSyllabus'
import { readerExams, resolveFocus } from '@/lib/examFocus'
import { wikiExamIdToProgressKey, type WikiExamSyllabus } from '@/lib/wikiParser'

export function useExamInFocus() {
  const { syllabi, loading: syllabusLoading, error: syllabusError } = useWikiSyllabus()
  const { progress, examVariants, targetDates, loadingExams, focusId, setFocusId } = useExamProgress()

  const exams = useMemo<WikiExamSyllabus[]>(
    () => readerExams(syllabi, progress, examVariants),
    [syllabi, progress, examVariants],
  )
  const active = useMemo(
    () => resolveFocus(focusId, exams, targetDates, new Date()),
    [focusId, exams, targetDates],
  )

  const select = useCallback((examId: string) => setFocusId(examId), [setFocusId])
  /** Put the exam with this exam_progress key in focus, if the reader is studying it. */
  const selectByKey = useCallback((key: string) => {
    const found = exams.find(s => wikiExamIdToProgressKey(s.examId) === key)
    if (found) setFocusId(found.examId)
    return !!found
  }, [exams, setFocusId])

  return {
    syllabi,
    exams,
    active,
    activeKey: active ? wikiExamIdToProgressKey(active.examId) : null,
    select,
    selectByKey,
    loading: syllabusLoading || loadingExams,
    syllabusError,
  }
}
