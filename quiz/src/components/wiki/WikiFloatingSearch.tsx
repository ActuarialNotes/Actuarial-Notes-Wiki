import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { BookMarked, FileText, GraduationCap, ListChecks, Lock, Play, Search, X } from 'lucide-react'
import { buildWikiIndex, type WikiIndexItem } from '@/lib/wikiIndex'
import { fromSlug, pathToEntryRef, wikiRoute, type WikiEntryRef } from '@/lib/wikiRoutes'
import { findSyllabiForConcept } from '@/lib/conceptMatch'
import { ChooseSyllabusModal } from '@/components/wiki/ChooseSyllabusModal'
import { ConceptQuestionsModal } from '@/components/wiki/ConceptQuestionsModal'
import { useConceptPopup } from '@/hooks/useConceptPopup'
import { useWikiSyllabus } from '@/hooks/useWikiSyllabus'
import { useCollect } from '@/hooks/useCollect'
import { useCollectedCards } from '@/hooks/useCollectedCards'
import { useConceptMastery } from '@/hooks/useConceptMastery'
import { decayIfStale } from '@/lib/mastery'
import { fetchAllQuestions } from '@/lib/github'
import { parseAllQuestions } from '@/lib/parser'
import type { WikiExamSyllabus } from '@/lib/wikiParser'
import type { StudyPlanHeaderData } from '@/components/wiki/WikiLayout'

type Scope = 'page' | 'all'

interface WikiFloatingSearchProps {
  pageRefs: WikiEntryRef[]
  pageTitle?: string | null
  pageTitleBadge?: React.ReactNode
  studyPlan?: StudyPlanHeaderData | null
  isInDevelopment?: boolean
  isBeta?: boolean
}

export function WikiFloatingSearch({ pageRefs, pageTitle, pageTitleBadge, studyPlan, isInDevelopment, isBeta }: WikiFloatingSearchProps) {
  const [index, setIndex] = useState<WikiIndexItem[]>([])
  const [query, setQuery] = useState('')
  const [scope, setScope] = useState<Scope>('page')
  const [active, setActive] = useState(false)
  const [showPlan, setShowPlan] = useState(false)
  const [chooser, setChooser] = useState<{ conceptName: string; syllabi: WikiExamSyllabus[] } | null>(null)
  const [questionCounts, setQuestionCounts] = useState<Map<string, number> | null>(null)
  const [quizConcept, setQuizConcept] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const location = useLocation()
  const navigate = useNavigate()
  const { openAt } = useConceptPopup()
  const { syllabi } = useWikiSyllabus()
  const collectedCards = useCollectedCards(s => s.cards)
  const { records: masteryRecords } = useConceptMastery()

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
    setShowPlan(false)
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

  // A concept is unlocked once its flashcard is collected — or, for pre-collect
  // users, once mastery moved past New. Mirrors useIsConceptUnlocked, but
  // resolved from a single mastery/collected read shared across every row.
  function isUnlocked(name: string): boolean {
    const lower = name.toLowerCase()
    if (collectedCards.some(c => c.name.toLowerCase() === lower)) return true
    const record = masteryRecords.find(r => r.concept_slug.toLowerCase() === lower)
    if (!record) return false
    return decayIfStale(record, new Date()).state !== 'new'
  }

  // null while the question bank is still loading; a number once counted.
  function questionCountFor(name: string): number | null {
    if (!questionCounts) return null
    return questionCounts.get(name.trim().toLowerCase()) ?? 0
  }

  function startQuiz(name: string) {
    dismiss()
    setShowPlan(false)
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
  const hasPlan = !!studyPlan && studyPlan.items.length > 0
  const planOpen = showPlan && hasPlan && !isExpanded

  function togglePlan() {
    dismiss()
    setShowPlan(v => !v)
  }

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
      {isExpanded && (
        <div
          className="fixed inset-0 z-40 bg-background/60 backdrop-blur-sm"
          onMouseDown={e => { e.preventDefault(); dismiss() }}
        />
      )}

      {planOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/60 backdrop-blur-sm"
          onMouseDown={e => { e.preventDefault(); setShowPlan(false) }}
        />
      )}

      <div
        ref={containerRef}
        data-floating-search
        className="sticky top-0 md:top-14 lg:top-0 z-50 border-b bg-background/90 backdrop-blur-md"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {/* Input row */}
          <div className="flex items-center gap-2 h-[calc(3.5rem-1px)]">
            <Search className="h-4 w-4 text-muted-foreground shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              onFocus={() => { setActive(true); setShowPlan(false) }}
              className="flex-1 min-w-0 bg-transparent border-0 focus:outline-none text-[16px] sm:text-sm text-foreground placeholder:text-muted-foreground"
              placeholder="Search concepts"
              aria-label="Search study guides"
              autoComplete="off"
              spellCheck={false}
            />
            {query && (
              <button
                type="button"
                onClick={dismiss}
                aria-label="Clear search"
                className="text-muted-foreground hover:text-foreground transition-colors shrink-0"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Exam title strip — same height as search bar */}
          {pageTitle && (
            <div className="flex items-center gap-2.5 h-[calc(3.5rem-1px)]">
              <span className="font-semibold text-sm truncate flex-1 min-w-0">{pageTitle}</span>
              {hasPlan && (
                <button
                  type="button"
                  onClick={togglePlan}
                  aria-expanded={planOpen}
                  aria-label="Today's Study Plan"
                  className={
                    'shrink-0 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-colors ' +
                    (planOpen
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-primary/10 text-primary hover:bg-primary/20')
                  }
                >
                  <ListChecks className="h-4 w-4 shrink-0" />
                  Today's Study Plan
                </button>
              )}
              {pageTitleBadge && <span className="shrink-0">{pageTitleBadge}</span>}
            </div>
          )}

          {/* Study plan dropdown — today's concepts */}
          {planOpen && studyPlan && (
            <div className="pb-3">
              <ul className="space-y-0.5 max-h-[50vh] overflow-y-auto">
                {studyPlan.items.map((item, idx) => (
                  <li key={item.name} className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => { studyPlan.onSelect(idx); setShowPlan(false) }}
                      className="flex items-center gap-2 min-w-0 text-left rounded-md px-2 py-1.5 text-sm hover:bg-accent/60 transition-colors"
                    >
                      <FileText className="h-4 w-4 shrink-0 text-violet-500" />
                      <span className="truncate">{item.name}</span>
                    </button>
                    <ConceptActions
                      name={item.name}
                      unlocked={isUnlocked(item.name)}
                      questionCount={questionCountFor(item.name)}
                      onStartQuiz={startQuiz}
                      onDismiss={() => setShowPlan(false)}
                    />
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Dropdown — only when query is non-empty */}
          {isExpanded && (
            <div className="pb-3">
              {/* Scope pills */}
              <div className="flex flex-wrap gap-1.5 py-2.5">
                <button
                  type="button"
                  onClick={() => setScope('page')}
                  disabled={pageDisabled}
                  className={
                    'px-3 py-1 rounded-full text-xs font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed ' +
                    (scope === 'page'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-accent hover:bg-accent/80 text-foreground')
                  }
                >
                  This Page
                </button>
                <button
                  type="button"
                  onClick={() => setScope('all')}
                  className={
                    'px-3 py-1 rounded-full text-xs font-medium transition-colors ' +
                    (scope === 'all'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-accent hover:bg-accent/80 text-foreground')
                  }
                >
                  Everywhere
                </button>
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
                        unlocked={item.category === 'concept' ? isUnlocked(item.name) : true}
                        questionCount={item.category === 'concept' ? questionCountFor(item.name) : null}
                        onStartQuiz={startQuiz}
                        onDismiss={dismiss}
                      />
                    </li>
                  ))
                )}
              </ul>
            </div>
          )}
        </div>

        {/* Status banner — thin, full-width, hidden while search dropdown is open */}
        {pageTitle && isInDevelopment && !isExpanded && !planOpen && (
          <div className="bg-amber-500/10 py-1.5 text-center text-amber-600 dark:text-amber-400 text-[11px] font-medium tracking-wide">
            In Development
          </div>
        )}
        {pageTitle && isBeta && !isExpanded && !planOpen && (
          <div className="bg-emerald-500/10 py-1.5 text-center text-emerald-600 dark:text-emerald-400 text-[11px] font-medium tracking-wide">
            Beta
          </div>
        )}
      </div>

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
  unlocked,
  questionCount,
  onStartQuiz,
  onDismiss,
}: {
  item: WikiIndexItem
  query: string
  onSelect: () => void
  onConceptSelect: (ref: WikiEntryRef) => void
  unlocked: boolean
  questionCount: number | null
  onStartQuiz: (name: string) => void
  onDismiss: () => void
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
          <div className="text-sm truncate">{highlight(display, query)}</div>
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
          unlocked={unlocked}
          questionCount={questionCount}
          onStartQuiz={onStartQuiz}
          onDismiss={onDismiss}
        />
      )}
    </div>
  )
}

// Inline "Unlock" + "Start Quiz" actions shown beside a concept name in the
// search results and Today's Study Plan lists. Unlock opens the flashcard
// collect flow (hidden once the concept is already unlocked); Start Quiz opens
// the per-concept question picker, labelled with how many questions exist.
function ConceptActions({
  name,
  unlocked,
  questionCount,
  onStartQuiz,
  onDismiss,
}: {
  name: string
  unlocked: boolean
  questionCount: number | null
  onStartQuiz: (name: string) => void
  onDismiss: () => void
}) {
  const openCollect = useCollect(s => s.open)
  return (
    <div className="flex items-center gap-1 shrink-0">
      {!unlocked && (
        <button
          type="button"
          onClick={e => {
            e.preventDefault()
            e.stopPropagation()
            onDismiss()
            openCollect({ kind: 'concept', name })
          }}
          className="inline-flex items-center gap-1 rounded-full px-2 py-1 text-[11px] font-medium bg-accent text-muted-foreground hover:text-foreground hover:bg-accent/80 transition-colors"
          title={`Unlock ${name}`}
          aria-label={`Unlock ${name}`}
        >
          <Lock className="h-3 w-3 shrink-0" />
          Unlock
        </button>
      )}
      {questionCount !== 0 && (
        <button
          type="button"
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
          Start Quiz
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

function highlight(text: string, query: string) {
  const q = query.trim()
  if (!q) return text
  const idx = text.toLowerCase().indexOf(q.toLowerCase())
  if (idx < 0) return text
  return (
    <>
      {text.slice(0, idx)}
      <mark className="bg-primary/20 text-foreground rounded px-0.5">
        {text.slice(idx, idx + q.length)}
      </mark>
      {text.slice(idx + q.length)}
    </>
  )
}
