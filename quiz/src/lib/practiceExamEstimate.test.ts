import { describe, expect, it } from 'vitest'
import type { Question } from './parser'
import type { WikiExamSyllabus } from './wikiParser'
import passMarkData from '@/data/casPassMarks.json'
import {
  casGrade, debriefSections, estimateGrade, hasEstimate, paperScore, passMarkSittings,
  passShare, penalisedShare, restatePenalisedShare,
} from './practiceExamEstimate'

function mc(id: string, points = 1, extra: Partial<Question> = {}): Question {
  return {
    id, exam: 'Exam 5', topic: 't', learning_objective: '', difficulty: 'medium',
    type: 'multiple-choice', wiki_link: [], points, stem: '', options: [], answer: 'A', explanation: '',
    ...extra,
  } as unknown as Question
}

describe('casGrade: the Syllabus of Basic Education\'s scale', () => {
  it('a grade of 5 is at least 90% but under 100% of the pass mark', () => {
    expect(casGrade(0.9)).toBe(5)
    expect(casGrade(0.9999)).toBe(5)
    expect(casGrade(0.8999)).toBe(4)
  })
  it('each interval is 10% of the pass mark', () => {
    expect(casGrade(0.85)).toBe(4)
    expect(casGrade(0.7)).toBe(3)
    expect(casGrade(0.65)).toBe(2)
    expect(casGrade(0.5)).toBe(1)
  })
  it('a grade of 0 is under 50% of the pass mark', () => {
    expect(casGrade(0.4999)).toBe(0)
    expect(casGrade(0)).toBe(0)
    expect(casGrade(NaN)).toBe(0)
  })
  it('at or above the pass mark is a pass, never a number', () => {
    expect(casGrade(1)).toBe('pass')
    expect(casGrade(1.4)).toBe('pass')
  })
  it('an exact 90% of a real pass mark is a 5, not a 4', () => {
    expect(casGrade((0.9 * 37) / 37)).toBe(5)
  })
})

describe('the MAS restatement', () => {
  it('a penalised share is a share right for a paper with no blanks', () => {
    // 45 questions, 30 right and 15 wrong: (30 − 15/4) / 45 penalised.
    const right = 30 / 45
    const penalised = (30 - 15 / 4) / 45
    expect(restatePenalisedShare(penalised)).toBeCloseTo(right, 10)
    expect(penalisedShare(right)).toBeCloseTo(penalised, 10)
  })
  it('restates Spring 2019 MAS-I\'s 51.5 of 90 as 65.8% right', () => {
    const s2019 = passMarkSittings('Exam MAS-I').find(s => s.year === 2019 && s.session === 'Spring')!
    expect(s2019).toMatchObject({ passMark: 51.5, totalPoints: 90 })
    expect(passShare('Exam MAS-I', s2019)).toBeCloseTo(0.6578, 3)
  })
  it('leaves the written exams\' marks as printed', () => {
    expect(passShare('Exam 5', { passMark: 37, totalPoints: 53.5 })).toBeCloseTo(37 / 53.5, 10)
  })
})

describe('the pass-mark table', () => {
  const exams = (passMarkData as unknown as { exams: Record<string, { source: string; sha256: string; sittings: unknown[] }> }).exams
  it('carries every CAS exam the debrief estimates, each from a casact.org PDF', () => {
    for (const exam of ['Exam MAS-I', 'Exam MAS-II', 'Exam 5', 'Exam 6C', 'Exam 7', 'Exam 8', 'Exam 9']) {
      expect(hasEstimate(exam)).toBe(true)
      expect(exams[exam].source).toMatch(/^https:\/\/www\.casact\.org\/.+\.pdf$/)
      expect(exams[exam].sha256).toMatch(/^[0-9a-f]{64}$/)
    }
  })
  it('stops at 2019, when the CAS stopped publishing pass marks', () => {
    for (const e of Object.keys(exams)) for (const s of passMarkSittings(e)) expect(s.year).toBeLessThanOrEqual(2019)
  })
  it('prints Fall 2019 Exam 5 as its Examiner\'s Report does', () => {
    expect(passMarkSittings('Exam 5')[0]).toMatchObject({ session: 'Fall', year: 2019, totalPoints: 53.5, passMark: 37 })
  })
  it('every pass mark is under its total', () => {
    for (const e of Object.keys(exams)) for (const s of passMarkSittings(e)) expect(s.passMark).toBeLessThan(s.totalPoints)
  })
  it('gives no estimate for an exam the CAS printed no marks for', () => {
    expect(hasEstimate('Exam DISC-DA')).toBe(false)
    expect(estimateGrade('Probability', 0.8)).toBeNull()
  })
})

describe('estimateGrade', () => {
  it('holds a past paper to its own sitting\'s mark', () => {
    const e = estimateGrade('Exam 5', 34 / 53.5, { year: 2019, session: 'Fall' })
    expect(e?.kind).toBe('sitting')
    if (e?.kind !== 'sitting') return
    expect(e.ratio).toBeCloseTo(34 / 37, 10)
    expect(e.grade).toBe(5)
  })
  it('names the percentile a score reached', () => {
    const e = estimateGrade('Exam 5', 43 / 53.5, { year: 2019, session: 'Fall' })
    expect(e).toMatchObject({ kind: 'sitting', grade: 'pass', percentile: 95 })
    const e75 = estimateGrade('Exam 5', 38 / 53.5, { year: 2019, session: 'Fall' })
    expect(e75).toMatchObject({ percentile: 75 })
  })
  it('a sitting printed twice is its original', () => {
    const e = estimateGrade('Exam 5', 0.7, { year: 2018, session: 'spring' })
    expect(e?.kind === 'sitting' && e.sitting.passMark).toBe(42)
  })
  it('no estimate for a sitting with no printed mark', () => {
    expect(estimateGrade('Exam 5', 0.7, { year: 2021, session: 'Fall' })).toBeNull()
  })
  it('a drawn paper reads the range since 2014, low at the highest mark', () => {
    const e = estimateGrade('Exam 5', 0.69)
    expect(e?.kind).toBe('range')
    if (e?.kind !== 'range') return
    expect(e.fromYear).toBe(2014)
    expect(e.toYear).toBe(2019)
    expect(e.low.ratio).toBeLessThanOrEqual(e.median.ratio)
    expect(e.median.ratio).toBeLessThanOrEqual(e.high.ratio)
    // 69% against marks from 66% to 76% of the points.
    expect(e.high.grade).toBe('pass')
    expect(e.low.grade).toBe(5)
  })
  it('a MAS paper is compared on today\'s rule', () => {
    // 60% right: under every restated MAS-I mark (65–67%), so a 5 at best, not a pass.
    const e = estimateGrade('Exam MAS-I', 0.6)
    expect(e?.kind === 'range' && e.high.grade).toBe(5)
  })
})

describe('paperScore', () => {
  it('counts a blank as nothing and weights by points', () => {
    const qs = [mc('a', 2), mc('b', 1), mc('c', 1)]
    const s = paperScore(qs, { a: { chosen: 'A' }, b: { chosen: 'B' } }, {})
    expect(s).toMatchObject({ earned: 2, possible: 4, share: 0.5, ungraded: [] })
  })
  it('names an answered question whose written parts are ungraded', () => {
    const written = mc('w', 2, {
      type: 'multi-part', answer: '',
      parts: [{ label: 'a', stem: '', answer: '', points: 2 }] as unknown as Question['parts'],
    })
    expect(paperScore([written], { w: { chosen: '{"a":"my answer"}' } }, {}).ungraded).toEqual(['w'])
    expect(paperScore([written], { w: { chosen: '{"a":"my answer"}' } }, { w__a: 'full' }).ungraded).toEqual([])
    expect(paperScore([written], {}, {}).ungraded).toEqual([])
  })
})

describe('debriefSections', () => {
  const syllabus = {
    examId: '5', examLabel: 'Exam 5', examTopic: 'Exam 5', resources: [],
    topics: [
      { name: 'Ratemaking', weight: '{40-50%}', concepts: [{ name: 'Loss Ratio', target: 'Concepts/Loss Ratio' }] },
      { name: 'Reserving', weight: '{50-60%}', concepts: [{ name: 'Chain Ladder', target: 'Concepts/Chain Ladder' }] },
    ],
  } as unknown as WikiExamSyllabus
  const qs = [
    mc('r1', 2, { wiki_link: ['Concepts/Loss+Ratio'] }),
    mc('r2', 1, { wiki_link: ['Concepts/Loss+Ratio'] }),
    mc('c1', 3, { wiki_link: ['Concepts/Chain+Ladder'] }),
    mc('x', 1),
  ]
  const responses = {
    r1: { chosen: 'B', timeSpent: 600 },
    r2: { chosen: 'A', timeSpent: 100 },
    c1: { chosen: 'A', timeSpent: 700 },
    x: { chosen: null, timeSpent: 0 },
  }

  it('puts the section that lost most first, with its misses', () => {
    const d = debriefSections(qs, responses, {}, syllabus, 'Exam 5')
    expect(d.sections.map(s => s.name)).toEqual(['Ratemaking', 'Other', 'Reserving'])
    expect(d.sections[0]).toMatchObject({ possible: 3, earned: 1, lost: 2, missed: ['r1'], seconds: 700 })
  })
  it('budgets a points paper by the point', () => {
    const d = debriefSections(qs, responses, {}, syllabus, 'Exam 5')
    // Exam 5: 240 minutes for 55 points.
    const perPoint = (240 * 60) / 55
    expect(d.allowed).toBeCloseTo(7 * perPoint, 6)
    expect(d.seconds).toBe(1400)
  })
  it('has no allowance for an exam with no pace', () => {
    expect(debriefSections(qs, responses, {}, syllabus, 'Exam 7').allowed).toBeNull()
  })
})
