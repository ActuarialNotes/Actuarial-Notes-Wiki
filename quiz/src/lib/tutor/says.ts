// **The one thing the Tutor says** (docs/tutor.md §8). Opened, the Tutor says
// one sentence about what is on screen and offers at most one thing to do
// about it. This module picks both: a ladder per surface, the first row that
// applies winning. Every sentence is a fact from the candidate's own record or
// from the papers in the bank; nothing here is advice it can't back.

import type { Finding } from './diagnosis'
import { examHistory, type TutorPlace } from './context'
import { findingLine } from './copy'
import { PHASES } from './journey'
import { conceptModel, isRelearnReady, type RelearnEntry, type TutorModel } from './log'
import { dayKey, daysFromTo, dueDay } from './memory'
import { dueConcepts, newConcepts, type SchedulerInput, type StepReason } from './scheduler'

export type TutorAct =
  /** One past-paper part on a concept; `item` when it has to be that part (a miss coming back). */
  | { type: 'check'; label: string; concept: string; item?: string; reason: StepReason }
  /** Open a concept's page. */
  | { type: 'read'; label: string; concept: string }

export interface TutorLine {
  text: string
  act: TutorAct | null
}

export interface SaysInput {
  place: TutorPlace
  /** The bank and the syllabus are in. */
  ready: boolean
  examLabel: string
  /** The Tutor's exam's own page, by file name. */
  examPage: string
  base: SchedulerInput
  findings: readonly Finding[]
  /** Concepts the quiz just finished lost points on, in question order. */
  missed?: readonly string[]
}

const CHECK = 'Check yourself'
const AGAIN = 'Try it again'

const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

/** "earlier today", "yesterday", "on Tuesday", "on Nov 3". */
export function whenMissed(iso: string, now: Date): string {
  const at = new Date(iso)
  const days = daysFromTo(dayKey(at), dayKey(now))
  if (days <= 0) return 'earlier today'
  if (days === 1) return 'yesterday'
  if (days < 7) return `on ${WEEKDAYS[at.getDay()]}`
  return `on ${MONTHS[at.getMonth()]} ${at.getDate()}`
}

/** Why a part on this concept is being served: what its card says above the question. */
export function reasonOf(model: TutorModel, concept: string, today: string, examDay: string | null): StepReason {
  const c = conceptModel(model, concept)
  if (c?.sureWrong) return 'sure-wrong'
  if (c?.confusion) return 'confused'
  if (!c?.memory) return 'new'
  return dueDay(c.memory, examDay) <= today ? 'due' : 'practice'
}

function has(input: SaysInput, concept: string): boolean {
  return (input.base.byConcept.get(concept.toLowerCase())?.length ?? 0) > 0
}

function inSyllabus(input: SaysInput, concept: string): boolean {
  const lc = concept.toLowerCase()
  return input.base.syllabus.some(c => c.name.toLowerCase() === lc)
}

function relearnOf(input: SaysInput, concept: string): RelearnEntry | undefined {
  const lc = concept.toLowerCase()
  const ids = new Set((input.base.byConcept.get(lc) ?? []).map(i => i.id))
  return input.base.model.relearn.find(r => ids.has(r.item) && r.concepts.some(c => c.toLowerCase() === lc))
}

/** A syllabus concept on screen: the most useful fact about it. */
function conceptLine(input: SaysInput, name: string): TutorLine {
  const { base } = input
  const today = dayKey(base.now)
  if (!has(input, name)) return { text: 'No past-paper part covers this concept yet.', act: null }

  const miss = relearnOf(input, name)
  if (miss) {
    const when = whenMissed(miss.missedAt, base.now)
    // A miss comes back after a gap, never straight away (successive relearning).
    if (!isRelearnReady(miss, base.now)) return { text: `You missed this ${when}. Try it again tomorrow.`, act: null }
    return { text: `You missed this ${when}.`, act: { type: 'check', label: AGAIN, concept: name, item: miss.item, reason: 'relearn' } }
  }

  const c = conceptModel(base.model, name)
  if (c?.sureWrong) {
    return { text: 'You were sure about this and lost points.', act: { type: 'check', label: AGAIN, concept: name, reason: 'sure-wrong' } }
  }
  if (c?.memory) {
    const days = daysFromTo(today, dueDay(c.memory, base.examDay))
    if (days <= 0) return { text: 'This is due for a check.', act: { type: 'check', label: CHECK, concept: name, reason: c.confusion ? 'confused' : 'due' } }
    return { text: days === 1 ? 'Next check tomorrow.' : `Next check in ${days} days.`, act: null }
  }

  const history = examHistory(base.byConcept.get(name.toLowerCase()) ?? [], base.items)
  return {
    text: history.papers > 0 ? `Asked on ${history.papers} of ${history.totalPapers} papers.` : 'Not checked yet.',
    act: { type: 'check', label: CHECK, concept: name, reason: 'new' },
  }
}

/** What a finding offers to do about itself, if anything fits in one button. */
function findingAct(input: SaysInput, f: Finding): TutorAct | null {
  const today = dayKey(input.base.now)
  switch (f.type) {
    case 'sure-wrong':
    case 'confused':
    case 'persistent':
      return has(input, f.concept)
        ? { type: 'check', label: AGAIN, concept: f.concept, reason: reasonOf(input.base.model, f.concept, today, input.base.examDay) }
        : null
    case 'foundation':
      return { type: 'read', label: `Read ${f.foundations[0]}`, concept: f.foundations[0] }
    default:
      return null
  }
}

/** Anywhere with nothing of its own to talk about: the most pressing single thing. */
function pressingLine(input: SaysInput): TutorLine {
  const { base } = input
  if (base.phase === 'exam' || base.phase === 'after') return { text: PHASES[base.phase].purpose, act: null }

  const ids = new Set(base.items.map(i => i.id))
  const miss = base.model.relearn
    .filter(r => ids.has(r.item) && isRelearnReady(r, base.now))
    .sort((a, b) => a.missedAt.localeCompare(b.missedAt))[0]
  if (miss) {
    const concept = miss.concepts[0]
    return {
      text: `You missed ${concept} ${whenMissed(miss.missedAt, base.now)}.`,
      act: { type: 'check', label: AGAIN, concept, item: miss.item, reason: 'relearn' },
    }
  }

  const due = dueConcepts(base)[0]
  if (due) {
    const name = due.concept.name
    const c = conceptModel(base.model, name)
    if (c?.sureWrong) {
      return { text: `You were sure about ${name} and lost points.`, act: { type: 'check', label: AGAIN, concept: name, reason: 'sure-wrong' } }
    }
    return { text: `${name} is due for a check.`, act: { type: 'check', label: CHECK, concept: name, reason: c?.confusion ? 'confused' : 'due' } }
  }

  const finding = input.findings[0]
  if (finding) return { text: findingLine(finding), act: findingAct(input, finding) }

  return { text: 'Nothing is due.', act: null }
}

/** The one line for what is on screen, and the one thing to do about it. */
export function tutorSays(input: SaysInput): TutorLine {
  const { place, base } = input
  const onlyCovers: TutorLine = { text: `The Tutor only covers ${input.examLabel} for now.`, act: null }
  if (place.surface === 'exam' && place.examPage !== input.examPage) return onlyCovers
  if (!input.ready) return { text: `Reading the ${input.examLabel} papers…`, act: null }

  if (place.surface === 'concept' && place.concept) {
    return inSyllabus(input, place.concept) ? conceptLine(input, place.concept) : onlyCovers
  }

  if (place.surface === 'review') {
    const lost = (input.missed ?? []).find(c => inSyllabus(input, c) && has(input, c))
    if (lost) {
      const miss = relearnOf(input, lost)
      return {
        text: `That quiz lost points on ${lost}.`,
        act: {
          type: 'check',
          label: 'Go over it',
          concept: lost,
          ...(miss && isRelearnReady(miss, base.now) ? { item: miss.item } : {}),
          reason: reasonOf(base.model, lost, dayKey(base.now), base.examDay),
        },
      }
    }
  }

  if (place.surface === 'exam' && base.phase !== 'exam' && base.phase !== 'after') {
    const next = newConcepts(base)[0]
    if (next) return { text: `${next.name} is next on the syllabus.`, act: { type: 'read', label: 'Read it', concept: next.name } }
  }

  return pressingLine(input)
}

/** The one line the Tutor says unasked: a syllabus page read, and now out of sight. */
export function afterReadingLine(concept: string, reason: StepReason): TutorLine {
  return { text: `You just read ${concept}.`, act: { type: 'check', label: CHECK, concept, reason } }
}
