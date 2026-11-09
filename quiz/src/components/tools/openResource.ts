import { useConceptPopup } from '@/hooks/useConceptPopup'
import { installWikiBundle } from '@/lib/wikiBundle'

/**
 * Open the resource page a published figure was read from, in the concept
 * popup — the one reader (docs/cowork.md). The wiki bundle is fetched on the
 * first tap, as a tool's method is.
 */
export async function openResourcePage(name: string) {
  const { default: bundle } = await import('virtual:wiki-content')
  installWikiBundle(bundle)
  useConceptPopup.getState().openAt([{ kind: 'resource', name }], 0, null, null, null, { walk: 'corpus' })
}
