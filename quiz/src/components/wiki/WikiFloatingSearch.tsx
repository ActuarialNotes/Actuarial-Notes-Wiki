import { PlaceHeader } from '@/components/nav/Places'
import { useIsMobile } from '@/hooks/useIsMobile'
import React, { useDeferredValue, useEffect, useMemo, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { BookMarked, GraduationCap, Play } from 'lucide-react'
import { LevelSquare } from '@/components/LevelSquare'
import { ROW_FOCUS, ROW_RULE } from '@/components/search/QuestionRow'
import { handleResultKeys } from '@/components/search/resultKeys'
import {
  ExamStatusBanner,
  FloatingSearchBar,
  FloatingSearchInput,
  FloatingSearchStrip,
  SearchBackdrop,
  SearchScopePill,
} from '@/components/FloatingSearchBar'
import { INK_MARK, highlightMatch } from '@/components/SearchHighlight'
import { buildWikiIndex, type WikiIndexItem } from '@/lib/wikiIndex'
import { fromSlug, pathToEntryRef, wikiRoute, type WikiEntryRef } from '@/lib/wikiRoutes'
import { findSyllabiForConcept } from '@/lib/conceptMatch'
import { ChooseSyllabusModal } from '@/components/wiki/ChooseSyllabusModal'
import { ConceptQuestionsModal } from '@/components/wiki/ConceptQuestionsModal'
import { useConceptPopup } from '@/hooks/useConceptPopup'
import { useWikiSyllabus } from '@/hooks/useWikiSyllabus'
import { searchBy } from '@/lib/appSearch'
import type { MasteryState } from '@/lib/mastery'
import { loadParsedQuestions } from '@/lib/parsedQuestions'
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock'
import { useConceptLevels } from '@/hooks/useConceptLevels'
import type { WikiExamSyllabus } from '@/lib/wikiParser'
import { cn } from '@/lib/utils'

type Scope = 'page' | 'all'

interface WikiFloatingSearchProps {
  pageRefs: WikiEntryRef[]
  pageTitle?: string | null
  /**
   * Stands in for the title text in the strip — see `setPageIcon` in
   * `WikiLayout`. `pageTitle` is still what the strip is *named*: the icon
   * carries it as its accessible label, and the text comes back if no icon
   * is supplied.
   */
  pageIcon?: React.ReactNode
  pageTitleBadge?: React.ReactNode
  backLink?: React.ReactNode
  isInDevelopment?: boolean
  isBeta?: boolean
}

export function WikiFloatingSearch({ pageRefs, pageTitle, pageIcon, pageTitleBadge, backLink, isInDevelopment, isBeta }: WikiFloatingSearchProps) {
  const [index, setIndex] = useState<WikiIndexItem[]>([])
  const [query, setQuery] = useState('')
  // The reader's own choice of scope; until they make one it is this page, where the page has concepts.
  const [scopeChoice, setScope] = useState<Scope | null>(null)
  const [active, setActive] = useState(false)
  const [chooser, setChooser] = useState<{ conceptName: string; syllabi: WikiExamSyllabus[] } | null>(null)
  const [questionCounts, setQuestionCounts] = useState<Map<string, number> | null>(null)
  const [quizConcept, setQuizConcept] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const location = useLocation()
  const navigate = useNavigate()
  const { openAt } = useConceptPopup()
  const { syllabi } = useWikiSyllabus()
  // Below lg the page opens on the app's top row (the exam, the profile button)
  // with the search as a pill on the line under it, as on Practice; the strip's
  // exam and way back move into those two lines. On a wide screen the rail
  // carries the exam and the reader, and the bar keeps its field and strip.
  const phone = useIsMobile(1023)
  const { levelOf } = useConceptLevels()

  useEffect(() => {
    let cancelled = false
    buildWikiIndex()
      .then(items => { if (!cancelled) setIndex(items) })
      .catch(() => {})
    return () => { cancelled = true }
  }, [])

  // Per-concept question counts, so each concept row can say how many
  // questions there are to practise. Counted when the field is first entered,
  // from the bank every search shares: the page itself never waits on it.
  // Keyed by the concept name normalised the same way
  // filterQuestions/linkMatchesConcept resolve a wiki_link's trailing segment
  // (slug hyphens → spaces).
  useEffect(() => {
    if (!active || questionCounts) return
    let cancelled = false
    loadParsedQuestions()
      .then(parsed => {
        if (cancelled) return
        const map = new Map<string, number>()
        for (const q of parsed) {
          const seen = new Set<string>()
          for (const link of q.wiki_link) {
            const clean = link.replace(/\+/g, ' ').replace(/\.md$/i, '')
            const seg = (clean.split('/').filter(Boolean).pop() ?? '')
              .replace(/-/g, ' ').trim().toLowerCase()
            if (!seg || seen.has(seg)) continue
            seen.add(seg)
            map.set(seg, (map.get(seg) ?? 0) + 1)
          }
        }
        setQuestionCounts(map)
      })
      .catch(() => {})
    return () => { cancelled = true }
  }, [active, questionCounts])

  useEffect(() => {
    setQuery('')
    setScope(null)
    setActive(false)
  }, [location.pathname])

  const pageDisabled = pageRefs.length === 0
  const scope: Scope = pageDisabled ? 'all' : scopeChoice ?? 'page'

  const examSourcePath = useMemo(() => {
    const m = location.pathname.match(/^\/wiki\/exam\/(.+)$/)
    return m ? `${fromSlug(m[1])}.md` : null
  }, [location.pathname])

  useEffect(() => {
    if (!active) return
    function handleMouseDown(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        dismiss()
      }
    }
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') dismiss()
    }
    document.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('keydown', handleKey)
    return () => {
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('keydown', handleKey)
    }
  }, [active])

  function dismiss() {
    setQuery('')
    setActive(false)
    inputRef.current?.blur()
  }

  // null while the question bank is still loading; a number once counted.
  function questionCountFor(name: string): number | null {
    if (!questionCounts) return null
    return questionCounts.get(name.trim().toLowerCase()) ?? 0
  }

  function startQuiz(name: string) {
    dismiss()
    setQuizConcept(name)
  }

  const hasQuery = query.trim().length > 0
  // The field is drawn at once; the results follow when the browser has a moment.
  const deferredQuery = useDeferredValue(query)

  // The ranking every search shares (lib/appSearch.ts): a name that starts
  // with the query, then one that holds it, never the alphabet. A query this
  // page has nothing for is answered from everywhere, and says so.
  const { conceptResults, widened } = useMemo(() => {
    const find = (pool: WikiIndexItem[]) =>
      searchBy(pool, deferredQuery, it => [it.title ?? it.name, it.name, it.author], 30, { near: true })
    if (!deferredQuery.trim()) return { conceptResults: [], widened: false }
    if (scope === 'all') return { conceptResults: find(index), widened: false }
    const keys = new Set(pageRefs.map(r => `${r.kind}:${r.name.toLowerCase()}`))
    const here = find(index.filter(it => {
      const kind = it.category === 'document' ? 'resource' : it.category
      return keys.has(`${kind}:${it.name.toLowerCase()}`)
    }))
    if (here.length > 0) return { conceptResults: here, widened: false }
    const everywhere = find(index)
    return { conceptResults: everywhere, widened: everywhere.length > 0 }
  }, [index, deferredQuery, scope, pageRefs])

  const isExpanded = active && hasQuery
  // One thing scrolls while the results are up: the results.
  useBodyScrollLock(isExpanded)
  function handleConceptSelect(ref: WikiEntryRef) {
    dismiss()
    const conceptList = pageRefs
      .filter(r => r.kind === 'concept')
      .filter(r => !/ \([^)]*\d{4}\)$/.test(r.name))
    const idx = conceptList.findIndex(r => r.name.toLowerCase() === ref.name.toLowerCase())

    if (idx >= 0 && conceptList.length > 0) {
      // Concept is on the current exam page — open popup here.
      openAt(conceptList, idx, examSourcePath ?? undefined)
      return
    }

    // Concept is not on the current page — navigate to its exam study guide.
    // If it's taught in more than one exam's syllabus, ask which to open
    // instead of silently picking one.
    const matches = findSyllabiForConcept(syllabi, ref.name)
    if (matches.length > 1) {
      setChooser({ conceptName: ref.name, syllabi: matches })
    } else if (matches.length === 1) {
      const examName = matches[0]!.fileName ?? matches[0]!.examLabel
      navigate(`${wikiRoute({ kind: 'exam', name: examName })}?concept=${encodeURIComponent(ref.name)}`)
    } else {
      // Fallback: open popup in place if we can't find the exam.
      openAt([ref], 0, undefined)
    }
  }

  function goToSyllabus(s: WikiExamSyllabus) {
    if (!chooser) return
    setChooser(null)
    const examName = s.fileName ?? s.examLabel
    navigate(`${wikiRoute({ kind: 'exam', name: examName })}?concept=${encodeURIComponent(chooser.conceptName)}`)
  }

  return (
    <>
      {isExpanded && <SearchBackdrop onDismiss={dismiss} />}

      {phone && <PlaceHeader lead={pageTitle ? pageIcon : undefined} />}

      <FloatingSearchBar
        ref={containerRef}
        className={phone ? 'border-b-0' : undefined}
        banner={
          // Status banner — thin, full-width, hidden while a dropdown is open
          pageTitle && !isExpanded
            ? <ExamStatusBanner status={isInDevelopment ? 'development' : isBeta ? 'beta' : 'ready'} />
            : null
        }
      >
        <div onKeyDown={e => handleResultKeys(e, inputRef.current, { enterOpens: true })}>
          <FloatingSearchInput
            inputRef={inputRef}
            value={query}
            onChange={setQuery}
            onFocus={() => setActive(true)}
            onClear={dismiss}
            placeholder="Search concepts"
            ariaLabel="Search study guides"
            pill={phone}
            leading={phone && pageTitle ? backLink : undefined}
          />

          {pageTitle && !(phone && pageIcon) && (
            <FloatingSearchStrip title={pageTitle} icon={pageIcon} backLink={backLink}>
              {pageTitleBadge && <span className="shrink-0">{pageTitleBadge}</span>}
            </FloatingSearchStrip>
          )}

          {/* Dropdown — only when query is non-empty */}
          {isExpanded && (
            <div className="pb-3">
              {/* Scope pills */}
              <div className="flex flex-wrap gap-1.5 py-2.5">
                <SearchScopePill active={scope === 'page'} disabled={pageDisabled} onClick={() => setScope('page')}>
                  This Page
                </SearchScopePill>
                <SearchScopePill active={scope === 'all'} onClick={() => setScope('all')}>
                  Everywhere
                </SearchScopePill>
              </div>

              {widened && (
                <p className="pb-1.5 text-[14px]">Nothing on this page matches. From everywhere:</p>
              )}

              {/* Results */}
              <ul className="flex max-h-[min(60dvh,32rem)] flex-col overflow-y-auto overscroll-contain">
                {conceptResults.length === 0 ? (
                  <li className="py-3 text-[16px]">Nothing matches “{deferredQuery.trim()}”.</li>
                ) : (
                  conceptResults.map(item => (
                    <li key={`${item.category}:${item.path}`} className={ROW_RULE}>
                      <ConceptResultRow
                        item={item}
                        query={deferredQuery}
                        level={item.category === 'concept' ? levelOf(item.name) : null}
                        onSelect={dismiss}
                        onConceptSelect={handleConceptSelect}
                        questionCount={item.category === 'concept' ? questionCountFor(item.name) : null}
                        onStartQuiz={startQuiz}
                      />
                    </li>
                  ))
                )}
              </ul>
            </div>
          )}
        </div>
      </FloatingSearchBar>

      {chooser && (
        <ChooseSyllabusModal
          conceptName={chooser.conceptName}
          syllabi={chooser.syllabi}
          onChoose={goToSyllabus}
          onClose={() => setChooser(null)}
        />
      )}

      {quizConcept && (
        <ConceptQuestionsModal
          conceptName={quizConcept}
          onClose={() => setQuizConcept(null)}
          onQuizStart={() => setQuizConcept(null)}
        />
      )}
    </>
  )
}

function ConceptResultRow({
  item,
  query,
  level,
  onSelect,
  onConceptSelect,
  questionCount,
  onStartQuiz,
}: {
  item: WikiIndexItem
  query: string
  /** The reader's level on a concept; null for a study guide or a resource. */
  level: MasteryState | null
  onSelect: () => void
  onConceptSelect: (ref: WikiEntryRef) => void
  questionCount: number | null
  onStartQuiz: (name: string) => void
}) {
  const ref = pathToEntryRef(item.path) ?? { kind: 'concept' as const, name: item.name }
  const route = wikiRoute(ref)
  const isConcept = item.category === 'concept'
  const Icon = item.category === 'exam' ? GraduationCap : BookMarked
  const display = item.title ?? item.name
  const meta = [item.author, item.year].filter(Boolean).join(' · ')

  return (
    <div className="flex items-center gap-2">
      <Link
        to={route}
        data-result
        onClick={e => {
          // A modified click keeps the link: the page in a new tab.
          if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
          if (isConcept) {
            e.preventDefault()
            onConceptSelect(ref)
          } else {
            onSelect()
          }
        }}
        className={cn('flex min-h-12 min-w-0 flex-1 scroll-my-2 items-center gap-3 rounded-lg py-1.5', ROW_FOCUS)}
      >
        {level !== null
          ? <LevelSquare state={level} size="sm" />
          : <Icon className="h-[18px] w-[18px] shrink-0" strokeWidth={2.2} aria-hidden />}
        <span className="flex min-w-0 flex-1 flex-col">
          <span className="text-[16px] font-semibold leading-snug">{highlightMatch(display, query, INK_MARK)}</span>
          {meta && <span className="truncate text-[14px] leading-snug">{meta}</span>}
        </span>
      </Link>
      {isConcept && questionCount !== 0 && (
        <button
          type="button"
          data-sound="begin"
          onClick={() => onStartQuiz(item.name)}
          className={cn(
            'inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full border-[1.5px] border-foreground px-3 text-[13px] font-bold transition-colors hover:bg-foreground/10',
            ROW_FOCUS,
          )}
          title={`Practice ${item.name}`}
          aria-label={questionCount != null ? `Practice ${item.name}, ${questionCount} questions` : `Practice ${item.name}`}
        >
          <Play className="h-3 w-3 shrink-0 fill-current" aria-hidden />
          {questionCount != null && questionCount > 0 && <span className="tabular-nums">{questionCount}</span>}
        </button>
      )}
    </div>
  )
}
