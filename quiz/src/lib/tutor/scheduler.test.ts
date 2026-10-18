import { describe, expect, it } from 'vitest'
import { parseExamSyllabus } from '../wikiParser'
import type { Difficulty } from '../parser'
import { foldLog, type AnswerEvent, type TutorEvent } from './log'
import type { PartKind, TutorItem } from './items'
import { itemsByConcept } from './items'
import {
  dayPlan,
  dueConcepts,
  extraPractice,
  kindPractice,
  newConcepts,
  nextStep,
  pickItem,
  siblingsOf,
  targetDifficulty,
  tutorSyllabus,
  weakestKind,
  weightMidpoint,
  type SchedulerInput,
  type SyllabusConcept,
} from './scheduler'

const PAGE = [
  '<div class="exam-nav" data-current="5|Basic Techniques"></div>',
  '',
  '> [!example]- A. Ratemaking {45–55%}',
  '> 1. Organize data by [[Calendar Year]], [[Policy Year]] and [[Accident Year]]',
  '> 2. Calculate [[Pure Premium]]',
  '',
  '> [!example]- B. Reserving {45–55%}',
  '> 1. Estimate with the [[Chain Ladder Method]] and [[Cape Cod Method]]',
  '> 2. Apply a [[Tail Factor]]',
].join('\n')

const syllabus = tutorSyllabus(parseExamSyllabus(PAGE, '5', 'Exam 5', 'Basic Techniques'))

function item(id: string, concept: string, opts: Partial<TutorItem> = {}): TutorItem {
  return {
    id, questionId: id.split('#')[0], partLabel: 'a', exam: 'Exam 5', topic: concept, preamble: '', prompt: 'Calculate it.',
    kind: 'calculation' as PartKind, concepts: [concept], questionConcepts: [concept], points: 1, minutes: 4.4,
    difficulty: 'medium' as Difficulty, sitting: 'Fall 2019', answerKey: '1', sampleAnswer: 's', examinerReport: '', options: [],
    ...opts,
  }
}

const items: TutorItem[] = [
  item('cy1#a', 'Calendar Year'), item('cy2#a', 'Calendar Year', { difficulty: 'hard' }),
  item('py1#a', 'Policy Year'), item('ay1#a', 'Accident Year'),
  item('pp1#a', 'Pure Premium'), item('pp2#a', 'Pure Premium', { kind: 'explanation' }),
  item('cl1#a', 'Chain Ladder Method'), item('cl2#a', 'Chain Ladder Method'),
  item('cc1#a', 'Cape Cod Method'), item('cc2#a', 'Cape Cod Method', { difficulty: 'easy' }),
  // Tail Factor has no items.
]

const t0 = new Date(2026, 2, 1, 9, 0, 0)
const iso = (days: number, minutes = 0) => new Date(t0.getTime() + days * 86_400_000 + minutes * 60_000).toISOString()

function answer(item: string, concept: string, grade: AnswerEvent['grade'], when: string, extra: Partial<AnswerEvent> = {}): AnswerEvent {
  return { t: 'answer', at: when, item, question: item.split('#')[0], concepts: [concept], kind: 'calculation', points: 1, difficulty: 'medium', grade, confidence: 'unsure', seconds: 60, ...extra }
}

function input(events: TutorEvent[], now: Date, extra: Partial<SchedulerInput> = {}): SchedulerInput {
  return {
    syllabus,
    items,
    byConcept: itemsByConcept(items),
    model: foldLog(events, new Map(), now),
    now,
    examDay: '2026-06-01',
    phase: 'learn',
    ...extra,
  }
}

describe('the syllabus as the Tutor schedules it', () => {
  it('reads the weights’ midpoints', () => {
    expect(weightMidpoint('45–55%')).toBe(0.5)
    expect(weightMidpoint('{23-30%}')).toBeCloseTo(0.265, 6)
    expect(weightMidpoint(undefined)).toBeNull()
  })

  it('lists every concept once, in order, with its share of the weight', () => {
    expect(syllabus.map(c => c.name)).toEqual([
      'Calendar Year', 'Policy Year', 'Accident Year', 'Pure Premium', 'Chain Ladder Method', 'Cape Cod Method', 'Tail Factor',
    ])
    expect(syllabus[0].weight).toBeCloseTo(0.5 / 4, 6)
    expect(syllabus[4].weight).toBeCloseTo(0.5 / 3, 6)
  })

  it('names as siblings the concepts on one syllabus line', () => {
    expect(siblingsOf(syllabus, 'Policy Year')).toEqual(['Calendar Year', 'Accident Year'])
    expect(siblingsOf(syllabus, 'Pure Premium')).toEqual([])
  })
})

describe('a session’s next step', () => {
  it('starts a new concept with its page, not a cold question', () => {
    expect(nextStep(input([], t0))).toEqual({ type: 'read', concept: 'Calendar Year' })
  })

  it('serves the first check once the page is read — or skipped', () => {
    const read: TutorEvent = { t: 'read', at: iso(0), concept: 'Calendar Year', seconds: 90 }
    const step = nextStep(input([read], t0))
    expect(step).toMatchObject({ type: 'item', concept: 'Calendar Year', reason: 'new' })
    expect(nextStep(input([], t0, { skipRead: ['Calendar Year'] }))).toMatchObject({ type: 'item', concept: 'Calendar Year' })
  })

  it('follows the study plan’s order for new concepts when there is one', () => {
    expect(newConcepts(input([], t0, { planNew: ['Cape Cod Method'] }))[0].name).toBe('Cape Cod Method')
    // A concept with nothing to serve is never introduced.
    expect(newConcepts(input([], t0)).map(c => c.name)).not.toContain('Tail Factor')
  })

  it('stops introducing new concepts at the phase’s cap', () => {
    expect(nextStep(input([], t0, { introducedToday: 5 }))).toEqual({ type: 'done' })
    expect(nextStep(input([], t0, { phase: 'taper' }))).toEqual({ type: 'done' })
  })

  it('serves a missed item again before anything else, once it is ready', () => {
    const events = [
      answer('cc1#a', 'Cape Cod Method', 'incorrect', iso(0)),
      answer('cy1#a', 'Calendar Year', 'correct', iso(0, 1)),
      answer('py1#a', 'Policy Year', 'correct', iso(0, 2)),
      answer('ay1#a', 'Accident Year', 'correct', iso(0, 3)),
    ]
    const now = new Date(t0.getTime() + 6 * 60_000)
    expect(nextStep(input(events, now))).toMatchObject({ type: 'item', reason: 'relearn' })
    expect((nextStep(input(events, now)) as { item: TutorItem }).item.id).toBe('cc1#a')
  })

  it('serves due concepts by what there is to lose, and alternates objectives', () => {
    const events = [
      answer('cy1#a', 'Calendar Year', 'correct', iso(0)),
      answer('cl1#a', 'Chain Ladder Method', 'correct', iso(0, 1)),
      answer('cc1#a', 'Cape Cod Method', 'correct', iso(0, 2)),
    ]
    const later = new Date(t0.getTime() + 10 * 86_400_000)
    const due = dueConcepts(input(events, later))
    expect(due.map(d => d.concept.name)).toEqual(['Chain Ladder Method', 'Cape Cod Method', 'Calendar Year'])
    // After a reserving item, the next is the ratemaking one even though it ranks lower.
    const step = nextStep(input(events, later, { served: ['cl2#a'] }))
    expect(step).toMatchObject({ type: 'item', concept: 'Calendar Year' })
  })

  it('never serves the same concept twice running, or an item twice in a session', () => {
    const events = [answer('cl1#a', 'Chain Ladder Method', 'correct', iso(0))]
    const later = new Date(t0.getTime() + 10 * 86_400_000)
    const step = nextStep(input(events, later, { served: ['cl2#a'] }))
    expect(step.type === 'item' && step.concept).not.toBe('Chain Ladder Method')
  })

  it('in the taper, counts everything due before the exam as due now', () => {
    const events = [answer('cy1#a', 'Calendar Year', 'correct', iso(0))]
    const tomorrow = new Date(t0.getTime() + 1 * 86_400_000)
    expect(dueConcepts(input(events, tomorrow, { phase: 'learn' }))).toHaveLength(0)
    expect(dueConcepts(input(events, tomorrow, { phase: 'taper', examDay: '2026-03-05' }))).toHaveLength(1)
  })

  it('boosts a concept answered wrong while sure', () => {
    const events = [
      answer('cl1#a', 'Chain Ladder Method', 'correct', iso(0)),
      answer('cy1#a', 'Calendar Year', 'incorrect', iso(0, 1), { confidence: 'sure' }),
    ]
    const later = new Date(t0.getTime() + 10 * 86_400_000)
    expect(dueConcepts(input(events, later))[0].concept.name).toBe('Calendar Year')
  })
})

describe('choosing an item', () => {
  it('avoids what was just served and the question it came from', () => {
    const base = input([answer('cl1#a', 'Chain Ladder Method', 'correct', iso(0))], new Date(t0.getTime() + 86_400_000))
    expect(pickItem(base, 'Chain Ladder Method')?.id).toBe('cl2#a')
    expect(pickItem({ ...base, served: ['cl2#a'] }, 'Chain Ladder Method')?.id).toBe('cl1#a')
    expect(pickItem({ ...base, served: ['cl1#a', 'cl2#a'] }, 'Chain Ladder Method')).toBeNull()
  })

  it('leans harder when the candidate is getting nearly everything right', () => {
    const right = Array.from({ length: 6 }, (_, i) => answer(`x${i}`, 'Pure Premium', 'correct', iso(0, i)))
    const model = input(right, t0).model
    expect(targetDifficulty(model)[0]).toBe('hard')
    const wrong = Array.from({ length: 6 }, (_, i) => answer(`x${i}`, 'Pure Premium', 'incorrect', iso(0, i)))
    expect(targetDifficulty(input(wrong, t0).model)[0]).toBe('easy')
    expect(pickItem(input(right, t0), 'Calendar Year')?.id).toBe('cy2#a')
  })

  it('leans toward the weakest kind of part', () => {
    const events = [
      ...Array.from({ length: 5 }, (_, i) => answer(`c${i}`, 'X', 'correct', iso(0, i))),
      ...Array.from({ length: 5 }, (_, i) => answer(`e${i}`, 'X', 'incorrect', iso(0, 10 + i), { kind: 'explanation' })),
    ]
    const model = foldLog(events, new Map(), t0)
    expect(weakestKind(model)).toBe('explanation')
    expect(pickItem({ ...input(events, t0), model }, 'Pure Premium')?.id).toBe('pp2#a')
  })
})

describe('the day’s plan', () => {
  it('counts what is waiting and estimates the minutes', () => {
    const events = [answer('cl1#a', 'Chain Ladder Method', 'correct', iso(0))]
    const plan = dayPlan(input(events, new Date(t0.getTime() + 10 * 86_400_000)))
    expect(plan.due).toBe(1)
    expect(plan.relearn).toBe(0)
    expect(plan.newConcepts[0]).toBe('Calendar Year')
    expect(plan.minutes).toBeGreaterThan(0)
  })
})

describe('extra practice', () => {
  it('reaches for the lowest recall, never a concept answered today', () => {
    const events = [
      answer('cl1#a', 'Chain Ladder Method', 'correct', iso(0)),
      answer('cc1#a', 'Cape Cod Method', 'correct', iso(1)),
    ]
    const step = extraPractice(input(events, new Date(t0.getTime() + 1 * 86_400_000 + 3600_000)))
    expect(step).toMatchObject({ type: 'item', concept: 'Chain Ladder Method', reason: 'practice' })
  })
})

describe('keeping going with nothing met', () => {
  it('meets the heaviest unmet concept, page first', () => {
    expect(extraPractice(input([], t0, { phase: 'taper' }))).toEqual({ type: 'read', concept: 'Chain Ladder Method' })
    const read: TutorEvent = { t: 'read', at: iso(0), concept: 'Chain Ladder Method', seconds: 60 }
    expect(extraPractice(input([read], t0, { phase: 'taper' }))).toMatchObject({ type: 'item', concept: 'Chain Ladder Method', reason: 'new' })
  })
})

describe('practising one kind of part', () => {
  it('serves that kind, on the concept that has faded most', () => {
    const events = [answer('pp1#a', 'Pure Premium', 'correct', iso(0)), answer('cl1#a', 'Chain Ladder Method', 'correct', iso(5))]
    const step = kindPractice(input(events, new Date(t0.getTime() + 6 * 86_400_000)), 'explanation')
    expect(step).toMatchObject({ type: 'item', concept: 'Pure Premium', reason: 'practice' })
    expect(step.type === 'item' && step.item.id).toBe('pp2#a')
    expect(kindPractice(input([], t0), 'judgment')).toEqual({ type: 'done' })
  })
})

// The fixture's own concept list, for the other tests' type-checks.
export const FIXTURE_SYLLABUS: SyllabusConcept[] = syllabus
