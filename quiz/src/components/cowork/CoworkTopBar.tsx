import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { BookMarked, BookOpen, FileText, Gavel, Landmark, Newspaper, Scale, ScrollText, Table2 } from 'lucide-react'
import {
  FloatingSearchBar,
  FloatingSearchInput,
  FloatingSearchStrip,
  SearchBackdrop,
  SearchScopePill,
} from '@/components/FloatingSearchBar'
import { highlightMatch } from '@/components/SearchHighlight'
import { EntityLogo } from '@/components/cowork/EntityLogo'
import {
  formatPublished,
  resourceEntryRef,
  searchSources,
  type ResourceKind,
  type SourceEntity,
  type SourceResource,
} from '@/lib/coworkSources'
import { COWORK_ENTITIES, COWORK_RESOURCES } from '@/data/coworkSources'

/**
 * The **Data Sources** page's top bar — the search, the page strip, and (below
 * `lg`) the way into the sidebar drawer.
 *
 * It is the wiki's floating search, built from the same parts
 * (`components/FloatingSearchBar.tsx`): the same sticky blurred bar, the same
 * input line with the hamburger folding away as you type, the same dimmed
 * backdrop, the same scope pills, the same result rows. Cowork is a second
 * product, not a second design system, and searching should not feel like a
 * different app on another page.
 *
 * It behaves like it too, which is the part that had been missing. A query is
 * **a question with answers**, not a filter that quietly thins the page behind
 * the bar: typing opens a list, and picking a row goes to the thing — a
 * publisher to their page, a document into the reader (`ConceptPopup`, the one
 * viewer). The two kinds are listed apart because they are answers to different
 * questions, and a publisher's row is not a heading over their documents: it is
 * the way to the page those documents are on. The published tables and the
 * Assumptions Bank are answers too (`places`), listed first; for a reader who
 * can't see the publishers (`catalogue` off) they are the only ones.
 */

const KIND_ICON: Record<ResourceKind, typeof FileText> = {
  textbook: BookOpen,
  standard: Scale,
  regulation: Gavel,
  guideline: Landmark,
  bulletin: FileText,
  filing: FileText,
  report: FileText,
  paper: ScrollText,
  news: Newspaper,
  dataset: Table2,
}

/** A place on the page the search can go to: a published table, the Assumptions Bank. */
export interface TopBarPlace {
  name: string
  subtitle: string
  to: string
  kind: 'table' | 'bank'
}

/** Where the query is being asked. */
type Scope = 'source' | 'all'

export interface CoworkTopBarProps {
  placeholder: string
  /** The strip's subject, when the page has one. */
  pageTitle?: string | null
  /** Stands in for the strip's title text — a logo tile. */
  pageIcon?: ReactNode
  /** The way back out of a page, at the head of the strip. */
  backLink?: ReactNode
  /** The source whose page this is, which is what "This Source" can scope to. */
  entityId?: string | null
  /** Opens a document in the one viewer. */
  onOpenResource: (resource: SourceResource) => void
  /** The tables and the bank, matched on their names and what they hold. */
  places?: TopBarPlace[]
  /** Whether the publishers and their documents are searched (approved accounts only). */
  catalogue?: boolean
}

export function CoworkTopBar({
  placeholder,
  pageTitle,
  pageIcon,
  backLink,
  entityId,
  onOpenResource,
  places = [],
  catalogue = true,
}: CoworkTopBarProps) {
  const [query, setQuery] = useState('')
  const [scope, setScope] = useState<Scope>('all')
  const [active, setActive] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const location = useLocation()
  const navigate = useNavigate()

  // A new route is a new question. Same rule as the wiki's bar.
  useEffect(() => {
    setQuery('')
    setActive(false)
  }, [location.pathname])

  // Leaving a source's page leaves nothing for "This Source" to mean.
  useEffect(() => {
    if (!entityId) setScope('all')
  }, [entityId])

  useEffect(() => {
    if (!active) return
    function handleMouseDown(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) dismiss()
    }
    document.addEventListener('mousedown', handleMouseDown)
    return () => document.removeEventListener('mousedown', handleMouseDown)
  }, [active])

  function dismiss() {
    setQuery('')
    setActive(false)
    inputRef.current?.blur()
  }

  const inSource = scope === 'source' && Boolean(entityId)

  const results = useMemo(() => {
    if (!catalogue) return { entities: [], resources: [] }
    const entities = inSource ? COWORK_ENTITIES.filter(e => e.id === entityId) : COWORK_ENTITIES
    const resources = inSource ? COWORK_RESOURCES.filter(r => r.entityId === entityId) : COWORK_RESOURCES
    return searchSources(entities, resources, query)
  }, [query, inSource, entityId, catalogue])

  const placeHits = useMemo(() => {
    if (inSource) return []
    const words = query.trim().toLowerCase().split(/\s+/).filter(Boolean)
    if (!words.length) return []
    return places.filter(p => {
      const text = `${p.name} ${p.subtitle}`.toLowerCase()
      return words.every(w => text.includes(w))
    })
  }, [query, inSource, places])

  const publishers = useMemo(() => new Map(COWORK_ENTITIES.map(e => [e.id, e] as const)), [])

  const hasQuery = query.trim().length > 0
  const isExpanded = active && hasQuery
  const found = placeHits.length + results.entities.length + results.resources.length

  function openEntity(entity: SourceEntity) {
    dismiss()
    navigate(`/data-sources/${entity.id}`)
  }

  function openPlace(place: TopBarPlace) {
    dismiss()
    navigate(place.to)
  }

  function openResource(resource: SourceResource) {
    dismiss()
    onOpenResource(resource)
  }

  return (
    <>
      {isExpanded && <SearchBackdrop onDismiss={dismiss} />}

      <FloatingSearchBar ref={containerRef} width="lg">
        <>
          <FloatingSearchInput
            inputRef={inputRef}
            value={query}
            onChange={setQuery}
            onFocus={() => setActive(true)}
            onClear={dismiss}
            placeholder={placeholder}
            ariaLabel={placeholder}
            navCollapsed={active}
          />

          {pageTitle && <FloatingSearchStrip title={pageTitle} icon={pageIcon} backLink={backLink} />}

          {isExpanded && (
            <div className="pb-3">
              {entityId ? (
                <div className="flex flex-wrap gap-1.5 py-2.5">
                  <SearchScopePill active={inSource} onClick={() => setScope('source')}>
                    This publisher
                  </SearchScopePill>
                  <SearchScopePill active={!inSource} onClick={() => setScope('all')}>
                    Everywhere
                  </SearchScopePill>
                </div>
              ) : (
                <div className="h-2" />
              )}

              <ul className="max-h-[50vh] space-y-0.5 overflow-y-auto">
                {found === 0 ? (
                  <li className="px-2 py-2 text-xs text-muted-foreground">No matches.</li>
                ) : (
                  <>
                    {placeHits.map(place => {
                      const Icon = place.kind === 'bank' ? BookMarked : Table2
                      return (
                        <li key={`place:${place.to}`}>
                          <button
                            type="button"
                            onClick={() => openPlace(place)}
                            data-sound="open"
                            className="flex w-full min-w-0 items-start gap-2 rounded-md px-2 py-1.5 text-left transition-colors hover:bg-accent/60"
                          >
                            <Icon className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
                            <span className="min-w-0 flex-1">
                              <span className="block truncate text-sm">{highlightMatch(place.name, query)}</span>
                              <span className="block truncate text-[11px] text-muted-foreground">{place.subtitle}</span>
                            </span>
                          </button>
                        </li>
                      )
                    })}
                    {results.entities.map(entity => (
                      <li key={`entity:${entity.id}`}>
                        <button
                          type="button"
                          onClick={() => openEntity(entity)}
                          data-sound="open"
                          className="flex w-full min-w-0 items-center gap-2 rounded-md px-2 py-1.5 text-left transition-colors hover:bg-accent/60"
                        >
                          <EntityLogo entity={entity} size="sm" />
                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-sm">{highlightMatch(entity.name, query)}</span>
                            <span className="block truncate text-[11px] text-muted-foreground">
                              {entity.jurisdiction}
                            </span>
                          </span>
                        </button>
                      </li>
                    ))}

                    {results.resources.map(resource => {
                      const Icon = KIND_ICON[resource.kind] ?? FileText
                      const publisher = publishers.get(resource.entityId)
                      const openable = resourceEntryRef(resource) !== null
                      return (
                        <li key={`resource:${resource.id}`}>
                          <button
                            type="button"
                            onClick={() => openResource(resource)}
                            disabled={!openable}
                            data-sound="open"
                            className="flex w-full min-w-0 items-start gap-2 rounded-md px-2 py-1.5 text-left transition-colors hover:bg-accent/60 disabled:cursor-default disabled:opacity-60"
                          >
                            <Icon className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
                            <span className="min-w-0 flex-1">
                              <span className="block truncate text-sm">{highlightMatch(resource.title, query)}</span>
                              <span className="block truncate text-[11px] text-muted-foreground">
                                {[publisher?.short, formatPublished(resource.published)].filter(Boolean).join(' · ')}
                              </span>
                            </span>
                          </button>
                        </li>
                      )
                    })}
                  </>
                )}
              </ul>
            </div>
          )}
        </>
      </FloatingSearchBar>
    </>
  )
}
