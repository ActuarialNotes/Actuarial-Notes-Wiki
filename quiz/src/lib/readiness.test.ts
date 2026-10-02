import { describe, it, expect } from 'vitest'
import {
  CRITERION_WEIGHTS,
  computeExamReadiness,
  computeReadiness,
  parseSectionWeight,
  readinessBand,
  readinessInsight,
  type ConceptStateCounts,
  type ExamReadinessAssessment,
  type SectionReadiness,
} from './readiness'
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

// A stand-in syllabus: two weighted sections of two concepts each.
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
  it('maps the score onto the bands', () => {
    expect(readinessBand(0).id).toBe('not-started')
    expect(readinessBand(5).id).toBe('started')
    expect(readinessBand(20).id).toBe('building')
    expect(readinessBand(50).id).toBe('progressing')
    expect(readinessBand(70).id).toBe('nearly')
    expect(readinessBand(90).id).toBe('ready')
  })

  it('never calls a score above zero "Not started"', () => {
    // The card prints the rounded score, so the verdict bands on it too.
    expect(readinessBand(0.4).label).toBe('Not started')
    expect(readinessBand(0.6).label).toBe('Getting started')
    expect(readinessBand(5).label).toBe('Getting started')
    expect(readinessBand(14.4).label).toBe('Getting started')
    expect(readinessBand(14.6).label).toBe('Building foundations')
  })

  it('lifts a record with progress out of "Not started" even when it rounds to zero', () => {
    expect(readinessBand(0.2).id).toBe('not-started')
    expect(readinessBand(0.2, true).id).toBe('started')
    // A real score still bands on itself, whatever the caller says.
    expect(readinessBand(50, false).id).toBe('progressing')
  })
})

describe('computeExamReadiness', () => {
  it('scores an untouched exam at zero on every criterion', () => {
    const a = computeExamReadiness(syllabus(), [], NOW)
    expect(a.overallPct).toBe(0)
    expect(a.band.id).toBe('not-started')
    expect(a.criteria.map(c => c.id)).toEqual(['syllabus'])
    expect(a.criteria.every(c => c.pct === 0)).toBe(true)
    expect(a.counts).toMatchObject({ total: 4, new: 4, studied: 0 })
  })

  it('bands a barely-started exam as started, not as "Not started"', () => {
    const a = computeExamReadiness(syllabus(), [record('Variance', 'level1')], NOW)
    expect(a.overallPct).toBeGreaterThan(0)
    expect(a.band.id).toBe('started')
    expect(a.band.label).toBe('Getting started')
  })

  it('scores an exam exactly as its syllabus coverage', () => {
    const records = [record('Bayes Theorem', 'level3'), record('Variance', 'level2')]
    const a = computeExamReadiness(syllabus(), records, NOW)
    expect(a.overallPct).toBeCloseTo(computeReadiness(syllabus(), records, NOW).overallPct)
    // The lone criterion carries the whole score, so 100 is still reachable.
    expect(a.criteria.map(c => c.id)).toEqual(['syllabus'])
    expect(a.criteria[0].weight).toBeCloseTo(CRITERION_WEIGHTS.syllabus)
    expect(a.criteria[0].weight).toBeCloseTo(1)
  })

  it('counts decayed concepts in the tally without a criterion of their own', () => {
    const a = computeExamReadiness(
      syllabus(),
      [record('Bayes Theorem', 'level2'), record('Variance', 'forgotten')],
      NOW,
    )
    expect(a.criteria.map(c => c.id)).toEqual(['syllabus'])
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

  it('reaches 100 when every syllabus concept is mastered', () => {
    const everything = syllabus().topics.flatMap(t => t.concepts.map(c => record(c.name, 'level3')))
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


// ── The insight line ─────────────────────────────────────────────────────────
//
// Built straight onto an assessment rather than through `computeExamReadiness`,
// so a rule can be put in the exact state that triggers it without having to
// reverse-engineer a record set that lands there. The integration tests below
// then check that a real assessment carries the line the rules describe.

type Assessment = Omit<ExamReadinessAssessment, 'insight'>

function section(name: string, over: Partial<SectionReadiness> = {}): SectionReadiness {
  return {
    name,
    weight: 1,
    level1Count: 0,
    level2Count: 0,
    level3Count: 0,
    forgottenCount: 0,
    total: 10,
    readinessPct: 0,
    ...over,
  }
}

function assessment(over: Partial<Assessment> = {}): Assessment {
  const counts: ConceptStateCounts = {
    total: 20, new: 10, level1: 4, level2: 3, level3: 3, forgotten: 0, studied: 10,
    ...over.counts,
  }
  return {
    overallPct: 40,
    band: readinessBand(40),
    criteria: [
      { id: 'syllabus', label: 'Syllabus coverage', pct: 40, weight: 1 },
    ],
    sections: [section('A'), section('B')],
    weakestSections: [],
    ...over,
    counts,
  }
}

describe('readinessInsight', () => {
  it('says nothing at all about an exam nobody has started', () => {
    const a = assessment({
      overallPct: 0,
      counts: { total: 20, new: 20, level1: 0, level2: 0, level3: 0, forgotten: 0, studied: 0 },
      criteria: [
        { id: 'syllabus', label: 'Syllabus coverage', pct: 0, weight: 1 },
      ],
    })
    expect(readinessInsight(a)).toBeNull()
  })

  it('says nothing when a syllabus has no concepts at all', () => {
    expect(readinessInsight(assessment({
      sections: [],
      counts: { total: 0, new: 0, level1: 0, level2: 0, level3: 0, forgotten: 0, studied: 0 },
    }))).toBeNull()
  })

  it('reports decay across the syllabus once it is a quarter of what was studied', () => {
    const insight = readinessInsight(assessment({
      counts: { total: 20, new: 10, level1: 4, level2: 2, level3: 1, forgotten: 3, studied: 10 },
    }))
    expect(insight?.id).toBe('broad-decay')
    expect(insight?.text).toContain('3 of the 10')
  })

  it('leaves a stray decayed concept alone — two is not a pattern', () => {
    const insight = readinessInsight(assessment({
      counts: { total: 20, new: 10, level1: 4, level2: 3, level3: 1, forgotten: 2, studied: 10 },
    }))
    expect(insight?.id).not.toBe('broad-decay')
  })

  it('flags a record parked on the bottom rung', () => {
    const insight = readinessInsight(assessment({
      counts: { total: 20, new: 10, level1: 8, level2: 1, level3: 1, forgotten: 0, studied: 10 },
    }))
    expect(insight?.id).toBe('second-pass')
    expect(insight?.text).toContain('8 concepts')
  })

  it('names the section leaving the most score on the table, not the least covered one', () => {
    const insight = readinessInsight(assessment({
      sections: [
        // Untouched, but a twentieth of the exam.
        section('Tiny', { weight: 5, readinessPct: 0 }),
        // Half done, but most of the paper — the bigger shortfall in points.
        section('Huge', { weight: 60, readinessPct: 50 }),
      ],
    }))
    expect(insight?.id).toBe('costliest-section')
    expect(insight?.text).toContain('Huge')
    expect(insight?.text).toContain('92% of the exam')
    expect(insight?.text).toContain('50% covered')
  })

  it('leaves the exam share out when the syllabus carries no weightings', () => {
    const insight = readinessInsight(assessment({
      sections: [section('A', { readinessPct: 10 }), section('B', { readinessPct: 60 })],
    }))
    expect(insight?.id).toBe('costliest-section')
    expect(insight?.text).toBe('Your biggest gap is A, at 10% covered.')
  })

  it('says nothing when every rule comes up empty', () => {
    expect(readinessInsight(assessment({
      overallPct: 95,
      counts: { total: 20, new: 0, level1: 0, level2: 4, level3: 16, forgotten: 0, studied: 20 },
      sections: [section('A', { readinessPct: 100 }), section('B', { readinessPct: 90 })],
    }))).toBeNull()
  })

  it('rides along on a real assessment, and is null for an untouched exam', () => {
    expect(computeExamReadiness(syllabus(), [], NOW).insight).toBeNull()

    const started = computeExamReadiness(syllabus(), [record('Variance', 'level1')], NOW)
    expect(started.insight?.id).toBe('costliest-section')
    expect(started.insight?.text).toContain('Univariate Random Variables')
  })
})
