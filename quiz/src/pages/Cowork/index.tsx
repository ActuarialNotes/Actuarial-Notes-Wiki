import { useCallback, useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'
import { ConceptPopup } from '@/components/wiki/ConceptPopup'
import { useConceptPopup } from '@/hooks/useConceptPopup'
import { backLabel, useBack, usePageLabel } from '@/hooks/useBack'
import { RESTORE_SCROLL } from '@/lib/routeScrollMemory'
import { CoworkTopBar } from '@/components/cowork/CoworkTopBar'
import { EntityLogo } from '@/components/cowork/EntityLogo'
import { entityById, resourceEntryRef, type SourceResource } from '@/lib/coworkSources'
import { COWORK_ENTITIES, COWORK_RESOURCES } from '@/data/coworkSources'
import SourcesView from './SourcesView'
import SourcePage from './SourcePage'
// Registers Cowork's sample source documents as virtual vault files, which is
// what lets them open in the same popup viewer as a real wiki page. Imported
// for the side effect, once, before anything tries to read one.
import '@/lib/coworkContent'

/**
 * **Cowork** — the second product under the Actuarial Notes roof.
 *
 * Two places, which are the two halves of one loop: **Sources** is what an
 * actuary reads, **Workflows** is what they do with it. A reader follows
 * publishers and takes documents into a library, then lays those documents on
 * a workflow's board as steps beside the calculations they feed
 * (`pages/WorkflowBuilder.tsx`, at `/cowork/workflows` — its own full-screen
 * board, so it is not drawn by this page). Which place you are in is chosen in
 * the sidebar, like every other route in the app — this page carries no tab
 * row.
 *
 * The one thing worth understanding before changing this file: **there is no
 * second reader.** A resource opens in `ConceptPopup` — the same split pane the
 * study guide reads a concept in, with the same page stack, the same actions
 * and the same fact-check record. Cowork's own sample documents are registered
 * as virtual vault files (`lib/coworkContent.ts`) precisely so that stays true.
 * Anything that would need a bespoke viewer should become a page at a
 * vault-shaped path instead.
 *
 * Two addresses here, and a source is one of them, the way an exam's study
 * guide is (`/cowork`, `/cowork/sources/:id`), so a source can be linked to and
 * the back button works through the loop. The search is not among them: it
 * is a question the bar answers with a list of places to go
 * (`components/cowork/CoworkTopBar.tsx`), exactly as the wiki's is, so there is
 * no filtered state of a page for a URL to carry.
 */

export default function Cowork() {
  const params = useParams()
  const openPopup = useConceptPopup(s => s.openAt)
  const popupOpen = useConceptPopup(s => s.open)

  const entityId = params.tab === 'sources' ? params.id ?? null : null

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

  // A source's way back leads to the page the reader came from (a workflow's
  // source step, a search), and up to the shelf for one who landed here —
  // `hooks/useBack.ts`.
  const sourceBack = useBack({ to: '/cowork', label: 'Sources' })
  // A source names its entry, so the page after it can say "Back to OSFI".
  usePageLabel(entity?.name)

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
        placeholder="Search sources and documents"
        pageTitle={entity?.name ?? null}
        pageIcon={entity ? <EntityLogo entity={entity} size="md" /> : undefined}
        backLink={backLink}
        entityId={entityId}
        onOpenResource={openResource}
      />

      <div
        className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6"
        style={popupOpen ? { paddingBottom: 'calc(var(--concept-split-height, 50vh) + 1.5rem)' } : undefined}
      >
        {entityId ? (
          <SourcePage entityId={entityId} onOpenResource={openResource} onBack={sourceBack.go} backLabel={sourceBack.label} />
        ) : (
          <SourcesView onOpenResource={openResource} />
        )}
      </div>

      {/* The one reader. See the note at the top of this file. */}
      <ConceptPopup />
    </div>
  )
}
