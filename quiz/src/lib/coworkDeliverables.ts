/**
 * **Deliverables** — what an actuary actually produces, and the step-by-step
 * scoping that arrives at one.
 *
 * There are three fundamental types and the difference between them is what
 * they are *for*, not how long they are:
 *
 *   • **Analysis** — work that reaches a number. Its output is an estimate and
 *     the exhibits behind it.
 *   • **Report** — work that tells someone the result. Its output is a
 *     narrative with the findings and what follows from them.
 *   • **Documentation** — work that records how something was done, so that
 *     another actuary could repeat it. Its output is a record.
 *
 * The scoping flow is a short sequence of multiple-choice questions
 * (`data/coworkDeliverables.ts`). Each answer does three things: it pins down
 * facets, it contributes assumptions and key details, and it opens up the
 * exports that make sense for the resulting deliverable. That is what
 * "populates automatically" means here — nothing is inferred and nothing is
 * invented, every populated row names the answer or the document it came from.
 *
 * This module is the engine: which question comes next, what the answers add up
 * to, and when the thing is done. Pure and tested.
 */

import { facetLabel, type DeliverableFacets } from '@/lib/coworkFacets'
import type { SourceResource } from '@/lib/coworkSources'

export type DeliverableType = 'analysis' | 'report' | 'documentation'

export interface DeliverableTypeSpec {
  id: DeliverableType
  label: string
  /** The one line that distinguishes it from the other two. */
  tagline: string
  description: string
  /** The verb a new one is created with ("Run an analysis"). */
  cta: string
}

export const DELIVERABLE_TYPES: DeliverableTypeSpec[] = [
  {
    id: 'analysis',
    label: 'Analysis',
    tagline: 'Work that reaches a number',
    description:
      'An estimate and the exhibits behind it — an indication, an unpaid-claim estimate, a capital calculation. The output is the number and the support for it.',
    cta: 'Start an analysis',
  },
  {
    id: 'report',
    label: 'Report',
    tagline: 'Work that tells someone the result',
    description:
      'A narrative written for a named reader — a filing memorandum, a board note, an appointed actuary’s report. The output is the finding and what follows from it.',
    cta: 'Draft a report',
  },
  {
    id: 'documentation',
    label: 'Documentation',
    tagline: 'Work that records how it was done',
    description:
      'A record complete enough for another actuary to repeat the work — a methodology note, a model change log, an ASOP 41 file. The output is the record itself.',
    cta: 'Write documentation',
  },
]

export function deliverableTypeSpec(id: DeliverableType): DeliverableTypeSpec {
  return DELIVERABLE_TYPES.find(t => t.id === id) ?? DELIVERABLE_TYPES[0]
}

/* ------------------------------------------------------------------ scoping */

/** A row of the assumptions table, before it knows where it came from. */
export interface AssumptionSeed {
  label: string
  /** Absent when the basis supplies the row but not the number — see below. */
  value?: string
  /** Section, table or page inside the basis. Optional. */
  locator?: string
}

/** A populated assumption: a seed plus the thing that justifies it. */
export interface Assumption extends AssumptionSeed {
  /** What supports it — the answer given, or the document attached. */
  basis: string
  /** `answer` rows come from the scoping; `source` rows come from a document. */
  origin: 'answer' | 'source'
  /** The resource id, when this row came from an attached document. */
  resourceId?: string
}

/** A key detail: a named fact about the deliverable itself, not about the data. */
export interface KeyDetail {
  label: string
  value: string
  basis: string
}

/**
 * The rows a tabular export gets one of each.
 *
 * Which periods a table covers is a *scoping* answer ("five accident years"),
 * not a property of the export format, so the answer carries it and the export
 * reads it back. The labels themselves are calendar arithmetic off the as-of
 * date — a fact, not an estimate — and the value cells are left empty: this
 * app has no access to the reader's data, so an export that filled them would
 * be inventing the experience it claims to summarise.
 */
export interface PeriodSpec {
  count: number
  /** What one row is — "Accident year", "Valuation quarter". */
  label: string
  basis: 'year' | 'quarter'
}

export interface WizardOption {
  id: string
  label: string
  /** One line under the label. */
  detail?: string
  /** The period grain and depth this choice sets for a tabular export. */
  periods?: PeriodSpec
  /** The facets this choice fixes. */
  facets?: DeliverableFacets
  /** Assumption rows this choice contributes. */
  assumptions?: AssumptionSeed[]
  /** Key details this choice contributes. */
  details?: Array<{ label: string; value: string }>
  /** Export ids this choice makes available. */
  exports?: string[]
}

export interface WizardStep {
  id: string
  question: string
  /** The sentence under the question that says why it is being asked. */
  help?: string
  options: WizardOption[]
  /**
   * Only asked when the answers so far match every entry. A step with no `when`
   * is always asked. Keyed by step id → the option ids that unlock this step.
   */
  when?: Record<string, string[]>
}

/** `stepId → optionId`. A step not present here has not been answered. */
export type WizardAnswers = Record<string, string>

/**
 * Whether a step applies given the answers so far. An unanswered prerequisite
 * makes the step *not yet* applicable rather than skipped — which is what keeps
 * the flow strictly step-by-step: a later question cannot jump the queue.
 */
export function stepApplies(step: WizardStep, answers: WizardAnswers): boolean {
  if (!step.when) return true
  return Object.entries(step.when).every(([stepId, allowed]) => {
    const given = answers[stepId]
    return given !== undefined && allowed.includes(given)
  })
}

/** The steps that apply right now, in catalogue order. */
export function visibleSteps(steps: WizardStep[], answers: WizardAnswers): WizardStep[] {
  return steps.filter(step => stepApplies(step, answers))
}

/**
 * The step to ask next: the first applicable one with no answer yet. `null`
 * when every applicable step has been answered — which is what "scoped" means.
 */
export function nextStep(steps: WizardStep[], answers: WizardAnswers): WizardStep | null {
  return visibleSteps(steps, answers).find(step => answers[step.id] === undefined) ?? null
}

export interface WizardProgress {
  answered: number
  /**
   * How many questions there are *given the answers so far*. It can grow as
   * answers unlock branches, so the bar is honest about what is known rather
   * than promising a total the flow may not reach.
   */
  total: number
  complete: boolean
}

export function wizardProgress(steps: WizardStep[], answers: WizardAnswers): WizardProgress {
  const visible = visibleSteps(steps, answers)
  const answered = visible.filter(step => answers[step.id] !== undefined).length
  // A branch that has not opened yet is still a question to come, so an
  // unanswered flow never reads as 1 of 1. Count the steps that could still
  // apply once a prerequisite is answered.
  const potential = steps.filter(step => stepApplies(step, answers) || couldApply(step, answers)).length
  return { answered, total: Math.max(visible.length, potential), complete: answered === visible.length && visible.length > 0 }
}

/** True when a step's prerequisites are merely unanswered, not contradicted. */
function couldApply(step: WizardStep, answers: WizardAnswers): boolean {
  if (!step.when) return true
  return Object.entries(step.when).every(([stepId, allowed]) => {
    const given = answers[stepId]
    return given === undefined || allowed.includes(given)
  })
}

/**
 * Dropping an answer drops everything it unlocked.
 *
 * Changing "which practice area" from P&C to Pensions must not leave a
 * P&C-only follow-up answered underneath — the deliverable would then carry an
 * assumption its scoping no longer asks for. Re-running until it settles
 * handles a chain of dependent steps, not just the first one.
 */
export function answerStep(
  steps: WizardStep[],
  answers: WizardAnswers,
  stepId: string,
  optionId: string,
): WizardAnswers {
  let next: WizardAnswers = { ...answers, [stepId]: optionId }
  for (;;) {
    const pruned: WizardAnswers = {}
    for (const step of steps) {
      if (next[step.id] !== undefined && stepApplies(step, next)) pruned[step.id] = next[step.id]
    }
    if (Object.keys(pruned).length === Object.keys(next).length) return pruned
    next = pruned
  }
}

/** The option a step was answered with, or null. */
export function chosenOption(step: WizardStep, answers: WizardAnswers): WizardOption | null {
  const id = answers[step.id]
  return step.options.find(o => o.id === id) ?? null
}

/* --------------------------------------------------------------- derivation */

/** Every facet the answers have fixed. A later answer wins over an earlier one. */
export function facetsFromAnswers(steps: WizardStep[], answers: WizardAnswers): DeliverableFacets {
  const facets: DeliverableFacets = {}
  for (const step of visibleSteps(steps, answers)) {
    const option = chosenOption(step, answers)
    if (option?.facets) Object.assign(facets, option.facets)
  }
  return facets
}

/**
 * The assumptions table.
 *
 * Two kinds of row, in this order: what the scoping answers fixed, then what
 * each attached document contributes. Every row names its basis — the question
 * that was answered, or the document and the place in it — because an
 * assumption whose support cannot be named is not an assumption, it is a guess.
 * Duplicate labels are kept: two documents disagreeing about the same
 * assumption is a finding, and silently dropping one would hide it.
 */
export function deriveAssumptions(
  steps: WizardStep[],
  answers: WizardAnswers,
  resources: SourceResource[],
): Assumption[] {
  const rows: Assumption[] = []
  for (const step of visibleSteps(steps, answers)) {
    const option = chosenOption(step, answers)
    if (!option?.assumptions) continue
    for (const seed of option.assumptions) {
      rows.push({ ...seed, basis: `${step.question} — ${option.label}`, origin: 'answer' })
    }
  }
  for (const resource of resources) {
    for (const seed of resource.assumptions ?? []) {
      rows.push({ ...seed, basis: resource.title, origin: 'source', resourceId: resource.id })
    }
  }
  return rows
}

/**
 * The key details — facts about the deliverable rather than about the data:
 * its type, what each answer said it is, and how many documents support it.
 */
export function deriveKeyDetails(
  type: DeliverableType,
  steps: WizardStep[],
  answers: WizardAnswers,
  resources: SourceResource[],
): KeyDetail[] {
  const spec = deliverableTypeSpec(type)
  const details: KeyDetail[] = [
    { label: 'Deliverable type', value: spec.label, basis: spec.tagline },
  ]
  for (const step of visibleSteps(steps, answers)) {
    const option = chosenOption(step, answers)
    if (!option?.details) continue
    for (const d of option.details) {
      details.push({ ...d, basis: option.label })
    }
  }
  details.push({
    label: 'Supporting sources',
    value: resources.length === 1 ? '1 document' : `${resources.length} documents`,
    basis: resources.length ? resources.map(r => r.title).join('; ') : 'None attached yet',
  })
  return details
}

/** The period grain the answers settled on, or null if none was asked for. */
export function derivePeriods(steps: WizardStep[], answers: WizardAnswers): PeriodSpec | null {
  let spec: PeriodSpec | null = null
  for (const step of visibleSteps(steps, answers)) {
    const option = chosenOption(step, answers)
    if (option?.periods) spec = option.periods
  }
  return spec
}

/**
 * The row labels for a period spec, newest last so the table reads forwards.
 *
 * `asOf` is passed in rather than read from the clock so an export is testable
 * and so two exports taken in the same session agree. The most recent *complete*
 * period is the one before the current one — a year still being earned is not an
 * experience year.
 */
export function periodLabels(spec: PeriodSpec, asOf: Date): string[] {
  const labels: string[] = []
  if (spec.basis === 'quarter') {
    const quarter = Math.floor(asOf.getUTCMonth() / 3)
    // Step back one quarter from the current one, then `count` quarters back.
    let y = asOf.getUTCFullYear()
    let q = quarter - 1
    if (q < 0) { q = 3; y -= 1 }
    for (let i = 0; i < spec.count; i++) {
      labels.push(`${y}Q${q + 1}`)
      q -= 1
      if (q < 0) { q = 3; y -= 1 }
    }
  } else {
    const latest = asOf.getUTCFullYear() - 1
    for (let i = 0; i < spec.count; i++) labels.push(String(latest - i))
  }
  return labels.reverse()
}

/* ----------------------------------------------------------------- the record */

export type DeliverableStatus = 'draft' | 'scoped' | 'populated'

export interface Deliverable {
  id: string
  title: string
  type: DeliverableType
  answers: WizardAnswers
  /** Documents drawn from the library, in the order they were attached. */
  resourceIds: string[]
  createdAt: number
  updatedAt: number
}

/**
 * Where a deliverable is in the loop:
 *   draft     — still being scoped
 *   scoped    — every applicable question answered, nothing attached
 *   populated — scoped, with at least one source behind it
 *
 * It is derived rather than stored, so a deliverable can never claim a state
 * its own contents contradict.
 */
export function deliverableStatus(
  steps: WizardStep[],
  answers: WizardAnswers,
  resourceIds: string[],
): DeliverableStatus {
  if (nextStep(steps, answers) !== null) return 'draft'
  if (resourceIds.length === 0) return 'scoped'
  return 'populated'
}

export const STATUS_LABEL: Record<DeliverableStatus, string> = {
  draft: 'In scoping',
  scoped: 'Scoped',
  populated: 'Populated',
}

/**
 * A default title from the answers, used until the reader names it themselves.
 * It reads as the deliverable's own sentence ("P&C reserving analysis"), and
 * falls back to the bare type when nothing has been answered yet.
 */
export function suggestedTitle(type: DeliverableType, facets: DeliverableFacets): string {
  const parts = [
    facets.practiceArea ? facetLabel('practiceArea', facets.practiceArea) : null,
    facets.function ? facetLabel('function', facets.function) : null,
  ].filter((p): p is string => p !== null)
  const spec = deliverableTypeSpec(type)
  if (!parts.length) return `Untitled ${spec.label.toLowerCase()}`
  return `${parts.join(' ')} ${spec.label.toLowerCase()}`
}
