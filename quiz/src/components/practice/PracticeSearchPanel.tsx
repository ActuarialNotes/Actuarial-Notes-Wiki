// What Practice's search found (components/practice/PracticeSearch.tsx):
// questions only, the Exam filter starting on the exam the page shows, each
// with a box to pick it, ending in the button that starts a quiz on them.
// The matching, filters and draw are the one search's (lib/oneSearch.ts).

import { useCallback, useDeferredValue, useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Play } from 'lucide-react'
import { QuestionFilterBar } from '@/components/QuestionFilterBar'
import { PracticeCount, QuestionRow, ROW_FOCUS } from '@/components/search/QuestionRow'
import { ShowMore } from '@/components/ShowMore'
import { Button } from '@/components/ui/button'
import { usePagedList } from '@/hooks/usePagedList'
import { useQuestionAttempts } from '@/hooks/useQuestionAttempts'
import { useQuizBuilderSettings } from '@/hooks/useQuizBuilderSettings'
import {
  PRACTICE_LIMIT,
  attemptDot,
  drawIds,
  matchQuestions,
  pickedIds,
  practiceCount,
  runSearch,
} from '@/lib/oneSearch'
import type { Question } from '@/lib/parser'
import { QUESTION_FACETS, emptyFacets, toggleFacet, type FacetSelection, type QuestionFacet } from '@/lib/questionFilters'
import { quizLaunchUrl, storeSelectedIds } from '@/lib/quizBuilder'
import { cn } from '@/lib/utils'

const FACETS_SHOWN: readonly QuestionFacet[] = ['exam', 'difficulty', 'type', 'source', 'sitting']

/** The filters as they were left (components/practice/PracticeSearch.tsx), or the exam the page shows. */
function startingFacets(exam: string, stored: Record<string, string[]> | undefined): FacetSelection {
  if (stored) {
    let facets = emptyFacets()
    for (const facet of QUESTION_FACETS) {
      for (const value of stored[facet] ?? []) facets = toggleFacet(facets, facet, value)
    }
    return facets
  }
  return exam ? toggleFacet(emptyFacets(), 'exam', exam) : emptyFacets()
}

export default function PracticeSearchPanel({ query: typed, exam, questions, initialFacets, onFacets, facetsShown = FACETS_SHOWN }: {
  query: string
  exam: string
  questions: Question[]
  /** The filters this history entry was left with, when it is come back to. */
  initialFacets?: Record<string, string[]>
  /** Told each change of the filters, so they can be kept for the way back. */
  onFacets?: (facets: Record<string, string[]>) => void
  /** The filters drawn, when not the usual ones (a concept's practice adds Concepts). */
  facetsShown?: readonly QuestionFacet[]
}) {
  const navigate = useNavigate()
  const quizSettings = useQuizBuilderSettings('quiz')
  const { byQuestionId: attempts, tracked } = useQuestionAttempts()
  // The field is drawn at once; the results follow when the browser has a moment.
  const query = useDeferredValue(typed)

  // The Exam filter opens on the exam the page shows; the reader can widen it.
  const [facets, setFacets] = useState<FacetSelection>(() => startingFacets(exam, initialFacets))
  const facetKey = facetsShown.map(f => [...facets[f]].sort().join(',')).join('|')
  useEffect(() => {
    onFacets?.(Object.fromEntries(QUESTION_FACETS.map(f => [f, [...facets[f]]])))
    // `facetKey` is the filters' content.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [facetKey, onFacets])

  const pool = useMemo(() => matchQuestions(questions, query), [questions, query])
  const results = useMemo(
    () => runSearch({
      query,
      index: [],
      questions,
      syllabi: [],
      focus: exam ? { examId: '', bank: exam, resourceLabel: '' } : null,
      facets,
      matched: pool,
    }).questions,
    [query, questions, exam, facets, pool],
  )
  const paged = usePagedList(results, `practice-search:${query}:${facetKey}`)

  // New results start at their top.
  const listRef = useRef<HTMLDivElement>(null)
  useEffect(() => { listRef.current?.scrollTo(0, 0) }, [query, facetKey])

  const [picked, setPicked] = useState<ReadonlySet<string>>(() => new Set())
  const [chosenCount, setChosenCount] = useState<number | null>(null)
  const pickedList = useMemo(() => pickedIds(results, picked), [results, picked])
  const found = results.length
  const count = practiceCount(chosenCount, found)
  const togglePick = useCallback((id: string) => {
    setPicked(prev => {
      const next = new Set(prev)
      if (!next.delete(id)) next.add(id)
      return next
    })
  }, [])

  function startPractice(ids: readonly string[]) {
    if (ids.length === 0) return
    storeSelectedIds(ids)
    navigate(quizLaunchUrl(
      { kind: 'plan', count: ids.length },
      {
        mode: 'quiz',
        reveal: quizSettings.reveal,
        links: quizSettings.conceptLinks ? '1' : '0',
        timed: quizSettings.timed,
      },
    ))
  }

  return (
    <>
      <div className="shrink-0 px-4 pb-1 pt-3">
        <QuestionFilterBar
          pool={pool}
          selection={facets}
          onToggle={(facet, value) => setFacets(prev => toggleFacet(prev, facet, value))}
          facets={facetsShown}
        />
      </div>

      <div ref={listRef} className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4">
        {questions.length === 0 ? (
          <p className="py-6 text-[16px]" aria-live="polite">Loading the questions…</p>
        ) : found === 0 ? (
          <p className="py-6 text-[16px]">
            {query.trim() ? `No questions match “${query.trim()}” with these filters.` : 'No questions match these filters.'}
          </p>
        ) : (
          <>
            <ul className="flex flex-col">
              {paged.shown.map(r => (
                <QuestionRow
                  key={r.question.id}
                  result={r}
                  query={query}
                  dot={tracked ? attemptDot(attempts.get(r.question.id)) : null}
                  picked={picked.has(r.question.id)}
                  onTogglePick={togglePick}
                />
              ))}
            </ul>
            <ShowMore auto nextSize={paged.nextSize} remaining={paged.remaining} noun="questions" onShowMore={paged.showMore} />
          </>
        )}
      </div>

      {found > 0 && (
        <div className="flex shrink-0 items-center gap-2.5 border-t border-border p-3" data-testid="practice-search-start">
          {pickedList.length > 0 ? (
            <>
              <button
                type="button"
                onClick={() => setPicked(new Set())}
                className={cn('h-[58px] shrink-0 rounded-full border-[1.5px] border-foreground px-5 text-base font-bold transition-colors hover:bg-foreground/10', ROW_FOCUS)}
              >
                Clear
              </button>
              <Button size="main" data-sound="begin" onClick={() => startPractice(pickedList)} className="min-w-0 flex-1 rounded-full">
                <Play className="h-[18px] w-[18px] shrink-0 fill-current" aria-hidden="true" />
                <span className="truncate">Practice {pickedList.length} picked</span>
              </Button>
            </>
          ) : (
            <>
              {found > 1 && (
                <PracticeCount count={count} most={Math.min(found, PRACTICE_LIMIT)} onChange={setChosenCount} />
              )}
              <Button size="main" data-sound="begin" onClick={() => startPractice(drawIds(results, count))} className="min-w-0 flex-1 rounded-full">
                <Play className="h-[18px] w-[18px] shrink-0 fill-current" aria-hidden="true" />
                <span className="truncate">
                  {found === 1
                    ? 'Practice this question'
                    : count === found ? `Practice all ${count}` : `Practice ${count}`}
                </span>
              </Button>
            </>
          )}
        </div>
      )}
    </>
  )
}
