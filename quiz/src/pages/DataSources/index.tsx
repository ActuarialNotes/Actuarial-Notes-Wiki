import { useCallback, useMemo } from 'react'
import { Link, Navigate, useLocation, useParams } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'
import { ConceptPopup } from '@/components/wiki/ConceptPopup'
import { useConceptPopup } from '@/hooks/useConceptPopup'
import { backLabel, useBack, usePageLabel } from '@/hooks/useBack'
import { usePageHead } from '@/hooks/usePageHead'
import { RESTORE_SCROLL } from '@/lib/routeScrollMemory'
import { DATA_SOURCES_HEAD } from '@/lib/seo'
import { installWikiBundle } from '@/lib/wikiBundle'
import { TOOLS, toolBySlug, toolPath } from '@/lib/tools'
import { inkChip } from '@/components/ui/ink'
import { AssumptionsShelf } from '@/components/assumptions/AssumptionsShelf'
import { CoworkTopBar, type TopBarPlace } from '@/components/cowork/CoworkTopBar'
import { EntityLogo } from '@/components/cowork/EntityLogo'
import { entityById, resourceEntryRef, type SourceResource } from '@/lib/coworkSources'
import { COWORK_ENTITIES, COWORK_RESOURCES } from '@/data/coworkSources'
import { cn } from '@/lib/utils'
import { DATA_SECTIONS, DATA_SOURCES_ROUTE, LEGACY_SECTIONS, dataSection, type DataSection } from '@/lib/dataSources'
import { ToolPage } from '@/pages/Tools'
import SourcesView from './SourcesView'
import ResourcesView from './ResourcesView'
import SourcePage from './SourcePage'
// Registers the sample source documents as virtual vault files, which is what
// lets them open in the same popup viewer as a real wiki page. Imported for
// the side effect, once, before anything tries to read one.
import '@/lib/coworkContent'

/**
 * **Data Sources** (`/data-sources`) — the published material a calculation
 * or a workflow reads from, as one chain in three sections:
 *
 *   /data-sources               **Assumptions** — the Assumptions Bank's
 *                               figures, each under the source and document
 *                               it was read from.
 *   /data-sources/sources       **Sources** — the publishers, each opening in
 *                               place on the documents that give data or
 *                               figures.
 *   /data-sources/documents     **Documents** — what they publish, each tagged
 *                               with what it gives: Data, Assumptions.
 *
 * and two kinds of page under it:
 *
 *   /data-sources/<table>       one table, drawn by the Tools tab's `ToolPage`
 *                               — the table a data document opens
 *   /data-sources/<publisher>   one source's own page
 *
 * A published table is a document like any other: it sits under its
 * publisher, and its **Data** tag opens the table. Every section is open to
 * everyone; Workflows stays in Preview. A table slug, a section name and a
 * publisher id never collide — `lib/dataSources.test.ts` holds them apart.
 *
 * **There is no second reader.** A document opens in `ConceptPopup` — the
 * same split pane the study guide reads a concept in. The sample documents are
 * registered as virtual vault files (`lib/coworkContent.ts`) so that stays
 * true. See `docs/cowork.md`.
 */

/** What the search bar can go to besides the publishers: each table, and the Assumptions section. */
const PLACES: TopBarPlace[] = [
  ...TOOLS.filter(t => t.area === 'data').map(t => ({ name: t.name, subtitle: t.answers, to: toolPath(t), kind: 'table' as const })),
  { name: 'Assumptions', subtitle: 'Figures from published documents, each with its page', to: DATA_SOURCES_ROUTE, kind: 'bank' },
]

/** Open a resource page — the document a set of published figures was read from — in the popup. */
async function openVaultResource(name: string) {
  const { default: bundle } = await import('virtual:wiki-content')
  installWikiBundle(bundle)
  useConceptPopup.getState().openAt([{ kind: 'resource', name }], 0, null, null, null, { walk: 'corpus' })
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

  // An address the page had before its sections were Assumptions, Sources and Documents.
  if (id && LEGACY_SECTIONS[id]) return <Navigate to={`${LEGACY_SECTIONS[id]}${search}`} replace />

  const section = dataSection(id)
  return <DataSourcesPage section={section} entityId={section ? null : id ?? null} />
}

function DataSourcesPage({ section, entityId }: { section: DataSection | null; entityId: string | null }) {
  usePageHead(DATA_SOURCES_HEAD)
  const openPopup = useConceptPopup(s => s.openAt)
  const popupOpen = useConceptPopup(s => s.open)

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

  // The publisher's own logo in the sticky header, where an exam page puts the exam's.
  const entity = useMemo(() => (entityId ? entityById(COWORK_ENTITIES, entityId) : null), [entityId])

  // A source's way back leads to the page the reader came from (a
  // workflow's source step, a search), and up to the Sources section for
  // one who landed here — `hooks/useBack.ts`.
  const sourceBack = useBack({ to: '/data-sources/sources', label: 'Sources' })
  usePageLabel(entity?.name ?? (section ? DATA_SECTIONS.find(s => s.id === section)!.label : undefined))

  const backLink = useMemo(
    () =>
      entity ? (
        <Link
          to={sourceBack.to}
          state={RESTORE_SCROLL}
          onClick={sourceBack.onLinkClick}
          aria-label={backLabel(sourceBack)}
          title={backLabel(sourceBack)}
          className="-ml-1.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        >
          <ChevronLeft className="h-5 w-5" />
        </Link>
      ) : null,
    [entity, sourceBack],
  )

  return (
    <div className="min-h-screen">
      <CoworkTopBar
        placeholder="Search data sources"
        pageTitle={entity?.name ?? null}
        pageIcon={entity ? <EntityLogo entity={entity} size="md" /> : undefined}
        backLink={backLink}
        entityId={entityId}
        onOpenResource={openResource}
        places={PLACES}
      />

      <div
        className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6"
        style={popupOpen ? { paddingBottom: 'calc(var(--concept-split-height, 50vh) + 1.5rem)' } : undefined}
      >
        {entityId ? (
          <SourcePage entityId={entityId} onOpenResource={openResource} onBack={sourceBack.go} backLabel={sourceBack.label} />
        ) : (
          <div className="space-y-5">
            <header className="space-y-3">
              <h1 className="text-2xl font-bold tracking-tight">Data Sources</h1>
              {/* The three sections as one switch, always on screen. Each is an
                  address of its own, so a switch is a step Back undoes. */}
              <nav
                className="grid max-w-md grid-cols-3 gap-1 rounded-full bg-muted p-1"
                aria-label="Data Sources sections"
                data-testid="data-sections"
              >
                {DATA_SECTIONS.map(s => (
                  <Link
                    key={s.id}
                    to={s.to}
                    aria-current={section === s.id ? 'page' : undefined}
                    className={cn(inkChip(section === s.id), 'w-full px-2', section !== s.id && 'text-foreground/80')}
                    data-testid={`data-section-${s.id}`}
                  >
                    {s.label}
                  </Link>
                ))}
              </nav>
            </header>
            {section === 'assumptions' && (
              <div className="max-w-2xl">
                <AssumptionsShelf onReadSource={name => void openVaultResource(name)} />
              </div>
            )}
            {section === 'sources' && <SourcesView onOpenResource={openResource} />}
            {section === 'documents' && <ResourcesView onOpenResource={openResource} />}
          </div>
        )}
      </div>

      {/* The one reader. See the note at the top of this file. */}
      <ConceptPopup />
    </div>
  )
}
