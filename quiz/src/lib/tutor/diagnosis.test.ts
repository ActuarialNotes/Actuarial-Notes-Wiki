import { describe, expect, it } from 'vitest'
import { parseExamSyllabus } from '../wikiParser'
import { confusionOptions, diagnose, foundationsOf, oneWayFoundations } from './diagnosis'
import { foldLog, type AnswerEvent, type TutorEvent } from './log'
import { tutorSyllabus } from './scheduler'

const PAGE = [
  '<div class="exam-nav" data-current="5|Basic Techniques"></div>',
  '',
  '> [!example]- A. Ratemaking {45–55%}',
  '> 1. Organize data by [[Calendar Year]], [[Policy Year]] and [[Accident Year]]',
  '> 2. Calculate [[Pure Premium]] from [[Frequency]] and [[Severity]]',
].join('\n')
const syllabus = tutorSyllabus(parseExamSyllabus(PAGE, '5', 'Exam 5', 'Basic Techniques'))

const at = (d: number, m = 0) => new Date(2026, 2, 1 + d, 9, m).toISOString()
function answer(concept: string, grade: AnswerEvent['grade'], when: string, extra: Partial<AnswerEvent> = {}): AnswerEvent {
  return { t: 'answer', at: when, item: `${concept}-${when}`, question: `${concept}-${when}`, concepts: [concept], kind: 'calculation', points: 1, difficulty: 'medium', grade, confidence: 'unsure', seconds: 60, ...extra }
}

describe('the findings', () => {
  it('put sure-and-wrong first', () => {
    const findings = diagnose({ syllabus, model: foldLog([
      answer('Policy Year', 'incorrect', at(0)),
      answer('Policy Year', 'incorrect', at(2)),
      answer('Pure Premium', 'partial', at(3), { confidence: 'sure' }),
    ]) })
    expect(findings[0]).toEqual({ type: 'sure-wrong', concept: 'Pure Premium' })
    expect(findings).toContainEqual({ type: 'persistent', concept: 'Policy Year', missDays: 2 })
  })

  it('carry an open "I’m confused" with its reason', () => {
    const flag: TutorEvent = { t: 'confused', at: at(0), concept: 'Accident Year', reason: 'difference' }
    expect(diagnose({ syllabus, model: foldLog([flag]) })).toContainEqual({ type: 'confused', concept: 'Accident Year', reason: 'difference' })
  })

  it('pair siblings that are both missed, once', () => {
    const findings = diagnose({ syllabus, model: foldLog([
      answer('Policy Year', 'incorrect', at(0)),
      answer('Accident Year', 'partial', at(0, 5)),
      answer('Calendar Year', 'correct', at(0, 9)),
    ]) })
    const pairs = findings.filter(f => f.type === 'siblings')
    expect(pairs).toHaveLength(1)
    expect(pairs[0]).toMatchObject({ concepts: ['Policy Year', 'Accident Year'] })
  })

  it('name a missed concept’s shaky foundations', () => {
    const model = foldLog([answer('Pure Premium', 'incorrect', at(0)), answer('Severity', 'correct', at(0, 3))])
    const findings = diagnose({
      syllabus,
      model,
      foundations: new Map([['pure premium', ['Frequency', 'Severity']]]),
      ladder: new Map([['severity', 'level2']]),
    })
    expect(findings).toContainEqual({ type: 'foundation', concept: 'Pure Premium', foundations: ['Frequency'] })
  })

  it('name the kind of part that trails the others by twenty points', () => {
    const events = [
      ...Array.from({ length: 5 }, (_, i) => answer('Pure Premium', 'correct', at(0, i))),
      ...Array.from({ length: 5 }, (_, i) => answer('Policy Year', i < 2 ? 'correct' : 'incorrect', at(1, i), { kind: 'judgment' })),
    ]
    expect(diagnose({ syllabus, model: foldLog(events) })).toContainEqual({
      type: 'kind-gap', weak: 'judgment', weakRate: 0.4, strong: 'calculation', strongRate: 1,
    })
  })

  it('say how often *sure* was right, once there are ten rated answers', () => {
    const events = Array.from({ length: 10 }, (_, i) => answer('Pure Premium', i < 6 ? 'correct' : 'incorrect', at(0, i), { confidence: 'sure' }))
    const cal = diagnose({ syllabus, model: foldLog(events) }).find(f => f.type === 'calibration')
    expect(cal).toMatchObject({ sureRate: 0.6, sureAnswers: 10, overconfident: true })
    expect(diagnose({ syllabus, model: foldLog(events.slice(0, 9)) }).find(f => f.type === 'calibration')).toBeUndefined()
  })
})

describe('a concept’s foundations', () => {
  it('are what its definition and defining formula name', () => {
    const page = [
      '**Pure Premium** is expected loss per unit of exposure.',
      '',
      '> $$\\text{Pure Premium} = \\text{Frequency} \\times \\text{Severity}$$',
    ].join('\n')
    expect(foundationsOf('Pure Premium', page, ['Frequency', 'Severity', 'Pure Premium', 'Calendar Year'])).toEqual(['Frequency', 'Severity'])
  })

  it('are linked, or in the formula — not a name merely written out', () => {
    const page = '**Policy Year**, also called underwriting year, groups policies incepting in a given calendar year, as [[Exposure Base|exposures]] do.'
    expect(foundationsOf('Policy Year', page, ['Underwriting Year', 'Calendar Year', 'Exposure Base'])).toEqual(['Exposure Base'])
  })

  it('are not what the page goes on to use it for', () => {
    const page = '**On-Level Premium** is historical premium restated at current rates, used in the [[Loss Ratio Method]].'
    expect(foundationsOf('On-Level Premium', page, ['Loss Ratio Method'])).toEqual([])
  })
})

describe('one-way foundations', () => {
  it('drop a pair of pages that define each other', () => {
    const map = new Map([
      ['credibility', ['Complement of Credibility']],
      ['complement of credibility', ['Credibility']],
      ['pure premium', ['Frequency', 'Severity']],
    ])
    expect([...oneWayFoundations(map)]).toEqual([['pure premium', ['Frequency', 'Severity']]])
  })
})

describe('"I’m confused" options', () => {
  it('offer only what the concept has behind it', () => {
    const opts = confusionOptions('Policy Year', syllabus, [], new Set(['calculation']))
    expect(opts.map(o => o.reason)).toEqual(['meaning', 'difference', 'calculation'])
    expect(opts[1].concepts).toEqual(['Calendar Year', 'Accident Year'])
    const pp = confusionOptions('Pure Premium', syllabus, ['Frequency'], new Set(['explanation']))
    expect(pp.map(o => o.reason)).toEqual(['meaning', 'difference', 'when', 'foundation'])
  })
})
