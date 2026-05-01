import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { BookMarked, FileText, GraduationCap, Search, X } from 'lucide-react'
import { buildWikiIndex, type WikiIndexItem } from '@/lib/wikiIndex'
import { fromSlug, wikiRoute, type WikiEntryRef } from '@/lib/wikiRoutes'
import { useWikiSyllabus } from '@/hooks/useWikiSyllabus'
import { useConceptPopup } from '@/hooks/useConceptPopup'

type Scope = 'page' | 'all'

// Discriminated union for search result entries.
// Concepts in "Everywhere" scope expand to one entry per referencing exam.
type WikiEntry = { type: 'wiki'; item: WikiIndexItem }
type ConceptExamEntry = { type: 'concept-in-exam'; conceptName: string; examLabel: string }
type SearchEntry = WikiEntry | ConceptExamEntry

interface WikiFloatingSearchProps {
  pageRefs: WikiEntryRef[]
}

export function WikiFloatingSearch({ pageRefs }: WikiFloatingSearchProps) {
  const [index, setIndex] = useState<WikiIndexItem[]>([])
  const [query, setQuery] = useState('')
  const [scope, setScope] = useState<Scope>('page')
  const [active, setActive] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const location = useLocation()
  const { syllabi } = useWikiSyllabus()
  const openAt = useConceptPopup(s => s.openAt)

  useEffect(() => {
    let cancelled = false
    buildWikiIndex()
      .then(items => { if (!cancelled) setIndex(items) })
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

  // concept name (lowercase) → exam labels that reference it
  const conceptExamMap = useMemo(() => {
    const map = new Map<string, string[]>()
    for (const s of syllabi) {
      for (const t of s.topics) {
        for (const c of t.concepts) {
          const key = c.name.toLowerCase()
          const exams = map.get(key) ?? []
          if (!exams.includes(s.examLabel)) {
            exams.push(s.examLabel)
            map.set(key, exams)
          }
        }
      }
    }
    return map
  }, [syllabi])

  const hasQuery = query.trim().length > 0
  const pageDisabled = pageRefs.length === 0

  const results = useMemo<SearchEntry[]>(() => {
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

    const matched = pool
      .filter(it => {
        const haystack = [it.title, it.name, it.author].filter(Boolean).join(' ').toLowerCase()
        return haystack.includes(q)
      })
      .sort((a, b) => (a.title ?? a.name).localeCompare(b.title ?? b.name))

    if (scope === 'page') {
      return matched.map(item => ({ type: 'wiki', item }))
    }

    // "Everywhere": expand concept items to one entry per referencing exam.
    const entries: SearchEntry[] = []
    for (const item of matched) {
      if (item.category === 'concept') {
        const examLabels = conceptExamMap.get(item.name.toLowerCase())
        if (examLabels && examLabels.length > 0) {
          for (const examLabel of examLabels) {
            entries.push({ type: 'concept-in-exam', conceptName: item.name, examLabel })
          }
        } else {
          // Concept not in any known syllabus — link directly to concept page.
          entries.push({ type: 'wiki', item })
        }
      } else {
        entries.push({ type: 'wiki', item })
      }
    }

    return entries.slice(0, 50)
  }, [index, query, scope, pageRefs, conceptExamMap])

  // For "This Page" scope on an exam page, intercept concept clicks to open
  // the concept in the popup instead of navigating to the concept page.
  function handlePageConceptClick(conceptName: string, e: React.MouseEvent<HTMLAnchorElement>) {
    const match = location.pathname.match(/^\/wiki\/exam\/(.+)$/)
    if (!match) return
    e.preventDefault()
    const examFileName = fromSlug(match[1])
    const conceptPageRefs = pageRefs
      .filter(r => r.kind === 'concept')
      .filter(r => !/ \([^)]*\d{4}\)$/.test(r.name))
    const idx = conceptPageRefs.findIndex(r => r.name.toLowerCase() === conceptName.toLowerCase())
    openAt(
      conceptPageRefs.length > 0 ? conceptPageRefs : [{ kind: 'concept', name: conceptName }],
      idx >= 0 ? idx : 0,
      `${examFileName}.md`,
    )
    dismiss()
  }

  const isExpanded = active && hasQuery

  return (
    <>
      {/* Backdrop blur overlay: below search header (z-40), above page content.
          Starts at top-14 on mobile to sit below the fixed global nav bar. */}
      {isExpanded && (
        <div
          className="fixed inset-x-0 bottom-0 top-14 lg:top-0 z-40 bg-background/60 backdrop-blur-sm"
          onMouseDown={e => { e.preventDefault(); dismiss() }}
        />
      )}

      {/* Floating search header — sticky below mobile nav (top-14), at viewport top on desktop */}
      <div
        ref={containerRef}
        className="sticky top-14 lg:top-0 z-50 border-b bg-background/90 backdrop-blur-md"
      >
        {/* Input row — h-14 matches the global sidebar header height */}
        <div className="h-14 flex items-center max-w-4xl mx-auto px-4 sm:px-6 gap-3">
          <div className="flex-1 flex items-center gap-2 rounded-md bg-muted/40 px-3 h-9">
            <Search className="h-4 w-4 text-muted-foreground shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              onFocus={() => setActive(true)}
              className="flex-1 min-w-0 bg-transparent border-0 focus:outline-none text-foreground"
              // font-size ≥ 16px prevents iOS from zooming in on focus
              style={{ fontSize: '16px' }}
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
        </div>

        {/* Scope toggle + results — only rendered when the user has typed something */}
        {isExpanded && (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 border-t pb-3">
            <div className="flex gap-1.5 py-2.5">
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

            <ul className="space-y-0.5 max-h-[60vh] overflow-y-auto">
              {results.length === 0 ? (
                <li className="text-xs text-muted-foreground px-2 py-2">No matches.</li>
              ) : (
                results.map((entry, i) =>
                  entry.type === 'concept-in-exam' ? (
                    <li key={`${entry.examLabel}:${entry.conceptName}:${i}`}>
                      <ConceptExamRow
                        conceptName={entry.conceptName}
                        examLabel={entry.examLabel}
                        query={query}
                        onSelect={dismiss}
                      />
                    </li>
                  ) : (
                    <li key={`${entry.item.category}:${entry.item.path}`}>
                      <WikiResultRow
                        item={entry.item}
                        query={query}
                        onSelect={dismiss}
                        onConceptClick={
                          scope === 'page' && entry.item.category === 'concept'
                            ? handlePageConceptClick
                            : undefined
                        }
                      />
                    </li>
                  )
                )
              )}
            </ul>
          </div>
        )}
      </div>
    </>
  )
}

// Result row for a concept expanded to a specific exam context ("Everywhere" scope).
// Clicking navigates to the exam page and triggers the concept popup via ?openConcept.
function ConceptExamRow({
  conceptName,
  examLabel,
  query,
  onSelect,
}: {
  conceptName: string
  examLabel: string
  query: string
  onSelect: () => void
}) {
  const route = `${wikiRoute({ kind: 'exam', name: examLabel })}?openConcept=${encodeURIComponent(conceptName)}`

  return (
    <Link
      to={route}
      onClick={onSelect}
      className="flex items-start gap-2 rounded-md px-2 py-1.5 hover:bg-accent/60 transition-colors"
    >
      <FileText className="h-4 w-4 shrink-0 mt-0.5 text-violet-500" />
      <div className="min-w-0 flex-1">
        <div className="text-sm truncate">{highlight(conceptName, query)}</div>
        <div className="text-[11px] text-muted-foreground truncate">{examLabel}</div>
      </div>
    </Link>
  )
}

// Generic result row for exams, resources, and concepts in "This Page" scope.
function WikiResultRow({
  item,
  query,
  onSelect,
  onConceptClick,
}: {
  item: WikiIndexItem
  query: string
  onSelect: () => void
  onConceptClick?: (conceptName: string, e: React.MouseEvent<HTMLAnchorElement>) => void
}) {
  const ref = { kind: item.category === 'document' ? 'resource' as const : item.category === 'exam' ? 'exam' as const : 'concept' as const, name: item.name }
  const route = wikiRoute(ref)
  const Icon =
    item.category === 'exam' ? GraduationCap :
    item.category === 'concept' ? FileText :
    BookMarked
  const iconColor =
    item.category === 'exam' ? 'text-teal-500' :
    item.category === 'concept' ? 'text-violet-500' :
    'text-muted-foreground'
  const display = item.title ?? item.name

  return (
    <Link
      to={route}
      onClick={e => {
        if (onConceptClick) onConceptClick(item.name, e)
        else onSelect()
      }}
      className="flex items-start gap-2 rounded-md px-2 py-1.5 hover:bg-accent/60 transition-colors"
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
