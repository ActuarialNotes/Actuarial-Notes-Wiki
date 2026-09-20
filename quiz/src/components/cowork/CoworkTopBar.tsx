import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { BookOpen, FileSpreadsheet, FileText, Gavel, Landmark, Newspaper, Scale, Table2 } from 'lucide-react'
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
import { deliverableTypeSpec } from '@/lib/coworkDeliverables'
import { deliverableDisplayTitle } from '@/data/coworkDeliverables'
import { useCoworkDeliverables } from '@/hooks/useCoworkDeliverables'

/**
 * Cowork's top bar — the search, the page strip, and (below `lg`) the way into
 * the sidebar drawer.
 *
 * It is the wiki's floating search, built from the same parts
 * (`components/FloatingSearchBar.tsx`): the same sticky blurred bar, the same
 * input line with the hamburger folding away as you type, the same dimmed
 * backdrop, the same scope pills, the same result rows. Cowork is a second
 * product, not a second design system, and searching should not feel like a
 * different app one mode over.
 *
 * It behaves like it too, which is the part that had been missing. A query is
 * **a question with answers**, not a filter that quietly thins the page behind
 * the bar: typing opens a list, and picking a row goes to the thing — a
 * publisher to their page, a document into the reader (`ConceptPopup`, the one
 * viewer). The two kinds are listed apart because they are answers to different
 * questions, and a publisher's row is not a heading over their documents: it is
 * the way to the page those documents are on.
 *
 * A deliverable is the third kind of answer, and it is listed from anywhere in
 * the mode rather than only on the page that holds them: the bar is the mode's
 * one search, so "where is that reserve analysis" is a question it can be asked
 * standing in front of a source. Only a query finds one — the dropdown never
 * opens on an empty field, so the deliverables page is not shadowed by a list
 * of its own contents.
 *
 * There are **no tabs here**. Sources and Deliverables are the mode's two
 * places and the sidebar is where a place is chosen, the same as every route in
 * Study mode; a second row of tabs restating the nav cost a phone a row of
 * chrome to say what the drawer already says.
 */

const KIND_ICON: Record<ResourceKind, typeof FileText> = {
  textbook: BookOpen,
  standard: Scale,
  regulation: Gavel,
  guideline: Landmark,
  bulletin: FileText,
  filing: FileText,
  report: FileText,
  news: Newspaper,
  dataset: Table2,
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
}

export function CoworkTopBar({
  placeholder,
  pageTitle,
  pageIcon,
  backLink,
  entityId,
  onOpenResource,
}: CoworkTopBarProps) {
  const [query, setQuery] = useState('')
  const [scope, setScope] = useState<Scope>('all')
  const [active, setActive] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const location = useLocation()
  const navigate = useNavigate()
  const deliverables = useCoworkDeliverables(s => s.deliverables)

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
    const entities = inSource ? COWORK_ENTITIES.filter(e => e.id === entityId) : COWORK_ENTITIES
    const resources = inSource ? COWORK_RESOURCES.filter(r => r.entityId === entityId) : COWORK_RESOURCES
    return searchSources(entities, resources, query)
  }, [query, inSource, entityId])

  const publishers = useMemo(() => new Map(COWORK_ENTITIES.map(e => [e.id, e] as const)), [])

  // The reader's own work, matched the same way the catalogue is: every term
  // has to appear somewhere in the title or the type.
  const matchingDeliverables = useMemo(() => {
    const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean)
    if (!terms.length || inSource) return []
    return deliverables.filter(d => {
      const haystack = [deliverableDisplayTitle(d), deliverableTypeSpec(d.type).label].join(' ').toLowerCase()
      return terms.every(t => haystack.includes(t))
    })
  }, [deliverables, query, inSource])

  const hasQuery = query.trim().length > 0
  const isExpanded = active && hasQuery
  const found = results.entities.length + results.resources.length + matchingDeliverables.length

  function openEntity(entity: SourceEntity) {
    dismiss()
    navigate(`/cowork/sources/${entity.id}`)
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
              <div className="flex flex-wrap gap-1.5 py-2.5">
                <SearchScopePill active={inSource} disabled={!entityId} onClick={() => setScope('source')}>
                  This Source
                </SearchScopePill>
                <SearchScopePill active={!inSource} onClick={() => setScope('all')}>
                  Everywhere
                </SearchScopePill>
              </div>

              <ul className="max-h-[50vh] space-y-0.5 overflow-y-auto">
                {found === 0 ? (
                  <li className="px-2 py-2 text-xs text-muted-foreground">No matches.</li>
                ) : (
                  <>
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

                    {matchingDeliverables.map(deliverable => (
                      <li key={`deliverable:${deliverable.id}`}>
                        <button
                          type="button"
                          onClick={() => {
                            dismiss()
                            navigate(`/cowork/deliverables/${deliverable.id}`)
                          }}
                          data-sound="open"
                          className="flex w-full min-w-0 items-start gap-2 rounded-md px-2 py-1.5 text-left transition-colors hover:bg-accent/60"
                        >
                          <FileSpreadsheet className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-sm">
                              {highlightMatch(deliverableDisplayTitle(deliverable), query)}
                            </span>
                            <span className="block truncate text-[11px] text-muted-foreground">
                              {deliverableTypeSpec(deliverable.type).label}
                            </span>
                          </span>
                        </button>
                      </li>
                    ))}
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
