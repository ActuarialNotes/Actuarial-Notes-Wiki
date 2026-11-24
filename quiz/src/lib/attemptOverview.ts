/**
 * The overview of one project attempt (docs/redesign-spec.md §7c.4): the way
 * into an attempt still open. Four steps (Brief, Workspace, Report, Submit),
 * which of them the candidate is on, and the submission checklist with its
 * figures.
 *
 * Every row is read off the attempt's record against the rules the Submit view
 * holds a submission to (`lib/pcpaReport.ts`), so the overview can't say
 * something is done that Submit would refuse.
 *
 * Pure and tested. The overview page hands in the word tally the Report view
 * counts (`useWordTally`, which reads an attached table's file); a surface
 * with no workspace open (Apply's Projects card) uses `recordTally`.
 */

import { APPENDIX_LIMIT } from '@/data/pcpaProjects'
import type { AttemptView } from './attemptViews'
import type { AttemptPhase, ProjectAttempt } from './pcpaAttempt'
import { appendixWords, tallyWords, type WordTally } from './pcpaReport'

/** The steps of a project, in the order they are worked. */
export const OVERVIEW_STEPS = ['brief', 'workspace', 'report', 'submit'] as const
export type OverviewStep = (typeof OVERVIEW_STEPS)[number]

/** The fewest words a report's body holds before the checklist counts it (the Submit view's floor). */
export const MIN_BODY_WORDS = 150

export interface StepState {
  id: OverviewStep
  state: 'done' | 'current' | 'todo'
}

export interface ChecklistRow {
  id: 'brief' | 'code' | 'report' | 'appendices' | 'questions'
  label: string
  done: boolean
  /** The figure beside the label: "412 / 1,250", "Not yet". Empty when the tick says it all. */
  value: string
  /** How far along, 0 to 1, for a row that counts toward something. */
  progress?: number
  /** The view where this row is done. */
  view: AttemptView
}

export interface AttemptOverview {
  steps: StepState[]
  /** The first step not yet done; Submit when the rest are. */
  current: OverviewStep
  checklist: ChecklistRow[]
}

type OverviewAttempt = Pick<ProjectAttempt, 'report' | 'answers' | 'briefReadAt' | 'cleanRun'>

/**
 * The report's words as the record alone can count them: the body, and each
 * appendix's caption. An attached table's own words are in its file, which
 * only an open workspace has, so near the limit this can read a few words
 * under what the Report view counts.
 */
export function recordTally(attempt: Pick<ProjectAttempt, 'report'>): WordTally {
  return tallyWords(attempt.report.body, attempt.report.appendices.map(a => appendixWords(a)))
}

/**
 * The submission questions that must be answered. The Tweedie power question
 * is asked only of a candidate who used that distribution, so it is never
 * counted (the Submit view's rule).
 */
export function requiredQuestions<Q extends { id: string }>(questions: readonly Q[]): Q[] {
  return questions.filter(q => q.id !== 'power')
}

/** Whether the brief has been opened. An attempt from before that was recorded counts once it holds any work. */
export function briefRead(attempt: OverviewAttempt): boolean {
  if (attempt.briefReadAt !== undefined) return true
  return attempt.report.body.trim() !== ''
    || attempt.report.appendices.length > 0
    || Object.values(attempt.answers).some(a => a.trim() !== '')
    || attempt.cleanRun !== undefined
}

const count = (n: number) => n.toLocaleString('en-US')

export function attemptOverview(
  attempt: OverviewAttempt,
  questions: readonly { id: string }[],
  tally: WordTally,
): AttemptOverview {
  const read = briefRead(attempt)
  const clean = attempt.cleanRun?.ok === true
  const reportDone = !tally.over && tally.body >= MIN_BODY_WORDS
  const appendices = attempt.report.appendices.length
  const required = requiredQuestions(questions)
  const answered = required.filter(q => (attempt.answers[q.id] ?? '').trim() !== '').length

  const checklist: ChecklistRow[] = [
    { id: 'brief', label: 'Brief read', done: read, value: read ? '' : 'Not yet', view: 'brief' },
    {
      id: 'code',
      label: 'Code runs clean',
      done: clean,
      value: clean ? '' : attempt.cleanRun ? 'Stopped with an error' : 'Not yet',
      view: 'submit',
    },
    {
      id: 'report',
      label: 'Report',
      done: reportDone,
      value: `${count(tally.total)} / ${count(tally.limit)}`,
      progress: Math.min(1, tally.total / tally.limit),
      view: 'report',
    },
    {
      id: 'appendices',
      label: 'Appendices',
      done: appendices > 0 && appendices <= APPENDIX_LIMIT,
      value: `${appendices} / ${APPENDIX_LIMIT}`,
      progress: Math.min(1, appendices / APPENDIX_LIMIT),
      view: 'report',
    },
    {
      id: 'questions',
      label: 'Submission questions',
      done: required.length > 0 && answered === required.length,
      value: `${answered} / ${required.length}`,
      progress: required.length ? answered / required.length : 0,
      view: 'submit',
    },
  ]

  const done: Record<OverviewStep, boolean> = { brief: read, workspace: clean, report: reportDone, submit: false }
  const current = OVERVIEW_STEPS.find(s => !done[s]) ?? 'submit'
  const steps = OVERVIEW_STEPS.map(id => ({ id, state: id === current ? 'current' as const : done[id] ? 'done' as const : 'todo' as const }))
  return { steps, current, checklist }
}

/** "Step 2 of 4: Workspace", what the bar says to a screen reader. */
export function stepSummary(overview: AttemptOverview, label: (step: OverviewStep) => string): string {
  return `Step ${OVERVIEW_STEPS.indexOf(overview.current) + 1} of ${OVERVIEW_STEPS.length}: ${label(overview.current)}`
}

/**
 * The overview's filled button. An open attempt continues in its current
 * step, or starts with the brief; one whose window has closed can only be
 * read, so the button opens the report.
 */
export function overviewAction(overview: AttemptOverview, phase: AttemptPhase, label: (step: OverviewStep) => string): { view: AttemptView; label: string } {
  if (phase === 'closed') return { view: 'report', label: 'Open the report' }
  if (overview.current === 'brief') return { view: 'brief', label: 'Read the brief' }
  return { view: overview.current, label: `Continue in ${label(overview.current)}` }
}
