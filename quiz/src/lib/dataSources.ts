// The **Data Sources** page's sections and addresses (`pages/DataSources`).
// Pure, so the sidebar, the page and the route table read one list.
//
//   /data-sources               Tables — the published tables (open to everyone)
//   /data-sources/assumptions   the Assumptions Bank (open to everyone)
//   /data-sources/publishers    Publishers (Preview)
//   /data-sources/documents     Documents (Preview)
//   /data-sources/<table>       one table — a Data Sources tool's page
//   /data-sources/<publisher>   one publisher's page (Preview)
//
// A section name, a table slug and a publisher id share the one segment, so
// they must never collide (`dataSources.test.ts`).

export type DataSection = 'tables' | 'assumptions' | 'publishers' | 'documents'

export const DATA_SOURCES_ROUTE = '/data-sources'

export interface DataSectionSpec {
  id: DataSection
  label: string
  to: string
  /** In Preview: shown to approved accounts only (`lib/workflowsAccess.ts`). */
  preview: boolean
}

/** The sections, in the order the page's chips draw them. */
export const DATA_SECTIONS: DataSectionSpec[] = [
  { id: 'tables', label: 'Tables', to: DATA_SOURCES_ROUTE, preview: false },
  { id: 'assumptions', label: 'Assumptions Bank', to: `${DATA_SOURCES_ROUTE}/assumptions`, preview: false },
  { id: 'publishers', label: 'Publishers', to: `${DATA_SOURCES_ROUTE}/publishers`, preview: true },
  { id: 'documents', label: 'Documents', to: `${DATA_SOURCES_ROUTE}/documents`, preview: true },
]

/** The section a `/data-sources/:id` segment names: none for the page itself is Tables, and null for anything else. */
export function dataSection(id: string | undefined): DataSection | null {
  if (!id) return 'tables'
  const named = DATA_SECTIONS.find(s => s.id === id && s.id !== 'tables')
  return named ? named.id : null
}

/** A publisher's own page. */
export function publisherPath(entityId: string): string {
  return `${DATA_SOURCES_ROUTE}/${entityId}`
}
