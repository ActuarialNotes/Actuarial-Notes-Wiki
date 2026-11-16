// From a concept to the tool that computes it (docs/design-review.md §5.6, F13).
//
// A tool names the concept pages its method is taught on (`ToolSpec.method.concepts`)
// and links to them. This is the same list read the other way, so a concept page
// can offer **Open in <tool>**.
//
// The tools engine is half a megabyte and the concept popup is in the first
// paint, so the popup never imports the registry. It reads
// `data/conceptTools.json`, which `npm run tools:bundle` writes from the engine
// and `conceptTools.test.ts` holds to it.
//
// Pure.

/** A tool as a concept page offers it: its name and its page in the app. */
export interface ConceptTool {
  name: string
  path: string
}

/** Tools by lowercased concept page name, the best match first. */
export type ConceptToolIndex = Record<string, ConceptTool[]>

/** What the index is built from: the part of a `ToolSpec` it reads, and the tool's path. */
export interface ConceptToolSource {
  name: string
  area: string
  concepts: readonly string[]
  path: string
}

/**
 * Every concept a tool names, with the tools that name it. A tool that names
 * the concept first (the method it is) comes before one that names it later
 * (a method it uses), and a calculator before a published table; the catalogue's
 * own order settles the rest.
 */
export function buildConceptTools(tools: readonly ConceptToolSource[]): ConceptToolIndex {
  const found = new Map<string, { tool: ConceptTool; rank: number; data: number; order: number }[]>()
  tools.forEach((t, order) => {
    t.concepts.forEach((concept, rank) => {
      const key = concept.trim().toLowerCase()
      if (!key) return
      const list = found.get(key) ?? []
      if (list.some(e => e.tool.path === t.path)) return
      list.push({ tool: { name: t.name, path: t.path }, rank, data: t.area === 'data' ? 1 : 0, order })
      found.set(key, list)
    })
  })
  const index: ConceptToolIndex = {}
  for (const key of [...found.keys()].sort()) {
    index[key] = found.get(key)!
      .sort((a, b) => a.rank - b.rank || a.data - b.data || a.order - b.order)
      .map(e => e.tool)
  }
  return index
}

/** The tools that compute this concept, the best match first; none for most concepts. */
export function toolsForConcept(index: ConceptToolIndex, concept: string): ConceptTool[] {
  return index[concept.trim().toLowerCase()] ?? []
}
