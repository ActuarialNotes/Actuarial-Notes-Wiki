/**
 * What Cowork's popup viewer reads from.
 *
 * Two registrations, and between them they are the whole of requirement 1 —
 * "resources open in the popup viewer":
 *
 *  1. **The wiki bundle.** A Cowork resource that is a vault page has to open
 *     from the *bundle*, not from the network. `WikiLayout` installs this
 *     lookup for the wiki routes, but Cowork never mounts `WikiLayout`, so
 *     without this a source card opened onto "Couldn't load …" for anyone
 *     behind a rate limit, an outage or no connection at all — the same failure
 *     the exam-page bundle exists to prevent (`virtual:exam-pages` in
 *     `vite.config.ts`). Installing the same lookup here is idempotent: both
 *     callers hand over the same bundle.
 *
 *  2. **Cowork's own sample documents**, registered as virtual vault files, so
 *     they are pages at vault-shaped paths rather than a second kind of thing
 *     with a second reader. `ConceptPagePanel` fetches one, `WikiArticle`
 *     renders it, its `[[wiki links]]` resolve into the vault, and the page
 *     stack works over it exactly as it works over a concept.
 *
 * `virtual:wiki-content` carries every folder under `Resources/` — the type
 * folders a resource page lives in (`lib/resourceFolders.ts`) and the
 * timeline and data pages beside them — so any of them opens offline.
 *
 * Imported for its side effects, once, at the top of the Cowork page.
 */

import wikiBundle from 'virtual:wiki-content'
import { registerVirtualWikiFiles } from '@/lib/github'
import { installWikiBundle } from '@/lib/wikiBundle'
import { COWORK_DOCS } from '@/data/coworkDocs'

installWikiBundle(wikiBundle)
registerVirtualWikiFiles(COWORK_DOCS)

export { COWORK_DOCS }
