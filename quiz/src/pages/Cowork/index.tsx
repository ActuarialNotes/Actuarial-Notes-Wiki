import { useCallback, useMemo } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { ConceptPopup } from '@/components/wiki/ConceptPopup'
import { useConceptPopup } from '@/hooks/useConceptPopup'
import { CoworkTopBar } from '@/components/cowork/CoworkTopBar'
import { ProBadge } from '@/components/ProBadge'
import { resourceEntryRef, type SourceResource } from '@/lib/coworkSources'
import { COWORK_RESOURCES } from '@/data/coworkSources'
import { useCoworkLibrary } from '@/hooks/useCoworkLibrary'
import { useCoworkDeliverables } from '@/hooks/useCoworkDeliverables'
import SourcesView from './SourcesView'
import DeliverablesView from './DeliverablesView'
import DeliverableDetail from './DeliverableDetail'
// Registers Cowork's sample source documents as virtual vault files, which is
// what lets them open in the same popup viewer as a real wiki page. Imported
// for the side effect, once, before anything tries to read one.
import '@/lib/coworkContent'

/**
 * **Cowork** — the second product under the Actuarial Notes roof.
 *
 * Two tabs, which are the two halves of one loop: **Sources** is what an
 * actuary reads, **Deliverables** is what they produce from it. A reader
 * follows publishers and takes documents into a library, scopes a deliverable
 * by answering a short sequence of questions, attaches the documents it is
 * built on, watches the assumptions register fill in from both, and exports the
 * exhibit in a format they can work in.
 *
 * The one thing worth understanding before changing this file: **there is no
 * second reader.** A resource opens in `ConceptPopup` — the same split pane the
 * study guide reads a concept in, with the same page stack, the same actions
 * and the same fact-check record. Cowork's own sample documents are registered
 * as virtual vault files (`lib/coworkContent.ts`) precisely so that stays true.
 * Anything that would need a bespoke viewer should become a page at a
 * vault-shaped path instead.
 *
 * The tab lives in the URL (`/cowork`, `/cowork/deliverables`,
 * `/cowork/deliverables/:id`) so a deliverable can be linked to and the back
 * button works through the loop.
 */

type Tab = 'sources' | 'deliverables'

export default function Cowork() {
  const navigate = useNavigate()
  const params = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  const openPopup = useConceptPopup(s => s.openAt)
  const popupOpen = useConceptPopup(s => s.open)
  const libraryCount = useCoworkLibrary(s => s.resourceIds.length)
  const deliverableCount = useCoworkDeliverables(s => s.deliverables.length)

  const tab: Tab = params.tab === 'deliverables' ? 'deliverables' : 'sources'
  const deliverableId = params.id ?? null

  // The search term lives in the URL too, so a filtered view is a link.
  const query = searchParams.get('q') ?? ''
  const setQuery = useCallback(
    (value: string) => {
      setSearchParams(
        prev => {
          const next = new URLSearchParams(prev)
          if (value) next.set('q', value)
          else next.delete('q')
          return next
        },
        { replace: true },
      )
    },
    [setSearchParams],
  )

  /**
   * Open a document in the popup viewer.
   *
   * The walk handed to the popup is every *openable* document in the catalogue,
   * so Previous / Next steps through the corpus rather than dead-ending on the
   * one that was clicked — the same behaviour a concept gets when opened from a
   * syllabus page.
   */
  const openResource = useCallback(
    (resource: SourceResource) => {
      const refs = COWORK_RESOURCES.map(r => ({ resource: r, ref: resourceEntryRef(r) })).filter(
        (x): x is { resource: SourceResource; ref: NonNullable<ReturnType<typeof resourceEntryRef>> } =>
          x.ref !== null,
      )
      const index = refs.findIndex(x => x.resource.id === resource.id)
      if (index < 0) return
      // `walk: 'corpus'` drops the footer's syllabus-filter picker: these are
      // documents, not a slice of an exam (see `hooks/useConceptPopup.ts`).
      openPopup(refs.map(x => x.ref), index, null, undefined, undefined, { walk: 'corpus' })
    },
    [openPopup],
  )

  const tabs = useMemo(
    () => [
      { id: 'sources', label: 'Sources', count: libraryCount },
      { id: 'deliverables', label: 'Deliverables', count: deliverableCount },
    ],
    [libraryCount, deliverableCount],
  )

  function goTab(id: string) {
    navigate(id === 'sources' ? '/cowork' : '/cowork/deliverables')
  }

  return (
    <div className="min-h-screen">
      <CoworkTopBar
        query={query}
        onQueryChange={setQuery}
        placeholder={tab === 'sources' ? 'Search sources and documents' : 'Search your deliverables'}
        tabs={tabs}
        activeTab={tab}
        onTabChange={goTab}
      />

      <div
        className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6"
        style={popupOpen ? { paddingBottom: 'calc(var(--concept-split-height, 50vh) + 1.5rem)' } : undefined}
      >
        <header className="mb-5">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-2xl font-bold text-foreground">Cowork</h1>
            <span className="rounded-full bg-amber-500/15 px-2 py-0.5 text-[11px] font-semibold leading-none text-amber-600 dark:text-amber-400">
              Preview
            </span>
            <ProBadge />
          </div>
          <p className="mt-1 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Follow the entities that publish what you work from, and turn what they publish into the analyses,
            reports and documentation you produce. Entries marked{' '}
            <span className="font-medium text-foreground">Sample</span> stand for a class of document rather than
            naming one Cowork carries yet — cite the real thing.
          </p>
        </header>

        {deliverableId ? (
          <DeliverableDetail
            deliverableId={deliverableId}
            onBack={() => navigate('/cowork/deliverables')}
            onOpenResource={openResource}
            onBrowseSources={() => navigate('/cowork')}
          />
        ) : tab === 'deliverables' ? (
          <DeliverablesView query={query} onOpen={id => navigate(`/cowork/deliverables/${id}`)} />
        ) : (
          <SourcesView query={query} onOpenResource={openResource} />
        )}
      </div>

      {/* The one reader. See the note at the top of this file. */}
      <ConceptPopup />
    </div>
  )
}
