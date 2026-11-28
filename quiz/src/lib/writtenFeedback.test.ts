import { describe, expect, it } from 'vitest'
import { readdirSync, readFileSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { parseQuestion, type Part, type Question, type SelfGrade } from './parser'
import {
  MIN_WORD_ATTEMPTS, OTHER_WORD, WRITTEN_FEEDBACK_EXAMS, keptChange, lostParts, namedWords, partFacts, writtenSummary,
  type GradeRecord,
} from './writtenFeedback'

const TODAY = '2026-11-28'
const dayOf = (iso: string) => iso.slice(0, 10)

function part(label: string, stem: string, extra: Partial<Part> = {}): Part {
  return { label, points: 1, stem, type: 'free-entry', options: [], answer: '', explanation: 'Sample.', ...extra }
}

const q1: Question = {
  id: 'cas5-2019f-q3', exam: 'Exam 5', topic: 'Trend', learning_objective: '', difficulty: 'medium', type: 'multi-part',
  wiki_link: [], answer: '', explanation: '', points: 2.5, stem: 'Given the data below.', options: [], year: 2019, session: 'Fall',
  parts: [
    part('a', 'Calculate the indicated rate change.', { points: 1.5, examiner_report: 'Most candidates did well. A common error was capping the rate change at the overall target.' }),
    part('b', 'Briefly explain one reason the trend may differ.', { examiner_report: 'Candidates received full credit for any reasonable reason.' }),
  ],
}
const q2: Question = {
  ...q1, id: 'cas5-2018s-q7', year: 2018, session: 'Spring', points: 1,
  parts: [part('a', 'Recommend a method and justify the choice.', { points: 1 })],
}
const questions = new Map([q1, q2].map(q => [q.id, q]))

function row(q: string, label: string | null, grade: SelfGrade, day: string, points = 1): GradeRecord {
  return { question_id: q, part_label: label, grade, points, graded_at: `${day}T12:00:00.000Z` }
}

describe('partFacts', () => {
  it('reads a part’s kind, command word, prompt and sitting off the bank', () => {
    expect(partFacts(q1, 'a')).toMatchObject({ key: 'cas5-2019f-q3#a', kind: 'calculation', word: 'Calculate', sitting: 'Fall 2019' })
    expect(partFacts(q1, 'b')).toMatchObject({ kind: 'explanation', word: 'Explain' })
    expect(partFacts(q2, 'a')).toMatchObject({ kind: 'judgment', word: 'Recommend' })
  })

  it('is null for a part the bank no longer has', () => {
    expect(partFacts(q1, 'z')).toBeNull()
    expect(partFacts(q1, null)).toBeNull()
  })
})

describe('writtenSummary', () => {
  const rows = [
    row(q1.id, 'a', 'incorrect', '2026-11-20', 1.5),
    row(q1.id, 'a', 'partial', '2026-11-25', 1.5),
    row(q1.id, 'a', 'correct', '2026-11-27', 1.5),
    row(q1.id, 'b', 'correct', '2026-11-26'),
    row(q2.id, 'a', 'incorrect', '2026-11-26'),
    row(q1.id, 'b', 'incorrect', '2026-10-10'), // the 30 days before a 30-day span
    row('gone-from-the-bank', 'a', 'incorrect', '2026-11-26'),
  ]

  it('weighs each part by its points and drops a row the bank no longer has', () => {
    const s = writtenSummary(rows, questions, TODAY, { span: 30, dayOf })
    expect(s.attempts).toBe(5)
    // Kept: 1.5×(0 + 0.5 + 1) + 1 + 0 = 3.25 of 1.5×3 + 1 + 1 = 6.5.
    expect(s.kept).toBe(50)
    expect(s.keptBefore).toBe(0)
    expect(keptChange(s)).toBe('up from 0%')
  })

  it('groups by kind in a fixed order, with the latest grades oldest first', () => {
    const s = writtenSummary(rows, questions, TODAY, { span: 30, dayOf })
    expect(s.byKind.map(r => [r.key, r.attempts, r.kept])).toEqual([
      ['calculation', 3, 50], ['explanation', 1, 100], ['judgment', 1, 0],
    ])
    expect(s.byKind[0].recent).toEqual(['incorrect', 'partial', 'correct'])
  })

  it('gives a command word its own row at enough attempts, by points lost, and puts the rest under Other', () => {
    const s = writtenSummary(rows, questions, TODAY, { span: 30, dayOf })
    expect(MIN_WORD_ATTEMPTS).toBe(3)
    expect(s.byWord.map(r => r.key)).toEqual(['Calculate', OTHER_WORD])
    expect(s.byWord[1].attempts).toBe(2)
    expect(namedWords(s)).toEqual(['Calculate'])
  })

  it('reads a short span', () => {
    const s = writtenSummary(rows, questions, TODAY, { span: 7, dayOf })
    expect(s.attempts).toBe(4)
    expect(s.keptBefore).toBe(0)
  })
})

describe('lostParts', () => {
  const rows = [
    row(q1.id, 'a', 'incorrect', '2026-11-20'),
    row(q1.id, 'a', 'partial', '2026-11-25'),
    row(q1.id, 'b', 'correct', '2026-11-26'),
    row(q2.id, 'a', 'incorrect', '2026-11-27'),
  ]

  it('lists the parts below Full, attempted last first, with every attempt and the report’s lost-credit sentences', () => {
    const parts = lostParts(rows, questions, TODAY, { kind: 'calculation' }, { span: 30, dayOf })
    expect(parts).toHaveLength(1)
    expect(parts[0].attempts.map(a => a.grade)).toEqual(['incorrect', 'partial'])
    expect(parts[0].notes).toEqual(['A common error was capping the rate change at the overall target.'])
  })

  it('leaves out a part with full credit every time, and quotes nothing the report doesn’t say', () => {
    expect(lostParts(rows, questions, TODAY, { kind: 'explanation' }, { span: 30, dayOf })).toEqual([])
    const [judged] = lostParts(rows, questions, TODAY, { kind: 'judgment' }, { span: 30, dayOf })
    expect(judged.notes).toEqual([])
  })

  it('reads Other as every word without a row of its own', () => {
    const all = lostParts(rows, questions, TODAY, { word: OTHER_WORD, named: [] }, { span: 30, dayOf })
    expect(all.map(p => p.facts.key)).toEqual(['cas5-2018s-q7#a', 'cas5-2019f-q3#a'])
    const one = lostParts(rows, questions, TODAY, { word: 'Recommend', named: ['Recommend'] }, { span: 30, dayOf })
    expect(one.map(p => p.facts.key)).toEqual(['cas5-2018s-q7#a'])
  })

  it('counts only a loss inside the span', () => {
    expect(lostParts(rows, questions, TODAY, { kind: 'calculation' }, { span: 7, dayOf })).toHaveLength(1)
    expect(lostParts([row(q1.id, 'a', 'incorrect', '2026-09-01')], questions, TODAY, { kind: 'calculation' }, { span: 30, dayOf })).toEqual([])
  })
})

// ── Over the real banks ─────────────────────────────────────────────────────

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..')
const BANKS: Record<string, string> = {
  'Exam 5': 'exam-5', 'Exam 6C': 'exam-6c', 'Exam 7': 'exam-7', 'Exam 8': 'exam-8', 'Exam 9': 'exam-9',
}

describe('the written papers’ banks', () => {
  it('covers every exam the section is drawn for', () => {
    expect(Object.keys(BANKS).sort()).toEqual([...WRITTEN_FEEDBACK_EXAMS].sort())
  })

  for (const [exam, dir] of Object.entries(BANKS)) {
    it(`reads every written part of ${exam}`, () => {
      const bankDir = path.join(REPO, 'questions', dir)
      const bank = readdirSync(bankDir)
        .filter(f => f.endsWith('.md'))
        .map(f => parseQuestion(readFileSync(path.join(bankDir, f), 'utf-8')))
        .filter((q): q is Question => q !== null && q.type === 'multi-part')
      let parts = 0
      let worded = 0
      let noted = 0
      for (const q of bank) {
        const ps = q.parts ?? []
        const whole = ps.length === 1 && ps[0].stem === ''
        for (const p of ps) {
          if (p.type === 'multiple-choice') continue
          const facts = partFacts(q, whole ? null : p.label)
          expect(facts, `${q.id} ${p.label}`).not.toBeNull()
          parts++
          if (facts!.word) worded++
          const lost = lostParts(
            [{ question_id: q.id, part_label: facts!.partLabel, grade: 'incorrect', points: 1, graded_at: `${TODAY}T12:00:00.000Z` }],
            new Map([[q.id, q]]), TODAY, { kind: facts!.kind }, { span: 7, dayOf },
          )
          expect(lost).toHaveLength(1)
          // Every quoted note is the report's own words.
          const report = (p.examiner_report ?? '').replace(/\s+/g, ' ')
          for (const note of lost[0].notes) {
            for (const line of note.split('\n')) expect(report).toContain(line.trim().replace(/\s+/g, ' '))
          }
          if (lost[0].notes.length > 0) noted++
        }
      }
      expect(parts).toBeGreaterThan(200)
      // Nearly every written part names its command word, and most reports say where credit was lost.
      expect(worded / parts).toBeGreaterThan(0.95)
      expect(noted / parts).toBeGreaterThan(0.75)
    })
  }
})
