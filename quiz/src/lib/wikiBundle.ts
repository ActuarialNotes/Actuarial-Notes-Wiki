// Installing the wiki bundle (`virtual:wiki-content`) — one call for the three
// things every surface that reads vault pages without mounting `WikiLayout`
// needs: the file lookup `fetchWikiFile` reads first, the bundled index, and
// where each resource page outside `Resources/Books/` lives
// (`lib/resourceFolders.ts`). Idempotent: every caller hands over the same
// bundle.

import { setWikiContentLookup } from './github'
import { setWikiIndexBundle, type WikiIndexItem } from './wikiIndex'
import { isResourcePage, registerResourcePaths } from './resourceFolders'

export interface WikiBundle {
  files: Record<string, string>
  index: WikiIndexItem[]
}

export function installWikiBundle(bundle: WikiBundle): void {
  setWikiContentLookup((path: string) => bundle.files[path])
  setWikiIndexBundle(bundle.index)
  registerResourcePaths(Object.keys(bundle.files), path => isResourcePage(path, bundle.files[path] ?? ''))
}
