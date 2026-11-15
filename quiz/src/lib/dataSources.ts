// The **Data Sources** page's addresses (`pages/DataSources`). Pure, so the
// sidebar, the page and the route table read one list.
//
// The page is one catalogue (`lib/dataCatalogue.ts`): every value, table and
// document a model can take from a published source, filtered by what rides
// the address's query (`?need=…&type=…&region=…&ready=1&set=…&item=…`).
//
//   /data-sources               the catalogue
//   /data-sources/<publisher>   the catalogue, narrowed to one publisher
//   /data-sources/<table>       one table — a Data Sources tool's page
//
// A table slug and a publisher id share the one segment, so they must never
// collide with each other or with a section the page used to have
// (`dataSources.test.ts`). Those old sections still land, through
// `LEGACY_SECTIONS`.

import { runPath } from './tools/share'
import type { ResourceTool } from './coworkSources'

export const DATA_SOURCES_ROUTE = '/data-sources'

/** The sections the page had before it was one catalogue, and the filter each one is now. */
export const LEGACY_SECTIONS: Record<string, string> = {
  assumptions: '',
  sources: '',
  publishers: '',
  documents: 'type=document',
  tables: 'type=table',
}

/** Where an old section's address lands, keeping the query it came with. */
export function legacySectionPath(section: string, search: string): string | null {
  const filter = LEGACY_SECTIONS[section]
  if (filter === undefined) return null
  const params = new URLSearchParams(search)
  for (const [key, value] of new URLSearchParams(filter)) params.set(key, value)
  const query = params.toString()
  return query ? `${DATA_SOURCES_ROUTE}?${query}` : DATA_SOURCES_ROUTE
}

/** A source's own page. */
export function publisherPath(entityId: string): string {
  return `${DATA_SOURCES_ROUTE}/${entityId}`
}

/** The table a data document opens: its tool's page, pointed at this document's file. */
export function resourceTablePath(tool: ResourceTool): string {
  return runPath(tool.slug, tool.input, 'data')
}

/** The catalogue narrowed to one document's set of values. */
export function assumptionSetPath(setId: string): string {
  return `${DATA_SOURCES_ROUTE}?set=${encodeURIComponent(setId)}`
}
