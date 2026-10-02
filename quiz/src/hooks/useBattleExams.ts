import { useMemo } from 'react'
import { useAllQuestions } from '@/hooks/useAllQuestions'
import { battleExamCounts } from '@/lib/battle'
import { EXAM_LABEL_TO_ID } from '@/lib/examIds'

const LADDER = Object.keys(EXAM_LABEL_TO_ID)

/**
 * The exams a Quiz Battle can be played on — every bank label with at least
 * three raceable questions (`battleExamCounts`), in ladder order — with the
 * question bank they were counted from.
 */
export function useBattleExams() {
  const { questions, loading } = useAllQuestions()
  const counts = useMemo(() => battleExamCounts(questions), [questions])
  const exams = useMemo(
    () => [...counts.keys()].sort((a, b) => rank(a) - rank(b)),
    [counts],
  )
  return { questions, loading, counts, exams }
}

function rank(label: string): number {
  const i = LADDER.indexOf(label)
  return i < 0 ? LADDER.length : i
}
