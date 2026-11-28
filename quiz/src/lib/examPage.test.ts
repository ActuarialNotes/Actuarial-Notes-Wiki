import { describe, expect, it } from 'vitest'
import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { examFootNotes, linesShown, nextInObjective, noteLabel, objectiveOf, objectiveWalk, parseExamPage, stopOf } from './examPage'
import { objectiveMarks } from './syllabusChapters'
import { parseExamMetadata, parseExamSyllabus } from './wikiParser'

const PAGE = `---
verification:
  status: verified
---

<div class="exam-nav"
     data-current="P-1|Probability">
</div>

# Exam P-1
The Probability Exam is a three-hour exam.

> [!question]- Exam format
>
> - Five answer choices.

> [!question]- Prerequisite knowledge
>
> - [[Calculus]]

## Learning Objectives

> [!example]- General Probability {23-30%}
> Understand basic concepts of [[Probability]] and [[Discrete Mathematics]].
> 1. Define [[Set Function|set functions]] and [[Event|events]]. Define [[Probability|probability]] as a [[Set Function|set function]].
>    - *Key concepts:* [[Set Theory]]
> 2. Calculate [[Probability|probabilities]] using [[Combinatorics]].
> 3. Define [[Independent Events|Independence]].
> 4. Calculate [[Probability|probabilities]] of [[Mutually Exclusive Events]].
> 5. State [[Bayes Theorem]].
>    - with [[Concepts/Conditional Probability#Rule|the rule]]

> [!example]- Univariate Random Variables {44-50%}
> 1. Explain [[Probability]] and [[Random Variable|Random Variables]].

## Source Material
> [!answer]- Source Material {1 Sources}
> - [[A First Course in Probability (Ross - 2019)]]
>   - Chapters 1-8
`

describe('parseExamPage', () => {
  const page = parseExamPage(PAGE)
  const [general, uni] = page.objectives

  it('reads the title, the lead and the notes', () => {
    expect(page.title).toBe('Exam P-1')
    expect(page.lead).toBe('The Probability Exam is a three-hour exam.')
    expect(page.notes.map(n => n.title)).toEqual(['Exam format', 'Prerequisite knowledge'])
    expect(page.notes[1]!.markdown).toBe('- [[Calculus]]')
  })

  it('reads each objective with its weight', () => {
    expect(page.objectives.map(o => [o.name, o.weight])).toEqual([
      ['General Probability', '23–30%'],
      ['Univariate Random Variables', '44–50%'],
    ])
  })

  it('keeps the sentence as written, its links reduced to their words', () => {
    expect(general!.lines[1]).toMatchObject({
      kind: 'item',
      marker: '1.',
      depth: 0,
      text: 'Define set functions and events. Define probability as a set function.',
    })
    expect(general!.lines[0]).toMatchObject({ kind: 'prose', marker: null })
  })

  it('gives a concept one pill, under the first line that names it', () => {
    expect(general!.lines.map(l => l.pills.map(p => p.name))).toEqual([
      ['Probability', 'Discrete Mathematics'],
      ['Set Function', 'Event', 'Set Theory'],
      ['Combinatorics'],
      ['Independent Events'],
      ['Mutually Exclusive Events'],
      ['Bayes Theorem'],
      ['Conditional Probability'],
    ])
  })

  it('never draws the Key concepts line as a sentence', () => {
    expect(general!.lines.some(l => /Key concepts/.test(l.text))).toBe(false)
  })

  it('nests a sub-bullet and drops a heading from a pill name', () => {
    expect(general!.lines[6]).toMatchObject({ depth: 1, marker: null, text: 'with the rule' })
  })

  it('gives a concept in two objectives a pill in each', () => {
    expect(uni!.concepts.map(p => p.name)).toEqual(['Probability', 'Random Variable'])
  })

  it('hands the Source Material callout over whole', () => {
    expect(page.sourceMaterial).toMatch(/^> \[!answer\]- Source Material/)
    expect(page.sourceMaterial).toMatch(/Chapters 1-8$/)
  })

  it('finds a concept and what follows it', () => {
    expect(objectiveOf(page.objectives, 'bayes theorem')).toBe(0)
    expect(objectiveOf(page.objectives, 'Nothing')).toBe(-1)
    expect(nextInObjective(page.objectives, 'Combinatorics')).toEqual({
      objective: 'General Probability',
      next: { name: 'Independent Events', ref: { kind: 'concept', name: 'Independent Events' } },
    })
    expect(nextInObjective(page.objectives, 'Conditional Probability')).toBeNull()
  })

  it('folds an objective past three lines, unless the concept opened is past the fold', () => {
    expect(linesShown(general!, false)).toBe(3)
    expect(linesShown(general!, true)).toBe(7)
    expect(linesShown(general!, false, 'Bayes Theorem')).toBe(7)
    expect(linesShown(general!, false, 'Event')).toBe(3)
    expect(linesShown(uni!, false)).toBe(1)
  })
})

describe('examFootNotes', () => {
  it('renames the prerequisites and opens the format row with the lead', () => {
    expect(noteLabel('Prerequisite knowledge')).toBe('What you should know first')
    const rows = examFootNotes(parseExamPage(PAGE))
    expect(rows.map(r => r.title)).toEqual(['Exam format', 'What you should know first'])
    expect(rows[0]!.markdown).toBe('The Probability Exam is a three-hour exam.\n\n- Five answer choices.')
  })

  it('makes a row for the lead on a page with no note about the exam', () => {
    expect(examFootNotes({ lead: 'Words.', notes: [] })).toEqual([{ title: 'About', markdown: 'Words.' }])
    expect(examFootNotes({ lead: '', notes: [] })).toEqual([])
  })
})

// Every exam page in the vault: the pills are the concepts the syllabus parser
// counts, objective by objective, so the page's squares and percentages are
// about the same set, and no word of an objective is lost.
describe('the vault', () => {
  const root = join(__dirname, '../../..')
  const files = readdirSync(root).filter(f => /^Exam .*\.md$/.test(f))

  it('has exam pages to read', () => {
    expect(files.length).toBeGreaterThan(50)
  })

  it.each(files)('%s', file => {
    const md = readFileSync(join(root, file), 'utf8')
    const page = parseExamPage(md)
    const meta = parseExamMetadata(md)
    expect(page.title).toBeTruthy()
    const syllabus = parseExamSyllabus(md, meta?.examId ?? '', meta?.examLabel ?? '', meta?.examTopic ?? '', file)
    expect(page.objectives.map(o => o.name)).toEqual(syllabus.topics.map(t => t.name))
    page.objectives.forEach((o, i) => {
      expect(o.concepts.map(p => p.name)).toEqual(syllabus.topics[i]!.concepts.map(c => c.name.split('#')[0]!.trim()))
      expect(o.lines.flatMap(l => l.pills)).toEqual(o.concepts)
      // Every line says something, or carries pills.
      for (const line of o.lines) expect(line.text.length + line.pills.length).toBeGreaterThan(0)
    })
  })
})

describe('objectiveWalk', () => {
  const md = `# Exam X

> [!example]- Ratemaking {40%}
> 1. Define [[Frequency]] and [[Severity]]
> 2. Use [[Pure Premium]]

> [!example]- Stochastic Models {60%}
> 1. Model claim frequencies using [[Frequency]] and [[Poisson Process|Poisson Processes]]
`
  const page = parseExamPage(md)
  const walk = objectiveWalk(page.objectives)

  it('stops at a concept under every objective that names it', () => {
    expect(walk.stops.map(s => `${s.name}@${s.objective}`)).toEqual([
      'Frequency@0', 'Severity@0', 'Pure Premium@0', 'Frequency@1', 'Poisson Process@1',
    ])
    expect(walk.list.map(r => r.name)).toEqual(['Frequency', 'Severity', 'Pure Premium', 'Poisson Process'])
  })

  it('opens a pill at its own stop, so Next goes on from there', () => {
    const at = stopOf(walk.stops, 'Frequency', 1)
    expect(at).toBe(3)
    expect(walk.stops[at + 1].name).toBe('Poisson Process')
    expect(stopOf(walk.stops, 'Frequency')).toBe(0)
    expect(stopOf(walk.stops, 'Nothing')).toBe(-1)
  })

  it('cuts the bar at the objectives the stops are under', () => {
    const marks = objectiveMarks(walk.stops, walk.index)
    expect(marks).toEqual([
      { start: 1, label: 'Ratemaking' },
      { start: 4, label: 'Stochastic Models' },
    ])
  })
})
