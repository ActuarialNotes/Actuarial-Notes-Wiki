// The **Data Sources** page's sections and addresses (`pages/DataSources`).
// Pure, so the sidebar, the page and the route table read one list.
//
// Three sections, one chain: a **source** (a publisher) publishes
// **documents**, and a document gives a reader its text, a table the app reads
// (data), or figures in the Assumptions Bank (assumptions).
//
//   /data-sources               Assumptions — the Assumptions Bank's figures
//   /data-sources/sources       Sources — the publishers
//   /data-sources/documents     Documents — what they publish
//   /data-sources/<table>       one table — a Data Sources tool's page
//   /data-sources/<publisher>   one source's page
//
// A section name, a table slug and a publisher id share the one segment, so
// they must never collide (`dataSources.test.ts`). The addresses the page had
// before (`/assumptions`, `/publishers`) still land, through `LEGACY_SECTIONS`.

import { runPath } from './tools/share'
import type { ResourceTool } from './coworkSources'

export type DataSection = 'assumptions' | 'sources' | 'documents'

export const DATA_SOURCES_ROUTE = '/data-sources'

export interface DataSectionSpec {
  id: DataSection
  label: string
  to: string
}

/** The sections, in the order the page's switch draws them. */
export const DATA_SECTIONS: DataSectionSpec[] = [
  { id: 'assumptions', label: 'Assumptions', to: DATA_SOURCES_ROUTE },
  { id: 'sources', label: 'Sources', to: `${DATA_SOURCES_ROUTE}/sources` },
  { id: 'documents', label: 'Documents', to: `${DATA_SOURCES_ROUTE}/documents` },
]

/** Old section addresses, and where each one lives now. */
export const LEGACY_SECTIONS: Record<string, string> = {
  assumptions: DATA_SOURCES_ROUTE,
  publishers: `${DATA_SOURCES_ROUTE}/sources`,
  tables: `${DATA_SOURCES_ROUTE}/documents`,
}

/** The section a `/data-sources/:id` segment names: the bare page is Assumptions, and anything else is null. */
export function dataSection(id: string | undefined): DataSection | null {
  if (!id) return 'assumptions'
  const named = DATA_SECTIONS.find(s => s.id === id && s.id !== 'assumptions')
  return named ? named.id : null
}

/** A source's own page. */
export function publisherPath(entityId: string): string {
  return `${DATA_SOURCES_ROUTE}/${entityId}`
}

/** The table a data document opens: its tool's page, pointed at this document's file. */
export function resourceTablePath(tool: ResourceTool): string {
  return runPath(tool.slug, tool.input, 'data')
}

/** The Assumptions section narrowed to one document's set of figures. */
export function assumptionSetPath(setId: string): string {
  return `${DATA_SOURCES_ROUTE}?set=${encodeURIComponent(setId)}`
}
