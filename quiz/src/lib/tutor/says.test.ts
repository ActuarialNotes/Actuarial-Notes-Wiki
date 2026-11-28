import { describe, expect, it } from 'vitest'
import { parseExamSyllabus } from '../wikiParser'
import type { Difficulty } from '../parser'
import type { TutorPlace, TutorSurface } from './context'
import type { Finding } from './diagnosis'
import { foldLog, type AnswerEvent, type TutorEvent } from './log'
import { itemsByConcept, type PartKind, type TutorItem } from './items'
import type { JourneyPhase } from './journey'
import { tutorSyllabus, type SchedulerInput } from './scheduler'
import { afterReadingLine, tutorSays, whenMissed, type SaysInput } from './says'

const PAGE = [
  '<div class="exam-nav" data-current="5|Basic Techniques"></div>',
  '',
  '> [!example]- A. Ratemaking {45–55%}',
  '> 1. Organize data by [[Calendar Year]] and [[Policy Year]]',
  '> 2. Calculate [[Pure Premium]]',
  '',
  '> [!example]- B. Reserving {45–55%}',
  '> 1. Apply a [[Tail Factor]]',
].join('\n')

const syllabus = tutorSyllabus(parseExamSyllabus(PAGE, '5', 'Exam 5', 'Basic Techniques'))

function item(id: string, concept: string, sitting: string | null = 'Fall 2019'): TutorItem {
  return {
    id, questionId: id.split('#')[0], partLabel: 'a', exam: 'Exam 5', topic: concept, preamble: '', prompt: 'Calculate it.',
    kind: 'calculation' as PartKind, concepts: [concept], questionConcepts: [concept], points: 1, minutes: 4.4,
    difficulty: 'medium' as Difficulty, sitting, answerKey: '1', sampleAnswer: 's', examinerReport: '', options: [],
  }
}

// Tail Factor has no items.
const items = [
  item('cy1#a', 'Calendar Year'), item('cy2#a', 'Calendar Year', 'Spring 2018'),
  item('py1#a', 'Policy Year'), item('pp1#a', 'Pure Premium', 'Fall 2017'),
]

const now = new Date(2026, 2, 11, 9, 0, 0) // a Wednesday
const ago = (days: number, minutes = 0) => new Date(now.getTime() - days * 86_400_000 - minutes * 60_000).toISOString()

function answer(id: string, concept: string, grade: AnswerEvent['grade'], at: string, confidence: AnswerEvent['confidence'] = 'unsure'): AnswerEvent {
  return { t: 'answer', at, item: id, question: id.split('#')[0], concepts: [concept], kind: 'calculation', points: 1, difficulty: 'medium', grade, confidence, seconds: 60 }
}

function says(
  surface: TutorSurface,
  events: TutorEvent[] = [],
  extra: Partial<SaysInput> & { concept?: string; page?: string; phase?: JourneyPhase } = {},
) {
  const place: TutorPlace = { surface, concept: extra.concept ?? null, examPage: extra.page ?? null }
  const base: SchedulerInput = {
    syllabus, items, byConcept: itemsByConcept(items), model: foldLog(events, new Map(), now), now,
    examDay: '2026-10-20', phase: extra.phase ?? 'learn',
  }
  return tutorSays({ place, ready: true, examLabel: 'Exam 5', examPage: 'Exam 5 (CAS).md', base, findings: [], ...extra })
}

describe('on a concept', () => {
  it('says how often the papers asked about one not checked yet, and offers the check', () => {
    expect(says('concept', [], { concept: 'Calendar Year' })).toEqual({
      text: 'Asked on 2 of 3 papers.',
      act: { type: 'check', label: 'Check yourself', concept: 'Calendar Year', reason: 'new' },
    })
  })

  it('brings a miss from an earlier day back as that same part', () => {
    const line = says('concept', [answer('cy2#a', 'Calendar Year', 'incorrect', ago(1))], { concept: 'Calendar Year' })
    expect(line.text).toBe('You missed this yesterday.')
    expect(line.act).toEqual({ type: 'check', label: 'Try it again', concept: 'Calendar Year', item: 'cy2#a', reason: 'relearn' })
  })

  it('does not serve a miss straight back', () => {
    const line = says('concept', [answer('cy2#a', 'Calendar Year', 'incorrect', ago(0, 5))], { concept: 'Calendar Year' })
    expect(line).toEqual({ text: 'You missed this earlier today. Try it again tomorrow.', act: null })
  })

  it('says when the next check is for one that is known, with nothing to press', () => {
    const line = says('concept', [answer('cy1#a', 'Calendar Year', 'correct', ago(0, 30), 'sure')], { concept: 'Calendar Year' })
    expect(line.text).toMatch(/^Next check (tomorrow|in \d+ days)\.$/)
    expect(line.act).toBeNull()
  })

  it('says so when no part covers it, or it is another exam’s', () => {
    expect(says('concept', [], { concept: 'Tail Factor' })).toEqual({ text: 'No past-paper part covers this concept yet.', act: null })
    expect(says('concept', [], { concept: 'Bayes Theorem' }).text).toBe('The Tutor only covers Exam 5 for now.')
  })
})

describe('on an exam page', () => {
  it('names the next concept to read on its own exam', () => {
    expect(says('exam', [], { page: 'Exam 5 (CAS).md' })).toEqual({
      text: 'Calendar Year is next on the syllabus.',
      act: { type: 'read', label: 'Read it', concept: 'Calendar Year' },
    })
  })

  it('says what it covers on another exam’s', () => {
    expect(says('exam', [], { page: 'Exam 7 (CAS).md' })).toEqual({ text: 'The Tutor only covers Exam 5 for now.', act: null })
  })
})

describe('after a quiz', () => {
  it('offers the first concept the quiz lost points on that it can serve', () => {
    const line = says('review', [], { missed: ['Bayes Theorem', 'Tail Factor', 'Pure Premium'] })
    expect(line.text).toBe('That quiz lost points on Pure Premium.')
    expect(line.act).toMatchObject({ type: 'check', label: 'Go over it', concept: 'Pure Premium' })
  })
})

describe('anywhere else', () => {
  it('has nothing to say on a new record', () => {
    expect(says('dashboard')).toEqual({ text: 'Nothing is due.', act: null })
  })

  it('leads with a miss that is ready to come back', () => {
    const line = says('dashboard', [answer('py1#a', 'Policy Year', 'incorrect', ago(2))])
    expect(line.text).toBe('You missed Policy Year on Monday.')
    expect(line.act).toMatchObject({ label: 'Try it again', item: 'py1#a', reason: 'relearn' })
  })

  it('then what is due', () => {
    const line = says('dashboard', [answer('pp1#a', 'Pure Premium', 'correct', ago(60))])
    expect(line).toEqual({
      text: 'Pure Premium is due for a check.',
      act: { type: 'check', label: 'Check yourself', concept: 'Pure Premium', reason: 'due' },
    })
  })

  it('then what the record says is confusing', () => {
    const finding: Finding = { type: 'kind-gap', weak: 'judgment', weakRate: 0.4, strong: 'calculation', strongRate: 0.8 }
    expect(says('other', [], { findings: [finding] })).toEqual({
      text: 'You score 80% on calculation parts and 40% on judgment parts.',
      act: null,
    })
  })

  it('offers nothing on exam day', () => {
    const line = says('dashboard', [answer('py1#a', 'Policy Year', 'incorrect', ago(2))], { phase: 'exam' })
    expect(line.act).toBeNull()
  })
})

describe('before the bank is in', () => {
  it('says it is reading', () => {
    expect(says('dashboard', [], { ready: false })).toEqual({ text: 'Reading the Exam 5 papers…', act: null })
  })
})

describe('unasked, after reading', () => {
  it('names the page and offers the check', () => {
    expect(afterReadingLine('Cape Cod Method', 'new')).toEqual({
      text: 'You just read Cape Cod Method.',
      act: { type: 'check', label: 'Check yourself', concept: 'Cape Cod Method', reason: 'new' },
    })
  })
})

describe('when a miss was', () => {
  it('is said the way a person would', () => {
    expect(whenMissed(ago(0, 10), now)).toBe('earlier today')
    expect(whenMissed(ago(1), now)).toBe('yesterday')
    expect(whenMissed(ago(2), now)).toBe('on Monday')
    expect(whenMissed(ago(30), now)).toBe('on Feb 9')
  })
})
