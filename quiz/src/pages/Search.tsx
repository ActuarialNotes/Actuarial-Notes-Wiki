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
import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { ChevronRight, Minus, Play, Plus, Search as SearchIcon, X } from 'lucide-react'
import { AnswerDot } from '@/components/AnswerDot'
import { LevelSquare } from '@/components/LevelSquare'
import { MarkdownText } from '@/components/MarkdownText'
import { PracticeBack } from '@/components/practice/PracticeHeader'
import { QuestionFilterBar } from '@/components/QuestionFilterBar'
import { QuestionInfoButton } from '@/components/QuestionInfoButton'
import { INK_MARK, highlightMatch } from '@/components/SearchHighlight'
import { ShowMore } from '@/components/ShowMore'
import { Button } from '@/components/ui/button'
import { TickBox } from '@/components/ui/TickBox'
import { GROUND } from '@/components/ui/OutlineCard'
import { ConceptPopup } from '@/components/wiki/ConceptPopup'
import { useActionBarHeight } from '@/hooks/useActionBarHeight'
import { useAllQuestions } from '@/hooks/useAllQuestions'
import { useConceptLevels } from '@/hooks/useConceptLevels'
import { useConceptPopup } from '@/hooks/useConceptPopup'
import { usePagedList } from '@/hooks/usePagedList'
import { useQuestionAttempts } from '@/hooks/useQuestionAttempts'
import { useQuizBuilderSettings } from '@/hooks/useQuizBuilderSettings'
import { useSearchTracking } from '@/hooks/useSearchTracking'
import { useExamInFocus } from '@/hooks/useExamInFocus'
import { useWikiSyllabus } from '@/hooks/useWikiSyllabus'
import { bankLabelFor } from '@/lib/examIds'
import {
  ALL_TAB_PREVIEW,
  ATTEMPT_DOT_LABEL,
  PRACTICE_LIMIT,
  SEARCH_TABS,
  attemptDot,
  conceptPlaceLine,
  drawIds,
  pickedIds,
  practiceCount,
  previewOf,
  questionMetaLine,
  resourceMetaLine,
  runSearch,
  searchParamsFromState,
  searchStateFromParams,
  tabCounts,
  type ConceptResult,
  type QuestionResult,
  type ResourceResult,
  type SearchFocus,
  type SearchState,
} from '@/lib/oneSearch'
import type { MasteryState } from '@/lib/mastery'
import { toggleFacet, type QuestionFacet } from '@/lib/questionFilters'
import { questionPreview } from '@/lib/questionPreview'
import { quizLaunchUrl, storeSelectedIds } from '@/lib/quizBuilder'
import { cn } from '@/lib/utils'
import { installWikiBundle } from '@/lib/wikiBundle'
import { buildWikiIndex, type WikiIndexItem } from '@/lib/wikiIndex'
import { FROM_SEARCH, examDisplayName, pathToEntryRef, wikiRoute, type WikiEntryRef } from '@/lib/wikiRoutes'

/** The filters the Questions tab offers. Results span exams, so Exam is one of them. */
const QUESTION_FACETS_SHOWN: readonly QuestionFacet[] = ['difficulty', 'type', 'source', 'exam', 'sitting']
const QUESTION_FACETS_WITH_CONCEPT: readonly QuestionFacet[] = ['difficulty', 'type', 'concept', 'source', 'exam', 'sitting']

const ROW_FOCUS = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-ground'
/** A row shows two lines of a question, so the preview is cut to about that much. */
const PREVIEW_CHARS = 72
/** Rows parted by hairlines, the first with none above it. */
const ROW_RULE = 'border-t border-border first:border-t-0'

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

export default function Search() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const state = useMemo(() => searchStateFromParams(searchParams), [searchParams])
  const { query, tab, facets } = state
  useSearchTracking(query)

  // A change of query, tab or filter rewrites this entry: Back leaves the search.
  const update = useCallback((next: Partial<SearchState>) => {
    setSearchParams(searchParamsFromState({ ...state, ...next }), { replace: true })
  }, [state, setSearchParams])

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

  const results = useMemo(
    () => runSearch({ query, index, questions, syllabi, focus, facets }),
    [query, index, questions, syllabi, focus, facets],
  )
  // The pool the filters count their options over: the query's questions, unfiltered.
  const questionPool = useMemo(
    () => runSearch({ query, index: [], questions, syllabi: [], focus: null }).questions.map(r => r.question),
    [query, questions],
  )
  const counts = tabCounts(results)
  const hasQuery = query.trim() !== ''
  const loading = questionsLoading || indexLoading

  const inputRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    if (!hasQuery) inputRef.current?.focus()
    // Only on arrival: the field is not taken back while the reader works the tabs.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // A concept opens in the reader, which walks the concepts found.
  const openAt = useConceptPopup(s => s.openAt)
  const conceptRefs = useMemo<WikiEntryRef[]>(
    () => results.concepts.map(c => pathToEntryRef(c.item.path) ?? { kind: 'concept', name: c.item.name }),
    [results.concepts],
  )
  const openConcept = useCallback((i: number) => openAt(conceptRefs, i), [openAt, conceptRefs])

  const paged = usePagedList(
    results.questions,
    `one-search:${query}:${searchParamsFromState({ ...state, query: '', tab: 'all' }).toString()}`,
  )

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

  const showPractice = tab === 'questions' && !questionsLoading && (count > 0 || pickedList.length > 0)
  const practiceBarRef = useRef<HTMLDivElement>(null)
  useActionBarHeight(practiceBarRef, showPractice)

  function startPractice(ids: readonly string[]) {
    if (ids.length === 0) return
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

  const conceptRow = (c: ConceptResult, i: number) => (
    <ConceptRow
      key={c.item.path}
      result={c}
      query={query}
      level={levelOf(c.item.name)}
      href={wikiRoute(conceptRefs[i]!)}
      onOpen={() => openConcept(i)}
    />
  )
  const resourceRow = (r: ResourceResult) => <ResourceRow key={r.item.path} result={r} query={query} />
  const questionRow = (r: QuestionResult) => (
    <QuestionRow
      key={r.question.id}
      result={r}
      query={query}
      dot={tracked ? attemptDot(attempts.get(r.question.id)) : null}
      picked={tab === 'questions' ? picked.has(r.question.id) : undefined}
      onTogglePick={togglePick}
    />
  )

  const concepts = previewOf(results.concepts, ALL_TAB_PREVIEW.concepts)
  const resources = previewOf(results.resources, ALL_TAB_PREVIEW.resources)
  const questionsPreview = previewOf(results.questions, ALL_TAB_PREVIEW.questions)

  const nothing = (kind: string) => (
    <p className="py-6 text-[16px]">
      {hasQuery ? `No ${kind} match “${query.trim()}”.` : `Type a word to search ${kind}.`}
    </p>
  )

  return (
    <div className={cn(GROUND, 'min-h-screen')}>
      <div className={cn('mx-auto w-full max-w-xl px-5 pt-3', showPractice ? 'pb-36' : 'pb-16')}>
        <div className="flex items-center gap-2">
          <PracticeBack />
          <label className="flex h-12 min-w-0 flex-1 items-center gap-2.5 rounded-full border-[1.5px] border-foreground pl-4 pr-1.5 focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-ground">
            <SearchIcon className="h-[18px] w-[18px] shrink-0" strokeWidth={2.2} aria-hidden="true" />
            <input
              ref={inputRef}
              type="search"
              aria-label="Search"
              placeholder="Search"
              value={query}
              onChange={e => update({ query: e.target.value })}
              enterKeyHint="search"
              autoComplete="off"
              spellCheck={false}
              className="h-full w-0 min-w-0 flex-1 bg-transparent text-[17px] text-foreground outline-none placeholder:text-foreground/60 [&::-webkit-search-cancel-button]:hidden"
            />
            {query && (
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

        <div id="search-results" role="tabpanel" aria-labelledby={`search-tab-${tab}`} className="pt-[18px]">
          {questionsError && tab !== 'concepts' && tab !== 'resources' && (
            <p role="alert" className="pb-4 text-[16px]">{questionsError}</p>
          )}

          {tab === 'all' && hasQuery && (
            loading && counts.all === 0 ? (
              <p className="py-6 text-[16px]" aria-live="polite">Searching…</p>
            ) : counts.all === 0 ? (
              <p className="py-6 text-[16px]">Nothing matches “{query.trim()}”.</p>
            ) : (
              <div className="flex flex-col gap-4 [&>section+section]:border-t [&>section+section]:border-border [&>section+section]:pt-3.5">
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
              : <ul className="flex flex-col">{results.concepts.map(conceptRow)}</ul>
          )}

          {tab === 'resources' && (
            results.resources.length === 0
              ? (indexLoading ? <p className="py-6 text-[16px]" aria-live="polite">Searching…</p> : nothing('resources'))
              : <ul className="flex flex-col">{results.resources.map(resourceRow)}</ul>
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
                  <ShowMore nextSize={paged.nextSize} remaining={paged.remaining} noun="questions" onShowMore={paged.showMore} />
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
                      : count === found ? `Practice all ${count}` : `Practice ${count} at random`}
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

/** How many questions to draw: a minus, the count and a plus, as one outlined pill. */
function PracticeCount({ count, most, onChange }: { count: number; most: number; onChange: (next: number) => void }) {
  const step = cn(
    'flex h-full w-11 items-center justify-center transition-colors enabled:hover:bg-foreground/10 disabled:opacity-40',
    ROW_FOCUS,
  )
  return (
    <div role="group" aria-label="How many questions" className="flex h-[58px] shrink-0 items-center overflow-hidden rounded-full border-[1.5px] border-foreground">
      <button type="button" aria-label="One question fewer" disabled={count <= 1} onClick={() => onChange(count - 1)} className={cn(step, 'rounded-l-full')}>
        <Minus className="h-5 w-5" strokeWidth={2.5} aria-hidden="true" />
      </button>
      <span aria-live="polite" aria-label={`${count} questions`} className="min-w-[2.5ch] text-center text-[17px] font-bold tabular-nums">
        {count}
      </span>
      <button type="button" aria-label="One question more" disabled={count >= most} onClick={() => onChange(count + 1)} className={cn(step, 'rounded-r-full')}>
        <Plus className="h-5 w-5" strokeWidth={2.5} aria-hidden="true" />
      </button>
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

function ConceptRow({
  result,
  query,
  level,
  href,
  onOpen,
}: {
  result: ConceptResult
  query: string
  level: MasteryState
  href: string
  onOpen: () => void
}) {
  const place = conceptPlaceLine(result)
  return (
    <li className={ROW_RULE}>
      <Link
        to={href}
        // A plain click opens the concept in the reader; a modified one keeps the link.
        onClick={e => {
          if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
          e.preventDefault()
          onOpen()
        }}
        className={cn('flex min-h-14 items-center gap-3 rounded-lg py-1.5', ROW_FOCUS)}
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

function ResourceRow({ result, query }: { result: ResourceResult; query: string }) {
  const { item } = result
  const ref = pathToEntryRef(item.path) ?? { kind: 'resource' as const, name: item.name }
  const meta = resourceMetaLine(result)
  return (
    <li className={ROW_RULE}>
      <Link to={wikiRoute(ref)} state={FROM_SEARCH} className={cn('flex min-h-16 items-center gap-3 rounded-lg py-2', ROW_FOCUS)}>
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

/** Two lines of the question, with the match marked (lib/questionPreview.ts). */
function Preview({ result, query }: { result: QuestionResult; query: string }) {
  const text = questionPreview(result.question, query, PREVIEW_CHARS) || result.question.id
  const q = query.trim()
  const idx = q ? text.toLowerCase().indexOf(q.toLowerCase()) : -1
  if (idx < 0) return <MarkdownText inline>{text}</MarkdownText>
  const before = text.slice(0, idx)
  const after = text.slice(idx + q.length)
  // The renderer drops a piece's outer spaces, so the ones beside the mark are written here.
  return (
    <>
      {before.trim() && <MarkdownText inline>{before}</MarkdownText>}
      {/\s$/.test(before) && ' '}
      <mark className={INK_MARK}>{text.slice(idx, idx + q.length)}</mark>
      {/^\s/.test(after) && ' '}
      {after.trim() && <MarkdownText inline>{after}</MarkdownText>}
    </>
  )
}

function QuestionRow({
  result,
  query,
  dot,
  picked,
  onTogglePick,
}: {
  result: QuestionResult
  query: string
  /** The reader's record on it; null when there is no record to read (signed out). */
  dot: ReturnType<typeof attemptDot> | null
  /** Whether it is ticked for practice; undefined draws no box (All's preview). */
  picked?: boolean
  onTogglePick?: (id: string) => void
}) {
  const [infoOpen, setInfoOpen] = useState(false)
  const { question } = result
  return (
    <li className={cn(ROW_RULE, 'flex items-start gap-1')} data-testid="search-question">
      {picked !== undefined && onTogglePick && (
        <button
          type="button"
          role="checkbox"
          aria-checked={picked}
          aria-label={`Pick for practice: ${questionMetaLine(result)}`}
          data-sound="tick"
          onClick={() => onTogglePick(question.id)}
          className={cn('-ml-1 flex shrink-0 items-start rounded-lg py-3 pl-1 pr-2', ROW_FOCUS)}
        >
          <TickBox state={picked ? 'all' : 'none'} className="mt-0.5" />
        </button>
      )}
      <Link
        to={`/wiki/question/${encodeURIComponent(question.id)}`}
        className={cn('flex min-w-0 flex-1 items-start gap-3 rounded-lg py-3', ROW_FOCUS)}
      >
        {dot === 'untried' ? (
          <span
            role="img"
            aria-label={ATTEMPT_DOT_LABEL.untried}
            className="mt-[7px] box-border h-2.5 w-2.5 shrink-0 rounded-full border-[1.5px] border-foreground"
          />
        ) : dot ? (
          <span role="img" aria-label={ATTEMPT_DOT_LABEL[dot]} className="mt-[7px] flex shrink-0">
            <AnswerDot state={dot} decorative />
          </span>
        ) : null}
        <span className="flex min-w-0 flex-1 flex-col gap-[3px]">
          <span className="line-clamp-2 text-[16px] leading-[1.45]"><Preview result={result} query={query} /></span>
          <span className="truncate text-[14px]">{questionMetaLine(result)}</span>
        </span>
      </Link>
      <QuestionInfoButton
        question={question}
        open={infoOpen}
        onOpenChange={setInfoOpen}
        className="mt-1 shrink-0 text-foreground"
      />
    </li>
  )
}
