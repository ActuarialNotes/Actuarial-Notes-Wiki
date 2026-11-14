import { useCallback, useMemo } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { ChevronLeft, Table2 } from 'lucide-react'
import { ConceptPopup } from '@/components/wiki/ConceptPopup'
import { useConceptPopup } from '@/hooks/useConceptPopup'
import { backLabel, useBack, usePageLabel } from '@/hooks/useBack'
import { usePageHead } from '@/hooks/usePageHead'
import { useWorkflowsAccess } from '@/hooks/useWorkflowsAccess'
import { RESTORE_SCROLL } from '@/lib/routeScrollMemory'
import { DATA_SOURCES_HEAD } from '@/lib/seo'
import { installWikiBundle } from '@/lib/wikiBundle'
import { TOOLS, toolBySlug, toolPath } from '@/lib/tools'
import { inkChip } from '@/components/ui/ink'
import { ListPanel, ListRow } from '@/components/ui/ListPanel'
import { LogoTile } from '@/components/LogoTile'
import { AssumptionsShelf } from '@/components/assumptions/AssumptionsShelf'
import { CoworkTopBar, type TopBarPlace } from '@/components/cowork/CoworkTopBar'
import { EntityLogo } from '@/components/cowork/EntityLogo'
import { entityById, resourceEntryRef, type SourceResource } from '@/lib/coworkSources'
import { COWORK_ENTITIES, COWORK_RESOURCES } from '@/data/coworkSources'
import { cn } from '@/lib/utils'
import { DATA_SECTIONS, dataSection, type DataSection } from '@/lib/dataSources'
import { ToolPage } from '@/pages/Tools'
import SourcesView from './SourcesView'
import ResourcesView from './ResourcesView'
import SourcePage from './SourcePage'
// Registers the sample source documents as virtual vault files, which is what
// lets them open in the same popup viewer as a real wiki page. Imported for
// the side effect, once, before anything tries to read one.
import '@/lib/coworkContent'

/**
 * **Data Sources** (`/data-sources`) — the published data a calculation or a
 * workflow reads from, in one place, as four sections:
 *
 *   /data-sources               **Tables** — the Data Sources tools (area
 *                               `data`): life tables, price indexes, yield
 *                               curves, insurer filings. Open to everyone.
 *   /data-sources/assumptions   the **Assumptions Bank** — figures and facts a
 *                               published document states. Open to everyone.
 *   /data-sources/publishers    **Publishers** — the entities a reader follows.
 *   /data-sources/documents     **Documents** — what they publish.
 *
 * and three kinds of page under it:
 *
 *   /data-sources/<table>       one table, drawn by the Tools tab's `ToolPage`
 *   /data-sources/<publisher>   one publisher's own page
 *
 * Publishers and Documents (and a publisher's page) are in Preview, for the
 * accounts `lib/workflowsAccess.ts` approves; to anyone else the page is its
 * tables and the bank, and those addresses lead back here. A table slug, a
 * section name and a publisher id never collide — `lib/dataSources.test.ts`
 * holds them apart.
 *
 * **There is no second reader.** A document opens in `ConceptPopup` — the
 * same split pane the study guide reads a concept in. The sample documents are
 * registered as virtual vault files (`lib/coworkContent.ts`) so that stays
 * true. See `docs/cowork.md`.
 */

/** The published tables: the Data Sources tools. */
const TABLES = TOOLS.filter(t => t.area === 'data')

/** What the search bar can go to besides the publishers: each table, and the bank. */
const PLACES: TopBarPlace[] = [
  ...TABLES.map(t => ({ name: t.name, subtitle: t.answers, to: toolPath(t), kind: 'table' as const })),
  { name: 'Assumptions Bank', subtitle: 'Figures from published documents, each with its page', to: '/data-sources/assumptions', kind: 'bank' },
]

/** Open a resource page — the document a set of published figures was read from — in the popup. */
async function openVaultResource(name: string) {
  const { default: bundle } = await import('virtual:wiki-content')
  installWikiBundle(bundle)
  useConceptPopup.getState().openAt([{ kind: 'resource', name }], 0, null, null, null, { walk: 'corpus' })
}

export default function DataSources() {
  const { id } = useParams()
  const approved = useWorkflowsAccess()

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

  const section = dataSection(id)
  const entityId = section ? null : id ?? null
  // Publishers, Documents and a publisher's page are for approved accounts.
  if ((section && DATA_SECTIONS.find(s => s.id === section)!.preview && !approved) || (entityId && !approved)) {
    return <Navigate to="/data-sources" replace />
  }
  return <DataSourcesPage section={section} entityId={entityId} approved={approved} />
}

function DataSourcesPage({ section, entityId, approved }: { section: DataSection | null; entityId: string | null; approved: boolean }) {
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

  // A publisher's way back leads to the page the reader came from (a
  // workflow's source step, a search), and up to the Publishers section for
  // one who landed here — `hooks/useBack.ts`.
  const sourceBack = useBack({ to: '/data-sources/publishers', label: 'Publishers' })
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

  const sections = DATA_SECTIONS.filter(s => approved || !s.preview)

  return (
    <div className="min-h-screen">
      <CoworkTopBar
        placeholder={approved ? 'Search tables, publishers and documents' : 'Search data sources'}
        pageTitle={entity?.name ?? null}
        pageIcon={entity ? <EntityLogo entity={entity} size="md" /> : undefined}
        backLink={backLink}
        entityId={entityId}
        onOpenResource={openResource}
        places={PLACES}
        catalogue={approved}
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
              {/* The sections, always on screen. Each is an address of its own
                  but the same page, so a switch replaces rather than pushes. */}
              <nav
                className="-mx-4 flex gap-1.5 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0"
                aria-label="Data Sources sections"
                data-testid="data-sections"
              >
                {sections.map(s => (
                  <Link
                    key={s.id}
                    to={s.to}
                    replace
                    aria-current={section === s.id ? 'page' : undefined}
                    className={cn(inkChip(section === s.id), 'shrink-0')}
                    data-testid={`data-section-${s.id}`}
                  >
                    {s.label}
                  </Link>
                ))}
              </nav>
            </header>
            {section === 'tables' && <TablesSection />}
            {section === 'assumptions' && (
              <div className="mx-auto max-w-2xl">
                <AssumptionsShelf onReadSource={name => void openVaultResource(name)} />
              </div>
            )}
            {section === 'publishers' && <SourcesView />}
            {section === 'documents' && <ResourcesView onOpenResource={openResource} />}
          </div>
        )}
      </div>

      {/* The one reader. See the note at the top of this file. */}
      <ConceptPopup />
    </div>
  )
}

/** The published tables, a row each: its name and the question it answers. */
function TablesSection() {
  return (
    <div className="mx-auto max-w-3xl">
      <ListPanel>
        {TABLES.map(t => (
          <ListRow
            key={t.id}
            to={toolPath(t)}
            leading={
              <LogoTile size="lg" className="bg-muted text-foreground">
                <Table2 className="h-6 w-6" aria-hidden />
              </LogoTile>
            }
            title={t.name}
            subtitle={t.answers}
            subtitleLines={2}
            data-testid="data-table-row"
          />
        ))}
      </ListPanel>
    </div>
  )
}
