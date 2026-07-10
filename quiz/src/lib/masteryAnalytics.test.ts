import { describe, it, expect } from 'vitest'
import {
  conceptsAboutToDecay,
  daysUntilNextDecay,
  nextDecayStep,
  projectReadiness,
  weakestTopics,
} from './masteryAnalytics'
import type { ConceptMasteryRecord, MasteryState } from './mastery'
import { computeReadiness } from './readiness'
import type { WikiConcept, WikiExamSyllabus, WikiTopic } from './wikiParser'

// Fixed "now" so decay timers are deterministic.
const NOW = new Date('2026-07-10T12:00:00Z')
const MS_PER_DAY = 24 * 60 * 60 * 1000
const daysAgo = (n: number) => new Date(NOW.getTime() - n * MS_PER_DAY).toISOString()

function rec(partial: Partial<ConceptMasteryRecord> = {}): ConceptMasteryRecord {
  return {
    user_id: 'u',
    exam_id: 'P',
    concept_slug: 'Bayes Theorem',
    state: 'level3',
    correct_count: 3,
    incorrect_streak: 0,
    hard_correct_count: 1,
    last_correct_at: null,
    last_attempted_at: null,
    ...partial,
  }
}

const concept = (name: string, target = name): WikiConcept => ({ name, target })
const topic = (name: string, concepts: WikiConcept[], weight?: string): WikiTopic => ({ name, concepts, weight })
const syllabus = (topics: WikiTopic[]): WikiExamSyllabus => ({
  examId: 'P-1',
  examLabel: 'Exam P',
  examTopic: 'Probability',
  topics,
  resources: [],
})

describe('nextDecayStep / daysUntilNextDecay', () => {
  it('returns null for concepts with no pending decay', () => {
    expect(nextDecayStep(rec({ state: 'new' }), NOW)).toBeNull()
    expect(nextDecayStep(rec({ state: 'forgotten', last_correct_at: daysAgo(3) }), NOW)).toBeNull()
    expect(nextDecayStep(rec({ state: 'level3', last_correct_at: null }), NOW)).toBeNull()
    expect(daysUntilNextDecay(rec({ state: 'new' }), NOW)).toBeNull()
  })

  it('reports the next level3→level2 step before the 30-day threshold', () => {
    const step = nextDecayStep(rec({ state: 'level3', last_correct_at: daysAgo(29) }), NOW)
    expect(step?.from).toBe<MasteryState>('level3')
    expect(step?.to).toBe<MasteryState>('level2')
    expect(daysUntilNextDecay(rec({ state: 'level3', last_correct_at: daysAgo(29) }), NOW)).toBeCloseTo(1, 5)
  })

  it('treats the exact threshold as already crossed (strictly-after boundary)', () => {
    // At exactly 30 days the level3→level2 boundary is not *after* now, so the
    // next pending step is level2→level1 at 44 cumulative days (14 out).
    const step = nextDecayStep(rec({ state: 'level3', last_correct_at: daysAgo(30) }), NOW)
    expect(step?.from).toBe<MasteryState>('level2')
    expect(step?.to).toBe<MasteryState>('level1')
    expect(daysUntilNextDecay(rec({ state: 'level3', last_correct_at: daysAgo(30) }), NOW)).toBeCloseTo(14, 5)
  })

  it('cascades to the next pending step once a threshold has passed', () => {
    // 31 days old: already decayed to level2; next step is level2→level1 at 44d.
    const step = nextDecayStep(rec({ state: 'level3', last_correct_at: daysAgo(31) }), NOW)
    expect(step?.from).toBe<MasteryState>('level2')
    expect(step?.to).toBe<MasteryState>('level1')
    expect(daysUntilNextDecay(rec({ state: 'level3', last_correct_at: daysAgo(31) }), NOW)).toBeCloseTo(13, 5)
  })

  it('handles level1 → forgotten and returns null once forgotten', () => {
    const soon = nextDecayStep(rec({ state: 'level1', last_correct_at: daysAgo(3) }), NOW)
    expect(soon?.to).toBe<MasteryState>('forgotten')
    expect(daysUntilNextDecay(rec({ state: 'level1', last_correct_at: daysAgo(3) }), NOW)).toBeCloseTo(4, 5)
    // 8 days at level1 is already past the 7-day forget threshold.
    expect(nextDecayStep(rec({ state: 'level1', last_correct_at: daysAgo(8) }), NOW)).toBeNull()
  })
})

describe('conceptsAboutToDecay', () => {
  const A = concept('Bayes Theorem')
  const B = concept('Poisson')
  const C = concept('Variance')
  const D = concept('Uniform') // no record → skipped
  const syl = syllabus([topic('Prob', [A, B, C, D])])

  const records = [
    rec({ concept_slug: 'Bayes Theorem', state: 'level3', last_correct_at: daysAgo(28) }), // → 2 days
    rec({ concept_slug: 'Poisson', state: 'level1', last_correct_at: daysAgo(4) }),         // → 3 days
    rec({ concept_slug: 'Variance', state: 'level3', last_correct_at: daysAgo(10) }),        // → 20 days
  ]

  it('keeps only concepts decaying within the horizon, soonest first', () => {
    const warnings = conceptsAboutToDecay(syl, records, NOW, 7)
    expect(warnings.map(w => w.concept)).toEqual(['Bayes Theorem', 'Poisson'])
    expect(warnings[0].daysUntil).toBeLessThan(warnings[1].daysUntil)
    expect(warnings[0].currentState).toBe<MasteryState>('level3')
    expect(warnings[0].nextState).toBe<MasteryState>('level2')
  })

  it('widens with a larger horizon and skips concepts without a record', () => {
    const warnings = conceptsAboutToDecay(syl, records, NOW, 30)
    expect(warnings.map(w => w.concept)).toEqual(['Bayes Theorem', 'Poisson', 'Variance'])
    expect(warnings.some(w => w.concept === 'Uniform')).toBe(false)
  })

  it('resolves aliased concepts via their target slug', () => {
    const aliased = syllabus([topic('Prob', [concept('Price', 'Bond Price')])])
    const recs = [rec({ concept_slug: 'Bond Price', state: 'level1', last_correct_at: daysAgo(5) })]
    const warnings = conceptsAboutToDecay(aliased, recs, NOW, 7)
    expect(warnings.map(w => w.concept)).toEqual(['Price'])
  })
})

describe('projectReadiness', () => {
  const syl = syllabus([topic('Prob', [concept('Bayes Theorem')])])
  const records = [rec({ concept_slug: 'Bayes Theorem', state: 'level3', last_correct_at: daysAgo(0) })]

  it('matches computeReadiness at the start and never rises without study', () => {
    const to = new Date(NOW.getTime() + 60 * MS_PER_DAY)
    const points = projectReadiness(syl, records, NOW, to, 10)
    expect(points[0].overallPct).toBeCloseTo(computeReadiness(syl, records, NOW).overallPct, 5)
    for (let i = 1; i < points.length; i++) {
      expect(points[i].overallPct).toBeLessThanOrEqual(points[i - 1].overallPct + 1e-9)
    }
    // Fully mastered today, decays toward level2 credit by exam day.
    expect(points[0].overallPct).toBeCloseTo(100, 5)
    expect(points[points.length - 1].overallPct).toBeLessThan(100)
  })

  it('always includes the exact end date', () => {
    const to = new Date(NOW.getTime() + 55 * MS_PER_DAY)
    const points = projectReadiness(syl, records, NOW, to, 10)
    expect(points[points.length - 1].date.getTime()).toBe(to.getTime())
  })

  it('returns a single point when the range is empty', () => {
    expect(projectReadiness(syl, records, NOW, NOW)).toHaveLength(1)
    expect(projectReadiness(syl, records, NOW, new Date(NOW.getTime() - MS_PER_DAY))).toHaveLength(1)
  })
})

describe('weakestTopics', () => {
  const weak = topic('Weak', [concept('c1'), concept('c2')], '10%')             // 0%
  const strong = topic('Strong', [concept('c3'), concept('c4')], '20%')          // 100%
  const mixed = topic('Mixed', [concept('c5'), concept('c6')])                   // 50%
  const empty = topic('Empty', [])                                               // dropped
  const syl = syllabus([strong, weak, mixed, empty])
  const records = [
    rec({ concept_slug: 'c3', state: 'level3', last_correct_at: daysAgo(1) }),
    rec({ concept_slug: 'c4', state: 'level3', last_correct_at: daysAgo(1) }),
    rec({ concept_slug: 'c5', state: 'level3', last_correct_at: daysAgo(1) }),
  ]

  it('ranks topics weakest-first and drops empty topics', () => {
    const ranked = weakestTopics(syl, records, NOW)
    expect(ranked.map(t => t.name)).toEqual(['Weak', 'Mixed', 'Strong'])
    expect(ranked.some(t => t.name === 'Empty')).toBe(false)
  })

  it('exposes concept names and the not-yet-mastered subset for deep-linking', () => {
    const ranked = weakestTopics(syl, records, NOW)
    const mixedRow = ranked.find(t => t.name === 'Mixed')!
    expect(mixedRow.conceptNames).toEqual(['c5', 'c6'])
    expect(mixedRow.weakConceptNames).toEqual(['c6']) // c5 is level3, excluded
  })

  it('respects the limit', () => {
    expect(weakestTopics(syl, records, NOW, 1).map(t => t.name)).toEqual(['Weak'])
  })
})
