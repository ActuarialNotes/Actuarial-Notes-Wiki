import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { BookMarked, FileText, GraduationCap, Search, X } from 'lucide-react'
import { buildWikiIndex, type WikiIndexItem } from '@/lib/wikiIndex'
import { pathToEntryRef, wikiRoute, examIdFromFile, type WikiEntryRef } from '@/lib/wikiRoutes'
import { useWikiSyllabus } from '@/hooks/useWikiSyllabus'

type Scope = 'page' | 'all'
type Sort = 'alpha' | 'category'

interface WikiSearchPanelProps {
  pageRefs: WikiEntryRef[]
}

export function WikiSearchPanel({ pageRefs }: WikiSearchPanelProps) {
  const [index, setIndex] = useState<WikiIndexItem[]>([])
  const [indexLoading, setIndexLoading] = useState(true)
  const [query, setQuery] = useState('')
  const [scope, setScope] = useState<Scope>('page')
  const [sort, setSort] = useState<Sort>('alpha')
  const [topic, setTopic] = useState<string>('')      // exam id filter (e.g. "p-1")
  const [author, setAuthor] = useState<string>('')
  const [yearMin, setYearMin] = useState<number | ''>('')
  const [yearMax, setYearMax] = useState<number | ''>('')
  const { syllabi } = useWikiSyllabus()
  const location = useLocation()

  useEffect(() => {
    let cancelled = false
    setIndexLoading(true)
    buildWikiIndex()
      .then(items => { if (!cancelled) setIndex(items) })
      .catch(() => {})
      .finally(() => { if (!cancelled) setIndexLoading(false) })
    return () => {
      cancelled = true
    }
  }, [])

  // Route change → reset scope to the default and clear transient query.
  useEffect(() => {
    setScope('page')
    setQuery('')
  }, [location.pathname])

  // If there's nothing referenced on the current page, "This Page" is useless
  // — flip to Entire Wiki automatically.
  useEffect(() => {
    if (pageRefs.length === 0 && scope === 'page') setScope('all')
  }, [pageRefs.length, scope])

  // Topic options: `{ id, label }` where id is the canonical examId ("p-1").
  const topicOptions = useMemo(() => {
    const map = new Map<string, string>()
    for (const item of index) {
      if (item.category !== 'exam') continue
      map.set(examIdFromFile(item.name), item.name)
    }
    return Array.from(map.entries())
      .map(([id, label]) => ({ id, label }))
      .sort((a, b) => a.label.localeCompare(b.label))
  }, [index])

  const authors = useMemo(() => {
    const set = new Set<string>()
    for (const item of index) {
      if (item.author) set.add(item.author)
    }
    return Array.from(set).sort()
  }, [index])

  // For the selected topic, the lowercased set of concept names that belong
  // to its syllabus. When empty (syllabus still loading), the filter is a
  // no-op so the user still sees entries instead of a blank panel.
  const topicConceptSet = useMemo(() => {
    if (!topic) return null
    const syllabus = syllabi.find(s => examIdFromFile(s.examLabel) === topic)
    if (!syllabus) return null
    const set = new Set<string>()
    for (const t of syllabus.topics) {
      for (const c of t.concepts) set.add(c.name.toLowerCase())
    }
    return set
  }, [topic, syllabi])

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
    if (topic) {
      filtered = filtered.filter(it => {
        if (it.category === 'exam') return examIdFromFile(it.name) === topic
        if (it.category === 'concept') {
          // If the syllabus hasn't loaded yet, keep concepts visible; once
          // loaded, restrict to those referenced by the chosen exam.
          if (!topicConceptSet) return true
          return topicConceptSet.has(it.name.toLowerCase())
        }
        // Resources aren't scoped to a single exam — hide them when a topic
        // filter is applied so the list stays focused.
        return false
      })
    }
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
  }, [index, query, scope, pageRefs, topic, topicConceptSet, author, yearMin, yearMax, sort])

  const pageDisabled = pageRefs.length === 0

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
            disabled={pageDisabled}
            title={pageDisabled ? 'This page has no wiki references' : undefined}
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
              aria-label="Filter by exam topic"
            >
              <option value="">All exams</option>
              {topicOptions.map(t => (
                <option key={t.id} value={t.id}>{t.label}</option>
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
        {indexLoading ? (
          <p className="text-xs text-muted-foreground px-2 py-3">Loading…</p>
        ) : results.length === 0 ? (
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
