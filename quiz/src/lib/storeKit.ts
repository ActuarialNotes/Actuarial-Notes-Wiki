// The Shop's **exam kit** (docs/store.md, "The kit"): one exam's shelf read as
// the steps a candidate goes through — register, get an allowed calculator,
// learn the syllabus, practise, review — each holding the products that answer
// it, with the first step not yet sorted put in the spotlight.
//
// Nothing here decides what a reader should buy. A step lists every product
// the Shop carries for it, in the shelf's own order (like with like, cheapest
// first); the reader ticks a step off ("I have this") and the next one comes
// forward. What they've ticked is theirs alone, kept in the browser.
//
// Pure and tested (`storeKit.test.ts`).

import { STUDY_KIND_ORDER, storeShelf, type StoreItem, type StudyKind } from './store'

export type KitStepId = 'register' | 'calculator' | 'learn' | 'practise' | 'review'

/** The steps, in the order a candidate meets them. */
export const KIT_STEP_ORDER: readonly KitStepId[] = ['register', 'calculator', 'learn', 'practise', 'review']

export const KIT_STEP_TITLE: Record<KitStepId, string> = {
  register: 'Register',
  calculator: 'Calculator',
  learn: 'Learn the syllabus',
  practise: 'Practise questions',
  review: 'Review on the go',
}

/** Which study kinds each study step holds. Every kind is in exactly one. */
export const KIT_STEP_KINDS: Record<'learn' | 'practise' | 'review', readonly StudyKind[]> = {
  learn: ['manual', 'video', 'seminar', 'course', 'bundle'],
  practise: ['practice'],
  review: ['flashcards'],
}

export interface KitStep {
  id: KitStepId
  items: StoreItem[]
}

export interface ExamKit {
  /** The steps that have something in them, in `KIT_STEP_ORDER`. */
  steps: KitStep[]
  /** The syllabus textbooks — optional, so not a step. */
  textbooks: StoreItem[]
}

function stepOf(item: StoreItem): KitStepId | null {
  if (item.aisle === 'registration') return 'register'
  if (item.type === 'calculator') return 'calculator'
  if (item.type !== 'study') return null
  const kind = item.study.kind
  for (const id of ['learn', 'practise', 'review'] as const) if (KIT_STEP_KINDS[id].includes(kind)) return id
  return null
}

/** One exam's shelf (and region, for an exam sat per region) as the kit's steps. */
export function examKit(items: readonly StoreItem[], examKey: string, variant: string | null = null): ExamKit {
  const shelf = storeShelf(items, { exam: examKey, aisle: null, variant }).flatMap(group => group.items)
  const byStep = new Map<KitStepId, StoreItem[]>()
  const textbooks: StoreItem[] = []
  for (const item of shelf) {
    if (item.type === 'book') {
      textbooks.push(item)
      continue
    }
    const step = stepOf(item)
    if (!step) continue
    const list = byStep.get(step) ?? []
    list.push(item)
    byStep.set(step, list)
  }
  return {
    steps: KIT_STEP_ORDER.filter(id => byStep.has(id)).map(id => ({ id, items: byStep.get(id)! })),
    textbooks,
  }
}

/** The step in the spotlight: the first one not ticked off, or none when the kit is complete. */
export function nextStep(steps: readonly KitStep[], done: ReadonlySet<string>): KitStep | null {
  return steps.find(s => !done.has(s.id)) ?? null
}

/** The study kinds a step's comparison covers, or null for a step with nothing to compare. */
export function comparableKinds(step: KitStep): StudyKind[] | null {
  if (step.id !== 'learn' && step.id !== 'practise' && step.id !== 'review') return null
  if (step.items.filter(i => i.type === 'study').length < 2) return null
  return STUDY_KIND_ORDER.filter(k => KIT_STEP_KINDS[step.id as 'learn'].includes(k))
}

// ── Prices on one scale ──────────────────────────────────────────────────────

export interface PriceSpan {
  low: number
  high: number
  currency: string
}

/**
 * The lowest and highest price an item is sold at, in the currency it is
 * listed in first (the card's rule, `priceSummary`), or null with no price.
 */
export function priceSpan(item: StoreItem): PriceSpan | null {
  if (item.prices.length === 0) return null
  const currency = item.prices[0]!.currency
  const amounts = item.prices.filter(p => p.currency === currency).map(p => p.amount)
  return { low: Math.min(...amounts), high: Math.max(...amounts), currency }
}

/**
 * The end of the scale a step's prices are drawn on: the highest price among
 * them, rounded up to the next hundred. Null — and no bars — when fewer than
 * two items carry a price, or when they are in different currencies, which
 * one scale can't honestly hold.
 */
export function priceScale(items: readonly StoreItem[]): number | null {
  const spans = items.map(priceSpan).filter((s): s is PriceSpan => s !== null)
  if (spans.length < 2) return null
  if (new Set(spans.map(s => s.currency)).size > 1) return null
  const top = Math.max(...spans.map(s => s.high))
  if (top <= 0) return null
  return Math.ceil(top / 100) * 100
}

/** Where an item's price bar starts and how wide it is, as percentages of the scale. */
export function priceBar(span: PriceSpan, scale: number): { left: number; width: number } {
  const left = (span.low / scale) * 100
  const width = ((span.high - span.low) / scale) * 100
  return { left: Math.min(100, Math.max(0, left)), width: Math.min(100 - left, Math.max(0, width)) }
}

// ── Which exam, and what's ticked ────────────────────────────────────────────

/**
 * The exam the kit opens on when the address names none: the first exam the
 * reader is studying, up the ladder, that the Shop stocks — or none.
 */
export function defaultKitExam(studying: ReadonlySet<string>, stocked: readonly string[]): string | null {
  return stocked.find(key => studying.has(key)) ?? null
}

/** What the reader has ticked off, by exam — read back from storage, anything malformed dropped. */
export type KitDone = Record<string, KitStepId[]>

export function parseKitDone(raw: string | null): KitDone {
  if (!raw) return {}
  try {
    const value: unknown = JSON.parse(raw)
    if (!value || typeof value !== 'object' || Array.isArray(value)) return {}
    const out: KitDone = {}
    for (const [exam, steps] of Object.entries(value as Record<string, unknown>)) {
      if (!Array.isArray(steps)) continue
      const kept = KIT_STEP_ORDER.filter(id => steps.includes(id))
      if (kept.length) out[exam] = kept
    }
    return out
  } catch {
    return {}
  }
}

/** Tick a step off, or back on. */
export function toggleKitStep(done: KitDone, exam: string, step: KitStepId): KitDone {
  const current = new Set(done[exam] ?? [])
  if (current.has(step)) current.delete(step)
  else current.add(step)
  const next = { ...done }
  const kept = KIT_STEP_ORDER.filter(id => current.has(id))
  if (kept.length) next[exam] = kept
  else delete next[exam]
  return next
}
