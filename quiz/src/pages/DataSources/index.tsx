import { useCallback, useMemo, useSyncExternalStore } from 'react'
import { Link, Navigate, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import bank from 'virtual:assumption-bank'
import { Check, ChevronLeft, ChevronRight, ExternalLink, Plus, X } from 'lucide-react'
import { ConceptPopup } from '@/components/wiki/ConceptPopup'
import { useConceptPopup } from '@/hooks/useConceptPopup'
import { backLabel, useBack, usePageLabel } from '@/hooks/useBack'
import { usePageHead } from '@/hooks/usePageHead'
import { useCoworkLibrary } from '@/hooks/useCoworkLibrary'
import { RESTORE_SCROLL } from '@/lib/routeScrollMemory'
import { DATA_SOURCES_HEAD } from '@/lib/seo'
import { installWikiBundle } from '@/lib/wikiBundle'
import { TOOLS, toolBySlug, toolPath } from '@/lib/tools'
import { inkChip } from '@/components/ui/ink'
import { MultiSelectDropdown } from '@/components/MultiSelectDropdown'
import { BottomSheet } from '@/components/tools/ValueSheet'
import { CatalogueDetail } from '@/components/datasources/CatalogueDetail'
import { CoworkTopBar, type TopBarPlace } from '@/components/cowork/CoworkTopBar'
import { EntityLogo } from '@/components/cowork/EntityLogo'
import { LibraryPill } from '@/components/cowork/LibraryPill'
import { entityById, resourceEntryRef, type SourceEntity, type SourceResource } from '@/lib/coworkSources'
import { COWORK_ENTITIES, COWORK_RESOURCES } from '@/data/coworkSources'
import { cn } from '@/lib/utils'
import {
  buildCatalogue,
  detailKicker,
  detailValue,
  filterCatalogue,
  groupCatalogue,
  itemSubtitle,
  needOptions,
  publisherOptions,
  readCatalogueFilters,
  regionOptions,
  setsOfResource,
  typeOptions,
  withCatalogueParam,
  type CatalogueFilters,
  type CatalogueItem,
} from '@/lib/dataCatalogue'
import { DATA_SOURCES_ROUTE, legacySectionPath, publisherPath } from '@/lib/dataSources'
import { ToolPage } from '@/pages/Tools'
// Registers the sample source documents as virtual vault files, which is what
// lets them open in the same popup viewer as a real wiki page. Imported for
// the side effect, once, before anything tries to read one.
import '@/lib/coworkContent'

/**
 * **Data Sources** (`/data-sources`) — what a model can take from a published
 * document, as **one catalogue** (`lib/dataCatalogue.ts`):
 *
 *   value     a figure from the Assumptions Bank, with the page it was read from
 *   table     a document the app reads as data
 *   document  everything else a publisher issued
 *
 * every one a row of the same shape, filed under what a model needs it for
 * (trend, development, expenses…). The frame never changes: the needs, the
 * filters and the list stay where they are, a filter only changes the rows,
 * and a row opens beside the list (a sheet over it on a narrow screen). The
 * filters and the open item ride the address, so Back and a shared link keep
 * them.
 *
 *   /data-sources/<publisher>   the same catalogue, narrowed to one publisher
 *   /data-sources/<table>       one table, drawn by the Tools tab's `ToolPage`
 *
 * **There is no second reader.** A document opens in `ConceptPopup` — the
 * same split pane the study guide reads a concept in. The sample documents are
 * registered as virtual vault files (`lib/coworkContent.ts`) so that stays
 * true. See `docs/cowork.md`.
 */

const toolName = (slug: string) => toolBySlug(slug)?.name ?? null

/** Every item, built once: the bank and the source catalogue are build-time facts. */
const ITEMS: CatalogueItem[] = buildCatalogue(COWORK_ENTITIES, COWORK_RESOURCES, bank, toolName)

/** What the search bar can go to besides the publishers and documents: each table's page, and each value. */
const PLACES: TopBarPlace[] = [
  ...TOOLS.filter(t => t.area === 'data').map(t => ({ name: t.name, subtitle: t.answers, to: toolPath(t), kind: 'table' as const })),
  ...ITEMS.filter(i => i.type === 'value').map(i => ({
    name: i.name,
    subtitle: [i.value, itemSubtitle(i)].filter(Boolean).join(' · '),
    to: `${DATA_SOURCES_ROUTE}?item=${encodeURIComponent(i.id)}`,
    kind: 'bank' as const,
  })),
]

/** Open a resource page — the document a set of values was read from — in the popup. */
async function openVaultResource(name: string) {
  const { default: bundle } = await import('virtual:wiki-content')
  installWikiBundle(bundle)
  useConceptPopup.getState().openAt([{ kind: 'resource', name }], 0, null, null, null, { walk: 'corpus' })
}

/** How many of the documents filed under no need the full list shows before folding the rest. */
const FOLD_AT = 6

const WIDE = '(min-width: 1024px)'

/** Whether the detail has room beside the list (`lg`). Below it, an item opens in a sheet. */
function useWide(): boolean {
  return useSyncExternalStore(
    notify => {
      const query = window.matchMedia(WIDE)
      query.addEventListener('change', notify)
      return () => query.removeEventListener('change', notify)
    },
    () => window.matchMedia(WIDE).matches,
    () => true,
  )
}

export default function DataSources() {
  const { id } = useParams()
  const { search } = useLocation()

  // A table is a tool's page, with its own bar and breadcrumb.
  const table = id ? toolBySlug(id) : undefined
  if (table && table.area === 'data') {
    return (
      <div className="min-w-0">
        <ToolPage slug={id!} />
        <ConceptPopup />
      </div>
    )
  }

  // A section the page had before it was one catalogue.
  const legacy = id ? legacySectionPath(id, search) : null
  if (legacy) return <Navigate to={legacy} replace />
  // A publisher the catalogue doesn't list.
  if (id && !entityById(COWORK_ENTITIES, id)) return <Navigate to={DATA_SOURCES_ROUTE} replace />

  return <Catalogue entityId={id ?? null} />
}

function Catalogue({ entityId }: { entityId: string | null }) {
  usePageHead(DATA_SOURCES_HEAD)
  const [params, setParams] = useSearchParams()
  const navigate = useNavigate()
  const wide = useWide()
  const openPopup = useConceptPopup(s => s.openAt)
  const popupOpen = useConceptPopup(s => s.open)
  const library = useCoworkLibrary()

  /**
   * Open a document in the popup viewer. The walk handed to the popup is
   * every *openable* document in the catalogue, so Previous / Next steps
   * through the corpus rather than dead-ending on the one that was clicked.
   */
  const openResource = useCallback(
    (resource: SourceResource) => {
      const refs = COWORK_RESOURCES.map(r => ({ resource: r, ref: resourceEntryRef(r) })).filter(
        (x): x is { resource: SourceResource; ref: NonNullable<ReturnType<typeof resourceEntryRef>> } => x.ref !== null,
      )
      const index = refs.findIndex(x => x.resource.id === resource.id)
      if (index < 0) return
      // `walk: 'corpus'` drops the footer's syllabus-filter picker: these are
      // documents, not a slice of an exam (see `hooks/useConceptPopup.ts`).
      openPopup(refs.map(x => x.ref), index, null, undefined, undefined, { walk: 'corpus' })
    },
    [openPopup],
  )

  const entity = useMemo(() => (entityId ? entityById(COWORK_ENTITIES, entityId) : null), [entityId])

  // A publisher's way back leads to the page the reader came from (a
  // workflow's source step, a search), and up to the catalogue for one who
  // landed here — `hooks/useBack.ts`.
  const back = useBack({ to: DATA_SOURCES_ROUTE, label: 'Data Sources' })
  usePageLabel(entity?.name ?? 'Data Sources')

  const libraryOnly = params.get('library') === '1'
  const libraryCount = library.entityIds.length + library.resourceIds.length
  const filters = useMemo<CatalogueFilters>(
    () => ({
      ...readCatalogueFilters(params, entityId),
      ...(libraryOnly ? { library: { entityIds: library.entityIds, resourceIds: library.resourceIds } } : {}),
    }),
    [params, entityId, libraryOnly, library.entityIds, library.resourceIds],
  )

  const shown = useMemo(() => filterCatalogue(ITEMS, filters), [filters])
  const groups = useMemo(() => groupCatalogue(shown, filters.need), [shown, filters.need])
  const needs = useMemo(() => needOptions(ITEMS, filters), [filters])
  const types = useMemo(() => typeOptions(ITEMS, filters), [filters])
  const regions = useMemo(() => regionOptions(ITEMS, filters), [filters])
  const publishers = useMemo(() => publisherOptions(ITEMS, filters), [filters])
  const everything = useMemo(() => filterCatalogue(ITEMS, filters, 'need').length, [filters])

  const choose = useCallback(
    (key: string, value: string | boolean | null) => setParams(withCatalogueParam(params, key, value), { replace: true }),
    [params, setParams],
  )

  // A publisher is an address of its own, so choosing one is a move the
  // browser's Back undoes; every other filter rewrites the query in place.
  const choosePublisher = useCallback(
    (id: string | null) => {
      const query = withCatalogueParam(withCatalogueParam(params, 'item', null), 'publisher', null).toString()
      navigate(`${id ? publisherPath(id) : DATA_SOURCES_ROUTE}${query ? `?${query}` : ''}`)
    },
    [params, navigate],
  )

  // The open item: the one the address names, and on a wide screen the first
  // of the list when it names none, so the panel beside the list is never empty.
  const itemId = params.get('item')
  const named = itemId ? ITEMS.find(i => i.id === itemId || i.rows.some(r => r.id === itemId)) ?? null : null
  const selected = named ?? (wide ? groups[0]?.items[0] ?? null : null)

  // With every type on the list, the documents that answer no need are a long
  // tail under the values and tables: the list shows the first few, and one
  // row leads to all of them.
  const folded = (group: { need: string | null; items: CatalogueItem[] }) =>
    !filters.type && !filters.need && group.need === null && group.items.length > FOLD_AT && group.items[0]!.type === 'document'

  const setTitle = filters.set ? bank.find(s => s.id === filters.set)?.title ?? null : null

  const detail = selected ? (
    <CatalogueDetail
      item={selected}
      sets={selected.resource && selected.type !== 'value' ? setsOfResource(selected.resource, bank) : []}
      toolName={selected.resource?.tool ? toolName(selected.resource.tool.slug) : null}
      inLibrary={selected.resource ? library.resourceIds.includes(selected.resource.id) : false}
      onToggleLibrary={() => selected.resource && library.toggleResource(selected.resource)}
      onRead={
        selected.resource && resourceEntryRef(selected.resource)
          ? () => openResource(selected.resource!)
          : selected.set
            ? () => void openVaultResource(selected.set!.source)
            : null
      }
      onShowSet={id => setParams(withCatalogueParam(withCatalogueParam(params, 'set', id), 'type', 'value'), { replace: true })}
    />
  ) : null

  const backLink = entity ? (
    <Link
      to={back.to}
      state={RESTORE_SCROLL}
      onClick={back.onLinkClick}
      aria-label={backLabel(back)}
      title={backLabel(back)}
      className="-ml-1.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
    >
      <ChevronLeft className="h-5 w-5" />
    </Link>
  ) : null

  return (
    <div className="min-h-screen">
      <CoworkTopBar
        placeholder="Search values, tables and documents"
        pageTitle={entity?.name ?? null}
        pageIcon={entity ? <EntityLogo entity={entity} size="md" /> : undefined}
        backLink={backLink}
        entityId={entityId}
        onOpenResource={openResource}
        places={PLACES}
      />

      <div
        className="page-column space-y-5 py-6"
        style={popupOpen ? { paddingBottom: 'calc(var(--concept-split-height, 50vh) + 1.5rem)' } : undefined}
      >
        {entity ? (
          <PublisherHeader entity={entity} />
        ) : (
          <header className="space-y-1">
            <h1 className="text-2xl font-bold tracking-tight">Data Sources</h1>
            <p className="max-w-xl text-sm text-muted-foreground">
              Published values and tables to put in a model, each with the page it was read from.
            </p>
          </header>
        )}

        <section aria-label="What the model needs" className="space-y-2">
          <h2 className="text-xs font-medium text-muted-foreground">What does the model need?</h2>
          <div className="-mx-4 flex gap-1.5 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0" data-testid="catalogue-needs">
            <button type="button" onClick={() => choose('need', null)} aria-pressed={!filters.need} className={inkChip(!filters.need, 'ring-1 ring-inset ring-border')}>
              Everything <span className="font-normal tabular-nums opacity-70">{everything}</span>
            </button>
            {needs.map(n => (
              <button
                key={n.value}
                type="button"
                disabled={n.count === 0 && filters.need !== n.value}
                onClick={() => choose('need', filters.need === n.value ? null : n.value)}
                aria-pressed={filters.need === n.value}
                className={inkChip(filters.need === n.value, 'ring-1 ring-inset ring-border')}
                data-testid={`catalogue-need-${n.value}`}
              >
                {n.label} <span className="font-normal tabular-nums opacity-70">{n.count}</span>
              </button>
            ))}
          </div>
        </section>

        <div className="flex flex-wrap items-center gap-2 border-y py-2" data-testid="catalogue-filters">
          <div role="group" aria-label="Type" className="inline-flex gap-0.5 rounded-full bg-muted p-1">
            <button type="button" onClick={() => choose('type', null)} aria-pressed={!filters.type} className={cn(inkChip(!filters.type), 'h-8 px-3', filters.type && 'text-foreground/80')}>
              All
            </button>
            {types.map(t => (
              <button
                key={t.value}
                type="button"
                onClick={() => choose('type', t.value)}
                aria-pressed={filters.type === t.value}
                className={cn(inkChip(filters.type === t.value), 'h-8 px-3', filters.type !== t.value && 'text-foreground/80')}
                data-testid={`catalogue-type-${t.value}`}
              >
                {t.label}
              </button>
            ))}
          </div>
          <MultiSelectDropdown
            label={filters.region ?? 'Region'}
            options={regions.map(r => ({ value: r.value, label: r.label }))}
            selected={new Set(filters.region ? [filters.region] : [])}
            onToggle={v => choose('region', v === filters.region ? null : v)}
            getCount={v => regions.find(r => r.value === v)?.count ?? 0}
            single
          />
          <MultiSelectDropdown
            label={entity?.short ?? publishers.find(p => p.value === filters.publisher)?.label ?? 'Publisher'}
            options={publishers.map(p => ({ value: p.value, label: p.label }))}
            selected={new Set(filters.publisher ? [filters.publisher] : [])}
            onToggle={v => choosePublisher(v === filters.publisher ? null : v)}
            getCount={v => publishers.find(p => p.value === v)?.count ?? 0}
            single
          />
          <button type="button" onClick={() => choose('ready', !filters.ready)} aria-pressed={filters.ready} className={inkChip(filters.ready)} data-testid="catalogue-ready">
            Ready to use
          </button>
          {(libraryCount > 0 || libraryOnly) && (
            <LibraryPill
              active={libraryOnly}
              count={libraryCount}
              title="Only the publishers you follow and the documents you added"
              onToggle={() => choose('library', !libraryOnly)}
            />
          )}
          {setTitle && (
            <button
              type="button"
              onClick={() => choose('set', null)}
              className="inline-flex h-9 max-w-full items-center gap-1 rounded-full border px-3 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              data-testid="catalogue-set-filter"
            >
              <span className="truncate">{setTitle}</span>
              <X className="h-3.5 w-3.5 shrink-0" aria-label="Show every document" />
            </button>
          )}
          <p className="ml-auto text-xs tabular-nums text-muted-foreground" data-testid="catalogue-count">
            {shown.length} of {ITEMS.length}
          </p>
        </div>

        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_21rem] lg:items-start lg:gap-6">
          <div className="space-y-5">
            {groups.length === 0 && (
              <p className="rounded-lg border border-dashed px-4 py-10 text-center text-sm text-muted-foreground">
                Nothing matches these filters.
              </p>
            )}
            {groups.map(group => (
              <section key={group.label} aria-label={group.label} className="space-y-1.5" data-testid="catalogue-group">
                <h2 className="px-1 text-xs font-medium text-muted-foreground">{group.label}</h2>
                <ul className="divide-y divide-border/60 overflow-hidden rounded-2xl bg-card">
                  {(folded(group) ? group.items.slice(0, FOLD_AT) : group.items).map(item => (
                    <CatalogueRow
                      key={item.id}
                      item={item}
                      selected={selected?.id === item.id}
                      onOpen={() => choose('item', item.id)}
                    />
                  ))}
                  {folded(group) && (
                    <li>
                      <button
                        type="button"
                        onClick={() => choose('type', 'document')}
                        className="flex min-h-11 w-full items-center justify-between px-3.5 py-2.5 text-left text-sm font-medium text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground"
                        data-testid="catalogue-all-documents"
                      >
                        All {types.find(t => t.value === 'document')?.count} documents
                        <ChevronRight className="h-4 w-4 shrink-0" aria-hidden />
                      </button>
                    </li>
                  )}
                </ul>
              </section>
            ))}
          </div>

          {wide && selected && (
            <aside
              aria-label={selected.name}
              className="sticky top-20 max-h-[calc(100dvh-6rem)] space-y-4 overflow-y-auto rounded-2xl bg-card p-5"
              data-testid="catalogue-panel"
            >
              <header className="space-y-1.5">
                <p className="text-xs font-medium text-muted-foreground">{detailKicker(selected)}</p>
                {detailValue(selected) && (
                  <p className="text-4xl font-bold leading-none tracking-tight tabular-nums" data-testid="catalogue-value">{detailValue(selected)}</p>
                )}
                <h2 className="text-lg font-semibold leading-snug">{selected.name}</h2>
              </header>
              {detail}
            </aside>
          )}
        </div>
      </div>

      {!wide && named && (
        <BottomSheet title={named.typeLabel} value={detailValue(named) ?? undefined} onClose={() => choose('item', null)}>
          <div className="space-y-1 px-1">
            {/* The sheet's own title is one line, so the name is written out in full here. */}
            <h3 className="text-lg font-semibold leading-snug">{named.name}</h3>
            <p className="text-xs font-medium text-muted-foreground">{detailKicker(named)}</p>
          </div>
          <div className="px-1">{detail}</div>
        </BottomSheet>
      )}

      {/* The one reader. See the note at the top of this file. */}
      <ConceptPopup />
    </div>
  )
}

/** One item: its type, its name over who published it, where and when, and its value. */
function CatalogueRow({ item, selected, onOpen }: { item: CatalogueItem; selected: boolean; onOpen: () => void }) {
  const subtitle = itemSubtitle(item)
  return (
    <li>
      <button
        type="button"
        onClick={onOpen}
        aria-pressed={selected}
        data-sound="open"
        className={cn(
          'flex min-h-[3.75rem] w-full items-center gap-3 px-3.5 py-2.5 text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring',
          selected ? 'bg-muted lg:ring-1 lg:ring-inset lg:ring-foreground' : 'hover:bg-muted/50',
        )}
        data-testid="catalogue-row"
        data-type={item.type}
      >
        <span className="hidden w-20 shrink-0 text-xs font-medium text-muted-foreground sm:block">{item.typeLabel}</span>
        <span className="min-w-0 flex-1">
          <span className={cn('block text-sm font-semibold', item.type !== 'document' && !item.ready && 'text-foreground/75')}>{item.name}</span>
          <span className="block text-xs text-muted-foreground">
            <span className="sm:hidden">{item.typeLabel}{subtitle ? ' · ' : ''}</span>
            {subtitle}
          </span>
        </span>
        {item.value && (
          <span className={cn('shrink-0 text-right text-sm tabular-nums', item.type === 'value' && item.ready ? 'font-bold' : 'text-muted-foreground')}>
            {item.value}
          </span>
        )}
        <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
      </button>
    </li>
  )
}

/** A publisher's own head on its page: who they are, the way to follow them, and their site. */
function PublisherHeader({ entity }: { entity: SourceEntity }) {
  const library = useCoworkLibrary()
  const followed = library.entityIds.includes(entity.id)
  return (
    <header className="space-y-3" data-testid="publisher-header">
      <div className="flex items-center gap-4">
        <EntityLogo entity={entity} size="lg" />
        <div className="min-w-0 flex-1">
          <h1 className="text-2xl font-bold leading-tight tracking-tight">{entity.name}</h1>
          <p className="mt-0.5 text-xs font-medium text-muted-foreground">{entity.jurisdiction}</p>
        </div>
      </div>
      <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">{entity.about}</p>
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          // The store holds ids only, so the cascade that drops a publisher's
          // documents is handed the catalogue here — see `hooks/useCoworkLibrary.ts`.
          onClick={() => library.toggleEntity(entity.id, COWORK_RESOURCES)}
          aria-pressed={followed}
          data-sound="press"
          className={cn(
            'inline-flex h-8 items-center gap-1.5 rounded-full px-3 text-xs font-medium transition-colors',
            followed
              ? 'bg-emerald-500/15 text-emerald-700 hover:bg-emerald-500/25 dark:text-emerald-300'
              : 'border text-muted-foreground hover:bg-accent hover:text-foreground',
          )}
        >
          {followed ? <Check className="h-4 w-4" aria-hidden /> : <Plus className="h-4 w-4" aria-hidden />}
          {followed ? 'Following' : 'Follow publisher'}
        </button>
        {entity.site && (
          <a
            href={entity.site}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-8 items-center gap-1.5 rounded-full border px-3 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            <ExternalLink className="h-3.5 w-3.5" aria-hidden />
            Publisher’s site
          </a>
        )}
      </div>
    </header>
  )
}
