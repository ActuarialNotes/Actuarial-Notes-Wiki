// The exam Today is showing: the reader's exams in progress that the vault has
// a page for, and which of them was last open (kept in the browser). Today and
// its Analytics screen both read it, so the two are always about one exam.
//
// The exam switcher of docs/redesign-spec.md §6 (one exam in focus for every
// place, kept with the account) replaces this in Phase E.

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useExamProgress } from '@/contexts/examProgress'
import { matchesSelectedVariant } from '@/data/examSittings'
import { useWikiSyllabus } from '@/hooks/useWikiSyllabus'
import { wikiExamIdToProgressKey, type WikiExamSyllabus } from '@/lib/wikiParser'

export const ACTIVE_EXAM_KEY = 'quiz.dashboard.activeExamId'

export function useTodayExam() {
  const { syllabi, loading: syllabusLoading, error: syllabusError } = useWikiSyllabus()
  const { progress, examVariants, loadingExams } = useExamProgress()

  const exams = useMemo<WikiExamSyllabus[]>(
    () => syllabi.filter(s => {
      const key = wikiExamIdToProgressKey(s.examId)
      return progress[key] === 'in_progress' && matchesSelectedVariant(key, s.examId, examVariants[key])
    }),
    [syllabi, progress, examVariants],
  )

  const [activeId, setActiveId] = useState<string | null>(() => {
    try { return localStorage.getItem(ACTIVE_EXAM_KEY) } catch { return null }
  })
  const active = exams.find(s => s.examId === activeId) ?? exams[0] ?? null

  // Remember the exam shown, once the reader's exams are known.
  const activeExamId = active?.examId ?? null
  const remembered = useRef<string | null>(null)
  useEffect(() => {
    if (!activeExamId || remembered.current === activeExamId) return
    remembered.current = activeExamId
    try { localStorage.setItem(ACTIVE_EXAM_KEY, activeExamId) } catch { /* private window */ }
  }, [activeExamId])

  const select = useCallback((examId: string) => setActiveId(examId), [])
  /** Show the exam with this exam_progress key, if the reader is studying it. */
  const selectByKey = useCallback((key: string) => {
    const found = exams.find(s => wikiExamIdToProgressKey(s.examId) === key)
    if (found) setActiveId(found.examId)
    return !!found
  }, [exams])

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
