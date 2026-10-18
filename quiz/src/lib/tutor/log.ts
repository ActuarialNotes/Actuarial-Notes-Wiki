// The Tutor's record: an **append-only event log**, and the fold that turns it
// into everything the Tutor knows (docs/tutor.md §11).
//
// Nothing the Tutor decides is stored as a decision. The memory of every
// concept, the items waiting to be relearned, the calibration, the open flags
// and the offer history are all recomputed from the events, so the model is
// deterministic, testable from a fixture, and safe to merge from two devices
// (a union of events, sorted by time, is the same record).

import type { Difficulty, SelfGrade } from '../parser'
import type { ConceptMasteryRecord } from '../mastery'
import type { PartKind } from './items'
import {
  dayKey,
  addDayKey,
  ratingFor,
  review,
  seedFromLadder,
  type Confidence,
  type MemoryState,
} from './memory'

/** What a candidate said was confusing about a concept (§7.7). */
export type ConfusionReason = 'meaning' | 'difference' | 'calculation' | 'when' | 'foundation'

/** The moments the Tutor makes offers at (§4). */
export type OfferKind = 'arrival' | 'post-read' | 'reading-streak' | 'relearn' | 'debrief'

export type OfferResponse = 'shown' | 'accepted' | 'declined'

export interface AnswerEvent {
  t: 'answer'
  at: string
  item: string
  question: string
  concepts: string[]
  kind: PartKind
  points: number
  difficulty: Difficulty
  grade: SelfGrade
  confidence: Confidence | null
  seconds: number
}

export interface ConfusedEvent {
  t: 'confused'
  at: string
  concept: string
  reason: ConfusionReason
}

export interface ReadEvent {
  t: 'read'
  at: string
  concept: string
  seconds: number
}

export interface OfferEvent {
  t: 'offer'
  at: string
  kind: OfferKind
  response: OfferResponse
}

export type TutorEvent = AnswerEvent | ConfusedEvent | ReadEvent | OfferEvent

/** How many answers it takes, at full credit, to close an open flag. */
export const FLAG_CLEARED_AFTER = 2

/** Items answered in between before a missed one comes back in the same session. */
export const RELEARN_GAP_ITEMS = 3
/** Minutes before a missed item comes back in the same session. */
export const RELEARN_GAP_MINUTES = 5
/** Days between relearning sessions, after the first and the second success. */
export const RELEARN_SPACING_DAYS = [1, 3] as const
/** Successes, each on a day of its own, that close a relearn. */
export const RELEARN_SESSIONS = 3

/** How many answers the rolling success rate looks back over. */
export const RECENT_WINDOW = 12

export interface ConceptModel {
  name: string
  memory: MemoryState | null
  /** True when `memory` came from the ladder and the Tutor hasn't reviewed it yet. */
  seeded: boolean
  /** When the Tutor first checked it with nothing known before — its introduction. */
  introducedAt: string | null
  answers: number
  fullAnswers: number
  lastAnswerAt: string | null
  lastGrade: SelfGrade | null
  /** Days with an answer short of full credit. */
  missDays: string[]
  /** An answer marked Sure that got less than full credit, not yet answered right twice since. */
  sureWrong: boolean
  /** The open "I'm confused", if any. */
  confusion: ConfusionReason | null
  /** Full-credit answers since the last flag was raised. */
  fullSinceFlag: number
  lastReadAt: string | null
}

export interface ItemHistory {
  id: string
  seen: number
  lastAt: string
  lastGrade: SelfGrade
}

export interface RelearnEntry {
  item: string
  question: string
  concepts: string[]
  missedAt: string
  /** Days on which it has since been answered at full credit. */
  successDays: string[]
  /** Other items answered since the miss. */
  answeredSince: number
}

export interface CalibrationCell { answers: number; full: number }

export interface TutorModel {
  concepts: Map<string, ConceptModel>
  items: Map<string, ItemHistory>
  relearn: RelearnEntry[]
  calibration: Record<Confidence, CalibrationCell>
  /** Credit by kind of part: answers and the credit they earned (full 1, partial ½). */
  byKind: Record<PartKind, { answers: number; credit: number }>
  /** The credit of the last answers, oldest first. */
  recent: number[]
  /** The last item answered, and its question. */
  lastItem: string | null
  lastQuestion: string | null
  /** Concept pages read, newest last, with when. */
  reads: { concept: string; at: string }[]
  lastAnswerAt: string | null
  /** Offers, by kind: when one was last shown and how many were declined in a row today. */
  offers: Partial<Record<OfferKind, { lastShownAt: string; declinesToday: number; day: string }>>
  lastOfferShownAt: string | null
  /** Today's answers and seconds spent — "today" as the fold's `now` sees it. */
  answeredToday: number
  secondsToday: number
}

export function creditOf(grade: SelfGrade): number {
  return grade === 'correct' ? 1 : grade === 'partial' ? 0.5 : 0
}

function emptyConcept(name: string): ConceptModel {
  return {
    name,
    memory: null,
    seeded: false,
    introducedAt: null,
    answers: 0,
    fullAnswers: 0,
    lastAnswerAt: null,
    lastGrade: null,
    missDays: [],
    sureWrong: false,
    confusion: null,
    fullSinceFlag: 0,
    lastReadAt: null,
  }
}

export function emptyModel(): TutorModel {
  return {
    concepts: new Map(),
    items: new Map(),
    relearn: [],
    calibration: { sure: { answers: 0, full: 0 }, unsure: { answers: 0, full: 0 }, guess: { answers: 0, full: 0 } },
    byKind: {
      calculation: { answers: 0, credit: 0 },
      explanation: { answers: 0, credit: 0 },
      judgment: { answers: 0, credit: 0 },
    },
    recent: [],
    lastItem: null,
    lastQuestion: null,
    reads: [],
    lastAnswerAt: null,
    offers: {},
    lastOfferShownAt: null,
    answeredToday: 0,
    secondsToday: 0,
  }
}

/** The ladder's states as the memory model's starting points, keyed by lowercased concept. */
export function ladderSeeds(records: readonly ConceptMasteryRecord[], examId: string): Map<string, MemoryState> {
  const seeds = new Map<string, MemoryState>()
  for (const r of records) {
    if (r.exam_id !== examId) continue
    const seed = seedFromLadder(r)
    if (seed) seeds.set(r.concept_slug.toLowerCase(), seed)
  }
  return seeds
}

function conceptFor(model: TutorModel, name: string, seeds: ReadonlyMap<string, MemoryState>): ConceptModel {
  const key = name.toLowerCase()
  let c = model.concepts.get(key)
  if (!c) {
    c = emptyConcept(name)
    const seed = seeds.get(key)
    if (seed) { c.memory = seed; c.seeded = true }
    model.concepts.set(key, c)
  }
  return c
}

function applyAnswer(model: TutorModel, e: AnswerEvent, seeds: ReadonlyMap<string, MemoryState>, today: string): void {
  const at = new Date(e.at)
  const day = dayKey(at)
  const full = e.grade === 'correct'
  const rating = ratingFor(e.grade, e.confidence)

  for (const name of e.concepts) {
    const c = conceptFor(model, name, seeds)
    // A seed is the ladder's view *before* the Tutor saw the concept. An answer
    // older than the seed's last review can't be folded on top of it.
    if (c.seeded && c.memory && c.memory.lastReview > e.at) c.memory = null
    if (!c.memory && !c.introducedAt) c.introducedAt = e.at
    c.memory = review(c.memory, rating, at)
    c.seeded = false
    c.answers++
    if (full) c.fullAnswers++
    c.lastAnswerAt = e.at
    c.lastGrade = e.grade
    if (!full && !c.missDays.includes(day)) c.missDays.push(day)
    if (e.confidence === 'sure' && !full) {
      c.sureWrong = true
      c.fullSinceFlag = 0
    } else if (full && (c.sureWrong || c.confusion)) {
      c.fullSinceFlag++
      if (c.fullSinceFlag >= FLAG_CLEARED_AFTER) {
        c.sureWrong = false
        c.confusion = null
      }
    }
  }

  const prev = model.items.get(e.item)
  model.items.set(e.item, { id: e.item, seen: (prev?.seen ?? 0) + 1, lastAt: e.at, lastGrade: e.grade })

  // Successive relearning: a miss opens (or reopens) the item's relearn entry;
  // a full-credit answer on a day of its own moves it on; three close it.
  for (const r of model.relearn) if (r.item !== e.item) r.answeredSince++
  const open = model.relearn.find(r => r.item === e.item)
  if (!full) {
    if (open) {
      open.missedAt = e.at
      open.successDays = []
      open.answeredSince = 0
    } else {
      model.relearn.push({ item: e.item, question: e.question, concepts: e.concepts, missedAt: e.at, successDays: [], answeredSince: 0 })
    }
  } else if (open && !open.successDays.includes(day)) {
    open.successDays.push(day)
    if (open.successDays.length >= RELEARN_SESSIONS) {
      model.relearn = model.relearn.filter(r => r !== open)
    }
  }

  if (e.confidence) {
    const cell = model.calibration[e.confidence]
    cell.answers++
    if (full) cell.full++
  }
  const kind = model.byKind[e.kind]
  kind.answers++
  kind.credit += creditOf(e.grade)

  model.recent.push(creditOf(e.grade))
  if (model.recent.length > RECENT_WINDOW) model.recent.shift()
  model.lastItem = e.item
  model.lastQuestion = e.question
  model.lastAnswerAt = e.at
  if (day === today) {
    model.answeredToday++
    model.secondsToday += e.seconds
  }
}

/**
 * Fold the log into the model. `seeds` are the ladder's starting states (see
 * `ladderSeeds`); `now` decides what "today" is. Events are taken in time
 * order whatever order they are passed in.
 */
export function foldLog(
  events: readonly TutorEvent[],
  seeds: ReadonlyMap<string, MemoryState> = new Map(),
  now: Date = new Date(),
): TutorModel {
  const model = emptyModel()
  const today = dayKey(now)
  for (const [key, seed] of seeds) {
    const c = emptyConcept(key)
    c.memory = seed
    c.seeded = true
    model.concepts.set(key, c)
  }
  const ordered = [...events].sort((a, b) => (a.at < b.at ? -1 : a.at > b.at ? 1 : 0))
  for (const e of ordered) {
    switch (e.t) {
      case 'answer':
        applyAnswer(model, e, seeds, today)
        break
      case 'confused': {
        const c = conceptFor(model, e.concept, seeds)
        c.confusion = e.reason
        c.fullSinceFlag = 0
        break
      }
      case 'read': {
        const c = conceptFor(model, e.concept, seeds)
        c.lastReadAt = e.at
        model.reads.push({ concept: e.concept, at: e.at })
        if (model.reads.length > 50) model.reads.shift()
        break
      }
      case 'offer': {
        const day = dayKey(new Date(e.at))
        const cur = model.offers[e.kind]
        const sameDay = cur?.day === day
        if (e.response === 'shown') {
          model.offers[e.kind] = { lastShownAt: e.at, declinesToday: sameDay ? cur!.declinesToday : 0, day }
          model.lastOfferShownAt = e.at
        } else if (e.response === 'declined') {
          model.offers[e.kind] = { lastShownAt: cur?.lastShownAt ?? e.at, declinesToday: (sameDay ? cur!.declinesToday : 0) + 1, day }
        } else {
          model.offers[e.kind] = { lastShownAt: cur?.lastShownAt ?? e.at, declinesToday: 0, day }
        }
        break
      }
    }
  }
  return model
}

/** Concepts introduced on the day of `now` — what the phase's new-concept cap counts. */
export function introducedOn(model: TutorModel, now: Date): number {
  const today = dayKey(now)
  let n = 0
  for (const c of model.concepts.values()) if (c.introducedAt && dayKey(new Date(c.introducedAt)) === today) n++
  return n
}

/** The concept's model, by any spelling of its name. */
export function conceptModel(model: TutorModel, name: string): ConceptModel | undefined {
  return model.concepts.get(name.toLowerCase())
}

/**
 * When a relearn entry is next ready, as an ISO timestamp — or `'after-items'`
 * while it is still waiting on other items to be answered in between.
 */
export function relearnReadyAt(entry: RelearnEntry): string {
  const n = entry.successDays.length
  if (n === 0) {
    return new Date(new Date(entry.missedAt).getTime() + RELEARN_GAP_MINUTES * 60_000).toISOString()
  }
  const last = entry.successDays[n - 1]
  const gap = RELEARN_SPACING_DAYS[Math.min(n - 1, RELEARN_SPACING_DAYS.length - 1)]
  return `${addDayKey(last, gap)}T00:00:00`
}

/** Whether a relearn entry can be served now. */
export function isRelearnReady(entry: RelearnEntry, now: Date): boolean {
  if (entry.successDays.length === 0) {
    // Missed on an earlier day: tomorrow is far enough.
    if (dayKey(new Date(entry.missedAt)) < dayKey(now)) return true
    if (entry.answeredSince < RELEARN_GAP_ITEMS) return false
    return now.getTime() >= new Date(relearnReadyAt(entry)).getTime()
  }
  return dayKey(now) >= relearnReadyAt(entry).slice(0, 10)
}

/** The rolling success rate over the last answers, or null with too few to say. */
export function recentSuccess(model: TutorModel, min = 4): number | null {
  if (model.recent.length < min) return null
  return model.recent.reduce((a, b) => a + b, 0) / model.recent.length
}

/** Cap a log at `max` events, dropping the oldest reads and offers first. */
export const LOG_CAP = 4000

export function capLog(events: readonly TutorEvent[], max = LOG_CAP): TutorEvent[] {
  if (events.length <= max) return [...events]
  let excess = events.length - max
  const out: TutorEvent[] = []
  for (const e of events) {
    if (excess > 0 && (e.t === 'read' || e.t === 'offer')) { excess--; continue }
    out.push(e)
  }
  return out.length > max ? out.slice(out.length - max) : out
}
