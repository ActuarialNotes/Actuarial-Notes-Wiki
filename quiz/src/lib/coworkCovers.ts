/**
 * A Cowork resource's **cover**, when the vault already has one.
 *
 * A resource card is the same object the study guide's resource shelf is built
 * from (`components/wiki/SourceMaterialGallery.tsx`), and what leads that card
 * is the work's jacket. Cowork's wiki-backed resources *are* vault pages, so
 * their covers already exist — this is the lookup that finds one, keyed the way
 * a `[[wiki link]]` addresses a page: by name, case-insensitively.
 *
 * Nothing is drawn here and nothing is guessed: a resource whose page carries
 * no cover, and every Cowork-only sample document, has none, and the card leads
 * with its document-kind icon instead.
 *
 * Pure and tested.
 */

import type { WikiIndexItem } from '@/lib/wikiIndex'
import type { SourceResource } from '@/lib/coworkSources'

/** Cover image URLs by vault page name, lower-cased. */
export type CoverLookup = Map<string, string>

export function buildCoverLookup(items: WikiIndexItem[]): CoverLookup {
  const map: CoverLookup = new Map()
  for (const item of items) {
    if (item.coverImage) map.set(item.name.toLowerCase(), item.coverImage)
  }
  return map
}

/** The cover for one resource, or `undefined` when the vault has none. */
export function resourceCover(lookup: CoverLookup, resource: SourceResource): string | undefined {
  if (!resource.wikiRef) return undefined
  return lookup.get(resource.wikiRef.name.toLowerCase())
}
