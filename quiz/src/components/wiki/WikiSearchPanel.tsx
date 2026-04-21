import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { BookMarked, FileText, GraduationCap, Search, X } from 'lucide-react'
import { buildWikiIndex, type WikiIndexItem } from '@/lib/wikiIndex'
import { pathToEntryRef, wikiRoute, type WikiEntryRef } from '@/lib/wikiRoutes'

type Scope = 'page' | 'all'
type Sort = 'alpha' | 'category'

interface WikiSearchPanelProps {
  pageRefs: WikiEntryRef[]
}

export function WikiSearchPanel({ pageRefs }: WikiSearchPanelProps) {
  const [index, setIndex] = useState<WikiIndexItem[]>([])
  const [query, setQuery] = useState('')
  const [scope, setScope] = useState<Scope>('page')
  const [sort, setSort] = useState<Sort>('alpha')
  const [topic, setTopic] = useState<string>('')      // exam id filter
  const [author, setAuthor] = useState<string>('')
  const [yearMin, setYearMin] = useState<number | ''>('')
  const [yearMax, setYearMax] = useState<number | ''>('')

  useEffect(() => {
    let cancelled = false
    buildWikiIndex()
      .then(items => {
        if (!cancelled) setIndex(items)
      })
      .catch(() => { /* surfaced as empty results */ })
    return () => {
      cancelled = true
    }
  }, [])

  // If there's nothing referenced on the current page, "This Page" is useless
  // — flip to Entire Wiki automatically.
  useEffect(() => {
    if (pageRefs.length === 0 && scope === 'page') setScope('all')
  }, [pageRefs.length, scope])

  const topics = useMemo(() => {
    const set = new Set<string>()
    for (const item of index) {
      if (item.category === 'exam') set.add(item.name)
    }
    return Array.from(set).sort()
  }, [index])

  const authors = useMemo(() => {
    const set = new Set<string>()
    for (const item of index) {
      if (item.author) set.add(item.author)
    }
    return Array.from(set).sort()
  }, [index])

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()

    // Determine the candidate pool.
    let pool: WikiIndexItem[]
    if (scope === 'page') {
      const keys = new Set(pageRefs.map(r => `${r.kind}:${r.name.toLowerCase()}`))
      pool = index.filter(it => keys.has(`${mapCategory(it.category)}:${it.name.toLowerCase()}`))
    } else {
      pool = index
    }

    // Apply filters.
    let filtered = pool
    if (topic) filtered = filtered.filter(it => it.category !== 'exam' || it.name === topic)
    if (author) filtered = filtered.filter(it => it.category !== 'document' || it.author === author)
    if (yearMin !== '') filtered = filtered.filter(it => (it.year ?? Infinity) >= yearMin)
    if (yearMax !== '') filtered = filtered.filter(it => (it.year ?? -Infinity) <= yearMax)

    // Apply text search.
    if (q) {
      filtered = filtered.filter(it => {
        const haystack = [it.title, it.name, it.author].filter(Boolean).join(' ').toLowerCase()
        return haystack.includes(q)
      })
    }

    // Sort.
    const sorted = filtered.slice()
    if (sort === 'alpha') {
      sorted.sort((a, b) => a.name.localeCompare(b.name))
    } else {
      const order: Record<WikiIndexItem['category'], number> = { exam: 0, concept: 1, document: 2 }
      sorted.sort((a, b) => {
        const c = order[a.category] - order[b.category]
        return c !== 0 ? c : a.name.localeCompare(b.name)
      })
    }

    return sorted
  }, [index, query, scope, pageRefs, topic, author, yearMin, yearMax, sort])

  return (
    <div className="flex flex-col h-full min-h-0">
      <div className="px-3 py-3 border-b space-y-2 shrink-0">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold">Wiki Search</span>
          <span className="text-xs text-muted-foreground tabular-nums">{results.length}</span>
        </div>

        {/* Scope toggle — This Page / Entire Wiki */}
        <div className="flex rounded-md border overflow-hidden text-xs">
          <button
            type="button"
            onClick={() => setScope('page')}
            disabled={pageRefs.length === 0}
            className={
              'flex-1 px-2 py-1.5 transition-colors disabled:opacity-40 disabled:cursor-not-allowed ' +
              (scope === 'page' ? 'bg-primary text-primary-foreground' : 'hover:bg-accent/60')
            }
          >
            This Page
          </button>
          <button
            type="button"
            onClick={() => setScope('all')}
            className={
              'flex-1 px-2 py-1.5 transition-colors ' +
              (scope === 'all' ? 'bg-primary text-primary-foreground' : 'hover:bg-accent/60')
            }
          >
            Entire Wiki
          </button>
        </div>

        {/* Search input */}
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search exams, concepts…"
            className="w-full pl-8 pr-8 py-1.5 text-sm rounded-md border bg-background focus:outline-none focus:ring-2 focus:ring-ring"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              aria-label="Clear search"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Filters */}
        {scope === 'all' && (
          <div className="grid grid-cols-2 gap-1.5">
            <select
              value={topic}
              onChange={e => setTopic(e.target.value)}
              className="text-xs rounded-md border bg-background px-1.5 py-1"
              aria-label="Filter by topic"
            >
              <option value="">All topics</option>
              {topics.map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
            <select
              value={author}
              onChange={e => setAuthor(e.target.value)}
              className="text-xs rounded-md border bg-background px-1.5 py-1"
              aria-label="Filter by author"
            >
              <option value="">All authors</option>
              {authors.map(a => (
                <option key={a} value={a}>{a}</option>
              ))}
            </select>
            <input
              type="number"
              placeholder="Year ≥"
              value={yearMin}
              onChange={e => setYearMin(e.target.value === '' ? '' : parseInt(e.target.value, 10))}
              className="text-xs rounded-md border bg-background px-1.5 py-1"
              aria-label="Minimum year"
            />
            <input
              type="number"
              placeholder="Year ≤"
              value={yearMax}
              onChange={e => setYearMax(e.target.value === '' ? '' : parseInt(e.target.value, 10))}
              className="text-xs rounded-md border bg-background px-1.5 py-1"
              aria-label="Maximum year"
            />
          </div>
        )}

        {/* Sort */}
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">
            {scope === 'page' ? 'On this page' : 'All entries'}
          </span>
          <select
            value={sort}
            onChange={e => setSort(e.target.value as Sort)}
            className="rounded-md border bg-background px-1.5 py-1"
            aria-label="Sort"
          >
            <option value="alpha">Alphabetical</option>
            <option value="category">By category</option>
          </select>
        </div>
      </div>

      {/* Results list */}
      <div className="flex-1 overflow-y-auto px-2 py-2">
        {results.length === 0 ? (
          <p className="text-xs text-muted-foreground px-2 py-3">No matches.</p>
        ) : (
          <ul className="space-y-0.5">
            {results.map(item => (
              <li key={`${item.category}:${item.path}`}>
                <SearchResultRow item={item} query={query} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

function mapCategory(cat: WikiIndexItem['category']): 'concept' | 'resource' | 'exam' {
  return cat === 'document' ? 'resource' : cat
}

function SearchResultRow({ item, query }: { item: WikiIndexItem; query: string }) {
  const ref = pathToEntryRef(item.path) ?? { kind: 'concept' as const, name: item.name }
  const route = wikiRoute(ref)
  const Icon = item.category === 'exam' ? GraduationCap : item.category === 'concept' ? FileText : BookMarked
  const iconColor =
    item.category === 'exam' ? 'text-teal-500' :
    item.category === 'concept' ? 'text-violet-500' :
    'text-muted-foreground'
  const display = item.title ?? item.name

  return (
    <Link
      to={route}
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
