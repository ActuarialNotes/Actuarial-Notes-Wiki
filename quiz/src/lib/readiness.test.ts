import { describe, it, expect } from 'vitest'
import {
  CRITERION_WEIGHTS,
  computeExamReadiness,
  computeReadiness,
  parseSectionWeight,
  readinessBand,
} from './readiness'
import { keystonesForExam } from './keystone'
import type { WikiExamSyllabus } from './wikiParser'
import type { ConceptMasteryRecord, MasteryState } from './mastery'

const NOW = new Date('2026-08-04T12:00:00Z')

function record(slug: string, state: MasteryState, daysAgo = 0): ConceptMasteryRecord {
  const last = new Date(NOW.getTime() - daysAgo * 86_400_000).toISOString()
  return {
    user_id: 'u',
    exam_id: 'P',
    concept_slug: slug,
    state,
    correct_count: 3,
    incorrect_streak: 0,
    hard_correct_count: 1,
    last_correct_at: last,
    last_attempted_at: last,
  }
}

// A stand-in syllabus. Two of its concepts ("Bayes Theorem", "Expected Value")
// are real Exam P keystones, so the keystone criterion has something to find.
function syllabus(): WikiExamSyllabus {
  return {
    examId: 'P-1',
    examLabel: 'Exam P',
    examTopic: 'Probability',
    resources: [],
    topics: [
      {
        name: 'General Probability',
        weight: '23-30%',
        concepts: [
          { name: 'Bayes Theorem', target: 'Bayes Theorem' },
          { name: 'Sample Space', target: 'Sample Space' },
        ],
      },
      {
        name: 'Univariate Random Variables',
        weight: '40%',
        concepts: [
          { name: 'Expected Value', target: 'Expected Value' },
          { name: 'Variance', target: 'Variance' },
        ],
      },
    ],
  }
}

describe('parseSectionWeight', () => {
  it('takes the midpoint of a range and the value of a single weight', () => {
    expect(parseSectionWeight('23-30%')).toBe(26.5)
    expect(parseSectionWeight('40%')).toBe(40)
    expect(parseSectionWeight(undefined)).toBe(1)
  })
})

describe('computeReadiness', () => {
  it('counts forgotten concepts separately and gives them no credit', () => {
    const { sections, overallPct } = computeReadiness(
      syllabus(),
      [record('Bayes Theorem', 'forgotten'), record('Sample Space', 'level3')],
      NOW,
    )
    const general = sections[0]
    expect(general.forgottenCount).toBe(1)
    expect(general.level3Count).toBe(1)
    // One of two concepts at full credit → 50% of the section.
    expect(general.readinessPct).toBeCloseTo(50)
    expect(overallPct).toBeCloseTo((50 * 26.5) / (26.5 + 40))
  })
})

describe('readinessBand', () => {
  it('maps the score onto the five bands', () => {
    expect(readinessBand(0).id).toBe('not-started')
    expect(readinessBand(20).id).toBe('building')
    expect(readinessBand(50).id).toBe('progressing')
    expect(readinessBand(70).id).toBe('nearly')
    expect(readinessBand(90).id).toBe('ready')
  })
})

describe('computeExamReadiness', () => {
  it('scores an untouched exam at zero on every criterion', () => {
    const a = computeExamReadiness(syllabus(), [], NOW)
    expect(a.overallPct).toBe(0)
    expect(a.band.id).toBe('not-started')
    expect(a.criteria.map(c => c.id)).toEqual(['syllabus', 'keystone'])
    expect(a.criteria.every(c => c.pct === 0)).toBe(true)
    expect(a.counts).toMatchObject({ total: 4, new: 4, studied: 0 })
  })

  it('includes keystone mastery as its own criterion', () => {
    const a = computeExamReadiness(
      syllabus(),
      [record('Bayes Theorem', 'level3'), record('Expected Value', 'level3')],
      NOW,
    )
    const keystone = a.criteria.find(c => c.id === 'keystone')
    expect(keystone).toBeDefined()
    // Two of Exam P's keystones at Level 3, each worth full credit.
    expect(a.keystone?.mastered).toBe(2)
    expect(keystone!.pct).toBeCloseTo((2 / a.keystone!.total) * 100)
    expect(keystone!.weight).toBeCloseTo(CRITERION_WEIGHTS.keystone)
  })

  it('takes the keystone key from the syllabus when the caller passes none', () => {
    const records = [record('Bayes Theorem', 'level3')]
    // The syllabus names exam "P-1", whose progress key is "P".
    expect(computeExamReadiness(syllabus(), records, NOW).overallPct)
      .toBeCloseTo(computeExamReadiness(syllabus(), records, NOW, 'P').overallPct)
  })

  it('drops the keystone criterion and renormalises for an exam with no catalogue', () => {
    const a = computeExamReadiness(syllabus(), [], NOW, 'NO-SUCH-EXAM')
    expect(a.keystone).toBeNull()
    expect(a.criteria.map(c => c.id)).toEqual(['syllabus'])
    // The lone criterion carries the whole score, so 100 is still reachable and
    // readiness equals syllabus coverage for that exam.
    expect(a.criteria[0].weight).toBeCloseTo(1)
  })

  it('scores an exam with no keystone catalogue exactly as its syllabus coverage', () => {
    const records = [record('Bayes Theorem', 'level3'), record('Variance', 'level2')]
    const a = computeExamReadiness(syllabus(), records, NOW, 'NO-SUCH-EXAM')
    expect(a.overallPct).toBeCloseTo(computeReadiness(syllabus(), records, NOW).overallPct)
  })

  it('counts decayed concepts in the tally without a criterion of their own', () => {
    const a = computeExamReadiness(
      syllabus(),
      [record('Bayes Theorem', 'level2'), record('Variance', 'forgotten')],
      NOW,
    )
    expect(a.criteria.map(c => c.id)).toEqual(['syllabus', 'keystone'])
    expect(a.counts).toMatchObject({ studied: 2, forgotten: 1 })
    // Forgotten earns no credit, so it scores exactly as if it were untouched.
    const without = computeExamReadiness(syllabus(), [record('Bayes Theorem', 'level2')], NOW)
    expect(a.criteria[0].pct).toBeCloseTo(without.criteria[0].pct)
  })

  it('applies decay before scoring, so a stale Level 3 no longer counts as mastered', () => {
    const stale = computeExamReadiness(
      // 60 days without a correct answer takes level3 → level2 → level1.
      syllabus(),
      [record('Bayes Theorem', 'level3', 60)],
      NOW,
    )
    const fresh = computeExamReadiness(syllabus(), [record('Bayes Theorem', 'level3')], NOW)
    expect(stale.overallPct).toBeLessThan(fresh.overallPct)
    expect(stale.counts.level3).toBe(0)
  })

  it('reaches 100 when every syllabus concept and keystone is mastered', () => {
    const everything = [
      ...syllabus().topics.flatMap(t => t.concepts.map(c => record(c.name, 'level3'))),
      ...keystonesForExam('P').map(k => record(k.name, 'level3')),
    ]
    const a = computeExamReadiness(syllabus(), everything, NOW)
    expect(Math.round(a.overallPct)).toBe(100)
    expect(a.band.id).toBe('ready')
    expect(a.weakestSections).toEqual([])
  })

  it('lists the sections dragging the score down, weakest first', () => {
    const a = computeExamReadiness(
      syllabus(),
      [record('Expected Value', 'level3'), record('Variance', 'level3')],
      NOW,
    )
    expect(a.weakestSections.map(s => s.name)).toEqual(['General Probability'])
  })
})
