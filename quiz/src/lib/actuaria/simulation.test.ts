import { describe, expect, it } from 'vitest'
import examPages from 'virtual:exam-pages'
import { emptyRecord, type ConceptMasteryRecord, type MasteryState } from '@/lib/mastery'
import { computeExamReadiness } from '@/lib/readiness'
import { parseExamMetadata, parseExamSyllabus } from '@/lib/wikiParser'
import { isLandmark } from './landmarks'
import { biggestLifts, simulationFormat, simulationPath } from './simulation'

const NOW = new Date('2026-09-29T12:00:00Z')
const file = Object.keys(examPages).find(f => f.startsWith('Exam P-1'))!
const meta = parseExamMetadata(examPages[file])!
const EXAM_P = parseExamSyllabus(examPages[file], meta.examId, meta.examLabel, meta.examTopic, file.replace(/\.md$/, ''))

function row(concept: string, state: MasteryState): ConceptMasteryRecord {
  return { ...emptyRecord('u', 'P', concept), state, correct_count: 3, last_correct_at: NOW.toISOString() }
}

describe('the Simulation’s format', () => {
  it('is the Practice Exam’s own — 30 questions and 3 hours on Exam P, read from the tables', () => {
    const p = simulationFormat('Probability')
    expect(p.questions).toBe(30)
    expect(p.seconds).toBe(3 * 60 * 60)
    expect(simulationPath(p)).toBe('/quiz?exam=Probability&mode=mock-exam&reveal=end&count=30&timed=1')
  })

  it('has no clock for an exam paced by points, or with no pace at all', () => {
    expect(simulationFormat('Exam 5').seconds).toBeNull()
    const seven = simulationFormat('Exam 7')
    expect(seven.pace).toBeNull()
    expect(simulationPath(seven)).not.toContain('timed')
  })
})

describe('biggest lifts', () => {
  it('ranks promotions by how far they would move the one readiness number', () => {
    const lifts = biggestLifts(EXAM_P, [], 'P', NOW)
    expect(lifts).toHaveLength(3)
    for (let i = 1; i < lifts.length; i++) expect(lifts[i - 1].points).toBeGreaterThanOrEqual(lifts[i].points)
    // Checked against the readiness score itself: a region's lift is the
    // difference computeExamReadiness makes, nothing estimated.
    expect(lifts[0].points).toBeGreaterThan(0)
  })

  const region = EXAM_P.topics[0]
  const regionConcepts = region.concepts.filter(isLandmark)

  it('stops offering a region that has nowhere left to climb', () => {
    const records = regionConcepts.map(c => row(c.name, 'level3'))
    const lifts = biggestLifts(EXAM_P, records, 'P', NOW, 50)
    expect(lifts.find(l => l.name === region.name)).toBeUndefined()
  })

  it('counts a region’s promotion at what readiness says it is worth', () => {
    const lifts = biggestLifts(EXAM_P, [], 'P', NOW, 50)
    const lift = lifts.find(l => l.name === region.name)!
    const before = computeExamReadiness(EXAM_P, [], NOW).overallPct
    const after = computeExamReadiness(EXAM_P, regionConcepts.map(c => row(c.name, 'level1')), NOW).overallPct
    expect(lift.points).toBeCloseTo(after - before, 6)
  })
})
