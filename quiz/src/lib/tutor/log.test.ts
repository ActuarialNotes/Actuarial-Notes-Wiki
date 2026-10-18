import { describe, expect, it } from 'vitest'
import {
  capLog,
  conceptModel,
  foldLog,
  isRelearnReady,
  ladderSeeds,
  recentSuccess,
  type AnswerEvent,
  type TutorEvent,
} from './log'
import type { SelfGrade } from '../parser'
import type { Confidence } from './memory'

const at = (dayOffset: number, minutes = 0) => new Date(2026, 2, 1 + dayOffset, 9, minutes, 0).toISOString()

function answer(item: string, grade: SelfGrade, when: string, opts: Partial<AnswerEvent> = {}): AnswerEvent {
  return {
    t: 'answer',
    at: when,
    item,
    question: item.split('#')[0],
    concepts: ['Cape Cod Method'],
    kind: 'calculation',
    points: 1,
    difficulty: 'medium',
    grade,
    confidence: 'unsure' as Confidence,
    seconds: 120,
    ...opts,
  }
}

describe('folding answers', () => {
  it('builds each concept’s memory, the item history and the tallies', () => {
    const model = foldLog([
      answer('q1#a', 'correct', at(0), { confidence: 'sure' }),
      answer('q2#b', 'partial', at(0, 5), { kind: 'explanation', confidence: 'sure' }),
    ], new Map(), new Date(at(0, 10)))
    const c = conceptModel(model, 'cape cod method')!
    expect(c.memory?.reps).toBe(2)
    expect(c.answers).toBe(2)
    expect(c.fullAnswers).toBe(1)
    expect(model.items.get('q1#a')?.seen).toBe(1)
    expect(model.calibration.sure).toEqual({ answers: 2, full: 1 })
    expect(model.byKind.calculation).toEqual({ answers: 1, credit: 1 })
    expect(model.byKind.explanation).toEqual({ answers: 1, credit: 0.5 })
    expect(model.answeredToday).toBe(2)
    expect(model.lastQuestion).toBe('q2')
  })

  it('is the same record whatever order the events arrive in', () => {
    const events = [answer('q1#a', 'correct', at(0)), answer('q2#a', 'incorrect', at(1)), answer('q1#a', 'correct', at(3))]
    const a = foldLog(events, new Map(), new Date(at(4)))
    const b = foldLog([...events].reverse(), new Map(), new Date(at(4)))
    expect(conceptModel(a, 'Cape Cod Method')).toEqual(conceptModel(b, 'Cape Cod Method'))
    expect(a.relearn).toEqual(b.relearn)
  })
})

describe('successive relearning', () => {
  const miss = answer('q1#a', 'incorrect', at(0))

  it('opens on a miss, and waits for three other items and five minutes', () => {
    let model = foldLog([miss], new Map(), new Date(at(0, 1)))
    expect(model.relearn).toHaveLength(1)
    expect(isRelearnReady(model.relearn[0], new Date(at(0, 10)))).toBe(false)
    const others = [1, 2, 3].map(n => answer(`q${n + 1}#a`, 'correct', at(0, n), { concepts: ['Other'] }))
    model = foldLog([miss, ...others], new Map(), new Date(at(0, 4)))
    expect(isRelearnReady(model.relearn[0], new Date(at(0, 4)))).toBe(false)
    expect(isRelearnReady(model.relearn[0], new Date(at(0, 6)))).toBe(true)
  })

  it('is ready the next day regardless', () => {
    const model = foldLog([miss], new Map(), new Date(at(1)))
    expect(isRelearnReady(model.relearn[0], new Date(at(1)))).toBe(true)
  })

  it('closes after full credit on three separate days, spaced 1 then 3 days', () => {
    const one = answer('q1#a', 'correct', at(0, 30))
    let model = foldLog([miss, one], new Map(), new Date(at(0, 31)))
    expect(model.relearn[0].successDays).toHaveLength(1)
    expect(isRelearnReady(model.relearn[0], new Date(at(0, 50)))).toBe(false)
    expect(isRelearnReady(model.relearn[0], new Date(at(1)))).toBe(true)

    // A second success the same day is the same session: it doesn't count.
    model = foldLog([miss, one, answer('q1#a', 'correct', at(0, 40))], new Map(), new Date(at(0, 41)))
    expect(model.relearn[0].successDays).toHaveLength(1)

    const two = answer('q1#a', 'correct', at(1))
    model = foldLog([miss, one, two], new Map(), new Date(at(2)))
    expect(isRelearnReady(model.relearn[0], new Date(at(3)))).toBe(false)
    expect(isRelearnReady(model.relearn[0], new Date(at(4)))).toBe(true)

    model = foldLog([miss, one, two, answer('q1#a', 'correct', at(4))], new Map(), new Date(at(4)))
    expect(model.relearn).toHaveLength(0)
  })

  it('starts over on another miss', () => {
    const model = foldLog([miss, answer('q1#a', 'correct', at(0, 30)), answer('q1#a', 'partial', at(1))], new Map(), new Date(at(1)))
    expect(model.relearn[0].successDays).toEqual([])
  })
})

describe('the open flags', () => {
  it('raise a sure-and-wrong, and clear it after two full-credit answers', () => {
    const wrong = answer('q1#a', 'incorrect', at(0), { confidence: 'sure' })
    expect(conceptModel(foldLog([wrong]), 'Cape Cod Method')?.sureWrong).toBe(true)
    const once = foldLog([wrong, answer('q2#a', 'correct', at(1))])
    expect(conceptModel(once, 'Cape Cod Method')?.sureWrong).toBe(true)
    const twice = foldLog([wrong, answer('q2#a', 'correct', at(1)), answer('q3#a', 'correct', at(3))])
    expect(conceptModel(twice, 'Cape Cod Method')?.sureWrong).toBe(false)
  })

  it('keep an "I’m confused" until two full-credit answers', () => {
    const flag: TutorEvent = { t: 'confused', at: at(0), concept: 'Cape Cod Method', reason: 'calculation' }
    expect(conceptModel(foldLog([flag]), 'Cape Cod Method')?.confusion).toBe('calculation')
    const cleared = foldLog([flag, answer('q2#a', 'correct', at(1)), answer('q3#a', 'correct', at(2))])
    expect(conceptModel(cleared, 'Cape Cod Method')?.confusion).toBeNull()
  })

  it('count the days with a miss', () => {
    const model = foldLog([answer('a', 'incorrect', at(0)), answer('b', 'partial', at(0, 9)), answer('c', 'incorrect', at(2))])
    expect(conceptModel(model, 'Cape Cod Method')?.missDays).toHaveLength(2)
  })
})

describe('seeds from the ladder', () => {
  const seeds = ladderSeeds([
    { user_id: 'u', exam_id: 'CAS-5', concept_slug: 'Cape Cod Method', state: 'level2', correct_count: 2, incorrect_streak: 0, hard_correct_count: 0, last_correct_at: at(0), last_attempted_at: at(0) },
    { user_id: 'u', exam_id: 'CAS-6', concept_slug: 'Other Exam', state: 'level3', correct_count: 3, incorrect_streak: 0, hard_correct_count: 0, last_correct_at: at(0), last_attempted_at: at(0) },
  ], 'CAS-5')

  it('give a concept the Tutor hasn’t seen a memory, for the one exam', () => {
    expect(seeds.size).toBe(1)
    const model = foldLog([], seeds)
    expect(conceptModel(model, 'Cape Cod Method')?.memory?.stability).toBe(7)
    expect(conceptModel(model, 'Cape Cod Method')?.seeded).toBe(true)
  })

  it('are built on by a later answer, and dropped for an earlier one', () => {
    const later = foldLog([answer('q1#a', 'correct', at(10))], seeds, new Date(at(10)))
    expect(conceptModel(later, 'Cape Cod Method')?.memory?.reps).toBe(3)
    const earlier = foldLog([answer('q1#a', 'correct', at(-5))], seeds, new Date(at(0)))
    expect(conceptModel(earlier, 'Cape Cod Method')?.memory?.reps).toBe(1)
  })
})

describe('offers', () => {
  it('count declines per kind, per day', () => {
    const events: TutorEvent[] = [
      { t: 'offer', at: at(0), kind: 'post-read', response: 'shown' },
      { t: 'offer', at: at(0, 1), kind: 'post-read', response: 'declined' },
      { t: 'offer', at: at(0, 20), kind: 'post-read', response: 'shown' },
      { t: 'offer', at: at(0, 21), kind: 'post-read', response: 'declined' },
    ]
    expect(foldLog(events).offers['post-read']?.declinesToday).toBe(2)
    expect(foldLog([...events, { t: 'offer', at: at(1), kind: 'post-read', response: 'shown' }]).offers['post-read']?.declinesToday).toBe(0)
    expect(foldLog(events).lastOfferShownAt).toBe(at(0, 20))
  })
})

describe('the rolling success rate', () => {
  it('needs a few answers, then averages the credit', () => {
    expect(recentSuccess(foldLog([answer('a', 'correct', at(0))]))).toBeNull()
    const model = foldLog(['correct', 'partial', 'incorrect', 'correct'].map((g, i) => answer(`q${i}`, g as SelfGrade, at(0, i))))
    expect(recentSuccess(model)).toBeCloseTo(0.625, 6)
  })
})

describe('capping the log', () => {
  it('drops the oldest reads and offers first, and keeps every answer', () => {
    const events: TutorEvent[] = [
      { t: 'read', at: at(0), concept: 'A', seconds: 60 },
      answer('q1', 'correct', at(0, 1)),
      { t: 'offer', at: at(0, 2), kind: 'arrival', response: 'shown' },
      answer('q2', 'correct', at(0, 3)),
    ]
    const capped = capLog(events, 3)
    expect(capped.map(e => e.t)).toEqual(['answer', 'offer', 'answer'])
  })
})
