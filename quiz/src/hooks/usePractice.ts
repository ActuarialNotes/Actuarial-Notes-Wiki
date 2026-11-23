// What a Practice button needs (lib/practiceLaunch.ts): how many questions its
// pool holds, and the reader's own quiz settings for the launch.
//
// The question bank is its own chunk and megabytes, so it is fetched here, on
// the page that shows a count, and parsed once for every button after it.

import { useEffect, useMemo, useState } from 'react'
import { fetchAllQuestions } from '@/lib/github'
import { filterQuestions, parseAllQuestions, type Question, type QuestionFilter } from '@/lib/parser'
import type { LaunchSettings } from '@/lib/quizBuilder'
import { loadConceptLinks } from '@/lib/quizConceptLinks'
import { loadTimed } from '@/lib/quizTiming'
import { loadRevealMode } from '@/lib/revealMode'

let bank: Promise<Question[]> | null = null

function loadBank(): Promise<Question[]> {
  bank ??= fetchAllQuestions().then(parseAllQuestions).catch(err => {
    bank = null
    throw err
  })
  return bank
}

/** The parsed bank, or null until it has loaded. Pass false to leave it unfetched. */
export function useQuestionBank(enabled = true): Question[] | null {
  const [questions, setQuestions] = useState<Question[] | null>(null)
  useEffect(() => {
    if (!enabled) return
    let cancelled = false
    loadBank().then(q => { if (!cancelled) setQuestions(q) }).catch(() => {})
    return () => { cancelled = true }
  }, [enabled])
  return questions
}

/** How many questions a quiz on this concept can draw; null until the bank has loaded. */
export function useConceptQuestionCount(concept: string | null): number | null {
  const questions = useQuestionBank(concept !== null)
  return useMemo(
    () => (questions && concept ? filterQuestions(questions, { concept }).length : null),
    [questions, concept],
  )
}

/** How many questions a filter leaves, over a bank already loaded. */
export function countQuestions(questions: Question[] | null, filter: QuestionFilter): number | null {
  return questions ? filterQuestions(questions, filter).length : null
}

/** The reader's quiz settings, as the quiz setup sheet last left them. */
export function practiceSettings(): LaunchSettings {
  return {
    mode: 'quiz',
    reveal: loadRevealMode('quiz'),
    links: loadConceptLinks('quiz') ? '1' : '0',
    timed: loadTimed('quiz'),
  }
}
