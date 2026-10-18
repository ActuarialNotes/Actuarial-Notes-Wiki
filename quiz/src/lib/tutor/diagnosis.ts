// **Finding what's confusing** (docs/tutor.md §7). "I got it wrong" is not a
// diagnosis. This reads the candidate's record for the patterns that say what
// *kind* of wrong it is, each one a function of data the app already has, and
// each with something to do about it.

import type { MasteryState } from '../mastery'
import { openingNames, PLACE } from '../conceptRecipes'
import type { PartKind } from './items'
import { conceptModel, type ConfusionReason, type TutorModel } from './log'
import { siblingsOf, type SyllabusConcept } from './scheduler'

export type Finding =
  /** Marked *Sure*, and short of full credit — a misconception, not a gap (§7.1). */
  | { type: 'sure-wrong'; concept: string }
  /** The candidate said so, and why (§7.7). */
  | { type: 'confused'; concept: string; reason: ConfusionReason }
  /** Missed on two or more days, and still not right (§7.2). */
  | { type: 'persistent'; concept: string; missDays: number }
  /** Two concepts the syllabus names on one line, both missed (§7.4). */
  | { type: 'siblings'; concepts: [string, string]; line: string }
  /** A missed concept whose definition rests on one the candidate hasn't got (§7.5). */
  | { type: 'foundation'; concept: string; foundations: string[] }
  /** One kind of part well below the others (§7.3). */
  | { type: 'kind-gap'; weak: PartKind; weakRate: number; strong: PartKind; strongRate: number }
  /** How often *Sure* was right (§7.8). */
  | { type: 'calibration'; sureRate: number; sureAnswers: number; guessRate: number | null; overconfident: boolean }

/** Answers before a kind of part is compared with the others. */
export const KIND_MIN_ANSWERS = 5
/** How far below the best kind a kind has to be to be named. */
export const KIND_GAP = 0.2
/** Confidence-rated answers before calibration is said. */
export const CALIBRATION_MIN = 10
/** *Sure* right less often than this is overconfidence. */
export const OVERCONFIDENT_BELOW = 0.75

/**
 * The concepts a page is defined by — what its definition sentence (up to its
 * first aside) *links* to, and the right side of its defining formula — among
 * `names`. `Pure Premium = Frequency × Severity` gives *Frequency* and
 * *Severity*. A name merely written out is left alone: "Policy Year, also
 * called underwriting year, … incepting in a given calendar year" names two
 * concepts it isn't made of.
 */
export function foundationsOf(page: string, markdown: string, names: readonly string[]): string[] {
  const out: string[] = []
  for (const n of openingNames(page, markdown, names)) {
    if (n.place !== PLACE.definition) continue
    const fromFormula = /\\(?:text|mathrm|operatorname)\{/.test(n.text)
    if (!n.linked && !fromFormula) continue
    if (n.name.toLowerCase() === page.toLowerCase()) continue
    if (!out.includes(n.name)) out.push(n.name)
  }
  return out
}

/**
 * Foundations with every two-way pair taken out. Pages that define each other
 * ("Credibility … its complement", "the complement of credibility …") say
 * the two belong together, not that either comes first.
 */
export function oneWayFoundations(map: ReadonlyMap<string, readonly string[]>): Map<string, string[]> {
  const out = new Map<string, string[]>()
  for (const [concept, foundations] of map) {
    const kept = foundations.filter(f => !(map.get(f.toLowerCase()) ?? []).some(back => back.toLowerCase() === concept))
    if (kept.length > 0) out.set(concept, kept)
  }
  return out
}

/** Whether a concept is short of known: unmet, Level 1, or Forgotten. */
function isShaky(name: string, model: TutorModel, ladder?: ReadonlyMap<string, MasteryState>): boolean {
  const c = conceptModel(model, name)
  const state = ladder?.get(name.toLowerCase())
  if (state === 'level2' || state === 'level3') return false
  if (!c?.memory) return true
  return state === 'forgotten' || state === 'level1' || c.lastGrade === 'incorrect'
}

function missed(name: string, model: TutorModel): boolean {
  const c = conceptModel(model, name)
  return !!c && c.lastGrade !== null && c.lastGrade !== 'correct'
}

export interface DiagnosisInput {
  syllabus: readonly SyllabusConcept[]
  model: TutorModel
  /** Each concept's foundations, lowercased key (see `foundationsOf`). */
  foundations?: ReadonlyMap<string, string[]>
  ladder?: ReadonlyMap<string, MasteryState>
}

/** The candidate's findings, most valuable first. */
export function diagnose(input: DiagnosisInput): Finding[] {
  const { syllabus, model } = input
  const out: Finding[] = []

  for (const s of syllabus) {
    const c = conceptModel(model, s.name)
    if (c?.sureWrong) out.push({ type: 'sure-wrong', concept: s.name })
  }
  for (const s of syllabus) {
    const c = conceptModel(model, s.name)
    if (c?.confusion) out.push({ type: 'confused', concept: s.name, reason: c.confusion })
  }
  for (const s of syllabus) {
    const c = conceptModel(model, s.name)
    if (c && c.missDays.length >= 2 && c.lastGrade !== 'correct' && !c.sureWrong) {
      out.push({ type: 'persistent', concept: s.name, missDays: c.missDays.length })
    }
  }

  const paired = new Set<string>()
  for (const s of syllabus) {
    if (!missed(s.name, model)) continue
    for (const other of siblingsOf(syllabus, s.name)) {
      if (!missed(other, model)) continue
      const key = [s.name, other].map(n => n.toLowerCase()).sort().join('|')
      if (paired.has(key)) continue
      paired.add(key)
      out.push({ type: 'siblings', concepts: [s.name, other], line: s.line })
    }
  }

  if (input.foundations) {
    for (const s of syllabus) {
      if (!missed(s.name, model)) continue
      const shaky = (input.foundations.get(s.name.toLowerCase()) ?? []).filter(f => isShaky(f, model, input.ladder))
      if (shaky.length > 0) out.push({ type: 'foundation', concept: s.name, foundations: shaky })
    }
  }

  const kinds = (Object.keys(model.byKind) as PartKind[]).filter(k => model.byKind[k].answers >= KIND_MIN_ANSWERS)
  if (kinds.length >= 2) {
    const rate = (k: PartKind) => model.byKind[k].credit / model.byKind[k].answers
    const sorted = [...kinds].sort((a, b) => rate(a) - rate(b))
    const weak = sorted[0]
    const strong = sorted[sorted.length - 1]
    if (rate(strong) - rate(weak) >= KIND_GAP) {
      out.push({ type: 'kind-gap', weak, weakRate: rate(weak), strong, strongRate: rate(strong) })
    }
  }

  const { sure, guess, unsure } = model.calibration
  if (sure.answers + unsure.answers + guess.answers >= CALIBRATION_MIN && sure.answers > 0) {
    const sureRate = sure.full / sure.answers
    out.push({
      type: 'calibration',
      sureRate,
      sureAnswers: sure.answers,
      guessRate: guess.answers > 0 ? guess.full / guess.answers : null,
      overconfident: sureRate < OVERCONFIDENT_BELOW,
    })
  }

  return out
}

/** The options "I'm confused" offers for a concept (§7.7), each only where it has something behind it. */
export interface ConfusionOption {
  reason: ConfusionReason
  label: string
  /** For `difference`, the siblings; for `foundation`, the foundations. */
  concepts?: string[]
}

export function confusionOptions(
  concept: string,
  syllabus: readonly SyllabusConcept[],
  foundations: readonly string[],
  kinds: ReadonlySet<PartKind>,
): ConfusionOption[] {
  const out: ConfusionOption[] = [{ reason: 'meaning', label: 'What it means' }]
  const siblings = siblingsOf(syllabus, concept)
  if (siblings.length > 0) out.push({ reason: 'difference', label: 'How it differs from…', concepts: siblings.slice(0, 6) })
  if (kinds.has('calculation')) out.push({ reason: 'calculation', label: 'The calculation' })
  if (kinds.has('judgment') || kinds.has('explanation')) out.push({ reason: 'when', label: 'When to use it, and why' })
  if (foundations.length > 0) out.push({ reason: 'foundation', label: 'Something it builds on', concepts: [...foundations] })
  return out
}
