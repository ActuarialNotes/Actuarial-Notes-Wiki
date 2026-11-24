import { describe, expect, it } from 'vitest'
import { PROJECT_CASES, WORD_LIMIT } from '@/data/pcpaProjects'
import { ATTEMPT_VIEW_LABEL } from './attemptViews'
import { attemptOverview, briefRead, overviewAction, recordTally, requiredQuestions, stepSummary, type OverviewStep } from './attemptOverview'
import { newAttempt, type ProjectAttempt } from './pcpaAttempt'
import { tallyWords } from './pcpaReport'

const label = (s: OverviewStep) => ATTEMPT_VIEW_LABEL[s]
const water = PROJECT_CASES.find(c => c.id === 'ho-water')!
const auto = PROJECT_CASES.find(c => c.id === 'auto-severity')!

function attempt(patch: Partial<ProjectAttempt> = {}): ProjectAttempt {
  return { ...newAttempt({ id: 'a', caseId: 'auto-severity', seed: 1, mode: 'practice', language: 'r', now: 0 }), ...patch }
}
const words = (n: number) => Array.from({ length: n }, () => 'word').join(' ')
const overview = (a: ProjectAttempt, questions = auto.questions) => attemptOverview(a, questions, recordTally(a))
const row = (a: ProjectAttempt, id: string) => overview(a).checklist.find(r => r.id === id)!

describe('a new attempt', () => {
  const o = overview(attempt())
  it('starts on the brief with nothing done', () => {
    expect(o.current).toBe('brief')
    expect(o.steps.map(s => s.state)).toEqual(['current', 'todo', 'todo', 'todo'])
    expect(o.checklist.every(r => !r.done)).toBe(true)
  })
  it('says so in figures', () => {
    expect(o.checklist.map(r => r.value)).toEqual(['Not yet', 'Not yet', `0 / ${WORD_LIMIT.toLocaleString('en-US')}`, '0 / 5', '0 / 7'])
  })
  it('offers the brief as its button', () => {
    expect(overviewAction(o, 'open', label)).toEqual({ view: 'brief', label: 'Read the brief' })
  })
})

describe('the steps', () => {
  it('moves to the workspace once the brief is read', () => {
    const o = overview(attempt({ briefReadAt: 5 }))
    expect(o.current).toBe('workspace')
    expect(stepSummary(o, label)).toBe('Step 2 of 4: Workspace')
    expect(overviewAction(o, 'open', label)).toEqual({ view: 'workspace', label: 'Continue in Workspace' })
  })
  it('stays on the workspace while the code has not run clean, whatever is written', () => {
    const o = overview(attempt({ briefReadAt: 5, report: { body: words(400), appendices: [] } }))
    expect(o.steps.map(s => s.state)).toEqual(['done', 'current', 'done', 'todo'])
  })
  it('moves to the report after a clean run, then to Submit', () => {
    const ran = attempt({ briefReadAt: 5, cleanRun: { at: 9, ok: true } })
    expect(overview(ran).current).toBe('report')
    expect(overview({ ...ran, report: { body: words(400), appendices: [] } }).current).toBe('submit')
  })
  it('counts a brief as read on an older attempt that holds work', () => {
    expect(briefRead(attempt())).toBe(false)
    expect(briefRead(attempt({ answers: { rows: '12000' } }))).toBe(true)
    expect(briefRead(attempt({ answers: { rows: '  ' } }))).toBe(false)
  })
  it('opens the report of an attempt whose window has closed', () => {
    expect(overviewAction(overview(attempt({ briefReadAt: 5 })), 'closed', label)).toEqual({ view: 'report', label: 'Open the report' })
  })
})

describe('the checklist', () => {
  it('tells a failed clean run from one not made', () => {
    expect(row(attempt({ cleanRun: { at: 1, ok: false } }), 'code')).toMatchObject({ done: false, value: 'Stopped with an error' })
    expect(row(attempt({ cleanRun: { at: 1, ok: true } }), 'code')).toMatchObject({ done: true, value: '' })
  })
  it('holds the report to the Submit view\'s floor and limit', () => {
    expect(row(attempt({ report: { body: words(149), appendices: [] } }), 'report').done).toBe(false)
    expect(row(attempt({ report: { body: words(150), appendices: [] } }), 'report')).toMatchObject({ done: true, value: '150 / 1,250' })
    const over = row(attempt({ report: { body: words(WORD_LIMIT + 1), appendices: [] } }), 'report')
    expect(over).toMatchObject({ done: false, progress: 1, value: '1,251 / 1,250' })
  })
  it('counts an attached table\'s words when the page hands them in', () => {
    const a = attempt({ report: { body: words(1200), appendices: [] } })
    expect(attemptOverview(a, auto.questions, tallyWords(a.report.body, [80])).checklist[2]).toMatchObject({ done: false, value: '1,280 / 1,250' })
  })
  it('never counts the Tweedie power question', () => {
    expect(requiredQuestions(water.questions).map(q => q.id)).not.toContain('power')
    const answers = Object.fromEntries(requiredQuestions(water.questions).map(q => [q.id, 'x']))
    const q = attemptOverview(attempt({ answers }), water.questions, recordTally(attempt())).checklist[4]
    expect(q).toMatchObject({ done: true, value: `${requiredQuestions(water.questions).length} / ${requiredQuestions(water.questions).length}` })
  })
  it('sends each row to the view where it is done', () => {
    expect(overview(attempt()).checklist.map(r => r.view)).toEqual(['brief', 'submit', 'report', 'report', 'submit'])
  })
})
