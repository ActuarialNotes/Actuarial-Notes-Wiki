import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { BookMarked, FileText, GraduationCap, Search, X } from 'lucide-react'
import { buildWikiIndex, type WikiIndexItem } from '@/lib/wikiIndex'
import { pathToEntryRef, wikiRoute, type WikiEntryRef } from '@/lib/wikiRoutes'

type Scope = 'page' | 'all'

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

  const hasQuery = query.trim().length > 0
  const pageDisabled = pageRefs.length === 0

  const results = useMemo(() => {
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

  return (
    <>
      {/* Backdrop blur overlay — behind the header (z-40), above page content (z-0) */}
      {isExpanded && (
        <div
          className="fixed inset-0 z-40 bg-background/60 backdrop-blur-sm"
          onMouseDown={e => { e.preventDefault(); dismiss() }}
        />
      )}

      {/* Floating search header */}
      <div
        ref={containerRef}
        className="sticky top-0 z-50 border-b bg-background/90 backdrop-blur-md"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {/* Input row */}
          <div className="flex items-center gap-2 py-2.5">
            <Search className="h-4 w-4 text-muted-foreground shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              onFocus={() => setActive(true)}
              className="flex-1 min-w-0 bg-transparent border-0 focus:outline-none text-sm text-foreground placeholder-transparent"
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

          {/* Scope toggle + results — only when query is non-empty */}
          {isExpanded && (
            <div className="border-t pb-3">
              {/* Scope toggle pills */}
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

              {/* Results list */}
              <ul className="space-y-0.5 max-h-[60vh] overflow-y-auto">
                {results.length === 0 ? (
                  <li className="text-xs text-muted-foreground px-2 py-2">No matches.</li>
                ) : (
                  results.map(item => (
                    <li key={`${item.category}:${item.path}`}>
                      <SearchResultRow item={item} query={query} onSelect={dismiss} />
                    </li>
                  ))
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

function SearchResultRow({
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
