/**
 * The last run of each tool this session (docs/actuarial-tools.md §6.6): what a
 * cell's stepper offers as candidates — the averages of the triangle the
 * reader just worked in Age-to-Age Factors, say — without the reader carrying
 * them across by hand. Inputs only; a result is recomputed from them, so it is
 * always the engine's. sessionStorage, so it ends with the tab, and every
 * access is guarded (a private window may refuse it).
 */

import type { ToolInput } from '@/lib/tools'

const KEY = 'tools:last-runs'
let memory: Record<string, ToolInput> | null = null

function load(): Record<string, ToolInput> {
  if (memory) return memory
  try {
    memory = JSON.parse(sessionStorage.getItem(KEY) ?? '{}') ?? {}
  } catch {
    memory = {}
  }
  return memory!
}

export function rememberRun(toolId: string, input: ToolInput): void {
  const runs = load()
  runs[toolId] = input
  try {
    sessionStorage.setItem(KEY, JSON.stringify(runs))
  } catch {
    // Kept in memory for this page only.
  }
}

export function lastRun(toolId: string): ToolInput | undefined {
  return load()[toolId]
}
