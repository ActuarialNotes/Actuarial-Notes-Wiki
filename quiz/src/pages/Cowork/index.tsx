import { useCallback, useMemo } from 'react'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'
import { ConceptPopup } from '@/components/wiki/ConceptPopup'
import { useConceptPopup } from '@/hooks/useConceptPopup'
import { CoworkTopBar } from '@/components/cowork/CoworkTopBar'
import { EntityLogo } from '@/components/cowork/EntityLogo'
import { entityById, resourceEntryRef, type SourceResource } from '@/lib/coworkSources'
import { COWORK_ENTITIES, COWORK_RESOURCES } from '@/data/coworkSources'
import SourcesView from './SourcesView'
import SourcePage from './SourcePage'
import DeliverablesView from './DeliverablesView'
import DeliverableDetail from './DeliverableDetail'
// Registers Cowork's sample source documents as virtual vault files, which is
// what lets them open in the same popup viewer as a real wiki page. Imported
// for the side effect, once, before anything tries to read one.
import '@/lib/coworkContent'

/**
 * **Cowork** — the second product under the Actuarial Notes roof.
 *
 * Two places, which are the two halves of one loop: **Sources** is what an
 * actuary reads, **Deliverables** is what they produce from it. A reader
 * follows publishers and takes documents into a library, scopes a deliverable
 * by answering a short sequence of questions, attaches the documents it is
 * built on, watches the assumptions register fill in from both, and exports the
 * exhibit in a format they can work in. Which place you are in is chosen in the
 * sidebar, like every other route in the app — this page carries no tab row.
 *
 * The one thing worth understanding before changing this file: **there is no
 * second reader.** A resource opens in `ConceptPopup` — the same split pane the
 * study guide reads a concept in, with the same page stack, the same actions
 * and the same fact-check record. Cowork's own sample documents are registered
 * as virtual vault files (`lib/coworkContent.ts`) precisely so that stays true.
 * Anything that would need a bespoke viewer should become a page at a
 * vault-shaped path instead.
 *
 * Four addresses, and a source is one of them, the way an exam's study guide is
 * (`/cowork`, `/cowork/sources/:id`, `/cowork/deliverables`,
 * `/cowork/deliverables/:id`), so a source or a deliverable can be linked to
 * and the back button works through the loop.
 */

export default function Cowork() {
  const navigate = useNavigate()
  const params = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  const openPopup = useConceptPopup(s => s.openAt)
  const popupOpen = useConceptPopup(s => s.open)

  const onDeliverables = params.tab === 'deliverables'
  const entityId = params.tab === 'sources' ? params.id ?? null : null
  const deliverableId = onDeliverables ? params.id ?? null : null

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

  // The source's own logo in the sticky header, where an exam page puts the
  // exam's — the strip says which source you are in with the mark you picked it
  // with, rather than restating the heading a few pixels below it.
  const entity = useMemo(() => (entityId ? entityById(COWORK_ENTITIES, entityId) : null), [entityId])

  const backLink = useMemo(
    () =>
      entity ? (
        <Link
          to="/cowork"
          aria-label="All sources"
          title="All sources"
          className="-ml-1.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        >
          <ChevronLeft className="h-5 w-5" />
        </Link>
      ) : null,
    [entity],
  )

  return (
    <div className="min-h-screen">
      <CoworkTopBar
        query={query}
        onQueryChange={setQuery}
        placeholder={onDeliverables ? 'Search your deliverables' : 'Search sources and documents'}
        pageTitle={entity?.name ?? null}
        pageIcon={entity ? <EntityLogo entity={entity} size="md" /> : undefined}
        backLink={backLink}
      />

      <div
        className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6"
        style={popupOpen ? { paddingBottom: 'calc(var(--concept-split-height, 50vh) + 1.5rem)' } : undefined}
      >
        {deliverableId ? (
          <DeliverableDetail
            deliverableId={deliverableId}
            onBack={() => navigate('/cowork/deliverables')}
            onOpenResource={openResource}
            onBrowseSources={() => navigate('/cowork')}
          />
        ) : onDeliverables ? (
          <DeliverablesView query={query} onOpen={id => navigate(`/cowork/deliverables/${id}`)} />
        ) : entityId ? (
          <SourcePage
            entityId={entityId}
            query={query}
            onOpenResource={openResource}
            onBack={() => navigate('/cowork')}
          />
        ) : (
          <SourcesView query={query} onOpenResource={openResource} />
        )}
      </div>

      {/* The one reader. See the note at the top of this file. */}
      <ConceptPopup />
    </div>
  )
}
