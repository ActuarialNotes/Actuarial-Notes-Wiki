/**
 * The views of one project attempt's page (`docs/pcpa-project.md`): Brief,
 * Workspace, Report, then Submit — or Results, once the attempt is submitted.
 * An attempt still open is entered through its **overview**
 * (`lib/attemptOverview.ts`), which is a view of the page and not one of the
 * four the switcher lists.
 *
 * Two surfaces list them: the switcher in the attempt's top bar and the rows
 * under Projects in the sidebar. Both read this one definition, so they can't
 * disagree about which views an attempt has or which one is showing.
 *
 * Deliberately free of `lib/pcpaAttempt.ts` (a type aside): that module brings
 * the authored briefs with it, and the sidebar is in the main bundle.
 *
 * Pure and tested.
 */

import { Award, BookOpenText, Code2, FileText, ListChecks, Send, type LucideIcon } from 'lucide-react'
import type { AttemptPhase } from './pcpaAttempt'

export type AttemptView = 'overview' | 'brief' | 'workspace' | 'report' | 'submit' | 'results'

const ALL_VIEWS: readonly AttemptView[] = ['overview', 'brief', 'workspace', 'report', 'submit', 'results']

export const ATTEMPT_VIEW_LABEL: Record<AttemptView, string> = {
  overview: 'Overview',
  brief: 'Brief',
  workspace: 'Workspace',
  report: 'Report',
  submit: 'Submit',
  results: 'Results',
}

export const ATTEMPT_VIEW_ICON: Record<AttemptView, LucideIcon> = {
  overview: ListChecks,
  brief: BookOpenText,
  workspace: Code2,
  report: FileText,
  submit: Send,
  results: Award,
}

/** Where an attempt lives: `/project/pcpa/<id>`, opened on `view` when given. */
export function attemptRoute(id: string, view?: AttemptView): string {
  return `/project/pcpa/${id}${view ? `?view=${view}` : ''}`
}

/** Where a brief is read on its own, before any attempt at it: `/project/brief/<case id>`. */
export function briefRoute(caseId: string): string {
  return `/project/brief/${caseId}`
}

/** The views the switcher lists, in order: Submit gives way to Results once it is submitted. */
export function attemptViews(phase: AttemptPhase): AttemptView[] {
  return ['brief', 'workspace', 'report', phase === 'submitted' ? 'results' : 'submit']
}

/**
 * The view a `?view=` parameter opens. A missing or unknown one opens the
 * overview — or, for a submitted attempt, its results, which is what a
 * candidate comes back for. There are no results before submission, and no
 * overview after it: the overview is about what is left to do.
 */
export function resolveAttemptView(requested: string | null, phase: AttemptPhase): AttemptView {
  const known = ALL_VIEWS.find(v => v === requested)
  const fallback: AttemptView = phase === 'submitted' ? 'results' : 'overview'
  if (!known) return fallback
  if (known === 'results' && phase !== 'submitted') return fallback
  if (known === 'overview' && phase === 'submitted') return fallback
  return known
}

/**
 * Which of `attemptViews(phase)` stands for `view`. Submit still opens on a
 * submitted attempt — it says when it went in — but it is listed as Results.
 */
export function attemptViewTab(view: AttemptView, phase: AttemptPhase): AttemptView {
  return view === 'submit' && phase === 'submitted' ? 'results' : view
}
