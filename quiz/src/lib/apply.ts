/**
 * **Apply's home** (`/apply`, docs/redesign-spec.md §7c.1): what its three
 * cards say. Projects, Tools and Workflows, in that order (R19), each a card
 * tapped into, each with one count in its heading and what the reader last
 * touched under it.
 *
 * A card never disappears for want of something to count (decided 2026-11-23):
 * an exam with no tools of its own reads the whole catalogue's count, and a
 * reader with no attempt reads how many briefs there are.
 *
 * Pure and tested; `pages/Apply.tsx` draws it.
 */

import type { ProjectAttempt } from './pcpaAttempt'
import type { RecentTool } from './toolRecent'

const plural = (n: number, one: string, many: string) => `${n} ${n === 1 ? one : many}`

// ── Projects ────────────────────────────────────────────────────────────────

/** The attempts still open, the one worked on last first. */
export function openAttempts<A extends Pick<ProjectAttempt, 'submittedAt' | 'updatedAt'>>(attempts: readonly A[]): A[] {
  return attempts.filter(a => a.submittedAt === null).sort((a, b) => b.updatedAt - a.updatedAt)
}

/** The Projects card's count: the attempts in progress, or the briefs there are to start. */
export function projectsCount(inProgress: number, briefs: number): string {
  return inProgress > 0 ? `${inProgress} in progress` : plural(briefs, 'brief', 'briefs')
}

// ── Tools ───────────────────────────────────────────────────────────────────

/**
 * The Tools card's count: the tools the exam in focus covers ("20 for Exam
 * 5"), or the whole catalogue's when it covers none or no exam is in focus.
 */
export function toolsCount(forExam: number, all: number, examName: string | null): string {
  return examName && forExam > 0 ? `${forExam} for ${examName}` : plural(all, 'tool', 'tools')
}

/** How many of the reader's recent tools the card shows. */
export const RECENT_SHOWN = 3

/** The recent tools still in the catalogue, the last used first, as many as the card shows. */
export function recentTools<T>(recent: readonly RecentTool[], find: (slug: string) => T | undefined): T[] {
  const out: T[] = []
  for (const r of recent) {
    const tool = find(r.slug)
    if (tool !== undefined && !out.includes(tool)) out.push(tool)
    if (out.length === RECENT_SHOWN) break
  }
  return out
}

/** Which of the Tools screen's two tabs is showing. */
export type ToolsTab = 'exam' | 'all'

/**
 * The tab a `?tab=` opens. The exam's tab exists only when the exam in focus
 * covers a tool; without it the screen is the whole catalogue and draws no tabs.
 */
export function resolveToolsTab(requested: string | null, forExam: number): ToolsTab {
  if (forExam === 0) return 'all'
  return requested === 'all' ? 'all' : 'exam'
}

// ── Workflows ───────────────────────────────────────────────────────────────

/** The Workflows card's count; nothing to say with none saved. */
export function workflowsCount(saved: number): string {
  return saved > 0 ? `${saved} saved` : ''
}

/** A workflow's size, under its title: "5 steps". */
export function stepsLabel(steps: number): string {
  return plural(steps, 'step', 'steps')
}
