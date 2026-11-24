// The one search (docs/redesign-spec.md §7a.4, R18): one field over concepts,
// resources and questions, opened from Practice's search row. What a query
// finds, the order it comes in and the address it rides are lib/oneSearch.ts;
// this page draws them.
//
// Four tabs with counts. All shows each kind's first few results and a row for
// the rest; Questions adds the question filters, a box on every question to
// pick it, and ends in the screen's one filled button: the picked questions,
// or so many of the results at random (the count beside it). A concept's
// Practice button opens this tab on the concept's questions.

import { PRACTICE_EXAM_KEY } from '@/lib/practiceHome'
import { useCallback, useDeferredValue, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { ChevronRight, GraduationCap, History, Play, Search as SearchIcon, X } from 'lucide-react'
import { LevelSquare } from '@/components/LevelSquare'
import { PracticeBack } from '@/components/practice/PracticeHeader'
import { QuestionFilterBar } from '@/components/QuestionFilterBar'
import { PracticeCount, QuestionRow, ROW_FOCUS, ROW_RULE, ROW_SCROLL } from '@/components/search/QuestionRow'
import { handleResultKeys } from '@/components/search/resultKeys'
import { INK_MARK, highlightMatch } from '@/components/SearchHighlight'
import { ShowMore } from '@/components/ShowMore'
import { Button } from '@/components/ui/button'
import { GROUND } from '@/components/ui/OutlineCard'
import { ConceptPopup } from '@/components/wiki/ConceptPopup'
import { useActionBarHeight } from '@/hooks/useActionBarHeight'
import { useAllQuestions } from '@/hooks/useAllQuestions'
import { useConceptLevels } from '@/hooks/useConceptLevels'
import { usePagedList } from '@/hooks/usePagedList'
import { useQuestionAttempts } from '@/hooks/useQuestionAttempts'
import { useQuizBuilderSettings } from '@/hooks/useQuizBuilderSettings'
import { useSearchTracking } from '@/hooks/useSearchTracking'
import { useExamInFocus } from '@/hooks/useExamInFocus'
import { useWikiSyllabus } from '@/hooks/useWikiSyllabus'
import { bankLabelFor } from '@/lib/examIds'
import {
  ALL_TAB_PREVIEW,
  PRACTICE_LIMIT,
  SEARCH_TABS,
  attemptDot,
  conceptPlaceLine,
  drawIds,
  matchQuestions,
  pickedIds,
  practiceCount,
  previewOf,
  resourceMetaLine,
  runSearch,
  searchParamsFromState,
  searchStateFromParams,
  tabCounts,
  type ConceptResult,
  type ExamResult,
  type QuestionResult,
  type ResourceResult,
  type SearchFocus,
  type SearchState,
} from '@/lib/oneSearch'
import type { MasteryState } from '@/lib/mastery'
import { loadRecentSearches, saveRecentSearches, withRecentSearch } from '@/lib/recentSearches'
import { toggleFacet, type QuestionFacet } from '@/lib/questionFilters'
import { quizLaunchUrl, storeSelectedIds } from '@/lib/quizBuilder'
import { cn } from '@/lib/utils'
import { installWikiBundle } from '@/lib/wikiBundle'
import { buildWikiIndex, type WikiIndexItem } from '@/lib/wikiIndex'
import { FROM_SEARCH, examDisplayName, pathToEntryRef, wikiRoute } from '@/lib/wikiRoutes'

/** The filters the Questions tab offers. Results span exams, so Exam is one of them. */
const QUESTION_FACETS_SHOWN: readonly QuestionFacet[] = ['difficulty', 'type', 'source', 'exam', 'sitting']
const QUESTION_FACETS_WITH_CONCEPT: readonly QuestionFacet[] = ['difficulty', 'type', 'concept', 'source', 'exam', 'sitting']


/** The exam in focus, as each index spells it. Null for a reader studying no exam. */
function useSearchFocus(): SearchFocus | null {
  const { active, syllabi } = useExamInFocus()
  return useMemo(() => {
    // The exam Today shows; for a reader studying none, the exam last opened
    // on Practice in this browser (hooks/useQuizExamScreen.ts).
    let exam: (typeof syllabi)[number] | null = active
    if (!exam) {
      let remembered = ''
      try { remembered = localStorage.getItem(PRACTICE_EXAM_KEY) ?? '' } catch { /* private window */ }
      exam = (remembered && syllabi.find(s => bankLabelFor(s) === remembered)) || null
    }
    if (!exam) return null
    return {
      examId: exam.examId,
      bank: bankLabelFor(exam),
      resourceLabel: examDisplayName(exam.fileName ?? `Exam ${exam.examId}`),
    }
  }, [active, syllabi])
}

/** How long the field is left alone before what it holds is written to the address. */
const ADDRESS_SETTLE_MS = 200

export default function Search() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const state = useMemo(() => searchStateFromParams(searchParams), [searchParams])
  const { tab, facets } = state

  // The field is the page's own state, so a keystroke is drawn at once: the
  // results follow it when the browser has a moment (a deferred value), and
  // the address follows a pause in the typing. Writing the address on every
  // key made each one a navigation, and searching inside it held the key up.
  const [text, setText] = useState(state.query)
  const written = useRef(state.query)
  useEffect(() => {
    // The address changed under the page (Back, Forward, a link): take its query.
    if (state.query !== written.current) {
      written.current = state.query
      setText(state.query)
    }
  }, [state.query])
  const query = useDeferredValue(text)
  useSearchTracking(query)

  const write = useCallback((next: SearchState) => {
    written.current = next.query
    setSearchParams(searchParamsFromState(next), { replace: true })
  }, [setSearchParams])
  useEffect(() => {
    if (text === written.current) return
    const timer = setTimeout(() => write({ query: text, tab, facets }), ADDRESS_SETTLE_MS)
    return () => clearTimeout(timer)
  }, [text, tab, facets, write])
  // A change of tab or filter rewrites this entry at once: Back leaves the search.
  const update = useCallback((next: Partial<SearchState>) => {
    if (next.query !== undefined) setText(next.query)
    write({ query: text, tab, facets, ...next })
  }, [write, text, tab, facets])

  const { questions, loading: questionsLoading, error: questionsError } = useAllQuestions()
  const { syllabi } = useWikiSyllabus()
  const focus = useSearchFocus()
  const { levelOf } = useConceptLevels()
  const { byQuestionId: attempts, tracked } = useQuestionAttempts()
  const quizSettings = useQuizBuilderSettings('quiz')

  const [index, setIndex] = useState<WikiIndexItem[]>([])
  const [indexLoading, setIndexLoading] = useState(true)
  useEffect(() => {
    let cancelled = false
    // The vault's pages come with the build, as a chunk of their own: installed
    // first, the index and the reader are answered from it and never from the
    // network (lib/wikiBundle.ts).
    import('virtual:wiki-content')
      .then(({ default: bundle }) => installWikiBundle(bundle))
      .catch(() => {})
      .then(() => buildWikiIndex())
      .then(items => { if (!cancelled) setIndex(items) })
      .catch(() => {})
      .finally(() => { if (!cancelled) setIndexLoading(false) })
    return () => { cancelled = true }
  }, [])

  // The query's questions, unfiltered: what the filters count their options
  // over, and what the results are narrowed from. Found once per query.
  const questionPool = useMemo(() => matchQuestions(questions, query), [questions, query])
  const results = useMemo(
    () => runSearch({ query, index, questions, syllabi, focus, facets, matched: questionPool }),
    [query, index, questions, syllabi, focus, facets, questionPool],
  )
  // What a question is matched on is read the first time it is searched
  // (lib/oneSearch.ts). Done while the reader is still reaching for the
  // keyboard, the first letter typed doesn't wait for four thousand of them.
  useEffect(() => {
    if (questions.length === 0) return
    const warm = () => { matchQuestions(questions, 'warm') }
    if (typeof requestIdleCallback === 'function') {
      const id = requestIdleCallback(warm)
      return () => cancelIdleCallback(id)
    }
    const timer = setTimeout(warm, 200)
    return () => clearTimeout(timer)
  }, [questions])
  const counts = tabCounts(results)
  const hasQuery = query.trim() !== ''
  const loading = questionsLoading || indexLoading

  const inputRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    if (!hasQuery) inputRef.current?.focus()
    // Only on arrival: the field is not taken back while the reader works the tabs.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  // Ctrl/⌘ K on the search itself goes to the field.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!(e.metaKey || e.ctrlKey) || e.key.toLowerCase() !== 'k') return
      e.preventDefault()
      inputRef.current?.focus()
      inputRef.current?.select()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // New results start at their top. Not on arrival: coming Back to the search
  // returns to where it was left (lib/routeScrollMemory.ts).
  const facetKey = searchParamsFromState({ query: '', tab: 'all', facets }).toString()
  const arrived = useRef(false)
  useEffect(() => {
    if (!arrived.current) { arrived.current = true; return }
    window.scrollTo(0, 0)
  }, [query, tab, facetKey])

  // What the reader searched for lately, offered before anything is typed.
  const [recent, setRecent] = useState<string[]>(loadRecentSearches)
  const remember = useCallback(() => {
    setRecent(prev => {
      const next = withRecentSearch(prev, text)
      if (next.join('\n') !== prev.join('\n')) saveRecentSearches(next)
      return next
    })
  }, [text])
  const forget = useCallback(() => { setRecent([]); saveRecentSearches([]) }, [])

  const paged = usePagedList(results.questions, `one-search:${query}:${facetKey}`)
  const pagedConcepts = usePagedList(results.concepts, `one-search-concepts:${query}`)
  const pagedResources = usePagedList(results.resources, `one-search-resources:${query}`)

  // The questions ticked, and the count drawn when none are. Both are this
  // visit's: a tick on a question the filters hide waits for it to come back.
  const [picked, setPicked] = useState<ReadonlySet<string>>(() => new Set())
  const [chosenCount, setChosenCount] = useState<number | null>(null)
  const pickedList = useMemo(() => pickedIds(results.questions, picked), [results.questions, picked])
  const found = results.questions.length
  const count = practiceCount(chosenCount, found)
  const togglePick = useCallback((id: string) => {
    setPicked(prev => {
      const next = new Set(prev)
      if (!next.delete(id)) next.add(id)
      return next
    })
  }, [])

  // The questions' own tab always ends in it; elsewhere it comes up once a question is ticked.
  const showPractice = !questionsLoading && (tab === 'questions' ? count > 0 || pickedList.length > 0 : tab === 'all' && pickedList.length > 0)
  const practiceBarRef = useRef<HTMLDivElement>(null)
  useActionBarHeight(practiceBarRef, showPractice)

  function startPractice(ids: readonly string[]) {
    if (ids.length === 0) return
    remember()
    storeSelectedIds(ids)
    const url = new URL(
      quizLaunchUrl(
        { kind: 'plan', count: ids.length },
        {
          mode: 'quiz',
          reveal: quizSettings.reveal,
          links: quizSettings.conceptLinks ? '1' : '0',
          timed: quizSettings.timed,
        },
      ),
      window.location.origin,
    )
    // Quitting the quiz comes back here, to this query.
    url.searchParams.set('from', 'search')
    navigate(`${url.pathname}${url.search}`)
  }

  const conceptRow = (c: ConceptResult) => (
    <ConceptRow key={c.item.path} result={c} query={query} level={levelOf(c.item.name)} />
  )
  const resourceRow = (r: ResourceResult) => <ResourceRow key={r.item.path} result={r} query={query} />
  const questionRow = (r: QuestionResult) => (
    <QuestionRow
      key={r.question.id}
      result={r}
      query={query}
      dot={tracked ? attemptDot(attempts.get(r.question.id)) : null}
      picked={picked.has(r.question.id)}
      onTogglePick={togglePick}
    />
  )

  const exams = previewOf(results.exams, ALL_TAB_PREVIEW.exams)
  const concepts = previewOf(results.concepts, ALL_TAB_PREVIEW.concepts)
  const resources = previewOf(results.resources, ALL_TAB_PREVIEW.resources)
  const questionsPreview = previewOf(results.questions, ALL_TAB_PREVIEW.questions)

  const nothing = (kind: string) => (
    <p className="py-6 text-[16px]">
      {hasQuery ? `No ${kind} match “${query.trim()}”.` : `Type a word to search ${kind}.`}
    </p>
  )

  return (
    <div
      className={cn(GROUND, 'min-h-screen')}
      onKeyDown={e => handleResultKeys(e, inputRef.current, { enterOpens: tab !== 'questions', onEnter: remember })}
    >
      <div className={cn('mx-auto w-full max-w-xl px-5', showPractice ? 'pb-36' : 'pb-16')}>
        {/* The field and the tabs stay in reach however far the results run. */}
        <div className="sticky top-0 z-30 -mx-5 bg-ground px-5 pb-2 pt-3">
          <div className="flex items-center gap-2">
            <PracticeBack />
            <label className="flex h-12 min-w-0 flex-1 items-center gap-2.5 rounded-full border-[1.5px] border-foreground pl-4 pr-1.5 focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-ground">
              <SearchIcon className="h-[18px] w-[18px] shrink-0" strokeWidth={2.2} aria-hidden="true" />
              <input
                ref={inputRef}
                type="search"
                aria-label="Search"
                placeholder="Search"
                value={text}
                onChange={e => setText(e.target.value)}
                enterKeyHint="search"
                autoComplete="off"
                spellCheck={false}
                className="h-full w-0 min-w-0 flex-1 bg-transparent text-[17px] text-foreground outline-none placeholder:text-foreground/60 [&::-webkit-search-cancel-button]:hidden"
              />
              {text && (
                <button
                  type="button"
                  aria-label="Clear"
                  onClick={() => { update({ query: '' }); inputRef.current?.focus() }}
                  className={cn('flex h-10 w-10 shrink-0 items-center justify-center rounded-full', ROW_FOCUS)}
                >
                  <X className="h-4 w-4" strokeWidth={2.5} aria-hidden="true" />
                </button>
              )}
            </label>
          </div>

          <div role="tablist" aria-label="Show" className="-mx-5 mt-3.5 flex gap-1 overflow-x-auto px-5 py-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {SEARCH_TABS.map(t => {
              const on = t.value === tab
              // A count says what the query found; with no query only Questions has one.
              const count = hasQuery || t.value === 'questions' ? counts[t.value] : null
              return (
                <button
                  key={t.value}
                  type="button"
                  role="tab"
                  id={`search-tab-${t.value}`}
                  aria-selected={on}
                  aria-label={count !== null && !loading ? `${t.label} ${count}` : t.label}
                  aria-controls="search-results"
                  data-sound="tick"
                  onClick={() => update({ tab: t.value })}
                  className={cn(
                    'flex h-[38px] flex-auto items-center justify-center gap-1 whitespace-nowrap rounded-full border-[1.5px] border-foreground px-1.5 text-[13px] font-bold tracking-tight transition-colors',
                    on ? 'bg-foreground text-ground' : 'text-foreground hover:bg-foreground/10',
                    ROW_FOCUS,
                  )}
                >
                  {t.label}
                  {count !== null && !loading && <span className="font-medium tabular-nums">{count}</span>}
                </button>
              )
            })}
          </div>
        </div>

        <div
          id="search-results"
          role="tabpanel"
          aria-labelledby={`search-tab-${tab}`}
          className="pt-2.5"
          // A search that led somewhere is one to offer again.
          onClickCapture={e => { if ((e.target as HTMLElement).closest?.('[data-result]')) remember() }}
        >
          {questionsError && tab !== 'concepts' && tab !== 'resources' && (
            <p role="alert" className="pb-4 text-[16px]">{questionsError}</p>
          )}

          {tab === 'all' && !hasQuery && (
            <div className="flex flex-col gap-4 [&>section+section]:border-t [&>section+section]:border-border [&>section+section]:pt-3.5">
              {recent.length > 0 && (
                <section aria-label="Recent searches" className="flex flex-col">
                  <div className="mb-0.5 flex items-center">
                    <h2 className="flex-1 text-[15px] font-bold">Recent searches</h2>
                    <button type="button" onClick={forget} className={cn('h-9 rounded-lg px-1 text-[14px] font-semibold underline underline-offset-2', ROW_FOCUS)}>
                      Clear
                    </button>
                  </div>
                  <ul className="flex flex-col">
                    {recent.map(term => (
                      <li key={term} className={ROW_RULE}>
                        <button
                          type="button"
                          data-result
                          onClick={() => update({ query: term })}
                          className={cn('flex min-h-12 w-full items-center gap-3 rounded-lg py-1.5 text-left', ROW_FOCUS, ROW_SCROLL)}
                        >
                          <History className="h-[18px] w-[18px] shrink-0" strokeWidth={2.2} aria-hidden="true" />
                          <span className="min-w-0 flex-1 truncate text-[16px]">{term}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
              <section aria-label="Browse" className="flex flex-col">
                <h2 className="mb-0.5 text-[15px] font-bold">Browse</h2>
                <ul className="flex flex-col">
                  <li className={ROW_RULE}>
                    <button
                      type="button"
                      data-result
                      onClick={() => update({ tab: 'questions' })}
                      className={cn('flex min-h-12 w-full items-center gap-3 rounded-lg py-1.5 text-left', ROW_FOCUS, ROW_SCROLL)}
                    >
                      <span className="min-w-0 flex-1 text-[16px] font-semibold">
                        {questionsLoading ? 'All questions' : `All ${counts.questions} questions`}
                      </span>
                      <ChevronRight className="h-4 w-4 shrink-0" strokeWidth={2.5} aria-hidden="true" />
                    </button>
                  </li>
                </ul>
              </section>
            </div>
          )}

          {tab === 'all' && hasQuery && (
            loading && counts.all === 0 ? (
              <p className="py-6 text-[16px]" aria-live="polite">Searching…</p>
            ) : counts.all === 0 ? (
              <p className="py-6 text-[16px]">Nothing matches “{query.trim()}”.</p>
            ) : (
              <div className="flex flex-col gap-4 [&>section+section]:border-t [&>section+section]:border-border [&>section+section]:pt-3.5">
                {results.exams.length > 0 && (
                  <Section title="Study guides" more={0} onMore={() => {}}>
                    {exams.shown.map(e => <ExamRow key={e.item.path} result={e} query={query} />)}
                  </Section>
                )}
                {results.concepts.length > 0 && (
                  <Section title="Concepts" more={concepts.more} onMore={() => update({ tab: 'concepts' })}>
                    {concepts.shown.map(conceptRow)}
                  </Section>
                )}
                {results.resources.length > 0 && (
                  <Section title="Resources" more={resources.more} onMore={() => update({ tab: 'resources' })}>
                    {resources.shown.map(resourceRow)}
                  </Section>
                )}
                {results.questions.length > 0 && (
                  <Section title="Questions" more={questionsPreview.more} onMore={() => update({ tab: 'questions' })}>
                    {questionsPreview.shown.map(questionRow)}
                  </Section>
                )}
              </div>
            )
          )}

          {tab === 'concepts' && (
            results.concepts.length === 0
              ? (indexLoading ? <p className="py-6 text-[16px]" aria-live="polite">Searching…</p> : nothing('concepts'))
              : (
                <>
                  <ul className="flex flex-col">{pagedConcepts.shown.map(conceptRow)}</ul>
                  <ShowMore nextSize={pagedConcepts.nextSize} remaining={pagedConcepts.remaining} noun="concepts" onShowMore={pagedConcepts.showMore} />
                </>
              )
          )}

          {tab === 'resources' && (
            results.resources.length === 0
              ? (indexLoading ? <p className="py-6 text-[16px]" aria-live="polite">Searching…</p> : nothing('resources'))
              : (
                <>
                  <ul className="flex flex-col">{pagedResources.shown.map(resourceRow)}</ul>
                  <ShowMore nextSize={pagedResources.nextSize} remaining={pagedResources.remaining} noun="resources" onShowMore={pagedResources.showMore} />
                </>
              )
          )}

          {tab === 'questions' && (
            <>
              <div className="pb-2">
                <QuestionFilterBar
                  pool={questionPool}
                  selection={facets}
                  onToggle={(facet, value) => update({ facets: toggleFacet(facets, facet, value) })}
                  facets={facets.concept.size > 0 ? QUESTION_FACETS_WITH_CONCEPT : QUESTION_FACETS_SHOWN}
                />
              </div>
              {questionsLoading ? (
                <p className="py-6 text-[16px]" aria-live="polite">Loading the questions…</p>
              ) : results.questions.length === 0 ? (
                <p className="py-6 text-[16px]">
                  {hasQuery ? `No questions match “${query.trim()}” with these filters.` : 'No questions match these filters.'}
                </p>
              ) : (
                <>
                  <ul className="flex flex-col">{paged.shown.map(questionRow)}</ul>
                  <ShowMore auto nextSize={paged.nextSize} remaining={paged.remaining} noun="questions" onShowMore={paged.showMore} />
                </>
              )}
            </>
          )}
        </div>
      </div>

      {showPractice && (
        <div
          ref={practiceBarRef}
          className="fixed bottom-0 left-0 right-0 z-40 bg-ground px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-3 lg:left-[var(--sidebar-width)]"
        >
          <div className="mx-auto flex w-full max-w-xl items-center gap-2.5" data-testid="search-practice">
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
                  <PracticeCount
                    count={count}
                    most={Math.min(found, PRACTICE_LIMIT)}
                    onChange={setChosenCount}
                  />
                )}
                <Button size="main" data-sound="begin" onClick={() => startPractice(drawIds(results.questions, count))} className="min-w-0 flex-1 rounded-full">
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
        </div>
      )}

      <ConceptPopup />
    </div>
  )
}

/** One kind's results under All: a heading, its first rows, and a row for the rest. */
function Section({
  title,
  more,
  onMore,
  children,
}: {
  title: string
  more: number
  onMore: () => void
  children: ReactNode
}) {
  return (
    <section aria-label={title} className="flex flex-col">
      <h2 className="mb-0.5 text-[15px] font-bold">{title}</h2>
      <ul className="flex flex-col">{children}</ul>
      {more > 0 && (
        <button
          type="button"
          onClick={onMore}
          className={cn('flex h-11 items-center gap-2.5 rounded-lg text-left text-[15px] font-semibold', ROW_FOCUS)}
        >
          <span className="flex-1">{more} more</span>
          <ChevronRight className="h-4 w-4 shrink-0" strokeWidth={2.5} aria-hidden="true" />
        </button>
      )}
    </section>
  )
}

/**
 * A concept among the results. It opens on its exam's study guide, where the
 * page scrolls to it, lights its pill and opens it in the reader
 * (pages/wiki/WikiExam.tsx, `?concept=`); a concept on no syllabus opens on
 * its own page.
 */
function ConceptRow({ result, query, level }: { result: ConceptResult; query: string; level: MasteryState }) {
  const place = conceptPlaceLine(result)
  const ref = pathToEntryRef(result.item.path) ?? { kind: 'concept' as const, name: result.item.name }
  const href = result.place
    ? `${wikiRoute({ kind: 'exam', name: result.place.examFile })}?concept=${encodeURIComponent(result.item.name)}`
    : wikiRoute(ref)
  return (
    <li className={ROW_RULE}>
      <Link
        to={href}
        state={FROM_SEARCH}
        data-result
        className={cn('flex min-h-14 items-center gap-3 rounded-lg py-1.5', ROW_FOCUS, ROW_SCROLL)}
      >
        <LevelSquare state={level} size="sm" />
        <span className="flex min-w-0 flex-1 flex-col">
          <span className="text-[16px] font-semibold leading-snug">
            {highlightMatch(result.item.title ?? result.item.name, query, INK_MARK)}
          </span>
          {place && <span className="truncate text-[14px] leading-snug">{place}</span>}
        </span>
        <ChevronRight className="h-4 w-4 shrink-0" strokeWidth={2.5} aria-hidden="true" />
      </Link>
    </li>
  )
}

/** An exam's study guide, found by the exam's name. */
function ExamRow({ result, query }: { result: ExamResult; query: string }) {
  const { item } = result
  return (
    <li className={ROW_RULE}>
      <Link
        to={wikiRoute({ kind: 'exam', name: item.name })}
        state={FROM_SEARCH}
        data-result
        className={cn('flex min-h-14 items-center gap-3 rounded-lg py-1.5', ROW_FOCUS, ROW_SCROLL)}
      >
        <GraduationCap className="h-[18px] w-[18px] shrink-0" strokeWidth={2.2} aria-hidden="true" />
        <span className="min-w-0 flex-1 text-[16px] font-semibold leading-snug">
          {highlightMatch(item.title ?? item.name, query, INK_MARK)}
        </span>
        <ChevronRight className="h-4 w-4 shrink-0" strokeWidth={2.5} aria-hidden="true" />
      </Link>
    </li>
  )
}

function ResourceRow({ result, query }: { result: ResourceResult; query: string }) {
  const { item } = result
  const ref = pathToEntryRef(item.path) ?? { kind: 'resource' as const, name: item.name }
  const meta = resourceMetaLine(result)
  return (
    <li className={ROW_RULE}>
      <Link to={wikiRoute(ref)} state={FROM_SEARCH} data-result className={cn('flex min-h-16 items-center gap-3 rounded-lg py-2', ROW_FOCUS, ROW_SCROLL)}>
        {item.coverImage ? (
          <img
            src={item.coverImage}
            alt=""
            loading="lazy"
            className="h-11 w-8 shrink-0 rounded-[4px] border border-border object-cover"
          />
        ) : (
          <span aria-hidden="true" className="h-11 w-8 shrink-0 rounded-[4px] border-[1.5px] border-foreground" />
        )}
        <span className="flex min-w-0 flex-1 flex-col">
          <span className="text-[16px] font-semibold leading-snug">
            {highlightMatch(item.title ?? item.name, query, INK_MARK)}
          </span>
          {meta && <span className="truncate text-[14px] leading-snug">{highlightMatch(meta, query, INK_MARK)}</span>}
        </span>
        <ChevronRight className="h-4 w-4 shrink-0" strokeWidth={2.5} aria-hidden="true" />
      </Link>
    </li>
  )
}
