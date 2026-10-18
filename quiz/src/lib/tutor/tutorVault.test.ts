// The Tutor over the real vault: Exam 5's syllabus page and question bank are
// the fixture. Pins what the engine makes of them — the items, their kinds,
// the examiners' notes, how often a concept was asked — and plays a session
// through the scheduler to hold its rules on real data.

import { describe, expect, it } from 'vitest'
import { readdirSync, readFileSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { parseQuestion, type Question } from '../parser'
import { parseExamMetadata, parseExamSyllabus } from '../wikiParser'
import { DEFAULT_TUTOR_EXAM } from './exams'
import { buildItems, itemsByConcept, type TutorItem } from './items'
import { conceptNotes, itemNotes } from './examinerNotes'
import { examHistory } from './context'
import { foldLog, type AnswerEvent, type TutorEvent } from './log'
import { nextStep, tutorSyllabus, type SchedulerInput } from './scheduler'

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../../..')
const exam = DEFAULT_TUTOR_EXAM

const page = readFileSync(path.join(REPO, `${exam.pageFile}.md`), 'utf-8')
const meta = parseExamMetadata(page)!
const syllabus = tutorSyllabus(parseExamSyllabus(page, meta.examId, meta.examLabel, meta.examTopic, exam.pageFile))

const bankDir = path.join(REPO, 'questions/exam-5')
const questions: Question[] = readdirSync(bankDir)
  .filter(f => f.endsWith('.md'))
  .map(f => parseQuestion(readFileSync(path.join(bankDir, f), 'utf-8')))
  .filter((q): q is Question => q !== null)
const items = buildItems(questions, exam)
const byConcept = itemsByConcept(items)

describe('Exam 5 as items', () => {
  it('turns the bank into parts', () => {
    expect(questions.length).toBeGreaterThan(340)
    expect(items.length).toBeGreaterThan(800)
    expect(new Set(items.map(i => i.id)).size).toBe(items.length)
  })

  it('gives every item concepts from its own question’s tags', () => {
    for (const item of items) {
      expect(item.concepts.length).toBeGreaterThan(0)
      for (const c of item.concepts) expect(item.questionConcepts).toContain(c)
    }
  })

  it('finds all three kinds of part, calculations the most', () => {
    const count = (k: string) => items.filter(i => i.kind === k).length
    expect(count('calculation')).toBeGreaterThan(count('explanation'))
    expect(count('explanation')).toBeGreaterThan(count('judgment'))
    expect(count('judgment')).toBeGreaterThan(100)
  })

  it('has something to serve for nearly every syllabus concept', () => {
    const served = syllabus.filter(c => byConcept.has(c.name.toLowerCase()))
    expect(syllabus.length).toBeGreaterThan(120)
    expect(served.length / syllabus.length).toBeGreaterThan(0.85)
  })
})

describe('the examiners’ notes', () => {
  it('are found on most reported parts', () => {
    const reported = items.filter(i => i.examinerReport)
    const withNotes = reported.filter(i => itemNotes(i).length > 0)
    expect(withNotes.length / reported.length).toBeGreaterThan(0.5)
  })

  it('quote the report word for word', () => {
    const item = items.find(i => i.id === 'cas5-2013f-q5#a')!
    expect(itemNotes(item).map(n => n.text)).toContain(
      'Candidates struggled with the large loss factor.',
    )
    for (const note of itemNotes(item)) expect(item.examinerReport.replace(/\s+/g, ' ')).toContain(note.text.split('\n')[0])
  })

  it('give a much-examined concept several, newest first', () => {
    const notes = conceptNotes(byConcept.get('bornhuetter-ferguson method') ?? [])
    expect(notes.length).toBeGreaterThan(2)
  })
})

describe('how often a concept was asked', () => {
  it('counts the papers in the bank', () => {
    const bf = examHistory(byConcept.get('bornhuetter-ferguson method') ?? [], items)
    expect(bf.totalPapers).toBeGreaterThanOrEqual(14)
    expect(bf.papers).toBeGreaterThan(5)
    expect(bf.parts).toBeGreaterThanOrEqual(bf.papers)
  })
})

describe('a session over the real bank', () => {
  it('keeps its rules: page first, no repeats, no concept twice running, misses relearned', () => {
    const start = new Date(2026, 4, 1, 9, 0, 0)
    const events: TutorEvent[] = []
    const served: string[] = []
    let clock = start.getTime()
    let introduced = 0
    let relearned = 0
    let previous: string | null = null

    for (let step = 0; step < 40; step++) {
      const now = new Date(clock)
      const input: SchedulerInput = {
        syllabus, items, byConcept, model: foldLog(events, new Map(), now), now,
        examDay: '2026-09-01', phase: 'learn', served, introducedToday: introduced,
      }
      const next = nextStep(input)
      if (next.type === 'done') break
      if (next.type === 'read') {
        events.push({ t: 'read', at: now.toISOString(), concept: next.concept, seconds: 90 })
        clock += 3 * 60_000
        continue
      }
      const item: TutorItem = next.item
      // An item comes back in a session only to be relearned.
      if (next.reason !== 'relearn') expect(served).not.toContain(item.id)
      else expect(served).toContain(item.id)
      if (previous && next.reason !== 'relearn') expect(next.concept).not.toBe(previous)
      if (next.reason === 'new') introduced++
      if (next.reason === 'relearn') relearned++
      served.push(item.id)
      previous = next.concept
      // Every third answer is a miss.
      const grade: AnswerEvent['grade'] = step % 3 === 0 ? 'incorrect' : 'correct'
      events.push({
        t: 'answer', at: now.toISOString(), item: item.id, question: item.questionId, concepts: item.concepts,
        kind: item.kind, points: item.points, difficulty: item.difficulty, grade, confidence: 'unsure', seconds: 120,
      })
      clock += 4 * 60_000
    }

    // The learn phase introduces at most five concepts a day …
    expect(introduced).toBeLessThanOrEqual(5)
    expect(introduced).toBeGreaterThan(0)
    // … and a miss comes back in the same session, three items later.
    expect(relearned).toBeGreaterThan(0)
  })
})
