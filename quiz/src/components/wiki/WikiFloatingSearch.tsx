import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { BookMarked, FileText, GraduationCap, Play } from 'lucide-react'
import {
  FloatingSearchBar,
  FloatingSearchInput,
  FloatingSearchStrip,
  SearchBackdrop,
  SearchScopePill,
} from '@/components/FloatingSearchBar'
import { highlightMatch } from '@/components/SearchHighlight'
import { buildWikiIndex, type WikiIndexItem } from '@/lib/wikiIndex'
import { fromSlug, pathToEntryRef, wikiRoute, type WikiEntryRef } from '@/lib/wikiRoutes'
import { findSyllabiForConcept } from '@/lib/conceptMatch'
import { ChooseSyllabusModal } from '@/components/wiki/ChooseSyllabusModal'
import { ConceptQuestionsModal } from '@/components/wiki/ConceptQuestionsModal'
import { useConceptPopup } from '@/hooks/useConceptPopup'
import { useWikiSyllabus } from '@/hooks/useWikiSyllabus'
import { fetchAllQuestions } from '@/lib/github'
import { parseAllQuestions } from '@/lib/parser'
import type { WikiExamSyllabus } from '@/lib/wikiParser'

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
  const [scope, setScope] = useState<Scope>('page')
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

  useEffect(() => {
    let cancelled = false
    buildWikiIndex()
      .then(items => { if (!cancelled) setIndex(items) })
      .catch(() => {})
    return () => { cancelled = true }
  }, [])

  // Per-concept question counts, so each concept row can label its "Start Quiz"
  // action with how many questions are available. Keyed by the concept name
  // normalised the same way filterQuestions/linkMatchesConcept resolve a
  // wiki_link's trailing segment (slug hyphens → spaces).
  useEffect(() => {
    let cancelled = false
    fetchAllQuestions()
      .then(raw => {
        if (cancelled) return
        const map = new Map<string, number>()
        for (const q of parseAllQuestions(raw)) {
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
  }, [])

  useEffect(() => {
    setQuery('')
    setScope('page')
    setActive(false)
  }, [location.pathname])

  useEffect(() => {
    if (pageRefs.length === 0 && scope === 'page') setScope('all')
  }, [pageRefs.length, scope])

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
    document.addEventListener('mousedown', handleMouseDown)
    return () => document.removeEventListener('mousedown', handleMouseDown)
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
  const pageDisabled = pageRefs.length === 0

  const conceptResults = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return []

    let pool: WikiIndexItem[]
    if (scope === 'page') {
      const keys = new Set(pageRefs.map(r => `${r.kind}:${r.name.toLowerCase()}`))
      pool = index.filter(it => {
        const kind = it.category === 'document' ? 'resource' : it.category
        return keys.has(`${kind}:${it.name.toLowerCase()}`)
      })
    } else {
      pool = index
    }

    return pool
      .filter(it => {
        const haystack = [it.title, it.name, it.author].filter(Boolean).join(' ').toLowerCase()
        return haystack.includes(q)
      })
      .sort((a, b) => (a.title ?? a.name).localeCompare(b.title ?? b.name))
      .slice(0, 30)
  }, [index, query, scope, pageRefs])

  const isExpanded = active && hasQuery
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

      <FloatingSearchBar
        ref={containerRef}
        banner={
          <>
            {/* Status banner — thin, full-width, hidden while a dropdown is open */}
            {pageTitle && isInDevelopment && !isExpanded && (
              <div className="bg-amber-500/10 py-1.5 text-center text-[11px] font-medium tracking-wide text-amber-600 dark:text-amber-400">
                In Development — syllabus outline only, not yet available to study
              </div>
            )}
            {pageTitle && isBeta && !isExpanded && (
              <div className="bg-emerald-500/10 py-1.5 text-center text-[11px] font-medium tracking-wide text-emerald-600 dark:text-emerald-400">
                Beta
              </div>
            )}
          </>
        }
      >
        <>
          <FloatingSearchInput
            inputRef={inputRef}
            value={query}
            onChange={setQuery}
            onFocus={() => setActive(true)}
            onClear={dismiss}
            placeholder="Search concepts"
            ariaLabel="Search study guides"
            navCollapsed={active}
          />

          {pageTitle && (
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

              {/* Results */}
              <ul className="space-y-0.5 max-h-[50vh] overflow-y-auto">
                {conceptResults.length === 0 ? (
                  <li className="text-xs text-muted-foreground px-2 py-2">No matches.</li>
                ) : (
                  conceptResults.map(item => (
                    <li key={`${item.category}:${item.path}`}>
                      <ConceptResultRow
                        item={item}
                        query={query}
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
        </>
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
  onSelect,
  onConceptSelect,
  questionCount,
  onStartQuiz,
}: {
  item: WikiIndexItem
  query: string
  onSelect: () => void
  onConceptSelect: (ref: WikiEntryRef) => void
  questionCount: number | null
  onStartQuiz: (name: string) => void
}) {
  const ref = pathToEntryRef(item.path) ?? { kind: 'concept' as const, name: item.name }
  const route = wikiRoute(ref)
  const isConcept = item.category === 'concept'
  const Icon =
    item.category === 'exam' ? GraduationCap :
    isConcept ? FileText :
    BookMarked
  const iconColor =
    item.category === 'exam' ? 'text-teal-500' :
    isConcept ? 'text-violet-500' :
    'text-muted-foreground'
  const display = item.title ?? item.name

  return (
    <div className="flex items-center gap-1.5">
      <Link
        to={route}
        onClick={e => {
          if (isConcept) {
            e.preventDefault()
            onConceptSelect(ref)
          } else {
            onSelect()
          }
        }}
        className={`flex items-start gap-2 rounded-md px-2 py-1.5 hover:bg-accent/60 transition-colors min-w-0 ${isConcept ? '' : 'flex-1'}`}
      >
        <Icon className={`h-4 w-4 shrink-0 mt-0.5 ${iconColor}`} />
        <div className="min-w-0 flex-1">
          <div className="text-sm truncate">{highlightMatch(display, query)}</div>
          {(item.author || item.year) && (
            <div className="text-[11px] text-muted-foreground truncate">
              {[item.author, item.year].filter(Boolean).join(' · ')}
            </div>
          )}
        </div>
      </Link>
      {isConcept && (
        <ConceptActions
          name={item.name}
          questionCount={questionCount}
          onStartQuiz={onStartQuiz}
        />
      )}
    </div>
  )
}

// Inline "Start Quiz" action shown beside a concept name in the search
// results. It opens the per-concept question picker,
// labelled with how many questions exist.
function ConceptActions({
  name,
  questionCount,
  onStartQuiz,
}: {
  name: string
  questionCount: number | null
  onStartQuiz: (name: string) => void
}) {
  return (
    <div className="flex items-center gap-1 shrink-0">
      {questionCount !== 0 && (
        <button
          type="button"
          data-sound="begin"
          onClick={e => {
            e.preventDefault()
            e.stopPropagation()
            onStartQuiz(name)
          }}
          className="inline-flex items-center gap-1 rounded-full px-2 py-1 text-[11px] font-medium bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
          title={`Start a quiz on ${name}`}
          aria-label={questionCount != null ? `Start quiz on ${name}, ${questionCount} questions` : `Start quiz on ${name}`}
        >
          <Play className="h-3 w-3 shrink-0" />
          {questionCount != null && questionCount > 0 && (
            <span className="rounded-full bg-primary/20 px-1.5 py-0.5 text-[10px] font-semibold tabular-nums leading-none">
              {questionCount}
            </span>
          )}
        </button>
      )}
    </div>
  )
}
