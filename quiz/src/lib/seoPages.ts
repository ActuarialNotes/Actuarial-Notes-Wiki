// The build's description of every wiki page (`virtual:seo-pages`, written by
// `seoPagesPlugin` from `lib/seo.ts`), looked up by route.
//
// Imported only from the wiki's page chunks: it is a thousand pages' titles and
// descriptions, and belongs with the wiki bundle rather than the app shell.

import pages from 'virtual:seo-pages'
import type { SeoPage } from '@/lib/seo'

const byPath = new Map(pages.map(page => [page.path.toLowerCase(), page]))

/** The page a route names, whatever the case of its slug. */
export function seoPageFor(path: string): SeoPage | undefined {
  return byPath.get(path.toLowerCase())
}
