import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BookMarked, FileText, GraduationCap, Search, X } from 'lucide-react'
import { buildWikiIndex, type WikiIndexItem } from '@/lib/wikiIndex'
import { pathToEntryRef, wikiRoute } from '@/lib/wikiRoutes'
import { filterQuestions } from '@/lib/parser'
import { useAllQuestions } from '@/hooks/useAllQuestions'
import { QuestionSearchRow } from '@/components/QuestionSearchRow'

type FilterMode = 'questions' | 'concepts'

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

export function QuizFloatingSearch() {
  const navigate = useNavigate()
  const { questions: allQuestions } = useAllQuestions()
  const [wikiIndex, setWikiIndex] = useState<WikiIndexItem[]>([])
  const [query, setQuery] = useState('')
  const [filterMode, setFilterMode] = useState<FilterMode>('questions')
  const [active, setActive] = useState(false)
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    let cancelled = false
    buildWikiIndex()
      .then(items => { if (!cancelled) setWikiIndex(items) })
      .catch(() => {})
    return () => { cancelled = true }
  }, [])

  useEffect(() => {
    if (!active) return
    function handleMouseDown(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        closeDropdown()
      }
    }
    document.addEventListener('mousedown', handleMouseDown)
    return () => document.removeEventListener('mousedown', handleMouseDown)
  }, [active])

  function closeDropdown() {
    setQuery('')
    setActive(false)
    inputRef.current?.blur()
  }

  function toggleSelect(id: string) {
    setSelectedIds(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function handleStartQuiz() {
    const ids = [...selectedIds]
    const storageTopic = allQuestions.find(q => selectedIds.has(q.id))?.topic ?? 'Probability'
    try {
      sessionStorage.setItem('actuarial_selected_ids', JSON.stringify(ids))
    } catch { /* ignore */ }
    navigate(`/quiz?mode=quiz&selection=stored&topic=${encodeURIComponent(storageTopic)}&reveal=during&from=browse`)
    setSelectedIds(new Set())
    closeDropdown()
  }

  const hasQuery = query.trim().length > 0
  const isExpanded = active && hasQuery

  const questionResults = useMemo(() => {
    const q = query.trim()
    if (!q || filterMode !== 'questions') return []
    return filterQuestions(allQuestions, { search: q }).slice(0, 20)
  }, [allQuestions, query, filterMode])

  const conceptResults = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q || filterMode !== 'concepts') return []
    return wikiIndex
      .filter(it => {
        const haystack = [it.title, it.name, it.author].filter(Boolean).join(' ').toLowerCase()
        return haystack.includes(q)
      })
      .sort((a, b) => (a.title ?? a.name).localeCompare(b.title ?? b.name))
      .slice(0, 30)
  }, [wikiIndex, query, filterMode])

  return (
    <>
      {isExpanded && (
        <div
          className="fixed inset-0 z-40 bg-background/60 backdrop-blur-sm"
          onMouseDown={e => { e.preventDefault(); closeDropdown() }}
        />
      )}

      <div
        ref={containerRef}
        className="sticky top-14 lg:top-0 z-50 border-b bg-background/90 backdrop-blur-md"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {/* Input row */}
          <div className="flex items-center gap-2 h-14">
            <Search className="h-4 w-4 text-muted-foreground shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              onFocus={() => setActive(true)}
              placeholder="Search questions…"
              className="flex-1 min-w-0 bg-transparent border-0 focus:outline-none text-[16px] sm:text-sm text-foreground placeholder:text-muted-foreground"
              aria-label="Search questions"
              autoComplete="off"
              spellCheck={false}
            />
            {query && (
              <button
                type="button"
                onClick={closeDropdown}
                aria-label="Clear search"
                className="text-muted-foreground hover:text-foreground transition-colors shrink-0"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Selection bar — shown when selections exist and dropdown is closed */}
          {!isExpanded && selectedIds.size > 0 && (
            <div className="flex items-center justify-between gap-3 border-t py-2">
              <span className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">{selectedIds.size}</span> question{selectedIds.size !== 1 ? 's' : ''} selected
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedIds(new Set())}
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  clear
                </button>
                <button
                  type="button"
                  onClick={handleStartQuiz}
                  className="px-4 py-1.5 rounded-full border border-primary bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90 transition-colors"
                >
                  Start Quiz →
                </button>
              </div>
            </div>
          )}

          {/* Dropdown — only when query is non-empty */}
          {isExpanded && (
            <div className="border-t pb-3">
              {/* Filter pills */}
              <div className="flex gap-1.5 py-2.5">
                <button
                  type="button"
                  onClick={() => setFilterMode('questions')}
                  className={
                    'px-3 py-1 rounded-full text-xs font-medium transition-colors ' +
                    (filterMode === 'questions'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-accent hover:bg-accent/80 text-foreground')
                  }
                >
                  Questions
                </button>
                <button
                  type="button"
                  onClick={() => setFilterMode('concepts')}
                  className={
                    'px-3 py-1 rounded-full text-xs font-medium transition-colors ' +
                    (filterMode === 'concepts'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-accent hover:bg-accent/80 text-foreground')
                  }
                >
                  Concepts
                </button>
              </div>

              {/* Results */}
              {filterMode === 'questions' ? (
                <div className="space-y-2 max-h-[50vh] overflow-y-auto">
                  {questionResults.length === 0 ? (
                    <p className="text-xs text-muted-foreground px-2 py-2">No questions found.</p>
                  ) : (
                    questionResults.map(q => (
                      <QuestionSearchRow
                        key={q.id}
                        question={q}
                        query={query}
                        selected={selectedIds.has(q.id)}
                        onToggleSelect={toggleSelect}
                      />
                    ))
                  )}
                </div>
              ) : (
                <ul className="space-y-0.5 max-h-[50vh] overflow-y-auto">
                  {conceptResults.length === 0 ? (
                    <li className="text-xs text-muted-foreground px-2 py-2">No matches.</li>
                  ) : (
                    conceptResults.map(item => (
                      <li key={`${item.category}:${item.path}`}>
                        <ConceptResultRow item={item} query={query} onSelect={closeDropdown} />
                      </li>
                    ))
                  )}
                </ul>
              )}

              {/* Start Quiz button — shown when questions are selected */}
              {selectedIds.size > 0 && (
                <div className="border-t mt-2 pt-2">
                  <button
                    type="button"
                    onClick={handleStartQuiz}
                    className="w-full px-4 py-2 rounded-md border border-primary bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
                  >
                    Start Quiz with {selectedIds.size} selected →
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

function ConceptResultRow({
  item,
  query,
  onSelect,
}: {
  item: WikiIndexItem
  query: string
  onSelect: () => void
}) {
  const ref = pathToEntryRef(item.path) ?? { kind: 'concept' as const, name: item.name }
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
      onClick={onSelect}
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
