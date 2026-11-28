import { lazy, Suspense } from 'react'
import { useConceptPopup, useConceptPopupMounts } from '@/hooks/useConceptPopup'
import { useSoundOnMount } from '@/hooks/useSoundEffects'

// The reader (and the wiki's article renderer behind it) is fetched the first
// time a concept is opened on a page with no reader of its own.
const ConceptPopup = lazy(() =>
  import('@/components/wiki/ConceptPopup').then(m => ({ default: m.ConceptPopup })),
)

/** The pane arriving: the reader's own open cue never fires for one mounted open. */
function Opened() {
  useSoundOnMount('open')
  return <ConceptPopup fallback />
}

/**
 * **A concept opens over the page it was tapped on, wherever that is.** Most
 * pages mount the concept reader themselves, inside their own layout. This is
 * the reader for every page that doesn't (a question's own page, the Store,
 * You): mounted once at the app's root, and drawn only while a concept is open
 * and no page's reader is there to show it.
 */
export function ConceptPopupHost() {
  const open = useConceptPopup(s => s.open)
  const pageHasReader = useConceptPopupMounts(s => s.count > 0)
  if (!open || pageHasReader) return null
  return (
    <Suspense fallback={null}>
      <Opened />
    </Suspense>
  )
}
