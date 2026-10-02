import { describe, expect, it } from 'vitest'
import examPages from 'virtual:exam-pages'
import { computeExamReadiness } from '@/lib/readiness'
import { emptyRecord, type ConceptMasteryRecord, type MasteryState } from '@/lib/mastery'
import { parseExamMetadata, parseExamSyllabus } from '@/lib/wikiParser'
import { decayingNow, isDecaying, isLandmark, landmarkChip, panelLandmarks, sectorRegions, uniqueLandmarks } from './landmarks'
import { formatZ, sectorCredibility } from './credibility'

const DAY = 24 * 60 * 60 * 1000
const NOW = new Date('2026-09-29T12:00:00Z')

const file = Object.keys(examPages).find(f => f.startsWith('Exam P-1'))!
const meta = parseExamMetadata(examPages[file])!
const EXAM_P = parseExamSyllabus(examPages[file], meta.examId, meta.examLabel, meta.examTopic, file.replace(/\.md$/, ''))

function row(concept: string, state: MasteryState, daysAgo: number): ConceptMasteryRecord {
  return {
    ...emptyRecord('u', 'P', concept),
    state,
    correct_count: 3,
    last_correct_at: new Date(NOW.getTime() - daysAgo * DAY).toISOString(),
  }
}

describe('a sector’s landmarks', () => {
  const records = [
    row('Bayes Theorem', 'level2', 12), // decays in 2 days
    row('Variance', 'level3', 3),        // safe for weeks
    row('Expected Value', 'forgotten', 80),
    row('Covariance', 'level1', 6),      // decays tomorrow
  ]
  const regions = sectorRegions(EXAM_P, records, NOW)
  const landmarks = uniqueLandmarks(regions)
  const byName = (name: string) => landmarks.find(l => l.concept.name === name)!

  it('keeps the syllabus’s regions, in order, with their weights', () => {
    expect(regions.map(r => r.name)).toEqual(EXAM_P.topics.map(t => t.name))
    expect(regions.every(r => r.weight === EXAM_P.topics[regions.indexOf(r)].weight)).toBe(true)
  })

  it('reads each landmark’s Z off its mastery level (acceptance: landmark Z matches the level)', () => {
    expect(formatZ(byName('Variance').z)).toBe('1.00')
    expect(formatZ(byName('Bayes Theorem').z)).toBe('0.67')
    expect(formatZ(byName('Covariance').z)).toBe('0.33')
    expect(formatZ(byName('Expected Value').z)).toBe('0.00')
  })

  it('names the concepts that have a landmark name', () => {
    expect(byName('Bayes Theorem').inWorldName).toBe('Bayes Outpost')
    expect(byName('Covariance').inWorldName).toBeNull()
  })

  it('lists the most at-risk concepts on the sector panel: decayed first, then the soonest to decay', () => {
    const panel = panelLandmarks(landmarks, 20)
    expect(panel.map(l => l.concept.name)).toEqual(['Expected Value', 'Covariance', 'Bayes Theorem', 'Variance'])
    expect(panelLandmarks(landmarks, 2).map(l => l.concept.name)).toEqual(['Expected Value', 'Covariance'])
  })

  it('says which three decay soonest, with the step', () => {
    const soon = decayingNow(landmarks)
    expect(soon.map(l => l.concept.name)).toEqual(['Covariance', 'Bayes Theorem', 'Variance'])
    expect(soon[0].decay!.inDays).toBe(1)
    expect(isDecaying(byName('Expected Value'))).toBe(true)
    expect(isDecaying(byName('Variance'))).toBe(false)
  })

  it('agrees with the readiness score about the sector (acceptance: Z × 100 = the Dashboard’s %)', () => {
    const readiness = computeExamReadiness(EXAM_P, records, NOW)
    const c = sectorCredibility(readiness.overallPct)
    expect(c.percent).toBe(Math.round(readiness.overallPct))
    expect(Number(c.label) * 100).toBeCloseTo(Math.round(readiness.overallPct), 6)
  })

  it('puts a chip on a landmark only when it has something to say', () => {
    expect(landmarkChip(byName('Expected Value'))).toEqual({ variant: 'decaying', label: 'Decayed' })
    expect(landmarkChip(byName('Covariance'))).toEqual({ variant: 'decaying', label: 'L1 → Forgotten tomorrow' })
    expect(landmarkChip(byName('Variance'))).toEqual({ variant: 'cleared', label: 'Cleared' })
    // A New concept, in no danger, says nothing beyond its Z.
    const untouched = landmarks.find(l => l.state === 'new')!
    expect(landmarkChip(untouched)).toBeNull()
  })

  it('leaves the readings an objective links out of its landmarks', () => {
    expect(isLandmark({ name: 'A First Course in Probability (Ross - 2019)', target: 'Resources/Books/A First Course in Probability (Ross - 2019)' })).toBe(false)
    expect(isLandmark({ name: 'Bayes Theorem', target: 'Bayes Theorem' })).toBe(true)
  })
})
