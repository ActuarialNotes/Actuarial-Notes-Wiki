/**
 * The Tools page's search (docs/actuarial-tools.md §6.2): which tools a query
 * finds, best first, ranked the way every other search bar in the app ranks
 * (`searchBy` in `lib/appSearch.ts`) on what a tool is found by
 * (`toolSearchText` — the same words the connector's `list_tools` matches).
 * Pure and tested.
 */

import { TOOLS, toolSearchText, type PracticeArea, type ToolSpec } from '@/lib/tools'
import { searchBy } from '@/lib/appSearch'

/** The tools a query finds, in one practice area or all of them. An empty query finds none. */
export function searchTools(query: string, area: PracticeArea | null = null, tools: readonly ToolSpec[] = TOOLS): ToolSpec[] {
  const pool = area ? tools.filter(t => t.area === area) : tools
  return searchBy(pool, query, toolSearchText, pool.length)
}

/** How many of a query's results fall in each practice area — what each scope pill would leave. */
export function areaCounts(query: string, tools: readonly ToolSpec[] = TOOLS): Partial<Record<PracticeArea, number>> {
  const counts: Partial<Record<PracticeArea, number>> = {}
  for (const t of searchTools(query, null, tools)) counts[t.area] = (counts[t.area] ?? 0) + 1
  return counts
}
