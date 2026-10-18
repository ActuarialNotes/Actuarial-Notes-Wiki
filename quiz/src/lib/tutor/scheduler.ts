// **What comes next** (docs/tutor.md §5.2, §6): the Tutor's one decision,
// made afresh after every answer so in-session relearning and interleaving
// fall out of the same rule.
//
// In order: an item waiting to be **relearned** (successive relearning); then
// the **due** concept the candidate stands to lose most on — its share of the
// exam's weight times how far its recall has fallen, boosted for an open
// sure-and-wrong or "I'm confused"; then a **new** concept, page first. Never
// the same concept twice running, and the objectives alternated where they can
// be (interleaving).

import type { WikiExamSyllabus } from '../wikiParser'
import type { MasteryState } from '../mastery'
import type { Difficulty } from '../parser'
import type { PartKind, TutorItem } from './items'
import {
  conceptModel,
  isRelearnReady,
  recentSuccess,
  type TutorModel,
} from './log'
import { addDayKey, dayKey, dueDay, recallNow } from './memory'
import { PHASES, type JourneyPhase } from './journey'

export interface SyllabusConcept {
  name: string
  /** The learning objective it is listed under. */
  objective: string
  /** Its share of the exam's weight: the objective's midpoint, shared among its concepts. */
  weight: number
  /** The syllabus line that names it — concepts on one line are siblings. */
  line: string
  /** Position in the syllabus, from 0. */
  order: number
}

/** "45–55%" → 0.5; "{23-30%}" → 0.265; nothing → null. */
export function weightMidpoint(weight: string | undefined): number | null {
  if (!weight) return null
  const nums = [...weight.matchAll(/(\d+(?:\.\d+)?)/g)].map(m => Number(m[1]))
  if (nums.length === 0) return null
  const mid = nums.length >= 2 ? (nums[0] + nums[1]) / 2 : nums[0]
  return mid / 100
}

/**
 * An exam page's concepts as the Tutor schedules them, in syllabus order. A
 * concept listed under two objectives belongs to the first; its weight is that
 * objective's.
 */
export function tutorSyllabus(syllabus: WikiExamSyllabus): SyllabusConcept[] {
  const out: SyllabusConcept[] = []
  const seen = new Set<string>()
  const objectives = syllabus.topics.filter(t => t.concepts.length > 0)
  const unweighted = 1 / Math.max(1, objectives.length)
  for (const topic of objectives) {
    const fresh = topic.concepts.filter(c => !seen.has(c.name.toLowerCase()))
    const share = (weightMidpoint(topic.weight) ?? unweighted) / Math.max(1, fresh.length)
    for (const c of fresh) {
      seen.add(c.name.toLowerCase())
      out.push({ name: c.name, objective: topic.name, weight: share, line: c.excerpt ?? '', order: out.length })
    }
  }
  return out
}

/** The concepts named on the same syllabus line — the ones a candidate mixes up. */
export function siblingsOf(syllabus: readonly SyllabusConcept[], name: string): string[] {
  const self = syllabus.find(c => c.name.toLowerCase() === name.toLowerCase())
  if (!self || !self.line) return []
  return syllabus.filter(c => c !== self && c.line === self.line).map(c => c.name)
}

/** Boosts on a due concept's priority (docs/tutor.md §6). */
export const BOOST = { sureWrong: 2, confused: 1.5, forgotten: 1.3 } as const

/** An item is fresh again this many days after it was last served. */
export const ITEM_REST_DAYS = 14

/** The success band the difficulty is steered to hold (Wilson et al. 2019). */
export const SUCCESS_BAND = { low: 0.65, high: 0.85 } as const

export interface SchedulerInput {
  syllabus: readonly SyllabusConcept[]
  items: readonly TutorItem[]
  byConcept: ReadonlyMap<string, TutorItem[]>
  model: TutorModel
  now: Date
  examDay: string | null
  phase: JourneyPhase
  /** The ladder's state per concept, lowercased — for the Forgotten boost. */
  ladder?: ReadonlyMap<string, MasteryState>
  /** Today's new concepts from the study plan, if there is one — it decides the order. */
  planNew?: readonly string[]
  /** Items served so far this session, in order. */
  served?: readonly string[]
  /** Concepts introduced so far today. */
  introducedToday?: number
  /** Concepts the candidate has asked to skip reading this session. */
  skipRead?: readonly string[]
}

export interface DueConcept {
  concept: SyllabusConcept
  recall: number
  priority: number
}

function hasItems(input: SchedulerInput, name: string): boolean {
  return (input.byConcept.get(name.toLowerCase())?.length ?? 0) > 0
}

/**
 * The day a concept counts as due. In the taper, everything due before the
 * exam is due now: every concept gets its last look in the final week.
 */
function effectiveDue(due: string, today: string, examDay: string | null, phase: JourneyPhase): string {
  if (phase === 'taper' && examDay && due < examDay) return today
  return due
}

/** The due concepts, highest priority first. */
export function dueConcepts(input: SchedulerInput): DueConcept[] {
  const today = dayKey(input.now)
  const out: DueConcept[] = []
  for (const concept of input.syllabus) {
    const c = conceptModel(input.model, concept.name)
    if (!c?.memory || !hasItems(input, concept.name)) continue
    // Already answered today: whatever the model says, more today is massing.
    if (c.lastAnswerAt && dayKey(new Date(c.lastAnswerAt)) === today && !c.sureWrong) continue
    const due = effectiveDue(dueDay(c.memory, input.examDay), today, input.examDay, input.phase)
    if (due > today) continue
    const recall = recallNow(c.memory, input.now)
    let boost = 1
    if (c.sureWrong) boost *= BOOST.sureWrong
    if (c.confusion) boost *= BOOST.confused
    if (input.ladder?.get(concept.name.toLowerCase()) === 'forgotten') boost *= BOOST.forgotten
    out.push({ concept, recall, priority: concept.weight * (1 - recall) * boost })
  }
  return out.sort((a, b) => b.priority - a.priority || a.concept.order - b.concept.order)
}

/** The new concepts, in the order they should be met: today's plan first, then the syllabus. */
export function newConcepts(input: SchedulerInput): SyllabusConcept[] {
  const unmet = (c: SyllabusConcept) => !conceptModel(input.model, c.name)?.memory && hasItems(input, c.name)
  const byName = new Map(input.syllabus.map(c => [c.name.toLowerCase(), c]))
  const planned = (input.planNew ?? [])
    .map(n => byName.get(n.toLowerCase()))
    .filter((c): c is SyllabusConcept => !!c && unmet(c))
  const rest = input.syllabus.filter(c => unmet(c) && !planned.includes(c))
  return [...planned, ...rest]
}

/** Which kind of part the candidate is weakest at, once each kind has five answers. */
export function weakestKind(model: TutorModel, min = 5): PartKind | null {
  const kinds = (Object.keys(model.byKind) as PartKind[]).filter(k => model.byKind[k].answers >= min)
  if (kinds.length < 2) return null
  const rate = (k: PartKind) => model.byKind[k].credit / model.byKind[k].answers
  const sorted = kinds.sort((a, b) => rate(a) - rate(b))
  return rate(sorted[sorted.length - 1]) - rate(sorted[0]) >= 0.2 ? sorted[0] : null
}

/** The difficulty the next item should lean toward, from the rolling success rate. */
export function targetDifficulty(model: TutorModel): Difficulty[] {
  const rate = recentSuccess(model)
  if (rate == null) return ['medium', 'easy', 'hard']
  if (rate > SUCCESS_BAND.high) return ['hard', 'medium', 'easy']
  if (rate < SUCCESS_BAND.low) return ['easy', 'medium', 'hard']
  return ['medium', 'hard', 'easy']
}

// A small, stable hash so ties break differently on different days but the
// same way all day — the same item isn't re-picked on every render.
function hash(s: string): number {
  let h = 2166136261
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return (h >>> 0) / 4294967296
}

export interface PickOptions {
  /** Prefer this kind of part. */
  kind?: PartKind | null
  /** Only this kind of part, when there is one. */
  onlyKind?: PartKind | null
}

/**
 * An item on a concept (docs/tutor.md §5.2): not served this session, not from
 * the question just served, rested at least two weeks if it can be, in the
 * difficulty band the success rate asks for and — when there is a weakest kind
 * of part — of that kind. Prefers parts that are about this concept alone over
 * parts it shares with three others.
 */
export function pickItem(input: SchedulerInput, concept: string, opts: PickOptions = {}): TutorItem | null {
  const all = input.byConcept.get(concept.toLowerCase()) ?? []
  if (all.length === 0) return null
  const served = new Set(input.served ?? [])
  const lastQuestion = input.model.lastQuestion
  const today = dayKey(input.now)
  const restedSince = addDayKey(today, -ITEM_REST_DAYS)

  let pool = all.filter(i => !served.has(i.id) && i.questionId !== lastQuestion)
  if (pool.length === 0) pool = all.filter(i => !served.has(i.id))
  if (pool.length === 0) return null
  if (opts.onlyKind) {
    const only = pool.filter(i => i.kind === opts.onlyKind)
    if (only.length > 0) pool = only
  }

  const order = targetDifficulty(input.model)
  const kind = opts.kind ?? weakestKind(input.model)
  const scored = pool.map(item => {
    const history = input.model.items.get(item.id)
    const rested = !history || dayKey(new Date(history.lastAt)) <= restedSince
    let score = 0
    if (rested) score += 8
    if (!history) score += 2
    score += 3 - order.indexOf(item.difficulty)
    if (kind && item.kind === kind) score += 2.5
    score += 2 / item.concepts.length
    score += hash(`${today}:${item.id}`)
    return { item, score }
  })
  scored.sort((a, b) => b.score - a.score)
  return scored[0].item
}

/** Why a step is being served — said on the card. */
export type StepReason = 'relearn' | 'due' | 'new' | 'sure-wrong' | 'confused' | 'practice'

export type TutorStep =
  | { type: 'item'; item: TutorItem; concept: string; reason: StepReason }
  | { type: 'read'; concept: string }
  | { type: 'done' }

function objectiveOf(input: SchedulerInput, concept: string | undefined): string | undefined {
  if (!concept) return undefined
  return input.syllabus.find(c => c.name.toLowerCase() === concept.toLowerCase())?.objective
}

/** The concept the last served item was about, for interleaving. */
function lastConcept(input: SchedulerInput): string | undefined {
  const last = input.served?.[input.served.length - 1]
  if (!last) return undefined
  return input.items.find(i => i.id === last)?.concepts[0]
}

/**
 * The next step of a session. `served` and `introducedToday` carry the session
 * so far; everything else is the record.
 */
export function nextStep(input: SchedulerInput): TutorStep {
  const served = new Set(input.served ?? [])
  const prevConcept = lastConcept(input)?.toLowerCase()
  const prevObjective = objectiveOf(input, prevConcept)
  const itemsById = new Map(input.items.map(i => [i.id, i]))

  // 1. Relearn — the item that was missed, when it is ready again. It was
  //    served this session (that is how it was missed); it may come back in
  //    it, just never straight after itself.
  const lastServed = input.served?.[input.served.length - 1]
  const ready = input.model.relearn
    .filter(r => isRelearnReady(r, input.now) && itemsById.has(r.item) && r.item !== lastServed)
    .sort((a, b) => a.missedAt.localeCompare(b.missedAt))
  const relearn = ready.find(r => !r.concepts.some(c => c.toLowerCase() === prevConcept)) ?? ready[0]
  if (relearn) {
    const item = itemsById.get(relearn.item)!
    return { type: 'item', item, concept: item.concepts[0], reason: 'relearn' }
  }

  // 2. Due — the most to lose first, never the same concept twice running,
  //    the other objective where there is a choice.
  const servedConcepts = new Set(
    [...served].flatMap(id => itemsById.get(id)?.concepts ?? []).map(c => c.toLowerCase()),
  )
  const due = dueConcepts(input).filter(d => !servedConcepts.has(d.concept.name.toLowerCase()))
  if (due.length > 0) {
    const notSame = due.filter(d => d.concept.name.toLowerCase() !== prevConcept)
    const pool = notSame.length > 0 ? notSame : due
    // Interleave: among the top few, prefer the other objective.
    const top = pool.slice(0, 3)
    const choice = top.find(d => d.concept.objective !== prevObjective) ?? top[0]
    const c = conceptModel(input.model, choice.concept.name)
    const reason: StepReason = c?.sureWrong ? 'sure-wrong' : c?.confusion ? 'confused' : 'due'
    const item = pickItem(input, choice.concept.name, {
      onlyKind: c?.confusion === 'calculation' ? 'calculation' : c?.confusion === 'when' ? 'judgment' : null,
    })
    if (item) return { type: 'item', item, concept: choice.concept.name, reason }
  }

  // 3. New — page first (scaffold novices), then its first check.
  const cap = PHASES[input.phase].newPerDay
  if ((input.introducedToday ?? 0) < cap) {
    const fresh = newConcepts(input).filter(c => !servedConcepts.has(c.name.toLowerCase()))
    const next = fresh[0]
    if (next) {
      const c = conceptModel(input.model, next.name)
      const skipped = (input.skipRead ?? []).some(n => n.toLowerCase() === next.name.toLowerCase())
      if (!c?.lastReadAt && !skipped) return { type: 'read', concept: next.name }
      const item = pickItem(input, next.name, { kind: 'explanation' })
      if (item) return { type: 'item', item, concept: next.name, reason: 'new' }
    }
  }

  return { type: 'done' }
}

/**
 * One more item when the session's work is done: the met concept with the
 * lowest recall that hasn't been answered today — practice that is still
 * spaced, never a repeat of this morning.
 */
export function extraPractice(input: SchedulerInput): TutorStep {
  const today = dayKey(input.now)
  const served = new Set(input.served ?? [])
  const candidates = input.syllabus
    .map(concept => ({ concept, c: conceptModel(input.model, concept.name) }))
    .filter(({ concept, c }) => c?.memory && hasItems(input, concept.name)
      && !(c.lastAnswerAt && dayKey(new Date(c.lastAnswerAt)) === today))
    .map(({ concept, c }) => ({ concept, recall: recallNow(c!.memory!, input.now) }))
    .sort((a, b) => a.recall - b.recall || b.concept.weight - a.concept.weight)
  for (const { concept } of candidates) {
    const item = pickItem({ ...input, served: [...served] }, concept.name)
    if (item) return { type: 'item', item, concept: concept.name, reason: 'practice' }
  }
  // Nothing met is left to practise — a candidate who arrives late, in the
  // taper, with little met: asked to keep going, they meet the heaviest of
  // what they haven't, page first as always.
  const servedConcepts = new Set(
    input.items.filter(i => served.has(i.id)).flatMap(i => i.concepts).map(c => c.toLowerCase()),
  )
  const fresh = newConcepts(input)
    .filter(c => !servedConcepts.has(c.name.toLowerCase()))
    .sort((a, b) => b.weight - a.weight || a.order - b.order)
  const next = fresh[0]
  if (next) {
    const c = conceptModel(input.model, next.name)
    const skipped = (input.skipRead ?? []).some(n => n.toLowerCase() === next.name.toLowerCase())
    if (!c?.lastReadAt && !skipped) return { type: 'read', concept: next.name }
    const item = pickItem(input, next.name, { kind: 'explanation' })
    if (item) return { type: 'item', item, concept: next.name, reason: 'new' }
  }
  return { type: 'done' }
}

/**
 * An item of one kind of part — the weakest kind's practice (§7.3): the met
 * concept with the lowest recall that has a part of that kind, not answered
 * today and not yet served this session.
 */
export function kindPractice(input: SchedulerInput, kind: PartKind): TutorStep {
  const today = dayKey(input.now)
  const served = new Set(input.served ?? [])
  const servedConcepts = new Set(
    input.items.filter(i => served.has(i.id)).flatMap(i => i.concepts).map(c => c.toLowerCase()),
  )
  const candidates = input.syllabus
    .filter(s => !servedConcepts.has(s.name.toLowerCase()))
    .filter(s => (input.byConcept.get(s.name.toLowerCase()) ?? []).some(i => i.kind === kind && !served.has(i.id)))
    .map(s => {
      const c = conceptModel(input.model, s.name)
      const answeredToday = !!c?.lastAnswerAt && dayKey(new Date(c.lastAnswerAt)) === today
      return { s, answeredToday, recall: c?.memory ? recallNow(c.memory, input.now) : 1 }
    })
    .filter(x => !x.answeredToday)
    .sort((a, b) => a.recall - b.recall || b.s.weight - a.s.weight)
  for (const { s } of candidates) {
    const item = pickItem(input, s.name, { onlyKind: kind })
    if (item && item.kind === kind) return { type: 'item', item, concept: s.name, reason: 'practice' }
  }
  return { type: 'done' }
}

export interface DayPlan {
  relearn: number
  due: number
  newConcepts: string[]
  /** An estimate at exam pace, plus a few minutes to read each new page. */
  minutes: number
}

/** Minutes to read a concept page and its worked example. */
export const READ_MINUTES = 4

function typicalMinutes(items: readonly TutorItem[] | undefined): number {
  if (!items || items.length === 0) return 3
  const sorted = items.map(i => i.minutes).sort((a, b) => a - b)
  return sorted[Math.floor(sorted.length / 2)]
}

/** What today holds — the session start's summary. */
export function dayPlan(input: SchedulerInput): DayPlan {
  const itemsById = new Map(input.items.map(i => [i.id, i]))
  const relearn = input.model.relearn.filter(r => isRelearnReady(r, input.now) && itemsById.has(r.item))
  const due = dueConcepts(input)
  const cap = Math.max(0, PHASES[input.phase].newPerDay - (input.introducedToday ?? 0))
  const fresh = newConcepts(input).slice(0, cap).map(c => c.name)
  let minutes = 0
  for (const r of relearn) minutes += itemsById.get(r.item)!.minutes
  for (const d of due) minutes += typicalMinutes(input.byConcept.get(d.concept.name.toLowerCase()))
  for (const n of fresh) minutes += READ_MINUTES + typicalMinutes(input.byConcept.get(n.toLowerCase()))
  return { relearn: relearn.length, due: due.length, newConcepts: fresh, minutes: Math.round(minutes) }
}

/** The count on the character: what is waiting now. */
export function waitingCount(input: SchedulerInput): number {
  const plan = dayPlan(input)
  return plan.relearn + plan.due
}
