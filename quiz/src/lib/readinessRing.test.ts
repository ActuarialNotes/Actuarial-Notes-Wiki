import { describe, it, expect } from 'vitest'
import {
  RING_CX,
  RING_CY,
  RING_INNER_R,
  RING_OUTER_R,
  buildRingSegments,
  ringArcPath,
  ringPolar,
  ringTopicGroups,
} from './readinessRing'
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

// Two sections of unequal weight, so the arcs have to be sized by weight rather
// than by concept count. "Bayes Theorem" is a real Exam P keystone.
function syllabus(): WikiExamSyllabus {
  return {
    examId: 'P-1',
    examLabel: 'Exam P',
    examTopic: 'Probability',
    resources: [],
    topics: [
      {
        name: 'General Probability',
        weight: '25%',
        concepts: [
          { name: 'Bayes Theorem', target: 'Bayes Theorem' },
          { name: 'Sample Space', target: 'Sample Space' },
        ],
      },
      {
        name: 'Univariate Random Variables',
        weight: '75%',
        concepts: [
          { name: 'Expected Value', target: 'Expected Value' },
          { name: 'Variance', target: 'Variance' },
        ],
      },
    ],
  }
}

describe('ringPolar', () => {
  it('puts 0° at 12 o\'clock and 90° at 3 o\'clock', () => {
    const top = ringPolar(0, RING_OUTER_R)
    expect(top.x).toBeCloseTo(RING_CX)
    expect(top.y).toBeCloseTo(RING_CY - RING_OUTER_R)

    const right = ringPolar(90, RING_OUTER_R)
    expect(right.x).toBeCloseTo(RING_CX + RING_OUTER_R)
    expect(right.y).toBeCloseTo(RING_CY)
  })
})

describe('ringArcPath', () => {
  it('closes the annulus wedge and flags the large arc past a half turn', () => {
    expect(ringArcPath(0, 30, RING_OUTER_R, RING_INNER_R)).toMatch(/^M.*Z$/)
    // The 4th flag of the outer `A` command is the large-arc flag.
    expect(ringArcPath(0, 30, RING_OUTER_R, RING_INNER_R)).toContain(`A${RING_OUTER_R} ${RING_OUTER_R} 0 0 1`)
    expect(ringArcPath(0, 200, RING_OUTER_R, RING_INNER_R)).toContain(`A${RING_OUTER_R} ${RING_OUTER_R} 0 1 1`)
  })
})

describe('buildRingSegments', () => {
  it('gives each section a share of the circle set by its exam weight', () => {
    const segments = buildRingSegments(syllabus(), [], NOW)
    expect(segments).toHaveLength(4)

    const span = (name: string) => segments
      .filter(s => s.topicName === name)
      .reduce((total, s) => total + (s.endDeg - s.startDeg), 0)

    // 25/75 of 360°, less one concept gap per arc.
    expect(span('General Probability')).toBeCloseTo(90 - 2 * 1.5, 5)
    expect(span('Univariate Random Variables')).toBeCloseTo(270 - 2 * 1.5, 5)
  })

  it('lays the arcs out clockwise from 12 o\'clock without overlapping', () => {
    const segments = buildRingSegments(syllabus(), [], NOW)
    expect(segments[0].startDeg).toBeGreaterThanOrEqual(0)
    expect(segments[segments.length - 1].endDeg).toBeLessThanOrEqual(360)
    for (let i = 1; i < segments.length; i++) {
      expect(segments[i].startDeg).toBeGreaterThanOrEqual(segments[i - 1].endDeg)
    }
  })

  it('is New wherever there is no mastery record', () => {
    expect(buildRingSegments(syllabus(), [], NOW).every(s => s.state === 'new')).toBe(true)
  })

  it('reads a concept\'s state off its record, decayed to the given date', () => {
    const records = [record('Bayes Theorem', 'level3'), record('Variance', 'level3', 400)]
    const byName = new Map(buildRingSegments(syllabus(), records, NOW).map(s => [s.conceptName, s.state]))
    expect(byName.get('Bayes Theorem')).toBe('level3')
    // Untouched for over a year — the ring has to show the decay, not the
    // state the record was last written with.
    expect(byName.get('Variance')).toBe('forgotten')
  })

  it('marks the keystone concepts', () => {
    const segments = buildRingSegments(syllabus(), [], NOW)
    expect(segments.find(s => s.conceptName === 'Bayes Theorem')!.keystone).toBe(true)
    expect(segments.find(s => s.conceptName === 'Sample Space')!.keystone).toBe(false)
  })

  it('skips a section with no concepts but still spends its weight', () => {
    const s = syllabus()
    s.topics.splice(1, 0, { name: 'Empty', weight: '10%', concepts: [] })
    const segments = buildRingSegments(s, [], NOW)
    expect(segments.map(seg => seg.topicName)).not.toContain('Empty')
    // The empty section's 10% is left as a blank wedge rather than handed to
    // its neighbours, so the arcs stay where the weights put them.
    const gap = segments[2].startDeg - segments[1].endDeg
    expect(gap).toBeCloseTo((10 / 110) * 360 + 1.5, 5)
  })

  it('drops an arc too thin to draw', () => {
    const s = syllabus()
    s.topics[0].concepts = Array.from({ length: 400 }, (_, i) => ({ name: `C${i}`, target: `C${i}` }))
    const segments = buildRingSegments(s, [], NOW)
    expect(segments.filter(seg => seg.topicName === 'General Probability')).toHaveLength(0)
  })

  it('has nothing to draw for an empty syllabus', () => {
    expect(buildRingSegments({ ...syllabus(), topics: [] }, [], NOW)).toEqual([])
  })
})

describe('ringTopicGroups', () => {
  it('collapses the arcs back into one group per section', () => {
    const groups = ringTopicGroups(buildRingSegments(syllabus(), [], NOW))
    expect(groups.map(g => g.topicName)).toEqual(['General Probability', 'Univariate Random Variables'])
    expect(groups[0].midDeg).toBeCloseTo(45, 5)
    expect(groups[1].midDeg).toBeCloseTo(225, 5)
  })

  it('wraps the first section\'s divider around to the top of the ring', () => {
    const groups = ringTopicGroups(buildRingSegments(syllabus(), [], NOW))
    // Halfway through the gap that straddles 12 o'clock — near 0°, not near 180°.
    expect(groups[0].boundaryDeg).toBeCloseTo(0, 5)
    expect(groups[1].boundaryDeg).toBeCloseTo(90, 5)
  })

  it('has no groups without segments', () => {
    expect(ringTopicGroups([])).toEqual([])
  })
})
