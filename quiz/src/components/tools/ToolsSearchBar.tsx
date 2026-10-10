import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import {
  FloatingSearchBack,
  FloatingSearchBar,
  FloatingSearchInput,
  FloatingSearchStrip,
  SearchBackdrop,
  SearchScopePill,
} from '@/components/FloatingSearchBar'
import { highlightMatch } from '@/components/SearchHighlight'
import { AREAS, toolSlug, type PracticeArea, type ToolSpec } from '@/lib/tools'
import { areaCounts, searchTools } from '@/lib/toolSearch'
import type { Back } from '@/hooks/useBack'

/**
 * The **Tools top bar** (docs/actuarial-tools.md §6.2) — the floating search
 * bar every tab carries, built from the shared parts so a search here feels
 * the same as anywhere else. It is the route's only row of top chrome below
 * `lg` (`lib/mobileNavHost.ts`), so it carries the hamburger.
 *
 * Two shapes. On the **catalogue** the page *is* the result list: the query
 * and the practice-area pill are lifted to the page (they ride the URL), and
 * the bar only draws the input and, while there is a query, the pills. On a
 * **tool's page** the card is the page, so a query opens a dropdown of tools
 * over it — the next tool in a chain is one search away — and the strip under
 * the input carries the way back.
 */

type Props =
  | {
      kind: 'catalogue'
      query: string
      area: PracticeArea | null
      onQuery: (q: string) => void
      onArea: (area: PracticeArea | null) => void
    }
  | { kind: 'tool'; title: string; back: Back }

export function ToolsSearchBar(props: Props) {
  if (props.kind === 'catalogue') return <CatalogueBar {...props} />
  return <ToolPageBar title={props.title} back={props.back} />
}

function AreaPills({ query, area, onArea }: { query: string; area: PracticeArea | null; onArea: (a: PracticeArea | null) => void }) {
  const counts = useMemo(() => areaCounts(query), [query])
  return (
    <div className="flex flex-wrap gap-1.5 pb-2.5" role="group" aria-label="Practice area">
      <SearchScopePill active={area === null} onClick={() => onArea(null)}>All</SearchScopePill>
      {AREAS.map(a => (
        <SearchScopePill key={a.id} active={area === a.id} disabled={!counts[a.id]} onClick={() => onArea(area === a.id ? null : a.id)}>
          {a.label}
        </SearchScopePill>
      ))}
    </div>
  )
}

function CatalogueBar({ query, area, onQuery, onArea }: Extract<Props, { kind: 'catalogue' }>) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [focused, setFocused] = useState(false)
  return (
    <FloatingSearchBar>
      <FloatingSearchInput
        inputRef={inputRef}
        value={query}
        onChange={onQuery}
        onFocus={() => setFocused(true)}
        onClear={() => {
          onQuery('')
          onArea(null)
          inputRef.current?.blur()
          setFocused(false)
        }}
        placeholder="Search tools"
        ariaLabel="Search tools"
        navCollapsed={focused && query.length > 0}
      />
      {query.trim() && <AreaPills query={query} area={area} onArea={onArea} />}
    </FloatingSearchBar>
  )
}

function ToolPageBar({ title, back }: { title: string; back: Back }) {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [area, setArea] = useState<PracticeArea | null>(null)
  const [active, setActive] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const results = useMemo(() => searchTools(query, area), [query, area])
  const hasQuery = query.trim().length > 0

  function dismiss() {
    setQuery('')
    setArea(null)
    setActive(false)
    inputRef.current?.blur()
  }

  useEffect(() => {
    if (!active) return
    const onMouseDown = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) dismiss()
    }
    const onKeyDown = (e: KeyboardEvent) => { if (e.key === 'Escape') dismiss() }
    document.addEventListener('mousedown', onMouseDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('mousedown', onMouseDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [active])

  const open = (spec: ToolSpec) => {
    dismiss()
    navigate(`/tools/${toolSlug(spec)}`)
  }

  return (
    <>
      {active && hasQuery && <SearchBackdrop onDismiss={dismiss} />}
      <FloatingSearchBar ref={containerRef}>
        <FloatingSearchInput
          inputRef={inputRef}
          value={query}
          onChange={setQuery}
          onFocus={() => setActive(true)}
          onClear={dismiss}
          placeholder="Search tools"
          ariaLabel="Search tools"
          navCollapsed={active}
        />
        {active && hasQuery ? (
          <div className="pb-3">
            <AreaPills query={query} area={area} onArea={setArea} />
            <ToolResults tools={results} query={query} onOpen={open} />
          </div>
        ) : (
          <FloatingSearchStrip title={title} backLink={<FloatingSearchBack back={back} />} />
        )}
      </FloatingSearchBar>
    </>
  )
}

/** The dropdown's rows: a tool's name and its question, the matched run marked. */
function ToolResults({ tools, query, onOpen }: { tools: ToolSpec[]; query: string; onOpen: (t: ToolSpec) => void }) {
  if (!tools.length) return <p className="px-2 py-2 text-xs text-muted-foreground">No tools match.</p>
  return (
    <ul className="max-h-[50vh] space-y-0.5 overflow-y-auto" data-testid="tool-search-results">
      {tools.map(t => (
        <li key={t.id}>
          <button
            type="button"
            onClick={() => onOpen(t)}
            className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left transition-colors hover:bg-accent/60"
          >
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-medium">{highlightMatch(t.name, query)}</span>
              <span className="block truncate text-xs text-muted-foreground">{highlightMatch(t.answers, query)}</span>
            </span>
            <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
          </button>
        </li>
      ))}
    </ul>
  )
}
